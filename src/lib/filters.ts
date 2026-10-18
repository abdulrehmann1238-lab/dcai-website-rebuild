import { Product } from '../data/products';

export interface FilterState {
  status: string[]; // 'Active', 'Discontinued'
  productTypes: string[];
  mountings: string[];
  searchQuery: string;
  sortBy: 'relevance' | 'name-asc' | 'mpn-asc' | 'newest';
}

export interface FacetCount {
  value: string;
  count: number;
  disabled: boolean;
}

export interface GridFacets {
  status: FacetCount[];
  productTypes: FacetCount[];
  mountings: FacetCount[];
}

export const INITIAL_FILTER_STATE: FilterState = {
  status: [],
  productTypes: [],
  mountings: [],
  searchQuery: '',
  sortBy: 'relevance'
};

export function filterAndSortProducts(
  products: Product[],
  filters: FilterState
): { filteredProducts: Product[]; facets: GridFacets } {
  // 1. Filter by search query first if present
  let filtered = products;

  if (filters.searchQuery.trim()) {
    const q = filters.searchQuery.trim().toLowerCase();
    const qClean = q.replace(/[^a-z0-9]/g, '');
    filtered = filtered.filter(p => {
      const matchName = p.name.toLowerCase().includes(q);
      const matchMpn = p.mpn.toLowerCase().includes(q) || p.mpn.toLowerCase().replace(/[^a-z0-9]/g, '').includes(qClean);
      const matchDesc = p.shortDescription.toLowerCase().includes(q);
      return matchName || matchMpn || matchDesc;
    });
  }

  // 2. Build dynamic facets based on currently eligible products
  // Status facets
  const statusValues = ['Active', 'Discontinued'];
  const statusFacets: FacetCount[] = statusValues.map(val => {
    // Count how many products match if this status is selected (ignoring status filter itself)
    const count = filtered.filter(p => {
      const matchType = filters.productTypes.length === 0 || filters.productTypes.includes(p.productType);
      const matchMount = filters.mountings.length === 0 || filters.mountings.includes(p.specs.mounting);
      return p.status === val && matchType && matchMount;
    }).length;
    return { value: val, count, disabled: count === 0 };
  });

  // Product type facets
  const allTypes = Array.from(new Set(products.map(p => p.productType))).sort();
  const typeFacets: FacetCount[] = allTypes.map(type => {
    const count = filtered.filter(p => {
      const matchStatus = filters.status.length === 0 || filters.status.includes(p.status);
      const matchMount = filters.mountings.length === 0 || filters.mountings.includes(p.specs.mounting);
      return p.productType === type && matchStatus && matchMount;
    }).length;
    return { value: type, count, disabled: count === 0 };
  });

  // Mounting facets
  const allMountings = Array.from(new Set(products.map(p => p.specs.mounting))).sort();
  const mountingFacets: FacetCount[] = allMountings.map(mount => {
    const count = filtered.filter(p => {
      const matchStatus = filters.status.length === 0 || filters.status.includes(p.status);
      const matchType = filters.productTypes.length === 0 || filters.productTypes.includes(p.productType);
      return p.specs.mounting === mount && matchStatus && matchType;
    }).length;
    return { value: mount, count, disabled: count === 0 };
  });

  // 3. Apply active filters to get final product list
  let result = filtered.filter(p => {
    const matchStatus = filters.status.length === 0 || filters.status.includes(p.status);
    const matchType = filters.productTypes.length === 0 || filters.productTypes.includes(p.productType);
    const matchMount = filters.mountings.length === 0 || filters.mountings.includes(p.specs.mounting);
    return matchStatus && matchType && matchMount;
  });

  // 4. Sort
  result = [...result].sort((a, b) => {
    if (filters.sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    }
    if (filters.sortBy === 'mpn-asc') {
      return a.mpn.localeCompare(b.mpn);
    }
    if (filters.sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // 'relevance' (default: active first, then newly imported, then MPN)
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    if (a.status === 'Active' && b.status === 'Discontinued') return -1;
    if (a.status === 'Discontinued' && b.status === 'Active') return 1;
    return a.mpn.localeCompare(b.mpn);
  });

  return {
    filteredProducts: result,
    facets: {
      status: statusFacets,
      productTypes: typeFacets,
      mountings: mountingFacets
    }
  };
}
