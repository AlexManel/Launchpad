import { useCallback, useEffect, useState } from "react";
import { PropertySchema, type Property, type PropertyDraft } from "./types";

/**
 * Property persistence.
 *
 * Today: browser localStorage (the app has no database or auth yet).
 * The `PropertyRepository` interface is the seam — swapping in a real backend
 * later means providing another implementation, with no UI changes.
 */

export interface PropertyRepository {
  list(): Promise<Property[]>;
  get(id: string): Promise<Property | null>;
  create(draft: PropertyDraft): Promise<Property>;
  update(id: string, draft: PropertyDraft): Promise<Property>;
  remove(id: string): Promise<void>;
  getActiveId(): Promise<string | null>;
  setActiveId(id: string | null): Promise<void>;
}

const KEY = "webrya.properties";
const ACTIVE_KEY = "webrya.activePropertyId";

function readAll(): Property[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.flatMap((p) => {
      const result = PropertySchema.safeParse(p);
      return result.success ? [result.data] : [];
    });
  } catch {
    return [];
  }
}

function writeAll(properties: Property[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(properties));
}

function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `p_${Date.now().toString(36)}`;
}

export const localPropertyRepository: PropertyRepository = {
  list: () => Promise.resolve(readAll()),
  get: (id) => Promise.resolve(readAll().find((p) => p.id === id) ?? null),
  create: (draft) => {
    const now = new Date().toISOString();
    const property = PropertySchema.parse({
      ...draft,
      id: newId(),
      createdAt: now,
      updatedAt: now,
    });
    writeAll([...readAll(), property]);
    return Promise.resolve(property);
  },
  update: (id, draft) => {
    const all = readAll();
    const existing = all.find((p) => p.id === id);
    if (!existing) return Promise.reject(new Error("Property not found."));
    const property = PropertySchema.parse({
      ...draft,
      id,
      createdAt: existing.createdAt,
      updatedAt: new Date().toISOString(),
    });
    writeAll(all.map((p) => (p.id === id ? property : p)));
    return Promise.resolve(property);
  },
  remove: (id) => {
    writeAll(readAll().filter((p) => p.id !== id));
    if (typeof window !== "undefined" && window.localStorage.getItem(ACTIVE_KEY) === id) {
      window.localStorage.removeItem(ACTIVE_KEY);
    }
    return Promise.resolve();
  },
  getActiveId: () =>
    Promise.resolve(typeof window === "undefined" ? null : window.localStorage.getItem(ACTIVE_KEY)),
  setActiveId: (id) => {
    if (typeof window !== "undefined") {
      if (id) window.localStorage.setItem(ACTIVE_KEY, id);
      else window.localStorage.removeItem(ACTIVE_KEY);
    }
    return Promise.resolve();
  },
};

const repo = localPropertyRepository;

const listeners = new Set<() => void>();
function notify() {
  listeners.forEach((l) => l());
}

/** React binding over the repository. */
export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [activeId, setActiveIdState] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    const [list, active] = await Promise.all([repo.list(), repo.getActiveId()]);
    setProperties(list);
    setActiveIdState(active && list.some((p) => p.id === active) ? active : null);
    setReady(true);
  }, []);

  useEffect(() => {
    void refresh();
    listeners.add(refresh);
    return () => {
      listeners.delete(refresh);
    };
  }, [refresh]);

  const createProperty = useCallback(async (draft: PropertyDraft) => {
    const created = await repo.create(draft);
    const active = await repo.getActiveId();
    if (!active) await repo.setActiveId(created.id);
    notify();
    return created;
  }, []);

  const updateProperty = useCallback(async (id: string, draft: PropertyDraft) => {
    const updated = await repo.update(id, draft);
    notify();
    return updated;
  }, []);

  const deleteProperty = useCallback(async (id: string) => {
    await repo.remove(id);
    notify();
  }, []);

  const selectProperty = useCallback(async (id: string | null) => {
    await repo.setActiveId(id);
    notify();
  }, []);

  return {
    properties,
    activeId,
    activeProperty: properties.find((p) => p.id === activeId) ?? null,
    ready,
    createProperty,
    updateProperty,
    deleteProperty,
    selectProperty,
  };
}
