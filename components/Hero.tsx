"use client";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import SearchPanel, { type Filters } from "./SearchPanel";

const ease = [0.22, 1, 0.36, 1] as const;
export default function Hero({ f, set, onSearch }: { f: Filters; set: (f: Filters) => void; onSearch: () => void }) {
  const reduce = useReducedMotion();
  const rise = (d: number) => ({ initial: reduce ? false as const : { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease } });

  return (
    <section id="top" aria-label="Introduction" className="relative flex min-h-[100svh] flex-col justify-end text-ivory [text-shadow:0_1px_24px_rgba(0,0,0,.35)]">
      <div className="mx-auto w-full max-w-7xl px-4 pb-8 pt-32 md:px-6">
        <motion.h1 {...rise(0.5)} className="max-w-4xl font-serif text-5xl font-light leading-[1.02] sm:text-6xl md:text-8xl">Find Your Place Beyond Ordinary.</motion.h1>
        <motion.p {...rise(0.75)} className="mt-5 max-w-xl text-base leading-relaxed text-ivory/85 md:text-lg">Exceptional homes. Remarkable coastlines. A more considered way to discover property.</motion.p>
        <motion.div {...rise(0.95)} className="mt-7 flex flex-wrap gap-3">
          <a href="#properties" className="btn-primary">Explore Properties</a>
          <a href="#destinations" className="btn-glass">Discover Our Collection</a>
        </motion.div>
        <motion.div {...rise(1.15)} className="mt-8"><SearchPanel f={f} set={set} onSearch={onSearch} /></motion.div>
        <motion.a href="#properties" aria-label="Scroll to properties" {...rise(1.4)} className="mx-auto mt-6 flex w-fit flex-col items-center text-xs text-ivory/70"><ChevronDown className="animate-bounce motion-reduce:animate-none" /></motion.a>
      </div>
    </section>
  );
}
