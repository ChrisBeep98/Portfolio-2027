---
name: Commerce Conversion Architect
description: Defines the psychology and physics of e-commerce experiences (skill del proyecto anterior — consulta de técnica). Rules for cart drawers, product galleries, elegant urgency states, and FLIP transitions for checkout.
---

# 🛒 Agent Skill: COMMERCE CONVERSION ARCHITECT

**Level:** Conversion Architect / Master-Class
**Stack:** Next.js (App Router), GSAP FLIP, Zustand, CSS Modules
**Objective:** Transform standard e-commerce flows into high-converting, friction-free luxury experiences (proveniente del e-commerce del proyecto anterior).

---

> *"A checkout is not a transaction; it is a choreography of trust. Every click must feel inevitable."*

This skill dictates the UX and animation patterns for E-Commerce flows (técnica portable; el portfolio no tiene tienda — usar solo en mocks de case studies). When building product pages, carts, or checkout flows, you MUST adhere to these conversion laws:

## 1. THE MAGNETIC PRODUCT GALLERY (Tactile Interaction)
Product images are the closest the user gets to touching the coffee.
*   **The Physics:** Galleries must use drag-to-scroll or GSAP Draggable. No clunky arrow buttons blocking the images.
*   **Zoom:** On hover (desktop), a seamless, non-jittery scale up (`scale: 1.05` to `1.1`) inside an `overflow-hidden` container.
*   **Format:** Strict enforcement of WebP/AVIF with `next/image`. High resolution but under 150kb per frame.

## 2. THE LIQUID CART DRAWER (Zero-Friction Checkout)
Adding to the cart must never redirect the user to a new page.
*   **The Physics:** The cart slides in from the right. The background behind it dims with a `backdrop-blur-md` and `bg-black/40` (Dark Mode vibe) or `bg-white/20` (Amanecer vibe).
*   **The GSAP FLIP:** When a user clicks "Add to Cart", the product image should ideally FLIP-animate from the grid into the cart drawer.
*   **Urgency without Cheapness:** If applying a "Free Shipping" progress bar, make it elegant. A thin, slow-moving line with a soft glow (`box-shadow`), not a pulsing red alert.

## 3. STATE-DRIVEN MICRO-INTERACTIONS (The "Add" Button)
Buttons must react to the server state instantly.
*   **The Physics:**
    *   *Default:* "Añadir al Carrito" (Solid Moss Green or Terracotta).
    *   *Loading:* Text morphs into a minimal spinner. Button width stays FIXED to avoid layout shift.
    *   *Success:* Button turns deep green (`#4A5D23`), text says "¡Añadido!" and shakes slightly (`calc-wiggle`), then reverts after 2s.

## 4. TRUST INJECTION (Micro-copy & Placement)
*   **Placement:** Secure checkout badges, shipping estimates, and guarantees must be grouped tightly directly under the primary CTA.
*   **Typography:** Use `.text-caption` and `.text-muted` for these elements to avoid competing with the price or product title.

## 🤖 AI PROMPT DIRECTIVES
When generating commerce UI:
1. *"Does this action cause a page reload? If yes, REWRITE to use a drawer or modal."*
2. *"Is the 'Add to Cart' button providing instant visual feedback? If not, ADD loading/success states."*
3. *"Are the product images too heavy or lacking tactile hover states? If yes, IMPLEMENT scale and Next/Image optimization."*
