/**
 * Data Layer Index
 * Central export for all data configurations
 *
 * Usage:
 * import { siteConfig, profile, mainNavigation } from '@data';
 */

// Site configuration
export { siteConfig, getSocialLink, getAllSocialLinks } from './site-config';
export type { SiteConfig, SocialLink, Author } from './site-config';

// Navigation
export {
  mainNavigation,
  footerNavigation,
  blogNavigation,
  ctaNavItem,
  getNavWithActive,
  isActivePath,
} from './navigation';
export type { NavItem } from './navigation';

// Social links
export {
  socialLinks,
  footerSocialLinks,
  getPrimarySocialLinks,
  getAllSocialLinks as getAllSocialLinksDetailed,
  getSocialLinkById,
} from './social-links';
export type { SocialLinkConfig } from './social-links';

// Profile
export { profile, profileHighlights, currentFocus } from './profile';
export type { ProfileConfig } from './profile';

// Skills
export {
  skillCategories,
  getAllSkills,
  getSkillsByCategory,
  getActiveSkills,
  getSkillTags,
  getTopSkills,
  skillLevelLabels,
  skillLevelPercentage,
} from './skills';
export type { Skill, SkillCategory, SkillLevel } from './skills';

// Experience
export {
  experience,
  getExperienceTimeline,
  getExperienceByType,
  getCurrentExperience,
  experienceTypeLabels,
  experienceTypeColors,
} from './experience';
export type { ExperienceEntry, ExperienceType } from './experience';
