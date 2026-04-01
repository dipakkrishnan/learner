import { prisma } from "@/lib/db";
import type { PhaseConfig } from "@/types/subject";

export interface PhaseStatus {
  phaseId: string;
  order: number;
  name: string;
  status: "locked" | "unlocked" | "completed";
  mastery: number;
}

export async function getPhaseStatuses(
  userId: string,
  subjectId: string,
  phaseConfigs: PhaseConfig[]
): Promise<PhaseStatus[]> {
  const phases = await prisma.phase.findMany({
    where: { subjectId },
    orderBy: { order: "asc" },
  });

  const progressMap = new Map<string, number>();
  const progressRecords = await prisma.userProgress.findMany({
    where: { userId, subjectId, phaseId: { not: null } },
  });
  for (const p of progressRecords) {
    if (p.phaseId) progressMap.set(p.phaseId, p.masteryScore);
  }

  const phaseIdByOrder = new Map<number, string>();
  for (const phase of phases) {
    phaseIdByOrder.set(phase.order, phase.id);
  }

  return phases.map((phase) => {
    const config = phaseConfigs.find((c) => c.order === phase.order);
    const mastery = progressMap.get(phase.id) ?? 0;

    // Phase 1 is always unlocked
    if (phase.order === 1) {
      return {
        phaseId: phase.id,
        order: phase.order,
        name: phase.name,
        status: mastery >= 90 ? "completed" : "unlocked",
        mastery,
      };
    }

    // Check prerequisites
    const prereqOrders = config?.prerequisitePhaseOrders ?? [];
    const threshold = config?.unlockCriteria.masteryThreshold ?? 0.7;

    const allPrereqsMet = prereqOrders.every((prereqOrder) => {
      const prereqId = phaseIdByOrder.get(prereqOrder);
      if (!prereqId) return false;
      const prereqMastery = progressMap.get(prereqId) ?? 0;
      return prereqMastery >= threshold * 100;
    });

    let status: PhaseStatus["status"] = "locked";
    if (allPrereqsMet) {
      status = mastery >= 90 ? "completed" : "unlocked";
    }

    return {
      phaseId: phase.id,
      order: phase.order,
      name: phase.name,
      status,
      mastery,
    };
  });
}

export function getUnlockedPhaseIds(statuses: PhaseStatus[]): string[] {
  return statuses
    .filter((s) => s.status === "unlocked" || s.status === "completed")
    .map((s) => s.phaseId);
}
