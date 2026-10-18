import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRANDS } from '../../data/brands';
import { PROTOCOLS } from '../../data/protocols';
import { useData } from '../../state/DataContext';
import { ProtocolGlyph } from '../ui/ProtocolGlyph';
import { Home, Building2, Hotel, BookOpen, Wrench, ChevronRight } from 'lucide-react';

interface MegaMenuProps {
  type: 'solutions' | 'brands' | 'resources';
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ type, onClose }) => {
  const [selectedBrandSlug, setSelectedBrandSlug] = useState<string>('halden');
  const { products } = useData();

  if (type === 'solutions') {
    return (
      <div className="w-[480px] p-4 bg-elevated rounded-lg shadow-sh-2 border border-line animate-fade-in grid gap-2">
        <Link
          to="/solutions/residential"
          onClick={onClose}
          className="flex items-start gap-3 p-3 rounded-md hover:bg-primary-tint/60 transition-colors group"
        >
          <div className="w-9 h-9 rounded bg-surface border border-line flex items-center justify-center text-primary group-hover:border-primary shrink-0">
            <Home className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-xs text-ink flex items-center gap-1">
              <span>Residential Solutions</span>
              <ChevronRight className="w-3 h-3 text-ink-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-[11px] text-ink-2 mt-0.5 leading-snug">
              Luxury residences, condos & villas — lighting, climate & smart access.
            </div>
          </div>
        </Link>

        <Link
          to="/solutions/commercial"
          onClick={onClose}
          className="flex items-start gap-3 p-3 rounded-md hover:bg-primary-tint/60 transition-colors group"
        >
          <div className="w-9 h-9 rounded bg-surface border border-line flex items-center justify-center text-primary group-hover:border-primary shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-xs text-ink flex items-center gap-1">
              <span>Commercial Solutions</span>
              <ChevronRight className="w-3 h-3 text-ink-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-[11px] text-ink-2 mt-0.5 leading-snug">
              Grade-A office towers, campuses & VAV HVAC with open BACnet/IP.
            </div>
          </div>
        </Link>

        <Link
          to="/solutions/hospitality"
          onClick={onClose}
          className="flex items-start gap-3 p-3 rounded-md hover:bg-primary-tint/60 transition-colors group"
        >
          <div className="w-9 h-9 rounded bg-surface border border-line flex items-center justify-center text-primary group-hover:border-primary shrink-0">
            <Hotel className="w-4 h-4" />
          </div>
          <div>
            <div className="font-semibold text-xs text-ink flex items-center gap-1">
              <span>Hospitality Solutions</span>
              <ChevronRight className="w-3 h-3 text-ink-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
            <div className="text-[11px] text-ink-2 mt-0.5 leading-snug">
              Resort villas & hotels — one scene engine for lighting, drapery & energy saving.
            </div>
          </div>
        </Link>

        <div className="border-t border-line pt-2 px-2 flex items-center justify-between text-[11px]">
          <span className="text-ink-3 font-mono">Overview</span>
          <Link to="/solutions" onClick={onClose} className="font-medium text-primary hover:underline">
            Solutions Hub Overview →
          </Link>
        </div>
      </div>
    );
  }

  if (type === 'brands') {
    const activeBrand = BRANDS.find(b => b.slug === selectedBrandSlug) || BRANDS[0];
    const brandProtocols = PROTOCOLS.filter(p => p.brandSlug === activeBrand.slug);

    return (
      <div className="w-[640px] p-4 bg-elevated rounded-lg shadow-sh-2 border border-line animate-fade-in flex gap-4">
        {/* Left Column: Brand Names */}
        <div className="w-48 border-r border-line pr-3 space-y-1">
          <div className="text-[10px] font-mono uppercase tracking-wider text-ink-3 font-semibold px-2 mb-1">
            Brands (4)
          </div>
          {BRANDS.map(brand => {
            const isSelected = brand.slug === selectedBrandSlug;
            return (
              <button
                key={brand.slug}
                onMouseEnter={() => setSelectedBrandSlug(brand.slug)}
                onClick={() => setSelectedBrandSlug(brand.slug)}
                className={`w-full text-left px-3 py-2 rounded-md text-xs font-medium transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-primary-tint text-primary font-semibold border-l-2 border-accent'
                    : 'text-ink-2 hover:bg-surface'
                }`}
              >
                <span>{brand.name}</span>
                <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? 'text-primary' : 'text-ink-3'}`} />
              </button>
            );
          })}
          <div className="pt-3 border-t border-line mt-2">
            <Link
              to="/brands"
              onClick={onClose}
              className="text-[11px] text-primary font-medium px-2 hover:underline block"
            >
              All Brands Directory →
            </Link>
          </div>
        </div>

        {/* Right Column: Protocols under Active Brand */}
        <div className="flex-1 pl-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-serif-display font-medium text-sm text-ink">{activeBrand.name}</span>
              <Link
                to={`/brands/${activeBrand.slug}`}
                onClick={onClose}
                className="text-[11px] text-primary hover:underline font-mono"
              >
                Brand Landing Page →
              </Link>
            </div>
            <p className="text-[11px] text-ink-2 mb-3 leading-relaxed">{activeBrand.tagline}</p>

            <div className="text-[10px] font-mono uppercase tracking-wider text-ink-3 font-semibold mb-1.5">
              Available Protocols:
            </div>
            <div className="space-y-1.5">
              {brandProtocols.map(proto => {
                const count = products.filter(
                  p => p.brandSlug === activeBrand.slug && p.protocolSlug === proto.slug
                ).length;
                return (
                  <Link
                    key={proto.slug}
                    to={`/brands/${activeBrand.slug}/${proto.slug}`}
                    onClick={onClose}
                    className="flex items-center justify-between p-2 rounded bg-surface border border-line hover:border-primary hover:bg-primary-tint/40 transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <ProtocolGlyph id={proto.glyphId} size={18} className="text-primary" />
                      <div>
                        <div className="text-xs font-medium text-ink group-hover:text-primary">
                          {proto.name}
                        </div>
                        <div className="text-[10px] text-ink-3">{proto.category}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-ink-3 bg-paper px-1.5 py-0.5 rounded border border-line">
                      {count} items
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="text-[11px] text-ink-3 font-mono mt-3 pt-2 border-t border-line">
            Permanent DAM URLs · Master CSV compliant
          </div>
        </div>
      </div>
    );
  }

  // Resources Mega Menu
  return (
    <div className="w-[500px] p-4 bg-elevated rounded-lg shadow-sh-2 border border-line animate-fade-in grid grid-cols-2 gap-4">
      <div className="p-3 bg-surface rounded-md border border-line space-y-2">
        <div className="flex items-center gap-2 text-primary font-semibold text-xs">
          <BookOpen className="w-4 h-4" />
          <span>For Consultants & Designers</span>
        </div>
        <p className="text-[11px] text-ink-2 leading-relaxed">
          Specification guides, architectural case studies, and comparison whitepapers.
        </p>
        <div className="pt-2 border-t border-line">
          <Link
            to="/resources/consultants"
            onClick={onClose}
            className="text-[11px] text-primary font-medium hover:underline inline-flex items-center gap-1"
          >
            <span>Consultants Dashboard</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="p-3 bg-surface rounded-md border border-line space-y-2">
        <div className="flex items-center gap-2 text-primary font-semibold text-xs">
          <Wrench className="w-4 h-4" />
          <span>For Dealers & Installers</span>
        </div>
        <p className="text-[11px] text-ink-2 leading-relaxed">
          ETS databases, commissioning manuals, wiring diagrams & certification schedules.
        </p>
        <div className="pt-2 border-t border-line">
          <Link
            to="/resources/dealers"
            onClick={onClose}
            className="text-[11px] text-primary font-medium hover:underline inline-flex items-center gap-1"
          >
            <span>Dealers Technical Hub</span>
            <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="col-span-2 pt-2 border-t border-line flex items-center justify-between text-[11px]">
        <span className="text-ink-3 font-mono">18 Seeded Resources</span>
        <Link to="/resources" onClick={onClose} className="font-medium text-primary hover:underline">
          All Resources Hub →
        </Link>
      </div>
    </div>
  );
};
