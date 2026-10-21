---
name: Kinetic Avant-Garde Typography Lockup
description: Converts boring, plain text into a high-end, rhythmic editorial poster layout with mixed scales, inline weight jumping, and decoupled, asymmetric GSAP entrance animations.
---

# 🤖 AGENT PROTOCOL: KINETIC AVANT-GARDE TYPOGRAPHY

**Objective:** Transform standard, continuous sentences into aggressive, highly structured "poster-style" typographic lockups. This technique creates extreme visual tension by mixing massive brutalist words with delicate, small italic connectors *within the exact same inline paragraph*, paired with flawless staggered GSAP entrance animations.

## 1. THE TYPOGRAPHIC RHYTHM (THE "JUMP" EFFECT)
You must break the sentence into a rhythmic pattern of Anchors and Connectors.

*   **ANCHORS (Massive & Brutalist):** The core nouns/verbs. 
    *   **Styling:** `font-bold tracking-[-0.04em] text-[#1D1D1F]` (or vibrant `bg-gradient-to-r`).
    *   **Scale:** Massive (`clamp(3.5rem, 8vw, 7.5rem)` or larger).
*   **CONNECTORS (Small & Elegant):** The prepositions, pronouns, or secondary thoughts.
    *   **Styling:** `font-serif italic font-medium text-[#1D1D1F]/70 tracking-normal`.
    *   **Scale:** Significantly smaller (`clamp(1.8rem, 4vw, 3.2rem)`).

## 2. GRANULAR i18n SPLITTING (MANDATORY)
To achieve this inline jumping, you CANNOT use a single translation key (e.g., `titleLine: "But between their message..."`).
You **MUST** split the text in `en.json` and `es.json` into granular chunks:
```json
"titleLine2A0": "But ",             // ANCHOR
"titleLine2A1": "Between Their ",   // CONNECTOR
"titleLine2A2": "Message",          // ANCHOR (Gradient)
"titleLine2A3": " And ",            // CONNECTOR
"titleLine2A3_1": "Your ",          // ANCHOR
"titleLine2A4": "Reply",            // ANCHOR (Gradient)
```

## 3. STRUCTURAL ARCHITECTURE (JSX)
To prevent messy natural wrapping and enable perfect GSAP staggering, you must force explicit lines.

### A. The Container & Line Height
*   The outer wrapper must use `leading-[0.85]` or `leading-[0.95]` for an extremely tight, claustrophobic editorial lockup.
*   Use negative margins (`-ml-2 md:-ml-6`) to pull the massive text off-grid and anchor it to the absolute left.

### B. Structural Decoupling for Perfect Water Masks
Do NOT use `overflow-hidden` directly on text blocks, and NEVER use padding/margin hacks (`py-4 -my-4`) to prevent descender clipping. They destroy tight line heights (`leading-[0.85]`) and cause visual glitches (decapitated 'g' and 'y').

Instead, use the **Structural Decoupling Technique** to achieve flawless GSAP Water Masks:
1. An **Invisible Structural Clone** that flows naturally and dictates the true line-height.
2. An **Absolute Overlay Mask** (`overflow-hidden`) that is 200% tall and 110% wide so it never clips descenders or italics, without pushing lines apart.
3. The **Animated Text** inside the mask, with massive internal padding (`pb-[1em]`) to prevent browser-level glyph clipping.

```jsx
{/* THE ULTIMATE WATER MASK (NO CLIPPING, NO LINE-HEIGHT SHIFTS) */}
<div className="inline-block relative mr-[2vw] align-bottom">
   
   {/* 1. Invisible Structural Clone (Dictates Layout & Baseline) */}
   <span className="invisible tracking-[-0.04em] text-[clamp(3.5rem,8vw,7.5rem)] font-bold">
      {t("anchorText")}
   </span>
   
   {/* 2. Absolute Mask (Decoupled from flow, massive boundaries) */}
   <div className="absolute top-0 -left-[5%] w-[110%] h-[200%] overflow-hidden px-[5%]">
      
      {/* 3. Animated Element (Padded to avoid browser glyph clipping, translates y: '2em' -> 0) */}
      <span className="ps-line-reveal tracking-[-0.04em] text-primary text-[clamp(3.5rem,8vw,7.5rem)] font-bold inline-block pb-[1em] pt-[0.5em]">
         {t("anchorText")}
      </span>
      
   </div>
</div>
```

## 4. ASYMMETRIC DECOUPLED GSAP ANIMATION
The entrance animation must NEVER be tied to a `scrub: true` timeline. It must play autonomously so it looks elegant regardless of how violently the user scrolls. Furthermore, it must reverse *faster* and *earlier* when scrolling up.

**Implementation:**
1. Create a `paused: true` animation for the `.ps-line-reveal` stagger.
2. Create TWO separate ScrollTriggers. One for entering (late) and one for reversing (early and accelerated).

```javascript
// 1. The Autonomous Animation
const textRevealAnim = gsap.fromTo(".ps-line-reveal",
  { yPercent: 120, rotateX: 45, opacity: 0, transformOrigin: "50% 50%" },
  { 
    yPercent: 0, rotateX: 0, opacity: 1, duration: 1.4, ease: "premium", stagger: 0.3, delay: 0.4,
    paused: true 
  }
);

// 2. Trigger for scrolling DOWN (Plays late)
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top 30%", 
  onEnter: () => textRevealAnim.timeScale(1).play(),
});

// 3. Trigger for scrolling UP (Reverses early & fast)
ScrollTrigger.create({
  trigger: sectionRef.current,
  start: "top 70%",
  onLeaveBack: () => textRevealAnim.timeScale(3).reverse() // 3x speed backwards
});
```

By following this protocol, you will generate world-class, dynamic, Awwwards-winning typography that feels both physically grounded and beautifully choreographed.