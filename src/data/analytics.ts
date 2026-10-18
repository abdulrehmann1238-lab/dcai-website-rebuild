export interface DailyMetric {
  date: string;
  views: number;
  downloads: number;
  searches: number;
}

export interface SearchMetric {
  query: string;
  count: number;
  resultsCount: number;
  lastSearched: string;
}

export interface DownloadMetric {
  mpn: string;
  title: string;
  type: string;
  count: number;
}

// Generate deterministic 90 days of data
export function generateSeedDailyMetrics(): DailyMetric[] {
  const metrics: DailyMetric[] = [];
  const today = new Date(2026, 2, 28); // March 28, 2026

  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dayOfWeek = d.getDay(); // 0 is Sunday, 6 is Saturday
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // Upward trend over 90 days + weekday seasonality
    const trend = 1 + (90 - i) * 0.003;
    const base = isWeekend ? 650 : 1150;
    const jitter = Math.sin(i * 1.5) * 80;
    const views = Math.round((base + jitter) * trend);
    const downloads = Math.round(views * (0.08 + Math.cos(i) * 0.02));
    const searches = Math.round(views * (0.16 + Math.sin(i * 0.7) * 0.03));

    const dateStr = d.toISOString().split('T')[0];
    metrics.push({ date: dateStr, views, downloads, searches });
  }

  return metrics;
}

export const SEED_SEARCHES: SearchMetric[] = [
  { query: 'HLD-KX-4412', count: 142, resultsCount: 1, lastSearched: '10 mins ago' },
  { query: 'dali gateway', count: 96, resultsCount: 4, lastSearched: '25 mins ago' },
  { query: 'bacnet', count: 88, resultsCount: 6, lastSearched: '1 hour ago' },
  { query: 'zigbee thermostat', count: 71, resultsCount: 2, lastSearched: '3 hours ago' },
  { query: 'modbus', count: 65, resultsCount: 8, lastSearched: '4 hours ago' },
  { query: 'matter door lock', count: 52, resultsCount: 1, lastSearched: '5 hours ago' },
  { query: 'vav controller', count: 48, resultsCount: 2, lastSearched: '6 hours ago' },
  { query: 'ets6 application', count: 34, resultsCount: 3, lastSearched: 'Yesterday' },
];

export const SEED_ZERO_SEARCHES: SearchMetric[] = [
  { query: 'ethernet switch', count: 14, resultsCount: 0, lastSearched: '2 hours ago' },
  { query: 'price list', count: 11, resultsCount: 0, lastSearched: 'Yesterday' },
  { query: 'wireless smoke detector', count: 7, resultsCount: 0, lastSearched: '2 days ago' },
  { query: 'crestron bridge', count: 5, resultsCount: 0, lastSearched: '3 days ago' },
];

export const SEED_TOP_DOWNLOADS: DownloadMetric[] = [
  { mpn: 'HLD-KX-4412', title: 'HLD-KX-4412 Technical Datasheet', type: 'Datasheet', count: 184 },
  { mpn: 'VRL-D2-1031', title: 'VRL-D2-1031 Architectural Datasheet', type: 'Datasheet', count: 142 },
  { mpn: 'TSR-BC-3305', title: 'TSR-BC-3305 Engineering Datasheet', type: 'Datasheet', count: 129 },
  { mpn: 'KRV-ZB-7720', title: 'KRV-ZB-7720 HVAC Wiring Guide', type: 'Manual', count: 115 },
  { mpn: 'HLD-DL-2208', title: 'HLD-DL-2208 Commissioning Manual', type: 'Manual', count: 98 },
  { mpn: 'KRV-MT-8810', title: 'KRV-MT-8810 Mortise Installation Template', type: 'Manual', count: 86 },
];
