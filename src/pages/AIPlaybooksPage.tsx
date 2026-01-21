import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Search, Filter, FileText, Shield, Monitor, Megaphone, Cog, ArrowRight, Sparkles } from 'lucide-react';
import { intIncDocuments } from '@/data/intIncDocuments';

const DEPARTMENT_FILTERS = [
  { id: 'all', label: 'All Departments', icon: BookOpen },
  { id: 'infosec', label: 'Information Security', icon: Shield },
  { id: 'it', label: 'Technology / IT', icon: Monitor },
  { id: 'marketing', label: 'Marketing', icon: Megaphone },
  { id: 'operations', label: 'Operations', icon: Cog },
];

const PLAYBOOK_CATEGORIES = [
  { id: 'playbooks', label: 'AI Playbooks', description: 'Department-specific implementation guides' },
  { id: 'strategy', label: 'Strategy Docs', description: 'Master plans and organizational strategy' },
  { id: 'case-studies', label: 'Case Studies', description: 'Real-world implementation examples' },
];

export default function AIPlaybooksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('all');

  const filteredDocuments = useMemo(() => {
    return intIncDocuments.filter(doc => {
      const matchesSearch = searchQuery === '' || 
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDepartment = departmentFilter === 'all' ||
        (departmentFilter === 'infosec' && (doc.tags.includes('infosec') || doc.tags.includes('security'))) ||
        (departmentFilter === 'it' && (doc.tags.includes('it') || doc.tags.includes('technology'))) ||
        (departmentFilter === 'marketing' && doc.tags.includes('marketing')) ||
        (departmentFilter === 'operations' && doc.tags.includes('operations'));

      const matchesCategory = activeTab === 'all' ||
        (activeTab === 'playbooks' && doc.category === 'AI Playbooks') ||
        (activeTab === 'strategy' && doc.category === 'AI Strategy') ||
        (activeTab === 'case-studies' && doc.tags.includes('case-studies'));

      return matchesSearch && matchesDepartment && matchesCategory;
    });
  }, [searchQuery, departmentFilter, activeTab]);

  return (
    <div className="min-h-screen bg-background pb-12 pt-20">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold">AI Playbooks & Strategy</h1>
          </div>
          <p className="text-muted-foreground">
            Department-specific AI implementation guides, strategy documents, and case studies
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search playbooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              {DEPARTMENT_FILTERS.map(dept => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All Documents</TabsTrigger>
            <TabsTrigger value="playbooks">Playbooks</TabsTrigger>
            <TabsTrigger value="strategy">Strategy</TabsTrigger>
            <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Documents Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.map((doc) => (
            <Card key={doc.slug} className="group hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-lg bg-primary/10 mb-2">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {doc.category}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-2">{doc.title}</CardTitle>
                <CardDescription className="line-clamp-2">{doc.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1 mb-4">
                  {doc.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {doc.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{doc.tags.length - 3}
                    </Badge>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="w-full group-hover:bg-primary/5" asChild>
                  <Link to={`/knowledge/${doc.slug}`}>
                    View Document
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="font-medium mb-1">No documents found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 p-6 rounded-lg border bg-muted/30">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link to="/knowledge">Browse All Knowledge Base</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/personas">Create AI Persona</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
