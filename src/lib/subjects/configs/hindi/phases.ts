import type { PhaseConfig } from "@/types/subject";
import { greetingCards } from "./cards/phase1-greetings";
import { familyCards } from "./cards/phase1-family";
import { courtesyCards } from "./cards/phase1-courtesy";
import { phraseCards } from "./cards/phase2-phrases";
import { foodHouseholdCards } from "./cards/phase2-food-household";
import { conversationCards } from "./cards/phase3-conversation";
import { opinionCards } from "./cards/phase3-opinions";
import { cultureCards } from "./cards/phase4-culture";
import { colloquialCards } from "./cards/phase4-colloquial";

export const phase1: PhaseConfig = {
  order: 1,
  name: "Foundations",
  description:
    "Greetings, family terms, and basic courtesy — the essentials for your first interactions.",
  prerequisitePhaseOrders: [],
  cardTemplates: [...greetingCards, ...familyCards, ...courtesyCards],
  unlockCriteria: { masteryThreshold: 0 },
};

export const phase2: PhaseConfig = {
  order: 2,
  name: "Daily Life",
  description:
    "Common phrases, food vocabulary, and household language for everyday visits.",
  prerequisitePhaseOrders: [1],
  cardTemplates: [...phraseCards, ...foodHouseholdCards],
  unlockCriteria: { masteryThreshold: 0.7 },
};

export const phase3: PhaseConfig = {
  order: 3,
  name: "Conversation",
  description:
    "Express opinions, ask questions, and hold your own in family discussions.",
  prerequisitePhaseOrders: [1, 2],
  cardTemplates: [...conversationCards, ...opinionCards],
  unlockCriteria: { masteryThreshold: 0.7 },
};

export const phase4: PhaseConfig = {
  order: 4,
  name: "Cultural Fluency",
  description:
    "Colloquial expressions, cultural references, humor, and festival greetings.",
  prerequisitePhaseOrders: [1, 2, 3],
  cardTemplates: [...cultureCards, ...colloquialCards],
  unlockCriteria: { masteryThreshold: 0.7 },
};

export const hindiPhases: PhaseConfig[] = [phase1, phase2, phase3, phase4];
