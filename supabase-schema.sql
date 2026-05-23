-- BrandForge AI Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  company TEXT,
  website TEXT,
  bio TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'enterprise')),
  credits_remaining INTEGER DEFAULT 10,
  credits_per_month INTEGER DEFAULT 10,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Logo generations table
CREATE TABLE IF NOT EXISTS logo_generations (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  brand_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  style TEXT NOT NULL,
  description TEXT,
  logo_prompt TEXT,
  slogans JSONB DEFAULT '[]',
  color_palettes JSONB DEFAULT '[]',
  typography JSONB DEFAULT '[]',
  brand_names JSONB DEFAULT '[]',
  social_ideas JSONB DEFAULT '[]',
  image_url TEXT,
  cloudinary_public_id TEXT,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Brand kits table
CREATE TABLE IF NOT EXISTS brand_kits (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  logo_generation_id UUID REFERENCES logo_generations(id) ON DELETE SET NULL,
  primary_color TEXT,
  secondary_color TEXT,
  accent_color TEXT,
  heading_font TEXT,
  body_font TEXT,
  slogans JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due')),
  current_period_end TIMESTAMPTZ,
  credits_per_month INTEGER DEFAULT 10,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE logo_generations ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Logo generations policies
CREATE POLICY "Users can view own generations" ON logo_generations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own generations" ON logo_generations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own generations" ON logo_generations FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own generations" ON logo_generations FOR DELETE USING (auth.uid() = user_id);

-- Brand kits policies
CREATE POLICY "Users can view own brand kits" ON brand_kits FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own brand kits" ON brand_kits FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own brand kits" ON brand_kits FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own brand kits" ON brand_kits FOR DELETE USING (auth.uid() = user_id);

-- Subscriptions policies
CREATE POLICY "Users can view own subscription" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  INSERT INTO subscriptions (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_logo_generations_user_id ON logo_generations(user_id);
CREATE INDEX IF NOT EXISTS idx_logo_generations_created_at ON logo_generations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_brand_kits_user_id ON brand_kits(user_id);
