"use client";

import { useState, memo, useCallback, useMemo } from "react";

const demoScenarios = [
  {
    id: "setup",
    title: "Zero Setup",
    command: "install Python with data science tools",
    response: "Installing Python 3.12 with numpy, pandas, jupyter, scikit-learn... Environment ready in 12 seconds.",
    icon: "⚡",
  },
  {
    id: "debug",
    title: "Smart Debugging",
    command: "why is my API returning 500 errors?",
    response: "Found issue in auth middleware at line 47. Missing await on async validation. Would you like me to fix it?",
    icon: "🔍",
  },
  {
    id: "deploy",
    title: "Instant Deploy",
    command: "deploy this to production with zero downtime",
    response: "Building optimized bundle... Running tests... Deploying with blue-green strategy... Live at app.production.com",
    icon: "🚀",
  },
  {
    id: "refactor",
    title: "AI Refactoring",
    command: "refactor this component to use composition pattern",
    response: "Analyzing component structure... Extracting reusable hooks... Applied composition pattern. 40% less code, 100% more maintainable.",
    icon: "✨",
  },
];

const DemoSection = memo(function DemoSection() {
  const [activeScenario, setActiveScenario] = useState(demoScenarios[0]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleScenarioClick = useCallback((scenario: typeof demoScenarios[0]) => {
    setIsProcessing(true);
    setActiveScenario(scenario);
    setTimeout(() => setIsProcessing(false), 1000);
  }, []);

  const memoizedScenarios = useMemo(() => demoScenarios, []);

  return (
    <section className="py-24 px-6 bg-terminal-bg noise-overlay">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            <span className="text-terminal-green glow-intense terminal-gradient">Natural Language</span> Meets{" "}
            <span className="text-white">Vibe Coding</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            No more memorizing commands. Just describe what you want.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-mono text-terminal-green glow mb-4">Choose a scenario:</h3>
            {memoizedScenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleScenarioClick(scenario)}
                className={`w-full text-left p-4 rounded-lg border transition-all interactive-glow ${
                  activeScenario.id === scenario.id
                    ? "terminal-border-glow bg-terminal-green/10"
                    : "border-gray-800 hover:terminal-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{scenario.icon}</span>
                  <div>
                    <div className="font-mono text-white hover:text-terminal-green-bright transition-colors">{scenario.title}</div>
                    <div className="text-sm text-gray-400">{scenario.command}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="glass-effect terminal-border-glow rounded-lg p-6 ambient-glow">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-auto text-xs text-gray-500 font-mono">vibe mode</span>
            </div>

            <div className="font-mono space-y-4">
              <div className="text-terminal-green glow">
                $ {activeScenario.command}
              </div>

              {isProcessing ? (
                <div className="text-gray-500">
                  <span className="inline-block animate-pulse">Processing...</span>
                </div>
              ) : (
                <div className="text-gray-200 animate-fade-in">
                  {activeScenario.response}
                </div>
              )}

              <div className="pt-4 border-t border-terminal-green/20">
                <div className="text-xs text-gray-400 italic">
                  No config files. No terminal commands. Just vibes.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export { DemoSection };
export default DemoSection;