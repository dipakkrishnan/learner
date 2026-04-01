import {
  fsrs,
  generatorParameters,
  createEmptyCard,
  Rating,
} from "ts-fsrs";
import type { UserCardState } from "@prisma/client";
import type { ReviewRating, FSRSState } from "@/types/learning";

const params = generatorParameters({
  enable_fuzz: true,
  enable_short_term: true,
  maximum_interval: 365,
});

const f = fsrs(params);

export interface ScheduleResult {
  newState: {
    due: Date;
    stability: number;
    difficulty: number;
    elapsedDays: number;
    scheduledDays: number;
    reps: number;
    lapses: number;
    state: FSRSState;
    lastReview: Date;
  };
  log: {
    rating: number;
    elapsedDays: number;
    scheduledDays: number;
    state: number;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toFSRSCard(cardState: UserCardState): any {
  return {
    due: cardState.due,
    stability: cardState.stability,
    difficulty: cardState.difficulty,
    elapsed_days: cardState.elapsedDays,
    scheduled_days: cardState.scheduledDays,
    reps: cardState.reps,
    lapses: cardState.lapses,
    learning_steps: 0,
    state: cardState.state,
    last_review: cardState.lastReview ?? undefined,
  };
}

export function processReview(
  cardState: UserCardState,
  rating: ReviewRating
): ScheduleResult {
  const card = toFSRSCard(cardState);
  const now = new Date();
  const result = f.repeat(card, now);
  // result is indexed by rating number (1-4)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chosen = (result as any)[rating];

  return {
    newState: {
      due: chosen.card.due,
      stability: chosen.card.stability,
      difficulty: chosen.card.difficulty,
      elapsedDays: chosen.card.elapsed_days,
      scheduledDays: chosen.card.scheduled_days,
      reps: chosen.card.reps,
      lapses: chosen.card.lapses,
      state: chosen.card.state as FSRSState,
      lastReview: now,
    },
    log: {
      rating,
      elapsedDays: chosen.log.elapsed_days,
      scheduledDays: chosen.log.scheduled_days,
      state: cardState.state,
    },
  };
}

export function createNewCardState() {
  const empty = createEmptyCard();
  return {
    due: empty.due,
    stability: empty.stability,
    difficulty: empty.difficulty,
    elapsedDays: empty.elapsed_days,
    scheduledDays: empty.scheduled_days,
    reps: empty.reps,
    lapses: empty.lapses,
    state: empty.state as number,
    lastReview: null,
  };
}

export { f as fsrsInstance, Rating };
