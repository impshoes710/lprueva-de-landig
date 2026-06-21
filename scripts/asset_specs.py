"""Especificaciones de tamaño para todos los PNG de la landing."""

from pathlib import Path

LANDING_ROOT = Path(__file__).resolve().parent.parent
IMAGES_DIR = LANDING_ROOT / "assets" / "images"
INBOX_DIR = LANDING_ROOT / "assets" / "inbox"
ICONS_DIR = LANDING_ROOT / "assets" / "icons"

# (ancho, alto) — recorte centrado (cover)
IMAGE_SPECS = {
    "hero.png": (800, 800),
    "og-image.png": (1200, 630),
    "cta-bg.png": (1200, 600),
    "video-poster.png": (900, 600),
    "detail-1.png": (1200, 800),
    "detail-2.png": (1200, 800),
    "feature-1.png": (800, 800),
    "feature-2.png": (800, 800),
    "feature-3.png": (800, 800),
    "feature-4.png": (800, 800),
    "avatar-1.png": (120, 120),
    "avatar-2.png": (120, 120),
    "avatar-3.png": (120, 120),
}

GALLERY_SLOT_COUNT = 8

for i in range(1, GALLERY_SLOT_COUNT + 1):
    IMAGE_SPECS[f"gallery-{i}.png"] = (800, 800)

SUPPORTED_INPUT = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif"}
