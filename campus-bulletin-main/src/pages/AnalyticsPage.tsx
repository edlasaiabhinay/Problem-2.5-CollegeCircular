import { useState, useEffect } from 'react';
import { StatsCard } from '@/components/StatsCard';
import { BarChart3, Eye, Clock, TrendingUp, Users, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { fetchCirculars } from '@/lib/api';
import { Circular } from '@/data/sampleCirculars';

const AnalyticsPage = () => {
  const [circulars, setCirculars] = useState<Circular[]>([]);
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

  const totalCirculars = circulars.length;
  const totalRead = circulars.filter(c => c.isRead).length;
  const avgReadRate = totalCirculars > 0 ? Math.round((circulars.reduce((s, c) => s + (c.readBy.length / Math.max(c.totalRecipients, 1)), 0) / totalCirculars) * 100) : 0;
  const totalRecipients = circulars.reduce((s, c) => s + c.totalRecipients, 0);
  const totalReaders = circulars.reduce((s, c) => s + (c.readBy?.length || 0), 0);
  const reachPct = totalRecipients > 0 ? Math.round((totalReaders / totalRecipients) * 100) : 0;

  const depts = ['CSE', 'ECE', 'MECH', 'MBA', 'CIVIL', 'EEE', 'IT'];
  const deptData = depts.map(d => ({
    dept: d,
    count: circulars.filter(c => c.department === d).length,
  }));

  const priorityData = [
    { name: 'Urgent', value: circulars.filter(c => c.priority === 'urgent').length, color: 'hsl(335, 100%, 86%)' },
    { name: 'Info', value: circulars.filter(c => c.priority === 'informational').length, color: 'hsl(207, 100%, 83%)' },
    { name: 'Action', value: circulars.filter(c => c.priority === 'action-required').length, color: 'hsl(270, 60%, 85%)' },
  ];

  if (loading) {
    return <div className="flex items-center justify-center min-h-[400px]">Loading analytics...</div>;
  }

  return (
    <div className="space-y-6 pb-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">Circular engagement insights</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatsCard title="Total Circulars" value={totalCirculars} icon={<FileText className="w-5 h-5 text-primary-foreground" />} />
        <StatsCard title="Reach" value={`${reachPct}%`} icon={<Users className="w-5 h-5 text-primary-foreground" />} trend="+5%" />
        <StatsCard title="Avg Read Rate" value={`${avgReadRate}%`} icon={<Eye className="w-5 h-5 text-primary-foreground" />} />
        <StatsCard title="Avg Read Time" value="2.4m" icon={<Clock className="w-5 h-5 text-primary-foreground" />} subtitle="Average time to read" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card-strong p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-4 h-4" /> Circulars by Department
          </h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData}>
                <XAxis dataKey="dept" tick={{ fontSize: 11, fill: 'hsl(215, 15%, 50%)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'hsl(215, 15%, 50%)' }} axisLine={false} tickLine={false} width={30} />
                <Tooltip contentStyle={{ background: 'hsl(0 0% 100% / 0.9)', border: '1px solid hsl(210 30% 90%)', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(207, 100%, 83%)" />
                    <stop offset="100%" stopColor="hsl(335, 100%, 86%)" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card-strong p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Priority Distribution
          </h3>
          <div className="h-[220px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={priorityData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" strokeWidth={0}>
                  {priorityData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'hsl(0 0% 100% / 0.9)', border: '1px solid hsl(210 30% 90%)', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            {priorityData.map(p => (
              <div key={p.name} className="flex items-center gap-1.5 text-xs text-muted-foreground whitespace-nowrap">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                {p.name} ({p.value})
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
