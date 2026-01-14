import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export interface KnowledgeDocument {
  id: string;
  user_id: string;
  title: string;
  slug: string;
  content: string;
  description: string | null;
  category: string;
  tags: string[];
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateDocumentData {
  title: string;
  slug: string;
  content: string;
  description?: string;
  category?: string;
  tags?: string[];
  is_public?: boolean;
}

export interface UpdateDocumentData extends Partial<CreateDocumentData> {
  id: string;
}

// Generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Fetch all documents for the current user
export function useKnowledgeDocuments() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['knowledge-documents', user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('knowledge_base_documents')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data as KnowledgeDocument[];
    },
    enabled: !!user,
  });
}

// Fetch a single document by slug
export function useKnowledgeDocument(slug: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['knowledge-document', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('knowledge_base_documents')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (error) throw error;
      return data as KnowledgeDocument | null;
    },
    enabled: !!user && !!slug,
  });
}

// Fetch documents by category
export function useDocumentsByCategory(category: string | undefined) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['knowledge-documents', 'category', category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('knowledge_base_documents')
        .select('*')
        .eq('category', category)
        .order('title', { ascending: true });

      if (error) throw error;
      return data as KnowledgeDocument[];
    },
    enabled: !!user && !!category,
  });
}

// Search documents
export function useSearchDocuments(searchTerm: string) {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['knowledge-documents', 'search', searchTerm],
    queryFn: async () => {
      if (!searchTerm.trim()) return [];
      
      const { data, error } = await supabase
        .from('knowledge_base_documents')
        .select('*')
        .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data as KnowledgeDocument[];
    },
    enabled: !!user && searchTerm.length > 2,
  });
}

// Create a new document
export function useCreateDocument() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: CreateDocumentData) => {
      if (!user) throw new Error('User not authenticated');

      const { data: newDoc, error } = await supabase
        .from('knowledge_base_documents')
        .insert({
          ...data,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return newDoc as KnowledgeDocument;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-documents'] });
      toast({
        title: 'Document created',
        description: 'Your document has been saved to the knowledge base.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create document',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Update an existing document
export function useUpdateDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateDocumentData) => {
      const { data: updated, error } = await supabase
        .from('knowledge_base_documents')
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return updated as KnowledgeDocument;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-documents'] });
      queryClient.invalidateQueries({ queryKey: ['knowledge-document', data.slug] });
      toast({
        title: 'Document updated',
        description: 'Your changes have been saved.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update document',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Delete a document
export function useDeleteDocument() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('knowledge_base_documents')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-documents'] });
      toast({
        title: 'Document deleted',
        description: 'The document has been removed from the knowledge base.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to delete document',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

// Get unique categories
export function useDocumentCategories() {
  const { data: documents } = useKnowledgeDocuments();

  const categories = documents
    ? [...new Set(documents.map((doc) => doc.category))].sort()
    : [];

  return categories;
}

// Bulk import documents
export function useBulkImportDocuments() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (documents: CreateDocumentData[]) => {
      if (!user) throw new Error('User not authenticated');

      const docsWithUser = documents.map((doc) => ({
        ...doc,
        user_id: user.id,
      }));

      const { data, error } = await supabase
        .from('knowledge_base_documents')
        .insert(docsWithUser)
        .select();

      if (error) throw error;
      return data as KnowledgeDocument[];
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-documents'] });
      toast({
        title: 'Documents imported',
        description: `Successfully imported ${data.length} documents.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to import documents',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
