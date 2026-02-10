'use client';

import { ReactNode } from 'react';
import { Info, AlertTriangle, CheckCircle, XCircle, Lightbulb } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'success' | 'error' | 'tip';
  title?: string;
  children: ReactNode;
}

const calloutStyles = {
  info: {
    icon: Info,
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/50',
    iconColor: 'text-blue-500',
    titleColor: 'text-blue-400',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/50',
    iconColor: 'text-yellow-500',
    titleColor: 'text-yellow-400',
  },
  success: {
    icon: CheckCircle,
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/50',
    iconColor: 'text-green-500',
    titleColor: 'text-green-400',
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/50',
    iconColor: 'text-red-500',
    titleColor: 'text-red-400',
  },
  tip: {
    icon: Lightbulb,
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/50',
    iconColor: 'text-purple-500',
    titleColor: 'text-purple-400',
  },
};

export default function Callout({ type = 'info', title, children }: CalloutProps) {
  const style = calloutStyles[type];
  const Icon = style.icon;

  return (
    <div className={`my-6 p-4 rounded-md border ${style.borderColor} ${style.bgColor} backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:${style.borderColor.replace('/50', '/70')}`}>
      <div className="flex gap-3">
        <Icon className={`h-5 w-5 ${style.iconColor} flex-shrink-0 mt-0.5 transition-transform duration-300 hover:scale-110`} />
        <div className="flex-1">
          {title && (
            <h4 className={`font-semibold mb-2 ${style.titleColor} transition-colors duration-200`}>
              {title}
            </h4>
          )}
          <div className="text-zinc-300 text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
