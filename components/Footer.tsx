import Link from "next/link";
import { Scissors, MapPin, Clock, Phone, Mail, Facebook, Instagram, Twitter } from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-plum text-stone-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div>
          <div className="flex items-center gap-2 text-white"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-600"><Scissors className="h-5 w-5" /></span><span className="font-serif text-2xl font-bold">Salon<span className="text-rose-400">Book</span></span></div>
          <p className="mt-3 text-sm leading-relaxed">Book trusted salon services online — hair, skin, makeup, nails and spa — with confirmed appointments and secure Stripe payments.</p>
          <div className="mt-4 flex gap-3">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-rose-600"><Facebook className="h-4 w-4" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-rose-600"><Instagram className="h-4 w-4" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-rose-600"><Twitter className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <ul className="mt-3 space-y-2 text-sm"><li><Link href="/" className="hover:text-white">Home</Link></li><li><Link href="/services" className="hover:text-white">Browse Services</Link></li><li><Link href="/signin" className="hover:text-white">Sign In</Link></li><li><Link href="/signup" className="hover:text-white">Sign Up</Link></li></ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex gap-2"><Phone className="h-4 w-4 shrink-0" /> +880 1XXX-XXXXXX</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 shrink-0" /> hello@salonbook.example</li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 shrink-0" /> House 12, Road 5, Dhanmondi, Dhaka, Bangladesh</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-white">Opening Hours</h3>
          <ul className="mt-3 space-y-2 text-sm"><li className="flex justify-between"><span>Mon – Fri</span><span>9:00 AM – 8:00 PM</span></li><li className="flex justify-between"><span>Saturday</span><span>10:00 AM – 8:00 PM</span></li><li className="flex justify-between"><span>Sunday</span><span>Closed</span></li></ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs">© {new Date().getFullYear()} SalonBook. All rights reserved.</div>
    </footer>
  );
}
