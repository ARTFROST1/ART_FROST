/**
 * ScrollFrameAnimation Component
 * Frame-by-frame animation controlled by scroll position
 * Displays sequential image frames based on user scroll
 */

import { useEffect, useRef, useState } from 'react';

interface Props {
  /** Base path to animation frames */
  framesPath: string;
  /** Total number of frames */
  totalFrames: number;
  /** Frame filename pattern (e.g., 'ezgif-frame-{frame} Background Removed.png') */
  framePattern: string;
  /** Additional CSS classes */
  className?: string;
  /** Alt text for accessibility */
  alt?: string;

  /**
   * Multiplier for scroll progress.
   * `2` means the animation completes a full forward+back ping-pong over the normal scroll range.
   */
  speedMultiplier?: number;

  /** If true, animation plays forward then backward (ping-pong) based on scroll. */
  pingPong?: boolean;
}

export default function ScrollFrameAnimation({
  framesPath,
  totalFrames,
  framePattern,
  className = '',
  alt = '3D Animation',

  speedMultiplier = 4,
  pingPong = true,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const frameIndexRef = useRef(0);

  const rafRef = useRef<number | null>(null);

  // Preload all frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      const frameName = framePattern.replace('{frame}', frameNum);
      // Encode filename to handle spaces and special characters
      const encodedFrameName = frameName.split('/').map(part => encodeURIComponent(part)).join('/');
      img.src = `${framesPath}/${encodedFrameName}`;

      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        console.error(`Failed to load frame: ${img.src}`);
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
        }
      };

      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, [framesPath, totalFrames, framePattern]);

  // Draw frame on canvas
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    
    if (!canvas || !context || !images[frameIndex]) return;

    const img = images[frameIndex];
    
    // Enable smoothing for better down/up-scaling quality.
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = 'high';
    
    // Set actual canvas resolution (accounting for device pixel ratio)
    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    // Clear and draw
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  };

  // Handle scroll
  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return;

    const updateFrameFromScroll = () => {
      rafRef.current = null;

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Use actual page scroll position
      // Progress starts at 0 when page is at top (scrollY = 0)
      // and increases as user scrolls down
      const scrollY = window.scrollY || window.pageYOffset;
      
      // Animation distance: from page top through viewport height + element height
      const scrollDistance = windowHeight + rect.height;
      
      // Base progress (0 to 1 over the scroll distance)
      const baseProgress = Math.min(Math.max(scrollY / scrollDistance, 0), 1);

      // Apply speed multiplier
      const t = baseProgress * speedMultiplier;

      // Triangle wave in [0..1] for ping-pong looping.
      // For t in [0..2]: 0->1->0 (forward then backward).
      const frameProgress = pingPong
        ? 1 - Math.abs((t % 2) - 1)
        : Math.min(t, 1);

      const frameIndex = Math.min(
        Math.floor(frameProgress * totalFrames),
        totalFrames - 1
      );

      if (frameIndex !== frameIndexRef.current) {
        frameIndexRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    };

    const requestUpdate = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(updateFrameFromScroll);
    };

    // Initial draw at frame 0
    drawFrame(0);

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    requestUpdate(); // Initial call

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [imagesLoaded, images, totalFrames, pingPong, speedMultiplier]);

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      role="img"
      aria-label={alt}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          maxWidth: '100%',
          height: 'auto',
          imageRendering: 'auto',
        }}
      />
      
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-[var(--color-primary)]/50 text-sm font-mono animate-pulse">
            Loading animation...
          </div>
        </div>
      )}
    </div>
  );
}
