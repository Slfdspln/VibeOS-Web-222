"use client";

export function VideoHero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-terminal-bg to-terminal-gray px-6 pt-20 overflow-hidden scanlines noise-overlay">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.08),transparent_50%)]" />
      <div className="absolute inset-0 ambient-glow" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-mono">
          <span className="text-terminal-green glow-intense">Join the</span>{" "}
          <span className="bg-clip-text text-transparent terminal-gradient">
            Flow State Community
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
          Connect with developers who prioritize deep work and flow state. Learn, build, and vibe together.
        </p>

        {/* Video Placeholder */}
        <div className="glass-effect terminal-border-glow rounded-lg p-8 max-w-4xl mx-auto mb-8 interactive-glow">
          <div className="aspect-video bg-terminal-gray/50 rounded-lg flex items-center justify-center border-2 border-dashed border-terminal-green/30">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-terminal-green/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-terminal-green"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-terminal-green font-mono text-lg">Video Coming Soon</p>
              <p className="text-gray-400 text-sm mt-2">Discover what our community is all about</p>
            </div>
          </div>
        </div>

        {/* Get Started CTA */}
        <div className="mb-12">
          <a
            href="#community"
            className="px-12 py-4 bg-terminal-green text-black font-bold rounded-lg hover:bg-terminal-green/90 transition-all hover:shadow-glow-lg hover:scale-105 animate-glow-pulse text-lg"
          >
            Get Started - Join Community
          </a>
        </div>

        <div className="text-sm text-gray-500">
          Built by developers, for developers. Community-driven forever.
        </div>
      </div>

      <div className="absolute bottom-10 animate-float">
        <svg
          className="w-6 h-6 text-terminal-green/70 glow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
}