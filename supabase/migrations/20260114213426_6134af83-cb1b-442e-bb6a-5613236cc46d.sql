-- Create knowledge base documents table
CREATE TABLE public.knowledge_base_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT NOT NULL,
  description TEXT,
  category TEXT DEFAULT 'General',
  tags TEXT[] DEFAULT '{}',
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique constraint on slug per user
CREATE UNIQUE INDEX idx_knowledge_docs_user_slug ON public.knowledge_base_documents(user_id, slug);

-- Create index for category filtering
CREATE INDEX idx_knowledge_docs_category ON public.knowledge_base_documents(category);

-- Create GIN index for tags searching
CREATE INDEX idx_knowledge_docs_tags ON public.knowledge_base_documents USING GIN(tags);

-- Create full-text search index
CREATE INDEX idx_knowledge_docs_search ON public.knowledge_base_documents USING GIN(to_tsvector('english', title || ' ' || content));

-- Enable Row Level Security
ALTER TABLE public.knowledge_base_documents ENABLE ROW LEVEL SECURITY;

-- Users can view their own documents
CREATE POLICY "Users can view their own documents" 
ON public.knowledge_base_documents 
FOR SELECT 
USING (auth.uid() = user_id);

-- Users can view public documents
CREATE POLICY "Users can view public documents" 
ON public.knowledge_base_documents 
FOR SELECT 
USING (is_public = true);

-- Users can create their own documents
CREATE POLICY "Users can create their own documents" 
ON public.knowledge_base_documents 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Users can update their own documents
CREATE POLICY "Users can update their own documents" 
ON public.knowledge_base_documents 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Users can delete their own documents
CREATE POLICY "Users can delete their own documents" 
ON public.knowledge_base_documents 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_knowledge_docs_updated_at
BEFORE UPDATE ON public.knowledge_base_documents
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();