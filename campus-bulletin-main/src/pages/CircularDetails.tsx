import { useParams, useNavigate } from 'react-router-dom';
import { sampleCirculars } from '@/data/sampleCirculars';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Download, Clock, User, Paperclip, MessageSquare, Send, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const priorityStyles: Record<string, string> = {
  urgent: 'priority-urgent',
  informational: 'priority-informational',
  'action-required': 'priority-action-required',
};

const CircularDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const circular = sampleCirculars.find(c => c.id === id);

  if (!circular) return <div className="text-center py-12 text-muted-foreground">Circular not found</div>;

  const date = new Date(circular.publishedAt);
  const readPercentage = Math.round((circular.readBy.length / Math.max(circular.totalRecipients, 1)) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`glass-card-strong p-6 ${priorityStyles[circular.priority]}`}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <Badge variant="outline" className="mb-2 text-[10px]">
              {circular.priority === 'urgent' ? '🔴 Urgent' : circular.priority === 'informational' ? '🔵 Info' : '🟣 Action Required'}
            </Badge>
            <h1 className="text-xl font-bold text-foreground">{circular.title}</h1>
          </div>
          <Badge variant="outline" className="bg-accent/50 text-xs">{circular.department}</Badge>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
          <span className="flex items-center gap-1"><User className="w-3 h-3" /> {circular.author}</span>
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>Year: {circular.year}</span>
          <span>v{circular.version}</span>
        </div>

        <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed">
          <p>{circular.content}</p>
        </div>

        {circular.attachments.length > 0 && (
          <div className="mt-6 pt-4 border-t border-border/30">
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Paperclip className="w-4 h-4" /> Attachments
            </h3>
            <div className="flex flex-wrap gap-2">
              {circular.attachments.map((a, i) => (
                <Button key={i} variant="outline" size="sm" className="gap-2 text-xs text-foreground border-border hover:bg-accent">
                  <Download className="w-3 h-3" /> {a.name} ({a.size})
                </Button>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {user?.role === 'admin' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="glass-card p-5">
          <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
            <Eye className="w-4 h-4" /> Read Tracking
          </h3>
          <div className="flex items-center gap-4 mb-3">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all" style={{ width: `${readPercentage}%` }} />
            </div>
            <span className="text-sm font-medium text-foreground">{readPercentage}%</span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">{circular.readBy.length} of {circular.totalRecipients} recipients have read</p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {circular.readBy.map((r, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1.5 px-2 rounded bg-muted/30">
                <span className="flex items-center gap-2 text-foreground"><Eye className="w-3 h-3 text-primary" /> {r.name}</span>
                <span className="text-muted-foreground">{new Date(r.readAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            ))}
            {circular.readBy.length === 0 && <p className="text-xs text-muted-foreground flex items-center gap-2"><EyeOff className="w-3 h-3" /> No reads yet</p>}
          </div>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4" /> Comments ({circular.comments.length})
        </h3>
        <div className="space-y-3 mb-4">
          {circular.comments.map(c => (
            <div key={c.id} className="p-3 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-medium text-foreground">{c.author}</span>
                <Badge variant="outline" className="text-[9px] capitalize">{c.role}</Badge>
                <span className="text-[10px] text-muted-foreground">{new Date(c.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <p className="text-xs text-foreground/80">{c.content}</p>
            </div>
          ))}
          {circular.comments.length === 0 && <p className="text-xs text-muted-foreground">No comments yet. Be the first to comment!</p>}
        </div>
        <div className="flex gap-2">
          <Input value={comment} onChange={e => setComment(e.target.value)} placeholder="Write a comment..." className="bg-background/50 text-sm" />
          <Button size="sm" className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-90">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default CircularDetails;
