# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

PathShaper is a proof-of-concept prototype for **Learning 3.0** — an adaptive learning architecture where faculty act as "shapers on the path" rather than content deliverers. Built for the Gies College of Business Disruption Lab.

The prototype delivers 5 artifacts: conceptual architecture, a worked example (Financial Statement Analysis MBA module), faculty workflow artifacts, learner experience mockups, and a governance/rigor framework.

**This is a conceptual prototype, not a production system.** It demonstrates the Learning 3.0 model with realistic but fictional course data.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint (Next.js config)
```

Deployed to Vercel — pushes to `main` trigger automatic deployments.

## Architecture

**Stack**: Next.js 15 / React 19 / TypeScript (strict) / Tailwind CSS 4 / App Router

**Path alias**: `@/*` maps to `./src/*`

### Route → Deliverable Mapping

| Route | Deliverable | Rendering |
|-------|-------------|-----------|
| `/` | Overview + navigation hub | Static |
| `/architecture` | Three-layer system diagram (Faculty → AI → Learner) | Static |
| `/example` | Worked example with outcomes, misconceptions, evidence, resources | Static |
| `/workflow` | Faculty Define / AI Adapts / Human Judgment matrix | Static |
| `/learner` | Interactive learner profiles with adaptive pathways | Client (`"use client"`) |
| `/governance` | AACSB alignment + governance framework | Static |

Only `/learner` uses client-side interactivity (profile selection, step expansion). All other pages are statically rendered.

### Data Layer

All course content lives in `src/data/worked-example.ts` — a single file exporting typed data:

- **TypeScript interfaces**: `LearningOutcome`, `Misconception`, `EvidenceType`, `Resource`, `LearnerProfile`, `PathStep`
- **Course data**: 5 outcomes (Bloom's-aligned), 5 misconceptions, 8 evidence types, 12 resources
- **3 learner profiles** (Sarah/Raj/Ming) with prior knowledge scores and recommended path steps
- **Governance framework**: 5 sections with mechanisms

To add a new worked example or modify the existing one, edit this file. All pages import from it.

### Styling

- Tailwind CSS 4 via `@tailwindcss/postcss` (no `tailwind.config.ts` — uses CSS-first config)
- Custom CSS variables in `globals.css`: `--navy`, `--gold`, `--slate`, `--sage`, `--rose`, `--sky`
- Custom utility classes: `.card`, `.badge`, `.badge-faculty`, `.badge-ai`, `.badge-human`, `.badge-learner`, `.layer`, `.gauge-track`, `.pathway-node`
- Design system uses navy/gold palette (Gies-adjacent)

### Components

Single shared component: `src/app/components/Nav.tsx` — sticky navigation with responsive mobile menu using native `<details>` element.
