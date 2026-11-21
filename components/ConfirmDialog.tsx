"use client";
export default function ConfirmDialog({ open, title, message, confirmLabel = "Confirm", onConfirm, onCancel }: { open: boolean; title: string; message: string; confirmLabel?: string; onConfirm: () => void; onCancel: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="font-serif text-xl font-semibold text-plum">{title}</h3>
        <p className="mt-2 text-sm text-stone-600">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="btn-secondary">Cancel</button>
          <button onClick={onConfirm} className="btn-primary">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
