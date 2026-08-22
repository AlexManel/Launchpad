import { useState } from "react";
import { Plus, Pencil, Trash2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PanelTitle } from "@/components/portal/fields";
import type { Property } from "@/lib/portal/types";
import { PropertyForm } from "@/components/portal/PropertyForm";
import { supabase } from "@/lib/supabase";

export function PropertiesPanel({
  properties,
  loading,
  error,
  onPropertiesChange,
}: {
  properties: Property[];
  loading: boolean;
  error: string;
  onPropertiesChange: (
    properties: Property[]
  ) => void;
}) {
  const [
    editingProperty,
    setEditingProperty,
  ] = useState<Property | null>(null);

  const [
    showForm,
    setShowForm,
  ] = useState(false);

  const [
    deletingId,
    setDeletingId,
  ] = useState<string | null>(null);

  const [
    actionError,
    setActionError,
  ] = useState("");

  const openCreate = () => {
    setActionError("");
    setEditingProperty(null);
    setShowForm(true);
  };

  const openEdit = (
    property: Property
  ) => {
    setActionError("");
    setEditingProperty(property);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  const handleSaved = (
    property: Property
  ) => {
    if (editingProperty) {
      onPropertiesChange(
        properties.map((item) =>
          item.id === property.id
            ? property
            : item
        )
      );
    } else {
      onPropertiesChange([
        property,
        ...properties,
      ]);
    }

    closeForm();
  };

  const handleDelete = async (
    property: Property
  ) => {
    const confirmed =
      window.confirm(
        `Delete "${property.name}"? This cannot be undone.`
      );

    if (!confirmed) {
      return;
    }

    setDeletingId(property.id);
    setActionError("");

    try {
      const { error: deleteError } =
        await supabase
          .from("properties")
          .delete()
          .eq("id", property.id);

      if (deleteError) {
        throw deleteError;
      }

      onPropertiesChange(
        properties.filter(
          (item) =>
            item.id !== property.id
        )
      );
    } catch (err) {
      setActionError(
        err instanceof Error
          ? err.message
          : "Unable to delete property."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div>
        <PanelTitle
          title="My Properties"
          sub="Save property details once and use them across Webrya."
        />

        <div className="mt-6 rounded-xl border border-border bg-card p-8 text-sm text-muted-foreground">
          Loading your properties...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PanelTitle
          title="My Properties"
          sub="Save property details once and use them across Webrya."
        />

        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
          Unable to load properties:{" "}
          {error}
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
        <PanelTitle
          title="My Properties"
          sub="Save property details once and use them across Webrya."
        />

        <Button onClick={openCreate}>
          <Plus className="size-4" />
          Add property
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

          <h2 className="mt-4 text-lg">
            No properties yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
            Add your first property so Webrya
            can use its details when generating
            guest replies, listings, house rules
            and other content.
          </p>

          <Button
            className="mt-5"
            onClick={openCreate}
          >
            <Plus className="size-4" />
            Add your first property
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
                    <h2 className="text-xl">
                      {property.name}
                    </h2>

                    <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                      {property.status ||
                        "active"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {[
                      property.city,
                      property.country,
                    ]
                      .filter(Boolean)
                      .join(", ") ||
                      "Location not specified"}
                  </p>

                  <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Type
                      </p>
                      <p className="mt-1">
                        {property.property_type ||
                          "Not specified"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Guests
                      </p>
                      <p className="mt-1">
                        {property.max_guests ??
                          "—"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Bedrooms
                      </p>
                      <p className="mt-1">
                        {property.bedrooms ??
                          "—"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      openEdit(property)
                    }
                  >
                    <Pencil className="size-4" />
                    Edit
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={
                      deletingId ===
                      property.id
                    }
                    onClick={() =>
                      void handleDelete(
                        property
                      )
                    }
                  >
                    <Trash2 className="size-4" />
                    {deletingId ===
                    property.id
                      ? "Deleting..."
                      : "Delete"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
