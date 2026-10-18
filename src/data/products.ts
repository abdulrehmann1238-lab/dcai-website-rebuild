export interface ProductDownload {
  type: 'datasheet' | 'manual' | 'install-guide' | 'cad-drawing';
  title: string;
  fileSize: string;
  version: string;
  updated: string;
  url: string;
}

export interface ProductSpecs {
  dimensions: string;
  weight: string;
  supplyVoltage: string;
  powerConsumption: string;
  ipRating: string;
  operatingTemp: string;
  mounting: 'DIN rail' | 'Wall mount' | 'Ceiling flush' | 'Door mortise' | 'Surface box';
  interfacePorts: string;
  certifications: string[];
}

export interface Product {
  id: string;
  mpn: string;
  name: string;
  brandSlug: string;
  protocolSlug: string;
  productType: string;
  status: 'Active' | 'Discontinued';
  replacementMpn?: string;
  shortDescription: string;
  description: string;
  features: string[];
  useCases: string[];
  images: string[];
  illustrationType: 'din-rail' | 'keypad' | 'sensor' | 'gateway' | 'thermostat' | 'lock';
  specs: ProductSpecs;
  downloads: ProductDownload[];
  related: string[];
  createdAt: string;
  updatedAt: string;
  isNew?: boolean;
}

// 60 Realistic Products seeded across the 4 brands and 12 protocol combinations
export const SEED_PRODUCTS: Product[] = [
  // --- HALDEN / KNX (5 products) ---
  {
    id: 'hld-kx-4412',
    mpn: 'HLD-KX-4412',
    name: '4-Fold Switch Actuator, 16 A C-Load',
    brandSlug: 'halden',
    protocolSlug: 'knx',
    productType: 'Switch Actuator',
    status: 'Active',
    shortDescription: 'Industrial-grade 4-channel relay actuator with high inrush current capacity for capacitive LED loads.',
    description: 'The HLD-KX-4412 is a heavy-duty 4-channel KNX switching actuator engineered specifically for capacitive inrush currents up to 800 A (200 µs). Features integrated manual operation per channel, comprehensive scene controllers, run-time counters, and logical gating functions.',
    features: [
      'High inrush capability up to 800 A / 200 µs for modern LED drivers',
      'Integrated current measurement with threshold alarms',
      'Manual override buttons on front panel with LED status feedback',
      'Time functions: staircase timer with pre-warning, delays, flashing'
    ],
    useCases: ['Commercial office lighting', 'Capacitive LED high-bay arrays', 'Hospitality corridor switching'],
    images: [
      'https://assets.dcai.example/products/halden/knx/hld-kx-4412/front.svg',
      'https://assets.dcai.example/products/halden/knx/hld-kx-4412/iso.svg',
      'https://assets.dcai.example/products/halden/knx/hld-kx-4412/terminal.svg'
    ],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '72 × 90 × 64 mm (4 DIN modules)',
      weight: '260 g',
      supplyVoltage: '24 V DC (KNX bus 21–30 V DC)',
      powerConsumption: '< 0.3 W (KNX bus)',
      ipRating: 'IP20',
      operatingTemp: '-5 °C to +45 °C',
      mounting: 'DIN rail',
      interfacePorts: 'KNX bus terminal (red/black), 8× screw terminals up to 4 mm²',
      certifications: ['KNX Certified', 'CE EN 50090-2-2', 'IEC 60669-2-5']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-KX-4412 Technical Datasheet', fileSize: '1.2 MB', version: 'v2.4', updated: 'March 2026', url: 'https://assets.dcai.example/products/halden/knx/hld-kx-4412/datasheet.pdf' },
      { type: 'manual', title: 'HLD-KX-4412 Installation & Commissioning Manual', fileSize: '3.8 MB', version: 'v2.1', updated: 'January 2026', url: 'https://assets.dcai.example/products/halden/knx/hld-kx-4412/manual.pdf' },
      { type: 'install-guide', title: 'Wiring Schematic & ETS5/6 Application Guide', fileSize: '850 KB', version: 'v1.3', updated: 'February 2026', url: 'https://assets.dcai.example/products/halden/knx/hld-kx-4412/ets-guide.pdf' }
    ],
    related: ['HLD-KX-8816', 'HLD-DL-2208', 'HLD-KX-0640'],
    createdAt: '2025-08-10',
    updatedAt: '2026-03-01'
  },
  {
    id: 'hld-kx-8816',
    mpn: 'HLD-KX-8816',
    name: '8-Fold Universal Switch/Shutter Actuator',
    brandSlug: 'halden',
    protocolSlug: 'knx',
    productType: 'Switch Actuator',
    status: 'Active',
    shortDescription: 'Flexible 8-channel DIN actuator configurable pairwise for motorized blinds, curtains, or individual 16 A circuits.',
    description: 'High-density 8-channel switching and shading module. Each channel pair can be independently parameterized in ETS as either two independent 16 A switches or one interlocking sunblind drive channel with precise slat positioning.',
    features: [
      'Pairwise configurable as 8 switch channels or 4 blind/shutter outputs',
      'Sun-tracking algorithm and automatic slat adjustment inputs',
      'Electronic interlock preventing concurrent Up/Down motor powering'
    ],
    useCases: ['High-end luxury residences', 'Curtain and blind automation', 'Hotel room fan-coil & lighting'],
    images: [
      'https://assets.dcai.example/products/halden/knx/hld-kx-8816/front.svg',
      'https://assets.dcai.example/products/halden/knx/hld-kx-8816/side.svg',
      'https://assets.dcai.example/products/halden/knx/hld-kx-8816/ports.svg'
    ],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '144 × 90 × 64 mm (8 DIN modules)',
      weight: '490 g',
      supplyVoltage: '24 V DC (KNX bus 21–30 V DC)',
      powerConsumption: '< 0.5 W',
      ipRating: 'IP20',
      operatingTemp: '-5 °C to +45 °C',
      mounting: 'DIN rail',
      interfacePorts: 'KNX bus terminal, 16× screw terminals (10 A inductive, 16 A resistive)',
      certifications: ['KNX Certified', 'CE Mark', 'RoHS 3']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-KX-8816 Technical Datasheet', fileSize: '1.4 MB', version: 'v2.0', updated: 'February 2026', url: 'https://assets.dcai.example/products/halden/knx/hld-kx-8816/datasheet.pdf' },
      { type: 'manual', title: 'HLD-KX-8816 Hardware & ETS Database Guide', fileSize: '4.2 MB', version: 'v1.8', updated: 'December 2025', url: 'https://assets.dcai.example/products/halden/knx/hld-kx-8816/manual.pdf' }
    ],
    related: ['HLD-KX-4412', 'HLD-KX-0640'],
    createdAt: '2025-06-14',
    updatedAt: '2026-02-12'
  },
  {
    id: 'hld-kx-0640',
    mpn: 'HLD-KX-0640',
    name: 'KNX Power Supply 640 mA with Choke & Aux',
    brandSlug: 'halden',
    protocolSlug: 'knx',
    productType: 'Power Supply',
    status: 'Active',
    shortDescription: 'Regulated 30 V DC power supply with integrated decoupling choke and additional 30 V DC auxiliary output.',
    description: 'Stabilized power unit designed to power a full 64-device KNX line. Incorporates an integrated choke for bus decoupling, overload diagnostics with LED indicators, and an auxiliary unchoked 30 V DC output to supply ancillary line controllers.',
    features: [
      '640 mA continuous output with short-circuit and overload protection',
      'Auxiliary 30 V DC terminal for secondary devices',
      'Front-panel reset button with timer delay'
    ],
    useCases: ['KNX backbone lines', 'Standard residential lines (up to 64 devices)'],
    images: [
      'https://assets.dcai.example/products/halden/knx/hld-kx-0640/front.svg',
      'https://assets.dcai.example/products/halden/knx/hld-kx-0640/iso.svg',
      'https://assets.dcai.example/products/halden/knx/hld-kx-0640/ports.svg'
    ],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '72 × 90 × 64 mm (4 DIN modules)',
      weight: '310 g',
      supplyVoltage: '230 V AC, 50/60 Hz',
      powerConsumption: 'Max 24 W full load',
      ipRating: 'IP20',
      operatingTemp: '-5 °C to +50 °C',
      mounting: 'DIN rail',
      interfacePorts: 'AC Mains terminals, KNX bus terminal, Aux DC terminal',
      certifications: ['KNX Certified', 'EN 61558-2-16', 'CE Mark']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-KX-0640 Technical Datasheet', fileSize: '980 KB', version: 'v3.1', updated: 'January 2026', url: 'https://assets.dcai.example/products/halden/knx/hld-kx-0640/datasheet.pdf' }
    ],
    related: ['HLD-KX-4412', 'HLD-KX-1280'],
    createdAt: '2025-03-20',
    updatedAt: '2026-01-10'
  },
  {
    id: 'hld-kx-1280',
    mpn: 'HLD-KX-1280',
    name: 'KNX Power Supply 1280 mA High-Density',
    brandSlug: 'halden',
    protocolSlug: 'knx',
    productType: 'Power Supply',
    status: 'Active',
    shortDescription: 'High-power 1280 mA line supply for extended topology segments and high-draw touchscreen installations.',
    description: 'Powers heavy KNX segments containing glass smart touchscreens and multi-room rotary controllers. Includes real-time bus current diagnostics streamed back onto the KNX bus as telemetry telegrams.',
    features: ['1280 mA continuous rated load', 'Digital bus telemetry output (current, voltage, overload count)', 'Redundant line parallel capability'],
    useCases: ['Commercial floor distribution', 'High-density multi-sensor residential layouts'],
    images: ['https://assets.dcai.example/products/halden/knx/hld-kx-1280/front.svg', 'https://assets.dcai.example/products/halden/knx/hld-kx-1280/side.svg', 'https://assets.dcai.example/products/halden/knx/hld-kx-1280/ports.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '108 × 90 × 64 mm (6 DIN modules)',
      weight: '440 g',
      supplyVoltage: '100–240 V AC, 50/60 Hz',
      powerConsumption: 'Max 48 W',
      ipRating: 'IP20',
      operatingTemp: '-5 °C to +45 °C',
      mounting: 'DIN rail',
      interfacePorts: 'Mains terminals, dual decoupled bus outputs',
      certifications: ['KNX Certified', 'UL 62368-1', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-KX-1280 Technical Datasheet', fileSize: '1.1 MB', version: 'v2.1', updated: 'March 2026', url: 'https://assets.dcai.example/products/halden/knx/hld-kx-1280/datasheet.pdf' }
    ],
    related: ['HLD-KX-0640', 'HLD-KX-4412'],
    createdAt: '2025-05-18',
    updatedAt: '2026-03-01'
  },
  {
    id: 'hld-kx-0320',
    mpn: 'HLD-KX-0320',
    name: 'KNX Power Supply 320 mA Legacy',
    brandSlug: 'halden',
    protocolSlug: 'knx',
    productType: 'Power Supply',
    status: 'Discontinued',
    replacementMpn: 'HLD-KX-0640',
    shortDescription: 'Legacy 320 mA power supply. Superseded by the HLD-KX-0640 with greater thermal efficiency and auxiliary rail.',
    description: 'The HLD-KX-0320 has reached End-of-Life status. Recommended replacement is the HLD-KX-0640 which offers double the output capacity in the exact same 4-module DIN envelope with improved thermal dissipation.',
    features: ['320 mA output with thermal cutoff', 'Integrated bus choke'],
    useCases: ['Small villa or sub-line segments (legacy)'],
    images: ['https://assets.dcai.example/products/halden/knx/hld-kx-0320/front.svg', 'https://assets.dcai.example/products/halden/knx/hld-kx-0320/side.svg', 'https://assets.dcai.example/products/halden/knx/hld-kx-0320/ports.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '72 × 90 × 64 mm (4 DIN modules)',
      weight: '280 g',
      supplyVoltage: '230 V AC',
      powerConsumption: 'Max 14 W',
      ipRating: 'IP20',
      operatingTemp: '0 °C to +40 °C',
      mounting: 'DIN rail',
      interfacePorts: 'Mains screw terminals, KNX bus clip',
      certifications: ['KNX Certified', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-KX-0320 Legacy Datasheet & Replacement Notice', fileSize: '820 KB', version: 'v1.4 (Archival)', updated: 'August 2024', url: 'https://assets.dcai.example/products/halden/knx/hld-kx-0320/datasheet.pdf' }
    ],
    related: ['HLD-KX-0640'],
    createdAt: '2021-02-10',
    updatedAt: '2024-08-30'
  },

  // --- HALDEN / DALI (4 products) ---
  {
    id: 'hld-dl-2208',
    mpn: 'HLD-DL-2208',
    name: 'DALI-2 Multi-Master Gateway, Dual Line',
    brandSlug: 'halden',
    protocolSlug: 'dali',
    productType: 'Gateway',
    status: 'Active',
    shortDescription: 'Industrial gateway bridging two independent DALI-2 lines (up to 128 ECG ballasts) into the KNX TP network.',
    description: 'Connects two physical DALI lines to the KNX bus. Supports emergency lighting test routines, individual ECG diagnostic feedback (lamp failure, ballast failure), colour temperature control (Tunable White DALI Type 8), and RGBW scene management.',
    features: ['Controls 2× 64 DALI devices and up to 2× 16 DALI groups', 'Colour temperature management (DALI Type 8 / Tc) and Human Centric Lighting', 'Automated emergency luminaire functional & duration testing'],
    useCases: ['Architectural lighting with Tunable White', 'Office towers with emergency fixture testing'],
    images: ['https://assets.dcai.example/products/halden/dali/hld-dl-2208/front.svg', 'https://assets.dcai.example/products/halden/dali/hld-dl-2208/iso.svg', 'https://assets.dcai.example/products/halden/dali/hld-dl-2208/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '72 × 90 × 64 mm (4 DIN modules)',
      weight: '275 g',
      supplyVoltage: '100–240 V AC, 50/60 Hz',
      powerConsumption: '< 4.5 W',
      ipRating: 'IP20',
      operatingTemp: '-5 °C to +45 °C',
      mounting: 'DIN rail',
      interfacePorts: 'Mains terminals, KNX TP terminal, 2× isolated DALI bus pairs',
      certifications: ['DALI-2 Certified', 'KNX Certified', 'IEC 62386', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-DL-2208 Technical Datasheet', fileSize: '1.5 MB', version: 'v2.6', updated: 'March 2026', url: 'https://assets.dcai.example/products/halden/dali/hld-dl-2208/datasheet.pdf' },
      { type: 'manual', title: 'HLD-DL-2208 Commissioning & DCA Plugin Manual', fileSize: '5.1 MB', version: 'v2.2', updated: 'January 2026', url: 'https://assets.dcai.example/products/halden/dali/hld-dl-2208/manual.pdf' }
    ],
    related: ['HLD-KX-4412', 'VRL-D2-1031', 'HLD-DL-1104'],
    createdAt: '2025-04-10',
    updatedAt: '2026-03-02'
  },
  {
    id: 'hld-dl-1104',
    mpn: 'HLD-DL-1104',
    name: 'DALI-2 Single Line Broadcast Gateway',
    brandSlug: 'halden',
    protocolSlug: 'dali',
    productType: 'Gateway',
    status: 'Active',
    shortDescription: 'Cost-effective broadcast controller for up to 64 DALI ECGs without requiring individual fixture addressing.',
    description: 'Designed for residential open spaces and commercial open-plan ceilings where individual luminaire addressing is unnecessary. Operates in broadcast mode, significantly reducing commissioning hours while retaining digital 0.1% smooth dimming curves.',
    features: ['Broadcast dimming for up to 64 drivers', 'No individual DALI addressing required', 'Integrated DALI power supply (250 mA)'],
    useCases: ['Residential open living spaces', 'Retail showrooms', 'Fast-turnaround commercial fit-outs'],
    images: ['https://assets.dcai.example/products/halden/dali/hld-dl-1104/front.svg', 'https://assets.dcai.example/products/halden/dali/hld-dl-1104/side.svg', 'https://assets.dcai.example/products/halden/dali/hld-dl-1104/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '36 × 90 × 64 mm (2 DIN modules)',
      weight: '160 g',
      supplyVoltage: '230 V AC, 50 Hz',
      powerConsumption: '< 3.0 W',
      ipRating: 'IP20',
      operatingTemp: '0 °C to +45 °C',
      mounting: 'DIN rail',
      interfacePorts: 'Mains input, KNX terminal, 1× DALI line terminal',
      certifications: ['DALI-2 Compliant', 'KNX Certified', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-DL-1104 Technical Datasheet', fileSize: '1.0 MB', version: 'v1.4', updated: 'November 2025', url: 'https://assets.dcai.example/products/halden/dali/hld-dl-1104/datasheet.pdf' }
    ],
    related: ['HLD-DL-2208', 'HLD-KX-4412'],
    createdAt: '2025-07-22',
    updatedAt: '2025-11-15'
  },
  {
    id: 'hld-dl-0016',
    mpn: 'HLD-DL-0016',
    name: 'DALI 4-Channel LED Dimmer Module 24V DC',
    brandSlug: 'halden',
    protocolSlug: 'dali',
    productType: 'Dimmer',
    status: 'Active',
    shortDescription: 'Constant-voltage 24 V DC PWM LED driver controller with 4 independently addressable channels.',
    description: 'Engineered for smooth low-end dimming of architectural LED cove strips down to 0.1%. Features 16-bit PWM frequency selection to eradicate camera flicker and acoustic hum in residential and broadcast environments.',
    features: ['4× 4 A outputs (16 A total capacity)', 'Selectable PWM frequency from 600 Hz to 4 kHz', 'Tunable White and RGBW operating modes'],
    useCases: ['Architectural ceiling cove lighting', 'Joinery under-cabinet illumination', 'Hospitality mood lighting'],
    images: ['https://assets.dcai.example/products/halden/dali/hld-dl-0016/front.svg', 'https://assets.dcai.example/products/halden/dali/hld-dl-0016/side.svg', 'https://assets.dcai.example/products/halden/dali/hld-dl-0016/ports.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '72 × 90 × 64 mm (4 DIN modules)',
      weight: '210 g',
      supplyVoltage: '12–48 V DC external input',
      powerConsumption: 'Max 384 W at 24 V DC',
      ipRating: 'IP20',
      operatingTemp: '-10 °C to +45 °C',
      mounting: 'DIN rail',
      interfacePorts: 'DALI bus terminal, DC power in, 4× PWM channel outs',
      certifications: ['DALI-2 Device Type 6 / 8', 'CE', 'RoHS']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-DL-0016 Technical Datasheet', fileSize: '1.1 MB', version: 'v2.0', updated: 'February 2026', url: 'https://assets.dcai.example/products/halden/dali/hld-dl-0016/datasheet.pdf' }
    ],
    related: ['HLD-DL-2208', 'VRL-D2-2004'],
    createdAt: '2025-09-05',
    updatedAt: '2026-02-01'
  },
  {
    id: 'hld-dl-0008',
    mpn: 'HLD-DL-0008',
    name: 'DALI 2-Channel LED Dimmer Module (Legacy)',
    brandSlug: 'halden',
    protocolSlug: 'dali',
    productType: 'Dimmer',
    status: 'Discontinued',
    replacementMpn: 'HLD-DL-0016',
    shortDescription: 'Legacy 2-channel 12V/24V DALI dimmer. Replaced by the 4-channel HLD-DL-0016.',
    description: 'The HLD-DL-0008 has been superseded by the HLD-DL-0016 which doubles channel count and includes full DALI Type 8 Tunable White support.',
    features: ['2× 4 A output', 'DALI Type 6 single channel control'],
    useCases: ['Small residential retrofit strips (legacy)'],
    images: ['https://assets.dcai.example/products/halden/dali/hld-dl-0008/front.svg', 'https://assets.dcai.example/products/halden/dali/hld-dl-0008/side.svg', 'https://assets.dcai.example/products/halden/dali/hld-dl-0008/ports.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '54 × 90 × 64 mm (3 DIN modules)',
      weight: '170 g',
      supplyVoltage: '12–24 V DC',
      powerConsumption: 'Max 192 W',
      ipRating: 'IP20',
      operatingTemp: '0 °C to +40 °C',
      mounting: 'DIN rail',
      interfacePorts: 'DALI terminal, 2-channel output',
      certifications: ['DALI-1', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-DL-0008 Legacy Documentation', fileSize: '740 KB', version: 'v1.2 (Archival)', updated: 'October 2024', url: 'https://assets.dcai.example/products/halden/dali/hld-dl-0008/datasheet.pdf' }
    ],
    related: ['HLD-DL-0016'],
    createdAt: '2022-01-15',
    updatedAt: '2024-10-10'
  },

  // --- HALDEN / MODBUS (4 products) ---
  {
    id: 'hld-mb-0100',
    mpn: 'HLD-MB-0100',
    name: 'Modbus RTU to KNX Bidirectional Gateway',
    brandSlug: 'halden',
    protocolSlug: 'modbus',
    productType: 'Gateway',
    status: 'Active',
    shortDescription: 'Master/Slave RS-485 Modbus interface supporting up to 100 Modbus registers mapped to KNX objects.',
    description: 'Enables direct integration of VRF air-conditioning outdoor units, chillers, solar inverters, and diesel generators into the KNX visualization and control layer. Features user-friendly register table configuration via ETS application.',
    features: ['Supports Modbus RTU Master and Slave modes', 'Configurable baud rates from 1200 to 115200 bps', 'Pre-configured templates for Daikin, Mitsubishi, and Schneider meters'],
    useCases: ['VRF air conditioning monitoring', 'Solar inverter power telemetry', 'Generator run-status alarming'],
    images: ['https://assets.dcai.example/products/halden/modbus/hld-mb-0100/front.svg', 'https://assets.dcai.example/products/halden/modbus/hld-mb-0100/iso.svg', 'https://assets.dcai.example/products/halden/modbus/hld-mb-0100/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '36 × 90 × 64 mm (2 DIN modules)',
      weight: '150 g',
      supplyVoltage: '24 V DC auxiliary + KNX bus',
      powerConsumption: '< 1.5 W',
      ipRating: 'IP20',
      operatingTemp: '-5 °C to +50 °C',
      mounting: 'DIN rail',
      interfacePorts: 'KNX bus terminal, RS-485 pluggable terminal (A, B, Shield, Ground)',
      certifications: ['KNX Certified', 'Modbus Conformance Tested', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-MB-0100 Technical Datasheet', fileSize: '1.2 MB', version: 'v2.2', updated: 'February 2026', url: 'https://assets.dcai.example/products/halden/modbus/hld-mb-0100/datasheet.pdf' },
      { type: 'manual', title: 'HLD-MB-0100 Modbus Register Mapping Manual', fileSize: '3.4 MB', version: 'v1.9', updated: 'December 2025', url: 'https://assets.dcai.example/products/halden/modbus/hld-mb-0100/manual.pdf' }
    ],
    related: ['HLD-KX-4412', 'TSR-MB-0099'],
    createdAt: '2025-06-11',
    updatedAt: '2026-02-18'
  },
  {
    id: 'hld-mb-0300',
    mpn: 'HLD-MB-0300',
    name: '3-Phase Energy Meter with Modbus RTU & LCD',
    brandSlug: 'halden',
    protocolSlug: 'modbus',
    productType: 'Sensor',
    status: 'Active',
    shortDescription: 'MID-approved direct connection 3-phase kWh meter with dual pulse outputs and Modbus communication.',
    description: 'Precision class 1 energy meter designed for sub-distribution panels. Measures active and reactive energy, voltage, current, power factor, and harmonics per phase for green building certification reporting.',
    features: ['Direct connection up to 100 A without external CTs', 'MID certified for sub-billing compliance', 'Backlit graphic LCD displaying multi-tariff records'],
    useCases: ['Tenant electrical sub-metering', 'Solar energy net-generation tracking', 'HVAC load monitoring'],
    images: ['https://assets.dcai.example/products/halden/modbus/hld-mb-0300/front.svg', 'https://assets.dcai.example/products/halden/modbus/hld-mb-0300/side.svg', 'https://assets.dcai.example/products/halden/modbus/hld-mb-0300/ports.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '72 × 90 × 64 mm (4 DIN modules)',
      weight: '340 g',
      supplyVoltage: '3× 230/400 V AC self-powered',
      powerConsumption: '< 2.0 W per phase',
      ipRating: 'IP51 (front), IP20 (terminals)',
      operatingTemp: '-25 °C to +55 °C',
      mounting: 'DIN rail',
      interfacePorts: '3P+N heavy screw terminals up to 25 mm², RS-485 Modbus terminal',
      certifications: ['MID 2014/32/EU Approved', 'IEC 62053-21 Class 1', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-MB-0300 Technical Datasheet', fileSize: '1.6 MB', version: 'v2.5', updated: 'March 2026', url: 'https://assets.dcai.example/products/halden/modbus/hld-mb-0300/datasheet.pdf' }
    ],
    related: ['HLD-MB-0100', 'TSR-MB-0099'],
    createdAt: '2025-04-19',
    updatedAt: '2026-03-01'
  },
  {
    id: 'hld-mb-04io',
    mpn: 'HLD-MB-04IO',
    name: 'Modbus Remote I/O Expander 4 DI / 4 DO',
    brandSlug: 'halden',
    protocolSlug: 'modbus',
    productType: 'Controller',
    status: 'Active',
    shortDescription: 'Field expansion module with 4 digital inputs and 4 relay outputs communicating via Modbus RTU.',
    description: 'Compact satellite unit allowing sensors, water leak detectors, and local contactors in remote mechanical risers to be collected over an RS-485 line without running long multi-core cabling back to the central panel.',
    features: ['4 dry contact inputs with 32-bit pulse counters', '4 potential-free relay outputs rated 10 A', 'Optically isolated RS-485 port up to 2.5 kV'],
    useCases: ['Mechanical room alarm monitoring', 'Water sump pump status and control'],
    images: ['https://assets.dcai.example/products/halden/modbus/hld-mb-04io/front.svg', 'https://assets.dcai.example/products/halden/modbus/hld-mb-04io/side.svg', 'https://assets.dcai.example/products/halden/modbus/hld-mb-04io/ports.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '54 × 90 × 64 mm (3 DIN modules)',
      weight: '190 g',
      supplyVoltage: '24 V DC ±15%',
      powerConsumption: '< 2.5 W',
      ipRating: 'IP20',
      operatingTemp: '-10 °C to +55 °C',
      mounting: 'DIN rail',
      interfacePorts: 'Removable screw terminals, RS-485 Modbus',
      certifications: ['CE', 'RoHS', 'EN 61000-6-2']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-MB-04IO Technical Datasheet', fileSize: '950 KB', version: 'v1.5', updated: 'January 2026', url: 'https://assets.dcai.example/products/halden/modbus/hld-mb-04io/datasheet.pdf' }
    ],
    related: ['HLD-MB-0100', 'TSR-MB-04IO'],
    createdAt: '2025-08-30',
    updatedAt: '2026-01-20'
  },
  {
    id: 'hld-mb-0010',
    mpn: 'HLD-MB-0010',
    name: 'Modbus 0–10V Analog Controller 4AO',
    brandSlug: 'halden',
    protocolSlug: 'modbus',
    productType: 'Controller',
    status: 'Active',
    shortDescription: '4-channel analog output module outputting 0–10 V DC / 4–20 mA for damper actuators and speed controllers.',
    description: 'Precision analog driver designed to modulate commercial ventilation dampers, bypass valves, and variable-speed fan drives via Modbus RTU telegrams with 12-bit output resolution.',
    features: ['4 independently configurable 0–10 V or 0/4–20 mA channels', 'Fail-safe output state on communication loss', 'Manual output potentiometer overrides'],
    useCases: ['Commercial air handling unit dampers', 'Ventilation fan modulation'],
    images: ['https://assets.dcai.example/products/halden/modbus/hld-mb-0010/front.svg', 'https://assets.dcai.example/products/halden/modbus/hld-mb-0010/side.svg', 'https://assets.dcai.example/products/halden/modbus/hld-mb-0010/ports.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '72 × 90 × 64 mm (4 DIN modules)',
      weight: '230 g',
      supplyVoltage: '24 V AC/DC',
      powerConsumption: '< 3.5 W',
      ipRating: 'IP20',
      operatingTemp: '-5 °C to +50 °C',
      mounting: 'DIN rail',
      interfacePorts: '4× analog out pairs, RS-485 Modbus',
      certifications: ['CE', 'IEC 61131-2']
    },
    downloads: [
      { type: 'datasheet', title: 'HLD-MB-0010 Technical Datasheet', fileSize: '1.0 MB', version: 'v2.0', updated: 'February 2026', url: 'https://assets.dcai.example/products/halden/modbus/hld-mb-0010/datasheet.pdf' }
    ],
    related: ['HLD-MB-0100'],
    createdAt: '2025-09-12',
    updatedAt: '2026-02-14'
  },

  // --- VERELLI / DALI-2 (5 products) ---
  {
    id: 'vrl-d2-1031',
    mpn: 'VRL-D2-1031',
    name: 'Verelli Tactile Architectural Keypad, 6-Button',
    brandSlug: 'verelli',
    protocolSlug: 'dali-2',
    productType: 'Keypad',
    status: 'Active',
    shortDescription: 'Solid milled anodized aluminum wall keypad with micro-travel tactile switches and RGB indicator halos.',
    description: 'Machined from a single block of aviation-grade 6061 aluminum with hand-finished bead-blasted texture. Powered directly from the DALI-2 bus line without external power. Each key features custom laser engraving and an individually addressable micro-LED halo.',
    features: ['Bus-powered IEC 62386-301 compliant control device', 'Solid aluminum faceplate in Champagne Brass or Gunmetal finishes', 'Integrated ambient temperature sensor for room climate feedback', 'Supports single-click, double-click, and long-press dimming actions'],
    useCases: ['Luxury residential master suites', 'Executive boardroom scene control', '5-star hotel presidential villas'],
    images: ['https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1031/front.svg', 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1031/profile.svg', 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1031/box.svg'],
    illustrationType: 'keypad',
    specs: {
      dimensions: '86 × 86 × 9 mm (faceplate projection: 4 mm)',
      weight: '145 g',
      supplyVoltage: '9.5–22.5 V DC (DALI bus powered)',
      powerConsumption: '< 0.08 W (4 mA bus current)',
      ipRating: 'IP30',
      operatingTemp: '-5 °C to +45 °C',
      mounting: 'Wall mount',
      interfacePorts: '2-pin unpolarized screw terminal (DALI DA/DA)',
      certifications: ['DALI-2 Certified (DiiA)', 'CE', 'Red Dot Design Award Winner']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-D2-1031 Architectural Datasheet & Finish Guide', fileSize: '2.1 MB', version: 'v3.0', updated: 'March 2026', url: 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1031/datasheet.pdf' },
      { type: 'manual', title: 'VRL-D2-1031 Flush Box & Mounting Guide', fileSize: '1.7 MB', version: 'v2.1', updated: 'February 2026', url: 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1031/mounting-guide.pdf' }
    ],
    related: ['VRL-D2-1021', 'VRL-D2-2004', 'HLD-DL-2208'],
    createdAt: '2025-05-12',
    updatedAt: '2026-03-01'
  },
  {
    id: 'vrl-d2-1021',
    mpn: 'VRL-D2-1021',
    name: 'Verelli Tactile Architectural Keypad, 2-Button',
    brandSlug: 'verelli',
    protocolSlug: 'dali-2',
    productType: 'Keypad',
    status: 'Active',
    shortDescription: 'Minimalist 2-rocker architectural keypad for bedside and secondary portal entry points.',
    description: 'Precision 2-button version of the signature Verelli architectural range. Provides simple toggling and press-to-dim capability with whisper-quiet tactile switch mechanism.',
    features: ['Direct DALI-2 bus powered', 'Bead-blasted anodized finish', 'Subtle downward orientation night-light'],
    useCases: ['Hotel bedside master switch', 'Powder rooms and secondary corridors'],
    images: ['https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1021/front.svg', 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1021/profile.svg', 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1021/ports.svg'],
    illustrationType: 'keypad',
    specs: {
      dimensions: '86 × 86 × 9 mm',
      weight: '135 g',
      supplyVoltage: '9.5–22.5 V DC (DALI bus)',
      powerConsumption: '< 0.05 W (2.5 mA)',
      ipRating: 'IP30',
      operatingTemp: '-5 °C to +45 °C',
      mounting: 'Wall mount',
      interfacePorts: '2-pin unpolarized DALI terminal',
      certifications: ['DALI-2 Certified', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-D2-1021 Technical Datasheet', fileSize: '1.8 MB', version: 'v2.2', updated: 'January 2026', url: 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1021/datasheet.pdf' }
    ],
    related: ['VRL-D2-1031', 'VRL-D2-2004'],
    createdAt: '2025-06-28',
    updatedAt: '2026-01-15'
  },
  {
    id: 'vrl-d2-2004',
    mpn: 'VRL-D2-2004',
    name: 'DALI-2 Multi-Sensor, Ceiling Flush 360°',
    brandSlug: 'verelli',
    protocolSlug: 'dali-2',
    productType: 'Sensor',
    status: 'Active',
    shortDescription: 'Flush-mount architectural sensor combining high-sensitivity PIR motion detection and constant light lux regulation.',
    description: 'Ultra-low profile (protruding only 1.8 mm from ceiling plane) presence detector and daylight sensor. Certified IEC 62386-303 and -304, delivering continuous lux readings and fine micro-movement presence directly to the DALI bus.',
    features: ['Flush architectural bevel with magnetic trim ring', 'High-density multi-segment Fresnel lens covering 8 m diameter at 2.8 m height', 'Integrated lux sensor with 1–2000 lux measurement range'],
    useCases: ['Hospitality guest rooms', 'High-end residential galleries and corridors', 'Executive suites'],
    images: ['https://assets.dcai.example/products/verelli/dali-2/vrl-d2-2004/front.svg', 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-2004/side.svg', 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-2004/ceiling.svg'],
    illustrationType: 'sensor',
    specs: {
      dimensions: 'Ø 54 mm (cutout Ø 44 mm, depth 32 mm)',
      weight: '65 g',
      supplyVoltage: 'DALI bus powered (12–22.5 V DC)',
      powerConsumption: '< 0.1 W (5 mA bus draw)',
      ipRating: 'IP40',
      operatingTemp: '-10 °C to +50 °C',
      mounting: 'Ceiling flush',
      interfacePorts: 'Spring clamp DALI terminals',
      certifications: ['DALI-2 Certified (IEC 62386 Parts 303 & 304)', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-D2-2004 Technical Datasheet & Cutout Template', fileSize: '1.4 MB', version: 'v2.8', updated: 'February 2026', url: 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-2004/datasheet.pdf' },
      { type: 'manual', title: 'VRL-D2-2004 Sensitivity Tuning Guide', fileSize: '2.0 MB', version: 'v1.6', updated: 'December 2025', url: 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-2004/manual.pdf' }
    ],
    related: ['VRL-D2-1031', 'HLD-DL-2208'],
    createdAt: '2025-07-04',
    updatedAt: '2026-02-10'
  },
  {
    id: 'vrl-d2-3010',
    mpn: 'VRL-D2-3010',
    name: 'DALI-2 LED Driver 35W Tunable White',
    brandSlug: 'verelli',
    protocolSlug: 'dali-2',
    productType: 'Dimmer',
    status: 'Active',
    shortDescription: 'Constant current 350–1050 mA LED driver with DALI-2 Device Type 8 Tunable White colour control.',
    description: 'High-performance flicker-free LED driver delivering 0.1% amplitude dimming (hybrid PWM-free). Certified for IEEE 1789-2015 zero-flicker standard, ensuring zero video camera banding in residential and hospitality environments.',
    features: ['DALI-2 Type 8 (colour temperature control 2700K–6500K)', 'Selectable constant current output via DIP switch from 350 to 1050 mA', 'Active power factor correction > 0.95 with efficiency up to 91%'],
    useCases: ['Luxury architectural downlights', 'Custom hospitality bedside pendant fixtures'],
    images: ['https://assets.dcai.example/products/verelli/dali-2/vrl-d2-3010/front.svg', 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-3010/side.svg', 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-3010/ports.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '180 × 42 × 30 mm',
      weight: '185 g',
      supplyVoltage: '220–240 V AC, 50/60 Hz',
      powerConsumption: 'Max 38 W full load',
      ipRating: 'IP20',
      operatingTemp: '-20 °C to +50 °C',
      mounting: 'Surface box',
      interfacePorts: 'AC mains push-in terminals, DALI push-in terminals, LED output',
      certifications: ['DALI-2 Certified', 'ENEC', 'CE', 'IEC 61347-2-13']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-D2-3010 Technical Datasheet', fileSize: '1.3 MB', version: 'v2.1', updated: 'March 2026', url: 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-3010/datasheet.pdf' }
    ],
    related: ['VRL-D2-1031', 'VRL-D2-2004'],
    createdAt: '2025-09-18',
    updatedAt: '2026-03-01'
  },
  {
    id: 'vrl-d2-1004',
    mpn: 'VRL-D2-1004',
    name: 'Verelli Push-Button Coupler 4-Way DALI (Legacy)',
    brandSlug: 'verelli',
    protocolSlug: 'dali-2',
    productType: 'Keypad',
    status: 'Discontinued',
    replacementMpn: 'VRL-D2-1031',
    shortDescription: 'Legacy 4-channel contact interface behind mechanical plates. Replaced by native architectural keypads.',
    description: 'The VRL-D2-1004 push-button coupler has reached end-of-sale. Integrators are advised to transition to the native VRL-D2-1031 milled keypads or modern Zigbee/Matter micro-modules for wall plate integration.',
    features: ['4 dry contact inputs', 'DALI-1 bus powered'],
    useCases: ['Retrofit behind standard mechanical plates (legacy)'],
    images: ['https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1004/front.svg', 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1004/side.svg', 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1004/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '38 × 38 × 12 mm',
      weight: '40 g',
      supplyVoltage: 'DALI bus',
      powerConsumption: '< 0.04 W',
      ipRating: 'IP20',
      operatingTemp: '0 °C to +40 °C',
      mounting: 'Wall mount',
      interfacePorts: 'DALI pair, 4 dry contact flying leads',
      certifications: ['DALI-1', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-D2-1004 Legacy Datasheet', fileSize: '650 KB', version: 'v1.1 (Archival)', updated: 'July 2024', url: 'https://assets.dcai.example/products/verelli/dali-2/vrl-d2-1004/datasheet.pdf' }
    ],
    related: ['VRL-D2-1031'],
    createdAt: '2022-03-10',
    updatedAt: '2024-07-28'
  },

  // --- VERELLI / ZIGBEE (4 products) ---
  {
    id: 'vrl-zb-4010',
    mpn: 'VRL-ZB-4010',
    name: 'Verelli Zigbee In-Wall Dual Dimmer Module',
    brandSlug: 'verelli',
    protocolSlug: 'zigbee',
    productType: 'Dimmer',
    status: 'Active',
    shortDescription: 'Ultra-compact in-wall dual phase-cut dimmer supporting trailing and leading edge dimming.',
    description: 'Designed to fit into standard 47 mm deep wall boxes behind existing switch plates or inside ceiling rose canopies. Features automatic load sensing to dynamically configure leading-edge (triac) or trailing-edge (MOSFET) dimming curves.',
    features: ['Two independent 150 W LED dimming channels', 'Auto-sensing phase cut (leading / trailing edge)', 'Over-temperature and surge protection'],
    useCases: ['Heritage home retrofits without neutral at switch', 'Hospitality refurbishment'],
    images: ['https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4010/front.svg', 'https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4010/side.svg', 'https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4010/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '44 × 44 × 18 mm',
      weight: '55 g',
      supplyVoltage: '100–240 V AC, 50/60 Hz (with or without neutral)',
      powerConsumption: '< 0.4 W standby',
      ipRating: 'IP20',
      operatingTemp: '-10 °C to +45 °C',
      mounting: 'Wall mount',
      interfacePorts: 'Push-wire terminals: L, N, L1, L2, S1, S2',
      certifications: ['Zigbee 3.0 Certified', 'CE EN 60669-2-1']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-ZB-4010 Technical Datasheet', fileSize: '1.2 MB', version: 'v2.3', updated: 'February 2026', url: 'https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4010/datasheet.pdf' }
    ],
    related: ['VRL-ZB-4020', 'KRV-ZB-7720'],
    createdAt: '2025-08-14',
    updatedAt: '2026-02-12'
  },
  {
    id: 'vrl-zb-4020',
    mpn: 'VRL-ZB-4020',
    name: 'Verelli Zigbee 4-Gang Wireless Scene Keypad',
    brandSlug: 'verelli',
    protocolSlug: 'zigbee',
    productType: 'Keypad',
    status: 'Active',
    shortDescription: 'Battery-powered wireless surface keypad matching the milled architectural aesthetic of Verelli wired keypads.',
    description: 'Ultra-thin wireless keypad that adheres directly to glass partitions, timber paneling, or masonry without wiring. 3-year battery life on a single CR2450 coin cell while transmitting instantaneous Zigbee 3.0 scene telegrams.',
    features: ['Milled aluminum body matching wired collection', 'Up to 3-year battery life (coin cell CR2450)', 'Magnetic wall bracket with security set-screw'],
    useCases: ['Glass wall installations in executive offices', 'Bedside surface additions'],
    images: ['https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4020/front.svg', 'https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4020/side.svg', 'https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4020/ports.svg'],
    illustrationType: 'keypad',
    specs: {
      dimensions: '86 × 86 × 8.5 mm',
      weight: '98 g',
      supplyVoltage: '3 V DC (CR2450 Lithium battery)',
      powerConsumption: '< 15 µA sleep current',
      ipRating: 'IP30',
      operatingTemp: '0 °C to +40 °C',
      mounting: 'Wall mount',
      interfacePorts: 'Wireless Zigbee 3.0 (2.4 GHz)',
      certifications: ['Zigbee 3.0 Certified', 'CE', 'FCC Part 15']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-ZB-4020 Technical Datasheet', fileSize: '1.1 MB', version: 'v1.8', updated: 'January 2026', url: 'https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4020/datasheet.pdf' }
    ],
    related: ['VRL-ZB-4010', 'VRL-D2-1031'],
    createdAt: '2025-09-02',
    updatedAt: '2026-01-20'
  },
  {
    id: 'vrl-zb-4030',
    mpn: 'VRL-ZB-4030',
    name: 'Verelli Zigbee Curtain Motor Drive',
    brandSlug: 'verelli',
    protocolSlug: 'zigbee',
    productType: 'Controller',
    status: 'Active',
    shortDescription: 'Whisper-quiet motorized drapery drive with built-in Zigbee mesh transceiver and pull-to-start action.',
    description: 'High-torque brushless drapery motor operating below 28 dB(A). Supports touch-motion manual override (gently pulling the fabric initiates motorized glide), variable speed scheduling, and soft-stop ramp profiles.',
    features: ['Sound level < 28 dB(A) acoustic rating', 'Capacity up to 50 kg curtain fabric', 'Touch-motion manual activation'],
    useCases: ['Luxury hotel suites', 'Master bedrooms with heavy blackout drapes'],
    images: ['https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4030/front.svg', 'https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4030/side.svg', 'https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4030/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '260 × 52 × 52 mm',
      weight: '820 g',
      supplyVoltage: '100–240 V AC, 50/60 Hz',
      powerConsumption: 'Max 45 W during travel',
      ipRating: 'IP40',
      operatingTemp: '-5 °C to +50 °C',
      mounting: 'Ceiling flush',
      interfacePorts: 'AC power cable (1.5 m), RJ-12 dry contact port',
      certifications: ['Zigbee 3.0', 'CE', 'TÜV']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-ZB-4030 Technical Datasheet', fileSize: '1.5 MB', version: 'v2.0', updated: 'March 2026', url: 'https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4030/datasheet.pdf' }
    ],
    related: ['VRL-ZB-4020', 'KRV-ZB-7730'],
    createdAt: '2025-10-10',
    updatedAt: '2026-03-01'
  },
  {
    id: 'vrl-zb-4001',
    mpn: 'VRL-ZB-4001',
    name: 'Verelli Zigbee Bridge & Network Coordinator',
    brandSlug: 'verelli',
    protocolSlug: 'zigbee',
    productType: 'Gateway',
    status: 'Active',
    shortDescription: 'Dedicated PoE-powered network coordinator managing up to 128 Zigbee child nodes with local automation engine.',
    description: 'Industrial-grade Zigbee coordinator that processes all automation schedules and scene logic on-premise without cloud latency. Connects to local Ethernet with Power-over-Ethernet (802.3af).',
    features: ['Supports up to 128 direct and routed Zigbee 3.0 nodes', 'PoE powered (802.3af)', 'Local REST and WebSocket API for building integration'],
    useCases: ['Multi-room apartment automation hubs', 'Commercial boutique showrooms'],
    images: ['https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4001/front.svg', 'https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4001/side.svg', 'https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4001/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '96 × 96 × 24 mm',
      weight: '160 g',
      supplyVoltage: 'PoE 48 V (802.3af) or USB-C 5 V DC',
      powerConsumption: '< 2.5 W',
      ipRating: 'IP20',
      operatingTemp: '0 °C to +45 °C',
      mounting: 'Wall mount',
      interfacePorts: 'RJ-45 10/100 Ethernet, Zigbee internal antenna, USB-C',
      certifications: ['Zigbee 3.0', 'CE', 'FCC']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-ZB-4001 Technical Datasheet', fileSize: '1.3 MB', version: 'v2.2', updated: 'February 2026', url: 'https://assets.dcai.example/products/verelli/zigbee/vrl-zb-4001/datasheet.pdf' }
    ],
    related: ['VRL-ZB-4010', 'VRL-ZB-4020'],
    createdAt: '2025-07-15',
    updatedAt: '2026-02-05'
  },

  // --- VERELLI / MATTER (4 products) ---
  {
    id: 'vrl-mt-5010',
    mpn: 'VRL-MT-5010',
    name: 'Verelli Matter-Over-Thread In-Wall Dimmer',
    brandSlug: 'verelli',
    protocolSlug: 'matter',
    productType: 'Dimmer',
    status: 'Active',
    shortDescription: 'Native Matter-certified micro-dimmer communicating over Thread low-power mesh networks.',
    description: 'Enables direct ecosystem interoperability with Apple Home, Google Home, SmartThings, and Amazon Alexa simultaneously via Matter Multi-Admin. Employs Thread border router mesh topologies for ultra-low latency without vendor bridges.',
    features: ['Matter over Thread native certification', 'Multi-Admin simultaneous binding', 'Trailing-edge MOSFET dimming with active heat monitoring'],
    useCases: ['Cross-platform luxury residential smart homes', 'Designer condo developments'],
    images: ['https://assets.dcai.example/products/verelli/matter/vrl-mt-5010/front.svg', 'https://assets.dcai.example/products/verelli/matter/vrl-mt-5010/side.svg', 'https://assets.dcai.example/products/verelli/matter/vrl-mt-5010/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '44 × 44 × 19 mm',
      weight: '58 g',
      supplyVoltage: '110–240 V AC, 50/60 Hz',
      powerConsumption: '< 0.3 W',
      ipRating: 'IP20',
      operatingTemp: '-10 °C to +45 °C',
      mounting: 'Wall mount',
      interfacePorts: 'Screwless clamp terminals (L, N, Out, Switch)',
      certifications: ['Matter Certified (CSA)', 'Thread Certified Component', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-MT-5010 Technical Datasheet', fileSize: '1.4 MB', version: 'v2.1', updated: 'March 2026', url: 'https://assets.dcai.example/products/verelli/matter/vrl-mt-5010/datasheet.pdf' }
    ],
    related: ['KRV-MT-8810', 'VRL-MT-5020'],
    createdAt: '2025-10-01',
    updatedAt: '2026-03-01'
  },
  {
    id: 'vrl-mt-5020',
    mpn: 'VRL-MT-5020',
    name: 'Verelli Matter Ambient Light & Presence Sensor',
    brandSlug: 'verelli',
    protocolSlug: 'matter',
    productType: 'Sensor',
    status: 'Active',
    shortDescription: 'Thread-connected ambient daylight and presence detector with dual battery / micro-USB power options.',
    description: 'Precision battery-operated sensor reporting illuminance levels and motion states directly over Thread mesh to Matter controllers without local cloud dependencies.',
    features: ['Thread mesh sleep-and-wake optimization', '3-year battery life or permanent micro-USB power', 'Configurable sensitivity and dwell timers'],
    useCases: ['Smart office daylight harvesting', 'Automated residential entryway lighting'],
    images: ['https://assets.dcai.example/products/verelli/matter/vrl-mt-5020/front.svg', 'https://assets.dcai.example/products/verelli/matter/vrl-mt-5020/side.svg', 'https://assets.dcai.example/products/verelli/matter/vrl-mt-5020/ports.svg'],
    illustrationType: 'sensor',
    specs: {
      dimensions: '48 × 48 × 22 mm',
      weight: '45 g',
      supplyVoltage: '2× AAA Lithium batteries or 5 V DC micro-USB',
      powerConsumption: '< 10 µA standby',
      ipRating: 'IP30',
      operatingTemp: '0 °C to +40 °C',
      mounting: 'Ceiling flush',
      interfacePorts: 'Thread 2.4 GHz RF, micro-USB power in',
      certifications: ['Matter Certified', 'Thread Certified', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-MT-5020 Technical Datasheet', fileSize: '1.0 MB', version: 'v1.7', updated: 'January 2026', url: 'https://assets.dcai.example/products/verelli/matter/vrl-mt-5020/datasheet.pdf' }
    ],
    related: ['VRL-MT-5010', 'KRV-MT-8820'],
    createdAt: '2025-11-12',
    updatedAt: '2026-01-25'
  },
  {
    id: 'vrl-mt-5030',
    mpn: 'VRL-MT-5030',
    name: 'Verelli Matter Smart Plug with Power Metering',
    brandSlug: 'verelli',
    protocolSlug: 'matter',
    productType: 'Switch Actuator',
    status: 'Active',
    shortDescription: '16 A smart outlet adapter with real-time power telemetry and Thread mesh routing capability.',
    description: 'Compact pass-through socket adapter that acts as a Thread Router Node to strengthen the local building RF mesh while providing sub-watt accurate energy telemetry.',
    features: ['16 A continuous load capacity', 'Thread Mesh Router function expands building Thread network', 'Real-time wattage, voltage, and cumulative kWh reporting'],
    useCases: ['Appliance automation', 'Coffee machine scheduling in corporate lounges'],
    images: ['https://assets.dcai.example/products/verelli/matter/vrl-mt-5030/front.svg', 'https://assets.dcai.example/products/verelli/matter/vrl-mt-5030/side.svg', 'https://assets.dcai.example/products/verelli/matter/vrl-mt-5030/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '56 × 56 × 62 mm',
      weight: '92 g',
      supplyVoltage: '100–240 V AC, 50/60 Hz',
      powerConsumption: '< 0.5 W',
      ipRating: 'IP20',
      operatingTemp: '-10 °C to +45 °C',
      mounting: 'Wall mount',
      interfacePorts: 'Type B / Universal socket, Thread RF',
      certifications: ['Matter Certified', 'Thread', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-MT-5030 Technical Datasheet', fileSize: '980 KB', version: 'v2.0', updated: 'February 2026', url: 'https://assets.dcai.example/products/verelli/matter/vrl-mt-5030/datasheet.pdf' }
    ],
    related: ['VRL-MT-5010'],
    createdAt: '2025-10-25',
    updatedAt: '2026-02-14'
  },
  {
    id: 'vrl-mt-5040',
    mpn: 'VRL-MT-5040',
    name: 'Verelli Matter-DALI Bridge Module',
    brandSlug: 'verelli',
    protocolSlug: 'matter',
    productType: 'Gateway',
    status: 'Active',
    shortDescription: 'DIN-rail gateway exposing an entire DALI-2 line into the Matter smart ecosystem.',
    description: 'Bridges up to 64 DALI luminaires directly into Apple Home and Google Home as native Matter lights with smooth colour and intensity sliders.',
    features: ['Maps 64 DALI devices to Matter endpoints', 'Ethernet and Wi-Fi uplink options', 'Local web GUI for rapid DALI grouping'],
    useCases: ['Bridging architectural lighting to consumer interfaces'],
    images: ['https://assets.dcai.example/products/verelli/matter/vrl-mt-5040/front.svg', 'https://assets.dcai.example/products/verelli/matter/vrl-mt-5040/side.svg', 'https://assets.dcai.example/products/verelli/matter/vrl-mt-5040/ports.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '72 × 90 × 64 mm (4 DIN modules)',
      weight: '240 g',
      supplyVoltage: '100–240 V AC',
      powerConsumption: '< 4.0 W',
      ipRating: 'IP20',
      operatingTemp: '-5 °C to +45 °C',
      mounting: 'DIN rail',
      interfacePorts: 'DALI pair, RJ-45 Ethernet, Wi-Fi antenna',
      certifications: ['Matter Certified', 'DALI-2', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'VRL-MT-5040 Technical Datasheet', fileSize: '1.7 MB', version: 'v1.5', updated: 'March 2026', url: 'https://assets.dcai.example/products/verelli/matter/vrl-mt-5040/datasheet.pdf' }
    ],
    related: ['VRL-D2-1031', 'VRL-MT-5010'],
    createdAt: '2025-11-05',
    updatedAt: '2026-03-01'
  },

  // --- KORVANE / ZIGBEE (5 products) ---
  {
    id: 'krv-zb-7720',
    mpn: 'KRV-ZB-7720',
    name: 'Korvane Precision Wireless Thermostat, Zigbee 3.0',
    brandSlug: 'korvane',
    protocolSlug: 'zigbee',
    productType: 'Thermostat',
    status: 'Active',
    shortDescription: 'Minimalist glass-fronted room thermostat with crisp e-paper display and rotary brass control bezel.',
    description: 'Engineered for seamless climate control in luxury residences. Features an ultra-low-power memory-in-pixel display readable in direct sunlight, internal temperature/humidity sensors calibrated to ±0.2 °C, and a machined brass rotary dial.',
    features: ['High-contrast e-paper display with ambient backlight', 'Precision temperature sensor (±0.2 °C accuracy) and humidity telemetry', 'Battery operated (2× AA lithium, up to 2.5 years) or 24 V AC/DC c-wire', 'Operates with fan-coil, split AC, and hydronic radiant valves'],
    useCases: ['High-end condo climate automation', 'Multi-zone split-system VRF coordination', 'Eco-mode setback in vacation properties'],
    images: ['https://assets.dcai.example/products/korvane/zigbee/krv-zb-7720/front.svg', 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7720/side.svg', 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7720/dial.svg'],
    illustrationType: 'thermostat',
    specs: {
      dimensions: '88 × 88 × 16 mm',
      weight: '160 g',
      supplyVoltage: '2× 1.5 V AA batteries or 24 V AC/DC',
      powerConsumption: '< 0.05 W average',
      ipRating: 'IP30',
      operatingTemp: '0 °C to +50 °C',
      mounting: 'Wall mount',
      interfacePorts: 'Sub-base backplate with terminal screws (R, C, Y1, W1, G), Zigbee 3.0 RF',
      certifications: ['Zigbee 3.0 Certified', 'CE Mark', 'RoHS']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-ZB-7720 Technical Datasheet', fileSize: '1.7 MB', version: 'v3.2', updated: 'March 2026', url: 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7720/datasheet.pdf' },
      { type: 'manual', title: 'KRV-ZB-7720 HVAC Wiring & Commissioning Guide', fileSize: '4.5 MB', version: 'v2.8', updated: 'February 2026', url: 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7720/manual.pdf' },
      { type: 'install-guide', title: 'Quick Start Backplate Mounting Template', fileSize: '650 KB', version: 'v1.4', updated: 'January 2026', url: 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7720/mounting.pdf' }
    ],
    related: ['KRV-ZB-7710', 'KRV-ZB-7730', 'KRV-MT-8810'],
    createdAt: '2025-05-15',
    updatedAt: '2026-03-01'
  },
  {
    id: 'krv-zb-7710',
    mpn: 'KRV-ZB-7710',
    name: 'Korvane Micro Switch Relay Module 16A',
    brandSlug: 'korvane',
    protocolSlug: 'zigbee',
    productType: 'Switch Actuator',
    status: 'Active',
    shortDescription: 'In-wall dry contact switching module for lighting, exhaust fans, and water heater contactors.',
    description: 'Compact 16 A relay designed to disappear inside junction boxes or behind wall switches. Incorporates active overload shutdown, power metering, and optional momentary or toggle external switch inputs.',
    features: ['16 A resistive load rated relay', 'Power consumption telemetry (W, kWh)', 'Compatible with existing momentary and rocker wall switches'],
    useCases: ['Water heater timer controls', 'Bathroom extraction fans', 'High-current kitchen appliances'],
    images: ['https://assets.dcai.example/products/korvane/zigbee/krv-zb-7710/front.svg', 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7710/side.svg', 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7710/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '42 × 40 × 17 mm',
      weight: '48 g',
      supplyVoltage: '100–240 V AC or 24–60 V DC',
      powerConsumption: '< 0.4 W',
      ipRating: 'IP20',
      operatingTemp: '-10 °C to +45 °C',
      mounting: 'Wall mount',
      interfacePorts: 'Screw terminals: L, N, Out, SW1, SW2',
      certifications: ['Zigbee 3.0', 'CE', 'IEC 60669-2-1']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-ZB-7710 Technical Datasheet', fileSize: '1.1 MB', version: 'v2.1', updated: 'February 2026', url: 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7710/datasheet.pdf' }
    ],
    related: ['KRV-ZB-7720', 'KRV-ZB-7730'],
    createdAt: '2025-06-20',
    updatedAt: '2026-02-18'
  },
  {
    id: 'krv-zb-7730',
    mpn: 'KRV-ZB-7730',
    name: 'Korvane Motorized Blind & Shade Controller',
    brandSlug: 'korvane',
    protocolSlug: 'zigbee',
    productType: 'Controller',
    status: 'Active',
    shortDescription: 'In-line shade controller for standard 4-wire motorized roller blinds and venetian shades.',
    description: 'Enables fine percentage-based opening and closing of motorized roller blinds. Automatic calibration mode measures transit time and sets end-limits automatically.',
    features: ['Automatic motor travel calibration', 'Dual interlocking relays to prevent motor damage', 'Supports position presets and sun-tracking schedules'],
    useCases: ['Living room motorized solar roller shades', 'Bedroom blackout curtains'],
    images: ['https://assets.dcai.example/products/korvane/zigbee/krv-zb-7730/front.svg', 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7730/side.svg', 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7730/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '42 × 40 × 17 mm',
      weight: '50 g',
      supplyVoltage: '100–240 V AC, 50/60 Hz',
      powerConsumption: '< 0.35 W',
      ipRating: 'IP20',
      operatingTemp: '-10 °C to +40 °C',
      mounting: 'Wall mount',
      interfacePorts: 'Terminals: L, N, Up, Down, S_Up, S_Down',
      certifications: ['Zigbee 3.0', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-ZB-7730 Technical Datasheet', fileSize: '1.2 MB', version: 'v2.0', updated: 'March 2026', url: 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7730/datasheet.pdf' }
    ],
    related: ['KRV-ZB-7720', 'VRL-ZB-4030'],
    createdAt: '2025-07-12',
    updatedAt: '2026-03-01'
  },
  {
    id: 'krv-zb-7740',
    mpn: 'KRV-ZB-7740',
    name: 'Korvane Wireless Door / Window Contact Sensor',
    brandSlug: 'korvane',
    protocolSlug: 'zigbee',
    productType: 'Sensor',
    status: 'Active',
    shortDescription: 'Miniature magnetic reed contact sensor for perimeter monitoring and HVAC setback interlocks.',
    description: 'Slender magnetic contact sensor that mounts flush against window mullions and exterior doors. Triggers instant climate pause if balcony sliders remain ajar for more than 3 minutes, cutting AC wastage.',
    features: ['Up to 5-year battery life (CR1632 coin cell)', 'Sleek 6 mm profile fits inside window reveal', 'Instant tamper and open/close status notification'],
    useCases: ['HVAC shutoff when balcony sliding doors open', 'Perimeter security alerting'],
    images: ['https://assets.dcai.example/products/korvane/zigbee/krv-zb-7740/front.svg', 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7740/side.svg', 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7740/ports.svg'],
    illustrationType: 'sensor',
    specs: {
      dimensions: '38 × 18 × 6 mm (magnet: 24 × 8 × 6 mm)',
      weight: '16 g',
      supplyVoltage: '3 V DC (CR1632 Lithium)',
      powerConsumption: '< 2 µA quiescent',
      ipRating: 'IP40',
      operatingTemp: '-10 °C to +50 °C',
      mounting: 'Wall mount',
      interfacePorts: 'Magnetic proximity reed switch, Zigbee 3.0 RF',
      certifications: ['Zigbee 3.0', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-ZB-7740 Technical Datasheet', fileSize: '890 KB', version: 'v1.6', updated: 'January 2026', url: 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7740/datasheet.pdf' }
    ],
    related: ['KRV-ZB-7720'],
    createdAt: '2025-08-22',
    updatedAt: '2026-01-18'
  },
  {
    id: 'krv-zb-7700',
    mpn: 'KRV-ZB-7700',
    name: 'Korvane Zigbee Hub V1 (Legacy)',
    brandSlug: 'korvane',
    protocolSlug: 'zigbee',
    productType: 'Gateway',
    status: 'Discontinued',
    replacementMpn: 'KRV-MT-8800',
    shortDescription: 'First-generation proprietary Zigbee hub. Replaced by the Korvane Matter-over-Thread Universal Hub.',
    description: 'The KRV-ZB-7700 hub is discontinued. Existing installations can upgrade to the KRV-MT-8800 which supports both Zigbee 3.0 and Thread/Matter with native local processing.',
    features: ['Zigbee 1.2 / 3.0 bridge', 'Wi-Fi 2.4 GHz uplink'],
    useCases: ['Early residential projects (legacy)'],
    images: ['https://assets.dcai.example/products/korvane/zigbee/krv-zb-7700/front.svg', 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7700/side.svg', 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7700/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '75 × 75 × 20 mm',
      weight: '80 g',
      supplyVoltage: '5 V DC USB micro',
      powerConsumption: '< 2.0 W',
      ipRating: 'IP20',
      operatingTemp: '0 °C to +40 °C',
      mounting: 'Wall mount',
      interfacePorts: 'Micro USB, 2.4 GHz RF',
      certifications: ['CE', 'FCC']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-ZB-7700 End-of-Life Notice & Datasheet', fileSize: '680 KB', version: 'v1.0 (Archival)', updated: 'September 2024', url: 'https://assets.dcai.example/products/korvane/zigbee/krv-zb-7700/datasheet.pdf' }
    ],
    related: ['KRV-MT-8800'],
    createdAt: '2021-04-10',
    updatedAt: '2024-09-30'
  },

  // --- KORVANE / MATTER (4 products) ---
  {
    id: 'krv-mt-8810',
    mpn: 'KRV-MT-8810',
    name: 'Korvane Smart Mortise Door Lock, Matter-Ready',
    brandSlug: 'korvane',
    protocolSlug: 'matter',
    productType: 'Lock',
    status: 'Active',
    shortDescription: 'Heavy-duty European profile mortise lock featuring fingerprint biometric sensor and native Thread connectivity.',
    description: 'Commercial-grade motorized European mortise lock with Grade 1 security certification. Unlocks via 3D semiconductor fingerprint scanner (0.3 s response), Apple Home Key (NFC), RFID keycards, mechanical bypass key, or remote Matter encryption commands.',
    features: ['Matter over Thread native communication', 'Apple Home Key (NFC tap-to-unlock) support', 'Emergency USB-C external power port for dead battery scenarios', 'Anti-tamper alarm and auto-deadbolt motorized locking in 0.8 s'],
    useCases: ['Residential main entry doors', 'Executive private office suites', 'High-end hospitality guest villas'],
    images: ['https://assets.dcai.example/products/korvane/matter/krv-mt-8810/front.svg', 'https://assets.dcai.example/products/korvane/matter/krv-mt-8810/side.svg', 'https://assets.dcai.example/products/korvane/matter/krv-mt-8810/handle.svg'],
    illustrationType: 'lock',
    specs: {
      dimensions: '380 × 75 × 24 mm (handle length: 140 mm)',
      weight: '3.4 kg',
      supplyVoltage: '8× AA Alkaline / Lithium batteries (12–18 month life)',
      powerConsumption: '< 40 µA standby, max 350 mA motorized drive',
      ipRating: 'IP55 (weather resistant)',
      operatingTemp: '-20 °C to +60 °C',
      mounting: 'Door mortise',
      interfacePorts: 'European DIN 85/72 mm standard mortise, Thread RF, NFC reader',
      certifications: ['Matter Certified', 'Thread Certified', 'EN 12209 Grade 3 Security', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-MT-8810 Technical Datasheet', fileSize: '2.4 MB', version: 'v3.1', updated: 'March 2026', url: 'https://assets.dcai.example/products/korvane/matter/krv-mt-8810/datasheet.pdf' },
      { type: 'manual', title: 'KRV-MT-8810 Mortise Installation & Locksmith Template', fileSize: '5.8 MB', version: 'v2.4', updated: 'January 2026', url: 'https://assets.dcai.example/products/korvane/matter/krv-mt-8810/manual.pdf' }
    ],
    related: ['KRV-MT-8800', 'KRV-ZB-7740', 'KRV-MT-8820'],
    createdAt: '2025-06-18',
    updatedAt: '2026-03-01'
  },
  {
    id: 'krv-mt-8800',
    mpn: 'KRV-MT-8800',
    name: 'Korvane Matter-over-Thread Border Router Hub',
    brandSlug: 'korvane',
    protocolSlug: 'matter',
    productType: 'Gateway',
    status: 'Active',
    shortDescription: 'Dual-band Thread Border Router and Zigbee 3.0 bridge connecting wireless devices to local LAN.',
    description: 'Forms the backbone of the Korvane wireless home network. Translates Thread IPv6 mesh packets to Ethernet/Wi-Fi and coordinates Matter controllers across multiple vendors with local zero-cloud latency.',
    features: ['Certified Thread Border Router (1.3 specification)', 'Simultaneous Zigbee 3.0 bridge to support legacy sensors', 'Gigabit Ethernet port with PoE support'],
    useCases: ['Central smart home communications hub'],
    images: ['https://assets.dcai.example/products/korvane/matter/krv-mt-8800/front.svg', 'https://assets.dcai.example/products/korvane/matter/krv-mt-8800/side.svg', 'https://assets.dcai.example/products/korvane/matter/krv-mt-8800/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '110 × 110 × 26 mm',
      weight: '210 g',
      supplyVoltage: 'PoE (802.3af) or 5 V DC USB-C',
      powerConsumption: '< 3.0 W',
      ipRating: 'IP20',
      operatingTemp: '-5 °C to +45 °C',
      mounting: 'Wall mount',
      interfacePorts: 'RJ-45 Gigabit Ethernet, USB-C power in, dual internal antennas',
      certifications: ['Matter Certified (CSA)', 'Thread Certified Border Router', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-MT-8800 Technical Datasheet', fileSize: '1.5 MB', version: 'v2.5', updated: 'March 2026', url: 'https://assets.dcai.example/products/korvane/matter/krv-mt-8800/datasheet.pdf' }
    ],
    related: ['KRV-MT-8810', 'KRV-MT-8820'],
    createdAt: '2025-08-01',
    updatedAt: '2026-03-01'
  },
  {
    id: 'krv-mt-8820',
    mpn: 'KRV-MT-8820',
    name: 'Korvane Multi-Sensor 4-in-1 (Thread/Matter)',
    brandSlug: 'korvane',
    protocolSlug: 'matter',
    productType: 'Sensor',
    status: 'Active',
    shortDescription: 'Compact sensor reporting motion, ambient light, temperature, and relative humidity over Thread.',
    description: 'All-in-one wireless monitoring puck. Provides instant motion detection for security routines alongside gradual environmental telemetry for intelligent HVAC setpoint trims.',
    features: ['PIR motion coverage up to 7 meters', '0–100% relative humidity measurement', 'Direct Matter binding without cloud relays'],
    useCases: ['Bathroom climate and extraction automation', 'Pantry motion lighting'],
    images: ['https://assets.dcai.example/products/korvane/matter/krv-mt-8820/front.svg', 'https://assets.dcai.example/products/korvane/matter/krv-mt-8820/side.svg', 'https://assets.dcai.example/products/korvane/matter/krv-mt-8820/ports.svg'],
    illustrationType: 'sensor',
    specs: {
      dimensions: 'Ø 46 mm × 20 mm',
      weight: '42 g',
      supplyVoltage: '1× CR123A Lithium battery',
      powerConsumption: '< 8 µA standby',
      ipRating: 'IP30',
      operatingTemp: '0 °C to +45 °C',
      mounting: 'Wall mount',
      interfacePorts: 'Thread 2.4 GHz RF',
      certifications: ['Matter Certified', 'Thread Certified', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-MT-8820 Technical Datasheet', fileSize: '1.1 MB', version: 'v1.9', updated: 'February 2026', url: 'https://assets.dcai.example/products/korvane/matter/krv-mt-8820/datasheet.pdf' }
    ],
    related: ['KRV-MT-8810', 'KRV-MT-8800'],
    createdAt: '2025-09-14',
    updatedAt: '2026-02-10'
  },
  {
    id: 'krv-mt-8830',
    mpn: 'KRV-MT-8830',
    name: 'Korvane Matter Motorized Curtain Track Controller',
    brandSlug: 'korvane',
    protocolSlug: 'matter',
    productType: 'Controller',
    status: 'Active',
    shortDescription: 'Heavy-duty curtain track motorized glider with Matter over Thread radio integration.',
    description: 'Drives custom length drapery tracks up to 6 meters. Delivers smooth variable-speed motorized travel with integrated manual touch-start sensor and obstacle stop detection.',
    features: ['Silent motor operation < 30 dB', 'Direct Matter integration', 'Rechargeable lithium battery pack or AC mains'],
    useCases: ['Living room expansive glass curtain walls'],
    images: ['https://assets.dcai.example/products/korvane/matter/krv-mt-8830/front.svg', 'https://assets.dcai.example/products/korvane/matter/krv-mt-8830/side.svg', 'https://assets.dcai.example/products/korvane/matter/krv-mt-8830/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '280 × 50 × 50 mm',
      weight: '900 g',
      supplyVoltage: '100–240 V AC or detachable 14.8 V battery',
      powerConsumption: '< 40 W peak',
      ipRating: 'IP20',
      operatingTemp: '-5 °C to +45 °C',
      mounting: 'Ceiling flush',
      interfacePorts: 'AC mains lead / Thread RF',
      certifications: ['Matter', 'Thread', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-MT-8830 Technical Datasheet', fileSize: '1.4 MB', version: 'v1.8', updated: 'January 2026', url: 'https://assets.dcai.example/products/korvane/matter/krv-mt-8830/datasheet.pdf' }
    ],
    related: ['KRV-MT-8800'],
    createdAt: '2025-10-18',
    updatedAt: '2026-01-20'
  },

  // --- KORVANE / Z-WAVE (4 products) ---
  {
    id: 'krv-zw-6610',
    mpn: 'KRV-ZW-6610',
    name: 'Korvane Z-Wave 800-Series Micro Dimmer',
    brandSlug: 'korvane',
    protocolSlug: 'z-wave',
    productType: 'Dimmer',
    status: 'Active',
    shortDescription: 'Sub-GHz in-wall dimmer engineered for extreme RF penetration through thick concrete and stone walls.',
    description: 'Utilizes the latest Z-Wave 800 platform with extended wireless range exceeding 100 meters through reinforced concrete. Features SmartStart QR code provisioning and S2 Authenticated military-grade encryption.',
    features: ['Z-Wave 800 series chip with up to 1.5x range over 700 series', 'S2 Security Authenticated encryption', 'Supports leading and trailing edge phase cut up to 200 W'],
    useCases: ['Reinforced concrete luxury villas', 'Basement wine cellars and entertainment lounges'],
    images: ['https://assets.dcai.example/products/korvane/z-wave/krv-zw-6610/front.svg', 'https://assets.dcai.example/products/korvane/z-wave/krv-zw-6610/side.svg', 'https://assets.dcai.example/products/korvane/z-wave/krv-zw-6610/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '42 × 38 × 16 mm',
      weight: '45 g',
      supplyVoltage: '100–240 V AC, 50/60 Hz',
      powerConsumption: '< 0.3 W standby',
      ipRating: 'IP20',
      operatingTemp: '-10 °C to +40 °C',
      mounting: 'Wall mount',
      interfacePorts: 'L, N, Out, S1, S2 screw terminals, internal RF antenna',
      certifications: ['Z-Wave Plus V2 Certified', 'CE', 'FCC Part 15']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-ZW-6610 Technical Datasheet', fileSize: '1.2 MB', version: 'v2.2', updated: 'February 2026', url: 'https://assets.dcai.example/products/korvane/z-wave/krv-zw-6610/datasheet.pdf' }
    ],
    related: ['KRV-ZW-6620', 'KRV-ZB-7710'],
    createdAt: '2025-07-28',
    updatedAt: '2026-02-12'
  },
  {
    id: 'krv-zw-6620',
    mpn: 'KRV-ZW-6620',
    name: 'Korvane Z-Wave Dual Relay Switch 2× 10A',
    brandSlug: 'korvane',
    protocolSlug: 'z-wave',
    productType: 'Switch Actuator',
    status: 'Active',
    shortDescription: 'Dual independent 10 A dry contact relays for lighting circuits, gate actuators, and booster pumps.',
    description: 'Versatile dual switching module communicating on 916 MHz / 868 MHz Z-Wave bands. Supports independent voltage potentials on input contacts, allowing low-voltage motorized gate controls and mains lighting on one device.',
    features: ['Potential-free dry contacts', 'Individual power measurement on both channels', 'Over-current protection with instant latch-off'],
    useCases: ['Automatic motorized gate triggering', 'Dual garden floodlight switching'],
    images: ['https://assets.dcai.example/products/korvane/z-wave/krv-zw-6620/front.svg', 'https://assets.dcai.example/products/korvane/z-wave/krv-zw-6620/side.svg', 'https://assets.dcai.example/products/korvane/z-wave/krv-zw-6620/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '42 × 38 × 18 mm',
      weight: '49 g',
      supplyVoltage: '100–240 V AC or 24–30 V DC',
      powerConsumption: '< 0.4 W',
      ipRating: 'IP20',
      operatingTemp: '-10 °C to +45 °C',
      mounting: 'Wall mount',
      interfacePorts: 'Pluggable screw terminals: IN, Q1, Q2, S1, S2, L, N',
      certifications: ['Z-Wave Plus V2', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-ZW-6620 Technical Datasheet', fileSize: '1.3 MB', version: 'v2.0', updated: 'January 2026', url: 'https://assets.dcai.example/products/korvane/z-wave/krv-zw-6620/datasheet.pdf' }
    ],
    related: ['KRV-ZW-6610', 'KRV-ZW-6630'],
    createdAt: '2025-08-16',
    updatedAt: '2026-01-22'
  },
  {
    id: 'krv-zw-6630',
    mpn: 'KRV-ZW-6630',
    name: 'Korvane Z-Wave Water Flood & Freeze Sensor',
    brandSlug: 'korvane',
    protocolSlug: 'z-wave',
    productType: 'Sensor',
    status: 'Active',
    shortDescription: 'IP67 waterproof flood sensor with extendable gold-plated probe leads and audible buzzer alarm.',
    description: 'Detects microscopic water pooling beneath washing machines, water heaters, and mechanical risers. Transmits an emergency broadcast directly to motorized water shutoff valves even if the central hub is offline.',
    features: ['IP67 fully sealed waterproof floating enclosure', 'Direct Z-Wave Association to water shutoff valves', 'Built-in 85 dB acoustic siren and LED strobe'],
    useCases: ['Under-sink water leak protection', 'Commercial server room drip-tray monitoring'],
    images: ['https://assets.dcai.example/products/korvane/z-wave/krv-zw-6630/front.svg', 'https://assets.dcai.example/products/korvane/z-wave/krv-zw-6630/side.svg', 'https://assets.dcai.example/products/korvane/z-wave/krv-zw-6630/ports.svg'],
    illustrationType: 'sensor',
    specs: {
      dimensions: 'Ø 72 mm × 28 mm',
      weight: '85 g',
      supplyVoltage: '1× CR123A battery (up to 4 years)',
      powerConsumption: '< 5 µA standby',
      ipRating: 'IP67',
      operatingTemp: '0 °C to +45 °C',
      mounting: 'Surface box',
      interfacePorts: 'Gold-plated spring contact feet, Z-Wave RF',
      certifications: ['Z-Wave Plus V2', 'CE', 'IP67 Rated']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-ZW-6630 Technical Datasheet', fileSize: '1.0 MB', version: 'v1.7', updated: 'March 2026', url: 'https://assets.dcai.example/products/korvane/z-wave/krv-zw-6630/datasheet.pdf' }
    ],
    related: ['KRV-ZW-6620'],
    createdAt: '2025-09-24',
    updatedAt: '2026-03-01'
  },
  {
    id: 'krv-zw-6600',
    mpn: 'KRV-ZW-6600',
    name: 'Korvane Z-Wave 500-Series In-Wall Switch (Legacy)',
    brandSlug: 'korvane',
    protocolSlug: 'z-wave',
    productType: 'Switch Actuator',
    status: 'Discontinued',
    replacementMpn: 'KRV-ZW-6620',
    shortDescription: 'Legacy 500-series Z-Wave switch. Superseded by the 800-series KRV-ZW-6620 with extended range.',
    description: 'The KRV-ZW-6600 has been retired. Integrators should specify the KRV-ZW-6620 which incorporates the 800-series RF core with double the range and reduced power draw.',
    features: ['Z-Wave 500 chip', 'Single 10A switch'],
    useCases: ['Early residential installs (legacy)'],
    images: ['https://assets.dcai.example/products/korvane/z-wave/krv-zw-6600/front.svg', 'https://assets.dcai.example/products/korvane/z-wave/krv-zw-6600/side.svg', 'https://assets.dcai.example/products/korvane/z-wave/krv-zw-6600/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '44 × 40 × 20 mm',
      weight: '50 g',
      supplyVoltage: '230 V AC',
      powerConsumption: '< 0.6 W',
      ipRating: 'IP20',
      operatingTemp: '0 °C to +40 °C',
      mounting: 'Wall mount',
      interfacePorts: 'Screw terminals, RF',
      certifications: ['Z-Wave', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'KRV-ZW-6600 Legacy Product Archive', fileSize: '620 KB', version: 'v1.0 (Archival)', updated: 'May 2024', url: 'https://assets.dcai.example/products/korvane/z-wave/krv-zw-6600/datasheet.pdf' }
    ],
    related: ['KRV-ZW-6620'],
    createdAt: '2020-05-10',
    updatedAt: '2024-05-30'
  },

  // --- TESSARO / BACNET (5 products) ---
  {
    id: 'tsr-bc-3305',
    mpn: 'TSR-BC-3305',
    name: 'Tessaro BACnet/IP Modular Field Controller 24 I/O',
    brandSlug: 'tessaro',
    protocolSlug: 'bacnet',
    productType: 'Controller',
    status: 'Active',
    shortDescription: 'High-density BACnet Building Controller (B-BC) profile with native dual Gigabit Ethernet ports.',
    description: 'The TSR-BC-3305 is an enterprise BACnet controller designed for central plant equipment, chillers, air-handling units (AHUs), and complex mechanical plants. Includes 8 Universal Inputs (UI), 8 Analog Outputs (AO), and 8 Digital Relay Outputs (DO) with individual hand-off-auto (HOA) manual switches.',
    features: ['BACnet Testing Laboratories (BTL) listed as B-BC profile', 'Dual Ethernet ports supporting daisy-chain daisy topology without external switches', 'Front-panel Hand-Off-Auto (HOA) switches with optical feedback override', 'Real-time clock with 72-hour supercapacitor power backup'],
    useCases: ['Central chiller plant optimization', 'Multi-zone commercial Air Handling Units (AHU)', 'Hospital ventilation pressure balancing'],
    images: ['https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-3305/front.svg', 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-3305/side.svg', 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-3305/terminals.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '216 × 110 × 64 mm (12 DIN modules)',
      weight: '720 g',
      supplyVoltage: '24 V AC/DC ±10 %, 50/60 Hz',
      powerConsumption: '< 18 W',
      ipRating: 'IP20',
      operatingTemp: '-10 °C to +55 °C',
      mounting: 'DIN rail',
      interfacePorts: '2× RJ-45 10/100/1000 Base-T, 36× removable screw terminals (0.2–2.5 mm²)',
      certifications: ['BTL Listed (B-BC)', 'ASHRAE 135-2020 Standard', 'UL 916 Energy Management', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-BC-3305 Engineering Datasheet', fileSize: '2.8 MB', version: 'v3.4', updated: 'March 2026', url: 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-3305/datasheet.pdf' },
      { type: 'manual', title: 'TSR-BC-3305 Hardware & Programming Manual', fileSize: '8.4 MB', version: 'v3.0', updated: 'January 2026', url: 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-3305/manual.pdf' },
      { type: 'cad-drawing', title: 'TSR-BC-3305 DIN Enclosure CAD & DXF Schematics', fileSize: '1.9 MB', version: 'v1.2', updated: 'February 2026', url: 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-3305/cad.dxf' }
    ],
    related: ['TSR-BC-2200', 'TSR-MB-0099', 'TSR-IP-5500'],
    createdAt: '2025-03-12',
    updatedAt: '2026-03-01'
  },
  {
    id: 'tsr-bc-2200',
    mpn: 'TSR-BC-2200',
    name: 'Tessaro BACnet MS/TP VAV Box Controller with Actuator',
    brandSlug: 'tessaro',
    protocolSlug: 'bacnet',
    productType: 'Controller',
    status: 'Active',
    shortDescription: 'Integrated VAV controller with on-board precision differential pressure sensor and 5 Nm motorized damper actuator.',
    description: 'Specifically engineered for Variable Air Volume (VAV) terminal boxes in commercial office towers. Features a factory-calibrated digital micro-differential pressure flow sensor and integrated floating damper drive.',
    features: ['Integrated 5 Nm floating actuator with 90-second travel', 'Digital differential pressure transducer with 0–500 Pa range', 'BTL listed BACnet Application Specific Controller (B-ASC)'],
    useCases: ['Commercial office VAV terminal boxes', 'Clean room air volume balance'],
    images: ['https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-2200/front.svg', 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-2200/side.svg', 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-2200/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '185 × 140 × 72 mm',
      weight: '950 g',
      supplyVoltage: '24 V AC ±20 %, 50/60 Hz',
      powerConsumption: '< 8 W during movement',
      ipRating: 'IP42',
      operatingTemp: '0 °C to +50 °C',
      mounting: 'Surface box',
      interfacePorts: 'BACnet MS/TP RS-485 3-wire, pitot tube air barbs, space sensor input',
      certifications: ['BTL Listed (B-ASC)', 'UL 916', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-BC-2200 Technical Datasheet', fileSize: '2.1 MB', version: 'v2.6', updated: 'February 2026', url: 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-2200/datasheet.pdf' },
      { type: 'manual', title: 'TSR-BC-2200 VAV Airflow Balancing Guide', fileSize: '4.8 MB', version: 'v2.0', updated: 'December 2025', url: 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-2200/manual.pdf' }
    ],
    related: ['TSR-BC-3305', 'TSR-MB-0099'],
    createdAt: '2025-05-20',
    updatedAt: '2026-02-14'
  },
  {
    id: 'tsr-bc-1100',
    mpn: 'TSR-BC-1100',
    name: 'Tessaro BACnet/IP Smart Space Temperature Sensor',
    brandSlug: 'tessaro',
    protocolSlug: 'bacnet',
    productType: 'Thermostat',
    status: 'Active',
    shortDescription: 'Architectural wall-mount room sensor communicating directly via native BACnet/IP Ethernet with PoE.',
    description: 'Eliminates proprietary sensor buses by delivering room temperature, CO2 concentration, and humidity directly onto the corporate BACnet/IP network over Cat6 PoE.',
    features: ['NDIR optical CO2 sensor for demand-controlled ventilation (DCV)', 'Powered directly via Power-over-Ethernet (802.3af)', 'High-contrast e-ink screen displaying temperature and air quality metrics'],
    useCases: ['LEED certified green office floors', 'School lecture halls and auditoriums'],
    images: ['https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-1100/front.svg', 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-1100/side.svg', 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-1100/ports.svg'],
    illustrationType: 'thermostat',
    specs: {
      dimensions: '88 × 88 × 22 mm',
      weight: '140 g',
      supplyVoltage: 'PoE (802.3af Class 1) or 24 V AC/DC',
      powerConsumption: '< 2.2 W (CO2 heater peak)',
      ipRating: 'IP30',
      operatingTemp: '0 °C to +50 °C',
      mounting: 'Wall mount',
      interfacePorts: 'RJ-45 Cat6 Ethernet socket',
      certifications: ['BTL Listed', 'RESET Air Accredited Grade B', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-BC-1100 Technical Datasheet', fileSize: '1.6 MB', version: 'v2.2', updated: 'March 2026', url: 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-1100/datasheet.pdf' }
    ],
    related: ['TSR-BC-3305', 'TSR-BC-2200'],
    createdAt: '2025-08-04',
    updatedAt: '2026-03-01'
  },
  {
    id: 'tsr-bc-08io',
    mpn: 'TSR-BC-08IO',
    name: 'Tessaro BACnet MS/TP Expansion Module 8UI / 8DO',
    brandSlug: 'tessaro',
    protocolSlug: 'bacnet',
    productType: 'Controller',
    status: 'Active',
    shortDescription: 'DIN rail I/O expander extending universal inputs and relay outputs over standard RS-485 BACnet MS/TP.',
    description: 'Modular expansion unit pairing with TSR-BC-3305 controllers. Provides additional sensor and control density in mechanical distribution panels without consuming IP addresses.',
    features: ['8 configurable universal inputs (10k NTC, 0-10V, 4-20mA, dry contact)', '8 relay outputs rated 5 A at 250 V AC', 'Hardware rotary address dials for quick field commissioning'],
    useCases: ['Secondary AHU sensor expansion', 'Boiler and pump room monitoring'],
    images: ['https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-08io/front.svg', 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-08io/side.svg', 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-08io/ports.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '144 × 90 × 64 mm (8 DIN modules)',
      weight: '430 g',
      supplyVoltage: '24 V AC/DC',
      powerConsumption: '< 7.5 W',
      ipRating: 'IP20',
      operatingTemp: '-10 °C to +55 °C',
      mounting: 'DIN rail',
      interfacePorts: 'RS-485 MS/TP, 24× screw terminals',
      certifications: ['BTL Listed', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-BC-08IO Technical Datasheet', fileSize: '1.2 MB', version: 'v1.9', updated: 'February 2026', url: 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-08io/datasheet.pdf' }
    ],
    related: ['TSR-BC-3305'],
    createdAt: '2025-09-08',
    updatedAt: '2026-02-15'
  },
  {
    id: 'tsr-bc-1000',
    mpn: 'TSR-BC-1000',
    name: 'Tessaro BACnet MS/TP Router (Legacy)',
    brandSlug: 'tessaro',
    protocolSlug: 'bacnet',
    productType: 'Gateway',
    status: 'Discontinued',
    replacementMpn: 'TSR-BC-3305',
    shortDescription: 'Legacy single-port BACnet MS/TP to IP router. Superseded by TSR-BC-3305 modular controllers.',
    description: 'The TSR-BC-1000 router has reached End of Life. Commercial projects should utilize the TSR-BC-3305 or TSR-IP-5500 which combine routing with native programmable logic and firewall protection.',
    features: ['Single MS/TP port router', '10/100 Ethernet interface'],
    useCases: ['Early commercial BMS architectures (legacy)'],
    images: ['https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-1000/front.svg', 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-1000/side.svg', 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-1000/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '72 × 90 × 64 mm (4 DIN modules)',
      weight: '220 g',
      supplyVoltage: '24 V AC/DC',
      powerConsumption: '< 5 W',
      ipRating: 'IP20',
      operatingTemp: '0 °C to +45 °C',
      mounting: 'DIN rail',
      interfacePorts: 'RS-485, RJ-45 Ethernet',
      certifications: ['BTL Listed', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-BC-1000 Archival Documentation', fileSize: '810 KB', version: 'v1.1 (Archival)', updated: 'November 2024', url: 'https://assets.dcai.example/products/tessaro/bacnet/tsr-bc-1000/datasheet.pdf' }
    ],
    related: ['TSR-BC-3305'],
    createdAt: '2021-08-12',
    updatedAt: '2024-11-20'
  },

  // --- TESSARO / MODBUS (4 products) ---
  {
    id: 'tsr-mb-0099',
    mpn: 'TSR-MB-0099',
    name: 'Tessaro High-Speed Modbus RTU to BACnet/IP Gateway',
    brandSlug: 'tessaro',
    protocolSlug: 'modbus',
    productType: 'Gateway',
    status: 'Active',
    shortDescription: 'High-throughput dual-channel RS-485 Modbus gateway translating up to 1,200 registers into BACnet/IP objects.',
    description: 'Bridges commercial chillers, Variable Frequency Drives (VFDs), power distribution switchboards, and solar inverters into enterprise BACnet/IP building automation servers. Includes auto-polling scan engine and CSV register batch import.',
    features: ['Two optically isolated RS-485 ports (up to 64 Modbus devices total)', 'Maps up to 1,200 Modbus registers into standard BACnet Analog/Binary objects', 'Integrated web server with live Modbus packet sniffer diagnostic tool'],
    useCases: ['Substation electrical power monitoring', 'Chiller plant supervisory integration'],
    images: ['https://assets.dcai.example/products/tessaro/modbus/tsr-mb-0099/front.svg', 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-0099/side.svg', 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-0099/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '72 × 90 × 64 mm (4 DIN modules)',
      weight: '290 g',
      supplyVoltage: '9–30 V DC or 24 V AC',
      powerConsumption: '< 4.5 W',
      ipRating: 'IP20',
      operatingTemp: '-20 °C to +60 °C',
      mounting: 'DIN rail',
      interfacePorts: 'RJ-45 10/100 Ethernet, 2× isolated RS-485 pluggable screw terminals',
      certifications: ['BTL Listed (B-GW)', 'Modbus Conformance Tested', 'CE']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-MB-0099 Engineering Datasheet', fileSize: '1.9 MB', version: 'v3.1', updated: 'March 2026', url: 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-0099/datasheet.pdf' },
      { type: 'manual', title: 'TSR-MB-0099 Register Mapping & Protocol Conversion Guide', fileSize: '5.2 MB', version: 'v2.7', updated: 'February 2026', url: 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-0099/manual.pdf' }
    ],
    related: ['TSR-BC-3305', 'HLD-MB-0100', 'TSR-IP-5500'],
    createdAt: '2025-04-18',
    updatedAt: '2026-03-01'
  },
  {
    id: 'tsr-mb-04io',
    mpn: 'TSR-MB-04IO',
    name: 'Tessaro Industrial Modbus TCP I/O Concentrator',
    brandSlug: 'tessaro',
    protocolSlug: 'modbus',
    productType: 'Controller',
    status: 'Active',
    shortDescription: 'Industrial Ethernet Modbus TCP remote I/O unit with 8 digital inputs and 8 relay outputs.',
    description: 'Designed for fast telemetry over Cat6 cabling in plant rooms. Operates as a Modbus TCP server responding within 5 ms to BMS supervisor poll requests.',
    features: ['Modbus TCP over 10/100 Mbps Ethernet', '8 optical isolated digital inputs (2.5 kV)', '8 form-C heavy relay outputs rated 10 A at 250 V AC'],
    useCases: ['Emergency generator monitoring', 'Fire damper trip status monitoring'],
    images: ['https://assets.dcai.example/products/tessaro/modbus/tsr-mb-04io/front.svg', 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-04io/side.svg', 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-04io/ports.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '108 × 90 × 64 mm (6 DIN modules)',
      weight: '380 g',
      supplyVoltage: '18–36 V DC',
      powerConsumption: '< 6.0 W',
      ipRating: 'IP20',
      operatingTemp: '-20 °C to +65 °C',
      mounting: 'DIN rail',
      interfacePorts: 'RJ-45 Ethernet port, 24 screw terminals',
      certifications: ['Modbus Conformance', 'CE', 'UL 508']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-MB-04IO Technical Datasheet', fileSize: '1.4 MB', version: 'v2.0', updated: 'February 2026', url: 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-04io/datasheet.pdf' }
    ],
    related: ['TSR-MB-0099', 'HLD-MB-04IO'],
    createdAt: '2025-06-15',
    updatedAt: '2026-02-20'
  },
  {
    id: 'tsr-mb-08ai',
    mpn: 'TSR-MB-08AI',
    name: 'Tessaro Modbus RTU 8-Channel RTD / Thermocouple Input',
    brandSlug: 'tessaro',
    protocolSlug: 'modbus',
    productType: 'Sensor',
    status: 'Active',
    shortDescription: 'High-precision temperature acquisition unit supporting PT100, PT1000, and NTC sensors over RS-485.',
    description: 'Collects high-accuracy temperature probes across chilled water loops, cooling towers, and boiler headers. 16-bit analog-to-digital converter delivers 0.05 °C measurement resolution.',
    features: ['8 differential 2-wire / 3-wire RTD input channels', 'Pre-programmed linearization for PT100, PT1000, Ni1000, NTC 10k', 'Galvanic isolation between inputs, power, and communication port'],
    useCases: ['Central chiller supply/return delta-T telemetry', 'Cooling tower basin temperature regulation'],
    images: ['https://assets.dcai.example/products/tessaro/modbus/tsr-mb-08ai/front.svg', 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-08ai/side.svg', 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-08ai/ports.svg'],
    illustrationType: 'din-rail',
    specs: {
      dimensions: '72 × 90 × 64 mm (4 DIN modules)',
      weight: '240 g',
      supplyVoltage: '24 V AC/DC',
      powerConsumption: '< 2.8 W',
      ipRating: 'IP20',
      operatingTemp: '-20 °C to +55 °C',
      mounting: 'DIN rail',
      interfacePorts: 'RS-485 Modbus terminal, 24 sensor terminals',
      certifications: ['CE', 'IEC 61010-1']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-MB-08AI Technical Datasheet', fileSize: '1.3 MB', version: 'v1.9', updated: 'January 2026', url: 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-08ai/datasheet.pdf' }
    ],
    related: ['TSR-MB-0099'],
    createdAt: '2025-07-20',
    updatedAt: '2026-01-25'
  },
  {
    id: 'tsr-mb-02vfd',
    mpn: 'TSR-MB-02VFD',
    name: 'Tessaro Dual VFD Communication Interface Modbus',
    brandSlug: 'tessaro',
    protocolSlug: 'modbus',
    productType: 'Controller',
    status: 'Active',
    shortDescription: 'Dedicated pump and fan drive interface with pre-built control profiles for Danfoss and ABB VFDs.',
    description: 'Simplifies variable frequency drive integration into building automation. Pre-loaded with standard command word profiles, eliminating hours of register troubleshooting.',
    features: ['Pre-configured profiles for major VFD manufacturers', 'Dual RS-485 master channels', 'Status LEDs for run, fault, and speed feedback'],
    useCases: ['HVAC secondary chilled water pump staging', 'Car park jet fan ventilation control'],
    images: ['https://assets.dcai.example/products/tessaro/modbus/tsr-mb-02vfd/front.svg', 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-02vfd/side.svg', 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-02vfd/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '54 × 90 × 64 mm (3 DIN modules)',
      weight: '180 g',
      supplyVoltage: '24 V DC',
      powerConsumption: '< 2.0 W',
      ipRating: 'IP20',
      operatingTemp: '-10 °C to +50 °C',
      mounting: 'DIN rail',
      interfacePorts: '2× RS-485 ports, power terminals',
      certifications: ['CE', 'Modbus Conformance']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-MB-02VFD Technical Datasheet', fileSize: '1.1 MB', version: 'v1.6', updated: 'March 2026', url: 'https://assets.dcai.example/products/tessaro/modbus/tsr-mb-02vfd/datasheet.pdf' }
    ],
    related: ['TSR-MB-0099', 'TSR-BC-3305'],
    createdAt: '2025-09-01',
    updatedAt: '2026-03-01'
  },

  // --- TESSARO / IP-ETHERNET (4 products) ---
  {
    id: 'tsr-ip-5500',
    mpn: 'TSR-IP-5500',
    name: 'Tessaro Industrial Automation Backbone Switch 8-Port PoE+',
    brandSlug: 'tessaro',
    protocolSlug: 'ip-ethernet',
    productType: 'Gateway',
    status: 'Active',
    shortDescription: 'Hardened DIN-rail Gigabit managed switch with 8x 802.3at PoE+ ports and 2x SFP optical fiber uplinks.',
    description: 'Engineered specifically for harsh building riser environments. Features redundant dual DC power inputs, sub-20 ms ring network recovery (ERPS), and VLAN isolation to cleanly separate building control systems from enterprise tenant networks.',
    features: ['8× Gigabit PoE+ ports (up to 30 W per port, 240 W total budget)', '2× 1G SFP slots for long-range building riser fiber uplinks', 'IEC 61850-3 and IEEE 1613 substation-grade electromagnetic immunity', 'Web GUI and SNMPv3 network monitoring for building operations teams'],
    useCases: ['Building riser network backbones', 'Connecting BACnet/IP controllers and touchscreens across 40 floors'],
    images: ['https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5500/front.svg', 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5500/side.svg', 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5500/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '144 × 110 × 75 mm',
      weight: '890 g',
      supplyVoltage: 'Dual redundant 48–57 V DC inputs',
      powerConsumption: 'Max 260 W (with full PoE load)',
      ipRating: 'IP30 (aluminum chassis without fan)',
      operatingTemp: '-40 °C to +75 °C',
      mounting: 'DIN rail',
      interfacePorts: '8× RJ-45 10/100/1000Base-TX PoE+, 2× 1000Base-X SFP, RS-232 console',
      certifications: ['EN 50121-4', 'IEC 61850-3', 'CE', 'FCC Class A']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-IP-5500 Technical Datasheet', fileSize: '2.3 MB', version: 'v3.0', updated: 'March 2026', url: 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5500/datasheet.pdf' },
      { type: 'manual', title: 'TSR-IP-5500 Managed Switch Configuration & VLAN Guide', fileSize: '6.2 MB', version: 'v2.5', updated: 'January 2026', url: 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5500/manual.pdf' }
    ],
    related: ['TSR-BC-3305', 'TSR-MB-0099', 'TSR-IP-5200'],
    createdAt: '2025-05-10',
    updatedAt: '2026-03-01'
  },
  {
    id: 'tsr-ip-5200',
    mpn: 'TSR-IP-5200',
    name: 'Tessaro Industrial Automation 5-Port Gigabit Unmanaged Switch',
    brandSlug: 'tessaro',
    protocolSlug: 'ip-ethernet',
    productType: 'Gateway',
    status: 'Active',
    shortDescription: 'Compact DIN-rail 5-port Gigabit switch for local mechanical panel Ethernet distribution.',
    description: 'Plug-and-play Ethernet distribution module designed to occupy minimal DIN space (32 mm wide) in AHU control cabinets, linking local controllers, touchscreen displays, and gateways.',
    features: ['5× 10/100/1000 Base-T Gigabit RJ-45 ports', 'Slim 32 mm width fits dense distribution panels', 'Quality of Service (QoS) packet prioritization for BACnet traffic'],
    useCases: ['Panel-level Ethernet distribution in mechanical risers'],
    images: ['https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5200/front.svg', 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5200/side.svg', 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5200/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '32 × 100 × 75 mm',
      weight: '260 g',
      supplyVoltage: '12–48 V DC redundant',
      powerConsumption: '< 3.5 W',
      ipRating: 'IP30',
      operatingTemp: '-20 °C to +60 °C',
      mounting: 'DIN rail',
      interfacePorts: '5× RJ-45 Gigabit ports, terminal power in',
      certifications: ['CE', 'FCC', 'UL 61010']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-IP-5200 Technical Datasheet', fileSize: '1.2 MB', version: 'v2.1', updated: 'February 2026', url: 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5200/datasheet.pdf' }
    ],
    related: ['TSR-IP-5500', 'TSR-BC-3305'],
    createdAt: '2025-07-01',
    updatedAt: '2026-02-10'
  },
  {
    id: 'tsr-ip-5100',
    mpn: 'TSR-IP-5100',
    name: 'Tessaro Secure Industrial VPN Gateway & Edge Router',
    brandSlug: 'tessaro',
    protocolSlug: 'ip-ethernet',
    productType: 'Gateway',
    status: 'Active',
    shortDescription: 'Cybersecurity gateway providing encrypted remote service tunnels for maintenance engineers without opening firewall ports.',
    description: 'Provides zero-trust outbound TLS tunnel access for certified DCAI service integrators to remotely diagnose BMS alarms, push firmware updates, and inspect telemetry without requiring static public IPs.',
    features: ['Outbound-only secure VPN tunnel (no open inbound firewall ports required)', 'Hardware crypto-acceleration chip (AES-256)', 'Hardware physical key switch to lock out remote access during audits'],
    useCases: ['Remote contractor service maintenance', 'Multi-site building portfolio remote management'],
    images: ['https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5100/front.svg', 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5100/side.svg', 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5100/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '54 × 100 × 75 mm (3 DIN modules)',
      weight: '340 g',
      supplyVoltage: '24 V DC',
      powerConsumption: '< 5.0 W',
      ipRating: 'IP30',
      operatingTemp: '-20 °C to +65 °C',
      mounting: 'DIN rail',
      interfacePorts: 'WAN RJ-45, LAN RJ-45, USB-C configuration port, key switch',
      certifications: ['IEC 62443-4-2 Cybersecurity', 'CE', 'FCC']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-IP-5100 Technical Datasheet', fileSize: '1.8 MB', version: 'v2.4', updated: 'March 2026', url: 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5100/datasheet.pdf' },
      { type: 'manual', title: 'TSR-IP-5100 Zero-Trust Remote Access Deployment Whitepaper', fileSize: '3.6 MB', version: 'v1.8', updated: 'February 2026', url: 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5100/whitepaper.pdf' }
    ],
    related: ['TSR-IP-5500', 'TSR-BC-3305'],
    createdAt: '2025-08-18',
    updatedAt: '2026-03-01'
  },
  {
    id: 'tsr-ip-5000',
    mpn: 'TSR-IP-5000',
    name: 'Tessaro 100Base-TX Media Converter (Legacy)',
    brandSlug: 'tessaro',
    protocolSlug: 'ip-ethernet',
    productType: 'Gateway',
    status: 'Discontinued',
    replacementMpn: 'TSR-IP-5500',
    shortDescription: 'Legacy 100 Mbps copper to multimode fiber converter. Replaced by TSR-IP-5500 with integrated SFP cages.',
    description: 'The TSR-IP-5000 standalone media converter has been discontinued. Modern riser installations should specify the TSR-IP-5500 Gigabit switch with integrated optical SFP transceivers.',
    features: ['100 Mbps copper to SC multimode fiber', 'External power brick'],
    useCases: ['Early optical riser connections (legacy)'],
    images: ['https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5000/front.svg', 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5000/side.svg', 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5000/ports.svg'],
    illustrationType: 'gateway',
    specs: {
      dimensions: '90 × 70 × 26 mm',
      weight: '210 g',
      supplyVoltage: '12 V DC',
      powerConsumption: '< 4.0 W',
      ipRating: 'IP20',
      operatingTemp: '0 °C to +40 °C',
      mounting: 'Wall mount',
      interfacePorts: 'RJ-45, SC fiber pair',
      certifications: ['CE']
    },
    downloads: [
      { type: 'datasheet', title: 'TSR-IP-5000 Legacy Documentation', fileSize: '580 KB', version: 'v1.0 (Archival)', updated: 'August 2024', url: 'https://assets.dcai.example/products/tessaro/ip-ethernet/tsr-ip-5000/datasheet.pdf' }
    ],
    related: ['TSR-IP-5500'],
    createdAt: '2020-09-15',
    updatedAt: '2024-08-20'
  }
];

export function getProductByMpn(mpn: string, products: Product[] = SEED_PRODUCTS): Product | undefined {
  const norm = mpn.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return products.find(p => p.mpn.toUpperCase().replace(/[^A-Z0-9]/g, '') === norm);
}
