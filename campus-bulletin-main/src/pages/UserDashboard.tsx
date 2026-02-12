import { useState, useMemo, useEffect } from 'react';
import { Priority, Department, Circular } from '@/data/sampleCirculars';
import { CircularCard } from '@/components/CircularCard';
import { Input } from '@/components/ui/input';
import { Search, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchCirculars } from '@/lib/api';

const UserDashboard = () => {
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [filterDept, setFilterDept] = useState<Department | 'all'>('all');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchCirculars();
        setCirculars(response.data);
      } catch (err) {
        console.error('Failed to fetch circulars:', err);
      }
    };
    getData();
  }, []);

  const filtered = useMemo(() => {
    return circulars.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.content.toLowerCase().includes(search.toLowerCase());
      const matchPriority = filterPriority === 'all' || c.priority === filterPriority;
      const matchDept = filterDept === 'all' || c.department === filterDept;
      return matchSearch && matchPriority && matchDept;
    });
  }, [circulars, search, filterPriority, filterDept]);

  const unread = circulars.filter(c => !c.isRead).length;
  const priorities: (Priority | 'all')[] = ['all', 'urgent', 'informational', 'action-required'];
  const departments: Department[] = ['All', 'CSE', 'ECE', 'MECH', 'MBA', 'CIVIL', 'EEE', 'IT'];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-foreground">My Circulars</h1>
        <p className="text-sm text-muted-foreground mt-1">{unread} unread notices</p>
      </motion.div>

      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search circulars..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10 bg-background/50" />
        </div>
        <div className="flex flex-wrap gap-2">
          {priorities.map(p => (
            <button key={p} onClick={() => setFilterPriority(p)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all ${filterPriority === p ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>
              {p === 'all' ? 'All' : p === 'action-required' ? 'Action' : p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
          <span className="w-px h-6 bg-border self-center" />
          {departments.map(d => (
            <button key={d} onClick={() => setFilterDept(d === 'All' ? 'all' as any : d)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all ${(filterDept === 'all' && d === 'All') || filterDept === d ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c, i) => <CircularCard key={c.id || i} circular={c} index={i} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No circulars found</p>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
