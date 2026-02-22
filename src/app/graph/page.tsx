"use client";
import { useEffect, useRef, useState } from "react";
import { concepts, getConcept, getPrerequisites, getDependents, filterByTaxonomy, filterByWeek } from "@/data/learning-graph";
import { TAXONOMY, type TaxonomyId } from "@/data/types";

interface SelectedConcept {
  id: number;
  label: string;
  taxonomyId: TaxonomyId;
  week: number;
  depth: string;
  spiralLevel: string;
  dependencies: number[];
}

export default function GraphPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<unknown>(null);
  const [selected, setSelected] = useState<SelectedConcept | null>(null);
  const [filterTax, setFilterTax] = useState<TaxonomyId | "all">("all");
  const [filterWeek, setFilterWeek] = useState<number | 0>(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dynamic import of vis-network (client-only)
    Promise.all([
      import("vis-network/standalone"),
    ]).then(([vis]) => {
      const filtered = concepts.filter((c) => {
        if (filterTax !== "all" && c.taxonomyId !== filterTax) return false;
        if (filterWeek > 0 && c.week !== filterWeek) return false;
        return true;
      });

      const filteredIds = new Set(filtered.map((c) => c.id));

      const nodes = filtered.map((c) => {
        const tax = TAXONOMY[c.taxonomyId];
        return {
          id: c.id,
          label: c.label,
          group: c.taxonomyId,
          color: {
            background: tax.color,
            border: tax.color,
            highlight: { background: tax.color, border: "#000" },
          },
          font: { color: tax.fontColor, size: 11 },
          shape: c.depth === "studio" ? "diamond" : "dot",
          size: c.depth === "studio" ? 8 : 12,
          title: `#${c.id} ${c.label}\nWeek ${c.week} | ${c.depth} | ${c.spiralLevel}`,
        };
      });

      const edges = filtered.flatMap((c) =>
        c.dependencies
          .filter((depId) => filteredIds.has(depId))
          .map((depId) => ({
            from: depId,
            to: c.id,
            arrows: "to",
            color: { color: "#ddd", highlight: "#999" },
          }))
      );

      const data = { nodes, edges };
      const options = {
        layout: {
          hierarchical: {
            enabled: true,
            direction: "LR",
            sortMethod: "directed",
            levelSeparation: 120,
            nodeSpacing: 30,
          },
        },
        physics: false,
        interaction: {
          hover: true,
          tooltipDelay: 100,
        },
        nodes: {
          borderWidth: 1,
        },
        edges: {
          smooth: { enabled: true, type: "cubicBezier", roundness: 0.5 },
        },
      };

      if (networkRef.current) {
        (networkRef.current as { destroy: () => void }).destroy();
      }

      const network = new vis.Network(containerRef.current!, data, options);
      networkRef.current = network;
      setReady(true);

      network.on("selectNode", (params: { nodes: number[] }) => {
        const nodeId = params.nodes[0];
        const c = getConcept(nodeId);
        if (c) setSelected(c);
      });

      network.on("deselectNode", () => setSelected(null));
    });

    return () => {
      if (networkRef.current) {
        (networkRef.current as { destroy: () => void }).destroy();
      }
    };
  }, [filterTax, filterWeek]);

  const prereqs = selected ? getPrerequisites(selected.id) : [];
  const deps = selected ? getDependents(selected.id) : [];

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Graph</h1>
          <p className="text-sm text-gray-500">{concepts.length} concepts &middot; 8 taxonomies &middot; click a node for details</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">Taxonomy</label>
          <div className="flex flex-wrap gap-1">
            <FilterButton
              active={filterTax === "all"}
              onClick={() => setFilterTax("all")}
              label="All"
            />
            {(Object.keys(TAXONOMY) as TaxonomyId[]).map((tid) => (
              <FilterButton
                key={tid}
                active={filterTax === tid}
                onClick={() => setFilterTax(tid)}
                label={tid}
                color={TAXONOMY[tid].color}
              />
            ))}
          </div>
        </div>
        <div>
          <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider block mb-1">Week</label>
          <div className="flex gap-1">
            <FilterButton active={filterWeek === 0} onClick={() => setFilterWeek(0)} label="All" />
            {[1,2,3,4,5,6,7,8].map((w) => (
              <FilterButton key={w} active={filterWeek === w} onClick={() => setFilterWeek(w)} label={`${w}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-2">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-gray-400" /> Core concept</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gray-400 rotate-45" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} /> Studio skill</span>
      </div>

      <div className="flex gap-4">
        {/* Graph container */}
        <div
          ref={containerRef}
          className="flex-1 border border-gray-200 rounded-xl bg-white"
          style={{ height: 600 }}
        />

        {/* Detail panel */}
        {selected && (
          <div className="w-72 flex-shrink-0">
            <div className="card sticky top-20">
              <div className="flex items-center gap-2 mb-3">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: TAXONOMY[selected.taxonomyId]?.color }}
                />
                <span className="text-xs font-mono text-gray-400">#{selected.id}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  selected.depth === "studio" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-600"
                }`}>{selected.depth}</span>
              </div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{selected.label}</h3>
              <p className="text-xs text-gray-500 mb-3">
                Week {selected.week} &middot; {TAXONOMY[selected.taxonomyId]?.name} &middot; {selected.spiralLevel}
              </p>

              {prereqs.length > 0 && (
                <div className="mb-3">
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Prerequisites ({prereqs.length})</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {prereqs.map((p) => (
                      <span key={p.id} className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700">
                        {p.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {deps.length > 0 && (
                <div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Dependents ({deps.length})</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {deps.map((d) => (
                      <span key={d.id} className="text-[10px] px-1.5 py-0.5 rounded bg-green-50 text-green-700">
                        {d.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterButton({ active, onClick, label, color }: {
  active: boolean; onClick: () => void; label: string; color?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 text-[10px] font-semibold rounded transition-colors ${
        active
          ? "bg-[var(--navy)] text-white"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
    >
      {color && <span className="inline-block w-2 h-2 rounded-full mr-1" style={{ backgroundColor: color }} />}
      {label}
    </button>
  );
}
