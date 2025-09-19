import { TerminalHero } from "@/components/terminal-hero";
import {
  LazyDemoSection,
  LazyFeaturesGrid,
  LazyPhilosophySection,
  LazyDownloadSection,
  LazyScrollAnimations,
  LazyIntersection,
  ResourcePreloader
} from "@/components/lazy-components";
import { PerformanceDashboard, PerformanceReporter } from "@/components/performance-dashboard";

export default function Home() {
  return (
    <main className="min-h-screen bg-terminal-bg">
      <ResourcePreloader />
      <PerformanceReporter />

      <LazyScrollAnimations />

      <TerminalHero />

      <LazyIntersection className="fade-in-section">
        <LazyDemoSection />
      </LazyIntersection>

      <LazyIntersection className="fade-in-section">
        <LazyFeaturesGrid />
      </LazyIntersection>

      <LazyIntersection className="fade-in-section">
        <LazyPhilosophySection />
      </LazyIntersection>

      <LazyIntersection className="fade-in-section">
        <LazyDownloadSection />
      </LazyIntersection>

      <PerformanceDashboard />
    </main>
  );
}