import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/data/sampleCirculars';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GraduationCap, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      // In a real app, the user's role would be returned from the server
      // For now, we manually navigate based on what we expect the role to be
      // (The AuthContext now stores the real role from the JWT)
      const role = JSON.parse(localStorage.getItem('user') || '{}').role;
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
            className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4"
          >
            <GraduationCap className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <h1 className="text-2xl font-bold text-foreground">CampusConnect</h1>
          <p className="text-muted-foreground text-sm mt-1">Smart Circular Management System</p>
        </div>

        <div className="glass-card-strong p-8">
          <div className="flex gap-2 mb-6">
            {(['student', 'admin'] as UserRole[]).map((role) => (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 ${selectedRole === role
                  ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-accent'
                  }`}
              >
                {role === 'admin' ? <Shield className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
                {role === 'admin' ? 'Admin' : 'Student'}
              </button>
            ))}
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={selectedRole === 'admin' ? 'admin@campus.edu' : 'student@campus.edu'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-background/50 border-border focus:border-primary"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-background/50 border-border focus:border-primary"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 transition-opacity font-semibold py-5"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border/50 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-bold hover:underline">
                Create Account
              </Link>
            </p>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/30">
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold mb-1">Notice</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Please use your registered campus credentials or create a new student account to proceed.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
