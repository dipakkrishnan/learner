"use client";

import { DEMO_USER_ID } from "@/lib/demo";
import {
  defaultUserPreferences,
  normalizePreferences,
} from "@/lib/preferences";
import type { UserPreferences } from "@/types/learning";

const ONBOARDED_KEY = "learner_onboarded";
const PREFERENCES_KEY = "learner_preferences";
const USER_ID_KEY = "learner_userId";

export function getStoredPreferences(): UserPreferences {
  if (typeof window === "undefined") {
    return defaultUserPreferences;
  }

  const stored = window.localStorage.getItem(PREFERENCES_KEY);
  if (!stored) {
    return defaultUserPreferences;
  }

  try {
    return normalizePreferences(JSON.parse(stored) as Partial<UserPreferences>);
  } catch {
    return defaultUserPreferences;
  }
}

export function storePreferences(preferences: UserPreferences) {
  window.localStorage.setItem(
    PREFERENCES_KEY,
    JSON.stringify(normalizePreferences(preferences))
  );
}

export function markOnboarded() {
  window.localStorage.setItem(ONBOARDED_KEY, "true");
}

export function isOnboarded() {
  return window.localStorage.getItem(ONBOARDED_KEY) === "true";
}

export async function syncDemoUser(
  preferences: UserPreferences = getStoredPreferences()
) {
  const normalized = normalizePreferences(preferences);

  storePreferences(normalized);
  window.localStorage.setItem(USER_ID_KEY, DEMO_USER_ID);

  const response = await fetch("/api/bootstrap", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ preferences: normalized }),
  });

  if (!response.ok) {
    throw new Error("Failed to initialize learner runtime");
  }

  return response.json() as Promise<{
    userId: string;
    preferences: UserPreferences;
  }>;
}

