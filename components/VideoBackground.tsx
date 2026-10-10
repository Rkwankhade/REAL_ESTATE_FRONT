"use client";
import { useEffect, useRef } from "react";

/** Video time (seconds) at the start of the clean villa showcase stage. */
export const SHOWCASE_TIME = 3.2;
/** The video keeps drifting this much during the showcase so it never feels frozen. */
const SHOWCASE_DRIFT = 0.35;

/** Monotone cubic interpolation (Fritsch–Carlson): smooth speed, never overshoots or reverses. */
function pchip(xs: number[], ys: number[], x: number) {
  const n = xs.length, h: number[] = [], d: number[] = [], m: number[] = new Array(n);
  for (let i = 0; i < n - 1; i++) { h[i] = xs[i + 1] - xs[i]; d[i] = (ys[i + 1] - ys[i]) / h[i]; }
  m[0] = d[0]; m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) {
    if (d[i - 1] * d[i] <= 0) m[i] = 0;
    else { const w1 = 2 * h[i] + h[i - 1], w2 = h[i] + 2 * h[i - 1]; m[i] = (w1 + w2) / (w1 / d[i - 1] + w2 / d[i]); }
  }
  let k = 0; while (k < n - 2 && x > xs[k + 1]) k++;
  const t = Math.min(1, Math.max(0, (x - xs[k]) / h[k])), t2 = t * t, t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * ys[k] + (t3 - 2 * t2 + t) * h[k] * m[k] + (-2 * t3 + 3 * t2) * ys[k + 1] + (t3 - t2) * h[k] * m[k + 1];
}

/** One fixed video for the whole site. Scroll progress drives currentTime. Mounted once in the root layout. */
export default function VideoBackground() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current; if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = document.documentElement;
    let raf = 0, current = 0, last = 0, ready = false;

    const target = () => {
      const el = document.getElementById("villa-showcase");
      const y = window.scrollY, vh = window.innerHeight, max = root.scrollHeight - vh;
      let t = 0;
      if (max > 0) {
        const a = el ? el.getBoundingClientRect().top + y : -1, b = el ? a + el.offsetHeight - vh : -1;
        t = a > 1 && b > a && max > b
          ? pchip([0, a, b, max], [0, SHOWCASE_TIME, SHOWCASE_TIME + SHOWCASE_DRIFT, v.duration], Math.min(max, Math.max(0, y)))
          : Math.min(1, Math.max(0, y / max)) * v.duration;
      }
      return Math.min(Math.max(t, 0), v.duration - 0.04); // final scroll = final frame
    };
    // Showcase stage: foreground UI hidden via CSS on <html data-showcase> while the section fills the viewport.
    const syncShowcase = () => {
      const el = document.getElementById("villa-showcase"); let on = false;
      if (el) { const r = el.getBoundingClientRect(), vh = window.innerHeight; on = r.top <= vh * 0.15 && r.bottom >= vh * 0.85; }
      if (on) { if (root.dataset.showcase !== "on") root.dataset.showcase = "on"; } else if (root.dataset.showcase) delete root.dataset.showcase;
    };
    const tick = (now: number) => {
      raf = 0; syncShowcase();
      if (!ready || reduce.matches) return;
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016); last = now;
      const t = target();
      current += (t - current) * (1 - Math.exp(-dt * 14)); // frame-rate independent easing
      if (Math.abs(t - current) < 0.004) current = t;
      if (!v.seeking && Math.abs(v.currentTime - current) > 0.006) v.currentTime = current;
      if (current !== t || v.seeking) raf = requestAnimationFrame(tick); else last = 0;
    };
    const kick = () => { syncShowcase(); if (!raf) raf = requestAnimationFrame(tick); };
    const init = () => {
      if (!isFinite(v.duration) || v.duration === 0) return;
      ready = true; v.pause(); current = reduce.matches ? 0 : target(); v.currentTime = current; kick();
    };

    if (v.readyState >= 1) init(); else v.addEventListener("loadedmetadata", init, { once: true });
    v.addEventListener("seeked", kick);
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    const ro = new ResizeObserver(kick); ro.observe(document.body);
    return () => {
      cancelAnimationFrame(raf); delete root.dataset.showcase;
      v.removeEventListener("loadedmetadata", init); v.removeEventListener("seeked", kick);
      window.removeEventListener("scroll", kick); window.removeEventListener("resize", kick); ro.disconnect();
    };
  }, []);

  return (
    <>
      {/* layer 0: the single persistent video; poster covers load and seek gaps */}
      <video ref={ref} aria-hidden muted playsInline preload="auto" poster="/media/poster.jpg" src="/media/villa.mp4"
        className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-charcoal object-cover object-[50%_60%] villa-video" style={{ height: "100%" }} />
      {/* layer 1: restrained global readability overlay */}
      <div aria-hidden className="global-overlay pointer-events-none fixed inset-0 z-[1] bg-gradient-to-b from-charcoal/35 via-charcoal/15 to-charcoal/40" />
    </>
  );
}
