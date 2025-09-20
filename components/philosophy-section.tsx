function PhilosophySection() {
  return (
    <section className="py-24 px-6 bg-terminal-bg noise-overlay">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            Why <span className="text-terminal-green glow-intense terminal-gradient">Community</span> Matters
          </h2>
        </div>

        <div className="space-y-12">
          <div className="glass-effect rounded-lg p-8 border-l-4 border-terminal-green shadow-glow interactive-glow">
            <h3 className="text-2xl font-mono text-terminal-green glow mb-4">The Challenge</h3>
            <p className="text-gray-200 leading-relaxed mb-4">
              Coding alone means struggling with bugs alone, learning slowly, and missing out on
              collective wisdom. Every developer wastes time solving problems that others have
              already conquered.
            </p>
            <p className="text-gray-300 italic">
              Great developers aren't made in isolation—they're forged in communities.
            </p>
          </div>

          <div className="glass-effect rounded-lg p-8 border-l-4 border-terminal-cyan shadow-glow-cyan interactive-glow">
            <h3 className="text-2xl font-mono text-terminal-cyan glow-cyan mb-4">Our Approach</h3>
            <p className="text-gray-200 leading-relaxed mb-4">
              We've built a community where developers help each other reach and maintain flow state.
              Share knowledge, collaborate on projects, and learn together in an environment designed
              for deep focus and meaningful connections.
            </p>
            <p className="text-gray-300 italic">
              When developers vibe together, everyone's potential multiplies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="space-y-4 glass-effect rounded-lg p-6 border border-red-500/20">
              <h4 className="font-mono text-red-400 text-lg glow-red">Solo Learning</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 text-lg">✗</span>
                  <span>Solve problems alone</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 text-lg">✗</span>
                  <span>Limited feedback on code</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 text-lg">✗</span>
                  <span>Miss learning opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 text-lg">✗</span>
                  <span>Struggle with motivation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 text-lg">✗</span>
                  <span>Reinvent solutions</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 glass-effect rounded-lg p-6 terminal-border-glow">
              <h4 className="font-mono text-terminal-green text-lg glow">Flow State Community</h4>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start gap-3">
                  <span className="text-terminal-green mt-1 text-lg glow">✓</span>
                  <span>Collaborative problem solving</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terminal-green mt-1 text-lg glow">✓</span>
                  <span>Expert code reviews</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terminal-green mt-1 text-lg glow">✓</span>
                  <span>Mentorship opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terminal-green mt-1 text-lg glow">✓</span>
                  <span>Supportive environment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terminal-green mt-1 text-lg glow">✓</span>
                  <span>Shared knowledge base</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-16 py-8">
            <blockquote className="text-3xl font-mono text-terminal-green glow-intense terminal-gradient">
              "Stop coding alone. Start vibing together."
            </blockquote>
            <p className="text-gray-400 mt-6 text-lg">— The Flow State Community</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;