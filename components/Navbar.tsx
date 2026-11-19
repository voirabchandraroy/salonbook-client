"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Scissors, Menu, X, ChevronDown, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, loading, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const dash = user?.role === "admin" ? "/dashboard/admin" : "/dashboard/customer";
  const handleLogout = async () => { await logout(); toast.success("Logged out"); setMenu(false); setOpen(false); router.push("/"); router.refresh(); };
  return (
    <header className="sticky top-0 z-40 border-b border-rose-100 bg-cream/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-600 text-white"><Scissors className="h-5 w-5" /></span>
          <span className="font-serif text-2xl font-bold text-plum">Salon<span className="text-rose-600">Book</span></span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/services" className="nav-link">Browse Services</Link>
          {user && <Link href={dash} className="nav-link">Dashboard</Link>}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          {loading ? <span className="text-sm text-stone-400">Loading…</span> : !user ? (
            <><Link href="/signin" className="btn-secondary">Sign In</Link><Link href="/signup" className="btn-primary">Sign Up</Link></>
          ) : (
            <div className="relative">
              <button onClick={() => setMenu(!menu)} className="flex items-center gap-2 rounded-full border border-rose-200 bg-white px-3 py-1.5 text-sm font-medium">
                {user.image ? <img src={user.image} alt="" className="h-7 w-7 rounded-full object-cover" /> : <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-600 text-xs font-bold text-white">{user.name?.[0]?.toUpperCase() || "U"}</span>}
                <span className="max-w-32 truncate">{user.name}</span><ChevronDown className="h-4 w-4" />
              </button>
              {menu && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border bg-white py-1 shadow-lg">
                  <Link href={dash} onClick={() => setMenu(false)} className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-rose-50"><LayoutDashboard className="h-4 w-4" /> Dashboard</Link>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-rose-50"><LogOut className="h-4 w-4" /> Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
      </nav>
      {open && (
        <div className="space-y-1 border-t bg-cream px-4 py-3 md:hidden">
          <Link href="/" onClick={() => setOpen(false)} className="block rounded px-2 py-2 hover:bg-rose-50">Home</Link>
          <Link href="/services" onClick={() => setOpen(false)} className="block rounded px-2 py-2 hover:bg-rose-50">Browse Services</Link>
          {user ? <><Link href={dash} onClick={() => setOpen(false)} className="block rounded px-2 py-2 hover:bg-rose-50">Dashboard</Link><button onClick={handleLogout} className="block w-full rounded px-2 py-2 text-left hover:bg-rose-50">Logout ({user.name})</button></>
          : <><Link href="/signin" onClick={() => setOpen(false)} className="block rounded px-2 py-2 hover:bg-rose-50">Sign In</Link><Link href="/signup" onClick={() => setOpen(false)} className="block rounded px-2 py-2 hover:bg-rose-50">Sign Up</Link></>}
        </div>
      )}
    </header>
  );
}
