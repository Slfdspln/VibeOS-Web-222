"use client";

import { useEffect, useState } from "react";

interface LoadingAnimationProps {
  message?: string;
  variant?: "dots" | "terminal" | "matrix";
  className?: string;
}

export function LoadingAnimation({
  message = "Loading",
  variant = "terminal",
  className = ""
}: LoadingAnimationProps) {
  const [dots, setDots] = useState("");
  const [currentChar, setCurrentChar] = useState(0);

  const matrixChars = "01";
  const terminalCommands = [
    "Initializing system...",
    "Loading modules...",
    "Connecting to network...",
    "Optimizing performance...",
    "Ready to vibe...",
  ];

  useEffect(() => {
    if (variant === "dots") {
      const interval = setInterval(() => {
        setDots(prev => prev.length >= 3 ? "" : prev + ".");
      }, 500);
      return () => clearInterval(interval);
    }

    if (variant === "matrix") {
      const interval = setInterval(() => {
        setCurrentChar(prev => (prev + 1) % 20);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [variant]);

  if (variant === "dots") {
    return (
      <div className={`flex items-center justify-center space-x-2 ${className}`}>
        <div className="text-terminal-green font-mono">
          {message}{dots}
        </div>
      </div>
    );
  }

  if (variant === "matrix") {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <div className="font-mono text-terminal-green text-sm mb-4">
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className={`inline-block transition-opacity duration-200 ${
                i === currentChar % 10 ? "opacity-100" : "opacity-30"
              }`}
            >
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </span>
          ))}
        </div>
        <div className="text-terminal-green/80 font-mono text-xs">
          {message}
        </div>
      </div>
    );
  }

  // Terminal variant (default)
  return (
    <div className={`bg-black/80 backdrop-blur-sm terminal-border rounded-lg p-6 max-w-md mx-auto ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500" />
        <div className="w-3 h-3 rounded-full bg-yellow-500" />
        <div className="w-3 h-3 rounded-full bg-green-500" />
        <span className="ml-auto text-xs text-gray-500 font-mono">vibeOS</span>
      </div>

      <div className="font-mono space-y-2">
        {terminalCommands.map((command, index) => (
          <div
            key={index}
            className={`transition-all duration-500 ${
              index === terminalCommands.length - 1
                ? "text-terminal-green animate-pulse"
                : "text-gray-400"
            }`}
          >
            <span className="text-terminal-green">$</span> {command}
          </div>
        ))}

        <div className="flex items-center gap-1 mt-4">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
            <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse delay-75" />
            <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse delay-150" />
          </div>
          <span className="text-terminal-green/80 font-mono text-xs ml-2">
            {message}
          </span>
        </div>
      </div>
    </div>
  );
}

// Simplified loading spinner for inline use
export function LoadingSpinner({ size = "md", className = "" }: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="relative w-full h-full">
        <div className="absolute inset-0 border-2 border-terminal-green/20 rounded-full" />
        <div className="absolute inset-0 border-2 border-terminal-green border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}

// Page transition loading overlay
export function PageLoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-terminal-bg/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <LoadingAnimation message="Entering vibe mode" variant="terminal" />
    </div>
  );
}