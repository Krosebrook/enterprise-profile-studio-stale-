import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarkdownRenderer } from './MarkdownRenderer';
import { 
  KnowledgeDocument, 
  CreateDocumentData, 
  generateSlug,
  useCreateDocument,
  useUpdateDocument 
} from '@/hooks/useKnowledgeBase';
import { Save, Eye, Edit, X, Plus } from 'lucide-react';

interface DocumentEditorProps {
  document?: KnowledgeDocument;
  onSave?: (doc: KnowledgeDocument) => void;
}

export function DocumentEditor({ document, onSave }: DocumentEditorProps) {
  const navigate = useNavigate();
  const createDocument = useCreateDocument();
  const updateDocument = useUpdateDocument();
  
  const [title, setTitle] = useState(document?.title || '');
  const [slug, setSlug] = useState(document?.slug || '');
  const [content, setContent] = useState(document?.content || '');
  const [description, setDescription] = useState(document?.description || '');
  const [category, setCategory] = useState(document?.category || 'General');
  const [tags, setTags] = useState<string[]>(document?.tags || []);
  const [isPublic, setIsPublic] = useState(document?.is_public || false);
  const [newTag, setNewTag] = useState('');
  const [autoSlug, setAutoSlug] = useState(!document);

  useEffect(() => {
    if (autoSlug && title) {
      setSlug(generateSlug(title));
    }
  }, [title, autoSlug]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async () => {
    const data: CreateDocumentData = {
      title,
      slug,
      content,
      description: description || undefined,
      category,
      tags,
      is_public: isPublic,
    };

    if (document) {
      const result = await updateDocument.mutateAsync({ id: document.id, ...data });
      onSave?.(result);
      navigate(`/knowledge/${result.slug}`);
    } else {
      const result = await createDocument.mutateAsync(data);
      onSave?.(result);
      navigate(`/knowledge/${result.slug}`);
    }
  };

  const isLoading = createDocument.isPending || updateDocument.isPending;

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Document title"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="slug">URL Slug</Label>
            <label className="flex items-center gap-2 text-xs text-muted-foreground">
              <Switch
                checked={autoSlug}
                onCheckedChange={setAutoSlug}
                className="scale-75"
              />
              Auto-generate
            </label>
          </div>
          <Input
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="url-friendly-slug"
            disabled={autoSlug}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of the document"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., Engineering, Design, Policies"
          />
        </div>
        <div className="space-y-2">
          <Label>Tags</Label>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder="Add a tag"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
            />
            <Button type="button" variant="outline" size="icon" onClick={handleAddTag}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)}>
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Switch
          id="public"
          checked={isPublic}
          onCheckedChange={setIsPublic}
        />
        <Label htmlFor="public">Make this document public</Label>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Content</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="edit">
            <TabsList className="mb-4">
              <TabsTrigger value="edit" className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </TabsTrigger>
            </TabsList>
            <TabsContent value="edit">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your content in Markdown..."
                className="min-h-[400px] font-mono text-sm"
              />
            </TabsContent>
            <TabsContent value="preview">
              <div className="min-h-[400px] border rounded-lg p-4 bg-background">
                {content ? (
                  <MarkdownRenderer content={content} />
                ) : (
                  <p className="text-muted-foreground italic">
                    Start writing to see a preview...
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={() => navigate('/knowledge')}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!title || !content || isLoading}>
          <Save className="h-4 w-4 mr-2" />
          {document ? 'Update' : 'Create'} Document
        </Button>
      </div>
    </div>
  );
}
