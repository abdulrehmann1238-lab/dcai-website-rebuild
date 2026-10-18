import React from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../state/DataContext';
import { BlockFrame } from '../components/layout/BlockFrame';
import { BookOpen, Wrench, ArrowRight, FileText, Download } from 'lucide-react';

export const Resources: React.FC = () => {
  const { resources } = useData();

  const consultantResources = resources.filter(r => r.audienceTag === 'Consultant').slice(0, 3);
  const dealerResources = resources.filter(r => r.audienceTag === 'Dealer').slice(0, 3);

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
      {/* Page Header */}
      <BlockFrame
        block="dcai/page-header"
        type="Static"
        source="Resources Hub Header Block"
        className="space-y-4 max-w-3xl"
      >
        <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
          Technical Documentation & Education
        </div>
        <h1 className="font-serif-display text-4xl sm:text-5xl text-ink font-normal tracking-tight">
          One technical library for designers and installers.
        </h1>
        <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed">
          Access architectural case studies, ETS commissioning databases, wiring diagrams, and compliance whitepapers prepared by the DCAI engineering team.
        </p>
      </BlockFrame>

      {/* 1. dcai/audience-section — For Consultants & Architects */}
      <BlockFrame
        block="dcai/audience-section"
        type="Hybrid"
        source="Consultant Resources Filtered Query"
        className="space-y-6 border-b border-line pb-12"
      >
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-accent" />
              <span>For Consultants, Architects & Interior Designers</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-ink font-normal">
              Specification Guides & Philippine Case Studies
            </h2>
            <p className="text-xs text-ink-2 max-w-2xl">
              In-depth analysis of energy reduction, protocol comparisons (KNX vs. DALI vs. Zigbee), and design checklists for residential, commercial, and resort developments.
            </p>
          </div>

          <Link
            to="/resources/consultants"
            className="text-xs font-mono text-primary font-semibold hover:underline hidden sm:inline-flex items-center gap-1"
          >
            <span>Browse Consultant Library ({resources.filter(r => r.audienceTag === 'Consultant').length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {consultantResources.map(res => (
            <div key={res.id} className="p-6 rounded-lg bg-surface border border-line shadow-sh-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-ink-3">
                  <span className="px-2 py-0.5 rounded bg-paper border border-line text-accent-text font-semibold uppercase">
                    {res.contentType}
                  </span>
                  <span>{res.publishDate}</span>
                </div>
                <h3 className="font-serif-display text-base sm:text-lg text-ink font-medium leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-ink-2 line-clamp-3 leading-relaxed">
                  {res.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-between text-xs font-mono text-primary font-medium">
                <Link to="/resources/consultants" className="hover:underline flex items-center gap-1">
                  <span>Read Document</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {res.fileSize && (
                  <span className="text-ink-3 text-[10px]">PDF · {res.fileSize}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </BlockFrame>

      {/* 2. dcai/audience-section — For Dealers & Installers */}
      <BlockFrame
        block="dcai/audience-section"
        type="Hybrid"
        source="Dealer Resources Filtered Query"
        className="space-y-6"
      >
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
              <Wrench className="w-4 h-4 text-accent" />
              <span>For Dealers, Installers & System Integrators</span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-ink font-normal">
              Technical Manuals & Commissioning Guides
            </h2>
            <p className="text-xs text-ink-2 max-w-2xl">
              ETS parameter databases, BACnet token-passing diagnostics, Modbus register maps, and certification training schedules for certified partners.
            </p>
          </div>

          <Link
            to="/resources/dealers"
            className="text-xs font-mono text-primary font-semibold hover:underline hidden sm:inline-flex items-center gap-1"
          >
            <span>Browse Dealer Hub ({resources.filter(r => r.audienceTag === 'Dealer').length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {dealerResources.map(res => (
            <div key={res.id} className="p-6 rounded-lg bg-surface border border-line shadow-sh-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-ink-3">
                  <span className="px-2 py-0.5 rounded bg-primary-tint text-primary font-semibold uppercase">
                    {res.contentType}
                  </span>
                  <span>{res.publishDate}</span>
                </div>
                <h3 className="font-serif-display text-base sm:text-lg text-ink font-medium leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-ink-2 line-clamp-3 leading-relaxed">
                  {res.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-between text-xs font-mono text-primary font-medium">
                <Link to="/resources/dealers" className="hover:underline flex items-center gap-1">
                  <span>Open Manual</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {res.fileSize && (
                  <span className="text-ink-3 text-[10px]">PDF · {res.fileSize}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </BlockFrame>
    </div>
  );
};
