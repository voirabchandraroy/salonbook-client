"use client";
import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/Loader";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter(); const pathname = usePathname();
  useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/signin"); return; }
    if (user.isBlocked) return; // show blocked message below instead of redirect loop
    const isAdminRoute = pathname.startsWith("/dashboard/admin");
    const isCustomerRoute = pathname.startsWith("/dashboard/customer");
    if (isAdminRoute && user.role !== "admin") router.replace("/dashboard/customer");
    if (isCustomerRoute && user.role === "admin") router.replace("/dashboard/admin");
  }, [user, loading, pathname, router]);
  if (loading) return <Loader label="Loading dashboard…" />;
  if (!user) return <Loader label="Redirecting to sign in…" />;
  if (user.isBlocked) return (<div className="mx-auto max-w-xl px-4 py-20 text-center"><h1 className="font-serif text-3xl font-bold">Account Blocked</h1><p className="mt-2 text-stone-500">Your account has been blocked by the salon administrator. Please contact the salon for help.</p></div>);
  const role = user.role === "admin" ? "admin" : "customer";
  return (<div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row"><Sidebar role={role} /><div className="min-w-0 flex-1">{children}</div></div>);
}
