import { useState } from "react";
import { Check, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PropertyForm } from "./PropertyForm";
import { useProperties } from "@/lib/property/store";
import type { Property, PropertyDraft } from "@/lib/property/types";

function toDraft(property: Property): PropertyDraft {
  const { id: _id, createdAt: _c, updatedAt: _u, ...draft } = property;
  return draft;
}

export function PropertiesPanel() {
  const {
    properties,
    activeId,
    ready,
    createProperty,
    updateProperty,
    deleteProperty,
    selectProperty,
  } = useProperties();
  const [mode, setMode] = useState<
    { kind: "list" } | { kind: "add" } | { kind: "edit"; id: string }
  >({ kind: "list" });
  const [pendingDelete, setPendingDelete] = useState<Property | null>(null);

  if (mode.kind === "add") {
    return (
      <>
        <div className="mb-6">
          <h1 className="text-3xl">Add property</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Only the name, city and country are required — everything else can be added later.
          </p>
        </div>
        <PropertyForm
          submitLabel="Save property"
          onCancel={() => setMode({ kind: "list" })}
          onSubmit={async (draft) => {
            await createProperty(draft);
            toast.success("Property saved");
            setMode({ kind: "list" });
          }}
        />
      </>
    );
  }

  if (mode.kind === "edit") {
    const property = properties.find((p) => p.id === mode.id);
    if (!property) return null;
    return (
      <>
        <div className="mb-6">
          <h1 className="text-3xl">Edit property</h1>
          <p className="mt-2 text-sm text-muted-foreground">{property.name}</p>
        </div>
        <PropertyForm
          initial={toDraft(property)}
          submitLabel="Save changes"
          onCancel={() => setMode({ kind: "list" })}
          onSubmit={async (draft) => {
            await updateProperty(property.id, draft);
            toast.success("Property updated");
            setMode({ kind: "list" });
          }}
        />
      </>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl">My Properties</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Property details give the Webrya AI tools factual context. Nothing is invented from a
            blank field.
          </p>
        </div>
        {properties.length > 0 && (
          <Button onClick={() => setMode({ kind: "add" })}>
            <Plus className="size-4" /> Add property
          </Button>
        )}
      </div>

      {!ready ? null : properties.length === 0 ? (
        <div className="grid place-items-center rounded-xl border border-dashed border-border p-12 text-center">
          <div>
            <h2 className="text-xl">Add your first property</h2>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              Save your property once and the AI tools can use its details as context.
            </p>
            <Button className="mt-5" onClick={() => setMode({ kind: "add" })}>
              <Plus className="size-4" /> Add property
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {properties.map((p) => {
            const isActive = p.id === activeId;
            return (
              <div key={p.id} className="flex flex-col rounded-xl border border-border bg-card p-6">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg">{p.name}</h2>
                  {isActive && (
                    <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-xs text-secondary-foreground">
                      <Check className="size-3" /> Active
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.propertyType} · {[p.city, p.country].filter(Boolean).join(", ")}
                </p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">
                  {p.bedrooms} bedroom(s) · {p.bathrooms} bathroom(s) · up to {p.maxGuests} guest(s)
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {!isActive && (
                    <Button size="sm" variant="outline" onClick={() => void selectProperty(p.id)}>
                      Set active
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setMode({ kind: "edit", id: p.id })}
                  >
                    <Pencil className="size-4" /> Edit
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setPendingDelete(p)}>
                    <Trash2 className="size-4" /> Delete
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <AlertDialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this property?</AlertDialogTitle>
            <AlertDialogDescription>
              {pendingDelete?.name} and all of its saved details will be removed. This can't be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                const target = pendingDelete;
                setPendingDelete(null);
                if (target) {
                  void deleteProperty(target.id).then(() => toast.success("Property deleted"));
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
