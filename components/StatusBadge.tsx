const map: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  cancelled: "bg-red-100 text-red-800",
  paid: "bg-emerald-100 text-emerald-800",
  unpaid: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
  active: "bg-emerald-100 text-emerald-800",
  inactive: "bg-stone-200 text-stone-700",
};
export default function StatusBadge({ value }: { value?: string }) {
  const v = (value || "—").toLowerCase();
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${map[v] || "bg-stone-100 text-stone-700"}`}>{value || "—"}</span>;
}
