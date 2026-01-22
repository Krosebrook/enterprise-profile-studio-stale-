import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, Shield, AlertTriangle, Target, FileText, 
  ChevronRight, Award, DollarSign, Clock, Users,
  CheckCircle, ArrowUpRight, ArrowDownRight, Zap,
  BarChart3, PieChart, Activity, Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Executive summary data
const executiveMetrics = {
  overallScore: 78,
  previousScore: 72,
  totalROI: 2450000,
  projectedSavings: 890000,
  riskScore: 23,
  adoptionRate: 67,
  activeUsers: 1250,
  totalProjects: 45
};

const platformSummary = [
  { name: 'Microsoft Copilot', adoption: 85, roi: 340000, status: 'deployed', risk: 'low' },
  { name: 'Claude Enterprise', adoption: 72, roi: 280000, status: 'deployed', risk: 'low' },
  { name: 'Google Gemini', adoption: 45, roi: 120000, status: 'pilot', risk: 'medium' },
  { name: 'OpenAI GPT-4', adoption: 68, roi: 210000, status: 'deployed', risk: 'low' },
];

const riskIndicators = [
  { name: 'Data Privacy Compliance', score: 92, trend: 'up', status: 'healthy' },
  { name: 'Model Governance', score: 85, trend: 'stable', status: 'healthy' },
  { name: 'Cost Control', score: 78, trend: 'up', status: 'attention' },
  { name: 'Security Posture', score: 95, trend: 'up', status: 'healthy' },
  { name: 'Vendor Dependency', score: 65, trend: 'down', status: 'warning' },
];

const painPoints = [
  { issue: 'Integration Complexity', severity: 'high', affected: 12, resolution: 'In Progress' },
  { issue: 'User Training Gaps', severity: 'medium', affected: 45, resolution: 'Planned' },
  { issue: 'Cost Visibility', severity: 'medium', affected: 8, resolution: 'In Progress' },
  { issue: 'Data Silos', severity: 'high', affected: 23, resolution: 'Investigating' },
];

const trendData = [
  { month: 'Jul', adoption: 35, roi: 50000 },
  { month: 'Aug', adoption: 42, roi: 85000 },
  { month: 'Sep', adoption: 48, roi: 120000 },
  { month: 'Oct', adoption: 55, roi: 180000 },
  { month: 'Nov', adoption: 62, roi: 250000 },
  { month: 'Dec', adoption: 67, roi: 340000 },
];

export function ExecutiveSummaryTab() {
  const scoreDiff = executiveMetrics.overallScore - executiveMetrics.previousScore;

  return (
    <div className="space-y-6">
      {/* Hero Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Readiness Score</p>
                <div className="flex items-center gap-2">
                  <p className="text-4xl font-bold">{executiveMetrics.overallScore}</p>
                  <Badge variant={scoreDiff >= 0 ? 'default' : 'destructive'} className="gap-1">
                    {scoreDiff >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {Math.abs(scoreDiff)}
                  </Badge>
                </div>
              </div>
              <div className="h-14 w-14 rounded-full bg-primary/20 flex items-center justify-center">
                <Award className="h-7 w-7 text-primary" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">vs. last quarter</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total ROI</p>
                <p className="text-3xl font-bold text-green-600">
                  ${(executiveMetrics.totalROI / 1000000).toFixed(2)}M
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-xs text-green-600">+18% YoY</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Risk Score</p>
                <p className="text-3xl font-bold text-orange-600">{executiveMetrics.riskScore}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Low risk threshold: 25</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Adoption Rate</p>
                <p className="text-3xl font-bold">{executiveMetrics.adoptionRate}%</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <Progress value={executiveMetrics.adoptionRate} className="mt-3 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Platform Summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Platform Performance Overview
            </CardTitle>
            <CardDescription>Active AI platforms and their performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {platformSummary.map((platform) => (
                <div key={platform.name} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{platform.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={platform.status === 'deployed' ? 'default' : 'secondary'} className="text-xs">
                          {platform.status}
                        </Badge>
                        <Badge variant={
                          platform.risk === 'low' ? 'outline' : 
                          platform.risk === 'medium' ? 'secondary' : 'destructive'
                        } className="text-xs">
                          {platform.risk} risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right">
                      <p className="text-sm font-medium">{platform.adoption}%</p>
                      <p className="text-xs text-muted-foreground">Adoption</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">${(platform.roi / 1000).toFixed(0)}K</p>
                      <p className="text-xs text-muted-foreground">ROI</p>
                    </div>
                    <div className="w-24">
                      <Progress value={platform.adoption} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Risk Indicators */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              Risk Indicators
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskIndicators.map((indicator) => (
                <div key={indicator.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{indicator.name}</span>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-bold ${
                        indicator.status === 'healthy' ? 'text-green-600' :
                        indicator.status === 'attention' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {indicator.score}%
                      </span>
                      {indicator.trend === 'up' && <ArrowUpRight className="h-3 w-3 text-green-500" />}
                      {indicator.trend === 'down' && <ArrowDownRight className="h-3 w-3 text-red-500" />}
                    </div>
                  </div>
                  <Progress 
                    value={indicator.score} 
                    className={`h-2 ${
                      indicator.status === 'healthy' ? '[&>div]:bg-green-500' :
                      indicator.status === 'attention' ? '[&>div]:bg-yellow-500' :
                      '[&>div]:bg-red-500'
                    }`}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pain Points & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              Active Pain Points
            </CardTitle>
            <CardDescription>Issues requiring attention across the AI initiative</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {painPoints.map((point, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                  <div className="flex items-center gap-3">
                    <Badge variant={point.severity === 'high' ? 'destructive' : 'secondary'}>
                      {point.severity}
                    </Badge>
                    <div>
                      <p className="font-medium">{point.issue}</p>
                      <p className="text-xs text-muted-foreground">{point.affected} teams affected</p>
                    </div>
                  </div>
                  <Badge variant="outline">{point.resolution}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Key Insights & Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">Strong Momentum</p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Adoption rate increased 32% over last quarter with Microsoft Copilot leading the charge.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">ROI Acceleration</p>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Projected to exceed $3M annual savings by Q2 2026 based on current trajectory.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-800 dark:text-orange-200">Watch: Vendor Dependency</p>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Consider diversifying AI platform portfolio to reduce single-vendor risk exposure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/ai-explorer?tab=assessment">
                <FileText className="h-5 w-5" />
                <span>Run Assessment</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/ai-explorer?tab=compare">
                <BarChart3 className="h-5 w-5" />
                <span>Compare Platforms</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/ai-explorer?tab=tco">
                <PieChart className="h-5 w-5" />
                <span>TCO Analysis</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/ai-explorer?tab=roadmap">
                <Target className="h-5 w-5" />
                <span>View Roadmap</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
