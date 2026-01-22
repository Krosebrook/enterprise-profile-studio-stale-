import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Cog, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useKnowledgeDocuments, useBulkImportDocuments } from '@/hooks/useKnowledgeBase';
import { intIncMethodologyDocuments } from '@/data/intIncMethodologyDocuments';

export function SeedMethodologyDocsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const { data: existingDocs } = useKnowledgeDocuments();
  const bulkImport = useBulkImportDocuments();

  // Filter out documents that already exist
  const existingSlugs = new Set(existingDocs?.map((doc) => doc.slug) || []);
  const newDocuments = intIncMethodologyDocuments.filter(
    (doc) => !existingSlugs.has(doc.slug)
  );

  const handleSeed = async () => {
    if (newDocuments.length === 0) return;
    
    setIsSeeding(true);
    try {
      await bulkImport.mutateAsync(newDocuments);
      toast.success(`Imported ${newDocuments.length} methodology documents`);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to seed methodology documents:', error);
      toast.error('Failed to import methodology documents');
    } finally {
      setIsSeeding(false);
    }
  };

  // All documents already imported
  if (newDocuments.length === 0) {
    return (
      <Button variant="outline" size="sm" disabled className="gap-2">
        <CheckCircle className="h-4 w-4 text-success" />
        Methodology Imported
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Cog className="h-4 w-4" />
          Methodology ({newDocuments.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Import INT Inc. Methodology</DialogTitle>
          <DialogDescription>
            Import {newDocuments.length} AI consulting frameworks including the 4-Agent 
            Architecture, R-I-S-E formula, and automation zone definitions.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {newDocuments.map((doc) => (
            <div
              key={doc.slug}
              className="p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
            >
              <h4 className="font-medium text-sm">{doc.title}</h4>
              <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                {doc.description}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                <Badge variant="secondary" className="text-xs">
                  {doc.category}
                </Badge>
                {doc.tags?.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSeed} disabled={isSeeding}>
            {isSeeding && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Import All
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
