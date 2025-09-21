"use client";

import dynamic from "next/dynamic";
import { useState, useRef, useEffect, Suspense } from "react";
import { LoadingSpinner } from "./loading-animation";

// Loading fallback component
const ComponentLoadingFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

// Lazy load heavy components using next/dynamic
export const LazyDemoSection = dynamic(() => import("./demo-section"), {
  loading: ComponentLoadingFallback,
  ssr: false,
});

export const LazyFeaturesGrid = dynamic(() => import("./features-grid"), {
  loading: ComponentLoadingFallback,
  ssr: false,
});

export const LazyPhilosophySection = dynamic(() => import("./philosophy-section"), {
  loading: ComponentLoadingFallback,
  ssr: false,
});

export const LazyDownloadSection = dynamic(() => import("./download-section"), {
  loading: ComponentLoadingFallback,
  ssr: false,
});

const ScrollAnimationsFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <LoadingSpinner size="lg" />
  </div>
);

export const LazyScrollAnimations = dynamic(
  () => import("./scroll-animations").then((module) => module.ScrollAnimations),
  {
    ssr: false,
    loading: ScrollAnimationsFallback,
  }
);

// Higher-order component for wrapping lazy components with loading states
interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

export function LazyWrapper({ children, fallback, className }: LazyWrapperProps) {
  const defaultFallback = (
    <div className={`min-h-[200px] flex items-center justify-center ${className || ""}`}>
      <LoadingSpinner size="lg" />
    </div>
  );

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  );
}

// Component for handling intersection-based lazy loading
interface LazyIntersectionProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  fallback?: React.ReactNode;
}

export function LazyIntersection({
  children,
  threshold = 0.1,
  rootMargin = "100px",
  className = "",
  fallback
}: LazyIntersectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoaded) {
          setIsVisible(true);
          setIsLoaded(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, isLoaded]);

  const defaultFallback = (
    <div className="min-h-[200px] flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );

  return (
    <div ref={elementRef} className={className}>
      {isVisible ? children : (fallback || defaultFallback)}
    </div>
  );
}

// Preloader for critical resources
export function ResourcePreloader() {
  useEffect(() => {
    // Preload critical CSS and fonts
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'style';
    preloadLink.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap';
    document.head.appendChild(preloadLink);

    // Preload critical JavaScript modules
    if ('modulepreload' in HTMLLinkElement.prototype) {
      const modulePreload = document.createElement('link');
      modulePreload.rel = 'modulepreload';
      modulePreload.href = '/components/terminal-hero.tsx';
      document.head.appendChild(modulePreload);
    }

    // Cleanup
    return () => {
      document.head.removeChild(preloadLink);
    };
  }, []);

  return null;
}
