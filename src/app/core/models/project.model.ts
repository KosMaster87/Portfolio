export interface Project {
  id: string;
  name: string;
  headline: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  links: {
    live?: string;
    github: string | string[];
  };
  technologies: string[];
  category: string;
  isFeatured?: boolean;
}

export function getGitHubLinks(project: Project): string[] {
  return Array.isArray(project.links.github) ? project.links.github : [project.links.github];
}
