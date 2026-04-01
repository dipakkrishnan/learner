import { NextRequest, NextResponse } from "next/server";
import { createSession, endSession } from "@/lib/engine/session-manager";
import { DEMO_USER_ID } from "@/lib/demo";
import { ensureDemoUser } from "@/lib/demo-runtime";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const { userId, subjectId, sessionType } = await request.json();
  const resolvedUserId = userId ?? DEMO_USER_ID;

  if (!subjectId) {
    return NextResponse.json(
      { error: "subjectId is required" },
      { status: 400 }
    );
  }

  await ensureDemoUser();

  const session = await createSession(
    resolvedUserId,
    subjectId,
    sessionType ?? "MIXED"
  );

  return NextResponse.json(session);
}

export async function PATCH(request: NextRequest) {
  const { sessionId, cardsStudied, correctCount } = await request.json();

  if (!sessionId) {
    return NextResponse.json(
      { error: "sessionId is required" },
      { status: 400 }
    );
  }

  const session = await endSession(
    sessionId,
    cardsStudied ?? 0,
    correctCount ?? 0
  );

  return NextResponse.json(session);
}
