/**
 * ImageLightbox Component
 * Fullscreen image gallery with navigation and keyboard support
 * 
 * @example
 * <ImageLightbox images={images} initialIndex={0} client:load />
 */

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@lib/utils';

interface ImageLightboxProps {
  /** Array of image URLs */
  images: string[];
  /** Project title for alt text */
  projectTitle: string;
  /** Initial image index to show */
  initialIndex?: number;
  /** Optional CSS classes */
  className?: string;
}

export default function ImageLightbox({
  images,
  projectTitle,
  initialIndex = 0,
  className,
}: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);

  // Open lightbox
  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    setIsLoading(true);
    document.body.style.overflow = 'hidden';
    // Hide header
    const header = document.querySelector('header');
    if (header) {
      (header as HTMLElement).style.display = 'none';
    }
  }, []);

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    // Show header
    const header = document.querySelector('header');
    if (header) {
      (header as HTMLElement).style.display = '';
    }
  }, []);

  // Navigate to previous image
  const goToPrevious = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  // Navigate to next image
  const goToNext = useCallback(() => {
    setIsLoading(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeLightbox, goToPrevious, goToNext]);

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (images.length === 0) return null;

  return (
    <div className={cn('relative', className)}>
      {/* Main Gallery Grid */}
      <div className="space-y-3">
        {/* Hero Image */}
        <button
          onClick={() => openLightbox(0)}
          className={cn(
            'relative w-full aspect-[16/10] rounded-2xl overflow-hidden',
            'bg-[var(--color-bg-glass)]',
            'border border-[var(--color-border-glass)]',
            'group cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-bg-primary)]'
          )}
        >
          <img
            src={images[0]}
            alt={projectTitle}
            className={cn(
              'w-full h-full object-cover',
              'transition-transform duration-700 ease-out',
              'group-hover:scale-105'
            )}
            loading="eager"
          />
          
          {/* Overlay on hover */}
          <div className={cn(
            'absolute inset-0 flex items-center justify-center',
            'bg-black/0 group-hover:bg-black/40',
            'transition-colors duration-300'
          )}>
            <div className={cn(
              'p-4 rounded-2xl',
              'bg-white/10 backdrop-blur-md',
              'border border-white/20',
              'opacity-0 group-hover:opacity-100',
              'transform scale-90 group-hover:scale-100',
              'transition-all duration-300'
            )}>
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </div>
          </div>

          {/* Image counter badge */}
          {images.length > 1 && (
            <div className={cn(
              'absolute bottom-4 right-4',
              'px-3 py-1.5 rounded-full',
              'bg-black/60 backdrop-blur-md',
              'text-white text-sm font-medium',
              'flex items-center gap-2'
            )}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {images.length} фото
            </div>
          )}
        </button>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.slice(1, 5).map((image, index) => (
              <button
                key={index + 1}
                onClick={() => openLightbox(index + 1)}
                className={cn(
                  'relative aspect-video rounded-xl overflow-hidden',
                  'bg-[var(--color-bg-glass)]',
                  'border border-[var(--color-border-glass)]',
                  'group cursor-pointer',
                  'transition-all duration-300',
                  'hover:border-[var(--color-primary)]/50',
                  'hover:scale-[1.02]',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
                )}
              >
                <img
                  src={image}
                  alt={`${projectTitle} - изображение ${index + 2}`}
                  className={cn(
                    'w-full h-full object-cover',
                    'transition-transform duration-300',
                    'group-hover:scale-110'
                  )}
                  loading="lazy"
                />
                <div className={cn(
                  'absolute inset-0 flex items-center justify-center',
                  'bg-black/0 group-hover:bg-black/30',
                  'transition-colors duration-200'
                )}>
                  <svg
                    className={cn(
                      'w-5 h-5 text-white',
                      'opacity-0 group-hover:opacity-100',
                      'transition-opacity duration-200'
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </button>
            ))}
            
            {/* Show more indicator */}
            {images.length > 5 && (
              <button
                onClick={() => openLightbox(5)}
                className={cn(
                  'relative aspect-video rounded-xl overflow-hidden',
                  'bg-[var(--color-bg-glass)]',
                  'border border-[var(--color-border-glass)]',
                  'flex items-center justify-center',
                  'cursor-pointer',
                  'transition-all duration-300',
                  'hover:bg-[var(--color-primary)]/10',
                  'hover:border-[var(--color-primary)]/40',
                  'focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]'
                )}
              >
                <div className="text-center">
                  <span className="block text-xl font-bold text-[var(--color-primary)]">
                    +{images.length - 5}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    ещё
                  </span>
                </div>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className={cn(
            'fixed inset-0 z-50',
            'flex items-center justify-center',
            'bg-black/95 backdrop-blur-xl',
            'animate-in fade-in duration-200'
          )}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className={cn(
              'absolute top-6 right-6 z-10',
              'p-3 rounded-full',
              'bg-white/10 backdrop-blur-md',
              'border border-white/20',
              'text-white',
              'transition-all duration-200',
              'hover:bg-white/20 hover:scale-110',
              'focus:outline-none focus:ring-2 focus:ring-white/50'
            )}
            aria-label="Закрыть"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation - Previous */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              className={cn(
                'absolute left-4 md:left-8 z-10',
                'p-3 md:p-4 rounded-full',
                'bg-white/10 backdrop-blur-md',
                'border border-white/20',
                'text-white',
                'transition-all duration-200',
                'hover:bg-white/20 hover:scale-110',
                'focus:outline-none focus:ring-2 focus:ring-white/50'
              )}
              aria-label="Предыдущее изображение"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Navigation - Next */}
          {images.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className={cn(
                'absolute right-4 md:right-8 z-10',
                'p-3 md:p-4 rounded-full',
                'bg-white/10 backdrop-blur-md',
                'border border-white/20',
                'text-white',
                'transition-all duration-200',
                'hover:bg-white/20 hover:scale-110',
                'focus:outline-none focus:ring-2 focus:ring-white/50'
              )}
              aria-label="Следующее изображение"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image Container */}
          <div
            className="relative max-w-[90vw] max-h-[85vh] px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Loading spinner */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={cn(
                  'w-12 h-12 rounded-full',
                  'border-2 border-white/20 border-t-white',
                  'animate-spin'
                )} />
              </div>
            )}

            {/* Image */}
            <img
              src={images[currentIndex]}
              alt={`${projectTitle} - изображение ${currentIndex + 1}`}
              className={cn(
                'max-w-full max-h-[85vh] w-auto h-auto',
                'rounded-lg shadow-2xl',
                'object-contain',
                'transition-opacity duration-300',
                isLoading ? 'opacity-0' : 'opacity-100'
              )}
              onLoad={handleImageLoad}
            />
          </div>

          {/* Counter */}
          <div className={cn(
            'absolute bottom-6 left-1/2 -translate-x-1/2',
            'px-4 py-2 rounded-full',
            'bg-white/10 backdrop-blur-md',
            'border border-white/20',
            'text-white text-sm font-medium'
          )}>
            {currentIndex + 1} / {images.length}
          </div>

          {/* Thumbnail strip at bottom */}
          {images.length > 1 && (
            <div className={cn(
              'absolute bottom-16 left-1/2 -translate-x-1/2',
              'flex gap-2 p-2 rounded-xl',
              'bg-black/40 backdrop-blur-md',
              'max-w-[90vw] overflow-x-auto',
              'scrollbar-hide'
            )}>
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLoading(true);
                    setCurrentIndex(index);
                  }}
                  className={cn(
                    'flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden',
                    'transition-all duration-200',
                    index === currentIndex
                      ? 'ring-2 ring-[var(--color-primary)] opacity-100'
                      : 'opacity-50 hover:opacity-80'
                  )}
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
