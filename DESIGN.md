# Design System Reference

The design language of this portfolio, written so an agent (or a person) can build new UI in this
style without reading the source. Every token and class named here exists in
`tailwind.config.mjs` or `src/styles/global.css`.

**Feed this file to Claude Design** (or any UI-building agent) as project context before asking
for new sections or pages.

---

## 1. The shape of the system

- **Tailwind v4**, loaded with `@import "tailwindcss"` in `src/styles/global.css`, driven by a
  v3-style JS config bound with `@config "../../tailwind.config.mjs"`.
- Because of that binding, **the tokens below are real Tailwind utility names** — write
  `bg-accent`, `text-ink-muted`, `border-ink-faint`. They are not CSS custom properties; there is
  no `var(--*)` vocabulary in this system.
- **Dark only.** There is no light mode, no theme toggle, and no `dark:` variant anywhere in the
  codebase. Never emit one. The palette is warm amber on near-black.
- Opacity modifiers on tokens are idiomatic and used constantly: `bg-bg-card/30`,
  `border-accent/30`, `text-accent/40`, `bg-accent/10`.
- Fonts load from Google Fonts via `@import` at the top of `global.css`. Skill icons come from the
  Devicon CDN stylesheet linked in `src/layouts/Base.astro`.

---

## 2. Tokens

### Surfaces

| Utility | Value | Use |
|---|---|---|
| `bg-bg` | `#0d0d0d` | Page background |
| `bg-bg-card` | `#141414` | Cards and raised surfaces |
| `bg-bg-hover` | `#1a1a1a` | Hover state for surfaces |

### Accent

| Utility | Value | Use |
|---|---|---|
| `accent` | `#e8a04a` | Primary accent — amber/gold |
| `accent-dim` | `#a06828` | Muted accent |
| `accent-glow` | `#e8a04a33` | **Shadows only**, via `theme(colors.accent.glow)` |

### Ink (text and borders)

| Utility | Value | Use |
|---|---|---|
| `ink` | `#f0ece4` | Primary text |
| `ink-muted` | `#8a8378` | Secondary/body text |
| `ink-faint` | `#3a3530` | Borders and dividers — **not** text |

### Type

| Utility | Stack | Use |
|---|---|---|
| `font-display` | Playfair Display, Georgia, serif | Headings, name, card titles |
| `font-mono` | JetBrains Mono, Consolas, monospace | Eyebrows, metadata, tags, buttons |
| `font-body` | DM Sans, sans-serif | Body copy (the `body` default) |

`text-2xs` (`0.65rem`) is the custom step below `text-xs` — the eyebrow/metadata size. It is
nearly always paired with `font-mono` + `tracking-widest` (or `tracking-[0.2em]` /
`tracking-[0.25em]`) + `uppercase`.

### Animation

| Utility | Timing |
|---|---|
| `animate-fade-up` | `fadeUp 0.6s ease forwards` — opacity 0 + `translateY(18px)` → settled |
| `animate-fade-in` | `fadeIn 0.4s ease forwards` |
| `animate-pulse-dot` | `pulseDot 2s ease-in-out infinite` — opacity + scale breathing, for status dots |

The `@keyframes` live **outside** `@layer` in `global.css` deliberately, so they aren't purged.
Keep any new keyframes outside `@layer` too.

---

## 3. Component classes

Seven classes defined in `@layer components` in `src/styles/global.css`. Prefer these over
re-deriving their utility strings.

### `.section-label`

Eyebrow above a section title. `font-mono text-2xs tracking-[0.25em] uppercase text-accent mb-2`.
Used as `<p class="section-label">What I've shipped</p>`. Add `mb-0` to neutralize its margin when
it sits in a flex row (as in the drawer header).

### `.section-title`

`font-display text-4xl md:text-5xl text-ink leading-tight`. The `<h2>` of every section. Carries no
bottom margin — pair with `mb-3` (when an intro paragraph follows) or `mb-12` (when content
follows directly).

### `.card-base`

The surface primitive: `bg-bg-card border border-ink-faint rounded-2xl`, with
`transition-all duration-300` and a hover state of `hover:border-accent/40` plus an amber glow
`hover:shadow-[0_0_24px_theme(colors.accent.glow)]`. It sets **no padding** — always add your own
(`p-6` is the norm).

### `.tag`

Small pill for keywords: `font-mono text-2xs tracking-wider uppercase px-2 py-0.5 rounded-full`
with an `ink-faint` border and `ink-muted` text, going accent on hover.

### `.btn-primary`

Filled CTA: `inline-flex items-center gap-2`, `font-mono text-sm tracking-widest uppercase`,
`px-6 py-3 rounded-full`, `bg-accent text-bg font-medium`, with an amber glow on hover. Shrink it
for compact contexts by overriding — `class="btn-primary py-2 px-4 text-xs"` is the established
pattern (see the nav résumé button).

### `.btn-outline`

Same geometry as `.btn-primary`, but `border border-accent text-accent` with a
`hover:bg-accent/10` wash. The secondary action.

### `.stagger`

Put on a **container**; its direct children fade up in sequence. Children start at `opacity: 0` and
run `fadeUp 0.6s ease forwards` with delays of `0.05s / 0.12s / 0.19s / 0.26s / 0.33s / 0.40s`.

⚠️ **Only the first 6 children are covered.** Child 7 and beyond stay at `opacity: 0` — invisible.
Don't put `.stagger` on a container that can hold more than six items unless you extend the ramp
in `global.css`.

---

## 4. Base layer

Facts set globally in `global.css` that new markup inherits:

- `body` is `bg-bg text-ink font-body antialiased`, plus a fixed amber wash:
  `radial-gradient(ellipse 80% 50% at 50% -10%, #e8a04a0d 0%, transparent 70%)`. Sections should be
  transparent or use `bg-bg-card/30` so this shows through — don't paint an opaque `bg-bg` over it.
- `html { scroll-behavior: smooth }` — in-page `#anchor` links glide. The nav depends on this.
- `::selection` is `bg-accent text-bg`.
- Scrollbars are 4px, `bg-bg` track, `bg-ink-faint` rounded thumb.

---

## 5. Composition patterns

Each of these is lifted from a section that ships, so they're known-good.

### Section shell

```html
<section id="skills" class="py-24 px-6">
  <div class="max-w-5xl mx-auto">
    …
  </div>
</section>
```

`py-24 px-6` outside, `max-w-5xl mx-auto` inside — every section, no exceptions. Sections
**alternate**: plain (transparent) and banded with `bg-bg-card/30`. The live order is Hero (plain)
→ Skills (plain) → Experience (banded) → Posts (plain) → Hobbies (banded) → Footer (bordered).
The Hero is the one variant: `min-h-screen flex items-center pt-24 pb-16 px-6`, the `pt-24`
clearing the fixed nav.

### Section header triad

```html
<p class="section-label">Where I've been</p>
<h2 class="section-title mb-3">Experience</h2>
<p class="text-ink-muted mb-12 max-w-lg">One or two sentences, kept narrow.</p>
```

Eyebrow → display title → muted intro capped at `max-w-lg`. If there's no intro paragraph, the
title takes `mb-12` instead of `mb-3`.

### Card grid with hover lift

```html
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
  <article class="card-base p-6 flex flex-col gap-4 group cursor-pointer
                  hover:-translate-y-1 transition-transform duration-200">
    <h3 class="font-display text-xl text-ink leading-snug mb-2
               group-hover:text-accent transition-colors duration-300">Title</h3>
    <p class="text-ink-muted text-sm leading-relaxed">Summary.</p>
  </article>
</div>
```

`gap-5` for card grids. The `group` + `group-hover:text-accent` title shift is the signature
interaction — `.card-base` already handles the border and glow. Cards lift `-translate-y-1`;
smaller chips lift `-translate-y-0.5`.

### Numbered card index

Posts prefix each card with a mono counter that lights up on hover:

```html
<span class="font-mono text-xs text-accent/40 group-hover:text-accent transition-colors">01</span>
```

### Timeline

```html
<div class="relative pl-6 border-l border-ink-faint space-y-10 stagger">
  <div class="relative">
    <div class="absolute -left-[1.65rem] top-1.5 w-3 h-3 rounded-full
                border-2 border-accent bg-bg"></div>
    <div class="card-base p-6">…</div>
  </div>
</div>
```

The `-left-[1.65rem]` offset is what centers the ring on the rail — keep it if you keep `pl-6`.

### Glass nav bar

```html
<header class="fixed top-0 left-0 right-0 z-50 px-6 py-4">
  <nav class="max-w-5xl mx-auto flex items-center justify-between
              bg-bg/60 backdrop-blur-xl border border-ink-faint/50 rounded-2xl px-5 py-3">
```

Nav links are `font-mono text-xs tracking-widest uppercase text-ink-muted` with
`hover:text-accent transition-colors`.

### Pills and chips

Bordered, not filled — `font-mono text-2xs` (or `text-xs`), `border border-ink-faint`,
`rounded-full px-3 py-1`. Used for the job period, the location chip, and the availability badge.
The availability badge adds a live dot:

```html
<div class="inline-flex items-center gap-2 font-mono text-xs text-accent
            border border-accent/30 rounded-full px-3 py-1 bg-accent/5">
  <span class="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot"></span>
  Available for opportunities
</div>
```

### Icon tile

For an emoji or glyph beside card text:

```html
<div class="flex-shrink-0 w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20
            flex items-center justify-center text-2xl
            group-hover:bg-accent/20 transition-colors duration-300">🔧</div>
```

### "Read →" affordance

Every clickable card ends with a quiet mono cue that warms on hover:

```html
<span class="flex items-center gap-1 font-mono text-2xs text-ink-muted/40
             group-hover:text-accent/70 transition-colors whitespace-nowrap">
  Read
  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
</span>
```

### Icons

Inline SVG only — no icon library. Always `fill="none" stroke="currentColor" stroke-width="2"
viewBox="0 0 24 24"`, sized `w-3 h-3` / `w-3.5 h-3.5` / `w-4 h-4`. Inheriting `currentColor` is
what makes icons follow every hover transition for free. (Skill icons are the exception: Devicon
classes on an `<i>`, e.g. `<i class="devicon-react-original colored text-2xl"></i>`.)

### Modal + backdrop

```html
<div id="drawer-backdrop"
     class="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm opacity-0 pointer-events-none
            transition-opacity duration-300"></div>

<aside class="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6
              pointer-events-none opacity-0 scale-95 transition-all duration-300
              ease-[cubic-bezier(0.32,0.72,0,1)]">
  <div class="relative w-full h-full sm:h-auto sm:max-h-full max-w-4xl bg-bg-card
              border-0 sm:border border-ink-faint sm:rounded-2xl
              flex flex-col overflow-hidden shadow-2xl">
```

Open/close by toggling `opacity-0 scale-95 pointer-events-none`, never by mounting/unmounting.
Full-bleed on mobile, inset and rounded from `sm:` up. `z-40` backdrop, `z-50` panel — the nav is
also `z-50`, so the backdrop deliberately sits under it.

### Long-form typography (`.prose-content`)

Rendered markdown gets the `.prose-content` class, defined in a global `<style>` block in
`PostDrawer.astro`. Its scale, for reference when writing content or extending it:

- Body `1rem` / `line-height: 1.75` in `ink-muted`; paragraphs `mb-1.25rem`
- `h2` `1.5rem`, `h3` `1.25rem` — both Playfair in `ink`, `margin-top: 2rem`
- Links in `accent` with `text-underline-offset: 3px`; `strong` in `ink`
- `pre` on `#141414` with an `ink-faint` border, `rounded-0.75rem`, `0.8125rem` mono
- Inline `code` in `accent`; when not inside `pre`, it also gets the dark chip background
- `blockquote`: 3px `accent/40` left border, italic, `ink-muted`
- Images, iframes, video: full width, `rounded-0.75rem`, `ink-faint` border

---

## 6. Rules

1. **Use tokens, never raw hex.** `bg-bg-card`, not `bg-[#141414]`.
2. **Accent is punctuation, not fill.** It carries eyebrows, links, hover states, one CTA, and
   thin borders. Large amber areas are off-style — the only filled accent surface is
   `.btn-primary`.
3. **`ink-faint` is a border color.** Text at that value is unreadable; the exception is the
   deliberately near-invisible footer fine print.
4. **Radii**: `rounded-2xl` for cards and bars, `rounded-3xl` for the avatar frame,
   `rounded-full` for buttons, pills, tags, and dots.
5. **Transitions**: `duration-200` for transforms and small hovers, `duration-300` for colors,
   glows, and modals. Always name what transitions (`transition-colors`, `transition-transform`)
   rather than defaulting to `transition-all`.
6. **Width and rhythm**: `max-w-5xl` content column, `py-24` section rhythm, `gap-5` card grids,
   `max-w-lg` for intro prose.
7. **Don't add a light mode or `dark:` variants.**
8. **Mind the `.stagger` 6-child limit** (§3) before wrapping a long list in it.

### Known inconsistency — don't copy it

`src/components/PostDrawer.astro:38` hardcodes `bg-[#111]` for the modal panel where the token
`bg-bg-card` (`#141414`) is intended. The snippet in §5 above shows the corrected form. This is
noted, not fixed — if you touch that file, switching it to `bg-bg-card` is a safe cleanup.

---

## 7. Worked example

A complete new section, built only from the vocabulary above:

```html
<section id="writing" class="py-24 px-6 bg-bg-card/30">
  <div class="max-w-5xl mx-auto">

    <p class="section-label">Longer form</p>
    <h2 class="section-title mb-3">Writing</h2>
    <p class="text-ink-muted mb-12 max-w-lg">
      Essays and notes that outgrew a project write-up.
    </p>

    <div class="grid md:grid-cols-2 gap-5 stagger">
      <article class="card-base p-6 flex flex-col gap-4 group cursor-pointer
                      hover:-translate-y-1 transition-transform duration-200">
        <span class="font-mono text-xs text-accent/40 group-hover:text-accent transition-colors">
          01
        </span>

        <div class="flex-1">
          <h3 class="font-display text-xl text-ink leading-snug mb-2
                     group-hover:text-accent transition-colors duration-300">
            On debugging by deletion
          </h3>
          <p class="text-ink-muted text-sm leading-relaxed">
            The fastest way to find a bug is often to remove everything that isn't it.
          </p>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex flex-wrap gap-1.5">
            <span class="tag">Process</span>
            <span class="tag">Debugging</span>
          </div>
          <span class="flex items-center gap-1 font-mono text-2xs text-ink-muted/40
                       group-hover:text-accent/70 transition-colors ml-2 whitespace-nowrap">
            Read
            <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2"
                 viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </article>
    </div>

  </div>
</section>
```

---

## Source of truth

| What | Where |
|---|---|
| Tokens (colors, fonts, sizes, animations) | `tailwind.config.mjs` |
| Component classes and base layer | `src/styles/global.css` |
| Long-form typography | the `<style is:global>` block in `src/components/PostDrawer.astro` |
| Site content and data | `src/config.ts`, `src/content/` |

If this doc and those files disagree, the files win — update this doc.
