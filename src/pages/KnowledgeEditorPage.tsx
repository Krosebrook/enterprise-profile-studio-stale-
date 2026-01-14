import { useParams, Navigate } from 'react-router-dom';
import { useKnowledgeDocument } from '@/hooks/useKnowledgeBase';
import { DocumentEditor } from '@/components/knowledge/DocumentEditor';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';

export default function KnowledgeEditorPage() {
  const { slug } = useParams<{ slug: string }>();
  const isNew = !slug || slug === 'new';
  const { data: document, isLoading, error } = useKnowledgeDocument(isNew ? undefined : slug);

  if (!isNew && isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!isNew && (error || !document)) {
    return <Navigate to="/knowledge" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {isNew ? 'Create New Document' : `Edit: ${document?.title}`}
          </h1>
          <p className="text-muted-foreground">
            Write your content using Markdown formatting
          </p>
        </div>
        <DocumentEditor document={document || undefined} />
      </main>
      <Footer />
    </div>
  );
}
