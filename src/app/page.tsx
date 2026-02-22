import Link from "next/link";
import { concepts, getTaxonomyStats, coreConcepts, studioConcepts } from "@/data/learning-graph";
import { TAXONOMY } from "@/data/types";
import courseSpec from "@/data/specs/course-spec.json";
import resourcePool from "@/data/specs/resource-pool.json";

export default function Dashboard() {
  const stats = getTaxonomyStats();
  const core = coreConcepts();
  const studio = studioConcepts();
  const outcomes = courseSpec.outcomes;
  const modules = resourcePool.modules;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">BADM 554 — Data Foundations</h1>
        <p className="text-sm text-gray-500 mt-1">
          Fall 2026 &middot; 8 weeks &middot; MSBAi &middot; Canvas {courseSpec.canvasCourseId}
        </p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Concepts" value={concepts.length} sub={`${core.length} core + ${studio.length} studio`} />
        <StatCard label="Outcomes" value={outcomes.length} sub="3 L / 4 C / 2 E" />
        <StatCard label="Modules" value={modules.length} sub="8 weeks" />
        <StatCard label="Resources" value={resourcePool.resources.length} sub="chapters, videos, labs" />
      </div>

      {/* Navigation cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <NavCard
          href="/specs"
          title="Course Specs"
          description="Outcomes, misconceptions, evidence types, guardrails"
          badge="Faculty"
          badgeClass="badge-faculty"
          count={`${outcomes.length} outcomes, ${courseSpec.misconceptions.length} misconceptions, ${courseSpec.guardrails.length} guardrails`}
        />
        <NavCard
          href="/graph"
          title="Learning Graph"
          description="Concept DAG with taxonomy filtering"
          badge="Graph"
          badgeClass="badge-ai"
          count={`${concepts.length} concepts, 8 taxonomies`}
        />
        <NavCard
          href="/generate"
          title="Content Generation"
          description="Generate chapters, quizzes, MicroSims via Claude Code skills"
          badge="AI"
          badgeClass="badge-ai"
          count="0 generated"
        />
        <NavCard
          href="/canvas"
          title="Canvas Manager"
          description="View, create, and push modules to Canvas 56880"
          badge="Canvas"
          badgeClass="badge-human"
          count={`${modules.length} weekly modules`}
        />
        <NavCard
          href="/student/pathway"
          title="Student Pathway"
          description="Adaptive pathway viewer for student profiles"
          badge="Student"
          badgeClass="badge-learner"
          count="3 holdout profiles"
        />
        <NavCard
          href="/student/progress"
          title="Student Progress"
          description="Mastery gauges per outcome from Supabase"
          badge="Student"
          badgeClass="badge-learner"
          count="Connected to survey bot"
        />
      </div>

      {/* Taxonomy distribution */}
      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-4">Concept Distribution by Taxonomy</h2>
        <div className="space-y-2">
          {(Object.keys(TAXONOMY) as (keyof typeof TAXONOMY)[]).map((key) => {
            const tax = TAXONOMY[key];
            const s = stats[key];
            const pct = Math.round((s.total / concepts.length) * 100);
            return (
              <div key={key} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: tax.color }}
                />
                <span className="text-xs font-medium text-gray-700 w-40 truncate">{tax.name}</span>
                <div className="flex-1 gauge-track">
                  <div
                    className="gauge-fill"
                    style={{ width: `${pct}%`, backgroundColor: tax.color }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-20 text-right">
                  {s.total} ({s.core}c + {s.studio}s)
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8-week timeline */}
      <div className="mt-8 card">
        <h2 className="font-semibold text-gray-900 mb-4">8-Week Course Timeline</h2>
        <div className="space-y-3">
          {modules.map((mod) => {
            const taxColors = mod.taxonomyIds.map((tid: string) => TAXONOMY[tid as keyof typeof TAXONOMY]?.color).filter(Boolean);
            return (
              <div key={mod.week} className="flex items-start gap-4 py-2 border-b border-gray-50 last:border-0">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                  {mod.week}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">{mod.theme}</span>
                    {taxColors.map((color: string, i: number) => (
                      <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    ))}
                    {mod.project && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold">
                        P{mod.project}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {mod.studioTopic}
                  </p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">
                  {mod.items.length} items
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string; value: number | string; sub: string }) {
  return (
    <div className="card text-center">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
    </div>
  );
}

function NavCard({ href, title, description, badge, badgeClass, count }: {
  href: string; title: string; description: string; badge: string; badgeClass: string; count: string;
}) {
  return (
    <Link href={href} className="card block group">
      <div className="flex items-center gap-2 mb-2">
        <span className={`badge ${badgeClass}`}>{badge}</span>
        <h3 className="font-semibold text-gray-900 group-hover:text-[var(--navy)]">{title}</h3>
      </div>
      <p className="text-xs text-gray-500 mb-2">{description}</p>
      <p className="text-[10px] text-gray-400">{count}</p>
    </Link>
  );
}
