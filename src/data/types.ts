// BADM 554 "Data Foundations" — PathShaper Type System
// 8-week online MSBAi course, Fall 2026

// ============================================================
// Taxonomy — 8 categories mapping to 8 weeks
// ============================================================

export type TaxonomyId =
  | "FOUND" | "SQL" | "MODEL"  | "PYTHON"
  | "ETL"   | "NOSQL" | "CLOUD" | "GOVERN";

export interface TaxonomyCategory {
  id: TaxonomyId;
  name: string;
  color: string;
  fontColor: string;
  week: number;
  project: number;
}

export const TAXONOMY: Record<TaxonomyId, TaxonomyCategory> = {
  FOUND:  { id: "FOUND",  name: "Relational Foundations", color: "#FF6600", fontColor: "white", week: 1, project: 1 },
  SQL:    { id: "SQL",    name: "SQL",                    color: "#32CD32", fontColor: "white", week: 1, project: 1 },
  MODEL:  { id: "MODEL",  name: "Data Modeling",          color: "#FF69B4", fontColor: "white", week: 3, project: 1 },
  PYTHON: { id: "PYTHON", name: "Python & Pandas",        color: "#4169E1", fontColor: "white", week: 4, project: 2 },
  ETL:    { id: "ETL",    name: "ETL Pipelines",          color: "#9370DB", fontColor: "white", week: 5, project: 2 },
  NOSQL:  { id: "NOSQL",  name: "NoSQL & APIs",           color: "#8B4513", fontColor: "white", week: 6, project: 2 },
  CLOUD:  { id: "CLOUD",  name: "Cloud & Optimization",   color: "#1E90FF", fontColor: "white", week: 7, project: 3 },
  GOVERN: { id: "GOVERN", name: "Quality & Governance",   color: "#DC143C", fontColor: "white", week: 8, project: 3 },
};

// ============================================================
// Learning Graph — ~170-concept DAG for 8-week course
// ============================================================

/** Spiral curriculum depth: where this concept sits in the MSBAi program */
export type SpiralLevel = "introduce" | "practice" | "deepen";

/** Whether this concept is from main lecture or studio enrichment */
export type ConceptDepth = "core" | "studio";

export interface Concept {
  id: number;
  label: string;
  dependencies: number[];
  taxonomyId: TaxonomyId;
  spiralLevel: SpiralLevel;
  depth: ConceptDepth;
  week: number;
}

export interface LearningGraph {
  concepts: Concept[];
  metadata: {
    title: string;
    creator: string;
    institution: string;
    version: string;
    totalConcepts: number;
    format: string;
  };
}

// ============================================================
// NLSpec Types — what faculty define
// ============================================================

export type BloomLevel =
  | "Remember" | "Understand" | "Apply"
  | "Analyze" | "Evaluate" | "Create";

/** L-C-E framework used across MSBAi program */
export type LCELevel = "literacy" | "competency" | "expertise";

export interface LearningOutcome {
  id: string;
  title: string;
  description: string;
  bloomLevel: BloomLevel;
  lceLevel: LCELevel;
  competencyThreshold: string;
  conceptIds: number[];
  weekMapping: number[];
}

export interface Misconception {
  id: string;
  outcomeId: string;
  description: string;
  frequency: "Common" | "Occasional" | "Rare";
  remediation: string;
  conceptIds: number[];
}

export type CanvasAssignmentType =
  | "Quiz" | "Discussion" | "Assignment" | "ExternalTool" | "Page";

export interface EvidenceType {
  id: string;
  outcomeId: string;
  type: string;
  description: string;
  rigorLevel: "Foundational" | "Proficient" | "Advanced";
  canvasAssignmentType: CanvasAssignmentType;
}

export type ResourceType =
  | "Reading" | "Video" | "Interactive" | "Case Study"
  | "Practice Set" | "Lab" | "MicroSim" | "Studio";

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  outcomes: string[];
  difficulty: "Introductory" | "Intermediate" | "Advanced";
  estimatedMinutes: number;
  url?: string;
  conceptIds: number[];
}

export type GuardrailCategory =
  | "FERPA" | "Integrity" | "Rigor" | "Accreditation" | "AI_Constraints";

export interface Guardrail {
  id: string;
  category: GuardrailCategory;
  title: string;
  description: string;
  enforcement: string;
}

/** AI Assessment Integration Scale level per the MSBAi framework */
export type AIASLevel = 0 | 1 | 2 | 3;

export interface CourseNLSpec {
  courseId: string;
  title: string;
  semester: string;
  canvasCourseId: number;
  weeks: number;
  program: string;
  outcomes: LearningOutcome[];
  misconceptions: Misconception[];
  evidenceTypes: EvidenceType[];
  guardrails: Guardrail[];
}

// ============================================================
// Canvas Module Types — 8-week structure
// ============================================================

export type ModuleItemType =
  | "overview" | "reading" | "video" | "lab" | "quiz"
  | "discussion" | "studio" | "project";

export interface ModuleItem {
  id: string;
  type: ModuleItemType;
  title: string;
  description: string;
  conceptIds: number[];
  canvasItemId?: number;
  url?: string;
}

export interface WeeklyModule {
  week: number;
  theme: string;
  taxonomyIds: TaxonomyId[];
  textbookChapter?: string;
  conceptRange: [number, number];
  items: ModuleItem[];
  canvasModuleId?: number;
  project?: number;
  studioTopic: string;
  aiasLevel: AIASLevel;
}

export interface ResourcePool {
  resources: Resource[];
  modules: WeeklyModule[];
}

// ============================================================
// Project Types — 3 progressive projects
// ============================================================

export interface Project {
  id: number;
  title: string;
  weeks: [number, number];
  weight: number;
  type: "individual" | "team";
  deliverables: string[];
  aiasLevel: AIASLevel;
  hasOralDefense: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Relational Database Design",
    weeks: [1, 3],
    weight: 20,
    type: "individual",
    deliverables: ["ERD", "SQL schema (CREATE TABLE)", "Normalization analysis", "5 sample queries", "GitHub repo"],
    aiasLevel: 2,
    hasOralDefense: false,
  },
  {
    id: 2,
    title: "ETL Pipeline in Python",
    weeks: [4, 6],
    weight: 30,
    type: "individual",
    deliverables: ["Python script (pandas + sqlalchemy)", "Jupyter notebook", "README", "Error handling docs", "GitHub repo"],
    aiasLevel: 2,
    hasOralDefense: false,
  },
  {
    id: 3,
    title: "Cloud Database + Optimization",
    weeks: [7, 8],
    weight: 25,
    type: "team",
    deliverables: ["AWS RDS live database", "Nightly update script", "Performance analysis", "Index design", "Architecture diagram", "Oral defense"],
    aiasLevel: 3,
    hasOralDefense: true,
  },
];

// ============================================================
// Generation Tracking
// ============================================================

export type GenerationStatus =
  | "pending" | "generating" | "review" | "approved" | "pushed" | "rejected";

export type GenerationTarget =
  | "chapter" | "quiz" | "microsim" | "discussion" | "lab" | "overview" | "studio_guide";

export interface GenerationRequest {
  id: string;
  target: GenerationTarget;
  weekNumber: number;
  title: string;
  status: GenerationStatus;
  createdAt: string;
  updatedAt: string;
  generatedContent?: string;
  reviewNotes?: string;
  canvasItemId?: number;
}

export interface GenerationLog {
  requests: GenerationRequest[];
}

// ============================================================
// Student Types — Supabase
// ============================================================

export type MasteryLevel =
  | "not_started" | "introduced" | "practicing" | "proficient" | "mastered";

export interface ConceptMastery {
  conceptId: number;
  level: MasteryLevel;
  lastUpdated: string;
}

export interface StudentProfile {
  id: string;
  surveySessionId?: string;
  name: string;
  background: string;
  technicalSkillLevel: string;
  areasNeedingSupport: string[];
  topicsOfInterest: string[];
  conceptMastery: ConceptMastery[];
  recommendedPath: PathStep[];
  createdAt: string;
  updatedAt: string;
}

export interface PathStep {
  label: string;
  type: "diagnostic" | "resource" | "practice" | "assessment" | "review";
  detail: string;
  resourceId?: string;
  outcomeIds: string[];
  conceptIds: number[];
  weekNumber?: number;
}

// ============================================================
// Holdout Test Profiles (Willison pattern)
// ============================================================

export interface HoldoutProfile {
  id: string;
  name: string;
  background: string;
  expectedPathDifference: string;
  priorKnowledge: Record<string, number>;
  conceptMastery: ConceptMastery[];
}
