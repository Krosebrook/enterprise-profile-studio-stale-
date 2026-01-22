import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Palette, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBulkImportDocuments } from '@/hooks/useKnowledgeBase';
import { getFlashFusionDocsWithSlugs } from '@/data/flashFusionDocuments';

export function SeedFlashFusionDocsButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();
  const bulkImport = useBulkImportDocuments();

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      const docsToImport = getFlashFusionDocsWithSlugs();
      await bulkImport.mutateAsync(docsToImport);

      toast({
        title: 'FlashFusion Docs Imported',
        description: `Successfully imported ${docsToImport.length} design system documents.`,
      });
    } catch (error) {
      console.error('Error seeding FlashFusion docs:', error);
      toast({
        title: 'Import Failed',
        description: 'Failed to import FlashFusion documents. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSeed}
      disabled={isSeeding}
      className="gap-2"
    >
      {isSeeding ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Palette className="h-4 w-4" />
      )}
      {isSeeding ? 'Importing...' : 'FlashFusion Docs'}
    </Button>
  );
}
