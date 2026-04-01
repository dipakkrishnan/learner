import { CardFace, CardType } from "./learning";

export interface SubjectConfig {
  slug: string;
  name: string;
  description: string;
  icon: string;
  language?: {
    code: string;
    script: string;
    direction: "ltr" | "rtl";
    transliterationEnabled: boolean;
  };
  phases: PhaseConfig[];
  voiceConfig?: VoiceConfig;
  settings: SubjectSettings;
}

export interface PhaseConfig {
  order: number;
  name: string;
  description: string;
  prerequisitePhaseOrders: number[];
  cardTemplates: CardTemplate[];
  unlockCriteria: {
    masteryThreshold: number;
  };
}

export interface CardTemplate {
  type: CardType;
  front: CardFace;
  back: CardFace;
  tags: string[];
  initialDifficulty?: number;
}

export interface VoiceConfig {
  ttsProvider: "openai" | "elevenlabs";
  ttsVoiceId?: string;
  ttsModel?: string;
  ttsInstructions?: string;
  sttLanguageCode: string;
  realtimeEnabled: boolean;
  realtimeModel?: string;
  realtimeVoice?: string;
  realtimeSystemPrompt?: string;
  scenarios?: ConversationScenario[];
}

export interface ConversationScenario {
  id: string;
  name: string;
  description: string;
  systemPrompt: string;
  difficulty: number;
  suggestedPhrases: string[];
}

export interface SubjectSettings {
  newCardsPerSession: number;
  reviewCardsPerSession: number;
  sessionDurationMinutes: number;
  enableVoice: boolean;
}
