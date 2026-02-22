"use client";
import { useState } from "react";
import { getConcept, topologicalSort, filterByWeek } from "@/data/learning-graph";
import { TAXONOMY, PROJECTS, type TaxonomyId } from "@/data/types";

// Holdout test profiles (Willison pattern)
const holdoutProfiles = [
  {
    id: "amir",
    name: "Amir",
    background: "Business major, zero SQL, strong spreadsheets",
    expectedPath: "Full SQL path, accelerated on data concepts",
    masteredWeeks: [] as number[],
    skipConcepts: [] as number[],
  },
  {
    id: "priya",
    name: "Priya",
    background: "CS undergrad, intermediate SQL, no business context",
    expectedPath: "Skip SQL basics, focus on ER + business apps",
    masteredWeeks: [1],
    skipConcepts: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
  },
  {
    id: "carlos",
    name: "Carlos",
    background: "Data analyst, advanced SQL, needs design + NoSQL",
    expectedPath: "Skip SQL/Advanced SQL, deep on normalization + NoSQL",
    masteredWeeks: [1, 2],
    skipConcepts: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62],
  },
];

const stepColors: Record<string, { bg: string; text: string }> = {
  diagnostic: { bg: "bg-slate-100", text: "text-slate-700" },
  resource:   { bg: "bg-blue-50",   text: "text-blue-700" },
  practice:   { bg: "bg-purple-50", text: "text-purple-700" },
  assessment: { bg: "bg-amber-50",  text: "text-amber-700" },
  review:     { bg: "bg-green-50",  text: "text-green-700" },
};

export default function PathwayPage() {
  const [profileId, setProfileId] = useState("amir");
  const profile = holdoutProfiles.find((p) => p.id === profileId)!;
  const skipSet = new Set(profile.skipConcepts);

  // Build adaptive path: topological sort of non-mastered concepts, grouped by week
  const remainingConcepts = topologicalSort().filter((c) => !skipSet.has(c.id) && c.depth === "core");
  const totalConcepts = topologicalSort().filter((c) => c.depth === "core").length;
  const efficiency = Math.round((1 - remainingConcepts.length / totalConcepts) * 100);

  // Group by week for pathway steps
  const weekGroups = new Map<number, typeof remainingConcepts>();
  for (const c of remainingConcepts) {
    const group = weekGroups.get(c.week) ?? [];
    group.push(c);
    weekGroups.set(c.week, group);
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Adaptive Pathway</h1>
      <p className="text-sm text-gray-500 mb-6">
        Same 9 outcomes. Different paths through the graph based on prior knowledge.
      </p>

      {/* Profile selector */}
      <div className="flex flex-wrap gap-3 mb-8">
        {holdoutProfiles.map((p) => (
          <button
            key={p.id}
            onClick={() => setProfileId(p.id)}
            className={`px-4 py-3 rounded-xl text-left transition-all ${
              profileId === p.id
                ? "bg-[var(--navy)] text-white shadow-lg"
                : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300"
            }`}
          >
            <p className="font-semibold text-sm">{p.name}</p>
            <p className={`text-xs mt-0.5 ${profileId === p.id ? "text-white/70" : "text-gray-400"}`}>
              {p.background}
            </p>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Profile summary */}
        <div>
          <div className="card sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-1">{profile.name}</h3>
            <p className="text-xs text-gray-500 mb-3">{profile.background}</p>
            <p className="text-xs text-gray-600 mb-4">{profile.expectedPath}</p>

            <div className="space-y-2 border-t border-gray-100 pt-3">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Core concepts remaining</span>
                <span className="font-bold text-gray-900">{remainingConcepts.length} / {totalConcepts}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Weeks with content</span>
                <span className="font-bold text-gray-900">{weekGroups.size}</span>
              </div>
              {efficiency > 0 && (
                <p className="text-[10px] text-green-600">{efficiency}% more efficient than full path</p>
              )}
            </div>

            {/* Mastery gauge per week */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Week Progress</span>
              <div className="space-y-2 mt-2">
                {[1,2,3,4,5,6,7,8].map((w) => {
                  const weekTotal = filterByWeek(w).filter((c) => c.depth === "core").length;
                  const weekRemaining = weekGroups.get(w)?.length ?? 0;
                  const mastered = weekTotal - weekRemaining;
                  const pct = weekTotal > 0 ? Math.round((mastered / weekTotal) * 100) : 0;
                  return (
                    <div key={w}>
                      <div className="flex justify-between text-[10px] mb-0.5">
                        <span className="text-gray-500">Week {w}</span>
                        <span className="text-gray-400">{pct}%</span>
                      </div>
                      <div className="gauge-track">
                        <div
                          className="gauge-fill"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: pct === 100 ? "#22c55e" : pct > 0 ? "#f59e0b" : "#e2e8f0",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Pathway */}
        <div className="lg:col-span-2 space-y-4">
          {profile.masteredWeeks.length > 0 && (
            <div className="card bg-green-50 border-green-200">
              <div className="flex items-center gap-2">
                <span className="badge bg-green-100 text-green-700">Validated</span>
                <span className="text-sm text-green-800">
                  Weeks {profile.masteredWeeks.join(", ")} — mastery confirmed via diagnostic
                </span>
              </div>
            </div>
          )}

          {Array.from(weekGroups.entries()).map(([week, weekConcepts]) => {
            const firstConcept = weekConcepts[0];
            const tax = firstConcept ? TAXONOMY[firstConcept.taxonomyId] : null;
            return (
              <div key={week} className="card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                    style={{ backgroundColor: tax?.color ?? "#999" }}>
                    {week}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Week {week}</h4>
                    <p className="text-[10px] text-gray-400">{weekConcepts.length} concepts to cover</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {weekConcepts.map((c) => {
                    const t = TAXONOMY[c.taxonomyId];
                    return (
                      <span
                        key={c.id}
                        className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                        style={{ backgroundColor: t.color + "20", color: t.color }}
                        title={`#${c.id} ${c.label} (${c.spiralLevel})`}
                      >
                        {c.label}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 to-amber-50 rounded-xl border border-gray-200 p-8">
        <h3 className="font-bold text-gray-900 mb-3">Same Outcomes, Different Journeys</h3>
        <div className="grid sm:grid-cols-3 gap-6 mt-4">
          {holdoutProfiles.map((p) => {
            const skip = new Set(p.skipConcepts);
            const remaining = topologicalSort().filter((c) => !skip.has(c.id) && c.depth === "core").length;
            const eff = Math.round((1 - remaining / totalConcepts) * 100);
            return (
              <div key={p.id} className="text-sm">
                <p className="font-semibold text-gray-900">{p.name}</p>
                <p className="text-xs text-gray-500 mt-1">{remaining} / {totalConcepts} core concepts</p>
                {eff > 0 && <p className="text-xs text-green-600">{eff}% shorter path</p>}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          All three students must meet identical competency thresholds on all 9 outcomes. The rigor is the same — the route is personalized.
        </p>
      </div>
    </div>
  );
}
