/**
 * ProjectFilters Component
 * React Island for filtering projects by tags
 * 
 * @example
 * <ProjectFilters client:idle tags={allTags} selectedTag={selectedTag} />
 */

import { useState, useCallback, useMemo } from 'react';

interface ProjectFiltersProps {
  /** All available tags */
  tags: string[];
  /** Currently selected tag */
  selectedTag?: string;
  /** Callback when tag is selected */
  onTagSelect?: (tag: string | null) => void;
}

export default function ProjectFilters({
  tags,
  selectedTag,
  onTagSelect,
}: ProjectFiltersProps) {
  const [selected, setSelected] = useState<string | null>(selectedTag || null);

  // Sort tags alphabetically and count occurrences (if needed later)
  const sortedTags = useMemo(() => {
    return [...new Set(tags)].sort((a, b) => a.localeCompare(b));
  }, [tags]);

  const handleTagClick = useCallback((tag: string) => {
    const newSelected = selected === tag ? null : tag;
    setSelected(newSelected);
    onTagSelect?.(newSelected);
    
    // Update URL with filter parameter
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (newSelected) {
        url.searchParams.set('tag', newSelected);
      } else {
        url.searchParams.delete('tag');
      }
      window.history.pushState({}, '', url.toString());
      
      // Dispatch custom event for page to handle filtering
      window.dispatchEvent(new CustomEvent('projectFilterChange', {
        detail: { tag: newSelected }
      }));
    }
  }, [selected, onTagSelect]);

  const handleClearFilter = useCallback(() => {
    setSelected(null);
    onTagSelect?.(null);
    
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete('tag');
      window.history.pushState({}, '', url.toString());
      
      window.dispatchEvent(new CustomEvent('projectFilterChange', {
        detail: { tag: null }
      }));
    }
  }, [onTagSelect]);

  if (sortedTags.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      {/* Clear filter button */}
      <button
        type="button"
        onClick={handleClearFilter}
        className={`
          inline-flex items-center justify-center
          px-4 py-2 text-sm font-medium rounded-xl
          transition-all duration-200
          ${
            selected === null
              ? 'bg-[var(--color-primary)] text-white shadow-[0_0_20px_-5px_var(--color-primary-glow)]'
              : 'bg-[var(--color-bg-glass)] text-[var(--color-text-body)] border border-[var(--color-border-glass)] hover:bg-white/5 hover:text-[var(--color-text-heading)]'
          }
        `}
      >
        Все
      </button>

      {/* Tag buttons */}
      {sortedTags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => handleTagClick(tag)}
          className={`
            inline-flex items-center justify-center
            px-4 py-2 text-sm font-medium rounded-xl
            transition-all duration-200
            ${
              selected === tag
                ? 'bg-[var(--color-primary)] text-white shadow-[0_0_20px_-5px_var(--color-primary-glow)]'
                : 'bg-[var(--color-bg-glass)] text-[var(--color-text-body)] border border-[var(--color-border-glass)] hover:bg-white/5 hover:text-[var(--color-text-heading)] hover:border-[var(--color-border-active)]/30'
            }
          `}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
