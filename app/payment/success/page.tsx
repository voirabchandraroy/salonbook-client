import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
export default function PaymentSuccess() {
  return (<div className="mx-auto max-w-xl px-4 py-20 text-center"><CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" /><h1 className="mt-4 font-serif text-3xl font-bold text-plum">Payment Successful</h1><p className="mt-2 text-stone-500">Thank you! Your payment was confirmed. Your appointment payment status will be updated to Paid — please allow a moment for the confirmation to sync.</p><div className="mt-6 flex justify-center gap-3"><Link href="/dashboard/customer/appointments" className="btn-primary">View My Appointments</Link><Link href="/services" className="btn-secondary">Browse Services</Link></div></div>);
}
