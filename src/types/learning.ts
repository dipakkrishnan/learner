export type CardType =
  | "VOCABULARY"
  | "PHRASE"
  | "SCENARIO"
  | "LISTENING"
  | "CULTURAL";

export type ReviewRating = 1 | 2 | 3 | 4; // Again, Hard, Good, Easy

export type FSRSState = 0 | 1 | 2 | 3; // New, Learning, Review, Relearning

export interface CardFace {
  text: string;
  transliteration?: string;
  image?: string;
  audioUrl?: string;
  examples?: string[];
  explanation?: string;
}

export interface StudyCard {
  id: string;
  type: CardType;
  front: CardFace;
  back: CardFace;
  tags: string[];
  phaseId: string;
  fsrs: {
    due: Date;
    stability: number;
    difficulty: number;
    elapsed_days: number;
    scheduled_days: number;
    reps: number;
    lapses: number;
    state: FSRSState;
    last_review?: Date;
  };
}

export interface ReviewResult {
  cardId: string;
  rating: ReviewRating;
  responseTimeMs: number;
}

export interface SessionState {
  sessionId: string;
  cards: StudyCard[];
  currentIndex: number;
  results: ReviewResult[];
  startedAt: Date;
}

export interface UserPreferences {
  learningStyle: "visual" | "auditory" | "both";
  goal: string;
  dailyMinutes: number;
  newCardsPerSession: number;
  voiceEnabled: boolean;
}
