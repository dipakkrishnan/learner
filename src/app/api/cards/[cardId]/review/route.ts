import { NextRequest, NextResponse } from "next/server";
import { processReview } from "@/lib/engine/scheduler";
export const dynamic = "force-dynamic";
import { DEMO_USER_ID } from "@/lib/demo";
import { ensureDemoUser } from "@/lib/demo-runtime";
import { updateProgress, updateStreak } from "@/lib/engine/progress-tracker";
import { prisma } from "@/lib/db";
import type { ReviewRating } from "@/types/learning";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ cardId: string }> }
) {
  const { cardId } = await params;
  const body = await request.json();
  const { userId = DEMO_USER_ID, rating, responseTimeMs, sessionId } = body as {
    userId?: string;
    rating: ReviewRating;
    responseTimeMs?: number;
    sessionId?: string;
  };

  if (!rating || rating < 1 || rating > 4) {
    return NextResponse.json(
      { error: "rating (1-4) is required" },
      { status: 400 }
    );
  }

  await ensureDemoUser();

  const userCardState = await prisma.userCardState.findUnique({
    where: { userId_cardId: { userId, cardId } },
    include: { card: true },
  });

  if (!userCardState) {
    return NextResponse.json(
      { error: "Card state not found" },
      { status: 404 }
    );
  }

  const { newState, log } = processReview(userCardState, rating);

  const [updatedState] = await prisma.$transaction([
    prisma.userCardState.update({
      where: { id: userCardState.id },
      data: newState,
    }),
    prisma.reviewLog.create({
      data: {
        userCardStateId: userCardState.id,
        sessionId: sessionId ?? null,
        rating: log.rating,
        elapsedDays: log.elapsedDays,
        scheduledDays: log.scheduledDays,
        state: log.state,
        responseTimeMs: responseTimeMs ?? null,
      },
    }),
  ]);

  await Promise.all([
    updateProgress(userId, userCardState.card.subjectId, userCardState.card.phaseId),
    updateStreak(userId, userCardState.card.subjectId),
  ]);

  return NextResponse.json({
    nextReview: updatedState.due,
    state: updatedState.state,
  });
}
