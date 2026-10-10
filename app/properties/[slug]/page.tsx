import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PropertyDetail from "@/components/PropertyDetail";
import { properties } from "@/lib/data";

export function generateStaticParams() { return properties.map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = properties.find((x) => x.slug === params.slug);
  return { title: p ? `${p.title} | Aurelle Estates` : "Not found" };
}
export default function Detail({ params }: { params: { slug: string } }) {
  const p = properties.find((x) => x.slug === params.slug);
  if (!p) notFound();
  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-7xl px-4 pb-24 pt-28 md:px-6">
        <Link href="/#properties" className="inline-flex min-h-[44px] items-center gap-1 text-sm text-champagne"><ChevronLeft size={16} />All properties</Link>
        <PropertyDetail p={p} />
      </main>
      <Footer />
    </>
  );
}
