/**
 * Shared types for the Webrya Workspace (portal).
 */

export type SectionId =
  | "overview"
  | "tools"
  | "products"
  | "properties"
  | "resources"
  | "account";

export type Property = {
  id: string;
  user_id: string;
  name: string;
  city: string | null;
  country: string | null;
  address: string | null;
  listing_url: string | null;
  status: string;
  property_type: string | null;
  description: string | null;
  bedrooms: number | null;
  bathrooms: number | null;
  max_guests: number | null;
  bed_configuration: string | null;
  living_room: string | null;
  kitchen: string | null;
  bathroom_details: string | null;
  amenities: string[] | null;
  check_in_time: string | null;
  check_out_time: string | null;
  quiet_hours: string | null;
  smoking: string | null;
  pets: string | null;
  parties: string | null;
  access_method: string | null;
  check_in_instructions: string | null;
  parking_instructions: string | null;
  wifi_network: string | null;
  wifi_password: string | null;
  neighborhood: string | null;
  nearby_attractions: string | null;
  nearby_restaurants: string | null;
  public_transport: string | null;
  important_landmarks: string | null;
  host_notes: string | null;
};

export type Profile = {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  website: string | null;
  preferred_language: string;
  timezone: string | null;
  host_display_name: string | null;
  host_type: string | null;
  business_name: string | null;
  business_email: string | null;
  business_phone: string | null;
  country: string | null;
  city: string | null;
  phone: string | null;
  communication_tone: string | null;
  response_length: string | null;
  emoji_usage: string | null;
  sign_off: string | null;
  hosting_style: string | null;
  ai_instructions: string | null;
  never_do: string | null;
  always_do: string | null;
  ai_be_concise: boolean;
  ai_be_proactive: boolean;
  ai_suggest_solutions: boolean;
  ai_use_emojis: boolean;
  ai_mention_property_name: boolean;
  ai_use_guest_first_name: boolean;
  allow_property_context_ai: boolean;
  allow_analytics: boolean;
  marketing_emails: boolean;
};
