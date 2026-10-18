import React, { useState, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../state/DataContext';
import { useToast } from '../state/ToastContext';
import { Resource } from '../data/resources';
import { BlockFrame } from '../components/layout/BlockFrame';
import { downloadSamplePdf } from '../lib/pdf';
import {
  BookOpen,
  Wrench,
  Search,
  Filter,
  Download,
  FileText,
  X,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  RotateCcw
} from 'lucide-react';

export const ResourceDashboard: React.FC = () => {
  const { audience } = useParams<{ audience: string }>();
  const { resources, trackDownload } = useData();
  const { addToast } = useToast();

  const isConsultant = audience?.toLowerCase() === 'consultants';
  const isDealer = audience?.toLowerCase() === 'dealers';

  const [activeType, setActiveType] = useState<string>('all');
  const [activeVertical, setActiveVertical] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  if (!isConsultant && !isDealer) {
    return <Navigate to="/resources" replace />;
  }

  const audienceTag = isConsultant ? 'Consultant' : 'Dealer';

  // Base resources for this audience
  const audienceResources = useMemo(() => {
    return resources.filter(r => r.audienceTag === audienceTag);
  }, [resources, audienceTag]);

  // Featured items (top 2)
  const featuredResources = audienceResources.slice(0, 2);

  // Filtered and sorted resources
  const filteredResources = useMemo(() => {
    let result = audienceResources;

    if (activeType !== 'all') {
      result = result.filter(r => r.contentType === activeType);
    }

    if (activeVertical !== 'all') {
      result = result.filter(r => r.verticalTag.toLowerCase() === activeVertical.toLowerCase());
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      result = result.filter(r => r.title.toLowerCase().includes(q) || r.summary.toLowerCase().includes(q));
    }

    return [...result].sort((a, b) => {
      const timeA = new Date(a.publishDate).getTime();
      const timeB = new Date(b.publishDate).getTime();
      return sortBy === 'newest' ? timeB - timeA : timeA - timeB;
    });
  }, [audienceResources, activeType, activeVertical, searchQuery, sortBy]);

  const handleDownload = (res: Resource) => {
    downloadSamplePdf(res.id, res.title);
    trackDownload(res.id, res.title, res.contentType);
    addToast(`${res.title} downloaded.`, 'success');
  };

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* 1. dcai/page-header */}
      <BlockFrame
        block="dcai/page-header"
        type="Static"
        source="Audience-Specific Header Template"
        className="space-y-4 max-w-3xl border-b border-line pb-8"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-ink-3 mb-2">
          <Link to="/home" className="hover:text-ink">Home</Link>
          <span>/</span>
          <Link to="/resources" className="hover:text-ink">Resources</Link>
          <span>/</span>
          <span className="text-ink font-semibold">{isConsultant ? 'Consultants & Designers' : 'Dealers & Installers'}</span>
        </div>

        <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
          {isConsultant ? <BookOpen className="w-4 h-4 text-accent" /> : <Wrench className="w-4 h-4 text-accent" />}
          <span>{isConsultant ? 'Consultant Specification Dashboard' : 'Dealer Technical Hub'}</span>
        </div>

        <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight">
          {isConsultant
            ? 'Specification guides, case studies & design checklists.'
            : 'Field commissioning manuals, ETS databases & wiring schematics.'}
        </h1>

        <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
          {isConsultant
            ? 'Prepared to assist MEP engineers, architects, and interior designers in evaluating smart automation protocols, avoiding dimming flicker, and structuring tender specifications.'
            : 'Direct technical repository for certified system integrators. Includes ETS application databases, BACnet MSTP token diagnostics, and training workshop schedules.'}
        </p>
      </BlockFrame>

      {/* 2. dcai/featured-content (Featured 2 Cards) */}
      <BlockFrame
        block="dcai/featured-content"
        type="Dynamic"
        source="Curated Audience Featured Assets"
        className="space-y-4"
      >
        <div className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold">
          Featured {isConsultant ? 'Case Studies & Guides' : 'Technical Manuals'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredResources.map(res => (
            <div
              key={res.id}
              className="p-6 sm:p-8 rounded-lg bg-surface border border-line shadow-sh-1 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-ink-3">
                  <span className="px-2 py-0.5 rounded bg-primary-tint text-primary font-bold uppercase">
                    {res.contentType}
                  </span>
                  <span>{res.publishDate}</span>
                </div>

                <h3 className="font-serif-display text-xl sm:text-2xl text-ink font-medium leading-snug">
                  {res.title}
                </h3>

                <p className="text-xs text-ink-2 leading-relaxed">
                  {res.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-line flex items-center justify-between">
                <button
                  onClick={() => setSelectedResource(res)}
                  className="text-xs font-mono text-primary font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Read Full Text</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {res.fileSize && (
                  <button
                    onClick={() => handleDownload(res)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary hover:bg-primary-hover text-paper text-xs font-medium transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF ({res.fileSize})</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </BlockFrame>

      {/* 3. dcai/content-grid (Filterable Grid) */}
      <BlockFrame
        block="dcai/content-grid"
        type="Dynamic"
        source="Resources Query with Multi-Facet Toolbar"
        className="space-y-6 pt-4 border-t border-line"
      >
        {/* Filters Toolbar */}
        <div className="p-4 rounded-lg bg-surface border border-line flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sh-1">
          {/* Content Type Filter Chips */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            {['all', 'Case Study', 'Article', 'Technical Manual', 'Guide'].map(type => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 rounded-sm font-medium transition-colors ${
                  activeType === type
                    ? 'bg-primary text-paper font-semibold shadow-sm'
                    : 'bg-paper text-ink-2 border border-line hover:border-line-strong'
                }`}
              >
                {type === 'all' ? 'All Types' : type}
              </button>
            ))}
          </div>

          {/* Search, Vertical & Sort Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Field */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-ink-3 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search titles…"
                className="pl-8 pr-3 py-1.5 text-xs rounded bg-paper border border-line text-ink placeholder:text-ink-3 focus:outline-none focus:border-primary w-40 sm:w-48"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Vertical Select */}
            <select
              value={activeVertical}
              onChange={e => setActiveVertical(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded bg-paper border border-line text-ink focus:outline-none"
            >
              <option value="all">All Sectors</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="hospitality">Hospitality</option>
              <option value="general">General</option>
            </select>

            {/* Sort Select */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs rounded bg-paper border border-line text-ink focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="p-12 text-center rounded-lg bg-surface border border-line space-y-3">
            <h4 className="font-serif-display text-lg text-ink font-medium">No documents match your filters</h4>
            <p className="text-xs text-ink-2">Try clearing your search term or switching content types.</p>
            <button
              onClick={() => { setActiveType('all'); setActiveVertical('all'); setSearchQuery(''); }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-primary text-paper text-xs font-medium hover:bg-primary-hover"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(res => (
              <div
                key={res.id}
                className="p-6 rounded-lg bg-surface border border-line hover:border-primary hover:shadow-sh-2 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-mono text-ink-3">
                    <span className="px-2 py-0.5 rounded bg-paper border border-line text-accent-text font-semibold uppercase">
                      {res.contentType}
                    </span>
                    <span>{res.publishDate}</span>
                  </div>

                  <h3
                    onClick={() => setSelectedResource(res)}
                    className="font-serif-display text-lg text-ink font-medium leading-snug group-hover:text-primary transition-colors cursor-pointer"
                  >
                    {res.title}
                  </h3>

                  <p className="text-xs text-ink-2 line-clamp-3 leading-relaxed">
                    {res.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-line flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={() => setSelectedResource(res)}
                    className="text-primary hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Read Text</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>

                  {res.fileSize && (
                    <button
                      onClick={() => handleDownload(res)}
                      className="p-1.5 rounded border border-line hover:bg-paper text-ink-2 hover:text-primary transition-colors flex items-center gap-1"
                      title="Download PDF"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="text-[10px] text-ink-3">{res.fileSize}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </BlockFrame>

      {/* In-Page Reading Modal */}
      {selectedResource && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-ground/80 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-2xl w-full bg-elevated rounded-lg shadow-sh-3 border border-line p-6 sm:p-8 overflow-y-auto max-h-[85vh] space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary-tint text-primary font-bold">
                  {selectedResource.contentType}
                </span>
                <span className="text-xs font-mono text-ink-3">Published {selectedResource.publishDate}</span>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-1 rounded text-ink-3 hover:text-ink hover:bg-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif-display text-2xl sm:text-3xl text-ink font-medium leading-tight">
                {selectedResource.title}
              </h2>
              <div className="p-3 bg-paper rounded border border-line text-xs italic text-ink-2 leading-relaxed">
                {selectedResource.summary}
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-ink-2 leading-relaxed">
                {selectedResource.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-line flex items-center justify-between">
                <span className="text-xs font-mono text-ink-3">Technical Document</span>
                {selectedResource.fileSize && (
                  <button
                    onClick={() => handleDownload(selectedResource)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary text-paper text-xs font-medium hover:bg-primary-hover transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF ({selectedResource.fileSize})</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
