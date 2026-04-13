export type ProjectMeta = {
  slug: string;
  name: string;
  description: string;
  tagline: string;
};

export const PROJECTS: ProjectMeta[] = [
  {
    slug: "donkey",
    name: "donkey",
    description: "의료 STT + 요약 품질 모니터링",
    tagline: "LLM-free 정량 평가 · 14개 지표 · SOAP 요약",
  },
];

export function getProjectBySlug(slug: string): ProjectMeta | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
