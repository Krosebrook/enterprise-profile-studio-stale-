import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { DocumentFavorite } from '@/types/ai-platforms';

export function useDocumentFavorites() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch all favorites for the current user
  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ['document-favorites', user?.id],
    queryFn: async (): Promise<DocumentFavorite[]> => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('document_favorites')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      
      return data.map((fav) => ({
        id: fav.id,
        userId: fav.user_id,
        documentId: fav.document_id,
        createdAt: fav.created_at,
      }));
    },
    enabled: !!user,
  });

  // Check if a specific document is favorited
  const isFavorite = (documentId: string): boolean => {
    return favorites.some((fav) => fav.documentId === documentId);
  };

  // Toggle favorite mutation
  const toggleFavorite = useMutation({
    mutationFn: async (documentId: string) => {
      if (!user) throw new Error('Must be logged in');

      const existing = favorites.find((fav) => fav.documentId === documentId);
      
      if (existing) {
        // Remove favorite
        const { error } = await supabase
          .from('document_favorites')
          .delete()
          .eq('id', existing.id);
        
        if (error) throw error;
        return { action: 'removed' as const, documentId };
      } else {
        // Add favorite
        const { data, error } = await supabase
          .from('document_favorites')
          .insert({
            user_id: user.id,
            document_id: documentId,
          })
          .select()
          .single();
        
        if (error) throw error;
        return { action: 'added' as const, documentId, data };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-favorites'] });
    },
  });

  // Get favorited document IDs
  const favoriteDocumentIds = favorites.map((fav) => fav.documentId);

  return {
    favorites,
    favoriteDocumentIds,
    isLoading,
    isFavorite,
    toggleFavorite,
  };
}
