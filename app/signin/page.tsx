"use client";
import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";
import Loader from "@/components/Loader";

function SignInInner() {
  const router = useRouter(); const params = useSearchParams(); const next = params.get("next") || "";
  const { refresh } = useAuth();
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [busy, setBusy] = useState(false);
  const goByRole = async () => { await refresh(); const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/auth/get-session`, { credentials: "include" }); const d = await res.json().catch(() => null); const role = d?.user?.role; router.push(next || (role === "admin" ? "/dashboard/admin" : "/dashboard/customer")); router.refresh(); };
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setBusy(true); try { const { error } = await authClient.signIn.email({ email, password }); if (error) throw new Error(error.message || "Sign in failed"); toast.success("Welcome back!"); await goByRole(); } catch (err: any) { toast.error(err.message || "Invalid email or password"); } finally { setBusy(false); } };
  const google = async () => { try { await authClient.signIn.social({ provider: "google", callbackURL: `${window.location.origin}/dashboard/customer` }); } catch (e: any) { toast.error(e.message || "Google sign-in failed"); } };
  return (
    <div className="mx-auto max-w-md px-4 py-14">
      <div className="card p-8"><h1 className="font-serif text-3xl font-bold text-plum">Sign In</h1><p className="mt-1 text-sm text-stone-500">Welcome back to SalonBook.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><label className="label">Email</label><input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
          <div><label className="label">Password</label><input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          <button className="btn-primary w-full" disabled={busy}>{busy ? "Signing in…" : "Sign In"}</button>
        </form>
        <div className="my-5 flex items-center gap-3 text-xs text-stone-400"><span className="h-px flex-1 bg-stone-200" />or<span className="h-px flex-1 bg-stone-200" /></div>
        <button onClick={google} className="btn-secondary w-full">Continue with Google</button>
        <p className="mt-5 text-center text-sm text-stone-500">No account yet? <Link href="/signup" className="font-semibold text-rose-600">Sign up</Link></p>
      </div>
    </div>
  );
}
export default function SignIn() { return <Suspense fallback={<Loader />}><SignInInner /></Suspense>; }
