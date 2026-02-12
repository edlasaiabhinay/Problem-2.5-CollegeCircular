import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bold, Italic, List, Heading, Paperclip, Send, Clock, PenTool, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { createCircular } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';

const templates = ['Custom', 'Exam Notice', 'Event Notice', 'Fee Notice'];

const CreateCircular = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState('informational');
  const [department, setDepartment] = useState('All');
  const [year, setYear] = useState('All');
  const [template, setTemplate] = useState('Custom');
  const [schedule, setSchedule] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Publishing circular:', { title, priority, department, year });

    if (!title || !content) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const response = await createCircular({
        title,
        content,
        priority,
        department,
        year,
        author: user?.name || 'Admin',
        totalRecipients: 100,
      });
      console.log('Circular published successfully:', response.data);
      toast.success('Circular published successfully!');
      navigate('/admin');
    } catch (err: any) {
      console.error('Failed to publish circular:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to publish circular. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const loadTemplate = (t: string) => {
    setTemplate(t);
    if (t === 'Exam Notice') {
      setTitle('End Semester Examination Schedule');
      setContent('All students are hereby informed that the end semester examinations will commence from...');
      setPriority('urgent');
    } else if (t === 'Event Notice') {
      setTitle('');
      setContent('We are pleased to announce...');
      setPriority('informational');
    } else if (t === 'Fee Notice') {
      setTitle('Fee Payment Reminder');
      setContent('Students are reminded that the last date for fee payment is...');
      setPriority('action-required');
    } else {
      setTitle('');
      setContent('');
      setPriority('informational');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-foreground">Create Circular</h1>
        <p className="text-sm text-muted-foreground mt-1">Compose and publish a new circular</p>
      </motion.div>

      <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 no-scrollbar">
        {templates.map(t => (
          <button key={t} onClick={() => loadTemplate(t)}
            className={`text-xs px-4 py-2 rounded-full transition-all whitespace-nowrap ${template === t ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-md' : 'bg-muted text-muted-foreground hover:bg-accent'}`}>
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="glass-card-strong p-4 sm:p-6 space-y-5">
        <div className="space-y-1.5">
          <Label className="text-foreground">Title</Label>
          <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter circular title" className="bg-background/50 h-11" />
        </div>

        <div className="space-y-1.5">
          <Label className="text-foreground">Content</Label>
          <div className="border border-border rounded-lg overflow-hidden focus-within:ring-1 focus-within:ring-primary/30 transition-all">
            <div className="flex items-center gap-1 p-2 bg-muted/30 border-b border-border overflow-x-auto no-scrollbar">
              {[Bold, Italic, Heading, List].map((Icon, i) => (
                <button key={i} type="button" className="p-2 rounded hover:bg-accent transition-colors flex-shrink-0">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </button>
              ))}
            </div>
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Write your circular content..."
              className="border-0 min-h-[150px] sm:min-h-[250px] bg-background/30 focus-visible:ring-0 resize-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1.5">
            <Label className="text-foreground">Priority</Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="bg-background/50 h-10">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgent">🔴 Urgent</SelectItem>
                <SelectItem value="informational">🔵 Informational</SelectItem>
                <SelectItem value="action-required">🟣 Action Required</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-foreground">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger className="bg-background/50 h-10">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {['All', 'CSE', 'ECE', 'MECH', 'MBA', 'CIVIL', 'EEE', 'IT'].map(d => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label className="text-foreground">Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="bg-background/50 h-10">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {['1', '2', '3', '4', 'All'].map(y => (
                  <SelectItem key={y} value={y}>{y === 'All' ? 'All' : `${y}${y === '1' ? 'st' : y === '2' ? 'nd' : y === '3' ? 'rd' : 'th'} Year`}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" className="gap-2 text-foreground border-border hover:bg-accent flex-1 sm:flex-none">
            <Paperclip className="w-4 h-4" /> Attach
          </Button>
          <Button type="button" variant="outline" size="sm" className="gap-2 text-foreground border-border hover:bg-accent flex-1 sm:flex-none" onClick={() => setSchedule(!schedule)}>
            <Clock className="w-4 h-4" /> {schedule ? 'Cancel' : 'Schedule'}
          </Button>
          <Button type="button" variant="outline" size="sm" className="gap-2 text-foreground border-border hover:bg-accent w-full sm:w-auto">
            <PenTool className="w-4 h-4" /> Signature
          </Button>
        </div>

        {schedule && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-1.5 overflow-hidden">
            <Label className="text-foreground">Schedule Date & Time</Label>
            <Input type="datetime-local" className="bg-background/50 w-full sm:w-auto h-10" />
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button type="submit" disabled={loading} className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90 gap-2 h-11 flex-1 order-1 sm:order-2">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            Publish Circular
          </Button>
          <Button type="button" variant="outline" className="text-foreground border-border hover:bg-accent h-11 flex-1 order-2 sm:order-1">
            Save as Draft
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateCircular;
