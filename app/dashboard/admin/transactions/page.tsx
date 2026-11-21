"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiFetch, normalizeList } from "@/lib/api";
import type { Transaction } from "@/lib/types";
import { fmtDate, fmtMoney, shortSession } from "@/lib/types";
import Loader from "@/components/Loader";
import StatusBadge from "@/components/StatusBadge";
export default function Transactions() {
  const [list, setList] = useState<Transaction[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => { (async () => { try { const d = await apiFetch("/api/transactions"); setList(normalizeList<Transaction>(d)); } catch (e: any) { toast.error(e.message || "Failed to load transactions"); } finally { setLoading(false); } })(); }, []);
  if (loading) return <Loader label="Loading transactions…" />;
  return (<div><h1 className="font-serif text-3xl font-bold text-plum">Transactions</h1><p className="mt-1 text-stone-500">Payment records from Stripe — read-only. Payment status is updated only by the verified Stripe webhook.</p>
    <div className="card mt-6 overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm"><thead className="bg-sand/60"><tr><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Service / Date</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Stripe Session</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Date</th></tr></thead><tbody>
    {list.map((t) => { const cust = typeof t.customerId === "object" && t.customerId ? (t.customerId as any).name : (t.customer as any)?.name || "—"; const appt = typeof t.appointmentId === "object" ? t.appointmentId as any : t.appointment; const svc = appt?.serviceId && typeof appt.serviceId === "object" ? appt.serviceId.serviceName : appt?.serviceName || t.service?.serviceName || "—"; return (
      <tr key={t._id} className="border-t"><td className="px-4 py-3">{cust}</td><td className="px-4 py-3">{svc}{appt?.appointmentDate ? ` • ${fmtDate(appt.appointmentDate)}` : ""}</td><td className="px-4 py-3 font-medium">{fmtMoney(t.amount, t.currency)}</td><td className="px-4 py-3 font-mono text-xs" title={t.stripeSessionId}>{shortSession(t.stripeSessionId)}</td><td className="px-4 py-3"><StatusBadge value={t.status} /></td><td className="px-4 py-3">{fmtDate(t.createdAt)}</td></tr>); })}
    </tbody></table>{list.length === 0 && <p className="p-8 text-center text-stone-500">No transactions yet.</p>}</div></div>);
}
