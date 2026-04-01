import type { SubjectConfig } from "@/types/subject";
import { hindiConfig } from "./configs/hindi";

const configs: Record<string, SubjectConfig> = {
  hindi: hindiConfig,
};

export function getSubjectConfig(slug: string): SubjectConfig {
  const config = configs[slug];
  if (!config) {
    throw new Error(`Unknown subject: ${slug}`);
  }
  return config;
}

export function getAllSubjectConfigs(): SubjectConfig[] {
  return Object.values(configs);
}

export function getSubjectSlugs(): string[] {
  return Object.keys(configs);
}
