
-- 1) Replace orders/order_items public INSERT with a SECURITY DEFINER RPC
DROP POLICY IF EXISTS "Anyone can create orders" ON public.orders;
DROP POLICY IF EXISTS "Anyone can create order items" ON public.order_items;

CREATE OR REPLACE FUNCTION public.create_order(
  _customer_name text,
  _customer_phone text,
  _customer_address text,
  _comment text,
  _items jsonb
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_order_id uuid;
  computed_total numeric := 0;
  item jsonb;
BEGIN
  IF _customer_name IS NULL OR length(trim(_customer_name)) < 2 OR length(_customer_name) > 100 THEN
    RAISE EXCEPTION 'Invalid customer name';
  END IF;
  IF _customer_phone IS NULL OR length(trim(_customer_phone)) < 5 OR length(_customer_phone) > 30 THEN
    RAISE EXCEPTION 'Invalid customer phone';
  END IF;
  IF _customer_address IS NULL OR length(trim(_customer_address)) < 3 OR length(_customer_address) > 500 THEN
    RAISE EXCEPTION 'Invalid customer address';
  END IF;
  IF _items IS NULL OR jsonb_typeof(_items) <> 'array'
     OR jsonb_array_length(_items) = 0 OR jsonb_array_length(_items) > 50 THEN
    RAISE EXCEPTION 'Invalid items';
  END IF;

  FOR item IN SELECT * FROM jsonb_array_elements(_items) LOOP
    IF (item->>'price')::numeric < 0 OR (item->>'quantity')::int <= 0 OR (item->>'quantity')::int > 1000 THEN
      RAISE EXCEPTION 'Invalid item values';
    END IF;
    computed_total := computed_total + (item->>'price')::numeric * (item->>'quantity')::int;
  END LOOP;

  INSERT INTO public.orders (customer_name, customer_phone, customer_address, comment, total)
  VALUES (trim(_customer_name), trim(_customer_phone), trim(_customer_address), COALESCE(_comment,''), computed_total)
  RETURNING id INTO new_order_id;

  INSERT INTO public.order_items (order_id, product_name, product_image, price, quantity)
  SELECT new_order_id,
         left(coalesce(x->>'product_name',''), 200),
         x->>'product_image',
         (x->>'price')::numeric,
         (x->>'quantity')::int
  FROM jsonb_array_elements(_items) x;

  RETURN new_order_id;
END;
$$;

REVOKE ALL ON FUNCTION public.create_order(text,text,text,text,jsonb) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.create_order(text,text,text,text,jsonb) TO anon, authenticated;

-- 2) Storage: restrict product bucket writes to admins, drop public listing
DROP POLICY IF EXISTS "Authenticated users can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete product images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view product images" ON storage.objects;

CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'products' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'products' AND public.has_role(auth.uid(), 'admin'))
WITH CHECK (bucket_id = 'products' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'products' AND public.has_role(auth.uid(), 'admin'));
-- Note: bucket remains public, individual files still served via /object/public/ URLs.
-- Removing the SELECT policy prevents listing all files via the API.

-- 3) user_roles: admins-only read
DROP POLICY IF EXISTS "Admins can view roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- 4) Lock down internal SECURITY DEFINER functions
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.handle_new_user_role() FROM PUBLIC, anon, authenticated;
-- has_role stays callable by authenticated because RLS policies invoke it.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
