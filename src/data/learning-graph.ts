// Learning Graph — ~170-concept DAG for BADM 554 "Data Foundations"
// 8-week online MSBAi course, Fall 2026
// Rebuilt from 15-week/231-concept graph to match compressed curriculum

import {
  type Concept, type LearningGraph, type TaxonomyId,
  type SpiralLevel, type ConceptDepth, TAXONOMY,
} from "./types";

// ============================================================
// Concept data: [id, label, deps, taxonomy, spiral, depth, week]
// spiral: i=introduce, p=practice, d=deepen (later MSBAi course)
// depth: c=core (video — durable concepts, long shelf life)
//        s=studio (applied project skills — I do/we do/you do, short shelf life)
// ============================================================

type RawConcept = [number, string, string, TaxonomyId, "i"|"p"|"d", "c"|"s", number];

const RAW: RawConcept[] = [
  // ──────────────────────────────────────────────────────────
  // WEEK 1: Relational Foundations + SQL SELECT (FOUND + SQL)
  // Project 1 starts
  // ──────────────────────────────────────────────────────────

  // FOUND — Relational Foundations
  [1,  "Data",                        "",     "FOUND", "i", "c", 1],
  [2,  "Information",                  "",     "FOUND", "i", "c", 1],
  [3,  "Database",                     "1",    "FOUND", "i", "c", 1],
  [4,  "DBMS",                         "3",    "FOUND", "i", "c", 1],
  [5,  "Relational Model",             "3",    "FOUND", "i", "c", 1],
  [6,  "Tables",                       "5",    "FOUND", "p", "c", 1],
  [7,  "Rows",                         "6",    "FOUND", "i", "c", 1],
  [8,  "Columns",                      "6",    "FOUND", "i", "c", 1],
  [9,  "Data Types",                   "8",    "FOUND", "i", "c", 1],
  [10, "Primary Key",                  "6",    "FOUND", "p", "c", 1],
  [11, "Foreign Key",                  "6",    "FOUND", "p", "c", 1],
  [12, "Composite Key",               "10",   "FOUND", "i", "c", 1],
  [13, "Relationships",               "6",    "FOUND", "i", "c", 1],
  [14, "One-to-One Relationship",      "13",   "FOUND", "i", "c", 1],
  [15, "One-to-Many Relationship",     "13",   "FOUND", "p", "c", 1],
  [16, "Many-to-Many Relationship",    "13",   "FOUND", "p", "c", 1],
  [17, "Schema",                       "6",    "FOUND", "p", "c", 1],
  [18, "Constraints",                  "17",   "FOUND", "p", "c", 1],

  // SQL — SELECT fundamentals (Week 1)
  [19, "SQL",                          "5",    "SQL",   "p", "c", 1],
  [20, "DDL",                          "19",   "SQL",   "p", "c", 1],
  [21, "CREATE TABLE",                 "20",   "SQL",   "p", "c", 1],
  [22, "ALTER TABLE",                  "20",   "SQL",   "i", "c", 1],
  [23, "DROP TABLE",                   "20",   "SQL",   "i", "c", 1],
  [24, "DML",                          "19",   "SQL",   "p", "c", 1],
  [25, "INSERT",                       "24",   "SQL",   "p", "c", 1],
  [26, "UPDATE",                       "24",   "SQL",   "p", "c", 1],
  [27, "DELETE",                       "24",   "SQL",   "i", "c", 1],
  [28, "SELECT",                       "24",   "SQL",   "p", "c", 1],
  [29, "WHERE",                        "28",   "SQL",   "p", "c", 1],
  [30, "Comparison Operators",         "29",   "SQL",   "i", "c", 1],
  [31, "AND / OR / NOT",              "29",   "SQL",   "p", "c", 1],
  [32, "ORDER BY",                     "28",   "SQL",   "p", "c", 1],
  [33, "DISTINCT",                     "28",   "SQL",   "i", "c", 1],
  [34, "LIMIT",                        "28",   "SQL",   "i", "c", 1],
  [35, "NULL Values",                  "6",    "SQL",   "i", "c", 1],
  [36, "IS NULL / IS NOT NULL",        "35",   "SQL",   "i", "c", 1],

  // ──────────────────────────────────────────────────────────
  // WEEK 2: JOINs, Subqueries, Aggregation (SQL continued)
  // ──────────────────────────────────────────────────────────

  [37, "Aggregate Functions",          "28",   "SQL",   "p", "c", 2],
  [38, "COUNT",                        "37",   "SQL",   "p", "c", 2],
  [39, "SUM",                          "37",   "SQL",   "p", "c", 2],
  [40, "AVG",                          "37",   "SQL",   "p", "c", 2],
  [41, "MIN / MAX",                    "37",   "SQL",   "i", "c", 2],
  [42, "GROUP BY",                     "37",   "SQL",   "p", "c", 2],
  [43, "HAVING",                       "42",   "SQL",   "p", "c", 2],
  [44, "INNER JOIN",                   "28|11","SQL",   "p", "c", 2],
  [45, "LEFT JOIN",                    "44",   "SQL",   "p", "c", 2],
  [46, "RIGHT JOIN",                   "44",   "SQL",   "i", "c", 2],
  [47, "CROSS JOIN",                   "44",   "SQL",   "i", "c", 2],
  [48, "Self Join",                    "44",   "SQL",   "i", "c", 2],
  [49, "Subqueries",                   "28",   "SQL",   "p", "c", 2],
  [50, "Correlated Subquery",          "49",   "SQL",   "i", "c", 2],
  [51, "EXISTS / NOT EXISTS",          "49",   "SQL",   "i", "c", 2],
  [52, "IN / NOT IN",                  "29",   "SQL",   "p", "c", 2],
  [53, "BETWEEN",                      "29",   "SQL",   "i", "c", 2],
  [54, "LIKE / Pattern Matching",      "29",   "SQL",   "p", "c", 2],
  [55, "CASE Statement",              "28",   "SQL",   "p", "c", 2],
  [56, "COALESCE",                     "35",   "SQL",   "i", "c", 2],

  // Core — Advanced SQL (video: durable concepts, deepened in BADM 558)
  [57, "Common Table Expression",     "49",   "SQL",   "d", "c", 2],
  [58, "Window Functions",            "37",   "SQL",   "d", "c", 2],
  [59, "ROW_NUMBER",                   "58",   "SQL",   "d", "c", 2],
  [60, "RANK / DENSE_RANK",           "58",   "SQL",   "d", "c", 2],
  [61, "LEAD / LAG",                   "58",   "SQL",   "d", "c", 2],
  [62, "PARTITION BY",                 "58",   "SQL",   "d", "c", 2],

  // ──────────────────────────────────────────────────────────
  // WEEK 3: Data Modeling & Normalization (MODEL)
  // Project 1 due
  // ──────────────────────────────────────────────────────────

  [63, "Entity-Relationship Model",    "3",    "MODEL", "p", "c", 3],
  [64, "ER Diagrams",                  "63",   "MODEL", "p", "c", 3],
  [65, "Entities",                     "63",   "MODEL", "p", "c", 3],
  [66, "Attributes",                   "65",   "MODEL", "p", "c", 3],
  [67, "Entity Relationships",         "65",   "MODEL", "p", "c", 3],
  [68, "Cardinality",                  "67",   "MODEL", "p", "c", 3],
  [69, "Participation Constraints",    "67",   "MODEL", "i", "c", 3],
  [70, "Weak Entity",                  "65",   "MODEL", "i", "c", 3],
  [71, "Enhanced ER Model",           "63",   "MODEL", "i", "c", 3],
  [72, "Specialization / Generalization","71", "MODEL", "i", "c", 3],
  [73, "ER to Relational Mapping",    "64|5", "MODEL", "p", "c", 3],
  [74, "Data Redundancy",             "6",    "MODEL", "i", "c", 3],
  [75, "Functional Dependency",        "8",    "MODEL", "i", "c", 3],
  [76, "First Normal Form (1NF)",      "6",    "MODEL", "p", "c", 3],
  [77, "Atomic Values",               "76",   "MODEL", "i", "c", 3],
  [78, "Second Normal Form (2NF)",     "76",   "MODEL", "p", "c", 3],
  [79, "Third Normal Form (3NF)",      "78",   "MODEL", "p", "c", 3],
  [80, "BCNF",                         "79",   "MODEL", "i", "c", 3],

  // Core — Design trade-offs (video: durable, deepened in BADM 558)
  [81, "Denormalization",              "79",   "MODEL", "d", "c", 3],
  [82, "Normalization Trade-offs",     "81",   "MODEL", "d", "c", 3],

  // ──────────────────────────────────────────────────────────
  // WEEK 4: Python & Pandas (PYTHON)
  // Project 2 starts
  // ──────────────────────────────────────────────────────────

  [83,  "Python for Data",             "",     "PYTHON","i", "c", 4],
  [84,  "Variables and Data Types",    "83",   "PYTHON","i", "c", 4],
  [85,  "Lists and Dictionaries",      "83",   "PYTHON","i", "c", 4],
  [86,  "Functions",                   "83",   "PYTHON","i", "c", 4],
  [87,  "Loops and Comprehensions",    "83",   "PYTHON","i", "c", 4],
  [88,  "File I/O",                    "83",   "PYTHON","i", "c", 4],
  [89,  "Jupyter Notebooks",           "",     "PYTHON","p", "c", 4],
  [90,  "Google Colab",               "89",   "PYTHON","i", "c", 4],
  [91,  "pandas Library",             "83",   "PYTHON","p", "c", 4],
  [92,  "Series",                      "91",   "PYTHON","i", "c", 4],
  [93,  "DataFrame",                   "91",   "PYTHON","p", "c", 4],
  [94,  "Reading CSV",                "93",   "PYTHON","p", "c", 4],
  [95,  "Data Selection (loc, iloc)",  "93",   "PYTHON","p", "c", 4],
  [96,  "Filtering DataFrames",       "93",   "PYTHON","p", "c", 4],
  [97,  "GroupBy in pandas",          "93",   "PYTHON","p", "c", 4],
  [98,  "Merge / Join DataFrames",    "93",   "PYTHON","p", "c", 4],
  [99,  "Data Types and Conversion",  "93",   "PYTHON","i", "c", 4],
  [100, "Missing Data Handling",       "93",   "PYTHON","p", "c", 4],

  // Core — Comparison framework (video: durable mental model)
  [101, "Pandas vs SQL",              "91|19","PYTHON","i", "c", 4],

  // ──────────────────────────────────────────────────────────
  // WEEK 5: ETL Pipelines (ETL)
  // ──────────────────────────────────────────────────────────

  [102, "ETL Concept",                 "",     "ETL",   "p", "c", 5],
  [103, "Extract Phase",              "102",  "ETL",   "p", "c", 5],
  [104, "CSV Data Sources",           "103",  "ETL",   "p", "c", 5],
  [105, "Database Sources",           "103",  "ETL",   "p", "c", 5],
  [106, "API Data Sources",           "103",  "ETL",   "i", "c", 5],
  [107, "Transform Phase",            "102",  "ETL",   "p", "c", 5],
  [108, "Data Cleaning",              "107",  "ETL",   "p", "c", 5],
  [109, "Data Standardization",       "107",  "ETL",   "p", "c", 5],
  [110, "Data Validation",            "107",  "ETL",   "p", "c", 5],
  [111, "Load Phase",                 "102",  "ETL",   "p", "c", 5],
  [112, "SQLAlchemy",                  "83|19","ETL",   "p", "c", 5],
  [113, "create_engine",              "112",  "ETL",   "p", "c", 5],
  [114, "DataFrame to SQL",           "93|112","ETL",  "p", "c", 5],
  [115, "SQL to DataFrame",           "93|112","ETL",  "p", "c", 5],
  [116, "Error Handling (try-except)", "83",   "ETL",   "p", "c", 5],
  [117, "Logging",                     "83",   "ETL",   "p", "c", 5],
  [118, "Pipeline Architecture",       "102",  "ETL",   "i", "c", 5],

  // Core — Resilience patterns (video: durable, deepened in BADM 558)
  [119, "Retry Logic",                "116",  "ETL",   "d", "c", 5],
  [120, "Idempotent Operations",      "118",  "ETL",   "d", "c", 5],

  // ──────────────────────────────────────────────────────────
  // WEEK 6: NoSQL & APIs (NOSQL)
  // Project 2 due, Mid-course checkpoint
  // ──────────────────────────────────────────────────────────

  [121, "REST APIs",                   "",     "NOSQL", "i", "c", 6],
  [122, "HTTP Methods",               "121",  "NOSQL", "i", "c", 6],
  [123, "API Authentication",         "121",  "NOSQL", "i", "c", 6],
  [124, "API Keys",                    "123",  "NOSQL", "i", "c", 6],
  [125, "JSON",                        "",     "NOSQL", "p", "c", 6],
  [126, "JSON Objects",               "125",  "NOSQL", "i", "c", 6],
  [127, "JSON Arrays",                "125",  "NOSQL", "i", "c", 6],
  [128, "Nested JSON",                "126|127","NOSQL","i", "c", 6],
  [129, "requests Library",           "83",   "NOSQL", "p", "c", 6],
  [130, "API Data Extraction",        "129|121","NOSQL","p", "c", 6],
  [131, "NoSQL Databases",            "3",    "NOSQL", "i", "c", 6],
  [132, "NoSQL Motivation",           "131",  "NOSQL", "i", "c", 6],
  [133, "CAP Theorem",                "131",  "NOSQL", "i", "c", 6],
  [134, "Document Database",          "131",  "NOSQL", "i", "c", 6],
  [135, "Key-Value Store",            "131",  "NOSQL", "i", "c", 6],
  [136, "MongoDB",                     "134",  "NOSQL", "p", "c", 6],
  [137, "MongoDB CRUD",               "136",  "NOSQL", "p", "c", 6],
  [138, "MongoDB Query Language",     "136",  "NOSQL", "i", "c", 6],
  [139, "NoSQL vs SQL",               "131|19","NOSQL","i", "c", 6],

  // Core — API security patterns (video: durable concepts)
  [140, "OAuth",                       "123",  "NOSQL", "i", "c", 6],
  [141, "Rate Limiting",              "121",  "NOSQL", "i", "c", 6],
  // Studio — Credential management hands-on (applied: scaffolds P2 API work)
  [142, "Credential Management",      "123",  "NOSQL", "p", "s", 6],

  // ──────────────────────────────────────────────────────────
  // WEEK 7: Cloud & Optimization (CLOUD)
  // Project 3 starts
  // ──────────────────────────────────────────────────────────

  [143, "Cloud Databases",             "4",    "CLOUD", "i", "c", 7],
  [144, "AWS RDS",                     "143",  "CLOUD", "p", "c", 7],
  [145, "Database Instance Config",   "144",  "CLOUD", "p", "c", 7],
  [146, "Security Groups",            "144",  "CLOUD", "i", "c", 7],
  [147, "Connection from Python",     "144|112","CLOUD","p", "c", 7],
  [148, "Indexes",                     "6",    "CLOUD", "p", "c", 7],
  [149, "B-Tree Index",               "148",  "CLOUD", "i", "c", 7],
  [150, "Query Optimization",         "28",   "CLOUD", "p", "c", 7],
  [151, "EXPLAIN / Query Plans",      "150",  "CLOUD", "p", "c", 7],
  [152, "Index Strategy",             "148|150","CLOUD","p", "c", 7],
  [153, "Automated Jobs",             "83",   "CLOUD", "i", "c", 7],
  [154, "Cron Jobs",                   "153",  "CLOUD", "i", "c", 7],
  [155, "AWS Lambda",                  "153",  "CLOUD", "i", "c", 7],
  [156, "Cloud Cost Awareness",       "143",  "CLOUD", "i", "c", 7],

  // Core — Scaling patterns (video: durable, deepened in BADM 558)
  [157, "Connection Pooling",         "112",  "CLOUD", "d", "c", 7],
  [158, "Read Replicas",              "144",  "CLOUD", "d", "c", 7],

  // ──────────────────────────────────────────────────────────
  // WEEK 8: Data Quality & Governance (GOVERN)
  // Projects 2 & 3 due, Final presentations
  // ──────────────────────────────────────────────────────────

  [159, "Data Quality",                "",     "GOVERN","i", "c", 8],
  [160, "Accuracy",                    "159",  "GOVERN","i", "c", 8],
  [161, "Completeness",               "159",  "GOVERN","i", "c", 8],
  [162, "Consistency",                "159",  "GOVERN","i", "c", 8],
  [163, "Timeliness",                 "159",  "GOVERN","i", "c", 8],
  [164, "Data Governance",            "",     "GOVERN","i", "c", 8],
  [165, "Data Privacy",               "164",  "GOVERN","i", "c", 8],
  [166, "FERPA / PII",                "165",  "GOVERN","i", "c", 8],
  [167, "ACID Properties",            "4",    "GOVERN","i", "c", 8],
  [168, "Transactions",               "167",  "GOVERN","i", "c", 8],
  [169, "Data Ethics",                "164",  "GOVERN","i", "c", 8],

  // Core — Traceability (video: durable concepts)
  [170, "Data Lineage",               "102",  "GOVERN","i", "c", 8],

  // ──────────────────────────────────────────────────────────
  // STUDIO CONCEPTS — Applied project skills (I do / we do / you do)
  // Short shelf life, tool demos, AI workflows, pair exercises
  // Directly scaffold project deliverables
  // ──────────────────────────────────────────────────────────

  // Week 1 Studio: Project kickoff — database design walkthrough
  [171, "SQLFiddle Environment Setup",       "",      "FOUND", "p", "s", 1],
  [172, "AI-Assisted Schema Validation",     "17|19", "SQL",   "p", "s", 1],

  // Week 2 Studio: SQL deep-dive — JOIN patterns + common mistakes
  [173, "Pair Debugging JOIN Queries",       "44",    "SQL",   "p", "s", 2],
  [174, "AI for SQL Error Explanation",      "19",    "SQL",   "p", "s", 2],

  // Week 3 Studio: ER diagram workshop — Lucidchart/DrawIO
  [175, "ERD Design in DrawIO",             "64",    "MODEL", "p", "s", 3],
  [176, "Schema Design from Requirements",  "73",    "MODEL", "p", "s", 3],

  // Week 4 Studio: Pandas fundamentals — DataFrame operations in Jupyter
  [177, "Jupyter Notebook Best Practices",  "89",    "PYTHON","p", "s", 4],
  [178, "AI for pandas Debugging",          "91",    "PYTHON","p", "s", 4],

  // Week 5 Studio: ETL pipeline workshop — error handling, logging
  [179, "Building ETL Step-by-Step",        "102",   "ETL",   "p", "s", 5],
  [180, "Pair Debugging ETL Failures",      "116",   "ETL",   "p", "s", 5],

  // Week 6 Studio: MongoDB + APIs — Yelp/weather API hands-on
  [181, "MongoDB Compass Walkthrough",      "136",   "NOSQL", "p", "s", 6],
  [182, "Real API Integration",             "130",   "NOSQL", "p", "s", 6],

  // Week 7 Studio: AWS RDS setup — cloud database hands-on
  [183, "AWS RDS Setup Walkthrough",        "144",   "CLOUD", "p", "s", 7],
  [184, "EXPLAIN Plan Hands-on",            "151",   "CLOUD", "p", "s", 7],

  // Week 8 Studio: Final presentations — portfolio + defense prep
  [185, "GitHub Portfolio Assembly",        "",      "GOVERN","p", "s", 8],
  [186, "Oral Defense Preparation",         "",      "GOVERN","p", "s", 8],
];

// ============================================================
// Parse into typed concepts
// ============================================================

const SPIRAL_MAP: Record<string, SpiralLevel> = { i: "introduce", p: "practice", d: "deepen" };
const DEPTH_MAP: Record<string, ConceptDepth> = { c: "core", s: "studio" };

function parseDeps(deps: string): number[] {
  if (!deps) return [];
  return deps.split("|").map(Number);
}

export const concepts: Concept[] = RAW.map(([id, label, deps, tax, spiral, depth, week]) => ({
  id,
  label,
  dependencies: parseDeps(deps),
  taxonomyId: tax,
  spiralLevel: SPIRAL_MAP[spiral] as SpiralLevel,
  depth: DEPTH_MAP[depth] as ConceptDepth,
  week,
}));

const conceptMap = new Map<number, Concept>(concepts.map((c) => [c.id, c]));

export const learningGraph: LearningGraph = {
  concepts,
  metadata: {
    title: "BADM 554 - Data Foundations",
    creator: "Vishal Sachdev",
    institution: "University of Illinois",
    version: "2.0",
    totalConcepts: concepts.length,
    format: "Learning Graph v2.0 (8-week MSBAi)",
  },
};

// ============================================================
// Graph Traversal Utilities
// ============================================================

export function getConcept(id: number): Concept | undefined {
  return conceptMap.get(id);
}

export function getPrerequisites(conceptId: number): Concept[] {
  const concept = conceptMap.get(conceptId);
  if (!concept) return [];
  return concept.dependencies
    .map((depId) => conceptMap.get(depId))
    .filter((c): c is Concept => c !== undefined);
}

export function getDependents(conceptId: number): Concept[] {
  return concepts.filter((c) => c.dependencies.includes(conceptId));
}

export function getAllPrerequisites(conceptId: number): Concept[] {
  const visited = new Set<number>();
  const result: Concept[] = [];
  function walk(id: number) {
    const concept = conceptMap.get(id);
    if (!concept) return;
    for (const depId of concept.dependencies) {
      if (!visited.has(depId)) {
        visited.add(depId);
        const dep = conceptMap.get(depId);
        if (dep) { result.push(dep); walk(depId); }
      }
    }
  }
  walk(conceptId);
  return result;
}

export function filterByTaxonomy(taxonomyId: TaxonomyId): Concept[] {
  return concepts.filter((c) => c.taxonomyId === taxonomyId);
}

export function filterByWeek(week: number): Concept[] {
  return concepts.filter((c) => c.week === week);
}

export function filterByDepth(depth: ConceptDepth): Concept[] {
  return concepts.filter((c) => c.depth === depth);
}

export function filterBySpiralLevel(level: SpiralLevel): Concept[] {
  return concepts.filter((c) => c.spiralLevel === level);
}

/** Core concepts only (video — durable knowledge, long shelf life) */
export function coreConcepts(): Concept[] {
  return filterByDepth("core");
}

/** Studio concepts only (applied project skills — I do/we do/you do, short shelf life) */
export function studioConcepts(): Concept[] {
  return filterByDepth("studio");
}

/** Concepts that will be revisited in later MSBAi courses */
export function deepenLater(): Concept[] {
  return filterBySpiralLevel("deepen");
}

export function topologicalSort(subset?: Concept[]): Concept[] {
  const input = subset ?? concepts;
  const ids = new Set(input.map((c) => c.id));
  const visited = new Set<number>();
  const result: Concept[] = [];
  function visit(id: number) {
    if (visited.has(id) || !ids.has(id)) return;
    visited.add(id);
    const concept = conceptMap.get(id);
    if (!concept) return;
    for (const depId of concept.dependencies) visit(depId);
    result.push(concept);
  }
  for (const c of input) visit(c.id);
  return result;
}

export function getTaxonomyStats(): Record<TaxonomyId, { total: number; core: number; studio: number }> {
  const stats = {} as Record<TaxonomyId, { total: number; core: number; studio: number }>;
  for (const key of Object.keys(TAXONOMY) as TaxonomyId[]) {
    stats[key] = { total: 0, core: 0, studio: 0 };
  }
  for (const c of concepts) {
    stats[c.taxonomyId].total++;
    stats[c.taxonomyId][c.depth]++;
  }
  return stats;
}

export function getRootConcepts(): Concept[] {
  return concepts.filter((c) => c.dependencies.length === 0);
}

export function getLeafConcepts(): Concept[] {
  const hasDependent = new Set<number>();
  for (const c of concepts) {
    for (const depId of c.dependencies) hasDependent.add(depId);
  }
  return concepts.filter((c) => !hasDependent.has(c.id));
}

export function getDepth(conceptId: number): number {
  const visited = new Set<number>();
  function walk(id: number): number {
    if (visited.has(id)) return 0;
    visited.add(id);
    const concept = conceptMap.get(id);
    if (!concept || concept.dependencies.length === 0) return 0;
    let max = 0;
    for (const depId of concept.dependencies) max = Math.max(max, walk(depId) + 1);
    return max;
  }
  return walk(conceptId);
}

/** Get concepts for a project (1, 2, or 3) */
export function getConceptsForProject(projectNum: number): Concept[] {
  const projectWeeks: Record<number, number[]> = {
    1: [1, 2, 3],
    2: [4, 5, 6],
    3: [7, 8],
  };
  const weeks = projectWeeks[projectNum] ?? [];
  return concepts.filter((c) => weeks.includes(c.week));
}
