import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useProfiles, EnterpriseProfile } from '@/hooks/useProfiles';
import { useProfileAnalytics, AnalyticsData } from '@/hooks/useProfileAnalytics';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import {
  Loader2,
  Eye,
  Share2,
  MousePointerClick,
  Briefcase,
  TrendingUp,
  ArrowLeft,
  RefreshCw,
  GitCompare,
} from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';

// Custom hook for comparison analytics
function useComparisonAnalytics(profileIds: string[]) {
  const [data, setData] = useState<Record<string, AnalyticsData>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (profileIds.length === 0) return;

    const fetchAll = async () => {
      setIsLoading(true);
      const results: Record<string, AnalyticsData> = {};

      for (const profileId of profileIds) {
        const { data: events } = await supabase
          .from('analytics_events')
          .select('*')
          .eq('profile_id', profileId)
          .order('created_at', { ascending: false });

        const totalViews = events?.filter(e => e.event_type === 'view').length || 0;
        const totalShares = events?.filter(e => e.event_type === 'share').length || 0;
        const totalContactClicks = events?.filter(e => e.event_type === 'contact_click').length || 0;
        const totalServiceViews = events?.filter(e => e.event_type === 'service_view').length || 0;

        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const viewEvents = events?.filter(e => 
          e.event_type === 'view' && 
          new Date(e.created_at) >= thirtyDaysAgo
        ) || [];

        const viewsByDateMap = new Map<string, number>();
        for (let i = 29; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          viewsByDateMap.set(dateStr, 0);
        }

        viewEvents.forEach(event => {
          const dateStr = new Date(event.created_at).toISOString().split('T')[0];
          if (viewsByDateMap.has(dateStr)) {
            viewsByDateMap.set(dateStr, (viewsByDateMap.get(dateStr) || 0) + 1);
          }
        });

        results[profileId] = {
          totalViews,
          totalShares,
          totalContactClicks,
          totalServiceViews,
          viewsByDate: Array.from(viewsByDateMap.entries()).map(([date, count]) => ({ date, count })),
          recentEvents: events?.slice(0, 20) || [],
        };
      }

      setData(results);
      setIsLoading(false);
    };

    fetchAll();
  }, [profileIds.join(',')]);

  return { data, isLoading };
}

export default function AnalyticsDashboardPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { data: profiles, isLoading: profilesLoading } = useProfiles();
  const [selectedProfileId, setSelectedProfileId] = useState<string | undefined>();
  const [activeTab, setActiveTab] = useState<'single' | 'compare'>('single');
  const [comparisonIds, setComparisonIds] = useState<string[]>([]);
  
  const { data: analytics, isLoading: analyticsLoading, refetch } = useProfileAnalytics(selectedProfileId);
  const { data: comparisonData, isLoading: comparisonLoading } = useComparisonAnalytics(
    activeTab === 'compare' ? comparisonIds : []
  );

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profiles && profiles.length > 0 && !selectedProfileId) {
      const published = profiles.find(p => p.status === 'published');
      setSelectedProfileId(published?.id || profiles[0].id);
    }
  }, [profiles, selectedProfileId]);

  const toggleComparison = (id: string) => {
    setComparisonIds(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : prev.length < 4 ? [...prev, id] : prev
    );
  };

  if (authLoading || profilesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="the-dot-lg animate-pulse-dot" />
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  const selectedProfile = profiles?.find(p => p.id === selectedProfileId);

  const statCards = [
    { title: 'Total Views', value: analytics?.totalViews || 0, icon: Eye, color: 'text-blue-500', bgColor: 'bg-blue-500/10' },
    { title: 'Shares', value: analytics?.totalShares || 0, icon: Share2, color: 'text-green-500', bgColor: 'bg-green-500/10' },
    { title: 'Contact Clicks', value: analytics?.totalContactClicks || 0, icon: MousePointerClick, color: 'text-purple-500', bgColor: 'bg-purple-500/10' },
    { title: 'Service Views', value: analytics?.totalServiceViews || 0, icon: Briefcase, color: 'text-orange-500', bgColor: 'bg-orange-500/10' },
  ];

  const chartData = analytics?.viewsByDate.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.date), 'MMM d'),
  })) || [];

  // Prepare comparison chart data
  const comparisonChartData = comparisonIds.length > 0 ? (() => {
    const dates = new Set<string>();
    Object.values(comparisonData).forEach(d => d.viewsByDate.forEach(v => dates.add(v.date)));
    
    return Array.from(dates).sort().map(date => {
      const point: Record<string, any> = { 
        date, 
        formattedDate: format(parseISO(date), 'MMM d') 
      };
      comparisonIds.forEach(id => {
        const profile = profiles?.find(p => p.id === id);
        const views = comparisonData[id]?.viewsByDate.find(v => v.date === date)?.count || 0;
        point[profile?.name || id] = views;
      });
      return point;
    });
  })() : [];

  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pb-24 pt-20">
        <div className="container max-w-6xl py-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Button variant="ghost" onClick={() => navigate('/dashboard')} className="mb-2">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <h1 className="font-display text-3xl font-bold">Analytics Dashboard</h1>
              <p className="mt-1 text-muted-foreground">Track your profile performance and engagement</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'single' | 'compare')} className="mb-6">
            <TabsList>
              <TabsTrigger value="single" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Single Profile
              </TabsTrigger>
              <TabsTrigger value="compare" className="gap-2">
                <GitCompare className="h-4 w-4" />
                Compare Profiles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="mt-6">
              {/* Profile Selector */}
              <div className="mb-6 flex items-center gap-3">
                <Select value={selectedProfileId} onValueChange={setSelectedProfileId}>
                  <SelectTrigger className="w-[250px]">
                    <SelectValue placeholder="Select profile" />
                  </SelectTrigger>
                  <SelectContent>
                    {profiles?.map(profile => (
                      <SelectItem key={profile.id} value={profile.id}>
                        <div className="flex items-center gap-2">
                          {profile.name}
                          {profile.status === 'published' && (
                            <Badge variant="outline" className="text-xs">Live</Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={() => refetch()}>
                  <RefreshCw className={`h-4 w-4 ${analyticsLoading ? 'animate-spin' : ''}`} />
                </Button>
              </div>

              {selectedProfile?.status !== 'published' && (
                <Card className="mb-6 border-warning/50 bg-warning/10">
                  <CardContent className="flex items-center gap-3 py-4">
                    <TrendingUp className="h-5 w-5 text-warning" />
                    <p className="text-sm text-warning">This profile is not published yet. Analytics will start tracking once you publish it.</p>
                  </CardContent>
                </Card>
              )}

              {/* Stats Grid */}
              <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat) => (
                  <Card key={stat.title} className="border-border/50">
                    <CardContent className="flex items-center gap-4 pt-6">
                      <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value.toLocaleString()}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Views Chart */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="font-display">Views Over Time</CardTitle>
                  <CardDescription>Profile views in the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  {analyticsLoading ? (
                    <div className="flex h-[300px] items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={chartData}>
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="formattedDate" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                        <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                          }}
                        />
                        <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" name="Views" />
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="flex h-[300px] flex-col items-center justify-center text-muted-foreground">
                      <Eye className="mb-2 h-12 w-12 opacity-20" />
                      <p>No view data yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="compare" className="mt-6">
              {/* Profile Selection for Comparison */}
              <Card className="mb-6 border-border/50">
                <CardHeader>
                  <CardTitle className="font-display">Select Profiles to Compare</CardTitle>
                  <CardDescription>Choose up to 4 profiles to compare side by side</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {profiles?.map((profile, index) => (
                      <label
                        key={profile.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                          comparisonIds.includes(profile.id) 
                            ? 'border-primary bg-primary/5' 
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Checkbox
                          checked={comparisonIds.includes(profile.id)}
                          onCheckedChange={() => toggleComparison(profile.id)}
                          disabled={!comparisonIds.includes(profile.id) && comparisonIds.length >= 4}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{profile.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {profile.status === 'published' ? 'Published' : 'Draft'}
                          </p>
                        </div>
                        {comparisonIds.includes(profile.id) && (
                          <div 
                            className="h-3 w-3 rounded-full" 
                            style={{ backgroundColor: colors[comparisonIds.indexOf(profile.id)] }}
                          />
                        )}
                      </label>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {comparisonIds.length >= 2 ? (
                <>
                  {/* Comparison Stats */}
                  <div className="mb-6 overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="p-3 text-left text-sm font-medium text-muted-foreground">Metric</th>
                          {comparisonIds.map((id, index) => {
                            const profile = profiles?.find(p => p.id === id);
                            return (
                              <th key={id} className="p-3 text-left">
                                <div className="flex items-center gap-2">
                                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: colors[index] }} />
                                  <span className="font-medium truncate max-w-[120px]">{profile?.name}</span>
                                </div>
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-border">
                          <td className="p-3 text-sm text-muted-foreground">Total Views</td>
                          {comparisonIds.map(id => (
                            <td key={id} className="p-3 text-lg font-bold">
                              {comparisonData[id]?.totalViews.toLocaleString() || '0'}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-3 text-sm text-muted-foreground">Shares</td>
                          {comparisonIds.map(id => (
                            <td key={id} className="p-3 text-lg font-bold">
                              {comparisonData[id]?.totalShares.toLocaleString() || '0'}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-3 text-sm text-muted-foreground">Contact Clicks</td>
                          {comparisonIds.map(id => (
                            <td key={id} className="p-3 text-lg font-bold">
                              {comparisonData[id]?.totalContactClicks.toLocaleString() || '0'}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-t border-border">
                          <td className="p-3 text-sm text-muted-foreground">Service Views</td>
                          {comparisonIds.map(id => (
                            <td key={id} className="p-3 text-lg font-bold">
                              {comparisonData[id]?.totalServiceViews.toLocaleString() || '0'}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Comparison Chart */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <CardTitle className="font-display">Views Comparison</CardTitle>
                      <CardDescription>Compare profile views over the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {comparisonLoading ? (
                        <div className="flex h-[300px] items-center justify-center">
                          <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                      ) : (
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={comparisonChartData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                            <XAxis dataKey="formattedDate" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                            <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                              }}
                            />
                            <Legend />
                            {comparisonIds.map((id, index) => {
                              const profile = profiles?.find(p => p.id === id);
                              return (
                                <Line
                                  key={id}
                                  type="monotone"
                                  dataKey={profile?.name || id}
                                  stroke={colors[index]}
                                  strokeWidth={2}
                                  dot={false}
                                />
                              );
                            })}
                          </LineChart>
                        </ResponsiveContainer>
                      )}
                    </CardContent>
                  </Card>
                </>
              ) : (
                <Card className="border-dashed">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <GitCompare className="mb-4 h-12 w-12 text-muted-foreground/30" />
                    <h3 className="mb-2 font-medium">Select at least 2 profiles</h3>
                    <p className="text-sm text-muted-foreground">Choose profiles above to see comparison analytics</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
