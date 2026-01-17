import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  useKnowledgeDocuments, 
  useDeleteDocument, 
  useDocumentCategories,
  useKnowledgeFolders,
  useMoveDocumentToFolder
} from '@/hooks/useKnowledgeBase';
import { DraggableDocumentCard } from '@/components/knowledge/DraggableDocumentCard';
import { FolderTree } from '@/components/knowledge/FolderTree';
import { ImportDocumentsDialog } from '@/components/knowledge/ImportDocumentsDialog';
import { SeedDocumentsButton } from '@/components/knowledge/SeedDocumentsButton';
import { TagManager } from '@/components/knowledge/TagManager';
import { DocumentTemplateDialog } from '@/components/knowledge/DocumentTemplateDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Plus, Search, BookOpen, Loader2, PanelLeftClose, PanelLeft, FileText, Command } from 'lucide-react';
import { StaggerContainer, StaggerItem, FadeIn } from '@/components/ui/animations';
import { cn } from '@/lib/utils';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function KnowledgeBasePage() {
  const navigate = useNavigate();
  const { data: documents, isLoading } = useKnowledgeDocuments();
  const { data: folders = [] } = useKnowledgeFolders();
  const deleteDocument = useDeleteDocument();
  const moveDocument = useMoveDocumentToFolder();
  const categories = useDocumentCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Enable keyboard shortcuts
  useKeyboardShortcuts();
  
  // Listen for shortcut events
  useEffect(() => {
    const handleNewDocument = () => navigate('/knowledge/new');
    window.addEventListener('shortcut:new-profile', handleNewDocument);
    return () => window.removeEventListener('shortcut:new-profile', handleNewDocument);
  }, [navigate]);

  const filteredDocuments = documents?.filter((doc) => {
    const matchesSearch =
      !searchTerm ||
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    
    const matchesFolder = selectedFolderId === null || doc.folder_id === selectedFolderId;

    return matchesSearch && matchesCategory && matchesFolder;
  });

  const handleDelete = async (id: string) => {
    await deleteDocument.mutateAsync(id);
  };

  const handleDrop = (e: React.DragEvent, folderId: string | null) => {
    e.preventDefault();
    const documentId = e.dataTransfer.getData('documentId');
    if (documentId) {
      moveDocument.mutate({ documentId, folderId });
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Sidebar with folders */}
          <div
            className={cn(
              'border-r border-border/40 bg-muted/20 transition-all duration-300',
              sidebarOpen ? 'w-64' : 'w-0'
            )}
            onDrop={(e) => handleDrop(e, null)}
            onDragOver={handleDragOver}
          >
            {sidebarOpen && (
              <div className="p-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="the-dot" />
                    <h3 className="font-semibold text-sm text-foreground">Folders</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <PanelLeftClose className="h-4 w-4" />
                  </Button>
                </div>
                <FolderTree
                  folders={folders}
                  selectedFolderId={selectedFolderId}
                  onSelectFolder={setSelectedFolderId}
                />
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-6 py-8">
              {/* Header */}
              <FadeIn>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    {!sidebarOpen && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(true)}
                      >
                        <PanelLeft className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="pillar-border pl-4">
                      <h1 className="text-2xl font-bold text-foreground flex items-center gap-3">
                        <BookOpen className="h-6 w-6 text-primary" />
                        Knowledge Base
                      </h1>
                      <p className="text-muted-foreground text-sm mt-0.5">
                        Your team's documentation and wiki
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-md border border-border/50">
                      <Command className="h-3 w-3" />
                      <span>K</span>
                    </div>
                    <TagManager />
                    <SeedDocumentsButton />
                    <ImportDocumentsDialog />
                    <DocumentTemplateDialog />
                    <Button asChild className="accent-gradient border-0 shadow-sm hover:shadow-md transition-shadow">
                      <Link to="/knowledge/new">
                        <Plus className="h-4 w-4 mr-2" />
                        New Document
                      </Link>
                    </Button>
                  </div>
                </div>
              </FadeIn>

              {/* Search */}
              <FadeIn delay={0.05}>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents... (press /)"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-border/60 focus:border-primary"
                      data-search-input
                    />
                  </div>
                </div>
              </FadeIn>

              {/* Category Tabs */}
              <FadeIn delay={0.1}>
                <Tabs defaultValue="all" className="mb-6">
                  <TabsList className="flex-wrap h-auto gap-1 bg-muted/50 p-1">
                    <TabsTrigger
                      value="all"
                      onClick={() => setSelectedCategory(null)}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm"
                    >
                      All Documents
                    </TabsTrigger>
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        onClick={() => setSelectedCategory(category)}
                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-sm"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </FadeIn>

              {/* Documents Grid */}
              {isLoading ? (
                <div className="flex items-center justify-center py-16">
                  <div className="flex flex-col items-center gap-4">
                    <div className="the-dot-lg animate-pulse-dot" />
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                </div>
              ) : filteredDocuments?.length === 0 ? (
                <FadeIn delay={0.15}>
                  <div className="text-center py-16">
                    <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {searchTerm || selectedCategory || selectedFolderId ? 'No documents found' : 'No documents yet'}
                    </h3>
                    <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                      {searchTerm || selectedCategory || selectedFolderId
                        ? 'Try adjusting your search or filters'
                        : 'Create your first document to get started'}
                    </p>
                    {!searchTerm && !selectedCategory && !selectedFolderId && (
                      <Button asChild className="accent-gradient border-0">
                        <Link to="/knowledge/new">
                          <Plus className="h-4 w-4 mr-2" />
                          Create Document
                        </Link>
                      </Button>
                    )}
                  </div>
                </FadeIn>
              ) : (
                <StaggerContainer
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                  staggerDelay={0.03}
                >
                  {filteredDocuments?.map((doc) => (
                    <StaggerItem key={doc.id}>
                      <div
                        onDrop={(e) => handleDrop(e, selectedFolderId)}
                        onDragOver={handleDragOver}
                      >
                        <DraggableDocumentCard document={doc} onDelete={handleDelete} />
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              )}

              {/* Stats */}
              {documents && documents.length > 0 && (
                <FadeIn delay={0.2}>
                  <div className="mt-8 pt-6 border-t border-border/40">
                    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="the-dot" />
                        <span>{documents.length} documents</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        <span>{categories.length} categories</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        <span>{folders.length} folders</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-success" />
                        <span>{documents.filter((d) => d.is_public).length} public</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
