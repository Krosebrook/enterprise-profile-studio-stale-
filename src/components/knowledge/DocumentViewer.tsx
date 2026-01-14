import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MarkdownRenderer } from './MarkdownRenderer';
import { KnowledgeDocument } from '@/hooks/useKnowledgeBase';
import { ArrowLeft, Edit, Globe, Lock, Calendar, User } from 'lucide-react';
import { format } from 'date-fns';

interface DocumentViewerProps {
  document: KnowledgeDocument;
}

export function DocumentViewer({ document }: DocumentViewerProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Link
          to="/knowledge"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Knowledge Base
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">{document.title}</h1>
            {document.description && (
              <p className="text-lg text-muted-foreground">{document.description}</p>
            )}
          </div>
          <Button variant="outline" asChild>
            <Link to={`/knowledge/${document.slug}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            {document.is_public ? (
              <>
                <Globe className="h-4 w-4 text-green-500" />
                <span>Public</span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                <span>Private</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Updated {format(new Date(document.updated_at), 'MMMM d, yyyy')}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge>{document.category}</Badge>
          {document.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Separator className="my-6" />

      {/* Content */}
      <article>
        <MarkdownRenderer content={document.content} />
      </article>
    </div>
  );
}
