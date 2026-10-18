import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../state/DataContext';
import { SearchResultItem } from '../../lib/search';
import { ProtocolGlyph } from '../ui/ProtocolGlyph';
import { Search, X, CornerDownLeft, ArrowUp, ArrowDown, ExternalLink, HelpCircle, FileText, Layers, Tag } from 'lucide-react';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<'all' | 'products' | 'brands' | 'protocols' | 'resources'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dcai_recent_searches');
      return saved ? JSON.parse(saved) : ['HLD-KX-4412', 'DALI', 'BACnet', 'thermostat'];
    } catch {
      return ['HLD-KX-4412', 'DALI', 'BACnet', 'thermostat'];
    }
  });

  const { searchQuery, trackSearch } = useData();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialQuery]);

  // Execute Search
  const results = useMemo(() => {
    return searchQuery(query);
  }, [searchQuery, query]);

  // Flattened visible items based on activeCategory
  const visibleItems = useMemo(() => {
    const items: SearchResultItem[] = [];
    if (activeCategory === 'all' || activeCategory === 'brands') items.push(...results.brands);
    if (activeCategory === 'all' || activeCategory === 'protocols') items.push(...results.protocols);
    if (activeCategory === 'all' || activeCategory === 'products') items.push(...results.products);
    if (activeCategory === 'all' || activeCategory === 'resources') items.push(...results.resources);
    return items;
  }, [results, activeCategory]);

  const recordSearchInRecents = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setRecentSearches(prev => {
      const next = [trimmed, ...prev.filter(item => item.toLowerCase() !== trimmed.toLowerCase())].slice(0, 5);
      try {
        localStorage.setItem('dcai_recent_searches', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleSelect = (item: SearchResultItem) => {
    recordSearchInRecents(query || item.title);
    trackSearch(query || item.title, visibleItems.length);
    onClose();
    navigate(item.url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      if (query) setQuery('');
      else onClose();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (visibleItems.length > 0 ? (prev + 1) % visibleItems.length : 0));
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (visibleItems.length > 0 ? (prev - 1 + visibleItems.length) % visibleItems.length : 0));
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (visibleItems.length > 0 && selectedIndex < visibleItems.length) {
        handleSelect(visibleItems[selectedIndex]);
      } else if (query.trim()) {
        trackSearch(query, 0);
      }
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const categories: ('all' | 'products' | 'brands' | 'protocols' | 'resources')[] = ['all', 'products', 'brands', 'protocols', 'resources'];
      const nextIdx = (categories.indexOf(activeCategory) + (e.shiftKey ? -1 : 1) + categories.length) % categories.length;
      setActiveCategory(categories[nextIdx]);
      setSelectedIndex(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center pt-8 md:pt-16 px-4 bg-dark-ground/60 backdrop-blur-sm animate-fade-in"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Global Search"
    >
      <div className="relative w-full max-w-2xl bg-elevated rounded-lg shadow-sh-3 border border-line flex flex-col overflow-hidden max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-line bg-surface">
          <Search className="w-5 h-5 text-ink-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search by part number (e.g. 4412), brand, or protocol…"
            className="flex-1 bg-transparent border-none text-ink placeholder:text-ink-3 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              className="p-1 rounded text-ink-3 hover:text-ink hover:bg-paper transition-colors"
              aria-label="Clear query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-ink-3 bg-paper border border-line rounded">
            ESC
          </kbd>
        </div>

        {/* Category Tabs */}
        {query.trim().length > 0 && (
          <div className="flex items-center gap-1 px-4 py-2 border-b border-line bg-paper/60 text-xs overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All', count: results.totalCount },
              { id: 'products', label: 'Products', count: results.products.length },
              { id: 'brands', label: 'Brands', count: results.brands.length },
              { id: 'protocols', label: 'Protocols', count: results.protocols.length },
              { id: 'resources', label: 'Resources', count: results.resources.length }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveCategory(tab.id as any);
                  setSelectedIndex(0);
                }}
                className={`px-2.5 py-1 rounded-sm font-medium transition-colors flex items-center gap-1.5 ${
                  activeCategory === tab.id
                    ? 'bg-primary text-paper'
                    : 'text-ink-2 hover:bg-primary-tint hover:text-primary'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1 rounded ${activeCategory === tab.id ? 'bg-primary-hover text-paper' : 'bg-surface text-ink-3'}`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Scrollable Results Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {query.trim().length === 0 ? (
            /* Empty Query View: Recent Searches & Jump Links */
            <div className="p-4 space-y-6">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-ink-3 font-semibold mb-2">
                  Recent Searches
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map(term => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        inputRef.current?.focus();
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-surface border border-line text-xs text-ink-2 hover:border-primary hover:text-primary hover:bg-primary-tint transition-colors"
                    >
                      <Tag className="w-3 h-3 text-accent" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-ink-3 font-semibold mb-2">
                  Popular Queries
                </div>
                <div className="flex flex-wrap gap-2">
                  {['HLD-KX-4412', 'DALI-2', 'Verelli', 'BACnet Gateway', 'Thermostat', 'Motorized Shades'].map(pop => (
                    <button
                      key={pop}
                      onClick={() => {
                        setQuery(pop);
                        inputRef.current?.focus();
                      }}
                      className="px-2.5 py-1 rounded-sm bg-surface border border-line text-xs text-ink-2 hover:border-primary hover:text-primary transition-colors"
                    >
                      {pop}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-line pt-4">
                <div className="text-[11px] font-mono uppercase tracking-wider text-ink-3 font-semibold mb-2">
                  Direct Navigation
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => { onClose(); navigate('/brands'); }}
                    className="p-2.5 rounded bg-surface border border-line hover:border-primary text-left transition-colors"
                  >
                    <div className="font-semibold text-ink">Brands Directory</div>
                    <div className="text-[11px] text-ink-3">Four brands, full catalog</div>
                  </button>
                  <button
                    onClick={() => { onClose(); navigate('/resources/dealers'); }}
                    className="p-2.5 rounded bg-surface border border-line hover:border-primary text-left transition-colors"
                  >
                    <div className="font-semibold text-ink">Dealer Resources</div>
                    <div className="text-[11px] text-ink-3">ETS databases, manuals</div>
                  </button>
                  <button
                    onClick={() => { onClose(); navigate('/contact#trade'); }}
                    className="p-2.5 rounded bg-surface border border-line hover:border-primary text-left transition-colors"
                  >
                    <div className="font-semibold text-ink">Ask Technical Team</div>
                    <div className="text-[11px] text-ink-3">Trade support inquiry</div>
                  </button>
                </div>
              </div>
            </div>
          ) : visibleItems.length === 0 ? (
            /* No Results View */
            <div className="p-8 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-paper border border-line mx-auto flex items-center justify-center text-ink-3">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif-display text-lg text-ink">No results for &ldquo;{query}&rdquo;</h4>
                <p className="text-xs text-ink-2 max-w-md mx-auto mt-1 leading-relaxed">
                  We couldn&apos;t find an exact part number or document matching your input. Part numbers are normalized (e.g. try &ldquo;4412&rdquo; without dashes).
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => { onClose(); navigate('/contact#trade'); }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-medium transition-colors"
                >
                  <span>Ask Technical Team</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => { onClose(); navigate('/brands'); }}
                  className="px-3 py-1.5 rounded-md border border-line-strong hover:bg-surface text-ink text-xs transition-colors"
                >
                  Browse Brands Directory
                </button>
              </div>
            </div>
          ) : (
            /* Grouped Results List */
            <div className="space-y-1">
              {visibleItems.map((item, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center gap-3 p-2.5 rounded-md cursor-pointer transition-colors ${
                      isSelected ? 'bg-primary-tint border border-primary/20' : 'hover:bg-surface'
                    }`}
                  >
                    <div className="w-8 h-8 rounded bg-surface border border-line shrink-0 flex items-center justify-center text-primary">
                      {item.category === 'brand' && <Layers className="w-4 h-4 text-accent" />}
                      {item.category === 'protocol' && <ProtocolGlyph id="knx" size={18} className="text-primary" />}
                      {item.category === 'product' && <Tag className="w-4 h-4 text-primary" />}
                      {item.category === 'resource' && <FileText className="w-4 h-4 text-secondary" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-xs text-ink truncate">{item.title}</span>
                        {item.mpn && (
                          <span className="font-mono text-[11px] font-semibold text-accent-text px-1.5 py-0.2 bg-accent-tint/60 rounded">
                            {item.mpn}
                          </span>
                        )}
                        {item.statusChip === 'Discontinued' && (
                          <span className="text-[10px] font-mono px-1 rounded bg-status-error/10 text-status-error font-medium">
                            Discontinued
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-ink-3 truncate mt-0.5">{item.subtitle}</div>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-ink-3 tracking-wider hidden sm:inline">
                        {item.category}
                      </span>
                      {isSelected && <CornerDownLeft className="w-3.5 h-3.5 text-primary" />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts bar */}
        <div className="px-4 py-2.5 border-t border-line bg-surface/80 flex items-center justify-between text-[11px] font-mono text-ink-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-paper border border-line">↑</kbd>
              <kbd className="px-1 py-0.5 rounded bg-paper border border-line">↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-paper border border-line">↵</kbd> Select
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <kbd className="px-1 py-0.5 rounded bg-paper border border-line">TAB</kbd> Category
            </span>
          </div>
          <div>DCAI Repository Index</div>
        </div>
      </div>
    </div>
  );
};
