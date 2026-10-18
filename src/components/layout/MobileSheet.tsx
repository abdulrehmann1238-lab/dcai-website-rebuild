import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BRANDS } from '../../data/brands';
import { PROTOCOLS } from '../../data/protocols';
import { usePersona, PersonaType } from '../../state/PersonaContext';
import { ProtocolGlyph } from '../ui/ProtocolGlyph';
import { X, ChevronDown, ChevronRight, UserCheck, Search, ShieldCheck } from 'lucide-react';

interface MobileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
}

export const MobileSheet: React.FC<MobileSheetProps> = ({ isOpen, onClose, onOpenSearch }) => {
  const [openSection, setOpenSection] = useState<string | null>('brands');
  const { persona, togglePersona } = usePersona();

  if (!isOpen) return null;

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex justify-end bg-dark-ground/60 backdrop-blur-sm animate-fade-in"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-sm h-full bg-paper border-l border-line shadow-sh-3 flex flex-col justify-between overflow-y-auto animate-slide-left">
        {/* Top Header of Sheet */}
        <div>
          <div className="flex items-center justify-between p-4 border-b border-line bg-surface">
            <div className="flex items-center gap-2">
              <div className="w-5 h-0.5 bg-ink relative">
                <span className="w-1.5 h-1.5 rounded-full bg-accent absolute -top-0.5 left-0" />
                <span className="w-1.5 h-1.5 rounded-full bg-ink absolute -top-0.5 left-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent absolute -top-0.5 right-0" />
              </div>
              <span className="font-serif-display font-medium text-lg text-ink">dcai</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { onClose(); onOpenSearch(); }}
                className="p-2 rounded-md hover:bg-paper text-ink-2"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-md hover:bg-paper text-ink-2"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Persona Chooser Strip on Mobile */}
          <div className="p-3 bg-surface/60 border-b border-line">
            <div className="text-[10px] font-mono uppercase text-ink-3 tracking-wider mb-1.5 flex items-center gap-1">
              <UserCheck className="w-3 h-3 text-accent" />
              <span>Tailor view by role:</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'dealer', label: 'Dealer' },
                { id: 'consultant', label: 'Designer' },
                { id: 'owner', label: 'Owner' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => togglePersona(p.id as PersonaType)}
                  className={`py-1 text-[11px] font-medium rounded-sm border transition-colors ${
                    persona === p.id
                      ? 'bg-primary text-paper border-primary font-semibold'
                      : 'bg-paper text-ink-2 border-line hover:border-line-strong'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Nav Sections Accordion */}
          <div className="p-2 divide-y divide-line/60">
            {/* Solutions Accordion */}
            <div className="py-1">
              <button
                onClick={() => toggleSection('solutions')}
                className="w-full flex items-center justify-between p-3 text-left font-serif-display text-base text-ink"
              >
                <span>Solutions</span>
                <ChevronDown className={`w-4 h-4 text-ink-3 transition-transform ${openSection === 'solutions' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'solutions' && (
                <div className="pl-4 pr-2 pb-2 space-y-1 text-xs text-ink-2">
                  <Link to="/solutions" onClick={onClose} className="block py-1.5 font-medium text-primary">
                    All Solutions Hub →
                  </Link>
                  <Link to="/solutions/residential" onClick={onClose} className="block py-1.5 hover:text-ink">
                    Residential Smart Homes
                  </Link>
                  <Link to="/solutions/commercial" onClick={onClose} className="block py-1.5 hover:text-ink">
                    Commercial & Office BACnet
                  </Link>
                  <Link to="/solutions/hospitality" onClick={onClose} className="block py-1.5 hover:text-ink">
                    Hospitality & Resort Management
                  </Link>
                </div>
              )}
            </div>

            {/* Brands Accordion */}
            <div className="py-1">
              <button
                onClick={() => toggleSection('brands')}
                className="w-full flex items-center justify-between p-3 text-left font-serif-display text-base text-ink"
              >
                <span>Brands & Products</span>
                <ChevronDown className={`w-4 h-4 text-ink-3 transition-transform ${openSection === 'brands' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'brands' && (
                <div className="pl-3 pr-2 pb-2 space-y-2 text-xs">
                  <Link to="/brands" onClick={onClose} className="block py-1 font-medium text-primary">
                    Four Brands Directory →
                  </Link>
                  {BRANDS.map(b => (
                    <div key={b.slug} className="p-2 bg-surface rounded border border-line">
                      <Link to={`/brands/${b.slug}`} onClick={onClose} className="font-semibold text-ink hover:text-primary block">
                        {b.name}
                      </Link>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {PROTOCOLS.filter(p => p.brandSlug === b.slug).map(pr => (
                          <Link
                            key={pr.slug}
                            to={`/brands/${b.slug}/${pr.slug}`}
                            onClick={onClose}
                            className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-paper border border-line text-ink-2"
                          >
                            {pr.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Resources Accordion */}
            <div className="py-1">
              <button
                onClick={() => toggleSection('resources')}
                className="w-full flex items-center justify-between p-3 text-left font-serif-display text-base text-ink"
              >
                <span>Resources & Library</span>
                <ChevronDown className={`w-4 h-4 text-ink-3 transition-transform ${openSection === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              {openSection === 'resources' && (
                <div className="pl-4 pr-2 pb-2 space-y-1 text-xs text-ink-2">
                  <Link to="/resources" onClick={onClose} className="block py-1.5 font-medium text-primary">
                    Resources Hub Overview →
                  </Link>
                  <Link to="/resources/consultants" onClick={onClose} className="block py-1.5 hover:text-ink">
                    For Consultants & Designers
                  </Link>
                  <Link to="/resources/dealers" onClick={onClose} className="block py-1.5 hover:text-ink">
                    For Dealers & System Integrators
                  </Link>
                </div>
              )}
            </div>

            {/* Static Pages */}
            <div className="py-2 px-3 space-y-2 text-sm font-medium">
              <Link to="/about" onClick={onClose} className="block py-1 text-ink hover:text-primary">
                About DCAI
              </Link>
              <Link to="/contact" onClick={onClose} className="block py-1 text-ink hover:text-primary">
                Contact & Enablement Center
              </Link>
            </div>
          </div>
        </div>

        {/* Sticky Bottom Actions */}
        <div className="p-4 bg-surface border-t border-line space-y-2">
          <Link
            to="/contact#project"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-medium transition-colors"
          >
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span>Find a Certified Partner</span>
          </Link>
          <Link
            to="/contact#trade"
            onClick={onClose}
            className="w-full flex items-center justify-center py-2.5 rounded-md border border-line-strong hover:bg-paper text-ink text-xs font-medium transition-colors"
          >
            <span>Become a Dealer</span>
          </Link>
          <div className="text-[10px] font-mono text-center text-ink-3 pt-1">
            B2B Smart-Building Distribution · Philippines
          </div>
        </div>
      </div>
    </div>
  );
};
