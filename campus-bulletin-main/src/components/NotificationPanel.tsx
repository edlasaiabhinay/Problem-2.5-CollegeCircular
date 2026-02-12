import { X, Bell, AlertTriangle, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Circular } from '@/data/sampleCirculars';

interface NotificationPanelProps {
  circulars: Circular[];
  onClose: () => void;
}

export function NotificationPanel({ circulars, onClose }: NotificationPanelProps) {
  const unreadCirculars = circulars.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      className="absolute top-2 right-4 w-[calc(100vw-32px)] sm:w-80 z-50 glass-card-strong rounded-2xl shadow-2xl border border-primary/20 overflow-hidden origin-top-right"
    >
      <div className="flex items-center justify-between p-4 bg-muted/30 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/20 rounded-lg">
            <Bell className="w-4 h-4 text-primary" />
          </div>
          <h3 className="font-bold text-sm text-foreground">Notifications</h3>
          {circulars.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-secondary text-[10px] font-bold text-white shadow-sm">
              {circulars.length}
            </span>
          )}
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-accent transition-colors active:scale-90">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="max-h-[70vh] sm:max-h-96 overflow-y-auto no-scrollbar">
        {unreadCirculars.map((c) => (
          <div key={c.id} className="p-4 border-b border-border/30 hover:bg-primary/5 transition-all cursor-pointer group">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl mt-0.5 transition-colors group-hover:scale-110 ${c.priority === 'urgent' ? 'bg-urgent/20 shadow-[0_0_10px_rgba(255,107,157,0.2)]' : 'bg-informational/20'}`}>
                {c.priority === 'urgent' ? (
                  <AlertTriangle className="w-4 h-4 text-urgent-foreground" />
                ) : (
                  <Info className="w-4 h-4 text-informational-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">{c.title}</p>
                <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                  {new Date(c.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {unreadCirculars.length === 0 && (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-border">
              <Bell className="w-8 h-8 text-muted-foreground/30" />
            </div>
            <p className="text-xs font-bold text-foreground">You're all caught up!</p>
            <p className="text-[11px] text-muted-foreground mt-1">No new circulars to display at the moment.</p>
          </div>
        )}
      </div>
      {unreadCirculars.length > 0 && (
        <div className="p-3 bg-muted/20 text-center border-t border-border/30">
          <button className="text-[11px] font-bold text-primary hover:underline">View All Notifications</button>
        </div>
      )}
    </motion.div>
  );
}
