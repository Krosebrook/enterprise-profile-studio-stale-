import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { DocumentVersion } from '@/types/ai-platforms';
import { KnowledgeDocument } from '@/hooks/useKnowledgeBase';

export function useDocumentVersions(documentId: string | undefined) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch version history for a document
  const { data: versions = [], isLoading } = useQuery({
    queryKey: ['document-versions', documentId],
    queryFn: async (): Promise<DocumentVersion[]> => {
      if (!documentId || !user) return [];
      
      const { data, error } = await supabase
        .from('document_versions')
        .select('*')
        .eq('document_id', documentId)
        .eq('user_id', user.id)
        .order('version_number', { ascending: false });

      if (error) throw error;
      
      return data.map((version) => ({
        id: version.id,
        documentId: version.document_id,
        userId: version.user_id,
        versionNumber: version.version_number,
        title: version.title,
        content: version.content,
        description: version.description || undefined,
        category: version.category || undefined,
        tags: version.tags || [],
        changeSummary: version.change_summary || undefined,
        createdAt: version.created_at,
      }));
    },
    enabled: !!documentId && !!user,
  });

  // Get the latest version number
  const latestVersionNumber = versions.length > 0 ? versions[0].versionNumber : 0;

  // Create a new version (called before updating a document)
  const createVersion = useMutation({
    mutationFn: async ({ 
      document, 
      changeSummary 
    }: { 
      document: KnowledgeDocument; 
      changeSummary?: string;
    }) => {
      if (!user) throw new Error('Must be logged in');
      
      const newVersionNumber = latestVersionNumber + 1;
      
      const { data, error } = await supabase
        .from('document_versions')
        .insert({
          document_id: document.id,
          user_id: user.id,
          version_number: newVersionNumber,
          title: document.title,
          content: document.content,
          description: document.description,
          category: document.category,
          tags: document.tags,
          change_summary: changeSummary,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['document-versions', documentId] });
    },
  });

  // Restore a previous version
  const restoreVersion = useMutation({
    mutationFn: async (versionId: string) => {
      if (!user || !documentId) throw new Error('Must be logged in and have document ID');
      
      // Find the version to restore
      const versionToRestore = versions.find((v) => v.id === versionId);
      if (!versionToRestore) throw new Error('Version not found');

      // Update the document with the version's content
      const { data, error } = await supabase
        .from('knowledge_base_documents')
        .update({
          title: versionToRestore.title,
          content: versionToRestore.content,
          description: versionToRestore.description,
          category: versionToRestore.category,
          tags: versionToRestore.tags,
        })
        .eq('id', documentId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledge-documents'] });
      queryClient.invalidateQueries({ queryKey: ['knowledge-document'] });
    },
  });

  // Compare two versions (returns diff data)
  const compareVersions = (version1Id: string, version2Id: string) => {
    const v1 = versions.find((v) => v.id === version1Id);
    const v2 = versions.find((v) => v.id === version2Id);

    if (!v1 || !v2) return null;

    return {
      version1: v1,
      version2: v2,
      titleChanged: v1.title !== v2.title,
      contentChanged: v1.content !== v2.content,
      descriptionChanged: v1.description !== v2.description,
      categoryChanged: v1.category !== v2.category,
      tagsChanged: JSON.stringify(v1.tags) !== JSON.stringify(v2.tags),
    };
  };

  return {
    versions,
    isLoading,
    latestVersionNumber,
    createVersion,
    restoreVersion,
    compareVersions,
  };
}
