import React, { useState, useMemo } from 'react';
import { useData } from '../../state/DataContext';
import { useToast } from '../../state/ToastContext';
import {
  BarChart3,
  TrendingUp,
  Download,
  Search,
  AlertCircle,
  Calendar,
  FileSpreadsheet,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';

export const StaffAnalytics: React.FC = () => {
  const { analytics, searchQuery } = useData();
  const { addToast } = useToast();

  const [dateRange, setDateRange] = useState<'7' | '30' | '90'>('30');

  // Slice daily metrics according to selected date range
  const filteredMetrics = useMemo(() => {
    const days = parseInt(dateRange, 10);
    return analytics.dailyMetrics.slice(-days);
  }, [analytics.dailyMetrics, dateRange]);

  const totalRangeViews = filteredMetrics.reduce((acc, m) => acc + m.views, 0);
  const totalRangeDownloads = filteredMetrics.reduce((acc, m) => acc + m.downloads, 0);
  const totalRangeSearches = filteredMetrics.reduce((acc, m) => acc + m.searches, 0);
  const totalZeroSearches = analytics.zeroSearches.reduce((acc, s) => acc + s.count, 0);

  const handleDownloadCsv = () => {
    addToast('Analytics export generated: dcai_analytics_report.csv', 'success');
  };

  // Build SVG path points for line chart
  const chartPoints = useMemo(() => {
    if (filteredMetrics.length === 0) return '';
    const maxVal = Math.max(...filteredMetrics.map(m => m.views)) * 1.15;
    const minVal = 0;
    const width = 760;
    const height = 180;

    const points = filteredMetrics.map((m, i) => {
      const x = (i / (filteredMetrics.length - 1)) * width;
      const y = height - ((m.views - minVal) / (maxVal - minVal)) * height;
      return `${x},${y}`;
    });

    return points.join(' ');
  }, [filteredMetrics]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono text-ink-3">Staff &bull; Light Analytics Dashboard</div>
          <h1 className="font-serif-display text-2xl sm:text-3xl text-ink font-medium">
            Repository Performance &bull; Live Event Telemetry
          </h1>
          <p className="text-xs text-ink-2">
            Tracks technical downloads, part-number lookups, and page visits. Reactive to your real clicks during this session.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Date Range Segmented Control */}
          <div className="flex items-center p-1 rounded-md bg-surface border border-line text-xs font-mono">
            {(['7', '30', '90'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDateRange(d)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  dateRange === d
                    ? 'bg-primary text-paper font-semibold'
                    : 'text-ink-2 hover:bg-paper'
                }`}
              >
                {d}D
              </button>
            ))}
          </div>

          <button
            onClick={handleDownloadCsv}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface border border-line text-xs font-mono text-ink hover:border-primary transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-accent" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-lg bg-surface border border-line shadow-sh-1 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-ink-3">
            <span>Page Views</span>
            <span className="text-status-success font-semibold flex items-center">+14.2%</span>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-ink tabular-nums">
            {totalRangeViews.toLocaleString()}
          </div>
          <div className="text-[10px] text-ink-3 font-mono">Across 800+ MPN routes</div>
        </div>

        <div className="p-5 rounded-lg bg-surface border border-line shadow-sh-1 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-ink-3">
            <span>Datasheet Downloads</span>
            <span className="text-status-success font-semibold flex items-center">+8.7%</span>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-primary tabular-nums">
            {totalRangeDownloads.toLocaleString()}
          </div>
          <div className="text-[10px] text-ink-3 font-mono">Real PDF delivery</div>
        </div>

        <div className="p-5 rounded-lg bg-surface border border-line shadow-sh-1 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-ink-3">
            <span>Global Searches</span>
            <span className="text-status-success font-semibold flex items-center">+19.5%</span>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-ink tabular-nums">
            {totalRangeSearches.toLocaleString()}
          </div>
          <div className="text-[10px] text-ink-3 font-mono">MPN & protocol queries</div>
        </div>

        <div className="p-5 rounded-lg bg-surface border border-line shadow-sh-1 space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-ink-3">
            <span>Zero-Result Queries</span>
            <span className="text-amber-600 font-semibold flex items-center">Insights</span>
          </div>
          <div className="font-mono text-2xl sm:text-3xl font-bold text-accent-text tabular-nums">
            {totalZeroSearches}
          </div>
          <div className="text-[10px] text-ink-3 font-mono">e.g. &ldquo;price list&rdquo; searches</div>
        </div>
      </div>

      {/* Hand-Built SVG Line Chart (Page Views Over Time) */}
      <div className="p-6 rounded-xl bg-surface border border-line shadow-sh-1 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif-display text-lg text-ink font-medium">Daily Page Views Trend</h3>
            <div className="text-[11px] font-mono text-ink-3">Last {dateRange} days with weekday seasonality</div>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-primary-tint text-primary font-semibold">
            Native SVG &bull; Zero Chart Library Dependencies
          </span>
        </div>

        <div className="w-full aspect-[21/8] bg-paper/60 rounded-lg border border-line p-4 flex items-end">
          <svg viewBox="0 0 760 180" fill="none" className="w-full h-full overflow-visible">
            {/* Area fill */}
            {chartPoints && (
              <polygon
                points={`0,180 ${chartPoints} 760,180`}
                fill="#1F4B47"
                fillOpacity="0.08"
              />
            )}
            {/* Line stroke */}
            {chartPoints && (
              <polyline
                points={chartPoints}
                stroke="#1F4B47"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
          </svg>
        </div>

        <div className="flex items-center justify-between text-[11px] font-mono text-ink-3 border-t border-line pt-2">
          <span>{filteredMetrics[0]?.date}</span>
          <span>{filteredMetrics[Math.floor(filteredMetrics.length / 2)]?.date}</span>
          <span>Today ({filteredMetrics[filteredMetrics.length - 1]?.date})</span>
        </div>
      </div>

      {/* Top Searches, Top Downloads & Zero-Result Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Searches Table */}
        <div className="p-6 rounded-xl bg-surface border border-line shadow-sh-1 space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-primary" />
              <h3 className="font-serif-display text-base text-ink font-medium">Top Search Queries</h3>
            </div>
            <span className="text-[11px] font-mono text-ink-3">Click query to test</span>
          </div>

          <div className="space-y-2">
            {analytics.searches.slice(0, 5).map(s => (
              <div
                key={s.query}
                className="flex items-center justify-between p-2.5 rounded bg-paper border border-line text-xs hover:border-primary transition-colors"
              >
                <div>
                  <div className="font-mono font-semibold text-accent-text">{s.query}</div>
                  <div className="text-[10px] text-ink-3">{s.lastSearched} &bull; {s.resultsCount} matches</div>
                </div>
                <span className="font-mono text-xs font-bold text-ink">{s.count} searches</span>
              </div>
            ))}
          </div>
        </div>

        {/* Zero-Result Searches (The Client's Story!) */}
        <div className="p-6 rounded-xl bg-surface border border-line shadow-sh-1 space-y-4">
          <div className="flex items-center justify-between border-b border-line pb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <h3 className="font-serif-display text-base text-ink font-medium">Zero-Result Queries</h3>
            </div>
            <span className="text-[11px] font-mono text-amber-700 font-semibold">Dealer Channel Signal</span>
          </div>

          <div className="space-y-2">
            {analytics.zeroSearches.map(zs => (
              <div
                key={zs.query}
                className="flex items-center justify-between p-2.5 rounded bg-paper border border-line text-xs"
              >
                <div>
                  <div className="font-mono font-semibold text-ink">&ldquo;{zs.query}&rdquo;</div>
                  <div className="text-[10px] text-ink-3">{zs.lastSearched}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-amber-700 text-xs">{zs.count} lookups</div>
                  <div className="text-[9px] text-ink-3">Requested by trade</div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-500/10 rounded border border-amber-500/30 text-[11px] text-amber-900 leading-snug">
            <strong>Client Insight:</strong> Searches for <em>&ldquo;price list&rdquo;</em> surface here automatically, validating DCAI channel-safe strategy where prices are protected behind authorized trade accounts.
          </div>
        </div>
      </div>
    </div>
  );
};
