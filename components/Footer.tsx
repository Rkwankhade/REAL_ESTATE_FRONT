import Link from "next/link";
import { Instagram, Linkedin, Youtube } from "lucide-react";
import { links } from "@/lib/data";
export default function Footer() {
  return (
    <footer className="glass-dark text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-3">
        <div>
          <p className="font-serif text-3xl">Aurelle <span className="italic font-light">Estates</span></p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">Demo brand for a frontend project. All listings, names and contact details are placeholders.</p>
        </div>
        <nav aria-label="Footer"><ul className="grid grid-cols-2 gap-2 text-sm">
          {links.map(([l, h]) => <li key={l}><Link className="text-ivory/75 hover:text-champagne" href={h}>{l}</Link></li>)}
        </ul></nav>
        <div className="text-sm text-ivory/75">
          <p>hello@example.com (placeholder)</p><p className="mt-1">+00 000 000 0000 (placeholder)</p>
          <div className="mt-5 flex gap-3">
            {[[Instagram, "Instagram", "https://www.instagram.com"], [Linkedin, "LinkedIn", "https://www.linkedin.com"], [Youtube, "YouTube", "https://www.youtube.com"]].map(([Ic, n, h]) => {
              const Icon = Ic as typeof Instagram;
              return <a key={n as string} href={h as string} target="_blank" rel="noopener noreferrer" aria-label={`${n} (opens in new tab)`} className="grid h-11 w-11 place-items-center rounded-sm border border-ivory/20 hover:border-champagne hover:text-champagne"><Icon size={18} /></a>;
            })}
          </div>
        </div>
      </div>
      <p className="border-t border-ivory/10 py-5 text-center text-xs text-ivory/50">Sample listings. Imagery is stills from the supplied drone film. Not an offer of sale.</p>
    </footer>
  );
}
