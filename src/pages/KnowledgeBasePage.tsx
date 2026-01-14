import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Plus, Search, BookOpen, Loader2, PanelLeftClose, PanelLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function KnowledgeBasePage() {
  const { data: documents, isLoading } = useKnowledgeDocuments();
  const { data: folders = [] } = useKnowledgeFolders();
  const deleteDocument = useDeleteDocument();
  const moveDocument = useMoveDocumentToFolder();
  const categories = useDocumentCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
              'border-r border-border bg-muted/30 transition-all duration-300',
              sidebarOpen ? 'w-64' : 'w-0'
            )}
            onDrop={(e) => handleDrop(e, null)}
            onDragOver={handleDragOver}
          >
            {sidebarOpen && (
              <div className="p-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sm text-foreground">Folders</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
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
            <div className="container mx-auto px-4 py-8">
              {/* Header */}
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
                  <div>
                    <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                      <BookOpen className="h-8 w-8 text-primary" />
                      Knowledge Base
                    </h1>
                    <p className="text-muted-foreground mt-1">
                      Your team's documentation and wiki
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <SeedDocumentsButton />
                  <ImportDocumentsDialog />
                  <Button asChild>
                    <Link to="/knowledge/new">
                      <Plus className="h-4 w-4 mr-2" />
                      New Document
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Tabs */}
              <Tabs defaultValue="all" className="mb-6">
                <TabsList className="flex-wrap h-auto gap-1">
                  <TabsTrigger
                    value="all"
                    onClick={() => setSelectedCategory(null)}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    All Documents
                  </TabsTrigger>
                  {categories.map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      onClick={() => setSelectedCategory(category)}
                      className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Documents Grid */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : filteredDocuments?.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    {searchTerm || selectedCategory || selectedFolderId ? 'No documents found' : 'No documents yet'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm || selectedCategory || selectedFolderId
                      ? 'Try adjusting your search or filters'
                      : 'Create your first document to get started'}
                  </p>
                  {!searchTerm && !selectedCategory && !selectedFolderId && (
                    <Button asChild>
                      <Link to="/knowledge/new">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Document
                      </Link>
                    </Button>
                  )}
                </div>
              ) : (
                <div 
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                  onDrop={(e) => handleDrop(e, selectedFolderId)}
                  onDragOver={handleDragOver}
                >
                  {filteredDocuments?.map((doc) => (
                    <DraggableDocumentCard key={doc.id} document={doc} onDelete={handleDelete} />
                  ))}
                </div>
              )}

              {/* Stats */}
              {documents && documents.length > 0 && (
                <div className="mt-8 pt-8 border-t border-border">
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>{documents.length} total documents</span>
                    <span>•</span>
                    <span>{categories.length} categories</span>
                    <span>•</span>
                    <span>{folders.length} folders</span>
                    <span>•</span>
                    <span>{documents.filter((d) => d.is_public).length} public</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
