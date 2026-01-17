import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from './PageTransition';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import DashboardPage from '@/pages/DashboardPage';
import ProfileEditPage from '@/pages/ProfileEditPage';
import ProfilePreviewPage from '@/pages/ProfilePreviewPage';
import PublicProfilePage from '@/pages/PublicProfilePage';
import AnalyticsDashboardPage from '@/pages/AnalyticsDashboardPage';
import KnowledgeBasePage from '@/pages/KnowledgeBasePage';
import KnowledgeDocumentPage from '@/pages/KnowledgeDocumentPage';
import KnowledgeEditorPage from '@/pages/KnowledgeEditorPage';
import OnboardingPage from '@/pages/OnboardingPage';
import DealComparisonPage from '@/pages/DealComparisonPage';
import NotFound from '@/pages/NotFound';

export function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          }
        />
        <Route
          path="/login"
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          }
        />
        <Route
          path="/signup"
          element={
            <PageTransition>
              <SignupPage />
            </PageTransition>
          }
        />
        <Route
          path="/onboarding"
          element={
            <PageTransition>
              <OnboardingPage />
            </PageTransition>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <DashboardPage />
            </PageTransition>
          }
        />
        <Route
          path="/deals/compare"
          element={
            <PageTransition>
              <DealComparisonPage />
            </PageTransition>
          }
        />
        <Route
          path="/analytics"
          element={
            <PageTransition>
              <AnalyticsDashboardPage />
            </PageTransition>
          }
        />
        <Route
          path="/knowledge"
          element={
            <PageTransition>
              <KnowledgeBasePage />
            </PageTransition>
          }
        />
        <Route
          path="/knowledge/new"
          element={
            <PageTransition>
              <KnowledgeEditorPage />
            </PageTransition>
          }
        />
        <Route
          path="/knowledge/:slug"
          element={
            <PageTransition>
              <KnowledgeDocumentPage />
            </PageTransition>
          }
        />
        <Route
          path="/knowledge/:slug/edit"
          element={
            <PageTransition>
              <KnowledgeEditorPage />
            </PageTransition>
          }
        />
        <Route
          path="/profile/:id/edit"
          element={
            <PageTransition>
              <ProfileEditPage />
            </PageTransition>
          }
        />
        <Route
          path="/profile/:id/preview"
          element={
            <PageTransition>
              <ProfilePreviewPage />
            </PageTransition>
          }
        />
        <Route
          path="/p/:slug"
          element={
            <PageTransition>
              <PublicProfilePage />
            </PageTransition>
          }
        />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
