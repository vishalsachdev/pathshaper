"use client";

import { useEffect, useState } from "react";
import resourcePool from "@/data/specs/resource-pool.json";
import { TAXONOMY } from "@/data/types";
import { filterByWeek } from "@/data/learning-graph";
import type { GenerationRequest } from "@/data/types";

// Map module item types to generation targets for cross-referencing
const TYPE_TO_TARGET: Record<string, string> = {
  overview: "overview",
  reading: "chapter",
  video: "chapter",
  lab: "lab",
  quiz: "quiz",
  discussion: "discussion",
  studio: "studio_guide",
  project: "lab",
};

function getStatusDot(
  itemType: string,
  weekNumber: number,
  genRequests: GenerationRequest[]
): { color: string; title: string } {
  const target = TYPE_TO_TARGET[itemType];
  if (!target) return { color: "bg-gray-300", title: "No generation target" };

  // Find matching generation request for this week + target type
  const match = genRequests.find(
    (r) => r.target === target && r.weekNumber === weekNumber
  );

  if (!match) return { color: "bg-gray-300", title: "Not yet generated" };

  if (match.status === "approved" || match.status === "pushed") {
    return { color: "bg-green-400", title: `Content ${match.status}` };
  }
  if (match.status === "review" || match.status === "generating") {
    return { color: "bg-amber-400", title: `Content ${match.status}` };
  }
  return { color: "bg-gray-300", title: `Content ${match.status}` };
}

export default function CanvasPage() {
  const modules = resourcePool.modules;
  const [genRequests, setGenRequests] = useState<GenerationRequest[]>([]);

  useEffect(() => {
    fetch("/api/generate")
      .then((res) => res.json())
      .then((data) => setGenRequests(data.requests ?? []))
      .catch(() => {});
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Canvas Manager</h1>
          <p className="text-sm text-gray-500">Course 56880 &middot; 8 weekly modules &middot; Canvas MCP integration</p>
        </div>
        <div className="flex items-center gap-3">
          <Legend />
          <button className="px-4 py-2 bg-gray-100 text-gray-400 text-sm rounded-lg cursor-not-allowed" disabled>
            Sync All (coming soon)
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {modules.map((mod) => {
          const weekConcepts = filterByWeek(mod.week);
          const taxColors = mod.taxonomyIds.map((tid: string) => TAXONOMY[tid as keyof typeof TAXONOMY]);
          return (
            <div key={mod.week} className="card">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-full bg-[var(--navy)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {mod.week}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-gray-900">{mod.theme}</h3>
                    {taxColors.map((tax) => (
                      <span key={tax.id} className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tax.color }} title={tax.name} />
                    ))}
                    {mod.project && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold">
                        Project {mod.project}
                      </span>
                    )}
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold">
                      AIAS {mod.aiasLevel}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{mod.textbookChapter} &middot; {weekConcepts.length} concepts</p>
                </div>
                <span className="text-xs text-gray-400">{"canvasModuleId" in mod ? `Canvas #${(mod as Record<string, unknown>).canvasModuleId}` : "Not pushed"}</span>
              </div>

              {/* Module items */}
              <div className="border-t border-gray-100 pt-3">
                <div className="grid gap-2">
                  {mod.items.map((item) => {
                    const dot = getStatusDot(item.type, mod.week, genRequests);
                    return (
                      <div key={item.id} className="flex items-center gap-3 py-1">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot.color}`} title={dot.title} />
                        <ItemTypeIcon type={item.type} />
                        <span className="text-xs text-gray-800 flex-1">{item.title}</span>
                        <span className="text-[10px] text-gray-400">{item.type}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Studio callout */}
              <div className="mt-3 pt-3 border-t border-gray-50">
                <p className="text-[10px] text-gray-400">
                  <span className="font-semibold">Studio:</span> {mod.studioTopic}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ItemTypeIcon({ type }: { type: string }) {
  const colors: Record<string, string> = {
    overview: "bg-gray-200 text-gray-600",
    reading: "bg-blue-100 text-blue-600",
    video: "bg-blue-100 text-blue-600",
    lab: "bg-purple-100 text-purple-600",
    quiz: "bg-amber-100 text-amber-600",
    discussion: "bg-green-100 text-green-600",
    studio: "bg-[var(--gold)]/20 text-[var(--gold)]",
    project: "bg-red-100 text-red-600",
  };
  const c = colors[type] ?? "bg-gray-100 text-gray-500";
  return (
    <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 ${c}`}>
      {type.charAt(0).toUpperCase()}
    </span>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-3 text-[10px] text-gray-400">
      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-400" /> Approved</span>
      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400" /> In Review</span>
      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300" /> Pending</span>
    </div>
  );
}
