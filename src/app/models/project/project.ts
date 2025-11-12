/**
 * @fileoverview Project model interface.
 * @description Defines the structure of a Project object used in the application.
 * @module app/models/project/project
 */

export interface Project {
  img: string;
  alt: string;
  linkToPage: string;
  linkToGit: string | string[]; // ← Kann jetzt string ODER Array von strings sein
  projectName: string;
  headline: string;
  description: string;
}
