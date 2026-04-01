import { prisma } from "@/lib/db";

const STABILITY_THRESHOLD = 1.0;

export async function calculatePhaseMastery(
  userId: string,
  phaseId: string
): Promise<number> {
  const totalCards = await prisma.card.count({ where: { phaseId } });
  if (totalCards === 0) return 0;

  const masteredCards = await prisma.userCardState.count({
    where: {
      userId,
      card: { phaseId },
      state: 2, // Review state
      stability: { gte: STABILITY_THRESHOLD },
    },
  });

  return Math.round((masteredCards / totalCards) * 100);
}

export async function updateProgress(
  userId: string,
  subjectId: string,
  phaseId: string
) {
  const mastery = await calculatePhaseMastery(userId, phaseId);
  const totalCards = await prisma.card.count({ where: { phaseId } });
  const cardsLearned = await prisma.userCardState.count({
    where: {
      userId,
      card: { phaseId },
      reps: { gt: 0 },
    },
  });

  const phaseProgress = await prisma.userProgress.upsert({
    where: {
      userId_subjectId_phaseId: { userId, subjectId, phaseId },
    },
    update: {
      masteryScore: mastery,
      cardsLearned,
      totalCards,
      lastStudiedAt: new Date(),
    },
    create: {
      userId,
      subjectId,
      phaseId,
      masteryScore: mastery,
      cardsLearned,
      totalCards,
      lastStudiedAt: new Date(),
    },
  });

  await syncOverallProgress(userId, subjectId);

  return phaseProgress;
}

export async function updateStreak(userId: string, subjectId: string) {
  const overallProgress = await prisma.userProgress.findFirst({
    where: { userId, subjectId, phaseId: null },
  });

  const now = new Date();
  const lastStudied = overallProgress?.lastStudiedAt;
  let newStreak = 1;

  if (lastStudied) {
    const diffMs = now.getTime() - lastStudied.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays <= 1) {
      newStreak = (overallProgress?.streak ?? 0) + (diffDays === 1 ? 1 : 0);
    }
  }

  if (overallProgress) {
    return prisma.userProgress.update({
      where: { id: overallProgress.id },
      data: {
        streak: newStreak,
        lastStudiedAt: now,
      },
    });
  }

  return prisma.userProgress.create({
    data: {
      userId,
      subjectId,
      phaseId: null,
      streak: newStreak,
      lastStudiedAt: now,
    },
  });
}

export async function getSubjectProgress(userId: string, subjectId: string) {
  const phaseProgress = await prisma.userProgress.findMany({
    where: { userId, subjectId, phaseId: { not: null } },
    include: { phase: true },
    orderBy: { phase: { order: "asc" } },
  });

  const overallProgress = await prisma.userProgress.findFirst({
    where: { userId, subjectId, phaseId: null },
  });

  return {
    phases: phaseProgress.map((p) => ({
      phaseId: p.phaseId!,
      phaseName: p.phase?.name ?? "",
      phaseOrder: p.phase?.order ?? 0,
      mastery: p.masteryScore,
      cardsLearned: p.cardsLearned,
      totalCards: p.totalCards,
    })),
    streak: overallProgress?.streak ?? 0,
    lastStudiedAt: overallProgress?.lastStudiedAt ?? null,
  };
}

async function syncOverallProgress(userId: string, subjectId: string) {
  const phaseProgress = await prisma.userProgress.findMany({
    where: { userId, subjectId, phaseId: { not: null } },
  });

  const overallProgress = await prisma.userProgress.findFirst({
    where: { userId, subjectId, phaseId: null },
  });

  const masteryScore =
    phaseProgress.length > 0
      ? Math.round(
          phaseProgress.reduce((sum, progress) => sum + progress.masteryScore, 0) /
            phaseProgress.length
        )
      : 0;
  const cardsLearned = phaseProgress.reduce(
    (sum, progress) => sum + progress.cardsLearned,
    0
  );
  const totalCards = phaseProgress.reduce(
    (sum, progress) => sum + progress.totalCards,
    0
  );
  const lastStudiedAt = new Date();

  if (overallProgress) {
    return prisma.userProgress.update({
      where: { id: overallProgress.id },
      data: {
        masteryScore,
        cardsLearned,
        totalCards,
        lastStudiedAt,
      },
    });
  }

  return prisma.userProgress.create({
    data: {
      userId,
      subjectId,
      phaseId: null,
      masteryScore,
      cardsLearned,
      totalCards,
      lastStudiedAt,
    },
  });
}
