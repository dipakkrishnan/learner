import { NextRequest, NextResponse } from "next/server";
import { getSessionCards } from "@/lib/engine/session-manager";
import { getPhaseStatuses, getUnlockedPhaseIds } from "@/lib/engine/learning-path";
export const dynamic = "force-dynamic";
import { DEMO_USER_ID } from "@/lib/demo";
import { ensureDemoUser, ensureSubjectSeeded } from "@/lib/demo-runtime";
import { normalizePreferences } from "@/lib/preferences";
import { getSubjectConfig } from "@/lib/subjects/registry";
import type { UserPreferences } from "@/types/learning";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const subjectSlug = searchParams.get("subjectSlug");
  const userId = searchParams.get("userId") ?? DEMO_USER_ID;
  const includeCards = searchParams.get("includeCards") !== "false";

  if (!subjectSlug) {
    return NextResponse.json(
      { error: "subjectSlug is required" },
      { status: 400 }
    );
  }

  const config = getSubjectConfig(subjectSlug);
  const [subject, user] = await Promise.all([
    ensureSubjectSeeded(subjectSlug),
    ensureDemoUser(),
  ]);

  const statuses = await getPhaseStatuses(userId, subject.id, config.phases);
  const response: {
    subjectId: string;
    phaseStatuses: typeof statuses;
    cards?: Awaited<ReturnType<typeof getSessionCards>>;
  } = {
    subjectId: subject.id,
    phaseStatuses: statuses,
  };

  if (includeCards) {
    const unlockedPhaseIds = getUnlockedPhaseIds(statuses);
    response.cards = await getSessionCards({
      userId,
      subjectId: subject.id,
      settings: config.settings,
      preferences: normalizePreferences(
        user.preferences as Partial<UserPreferences> | null
      ),
      unlockedPhaseIds,
    });
  }

  return NextResponse.json(response);
}
