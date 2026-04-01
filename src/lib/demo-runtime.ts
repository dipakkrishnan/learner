import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { DEMO_USER_EMAIL, DEMO_USER_ID } from "@/lib/demo";
import { normalizePreferences } from "@/lib/preferences";
import { getAllSubjectConfigs, getSubjectConfig } from "@/lib/subjects/registry";
import type { SubjectConfig } from "@/types/subject";
import type { UserPreferences } from "@/types/learning";

function toJsonValue(value: unknown): Prisma.InputJsonValue {
  return value as Prisma.InputJsonValue;
}

export async function ensureDemoUser(
  preferences?: Partial<UserPreferences> | null
) {
  const normalizedPreferences = normalizePreferences(preferences);

  return prisma.user.upsert({
    where: { id: DEMO_USER_ID },
    update: {
      email: DEMO_USER_EMAIL,
      name: "Demo User",
      preferences: toJsonValue(normalizedPreferences),
    },
    create: {
      id: DEMO_USER_ID,
      email: DEMO_USER_EMAIL,
      name: "Demo User",
      password: "demo",
      preferences: toJsonValue(normalizedPreferences),
    },
  });
}

export async function ensureDemoRuntime(
  preferences?: Partial<UserPreferences> | null
) {
  await ensureAllSubjectsSeeded();
  const user = await ensureDemoUser(preferences);

  return { userId: user.id, preferences: normalizePreferences(preferences) };
}

export async function ensureAllSubjectsSeeded() {
  const configs = getAllSubjectConfigs();
  await Promise.all(configs.map((config) => ensureSubjectSeeded(config.slug)));
}

export async function ensureSubjectSeeded(subjectSlug: string) {
  const config = getSubjectConfig(subjectSlug);

  const subject = await prisma.subject.upsert({
    where: { slug: config.slug },
    update: {
      name: config.name,
      description: config.description,
      configKey: config.slug,
      icon: config.icon,
    },
    create: {
      slug: config.slug,
      name: config.name,
      description: config.description,
      configKey: config.slug,
      icon: config.icon,
    },
  });

  for (const phaseConfig of config.phases) {
    const phase = await prisma.phase.upsert({
      where: {
        subjectId_order: {
          subjectId: subject.id,
          order: phaseConfig.order,
        },
      },
      update: {
        name: phaseConfig.name,
        description: phaseConfig.description,
        prerequisiteIds: phaseConfig.prerequisitePhaseOrders.map(String),
      },
      create: {
        subjectId: subject.id,
        order: phaseConfig.order,
        name: phaseConfig.name,
        description: phaseConfig.description,
        prerequisiteIds: phaseConfig.prerequisitePhaseOrders.map(String),
      },
    });

    await syncPhaseCards(subject.id, phase.id, phaseConfig.cardTemplates);
  }

  return subject;
}

async function syncPhaseCards(
  subjectId: string,
  phaseId: string,
  cardTemplates: SubjectConfig["phases"][number]["cardTemplates"]
) {
  for (const template of cardTemplates) {
    const existing = await prisma.card.findFirst({
      where: {
        subjectId,
        phaseId,
        front: { path: ["text"], equals: template.front.text },
      },
    });

    const data = {
      subjectId,
      phaseId,
      type: template.type,
      front: toJsonValue(template.front),
      back: toJsonValue(template.back),
      tags: template.tags,
      difficulty: template.initialDifficulty ?? 0,
    };

    if (existing) {
      await prisma.card.update({
        where: { id: existing.id },
        data,
      });
      continue;
    }

    await prisma.card.create({ data });
  }
}
