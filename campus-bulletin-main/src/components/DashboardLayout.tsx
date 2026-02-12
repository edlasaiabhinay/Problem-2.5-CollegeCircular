import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { AppSidebar } from '@/components/AppSidebar';
import { BottomNav } from '@/components/BottomNav';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Bell } from 'lucide-react';
import { NotificationPanel } from '@/components/NotificationPanel';
import { fetchCirculars } from '@/lib/api';
import { Circular } from '@/data/sampleCirculars';

interface DashboardLayoutProps {
  children: ReactNode;
  requiredRole?: 'admin' | 'student';
}

const DashboardLayout = ({ children, requiredRole }: DashboardLayoutProps) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [circulars, setCirculars] = useState<Circular[]>([]);

  useEffect(() => {
    const getCirculars = async () => {
      try {
        const response = await fetchCirculars();
        setCirculars(response.data);
      } catch (err) {
        console.error('Failed to fetch circulars for notifications:', err);
      }
    };
    if (isAuthenticated) {
      getCirculars();
      // Poll for new circulars every minute
      const interval = setInterval(getCirculars, 60000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  const unreadCount = circulars.filter(c => !c.isRead).length;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 pb-20 md:pb-0">
          <header className="sticky top-0 z-30 glass-card border-b border-border/50 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="p-1 px-2 h-9 w-9 md:hidden" />
              <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hidden md:block">
                CampusConnect
              </h2>
              <span className="text-xs font-medium text-muted-foreground md:hidden px-2 py-1 bg-muted rounded-md capitalize">
                {user?.role}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2.5 rounded-xl hover:bg-accent transition-all active:scale-90"
              >
                <Bell className="w-5 h-5 text-foreground" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white shadow-sm ring-2 ring-background animate-in zoom-in duration-150">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              <div className="flex items-center gap-3 pl-2 border-l border-border/50">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-semibold text-foreground leading-none">{user?.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 capitalize">{user?.role}</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-primary-foreground shadow-md ring-2 ring-primary/20">
                  {user?.name?.charAt(0)}
                </div>
              </div>
            </div>
          </header>
          <div className="relative">
            {showNotifications && (
              <NotificationPanel
                circulars={circulars.filter(c => !c.isRead)}
                onClose={() => setShowNotifications(false)}
              />
            )}
            <div className="p-4 md:p-6 max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>
        <BottomNav />
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
