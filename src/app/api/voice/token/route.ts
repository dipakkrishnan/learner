import { NextRequest, NextResponse } from "next/server";
import { ensureSubjectSeeded } from "@/lib/demo-runtime";
import { createRealtimeSession } from "@/lib/voice/realtime";
import { getSubjectConfig } from "@/lib/subjects/registry";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subjectSlug = searchParams.get("subjectSlug");
  const scenarioId = searchParams.get("scenarioId");

  if (!subjectSlug) {
    return NextResponse.json(
      { error: "subjectSlug is required" },
      { status: 400 }
    );
  }

  await ensureSubjectSeeded(subjectSlug);
  const config = getSubjectConfig(subjectSlug);
  if (!config.voiceConfig) {
    return NextResponse.json(
      { error: "Voice not configured for this subject" },
      { status: 400 }
    );
  }

  const scenario = scenarioId
    ? config.voiceConfig.scenarios?.find((s) => s.id === scenarioId)
    : undefined;

  const session = await createRealtimeSession(config.voiceConfig, scenario);

  return NextResponse.json(session);
}
