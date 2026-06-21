#!/usr/bin/env python3
"""
Redimensiona imágenes del inbox (o carpeta images) al tamaño correcto.

USO RÁPIDO:
  1. Coloca tus fotos en: landing/assets/inbox/
     Nombres: hero.jpg, gallery-1.png, feature-2.webp, etc.
  2. Ejecuta: npm run landing:resize
  3. Los PNG optimizados se guardan en: landing/assets/images/

OPCIONES:
  --inbox     Solo procesa assets/inbox/ (default)
  --optimize  Re-optimiza PNG ya existentes en assets/images/
  --all       inbox + re-optimizar existentes
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from PIL import Image, ImageOps

from asset_specs import (
    GALLERY_SLOT_COUNT,
    IMAGE_SPECS,
    IMAGES_DIR,
    INBOX_DIR,
    LANDING_ROOT,
    SUPPORTED_INPUT,
)

Image.MAX_IMAGE_PIXELS = 20_000_000


def cover_resize(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    """Recorte centrado tipo CSS object-fit: cover."""
    img = ImageOps.exif_transpose(img)
    if img.mode not in ("RGB", "RGBA"):
        img = img.convert("RGBA" if "A" in img.getbands() else "RGB")

    src_w, src_h = img.size
    scale = max(target_w / src_w, target_h / src_h)
    new_w = max(1, round(src_w * scale))
    new_h = max(1, round(src_h * scale))
    resized = img.resize((new_w, new_h), Image.Resampling.LANCZOS)

    left = (new_w - target_w) // 2
    top = (new_h - target_h) // 2
    cropped = resized.crop((left, top, left + target_w, top + target_h))

    if cropped.mode == "RGBA":
        bg = Image.new("RGB", (target_w, target_h), (255, 255, 255))
        bg.paste(cropped, mask=cropped.split()[3])
        return bg
    return cropped.convert("RGB")


def save_png(img: Image.Image, dest: Path, quality: int = 85) -> int:
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "PNG", optimize=True, compress_level=9)
    return dest.stat().st_size


def find_source(stem: str, folders: list[Path]) -> Path | None:
    """Busca stem.ext en carpetas (ej: hero → hero.jpg, gallery-1.png)."""
    for folder in folders:
        if not folder.exists():
            continue
        for ext in SUPPORTED_INPUT:
            candidate = folder / f"{stem}{ext}"
            if candidate.is_file():
                return candidate
        for path in folder.iterdir():
            if path.is_file() and path.suffix.lower() in SUPPORTED_INPUT:
                if path.stem.lower() == stem.lower():
                    return path
    return None


def process_spec(output_name: str, size: tuple[int, int], sources: list[Path], dest_dir: Path) -> dict:
    stem = Path(output_name).stem
    src = find_source(stem, sources)
    dest = dest_dir / output_name
    result = {"file": output_name, "size": size, "status": "skip", "src": None, "bytes": 0}

    if not src:
        if dest.exists():
            result["status"] = "exists"
            result["bytes"] = dest.stat().st_size
        return result

    try:
        with Image.open(src) as img:
            out = cover_resize(img, size[0], size[1])
            nbytes = save_png(out, dest)
        result.update({"status": "ok", "src": str(src.name), "bytes": nbytes})
    except Exception as exc:
        result["status"] = f"error: {exc}"
    return result


def optimize_existing() -> list[dict]:
    results = []
    for name, size in IMAGE_SPECS.items():
        path = IMAGES_DIR / name
        if not path.is_file():
            continue
        try:
            with Image.open(path) as img:
                out = cover_resize(img, size[0], size[1])
                nbytes = save_png(out, path)
            results.append({"file": name, "status": "optimized", "bytes": nbytes})
        except Exception as exc:
            results.append({"file": name, "status": f"error: {exc}"})
    return results


def print_results(rows: list[dict]) -> None:
    ok = sum(1 for r in rows if r.get("status") == "ok")
    for r in rows:
        status = r["status"]
        name = r["file"]
        if status == "ok":
            kb = r["bytes"] / 1024
            print(f"  ✓ {name} ← {r['src']} ({r['size'][0]}×{r['size'][1]}) · {kb:.0f} KB")
        elif status == "optimized":
            kb = r["bytes"] / 1024
            print(f"  ↻ {name} re-optimizado · {kb:.0f} KB")
        elif status == "exists":
            print(f"  · {name} ya existe (sin archivo en inbox)")
        elif status == "skip":
            print(f"  − {name} sin fuente en inbox")
        else:
            print(f"  ✗ {name} — {status}")
    print(f"\n  Procesadas: {ok}/{len(rows)}")


def main() -> int:
    parser = argparse.ArgumentParser(description="Redimensiona imágenes al tamaño PNG de la landing")
    parser.add_argument("--inbox", action="store_true", help="Procesar assets/inbox/ (default)")
    parser.add_argument("--optimize", action="store_true", help="Re-optimizar PNG en assets/images/")
    parser.add_argument("--all", action="store_true", help="Inbox + optimizar existentes")
    args = parser.parse_args()

    if not args.inbox and not args.optimize and not args.all:
        args.inbox = True

    INBOX_DIR.mkdir(parents=True, exist_ok=True)
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)

    print("═══════════════════════════════════════════════")
    print("  LANDING — Redimensionador de imágenes PNG")
    print("═══════════════════════════════════════════════")
    print(f"  Galería: {GALLERY_SLOT_COUNT} slots (gallery-1 … gallery-{GALLERY_SLOT_COUNT})")
    print(f"  Inbox:   {INBOX_DIR.relative_to(LANDING_ROOT.parent)}")
    print(f"  Salida:  {IMAGES_DIR.relative_to(LANDING_ROOT.parent)}")
    print()

    all_rows: list[dict] = []

    if args.inbox or args.all:
        print("Procesando inbox…")
        sources = [INBOX_DIR]
        rows = [
            process_spec(name, size, sources, IMAGES_DIR)
            for name, size in sorted(IMAGE_SPECS.items())
        ]
        print_results(rows)
        all_rows.extend(rows)

    if args.optimize or args.all:
        print("\nRe-optimizando PNG existentes…")
        opt = optimize_existing()
        for r in opt:
            kb = r["bytes"] / 1024
            print(f"  ↻ {r['file']} · {kb:.0f} KB")

    print("\n  Tip: arrastra fotos a assets/inbox/ con el nombre destino")
    print("  (hero.jpg, gallery-4.png, feature-1.webp, …) y vuelve a ejecutar.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
