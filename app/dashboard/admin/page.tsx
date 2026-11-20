"use client";
import { useEffect, useState } from "react";
import { Users, Scissors, Calendar, Clock, CheckCircle2, CreditCard } from "lucide-react";
import { apiFetch } from "@/lib/api";
import StatCard from "@/components/StatCard";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
export default function AdminOverview() {
  const [s, setS] = useState<any>({}); const [loading, setLoading] = useState(true);
  useEffect(() => { (async () => { try { const d: any = await apiFetch("/api/dashboard/admin"); setS(d?.stats || d?.data || d || {}); } catch (e: any) { toast.error(e.message || "Failed to load overview"); } finally { setLoading(false); } })(); }, []);
  if (loading) return <Loader label="Loading overview…" />;
  return (<div><h1 className="font-serif text-3xl font-bold text-plum">Admin Overview</h1><p className="mt-1 text-stone-500">Salon performance at a glance.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard label="Total Customers" value={s.totalCustomers ?? s.totalUsers ?? 0} icon={<Users className="h-5 w-5" />} />
      <StatCard label="Active Services" value={s.totalActiveServices ?? s.activeServices ?? 0} icon={<Scissors className="h-5 w-5" />} />
      <StatCard label="Total Appointments" value={s.totalAppointments ?? 0} icon={<Calendar className="h-5 w-5" />} />
      <StatCard label="Pending Appointments" value={s.pendingAppointments ?? s.pending ?? 0} icon={<Clock className="h-5 w-5" />} />
      <StatCard label="Confirmed Appointments" value={s.confirmedAppointments ?? s.confirmed ?? 0} icon={<CheckCircle2 className="h-5 w-5" />} />
      <StatCard label="Successful Payments" value={s.totalSuccessfulPayments ?? s.successfulPayments ?? s.totalPayments ?? 0} icon={<CreditCard className="h-5 w-5" />} />
    </div></div>);
}
