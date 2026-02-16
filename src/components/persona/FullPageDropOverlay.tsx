import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';
import { extractTextFromFile, isSupported } from '@/lib/document-parser';
import { useDocumentExtraction, type PersonaExtractionData } from '@/hooks/useDocumentExtraction';

interface FullPageDropOverlayProps {
  onDataExtracted: (data: PersonaExtractionData) => void;
}

export function FullPageDropOverlay({ onDataExtracted }: FullPageDropOverlayProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { extractFromText } = useDocumentExtraction();
  const dragCounter = useState({ current: 0 })[0];

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer?.types.includes('Files')) {
      setIsDragging(true);
    }
  }, [dragCounter]);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, [dragCounter]);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(async (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const file = e.dataTransfer?.files?.[0];
    if (!file) return;

    if (!isSupported(file.name)) {
      toast.error('Unsupported file format', {
        description: 'Please drop a PDF, DOCX, TXT, MD, JSON, YAML, or CSV file.',
      });
      return;
    }

    setIsProcessing(true);
    try {
      const text = await extractTextFromFile(file);
      toast.info(`Analyzing "${file.name}"...`);
      const result = await extractFromText(text, 'persona');
      if (result) {
        onDataExtracted(result as PersonaExtractionData);
        toast.success('Persona data extracted and applied!');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to process file');
    } finally {
      setIsProcessing(false);
    }
  }, [dragCounter, extractFromText, onDataExtracted]);

  useEffect(() => {
    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('drop', handleDrop);
    };
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  return (
    <AnimatePresence>
      {(isDragging || isProcessing) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-primary bg-primary/5 p-16"
          >
            {isProcessing ? (
              <>
                <motion.div
                  className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <Upload className="h-8 w-8 text-primary-foreground" />
                </motion.div>
                <p className="text-lg font-semibold">Extracting persona data…</p>
                <p className="text-sm text-muted-foreground">This may take a few seconds</p>
              </>
            ) : (
              <>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Upload className="h-16 w-16 text-primary" />
                </motion.div>
                <p className="text-lg font-semibold">Drop file to import</p>
                <p className="text-sm text-muted-foreground">
                  PDF, DOCX, TXT, MD, JSON, YAML, CSV
                </p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
