# Design System Strategy: Industrial Precision

## 1. Overview & Creative North Star
**Creative North Star: "The Kinetic Press"**
This design system moves away from static, boxy layouts to emulate the high-speed, high-precision environment of a modern industrial printing house. We are not building a generic dark-mode site; we are crafting a digital machine. 

To break the "template" look, the system utilizes **Intentional Asymmetry**. Hero sections should feature oversized, bleeding typography that goes off-canvas, paired with "Ink-Trap" inspired spacing. By overlapping vibrant orange accents over deep, layered charcoal surfaces, we create a sense of tactile depth—as if the UI was freshly printed on premium heavy-stock paper.

---

## 2. Colors & Surface Architecture
The palette is rooted in the "Industrial Dark" aesthetic, where depth is defined by material weight rather than light sources.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. Use `surface-container-low` (#1C1B1B) for secondary sections sitting on a `surface` (#131313) background. This creates a "machined" look where parts fit together seamlessly without artificial separation.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers. 
- **Base Layer:** `surface` (#131313) for the main canvas.
- **Nested Content:** Use `surface-container` (#201F1F) for cards.
- **Elevated Interactive Elements:** Use `surface-container-high` (#2A2A2A) to indicate "pressable" surfaces.

### The "Glass & Gradient" Rule
To avoid a flat, "dead" dark theme, use **Glassmorphism** for floating navigation and modals. 
- **Effect:** Apply `surface_variant` at 60% opacity with a `24px` backdrop blur.
- **Signature Textures:** For primary CTAs, do not use flat orange. Use a subtle linear gradient from `primary` (#FFB693) to `primary_container` (#FF6B00) at a 135-degree angle to simulate the sheen of wet ink.

---

## 3. Typography
The typography system balances the technical precision of industrial engineering with the elegance of editorial design.

*   **Display Scale (Space Grotesk):** Our "Power" font. Use `display-lg` (3.5rem) for headlines. The wide apertures and geometric construction of Space Grotesk mirror the mechanical nature of printing presses.
*   **Body Scale (Manrope):** Our "Utility" font. Manrope’s high legibility at `body-md` (0.875rem) ensures technical specifications and service descriptions remain crystal clear against high-contrast backgrounds.
*   **Tonal Authority:** Use `primary` (#FFB693) for key headlines to pull the eye, but keep descriptions in `on_surface_variant` (#E2BFB0) to maintain a sophisticated, low-strain reading experience.

---

## 4. Elevation & Depth
In this system, depth is a result of **Tonal Layering**, not structural scaffolding.

*   **The Layering Principle:** Stack `surface-container-lowest` (#0E0E0E) cards onto `surface-container-low` (#1C1B1B) backgrounds to create a "recessed" effect, mimicking the specialized trays of a printing press.
*   **Ambient Shadows:** If a floating element (like a quote calculator) is required, use a massive `48px` blur at 8% opacity using the `on_surface` color. This creates a natural "glow" rather than a dirty drop shadow.
*   **The "Ghost Border" Fallback:** If accessibility requires a container boundary, use the `outline_variant` token at 15% opacity. **Never use 100% opaque lines.**
*   **Kinetic Motion:** Elements should "slide" into place using `cubic-bezier(0.2, 0.8, 0.2, 1)` to mimic the smooth, heavy movement of industrial machinery.

---

## 5. Components

### Buttons (The "Actuators")
*   **Primary:** Gradient of `primary` to `primary_container`. High-contrast `on_primary_container` text. Use `rounded-md` (0.375rem) for a sharp, professional corner.
*   **Secondary:** Ghost style. No background, `secondary` (#FFF3D2) text, with a `secondary_fixed_dim` 10% opacity "ghost border" on hover.

### Chips (Material Tags)
*   **Style:** Use `surface_container_highest` backgrounds with `label-md` text. For selected states, use the vibrant `secondary_container` (#FDD400) to mimic high-vis industrial markings.

### Input Fields
*   **Visual Style:** Recessed. Use `surface_container_lowest` (#0E0E0E) as the background. On focus, the bottom border "grows" from the center using the `primary` (#FFB693) color. No side or top borders.

### Cards & Lists (The "Stack")
*   **Forbid Dividers:** Do not use lines between list items. Use `spacing-6` (1.5rem) of vertical whitespace or a subtle toggle between `surface-container` and `surface-container-low`.

### Specialized Component: The "Ink Level" Progress Bar
*   For order tracking or process steps, use a thick `12px` bar. The track should be `surface_container_highest`, and the fill should be a glowing gradient of `primary_container` (#FF6B00), suggesting a physical filling of ink.

---

## 6. Do's and Don'ts

### Do:
*   **DO** use extreme scale. Pair `display-lg` typography with `body-sm` labels for a modern, editorial high-low contrast.
*   **DO** use "Ink Bleed" imagery—high-resolution macros of ink, paper textures, and metal machinery that overlap multiple surface containers.
*   **DO** leverage the `secondary` (Yellow) palette exclusively for "Action" and "Attention" items, like pricing or "Live Status" indicators.

### Don't:
*   **DON'T** use pure white (#FFFFFF). It shatters the premium dark atmosphere. Always use `on_surface` (#E5E2E1).
*   **DON'T** use rounded-full (pills) for buttons. It feels too "soft" and consumer-tech. Stick to `rounded-md` or `rounded-lg` for an industrial feel.
*   **DON'T** use standard grid-row borders. If you need to separate content, use a background color shift of 2-3% luminosity.