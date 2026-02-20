"use client";
import { useState } from "react";
import { learnerProfiles, outcomes, type LearnerProfile, type PathStep } from "@/data/worked-example";

const stepColors: Record<PathStep["type"], { bg: string; border: string; text: string; label: string }> = {
  diagnostic: { bg: "bg-slate-100", border: "border-slate-300", text: "text-slate-700", label: "Diagnostic" },
  resource: { bg: "bg-blue-50", border: "border-blue-300", text: "text-blue-700", label: "Resource" },
  practice: { bg: "bg-purple-50", border: "border-purple-300", text: "text-purple-700", label: "Practice" },
  assessment: { bg: "bg-amber-50", border: "border-amber-300", text: "text-amber-700", label: "Assessment" },
  review: { bg: "bg-green-50", border: "border-green-300", text: "text-green-700", label: "Review" },
};

export default function Learner() {
  const [selectedProfile, setSelectedProfile] = useState<LearnerProfile>(learnerProfiles[0]);
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <p className="text-sm font-semibold text-purple-600 tracking-widest uppercase mb-2">Deliverable 04</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Learner Experience Mockup</h1>
      <p className="text-gray-500 mb-10 max-w-2xl">
        Three learners with different backgrounds receive personalized pathways to the same five outcomes.
        Same standards — different journeys.
      </p>

      {/* Profile Selector */}
      <div className="flex flex-wrap gap-3 mb-10">
        {learnerProfiles.map((profile) => (
          <button
            key={profile.id}
            onClick={() => { setSelectedProfile(profile); setActiveStep(0); }}
            className={`px-4 py-3 rounded-xl text-left transition-all ${
              selectedProfile.id === profile.id
                ? "bg-[var(--navy)] text-white shadow-lg"
                : "bg-white border border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow"
            }`}
          >
            <p className="font-semibold text-sm">{profile.name}</p>
            <p className={`text-xs mt-0.5 ${selectedProfile.id === profile.id ? "text-white/70" : "text-gray-400"}`}>
              {profile.background.slice(0, 60)}...
            </p>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left: Prior knowledge gauge */}
        <div>
          <div className="card sticky top-20">
            <h3 className="font-semibold text-gray-900 mb-1">{selectedProfile.name}</h3>
            <p className="text-xs text-gray-500 mb-4">{selectedProfile.background}</p>

            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Prior Knowledge (Diagnostic)</h4>
            <div className="space-y-3">
              {outcomes.map((o) => {
                const level = selectedProfile.priorKnowledge[o.id] || 0;
                const threshold = 70; // simplified threshold
                return (
                  <div key={o.id}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-gray-700">{o.id}: {o.title}</span>
                      <span className="text-xs text-gray-400">{level}%</span>
                    </div>
                    <div className="gauge-track relative">
                      <div
                        className="gauge-fill"
                        style={{
                          width: `${level}%`,
                          backgroundColor: level >= threshold ? "#22c55e" : level >= 50 ? "#f59e0b" : "#ef4444",
                        }}
                      />
                      <div
                        className="absolute top-0 h-full w-0.5 bg-gray-800"
                        style={{ left: `${threshold}%` }}
                        title="Competency threshold"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center gap-2 mt-4 text-[10px] text-gray-400">
              <span className="w-3 h-0.5 bg-gray-800 inline-block" /> Competency threshold (70%)
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Total pathway steps</span>
                <span className="font-bold text-gray-900">{selectedProfile.recommendedPath.length}</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-gray-500">vs. traditional (fixed) path</span>
                <span className="font-bold text-gray-900">11 steps</span>
              </div>
              {selectedProfile.recommendedPath.length < 11 && (
                <p className="text-[10px] text-green-600 mt-1">
                  {Math.round((1 - selectedProfile.recommendedPath.length / 11) * 100)}% more efficient
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right: Pathway timeline */}
        <div className="lg:col-span-2">
          <h3 className="font-semibold text-gray-900 mb-6">Adaptive Pathway</h3>
          <div className="space-y-3">
            {selectedProfile.recommendedPath.map((step, idx) => {
              const sc = stepColors[step.type];
              const isActive = idx === activeStep;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left rounded-xl p-4 border-2 transition-all ${
                    isActive ? `${sc.bg} ${sc.border} shadow-md` : "bg-white border-gray-100 hover:border-gray-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isActive ? `${sc.bg} ${sc.text} ring-2 ring-offset-1 ${sc.border.replace("border", "ring")}` : "bg-gray-100 text-gray-400"
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${sc.bg} ${sc.text}`}>
                          {sc.label}
                        </span>
                        <h4 className={`text-sm font-medium ${isActive ? "text-gray-900" : "text-gray-700"}`}>
                          {step.label}
                        </h4>
                      </div>
                      {isActive && (
                        <div className="mt-2 animate-in">
                          <p className="text-xs text-gray-600 leading-relaxed">{step.detail}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {step.outcomeIds.map((oid) => (
                              <span key={oid} className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-mono">
                                {oid}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <svg className={`w-4 h-4 flex-shrink-0 transition-transform ${isActive ? "rotate-90 text-gray-400" : "text-gray-300"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Comparison callout */}
      <div className="mt-16 bg-gradient-to-r from-purple-50 to-amber-50 rounded-xl border border-gray-200 p-8">
        <h3 className="font-bold text-gray-900 mb-3">Same Outcomes, Different Journeys</h3>
        <div className="grid sm:grid-cols-3 gap-6 mt-4">
          {learnerProfiles.map((p) => (
            <div key={p.id} className="text-sm">
              <p className="font-semibold text-gray-900">{p.name.split(" — ")[0]}</p>
              <p className="text-xs text-gray-500 mt-1">{p.recommendedPath.length} steps</p>
              <p className="text-xs text-gray-500">
                Skips: {p.recommendedPath.filter((s) => s.type === "assessment" && s.label.includes("Validated")).length > 0 ? "Yes — validated outcomes bypass material" : "No — full path needed"}
              </p>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">
          All three learners must meet identical competency thresholds on all 5 outcomes. The rigor is the same — the route is personalized.
        </p>
      </div>
    </div>
  );
}
