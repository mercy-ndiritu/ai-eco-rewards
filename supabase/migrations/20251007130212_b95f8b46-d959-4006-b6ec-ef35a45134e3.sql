-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  total_points INTEGER DEFAULT 0 NOT NULL,
  items_recycled INTEGER DEFAULT 0 NOT NULL,
  co2_saved_kg DECIMAL(10, 2) DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create recycling_submissions table
CREATE TABLE public.recycling_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  item_type TEXT NOT NULL,
  material_category TEXT NOT NULL,
  points_earned INTEGER NOT NULL,
  co2_saved_kg DECIMAL(10, 2) NOT NULL,
  verified_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  ai_confidence DECIMAL(5, 2),
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create points_transactions table
CREATE TABLE public.points_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('earned', 'redeemed')),
  description TEXT NOT NULL,
  related_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create rewards table
CREATE TABLE public.rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  points_cost INTEGER NOT NULL,
  category TEXT NOT NULL,
  partner_name TEXT NOT NULL,
  image_url TEXT,
  available_quantity INTEGER,
  is_active BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create reward_redemptions table
CREATE TABLE public.reward_redemptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reward_id UUID REFERENCES public.rewards(id) ON DELETE CASCADE NOT NULL,
  points_spent INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'completed', 'cancelled')),
  redemption_code TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  completed_at TIMESTAMPTZ
);

-- Create chat_messages table for AI chatbot
CREATE TABLE public.chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  conversation_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recycling_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.points_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can view leaderboard profiles"
  ON public.profiles FOR SELECT
  USING (true);

-- RLS Policies for recycling_submissions
CREATE POLICY "Users can view own submissions"
  ON public.recycling_submissions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create submissions"
  ON public.recycling_submissions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for points_transactions
CREATE POLICY "Users can view own transactions"
  ON public.points_transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create transactions"
  ON public.points_transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for rewards (publicly readable)
CREATE POLICY "Anyone can view active rewards"
  ON public.rewards FOR SELECT
  USING (is_active = true);

-- RLS Policies for reward_redemptions
CREATE POLICY "Users can view own redemptions"
  ON public.reward_redemptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create redemptions"
  ON public.reward_redemptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for chat_messages
CREATE POLICY "Users can view own messages"
  ON public.chat_messages FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create messages"
  ON public.chat_messages FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Trigger for profiles updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample rewards
INSERT INTO public.rewards (title, description, points_cost, category, partner_name, image_url) VALUES
  ('$5 Eco Store Voucher', 'Redeem at any partner eco-friendly store', 500, 'voucher', 'EcoMart', NULL),
  ('Reusable Water Bottle', 'Premium stainless steel water bottle', 800, 'product', 'GreenLife', NULL),
  ('Tree Planting Certificate', 'Plant a tree in your name', 300, 'donation', 'Green Earth Foundation', NULL),
  ('$10 Coffee Shop Credit', 'Use at participating coffee shops', 1000, 'voucher', 'Bean & Green Cafe', NULL),
  ('Bamboo Utensil Set', 'Eco-friendly portable utensil set', 600, 'product', 'Sustainable Living Co', NULL),
  ('Beach Cleanup Day Pass', 'Join our community beach cleanup event', 200, 'activity', 'Ocean Warriors', NULL);