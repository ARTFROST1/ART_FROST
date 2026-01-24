/**
 * Projects Components
 * Export all project-related components
 */

export { default as ProjectCard } from './ProjectCard.astro';
export { default as ProjectGrid } from './ProjectGrid.astro';
export { default as ProjectDetail } from './ProjectDetail.astro';
export { default as ProjectFilters } from './ProjectFilters';

// Re-export types
export type { ProjectStatus, ProjectType } from './ProjectCard.astro';
