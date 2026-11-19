import Link from "next/link";
import { Sparkles, CalendarCheck, CreditCard, ShieldCheck, Star } from "lucide-react";
import { apiFetch, normalizeList } from "@/lib/api";
import type { Service } from "@/lib/types";
import { CATEGORIES } from "@/lib/types";
import ServiceCard from "@/components/ServiceCard";

export const dynamic = "force-dynamic";
const HERO = "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1800&q=80";

async function getFeatured(): Promise<Service[]> {
  try { const data = await apiFetch("/api/services?sort=price_asc"); const list = normalizeList<Service>(data).filter((s) => (s.status || "active") === "active"); return list.slice(0, 6); } catch { return []; }
}

export default async function Home() {
  const featured = await getFeatured();
  return (
    <div>
      <section className="relative overflow-hidden">
        <img src={HERO} alt="Salon interior" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
          <h1 className="max-w-2xl font-serif text-4xl font-bold leading-tight text-white sm:text-6xl">Look beautiful. Feel confident. Book in minutes.</h1>
          <p className="mt-4 max-w-xl text-lg text-stone-200">SalonBook brings trusted hair, skin, makeup, nail and spa services together — browse, book and pay securely online.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/services" className="btn-primary !px-7 !py-3 !text-base">Explore Salon Services</Link><Link href="/signup" className="rounded-full border border-white/70 px-7 py-3 text-base font-semibold text-white hover:bg-white/10">Create an Account</Link></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex items-end justify-between gap-4"><div><h2 className="font-serif text-3xl font-bold text-plum">Featured Salon Services</h2><p className="mt-1 text-stone-500">Hand-picked services our customers love.</p></div><Link href="/services" className="btn-secondary hidden sm:inline-flex">View All</Link></div>
        {featured.length === 0 ? (
          <div className="card mt-8 p-8 text-center text-stone-500">No services available yet. Please check back soon — or <Link href="/services" className="text-rose-600 underline">browse all services</Link>.</div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{featured.map((s) => <ServiceCard key={s._id || s.id} service={s} />)}</div>
        )}
      </section>

      <section className="bg-sand/60 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-serif text-3xl font-bold text-plum">Salon Service Categories</h2>
          <p className="mt-1 text-stone-500">Find exactly what you need, by category.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link key={c} href={`/services?category=${encodeURIComponent(c)}`} className="card flex items-center justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                <span className="font-semibold text-plum">{c}</span><span className="text-rose-600">→</span>
              </Link>
            ))}
            <Link href="/services" className="card flex items-center justify-between bg-rose-600 p-5 text-white transition hover:bg-rose-700"><span className="font-semibold">View All Services</span><span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-center font-serif text-3xl font-bold text-plum">How It Works</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[{ icon: Sparkles, t: "1. Browse & choose", d: "Explore services by name or category, compare prices and durations." }, { icon: CalendarCheck, t: "2. Request an appointment", d: "Pick a date and time slot. Your request is reviewed by the salon." }, { icon: CreditCard, t: "3. Pay securely", d: "Once confirmed, pay with Stripe. Your payment status updates automatically." }].map((s) => (
            <div key={s.t} className="card p-6 text-center"><s.icon className="mx-auto h-8 w-8 text-rose-600" /><h3 className="mt-3 font-semibold text-plum">{s.t}</h3><p className="mt-1 text-sm text-stone-500">{s.d}</p></div>
          ))}
        </div>
        <div className="card mt-10 flex flex-col items-center gap-4 bg-rose-50 p-8 text-center sm:flex-row sm:text-left">
          <ShieldCheck className="h-10 w-10 shrink-0 text-rose-600" />
          <div className="flex-1"><h3 className="font-serif text-xl font-bold text-plum">Why choose SalonBook?</h3><p className="text-sm text-stone-600">Verified appointments, transparent pricing, secure Stripe payments and a friendly team. Rated <span className="inline-flex items-center gap-1 font-semibold text-amber-600"><Star className="h-4 w-4 fill-amber-500 text-amber-500" /> 4.9</span> by our customers.</p></div>
          <Link href="/services" className="btn-primary">Book Now</Link>
        </div>
      </section>
    </div>
  );
}
