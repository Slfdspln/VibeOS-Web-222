function DownloadSection() {
  return (
    <section id="download" className="py-24 px-6 bg-gradient-to-b from-terminal-gray to-terminal-bg noise-overlay">
      <div className="max-w-4xl mx-auto">
        <div className="glass-effect terminal-border-glow rounded-2xl p-12 text-center ambient-glow">
          <h2 className="text-4xl md:text-5xl font-bold font-mono mb-6">
            Ready to <span className="text-terminal-green glow-intense terminal-gradient">Join the Community?</span>
          </h2>

          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with fellow developers and experience what flow state coding is all about.
          </p>

          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/vibe-os/core/releases"
                className="px-8 py-4 bg-terminal-green text-black font-bold rounded-lg hover:bg-terminal-green/90 transition-all hover:shadow-glow-xl hover:scale-105 text-lg animate-glow-pulse"
              >
                Download Alpha v0.1.0
              </a>
              <a
                href="https://github.com/vibe-os/core"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 terminal-border-glow text-terminal-green font-bold rounded-lg hover:bg-terminal-green/10 transition-all text-lg interactive-glow"
              >
                ⭐ Star on GitHub
              </a>
            </div>

            <div className="text-sm text-gray-400">
              <p>Alpha release for Linux x64 • macOS and Windows coming soon</p>
              <p className="mt-2">Minimum 8GB RAM • 20GB disk space</p>
            </div>

            <div className="pt-20 mt-12 border-t border-terminal-green/20">
              <h3 className="text-xl font-mono text-terminal-green glow mb-6">Join the Community</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://discord.gg/vibeos"
                  className="px-6 py-2 text-gray-400 hover:text-terminal-green transition-all hover:glow"
                >
                  Discord
                </a>
                <a
                  href="https://github.com/vibe-os/core"
                  className="px-6 py-2 text-gray-400 hover:text-terminal-green transition-all hover:glow"
                >
                  GitHub
                </a>
                <a
                  href="https://twitter.com/vibeos"
                  className="px-6 py-2 text-gray-400 hover:text-terminal-green transition-all hover:glow"
                >
                  Twitter
                </a>
                <a
                  href="https://reddit.com/r/vibeos"
                  className="px-6 py-2 text-gray-400 hover:text-terminal-green transition-all hover:glow"
                >
                  Reddit
                </a>
              </div>
            </div>

            <div className="mt-12 p-6 glass-effect rounded-lg terminal-border interactive-glow">
              <h4 className="font-mono text-terminal-green glow mb-2">For Contributors</h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                VibeOS is open source and we welcome contributions. Whether you're fixing bugs,
                adding features, or improving docs, your help makes VibeOS better for everyone.
              </p>
              <a
                href="https://github.com/vibe-os/core/blob/main/CONTRIBUTING.md"
                className="inline-flex items-center gap-2 text-terminal-green hover:text-terminal-green-bright transition-colors text-sm glow"
              >
                Read Contributing Guide →
              </a>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>© 2024 VibeOS. Open source under MIT License.</p>
          <p className="mt-2">
            Built with love by developers who just want to code in peace.
          </p>
        </footer>
      </div>
    </section>
  );
}

export default DownloadSection;