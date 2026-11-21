"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiFetch, normalizeList, uploadImage } from "@/lib/api";
import type { Service } from "@/lib/types";
import { CATEGORIES, serviceName, fmtMoney } from "@/lib/types";
import Loader from "@/components/Loader";
import StatusBadge from "@/components/StatusBadge";
import ConfirmDialog from "@/components/ConfirmDialog";

const empty = { serviceName: "", category: CATEGORIES[0], description: "", price: "", duration: "", image: "", status: "active" };
export default function ManageServices() {
  const [list, setList] = useState<Service[]>([]); const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>(empty); const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false); const [saving, setSaving] = useState(false); const [uploading, setUploading] = useState(false);
  const [toDelete, setToDelete] = useState<string | null>(null);
  const load = async () => { try { const d = await apiFetch("/api/services?all=true"); setList(normalizeList<Service>(d)); } catch (e: any) { toast.error(e.message || "Failed to load services"); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const startAdd = () => { setForm(empty); setEditing(null); setShowForm(true); };
  const startEdit = (s: Service) => { setForm({ serviceName: serviceName(s), category: s.category, description: s.description, price: String(s.price), duration: String(s.duration), image: s.image || "", status: s.status || "active" }); setEditing(s._id || s.id || ""); setShowForm(true); };
  const handleFile = async (f: File) => { setUploading(true); try { const url = await uploadImage(f); setForm((p: any) => ({ ...p, image: url })); toast.success("Image uploaded"); } catch (e: any) { toast.error(e.message || "Image upload failed"); } finally { setUploading(false); } };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = Number(form.price); const duration = Number(form.duration);
    if (!price || price <= 0) { toast.error("Price must be a positive number."); return; }
    if (!duration || duration <= 0) { toast.error("Duration must be a positive number."); return; }
    if (!form.image) { toast.error("Please upload a service image."); return; }
    setSaving(true);
    try {
      const body = { serviceName: form.serviceName, category: form.category, description: form.description, price, duration, image: form.image, status: form.status };
      if (editing) await apiFetch(`/api/services/${editing}`, { method: "PUT", body: JSON.stringify(body) }); else await apiFetch("/api/services", { method: "POST", body: JSON.stringify(body) });
      toast.success(editing ? "Service updated" : "Service added"); setShowForm(false); setEditing(null); load();
    } catch (e: any) { toast.error(e.message || "Save failed"); } finally { setSaving(false); }
  };
  const toggleStatus = async (s: Service) => { try { await apiFetch(`/api/services/${s._id || s.id}/status`, { method: "PATCH", body: JSON.stringify({ status: (s.status || "active") === "active" ? "inactive" : "active" }) }); toast.success("Status updated"); load(); } catch (e: any) { toast.error(e.message || "Update failed"); } };
  const del = async () => { if (!toDelete) return; try { await apiFetch(`/api/services/${toDelete}`, { method: "DELETE" }); toast.success("Service deleted"); setToDelete(null); load(); } catch (e: any) { toast.error(e.message || "Delete failed"); } };
  if (loading) return <Loader label="Loading services…" />;
  return (<div><div className="flex flex-wrap items-center justify-between gap-3"><div><h1 className="font-serif text-3xl font-bold text-plum">Manage Services</h1><p className="mt-1 text-stone-500">{list.length} services in total.</p></div><button onClick={startAdd} className="btn-primary">+ Add Service</button></div>
    {showForm && (<form onSubmit={submit} className="card mt-6 space-y-4 p-6">
      <h2 className="font-serif text-xl font-semibold">{editing ? "Update Service" : "Add New Service"}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label">Service Name</label><input className="input" value={form.serviceName} onChange={(e) => setForm({ ...form, serviceName: e.target.value })} required /></div>
        <div><label className="label">Category</label><select className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></div>
        <div><label className="label">Price (USD)</label><input type="number" min="0" step="0.01" className="input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></div>
        <div><label className="label">Duration (minutes)</label><input type="number" min="1" className="input" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} required /></div>
        <div><label className="label">Status</label><select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="active">Active</option><option value="inactive">Inactive</option></select></div>
        <div><label className="label">Service Image — Upload (required)</label><input type="file" accept="image/*" className="input" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />{uploading && <p className="mt-1 text-xs">Uploading…</p>}{form.image && <img src={form.image} alt="" className="mt-2 h-20 w-20 rounded-lg object-cover" />}</div>
      </div>
      <div><label className="label">Description</label><textarea className="input" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
      <div className="flex gap-3"><button className="btn-primary" disabled={saving || uploading}>{saving ? "Saving…" : editing ? "Update Service" : "Add Service"}</button><button type="button" className="btn-secondary" onClick={() => setShowForm(false)}>Cancel</button></div>
    </form>)}
    <div className="card mt-6 overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-sand/60"><tr><th className="px-4 py-3">Service</th><th className="px-4 py-3">Category</th><th className="px-4 py-3">Price</th><th className="px-4 py-3">Duration</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>{list.map((s) => (<tr key={s._id || s.id} className="border-t"><td className="px-4 py-3"><div className="flex items-center gap-3"><img src={s.image || ""} alt="" className="h-10 w-10 rounded-lg object-cover bg-sand" /><span className="font-medium">{serviceName(s)}</span></div></td><td className="px-4 py-3">{s.category}</td><td className="px-4 py-3">{fmtMoney(s.price)}</td><td className="px-4 py-3">{s.duration} min</td><td className="px-4 py-3"><StatusBadge value={s.status || "active"} /></td><td className="px-4 py-3"><div className="flex flex-wrap gap-2"><button onClick={() => startEdit(s)} className="text-rose-600 hover:underline">Edit</button><button onClick={() => toggleStatus(s)} className="text-stone-600 hover:underline">{(s.status || "active") === "active" ? "Deactivate" : "Activate"}</button><button onClick={() => setToDelete(s._id || s.id || "")} className="text-red-600 hover:underline">Delete</button></div></td></tr>))}</tbody></table>{list.length === 0 && <p className="p-8 text-center text-stone-500">No services yet.</p>}</div>
    <ConfirmDialog open={!!toDelete} title="Delete service?" message="This will permanently delete the service." confirmLabel="Delete" onConfirm={del} onCancel={() => setToDelete(null)} />
  </div>);
}
