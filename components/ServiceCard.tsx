import Link from "next/link";
import { Clock, Tag } from "lucide-react";
import type { Service } from "@/lib/types";
import { serviceId, serviceName, fmtMoney } from "@/lib/types";
import StatusBadge from "./StatusBadge";

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="card overflow-hidden flex flex-col">
      <div className="relative h-48 bg-sand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={service.image || "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80"} alt={serviceName(service)} className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-rose-700">{service.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-xl font-semibold text-plum">{serviceName(service)}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-stone-600">{service.description}</p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-lg font-bold text-rose-600">{fmtMoney(service.price)}</span>
          <span className="inline-flex items-center gap-1 text-stone-500"><Clock className="h-4 w-4" />{service.duration} min</span>
        </div>
        <Link href={`/services/${serviceId(service)}`} className="btn-primary mt-4 text-center">View Details</Link>
      </div>
    </article>
  );
}
