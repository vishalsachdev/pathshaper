import resourcePool from "@/data/specs/resource-pool.json";
import { TAXONOMY } from "@/data/types";
import { filterByWeek } from "@/data/learning-graph";

export default function CanvasPage() {
  const modules = resourcePool.modules;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Canvas Manager</h1>
          <p className="text-sm text-gray-500">Course 56880 &middot; 8 weekly modules &middot; Canvas MCP integration</p>
        </div>
        <button className="px-4 py-2 bg-gray-100 text-gray-400 text-sm rounded-lg cursor-not-allowed" disabled>
          Sync All (coming soon)
        </button>
      </div>

      <div className="space-y-4">
        {modules.map((mod) => {
          const weekConcepts = filterByWeek(mod.week);
          const taxColors = mod.taxonomyIds.map((tid: string) => TAXONOMY[tid as keyof typeof TAXONOMY]);
          const itemTypes = mod.items.reduce((acc: Record<string, number>, item) => {
            acc[item.type] = (acc[item.type] || 0) + 1;
            return acc;
          }, {});

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
                  {mod.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 py-1">
                      <ItemTypeIcon type={item.type} />
                      <span className="text-xs text-gray-800 flex-1">{item.title}</span>
                      <span className="text-[10px] text-gray-400">{item.type}</span>
                    </div>
                  ))}
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
