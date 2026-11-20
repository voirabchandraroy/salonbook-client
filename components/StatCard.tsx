import type { ReactNode } from "react";
export default function StatCard({ label, value, icon }: { label: string; value: number | string; icon?: ReactNode }) {
  return (
    <div className="card flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-rose-600">{icon}</div>
      <div><p className="text-2xl font-bold text-plum">{value}</p><p className="text-sm text-stone-500">{label}</p></div>
    </div>
  );
}
