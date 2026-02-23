# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

PathShaper 554 is the **production pilot** of the Learning 3.0 adaptive learning architecture for **BADM 554: Data Foundations** (MSBAi, Fall 2026). Faculty act as "shapers on the path" — they define intent via NLSpec files, agents generate content, faculty approves, content pushes to Canvas.

**Two-phase model**:
1. **Instructor phase**: Faculty specifies intent → agents build/customize the course
2. **Student phase**: Course delivered → agents personalize from learner's perspective

## Commands

```bash
npm run dev      # Start dev server (localhost:3000 or 3001 if occupied)
npm run build    # Production build
npm run lint     # ESLint (Next.js config)
```

Deployed to Vercel — pushes to `main` trigger automatic deployments.

## Architecture

**Stack**: Next.js 15 / React 19 / TypeScript (strict) / Tailwind CSS 4 / App Router

**Path alias**: `@/*` maps to `./src/*`

### Route Map

| Route | Purpose | Rendering |
|-------|---------|-----------|
| `/` | Dashboard — stats, taxonomy distribution, 8-week timeline | Static |
| `/specs` | NLSpec viewer — outcomes, misconceptions, evidence, guardrails (tabbed) | Client |
| `/graph` | Learning graph — vis-network DAG, taxonomy/week filters, detail panel | Client |
| `/generate` | Generation dashboard — 39 content items, status tracking, approve workflow | Client |
| `/canvas` | Canvas 56880 module manager — 8 weekly modules with generation readiness dots | Client |
| `/student/pathway` | Adaptive pathway — 3 holdout profiles, mastery gauges, concept timeline | Client |
| `/student/progress` | Student progress (Phase 3 stub) | Static |
| `/student/practice` | Personalized practice (Phase 3 stub) | Static |

### Data Layer

**`src/data/types.ts`** — Complete type system:
- 8 taxonomy categories: FOUND, SQL, MODEL, PYTHON, ETL, NOSQL, CLOUD, GOVERN
- Key types: `Concept`, `LearningOutcome` (Bloom's + L-C-E), `WeeklyModule`, `Project`, `StudentProfile`, `PathStep`
- Constants: `TAXONOMY` (colors, weeks, projects), `PROJECTS` (3 progressive projects with AIAS levels)

**`src/data/learning-graph.ts`** — 186-concept DAG (169 core + 17 studio):
- Embedded typed array with graph traversal utilities
- `getConcept()`, `getPrerequisites()`, `getDependents()`, `topologicalSort()`, `filterByTaxonomy()`, `filterByWeek()`, etc.
- **Core** = durable knowledge in videos (long shelf life)
- **Studio** = applied project skills, tool demos, AI workflows (short shelf life, "I do, we do, you do")

**`src/data/specs/`** — NLSpec JSON files (faculty-defined, agent-read):
- `course-spec.json` — 9 L-C-E outcomes, 8 misconceptions, 10 evidence types, 8 guardrails
- `resource-pool.json` — 23 resources, 8 weekly modules with full item lists
- `generation-log.json` — 39 content items (8 chapters, 8 overviews, 6 quizzes, 8 studio guides, 7 labs/rubrics, 2 discussions)

### Key Design Decisions

- **L-C-E + Bloom's**: MSBAi uses Literacy-Competency-Expertise framework. We keep both: `bloomLevel` for granularity, `lceLevel` for program alignment.
- **Core vs Studio**: Core concepts appear in videos (durable). Studio concepts scaffold project deliverables (tool demos, AI workflows, pair exercises). Studios are the personalization surface for different student profiles.
- **Spiral tagging**: Each concept has `spiralLevel`: `introduce` (first seen), `practice` (applied in project), `deepen` (revisited in later MSBAi courses like BADM 558, FIN 550).
- **3 Projects**: P1 (SQL Portfolio, AIAS 1), P2 (Data Model, AIAS 2), P3 (Full Stack + Oral Defense, AIAS 3).
- **AIAS levels**: AI Assessment Integration Scale 0-3 per assignment, controlling permitted AI use.

### Styling

- Tailwind CSS 4 via `@tailwindcss/postcss` (no `tailwind.config.ts` — CSS-first config)
- Custom CSS variables in `globals.css`: `--navy`, `--gold`, `--slate`, `--sage`, `--rose`, `--sky`
- Custom utility classes: `.card`, `.badge`, `.gauge-track`, `.gauge-fill`, `.layer`, `.pathway-node`
- Design system uses navy/gold palette (Gies-adjacent)

### Components

**API Routes** (`src/app/api/`):
- `GET /api/generate` — returns full generation log JSON
- `PATCH /api/generate` — updates single request by id: `{ id, status, reviewNotes? }`

### Components

Single shared component: `src/app/components/Nav.tsx` — sticky navigation with instructor section (Dashboard, Specs, Graph, Generate, Canvas) and student section (Pathway, Progress, Practice).

### External Dependencies

- `vis-network` / `vis-data` — Graph visualization (dynamic import, client-only)
- `@supabase/supabase-js` — Student profiles (Phase 3, not yet connected)

### Related Repos

| Repo | Role |
|------|------|
| `@teaching/database-management` | Intelligent textbook, original 231-concept graph, 8 labs |
| `@code/badm554-bot` | WhatsApp AI tutor (production) |
| `@code/badm554-survey-bot` | Survey bot (68 sessions, skill profiles) |
| `@admin/msba-online` | MSBAi degree planning, Fall 2026 curriculum |

## Current Focus

Phase 2 generation dashboard complete. Next: content generation (Ch 4-8) + Canvas push integration.

## Roadmap

- [x] Phase 0: Types, learning graph, NLSpec JSON files, Supabase dep
- [x] Phase 1: Instructor cockpit UI (all routes built)
- [x] Phase 2: Generation dashboard + Canvas sync readiness (39 items, API route, approve workflow)
- [ ] Phase 2b: Content generation (chapters 4-8 via Dan McCreary skills)
- [ ] Phase 3: Student phase (Supabase integration, real adaptive pathways)
- [ ] Phase 4: Bot enhancement (concept-map.json in bot knowledge base)
- [ ] Phase 5: Integration testing (e2e, holdout scenarios, FERPA audit)

## Session Log

- **2025-02-22**: Phase 0 + Phase 1 complete. Built types.ts (243 lines), learning-graph.ts (~420 lines, 186 concepts), 3 NLSpec JSON files, all 8 routes, updated Nav. Key pivot: rebuilt graph for 8-week format (was 15-week), corrected studio concept semantics. Committed to main (17 files, 2533 insertions).
