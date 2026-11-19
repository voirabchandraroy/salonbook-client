"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { apiFetch, normalizeList } from "@/lib/api";
import type { Service } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import ServiceCard from "@/components/ServiceCard";
import Loader, { SkeletonCard } from "@/components/Loader";
import toast from "react-hot-toast";

function BrowseInner() {
  const params = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(params.get("category") || "");
  const [sort, setSort] = useState<"price_asc" | "price_desc" | "">("");
  useEffect(() => { setCategory(params.get("category") || ""); }, [params]);
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const q = new URLSearchParams();
        if (search) q.set("search", search);
        if (category) q.set("category", category);
        if (sort) q.set("sort", sort);
        const data = await apiFetch(`/api/services?${q.toString()}`);
        setServices(normalizeList<Service>(data).filter((s) => (s.status || "active") === "active"));
      } catch (e: any) { toast.error(e.message || "Failed to load services"); } finally { setLoading(false); }
    };
    const t = setTimeout(load, 300); return () => clearTimeout(t);
  }, [search, category, sort]);
  const shown = useMemo(() => {
    const list = [...services];
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [services, sort]);
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="font-serif text-3xl font-bold text-plum sm:text-4xl">Browse Services</h1>
      <p className="mt-1 text-stone-500">Find the perfect treatment — no login needed to browse.</p>
      <div className="mt-6 flex flex-col gap-3 lg:flex-row">
        <div className="relative flex-1"><Search className="absolute left-3 top-3 h-5 w-5 text-stone-400" /><input className="input !pl-10" placeholder="Search services by name…" value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <select className="input lg:w-64" value={category} onChange={(e) => setCategory(e.target.value)}><option value="">All Categories</option>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select>
        <select className="input lg:w-56" value={sort} onChange={(e) => setSort(e.target.value as any)}><option value="">Sort: Featured</option><option value="price_asc">Price: Low to High</option><option value="price_desc">Price: High to Low</option></select>
      </div>
      {loading ? <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[0,1,2,3,4,5].map((i) => <SkeletonCard key={i} />)}</div>
      : shown.length === 0 ? <div className="card mt-8 p-10 text-center"><p className="text-lg font-semibold">No services found</p><p className="mt-1 text-sm text-stone-500">Try a different search term or category.</p></div>
      : <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{shown.map((s) => <ServiceCard key={s._id || s.id} service={s} />)}</div>}
    </div>
  );
}
export default function BrowseServices() { return <Suspense fallback={<Loader label="Loading services…" />}><BrowseInner /></Suspense>; }
