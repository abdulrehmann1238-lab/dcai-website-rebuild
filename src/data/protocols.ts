export interface Protocol {
  slug: string;
  name: string;
  brandSlug: string;
  category: string;
  description: string;
  wireType: string;
  glyphId: 'knx' | 'dali' | 'zigbee' | 'matter' | 'modbus' | 'bacnet' | 'z-wave' | 'ip-ethernet';
}

export const PROTOCOLS: Protocol[] = [
  // Halden (3)
  {
    slug: 'knx',
    name: 'KNX',
    brandSlug: 'halden',
    category: 'Wired Bus',
    description: 'Decentralised twisted-pair bus standard (TP1) for rock-solid residential and commercial building management.',
    wireType: 'TP-1 Shielded (Green)',
    glyphId: 'knx'
  },
  {
    slug: 'dali',
    name: 'DALI',
    brandSlug: 'halden',
    category: 'Lighting Control',
    description: 'Digital Addressable Lighting Interface broadcast and addressed lines for multi-tier architectural illumination.',
    wireType: '2-Wire Unpolarized',
    glyphId: 'dali'
  },
  {
    slug: 'modbus',
    name: 'Modbus',
    brandSlug: 'halden',
    category: 'Industrial Bus',
    description: 'RS-485 serial RTU interfacing for chillers, variable frequency drives, and heavy power metering.',
    wireType: 'RS-485 2-Wire Shielded',
    glyphId: 'modbus'
  },

  // Verelli (3)
  {
    slug: 'dali-2',
    name: 'DALI-2',
    brandSlug: 'verelli',
    category: 'Lighting & Sensors',
    description: 'IEC 62386 standard lighting control with bi-directional multi-master application controllers and sensory arrays.',
    wireType: '2-Wire Mains-Rated',
    glyphId: 'dali'
  },
  {
    slug: 'zigbee',
    name: 'Zigbee',
    brandSlug: 'verelli',
    category: 'Wireless Mesh',
    description: 'Low-latency 2.4 GHz wireless mesh keypads and architectural dimmers designed for luxury retrofits.',
    wireType: 'Wireless IEEE 802.15.4',
    glyphId: 'zigbee'
  },
  {
    slug: 'matter',
    name: 'Matter',
    brandSlug: 'verelli',
    category: 'Unified Wireless',
    description: 'Next-generation Thread/Wi-Fi connected controllers that interoperate directly with major ecosystem platforms.',
    wireType: 'Thread / Wi-Fi',
    glyphId: 'matter'
  },

  // Korvane (3)
  {
    slug: 'zigbee',
    name: 'Zigbee',
    brandSlug: 'korvane',
    category: 'Wireless Mesh',
    description: 'Sub-second wireless sensor networks, thermostat heads, and micro-relays for rapid residential rollout.',
    wireType: 'Wireless 2.4 GHz Mesh',
    glyphId: 'zigbee'
  },
  {
    slug: 'matter',
    name: 'Matter',
    brandSlug: 'korvane',
    category: 'Unified Wireless',
    description: 'Secure, local-first Matter-over-Thread door locks, multi-sensors, and bridge units.',
    wireType: 'Thread 802.15.4',
    glyphId: 'matter'
  },
  {
    slug: 'z-wave',
    name: 'Z-Wave',
    brandSlug: 'korvane',
    category: 'Sub-GHz Mesh',
    description: 'Sub-1 GHz high-penetration RF modules ideal for dense concrete and reinforced building structures.',
    wireType: '916 MHz / 868 MHz RF',
    glyphId: 'z-wave'
  },

  // Tessaro (3)
  {
    slug: 'bacnet',
    name: 'BACnet',
    brandSlug: 'tessaro',
    category: 'Building Automation',
    description: 'ANSI/ASHRAE Standard 135 controllers for commercial HVAC, chillers, AHUs, and central plant supervisors.',
    wireType: 'BACnet/IP & MS/TP',
    glyphId: 'bacnet'
  },
  {
    slug: 'modbus',
    name: 'Modbus',
    brandSlug: 'tessaro',
    category: 'Field Bus',
    description: 'High-speed fieldbus gateways connecting electrical panels, heat pumps, and generator controllers to BMS.',
    wireType: 'RS-485 / Modbus TCP',
    glyphId: 'modbus'
  },
  {
    slug: 'ip-ethernet',
    name: 'IP / Ethernet',
    brandSlug: 'tessaro',
    category: 'Enterprise Network',
    description: 'Gigabit Ethernet automation backbones with dual-NIC failover and encrypted MQTT/REST field connectivity.',
    wireType: 'Cat6 Shielded RJ-45',
    glyphId: 'ip-ethernet'
  }
];

export function getProtocolsForBrand(brandSlug: string): Protocol[] {
  return PROTOCOLS.filter(p => p.brandSlug.toLowerCase() === brandSlug.toLowerCase());
}

export function getProtocol(brandSlug: string, protocolSlug: string): Protocol | undefined {
  return PROTOCOLS.find(
    p => p.brandSlug.toLowerCase() === brandSlug.toLowerCase() && p.slug.toLowerCase() === protocolSlug.toLowerCase()
  );
}
