import { Circular, Priority } from '@/data/sampleCirculars';
import { useNavigate } from 'react-router-dom';
import { FileText, Paperclip, MessageSquare, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  urgent: { label: 'Urgent', className: 'bg-urgent/20 text-urgent-foreground border-urgent/30' },
  informational: { label: 'Info', className: 'bg-informational/20 text-informational-foreground border-informational/30' },
  'action-required': { label: 'Action Required', className: 'bg-action-required/20 text-action-required-foreground border-action-required/30' },
};

interface CircularCardProps {
  circular: Circular;
  index?: number;
}

export function CircularCard({ circular, index = 0 }: CircularCardProps) {
  const navigate = useNavigate();
  const priority = priorityConfig[circular.priority];
  const date = new Date(circular.publishedAt);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={() => navigate(`/circular/${circular.id}`)}
      className={`glass-card p-4 cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${
        !circular.isRead ? 'border-l-4 border-l-primary' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className={`text-sm font-semibold text-foreground line-clamp-2 ${!circular.isRead ? '' : 'opacity-80'}`}>
          {circular.title}
        </h3>
        <Badge variant="outline" className={`shrink-0 text-[10px] ${priority.className}`}>
          {priority.label}
        </Badge>
      </div>

      <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{circular.content}</p>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
          </span>
          {circular.attachments.length > 0 && (
            <span className="flex items-center gap-1">
              <Paperclip className="w-3 h-3" />
              {circular.attachments.length}
            </span>
          )}
          {circular.comments.length > 0 && (
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {circular.comments.length}
            </span>
          )}
        </div>
        <Badge variant="outline" className="text-[10px] bg-accent/50">
          {circular.department}
        </Badge>
      </div>

      {!circular.isRead && (
        <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-secondary" />
      )}
    </motion.div>
  );
}
