"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiFetch, normalizeList } from "@/lib/api";
import type { User } from "@/lib/types";
import Loader from "@/components/Loader";
import StatusBadge from "@/components/StatusBadge";
export default function ManageUsers() {
  const [list, setList] = useState<User[]>([]); const [loading, setLoading] = useState(true);
  const load = async () => { try { const d = await apiFetch("/api/users"); setList(normalizeList<User>(d)); } catch (e: any) { toast.error(e.message || "Failed to load users"); } finally { setLoading(false); } };
  useEffect(() => { load(); }, []);
  const toggleBlock = async (u: User) => { const id = u.id || u._id || ""; try { await apiFetch(`/api/users/${id}/block`, { method: "PATCH", body: JSON.stringify({ isBlocked: !u.isBlocked }) }); toast.success(u.isBlocked ? "User unblocked" : "User blocked"); load(); } catch (e: any) { toast.error(e.message || "Action failed"); } };
  if (loading) return <Loader label="Loading users…" />;
  const customers = list.filter((u) => (u.role || "customer") !== "admin");
  return (<div><h1 className="font-serif text-3xl font-bold text-plum">Manage Users</h1><p className="mt-1 text-stone-500">{customers.length} registered customers.</p>
    <div className="card mt-6 overflow-x-auto"><table className="w-full min-w-[640px] text-left text-sm"><thead className="bg-sand/60"><tr><th className="px-4 py-3">Customer</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Actions</th></tr></thead><tbody>
    {customers.map((u) => (<tr key={u.id || u._id} className="border-t"><td className="px-4 py-3"><div className="flex items-center gap-3">{u.image ? <img src={u.image} alt="" className="h-9 w-9 rounded-full object-cover" /> : <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 font-bold text-rose-700">{u.name?.[0]}</span>}<span className="font-medium">{u.name}</span></div></td><td className="px-4 py-3">{u.email}</td><td className="px-4 py-3"><StatusBadge value={u.isBlocked ? "blocked" : "active"} /></td><td className="px-4 py-3"><button onClick={() => toggleBlock(u)} className={u.isBlocked ? "text-emerald-600 hover:underline" : "text-red-600 hover:underline"}>{u.isBlocked ? "Unblock" : "Block"}</button></td></tr>))}
    </tbody></table>{customers.length === 0 && <p className="p-8 text-center text-stone-500">No customers yet.</p>}</div></div>);
}
