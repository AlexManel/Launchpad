import type { Property } from "./types";

export function createEmptyPropertyForm() {
  return {
    name: "",
    city: "",
    country: "",
    address: "",
    listing_url: "",
    status: "active",
    property_type: "",
    description: "",
    bedrooms: "",
    bathrooms: "",
    max_guests: "",
    bed_configuration: "",
    living_room: "",
    kitchen: "",
    bathroom_details: "",
    amenities: "",
    check_in_time: "",
    check_out_time: "",
    quiet_hours: "",
    smoking: "not_specified",
    pets: "not_specified",
    parties: "not_specified",
    access_method: "",
    check_in_instructions: "",
    parking_instructions: "",
    wifi_network: "",
    wifi_password: "",
    neighborhood: "",
    nearby_attractions: "",
    nearby_restaurants: "",
    public_transport: "",
    important_landmarks: "",
    host_notes: "",
  };
}

export type PropertyFormState = ReturnType<
  typeof createEmptyPropertyForm
>;

export function propertyToForm(
  property: Property
): PropertyFormState {
  return {
    name: property.name ?? "",
    city: property.city ?? "",
    country: property.country ?? "",
    address: property.address ?? "",
    listing_url:
      property.listing_url ?? "",
    status:
      property.status ?? "active",
    property_type:
      property.property_type ?? "",
    description:
      property.description ?? "",
    bedrooms:
      property.bedrooms == null
        ? ""
        : String(property.bedrooms),
    bathrooms:
      property.bathrooms == null
        ? ""
        : String(property.bathrooms),
    max_guests:
      property.max_guests == null
        ? ""
        : String(property.max_guests),
    bed_configuration:
      property.bed_configuration ??
      "",
    living_room:
      property.living_room ?? "",
    kitchen:
      property.kitchen ?? "",
    bathroom_details:
      property.bathroom_details ??
      "",
    amenities:
      property.amenities?.join(", ") ??
      "",
    check_in_time:
      property.check_in_time ?? "",
    check_out_time:
      property.check_out_time ??
      "",
    quiet_hours:
      property.quiet_hours ?? "",
    smoking:
      property.smoking ??
      "not_specified",
    pets:
      property.pets ??
      "not_specified",
    parties:
      property.parties ??
      "not_specified",
    access_method:
      property.access_method ?? "",
    check_in_instructions:
      property.check_in_instructions ??
      "",
    parking_instructions:
      property.parking_instructions ??
      "",
    wifi_network:
      property.wifi_network ?? "",
    wifi_password:
      property.wifi_password ?? "",
    neighborhood:
      property.neighborhood ?? "",
    nearby_attractions:
      property.nearby_attractions ??
      "",
    nearby_restaurants:
      property.nearby_restaurants ??
      "",
    public_transport:
      property.public_transport ??
      "",
    important_landmarks:
      property.important_landmarks ??
      "",
    host_notes:
      property.host_notes ?? "",
  };
}
