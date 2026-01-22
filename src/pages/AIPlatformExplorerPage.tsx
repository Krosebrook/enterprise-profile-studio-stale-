import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, GitCompare, Grid3X3, Calculator, ClipboardCheck, Building2, Users, TrendingUp, Activity, Shield, Sparkles, Trophy, CalendarDays } from 'lucide-react';
import { PlatformExplorerTab } from '@/components/ai-explorer/PlatformExplorerTab';
import { PlatformComparisonTab } from '@/components/ai-explorer/PlatformComparisonTab';
import { CapabilityMatrixTab } from '@/components/ai-explorer/CapabilityMatrixTab';
import { ROICalculatorTab } from '@/components/ai-explorer/ROICalculatorTab';
import { AIAssessmentTab } from '@/components/ai-explorer/AIAssessmentTab';
import { EnterpriseDashboardTab } from '@/components/ai-explorer/EnterpriseDashboardTab';
import { DepartmentRecommendationsTab } from '@/components/ai-explorer/DepartmentRecommendationsTab';
import { StrategicAssessmentDashboard } from '@/components/ai-explorer/StrategicAssessmentDashboard';
import { TCOCalculatorTab } from '@/components/ai-explorer/TCOCalculatorTab';
import { PerformanceMetricsTab } from '@/components/ai-explorer/PerformanceMetricsTab';
import { GRCControlTowerTab } from '@/components/ai-explorer/GRCControlTowerTab';
import { MicrosoftDeepDiveTab } from '@/components/ai-explorer/MicrosoftDeepDiveTab';
import { PlatformRankingsTab } from '@/components/ai-explorer/PlatformRankingsTab';
import { ImplementationRoadmapTab } from '@/components/ai-explorer/ImplementationRoadmapTab';

export default function AIPlatformExplorerPage() {
  const [activeTab, setActiveTab] = useState('enterprise');

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-24 pb-16">
        <div className="container max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">Enterprise AI Platform Explorer</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              November 2025 AI platform intelligence with department recommendations, ROI analysis, and implementation guides.
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="flex flex-wrap h-auto p-1 bg-muted/50 gap-1">
              <TabsTrigger value="enterprise" className="gap-2 data-[state=active]:bg-background py-2">
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="strategic" className="gap-2 data-[state=active]:bg-background py-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Strategic</span>
              </TabsTrigger>
              <TabsTrigger value="tco" className="gap-2 data-[state=active]:bg-background py-2">
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">TCO</span>
              </TabsTrigger>
              <TabsTrigger value="performance" className="gap-2 data-[state=active]:bg-background py-2">
                <Activity className="h-4 w-4" />
                <span className="hidden sm:inline">Performance</span>
              </TabsTrigger>
              <TabsTrigger value="grc" className="gap-2 data-[state=active]:bg-background py-2">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">GRC</span>
              </TabsTrigger>
              <TabsTrigger value="microsoft" className="gap-2 data-[state=active]:bg-background py-2">
                <Sparkles className="h-4 w-4" />
                <span className="hidden sm:inline">Microsoft</span>
              </TabsTrigger>
              <TabsTrigger value="departments" className="gap-2 data-[state=active]:bg-background py-2">
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Departments</span>
              </TabsTrigger>
              <TabsTrigger value="explorer" className="gap-2 data-[state=active]:bg-background py-2">
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">Platforms</span>
              </TabsTrigger>
              <TabsTrigger value="compare" className="gap-2 data-[state=active]:bg-background py-2">
                <GitCompare className="h-4 w-4" />
                <span className="hidden sm:inline">Compare</span>
              </TabsTrigger>
              <TabsTrigger value="matrix" className="gap-2 data-[state=active]:bg-background py-2">
                <Grid3X3 className="h-4 w-4" />
                <span className="hidden sm:inline">Matrix</span>
              </TabsTrigger>
              <TabsTrigger value="assessment" className="gap-2 data-[state=active]:bg-background py-2">
                <ClipboardCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Assessment</span>
              </TabsTrigger>
              <TabsTrigger value="rankings" className="gap-2 data-[state=active]:bg-background py-2">
                <Trophy className="h-4 w-4" />
                <span className="hidden sm:inline">Rankings</span>
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="gap-2 data-[state=active]:bg-background py-2">
                <CalendarDays className="h-4 w-4" />
                <span className="hidden sm:inline">Roadmap</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enterprise" className="mt-6">
              <EnterpriseDashboardTab />
            </TabsContent>
            <TabsContent value="strategic" className="mt-6">
              <StrategicAssessmentDashboard />
            </TabsContent>
            <TabsContent value="tco" className="mt-6">
              <TCOCalculatorTab />
            </TabsContent>
            <TabsContent value="performance" className="mt-6">
              <PerformanceMetricsTab />
            </TabsContent>
            <TabsContent value="grc" className="mt-6">
              <GRCControlTowerTab />
            </TabsContent>
            <TabsContent value="microsoft" className="mt-6">
              <MicrosoftDeepDiveTab />
            </TabsContent>
            <TabsContent value="departments" className="mt-6">
              <DepartmentRecommendationsTab />
            </TabsContent>
            <TabsContent value="explorer" className="mt-6">
              <PlatformExplorerTab />
            </TabsContent>
            <TabsContent value="compare" className="mt-6">
              <PlatformComparisonTab />
            </TabsContent>
            <TabsContent value="matrix" className="mt-6">
              <CapabilityMatrixTab />
            </TabsContent>
            <TabsContent value="assessment" className="mt-6">
              <AIAssessmentTab />
            </TabsContent>
            <TabsContent value="rankings" className="mt-6">
              <PlatformRankingsTab />
            </TabsContent>
            <TabsContent value="roadmap" className="mt-6">
              <ImplementationRoadmapTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
