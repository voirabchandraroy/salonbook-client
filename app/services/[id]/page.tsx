"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Clock, Tag, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { apiFetch } from "@/lib/api";
import type { Service } from "@/lib/types";
import { serviceName, fmtMoney, TIME_SLOTS } from "@/lib/types";
import { useAuth } from "@/lib/auth-context";
import Loader from "@/components/Loader";
import StatusBadge from "@/components/StatusBadge";

export default function ServiceDetails() {
  const params = useParams(); const id = params.id as string;
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [date, setDate] = useState("");
  const [slot, setSlot] = useState("");
  const [message, setMessage] = useState("");
  const [booking, setBooking] = useState(false);

  useEffect(() => { if (!authLoading && !user) router.replace(`/signin?next=/services/${id}`); }, [authLoading, user, id, router]);
  useEffect(() => {
    if (!user) return;
    (async () => {
      try { const data: any = await apiFetch(`/api/services/${id}`); const s = data?.service || data?.data || data; if (!s || !s.serviceName && !s.name) throw new Error("Service not found"); setService(s); }
      catch (e: any) { setError(e.message || "Service not found"); } finally { setLoading(false); }
    })();
  }, [id, user]);

  if (authLoading || (loading && user)) return <Loader label="Loading service…" />;
  if (!user) return <Loader label="Redirecting to sign in…" />;
  if (error || !service) return (<div className="mx-auto max-w-2xl px-4 py-20 text-center"><h1 className="font-serif text-3xl font-bold">Service not available</h1><p className="mt-2 text-stone-500">{error || "This service does not exist or is no longer active."}</p><Link href="/services" className="btn-primary mt-6">Browse Services</Link></div>);
  const inactive = (service.status || "active") !== "active";
  const isAdmin = user.role === "admin";
  const today = new Date().toISOString().slice(0, 10);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !slot) { toast.error("Please choose a date and time slot."); return; }
    setBooking(true);
    try {
      await apiFetch("/api/appointments", { method: "POST", body: JSON.stringify({ serviceId: service._id || service.id, appointmentDate: date, timeSlot: slot, message }) });
      toast.success("Appointment request submitted!");
      router.push("/dashboard/customer/appointments");
    } catch (e: any) { toast.error(e.message || "Booking failed — this slot may already be taken."); } finally { setBooking(false); }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/services" className="text-sm text-rose-600 hover:underline">← Back to services</Link>
      <div className="mt-4 grid gap-8 lg:grid-cols-2">
        <div><img src={service.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1000&q=80"} alt={serviceName(service)} className="h-80 w-full rounded-2xl object-cover sm:h-96" /></div>
        <div>
          <div className="flex items-center gap-2"><span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">{service.category}</span>{service.status && <StatusBadge value={service.status} />}</div>
          <h1 className="mt-3 font-serif text-3xl font-bold text-plum sm:text-4xl">{serviceName(service)}</h1>
          <p className="mt-3 leading-relaxed text-stone-600">{service.description}</p>
          <div className="mt-5 flex items-center gap-6"><span className="text-3xl font-bold text-rose-600">{fmtMoney(service.price)}</span><span className="inline-flex items-center gap-1 text-stone-500"><Clock className="h-4 w-4" /> {service.duration} minutes</span></div>
          {isAdmin && <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">Admin accounts cannot submit appointment requests. Please use a customer account to book.</div>}
          {inactive && !isAdmin && <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">This service is currently inactive and cannot be booked.</div>}
          {!isAdmin && !inactive && (
            <form onSubmit={submit} className="card mt-6 space-y-4 p-6">
              <h2 className="flex items-center gap-2 font-serif text-xl font-semibold"><Calendar className="h-5 w-5 text-rose-600" /> Book an Appointment</h2>
              <div><label className="label">Appointment Date</label><input type="date" className="input" min={today} value={date} onChange={(e) => setDate(e.target.value)} required /></div>
              <div><label className="label">Available Time Slot</label><div className="flex flex-wrap gap-2">{TIME_SLOTS.map((t) => <button key={t} type="button" onClick={() => setSlot(t)} className={`rounded-full border px-3 py-1.5 text-sm ${slot === t ? "border-rose-600 bg-rose-600 text-white" : "border-stone-300 bg-white hover:border-rose-400"}`}>{t}</button>)}</div></div>
              <div><label className="label">Additional Message (optional)</label><textarea className="input" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Anything the salon should know…" /></div>
              <button className="btn-primary w-full" disabled={booking}>{booking ? "Submitting…" : "Submit Appointment Request"}</button>
              <p className="text-xs text-stone-400">Your request starts as Pending. The salon will confirm it, then you can pay from your dashboard.</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
