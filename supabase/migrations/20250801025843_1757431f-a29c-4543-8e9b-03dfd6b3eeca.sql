-- Insert sample keyboard products
INSERT INTO public.products (name, description, category, price, image_url, specifications, features, in_stock, stock_quantity, rating) VALUES
(
  'XTECH Apex Pro',
  'Professional esports mechanical keyboard with ultra-responsive switches',
  'keyboards',
  299.00,
  '/placeholder.svg',
  '{"switch_type": "Hot-swap", "connectivity": "Wireless", "backlight": "RGB", "layout": "Full-size"}',
  ARRAY['Hot-swap', 'RGB', 'Wireless', 'Tournament Ready'],
  true,
  25,
  4.9
),
(
  'XTECH Carbon Elite',
  'Premium carbon fiber construction for ultimate durability',
  'keyboards',
  249.00,
  '/placeholder.svg',
  '{"switch_type": "Linear", "connectivity": "Wired", "backlight": "RGB", "layout": "Full-size"}',
  ARRAY['Carbon Fiber', 'RGB', 'Macro Keys', 'Anti-ghosting'],
  true,
  18,
  4.8
),
(
  'XTECH Stealth',
  'Silent operation without compromising performance',
  'keyboards',
  199.00,
  '/placeholder.svg',
  '{"switch_type": "Silent", "connectivity": "USB-C", "backlight": "RGB", "layout": "Compact"}',
  ARRAY['Silent Switches', 'RGB', 'Compact', 'USB-C'],
  true,
  32,
  4.7
),
(
  'XTECH Thunder',
  'Next-gen keyboard with integrated OLED display',
  'keyboards',
  349.00,
  '/placeholder.svg',
  '{"switch_type": "Hot-swap", "connectivity": "Wireless", "backlight": "RGB", "layout": "Full-size", "special": "OLED Display"}',
  ARRAY['OLED Display', 'Hot-swap', 'RGB', 'Cloud Sync'],
  true,
  12,
  5.0
);