export type PropType = "Villa" | "Residence" | "Estate" | "Retreat";
export type Status = "For sale" | "Under offer" | "Available to view";
export type Img = { src: string; alt: string; pos?: string };
export type Property = {
  slug: string; title: string; destination: string; type: PropType; status: Status;
  price: number; beds: number; baths: number; area: number; added: string; featured: number;
  blurb: string; description: string; amenities: string[]; images: Img[];
};
const I = {
  villa: { src: "/media/f4.jpg", alt: "Modern white villa above an infinity pool beside the sea" },
  interior: { src: "/media/f8.jpg", alt: "Open-plan interior with timber kitchen and sea view" },
  terrace: { src: "/media/f12.jpg", alt: "Sliding glass doors opening onto a sea-facing terrace" },
  sunrise: { src: "/media/f0.jpg", alt: "Sunrise over open sea" },
  cove: { src: "/media/f16.jpg", alt: "Aerial view of a sandy cove and clear water" },
  coast: { src: "/media/f20.jpg", alt: "Rocky coastline and beach seen from above" },
  beach: { src: "/media/f24.jpg", alt: "Beach with rocks and a villa on the headland" },
  head: { src: "/media/f28.jpg", alt: "Headland with villas and palms above a wave-washed beach" },
};
const am = ["Infinity pool", "Sea-facing terrace", "Open-plan kitchen", "Underfloor heating", "Private garden", "Covered parking"];
export const properties: Property[] = [
  { slug: "villa-alba", title: "Villa Alba", destination: "Andalusian Coast", type: "Villa", status: "For sale", price: 6450000, beds: 5, baths: 5, area: 620, added: "2026-09-12", featured: 1,
    blurb: "A white cantilevered villa opening onto an infinity pool and the open sea.",
    description: "Sample listing. Villa Alba is arranged over two levels, with living spaces that open fully to a pool terrace facing the water. Timber and stone interiors keep the palette calm while the glazing does the work.",
    amenities: am, images: [I.villa, I.interior, I.terrace, I.beach] },
  { slug: "casa-tramonto", title: "Casa Tramonto", destination: "Amalfi Coast", type: "Residence", status: "Available to view", price: 4200000, beds: 4, baths: 4, area: 410, added: "2026-09-28", featured: 3,
    blurb: "Warm timber interiors framed by tall sliding glass and a sunset terrace.",
    description: "Sample listing. A residence built around one long room: kitchen, dining and lounge run together, then continue outdoors through floor-to-ceiling sliding doors.",
    amenities: am.slice(1), images: [I.interior, I.terrace, I.coast] },
  { slug: "quinta-do-mar", title: "Quinta do Mar", destination: "Algarve", type: "Estate", status: "For sale", price: 8900000, beds: 7, baths: 6, area: 980, added: "2026-08-30", featured: 2,
    blurb: "A headland estate with palm-lined grounds above a private-feeling beach.",
    description: "Sample listing. Set on a rocky headland, the estate pairs a main house with generous grounds and direct sightlines along the coast in both directions.",
    amenities: [...am, "Guest wing"], images: [I.head, I.villa, I.cove] },
  { slug: "casa-cala", title: "Casa Cala", destination: "Ionian Islands", type: "Retreat", status: "Under offer", price: 2950000, beds: 3, baths: 3, area: 260, added: "2026-10-02", featured: 5,
    blurb: "A compact retreat above a quiet cove, built for slow mornings.",
    description: "Sample listing. A smaller footprint with a big outlook: three bedrooms, a shaded terrace and a short walk down to a sandy cove.",
    amenities: am.slice(1, 5), images: [I.cove, I.terrace, I.sunrise] },
  { slug: "villa-horizonte", title: "Villa Horizonte", destination: "Algarve", type: "Villa", status: "Available to view", price: 5300000, beds: 5, baths: 5, area: 540, added: "2026-09-05", featured: 4,
    blurb: "Beachside living with a pool terrace that runs to the horizon line.",
    description: "Sample listing. Horizonte sits just above the sand, with a long pool terrace, outdoor lounges and bedrooms that all face the water.",
    amenities: am, images: [I.beach, I.villa, I.interior] },
  { slug: "casa-faro", title: "Casa Faro", destination: "Andalusian Coast", type: "Residence", status: "For sale", price: 3600000, beds: 4, baths: 3, area: 330, added: "2026-07-21", featured: 6,
    blurb: "A clean-lined coastal home with sea views from the kitchen to the terrace.",
    description: "Sample listing. Casa Faro keeps things simple: stone, timber and glass, with every main room placed to see the coastline.",
    amenities: am.slice(0, 4), images: [I.coast, I.terrace, I.interior] },
];
export const destinations = [
  { name: "Andalusian Coast", text: "Whitewashed villas, long beaches and winter light.", img: I.villa },
  { name: "Algarve", text: "Headland estates above cliffs, coves and open Atlantic.", img: I.head },
  { name: "Amalfi Coast", text: "Terraced residences with timber interiors and sea air.", img: I.interior },
  { name: "Ionian Islands", text: "Quiet retreats beside clear, sheltered coves.", img: I.cove },
];
export const money = (n: number) => "€" + n.toLocaleString("en-US");
export const stripPos = (p?: string) => p ?? "center";
export const links = [
  ["Discover", "/#discover"], ["Properties", "/#properties"], ["Destinations", "/#destinations"],
  ["Architecture", "/#architecture"], ["About", "/#about"], ["Contact", "/#contact"],
] as const;
