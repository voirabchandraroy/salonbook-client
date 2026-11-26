import { createAuthClient } from "better-auth/react";
// Auth uses the client URL — next.config rewrites proxy /api/auth to the server
export const API_URL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000";
export const authClient = createAuthClient({ baseURL: API_URL });
export const { signIn, signUp, signOut, useSession } = authClient;

