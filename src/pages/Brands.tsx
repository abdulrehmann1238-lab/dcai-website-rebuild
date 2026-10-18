import React from 'react';
import { Link } from 'react-router-dom';
import { BRANDS } from '../data/brands';
import { PROTOCOLS } from '../data/protocols';
import { useData } from '../state/DataContext';
import { BlockFrame } from '../components/layout/BlockFrame';
import { ProtocolGlyph } from '../components/ui/ProtocolGlyph';
import { ArrowRight, Search, Award, ShieldCheck } from 'lucide-react';

export const Brands: React.FC = () => {
  const { products } = useData();

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-12">
      {/* 1. dcai/page-header */}
      <BlockFrame
        block="dcai/page-header"
        type="Static"
        source="Page Title & Technical Introduction"
        className="space-y-4 max-w-3xl"
      >
        <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
          Brand Portfolio
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-ink font-normal tracking-tight">
          Four brands. One technical library.
        </h1>
        <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
          Browse by brand, then by protocol, down to the part number. Every datasheet, ETS application database, and commissioning manual is a click away.
        </p>

        {/* Global Search Nudge */}
        <div className="pt-2">
          <div className="inline-flex items-center gap-2 p-2.5 rounded-md bg-surface border border-line text-xs text-ink-2">
            <Search className="w-3.5 h-3.5 text-accent" />
            <span>Looking for a specific part number? Press</span>
            <kbd className="px-1.5 py-0.5 rounded bg-paper border border-line font-mono text-[10px] text-ink">
              /
            </kbd>
            <span>to open Global Search.</span>
          </div>
        </div>
      </BlockFrame>

      {/* 2. dcai/brand-spotlight-grid — 4 Large Rows */}
      <BlockFrame
        block="dcai/brand-spotlight-grid"
        type="Dynamic"
        source="Brand Collection (Custom Brand Taxonomy)"
        className="space-y-6"
      >
        <div className="space-y-6">
          {BRANDS.map(brand => {
            const brandProtocols = PROTOCOLS.filter(p => p.brandSlug === brand.slug);
            const brandProducts = products.filter(p => p.brandSlug === brand.slug);

            return (
              <div
                key={brand.slug}
                className="p-6 sm:p-8 rounded-lg bg-surface border border-line hover:border-primary hover:shadow-sh-2 transition-all group"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  {/* Brand Wordmark & Origin (Cols 1-3) */}
                  <div className="lg:col-span-3 space-y-2">
                    <span className="font-serif-display text-3xl sm:text-4xl font-medium text-ink group-hover:text-primary transition-colors">
                      {brand.name}
                    </span>
                    <div className="text-xs font-mono text-ink-3">
                      {brand.origin} · Est. {brand.founded}
                    </div>
                    <div className="text-[11px] font-mono text-status-success flex items-center gap-1 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Official Philippine Distribution</span>
                    </div>
                  </div>

                  {/* Positioning & Certifications (Cols 4-9) */}
                  <div className="lg:col-span-6 space-y-3">
                    <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                      {brand.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {brand.certifications.map(cert => (
                        <span
                          key={cert}
                          className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-paper border border-line text-ink-2"
                        >
                          <Award className="w-2.5 h-2.5 text-accent" />
                          <span>{cert}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Protocols, Product Count & CTA (Cols 10-12) */}
                  <div className="lg:col-span-3 lg:border-l lg:border-line lg:pl-6 space-y-4">
                    <div>
                      <div className="text-[10px] font-mono uppercase text-ink-3 tracking-wider mb-1">
                        Supported Protocols
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {brandProtocols.map(pr => (
                          <div
                            key={pr.slug}
                            className="flex items-center gap-1 px-2 py-1 rounded bg-paper border border-line text-xs font-mono text-ink"
                            title={pr.name}
                          >
                            <ProtocolGlyph id={pr.glyphId} size={14} className="text-primary" />
                            <span>{pr.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-line flex items-center justify-between">
                      <span className="font-mono text-xs text-primary font-semibold">
                        {brandProducts.length} Products
                      </span>
                      <Link
                        to={`/brands/${brand.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-medium transition-colors"
                      >
                        <span>Explore {brand.name}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </BlockFrame>
    </div>
  );
};
