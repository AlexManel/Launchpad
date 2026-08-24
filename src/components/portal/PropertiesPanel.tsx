import { useState } from "react";
import { Plus, Pencil, Trash2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PanelTitle } from "@/components/portal/fields";
import type { Property } from "@/lib/portal/types";
import { PropertyForm } from "@/components/portal/PropertyForm";
import { RoomsPanel } from "@/components/portal/RoomsPanel";
import { supabase } from "@/lib/supabase";
import { useI18n } from "@/i18n/I18nProvider";

function tr(t: (k: string) => string, key: string, fallback: string) {
  const v = t(key);
  return v === key ? fallback : v;
}

export function PropertiesPanel({
  properties,
  loading,
  error,
  onPropertiesChange,
}: {
  properties: Property[];
  loading: boolean;
  error: string;
  onPropertiesChange: (properties: Property[]) => void;
}) {
  const { t } = useI18n();
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [actionError, setActionError] = useState("");

  const openCreate = () => {
    setActionError("");
    setEditingProperty(null);
    setShowForm(true);
  };

  const openEdit = (property: Property) => {
    setActionError("");
    setEditingProperty(property);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleSaved = (property: Property) => {
    if (editingProperty) {
      onPropertiesChange(
        properties.map((item) => (item.id === property.id ? property : item)),
      );
    } else {
      onPropertiesChange([property, ...properties]);
    }
    closeForm();
  };

  const handleDelete = async (property: Property) => {
    const confirmed = window.confirm(
      tr(t, "ws.prop.deleteConfirm", `Delete "${property.name}"? This cannot be undone.`).replace(
        "{name}",
        property.name,
      ),
    );
    if (!confirmed) return;

    setDeletingId(property.id);
    setActionError("");

    try {
      const { error: deleteError } = await supabase
        .from("properties")
        .delete()
        .eq("id", property.id);

      if (deleteError) throw deleteError;

      onPropertiesChange(properties.filter((item) => item.id !== property.id));
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : tr(t, "ws.prop.deleteError", "Unable to delete property."),
      );
    } finally {
      setDeletingId(null);
    }
  };

  const title = tr(t, "ws.prop.title", "My Properties");
  const sub = tr(t, "ws.prop.sub", "Save property details once and use them across Webrya.");

  if (loading) {
    return (
      <div>
        <PanelTitle title={title} sub={sub} />
        <div className="mt-6 rounded-xl border border-border bg-card p-8 text-sm text-muted-foreground">
          {tr(t, "ws.prop.loading", "Loading your properties...")}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PanelTitle title={title} sub={sub} />
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
          {tr(t, "ws.prop.loadError", "Unable to load properties:")} {error}
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <PropertyForm
        property={editingProperty}
        onCancel={closeForm}
        onSaved={handleSaved}
      />
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4">
        <PanelTitle title={title} sub={sub} />
        <Button onClick={openCreate}>
          <Plus className="size-4" />
          {tr(t, "ws.prop.add", "Add property")}
        </Button>
      </div>

      {actionError && (
        <div className="mt-6 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {actionError}
        </div>
      )}

      {properties.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-border p-10 text-center">
          <Home className="mx-auto size-8 text-muted-foreground" />
          <h2 className="mt-4 text-lg">{tr(t, "ws.prop.emptyTitle", "No properties yet")}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            {tr(
              t,
              "ws.prop.emptyBody",
              "Add your first property so Webrya can use its details when generating guest replies, listings, house rules and other content.",
            )}
          </p>
          <Button className="mt-5" onClick={openCreate}>
            <Plus className="size-4" />
            {tr(t, "ws.prop.addFirst", "Add your first property")}
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid gap-4">
          {properties.map((property) => (
            <div
              key={property.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl">{property.name}</h2>
                    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                      {property.status || "active"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {[property.city, property.country].filter(Boolean).join(", ") ||
                      tr(t, "ws.prop.noLocation", "Location not specified")}
                  </p>
                  <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">{tr(t, "ws.prop.type", "Type")}</p>
                      <p className="mt-1">
                        {property.property_type || tr(t, "ws.prop.notSpecified", "Not specified")}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{tr(t, "ws.prop.guests", "Guests")}</p>
                      <p className="mt-1">{property.max_guests ?? "—"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{tr(t, "ws.prop.bedrooms", "Bedrooms")}</p>
                      <p className="mt-1">{property.bedrooms ?? "—"}</p>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button variant="outline" size="sm" onClick={() => openEdit(property)}>
                    <Pencil className="size-4" />
                    {tr(t, "ws.prop.edit", "Edit")}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={deletingId === property.id}
                    onClick={() => void handleDelete(property)}
                  >
                    <Trash2 className="size-4" />
                    {deletingId === property.id
                      ? tr(t, "ws.prop.deleting", "Deleting...")
                      : tr(t, "ws.prop.delete", "Delete")}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <RoomsPanel properties={properties} />
    </div>
  );
}
