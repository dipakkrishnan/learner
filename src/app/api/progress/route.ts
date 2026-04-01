import { NextRequest, NextResponse } from "next/server";
import { getSubjectProgress } from "@/lib/engine/progress-tracker";
import { prisma } from "@/lib/db";
import { DEMO_USER_ID } from "@/lib/demo";
import { ensureDemoUser, ensureSubjectSeeded } from "@/lib/demo-runtime";
import { getPhaseStatuses } from "@/lib/engine/learning-path";
import { getSubjectConfig } from "@/lib/subjects/registry";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subjectSlug = searchParams.get("subjectSlug");
  const userId = searchParams.get("userId") ?? DEMO_USER_ID;

  if (!subjectSlug) {
    return NextResponse.json(
      { error: "subjectSlug is required" },
      { status: 400 }
    );
  }

  const [subject, user] = await Promise.all([
    ensureSubjectSeeded(subjectSlug),
    ensureDemoUser(),
  ]);
  const config = getSubjectConfig(subjectSlug);
  const [progress, phaseStatuses, todayStats] = await Promise.all([
    getSubjectProgress(userId, subject.id),
    getPhaseStatuses(userId, subject.id, config.phases),
    getTodayStats(userId, subject.id),
  ]);

  return NextResponse.json({
    ...progress,
    phaseStatuses,
    cardsToday: todayStats.cardsToday,
    minutesToday: todayStats.minutesToday,
    dailyGoalMinutes:
      ((user.preferences as { dailyMinutes?: number } | null)?.dailyMinutes ??
        config.settings.sessionDurationMinutes),
  });
}

async function getTodayStats(userId: string, subjectId: string) {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const sessions = await prisma.studySession.findMany({
    where: {
      userId,
      subjectId,
      startedAt: { gte: startOfDay },
    },
    select: {
      startedAt: true,
      endedAt: true,
      cardsStudied: true,
    },
  });

  const cardsToday = sessions.reduce((sum, session) => sum + session.cardsStudied, 0);
  const minutesToday = sessions.reduce((sum, session) => {
    if (!session.endedAt) {
      return sum;
    }

    const durationMs = session.endedAt.getTime() - session.startedAt.getTime();
    return sum + Math.max(1, Math.round(durationMs / 60000));
  }, 0);

  return { cardsToday, minutesToday };
}
