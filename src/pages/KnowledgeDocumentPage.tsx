import { useParams, Navigate } from 'react-router-dom';
import { useKnowledgeDocument } from '@/hooks/useKnowledgeBase';
import { DocumentViewer } from '@/components/knowledge/DocumentViewer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Loader2 } from 'lucide-react';

export default function KnowledgeDocumentPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: document, isLoading, error } = useKnowledgeDocument(slug);

  if (isLoading) {
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

  if (error || !document) {
    return <Navigate to="/knowledge" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <DocumentViewer document={document} />
      </main>
      <Footer />
    </div>
  );
}
