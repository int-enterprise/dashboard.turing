import { PROJECTS } from "@/shared/config/projects";
import { ProjectsEmptyPage } from "@/views/projects/ui/ProjectsEmptyPage";
import { ProjectsListPage } from "@/views/projects/ui/ProjectsListPage";

export const metadata = { title: "프로젝트 · turing" };

export default function Page() {
  if (PROJECTS.length === 0) return <ProjectsEmptyPage />;
  return <ProjectsListPage />;
}
