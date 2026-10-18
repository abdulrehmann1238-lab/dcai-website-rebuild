export interface Brand {
  slug: string;
  name: string;
  tagline: string;
  positioning: string;
  description: string;
  founded: number;
  origin: string;
  certifications: string[];
  protocols: string[]; // protocol slugs
  status: 'published' | 'hidden';
}

export const BRANDS: Brand[] = [
  {
    slug: 'halden',
    name: 'Halden',
    tagline: 'Precision building control, engineered in the European tradition.',
    positioning: 'Nordic precision engineering for robust residential and commercial infrastructure.',
    description: 'Founded in 1987 in Oslo, Halden manufactures industrial-grade bus actuators, controllers, and field interfaces. Known for uncompromising component tolerances, Halden modules power mission-critical automation across thousands of Nordic and Southeast Asian installations.',
    founded: 1987,
    origin: 'Norway',
    certifications: ['ISO 9001:2015 Manufacturing', 'KNX Association Certified Partner', 'CE / EN 50090 Compliant', 'TÜV Rheinland Certified'],
    protocols: ['knx', 'dali', 'modbus'],
    status: 'published'
  },
  {
    slug: 'verelli',
    name: 'Verelli',
    tagline: 'Architectural lighting and scene control for homes and hotels.',
    positioning: 'Refined human interfaces and high-performance lighting control systems.',
    description: 'Verelli bridges architectural aesthetics and digital lighting science. Engineered in Milan, Verelli develops keypads, tactile dimming engines, and DALI-2 gateways that allow lighting designers and hospitality operators to sculpt spaces with micro-step precision.',
    founded: 2004,
    origin: 'Italy',
    certifications: ['DALI-2 Certified (DiiA)', 'Matter Alliance Member', 'Red Dot Design Award Winner 2024', 'Low Voltage Directive 2014/35/EU'],
    protocols: ['dali-2', 'zigbee', 'matter'],
    status: 'published'
  },
  {
    slug: 'korvane',
    name: 'Korvane',
    tagline: 'Wireless smart-home hardware that installs in an afternoon.',
    positioning: 'Rapid-deployment wireless ecosystem for high-end residential retrofits.',
    description: 'Korvane creates battery and mains-powered wireless hardware for premium residential projects where cutting walls is not an option. Featuring dual-protocol micro-modules, smart curtain drives, and precision climate sensors, Korvane brings rapid reliability to system integrators.',
    founded: 2015,
    origin: 'Germany',
    certifications: ['Zigbee 3.0 Certified', 'Matter Certified Hardware', 'Z-Wave Plus V2 Compliant', 'FCC Part 15 Class B'],
    protocols: ['zigbee', 'matter', 'z-wave'],
    status: 'published'
  },
  {
    slug: 'tessaro',
    name: 'Tessaro',
    tagline: 'Open-protocol controllers and gateways for commercial buildings.',
    positioning: 'High-density BACnet and Modbus automation engines for commercial real estate.',
    description: 'Tessaro specializes in open-protocol commercial automation, HVAC VAV controllers, plant management gateways, and sub-metering hardware. Built on native Ethernet backbones, Tessaro gives mechanical consultants total vendor independence and long-term serviceability.',
    founded: 1999,
    origin: 'Switzerland',
    certifications: ['BTL Listed (BACnet Testing Laboratories)', 'Modbus Conformance Tested', 'ASHRAE 135-2020 Standard', 'UL 916 Energy Management Equipment'],
    protocols: ['bacnet', 'modbus', 'ip-ethernet'],
    status: 'published'
  }
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find(b => b.slug.toLowerCase() === slug.toLowerCase());
}
