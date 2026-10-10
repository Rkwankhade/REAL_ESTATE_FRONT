"use client";
import { Search, X } from "lucide-react";
import { destinations } from "@/lib/data";

export type Filters = { loc: string; type: string; min: number; max: number; beds: number; status: string };
export const emptyFilters: Filters = { loc: "", type: "", min: 0, max: 0, beds: 0, status: "" };
export const activeCount = (f: Filters) => Object.entries(f).filter(([, v]) => v !== "" && v !== 0).length;
const prices = [1000000, 2000000, 3000000, 4000000, 5000000, 6000000, 8000000, 10000000];
const fm = (n: number) => `€${n / 1000000}M`;

export default function SearchPanel({ f, set, onSearch }: { f: Filters; set: (f: Filters) => void; onSearch: () => void }) {
  const n = activeCount(f);
  const up = <K extends keyof Filters>(k: K, v: Filters[K]) => set({ ...f, [k]: v });
  const L = ({ id, t, children }: { id: string; t: string; children: React.ReactNode }) => (
    <div><label htmlFor={id} className="label mb-1 block text-ivory/80">{t}</label>{children}</div>
  );
  return (
    <form role="search" aria-label="Search properties" onSubmit={(e) => { e.preventDefault(); onSearch(); }} className="glass rounded-md p-4 md:p-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <L id="s-loc" t="Destination"><select id="s-loc" className="field" value={f.loc} onChange={(e) => up("loc", e.target.value)}><option value="">Any</option>{destinations.map((d) => <option key={d.name}>{d.name}</option>)}</select></L>
        <L id="s-type" t="Type"><select id="s-type" className="field" value={f.type} onChange={(e) => up("type", e.target.value)}><option value="">Any</option>{["Villa", "Residence", "Estate", "Retreat"].map((t) => <option key={t}>{t}</option>)}</select></L>
        <L id="s-min" t="Min price"><select id="s-min" className="field" value={f.min} onChange={(e) => up("min", +e.target.value)}><option value={0}>No min</option>{prices.map((p) => <option key={p} value={p}>{fm(p)}</option>)}</select></L>
        <L id="s-max" t="Max price"><select id="s-max" className="field" value={f.max} onChange={(e) => up("max", +e.target.value)}><option value={0}>No max</option>{prices.map((p) => <option key={p} value={p}>{fm(p)}</option>)}</select></L>
        <L id="s-beds" t="Bedrooms"><select id="s-beds" className="field" value={f.beds} onChange={(e) => up("beds", +e.target.value)}><option value={0}>Any</option>{[2, 3, 4, 5, 6].map((b) => <option key={b} value={b}>{b}+</option>)}</select></L>
        <L id="s-status" t="Status"><select id="s-status" className="field" value={f.status} onChange={(e) => up("status", e.target.value)}><option value="">Any</option>{["For sale", "Under offer", "Available to view"].map((s) => <option key={s}>{s}</option>)}</select></L>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary"><Search size={16} />Search</button>
        <button type="button" onClick={() => set(emptyFilters)} disabled={!n} className="btn-glass disabled:opacity-40"><X size={16} />Clear filters</button>
        <p className="text-sm text-ivory/80" aria-live="polite">{n} active {n === 1 ? "filter" : "filters"}</p>
      </div>
    </form>
  );
}
