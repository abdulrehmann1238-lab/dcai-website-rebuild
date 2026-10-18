export interface FloorPlanScene {
  id: number;
  time: string;
  label: string;
  caption: string;
  daylightOpacity: number; // 0 to 1
  blindsOpenPct: number; // 0 to 100
  lightStates: {
    living: number; // 0 to 1
    kitchen: number;
    bedroom: number;
    bath: number;
    entry: number;
  };
  tempText: string;
  tempEco: boolean;
  doorLocked: boolean;
  securityArmed: boolean;
}

export const SCENES: FloorPlanScene[] = [
  {
    id: 1,
    time: '07:00',
    label: 'Morning',
    caption: 'Morning — motorized blinds rise, daylight enters, and subtle warm lighting prepares the space.',
    daylightOpacity: 0.45,
    blindsOpenPct: 40,
    lightStates: { living: 0.2, kitchen: 0.5, bedroom: 0.4, bath: 1.0, entry: 0.2 },
    tempText: '24.0°C',
    tempEco: false,
    doorLocked: false,
    securityArmed: false,
  },
  {
    id: 2,
    time: '13:00',
    label: 'Midday',
    caption: 'Day — daylight harvesting dims interior fixtures; AC adjusts automatically to ambient solar load.',
    daylightOpacity: 0.9,
    blindsOpenPct: 100,
    lightStates: { living: 0.0, kitchen: 0.0, bedroom: 0.0, bath: 0.1, entry: 0.0 },
    tempText: '25.0°C Eco',
    tempEco: true,
    doorLocked: true,
    securityArmed: false,
  },
  {
    id: 3,
    time: '19:00',
    label: 'Evening',
    caption: 'Evening — a single "Welcome" command sets architectural scenes, draws privacy shades, and tempers climate.',
    daylightOpacity: 0.15,
    blindsOpenPct: 60,
    lightStates: { living: 0.7, kitchen: 1.0, bedroom: 0.3, bath: 0.6, entry: 0.5 },
    tempText: '23.0°C',
    tempEco: false,
    doorLocked: false,
    securityArmed: false,
  },
  {
    id: 4,
    time: '23:00',
    label: 'Night',
    caption: 'Night — a single "Goodnight" scene locks exterior deadbolts, secures perimeter, and leaves subtle pathway light.',
    daylightOpacity: 0.05,
    blindsOpenPct: 0,
    lightStates: { living: 0.0, kitchen: 0.0, bedroom: 0.0, bath: 0.05, entry: 0.1 },
    tempText: '21.5°C',
    tempEco: false,
    doorLocked: true,
    securityArmed: true,
  }
];

export interface HotspotInfo {
  id: string;
  title: string;
  x: number;
  y: number;
  description: string;
  protocols: string[];
  protocolLinks: { name: string; url: string }[];
}

export const HOTSPOTS: HotspotInfo[] = [
  {
    id: 'lighting',
    title: 'Architectural Lighting & DALI Dimming',
    x: 320,
    y: 260,
    description: 'Flicker-free 0.1% constant voltage & constant current dimming coordinated across daylight harvesting sensors.',
    protocols: ['DALI-2', 'KNX'],
    protocolLinks: [
      { name: 'Halden DALI', url: '/brands/halden/dali' },
      { name: 'Verelli DALI-2', url: '/brands/verelli/dali-2' }
    ]
  },
  {
    id: 'shading',
    title: 'Motorized Shading & Drapery',
    x: 180,
    y: 80,
    description: 'Whisper-quiet brushless motors responding to solar azimuth and schedule-based privacy curtains.',
    protocols: ['Zigbee', 'KNX'],
    protocolLinks: [
      { name: 'Halden KNX', url: '/brands/halden/knx' },
      { name: 'Korvane Zigbee', url: '/brands/korvane/zigbee' }
    ]
  },
  {
    id: 'climate',
    title: 'Precision Room Climate & Airflow',
    x: 480,
    y: 190,
    description: 'Modulated fan-coil valve and VRF damper regulation with automated setback when patio doors open.',
    protocols: ['BACnet', 'Modbus', 'Zigbee'],
    protocolLinks: [
      { name: 'Tessaro BACnet', url: '/brands/tessaro/bacnet' },
      { name: 'Korvane Zigbee', url: '/brands/korvane/zigbee' }
    ]
  },
  {
    id: 'access',
    title: 'Smart Mortise Access & Perimeter Security',
    x: 140,
    y: 530,
    description: 'European standard motorized mortise locks with Apple Home Key NFC and tamper telemetry over Thread.',
    protocols: ['Matter', 'Thread', 'Z-Wave'],
    protocolLinks: [
      { name: 'Korvane Matter', url: '/brands/korvane/matter' },
      { name: 'Korvane Z-Wave', url: '/brands/korvane/z-wave' }
    ]
  },
  {
    id: 'scenes',
    title: 'Unified Master Scene Engine',
    x: 270,
    y: 380,
    description: 'Tactile milled aluminum keypads orchestrating multi-protocol lighting, shades, and climate in a single press.',
    protocols: ['KNX', 'DALI-2'],
    protocolLinks: [
      { name: 'Halden KNX', url: '/brands/halden/knx' },
      { name: 'Verelli DALI-2', url: '/brands/verelli/dali-2' }
    ]
  }
];
