import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { intIncStrategyDocuments } from '@/data/intIncStrategyDocuments';
import { useBulkImportDocuments, useKnowledgeDocuments } from '@/hooks/useKnowledgeBase';
import { Briefcase, Loader2, Check, Building2 } from 'lucide-react';
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

export function SeedStrategyDocsButton() {
  const [open, setOpen] = useState(false);
  const { data: existingDocs } = useKnowledgeDocuments();
  const bulkImport = useBulkImportDocuments();

  // Filter out documents that already exist (by slug)
  const existingSlugs = new Set(existingDocs?.map((d) => d.slug) || []);
  const newDocuments = intIncStrategyDocuments.filter((d) => !existingSlugs.has(d.slug));

  const handleImport = async () => {
    if (newDocuments.length > 0) {
      await bulkImport.mutateAsync(newDocuments);
    }
    setOpen(false);
  };

  if (newDocuments.length === 0) {
    return (
      <Button variant="outline" disabled className="gap-2">
        <Check className="h-4 w-4 text-green-500" />
        Strategy Docs Imported
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-primary/30 hover:border-primary/60 hover:bg-primary/5">
          <Building2 className="h-4 w-4 text-primary" />
          INT Inc. Strategy ({newDocuments.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Import INT Inc. AI Strategy Documents
          </DialogTitle>
          <DialogDescription asChild>
            <div className="space-y-3 pt-2">
              <p>
                Import {newDocuments.length} comprehensive AI strategy documents including:
              </p>
              <div className="grid gap-2">
                {newDocuments.map((doc) => (
                  <div 
                    key={doc.slug} 
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border/50"
                  >
                    <Briefcase className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{doc.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {doc.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {doc.category}
                        </Badge>
                        {doc.tags?.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-[10px] px-1.5 py-0">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={bulkImport.isPending}
            className="gap-2 primary-gradient border-0"
          >
            {bulkImport.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Building2 className="h-4 w-4" />
                Import All
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
