export type Role = "admin" | "customer";
export interface User { id: string; _id?: string; name: string; email: string; image?: string | null; role?: Role | string; isBlocked?: boolean; phone?: string; createdAt?: string; }
export interface Service { _id: string; id?: string; serviceName: string; name?: string; category: string; description: string; price: number; duration: number; image?: string; status?: "active" | "inactive" | string; createdAt?: string; }
export interface Appointment {
  _id: string; serviceId?: string | Service; customerId?: string | User;
  service?: Service; customer?: User; serviceName?: string; serviceImage?: string;
  appointmentDate: string; timeSlot: string; message?: string; servicePrice?: number; price?: number;
  paymentStatus: "unpaid" | "paid" | string; status: "pending" | "confirmed" | "cancelled" | string; createdAt?: string;
}
export interface Transaction {
  _id: string; appointmentId?: string | Appointment; customerId?: string | User;
  appointment?: Appointment; customer?: User; service?: Service;
  amount: number; currency: string; stripeSessionId?: string; status: "paid" | "failed" | string; createdAt?: string;
}
export const CATEGORIES = ["Haircut & Styling","Hair Coloring","Hair Treatment","Facial & Skincare","Makeup","Manicure & Pedicure","Spa & Massage"];
export const TIME_SLOTS = ["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"];
export function serviceId(s: Service): string { return s._id || s.id || ""; }
export function serviceName(s: Service): string { return s.serviceName || s.name || "Service"; }
export function apptService(a: Appointment): { name: string; image?: string; category?: string } {
  if (typeof a.serviceId === "object" && a.serviceId) return { name: serviceName(a.serviceId as Service), image: (a.serviceId as Service).image, category: (a.serviceId as Service).category };
  if (a.service) return { name: serviceName(a.service), image: a.service.image, category: a.service.category };
  return { name: a.serviceName || "Service", image: a.serviceImage };
}
export function apptCustomer(a: Appointment): { name: string; email?: string } {
  if (typeof a.customerId === "object" && a.customerId) return { name: (a.customerId as User).name, email: (a.customerId as User).email };
  if (a.customer) return { name: a.customer.name, email: a.customer.email };
  return { name: "Customer" };
}
export function apptPrice(a: Appointment): number { return a.servicePrice ?? a.price ?? (typeof a.serviceId === "object" && a.serviceId ? (a.serviceId as Service).price : 0) ?? 0; }
export function fmtDate(d?: string): string { if (!d) return "—"; const dt = new Date(d); return isNaN(dt.getTime()) ? d.slice(0,10) : dt.toLocaleDateString("en-GB", { year:"numeric", month:"short", day:"numeric" }); }
export function fmtMoney(n?: number, currency = "USD"): string { return new Intl.NumberFormat("en-US", { style:"currency", currency: (currency||"USD").toUpperCase() }).format(n ?? 0); }
export function shortSession(id?: string): string { if (!id) return "—"; return id.length > 18 ? `${id.slice(0,10)}…${id.slice(-6)}` : id; }
