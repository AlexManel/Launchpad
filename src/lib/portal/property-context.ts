import type { Property } from "./types";

/**
 * Builds a plain-text property brief for AI tools.
 * Wi-Fi password is intentionally never included.
 */
export function buildPropertyContext(property: Property): string {
  const lines: string[] = [];
  const add = (label: string, value: string | number | null | undefined) => {
    if (value === null || value === undefined) return;
    const s = String(value).trim();
    if (!s) return;
    lines.push(`${label}: ${s}`);
  };

  add("Property name", property.name);
  add("Type", property.property_type);
  add("City", property.city);
  add("Country", property.country);
  add("Address", property.address);
  add("Bedrooms", property.bedrooms);
  add("Bathrooms", property.bathrooms);
  add("Max guests", property.max_guests);
  add("Check-in", property.check_in_time);
  add("Check-out", property.check_out_time);
  add("Quiet hours", property.quiet_hours);
  add("Smoking", property.smoking);
  add("Pets", property.pets);
  add("Parties", property.parties);
  add("Access method", property.access_method);
  add("Check-in instructions", property.check_in_instructions);
  add("Parking", property.parking_instructions);
  add("Wi-Fi network", property.wifi_network);
  // Intentionally omit wifi_password from AI context (security)
  add("Neighborhood", property.neighborhood);
  add("Nearby attractions", property.nearby_attractions);
  add("Nearby restaurants", property.nearby_restaurants);
  add("Public transport", property.public_transport);
  add("Landmarks", property.important_landmarks);
  add("Host notes", property.host_notes);
  if (property.amenities && property.amenities.length > 0) {
    lines.push(`Amenities: ${property.amenities.join(", ")}`);
  }
  return lines.join("\n");
}
