import React, { useRef } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getBrandBySlug } from '../data/brands';
import { PROTOCOLS } from '../data/protocols';
import { useData } from '../state/DataContext';
import { BlockFrame } from '../components/layout/BlockFrame';
import { ProtocolGlyph } from '../components/ui/ProtocolGlyph';
import { ProductSilhouette } from '../components/ui/ProductSilhouette';
import { ArrowRight, ChevronLeft, ChevronRight, Award, ShieldCheck, Download, Tag } from 'lucide-react';

export const BrandLanding: React.FC = () => {
  const { brand: brandSlug } = useParams<{ brand: string }>();
  const { products } = useData();

  const brand = getBrandBySlug(brandSlug || '');
  if (!brand) {
    return <Navigate to="/brands" replace />;
  }

  const brandProtocols = PROTOCOLS.filter(p => p.brandSlug === brand.slug);
  const brandProducts = products.filter(p => p.brandSlug === brand.slug);
  const totalDownloads = brandProducts.reduce((acc, p) => acc + p.downloads.length, 0);

  return (
    <div className="space-y-12 lg:space-y-16 pb-16">
      {/* 1. dcai/brand-header */}
      <BlockFrame
        block="dcai/brand-header"
        type="Dynamic"
        source="Brand Custom Taxonomy & ACF Metadata"
        className="border-b border-line bg-surface/60 py-10 lg:py-14"
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono text-ink-3">
            <Link to="/home" className="hover:text-ink">Home</Link>
            <span>/</span>
            <Link to="/brands" className="hover:text-ink">Brands</Link>
            <span>/</span>
            <span className="text-ink font-semibold">{brand.name}</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h1 className="font-serif-display text-4xl sm:text-5xl text-ink font-normal tracking-tight">
              {brand.name}
            </h1>
            <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed">
              {brand.positioning}
            </p>
          </div>

          {/* Stat Strip */}
          <div className="pt-4 border-t border-line flex flex-wrap items-center gap-6 text-xs font-mono text-ink-3">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-ink text-sm">{brandProtocols.length}</span> Protocols
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-ink text-sm">{brandProducts.length}</span> Products Documented
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-ink text-sm">{totalDownloads}</span> Technical Downloads
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5 text-status-success">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Full Philippine Warranty</span>
            </div>
          </div>
        </div>
      </BlockFrame>

      {/* 2. dcai/brand-overview */}
      <BlockFrame
        block="dcai/brand-overview"
        type="Static"
        source="ACF Brand Narrative Fields"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-serif-display text-2xl text-ink font-medium">
              About {brand.name} Engineering
            </h2>
            <p className="text-sm text-ink-2 leading-relaxed">
              {brand.description}
            </p>
          </div>

          <div className="lg:col-span-4 p-5 rounded-lg bg-surface border border-line space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-wider text-ink-3 font-semibold">
              Manufacturing Standards & Awards
            </div>
            <div className="space-y-2">
              {brand.certifications.map(c => (
                <div key={c} className="flex items-center gap-2 text-xs text-ink-2">
                  <Award className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </BlockFrame>

      {/* 3. dcai/protocol-carousels — One Scroll Rail Per Protocol */}
      <BlockFrame
        block="dcai/protocol-carousels"
        type="Dynamic"
        source="Product Collection Grouped by Protocol"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-12"
      >
        {brandProtocols.map(proto => {
          const protoProducts = brandProducts.filter(p => p.protocolSlug === proto.slug);

          return (
            <ProtocolRail
              key={proto.slug}
              brand={brand}
              protocol={proto}
              products={protoProducts}
            />
          );
        })}
      </BlockFrame>

      {/* 4. dcai/cta-single */}
      <BlockFrame
        block="dcai/cta-single"
        type="Static"
        source="Dealer-Safe Call to Action"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="p-8 rounded-lg bg-surface border border-line flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sh-1">
          <div className="space-y-1.5 max-w-xl">
            <div className="text-[11px] font-mono uppercase text-accent font-semibold tracking-wider">
              Technical Specification
            </div>
            <h3 className="font-serif-display text-2xl text-ink font-medium">
              Specify {brand.name} for your next Philippine development
            </h3>
            <p className="text-xs text-ink-2 leading-relaxed">
              Our engineering team assists MEP consultants with schematic design, line coupler calculations, and certified installer bidding.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/contact#trade"
              className="px-4 py-2.5 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-medium transition-colors"
            >
              Ask Technical Team
            </Link>
            <Link
              to="/contact#project"
              className="px-4 py-2.5 rounded-md border border-line-strong hover:bg-paper text-ink text-xs font-medium transition-colors"
            >
              Find a Certified Partner
            </Link>
          </div>
        </div>
      </BlockFrame>
    </div>
  );
};

// Protocol Product Horizontal Rail Component
const ProtocolRail: React.FC<{
  brand: any;
  protocol: any;
  products: any[];
}> = ({ brand, protocol, products }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -320 : 320;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between border-b border-line pb-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-surface border border-line flex items-center justify-center text-primary">
            <ProtocolGlyph id={protocol.glyphId} size={18} />
          </div>
          <div>
            <h3 className="font-serif-display text-xl sm:text-2xl text-ink font-medium">
              {brand.name} {protocol.name}
            </h3>
            <p className="text-xs text-ink-3">{protocol.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to={`/brands/${brand.slug}/${protocol.slug}`}
            className="text-xs font-mono text-primary font-medium hover:underline mr-2"
          >
            View all ({products.length}) →
          </Link>
          <button
            onClick={() => scroll('left')}
            className="p-1.5 rounded border border-line hover:bg-surface text-ink-2 transition-colors hidden sm:inline-flex"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-1.5 rounded border border-line hover:bg-surface text-ink-2 transition-colors hidden sm:inline-flex"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontally scrollable snap rail */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar"
        tabIndex={0}
      >
        {products.slice(0, 8).map(prod => (
          <Link
            key={prod.id}
            to={`/brands/${brand.slug}/${protocol.slug}/${prod.mpn.toLowerCase()}`}
            className="w-64 shrink-0 snap-start rounded-lg bg-surface border border-line hover:border-primary hover:shadow-sh-2 transition-all p-3.5 flex flex-col justify-between group"
          >
            <div>
              {/* Product Silhouette View */}
              <div className="w-full aspect-[4/3] rounded bg-paper border border-line overflow-hidden mb-3">
                <ProductSilhouette
                  type={prod.illustrationType}
                  brandName={brand.name}
                  mpn={prod.mpn}
                />
              </div>

              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-[11px] font-semibold text-accent-text px-1.5 py-0.5 rounded bg-accent-tint/60">
                  {prod.mpn}
                </span>
                {prod.status === 'Discontinued' && (
                  <span className="text-[10px] font-mono text-status-error">Discontinued</span>
                )}
                {prod.isNew && (
                  <span className="text-[10px] font-mono text-status-success font-semibold">New</span>
                )}
              </div>

              <h4 className="font-medium text-xs text-ink group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {prod.name}
              </h4>
            </div>

            <div className="pt-3 border-t border-line mt-3 flex items-center justify-between text-[11px] font-mono text-ink-3">
              <span>{prod.specs.mounting}</span>
              <span className="text-primary font-medium group-hover:translate-x-0.5 transition-transform">Specs →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
