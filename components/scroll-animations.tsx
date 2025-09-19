"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function ScrollAnimations() {
  const progressRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Enhanced fade in sections with smoother easing and stagger
    gsap.utils.toArray(".fade-in-section").forEach((section: any, index) => {
      const elements = section.querySelectorAll(".fade-element");

      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 60,
          scale: 0.98,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
            onUpdate: (self) => {
              // Add subtle parallax to section content
              const progress = self.progress;
              gsap.set(section, {
                y: progress * -20,
              });
            },
          },
        }
      );

      // Stagger child elements if they exist
      if (elements.length > 0) {
        gsap.fromTo(
          elements,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: {
              amount: 0.6,
              from: "start",
            },
            delay: 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    // Enhanced parallax effect for hero with performance optimization
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    heroTimeline
      .to(".hero-bg", {
        yPercent: -30,
        ease: "none",
      })
      .to(".hero-glow", {
        scale: 1.2,
        opacity: 0.3,
        ease: "none",
      }, 0)
      .to(".hero-text", {
        y: -50,
        ease: "none",
      }, 0);

    // Enhanced feature cards with improved stagger and hover effects
    ScrollTrigger.batch(".feature-card", {
      onEnter: (batch) => {
        gsap.fromTo(batch, {
          opacity: 0,
          y: 80,
          scale: 0.9,
          rotationX: 15,
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1,
          ease: "back.out(1.2)",
          stagger: {
            amount: 0.6,
            grid: "auto",
            from: "center",
          },
          overwrite: true,
        });
      },
      onLeave: (batch) =>
        gsap.to(batch, {
          opacity: 0.4,
          y: -30,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          overwrite: true,
        }),
      onEnterBack: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.1)",
          stagger: 0.1,
          overwrite: true,
        }),
      onLeaveBack: (batch) =>
        gsap.to(batch, {
          opacity: 0.4,
          y: 30,
          scale: 0.95,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          overwrite: true,
        }),
    });

    // Enhanced terminal cursor with more realistic blinking
    gsap.to(".terminal-cursor", {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
      ease: "power2.inOut",
      repeatDelay: 0.3,
    });

    // Smooth scroll progress indicator
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        transformOrigin: "left",
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3,
        },
      });
    }

    // Back to top button animation
    if (backToTopRef.current) {
      gsap.set(backToTopRef.current, { opacity: 0, y: 20 });

      ScrollTrigger.create({
        start: "top -200",
        end: "max",
        onUpdate: (self) => {
          if (self.direction === 1) {
            gsap.to(backToTopRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "back.out(1.7)",
            });
          } else if (self.direction === -1 && self.scroll() < 200) {
            gsap.to(backToTopRef.current, {
              opacity: 0,
              y: 20,
              duration: 0.3,
              ease: "power2.in",
            });
          }
        },
      });
    }

    // Text reveal animations for headings
    gsap.utils.toArray(".text-reveal").forEach((element: any) => {
      const chars = element.textContent.split("");
      element.innerHTML = chars.map((char: string) =>
        char === " " ? "&nbsp;" : `<span class="char">${char}</span>`
      ).join("");

      gsap.fromTo(
        element.querySelectorAll(".char"),
        {
          opacity: 0,
          y: 50,
          rotationX: -90,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.05,
          ease: "back.out(1.7)",
          stagger: 0.02,
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Performance optimization: reduce updates on slower devices
    ScrollTrigger.config({
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
      ignoreMobileResize: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: 0, autoKill: true },
      ease: "power3.inOut",
    });
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-terminal-green/20">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-terminal-green via-cyan-400 to-terminal-green scale-x-0 glow"
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Back to Top Button */}
      <button
        ref={backToTopRef}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 bg-terminal-green/10 backdrop-blur-sm terminal-border rounded-lg hover:bg-terminal-green/20 transition-all group"
        aria-label="Back to top"
      >
        <svg
          className="w-5 h-5 text-terminal-green group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </>
  );
}

export default ScrollAnimations;