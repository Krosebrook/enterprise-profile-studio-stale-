import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Loader2 } from 'lucide-react';
import { useBulkImportDocuments } from '@/hooks/useKnowledgeBase';
import { intIncMethodologyDocuments } from '@/data/intIncMethodologyDocuments';
import { toast } from 'sonner';

export function SeedMethodologyDocsButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const bulkImport = useBulkImportDocuments();

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await bulkImport.mutateAsync(intIncMethodologyDocuments);
      toast.success(`Imported ${intIncMethodologyDocuments.length} methodology documents`);
    } catch (error) {
      console.error('Failed to seed methodology documents:', error);
      toast.error('Failed to import methodology documents');
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
        <FileText className="h-4 w-4" />
      )}
      Methodology Docs
    </Button>
  );
}
