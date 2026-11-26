// API calls go through the client URL — next.config rewrites proxy /api to the server
export const API_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";

export async function apiFetch<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const isForm = options.body instanceof FormData;
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: isForm ? {} : { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  let data: any = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const msg = data?.message || data?.error || `Request failed (${res.status})`;
    const err: any = new Error(msg); err.status = res.status; err.data = data; throw err;
  }
  return data as T;
}

export function normalizeList<T>(data: any): T[] {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.services)) return data.services;
  if (Array.isArray(data?.appointments)) return data.appointments;
  if (Array.isArray(data?.users)) return data.users;
  if (Array.isArray(data?.transactions)) return data.transactions;
  if (Array.isArray(data?.data)) return data.data;
  return [];
}

export async function uploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${API_URL}/api/upload`, { method: "POST", body: form, credentials: "include" });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Image upload failed");
  const url = data?.imageUrl || data?.url || data?.data?.url || data?.image || "";
  if (!url) throw new Error("Image upload returned no URL");
  return url;
}
