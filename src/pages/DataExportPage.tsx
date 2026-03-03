import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Download, FileSpreadsheet, FileJson, Brain, Users, BarChart3, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/animations';
import { objectsToCsv, downloadCsv, downloadJson } from '@/lib/csv-export';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

type ExportFormat = 'csv' | 'json';

interface ExportConfig {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  table: string;
  columns?: { key: string; label: string }[];
}

const exportConfigs: ExportConfig[] = [
  {
    id: 'personas',
    title: 'Employee Personas',
    description: 'All persona profiles including skills, goals, preferences, and AI interaction styles',
    icon: <Users className="h-5 w-5" />,
    table: 'employee_personas',
    columns: [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
      { key: 'job_title', label: 'Job Title' },
      { key: 'department', label: 'Department' },
      { key: 'status', label: 'Status' },
      { key: 'skills', label: 'Skills' },
      { key: 'expertise_areas', label: 'Expertise Areas' },
      { key: 'tools_used', label: 'Tools Used' },
      { key: 'goals', label: 'Goals' },
      { key: 'pain_points', label: 'Pain Points' },
      { key: 'ai_interaction_style', label: 'AI Interaction Style' },
      { key: 'preferred_response_length', label: 'Preferred Response Length' },
      { key: 'preferred_tone', label: 'Preferred Tone' },
      { key: 'created_at', label: 'Created At' },
      { key: 'updated_at', label: 'Updated At' },
    ],
  },
  {
    id: 'assessments',
    title: 'AI Assessments',
    description: 'AI readiness assessments with scores, organization profiles, and recommendations',
    icon: <Brain className="h-5 w-5" />,
    table: 'ai_assessments',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'readiness_score', label: 'Readiness Score' },
      { key: 'organization_profile', label: 'Organization Profile' },
      { key: 'current_ai_usage', label: 'Current AI Usage' },
      { key: 'technical_readiness', label: 'Technical Readiness' },
      { key: 'budget_timeline', label: 'Budget Timeline' },
      { key: 'recommendations', label: 'Recommendations' },
      { key: 'created_at', label: 'Created At' },
      { key: 'updated_at', label: 'Updated At' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics Events',
    description: 'All tracked analytics events including views, shares, clicks, and custom events',
    icon: <BarChart3 className="h-5 w-5" />,
    table: 'analytics_events',
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'event_type', label: 'Event Type' },
      { key: 'event_data', label: 'Event Data' },
      { key: 'profile_id', label: 'Profile ID' },
      { key: 'created_at', label: 'Timestamp' },
    ],
  },
];

export default function DataExportPage() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [exportingId, setExportingId] = useState<string | null>(null);
  const [formats, setFormats] = useState<Record<string, ExportFormat>>({
    personas: 'csv',
    assessments: 'csv',
    analytics: 'csv',
  });

  useEffect(() => {
    if (!authLoading && !user) navigate('/login');
  }, [user, authLoading, navigate]);

  const handleExport = async (config: ExportConfig) => {
    if (!user) return;
    setExportingId(config.id);

    try {
      const { data, error } = await supabase
        .from(config.table as 'employee_personas' | 'ai_assessments' | 'analytics_events')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (!data || data.length === 0) {
        toast.info(`No ${config.title.toLowerCase()} data to export`);
        setExportingId(null);
        return;
      }

      const format = formats[config.id];
      const filename = `${config.id}_export`;

      if (format === 'json') {
        downloadJson(data, filename);
      } else {
        const csv = objectsToCsv(data as Record<string, unknown>[], config.columns);
        downloadCsv(csv, filename);
      }

      toast.success(`${config.title} exported as ${format.toUpperCase()}`);
    } catch (err) {
      console.error('Export error:', err);
      toast.error(`Failed to export ${config.title.toLowerCase()}`);
    } finally {
      setExportingId(null);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-20 pb-12">
        <div className="container max-w-3xl">
          <FadeIn>
            <div className="mb-8">
              <Button variant="ghost" size="sm" asChild className="mb-4">
                <Link to="/settings">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Settings
                </Link>
              </Button>
              <div className="pillar-border-accent pl-4">
                <h1 className="font-display text-3xl font-bold">Data Export</h1>
                <p className="mt-1 text-muted-foreground">
                  Download your data as CSV or JSON
                </p>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="space-y-4">
            {exportConfigs.map((config) => (
              <StaggerItem key={config.id}>
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          {config.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{config.title}</CardTitle>
                          <CardDescription>{config.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-3">
                      <Select
                        value={formats[config.id]}
                        onValueChange={(v) =>
                          setFormats((prev) => ({ ...prev, [config.id]: v as ExportFormat }))
                        }
                      >
                        <SelectTrigger className="w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="csv">
                            <span className="flex items-center gap-2">
                              <FileSpreadsheet className="h-3 w-3" /> CSV
                            </span>
                          </SelectItem>
                          <SelectItem value="json">
                            <span className="flex items-center gap-2">
                              <FileJson className="h-3 w-3" /> JSON
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        onClick={() => handleExport(config)}
                        disabled={exportingId === config.id}
                      >
                        {exportingId === config.id ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                          <Download className="mr-2 h-4 w-4" />
                        )}
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
