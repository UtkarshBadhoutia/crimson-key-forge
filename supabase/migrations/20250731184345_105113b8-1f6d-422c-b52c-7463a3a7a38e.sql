-- Fix security warnings by setting search_path for functions
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_product_rating()
RETURNS TRIGGER 
SECURITY DEFINER 
SET search_path = ''
AS $$
BEGIN
  UPDATE public.products 
  SET 
    rating = (
      SELECT COALESCE(AVG(rating), 0) 
      FROM public.reviews 
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
    ),
    review_count = (
      SELECT COUNT(*) 
      FROM public.reviews 
      WHERE product_id = COALESCE(NEW.product_id, OLD.product_id)
    )
  WHERE id = COALESCE(NEW.product_id, OLD.product_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;