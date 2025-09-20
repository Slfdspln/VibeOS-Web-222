"use client";

import { useState, useEffect } from "react";
import { performanceAnalyzer, PerformanceAnalysis, PERFORMANCE_THRESHOLDS } from "@/lib/performance-analyzer";
import { usePerformanceMonitoring } from "@/lib/performance";

interface PerformanceDashboardProps {
  show?: boolean;
}

export function PerformanceDashboard({ show = process.env.NODE_ENV === 'development' }: PerformanceDashboardProps) {
  const [analysis, setAnalysis] = useState<PerformanceAnalysis | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  usePerformanceMonitoring();

  useEffect(() => {
    if (!show) return;

    const startMonitoring = () => {
      performanceAnalyzer.startContinuousMonitoring((newAnalysis) => {
        setAnalysis(newAnalysis);
      });
    };

    // Start monitoring after a delay to allow initial page load
    const timer = setTimeout(startMonitoring, 2000);

    return () => clearTimeout(timer);
  }, [show]);

  if (!show || !analysis) return null;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 50) return "text-yellow-400";
    return "text-red-400";
  };

  const getMetricColor = (score: string) => {
    switch (score) {
      case 'good': return "text-green-400";
      case 'needs-improvement': return "text-yellow-400";
      case 'poor': return "text-red-400";
      default: return "text-gray-400";
    }
  };

  const formatValue = (key: string, value: number | null) => {
    if (value === null) return "Measuring...";
    const unit = key === 'cls' ? '' : 'ms';
    return `${value.toFixed(key === 'cls' ? 3 : 0)}${unit}`;
  };

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div className="bg-black/90 backdrop-blur-sm border border-terminal-green/30 rounded-lg shadow-xl">
        {/* Header */}
        <div
          className="flex items-center justify-between p-3 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getScoreColor(analysis.score)} animate-pulse`} />
            <span className="text-terminal-green font-mono text-sm">Performance</span>
            <span className={`font-mono text-xs ${getScoreColor(analysis.score)}`}>
              {analysis.score}/100
            </span>
          </div>
          <button className="text-terminal-green/60 hover:text-terminal-green transition-colors">
            <svg
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-3 pb-3 border-t border-terminal-green/20">
            {/* Core Web Vitals */}
            <div className="mb-3">
              <h4 className="text-terminal-green font-mono text-xs mb-2">Core Web Vitals</h4>
              <div className="space-y-1">
                {(['lcp', 'fid', 'cls'] as const).map((key) => {
                  const metric = analysis.metrics[key];
                  return (
                    <div key={key} className="flex justify-between items-center text-xs">
                      <span className="text-gray-300 font-mono">{key.toUpperCase()}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">
                          {formatValue(key, metric.value)}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${getMetricColor(metric.score)}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex-1 px-2 py-1 bg-terminal-green/10 text-terminal-green font-mono text-xs rounded hover:bg-terminal-green/20 transition-colors"
              >
                {showDetails ? 'Hide' : 'Details'}
              </button>
              <button
                onClick={async () => {
                  const report = await performanceAnalyzer.generateReport();
                  console.log(report);
                  navigator.clipboard?.writeText(report);
                }}
                className="flex-1 px-2 py-1 bg-terminal-green/10 text-terminal-green font-mono text-xs rounded hover:bg-terminal-green/20 transition-colors"
                title="Copy report to clipboard"
              >
                Report
              </button>
            </div>

            {/* Detailed Metrics */}
            {showDetails && (
              <div className="mt-3 pt-3 border-t border-terminal-green/20">
                <h4 className="text-terminal-green font-mono text-xs mb-2">All Metrics</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {Object.entries(analysis.metrics).map(([key, metric]) => (
                    <div key={key} className="flex justify-between items-center text-xs">
                      <span className="text-gray-300 font-mono">{key}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">
                          {formatValue(key, metric.value)}
                        </span>
                        <span className={`text-xs ${getMetricColor(metric.score)}`}>
                          {metric.score}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recommendations */}
                {analysis.recommendations.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-terminal-green/20">
                    <h4 className="text-terminal-green font-mono text-xs mb-2">Recommendations</h4>
                    <div className="space-y-1 max-h-20 overflow-y-auto">
                      {analysis.recommendations.slice(0, 2).map((rec, index) => (
                        <p key={index} className="text-gray-400 text-xs leading-relaxed">
                          {rec.length > 60 ? `${rec.substring(0, 60)}...` : rec}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Performance monitoring component for production
export function PerformanceReporter() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // In production, log performance data to analytics
      performanceAnalyzer.startContinuousMonitoring((analysis) => {
        // Send to analytics service
        if (typeof gtag !== 'undefined') {
          gtag('event', 'performance_analysis', {
            custom_parameter_score: analysis.score,
            custom_parameter_lcp: analysis.metrics.lcp.value,
            custom_parameter_fid: analysis.metrics.fid.value,
            custom_parameter_cls: analysis.metrics.cls.value,
          });
        }
      });
    }
  }, []);

  return null;
}