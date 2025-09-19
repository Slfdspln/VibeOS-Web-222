function PhilosophySection() {
  return (
    <section className="py-24 px-6 bg-terminal-bg noise-overlay">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-4">
            The <span className="text-terminal-green glow-intense terminal-gradient">Vibe Coding</span> Manifesto
          </h2>
        </div>

        <div className="space-y-12">
          <div className="glass-effect rounded-lg p-8 border-l-4 border-terminal-green shadow-glow interactive-glow">
            <h3 className="text-2xl font-mono text-terminal-green glow mb-4">The Problem</h3>
            <p className="text-gray-200 leading-relaxed mb-4">
              Every time you leave your editor to configure something, you lose your flow.
              Every terminal command you have to Google breaks your concentration.
              Every settings panel you navigate through pulls you out of the zone.
            </p>
            <p className="text-gray-300 italic">
              Traditional operating systems weren't built for developers in flow state.
            </p>
          </div>

          <div className="glass-effect rounded-lg p-8 border-l-4 border-terminal-cyan shadow-glow-cyan interactive-glow">
            <h3 className="text-2xl font-mono text-terminal-cyan glow-cyan mb-4">The Solution</h3>
            <p className="text-gray-200 leading-relaxed mb-4">
              VibeOS removes every barrier between your thoughts and your code.
              No menus, no settings, no complex commands. Just natural conversation
              with an OS that understands developer intent.
            </p>
            <p className="text-gray-300 italic">
              When you're vibing, the OS should vibe with you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <div className="space-y-4 glass-effect rounded-lg p-6 border border-red-500/20">
              <h4 className="font-mono text-red-400 text-lg glow-red">Traditional OS</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 text-lg">✗</span>
                  <span>Hunt through settings panels</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 text-lg">✗</span>
                  <span>Memorize terminal commands</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 text-lg">✗</span>
                  <span>Context switch constantly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 text-lg">✗</span>
                  <span>Break flow for configuration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 text-lg">✗</span>
                  <span>Distracted by notifications</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 glass-effect rounded-lg p-6 terminal-border-glow">
              <h4 className="font-mono text-terminal-green text-lg glow">VibeOS</h4>
              <ul className="space-y-3 text-gray-200">
                <li className="flex items-start gap-3">
                  <span className="text-terminal-green mt-1 text-lg glow">✓</span>
                  <span>Describe what you want</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terminal-green mt-1 text-lg glow">✓</span>
                  <span>Use natural language</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terminal-green mt-1 text-lg glow">✓</span>
                  <span>Stay in your editor</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terminal-green mt-1 text-lg glow">✓</span>
                  <span>Zero configuration needed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-terminal-green mt-1 text-lg glow">✓</span>
                  <span>Pure focus, pure flow</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-16 py-8">
            <blockquote className="text-3xl font-mono text-terminal-green glow-intense terminal-gradient">
              "Stop configuring. Start vibing."
            </blockquote>
            <p className="text-gray-400 mt-6 text-lg">— The VibeOS Community</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PhilosophySection;