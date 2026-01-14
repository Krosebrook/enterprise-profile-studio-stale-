import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProfilePreviewPage from "./pages/ProfilePreviewPage";
import PublicProfilePage from "./pages/PublicProfilePage";
import AnalyticsDashboardPage from "./pages/AnalyticsDashboardPage";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import KnowledgeDocumentPage from "./pages/KnowledgeDocumentPage";
import KnowledgeEditorPage from "./pages/KnowledgeEditorPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<AnalyticsDashboardPage />} />
            <Route path="/knowledge" element={<KnowledgeBasePage />} />
            <Route path="/knowledge/new" element={<KnowledgeEditorPage />} />
            <Route path="/knowledge/:slug" element={<KnowledgeDocumentPage />} />
            <Route path="/knowledge/:slug/edit" element={<KnowledgeEditorPage />} />
            <Route path="/profile/:id/edit" element={<ProfileEditPage />} />
            <Route path="/profile/:id/preview" element={<ProfilePreviewPage />} />
            <Route path="/p/:slug" element={<PublicProfilePage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
