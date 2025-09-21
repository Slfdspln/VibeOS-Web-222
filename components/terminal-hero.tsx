"use client";

import { useEffect, useState, useRef, useCallback, useMemo, memo } from "react";
import { PerformanceUtils } from "@/lib/performance";

const commands = [
  { input: "create a React app with TypeScript", output: "✓ Initializing React project with TypeScript..." },
  { input: "run my tests in watch mode", output: "✓ Running test suite with --watch flag..." },
  { input: "deploy to staging", output: "✓ Building and deploying to staging environment..." },
  { input: "show me performance bottlenecks", output: "✓ Analyzing performance metrics..." },
  { input: "switch to backend project", output: "✓ Loading backend workspace..." },
];

const TerminalHero = memo(function TerminalHero() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  const rafIdRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const charIndexRef = useRef(0);

  // Optimize typing speed based on device performance
  const typingSpeed = useMemo(() => {
    const isSlowDevice = PerformanceUtils.isSlowDevice();
    const prefersReducedMotion = PerformanceUtils.prefersReducedMotion();

    if (prefersReducedMotion) return 20; // Much faster for accessibility
    if (isSlowDevice) return 35; // Faster on slow devices
    return 50; // Default speed
  }, []);

  const resetTyping = useCallback(() => {
    setShowOutput(false);
    setDisplayedText("");
    setIsTyping(true);
    setCurrentCommand((prev) => (prev + 1) % commands.length);
    charIndexRef.current = 0;
  }, []);

  const animateTyping = useCallback((timestamp: number) => {
    const command = commands[currentCommand];

    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const expectedChars = Math.floor(elapsed / typingSpeed);

    if (expectedChars > charIndexRef.current && charIndexRef.current <= command.input.length) {
      charIndexRef.current = expectedChars;
      setDisplayedText(command.input.slice(0, charIndexRef.current));

      if (charIndexRef.current <= command.input.length) {
        rafIdRef.current = requestAnimationFrame(animateTyping);
      } else {
        // Typing complete
        setIsTyping(false);
        startTimeRef.current = undefined;

        // Show output after delay
        setTimeout(() => setShowOutput(true), 500);

        // Reset for next command
        setTimeout(resetTyping, 3000);
      }
    } else if (charIndexRef.current <= command.input.length) {
      rafIdRef.current = requestAnimationFrame(animateTyping);
    }
  }, [currentCommand, typingSpeed, resetTyping]);

  useEffect(() => {
    if (isTyping) {
      charIndexRef.current = 0;
      startTimeRef.current = undefined;
      rafIdRef.current = requestAnimationFrame(animateTyping);
    }

    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [currentCommand, isTyping, animateTyping]);

  return (
    <section className="relative py-20 flex flex-col items-center justify-center bg-gradient-to-b from-terminal-gray to-terminal-bg px-6 overflow-hidden scanlines noise-overlay">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,65,0.08),transparent_50%)]" />
      <div className="absolute inset-0 ambient-glow" />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 font-mono">
          <span className="text-terminal-green glow-intense">Experience</span>{" "}
          <span className="bg-clip-text text-transparent terminal-gradient">
            Flow State
          </span>
        </h2>

        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
          See how our community members work in flow state together
        </p>

        <div className="glass-effect terminal-border-glow rounded-lg p-6 max-w-3xl mx-auto mb-12 interactive-glow">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-auto text-xs text-gray-500 font-mono">community terminal</span>
          </div>
          
          <div className="font-mono text-left h-[60px]">
            <div className="flex items-start gap-2">
              <span className="text-terminal-green">$</span>
              <div className="flex-1">
                <span className="text-white">
                  {displayedText}
                  <span className="animate-cursor-terminal text-terminal-green-bright">█</span>
                </span>
              </div>
            </div>
            
            <div className={`mt-2 text-gray-400 pl-6 transition-opacity duration-500 ${showOutput ? 'opacity-100' : 'opacity-0'}`}>
              {commands[currentCommand].output}
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Watch real developers in action
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
});

export { TerminalHero };