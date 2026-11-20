"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { apiFetch, uploadImage } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
export default function ProfileForm() {
  const { user, refresh } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [image, setImage] = useState(user?.image || "");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  if (!user) return null;
  const handleFile = async (f: File) => { setFile(f); setUploading(true); try { const url = await uploadImage(f); setImage(url); toast.success("Image uploaded"); } catch (e: any) { toast.error(e.message || "Image upload failed"); } finally { setUploading(false); } };
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { await apiFetch("/api/users/me/profile", { method: "PATCH", body: JSON.stringify({ name, phone, image }) }); toast.success("Profile updated"); await refresh(); } catch (e: any) { toast.error(e.message || "Failed to update profile"); } finally { setSaving(false); } };
  return (
    <form onSubmit={submit} className="card max-w-xl space-y-4 p-6">
      <div className="flex items-center gap-4">{image ? <img src={image} alt="" className="h-20 w-20 rounded-full object-cover" /> : <span className="flex h-20 w-20 items-center justify-center rounded-full bg-rose-600 text-2xl font-bold text-white">{user.name?.[0]}</span>}<div><p className="font-semibold">{user.name}</p><p className="text-sm text-stone-500">{user.email}</p><p className="text-xs capitalize text-stone-400">Role: {user.role || "customer"}</p></div></div>
      <div><label className="label">Full Name</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} required /></div>
      <div><label className="label">Phone Number</label><input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 ..." /></div>
      <div><label className="label">Profile Image URL</label><input className="input" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://…" /></div>
      <div><label className="label">Or Upload Profile Image</label><input type="file" accept="image/*" className="input" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />{uploading && <p className="mt-1 text-xs text-stone-500">Uploading…</p>}</div>
      <p className="text-xs text-stone-400">You cannot change your role or blocked status here.</p>
      <button className="btn-primary" disabled={saving || uploading}>{saving ? "Saving…" : "Save Changes"}</button>
    </form>
  );
}
