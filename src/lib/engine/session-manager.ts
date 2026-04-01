import { prisma } from "@/lib/db";
import { createNewCardState } from "./scheduler";
import type { StudyCard, CardFace, UserPreferences } from "@/types/learning";
import type { SubjectSettings } from "@/types/subject";

interface SessionOptions {
  userId: string;
  subjectId: string;
  settings: SubjectSettings;
  preferences?: UserPreferences | null;
  unlockedPhaseIds: string[];
}

export async function getSessionCards(
  options: SessionOptions
): Promise<StudyCard[]> {
  const { userId, subjectId, settings, preferences, unlockedPhaseIds } =
    options;

  const newCardsLimit =
    preferences?.newCardsPerSession ?? settings.newCardsPerSession;
  const reviewCardsLimit = settings.reviewCardsPerSession;

  // Get due review cards
  const reviewCards = await prisma.userCardState.findMany({
    where: {
      userId,
      card: { subjectId },
      due: { lte: new Date() },
    },
    include: { card: true },
    orderBy: { due: "asc" },
    take: reviewCardsLimit,
  });

  // Get new cards from unlocked phases that user hasn't seen
  const existingCardIds = await prisma.userCardState.findMany({
    where: { userId, card: { subjectId } },
    select: { cardId: true },
  });
  const seenIds = new Set(existingCardIds.map((c) => c.cardId));

  const newCards = await prisma.card.findMany({
    where: {
      subjectId,
      phaseId: { in: unlockedPhaseIds },
      id: { notIn: [...seenIds] },
    },
    orderBy: [
      { phase: { order: "asc" } },
      { createdAt: "asc" },
    ],
    take: newCardsLimit,
  });

  // Create UserCardState for new cards
  const newCardStates = await Promise.all(
    newCards.map(async (card) => {
      const state = createNewCardState();
      return prisma.userCardState.upsert({
        where: { userId_cardId: { userId, cardId: card.id } },
        update: {},
        create: {
          userId,
          cardId: card.id,
          ...state,
        },
        include: { card: true },
      });
    })
  );

  const allCards = [...reviewCards, ...newCardStates];

  return allCards.map((ucs) => ({
    id: ucs.card.id,
    type: ucs.card.type as StudyCard["type"],
    front: ucs.card.front as unknown as CardFace,
    back: ucs.card.back as unknown as CardFace,
    tags: ucs.card.tags,
    phaseId: ucs.card.phaseId,
    fsrs: {
      due: ucs.due,
      stability: ucs.stability,
      difficulty: ucs.difficulty,
      elapsed_days: ucs.elapsedDays,
      scheduled_days: ucs.scheduledDays,
      reps: ucs.reps,
      lapses: ucs.lapses,
      state: ucs.state as StudyCard["fsrs"]["state"],
      last_review: ucs.lastReview ?? undefined,
    },
  }));
}

export async function createSession(
  userId: string,
  subjectId: string,
  sessionType: "REVIEW" | "NEW_CARDS" | "VOICE_PRACTICE" | "MIXED"
) {
  return prisma.studySession.create({
    data: { userId, subjectId, sessionType },
  });
}

export async function endSession(
  sessionId: string,
  cardsStudied: number,
  correctCount: number
) {
  return prisma.studySession.update({
    where: { id: sessionId },
    data: { endedAt: new Date(), cardsStudied, correctCount },
  });
}
