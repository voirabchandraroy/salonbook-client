"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth";
import { uploadImage } from "@/lib/api";
import { passwordValid } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";

export default function SignUp() {
  const router = useRouter(); const { refresh } = useAuth();
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState("");
  const [image, setImage] = useState(""); const [busy, setBusy] = useState(false); const [uploading, setUploading] = useState(false);
  const handleFile = async (f: File) => { setUploading(true); try { const url = await uploadImage(f); setImage(url); toast.success("Image uploaded"); } catch (e: any) { toast.error(e.message || "Image upload failed"); } finally { setUploading(false); } };
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); const err = passwordValid(password); if (err) { toast.error(err); return; }
    setBusy(true);
    try { const { error } = await authClient.signUp.email({ name, email, password, image: image || undefined }); if (error) throw new Error(error.message || "Sign up failed"); toast.success("Account created — welcome!"); await refresh(); router.push("/dashboard/customer"); router.refresh(); }
    catch (err: any) { toast.error(err.message || "Sign up failed"); } finally { setBusy(false); }
  };
  const google = async () => { try { await authClient.signIn.social({ provider: "google", callbackURL: `${window.location.origin}/dashboard/customer` }); } catch (e: any) { toast.error(e.message || "Google sign-up failed"); } };
  return (
    <div className="mx-auto max-w-md px-4 py-14"><div className="card p-8"><h1 className="font-serif text-3xl font-bold text-plum">Create Account</h1><p className="mt-1 text-sm text-stone-500">Book salon appointments in minutes.</p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <div><label className="label">Full Name</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} required /></div>
        <div><label className="label">Email</label><input type="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div><label className="label">Password</label><input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} required /><p className="mt-1 text-xs text-stone-400">At least 6 characters, with one uppercase and one lowercase letter.</p></div>
        <div><label className="label">Profile Image URL (optional)</label><input className="input" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://…" /></div>
        <div><label className="label">Or Upload Profile Image (after sign-in)</label><p className="mt-1 text-xs text-stone-400">Upload needs an account — paste an image URL above, or upload later from your profile.</p><input type="file" accept="image/*" className="input" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />{uploading && <p className="mt-1 text-xs text-stone-500">Uploading…</p>}</div>
        <button className="btn-primary w-full" disabled={busy || uploading}>{busy ? "Creating account…" : "Sign Up"}</button>
      </form>
      <div className="my-5 flex items-center gap-3 text-xs text-stone-400"><span className="h-px flex-1 bg-stone-200" />or<span className="h-px flex-1 bg-stone-200" /></div>
      <button onClick={google} className="btn-secondary w-full">Continue with Google</button>
      <p className="mt-5 text-center text-sm text-stone-500">Already have an account? <Link href="/signin" className="font-semibold text-rose-600">Sign in</Link></p>
    </div></div>
  );
}
