import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LayoutDashboard, FilePlus, BarChart3, Archive, Settings } from 'lucide-react';

export function BottomNav() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const items = user?.role === 'admin'
    ? [
        { title: 'Home', url: '/admin', icon: LayoutDashboard },
        { title: 'Create', url: '/admin/create', icon: FilePlus },
        { title: 'Analytics', url: '/admin/analytics', icon: BarChart3 },
        { title: 'Archive', url: '/archive', icon: Archive },
        { title: 'Settings', url: '/settings', icon: Settings },
      ]
    : [
        { title: 'Home', url: '/dashboard', icon: LayoutDashboard },
        { title: 'Archive', url: '/archive', icon: Archive },
        { title: 'Settings', url: '/settings', icon: Settings },
      ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden glass-card-strong border-t border-border/50">
      <div className="flex items-center justify-around py-2">
        {items.map((item) => {
          const isActive = location.pathname === item.url;
          return (
            <button
              key={item.title}
              onClick={() => navigate(item.url)}
              className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all ${
                isActive ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${isActive ? 'bg-gradient-to-r from-primary to-secondary' : ''}`}>
                <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : ''}`} />
              </div>
              <span className="text-[10px] font-medium">{item.title}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
