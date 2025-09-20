import { performanceMonitor, PerformanceMetrics } from './performance';

// Performance thresholds based on Google's recommendations
export const PERFORMANCE_THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
  fid: { good: 200, poor: 500 }, // Using INP thresholds as FID replacement
  fcp: { good: 1800, poor: 3000 }, // First Contentful Paint (ms)
  cls: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  ttfb: { good: 800, poor: 1800 }, // Time to First Byte (ms)
  inp: { good: 200, poor: 500 }, // Interaction to Next Paint (ms)
} as const;

export type PerformanceScore = 'good' | 'needs-improvement' | 'poor';

export interface PerformanceAnalysis {
  score: number; // 0-100
  metrics: {
    [K in keyof PerformanceMetrics]: {
      value: number | null;
      score: PerformanceScore;
      impact: 'high' | 'medium' | 'low';
    };
  };
  recommendations: string[];
  overall: PerformanceScore;
}

export class PerformanceAnalyzer {
  private getScore(metric: keyof PerformanceMetrics, value: number | null): PerformanceScore {
    if (value === null) return 'poor';

    const threshold = PERFORMANCE_THRESHOLDS[metric];
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  private getMetricWeight(metric: keyof PerformanceMetrics): number {
    // Weights based on Core Web Vitals importance and user experience impact
    const weights = {
      lcp: 0.25, // Core Web Vital
      fid: 0.25, // Core Web Vital
      cls: 0.25, // Core Web Vital
      fcp: 0.15,
      ttfb: 0.05,
      inp: 0.05,
    };
    return weights[metric];
  }

  private getImpact(metric: keyof PerformanceMetrics): 'high' | 'medium' | 'low' {
    const highImpact: (keyof PerformanceMetrics)[] = ['lcp', 'fid', 'cls'];
    const mediumImpact: (keyof PerformanceMetrics)[] = ['fcp', 'inp'];

    if (highImpact.includes(metric)) return 'high';
    if (mediumImpact.includes(metric)) return 'medium';
    return 'low';
  }

  private generateRecommendations(metrics: PerformanceMetrics): string[] {
    const recommendations: string[] = [];

    if (metrics.lcp !== null && metrics.lcp > PERFORMANCE_THRESHOLDS.lcp.good) {
      recommendations.push(
        'Optimize Largest Contentful Paint by reducing server response time, using efficient caching, and optimizing critical resources.'
      );
    }

    if (metrics.fid !== null && metrics.fid > PERFORMANCE_THRESHOLDS.fid.good) {
      recommendations.push(
        'Improve First Input Delay by reducing JavaScript execution time, breaking up long tasks, and using web workers.'
      );
    }

    if (metrics.cls !== null && metrics.cls > PERFORMANCE_THRESHOLDS.cls.good) {
      recommendations.push(
        'Reduce Cumulative Layout Shift by setting size attributes on images, reserving space for ads, and avoiding inserting content above existing content.'
      );
    }

    if (metrics.fcp !== null && metrics.fcp > PERFORMANCE_THRESHOLDS.fcp.good) {
      recommendations.push(
        'Optimize First Contentful Paint by reducing server response time, eliminating render-blocking resources, and optimizing CSS.'
      );
    }

    if (metrics.ttfb !== null && metrics.ttfb > PERFORMANCE_THRESHOLDS.ttfb.good) {
      recommendations.push(
        'Improve Time to First Byte by optimizing server configuration, using a CDN, and implementing efficient caching strategies.'
      );
    }

    if (metrics.inp !== null && metrics.inp > PERFORMANCE_THRESHOLDS.inp.good) {
      recommendations.push(
        'Optimize Interaction to Next Paint by reducing JavaScript execution time, optimizing event handlers, and using scheduler.postTask for non-critical work.'
      );
    }

    if (recommendations.length === 0) {
      recommendations.push('Great job! Your site is performing well across all Core Web Vitals.');
    }

    return recommendations;
  }

  public analyze(metrics: PerformanceMetrics): PerformanceAnalysis {
    const metricAnalysis = {} as PerformanceAnalysis['metrics'];
    let totalScore = 0;
    let validMetrics = 0;

    // Analyze each metric
    (Object.keys(metrics) as (keyof PerformanceMetrics)[]).forEach(key => {
      const value = metrics[key];
      const score = this.getScore(key, value);
      const impact = this.getImpact(key);
      const weight = this.getMetricWeight(key);

      metricAnalysis[key] = { value, score, impact };

      if (value !== null) {
        const numericScore = score === 'good' ? 100 : score === 'needs-improvement' ? 60 : 20;
        totalScore += numericScore * weight;
        validMetrics += weight;
      }
    });

    // Calculate overall score
    const overallScore = validMetrics > 0 ? Math.round(totalScore / validMetrics) : 0;

    // Determine overall performance
    const overall: PerformanceScore =
      overallScore >= 80 ? 'good' :
      overallScore >= 50 ? 'needs-improvement' :
      'poor';

    const recommendations = this.generateRecommendations(metrics);

    return {
      score: overallScore,
      metrics: metricAnalysis,
      recommendations,
      overall,
    };
  }

  public startContinuousMonitoring(callback: (analysis: PerformanceAnalysis) => void): void {
    performanceMonitor.onMetricsUpdate((metrics) => {
      const analysis = this.analyze(metrics);
      callback(analysis);
    });
  }

  public async generateReport(): Promise<string> {
    const metrics = performanceMonitor.getMetrics();
    const analysis = this.analyze(metrics);

    const report = `
# VibeOS Performance Report

## Overall Score: ${analysis.score}/100 (${analysis.overall})

## Core Web Vitals
${Object.entries(analysis.metrics)
  .filter(([key]) => ['lcp', 'fid', 'cls'].includes(key))
  .map(([key, data]) => {
    const value = data.value;
    const unit = key === 'cls' ? '' : 'ms';
    return `- **${key}**: ${value !== null ? `${value.toFixed(2)}${unit}` : 'Measuring...'} (${data.score})`;
  })
  .join('\n')}

## Additional Metrics
${Object.entries(analysis.metrics)
  .filter(([key]) => !['lcp', 'fid', 'cls'].includes(key))
  .map(([key, data]) => {
    const value = data.value;
    const unit = 'ms';
    return `- **${key}**: ${value !== null ? `${value.toFixed(2)}${unit}` : 'Measuring...'} (${data.score})`;
  })
  .join('\n')}

## Recommendations
${analysis.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

---
*Report generated at ${new Date().toISOString()}*
    `.trim();

    return report;
  }
}

// Create a global instance
export const performanceAnalyzer = new PerformanceAnalyzer();

// Performance testing utilities
export class PerformanceTester {
  private measurements: Map<string, number[]> = new Map();

  public measure<T>(name: string, fn: () => T): T {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    const duration = end - start;

    if (!this.measurements.has(name)) {
      this.measurements.set(name, []);
    }
    this.measurements.get(name)!.push(duration);

    return result;
  }

  public async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    const start = performance.now();
    const result = await fn();
    const end = performance.now();
    const duration = end - start;

    if (!this.measurements.has(name)) {
      this.measurements.set(name, []);
    }
    this.measurements.get(name)!.push(duration);

    return result;
  }

  public getStats(name: string) {
    const measurements = this.measurements.get(name) || [];
    if (measurements.length === 0) return null;

    const sorted = [...measurements].sort((a, b) => a - b);
    const sum = measurements.reduce((a, b) => a + b, 0);

    return {
      count: measurements.length,
      min: Math.min(...measurements),
      max: Math.max(...measurements),
      avg: sum / measurements.length,
      median: sorted[Math.floor(sorted.length / 2)],
      p95: sorted[Math.floor(sorted.length * 0.95)],
      p99: sorted[Math.floor(sorted.length * 0.99)],
    };
  }

  public getAllStats() {
    const stats: Record<string, ReturnType<typeof this.getStats>> = {};
    for (const [name] of this.measurements) {
      stats[name] = this.getStats(name);
    }
    return stats;
  }

  public clear(name?: string) {
    if (name) {
      this.measurements.delete(name);
    } else {
      this.measurements.clear();
    }
  }
}

export const performanceTester = new PerformanceTester();