import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: string;
  className?: string;
}

export function StatsCard({ title, value, subtitle, icon, trend, className = '' }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass-card p-4 ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
          {icon}
        </div>
        {trend && (
          <span className="text-[11px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{title}</p>
      {subtitle && <p className="text-[11px] text-muted-foreground/70 mt-1">{subtitle}</p>}
    </motion.div>
  );
}
