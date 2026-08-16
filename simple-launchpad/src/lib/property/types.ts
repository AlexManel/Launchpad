import { z } from "zod";

/**
 * The Webrya Property model.
 *
 * One single model is used for create, edit and (in future) listing import.
 * Every field except `id` and `name` is optional so that a future
 * Airbnb / Booking.com importer can populate a partial profile that the host
 * then reviews and completes.
 */

export const PROPERTY_TYPES = [
  "Apartment",
  "House",
  "Villa",
  "Studio",
  "Loft",
  "Cabin",
  "Room",
  "Other",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

export const AMENITY_KEYS = [
  "wifi",
  "airConditioning",
  "heating",
  "tv",
  "washingMachine",
  "dishwasher",
  "coffeeMachine",
  "iron",
  "hairDryer",
  "parking",
  "balcony",
  "elevator",
] as const;

export type AmenityKey = (typeof AMENITY_KEYS)[number];

export const AMENITY_LABELS: Record<AmenityKey, string> = {
  wifi: "Wi-Fi",
  airConditioning: "Air conditioning",
  heating: "Heating",
  tv: "TV",
  washingMachine: "Washing machine",
  dishwasher: "Dishwasher",
  coffeeMachine: "Coffee machine",
  iron: "Iron",
  hairDryer: "Hair dryer",
  parking: "Parking",
  balcony: "Balcony",
  elevator: "Elevator",
};

const text = (max = 2000) => z.string().trim().max(max).optional().default("");
const tri = z.enum(["yes", "no", "unspecified"]).default("unspecified");

export const AmenitiesSchema = z.object(
  Object.fromEntries(AMENITY_KEYS.map((k) => [k, z.boolean().default(false)])) as Record<
    AmenityKey,
    z.ZodDefault<z.ZodBoolean>
  >,
);

export const PropertySchema = z.object({
  id: z.string().min(1),
  createdAt: z.string().default(() => new Date().toISOString()),
  updatedAt: z.string().default(() => new Date().toISOString()),
  /** Where the data came from — manual today, importer later. */
  source: z.enum(["manual", "airbnb-import", "booking-import"]).default("manual"),
  sourceUrl: text(500),

  // Basic information
  name: z.string().trim().min(1, "Property name is required.").max(120),
  propertyType: z.enum(PROPERTY_TYPES).default("Apartment"),
  address: text(200),
  city: z.string().trim().min(1, "City is required.").max(120),
  country: z.string().trim().min(1, "Country is required.").max(120),
  description: text(4000),
  bedrooms: z.number().int().min(0).max(50).default(1),
  bathrooms: z.number().int().min(0).max(50).default(1),
  maxGuests: z.number().int().min(1).max(100).default(2),

  // Accommodation
  bedConfiguration: text(),
  livingRoom: text(),
  kitchen: text(),
  bathroomDetails: text(),

  // Amenities
  amenities: AmenitiesSchema,

  // Policies
  checkInTime: text(50),
  checkOutTime: text(50),
  quietHours: text(120),
  smokingAllowed: tri,
  petsAllowed: tri,
  partiesAllowed: tri,

  // Guest access (sensitive)
  accessMethod: text(500),
  checkInInstructions: text(),
  parkingInstructions: text(),
  wifiNetwork: text(120),
  wifiPassword: text(120),

  // Location / context
  neighborhood: text(500),
  nearbyAttractions: text(),
  nearbyRestaurants: text(),
  publicTransport: text(),
  importantLandmarks: text(),

  // Additional
  hostNotes: text(4000),
});

export type Property = z.infer<typeof PropertySchema>;
export type PropertyDraft = Omit<Property, "id" | "createdAt" | "updatedAt">;

export function createEmptyProperty(): PropertyDraft {
  return PropertySchema.omit({ id: true, createdAt: true, updatedAt: true }).parse({
    name: "placeholder",
    city: "placeholder",
    country: "placeholder",
    amenities: {},
  }) as PropertyDraft & { name: string };
}

/** A blank form draft (empty required fields, sane defaults elsewhere). */
export function blankPropertyDraft(): PropertyDraft {
  return { ...createEmptyProperty(), name: "", city: "", country: "" };
}
