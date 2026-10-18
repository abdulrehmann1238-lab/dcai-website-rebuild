import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStaff } from '../../state/StaffContext';
import { LayoutPanelLeft, FileSpreadsheet, BarChart3, Database, Eye, X, Check, Sparkles } from 'lucide-react';

export const StaffPill: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSamplePillDismissed, setSamplePillDismissed] = useState(() => {
    try {
      return sessionStorage.getItem('dcai_sample_dismissed') === 'true';
    } catch {
      return false;
    }
  });

  const { isBlockMapActive, toggleBlockMap, startTour } = useStaff();

  const dismissSamplePill = () => {
    setSamplePillDismissed(true);
    try {
      sessionStorage.setItem('dcai_sample_dismissed', 'true');
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* Bottom-Left: Sample Data Prototype Pill */}
      {!isSamplePillDismissed && (
        <div className="fixed bottom-4 left-4 z-[60] flex items-center gap-2 px-3 py-1.5 bg-surface/95 border border-line shadow-sh-2 rounded-pill text-xs text-ink-2 backdrop-blur-sm animate-fade-in">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[11px]">Prototype · sample data</span>
          <button
            onClick={dismissSamplePill}
            className="p-0.5 rounded hover:bg-paper text-ink-3 hover:text-ink transition-colors ml-1"
            title="Dismiss notice"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Bottom-Right: Staff View Pill & Popover */}
      <div className="fixed bottom-4 right-4 z-[75]">
        {isOpen && (
          <div className="absolute bottom-12 right-0 w-72 bg-dark-ground text-dark-ink border border-accent/40 rounded-lg shadow-sh-3 p-3.5 mb-2 animate-slide-up text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-dark-ink2/20 pb-2">
              <div className="flex items-center gap-2">
                <LayoutPanelLeft className="w-4 h-4 text-accent" />
                <span className="font-semibold text-dark-ink">CMS Staff Simulation</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-dark-ink2 hover:text-dark-ink p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Block Map Toggle (Wow Moment #1) */}
            <div className="flex items-center justify-between p-2 rounded bg-black/30 border border-white/5">
              <div>
                <div className="font-semibold text-dark-ink">Gutenberg Block Map</div>
                <div className="text-[10px] text-dark-ink2">1:1 visual section outlines</div>
              </div>
              <button
                onClick={toggleBlockMap}
                className={`w-10 h-5 flex items-center rounded-pill p-0.5 transition-colors ${
                  isBlockMapActive ? 'bg-accent' : 'bg-dark-ink2/40'
                }`}
                aria-label="Toggle Block Map"
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                    isBlockMapActive ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Guided Tour Trigger */}
            <button
              onClick={() => {
                setIsOpen(false);
                startTour();
              }}
              className="w-full flex items-center justify-between p-2 rounded bg-accent/15 border border-accent/40 text-accent-tint hover:bg-accent/25 transition-colors text-left"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span className="font-medium">Take the 90-Second Tour</span>
              </div>
              <span className="text-[10px] font-mono">Start →</span>
            </button>

            {/* Staff Quick Links */}
            <div className="space-y-1 pt-1 border-t border-dark-ink2/20">
              <Link
                to="/staff/import"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 text-dark-ink transition-colors"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-accent" />
                <span>Master CSV Import Wizard</span>
              </Link>
              <Link
                to="/staff/products"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 text-dark-ink transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-status-info" />
                <span>Product Schema & Edit Panel</span>
              </Link>
              <Link
                to="/staff/analytics"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 text-dark-ink transition-colors"
              >
                <BarChart3 className="w-3.5 h-3.5 text-status-success" />
                <span>Live Analytics Dashboard</span>
              </Link>
              <Link
                to="/staff/assets"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/10 text-dark-ink transition-colors"
              >
                <Database className="w-3.5 h-3.5 text-secondary" />
                <span>DAM & Permanent URLs (31.4 GB)</span>
              </Link>
            </div>
          </div>
        )}

        {/* The Trigger Pill Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-pill shadow-sh-2 transition-all font-mono text-xs ${
            isOpen || isBlockMapActive
              ? 'bg-accent text-paper ring-2 ring-accent/30'
              : 'bg-dark-ground text-dark-ink hover:bg-dark-ground/90'
          }`}
        >
          <LayoutPanelLeft className="w-4 h-4 text-accent-tint" />
          <span className="font-semibold">Staff view</span>
          {isBlockMapActive && (
            <span className="w-2 h-2 rounded-full bg-status-success" title="Block Map Active" />
          )}
        </button>
      </div>
    </>
  );
};
