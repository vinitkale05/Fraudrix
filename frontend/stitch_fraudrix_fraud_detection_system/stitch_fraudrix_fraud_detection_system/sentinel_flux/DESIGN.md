---
name: Sentinel Flux
colors:
  surface: '#121414'
  surface-dim: '#121414'
  surface-bright: '#38393a'
  surface-container-lowest: '#0c0f0f'
  surface-container-low: '#1a1c1c'
  surface-container: '#1e2020'
  surface-container-high: '#282a2b'
  surface-container-highest: '#333535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#c3c9b2'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#2f3131'
  outline: '#8d937e'
  outline-variant: '#434937'
  surface-tint: '#9fd842'
  primary: '#b1eb53'
  on-primary: '#223600'
  primary-container: '#96ce39'
  on-primary-container: '#375500'
  inverse-primary: '#456800'
  secondary: '#c8c6c3'
  on-secondary: '#31302e'
  secondary-container: '#474744'
  on-secondary-container: '#b7b5b1'
  tertiary: '#d1d9f3'
  on-tertiary: '#283044'
  tertiary-container: '#b5bdd7'
  on-tertiary-container: '#444c62'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#baf55c'
  primary-fixed-dim: '#9fd842'
  on-primary-fixed: '#121f00'
  on-primary-fixed-variant: '#334f00'
  secondary-fixed: '#e5e2de'
  secondary-fixed-dim: '#c8c6c3'
  on-secondary-fixed: '#1c1c1a'
  on-secondary-fixed-variant: '#474744'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#121414'
  on-background: '#e2e2e2'
  surface-variant: '#333535'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  h1:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.25'
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  mono:
    fontFamily: monospace
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.5'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  grid_columns: '12'
  grid_gutter: 20px
  grid_margin: 32px
---

## Brand & Style

The design system is engineered for the high-stakes environment of enterprise financial security. It balances a sense of absolute stability with the agility of artificial intelligence. The aesthetic is **Corporate Modern**, prioritizing clarity, density, and precision.

The brand personality is authoritative yet unobtrusive, acting as a powerful lens through which analysts view complex data. It utilizes a "Dark Mode First" philosophy for the core analytical engine to reduce eye strain during long investigation sessions, though it maintains a robust light variant for executive reporting. Visual elements are defined by sharp execution, purposeful whitespace, and a high-contrast utility that ensures critical alerts are never missed.

## Colors

The color architecture of this design system is built on a foundation of deep, sophisticated neutrals to provide maximum contrast for data visualization. 

- **Primary:** The lime-green (#96CE39) acts as a high-visibility accent, used sparingly for primary actions and to represent AI-driven "health" and "activation."
- **Foundation:** Deep navies and cool grays create a layered environment. The darkest tones are used for the primary canvas, while progressively lighter grays define UI containers and borders.
- **Semantic Logic:** Status colors are non-negotiable and strictly enforced. Emerald represents low-risk/verified states, Amber indicates suspicious patterns requiring review, and a high-chroma Red is reserved exclusively for confirmed fraud or critical system failures.
- **Surface Tiers:** Neutral grays are used to separate background levels, with #1D1D1B serving as the primary surface color in dark mode.

## Typography

This design system utilizes **Inter** for all UI elements to ensure maximum legibility across dense data tables and complex analytical dashboards. 

The type hierarchy is designed to support rapid scanning. Headlines use tighter letter spacing and heavier weights to anchor sections, while body text maintains a generous line height for readability. A specialized "Label" style using uppercase and tracking is reserved for metadata and small categorizations. For transaction IDs, IP addresses, and code snippets, a monospaced fallback is employed to prevent character confusion.

## Layout & Spacing

The design system employs a **12-column fluid grid** system to accommodate various monitor sizes, from analyst laptops to wall-mounted security screens. 

- **The 4px Rule:** All spacing and sizing must be a multiple of 4px (4, 8, 12, 16, 24, etc.) to maintain a consistent rhythm.
- **Data Density:** In core analytical views, use "sm" (8px) and "md" (16px) spacing to maximize information density. In settings or landing pages, use "lg" and "xl" to allow the design to breathe.
- **Structure:** Vertical layouts should prioritize a clear top-to-bottom hierarchy, with global navigation on a fixed left-hand sidebar to preserve vertical space for data lists.

## Elevation & Depth

Visual hierarchy is established through **Tonal Layering** and **Low-Contrast Outlines** rather than heavy shadows. This keeps the interface feeling flat, technical, and modern.

- **Background:** The lowest layer (Level 0) is the darkest neutral.
- **Containers:** Level 1 surfaces (cards, sidebars) use a slightly lighter gray with a subtle 1px border (#ffffff at 10% opacity) to define edges.
- **Popovers/Modals:** Only high-priority elements like dropdowns or modals use elevation. These utilize a deep, diffused ambient shadow with 0% spread to imply they are floating above the workspace.
- **Active State:** The primary color is used as a 2px "glow" or border-left accent to indicate the currently selected item or active focus.

## Shapes

The shape language is **Soft (0.25rem)**. This slight rounding takes the edge off the "brutalist" corporate aesthetic, making the system feel modern and refined without becoming playful.

- **Standard Elements:** Buttons, input fields, and tags use the base 4px (0.25rem) radius.
- **Large Containers:** Cards and main panel areas use the "rounded-lg" (8px) setting for a distinct containment feel.
- **Interactive Indicators:** Small circular pips are used for status indicators (Low/Med/High risk) to distinguish them from rectangular UI components.

## Components

The components in the design system are built for utility and high-frequency interaction.

- **Buttons:** Primary buttons are solid #96CE39 with black text. Secondary buttons are ghost-style with subtle outlines.
- **Status Chips:** Small, high-contrast badges with a subtle background tint and a solid 6px dot of the status color (Emerald/Amber/Red).
- **Data Tables:** The most critical component. Tables must feature fixed headers, zebra-striping on hover only, and condensed row heights (32px or 40px).
- **Input Fields:** Dark-themed inputs with a 1px border. On focus, the border transitions to the primary lime-green with a subtle outer glow.
- **Risk Score Cards:** Large-format cards displaying a numerical score (0-100) using the Display typography, color-coded based on the risk threshold.
- **AI Insight Panels:** Specific components that use a subtle gradient border to indicate "AI-generated" content, separating machine logic from raw data.