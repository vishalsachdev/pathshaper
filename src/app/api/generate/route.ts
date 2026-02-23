import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const LOG_PATH = path.join(
  process.cwd(),
  "src/data/specs/generation-log.json"
);

export async function GET() {
  const raw = await readFile(LOG_PATH, "utf-8");
  const log = JSON.parse(raw);
  return NextResponse.json(log);
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const { id, status, reviewNotes } = body as {
    id: string;
    status?: string;
    reviewNotes?: string;
  };

  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const raw = await readFile(LOG_PATH, "utf-8");
  const log = JSON.parse(raw);

  const idx = log.requests.findIndex(
    (r: { id: string }) => r.id === id
  );
  if (idx === -1) {
    return NextResponse.json({ error: "request not found" }, { status: 404 });
  }

  if (status) log.requests[idx].status = status;
  if (reviewNotes !== undefined) log.requests[idx].reviewNotes = reviewNotes;
  log.requests[idx].updatedAt = new Date().toISOString();

  await writeFile(LOG_PATH, JSON.stringify(log, null, 2) + "\n", "utf-8");
  return NextResponse.json(log.requests[idx]);
}
