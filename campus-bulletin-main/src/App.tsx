import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import CreateCircular from "./pages/CreateCircular";
import CircularDetails from "./pages/CircularDetails";
import AnalyticsPage from "./pages/AnalyticsPage";
import ArchivePage from "./pages/ArchivePage";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin" element={<DashboardLayout requiredRole="admin"><AdminDashboard /></DashboardLayout>} />
            <Route path="/admin/create" element={<DashboardLayout requiredRole="admin"><CreateCircular /></DashboardLayout>} />
            <Route path="/admin/analytics" element={<DashboardLayout requiredRole="admin"><AnalyticsPage /></DashboardLayout>} />
            <Route path="/dashboard" element={<DashboardLayout requiredRole="student"><UserDashboard /></DashboardLayout>} />
            <Route path="/circular/:id" element={<DashboardLayout><CircularDetails /></DashboardLayout>} />
            <Route path="/archive" element={<DashboardLayout><ArchivePage /></DashboardLayout>} />
            <Route path="/settings" element={<DashboardLayout><SettingsPage /></DashboardLayout>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
