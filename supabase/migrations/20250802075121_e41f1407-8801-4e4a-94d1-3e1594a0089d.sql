-- Update brand name from XTECH to Strafion in all products
UPDATE public.products 
SET name = REPLACE(name, 'XTECH', 'Strafion');

-- Convert prices from USD to INR (assuming 1 USD = 83 INR as rough conversion)
UPDATE public.products 
SET price = price * 83;