"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";
import { apiFetch } from "@/lib/api";
import StatCard from "@/components/StatCard";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
export default function CustomerOverview() {
  const [stats, setStats] = useState<any>({}); const [loading, setLoading] = useState(true);
  useEffect(() => { (async () => { try { const d: any = await apiFetch("/api/dashboard/customer"); setStats(d?.stats || d?.data || d || {}); } catch (e: any) { toast.error(e.message || "Failed to load overview"); } finally { setLoading(false); } })(); }, []);
  if (loading) return <Loader label="Loading overview…" />;
  const total = stats.totalAppointments ?? stats.total ?? 0;
  return (<div><h1 className="font-serif text-3xl font-bold text-plum">My Overview</h1><p className="mt-1 text-stone-500">A quick look at your appointments.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard label="Total Requests" value={total} icon={<Calendar className="h-5 w-5" />} />
      <StatCard label="Pending" value={stats.pendingAppointments ?? stats.pending ?? 0} icon={<Clock className="h-5 w-5" />} />
      <StatCard label="Confirmed" value={stats.confirmedAppointments ?? stats.confirmed ?? 0} icon={<CheckCircle2 className="h-5 w-5" />} />
      <StatCard label="Cancelled" value={stats.cancelledAppointments ?? stats.cancelled ?? 0} icon={<XCircle className="h-5 w-5" />} />
    </div>
    <div className="card mt-6 p-6"><h2 className="font-semibold">Next step</h2><p className="mt-1 text-sm text-stone-500">Browse services and request a new appointment, or check the status of your existing requests.</p><div className="mt-4 flex flex-wrap gap-3"><Link href="/services" className="btn-primary">Browse Services</Link><Link href="/dashboard/customer/appointments" className="btn-secondary">My Appointments</Link></div></div></div>);
}
