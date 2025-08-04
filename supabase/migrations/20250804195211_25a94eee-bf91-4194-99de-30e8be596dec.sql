-- Add missing columns to existing products table
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS brand TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS model TEXT;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sku TEXT UNIQUE;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS weight DECIMAL(8,2);
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS dimensions JSONB;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS tags TEXT[];
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS short_description TEXT;

-- Add missing columns to existing profiles table  
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;

-- Create wishlists table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.wishlists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS on wishlists
ALTER TABLE public.wishlists ENABLE ROW LEVEL SECURITY;

-- Create wishlist policies if they don't exist
DO $$ BEGIN
  CREATE POLICY "Users can manage their own wishlist" 
  ON public.wishlists 
  FOR ALL 
  USING (auth.uid() = user_id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand);
CREATE INDEX IF NOT EXISTS idx_products_rating ON public.products(rating DESC);
CREATE INDEX IF NOT EXISTS idx_products_price ON public.products(price);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON public.wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON public.orders(user_id);

-- Update existing products with sample data
UPDATE public.products SET 
  brand = 'Strafion',
  is_featured = true,
  is_active = true,
  short_description = 'Premium gaming peripheral',
  specifications = COALESCE(specifications, '{}')
WHERE brand IS NULL;