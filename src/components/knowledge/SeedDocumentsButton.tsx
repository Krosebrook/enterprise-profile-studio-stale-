import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { seedDocuments } from '@/data/seedDocuments';
import { seedDocumentsExtended } from '@/data/seedDocumentsExtended';
import { useBulkImportDocuments, useKnowledgeDocuments } from '@/hooks/useKnowledgeBase';
import { Database, Loader2, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export function SeedDocumentsButton() {
  const [open, setOpen] = useState(false);
  const { data: existingDocs } = useKnowledgeDocuments();
  const bulkImport = useBulkImportDocuments();

  // Combine all seed documents from both files
  const allSeedDocuments = [...seedDocuments, ...seedDocumentsExtended];
  
  // Filter out documents that already exist (by slug)
  const existingSlugs = new Set(existingDocs?.map((d) => d.slug) || []);
  const newDocuments = allSeedDocuments.filter((d) => !existingSlugs.has(d.slug));

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
        All Documents Imported
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Database className="h-4 w-4" />
          Import Sample Docs ({newDocuments.length})
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Sample Documentation</DialogTitle>
          <DialogDescription>
            This will import {newDocuments.length} pre-configured documents including:
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Claude Code Standards (6 docs)</li>
              <li>Platform Documentation (5 docs)</li>
              <li>Phase Status Reports (4 docs)</li>
              <li>Deal Sourcing Guides (6 docs)</li>
              <li>Due Diligence Frameworks (7 docs)</li>
              <li>Investment Analysis (6 docs)</li>
              <li>Deal Structures (5 docs)</li>
              <li>Portfolio Management (6 docs)</li>
              <li>Exit Strategies (5 docs)</li>
              <li>LP Relations & Fundraising (5 docs)</li>
              <li>Compliance & Legal (5 docs)</li>
              <li>Platform User Guides (10 docs)</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleImport} disabled={bulkImport.isPending}>
            {bulkImport.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Database className="h-4 w-4 mr-2" />
                Import All
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
