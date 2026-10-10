"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import PropertyDetail from "./PropertyDetail";
import { properties } from "@/lib/data";

/** Overlay on the home page: the fixed video and scroll position stay untouched underneath. */
export default function PropertyModal({ slug, onClose, onOpen }: { slug: string; onClose: () => void; onOpen: (s: string) => void }) {
  const p = properties.find((x) => x.slug === slug);
  const box = useRef<HTMLDivElement>(null); const closeBtn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null;
    closeBtn.current?.focus(); document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !document.querySelector('[aria-label$="gallery"]')) onClose();
      if (e.key === "Tab" && box.current) {
        const f = box.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea');
        if (!f.length) return; const a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener("keydown", k);
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; prev?.focus(); };
  }, [onClose]);
  useEffect(() => { box.current?.scrollTo({ top: 0 }); }, [slug]);
  if (!p) return null;
  return (
    <motion.div ref={box} role="dialog" aria-modal="true" aria-label={`${p.title} details`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[70] overflow-y-auto bg-charcoal/35 px-4 py-6 backdrop-blur-sm md:px-6">
      <div className="mx-auto max-w-7xl">
        <button ref={closeBtn} onClick={onClose} className="btn-glass mb-4"><X size={16} />Close</button>
        <PropertyDetail p={p} onOpen={onOpen} />
      </div>
    </motion.div>
  );
}
