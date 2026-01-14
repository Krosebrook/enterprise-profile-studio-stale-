import { useState, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useBulkImportDocuments, generateSlug, CreateDocumentData } from '@/hooks/useKnowledgeBase';
import { Upload, FileText, Check, X, Loader2 } from 'lucide-react';

interface ParsedFile {
  name: string;
  title: string;
  content: string;
  slug: string;
  category: string;
  selected: boolean;
}

export function ImportDocumentsDialog() {
  const [open, setOpen] = useState(false);
  const [parsedFiles, setParsedFiles] = useState<ParsedFile[]>([]);
  const [category, setCategory] = useState('Imported');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const bulkImport = useBulkImportDocuments();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const parsed: ParsedFile[] = [];

    for (const file of Array.from(files)) {
      if (file.name.endsWith('.md') || file.name.endsWith('.txt')) {
        const content = await file.text();
        const title = extractTitle(content, file.name);
        
        parsed.push({
          name: file.name,
          title,
          content,
          slug: generateSlug(title),
          category,
          selected: true,
        });
      }
    }

    setParsedFiles(parsed);
  };

  const extractTitle = (content: string, filename: string): string => {
    // Try to extract title from first H1
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) return h1Match[1];

    // Fall back to filename
    return filename.replace(/\.(md|txt)$/, '').replace(/[_-]/g, ' ');
  };

  const toggleFile = (index: number) => {
    setParsedFiles((files) =>
      files.map((f, i) => (i === index ? { ...f, selected: !f.selected } : f))
    );
  };

  const handleImport = async () => {
    const selectedFiles = parsedFiles.filter((f) => f.selected);
    
    const documents: CreateDocumentData[] = selectedFiles.map((f) => ({
      title: f.title,
      slug: f.slug,
      content: f.content,
      category: category,
      tags: ['imported'],
      is_public: false,
    }));

    await bulkImport.mutateAsync(documents);
    setOpen(false);
    setParsedFiles([]);
  };

  const selectedCount = parsedFiles.filter((f) => f.selected).length;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          Import Documents
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Import Markdown Documents</DialogTitle>
          <DialogDescription>
            Upload .md or .txt files to add them to your knowledge base.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="category">Category for imported documents</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Documentation, Guides"
            />
          </div>

          <div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              Click to select files or drag and drop
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports .md and .txt files
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".md,.txt"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {parsedFiles.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Files to import</Label>
                <Badge variant="secondary">{selectedCount} selected</Badge>
              </div>
              <ScrollArea className="h-[200px] border rounded-lg p-2">
                <div className="space-y-2">
                  {parsedFiles.map((file, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-2 rounded-md cursor-pointer transition-colors ${
                        file.selected ? 'bg-primary/10' : 'bg-muted/50'
                      }`}
                      onClick={() => toggleFile(index)}
                    >
                      <div
                        className={`h-5 w-5 rounded border flex items-center justify-center ${
                          file.selected
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-border'
                        }`}
                      >
                        {file.selected && <Check className="h-3 w-3" />}
                      </div>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{file.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {file.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={selectedCount === 0 || bulkImport.isPending}
          >
            {bulkImport.isPending ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Import {selectedCount} {selectedCount === 1 ? 'Document' : 'Documents'}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
