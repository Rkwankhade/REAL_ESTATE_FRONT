"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { links } from "@/lib/data";

export default function Nav({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const first = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const compact = scrolled || solid;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 60);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    first.current?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setOpen(false); btn.current?.focus(); } };
    document.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [open]);

  const tone = "text-ivory";
  return (
    <motion.header initial={reduce ? false : { y: -24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-[60] px-3 pt-3 md:px-6">
      <nav aria-label="Primary" className={`mx-auto flex max-w-7xl items-center justify-between rounded-md px-4 transition-all duration-500 md:px-6 ${compact ? "glass-dark h-14" : "h-20 border border-transparent"} ${tone}`}>
        <Link href="/" className="font-serif text-2xl font-medium tracking-wide">Aurelle <span className="font-light italic">Estates</span></Link>
        <ul className="hidden items-center gap-7 text-sm lg:flex">
          {links.map(([l, h]) => <li key={l}><Link href={h} className="py-2 opacity-85 transition hover:opacity-100 hover:text-champagne">{l}</Link></li>)}
        </ul>
        <div className="flex items-center gap-2">
          <Link href="/#contact" className={`hidden sm:inline-flex btn-primary`}>Book a Viewing</Link>
          <button ref={btn} className="grid h-11 w-11 place-items-center lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </nav>
      <motion.div style={{ scaleX: bar }} className="mx-auto mt-px h-px max-w-7xl origin-left bg-champagne" aria-hidden />
      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}
            className="glass-solid mx-auto mt-2 max-w-7xl rounded-md p-4 text-charcoal lg:hidden">
            <ul>
              {links.map(([l, h], i) => (
                <li key={l}><Link ref={i === 0 ? first : undefined} href={h} onClick={() => setOpen(false)} className="block border-b border-charcoal/10 py-3 font-serif text-2xl">{l}</Link></li>
              ))}
            </ul>
            <Link href="/#contact" onClick={() => setOpen(false)} className="btn-dark mt-4 w-full">Book a Viewing</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
