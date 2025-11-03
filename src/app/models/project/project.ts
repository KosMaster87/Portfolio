export interface Project {
  img: string;
  alt: string;
  linkToPage: string;
  linkToGit: string | string[]; // ← Kann jetzt string ODER Array von strings sein
  projectName: string;
  headline: string;
  description: string;
}
