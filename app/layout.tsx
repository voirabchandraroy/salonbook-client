import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
export const metadata: Metadata = { title: "SalonBook — Salon Appointment Booking", description: "Browse salon services, book appointments and pay securely with Stripe." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en"><body className="flex min-h-screen flex-col">
      <AuthProvider><Navbar /><main className="flex-1">{children}</main><Footer /></AuthProvider>
      <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
    </body></html>
  );
}
