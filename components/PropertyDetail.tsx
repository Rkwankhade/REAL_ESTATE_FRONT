import Image from "next/image";
import Link from "next/link";
import { Bath, BedDouble, Check, Map, Maximize2, Ruler } from "lucide-react";
import Gallery from "./Gallery";
import InquiryForm from "./InquiryForm";
import { money, properties, type Property } from "@/lib/data";

export default function PropertyDetail({ p, onOpen }: { p: Property; onOpen?: (slug: string) => void }) {
  const similar = properties.filter((x) => x.slug !== p.slug && (x.destination === p.destination || x.type === p.type)).slice(0, 3);
  const dark = "rounded-md glass-dark";
  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div>
        <Gallery images={p.images} title={p.title} />
        <div className={`${dark} mt-6 p-6`}>
          <h1 className="font-serif text-5xl md:text-6xl">{p.title}</h1>
          <p className="mt-1 text-champagne">{p.type} · {p.destination} · {p.status} · Sample listing</p>
          <p className="mt-3 font-serif text-3xl">{money(p.price)} <span className="text-base text-ivory/60">EUR</span></p>
          <ul className="mt-6 grid grid-cols-2 gap-4 border-y border-white/15 py-5 sm:grid-cols-4">
            {[[BedDouble, `${p.beds} bedrooms`], [Bath, `${p.baths} bathrooms`], [Maximize2, `${p.area} m² interior`], [Ruler, p.type]].map(([I, t], k) => { const Ic = I as typeof Bath; return <li key={k} className="flex items-center gap-2 text-sm"><Ic size={18} className="text-champagne" />{t as string}</li>; })}
          </ul>
          <p className="mt-6 max-w-2xl leading-relaxed text-ivory/85">{p.description}</p>
          <h2 className="mt-8 font-serif text-3xl">Amenities</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">{p.amenities.map((a) => <li key={a} className="flex items-center gap-2 text-sm"><Check size={16} className="text-champagne" />{a}</li>)}</ul>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className={`${dark} grid aspect-[4/3] place-items-center p-6 text-center text-sm text-ivory/70`}>Floor plan placeholder. No plan has been supplied for this sample listing.</div>
          <div className={`${dark} grid aspect-[4/3] place-items-center p-6 text-center text-sm text-ivory/70`}><span><Map className="mx-auto mb-2" />Map placeholder. No live location data is shown.</span></div>
        </div>
      </div>
      <aside className={`${dark} h-fit p-6 lg:sticky lg:top-6`}>
        <h2 className="font-serif text-3xl">Enquire about {p.title}</h2>
        <p className="mb-5 mt-1 text-sm text-ivory/65">Demo form: validated in the browser, not sent.</p>
        <InquiryForm subject={p.title} />
      </aside>
      <div className="lg:col-span-2">
        <h2 className="font-serif text-4xl">Similar properties</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {similar.map((s) => {
            const inner = (<>
              <div className="relative aspect-[4/3] overflow-hidden"><Image src={s.images[0].src} alt={s.images[0].alt} fill sizes="33vw" className="object-cover transition duration-700 group-hover:scale-105" /></div>
              <div className="p-4 text-left"><p className="font-serif text-2xl">{s.title}</p><p className="text-sm text-ivory/70">{s.destination} · {money(s.price)}</p></div></>);
            const cls = `group block overflow-hidden ${dark} transition hover:border-champagne/60`;
            return onOpen ? <button key={s.slug} onClick={() => onOpen(s.slug)} className={cls}>{inner}</button> : <Link key={s.slug} href={`/properties/${s.slug}`} className={cls}>{inner}</Link>;
          })}
        </div>
      </div>
    </div>
  );
}
