import { memo, useMemo } from "react";

const features = [
  {
    title: "Daily Flow Sessions",
    description: "Join scheduled coding sessions with fellow developers. Share screens, learn together.",
    icon: "👥",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    title: "Mentor Network",
    description: "Connect with experienced developers. Get guidance, code reviews, and career advice.",
    icon: "🎓",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Project Collaboration",
    description: "Work on open source projects together. Build your portfolio with community support.",
    icon: "🤝",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Flow State Techniques",
    description: "Learn proven methods to enter and maintain deep focus. Workshops, guides, and tools.",
    icon: "🧘",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Knowledge Sharing",
    description: "Share discoveries, tips, and solutions. Build collective wisdom that benefits everyone.",
    icon: "💡",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    title: "Exclusive Resources",
    description: "Access member-only content, tools, and early previews. Premium learning materials.",
    icon: "🔐",
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
            Community <span className="text-terminal-green glow-intense">Benefits</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            What you get when you join our developer flow state community.
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
              Join 1,337+ developers already building together in flow state.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
});

export { FeaturesGrid };
export default FeaturesGrid;