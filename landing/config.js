/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  LANDING PAGE — CONFIGURACIÓN CENTRAL
 *  Edita SOLO este archivo para cambiar producto, textos, imágenes y diseño.
 *  NO modifiques index.html ni los archivos de /sections/
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *  GUÍA RÁPIDA DE ADMINISTRACIÓN
 *  ─────────────────────────────
 *
 *  1. CÓMO CAMBIAR IMÁGENES
 *     • Sube tus archivos a: landing/assets/images/
 *     • Actualiza la ruta en las secciones correspondientes (hero, gallery, etc.)
 *     • Formato recomendado: WebP o JPG optimizado (< 200 KB por imagen)
 *     • Ejemplo: image: "assets/images/mi-producto.webp"
 *     • Para SEO, usa el campo "alt" descriptivo en cada imagen
 *
 *  2. CÓMO CAMBIAR VIDEOS
 *     • Sube tus videos a: landing/assets/videos/
 *     • Usa formato MP4 (H.264) para máxima compatibilidad móvil
 *     • Ejemplo: src: "assets/videos/demo.mp4", poster: "assets/images/poster.jpg"
 *     • Para YouTube/Vimeo: type: "embed", src: "URL_COMPLETA_DEL_VIDEO"
 *
 *  3. CÓMO CAMBIAR TEXTOS
 *     • Todos los textos están en este archivo, organizados por sección
 *     • Busca la sección (hero, benefits, faq, etc.) y edita title, subtitle, description
 *     • Los textos de botones están en: buttons y whatsapp
 *
 *  4. CÓMO CAMBIAR PRECIOS
 *     • Edita product.price (precio actual), product.comparePrice (precio anterior)
 *     • product.discount se calcula automáticamente o puedes definirlo manualmente
 *     • product.currency define el símbolo de moneda
 *
 *  5. CÓMO CAMBIAR COLORES
 *     • Edita theme.colors — todos los colores globales de la landing
 *     • primary: color principal de botones y acentos
 *     • secondary: color secundario
 *     • accent: color de ofertas y badges
 *     • Los cambios se aplican automáticamente a toda la página
 *
 *  6. CÓMO CAMBIAR TESTIMONIOS
 *     • Edita testimonials.items[] — cada objeto es un testimonio
 *     • Campos: name, city, comment, rating (1-5), photo
 *     • Para video testimonios: edita videoTestimonials.items[]
 *
 *  TIEMPO ESTIMADO DE CAMBIO DE PRODUCTO: < 3 minutos
 * ═══════════════════════════════════════════════════════════════════════════
 */

const LANDING_CONFIG = {

  /* ─── SEO & META ─────────────────────────────────────────────────────── */
  meta: {
    title: "",
    description: "",
    keywords: "",
    ogImage: "assets/images/hero.svg",
    favicon: "assets/icons/favicon.png",
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
      src: "assets/images/hero.svg",
      alt: ""
    },
    video: {
      enabled: false,
      type: "local",
      src: "",
      poster: "",
      autoplay: true,
      muted: true,
      loop: true
    },
    badge: {
      shipping: {
        enabled: true,
        text: ""
      },
      cod: {
        enabled: true,
        text: ""
      }
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
    items: [
      { type: "image", src: "assets/images/gallery-1.svg", alt: "", thumbnail: "assets/images/gallery-1.svg" },
      { type: "image", src: "assets/images/gallery-2.svg", alt: "", thumbnail: "assets/images/gallery-2.svg" },
      { type: "image", src: "assets/images/gallery-3.svg", alt: "", thumbnail: "assets/images/gallery-3.svg" }
    ]
  },

  /* ─── SECCIÓN 3: BENEFICIOS ──────────────────────────────────────────── */
  benefits: {
    enabled: true,
    title: "",
    subtitle: "",
    items: [
      { icon: "assets/icons/shipping.svg", title: "", description: "" },
      { icon: "assets/icons/quality.svg", title: "", description: "" },
      { icon: "assets/icons/secure.svg", title: "", description: "" },
      { icon: "assets/icons/support.svg", title: "", description: "" }
    ]
  },

  /* ─── SECCIÓN 4: CARACTERÍSTICAS ─────────────────────────────────────── */
  features: {
    enabled: true,
    title: "",
    subtitle: "",
    items: [
      { image: "assets/images/detail-1.svg", title: "", description: "" },
      { image: "assets/images/detail-2.svg", title: "", description: "" },
      { image: "assets/images/gallery-1.svg", title: "", description: "" },
      { image: "assets/images/gallery-2.svg", title: "", description: "" }
    ]
  },

  /* ─── SECCIÓN 5: DETALLES VISUALES (alternados) ──────────────────────── */
  details: {
    enabled: true,
    title: "",
    subtitle: "",
    blocks: [
      {
        imagePosition: "left",
        image: { src: "assets/images/detail-1.svg", alt: "" },
        title: "",
        description: "",
        button: { text: "", url: "#comprar" }
      },
      {
        imagePosition: "right",
        image: { src: "assets/images/detail-2.svg", alt: "" },
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
    items: [
      { photo: "assets/images/avatar.svg", name: "", city: "", comment: "", rating: 5 },
      { photo: "assets/images/avatar.svg", name: "", city: "", comment: "", rating: 5 },
      { photo: "assets/images/avatar.svg", name: "", city: "", comment: "", rating: 5 }
    ]
  },

  /* ─── SECCIÓN 8: VIDEO TESTIMONIOS ───────────────────────────────────── */
  videoTestimonials: {
    enabled: false,
    title: "",
    subtitle: "",
    items: [
      { type: "local", src: "", poster: "assets/images/video-poster.svg", name: "", city: "" }
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
      { icon: "assets/icons/secure.svg", title: "", description: "" },
      { icon: "assets/icons/shipping.svg", title: "", description: "" },
      { icon: "assets/icons/return.svg", title: "", description: "" },
      { icon: "assets/icons/cod.svg", title: "", description: "" }
    ]
  },

  /* ─── SECCIÓN 13: CTA FINAL ──────────────────────────────────────────── */
  cta: {
    enabled: true,
    id: "comprar",
    backgroundImage: "assets/images/cta-bg.svg",
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
      { platform: "instagram", url: "", icon: "assets/icons/instagram.svg" },
      { platform: "facebook", url: "", icon: "assets/icons/facebook.svg" },
      { platform: "tiktok", url: "", icon: "assets/icons/tiktok.svg" }
    ],
    paymentMethods: {
      enabled: true,
      title: "",
      icons: [
        "assets/icons/visa.svg",
        "assets/icons/mastercard.svg",
        "assets/icons/cod.svg"
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

/* Disponible globalmente para app.js */
window.LANDING_CONFIG = LANDING_CONFIG;
