import { onCLS, onFCP, onINP, onLCP, onTTFB } from 'web-vitals';

// Performance metrics tracking
export interface PerformanceMetrics {
  cls: number | null;
  fid: number | null;
  fcp: number | null;
  lcp: number | null;
  ttfb: number | null;
  inp: number | null;
}

class PerformanceMonitor {
  private metrics: PerformanceMetrics = {
    cls: null,
    fid: null,
    fcp: null,
    lcp: null,
    ttfb: null,
    inp: null,
  };

  private callbacks: Array<(metrics: PerformanceMetrics) => void> = [];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeMetrics();
    }
  }

  private initializeMetrics() {
    if (typeof window === 'undefined') return;
    onCLS((metric) => {
      this.metrics.cls = metric.value;
      this.notifyCallbacks();
    });

    // FID is deprecated, using INP instead
    onINP((metric) => {
      this.metrics.fid = metric.value; // Using INP as FID replacement
      this.notifyCallbacks();
    });

    onFCP((metric) => {
      this.metrics.fcp = metric.value;
      this.notifyCallbacks();
    });

    onLCP((metric) => {
      this.metrics.lcp = metric.value;
      this.notifyCallbacks();
    });

    onTTFB((metric) => {
      this.metrics.ttfb = metric.value;
      this.notifyCallbacks();
    });

    onINP((metric) => {
      this.metrics.inp = metric.value;
      this.notifyCallbacks();
    });
  }

  private notifyCallbacks() {
    this.callbacks.forEach(callback => callback(this.metrics));
  }

  public onMetricsUpdate(callback: (metrics: PerformanceMetrics) => void) {
    this.callbacks.push(callback);
    // Call immediately with current metrics
    callback(this.metrics);
  }

  public getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  public logToConsole() {
    console.group('VibeOS Performance Metrics');
    console.log('Cumulative Layout Shift (CLS):', this.metrics.cls?.toFixed(3) || 'measuring...');
    console.log('First Input Delay (FID):', this.metrics.fid ? `${this.metrics.fid.toFixed(2)}ms` : 'measuring...');
    console.log('First Contentful Paint (FCP):', this.metrics.fcp ? `${this.metrics.fcp.toFixed(2)}ms` : 'measuring...');
    console.log('Largest Contentful Paint (LCP):', this.metrics.lcp ? `${this.metrics.lcp.toFixed(2)}ms` : 'measuring...');
    console.log('Time to First Byte (TTFB):', this.metrics.ttfb ? `${this.metrics.ttfb.toFixed(2)}ms` : 'measuring...');
    console.log('Interaction to Next Paint (INP):', this.metrics.inp ? `${this.metrics.inp.toFixed(2)}ms` : 'measuring...');
    console.groupEnd();
  }
}

export const performanceMonitor = new PerformanceMonitor();

// Utility functions for performance optimization
export class PerformanceUtils {
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static createRAFThrottle<T extends (...args: any[]) => any>(
    func: T
  ): (...args: Parameters<T>) => void {
    let rafId: number | null = null;
    return (...args: Parameters<T>) => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(() => {
        func.apply(this, args);
        rafId = null;
      });
    };
  }

  static isSlowDevice(): boolean {
    // Detect slow devices based on various factors
    if (typeof navigator === 'undefined') return false;

    const connection = (navigator as any).connection;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    // Consider device slow if:
    // - Less than 4 CPU cores
    // - Slow network connection
    // - Save-Data header is present
    return (
      hardwareConcurrency < 4 ||
      (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) ||
      (connection && connection.saveData === true)
    );
  }

  static prefersReducedMotion(): boolean {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  static getDevicePixelRatio(): number {
    if (typeof window === 'undefined') return 1;
    return Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for performance
  }

  static measurePerformance(name: string, fn: () => void): number {
    const start = performance.now();
    fn();
    const end = performance.now();
    const duration = end - start;
    console.log(`${name} took ${duration.toFixed(2)}ms`);
    return duration;
  }

  static createIntersectionObserver(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ): IntersectionObserver | null {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return null;
    }

    return new IntersectionObserver(callback, {
      rootMargin: '50px',
      threshold: 0.1,
      ...options,
    });
  }

  static lazy<T>(factory: () => T): () => T {
    let instance: T;
    let initialized = false;

    return () => {
      if (!initialized) {
        instance = factory();
        initialized = true;
      }
      return instance;
    };
  }
}

// Performance monitoring component
export function usePerformanceMonitoring() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Log performance metrics after a delay
    setTimeout(() => {
      performanceMonitor.logToConsole();
    }, 5000);
  }
}