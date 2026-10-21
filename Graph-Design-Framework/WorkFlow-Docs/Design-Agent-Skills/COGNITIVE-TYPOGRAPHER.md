---
name: Cognitive Typographer
description: Defines rhythm, tracking, text wrapping, fluid scaling, and accessibility rules for typography. Handles micro-aesthetics and reading behavior.
---

# 🧠 Agent Skill: THE COGNITIVE TYPOGRAPHER (Rhythm & Adaptive Reading)

**Level:** Editorial / Master-Class
**Objective:** Elevate typography from "looking good" to "breathing with the user." In Portfolio 2026, reading must be an effortless, immersive experience.

---

> *"Good typography is invisible. Outstanding typography is a silent rhythm that guides the mind."*

This skill defines the strict rules for text orchestration. The `Tokenizer.md` handles the *sizes*, but this skill handles the *behavior* and *micro-aesthetics* of the text.

Whenever you build a UI component involving reading (Headings, Paragraphs, Articles, Features), you MUST follow these Cognitive Typography laws:

## 1. THE LAWS OF TRACKING (Letter-Spacing)
Text density alters perception. You must mathematically adjust letter-spacing based on font size and weight.

*   **Massive Display Headlines (H1s > 4rem):** MUST read as a unified, solid object → negative tracking. ⚠️ En Portfolio 2026 los tokens display (`text-display-*`, `text-h*`) YA llevan el tracking negativo horneado — añadir `tracking-tighter` sobre un título tokenizado es VIOLACIÓN (Tokenizer §1.0). Tracking manual solo en monolitos cinéticos fuera de token (la firma shipped `font-black uppercase tracking-tighter`).
*   **Subheadings & Overlines (Small caps):** positive tracking obligatorio — ya horneado en los tokens: `text-overline` (0.1em), `text-ui-label` (0.05em). No añadir `tracking-widest` sobre el token.
*   **Body Text (Paragraphs):** Natural or slightly relaxed — los tokens body ya lo traen (0 a 0.01em; negativos sutiles en 2xl/xl). Never compress body text manualmente.

## 2. ORCHESTRATED LINE BREAKS (Text Wrapping)
Never let the browser randomly chop your elegant sentences.

*   **Headlines (H1, H2, H3):** MUST use `text-wrap: balance` (Tailwind: `text-balance`). This prevents awkward long lines with one single word hanging on the next line. (Los tokens display NO lo llevan horneado — añadir `text-balance` es la única adición permitida sobre un título tokenizado.)
*   **Paragraphs (Body):** `text-wrap: pretty` YA está horneado en todos los tokens `text-body-*`, `text-subtitle` y `text-caption` — no añadir `text-pretty` sobre ellos. This eliminates "Typographic Orphans" (a single word left alone on the last line of a paragraph).

## 3. ADAPTIVE RHYTHM (Fluid Typography)
Do not rely solely on standard media query breakpoints for typography sizing. Text must scale liquidly.

*   **Implementation:** ALL heading tokens use CSS `clamp()` with 3 control points:
    *   **Minimum:** The smallest the text can be (in `rem`)
    *   **Preferred:** Scales with viewport width (in `vw`)
    *   **Maximum:** The largest the text can be (in `rem`)
*   **Current token values (defined in `src/styles/globals.css` — SSOT: `Design-System.md`):**
    *   `.text-display-3xl`: `clamp(6rem, 12vw, 12rem)` (monolitos cinemáticos)
    *   `.text-display`: `clamp(2.5rem, 4vw, 3.5rem)`
    *   `.text-h1`: `clamp(1.75rem, 2.5vw, 2.25rem)`
    *   `.text-h3`: `clamp(1.25rem, 1.5vw, 1.5rem)`
    *   `.text-h4`: `clamp(1.1875rem, 1.25vw, 1.25rem)`
*   **`h5`-`h7`, Body y Label tokens** usan valores fijos en `rem` (do NOT scale with viewport — correct for readability).

## 4. THE LAW OF MEASURE (Optimal Line Length)
The human eye gets fatigued if lines are too long or too short.
*   **Paragraphs:** Constrain the maximum width of reading blocks to roughly 65-75 characters.
*   **Implementation:** Wrap body text in `max-w-prose` or explicitly limit the width of the container (`max-w-2xl`). Do not let a paragraph span 100% of a 1920px screen.

## 5. 🚨 THE LAW OF UNITS (px is FORBIDDEN for font-size)

> **This is the #1 source of bugs in the codebase. Enforce ruthlessly.**

*   **NEVER** use `px` for `font-size` in components or tokens.
*   **ALWAYS** use `rem`, `em`, `clamp()`, or Tailwind named classes (`text-base`, `text-sm`, `text-xs`).
*   `px` does NOT respect browser font-size preferences → breaks accessibility.
*   `rem` scales with the root font-size → respects user preferences.

### Quick px → rem Conversion Table

| px | rem | Token del DS (usar este, NUNCA el genérico de Tailwind) |
|:---|:---|:---|
| 7px | `0.4375rem` | — (declarar margen creativo) |
| 8px | `0.5rem` | — |
| 10px | `0.625rem` | — |
| 11px | `0.6875rem` | — |
| 12px | `0.75rem` | `text-caption` / `text-meta` (mono) — nunca `text-xs` |
| 13px | `0.8125rem` | `text-ui-label` (mono) |
| 14px | `0.875rem` | `text-body-sm` — nunca `text-sm` |
| 16px | `1rem` | `text-body` — nunca `text-base` |
| 18px | `1.125rem` | `text-body-lg` / `text-h5` — nunca `text-lg` |
| 20px | `1.25rem` | `text-body-xl` — nunca `text-xl` |

## 🤖 AI PROMPT DIRECTIVES
When generating text structures for Portfolio 2026:
1. *"Did I use any `text-[Xpx]` class? If yes, STOP and convert to `rem` immediately."*
2. *"Is the heading tokenized? If yes, DO NOT touch tracking/leading — the token carries them. Si es un monolito cinético sin token, `tracking-tighter` es la firma."*
3. *"Is the paragraph allowed to stretch infinitely? If yes, apply `max-w-prose`."*
4. *"Did I just write a multi-line headline? If yes, apply `text-balance`."*
5. *"Am I using a Design System token for this text? If not, why not?"*

