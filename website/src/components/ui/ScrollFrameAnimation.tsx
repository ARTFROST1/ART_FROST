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
}

export default function ScrollFrameAnimation({
  framesPath,
  totalFrames,
  framePattern,
  className = '',
  alt = '3D Animation',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const frameIndexRef = useRef(0);

  // Preload all frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(3, '0');
      const frameName = framePattern.replace('{frame}', frameNum);
      img.src = `${framesPath}/${frameName}`;

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

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      // Get scroll progress within viewport
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress (0 to 1)
      // Animation starts when element enters viewport from bottom
      // and completes when it exits from top
      const scrollStart = windowHeight;
      const scrollEnd = -rect.height;
      const scrollDistance = scrollStart - scrollEnd;
      const scrollProgress = Math.min(
        Math.max((scrollStart - rect.top) / scrollDistance, 0),
        1
      );

      // Map scroll progress to frame index
      const frameIndex = Math.min(
        Math.floor(scrollProgress * totalFrames),
        totalFrames - 1
      );

      if (frameIndex !== frameIndexRef.current) {
        frameIndexRef.current = frameIndex;
        drawFrame(frameIndex);
      }
    };

    // Initial draw
    drawFrame(0);

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [imagesLoaded, images, totalFrames]);

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
