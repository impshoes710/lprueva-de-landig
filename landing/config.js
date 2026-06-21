/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  LANDING PAGE — CONFIGURACIÓN CENTRAL
 *  Edita SOLO este archivo para textos, precios y colores.
 *  NO modifiques index.html ni los archivos de /sections/
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  GUÍA RÁPIDA DE ADMINISTRACIÓN
 *  ─────────────────────────────
 *
 *  1. CÓMO CAMBIAR IMÁGENES (MÉTODO RÁPIDO — SIN TOCAR ESTE ARCHIVO)
 *     • Todas las imágenes usan formato PNG con nombres FIJOS
 *     • Ve a: landing/assets/images/
 *     • Reemplaza cada PNG manteniendo el MISMO nombre de archivo
 *     • Ejemplo: arrastra tu foto sobre hero.png → listo, no editas config
 *
 *     MAPA DE ARCHIVOS PNG (assets/images/):
 *     ┌─────────────────┬──────────────────────────────────────────────┐
 *     │ hero.png        │ Imagen principal del producto (Hero)         │
 *     │ gallery-1.png   │ Galería — slide 1                            │
 *     │ gallery-2.png   │ Galería — slide 2                            │
 *     │ gallery-3.png   │ Galería — slide 3                            │
 *     │ detail-1.png    │ Bloque visual detalle 1                      │
 *     │ detail-2.png    │ Bloque visual detalle 2                      │
 *     │ feature-1.png   │ Característica 1                             │
 *     │ feature-2.png   │ Característica 2                             │
 *     │ feature-3.png   │ Característica 3                             │
 *     │ feature-4.png   │ Característica 4                             │
 *     │ avatar-1.png    │ Foto testimonio 1                            │
 *     │ avatar-2.png    │ Foto testimonio 2                            │
 *     │ avatar-3.png    │ Foto testimonio 3                            │
 *     │ cta-bg.png      │ Fondo sección CTA final                     │
 *     │ video-poster.png│ Poster de video                              │
 *     │ og-image.png    │ Imagen para WhatsApp / Facebook / SEO        │
 *     └─────────────────┴──────────────────────────────────────────────┘
 *
 *     Tamaños recomendados:
 *     • hero / gallery / features → 800×800 px o 1:1
 *     • detail / cta-bg → 1200×800 px o 16:9
 *     • avatars → 120×120 px
 *     • og-image → 1200×630 px
 *     • Peso ideal: < 300 KB por PNG (comprime en tinypng.com)
 *
 *  2. CÓMO CAMBIAR VIDEOS
 *     • Sube MP4 a: landing/assets/videos/
 *     • Nombres sugeridos: hero.mp4, testimonial-1.mp4
 *     • Edita hero.video.src o videoTestimonials.items[].src en este archivo
 *     • Poster del video → reemplaza video-poster.png (sin editar config)
 *
 *  3. CÓMO CAMBIAR TEXTOS
 *     • Todos los textos están en este archivo por sección
 *     • Botones → buttons | WhatsApp → whatsapp
 *
 *  4. CÓMO CAMBIAR PRECIOS
 *     • product.price (actual) | product.comparePrice (anterior)
 *     • product.discount se calcula solo si comparePrice > price
 *
 *  5. CÓMO CAMBIAR COLORES
 *     • theme.colors — se aplican a toda la landing automáticamente
 *
 *  6. CÓMO CAMBIAR TESTIMONIOS
 *     • testimonials.items[] → name, city, comment, rating
 *     • Fotos → reemplaza avatar-1.png, avatar-2.png, avatar-3.png
 *
 *  REGENERAR PLACEHOLDERS PNG: python3 landing/scripts/generate-placeholders.py
 * ═══════════════════════════════════════════════════════════════════════════
 */

/* ─── RUTAS PNG FIJAS — Reemplaza archivos, no edites rutas ─────────────── */
const ASSETS = {
  images: {
    hero:         "assets/images/hero.png",
    og:           "assets/images/og-image.png",
    gallery: [
      "assets/images/gallery-1.png",
      "assets/images/gallery-2.png",
      "assets/images/gallery-3.png"
    ],
    details: [
      "assets/images/detail-1.png",
      "assets/images/detail-2.png"
    ],
    features: [
      "assets/images/feature-1.png",
      "assets/images/feature-2.png",
      "assets/images/feature-3.png",
      "assets/images/feature-4.png"
    ],
    avatars: [
      "assets/images/avatar-1.png",
      "assets/images/avatar-2.png",
      "assets/images/avatar-3.png"
    ],
    ctaBg:        "assets/images/cta-bg.png",
    videoPoster:  "assets/images/video-poster.png"
  },
  icons: {
    shipping:     "assets/icons/shipping.png",
    quality:      "assets/icons/quality.png",
    secure:       "assets/icons/secure.png",
    support:      "assets/icons/support.png",
    return:       "assets/icons/return.png",
    cod:          "assets/icons/cod.png",
    instagram:    "assets/icons/instagram.png",
    facebook:     "assets/icons/facebook.png",
    tiktok:       "assets/icons/tiktok.png",
    visa:         "assets/icons/visa.png",
    mastercard:   "assets/icons/mastercard.png",
    favicon:      "assets/icons/favicon.png"
  }
};

const LANDING_CONFIG = {

  assets: ASSETS,

  /* ─── SEO & META ─────────────────────────────────────────────────────── */
  meta: {
    title: "",
    description: "",
    keywords: "",
    ogImage: ASSETS.images.og,
    favicon: ASSETS.icons.favicon,
    lang: "es"
  },

  /* ─── MARCA & PRODUCTO ───────────────────────────────────────────────── */
  brand: {
    name: "",
    logo: "",
    category: ""
  },

  product: {
    name: "",
    sku: "",
    price: 0,
    comparePrice: 0,
    discount: 0,
    currency: "$",
    currencyCode: "USD",
    stock: 0,
    sizes: [],
    colors: [],
    sizesLabel: "",
    colorsLabel: ""
  },

  /* ─── TIPOGRAFÍA & TEMA ──────────────────────────────────────────────── */
  theme: {
    fontFamily: "Inter",
    fontUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
    borderRadius: "12px",
    maxWidth: "1200px",
    colors: {
      primary: "#111111",
      primaryHover: "#333333",
      secondary: "#ffffff",
      accent: "#e63946",
      accentHover: "#c1121f",
      success: "#2ecc71",
      warning: "#f39c12",
      text: "#1a1a1a",
      textMuted: "#6b7280",
      textLight: "#ffffff",
      background: "#ffffff",
      backgroundAlt: "#f8f9fa",
      backgroundDark: "#111111",
      border: "#e5e7eb",
      shadow: "rgba(0, 0, 0, 0.08)",
      overlay: "rgba(0, 0, 0, 0.6)"
    }
  },

  /* ─── BOTONES GLOBALES ───────────────────────────────────────────────── */
  buttons: {
    buy: {
      text: "",
      url: "#comprar",
      openInNewTab: false
    },
    secondary: {
      text: "",
      url: "#galeria",
      openInNewTab: false
    }
  },

  /* ─── WHATSAPP ───────────────────────────────────────────────────────── */
  whatsapp: {
    enabled: true,
    phone: "",
    message: "",
    buttonText: ""
  },

  /* ─── TEMPORIZADOR / CONTADOR ────────────────────────────────────────── */
  timer: {
    enabled: true,
    endDate: "",
    labels: {
      days: "",
      hours: "",
      minutes: "",
      seconds: ""
    },
    expiredMessage: ""
  },

  /* ─── SECCIÓN 1: HERO ────────────────────────────────────────────────── */
  hero: {
    enabled: true,
    image: {
      src: ASSETS.images.hero,
      alt: ""
    },
    video: {
      enabled: false,
      type: "local",
      src: "assets/videos/hero.mp4",
      poster: ASSETS.images.videoPoster,
      autoplay: true,
      muted: true,
      loop: true
    },
    badge: {
      shipping: { enabled: true, text: "" },
      cod: { enabled: true, text: "" }
    },
    title: "",
    subtitle: "",
    showPrice: true,
    showDiscount: true,
    showStock: true,
    stockLabel: "",
    showSizes: true,
    showColors: true
  },

  /* ─── SECCIÓN 2: GALERÍA ─────────────────────────────────────────────── */
  gallery: {
    enabled: true,
    id: "galeria",
    title: "",
    subtitle: "",
    enableZoom: true,
    enableThumbnails: true,
    autoplay: false,
    autoplayInterval: 5000,
    items: ASSETS.images.gallery.map(src => ({
      type: "image",
      src,
      alt: "",
      thumbnail: src
    }))
  },

  /* ─── SECCIÓN 3: BENEFICIOS ──────────────────────────────────────────── */
  benefits: {
    enabled: true,
    title: "",
    subtitle: "",
    items: [
      { icon: ASSETS.icons.shipping, title: "", description: "" },
      { icon: ASSETS.icons.quality, title: "", description: "" },
      { icon: ASSETS.icons.secure, title: "", description: "" },
      { icon: ASSETS.icons.support, title: "", description: "" }
    ]
  },

  /* ─── SECCIÓN 4: CARACTERÍSTICAS ─────────────────────────────────────── */
  features: {
    enabled: true,
    title: "",
    subtitle: "",
    items: ASSETS.images.features.map(image => ({
      image,
      title: "",
      description: ""
    }))
  },

  /* ─── SECCIÓN 5: DETALLES VISUALES ───────────────────────────────────── */
  details: {
    enabled: true,
    title: "",
    subtitle: "",
    blocks: [
      {
        imagePosition: "left",
        image: { src: ASSETS.images.details[0], alt: "" },
        title: "",
        description: "",
        button: { text: "", url: "#comprar" }
      },
      {
        imagePosition: "right",
        image: { src: ASSETS.images.details[1], alt: "" },
        title: "",
        description: "",
        button: { text: "", url: "#comprar" }
      }
    ]
  },

  /* ─── SECCIÓN 6: COMPARATIVA ─────────────────────────────────────────── */
  comparison: {
    enabled: true,
    title: "",
    subtitle: "",
    ourProductLabel: "",
    competitorLabel: "",
    features: [
      { name: "", ours: true, competitor: false },
      { name: "", ours: true, competitor: false },
      { name: "", ours: true, competitor: false },
      { name: "", ours: true, competitor: false },
      { name: "", ours: true, competitor: false }
    ]
  },

  /* ─── SECCIÓN 7: TESTIMONIOS ─────────────────────────────────────────── */
  testimonials: {
    enabled: true,
    title: "",
    subtitle: "",
    items: ASSETS.images.avatars.map(photo => ({
      photo,
      name: "",
      city: "",
      comment: "",
      rating: 5
    }))
  },

  /* ─── SECCIÓN 8: VIDEO TESTIMONIOS ───────────────────────────────────── */
  videoTestimonials: {
    enabled: false,
    title: "",
    subtitle: "",
    items: [
      {
        type: "local",
        src: "assets/videos/testimonial-1.mp4",
        poster: ASSETS.images.videoPoster,
        name: "",
        city: ""
      }
    ]
  },

  /* ─── SECCIÓN 9: CONTADOR ────────────────────────────────────────────── */
  counter: {
    enabled: true,
    title: "",
    subtitle: "",
    showTimer: true
  },

  /* ─── SECCIÓN 10: OFERTA ─────────────────────────────────────────────── */
  offer: {
    enabled: true,
    title: "",
    subtitle: "",
    highlight: "",
    backgroundColor: "",
    textColor: ""
  },

  /* ─── SECCIÓN 11: FAQ ────────────────────────────────────────────────── */
  faq: {
    enabled: true,
    title: "",
    subtitle: "",
    items: [
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" },
      { question: "", answer: "" }
    ]
  },

  /* ─── SECCIÓN 12: GARANTÍAS ──────────────────────────────────────────── */
  guarantees: {
    enabled: true,
    title: "",
    subtitle: "",
    items: [
      { icon: ASSETS.icons.secure, title: "", description: "" },
      { icon: ASSETS.icons.shipping, title: "", description: "" },
      { icon: ASSETS.icons.return, title: "", description: "" },
      { icon: ASSETS.icons.cod, title: "", description: "" }
    ]
  },

  /* ─── SECCIÓN 13: CTA FINAL ──────────────────────────────────────────── */
  cta: {
    enabled: true,
    id: "comprar",
    backgroundImage: ASSETS.images.ctaBg,
    overlay: 0.55,
    title: "",
    subtitle: "",
    showPrice: true
  },

  /* ─── SECCIÓN 14: FOOTER ─────────────────────────────────────────────── */
  footer: {
    enabled: true,
    copyright: "",
    social: [
      { platform: "instagram", url: "", icon: ASSETS.icons.instagram },
      { platform: "facebook", url: "", icon: ASSETS.icons.facebook },
      { platform: "tiktok", url: "", icon: ASSETS.icons.tiktok }
    ],
    paymentMethods: {
      enabled: true,
      title: "",
      icons: [
        ASSETS.icons.visa,
        ASSETS.icons.mastercard,
        ASSETS.icons.cod
      ]
    },
    policies: [
      { text: "", url: "#" },
      { text: "", url: "#" },
      { text: "", url: "#" }
    ]
  },

  /* ─── STICKY CTA MÓVIL ───────────────────────────────────────────────── */
  stickyCta: {
    enabled: true,
    showPrice: true,
    showOnScroll: 400
  },

  /* ─── ORDEN DE SECCIONES ─────────────────────────────────────────────── */
  sectionOrder: [
    "hero",
    "benefits",
    "gallery",
    "features",
    "details",
    "comparison",
    "testimonials",
    "videoTestimonials",
    "counter",
    "offer",
    "faq",
    "guarantees",
    "cta",
    "footer"
  ]
};

window.LANDING_CONFIG = LANDING_CONFIG;
