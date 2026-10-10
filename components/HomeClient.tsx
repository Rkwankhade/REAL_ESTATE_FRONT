"use client";
import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Nav from "./Nav";
import Hero from "./Hero";
import Footer from "./Footer";
import PropertyCard from "./PropertyCard";
import InquiryForm from "./InquiryForm";
import { activeCount, emptyFilters, type Filters } from "./SearchPanel";
import { destinations, properties } from "@/lib/data";
import { useFavorites } from "@/lib/useFavorites";
import PropertyModal from "./PropertyModal";
import { ArrowRight, SearchX } from "lucide-react";

type Sort = "featured" | "newest" | "price";
const reveal = (r: boolean | null) => ({ initial: r ? false as const : { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" }, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } });

export default function HomeClient() {
  const [f, setF] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState<Sort>("featured");
  const { favs, toggle } = useFavorites();
  const [open, setOpen] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const res = useRef<HTMLDivElement>(null);
  const scrollToResults = () => document.getElementById("properties")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });

  const list = useMemo(() => {
    const l = properties.filter((p) => (!f.loc || p.destination === f.loc) && (!f.type || p.type === f.type) && (!f.min || p.price >= f.min) && (!f.max || p.price <= f.max) && (!f.beds || p.beds >= f.beds) && (!f.status || p.status === f.status));
    return [...l].sort((a, b) => sort === "price" ? a.price - b.price : sort === "newest" ? b.added.localeCompare(a.added) : a.featured - b.featured);
  }, [f, sort]);

  const pick = (name: string) => { setF({ ...emptyFilters, loc: name }); scrollToResults(); };
  const n = activeCount(f);

  return (
    <>
      <Nav />
      <Hero f={f} set={setF} onSearch={scrollToResults} />
      <main id="main">
        <section id="properties" className="mx-auto max-w-7xl px-4 py-24 md:px-6">
          <div className="glass-dark flex flex-wrap items-center justify-between gap-4 rounded-md p-4">
            <div className="flex items-center gap-3">
              <p className="text-sm text-ivory/80" aria-live="polite">{list.length} {list.length === 1 ? "property" : "properties"}{n ? ` · ${n} active ${n === 1 ? "filter" : "filters"}` : ""}</p>
              <label className="sr-only" htmlFor="sort">Sort properties</label>
              <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="min-h-[44px] field w-auto">
                <option value="featured">Featured</option><option value="newest">Newest</option><option value="price">Price: low to high</option>
              </select>
              {n > 0 && <button className="btn-line" onClick={() => setF(emptyFilters)}>Clear filters</button>}
            </div>
          </div>
          <div ref={res} className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => <PropertyCard key={p.slug} p={p} index={i} big={i === 0 && list.length > 2} fav={favs.includes(p.slug)} onFav={() => toggle(p.slug)} onOpen={() => setOpen(p.slug)} />)}
            </AnimatePresence>
          </div>
          {list.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-10 glass-dark rounded-md p-12 text-center">
              <SearchX className="mx-auto text-champagne" />
              <p className="mt-3 font-serif text-3xl">No properties match these filters</p>
              <p className="mt-2 text-ivory/80">Widen the price range or clear a filter to see more sample listings.</p>
              <button className="btn-dark mt-5" onClick={() => setF(emptyFilters)}>Clear filters</button>
            </motion.div>
          )}
        </section>

        <section id="villa-showcase" aria-label="Villa showcase" className="h-[125svh]" />

        <section id="destinations" className="py-24">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <motion.h2 {...reveal(reduce)} className="glass-dark inline-block max-w-2xl rounded-md px-6 py-4 font-serif text-4xl md:text-6xl">Four coastlines, one standard</motion.h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map((d) => (
                <motion.article key={d.name} {...reveal(reduce)} className="group relative aspect-[3/4] overflow-hidden rounded-md">
                  <Image src={d.img.src} alt={d.img.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-ivory">
                    <h3 className="font-serif text-3xl">{d.name}</h3>
                    <p className="mt-1 text-sm text-ivory/80">{d.text}</p>
                    <button onClick={() => pick(d.name)} className="btn-glass mt-4 w-full">View matching properties</button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="architecture" className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-24 md:px-6 lg:grid-cols-2">
          <motion.div {...reveal(reduce)} className="relative aspect-[4/5] overflow-hidden rounded-md">
            <Image src="/media/f8.jpg" alt="Open-plan interior with timber kitchen and sea view" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover object-[35%_50%]" />
          </motion.div>
          <motion.div {...reveal(reduce)} className="glass-dark rounded-md p-8">
            <h2 className="font-serif text-4xl md:text-6xl">Built to disappear into the view</h2>
            <p className="mt-5 max-w-lg leading-relaxed text-ivory/85">The homes we favour share a few traits: pale stone and warm timber, glass walls that slide away, and pools whose edges meet the horizon.</p>
            <ul className="mt-8 space-y-5">
              {[["Thresholds, not walls", "Large sliding doors make the terrace part of the living room."], ["Calm materials", "Stone, oak and plaster keep attention on the water."], ["Edges that vanish", "Infinity pools set level with the sea line."]].map(([t, d]) => (
                <li key={t} className="border-l-2 border-champagne pl-4"><p className="font-serif text-2xl">{t}</p><p className="text-sm text-ivory/80">{d}</p></li>
              ))}
            </ul>
          </motion.div>
        </section>

        <section id="discover" className="px-4 py-28">
          <motion.div {...reveal(reduce)} className="glass-dark mx-auto max-w-3xl rounded-md px-6 py-12 text-center">
            <h2 className="font-serif text-4xl md:text-6xl">Mornings by the water</h2>
            <p className="mt-5 text-lg leading-relaxed text-ivory/85">Coastal living is mostly small things: coffee on the terrace, a swim before work, a beach that is empty until ten. These are the routines we help buyers picture.</p>
            <Link href="/#properties" className="btn-primary mt-8">Browse the collection <ArrowRight size={16} /></Link>
          </motion.div>
        </section>

        <section id="about" className="mx-auto max-w-5xl px-4 py-24 md:px-6">
          <div className="glass-dark rounded-md p-8 md:p-12">
          <motion.h2 {...reveal(reduce)} className="font-serif text-4xl md:text-6xl">How we work</motion.h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {[["Listen first", "We start with how you want to live, then look at homes."], ["Show everything", "Plain facts, clear prices and honest descriptions."], ["Stay on after", "Help with handover, local contacts and the first season."]].map(([t, d]) => (
              <motion.div key={t} {...reveal(reduce)}><h3 className="font-serif text-3xl text-champagne">{t}</h3><p className="mt-2 text-ivory/85">{d}</p></motion.div>
            ))}
          </div>
          <p className="mt-10 text-sm text-ivory/60">Placeholder brand copy for a demo project.</p>
          </div>
        </section>

        <section id="contact" className="py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 md:px-6 lg:grid-cols-2">
            <motion.div {...reveal(reduce)} className="glass-dark h-fit rounded-md p-8">
              <h2 className="font-serif text-4xl md:text-6xl">Book a viewing</h2>
              <p className="mt-4 max-w-md text-ivory/85">Tell us which home or coastline interests you. This form is a frontend demo: it validates your answers but sends nothing.</p>
            </motion.div>
            <div className="glass-dark rounded-md p-6"><InquiryForm subject="a viewing" /></div>
          </div>
        </section>
      </main>
      <Footer />
      <AnimatePresence>{open && <PropertyModal key="modal" slug={open} onClose={() => setOpen(null)} onOpen={setOpen} />}</AnimatePresence>
    </>
  );
}
