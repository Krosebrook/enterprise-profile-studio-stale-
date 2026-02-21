-- Drop existing overly permissive SELECT policy
DROP POLICY "Authenticated users can view leads" ON public.leads;

-- Create admin-only read policy
CREATE POLICY "Only admins can view leads"
ON public.leads FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Add admin-only update policy
CREATE POLICY "Only admins can update leads"
ON public.leads FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Add admin-only delete policy
CREATE POLICY "Only admins can delete leads"
ON public.leads FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));