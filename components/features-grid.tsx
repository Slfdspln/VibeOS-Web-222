import { memo, useMemo } from "react";

const features = [
  {
    title: "Zero Setup Time",
    description: "Boot directly into your coding environment. All tools pre-configured and ready.",
    icon: "⚡",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Natural Language Everything",
    description: "No commands to memorize. Just describe what you want in plain English.",
    icon: "💬",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "AI-First Development",
    description: "Claude Code, Copilot, and more built into the OS. AI assistance at kernel level.",
    icon: "🤖",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Flow State Optimized",
    description: "No notifications, no distractions. Stay in the zone for hours.",
    icon: "🧘",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Instant Context Switching",
    description: "Jump between projects seamlessly. Your environment follows your thoughts.",
    icon: "🔄",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Open Source Forever",
    description: "Built by the community, for the community. Fork it, hack it, make it yours.",
    icon: "🌍",
    gradient: "from-red-500 to-pink-500",
  },
];

const FeaturesGrid = memo(function FeaturesGrid() {
  const memoizedFeatures = useMemo(() => features, []);
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-terminal-bg to-terminal-gray noise-overlay">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            Built for <span className="text-terminal-green glow-intense">Vibe Coding</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Every feature designed to keep you in flow state.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memoizedFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative glass-effect rounded-lg p-6 terminal-border hover:terminal-border-glow transition-all duration-300 interactive-glow"
            >
              <div className="absolute inset-0 terminal-gradient-bg opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4 group-hover:animate-float">{feature.icon}</div>
                <h3 className="text-xl font-mono text-white mb-3 group-hover:text-terminal-green-bright transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[2px] terminal-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg" />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full terminal-border-glow bg-terminal-green/5 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-terminal-green shadow-glow-sm"></span>
            </span>
            <span className="text-terminal-green font-mono glow">
              Currently in Alpha. Join 1,337 developers already vibing.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

export { FeaturesGrid };
export default FeaturesGrid;