"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiFetch, normalizeList } from "@/lib/api";
import type { Appointment } from "@/lib/types";
import { apptService, apptPrice, fmtDate, fmtMoney } from "@/lib/types";
import Loader from "@/components/Loader";
import StatusBadge from "@/components/StatusBadge";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function MyAppointments() {
  const [list, setList] = useState<Appointment[]>([]); const [loading, setLoading] = useState(true);
  const [toCancel, setToCancel] = useState<string | null>(null); const [paying, setPaying] = useState<string | null>(null);
  const load = async () => { try { const d = await apiFetch("/api/appointments/my"); setList(normalizeList<Appointment>(d)); } catch (e: any) { toast.error(e.message || "Failed to load appointments"); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const cancel = async () => { if (!toCancel) return; try { await apiFetch(`/api/appointments/${toCancel}/cancel`, { method: "PATCH" }); toast.success("Appointment cancelled"); setToCancel(null); load(); } catch (e: any) { toast.error(e.message || "Cancel failed"); } };
  const pay = async (id: string) => { setPaying(id); try { const d: any = await apiFetch(`/api/payments/checkout/${id}`, { method: "POST" }); const url = d?.url || d?.checkoutUrl || d?.sessionUrl || d?.data?.url; if (!url) throw new Error("No checkout URL returned"); window.location.href = url; } catch (e: any) { toast.error(e.message || "Payment failed to start"); setPaying(null); } };
  if (loading) return <Loader label="Loading appointments…" />;
  return (<div><h1 className="font-serif text-3xl font-bold text-plum">My Appointments</h1><p className="mt-1 text-stone-500">All appointment requests you have submitted.</p>
    {list.length === 0 ? <div className="card mt-6 p-10 text-center text-stone-500">You have no appointments yet.</div> : (
    <div className="mt-6 space-y-4">{list.map((a) => { const s = apptService(a); return (
      <article key={a._id} className="card flex flex-col gap-4 p-4 sm:flex-row">
        <img src={s.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80"} alt={s.name} className="h-24 w-full rounded-xl object-cover sm:w-32" />
        <div className="flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-semibold text-plum">{s.name}</h3><StatusBadge value={a.status} /><StatusBadge value={a.paymentStatus} /></div>
          <p className="text-sm text-stone-500">{s.category || ""} • {fmtDate(a.appointmentDate)} at {a.timeSlot} • {fmtMoney(apptPrice(a))}</p>
          {a.message && <p className="mt-1 text-sm text-stone-500">“{a.message}”</p>}
          <p className="mt-1 text-xs text-stone-400">Requested {fmtDate(a.createdAt)}</p></div>
        <div className="flex shrink-0 flex-row gap-2 sm:flex-col">
          {a.status === "pending" && <button onClick={() => setToCancel(a._id)} className="btn-secondary !px-4 !py-2">Cancel</button>}
          {a.status === "confirmed" && a.paymentStatus === "unpaid" && <button onClick={() => pay(a._id)} disabled={paying === a._id} className="btn-primary !px-4 !py-2">{paying === a._id ? "Redirecting…" : "Pay Now"}</button>}
        </div>
      </article>); })}</div>)}
    <ConfirmDialog open={!!toCancel} title="Cancel appointment?" message="This will cancel your pending appointment request. This cannot be undone." confirmLabel="Yes, Cancel" onConfirm={cancel} onCancel={() => setToCancel(null)} />
  </div>);
}
