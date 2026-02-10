'use client';

import { ReactNode, Children, cloneElement, isValidElement } from 'react';

interface StepsProps {
  children: ReactNode;
}

interface StepProps {
  title: string;
  children: ReactNode;
  stepNumber?: number;
}

export function Step({ title, children, stepNumber }: StepProps) {
  // Generate ID from title for TOC
  const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  
  return (
    <div className="relative pl-8 pb-8 last:pb-0 group">
      {/* Vertical line */}
      <div className="absolute left-[11px] top-8 bottom-0 w-[2px] bg-gradient-to-b from-cucumber-green/50 to-transparent last:hidden transition-colors duration-300 group-hover:from-cucumber-green/70" />

      {/* Step number circle */}
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-cucumber-green/20 border-2 border-cucumber-green flex items-center justify-center transition-all duration-300 group-hover:bg-cucumber-green/30 group-hover:scale-110">
        <div className="w-2 h-2 rounded-full bg-cucumber-green transition-all duration-300 group-hover:w-2.5 group-hover:h-2.5" />
      </div>

      <div>
        <h3 id={id} className="text-lg font-semibold text-white mb-3 transition-colors duration-300 group-hover:text-cucumber-green">{title}</h3>
        <div className="text-zinc-400 text-sm leading-relaxed space-y-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function Steps({ children }: StepsProps) {
  const childrenArray = Children.toArray(children);
  
  return (
    <div className="my-8 space-y-0">
      {childrenArray.map((child, index) => {
        if (isValidElement<StepProps>(child) && child.type === Step) {
          return cloneElement(child, {
            key: `step-${index}`,
            stepNumber: index + 1
          });
        }
        return child;
      })}
    </div>
  );
}
