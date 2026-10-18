import Fuse, { type IFuseOptions } from 'fuse.js';
import { Product } from '../data/products';
import { Brand, BRANDS } from '../data/brands';
import { Protocol, PROTOCOLS } from '../data/protocols';
import { Resource, RESOURCES } from '../data/resources';

export type SearchCategory = 'brand' | 'protocol' | 'product' | 'resource';

export interface SearchResultItem {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle: string;
  mpn?: string;
  url: string;
  brandName?: string;
  protocolName?: string;
  statusChip?: string;
  matchedText?: string;
  matchScore: number;
}

export interface GroupedSearchResults {
  brands: SearchResultItem[];
  protocols: SearchResultItem[];
  products: SearchResultItem[];
  resources: SearchResultItem[];
  totalCount: number;
}

interface IndexableItem {
  id: string;
  category: SearchCategory;
  title: string;
  subtitle: string;
  mpn?: string;
  normalizedMpn?: string;
  brandSlug?: string;
  protocolSlug?: string;
  url: string;
  statusChip?: string;
  content: string;
}

export function buildSearchIndex(products: Product[]): Fuse<IndexableItem> {
  const items: IndexableItem[] = [];

  // Index Brands
  BRANDS.forEach(b => {
    items.push({
      id: `brand-${b.slug}`,
      category: 'brand',
      title: b.name,
      subtitle: `${b.origin} · Founded ${b.founded} · ${b.tagline}`,
      brandSlug: b.slug,
      url: `/brands/${b.slug}`,
      content: `${b.name} ${b.tagline} ${b.description} ${b.certifications.join(' ')}`
    });
  });

  // Index Protocols
  PROTOCOLS.forEach(p => {
    const parentBrand = BRANDS.find(b => b.slug === p.brandSlug);
    items.push({
      id: `protocol-${p.brandSlug}-${p.slug}`,
      category: 'protocol',
      title: `${parentBrand ? parentBrand.name + ' ' : ''}${p.name}`,
      subtitle: `${p.category} · ${p.wireType}`,
      brandSlug: p.brandSlug,
      protocolSlug: p.slug,
      url: `/brands/${p.brandSlug}/${p.slug}`,
      content: `${p.name} ${p.category} ${p.wireType} ${p.description}`
    });
  });

  // Index Products
  products.forEach(p => {
    const brand = BRANDS.find(b => b.slug === p.brandSlug)?.name || p.brandSlug;
    const protocol = PROTOCOLS.find(pr => pr.brandSlug === p.brandSlug && pr.slug === p.protocolSlug)?.name || p.protocolSlug;
    const normalizedMpn = p.mpn.toUpperCase().replace(/[^A-Z0-9]/g, '');

    items.push({
      id: `product-${p.id}`,
      category: 'product',
      title: p.name,
      subtitle: `${brand} · ${protocol} · ${p.specs.mounting}`,
      mpn: p.mpn,
      normalizedMpn,
      brandSlug: p.brandSlug,
      protocolSlug: p.protocolSlug,
      url: `/brands/${p.brandSlug}/${p.protocolSlug}/${p.mpn.toLowerCase()}`,
      statusChip: p.status,
      content: `${p.name} ${p.mpn} ${normalizedMpn} ${brand} ${protocol} ${p.shortDescription} ${p.description} ${p.features.join(' ')} ${p.useCases.join(' ')}`
    });
  });

  // Index Resources
  RESOURCES.forEach(r => {
    items.push({
      id: `resource-${r.id}`,
      category: 'resource',
      title: r.title,
      subtitle: `${r.contentType} · For ${r.audienceTag}s · ${r.verticalTag}`,
      url: r.audienceTag === 'Consultant' ? '/resources/consultants' : '/resources/dealers',
      content: `${r.title} ${r.contentType} ${r.audienceTag} ${r.verticalTag} ${r.summary} ${r.content.join(' ')}`
    });
  });

  const options: IFuseOptions<IndexableItem> = {
    includeScore: true,
    includeMatches: true,
    threshold: 0.35,
    minMatchCharLength: 2,
    keys: [
      { name: 'mpn', weight: 1.0 },
      { name: 'normalizedMpn', weight: 0.95 },
      { name: 'title', weight: 0.8 },
      { name: 'brandSlug', weight: 0.7 },
      { name: 'protocolSlug', weight: 0.6 },
      { name: 'subtitle', weight: 0.5 },
      { name: 'content', weight: 0.4 },
    ]
  };

  return new Fuse(items, options);
}

export function executeSearch(fuse: Fuse<IndexableItem>, query: string): GroupedSearchResults {
  const trimmed = query.trim();
  if (!trimmed) {
    return { brands: [], protocols: [], products: [], resources: [], totalCount: 0 };
  }

  // Also do direct partial substring match for MPNs to ensure 100% partial-match guarantee
  const cleanedQuery = trimmed.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const fuseResults = fuse.search(trimmed);

  const grouped: GroupedSearchResults = {
    brands: [],
    protocols: [],
    products: [],
    resources: [],
    totalCount: 0
  };

  const seenIds = new Set<string>();

  for (const r of fuseResults) {
    const item = r.item;
    if (seenIds.has(item.id)) continue;
    seenIds.add(item.id);

    const score = r.score ?? 1;
    const resItem: SearchResultItem = {
      id: item.id,
      category: item.category,
      title: item.title,
      subtitle: item.subtitle,
      mpn: item.mpn,
      url: item.url,
      statusChip: item.statusChip,
      matchScore: score
    };

    if (item.category === 'brand') grouped.brands.push(resItem);
    else if (item.category === 'protocol') grouped.protocols.push(resItem);
    else if (item.category === 'product') grouped.products.push(resItem);
    else if (item.category === 'resource') grouped.resources.push(resItem);
  }

  // Ensure any item whose MPN or normalized MPN contains the search query is boosted to the top of products
  if (cleanedQuery.length >= 2) {
    grouped.products.sort((a, b) => {
      const aMpnNorm = (a.mpn || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      const bMpnNorm = (b.mpn || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
      const aIncludes = aMpnNorm.includes(cleanedQuery) ? -1 : 0;
      const bIncludes = bMpnNorm.includes(cleanedQuery) ? -1 : 0;
      return aIncludes - bIncludes;
    });
  }

  grouped.totalCount = grouped.brands.length + grouped.protocols.length + grouped.products.length + grouped.resources.length;
  return grouped;
}
