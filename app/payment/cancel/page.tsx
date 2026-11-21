import Link from "next/link";
import { XCircle } from "lucide-react";
export default function PaymentCancel() {
  return (<div className="mx-auto max-w-xl px-4 py-20 text-center"><XCircle className="mx-auto h-16 w-16 text-amber-500" /><h1 className="mt-4 font-serif text-3xl font-bold text-plum">Payment Cancelled</h1><p className="mt-2 text-stone-500">Your payment was cancelled and no charge was made. Your appointment is still confirmed — you can try paying again from your dashboard.</p><div className="mt-6 flex justify-center gap-3"><Link href="/dashboard/customer/appointments" className="btn-primary">Try Again</Link><Link href="/" className="btn-secondary">Back to Home</Link></div></div>);
}
