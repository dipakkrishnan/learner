import type { SubjectConfig } from "@/types/subject";
import { hindiPhases } from "./phases";
import { hindiVoiceConfig } from "./voice-config";

export const hindiConfig: SubjectConfig = {
  slug: "hindi",
  name: "Conversational Hindi",
  description:
    "Learn to speak Hindi with family and friends — no grammar drills, just real conversation.",
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
