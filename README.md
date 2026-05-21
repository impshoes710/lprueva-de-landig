# Lokal Big Blanco — Landing (Astro + Vercel)

Réplica de la landing de oferta de Calzados Elite, construida con **Astro** y lista para desplegar en **Vercel**.

Página original: https://lp.calzadoselite.co/oferta/lokal-big-blanco

## Stack

- [Astro](https://astro.build) 6 (sitio estático)
- [@astrojs/vercel](https://docs.astro.build/en/guides/deploy/vercel/) — adaptador para Vercel
- [Swiper](https://swiperjs.com) — galería de producto y reseñas

## Desarrollo local

```bash
npm install
npm run dev
```

Abre http://localhost:4321

## Build

```bash
npm run build
npm run preview
```

## Despliegue en Vercel

1. Importa el repositorio en [vercel.com](https://vercel.com)
2. Vercel detecta Astro automáticamente
3. Build command: `npm run build`
4. Output: gestionado por `@astrojs/vercel` (estático)

También puedes desplegar con la CLI:

```bash
npx vercel
```

La ruta `/oferta/lokal-big-blanco` redirige a `/` (configurado en `vercel.json` y en Astro).

## Estructura

```
src/
  components/     # Secciones de la landing
  data/           # product.json — datos del producto
  layouts/        # Layout base
  pages/          # index.astro + redirect de oferta
  styles/         # CSS global y de la landing
public/           # Videos, reseñas, logo
```

## Personalización

Edita `src/data/product.json` para precios, imágenes, FAQs y productos relacionados.
