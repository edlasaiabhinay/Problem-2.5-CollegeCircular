import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings, Bell, Globe, LogOut, User, ShieldCheck, Lock, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

type TabType = 'profile' | 'notifications' | 'security';

const SettingsPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { id: 'profile' as TabType, label: 'Profile', icon: User, color: 'text-primary' },
    { id: 'notifications' as TabType, label: 'Notifications', icon: Bell, color: 'text-secondary' },
    { id: 'security' as TabType, label: 'Security', icon: Lock, color: 'text-urgent-foreground' },
  ];

  const handleSave = () => {
    setIsUpdating(true);
    // Removed artificial delay
    setIsUpdating(false);
    toast.success('Settings updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-12">
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
          <div className="p-2 bg-primary/20 rounded-xl">
            <Settings className="w-8 h-8 text-primary animate-spin-slow" />
          </div>
          Settings
        </h1>
        <p className="text-sm text-muted-foreground mt-2 ml-1">Customize your CampusConnect experience</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4 space-y-2 bg-white/40 backdrop-blur-md p-2 rounded-2xl border border-white/50 shadow-sm"
        >
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all active:scale-95 ${activeTab === item.id
                ? 'bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/20 shadow-inner'
                : 'hover:bg-white/60'
                }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${activeTab === item.id ? 'bg-white shadow-sm' : 'bg-muted'}`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className={`text-sm font-bold ${activeTab === item.id ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </div>
              {activeTab === item.id && <ChevronRight className="w-4 h-4 text-primary" />}
            </button>
          ))}
          <div className="pt-4 mt-4 border-t border-border/50 px-2">
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-xl p-4"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-bold">Sign Out</span>
            </Button>
          </div>
        </motion.div>

        {/* Content Area */}
        <motion.div
          layout
          className="lg:col-span-8 glass-card-strong p-4 sm:p-8 min-h-[400px] flex flex-col"
        >
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 border-b border-border/50 pb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-primary-foreground shadow-lg">
                    {user?.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{user?.role} • {user?.department || 'Administration'}</p>
                  </div>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                    <Input defaultValue={user?.name} className="bg-background/50 h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                    <Input defaultValue={user?.email} readOnly className="bg-muted h-11 cursor-not-allowed opacity-70" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Department</Label>
                    <Input defaultValue={user?.department || 'Computer Science'} className="bg-background/50 h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Account Status</Label>
                    <div className="flex items-center gap-2 px-4 h-11 rounded-lg bg-green-500/10 border border-green-500/20 text-green-600 text-sm font-bold">
                      <ShieldCheck className="w-4 h-4" />
                      Verified {user?.role}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50 flex justify-end">
                  <Button onClick={handleSave} disabled={isUpdating} className="bg-primary text-primary-foreground hover:opacity-90 px-8 py-6 rounded-xl font-bold shadow-md shadow-primary/20">
                    {isUpdating ? 'Saving...' : 'Save Profile Changes'}
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-bold text-foreground">Notification Preferences</h3>
                  <p className="text-sm text-muted-foreground">Manage how you receive alerts and updates</p>
                </div>

                <div className="space-y-6">
                  {[
                    { label: 'Push Notifications', sub: 'Instant alerts on your browser and devices', icon: Bell },
                    { label: 'Email Reports', sub: 'Weekly summary of all campus circulars', icon: Globe },
                    { label: 'Critical SMS Alerts', sub: 'Direct messages for urgent emergency alerts', icon: ShieldCheck },
                  ].map((item, idx) => (
                    <div key={item.label} className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-muted/30 border border-transparent hover:border-primary/20 transition-all">
                      <div className="flex items-center gap-4 text-left">
                        <div className="p-2 bg-white rounded-xl shadow-sm">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{item.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                        </div>
                      </div>
                      <Switch defaultChecked={idx !== 1} />
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-border/50 flex justify-end">
                  <Button onClick={handleSave} disabled={isUpdating} className="bg-primary text-primary-foreground hover:opacity-90 px-8 py-6 rounded-xl font-bold shadow-md shadow-primary/20">
                    {isUpdating ? 'Saving...' : 'Update Preferences'}
                  </Button>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-bold text-foreground">Security Settings</h3>
                  <p className="text-sm text-muted-foreground">Update your password and protect your account</p>
                </div>

                <div className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-foreground">Current Password</Label>
                    <div className="relative">
                      <Input type="password" placeholder="••••••••" className="bg-background/50 h-11 pl-10" />
                      <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-foreground">New Password</Label>
                    <div className="relative">
                      <Input type="password" placeholder="Min. 8 characters" className="bg-background/50 h-11 pl-10" />
                      <ShieldCheck className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-foreground">Confirm New Password</Label>
                    <div className="relative">
                      <Input type="password" placeholder="••••••••" className="bg-background/50 h-11 pl-10" />
                      <ShieldCheck className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/50 flex justify-end">
                  <Button onClick={handleSave} disabled={isUpdating} className="bg-urgent-foreground text-white hover:opacity-90 px-8 py-6 rounded-xl font-bold shadow-md shadow-urgent/20">
                    {isUpdating ? 'Updating...' : 'Change Password'}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
