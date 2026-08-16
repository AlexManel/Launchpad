const KEY = "webrya.session";

export type Session = { name: string; email: string };

export function signIn(name: string, email: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify({ name, email }));
}

export function signOut() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}
