/**
 * Template for adding a new subject to Learner.
 *
 * Steps:
 * 1. Copy this directory to configs/<your-subject-slug>/
 * 2. Define your phases and card templates
 * 3. Optionally add a voiceConfig for audio features
 * 4. Register in registry.ts: import and add to the configs record
 * 5. Run `npx prisma db seed` to hydrate the database
 */

import type { SubjectConfig } from "@/types/subject";

export const templateConfig: SubjectConfig = {
  slug: "your-subject",
  name: "Your Subject Name",
  description: "A description of what learners will achieve.",
  icon: "📚",
  // language: { ... },  // Add if this is a language subject
  phases: [
    {
      order: 1,
      name: "Getting Started",
      description: "The basics.",
      prerequisitePhaseOrders: [],
      cardTemplates: [
        // Add CardTemplate objects here
      ],
      unlockCriteria: { masteryThreshold: 0 },
    },
  ],
  // voiceConfig: { ... },  // Add if you want audio features
  settings: {
    newCardsPerSession: 10,
    reviewCardsPerSession: 20,
    sessionDurationMinutes: 15,
    enableVoice: false,
  },
};
