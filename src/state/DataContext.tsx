import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Product, SEED_PRODUCTS } from '../data/products';
import { Resource, RESOURCES } from '../data/resources';
import {
  DailyMetric,
  SearchMetric,
  DownloadMetric,
  generateSeedDailyMetrics,
  SEED_SEARCHES,
  SEED_ZERO_SEARCHES,
  SEED_TOP_DOWNLOADS
} from '../data/analytics';
import { buildSearchIndex, executeSearch, GroupedSearchResults } from '../lib/search';

interface DataContextType {
  products: Product[];
  resources: Resource[];
  analytics: {
    dailyMetrics: DailyMetric[];
    searches: SearchMetric[];
    zeroSearches: SearchMetric[];
    topDownloads: DownloadMetric[];
    totalViews: number;
    totalDownloads: number;
    totalSearches: number;
  };
  searchQuery: (q: string) => GroupedSearchResults;
  updateProduct: (mpn: string, updates: Partial<Product>) => void;
  importProducts: (incoming: Product[]) => { created: number; updated: number; skipped: number };
  addResource: (resource: Resource) => void;
  trackSearch: (query: string, resultsCount: number) => void;
  trackDownload: (mpn: string, title: string, type?: string) => void;
  trackPageView: (path: string) => void;
  resetDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = sessionStorage.getItem('dcai_products');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return SEED_PRODUCTS;
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    try {
      const saved = sessionStorage.getItem('dcai_resources');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return RESOURCES;
  });

  const [dailyMetrics, setDailyMetrics] = useState<DailyMetric[]>(generateSeedDailyMetrics);
  const [searches, setSearches] = useState<SearchMetric[]>(SEED_SEARCHES);
  const [zeroSearches, setZeroSearches] = useState<SearchMetric[]>(SEED_ZERO_SEARCHES);
  const [topDownloads, setTopDownloads] = useState<DownloadMetric[]>(SEED_TOP_DOWNLOADS);

  // Memoized Fuse search index
  const fuseIndex = useMemo(() => {
    return buildSearchIndex(products);
  }, [products]);

  const searchQuery = useCallback((q: string) => {
    return executeSearch(fuseIndex, q);
  }, [fuseIndex]);

  const updateProduct = useCallback((mpn: string, updates: Partial<Product>) => {
    setProducts(prev => {
      const next = prev.map(p => {
        if (p.mpn.toUpperCase() === mpn.toUpperCase()) {
          return { ...p, ...updates, updatedAt: new Date().toISOString().split('T')[0] };
        }
        return p;
      });
      try {
        sessionStorage.setItem('dcai_products', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const importProducts = useCallback((incoming: Product[]) => {
    let created = 0;
    let updated = 0;
    let skipped = 0;

    setProducts(prev => {
      const existingMpnMap = new Map<string, number>();
      prev.forEach((p, idx) => existingMpnMap.set(p.mpn.toUpperCase(), idx));

      const next = [...prev];

      for (const item of incoming) {
        if (!item.mpn || !item.name) {
          skipped++;
          continue;
        }
        const key = item.mpn.toUpperCase();
        if (existingMpnMap.has(key)) {
          const idx = existingMpnMap.get(key)!;
          next[idx] = { ...next[idx], ...item, updatedAt: new Date().toISOString().split('T')[0] };
          updated++;
        } else {
          next.push({
            ...item,
            isNew: true,
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0]
          });
          created++;
        }
      }

      try {
        sessionStorage.setItem('dcai_products', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });

    return { created, updated, skipped };
  }, []);

  const addResource = useCallback((resource: Resource) => {
    setResources(prev => {
      const next = [resource, ...prev];
      try {
        sessionStorage.setItem('dcai_resources', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const trackSearch = useCallback((query: string, resultsCount: number) => {
    const qTrimmed = query.trim();
    if (!qTrimmed) return;

    if (resultsCount === 0) {
      setZeroSearches(prev => {
        const existing = prev.find(s => s.query.toLowerCase() === qTrimmed.toLowerCase());
        if (existing) {
          return prev.map(s => s.query.toLowerCase() === qTrimmed.toLowerCase()
            ? { ...s, count: s.count + 1, lastSearched: 'Just now' }
            : s
          );
        }
        return [{ query: qTrimmed, count: 1, resultsCount: 0, lastSearched: 'Just now' }, ...prev];
      });
    } else {
      setSearches(prev => {
        const existing = prev.find(s => s.query.toLowerCase() === qTrimmed.toLowerCase());
        if (existing) {
          return prev.map(s => s.query.toLowerCase() === qTrimmed.toLowerCase()
            ? { ...s, count: s.count + 1, lastSearched: 'Just now' }
            : s
          );
        }
        return [{ query: qTrimmed, count: 1, resultsCount, lastSearched: 'Just now' }, ...prev];
      });
    }

    // Increment today's search metric
    setDailyMetrics(prev => {
      const next = [...prev];
      if (next.length > 0) {
        next[next.length - 1] = {
          ...next[next.length - 1],
          searches: next[next.length - 1].searches + 1
        };
      }
      return next;
    });
  }, []);

  const trackDownload = useCallback((mpn: string, title: string, type: string = 'Datasheet') => {
    setTopDownloads(prev => {
      const existing = prev.find(d => d.mpn.toUpperCase() === mpn.toUpperCase());
      if (existing) {
        return prev.map(d => d.mpn.toUpperCase() === mpn.toUpperCase()
          ? { ...d, count: d.count + 1 }
          : d
        );
      }
      return [{ mpn, title, type, count: 1 }, ...prev];
    });

    // Increment today's download metric
    setDailyMetrics(prev => {
      const next = [...prev];
      if (next.length > 0) {
        next[next.length - 1] = {
          ...next[next.length - 1],
          downloads: next[next.length - 1].downloads + 1
        };
      }
      return next;
    });
  }, []);

  const trackPageView = useCallback((_path: string) => {
    setDailyMetrics(prev => {
      const next = [...prev];
      if (next.length > 0) {
        next[next.length - 1] = {
          ...next[next.length - 1],
          views: next[next.length - 1].views + 1
        };
      }
      return next;
    });
  }, []);

  const resetDemoData = useCallback(() => {
    try {
      sessionStorage.removeItem('dcai_products');
      sessionStorage.removeItem('dcai_resources');
    } catch {
      // ignore
    }
    setProducts(SEED_PRODUCTS);
    setResources(RESOURCES);
    setDailyMetrics(generateSeedDailyMetrics());
    setSearches(SEED_SEARCHES);
    setZeroSearches(SEED_ZERO_SEARCHES);
    setTopDownloads(SEED_TOP_DOWNLOADS);
  }, []);

  const totals = useMemo(() => {
    const totalViews = dailyMetrics.reduce((acc, m) => acc + m.views, 0);
    const totalDownloads = dailyMetrics.reduce((acc, m) => acc + m.downloads, 0);
    const totalSearches = dailyMetrics.reduce((acc, m) => acc + m.searches, 0);
    return { totalViews, totalDownloads, totalSearches };
  }, [dailyMetrics]);

  return (
    <DataContext.Provider
      value={{
        products,
        resources,
        analytics: {
          dailyMetrics,
          searches,
          zeroSearches,
          topDownloads,
          totalViews: totals.totalViews,
          totalDownloads: totals.totalDownloads,
          totalSearches: totals.totalSearches
        },
        searchQuery,
        updateProduct,
        importProducts,
        addResource,
        trackSearch,
        trackDownload,
        trackPageView,
        resetDemoData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}
