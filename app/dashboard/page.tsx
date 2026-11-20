"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Loader from "@/components/Loader";
export default function DashboardIndex() {
  const { user, loading } = useAuth(); const router = useRouter();
  useEffect(() => { if (!loading) router.replace(!user ? "/signin" : user.role === "admin" ? "/dashboard/admin" : "/dashboard/customer"); }, [user, loading, router]);
  return <Loader label="Loading dashboard…" />;
}
