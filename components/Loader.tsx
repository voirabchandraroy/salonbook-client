export default function Loader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-stone-500" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-rose-100 border-t-rose-600" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
export function SkeletonCard() {
  return <div className="card h-80 animate-pulse"><div className="h-48 bg-sand" /><div className="space-y-3 p-5"><div className="h-4 w-3/4 rounded bg-sand" /><div className="h-3 w-full rounded bg-sand" /><div className="h-3 w-1/2 rounded bg-sand" /></div></div>;
}
