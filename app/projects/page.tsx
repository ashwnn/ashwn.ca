import projectsData from "@/content/projects.json";

export const metadata = {
  title: "Projects",
  description: "Selected projects and experiments.",
};

type Project = {
  title: string;
  summary: string;
  tags: string[];
  date?: string;
  repoUrl?: string;
  caseStudyUrl?: string;
  liveUrl?: string;
  inProgress?: boolean;
  previewImage?: string;
};

const projects = projectsData as Project[];

function parseProjectDate(date: string | undefined): number {
  if (!date) return 0;
  const parsed = new Date(`01 ${date}`);
  return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

export default function ProjectsPage() {
  const sortedProjects = [...projects].sort((a, b) =>
    parseProjectDate(b.date) - parseProjectDate(a.date)
  );

  return (
    <div className="space-y-12">
      {sortedProjects.map((project) => (
        <article
          key={project.title}
          className="group/row flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
        >
          {/* Left third */}
          <div className="relative sm:w-1/3 pt-1 space-y-2">
            <h2 className="flex flex-col items-start gap-1 text-xs uppercase tracking-[0.12em] text-[color:var(--text-main)] font-mono">
              {project.inProgress ? (
                <span className="inline-flex cursor-default text-[8px] tracking-[0.1em] text-[color:var(--text-muted)] font-mono">
                  IN PROGRESS
                </span>
              ) : null}
              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  className="inline-flex items-center gap-1 hover:text-zinc-100 transition-colors"
                >
                  {project.title}
                </a>
              ) : (
                project.title
              )}
            </h2>

            {project.tags.length > 0 ? (
              <ul className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="border border-[color:var(--border)] px-1.5 py-0.5 text-[10px] uppercase tracking-[0.1em] text-[color:var(--text-muted)] font-mono"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            ) : null}

            {/* Hover image preview — only renders when previewImage is set */}
            {project.previewImage ? (
              <div
                className="pointer-events-none absolute left-0 bottom-full mb-3 z-10 w-64 opacity-0 translate-y-1 group-hover/row:opacity-100 group-hover/row:translate-y-0 transition-all duration-200 ease-out"
                aria-hidden="true"
              >
                <div className="border border-[color:var(--border)] bg-[color:var(--surface)] p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.previewImage}
                    alt={`${project.title} preview`}
                    className="w-full object-cover"
                  />
                </div>
              </div>
            ) : null}
          </div>

          {/* Right two-thirds */}
          <div className="sm:w-2/3">
            <p className="text-sm leading-relaxed text-[color:var(--text-sub)]">
              {project.summary}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
}
