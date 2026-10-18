import React from 'react';
import { useToast } from '../../state/ToastContext';
import { damUrl } from '../../lib/damUrl';
import {
  Database,
  HardDrive,
  Copy,
  Check,
  FolderTree,
  ExternalLink,
  ShieldCheck,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

export const StaffAssets: React.FC = () => {
  const { addToast } = useToast();

  const totalCapacityGb = 100;
  const usedGb = 31.4;
  const pctUsed = Math.round((usedGb / totalCapacityGb) * 100);

  const breakdown = [
    { label: 'Product Photography & SVG Visuals', size: '14.2 GB', pct: 45, color: 'bg-primary' },
    { label: 'Engineering Datasheets (PDF)', size: '6.1 GB', pct: 20, color: 'bg-accent' },
    { label: 'Commissioning & ETS Manuals', size: '8.9 GB', pct: 28, color: 'bg-secondary' },
    { label: 'Brand Vector Guidelines & CAD', size: '2.2 GB', pct: 7, color: 'bg-ink-3' },
  ];

  const sampleUrl = damUrl('products/halden/knx/hld-kx-4412/datasheet.pdf');

  const copyUrl = () => {
    navigator.clipboard?.writeText(sampleUrl);
    addToast('Sample permanent DAM URL copied.', 'info');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Title */}
      <div className="space-y-1">
        <div className="text-xs font-mono text-ink-3">Staff &bull; Digital Asset Management</div>
        <h1 className="font-serif-display text-2xl sm:text-3xl text-ink font-medium">
          Digital Asset Storage &bull; Permanent URL Infrastructure
        </h1>
        <p className="text-xs text-ink-2">
          Offloading heavy PDFs, CAD drawings, and imagery from the WordPress database onto object storage with permanent CDN edge caching.
        </p>
      </div>

      {/* Storage Capacity Bar (31.4 GB / 100 GB) */}
      <div className="p-6 rounded-xl bg-surface border border-line shadow-sh-1 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HardDrive className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm text-ink">Storage Meter</span>
          </div>
          <div className="font-mono text-xs">
            <strong className="text-ink text-base">{usedGb} GB</strong>
            <span className="text-ink-3"> / {totalCapacityGb} GB allocated ({pctUsed}% capacity)</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 rounded-full bg-line overflow-hidden flex">
          {breakdown.map((item, i) => (
            <div
              key={item.label}
              className={`h-full ${item.color} transition-all`}
              style={{ width: `${item.pct * (pctUsed / 100)}%` }}
              title={`${item.label}: ${item.size}`}
            />
          ))}
        </div>

        {/* Breakdown items */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {breakdown.map(item => (
            <div key={item.label} className="p-2.5 rounded bg-paper border border-line space-y-1">
              <div className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="font-mono text-xs font-bold text-ink">{item.size}</span>
              </div>
              <div className="text-[10px] text-ink-3 truncate leading-snug">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Folder Convention & Permanent URL Specification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-surface border border-line shadow-sh-1 space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs">
            <FolderTree className="w-4 h-4 text-accent" />
            <span>Folder Directory Convention</span>
          </div>
          <p className="text-xs text-ink-2 leading-relaxed">
            All technical submittals, ETS databases, and product schematics adhere to an immutable hierarchy matching the TOR structure:
          </p>
          <div className="p-3 bg-paper rounded border border-line font-mono text-xs text-ink space-y-1">
            <div className="text-primary font-semibold">/&lcub;brand&rcub;/&lcub;protocol&rcub;/&lcub;mpn&rcub;/</div>
            <div className="text-ink-3 pl-4">&bull; datasheet.pdf</div>
            <div className="text-ink-3 pl-4">&bull; commissioning-manual.pdf</div>
            <div className="text-ink-3 pl-4">&bull; ets-database.knxprod</div>
            <div className="text-ink-3 pl-4">&bull; cad-dimensions.dxf</div>
          </div>
          <div className="text-[11px] font-mono text-ink-3">
            Guarantees no broken links across 800+ MPNs even if products are edited in CMS.
          </div>
        </div>

        <div className="p-6 rounded-xl bg-surface border border-line shadow-sh-1 space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-xs">
            <Database className="w-4 h-4 text-accent" />
            <span>Permanent URL Structure</span>
          </div>
          <p className="text-xs text-ink-2 leading-relaxed">
            Assets are referenced via permanent CDN endpoints with edge caching in Metro Manila and Singapore:
          </p>

          <div className="p-3 bg-paper rounded border border-line flex items-center justify-between gap-2">
            <span className="font-mono text-xs text-ink-2 truncate max-w-[280px]">
              {sampleUrl}
            </span>
            <button
              onClick={copyUrl}
              className="p-1.5 rounded hover:bg-surface text-primary"
              title="Copy URL"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="text-[11px] font-mono text-status-success flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>Edge latency &lt; 25 ms across Philippine telecommunications providers</span>
          </div>
        </div>
      </div>

      {/* Rationale Card (Proposal Item 6) */}
      <div className="p-6 rounded-xl bg-dark-ground text-dark-ink space-y-3 shadow-sh-2">
        <div className="text-[10px] font-mono uppercase text-accent font-semibold tracking-wider">
          Architecture Recommendation
        </div>
        <h3 className="font-serif-display text-xl text-dark-ink font-medium">
          Why Object Storage &plus; CDN for DCAI
        </h3>
        <p className="text-xs text-dark-ink2 leading-relaxed max-w-2xl">
          Storing 50 GB to 100 GB of heavy engineering PDFs and CAD files directly inside a standard WordPress <code>wp-content/uploads</code> directory inflates backup sizes, slows database backups, and degrades mobile page loading speeds.
        </p>
        <p className="text-xs text-dark-ink2 leading-relaxed max-w-2xl">
          By offloading files to S3-compatible object storage (e.g., Cloudflare R2 or Bunny Storage) connected via a permanent CDN domain, DCAI gets unlimited scalability at a fraction of cloud cost with sub-second downloads nationwide.
        </p>
      </div>
    </div>
  );
};
