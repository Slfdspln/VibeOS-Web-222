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
                href="https://discord.gg/flowstate"
                className="px-8 py-4 bg-terminal-green text-black font-bold rounded-lg hover:bg-terminal-green/90 transition-all hover:shadow-glow-xl hover:scale-105 text-lg animate-glow-pulse"
              >
                Join Discord Community
              </a>
              <a
                href="#community"
                className="px-8 py-4 terminal-border-glow text-terminal-green font-bold rounded-lg hover:bg-terminal-green/10 transition-all text-lg interactive-glow"
              >
                ⭐ Learn More
              </a>
            </div>

            <div className="text-sm text-gray-400">
              <p>Free to join • All skill levels welcome</p>
              <p className="mt-2">Just bring your passion for coding and learning</p>
            </div>


            <div className="mt-12 p-6 glass-effect rounded-lg terminal-border interactive-glow">
              <h4 className="font-mono text-terminal-green glow mb-2">For Community Members</h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Our community is open to all developers who want to improve their flow state.
                Whether you're sharing knowledge, mentoring others, or learning new skills,
                your participation makes our community stronger.
              </p>
              <a
                href="https://github.com/flowstate-community/guidelines"
                className="inline-flex items-center gap-2 text-terminal-green hover:text-terminal-green-bright transition-colors text-sm glow"
              >
                Read Community Guidelines →
              </a>
            </div>
          </div>
        </div>

        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>© 2024 Flow State Community. Open source under MIT License.</p>
          <p className="mt-2">
            Built with love by developers who just want to code in peace.
          </p>
        </footer>
      </div>
    </section>
  );
}

export default DownloadSection;