import { NextResponse } from "next/server";
import { ensureAllSubjectsSeeded } from "@/lib/demo-runtime";
import { getAllSubjectConfigs } from "@/lib/subjects/registry";

export const dynamic = "force-dynamic";

export async function GET() {
  await ensureAllSubjectsSeeded();
  const configs = getAllSubjectConfigs();

  const subjects = configs.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    icon: c.icon,
    phases: c.phases.length,
    totalCards: c.phases.reduce((sum, p) => sum + p.cardTemplates.length, 0),
    hasVoice: !!c.voiceConfig,
  }));

  return NextResponse.json(subjects);
}
