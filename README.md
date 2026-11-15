# Asmit Vishwakarma — Portfolio

A single-page design portfolio built with **Next.js (App Router) + React**.
The original static HTML/CSS/JS site was migrated component-by-component, so
the layout, typography, theme switching and micro-interactions are unchanged.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, static export)
- React 19
- Plain CSS (one global stylesheet, kept from the original design)
- Sora + Inter (Google Fonts) and Font Awesome via CDN

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Build the static site into `out/` |
| `npm run preview` | Serve the built `out/` folder locally with `npx serve out` |

## Project structure

```
app/
  layout.js        Root layout, metadata, theme bootstrap script, global effects
  page.js          Page composition (Navbar → Hero → … → Footer)
  globals.css      All styles from the original style.css
  icon.ico         Favicon (from Media/Bitmap.ico)
components/
  Navbar.jsx       Desktop liquid-glass island nav + theme toggle
  MobileDock.jsx   Mobile bottom dock
  Hero.jsx         Hero copy, actions and marquee
  HeroPortrait.jsx Portrait with cursor gaze + scroll tilt
  RoleRotor.jsx    Cycling hero role word
  Roles.jsx        "Creative roles" rows (filter the Work section)
  Experience.jsx   WeFrameTech experience block
  WftGrid.jsx      NDA client-work cards
  About.jsx        Bio, skills and social links
  Projects.jsx     Filterable project grid + modal triggers
  Footer.jsx       Contact CTA, video and footer links
  effects/         Cursor, reveal-on-scroll, scroll progress/velocity, magnet buttons
  providers/       Theme, nav scroll-spy, project filter and modal contexts
lib/
  data.js          All copy, links, skills and project data
  asset.js         Base-path aware asset helper
  motion.js        Shared per-frame motion value
public/Media/      Images, SVGs, video and icons
legacy/            The original index.html / style.css / script.js (reference only)
```

### Editing content

Almost everything you would want to change lives in **`lib/data.js`** — nav
links, roles, projects, WeFrameTech client cards, skills, social links and
contact details. Components read from there, so no markup edits are needed.

## Interactions

The vanilla JS from `script.js` was rewritten as React:

- **Theme** — `ThemeProvider` writes `data-theme` on `<html>`, persists to
  `localStorage` and a tiny inline script in `layout.js` applies it before paint
  (no flash of the wrong theme).
- **Reveals** — `RevealObserver` keeps the original reversible
  `[data-reveal]` blur/fade using a shared `IntersectionObserver`.
- **Scroll** — `ScrollProgress` and `ScrollVelocity` update the reading
  progress bar and the global `--sv` tilt variable.
- **Filtering** — `FilterProvider` shares the active category between the role
  rows and the Work grid; cards replay their stagger-in animation.
- **Modal** — `ProjectModalProvider` renders one accessible dialog (Escape,
  backdrop click, focus trap entry, focus restoration, body scroll lock).
- **Cursor / portrait / magnetic buttons** — desktop-only pointer effects,
  skipped for touch devices and `prefers-reduced-motion`.

## Deployment (GitHub Pages)

The site uses `output: 'export'`, so `npm run build` produces a fully static
`out/` folder. `.github/workflows/static.yml` builds and deploys it on every
push to `main`.

Because GitHub Pages *project* sites are served from `/<repo>/`, the workflow
sets `NEXT_PUBLIC_BASE_PATH=/${{ github.event.repository.name }}` at build
time. `lib/asset.js` prefixes every file in `public/` with that value, so local
development (empty base path) and GitHub Pages both work without changes.

If you switch to a custom domain or a `<user>.github.io` repository, the
workflow detects the latter automatically; for a custom domain just leave
`NEXT_PUBLIC_BASE_PATH` empty.

> In the repository **Settings → Pages**, make sure the source is set to
> **GitHub Actions**.
