import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  useDocumentExtraction,
  type ExtractionType,
  type PersonaExtractionData,
  type ProfileExtractionData,
} from '@/hooks/useDocumentExtraction';
import { mergeExtractions } from '@/lib/merge-extraction';
import {
  Upload, FileText, Loader2, Sparkles, Check, X,
  AlertTriangle, ChevronRight, Files, Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BatchDocumentImportDialogProps {
  extractionType: ExtractionType;
  onDataExtracted: (data: PersonaExtractionData | ProfileExtractionData) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
}

interface QueuedFile {
  id: string;
  name: string;
  content: string;
  status: 'pending' | 'extracting' | 'done' | 'error';
  result?: PersonaExtractionData | ProfileExtractionData;
  error?: string;
}

export function BatchDocumentImportDialog({
  extractionType,
  onDataExtracted,
  trigger,
  title,
  description,
}: BatchDocumentImportDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'select' | 'processing' | 'preview'>('select');
  const [files, setFiles] = useState<QueuedFile[]>([]);
  const [mergedData, setMergedData] = useState<PersonaExtractionData | ProfileExtractionData | null>(null);
  const [processingIndex, setProcessingIndex] = useState(-1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { extractFromText, reset } = useDocumentExtraction();

  const handleFilesSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const newFiles: QueuedFile[] = [];
    for (const file of Array.from(selectedFiles)) {
      try {
        const text = await file.text();
        newFiles.push({
          id: crypto.randomUUID(),
          name: file.name,
          content: text,
          status: 'pending',
        });
      } catch {
        console.error('Failed to read:', file.name);
      }
    }
    setFiles(prev => [...prev, ...newFiles]);
    // Reset input so same files can be re-selected
    event.target.value = '';
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleBatchExtract = async () => {
    if (files.length === 0) return;
    setStep('processing');

    const results: (PersonaExtractionData | ProfileExtractionData)[] = [];
    const updatedFiles = [...files];

    for (let i = 0; i < updatedFiles.length; i++) {
      setProcessingIndex(i);
      updatedFiles[i].status = 'extracting';
      setFiles([...updatedFiles]);

      try {
        const result = await extractFromText(updatedFiles[i].content, extractionType);
        if (result) {
          updatedFiles[i].status = 'done';
          updatedFiles[i].result = result;
          results.push(result);
        } else {
          updatedFiles[i].status = 'error';
          updatedFiles[i].error = 'Extraction returned no data';
        }
      } catch (err) {
        updatedFiles[i].status = 'error';
        updatedFiles[i].error = 'Extraction failed';
      }
      setFiles([...updatedFiles]);
    }

    setProcessingIndex(-1);

    if (results.length > 0) {
      const merged = mergeExtractions(results, extractionType);
      setMergedData(merged);
      setStep('preview');
      toast.success(`Merged data from ${results.length} document${results.length > 1 ? 's' : ''}`);
    } else {
      toast.error('No data could be extracted from any document');
      setStep('select');
    }
  };

  const handleApply = () => {
    if (mergedData) {
      onDataExtracted(mergedData);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setStep('select');
    setFiles([]);
    setMergedData(null);
    setProcessingIndex(-1);
    reset();
  };

  const doneCount = files.filter(f => f.status === 'done').length;
  const errorCount = files.filter(f => f.status === 'error').length;
  const confidence = mergedData?.extraction_confidence?.overall || 0;

  const defaultTitle = extractionType === 'persona'
    ? 'Batch Import — Persona'
    : 'Batch Import — Profile';
  const defaultDescription = extractionType === 'persona'
    ? 'Upload multiple documents (resumes, JDs, notes) and merge extracted data into a single persona.'
    : 'Upload multiple company documents and merge extracted data into a single profile.';

  return (
    <Dialog open={open} onOpenChange={isOpen => (isOpen ? setOpen(true) : handleClose())}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <Files className="h-4 w-4" />
            Batch Import
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Files className="h-5 w-5 text-primary" />
            {title || defaultTitle}
          </DialogTitle>
          <DialogDescription>{description || defaultDescription}</DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'select' && (
            <motion.div key="select" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
              {/* Drop zone */}
              <div
                className={cn(
                  'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
                  files.length > 0 ? 'border-primary/40' : 'border-border hover:border-primary/50',
                )}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click to add files</p>
                <p className="text-xs text-muted-foreground mt-1">TXT, MD, JSON, YAML, CSV — select multiple</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".txt,.md,.json,.yaml,.yml,.csv"
                  onChange={handleFilesSelect}
                  className="hidden"
                />
              </div>

              {/* File list */}
              {files.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{files.length} file{files.length > 1 ? 's' : ''} queued</span>
                    <Button variant="ghost" size="sm" onClick={() => setFiles([])} className="text-xs text-destructive">
                      Clear all
                    </Button>
                  </div>
                  <ScrollArea className="max-h-[200px]">
                    <div className="space-y-1">
                      {files.map(f => (
                        <div key={f.id} className="flex items-center gap-2 p-2 rounded-md bg-muted/50">
                          <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="text-sm truncate flex-1">{f.name}</span>
                          <span className="text-xs text-muted-foreground">{(f.content.length / 1024).toFixed(1)}KB</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeFile(f.id)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}

              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Each document is analyzed independently, then results are intelligently merged. Data from later documents fills gaps left by earlier ones.
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleBatchExtract} disabled={files.length === 0} className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Analyze {files.length} Document{files.length !== 1 ? 's' : ''}
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 py-4">
              <div className="text-center mb-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
                  <motion.div
                    className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="h-7 w-7 text-primary-foreground" />
                  </motion.div>
                </div>
                <h3 className="mt-4 text-lg font-semibold">Processing Documents</h3>
                <p className="text-sm text-muted-foreground">
                  {processingIndex + 1} of {files.length} — Extracting data...
                </p>
                <Progress value={((processingIndex + 1) / files.length) * 100} className="h-2 mt-3 max-w-xs mx-auto" />
              </div>

              <ScrollArea className="max-h-[250px]">
                <div className="space-y-1">
                  {files.map((f, i) => (
                    <div key={f.id} className="flex items-center gap-2 p-2 rounded-md">
                      {f.status === 'extracting' && <Loader2 className="h-4 w-4 animate-spin text-primary shrink-0" />}
                      {f.status === 'done' && <Check className="h-4 w-4 text-emerald-500 shrink-0" />}
                      {f.status === 'error' && <X className="h-4 w-4 text-destructive shrink-0" />}
                      {f.status === 'pending' && <div className="h-4 w-4 rounded-full border-2 border-border shrink-0" />}
                      <span className={cn('text-sm truncate flex-1', f.status === 'extracting' && 'font-medium')}>
                        {f.name}
                      </span>
                      {f.status === 'done' && f.result && (
                        <Badge variant="secondary" className="text-xs">
                          {f.result.extraction_confidence?.overall || 0}%
                        </Badge>
                      )}
                      {f.status === 'error' && (
                        <span className="text-xs text-destructive">Failed</span>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}

          {step === 'preview' && mergedData && (
            <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4 flex-1 overflow-hidden flex flex-col">
              {/* Summary bar */}
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="outline" className="gap-1">
                  <Check className="h-3 w-3" /> {doneCount} extracted
                </Badge>
                {errorCount > 0 && (
                  <Badge variant="destructive" className="gap-1">
                    <X className="h-3 w-3" /> {errorCount} failed
                  </Badge>
                )}
                <Badge variant="secondary">Merged result</Badge>
              </div>

              {/* Confidence */}
              <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">Merged Confidence</span>
                    <span className={cn(
                      'text-sm font-bold',
                      confidence >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                      confidence >= 40 ? 'text-amber-600 dark:text-amber-400' : 'text-destructive',
                    )}>
                      {confidence}%
                    </span>
                  </div>
                  <Progress value={confidence} className="h-2" />
                </div>
              </div>

              {/* Merged data preview — reuse field display */}
              <ScrollArea className="flex-1 max-h-[350px]">
                <div className="space-y-3 pr-4">
                  {extractionType === 'persona' ? (
                    <MergedPersonaPreview data={mergedData as PersonaExtractionData} />
                  ) : (
                    <MergedProfilePreview data={mergedData as ProfileExtractionData} />
                  )}
                </div>
              </ScrollArea>

              <div className="flex justify-between gap-2 pt-2 border-t">
                <Button variant="outline" onClick={() => { setStep('select'); setMergedData(null); }}>
                  Back
                </Button>
                <Button onClick={handleApply} className="gap-2">
                  <Check className="h-4 w-4" />
                  Apply Merged Data
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

/* ── Compact preview helpers ── */

function FieldRow({ label, value, isArray }: { label: string; value: any; isArray?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-sm text-muted-foreground w-32 shrink-0">{label}:</span>
      {value ? (
        isArray && Array.isArray(value) ? (
          <div className="flex flex-wrap gap-1">
            {value.map((v: string, i: number) => (
              <Badge key={i} variant="secondary" className="text-xs">{v}</Badge>
            ))}
          </div>
        ) : (
          <span className="text-sm">{String(value)}</span>
        )
      ) : (
        <span className="text-sm text-muted-foreground italic">Not found</span>
      )}
    </div>
  );
}

function MergedPersonaPreview({ data }: { data: PersonaExtractionData }) {
  return (
    <>
      <Section title="Basic Info">
        <FieldRow label="Name" value={data.name} />
        <FieldRow label="Email" value={data.email} />
        <FieldRow label="Job Title" value={data.job_title} />
        <FieldRow label="Department" value={data.department} />
      </Section>
      <Section title="Skills & Expertise">
        <FieldRow label="Skills" value={data.skills?.length ? data.skills : null} isArray />
        <FieldRow label="Expertise" value={data.expertise_areas?.length ? data.expertise_areas : null} isArray />
        <FieldRow label="Tools" value={data.tools_used?.length ? data.tools_used : null} isArray />
      </Section>
      <Section title="Goals & Challenges">
        <FieldRow label="Goals" value={data.goals?.length ? data.goals : null} isArray />
        <FieldRow label="Pain Points" value={data.pain_points?.length ? data.pain_points : null} isArray />
      </Section>
      <Section title="Preferences">
        <FieldRow label="Formality" value={data.communication_style?.formality} />
        <FieldRow label="Detail Level" value={data.communication_style?.detail_level} />
        <FieldRow label="AI Style" value={data.ai_interaction_style} />
        <FieldRow label="Tone" value={data.preferred_tone} />
      </Section>
    </>
  );
}

function MergedProfilePreview({ data }: { data: ProfileExtractionData }) {
  return (
    <>
      <Section title="Company Info">
        <FieldRow label="Name" value={data.company_info?.name} />
        <FieldRow label="Tagline" value={data.company_info?.tagline} />
        <FieldRow label="Industry" value={data.company_info?.industry} />
        <FieldRow label="Size" value={data.company_info?.size} />
        <FieldRow label="Website" value={data.company_info?.website} />
      </Section>
      <Section title="Services">
        {data.services?.length ? data.services.map((s, i) => (
          <FieldRow key={i} label={s.title} value={s.description} />
        )) : <FieldRow label="Services" value={null} />}
      </Section>
      <Section title="Team">
        {data.team_members?.length ? data.team_members.map((m, i) => (
          <FieldRow key={i} label={m.name} value={m.role} />
        )) : <FieldRow label="Team Members" value={null} />}
      </Section>
      <Section title="Compliance">
        <FieldRow label="Certifications" value={data.compliance?.certifications?.length ? data.compliance.certifications : null} isArray />
        <FieldRow label="Regulations" value={data.compliance?.regulations?.length ? data.compliance.regulations : null} isArray />
      </Section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold mb-2">{title}</h4>
      <div className="space-y-2">{children}</div>
      <Separator className="mt-3" />
    </div>
  );
}
