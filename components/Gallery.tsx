"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize, X } from "lucide-react";
import type { Img } from "@/lib/data";

export default function Gallery({ images, title }: { images: Img[]; title: string }) {
  const [i, setI] = useState(0); const [full, setFull] = useState(false);
  const close = useRef<HTMLButtonElement>(null); const opener = useRef<HTMLButtonElement>(null);
  const n = images.length;
  const go = useCallback((d: number) => setI((x) => (x + d + n) % n), [n]);
  useEffect(() => {
    if (!full) return;
    close.current?.focus(); document.body.style.overflow = "hidden";
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") { setFull(false); opener.current?.focus(); } if (e.key === "ArrowRight") go(1); if (e.key === "ArrowLeft") go(-1); };
    document.addEventListener("keydown", k);
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [full, go]);
  const Stage = ({ cls }: { cls: string }) => (
    <div className={`relative overflow-hidden ${cls}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
          <Image src={images[i].src} alt={images[i].alt} fill sizes="100vw" className="object-cover" priority={i === 0} />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
        <button onClick={() => go(-1)} aria-label="Previous image" className="glass grid h-11 w-11 place-items-center rounded-sm text-ivory"><ChevronLeft /></button>
        <button onClick={() => go(1)} aria-label="Next image" className="glass grid h-11 w-11 place-items-center rounded-sm text-ivory"><ChevronRight /></button>
      </div>
    </div>
  );
  return (
    <div>
      <div className="relative">
        <Stage cls="aspect-[16/10] rounded-md" />
        <button ref={opener} onClick={() => setFull(true)} aria-label="Open fullscreen gallery" className="glass absolute bottom-3 right-3 grid h-11 w-11 place-items-center rounded-sm text-ivory"><Maximize size={18} /></button>
        <p className="glass absolute bottom-3 left-3 rounded-sm px-3 py-1 text-xs text-ivory" aria-live="polite">{i + 1} / {n}</p>
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        {images.map((im, k) => (
          <button key={im.src + k} onClick={() => setI(k)} aria-label={`Show image ${k + 1}`} aria-current={k === i} className={`relative aspect-[4/3] overflow-hidden rounded-sm border-2 ${k === i ? "border-champagne" : "border-transparent opacity-70 hover:opacity-100"}`}>
            <Image src={im.src} alt="" fill sizes="20vw" className="object-cover" />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {full && (
          <motion.div role="dialog" aria-modal="true" aria-label={`${title} gallery`} className="fixed inset-0 z-[80] bg-charcoal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Stage cls="h-full w-full" />
            <button ref={close} onClick={() => { setFull(false); opener.current?.focus(); }} aria-label="Close fullscreen gallery" className="glass absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-sm text-ivory"><X /></button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
