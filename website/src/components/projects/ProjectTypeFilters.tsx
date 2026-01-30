/**
 * ProjectTypeFilters Component
 * Полноширинный табы-фильтр по типам проектов в стиле glassmorphism
 * 
 * @example
 * <ProjectTypeFilters client:idle types={allTypes} selectedType={selectedType} />
 */

import { useState, useCallback, useEffect } from 'react';

// SVG Icons for project types
const ICONS = {
  all: '<path d="M4 4h7a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1zm9 0h7a1 1 0 011 1v7a1 1 0 01-1 1h-7a1 1 0 01-1-1V5a1 1 0 011-1zM4 13h7a1 1 0 011 1v7a1 1 0 01-1 1H4a1 1 0 01-1-1v-7a1 1 0 011-1zm9 0h7a1 1 0 011 1v7a1 1 0 01-1 1h-7a1 1 0 01-1-1v-7a1 1 0 011-1z"/>',
  'mobile-app': '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
  website: '<circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  'telegram-bot': '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  game: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m6 8 4 4-4 4"/><path d="M12 12h6"/>',
  'desktop-app': '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
  library: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/>',
  tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  template: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" x2="12" y1="18" y2="12"/><line x1="9" x2="15" y1="15" y2="15"/>',
  api: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  other: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>',
} as const;

// Type configuration with icons and labels
const TYPE_CONFIG = {
  all: { label: 'Все проекты', icon: ICONS.all },
  'mobile-app': { label: 'Мобильные', icon: ICONS['mobile-app'] },
  website: { label: 'Веб-сайты', icon: ICONS.website },
  'telegram-bot': { label: 'Telegram', icon: ICONS['telegram-bot'] },
  game: { label: 'Игры', icon: ICONS.game },
  'desktop-app': { label: 'Десктоп', icon: ICONS['desktop-app'] },
  library: { label: 'Библиотеки', icon: ICONS.library },
  tool: { label: 'Инструменты', icon: ICONS.tool },
  template: { label: 'Шаблоны', icon: ICONS.template },
  api: { label: 'API', icon: ICONS.api },
  other: { label: 'Другое', icon: ICONS.other },
} as const;

type ProjectType = keyof typeof TYPE_CONFIG;

interface ProjectTypeFiltersProps {
  /** Available project types */
  types: string[];
  /** Currently selected type */
  selectedType?: string;
  /** Callback when type is selected */
  onTypeSelect?: (type: string | null) => void;
}

export default function ProjectTypeFilters({
  types,
  selectedType,
  onTypeSelect,
}: ProjectTypeFiltersProps) {
  const [selected, setSelected] = useState<string | null>(selectedType || null);

  // Initialize from URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const typeParam = params.get('type');
      if (typeParam) {
        setSelected(typeParam);
      }
    }
  }, []);

  const handleTypeClick = useCallback((type: string | null) => {
    setSelected(type);
    onTypeSelect?.(type);
    
    // Update URL with filter parameter
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (type) {
        url.searchParams.set('type', type);
      } else {
        url.searchParams.delete('type');
      }
      window.history.pushState({}, '', url.toString());
      
      // Dispatch custom event for page to handle filtering
      window.dispatchEvent(new CustomEvent('projectTypeFilterChange', {
        detail: { type }
      }));
    }
  }, [onTypeSelect]);

  if (types.length === 0) {
    return null;
  }

  // Custom order: all, mobile-app, website, telegram-bot, then rest
  const typeOrder = ['all', 'mobile-app', 'website', 'telegram-bot', 'game', 'desktop-app', 'library', 'tool', 'template', 'api', 'other'];
  
  // Add "all" to the beginning, then filter available types by custom order
  const availableTypes = new Set(['all', ...types]);
  const allTypes = typeOrder.filter(type => availableTypes.has(type));

  return (
    <nav 
      className="relative overflow-hidden rounded-2xl mb-8"
      style={{
        background: 'var(--color-bg-glass)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid var(--color-border-glass)',
      }}
    >
      {/* Gradient highlight on top */}
      <div 
        className="absolute inset-x-0 top-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(16, 185, 129, 0.3) 50%, transparent 100%)'
        }}
      />
      
      {/* Tabs container - scrollable on mobile, grid on desktop */}
      <div className="flex sm:grid sm:grid-flow-col sm:auto-cols-fr overflow-x-auto scrollbar-hide">
        {allTypes.map((type) => {
          const config = TYPE_CONFIG[type as ProjectType] || TYPE_CONFIG.other;
          const isSelected = type === 'all' ? selected === null : selected === type;
          
          return (
            <button
              key={type}
              type="button"
              onClick={() => handleTypeClick(type === 'all' ? null : type)}
              className={`
                relative flex-shrink-0 px-4 sm:px-3 md:px-4 py-4 text-sm font-medium
                transition-all duration-300 ease-out
                border-r border-[var(--color-border-glass)] last:border-r-0
                ${
                  isSelected
                    ? 'text-white'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-heading)]'
                }
              `}
            >
              {/* Active indicator background */}
              {isSelected && (
                <>
                  <div 
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)',
                    }}
                  />
                  {/* Bottom border indicator */}
                  <div 
                    className="absolute bottom-0 inset-x-0 h-0.5"
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%)',
                      boxShadow: '0 0 20px -5px var(--color-primary-glow)',
                    }}
                  />
                </>
              )}
              
              {/* Content */}
              <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0"
                  dangerouslySetInnerHTML={{ __html: config.icon }}
                />
                <span className="hidden xs:inline text-xs sm:text-sm">{config.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
