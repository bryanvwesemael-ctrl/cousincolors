/*
# Create leads table for quote requests and contact form submissions

1. New Tables
- `leads`
  - `id` (uuid, primary key)
  - `type` (text: 'quote' or 'contact')
  - `service_type` (text, nullable — which service the lead is about)
  - `property_type` (text, nullable — house/apartment/other)
  - `municipality` (text, nullable — location of the project)
  - `postal_code` (text, nullable)
  - `start_time` (text, nullable — when the customer wants to start)
  - `project_description` (text, nullable — free text about the project)
  - `photo_names` (text[], nullable — names of uploaded photos)
  - `first_name` (text, nullable)
  - `last_name` (text, nullable)
  - `phone` (text, nullable)
  - `email` (text, nullable)
  - `status` (text, default 'new' — lead status for tracking)
  - `created_at` (timestamptz, default now())

2. Security
- Enable RLS on `leads`.
- Allow anon + authenticated INSERT only (public can submit forms).
- No SELECT/UPDATE/DELETE for anon (only the business owner should see leads,
  which would require an authenticated admin role in the future).

3. Notes
- This is a single-tenant lead-generation site with no sign-in.
- The anon-key frontend submits quote/contact forms.
- Only INSERT is allowed publicly; reads are restricted to authenticated users
  (the business owner) to protect customer data.
*/

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'quote',
  service_type text,
  property_type text,
  municipality text,
  postal_code text,
  start_time text,
  project_description text,
  photo_names text[],
  first_name text,
  last_name text,
  phone text,
  email text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
CREATE POLICY "anon_insert_leads" ON leads FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_read_leads" ON leads;
CREATE POLICY "authenticated_read_leads" ON leads FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_update_leads" ON leads;
CREATE POLICY "authenticated_update_leads" ON leads FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_leads" ON leads;
CREATE POLICY "authenticated_delete_leads" ON leads FOR DELETE
  TO authenticated USING (true);
