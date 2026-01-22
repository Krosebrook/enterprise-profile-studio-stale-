import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, GitCompare, Grid3X3, Calculator, ClipboardCheck, Building2, Users } from 'lucide-react';
import { PlatformExplorerTab } from '@/components/ai-explorer/PlatformExplorerTab';
import { PlatformComparisonTab } from '@/components/ai-explorer/PlatformComparisonTab';
import { CapabilityMatrixTab } from '@/components/ai-explorer/CapabilityMatrixTab';
import { ROICalculatorTab } from '@/components/ai-explorer/ROICalculatorTab';
import { AIAssessmentTab } from '@/components/ai-explorer/AIAssessmentTab';
import { EnterpriseDashboardTab } from '@/components/ai-explorer/EnterpriseDashboardTab';
import { DepartmentRecommendationsTab } from '@/components/ai-explorer/DepartmentRecommendationsTab';

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
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 lg:w-auto lg:inline-grid h-auto p-1 bg-muted/50">
              <TabsTrigger 
                value="enterprise" 
                className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5"
              >
                <Building2 className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger 
                value="departments" 
                className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5"
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Departments</span>
              </TabsTrigger>
              <TabsTrigger 
                value="explorer" 
                className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5"
              >
                <Brain className="h-4 w-4" />
                <span className="hidden sm:inline">All Platforms</span>
              </TabsTrigger>
              <TabsTrigger 
                value="compare" 
                className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5"
              >
                <GitCompare className="h-4 w-4" />
                <span className="hidden sm:inline">Compare</span>
              </TabsTrigger>
              <TabsTrigger 
                value="matrix" 
                className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5"
              >
                <Grid3X3 className="h-4 w-4" />
                <span className="hidden sm:inline">Matrix</span>
              </TabsTrigger>
              <TabsTrigger 
                value="roi" 
                className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5"
              >
                <Calculator className="h-4 w-4" />
                <span className="hidden sm:inline">ROI</span>
              </TabsTrigger>
              <TabsTrigger 
                value="assessment" 
                className="gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm py-2.5"
              >
                <ClipboardCheck className="h-4 w-4" />
                <span className="hidden sm:inline">Assessment</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enterprise" className="mt-6">
              <EnterpriseDashboardTab />
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

            <TabsContent value="roi" className="mt-6">
              <ROICalculatorTab />
            </TabsContent>

            <TabsContent value="assessment" className="mt-6">
              <AIAssessmentTab />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
