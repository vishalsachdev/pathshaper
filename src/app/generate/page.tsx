"use client";

import { useEffect, useState, useCallback } from "react";
import type { GenerationRequest, GenerationStatus, GenerationTarget } from "@/data/types";

// --------------- constants ---------------

const STATUS_COLORS: Record<GenerationStatus, { bg: string; text: string; label: string }> = {
  pending:    { bg: "bg-gray-100",   text: "text-gray-600",   label: "Pending" },
  generating: { bg: "bg-blue-100",   text: "text-blue-700",   label: "Generating" },
  review:     { bg: "bg-amber-100",  text: "text-amber-700",  label: "In Review" },
  approved:   { bg: "bg-green-100",  text: "text-green-700",  label: "Approved" },
  pushed:     { bg: "bg-purple-100", text: "text-purple-700", label: "Pushed" },
  rejected:   { bg: "bg-red-100",    text: "text-red-700",    label: "Rejected" },
};

const TARGET_ICONS: Record<GenerationTarget, { letter: string; color: string }> = {
  chapter:      { letter: "C", color: "bg-blue-100 text-blue-600" },
  overview:     { letter: "O", color: "bg-gray-200 text-gray-600" },
  quiz:         { letter: "Q", color: "bg-amber-100 text-amber-600" },
  studio_guide: { letter: "S", color: "bg-[var(--gold)]/20 text-[var(--gold)]" },
  lab:          { letter: "L", color: "bg-purple-100 text-purple-600" },
  discussion:   { letter: "D", color: "bg-green-100 text-green-600" },
  microsim:     { letter: "M", color: "bg-pink-100 text-pink-600" },
};

const TARGET_LABELS: Record<GenerationTarget, string> = {
  chapter: "Chapter",
  overview: "Overview",
  quiz: "Quiz",
  studio_guide: "Studio Guide",
  lab: "Lab / Rubric",
  discussion: "Discussion",
  microsim: "MicroSim",
};

const ALL_STATUSES: GenerationStatus[] = ["pending", "generating", "review", "approved", "pushed", "rejected"];
const ALL_TARGETS: GenerationTarget[] = ["chapter", "overview", "quiz", "studio_guide", "lab", "discussion", "microsim"];
const WEEKS = [1, 2, 3, 4, 5, 6, 7, 8];

const WEEK_THEMES: Record<number, string> = {
  1: "Relational Databases + SQL SELECT",
  2: "JOINs, Subqueries, Aggregation",
  3: "Data Modeling + ER Diagrams",
  4: "Python Fundamentals + pandas",
  5: "ETL Pipelines",
  6: "NoSQL + API Ingestion",
  7: "Cloud Databases + Optimization",
  8: "Quality, Governance + Synthesis",
};

// --------------- component ---------------

export default function GeneratePage() {
  const [requests, setRequests] = useState<GenerationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reviewNotes, setReviewNotes] = useState("");
  const [filterStatus, setFilterStatus] = useState<GenerationStatus | "all">("all");
  const [filterTarget, setFilterTarget] = useState<GenerationTarget | "all">("all");
  const [filterWeek, setFilterWeek] = useState<number | 0>(0);
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchLog = useCallback(async () => {
    const res = await fetch("/api/generate");
    const data = await res.json();
    setRequests(data.requests ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchLog(); }, [fetchLog]);

  const updateStatus = async (id: string, status: GenerationStatus, notes?: string) => {
    setUpdating(id);
    await fetch("/api/generate", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, ...(notes !== undefined && { reviewNotes: notes }) }),
    });
    await fetchLog();
    setUpdating(null);
  };

  // Derived data
  const filtered = requests.filter((r) => {
    if (filterStatus !== "all" && r.status !== filterStatus) return false;
    if (filterTarget !== "all" && r.target !== filterTarget) return false;
    if (filterWeek !== 0 && r.weekNumber !== filterWeek) return false;
    return true;
  });

  const counts = {
    total: requests.length,
    approved: requests.filter((r) => r.status === "approved" || r.status === "pushed").length,
    pending: requests.filter((r) => r.status === "pending").length,
    review: requests.filter((r) => r.status === "review").length,
    generating: requests.filter((r) => r.status === "generating").length,
  };

  const progressPct = counts.total > 0 ? Math.round((counts.approved / counts.total) * 100) : 0;

  const selected = requests.find((r) => r.id === selectedId) ?? null;

  // When selecting an item, load its review notes
  useEffect(() => {
    if (selected) setReviewNotes(selected.reviewNotes ?? "");
  }, [selected]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10">
        <p className="text-sm text-gray-400">Loading generation log...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Content Generation</h1>
      <p className="text-sm text-gray-500 mb-6">
        Track content items across 8 weeks. Review and approve before pushing to Canvas.
      </p>

      {/* ---- Summary bar ---- */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <SummaryCard label="Total" value={counts.total} color="text-gray-900" />
        <SummaryCard label="Approved" value={counts.approved} color="text-green-600" />
        <SummaryCard label="Pending" value={counts.pending} color="text-gray-500" />
        <SummaryCard label="In Review" value={counts.review} color="text-amber-600" />
        <div className="card flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-[var(--navy)]">{progressPct}%</span>
          <div className="gauge-track w-full mt-1">
            <div className="gauge-fill bg-green-500" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      {/* ---- Filters ---- */}
      <div className="flex flex-wrap gap-2 mb-6">
        <FilterSelect
          label="Status"
          value={filterStatus}
          onChange={(v) => setFilterStatus(v as GenerationStatus | "all")}
          options={[{ value: "all", label: "All statuses" }, ...ALL_STATUSES.map((s) => ({ value: s, label: STATUS_COLORS[s].label }))]}
        />
        <FilterSelect
          label="Type"
          value={filterTarget}
          onChange={(v) => setFilterTarget(v as GenerationTarget | "all")}
          options={[{ value: "all", label: "All types" }, ...ALL_TARGETS.map((t) => ({ value: t, label: TARGET_LABELS[t] }))]}
        />
        <FilterSelect
          label="Week"
          value={String(filterWeek)}
          onChange={(v) => setFilterWeek(Number(v))}
          options={[{ value: "0", label: "All weeks" }, ...WEEKS.map((w) => ({ value: String(w), label: `Week ${w}` }))]}
        />
      </div>

      {/* ---- Main area: week cards + sidebar ---- */}
      <div className="flex gap-6">
        {/* Week cards */}
        <div className="flex-1 space-y-4">
          {WEEKS.map((week) => {
            const weekItems = filtered.filter((r) => r.weekNumber === week);
            if (weekItems.length === 0) return null;
            return (
              <div key={week} className="card">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--navy)] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {week}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">Week {week}</h3>
                    <p className="text-[10px] text-gray-400">{WEEK_THEMES[week]}</p>
                  </div>
                  <span className="ml-auto text-xs text-gray-400">
                    {weekItems.filter((r) => r.status === "approved" || r.status === "pushed").length}/{weekItems.length} done
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2 space-y-1">
                  {weekItems.map((item) => {
                    const icon = TARGET_ICONS[item.target] ?? { letter: "?", color: "bg-gray-100 text-gray-500" };
                    const badge = STATUS_COLORS[item.status];
                    const isSelected = selectedId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedId(isSelected ? null : item.id)}
                        className={`w-full flex items-center gap-3 py-1.5 px-2 rounded-lg text-left transition-colors ${
                          isSelected ? "bg-blue-50 ring-1 ring-blue-200" : "hover:bg-gray-50"
                        }`}
                      >
                        <span className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center flex-shrink-0 ${icon.color}`}>
                          {icon.letter}
                        </span>
                        <span className="text-xs text-gray-800 flex-1 truncate">{item.title}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${badge.bg} ${badge.text}`}>
                          {badge.label}
                        </span>
                        {/* Quick actions */}
                        {item.status === "pending" && (
                          <ActionBtn
                            label="Review"
                            disabled={updating === item.id}
                            onClick={(e) => { e.stopPropagation(); updateStatus(item.id, "review"); }}
                          />
                        )}
                        {item.status === "review" && (
                          <ActionBtn
                            label="Approve"
                            disabled={updating === item.id}
                            onClick={(e) => { e.stopPropagation(); updateStatus(item.id, "approved"); }}
                            variant="green"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="card text-center py-10 text-sm text-gray-400">
              No items match the current filters.
            </div>
          )}
        </div>

        {/* ---- Sidebar ---- */}
        <div className="w-80 flex-shrink-0 hidden lg:block">
          {selected ? (
            <div className="card sticky top-24">
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center ${TARGET_ICONS[selected.target]?.color ?? "bg-gray-100 text-gray-500"}`}>
                  {TARGET_ICONS[selected.target]?.letter ?? "?"}
                </span>
                <h3 className="text-sm font-bold text-gray-900 flex-1">{selected.title}</h3>
              </div>

              <div className="space-y-2 text-xs text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="font-medium">{TARGET_LABELS[selected.target]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Week</span>
                  <span className="font-medium">{selected.weekNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className={`px-2 py-0.5 rounded-full font-medium ${STATUS_COLORS[selected.status].bg} ${STATUS_COLORS[selected.status].text}`}>
                    {STATUS_COLORS[selected.status].label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Updated</span>
                  <span className="font-medium">{new Date(selected.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Review notes */}
              <label className="block text-[10px] text-gray-400 uppercase tracking-wider mb-1">Review Notes</label>
              <textarea
                className="w-full border border-gray-200 rounded-lg p-2 text-xs text-gray-700 mb-3 focus:outline-none focus:ring-1 focus:ring-blue-300"
                rows={3}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Add review notes..."
              />

              {/* Sidebar actions */}
              <div className="flex gap-2">
                {selected.status === "pending" && (
                  <button
                    className="flex-1 text-xs py-1.5 rounded-lg bg-amber-50 text-amber-700 font-medium hover:bg-amber-100 transition-colors disabled:opacity-50"
                    disabled={updating === selected.id}
                    onClick={() => updateStatus(selected.id, "review", reviewNotes)}
                  >
                    Mark Reviewed
                  </button>
                )}
                {(selected.status === "pending" || selected.status === "review") && (
                  <button
                    className="flex-1 text-xs py-1.5 rounded-lg bg-green-50 text-green-700 font-medium hover:bg-green-100 transition-colors disabled:opacity-50"
                    disabled={updating === selected.id}
                    onClick={() => updateStatus(selected.id, "approved", reviewNotes)}
                  >
                    Approve
                  </button>
                )}
                {selected.status === "approved" && (
                  <button className="flex-1 text-xs py-1.5 rounded-lg bg-gray-100 text-gray-400 cursor-not-allowed" disabled>
                    Push to Canvas (coming soon)
                  </button>
                )}
                <button
                  className="text-xs py-1.5 px-3 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  disabled={updating === selected.id}
                  onClick={() => updateStatus(selected.id, selected.status, reviewNotes)}
                >
                  Save Notes
                </button>
              </div>
            </div>
          ) : (
            <div className="card text-center py-10">
              <p className="text-sm text-gray-400">Select an item to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --------------- sub-components ---------------

function SummaryCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="card flex flex-col items-center justify-center py-3">
      <span className={`text-2xl font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</span>
    </div>
  );
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex items-center gap-1.5 text-xs text-gray-500">
      {label}:
      <select
        className="border border-gray-200 rounded-md px-2 py-1 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-blue-300"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </label>
  );
}

function ActionBtn({
  label,
  disabled,
  onClick,
  variant = "amber",
}: {
  label: string;
  disabled: boolean;
  onClick: (e: React.MouseEvent) => void;
  variant?: "amber" | "green";
}) {
  const colors = variant === "green"
    ? "bg-green-50 text-green-700 hover:bg-green-100"
    : "bg-amber-50 text-amber-700 hover:bg-amber-100";
  return (
    <button
      className={`text-[10px] px-2 py-0.5 rounded font-medium transition-colors disabled:opacity-50 ${colors}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
