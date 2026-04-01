import type { SubjectConfig } from "@/types/subject";
import { hindiPhases } from "./phases";
import { hindiVoiceConfig } from "./voice-config";

export const hindiConfig: SubjectConfig = {
  slug: "hindi",
  name: "Casual Hindi",
  description:
    "Learn the Hindi and Hinglish you actually hear at home, with family, and around town.",
  icon: "🇮🇳",
  language: {
    code: "hi",
    script: "Devanagari",
    direction: "ltr",
    transliterationEnabled: true,
  },
  phases: hindiPhases,
  voiceConfig: hindiVoiceConfig,
  settings: {
    newCardsPerSession: 8,
    reviewCardsPerSession: 15,
    sessionDurationMinutes: 12,
    enableVoice: true,
  },
};
