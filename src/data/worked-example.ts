// Worked Example: "Financial Statement Analysis" module
// from a Gies MBA course, redesigned with the Shaper on the Path model

export interface LearningOutcome {
  id: string;
  title: string;
  description: string;
  bloomLevel: "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate" | "Create";
  competencyThreshold: string;
}

export interface Misconception {
  id: string;
  outcomeId: string;
  description: string;
  frequency: "Common" | "Occasional" | "Rare";
  remediation: string;
}

export interface EvidenceType {
  id: string;
  outcomeId: string;
  type: string;
  description: string;
  rigorLevel: "Foundational" | "Proficient" | "Advanced";
}

export interface Resource {
  id: string;
  title: string;
  type: "Reading" | "Video" | "Interactive" | "Case Study" | "Practice Set";
  outcomes: string[];
  difficulty: "Introductory" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
}

export interface LearnerProfile {
  id: string;
  name: string;
  background: string;
  priorKnowledge: Record<string, number>; // outcomeId -> 0-100
  recommendedPath: PathStep[];
}

export interface PathStep {
  label: string;
  type: "diagnostic" | "resource" | "practice" | "assessment" | "review";
  detail: string;
  resourceId?: string;
  outcomeIds: string[];
}

// --- Course data ---

export const courseTitle = "Financial Statement Analysis";
export const courseContext = "MBA Core — Accounting for Decision Making (Module 3 of 8)";

export const outcomes: LearningOutcome[] = [
  {
    id: "LO1",
    title: "Interpret the Balance Sheet",
    description: "Analyze a company's financial position by interpreting assets, liabilities, and equity accounts in context.",
    bloomLevel: "Analyze",
    competencyThreshold: "Can identify at least 3 material insights from an unfamiliar balance sheet and explain their business implications.",
  },
  {
    id: "LO2",
    title: "Analyze Income Statements",
    description: "Evaluate revenue recognition, expense matching, and profitability metrics to assess operating performance.",
    bloomLevel: "Evaluate",
    competencyThreshold: "Can calculate and interpret gross margin, operating margin, and net margin trends across 3+ periods.",
  },
  {
    id: "LO3",
    title: "Assess Cash Flow Health",
    description: "Distinguish between operating, investing, and financing cash flows and assess liquidity and sustainability.",
    bloomLevel: "Evaluate",
    competencyThreshold: "Can reconcile net income to operating cash flow and explain at least 3 significant adjustments.",
  },
  {
    id: "LO4",
    title: "Apply Ratio Analysis",
    description: "Calculate and interpret key financial ratios to compare performance across companies and time periods.",
    bloomLevel: "Apply",
    competencyThreshold: "Can select appropriate ratios for a given business question and interpret results with industry context.",
  },
  {
    id: "LO5",
    title: "Identify Red Flags and Limitations",
    description: "Recognize signs of earnings management, accounting policy choices that obscure performance, and limitations of financial statements.",
    bloomLevel: "Evaluate",
    competencyThreshold: "Can identify at least 2 potential red flags in a set of financial statements and articulate why they warrant further investigation.",
  },
];

export const misconceptions: Misconception[] = [
  {
    id: "M1",
    outcomeId: "LO1",
    description: "Confusing book value with market value of assets",
    frequency: "Common",
    remediation: "Interactive exercise comparing book vs. market values for 5 companies across sectors.",
  },
  {
    id: "M2",
    outcomeId: "LO2",
    description: "Assuming revenue = cash received in the same period",
    frequency: "Common",
    remediation: "Case study on revenue recognition under ASC 606 with accrual timing exercise.",
  },
  {
    id: "M3",
    outcomeId: "LO3",
    description: "Treating positive net income as proof of strong cash position",
    frequency: "Common",
    remediation: "Side-by-side comparison of a profitable company with declining cash flows.",
  },
  {
    id: "M4",
    outcomeId: "LO4",
    description: "Comparing ratios across industries without adjustment",
    frequency: "Occasional",
    remediation: "Exercise analyzing the same ratios for a SaaS company vs. a manufacturer.",
  },
  {
    id: "M5",
    outcomeId: "LO5",
    description: "Treating audited financials as inherently reliable",
    frequency: "Occasional",
    remediation: "Mini-case on Enron or Wirecard with focus on what audits do and do not guarantee.",
  },
];

export const evidenceTypes: EvidenceType[] = [
  { id: "E1", outcomeId: "LO1", type: "Written Analysis", description: "Annotated balance sheet with 3+ insights and business implications", rigorLevel: "Proficient" },
  { id: "E2", outcomeId: "LO1", type: "Peer Discussion", description: "Structured discussion comparing two companies' financial positions", rigorLevel: "Advanced" },
  { id: "E3", outcomeId: "LO2", type: "Calculation + Memo", description: "Margin trend analysis with executive summary memo", rigorLevel: "Proficient" },
  { id: "E4", outcomeId: "LO3", type: "Reconciliation Exercise", description: "Net income to OCF reconciliation with narrative explanation", rigorLevel: "Proficient" },
  { id: "E5", outcomeId: "LO4", type: "Comparative Report", description: "Ratio-based comparison of two peer companies with recommendation", rigorLevel: "Advanced" },
  { id: "E6", outcomeId: "LO4", type: "Quiz", description: "Timed calculation and interpretation of 8 key ratios", rigorLevel: "Foundational" },
  { id: "E7", outcomeId: "LO5", type: "Red Flag Memo", description: "Identify and explain potential red flags from a real 10-K filing", rigorLevel: "Advanced" },
  { id: "E8", outcomeId: "LO5", type: "Discussion Post", description: "Response to prompt about limitations of GAAP-based reporting", rigorLevel: "Foundational" },
];

export const resources: Resource[] = [
  { id: "R1", title: "Reading the Balance Sheet (Textbook Ch. 4)", type: "Reading", outcomes: ["LO1"], difficulty: "Introductory", estimatedMinutes: 45 },
  { id: "R2", title: "Balance Sheet Deep Dive — Video Walkthrough", type: "Video", outcomes: ["LO1"], difficulty: "Introductory", estimatedMinutes: 20 },
  { id: "R3", title: "Apple vs. Tesla: Balance Sheet Comparison", type: "Case Study", outcomes: ["LO1", "LO4"], difficulty: "Intermediate", estimatedMinutes: 60 },
  { id: "R4", title: "Income Statement Mechanics (Textbook Ch. 5)", type: "Reading", outcomes: ["LO2"], difficulty: "Introductory", estimatedMinutes: 50 },
  { id: "R5", title: "Revenue Recognition Scenarios", type: "Interactive", outcomes: ["LO2"], difficulty: "Intermediate", estimatedMinutes: 30 },
  { id: "R6", title: "Cash Flow Statement Essentials", type: "Video", outcomes: ["LO3"], difficulty: "Introductory", estimatedMinutes: 25 },
  { id: "R7", title: "Why Profitable Companies Go Bankrupt", type: "Case Study", outcomes: ["LO3", "LO5"], difficulty: "Intermediate", estimatedMinutes: 40 },
  { id: "R8", title: "Ratio Analysis Toolkit", type: "Interactive", outcomes: ["LO4"], difficulty: "Introductory", estimatedMinutes: 35 },
  { id: "R9", title: "Industry Benchmarking Exercise", type: "Practice Set", outcomes: ["LO4"], difficulty: "Advanced", estimatedMinutes: 50 },
  { id: "R10", title: "Earnings Management: Cases and Signals", type: "Reading", outcomes: ["LO5"], difficulty: "Advanced", estimatedMinutes: 40 },
  { id: "R11", title: "Financial Statement Red Flags Simulation", type: "Interactive", outcomes: ["LO5", "LO2", "LO3"], difficulty: "Advanced", estimatedMinutes: 45 },
  { id: "R12", title: "Quick Ratio Calculation Drills", type: "Practice Set", outcomes: ["LO4"], difficulty: "Introductory", estimatedMinutes: 20 },
];

// Three learner profiles showing different adaptive paths

export const learnerProfiles: LearnerProfile[] = [
  {
    id: "LP1",
    name: "Sarah — Career Changer",
    background: "Former marketing manager, 2 years out of undergrad accounting. Solid intuition, rusty on mechanics.",
    priorKnowledge: { LO1: 40, LO2: 25, LO3: 15, LO4: 20, LO5: 10 },
    recommendedPath: [
      { label: "Diagnostic Assessment", type: "diagnostic", detail: "AI-generated diagnostic covering all 5 outcomes. Sarah scores moderately on LO1 but gaps everywhere else.", outcomeIds: ["LO1", "LO2", "LO3", "LO4", "LO5"] },
      { label: "Balance Sheet Refresher", type: "resource", detail: "Short video walkthrough to rebuild foundational knowledge.", resourceId: "R2", outcomeIds: ["LO1"] },
      { label: "Income Statement Mechanics", type: "resource", detail: "Full textbook chapter — Sarah needs the foundational material here.", resourceId: "R4", outcomeIds: ["LO2"] },
      { label: "Revenue Recognition Practice", type: "practice", detail: "Interactive scenarios to address the accrual/cash confusion.", resourceId: "R5", outcomeIds: ["LO2"] },
      { label: "Cash Flow Essentials", type: "resource", detail: "Video introduction — building from scratch on this topic.", resourceId: "R6", outcomeIds: ["LO3"] },
      { label: "Ratio Analysis Toolkit", type: "resource", detail: "Interactive tool to build ratio calculation skills.", resourceId: "R8", outcomeIds: ["LO4"] },
      { label: "Calculation Drills", type: "practice", detail: "Quick drills to build speed and accuracy on ratios.", resourceId: "R12", outcomeIds: ["LO4"] },
      { label: "Case Study: Profitable Bankruptcy", type: "resource", detail: "Addresses LO3 and LO5 together through a real scenario.", resourceId: "R7", outcomeIds: ["LO3", "LO5"] },
      { label: "Competency Check", type: "assessment", detail: "Timed ratio quiz + written balance sheet analysis. Must meet threshold on LO1-LO4.", outcomeIds: ["LO1", "LO2", "LO3", "LO4"] },
      { label: "Red Flag Simulation", type: "resource", detail: "Capstone interactive pulling together all outcomes.", resourceId: "R11", outcomeIds: ["LO5", "LO2", "LO3"] },
      { label: "Final Assessment", type: "assessment", detail: "Red flag memo on a real 10-K filing. Faculty-reviewed.", outcomeIds: ["LO5"] },
    ],
  },
  {
    id: "LP2",
    name: "Raj — Experienced Analyst",
    background: "5 years as equity research analyst. Deep ratio and income statement expertise. Less formal training on cash flow nuances.",
    priorKnowledge: { LO1: 85, LO2: 90, LO3: 55, LO4: 95, LO5: 60 },
    recommendedPath: [
      { label: "Diagnostic Assessment", type: "diagnostic", detail: "AI-generated diagnostic. Raj demonstrates mastery on LO1, LO2, LO4. Gaps on LO3 and LO5.", outcomeIds: ["LO1", "LO2", "LO3", "LO4", "LO5"] },
      { label: "LO1, LO2, LO4 — Validated", type: "assessment", detail: "Competency confirmed. Raj skips foundational material for these outcomes.", outcomeIds: ["LO1", "LO2", "LO4"] },
      { label: "Cash Flow Deep Dive", type: "resource", detail: "Case study fills Raj's specific gap on OCF reconciliation.", resourceId: "R7", outcomeIds: ["LO3", "LO5"] },
      { label: "Reconciliation Exercise", type: "practice", detail: "Hands-on reconciliation to meet LO3 competency threshold.", outcomeIds: ["LO3"] },
      { label: "Earnings Management Reading", type: "resource", detail: "Advanced reading — builds on Raj's analyst experience.", resourceId: "R10", outcomeIds: ["LO5"] },
      { label: "Red Flag Simulation", type: "resource", detail: "Advanced simulation — Raj's analytical skills make this efficient.", resourceId: "R11", outcomeIds: ["LO5", "LO2", "LO3"] },
      { label: "Final Assessment", type: "assessment", detail: "Red flag memo + comparative report. Raj completes the module in ~40% less time than the traditional path.", outcomeIds: ["LO3", "LO5"] },
    ],
  },
  {
    id: "LP3",
    name: "Ming — International Perspective",
    background: "CFO at a mid-size firm in China. Expert in IFRS, less familiar with US GAAP conventions and terminology.",
    priorKnowledge: { LO1: 70, LO2: 65, LO3: 75, LO4: 80, LO5: 45 },
    recommendedPath: [
      { label: "Diagnostic Assessment", type: "diagnostic", detail: "AI-generated diagnostic. Ming shows strong analytical skills but GAAP-specific terminology gaps.", outcomeIds: ["LO1", "LO2", "LO3", "LO4", "LO5"] },
      { label: "GAAP Terminology Bridge", type: "resource", detail: "AI-curated IFRS-to-GAAP mapping focused on Ming's specific gaps.", outcomeIds: ["LO1", "LO2"] },
      { label: "Revenue Recognition: US Context", type: "practice", detail: "ASC 606 scenarios — bridging from IFRS 15 knowledge.", resourceId: "R5", outcomeIds: ["LO2"] },
      { label: "Apple vs. Tesla Case", type: "resource", detail: "US company case to build GAAP-contextualized ratio fluency.", resourceId: "R3", outcomeIds: ["LO1", "LO4"] },
      { label: "Industry Benchmarking", type: "practice", detail: "Advanced exercise — Ming's experience makes this the right level.", resourceId: "R9", outcomeIds: ["LO4"] },
      { label: "LO1, LO2, LO3, LO4 — Validated", type: "assessment", detail: "Competency confirmed across foundational outcomes.", outcomeIds: ["LO1", "LO2", "LO3", "LO4"] },
      { label: "Earnings Management", type: "resource", detail: "Advanced reading with GAAP-specific red flags.", resourceId: "R10", outcomeIds: ["LO5"] },
      { label: "Red Flag Simulation", type: "resource", detail: "Capstone interactive — Ming applies cross-cultural accounting judgment.", resourceId: "R11", outcomeIds: ["LO5", "LO2", "LO3"] },
      { label: "Final Assessment", type: "assessment", detail: "Red flag memo on a US company. Faculty-reviewed for GAAP-specific insights.", outcomeIds: ["LO5"] },
    ],
  },
];

// Governance framework
export const governanceFramework = {
  outcomeValidation: {
    title: "Outcome Validation",
    description: "All learning outcomes are mapped to program-level competencies and approved by faculty governance.",
    mechanisms: [
      "Outcomes aligned to AACSB Assurance of Learning standards",
      "Faculty committee reviews and approves all outcome changes",
      "Industry advisory board validates professional relevance",
    ],
  },
  assessmentIntegrity: {
    title: "Assessment Integrity",
    description: "Multiple pathways converge on common, rigorous assessment standards.",
    mechanisms: [
      "Competency thresholds are uniform regardless of path taken",
      "Faculty define assessment rubrics — AI does not grade summative work",
      "Assessment evidence is archived for accreditation review",
      "Academic integrity tools applied uniformly across pathways",
    ],
  },
  aiConstraints: {
    title: "AI Operating Constraints",
    description: "Faculty define explicit guardrails for how AI operates within the system.",
    mechanisms: [
      "AI recommends resources only from faculty-curated pools",
      "AI cannot modify learning outcomes or competency thresholds",
      "AI decisions are logged and auditable by faculty",
      "Faculty override any AI recommendation at any time",
    ],
  },
  dataAndPrivacy: {
    title: "Data and Privacy",
    description: "Learner data is used to improve pathways, not to surveil.",
    mechanisms: [
      "Learner analytics are aggregated for faculty — individual tracking respects FERPA",
      "AI model does not retain individual learner data between sessions",
      "Learners can view their own progress data and AI recommendations",
    ],
  },
  continuousImprovement: {
    title: "Continuous Improvement",
    description: "The system generates evidence for its own refinement.",
    mechanisms: [
      "Pathway effectiveness data informs outcome and resource updates",
      "Faculty review aggregate patterns each semester",
      "Misconception data feeds back into course design",
      "System effectiveness reported as part of AACSB continuous improvement",
    ],
  },
};
