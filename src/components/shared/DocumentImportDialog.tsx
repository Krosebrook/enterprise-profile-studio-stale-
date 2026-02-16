import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  useDocumentExtraction, 
  type ExtractionType,
  type PersonaExtractionData,
  type ProfileExtractionData 
} from '@/hooks/useDocumentExtraction';
import { 
  Upload, 
  FileText, 
  Loader2, 
  Sparkles, 
  Check, 
  X,
  AlertTriangle,
  FileUp,
  Clipboard,
  Eye,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { extractTextFromFile, ACCEPT_STRING } from '@/lib/document-parser';

interface DocumentImportDialogProps {
  extractionType: ExtractionType;
  onDataExtracted: (data: PersonaExtractionData | ProfileExtractionData) => void;
  trigger?: React.ReactNode;
  title?: string;
  description?: string;
}

export function DocumentImportDialog({
  extractionType,
  onDataExtracted,
  trigger,
  title,
  description,
}: DocumentImportDialogProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<'upload' | 'extracting' | 'preview'>('upload');
  const [documentContent, setDocumentContent] = useState('');
  const [fileName, setFileName] = useState('');
  const [inputMethod, setInputMethod] = useState<'file' | 'paste'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { extractFromText, isExtracting, extractedData, reset } = useDocumentExtraction();

  const [isParsingFile, setIsParsingFile] = useState(false);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsParsingFile(true);
    try {
      const text = await extractTextFromFile(file);
      setDocumentContent(text);
      setFileName(file.name);
    } catch (err) {
      console.error('Failed to read file:', err);
      toast.error(err instanceof Error ? err.message : 'Failed to parse file');
    } finally {
      setIsParsingFile(false);
    }
  };

  const handleExtract = async () => {
    if (!documentContent.trim()) return;

    setStep('extracting');
    const result = await extractFromText(documentContent, extractionType);
    
    if (result) {
      setStep('preview');
    } else {
      setStep('upload');
    }
  };

  const handleApply = () => {
    if (extractedData) {
      onDataExtracted(extractedData);
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setStep('upload');
    setDocumentContent('');
    setFileName('');
    reset();
  };

  const defaultTitle = extractionType === 'persona' 
    ? 'Import from Document' 
    : 'Import Company Data';
  
  const defaultDescription = extractionType === 'persona'
    ? 'Upload a resume, LinkedIn profile, or job description to auto-fill persona fields.'
    : 'Upload company documents, pitch decks, or about pages to auto-fill profile fields.';

  return (
    <Dialog open={open} onOpenChange={(isOpen) => isOpen ? setOpen(true) : handleClose()}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="gap-2">
            <FileUp className="h-4 w-4" />
            Import from Doc
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {title || defaultTitle}
          </DialogTitle>
          <DialogDescription>{description || defaultDescription}</DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <UploadStep
              inputMethod={inputMethod}
              setInputMethod={setInputMethod}
              documentContent={documentContent}
              setDocumentContent={setDocumentContent}
              fileName={fileName}
              fileInputRef={fileInputRef}
              onFileSelect={handleFileSelect}
              onExtract={handleExtract}
              isExtracting={isExtracting}
            />
          )}

          {step === 'extracting' && (
            <ExtractingStep extractionType={extractionType} />
          )}

          {step === 'preview' && extractedData && (
            <PreviewStep
              extractionType={extractionType}
              data={extractedData}
              onApply={handleApply}
              onBack={() => setStep('upload')}
            />
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}

// Upload Step Component
interface UploadStepProps {
  inputMethod: 'file' | 'paste';
  setInputMethod: (method: 'file' | 'paste') => void;
  documentContent: string;
  setDocumentContent: (content: string) => void;
  fileName: string;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExtract: () => void;
  isExtracting: boolean;
}

function UploadStep({
  inputMethod,
  setInputMethod,
  documentContent,
  setDocumentContent,
  fileName,
  fileInputRef,
  onFileSelect,
  onExtract,
  isExtracting,
}: UploadStepProps) {
  return (
    <motion.div
      key="upload"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4"
    >
      <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as 'file' | 'paste')}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file" className="gap-2">
            <FileUp className="h-4 w-4" />
            Upload File
          </TabsTrigger>
          <TabsTrigger value="paste" className="gap-2">
            <Clipboard className="h-4 w-4" />
            Paste Text
          </TabsTrigger>
        </TabsList>

        <TabsContent value="file" className="mt-4">
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              documentContent ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            )}
            onClick={() => fileInputRef.current?.click()}
          >
            {documentContent ? (
              <div className="space-y-2">
                <FileText className="h-10 w-10 mx-auto text-primary" />
                <p className="font-medium">{fileName}</p>
                <p className="text-sm text-muted-foreground">
                  {documentContent.length.toLocaleString()} characters
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Change File
                </Button>
              </div>
            ) : (
              <>
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                <p className="text-sm font-medium">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, DOCX, TXT, MD, JSON, YAML, CSV supported
                </p>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPT_STRING}
              onChange={onFileSelect}
              className="hidden"
            />
          </div>
        </TabsContent>

        <TabsContent value="paste" className="mt-4">
          <Textarea
            value={documentContent}
            onChange={(e) => setDocumentContent(e.target.value)}
            placeholder="Paste your document content here...

Example content:
- Resume or CV text
- LinkedIn profile content
- Job description
- Company about page
- Pitch deck text"
            rows={10}
            className="font-mono text-sm"
          />
          {documentContent && (
            <p className="text-xs text-muted-foreground mt-2">
              {documentContent.length.toLocaleString()} characters
            </p>
          )}
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
        <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
        <p className="text-xs text-muted-foreground">
          AI will only extract explicitly stated information. Fields without matching data will remain empty.
        </p>
      </div>

      <div className="flex justify-end gap-2">
        <Button
          onClick={onExtract}
          disabled={!documentContent.trim() || isExtracting}
          className="gap-2"
        >
          <Sparkles className="h-4 w-4" />
          Analyze Document
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}

// Extracting Step Component
function ExtractingStep({ extractionType }: { extractionType: ExtractionType }) {
  return (
    <motion.div
      key="extracting"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="py-12 flex flex-col items-center justify-center"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />
        <motion.div
          className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="h-8 w-8 text-primary-foreground" />
        </motion.div>
      </div>
      <h3 className="mt-6 text-lg font-semibold">Analyzing Document</h3>
      <p className="text-sm text-muted-foreground mt-1">
        Extracting {extractionType === 'persona' ? 'persona' : 'profile'} data...
      </p>
      <div className="flex gap-1 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-2 w-2 rounded-full bg-primary"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Preview Step Component
interface PreviewStepProps {
  extractionType: ExtractionType;
  data: PersonaExtractionData | ProfileExtractionData;
  onApply: () => void;
  onBack: () => void;
}

function PreviewStep({ extractionType, data, onApply, onBack }: PreviewStepProps) {
  const confidence = data.extraction_confidence?.overall || 0;

  return (
    <motion.div
      key="preview"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-4 flex-1 overflow-hidden flex flex-col"
    >
      {/* Confidence Indicator */}
      <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-medium">Extraction Confidence</span>
            <span className={cn(
              "text-sm font-bold",
              confidence >= 70 ? "text-emerald-600 dark:text-emerald-400" : 
              confidence >= 40 ? "text-amber-600 dark:text-amber-400" : "text-destructive"
            )}>
              {confidence}%
            </span>
          </div>
          <Progress value={confidence} className="h-2" />
        </div>
        {confidence >= 70 ? (
          <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        ) : (
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        )}
      </div>

      {/* Extracted Data Preview */}
      <ScrollArea className="flex-1 max-h-[400px]">
        <div className="space-y-4 pr-4">
          {extractionType === 'persona' ? (
            <PersonaPreview data={data as PersonaExtractionData} />
          ) : (
            <ProfilePreview data={data as ProfileExtractionData} />
          )}
        </div>
      </ScrollArea>

      {/* Actions */}
      <div className="flex justify-between gap-2 pt-2 border-t">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onApply} className="gap-2">
          <Check className="h-4 w-4" />
          Apply to {extractionType === 'persona' ? 'Persona' : 'Profile'}
        </Button>
      </div>
    </motion.div>
  );
}

// Persona Preview
function PersonaPreview({ data }: { data: PersonaExtractionData }) {
  const sections = [
    { title: 'Basic Info', items: [
      { label: 'Name', value: data.name },
      { label: 'Email', value: data.email },
      { label: 'Job Title', value: data.job_title },
      { label: 'Department', value: data.department },
    ]},
    { title: 'Skills & Expertise', items: [
      { label: 'Skills', value: data.skills?.length ? data.skills : null, isArray: true },
      { label: 'Expertise Areas', value: data.expertise_areas?.length ? data.expertise_areas : null, isArray: true },
      { label: 'Tools Used', value: data.tools_used?.length ? data.tools_used : null, isArray: true },
    ]},
    { title: 'Goals & Challenges', items: [
      { label: 'Goals', value: data.goals?.length ? data.goals : null, isArray: true },
      { label: 'Pain Points', value: data.pain_points?.length ? data.pain_points : null, isArray: true },
    ]},
    { title: 'Communication Style', items: [
      { label: 'Formality', value: data.communication_style?.formality },
      { label: 'Detail Level', value: data.communication_style?.detail_level },
      { label: 'Technical Depth', value: data.communication_style?.technical_depth },
    ]},
  ];

  return (
    <>
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className="text-sm font-semibold mb-2">{section.title}</h4>
          <div className="space-y-2">
            {section.items.map((item) => (
              <div key={item.label} className="flex items-start gap-2">
                <span className="text-sm text-muted-foreground w-32 shrink-0">{item.label}:</span>
                {item.value ? (
                  item.isArray && Array.isArray(item.value) ? (
                    <div className="flex flex-wrap gap-1">
                      {item.value.map((v, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{v}</Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm">{item.value}</span>
                  )
                ) : (
                  <span className="text-sm text-muted-foreground italic">Not found</span>
                )}
              </div>
            ))}
          </div>
          <Separator className="mt-3" />
        </div>
      ))}
    </>
  );
}

// Profile Preview
function ProfilePreview({ data }: { data: ProfileExtractionData }) {
  const sections = [
    { title: 'Company Info', items: [
      { label: 'Name', value: data.company_info?.name },
      { label: 'Tagline', value: data.company_info?.tagline },
      { label: 'Industry', value: data.company_info?.industry },
      { label: 'Size', value: data.company_info?.size },
      { label: 'Website', value: data.company_info?.website },
    ]},
    { title: 'Services', items: 
      data.services?.length 
        ? data.services.map((s, i) => ({ label: `Service ${i + 1}`, value: s.title }))
        : [{ label: 'Services', value: null }]
    },
    { title: 'Team', items:
      data.team_members?.length
        ? data.team_members.map((m, i) => ({ label: m.name || `Member ${i + 1}`, value: m.role }))
        : [{ label: 'Team Members', value: null }]
    },
    { title: 'Compliance', items: [
      { label: 'Certifications', value: data.compliance?.certifications?.length ? data.compliance.certifications : null, isArray: true },
      { label: 'Regulations', value: data.compliance?.regulations?.length ? data.compliance.regulations : null, isArray: true },
    ]},
  ];

  return (
    <>
      {sections.map((section) => (
        <div key={section.title}>
          <h4 className="text-sm font-semibold mb-2">{section.title}</h4>
          <div className="space-y-2">
            {section.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-sm text-muted-foreground w-32 shrink-0">{item.label}:</span>
                {item.value ? (
                  'isArray' in item && item.isArray && Array.isArray(item.value) ? (
                    <div className="flex flex-wrap gap-1">
                      {item.value.map((v, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">{v}</Badge>
                      ))}
                    </div>
                  ) : (
                    <span className="text-sm">{item.value}</span>
                  )
                ) : (
                  <span className="text-sm text-muted-foreground italic">Not found</span>
                )}
              </div>
            ))}
          </div>
          <Separator className="mt-3" />
        </div>
      ))}
    </>
  );
}
