import React from 'react';
import { useStaff } from '../../state/StaffContext';

interface BlockFrameProps {
  block: string;
  type: 'Static' | 'Dynamic' | 'Hybrid';
  source?: string;
  className?: string;
  id?: string;
  children: React.ReactNode;
}

export const BlockFrame: React.FC<BlockFrameProps> = ({
  block,
  type,
  source = 'WordPress Gutenberg / ACF',
  className = '',
  id,
  children
}) => {
  const { isBlockMapActive } = useStaff();

  return (
    <section
      id={id}
      data-block={block}
      data-type={type}
      data-source={source}
      className={`relative ${className}`}
    >
      {isBlockMapActive && (
        <div className="absolute top-2 left-2 z-40 flex items-center gap-2 px-2.5 py-1 bg-dark-ground text-dark-ink border border-accent/80 rounded font-mono text-[11px] shadow-sh-2 pointer-events-auto">
          <span className="font-semibold text-accent">{block}</span>
          <span className="text-dark-ink2">·</span>
          <span>{type}</span>
          <span className="text-dark-ink2">·</span>
          <span className="text-accent-tint">{source}</span>
        </div>
      )}
      {children}
    </section>
  );
};
