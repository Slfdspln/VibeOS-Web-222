# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` (uses Turbopack for faster builds)
- **Build**: `pnpm build`
- **Production server**: `pnpm start`
- **Linting**: `pnpm lint`

## Architecture Overview

This is a Next.js 15 application that creates an immersive terminal-themed landing page for VibeOS - an open source operating system concept focused on developer flow state. The project uses React client components with GSAP animations for smooth scroll-based interactions.

### Key Technologies

- **Framework**: Next.js 15 with App Router
- **Package Manager**: pnpm (v10.14.0)
- **Animations**: GSAP with ScrollTrigger for scroll-based animations
- **Styling**: Tailwind CSS v3 with custom terminal-themed utilities
- **Typography**: Inter and JetBrains Mono fonts via next/font
- **Language**: TypeScript with strict mode enabled

### Project Structure

- `app/`: Next.js App Router pages
  - `layout.tsx`: Root layout with metadata and font configuration
  - `page.tsx`: Main landing page assembling all sections
  - `globals.css`: Global styles with Tailwind directives and custom terminal theme
- `components/`: React components for each section
  - `terminal-hero.tsx`: Animated terminal hero with typing effect
  - `demo-section.tsx`: Demo showcase section
  - `features-grid.tsx`: Grid of feature cards with hover effects
  - `philosophy-section.tsx`: Philosophy/mission section
  - `download-section.tsx`: Download CTA section
  - `scroll-animations.tsx`: GSAP ScrollTrigger animations setup

### Design System

The app implements a terminal/CLI aesthetic with:

- **Color Palette**: Based on terminal green (#00ff41) with dark backgrounds
- **Custom CSS Classes**:
  - `.glow`: Terminal green text shadow effect
  - `.terminal-border`: Subtle green border
  - `.terminal-gradient`: Multi-color terminal gradient
- **Animations**: Cursor blink, fade-in, slide-up effects
- **Typography**: JetBrains Mono for code/terminal elements, Inter for body text

### Component Patterns

- Client components marked with `"use client"` directive for interactivity
- GSAP animations initialized in `useEffect` with proper cleanup
- Scroll-triggered animations using ScrollTrigger plugin
- Terminal typing effect using state management and intervals
- Responsive design with Tailwind's responsive utilities (md:, lg:, etc.)

### TypeScript Configuration

- Strict mode enabled
- Path alias configured: `@/*` maps to project root
- Target ES2017 with ESNext library support
- Module resolution set to bundler for Next.js compatibility

## Important Notes

- All interactive components use React hooks and require client-side rendering
- GSAP ScrollTrigger animations are registered and cleaned up properly
- The terminal typing animation in the hero cycles through predefined commands
- Features grid uses hover effects with opacity and transform transitions