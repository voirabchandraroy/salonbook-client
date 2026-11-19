"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "./api";
import type { User } from "./types";

interface AuthCtx { user: User | null; loading: boolean; refresh: () => Promise<void>; logout: () => Promise<void>; }
const Ctx = createContext<AuthCtx>({ user: null, loading: true, refresh: async () => {}, logout: async () => {} });
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const refresh = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/get-session`, { credentials: "include" });
      const data = await res.json().catch(() => null);
      const u = data?.user || data?.data?.user || null;
      setUser(u ? { ...u, id: u.id || u._id } : null);
    } catch { setUser(null); } finally { setLoading(false); }
  }, []);
  useEffect(() => { refresh(); }, [refresh]);
  const logout = useCallback(async () => {
    try { await fetch(`${API_URL}/api/auth/sign-out`, { method: "POST", credentials: "include" }); } catch {}
    setUser(null);
  }, []);
  return <Ctx.Provider value={{ user, loading, refresh, logout }}>{children}</Ctx.Provider>;
}
