export function cn(...parts: Array<string | false | null | undefined>) { return parts.filter(Boolean).join(" "); }
export function passwordValid(pw: string): string | null {
  if (pw.length < 6) return "Password must be at least 6 characters.";
  if (!/[A-Z]/.test(pw)) return "Password must contain an uppercase letter.";
  if (!/[a-z]/.test(pw)) return "Password must contain a lowercase letter.";
  return null;
}
