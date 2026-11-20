"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Calendar, User, Scissors, Users, CreditCard, Sparkles } from "lucide-react";
export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const base = role === "admin" ? "/dashboard/admin" : "/dashboard/customer";
  const links = role === "admin"
    ? [{ href: base, label: "Overview", icon: LayoutDashboard }, { href: `${base}/services`, label: "Manage Services", icon: Scissors }, { href: `${base}/appointments`, label: "Manage Appointments", icon: Calendar }, { href: `${base}/users`, label: "Manage Users", icon: Users }, { href: `${base}/transactions`, label: "Transactions", icon: CreditCard }, { href: `${base}/profile`, label: "My Profile", icon: User }]
    : [{ href: base, label: "Overview", icon: LayoutDashboard }, { href: `${base}/appointments`, label: "My Appointments", icon: Calendar }, { href: `${base}/profile`, label: "My Profile", icon: User }];
  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="card p-3 lg:sticky lg:top-20">
        <p className="flex items-center gap-2 px-3 py-2 text-xs font-bold uppercase tracking-wide text-rose-600"><Sparkles className="h-4 w-4" /> {role === "admin" ? "Admin Dashboard" : "Customer Dashboard"}</p>
        <nav className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {links.map((l) => { const active = pathname === l.href; const Icon = l.icon; return <Link key={l.href} href={l.href} className={`flex shrink-0 items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium ${active ? "bg-rose-600 text-white" : "text-stone-600 hover:bg-rose-50"}`}><Icon className="h-4 w-4" />{l.label}</Link>; })}
        </nav>
      </div>
    </aside>
  );
}
