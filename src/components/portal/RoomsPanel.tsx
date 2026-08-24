import { useEffect, useState } from "react";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Field, PanelTitle } from "@/components/portal/fields";
import { inputClass, textareaClass } from "@/lib/portal/form-utils";
import { supabase } from "@/lib/supabase";
import type { Property, Room } from "@/lib/portal/types";

const emptyForm = {
  name: "",
  building_code: "",
  keylocker_code: "",
  door_code: "",
  wifi_network: "",
  wifi_password: "",
  notes: "",
};

export function RoomsPanel({ properties }: { properties: Property[] }) {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [propertyId, setPropertyId] = useState(properties[0]?.id ?? "");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("user_id", user.id)
      .order("sort_order", { ascending: true });
    if (error) toast.error(error.message);
    else setRooms((data as Room[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (!propertyId && properties[0]?.id) setPropertyId(properties[0].id);
  }, [properties, propertyId]);

  const filtered = rooms.filter((r) => r.property_id === propertyId);

  const startEdit = (room: Room) => {
    setEditingId(room.id);
    setPropertyId(room.property_id);
    setForm({
      name: room.name,
      building_code: room.building_code ?? "",
      keylocker_code: room.keylocker_code ?? "",
      door_code: room.door_code ?? "",
      wifi_network: room.wifi_network ?? "",
      wifi_password: room.wifi_password ?? "",
      notes: room.notes ?? "",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const save = async () => {
    if (!form.name.trim() || !propertyId) {
      toast.error("Room name and property are required.");
      return;
    }
    setSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      const payload = {
        user_id: user.id,
        property_id: propertyId,
        name: form.name.trim(),
        building_code: form.building_code.trim() || null,
        keylocker_code: form.keylocker_code.trim() || null,
        door_code: form.door_code.trim() || null,
        wifi_network: form.wifi_network.trim() || null,
        wifi_password: form.wifi_password.trim() || null,
        notes: form.notes.trim() || null,
        updated_at: new Date().toISOString(),
      };
      if (editingId) {
        const { error } = await supabase.from("rooms").update(payload).eq("id", editingId);
        if (error) throw error;
        toast.success("Room updated.");
      } else {
        const { error } = await supabase.from("rooms").insert(payload);
        if (error) throw error;
        toast.success("Room added.");
      }
      resetForm();
      await load();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save room.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id: string) => {
    if (!window.confirm("Delete this room? Stays linked to it will keep the stay but lose the room link.")) return;
    const { error } = await supabase.from("rooms").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      setRooms((prev) => prev.filter((r) => r.id !== id));
      if (editingId === id) resetForm();
    }
  };

  if (properties.length === 0) {
    return (
      <div className="mt-10 rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground">
        Add a property first, then create rooms / units with their own access codes.
      </div>
    );
  }

  return (
    <div className="mt-10">
      <PanelTitle
        title="Rooms & access codes"
        sub="Codes are per unit (keylocker, building, Wi‑Fi) — not shared across the whole property. Change anytime; check-in drafts use the selected room."
      />

      <div className="mt-6 grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-2">
        <Field label="Property">
          <select
            className={inputClass}
            value={propertyId}
            onChange={(e) => {
              setPropertyId(e.target.value);
              resetForm();
            }}
          >
            {properties.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Room / unit name">
          <input
            className={inputClass}
            placeholder="e.g. Room 15, Suite A"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </Field>
        <Field label="Building entrance code">
          <input
            className={inputClass}
            value={form.building_code}
            onChange={(e) => setForm((f) => ({ ...f, building_code: e.target.value }))}
          />
        </Field>
        <Field label="Keylocker / lockbox code">
          <input
            className={inputClass}
            value={form.keylocker_code}
            onChange={(e) => setForm((f) => ({ ...f, keylocker_code: e.target.value }))}
          />
        </Field>
        <Field label="Door / apartment code">
          <input
            className={inputClass}
            value={form.door_code}
            onChange={(e) => setForm((f) => ({ ...f, door_code: e.target.value }))}
          />
        </Field>
        <Field label="Wi‑Fi network">
          <input
            className={inputClass}
            value={form.wifi_network}
            onChange={(e) => setForm((f) => ({ ...f, wifi_network: e.target.value }))}
          />
        </Field>
        <Field label="Wi‑Fi password">
          <input
            className={inputClass}
            value={form.wifi_password}
            onChange={(e) => setForm((f) => ({ ...f, wifi_password: e.target.value }))}
          />
        </Field>
        <Field label="Notes (optional)">
          <textarea
            className={textareaClass}
            rows={2}
            value={form.notes}
            onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
          />
        </Field>
        <div className="flex flex-wrap gap-2 sm:col-span-2">
          <Button onClick={() => void save()} disabled={saving}>
            {saving && <Loader2 className="size-4 animate-spin" />}
            {editingId ? "Update room" : (
              <>
                <Plus className="size-4" /> Add room
              </>
            )}
          </Button>
          {editingId && (
            <Button variant="outline" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      {loading ? (
        <p className="mt-6 text-sm text-muted-foreground">Loading rooms…</p>
      ) : filtered.length === 0 ? (
        <p className="mt-6 rounded-xl border border-dashed border-border p-6 text-sm text-muted-foreground">
          No rooms for this property yet. Add one so Stay Board can attach a unit to each guest.
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((room) => (
            <li
              key={room.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="text-sm">
                <p className="font-medium">{room.name}</p>
                <p className="mt-1 text-muted-foreground">
                  {[room.building_code && `Building: ${room.building_code}`, room.keylocker_code && `Keylocker: ${room.keylocker_code}`, room.door_code && `Door: ${room.door_code}`, room.wifi_network && `Wi‑Fi: ${room.wifi_network}`]
                    .filter(Boolean)
                    .join(" · ") || "No codes saved yet"}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => startEdit(room)}>
                  Edit
                </Button>
                <Button size="sm" variant="ghost" onClick={() => void remove(room.id)}>
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
