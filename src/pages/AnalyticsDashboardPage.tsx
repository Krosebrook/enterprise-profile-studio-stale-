import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useProfiles } from '@/hooks/useProfiles';
import { useProfileAnalytics } from '@/hooks/useProfileAnalytics';
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
} from 'lucide-react';
import { format, parseISO } from 'date-fns';

export default function AnalyticsDashboardPage() {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { data: profiles, isLoading: profilesLoading } = useProfiles();
  const [selectedProfileId, setSelectedProfileId] = useState<string | undefined>();
  
  const { data: analytics, isLoading: analyticsLoading, refetch } = useProfileAnalytics(selectedProfileId);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profiles && profiles.length > 0 && !selectedProfileId) {
      // Default to first published profile, or first profile
      const published = profiles.find(p => p.status === 'published');
      setSelectedProfileId(published?.id || profiles[0].id);
    }
  }, [profiles, selectedProfileId]);

  if (authLoading || profilesLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const selectedProfile = profiles?.find(p => p.id === selectedProfileId);

  const statCards = [
    {
      title: 'Total Views',
      value: analytics?.totalViews || 0,
      icon: Eye,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Shares',
      value: analytics?.totalShares || 0,
      icon: Share2,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Contact Clicks',
      value: analytics?.totalContactClicks || 0,
      icon: MousePointerClick,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Service Views',
      value: analytics?.totalServiceViews || 0,
      icon: Briefcase,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
  ];

  const chartData = analytics?.viewsByDate.map(item => ({
    ...item,
    formattedDate: format(parseISO(item.date), 'MMM d'),
  })) || [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pb-24 pt-20">
        <div className="container max-w-6xl py-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Button
                variant="ghost"
                onClick={() => navigate('/dashboard')}
                className="mb-2"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <h1 className="font-display text-3xl font-bold">Analytics Dashboard</h1>
              <p className="mt-1 text-muted-foreground">
                Track your profile performance and engagement
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={selectedProfileId} onValueChange={setSelectedProfileId}>
                <SelectTrigger className="w-[200px]">
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
          </div>

          {selectedProfile?.status !== 'published' && (
            <Card className="mb-6 border-warning/50 bg-warning/10">
              <CardContent className="flex items-center gap-3 py-4">
                <TrendingUp className="h-5 w-5 text-warning" />
                <p className="text-sm text-warning">
                  This profile is not published yet. Analytics will start tracking once you publish it.
                </p>
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

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Views Over Time */}
            <Card className="border-border/50 lg:col-span-2">
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
                      <XAxis 
                        dataKey="formattedDate" 
                        className="text-xs fill-muted-foreground"
                        tick={{ fontSize: 12 }}
                        interval="preserveStartEnd"
                      />
                      <YAxis 
                        className="text-xs fill-muted-foreground"
                        tick={{ fontSize: 12 }}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                        labelStyle={{ color: 'hsl(var(--foreground))' }}
                      />
                      <Area
                        type="monotone"
                        dataKey="count"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorViews)"
                        name="Views"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-[300px] flex-col items-center justify-center text-muted-foreground">
                    <Eye className="mb-2 h-12 w-12 opacity-20" />
                    <p>No view data yet</p>
                    <p className="text-sm">Views will appear here once your profile gets traffic</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Engagement Breakdown */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display">Engagement Breakdown</CardTitle>
                <CardDescription>How visitors interact with your profile</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart
                    data={[
                      { name: 'Views', value: analytics?.totalViews || 0, fill: 'hsl(var(--primary))' },
                      { name: 'Shares', value: analytics?.totalShares || 0, fill: 'hsl(142 76% 36%)' },
                      { name: 'Contacts', value: analytics?.totalContactClicks || 0, fill: 'hsl(262 83% 58%)' },
                      { name: 'Services', value: analytics?.totalServiceViews || 0, fill: 'hsl(25 95% 53%)' },
                    ]}
                    layout="vertical"
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis type="number" tick={{ fontSize: 12 }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} width={70} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display">Recent Activity</CardTitle>
                <CardDescription>Latest events on your profile</CardDescription>
              </CardHeader>
              <CardContent>
                {analytics?.recentEvents && analytics.recentEvents.length > 0 ? (
                  <div className="space-y-3 max-h-[250px] overflow-y-auto">
                    {analytics.recentEvents.slice(0, 10).map((event) => (
                      <div 
                        key={event.id}
                        className="flex items-center justify-between rounded-lg border border-border p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`rounded-full p-2 ${
                            event.event_type === 'view' ? 'bg-blue-500/10' :
                            event.event_type === 'share' ? 'bg-green-500/10' :
                            event.event_type === 'contact_click' ? 'bg-purple-500/10' :
                            'bg-orange-500/10'
                          }`}>
                            {event.event_type === 'view' && <Eye className="h-4 w-4 text-blue-500" />}
                            {event.event_type === 'share' && <Share2 className="h-4 w-4 text-green-500" />}
                            {event.event_type === 'contact_click' && <MousePointerClick className="h-4 w-4 text-purple-500" />}
                            {event.event_type === 'service_view' && <Briefcase className="h-4 w-4 text-orange-500" />}
                          </div>
                          <span className="text-sm font-medium capitalize">
                            {event.event_type.replace('_', ' ')}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(event.created_at), 'MMM d, h:mm a')}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex h-[250px] flex-col items-center justify-center text-muted-foreground">
                    <TrendingUp className="mb-2 h-12 w-12 opacity-20" />
                    <p>No activity yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
