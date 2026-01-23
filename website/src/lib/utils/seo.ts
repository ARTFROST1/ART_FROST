/**
 * SEO helper utilities for meta tags, descriptions, and Open Graph data
 */

/**
 * Truncates text to a specified length and adds ellipsis
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length (default: 160 for meta descriptions)
 * @param suffix - Suffix to add (default: '...')
 * @returns Truncated text
 *
 * @example
 * truncate('Very long text...', 20) // => 'Very long text...'
 */
export function truncate(text: string, maxLength: number = 160, suffix: string = '...'): string {
  if (text.length <= maxLength) {
    return text;
  }

  // Truncate at word boundary
  const truncated = text.slice(0, maxLength - suffix.length);
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastSpace > 0) {
    return truncated.slice(0, lastSpace) + suffix;
  }

  return truncated + suffix;
}

/**
 * Generates a meta description from content
 * Removes HTML tags, truncates to optimal length
 *
 * @param content - Raw content (may contain HTML)
 * @param maxLength - Maximum length (default: 160)
 * @returns Clean meta description
 *
 * @example
 * generateDescription('<p>Hello world</p>', 50) // => 'Hello world'
 */
export function generateDescription(content: string, maxLength: number = 160): string {
  // Remove HTML tags
  const strippedContent = content.replace(/<[^>]*>/g, '');

  // Remove extra whitespace
  const cleaned = strippedContent.replace(/\s+/g, ' ').trim();

  return truncate(cleaned, maxLength);
}

/**
 * Generates page title with site name
 *
 * @param pageTitle - Page-specific title
 * @param siteName - Site name (default: 'Art Frost')
 * @param separator - Separator between title and site name (default: '|')
 * @returns Full page title
 *
 * @example
 * generateTitle('About') // => 'About | Art Frost'
 * generateTitle('Blog', 'My Site', '-') // => 'Blog - My Site'
 */
export function generateTitle(
  pageTitle: string,
  siteName: string = 'Art Frost',
  separator: string = '|'
): string {
  if (!pageTitle) {
    return siteName;
  }

  return `${pageTitle} ${separator} ${siteName}`;
}

/**
 * Extracts keywords from text
 * Simple implementation - can be enhanced with NLP libraries
 *
 * @param text - Text to extract keywords from
 * @param maxKeywords - Maximum number of keywords (default: 10)
 * @returns Array of keywords
 *
 * @example
 * extractKeywords('JavaScript TypeScript React...', 3) // => ['javascript', 'typescript', 'react']
 */
export function extractKeywords(text: string, maxKeywords: number = 10): string[] {
  // Remove HTML tags
  const strippedText = text.replace(/<[^>]*>/g, '');

  // Convert to lowercase and split into words
  const words = strippedText.toLowerCase().match(/\b\w+\b/g) || [];

  // Remove common stop words (Russian and English)
  const stopWords = new Set([
    'а',
    'и',
    'в',
    'на',
    'с',
    'по',
    'для',
    'как',
    'что',
    'это',
    'или',
    'the',
    'is',
    'at',
    'which',
    'on',
    'and',
    'or',
    'to',
    'in',
    'a',
    'of',
    'for',
    'as',
    'with',
  ]);

  const filtered = words.filter((word) => word.length > 3 && !stopWords.has(word));

  // Count word frequency
  const frequency = new Map<string, number>();
  filtered.forEach((word) => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });

  // Sort by frequency and return top keywords
  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * Generates canonical URL from path and site URL
 *
 * @param path - Current page path
 * @param siteUrl - Base site URL
 * @returns Full canonical URL
 *
 * @example
 * generateCanonicalUrl('/about', 'https://artfrost.com') // => 'https://artfrost.com/about'
 */
export function generateCanonicalUrl(path: string, siteUrl: string): string {
  const baseUrl = siteUrl.replace(/\/$/, ''); // Remove trailing slash
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}

/**
 * Validates and formats Open Graph image URL
 *
 * @param imageUrl - Image URL (relative or absolute)
 * @param siteUrl - Base site URL
 * @returns Absolute image URL
 *
 * @example
 * formatOgImage('/og-image.png', 'https://artfrost.com') // => 'https://artfrost.com/og-image.png'
 * formatOgImage('https://cdn.com/image.png') // => 'https://cdn.com/image.png'
 */
export function formatOgImage(imageUrl: string, siteUrl?: string): string {
  // If already absolute URL, return as is
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  // If no site URL provided, return relative URL
  if (!siteUrl) {
    return imageUrl;
  }

  const baseUrl = siteUrl.replace(/\/$/, '');
  const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
  return `${baseUrl}${cleanPath}`;
}
