# SalonBook — Client

Salon appointment booking platform (frontend). Customers browse services, request appointments and pay with Stripe; admins manage services, appointments, users and transactions.

## Features
- Public home, browse services (search by name, category filter, sort by price), service details
- Better Auth email/password + Google sign-in/sign-up, role-based redirects
- Protected service details + dashboards (customer & admin), blocked-user handling
- Customer: overview stats, my appointments (cancel pending, Pay Now via Stripe Checkout), profile update with image upload
- Admin: overview stats, manage services (CRUD, image upload via `/api/upload`, activate/deactivate), manage appointments (confirm/cancel), manage users (block/unblock), read-only transactions
- Toast notifications (no `alert()`), loaders, empty/error states, responsive salon-themed UI

## Tech Stack
Next.js 14 (App Router), TypeScript, Tailwind CSS, Better Auth client, react-hot-toast, lucide-react

## Installation & Local Run
```bash
cd client
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL to your server URL
npm run dev                  # http://localhost:3000
npm run build && npm start
```

## Environment Variables (names only)
- `NEXT_PUBLIC_API_URL` — e.g. http://localhost:5000
- `NEXT_PUBLIC_BETTER_AUTH_URL` — same as the API URL

## Links
- Live Website: _TODO — add deployed URL_
- Client Repository: _TODO_
- Server Repository: _TODO_
