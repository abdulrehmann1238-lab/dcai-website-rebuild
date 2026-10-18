import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link, Navigate } from 'react-router-dom';
import { getBrandBySlug } from '../data/brands';
import { getProtocol, PROTOCOLS } from '../data/protocols';
import { useData } from '../state/DataContext';
import { filterAndSortProducts, FilterState } from '../lib/filters';
import { BlockFrame } from '../components/layout/BlockFrame';
import { ProtocolGlyph } from '../components/ui/ProtocolGlyph';
import { ProductSilhouette } from '../components/ui/ProductSilhouette';
import {
  Search,
  Filter,
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  ArrowRight,
  ChevronRight,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';

export const ProtocolGrid: React.FC = () => {
  const { brand: brandSlug, protocol: protocolSlug } = useParams<{ brand: string; protocol: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { products } = useData();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const brand = getBrandBySlug(brandSlug || '');
  const protocol = getProtocol(brandSlug || '', protocolSlug || '');

  if (!brand || !protocol) {
    return <Navigate to="/brands" replace />;
  }

  // All protocols under this brand for the sidebar
  const brandProtocols = PROTOCOLS.filter(p => p.brandSlug === brand.slug);

  // Read filter state from URL search params
  const currentFilters: FilterState = useMemo(() => {
    const statusParam = searchParams.getAll('status');
    const typeParam = searchParams.getAll('type');
    const mountParam = searchParams.getAll('mount');
    const queryParam = searchParams.get('q') || '';
    const sortParam = (searchParams.get('sort') as any) || 'relevance';

    return {
      status: statusParam,
      productTypes: typeParam,
      mountings: mountParam,
      searchQuery: queryParam,
      sortBy: sortParam
    };
  }, [searchParams]);

  // Base products belonging to this brand + protocol
  const baseProducts = useMemo(() => {
    return products.filter(
      p => p.brandSlug === brand.slug && p.protocolSlug === protocol.slug
    );
  }, [products, brand.slug, protocol.slug]);

  // Run facet engine
  const { filteredProducts, facets } = useMemo(() => {
    return filterAndSortProducts(baseProducts, currentFilters);
  }, [baseProducts, currentFilters]);

  // Helper to update search params
  const updateFilter = (key: string, value: string, isMulti: boolean = true) => {
    const nextParams = new URLSearchParams(searchParams);
    if (isMulti) {
      const existing = nextParams.getAll(key);
      if (existing.includes(value)) {
        const updated = existing.filter(v => v !== value);
        nextParams.delete(key);
        updated.forEach(v => nextParams.append(key, v));
      } else {
        nextParams.append(key, value);
      }
    } else {
      if (value) nextParams.set(key, value);
      else nextParams.delete(key);
    }
    setSearchParams(nextParams, { replace: true });
  };

  const clearAllFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const hasActiveFilters =
    currentFilters.status.length > 0 ||
    currentFilters.productTypes.length > 0 ||
    currentFilters.mountings.length > 0 ||
    currentFilters.searchQuery.length > 0;

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8">
      {/* 1. dcai/protocol-header */}
      <BlockFrame
        block="dcai/protocol-header"
        type="Dynamic"
        source="Brand & Protocol Dynamic Route Match"
        className="space-y-4 border-b border-line pb-6"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-ink-3">
          <Link to="/home" className="hover:text-ink">Home</Link>
          <span>/</span>
          <Link to="/brands" className="hover:text-ink">Brands</Link>
          <span>/</span>
          <Link to={`/brands/${brand.slug}`} className="hover:text-ink">{brand.name}</Link>
          <span>/</span>
          <span className="text-ink font-semibold">{protocol.name}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-surface border border-line flex items-center justify-center text-primary">
                <ProtocolGlyph id={protocol.glyphId} size={20} />
              </div>
              <h1 className="font-serif-display text-3xl sm:text-4xl text-ink font-normal">
                {brand.name} {protocol.name}
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-ink-2 max-w-2xl leading-relaxed">
              {protocol.description}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-xs font-mono px-3 py-1.5 rounded bg-surface border border-line text-ink-2">
              Wire: <strong className="text-ink">{protocol.wireType}</strong>
            </span>
          </div>
        </div>
      </BlockFrame>

      {/* Mobile Sticky Filter/Sort Action Bar */}
      <div className="lg:hidden sticky top-[60px] z-30 bg-paper/95 backdrop-blur-sm border-b border-line py-2.5 flex items-center justify-between gap-2">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded bg-surface border border-line text-xs font-medium text-ink"
        >
          <Filter className="w-3.5 h-3.5 text-accent" />
          <span>Filters ({currentFilters.status.length + currentFilters.productTypes.length + currentFilters.mountings.length})</span>
        </button>

        <select
          value={currentFilters.sortBy}
          onChange={e => updateFilter('sort', e.target.value, false)}
          className="px-3 py-2 rounded bg-surface border border-line text-xs text-ink focus:outline-none"
        >
          <option value="relevance">Sort: Relevance</option>
          <option value="name-asc">Name A–Z</option>
          <option value="mpn-asc">MPN A–Z</option>
          <option value="newest">Recently Added</option>
        </select>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Rail (Cols 1-3, 280px sticky) */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">
          {/* Protocol Navigation (Under this brand) */}
          <BlockFrame
            block="dcai/protocol-navigation"
            type="Dynamic"
            source="Parent Brand Protocol Taxonomy"
            className="p-4 rounded-lg bg-surface border border-line space-y-3"
          >
            <div className="text-[10px] font-mono uppercase tracking-wider text-ink-3 font-semibold">
              {brand.name} Protocols
            </div>
            <div className="space-y-1">
              {brandProtocols.map(p => {
                const isActive = p.slug === protocol.slug;
                const count = products.filter(pr => pr.brandSlug === brand.slug && pr.protocolSlug === p.slug).length;
                return (
                  <Link
                    key={p.slug}
                    to={`/brands/${brand.slug}/${p.slug}`}
                    className={`flex items-center justify-between px-3 py-2 rounded text-xs transition-colors ${
                      isActive
                        ? 'bg-primary-tint text-primary font-semibold border-l-2 border-accent'
                        : 'text-ink-2 hover:bg-paper'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <ProtocolGlyph id={p.glyphId} size={15} className={isActive ? 'text-primary' : 'text-ink-3'} />
                      <span>{p.name}</span>
                    </div>
                    <span className="text-[10px] font-mono text-ink-3">{count}</span>
                  </Link>
                );
              })}
            </div>
          </BlockFrame>

          {/* Facet Filters */}
          <BlockFrame
            block="dcai/product-filters"
            type="Dynamic"
            source="Product ACF Attributes & Status Facets"
            className="p-4 rounded-lg bg-surface border border-line space-y-5"
          >
            <div className="flex items-center justify-between border-b border-line pb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ink-3 font-semibold">
                Filter Products
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] font-mono text-primary hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>

            {/* Status Facet */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-ink">Catalog Status</div>
              <div className="space-y-1.5">
                {facets.status.map(f => {
                  const isChecked = currentFilters.status.includes(f.value);
                  return (
                    <label
                      key={f.value}
                      className={`flex items-center justify-between text-xs cursor-pointer select-none py-1 px-1.5 rounded hover:bg-paper transition-colors ${
                        f.disabled ? 'opacity-40 pointer-events-none' : 'text-ink-2'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => updateFilter('status', f.value)}
                          className="rounded border-line-strong text-primary focus:ring-primary w-3.5 h-3.5"
                        />
                        <span>{f.value}</span>
                      </div>
                      <span className="text-[10px] font-mono text-ink-3">{f.count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Product Type Facet */}
            <div className="space-y-2 pt-2 border-t border-line">
              <div className="text-xs font-semibold text-ink">Product Type</div>
              <div className="space-y-1.5 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                {facets.productTypes.map(f => {
                  const isChecked = currentFilters.productTypes.includes(f.value);
                  return (
                    <label
                      key={f.value}
                      className={`flex items-center justify-between text-xs cursor-pointer select-none py-1 px-1.5 rounded hover:bg-paper transition-colors ${
                        f.disabled ? 'opacity-40 pointer-events-none' : 'text-ink-2'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => updateFilter('type', f.value)}
                          className="rounded border-line-strong text-primary focus:ring-primary w-3.5 h-3.5"
                        />
                        <span className="truncate">{f.value}</span>
                      </div>
                      <span className="text-[10px] font-mono text-ink-3">{f.count}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Mounting Facet */}
            <div className="space-y-2 pt-2 border-t border-line">
              <div className="text-xs font-semibold text-ink">Mounting</div>
              <div className="space-y-1.5">
                {facets.mountings.map(f => {
                  const isChecked = currentFilters.mountings.includes(f.value);
                  return (
                    <label
                      key={f.value}
                      className={`flex items-center justify-between text-xs cursor-pointer select-none py-1 px-1.5 rounded hover:bg-paper transition-colors ${
                        f.disabled ? 'opacity-40 pointer-events-none' : 'text-ink-2'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => updateFilter('mount', f.value)}
                          className="rounded border-line-strong text-primary focus:ring-primary w-3.5 h-3.5"
                        />
                        <span>{f.value}</span>
                      </div>
                      <span className="text-[10px] font-mono text-ink-3">{f.count}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </BlockFrame>
        </aside>

        {/* Right Main Grid Area (Cols 4-12) */}
        <div className="lg:col-span-9 space-y-6">
          {/* Toolbar */}
          <div className="p-3.5 rounded-lg bg-surface border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sh-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-ink font-semibold">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </span>
              {/* In-Grid Search Filter */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-ink-3 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={currentFilters.searchQuery}
                  onChange={e => updateFilter('q', e.target.value, false)}
                  placeholder="Filter name or MPN…"
                  className="pl-8 pr-3 py-1 text-xs rounded bg-paper border border-line text-ink placeholder:text-ink-3 focus:outline-none focus:border-primary w-40 sm:w-56"
                />
                {currentFilters.searchQuery && (
                  <button
                    onClick={() => updateFilter('q', '', false)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-ink-3 hover:text-ink"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Selector */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs">
                <span className="text-ink-3">Sort:</span>
                <select
                  value={currentFilters.sortBy}
                  onChange={e => updateFilter('sort', e.target.value, false)}
                  className="px-2.5 py-1 rounded bg-paper border border-line text-xs text-ink focus:outline-none"
                >
                  <option value="relevance">Relevance</option>
                  <option value="name-asc">Name A–Z</option>
                  <option value="mpn-asc">MPN A–Z</option>
                  <option value="newest">Recently Added</option>
                </select>
              </div>

              {/* View Toggle (Grid / List) */}
              <div className="flex items-center border border-line rounded bg-paper p-0.5">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1 rounded ${viewMode === 'grid' ? 'bg-surface text-primary shadow-sm' : 'text-ink-3 hover:text-ink'}`}
                  title="Grid view"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1 rounded ${viewMode === 'list' ? 'bg-surface text-primary shadow-sm' : 'text-ink-3 hover:text-ink'}`}
                  title="Dealer list view"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              <span className="text-[11px] font-mono text-ink-3">Active:</span>
              {currentFilters.status.map(s => (
                <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-line text-ink-2 font-mono text-[11px]">
                  <span>Status: {s}</span>
                  <button onClick={() => updateFilter('status', s)} className="text-ink-3 hover:text-ink"><X className="w-3 h-3" /></button>
                </span>
              ))}
              {currentFilters.productTypes.map(t => (
                <span key={t} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-line text-ink-2 font-mono text-[11px]">
                  <span>Type: {t}</span>
                  <button onClick={() => updateFilter('type', t)} className="text-ink-3 hover:text-ink"><X className="w-3 h-3" /></button>
                </span>
              ))}
              {currentFilters.mountings.map(m => (
                <span key={m} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-line text-ink-2 font-mono text-[11px]">
                  <span>Mount: {m}</span>
                  <button onClick={() => updateFilter('mount', m)} className="text-ink-3 hover:text-ink"><X className="w-3 h-3" /></button>
                </span>
              ))}
              {currentFilters.searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface border border-line text-ink-2 font-mono text-[11px]">
                  <span>&ldquo;{currentFilters.searchQuery}&rdquo;</span>
                  <button onClick={() => updateFilter('q', '', false)} className="text-ink-3 hover:text-ink"><X className="w-3 h-3" /></button>
                </span>
              )}
              <button onClick={clearAllFilters} className="text-[11px] font-mono text-primary hover:underline ml-1">
                Clear all
              </button>
            </div>
          )}

          {/* Product Items: Grid or List */}
          <BlockFrame
            block="dcai/product-grid"
            type="Dynamic"
            source="Filtered WooCommerce Product Query"
          >
            {filteredProducts.length === 0 ? (
              <div className="p-12 text-center rounded-lg bg-surface border border-line space-y-4">
                <div className="w-12 h-12 rounded-full bg-paper border border-line mx-auto flex items-center justify-center text-ink-3">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif-display text-lg text-ink font-medium">No products match these filters</h3>
                  <p className="text-xs text-ink-2 mt-1">Try clearing some filter criteria, or ask our technical team directly.</p>
                </div>
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={clearAllFilters}
                    className="px-3.5 py-1.5 rounded bg-primary text-paper text-xs font-medium hover:bg-primary-hover transition-colors"
                  >
                    Clear All Filters
                  </button>
                  <Link
                    to="/contact#trade"
                    className="px-3.5 py-1.5 rounded border border-line-strong hover:bg-paper text-ink text-xs transition-colors"
                  >
                    Ask Technical Team
                  </Link>
                </div>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map(prod => (
                  <Link
                    key={prod.id}
                    to={`/brands/${brand.slug}/${protocol.slug}/${prod.mpn.toLowerCase()}`}
                    className="p-4 rounded-lg bg-surface border border-line hover:border-primary hover:shadow-sh-2 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Product Studio Silhouette */}
                      <div className="w-full aspect-[4/3] rounded bg-paper border border-line overflow-hidden mb-3">
                        <ProductSilhouette
                          type={prod.illustrationType}
                          brandName={brand.name}
                          mpn={prod.mpn}
                        />
                      </div>

                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="font-mono text-xs font-semibold text-accent-text px-1.5 py-0.5 rounded bg-accent-tint/60">
                          {prod.mpn}
                        </span>
                        {prod.status === 'Discontinued' && (
                          <span className="text-[10px] font-mono px-1 rounded bg-status-error/10 text-status-error font-medium">
                            Discontinued
                          </span>
                        )}
                        {prod.isNew && (
                          <span className="text-[10px] font-mono px-1 rounded bg-status-success/15 text-status-success font-semibold">
                            New
                          </span>
                        )}
                      </div>

                      <h3 className="font-medium text-xs sm:text-sm text-ink group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                        {prod.name}
                      </h3>

                      <p className="text-[11px] text-ink-2 mt-1.5 line-clamp-2 leading-relaxed">
                        {prod.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-line mt-3 flex items-center justify-between text-[11px] font-mono text-ink-3">
                      <span>{prod.specs.mounting}</span>
                      <span className="text-primary font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Specs & Downloads <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              /* Dealer List View (Dense Table) */
              <div className="overflow-x-auto rounded-lg bg-surface border border-line shadow-sh-1">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-line bg-paper/60 font-mono text-ink-3 text-[11px] uppercase tracking-wider">
                      <th className="py-2.5 px-4 font-semibold">MPN</th>
                      <th className="py-2.5 px-4 font-semibold">Product Name</th>
                      <th className="py-2.5 px-4 font-semibold">Mounting</th>
                      <th className="py-2.5 px-4 font-semibold">Supply</th>
                      <th className="py-2.5 px-4 font-semibold">Status</th>
                      <th className="py-2.5 px-4 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line/60">
                    {filteredProducts.map(prod => (
                      <tr
                        key={prod.id}
                        className="hover:bg-primary-tint/30 transition-colors group cursor-pointer"
                        onClick={() => window.location.href = `/brands/${brand.slug}/${protocol.slug}/${prod.mpn.toLowerCase()}`}
                      >
                        <td className="py-3 px-4 font-mono font-semibold text-accent-text">
                          {prod.mpn}
                        </td>
                        <td className="py-3 px-4 font-medium text-ink group-hover:text-primary">
                          {prod.name}
                        </td>
                        <td className="py-3 px-4 font-mono text-ink-3">
                          {prod.specs.mounting}
                        </td>
                        <td className="py-3 px-4 font-mono text-ink-3">
                          {prod.specs.supplyVoltage}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            prod.status === 'Active' ? 'bg-status-success/15 text-status-success' : 'bg-status-error/15 text-status-error'
                          }`}>
                            {prod.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            to={`/brands/${brand.slug}/${protocol.slug}/${prod.mpn.toLowerCase()}`}
                            className="text-primary hover:underline font-mono text-[11px] font-medium"
                          >
                            View Specs →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </BlockFrame>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end bg-dark-ground/60 backdrop-blur-sm animate-fade-in lg:hidden">
          <div className="w-full bg-paper rounded-t-xl max-h-[85vh] flex flex-col overflow-hidden animate-slide-up shadow-sh-3">
            <div className="p-4 border-b border-line flex items-center justify-between bg-surface">
              <div className="font-serif-display text-lg text-ink font-medium">Filters & Sorting</div>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1 rounded text-ink-3 hover:text-ink">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {/* Status */}
              <div>
                <div className="text-xs font-semibold text-ink mb-2">Status</div>
                <div className="space-y-2">
                  {facets.status.map(f => (
                    <label key={f.value} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={currentFilters.status.includes(f.value)}
                          onChange={() => updateFilter('status', f.value)}
                          className="rounded border-line-strong text-primary w-4 h-4"
                        />
                        <span>{f.value}</span>
                      </div>
                      <span className="font-mono text-ink-3">{f.count}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Types */}
              <div className="border-t border-line pt-4">
                <div className="text-xs font-semibold text-ink mb-2">Product Type</div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {facets.productTypes.map(f => (
                    <label key={f.value} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-2 truncate">
                        <input
                          type="checkbox"
                          checked={currentFilters.productTypes.includes(f.value)}
                          onChange={() => updateFilter('type', f.value)}
                          className="rounded border-line-strong text-primary w-4 h-4"
                        />
                        <span className="truncate">{f.value}</span>
                      </div>
                      <span className="font-mono text-ink-3">{f.count}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-line bg-surface flex items-center gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 py-2.5 rounded border border-line text-xs font-medium text-ink hover:bg-paper"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded bg-primary text-paper text-xs font-medium hover:bg-primary-hover"
              >
                Show {filteredProducts.length} Products
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
