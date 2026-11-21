"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiFetch, normalizeList } from "@/lib/api";
import type { Appointment } from "@/lib/types";
import { apptService, apptCustomer, apptPrice, fmtDate, fmtMoney } from "@/lib/types";
import Loader from "@/components/Loader";
import StatusBadge from "@/components/StatusBadge";
export default function ManageAppointments() {
  const [list, setList] = useState<Appointment[]>([]); const [loading, setLoading] = useState(true);
  const load = async () => { try { const d = await apiFetch("/api/appointments"); setList(normalizeList<Appointment>(d)); } catch (e: any) { toast.error(e.message || "Failed to load appointments"); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const act = async (id: string, action: "confirm" | "cancel") => { try { await apiFetch(`/api/appointments/${id}/${action}`, { method: "PATCH" }); toast.success(`Appointment ${action}ed`); load(); } catch (e: any) { toast.error(e.message || "Action failed"); } };
  if (loading) return <Loader label="Loading appointments…" />;
  return (<div><h1 className="font-serif text-3xl font-bold text-plum">Manage Appointments</h1><p className="mt-1 text-stone-500">{list.length} appointment requests in total.</p>
    {list.length === 0 ? <div className="card mt-6 p-10 text-center text-stone-500">No appointment requests yet.</div> : (
    <div className="mt-6 space-y-4">{list.map((a) => { const s = apptService(a); const c = apptCustomer(a); return (
      <article key={a._id} className="card p-5">
        <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold text-plum">{s.name} — {c.name}</h3><p className="text-sm text-stone-500">{c.email || ""} • {s.category || ""}</p></div><div className="flex gap-2"><StatusBadge value={a.status} /><StatusBadge value={a.paymentStatus} /></div></div>
        <p className="mt-2 text-sm text-stone-600">{fmtDate(a.appointmentDate)} at {a.timeSlot} • {fmtMoney(apptPrice(a))} • Requested {fmtDate(a.createdAt)}</p>
        {a.message && <p className="mt-1 text-sm italic text-stone-500">“{a.message}”</p>}
        <div className="mt-3 flex gap-2">{a.status === "pending" && <button onClick={() => act(a._id, "confirm")} className="btn-primary !px-4 !py-2">Confirm</button>}{(a.status === "pending" || a.status === "confirmed") && <button onClick={() => act(a._id, "cancel")} className="btn-secondary !px-4 !py-2">Cancel</button>}</div>
      </article>); })}</div>)}
  </div>);
}
