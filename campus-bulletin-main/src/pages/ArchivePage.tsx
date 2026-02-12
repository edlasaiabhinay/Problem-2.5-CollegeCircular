import { useState, useMemo, useEffect } from 'react';
import { Department, Priority, Circular } from '@/data/sampleCirculars';
import { CircularCard } from '@/components/CircularCard';
import { Input } from '@/components/ui/input';
import { Search, Archive, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchCirculars } from '@/lib/api';

const ArchivePage = () => {
  const [circulars, setCirculars] = useState<Circular[]>([]);
  const [search, setSearch] = useState('');
  const [filterDept, setFilterDept] = useState<Department | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<Priority | 'all'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchCirculars();
        setCirculars(response.data);
      } catch (err) {
        console.error('Failed to fetch circulars:', err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const archived = useMemo(() => {
    return circulars
      .filter(c => c.isRead || new Date(c.publishedAt) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) // Showing read or older circulars
      .filter(c => {
        const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.content.toLowerCase().includes(search.toLowerCase());
        const matchDept = filterDept === 'all' || c.department === filterDept;
        const matchPriority = filterPriority === 'all' || c.priority === filterPriority;
        return matchSearch && matchDept && matchPriority;
      });
  }, [circulars, search, filterDept, filterPriority]);

  const departments: Department[] = ['All', 'CSE', 'ECE', 'MECH', 'MBA', 'CIVIL', 'EEE', 'IT'];
  const priorities: (Priority | 'all')[] = ['all', 'urgent', 'informational', 'action-required'];

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading archive...</div>;
  }

  return (
    <div className="space-y-6 pb-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Archive className="w-6 h-6 text-primary" /> Archive
        </h1>
        <p className="text-sm text-muted-foreground mt-1">Browse past circulars</p>
      </motion.div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search archive..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-background/50 h-11" />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {priorities.map(p => (
              <button key={p} onClick={() => setFilterPriority(p)}
                className={`text-xs px-4 py-2 rounded-full transition-all ${filterPriority === p ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>
                {p === 'all' ? 'All Priorities' : p === 'action-required' ? 'Action' : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {departments.map(d => (
              <button key={d} onClick={() => setFilterDept(d === 'All' ? 'all' as any : d)}
                className={`text-xs px-4 py-2 rounded-full transition-all ${(filterDept === 'all' && d === 'All') || filterDept === d ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {archived.map((c, i) => <CircularCard key={c.id || i} circular={c} index={i} />)}
      </div>

      {archived.length === 0 && (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border border-dashed border-border">
          <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">No archived circulars found</p>
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
