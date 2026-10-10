"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Bath, BedDouble, Heart, Maximize2 } from "lucide-react";
import { money, type Property } from "@/lib/data";

export default function PropertyCard({ p, big, fav, onFav, onOpen, index }: { p: Property; big?: boolean; fav: boolean; onFav: () => void; onOpen: () => void; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.article layout={!reduce} initial={reduce ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }}
      exit={{ opacity: 0 }} transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col overflow-hidden rounded-md glass-dark transition duration-500 hover:-translate-y-1 hover:border-champagne/60 ${big ? "lg:col-span-2 lg:row-span-2" : ""}`}>
      <div className={`relative overflow-hidden ${big ? "aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[380px]" : "aspect-[4/3]"}`}>
        <Image src={p.images[0].src} alt={p.images[0].alt} fill sizes={big ? "(min-width:1024px) 66vw, 100vw" : "(min-width:1024px) 33vw, 100vw"} className="object-cover transition duration-700 ease-out group-hover:scale-105" />
        <span className="glass absolute left-3 top-3 rounded-sm px-3 py-1 text-xs text-ivory">{p.status}</span>
        <button onClick={onFav} aria-pressed={fav} aria-label={fav ? `Remove ${p.title} from favorites` : `Save ${p.title} to favorites`}
          className="glass absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-sm text-ivory transition hover:bg-white/25">
          <Heart size={18} className={fav ? "fill-champagne text-champagne" : ""} />
        </button>
      </div>
      <div className="p-5">
        <p className="text-xs text-champagne">{p.type} · {p.destination} · Sample listing</p>
        <h3 className="mt-1 font-serif text-3xl leading-tight">{p.title}</h3>
        <p className="mt-1 font-serif text-xl text-ivory">{money(p.price)} <span className="text-sm text-ivory/60">EUR</span></p>
        {big && <p className="mt-2 max-w-md text-sm leading-relaxed text-ivory/80">{p.blurb}</p>}
        <ul className="mt-3 flex gap-4 text-sm text-ivory/80">
          <li className="flex items-center gap-1.5"><BedDouble size={16} />{p.beds} beds</li>
          <li className="flex items-center gap-1.5"><Bath size={16} />{p.baths} baths</li>
          <li className="flex items-center gap-1.5"><Maximize2 size={16} />{p.area} m²</li>
        </ul>
        <button onClick={onOpen} className="btn-line mt-4 w-full">View Property<span className="sr-only">: {p.title}</span></button>
      </div>
    </motion.article>
  );
}
