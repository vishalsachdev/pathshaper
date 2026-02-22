"use client";
import { useState } from "react";
import courseSpec from "@/data/specs/course-spec.json";
import { TAXONOMY } from "@/data/types";
import { getConcept } from "@/data/learning-graph";

type Tab = "outcomes" | "misconceptions" | "evidence" | "guardrails";

const LCE_COLORS: Record<string, { bg: string; text: string }> = {
  literacy:   { bg: "bg-blue-50",   text: "text-blue-700" },
  competency: { bg: "bg-green-50",  text: "text-green-700" },
  expertise:  { bg: "bg-purple-50", text: "text-purple-700" },
};

const FREQ_COLORS: Record<string, string> = {
  Common: "text-red-600",
  Occasional: "text-amber-600",
  Rare: "text-gray-500",
};

export default function SpecsPage() {
  const [tab, setTab] = useState<Tab>("outcomes");

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Course Specs</h1>
      <p className="text-sm text-gray-500 mb-6">
        What faculty define. Agents read these specs — they never modify them.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 border-b border-gray-200">
        {(["outcomes", "misconceptions", "evidence", "guardrails"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors capitalize ${
              tab === t
                ? "border-[var(--navy)] text-[var(--navy)]"
                : "border-transparent text-gray-400 hover:text-gray-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "outcomes" && <OutcomesTab />}
      {tab === "misconceptions" && <MisconceptionsTab />}
      {tab === "evidence" && <EvidenceTab />}
      {tab === "guardrails" && <GuardrailsTab />}
    </div>
  );
}

function OutcomesTab() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {courseSpec.outcomes.map((o) => {
        const lce = LCE_COLORS[o.lceLevel] ?? LCE_COLORS.literacy;
        const isOpen = expanded === o.id;
        return (
          <button
            key={o.id}
            onClick={() => setExpanded(isOpen ? null : o.id)}
            className={`w-full text-left card transition-all ${isOpen ? "ring-2 ring-[var(--navy)]/20" : ""}`}
          >
            <div className="flex items-center gap-3">
              <span className={`badge ${lce.bg} ${lce.text}`}>{o.lceLevel.charAt(0).toUpperCase()}</span>
              <span className="text-xs font-mono text-gray-400">{o.id}</span>
              <span className="text-sm font-medium text-gray-900 flex-1">{o.title}</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                {o.bloomLevel}
              </span>
            </div>
            {isOpen && (
              <div className="mt-3 pt-3 border-t border-gray-100 animate-in">
                <p className="text-xs text-gray-600 mb-3">{o.description}</p>
                <div className="mb-3">
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Threshold</span>
                  <p className="text-xs text-gray-700 mt-0.5">{o.competencyThreshold}</p>
                </div>
                <div className="mb-2">
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Weeks</span>
                  <div className="flex gap-1 mt-1">
                    {o.weekMapping.map((w: number) => (
                      <span key={w} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 font-mono">W{w}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Concepts ({o.conceptIds.length})</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {o.conceptIds.slice(0, 10).map((cid: number) => {
                      const c = getConcept(cid);
                      const tax = c ? TAXONOMY[c.taxonomyId as keyof typeof TAXONOMY] : null;
                      return (
                        <span
                          key={cid}
                          className="text-[10px] px-1.5 py-0.5 rounded font-mono"
                          style={tax ? { backgroundColor: tax.color + "20", color: tax.color } : {}}
                          title={c?.label}
                        >
                          {c?.label ?? `#${cid}`}
                        </span>
                      );
                    })}
                    {o.conceptIds.length > 10 && (
                      <span className="text-[10px] text-gray-400">+{o.conceptIds.length - 10} more</span>
                    )}
                  </div>
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function MisconceptionsTab() {
  return (
    <div className="space-y-3">
      {courseSpec.misconceptions.map((m) => (
        <div key={m.id} className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xs font-mono text-gray-400">{m.id}</span>
            <span className={`text-xs font-semibold ${FREQ_COLORS[m.frequency] ?? ""}`}>{m.frequency}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">
              {m.outcomeId}
            </span>
          </div>
          <p className="text-sm text-gray-900 font-medium mb-2">&ldquo;{m.description}&rdquo;</p>
          <div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Remediation</span>
            <p className="text-xs text-gray-600 mt-0.5">{m.remediation}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function EvidenceTab() {
  return (
    <div className="space-y-3">
      {courseSpec.evidenceTypes.map((e) => (
        <div key={e.id} className="card">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-xs font-mono text-gray-400">{e.id}</span>
            <span className="text-sm font-medium text-gray-900">{e.type}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500">{e.outcomeId}</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
              e.rigorLevel === "Advanced" ? "bg-purple-50 text-purple-700" :
              e.rigorLevel === "Proficient" ? "bg-green-50 text-green-700" :
              "bg-gray-50 text-gray-600"
            }`}>{e.rigorLevel}</span>
          </div>
          <p className="text-xs text-gray-600">{e.description}</p>
          <p className="text-[10px] text-gray-400 mt-1">Canvas: {e.canvasAssignmentType}</p>
        </div>
      ))}
    </div>
  );
}

function GuardrailsTab() {
  const categoryColors: Record<string, string> = {
    FERPA: "bg-red-50 text-red-700",
    Integrity: "bg-amber-50 text-amber-700",
    Rigor: "bg-blue-50 text-blue-700",
    Accreditation: "bg-green-50 text-green-700",
    AI_Constraints: "bg-purple-50 text-purple-700",
  };

  return (
    <div className="space-y-3">
      {courseSpec.guardrails.map((g) => (
        <div key={g.id} className="card">
          <div className="flex items-center gap-3 mb-2">
            <span className={`badge ${categoryColors[g.category] ?? "bg-gray-50 text-gray-600"}`}>
              {g.category.replace("_", " ")}
            </span>
            <span className="text-sm font-medium text-gray-900">{g.title}</span>
          </div>
          <p className="text-xs text-gray-600 mb-2">{g.description}</p>
          <div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">Enforcement</span>
            <p className="text-xs text-gray-700 mt-0.5">{g.enforcement}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
