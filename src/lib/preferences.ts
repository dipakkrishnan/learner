import type { UserPreferences } from "@/types/learning";

export const defaultUserPreferences: UserPreferences = {
  learningStyle: "both",
  goal: "family-conversation",
  dailyMinutes: 15,
  newCardsPerSession: 8,
  voiceEnabled: true,
};

export function normalizePreferences(
  preferences?: Partial<UserPreferences> | null
): UserPreferences {
  if (!preferences) {
    return defaultUserPreferences;
  }

  return {
    learningStyle: preferences.learningStyle ?? defaultUserPreferences.learningStyle,
    goal: preferences.goal ?? defaultUserPreferences.goal,
    dailyMinutes: preferences.dailyMinutes ?? defaultUserPreferences.dailyMinutes,
    newCardsPerSession:
      preferences.newCardsPerSession ?? defaultUserPreferences.newCardsPerSession,
    voiceEnabled: preferences.voiceEnabled ?? defaultUserPreferences.voiceEnabled,
  };
}

