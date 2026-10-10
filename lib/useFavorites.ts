"use client";
import { useEffect, useState } from "react";
export function useFavorites() {
  const [favs, setFavs] = useState<string[]>([]);
  useEffect(() => { try { setFavs(JSON.parse(localStorage.getItem("aurelle-favs") || "[]")); } catch {} }, []);
  const toggle = (slug: string) => setFavs((p) => {
    const n = p.includes(slug) ? p.filter((s) => s !== slug) : [...p, slug];
    try { localStorage.setItem("aurelle-favs", JSON.stringify(n)); } catch {}
    return n;
  });
  return { favs, toggle };
}
