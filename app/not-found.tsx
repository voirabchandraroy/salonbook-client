import Link from "next/link";
export default function NotFound() {
  return (<div className="mx-auto max-w-2xl px-4 py-24 text-center"><h1 className="font-serif text-6xl font-bold text-rose-600">404</h1><p className="mt-4 text-xl font-semibold">Page not found</p><p className="mt-2 text-stone-500">The page you are looking for does not exist or was moved.</p><Link href="/" className="btn-primary mt-6">Back to Home</Link></div>);
}
