#!/usr/bin/env python3
"""Genera placeholders PNG con nombres fijos para reemplazo drag-and-drop."""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

from asset_specs import GALLERY_SLOT_COUNT, IMAGE_SPECS, ICONS_DIR, IMAGES_DIR

BG = (245, 245, 245)
BOX = (224, 224, 224)
TEXT = (158, 158, 158)
DARK_BG = (26, 26, 26)
WHITE = (255, 255, 255)


def font(size: int):
    for name in ("DejaVuSans.ttf", "Arial.ttf", "LiberationSans-Regular.ttf"):
        try:
            return ImageFont.truetype(name, size)
        except OSError:
            continue
    return ImageFont.load_default()


def placeholder(path: Path, size: tuple, label: str, bg=BG, box=BOX):
    w, h = size
    img = Image.new("RGB", (w, h), bg)
    draw = ImageDraw.Draw(img)
    margin = min(w, h) // 8
    draw.rounded_rectangle(
        (margin, margin, w - margin, h - margin),
        radius=16,
        fill=box,
    )
    f = font(max(14, min(w, h) // 22))
    bbox = draw.textbbox((0, 0), label, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((w - tw) / 2, (h - th) / 2), label, fill=TEXT, font=f)
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "PNG", optimize=True)
    print(f"  ✓ {path.name}")


def avatar(path: Path, label: str):
    size = 120
    img = Image.new("RGB", (size, size), BOX)
    draw = ImageDraw.Draw(img)
    draw.ellipse((0, 0, size, size), fill=BOX)
    draw.ellipse((size // 2 - 22, 28, size // 2 + 22, 72), fill=(189, 189, 189))
    draw.ellipse((size // 2 - 32, 78, size // 2 + 32, 118), fill=(189, 189, 189))
    f = font(10)
    bbox = draw.textbbox((0, 0), label, font=f)
    tw = bbox[2] - bbox[0]
    draw.text(((size - tw) / 2, size - 14), label, fill=TEXT, font=f)
    img.save(path, "PNG", optimize=True)
    print(f"  ✓ {path.name}")


def icon_png(path: Path, label: str, color=(17, 17, 17)):
    size = 96
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((8, 8, size - 8, size - 8), radius=12, fill=(248, 249, 250, 255))
    draw.rounded_rectangle((8, 8, size - 8, size - 8), radius=12, outline=(229, 231, 235, 255), width=2)
    f = font(11)
    bbox = draw.textbbox((0, 0), label, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((size - tw) / 2, (size - th) / 2), label, fill=color + (255,) if len(color) == 3 else color, font=f)
    img.save(path, "PNG", optimize=True)
    print(f"  ✓ {path.name}")


def social_icon(path: Path, letter: str, bg_color):
    size = 64
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle((0, 0, size, size), radius=14, fill=bg_color)
    f = font(28)
    bbox = draw.textbbox((0, 0), letter, font=f)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((size - tw) / 2, (size - th) / 2 - 2), letter, fill=WHITE, font=f)
    img.save(path, "PNG", optimize=True)
    print(f"  ✓ {path.name}")


def main():
    print(f"Generando imágenes PNG ({GALLERY_SLOT_COUNT} slots de galería)…")

    labels = {
        "hero.png": "HERO",
        "og-image.png": "OG IMAGE",
        "cta-bg.png": "CTA BG",
        "video-poster.png": "VIDEO POSTER",
        "detail-1.png": "DETAIL 1",
        "detail-2.png": "DETAIL 2",
        "feature-1.png": "FEATURE 1",
        "feature-2.png": "FEATURE 2",
        "feature-3.png": "FEATURE 3",
        "feature-4.png": "FEATURE 4",
    }
    for i in range(1, GALLERY_SLOT_COUNT + 1):
        labels[f"gallery-{i}.png"] = f"GALLERY {i}"

    for name, size in IMAGE_SPECS.items():
        if name.startswith("avatar"):
            avatar(IMAGES_DIR / name, name.replace(".png", "").upper().replace("-", " "))
        elif name in ("cta-bg.png", "video-poster.png"):
            placeholder(IMAGES_DIR / name, size, labels.get(name, name), DARK_BG, (51, 51, 51))
        else:
            placeholder(IMAGES_DIR / name, size, labels.get(name, name))

    print("Generando iconos PNG…")
    icons = {
        "shipping": "ENVÍO",
        "quality": "CALIDAD",
        "secure": "SEGURO",
        "support": "SOPORTE",
        "return": "DEVOL.",
        "cod": "CONTRA ENTREGA",
    }
    for name, label in icons.items():
        icon_png(ICONS_DIR / f"{name}.png", label)

    social_icon(ICONS_DIR / "instagram.png", "I", (228, 64, 95))
    social_icon(ICONS_DIR / "facebook.png", "f", (24, 119, 242))
    social_icon(ICONS_DIR / "tiktok.png", "T", (0, 0, 0))
    placeholder(ICONS_DIR / "visa.png", (96, 64), "VISA", (26, 31, 113), (26, 31, 113))
    placeholder(ICONS_DIR / "mastercard.png", (96, 64), "MC", (37, 37, 37), (37, 37, 37))
    placeholder(ICONS_DIR / "favicon.png", (32, 32), "★", (17, 17, 17), (17, 17, 17))

    print("Listo.")


if __name__ == "__main__":
    main()
