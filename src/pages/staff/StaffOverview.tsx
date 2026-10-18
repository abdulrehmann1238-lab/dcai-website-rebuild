import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../../state/DataContext';
import { useToast } from '../../state/ToastContext';
import {
  Package,
  FileSpreadsheet,
  FileText,
  Database,
  ArrowRight,
  Plus,
  CheckCircle2,
  X
} from 'lucide-react';

export const StaffOverview: React.FC = () => {
  const { products, resources, addResource } = useData();
  const { addToast } = useToast();

  const [isAddResourceOpen, setIsAddResourceOpen] = useState(false);
  const [newResource, setNewResource] = useState({
    title: '',
    contentType: 'Guide' as const,
    audienceTag: 'Consultant' as const,
    verticalTag: 'Residential' as const,
    summary: '',
    paragraphs: ''
  });

  const handleAddResourceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newResource.title.trim() || !newResource.summary.trim()) {
      addToast('Please fill in both title and summary.', 'error');
      return;
    }

    const created = {
      id: newResource.title.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(0, 30),
      title: newResource.title,
      contentType: newResource.contentType,
      audienceTag: newResource.audienceTag,
      verticalTag: newResource.verticalTag,
      summary: newResource.summary,
      content: newResource.paragraphs ? newResource.paragraphs.split('\n\n') : [newResource.summary],
      publishDate: new Date().toISOString().split('T')[0]
    };

    addResource(created);
    setIsAddResourceOpen(false);
    addToast(`Resource "${created.title}" published to public site!`, 'success');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Overview Heading */}
      <div className="space-y-1">
        <div className="text-xs font-mono text-ink-3">Staff Overview</div>
        <h1 className="font-serif-display text-2xl sm:text-3xl text-ink font-medium">
          What your team can update without a developer
        </h1>
        <p className="text-xs text-ink-2 max-w-xl">
          The DCAI WordPress rebuild is structured so routine product launches, datasheet replacements, and case study publishing require zero engineering hours.
        </p>
      </div>

      {/* 4 Task Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Task 1: Update a product */}
        <Link
          to="/staff/products"
          className="p-6 rounded-lg bg-surface border border-line hover:border-primary hover:shadow-sh-1 transition-all group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-9 h-9 rounded bg-paper border border-line flex items-center justify-center text-primary group-hover:bg-primary-tint transition-colors">
              <Package className="w-4 h-4" />
            </div>
            <h3 className="font-serif-display text-lg font-medium text-ink group-hover:text-primary">
              Update Product Status or Specs
            </h3>
            <p className="text-xs text-ink-2 leading-relaxed">
              Edit ACF specifications, mark products Discontinued, or adjust technical wiring notes live.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-line flex items-center justify-between text-xs font-mono text-primary font-medium">
            <span>Manage Products ({products.length})</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Task 2: Import CSV */}
        <Link
          to="/staff/import"
          className="p-6 rounded-lg bg-surface border border-line hover:border-primary hover:shadow-sh-1 transition-all group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-9 h-9 rounded bg-paper border border-line flex items-center justify-center text-accent group-hover:bg-accent-tint transition-colors">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
            <h3 className="font-serif-display text-lg font-medium text-ink group-hover:text-primary">
              Run Master CSV Import
            </h3>
            <p className="text-xs text-ink-2 leading-relaxed">
              Bulk ingest 800+ products via WP All Import. Updates matching MPNs automatically.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-line flex items-center justify-between text-xs font-mono text-primary font-medium">
            <span>Open Import Wizard</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>

        {/* Task 3: Add a Resource */}
        <div
          onClick={() => setIsAddResourceOpen(true)}
          className="p-6 rounded-lg bg-surface border border-line hover:border-primary hover:shadow-sh-1 transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-9 h-9 rounded bg-paper border border-line flex items-center justify-center text-secondary group-hover:bg-primary-tint transition-colors">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-serif-display text-lg font-medium text-ink group-hover:text-primary">
              Publish New Resource / Case Study
            </h3>
            <p className="text-xs text-ink-2 leading-relaxed">
              Create an architectural case study or contractor guide that instantly renders across solutions pages.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-line flex items-center justify-between text-xs font-mono text-primary font-medium">
            <span>Add Resource Document</span>
            <Plus className="w-3.5 h-3.5 group-hover:scale-125 transition-transform" />
          </div>
        </div>

        {/* Task 4: Replace Datasheet / Assets */}
        <Link
          to="/staff/assets"
          className="p-6 rounded-lg bg-surface border border-line hover:border-primary hover:shadow-sh-1 transition-all group flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="w-9 h-9 rounded bg-paper border border-line flex items-center justify-center text-status-info group-hover:bg-primary-tint transition-colors">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="font-serif-display text-lg font-medium text-ink group-hover:text-primary">
              Inspect Asset Storage (DAM)
            </h3>
            <p className="text-xs text-ink-2 leading-relaxed">
              Review permanent file URLs, storage consumption (31.4 GB / 100 GB), and Philippine CDN delivery.
            </p>
          </div>
          <div className="pt-4 mt-4 border-t border-line flex items-center justify-between text-xs font-mono text-primary font-medium">
            <span>Inspect Asset Meter</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>

      {/* Add Resource Drawer Modal */}
      {isAddResourceOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-ground/80 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-lg w-full bg-elevated rounded-lg shadow-sh-3 border border-line p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-serif-display text-lg text-ink font-medium">Publish New Technical Resource</h3>
              <button onClick={() => setIsAddResourceOpen(false)} className="p-1 rounded text-ink-3 hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddResourceSubmit} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-ink">Document Title *</label>
                <input
                  type="text"
                  value={newResource.title}
                  onChange={e => setNewResource({ ...newResource, title: e.target.value })}
                  placeholder="e.g. DALI-2 Driver Selection for High-Bay Atriums"
                  className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="font-semibold text-ink">Content Type</label>
                  <select
                    value={newResource.contentType}
                    onChange={e => setNewResource({ ...newResource, contentType: e.target.value as any })}
                    className="w-full px-2 py-1.5 text-xs rounded bg-paper border border-line text-ink"
                  >
                    <option value="Guide">Guide</option>
                    <option value="Case Study">Case Study</option>
                    <option value="Article">Article</option>
                    <option value="Technical Manual">Technical Manual</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-ink">Target Audience</label>
                  <select
                    value={newResource.audienceTag}
                    onChange={e => setNewResource({ ...newResource, audienceTag: e.target.value as any })}
                    className="w-full px-2 py-1.5 text-xs rounded bg-paper border border-line text-ink"
                  >
                    <option value="Consultant">Consultant</option>
                    <option value="Dealer">Dealer</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-ink">Vertical</label>
                  <select
                    value={newResource.verticalTag}
                    onChange={e => setNewResource({ ...newResource, verticalTag: e.target.value as any })}
                    className="w-full px-2 py-1.5 text-xs rounded bg-paper border border-line text-ink"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-ink">Summary / Deck *</label>
                <textarea
                  rows={2}
                  value={newResource.summary}
                  onChange={e => setNewResource({ ...newResource, summary: e.target.value })}
                  placeholder="1-2 sentences summarizing the engineering takeaway…"
                  className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-line">
                <button
                  type="button"
                  onClick={() => setIsAddResourceOpen(false)}
                  className="px-3 py-1.5 rounded border border-line text-ink hover:bg-paper font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-primary text-paper font-medium hover:bg-primary-hover"
                >
                  Publish to Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
