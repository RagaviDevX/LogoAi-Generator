export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  subscription_tier: "free" | "pro" | "enterprise";
  credits_remaining: number;
}

export interface GenerationRequest {
  brandName: string;
  industry: string;
  style: string;
  description?: string;
  colors?: string[];
}

export interface GenerationResult {
  id: string;
  user_id: string;
  brand_name: string;
  industry: string;
  style: string;
  logo_prompt: string;
  slogans: string[];
  color_palettes: ColorPalette[];
  typography: TypographySuggestion[];
  brand_names: string[];
  social_ideas: string[];
  image_url?: string;
  is_favorite: boolean;
  created_at: string;
}

export interface ColorPalette {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  description: string;
}

export interface TypographySuggestion {
  heading: string;
  body: string;
  accent: string;
  mood: string;
  pairing_reason: string;
}

export interface BrandKit {
  id: string;
  user_id: string;
  name: string;
  logo_generation_id: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  heading_font: string;
  body_font: string;
  slogans: string[];
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  full_name?: string;
  avatar_url?: string;
  company?: string;
  website?: string;
  bio?: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  tier: "free" | "pro" | "enterprise";
  status: "active" | "cancelled" | "past_due";
  current_period_end: string;
  credits_per_month: number;
  created_at: string;
}

export interface DashboardStats {
  total_generations: number;
  saved_logos: number;
  brand_kits: number;
  favorites: number;
  credits_used: number;
  credits_remaining: number;
}

export type StyleOption =
  | "modern"
  | "minimal"
  | "bold"
  | "luxury"
  | "playful"
  | "corporate"
  | "tech"
  | "vintage"
  | "organic"
  | "geometric";

export type IndustryOption =
  | "technology"
  | "finance"
  | "healthcare"
  | "education"
  | "food"
  | "fashion"
  | "real-estate"
  | "sports"
  | "entertainment"
  | "beauty"
  | "travel"
  | "consulting";
