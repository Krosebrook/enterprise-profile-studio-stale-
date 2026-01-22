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
import { Palette, Loader2, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useKnowledgeDocuments, useBulkImportDocuments, generateSlug } from '@/hooks/useKnowledgeBase';
import { flashFusionDocuments } from '@/data/flashFusionDocuments';

export function SeedFlashFusionDocsButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const { data: existingDocs } = useKnowledgeDocuments();
  const bulkImport = useBulkImportDocuments();

  // Filter out documents that already exist
  const existingSlugs = new Set(existingDocs?.map((doc) => doc.slug) || []);
  const newDocuments = flashFusionDocuments.filter(
    (doc) => !existingSlugs.has(generateSlug(doc.title))
  );

  const handleSeed = async () => {
    if (newDocuments.length === 0) return;
    
    setIsSeeding(true);
    try {
      const docsToImport = newDocuments.map((doc) => ({
        ...doc,
        slug: generateSlug(doc.title),
      }));
      await bulkImport.mutateAsync(docsToImport);
      toast.success(`Imported ${docsToImport.length} FlashFusion design documents`);
      setIsOpen(false);
    } catch (error) {
      console.error('Error seeding FlashFusion docs:', error);
      toast.error('Failed to import FlashFusion documents');
    } finally {
      setIsSeeding(false);
    }
  };

  // All documents already imported
  if (newDocuments.length === 0) {
    return (
      <Button variant="outline" size="sm" disabled className="gap-2">
        <CheckCircle className="h-4 w-4 text-success" />
        FlashFusion Imported
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="h-4 w-4" />
          FlashFusion ({newDocuments.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Import FlashFusion Design System</DialogTitle>
          <DialogDescription>
            Import {newDocuments.length} design system documents including color palette, 
            component library, and integration guides.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {newDocuments.map((doc) => (
            <div
              key={doc.title}
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
