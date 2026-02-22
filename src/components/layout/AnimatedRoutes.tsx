import { lazy, Suspense, ComponentType } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { PageTransition } from './PageTransition';

// Loading component for lazy-loaded routes
function RouteLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

// Lazy load all pages with named chunks for better caching
const LandingPage = lazy(() => import(/* webpackChunkName: "landing" */ '@/pages/LandingPage'));
const LoginPage = lazy(() => import(/* webpackChunkName: "auth" */ '@/pages/LoginPage'));
const SignupPage = lazy(() => import(/* webpackChunkName: "auth" */ '@/pages/SignupPage'));
const DashboardPage = lazy(() => import(/* webpackChunkName: "dashboard" */ '@/pages/DashboardPage'));
const ProfileEditPage = lazy(() => import(/* webpackChunkName: "profile" */ '@/pages/ProfileEditPage'));
const ProfilePreviewPage = lazy(() => import(/* webpackChunkName: "profile" */ '@/pages/ProfilePreviewPage'));
const PublicProfilePage = lazy(() => import(/* webpackChunkName: "profile" */ '@/pages/PublicProfilePage'));
const AnalyticsDashboardPage = lazy(() => import(/* webpackChunkName: "analytics" */ '@/pages/AnalyticsDashboardPage'));
const KnowledgeBasePage = lazy(() => import(/* webpackChunkName: "knowledge" */ '@/pages/KnowledgeBasePage'));
const KnowledgeDocumentPage = lazy(() => import(/* webpackChunkName: "knowledge" */ '@/pages/KnowledgeDocumentPage'));
const KnowledgeEditorPage = lazy(() => import(/* webpackChunkName: "knowledge" */ '@/pages/KnowledgeEditorPage'));
const OnboardingPage = lazy(() => import(/* webpackChunkName: "onboarding" */ '@/pages/OnboardingPage'));
const DealComparisonPage = lazy(() => import(/* webpackChunkName: "deals" */ '@/pages/DealComparisonPage'));
const DealDetailPage = lazy(() => import(/* webpackChunkName: "deals" */ '@/pages/DealDetailPage'));
const DealPipelinePage = lazy(() => import(/* webpackChunkName: "deals" */ '@/pages/DealPipelinePage'));
const DealAnalyticsPage = lazy(() => import(/* webpackChunkName: "deals" */ '@/pages/DealAnalyticsPage'));
const AIPlatformExplorerPage = lazy(() => import(/* webpackChunkName: "ai-explorer" */ '@/pages/AIPlatformExplorerPage'));
const PersonasListPage = lazy(() => import(/* webpackChunkName: "personas" */ '@/pages/PersonasListPage'));
const PersonaBuilderPage = lazy(() => import(/* webpackChunkName: "personas" */ '@/pages/PersonaBuilderPage'));
const TeamManagementPage = lazy(() => import(/* webpackChunkName: "team" */ '@/pages/TeamManagementPage'));
const AIPlaybooksPage = lazy(() => import(/* webpackChunkName: "playbooks" */ '@/pages/AIPlaybooksPage'));
const IntIncProfilePage = lazy(() => import(/* webpackChunkName: "intinc" */ '@/pages/IntIncProfilePage'));
const InstallPage = lazy(() => import(/* webpackChunkName: "install" */ '@/pages/InstallPage'));
const SetupPage = lazy(() => import(/* webpackChunkName: "setup" */ '@/pages/SetupPage'));
const AIChatPage = lazy(() => import(/* webpackChunkName: "ai-chat" */ '@/pages/AIChatPage'));
const SettingsPage = lazy(() => import(/* webpackChunkName: "settings" */ '@/pages/SettingsPage'));
const NotFound = lazy(() => import(/* webpackChunkName: "notfound" */ '@/pages/NotFound'));

// Helper to wrap lazy components with Suspense and PageTransition
function LazyRoute({ Component }: { Component: ComponentType }) {
  return (
    <Suspense fallback={<RouteLoader />}>
      <PageTransition>
        <Component />
      </PageTransition>
    </Suspense>
  );
}

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LazyRoute Component={LandingPage} />} />
        <Route path="/login" element={<LazyRoute Component={LoginPage} />} />
        <Route path="/signup" element={<LazyRoute Component={SignupPage} />} />
        <Route path="/onboarding" element={<LazyRoute Component={OnboardingPage} />} />
        <Route path="/dashboard" element={<LazyRoute Component={DashboardPage} />} />
        <Route path="/deals/compare" element={<LazyRoute Component={DealComparisonPage} />} />
        <Route path="/deals/pipeline" element={<LazyRoute Component={DealPipelinePage} />} />
        <Route path="/deals/:id" element={<LazyRoute Component={DealDetailPage} />} />
        <Route path="/deals/analytics" element={<LazyRoute Component={DealAnalyticsPage} />} />
        <Route path="/analytics" element={<LazyRoute Component={AnalyticsDashboardPage} />} />
        <Route path="/personas" element={<LazyRoute Component={PersonasListPage} />} />
        <Route path="/personas/:id" element={<LazyRoute Component={PersonaBuilderPage} />} />
        <Route path="/team" element={<LazyRoute Component={TeamManagementPage} />} />
        <Route path="/ai-explorer" element={<LazyRoute Component={AIPlatformExplorerPage} />} />
        <Route path="/ai-playbooks" element={<LazyRoute Component={AIPlaybooksPage} />} />
        <Route path="/knowledge" element={<LazyRoute Component={KnowledgeBasePage} />} />
        <Route path="/knowledge/new" element={<LazyRoute Component={KnowledgeEditorPage} />} />
        <Route path="/knowledge/:slug" element={<LazyRoute Component={KnowledgeDocumentPage} />} />
        <Route path="/knowledge/:slug/edit" element={<LazyRoute Component={KnowledgeEditorPage} />} />
        <Route path="/profile/:id/edit" element={<LazyRoute Component={ProfileEditPage} />} />
        <Route path="/profile/:id/preview" element={<LazyRoute Component={ProfilePreviewPage} />} />
        <Route path="/p/:slug" element={<LazyRoute Component={PublicProfilePage} />} />
        <Route path="/intinc" element={<LazyRoute Component={IntIncProfilePage} />} />
        <Route path="/install" element={<LazyRoute Component={InstallPage} />} />
        <Route path="/setup" element={<LazyRoute Component={SetupPage} />} />
        <Route path="/ai-chat" element={<LazyRoute Component={AIChatPage} />} />
        <Route path="/settings" element={<LazyRoute Component={SettingsPage} />} />
        <Route path="*" element={<LazyRoute Component={NotFound} />} />
      </Routes>
    </AnimatePresence>
  );
}
