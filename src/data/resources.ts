export interface Resource {
  id: string;
  title: string;
  contentType: 'Case Study' | 'Article' | 'Technical Manual' | 'Guide';
  audienceTag: 'Consultant' | 'Dealer';
  verticalTag: 'Residential' | 'Commercial' | 'Hospitality' | 'General';
  summary: string;
  content: string[];
  metrics?: { label: string; value: string }[];
  brandsUsed?: string[];
  fileSize?: string;
  fileUrl?: string;
  publishDate: string;
}

export const RESOURCES: Resource[] = [
  // --- Case Studies (Hospitality, Commercial, Residential) ---
  {
    id: 'resort-palawan-180key',
    title: 'A 180-key resort in Palawan: one scene engine for every guest room',
    contentType: 'Case Study',
    audienceTag: 'Consultant',
    verticalTag: 'Hospitality',
    summary: 'How a luxury island resort unified architectural DALI lighting, quiet drapery tracks, and high-efficiency AC setback into a unified guest experience.',
    content: [
      'The 180-key coastal resort in northern Palawan required a control infrastructure that could withstand humid marine salt air while preserving an intuitive guest experience. The client aimed to eliminate wall clutter by deploying a single architectural keypad at the portal and bedside.',
      'DCAI worked closely with the MEP engineering consultant and certified system integrator to specify Verelli DALI-2 milled aluminum keypads and Halden dual-line gateways. Each guest villa was configured with a Master "Welcome" scene that gently raises blackout drapes to 40% and ramps indirect warm cove illumination to 2700K upon card-key activation.',
      'By tying magnetic balcony door sensors to the room temperature controller, the HVAC compressor automatically enters a low-energy drift mode if patio doors remain open for more than three minutes, cutting chiller electrical consumption by 24% without sacrificing guest comfort.'
    ],
    metrics: [
      { label: 'Energy Reduction', value: '–24%' },
      { label: 'Keys Automated', value: '180 keys' },
      { label: 'Protocols', value: 'DALI-2 + KNX' }
    ],
    brandsUsed: ['Verelli', 'Halden'],
    fileSize: '3.4 MB',
    fileUrl: 'https://assets.dcai.example/resources/case-studies/palawan-resort.pdf',
    publishDate: '2026-02-15'
  },
  {
    id: 'makati-office-bacnet-retrofit',
    title: 'Retrofitting a Makati office floor with BACnet — without shutting the floor',
    contentType: 'Case Study',
    audienceTag: 'Consultant',
    verticalTag: 'Commercial',
    summary: 'Modernizing a 2,200 sq.m commercial headquarters in Ayala Triangle with open BACnet controllers during overnight operational windows.',
    content: [
      'A leading financial institution occupying three high-rise floors in Makati faced rising tenant discomfort and surging peak-hour utility charges due to an aging, closed-protocol mechanical BMS. The challenge was executing a complete VAV controller overhaul with zero tenant downtime.',
      'The certified DCAI dealer deployed Tessaro TSR-BC-3305 modular controllers and TSR-BC-2200 VAV box units with integrated differential airflow sensors. All physical swaps were completed floor-by-floor between 8:00 PM and 4:00 AM over a four-week period.',
      'Real-time BACnet/IP telemetry directly integrated into the client central building dashboard, yielding immediate comfort improvements and an 18% reduction in fan power consumption via demand-controlled ventilation.'
    ],
    metrics: [
      { label: 'Floor Space', value: '2,200 m²' },
      { label: 'HVAC Fan Energy', value: '–18%' },
      { label: 'Downtime', value: '0 hours' }
    ],
    brandsUsed: ['Tessaro'],
    fileSize: '2.8 MB',
    fileUrl: 'https://assets.dcai.example/resources/case-studies/makati-retrofit.pdf',
    publishDate: '2026-01-20'
  },
  {
    id: 'bgc-condo-evening-routine',
    title: 'A Bonifacio Global City condo that learns the family\'s evening routine',
    contentType: 'Case Study',
    audienceTag: 'Consultant',
    verticalTag: 'Residential',
    summary: 'A 340 sq.m duplex penthouse in BGC automated with Korvane wireless hardware and discrete presence detection.',
    content: [
      'In a high-rise residential penthouse with double-height ceiling voids, running new conduit through solid cast-in-place concrete walls was impossible. The homeowner required scene control, automated acoustic drapes, and intelligent security without architectural disruption.',
      'The solution combined Korvane Zigbee 3.0 micro-switch relays installed behind decorative wall switches with battery-powered e-paper thermostats and motorized curtain drives.',
      'A single bedtime scene button beside the master bed confirms all exterior balcony doors are locked, lowers motorized shades, and arms perimeter infrared sensors, providing peace of mind and effortless daily living.'
    ],
    metrics: [
      { label: 'Residence Area', value: '340 m²' },
      { label: 'Wireless Nodes', value: '42 devices' },
      { label: 'Install Time', value: '3 days' }
    ],
    brandsUsed: ['Korvane'],
    fileSize: '2.1 MB',
    fileUrl: 'https://assets.dcai.example/resources/case-studies/bgc-penthouse.pdf',
    publishDate: '2025-11-10'
  },

  // --- Articles & Comparative Guides ---
  {
    id: 'knx-dali-zigbee-plain-language-guide',
    title: 'KNX, DALI or Zigbee? A plain-language guide for designers',
    contentType: 'Article',
    audienceTag: 'Consultant',
    verticalTag: 'General',
    summary: 'A direct comparison of wired bus infrastructure, dedicated lighting protocols, and wireless mesh networks for interior designers and architects.',
    content: [
      'Selecting the correct building control protocol often feels overwhelming when navigating conflicting vendor claims. In practice, mature installations frequently pair two or more protocols, each serving the layer it was engineered for.',
      'KNX serves as the robust building backbone. With a 30-year track record and absolute decentralisation (meaning no single processor failure can bring down a house), it remains the gold standard for long-term residential and institutional infrastructure.',
      'DALI is purpose-built for digital luminaire management. It provides unpolarized 2-wire lines that control individual LED ballasts down to 0.1% smooth dimming with built-in emergency duration testing.',
      'Zigbee and Matter provide agile wireless expansion where structural walls, heritage finishes, or fast-track timelines preclude physical cabling. When deployed with industrial-grade coordinators, modern mesh networks deliver instantaneous human-scale response.'
    ],
    publishDate: '2026-02-01'
  },
  {
    id: 'specifying-lighting-control-checklist',
    title: 'Specifying lighting control: a one-page checklist',
    contentType: 'Guide',
    audienceTag: 'Consultant',
    verticalTag: 'General',
    summary: 'The eight critical parameters lighting designers must specify to ensure seamless dimming without flicker, acoustic buzzing, or ghosting.',
    content: [
      'Flicker-free architectural dimming requires precise coordination between luminaire driver, control protocol, and dimming curve. This practical checklist details minimum load thresholds, driver forward-voltage requirements, and phase-cut vs. 0-10V vs. DALI selection rules.',
      'Learn how to calculate maximum cable loop distances for DALI-2 lines to prevent signal attenuation, and verify compatibility with high-inrush LED driver loads using C-load rated switching actuators.'
    ],
    fileSize: '1.1 MB',
    fileUrl: 'https://assets.dcai.example/resources/guides/specifying-lighting-control.pdf',
    publishDate: '2026-01-15'
  },
  {
    id: 'hotel-guestroom-energy-standards',
    title: 'Hotel guestroom energy management: compliance and guest comfort',
    contentType: 'Article',
    audienceTag: 'Consultant',
    verticalTag: 'Hospitality',
    summary: 'Balancing strict Philippine Green Building Code cooling efficiency requirements with luxury guest expectations.',
    content: [
      'Air conditioning typically represents 60% of total electrical consumption in tropical Philippine hospitality properties. Traditional keycard slots are frequently bypassed with business cards, leaving AC running in unoccupied suites.',
      'Modern door-status magnetic contacts combined with optical PIR occupancy sensors detect genuine guest vacancy within 15 minutes, allowing thermostats to drift safely to an eco-setpoint while preserving room dehumidification.'
    ],
    publishDate: '2025-12-05'
  },
  {
    id: 'commercial-leed-smart-building-guide',
    title: 'Designing for LEED and WELL certification with open building automation',
    contentType: 'Guide',
    audienceTag: 'Consultant',
    verticalTag: 'Commercial',
    summary: 'How open BACnet and Modbus metering architecture satisfies energy modeling credits in premium Grade-A office developments.',
    content: [
      'A walkthrough of ASHRAE 90.1 energy baseline standards, continuous sub-metering requirements, and demand-controlled ventilation (DCV) strategies utilizing BACnet/IP air quality transmitters.'
    ],
    fileSize: '2.5 MB',
    fileUrl: 'https://assets.dcai.example/resources/guides/leed-smart-building-guide.pdf',
    publishDate: '2025-11-28'
  },
  {
    id: 'matter-protocol-explained-trade',
    title: 'Matter and Thread in practice: what system integrators need to know',
    contentType: 'Article',
    audienceTag: 'Dealer',
    verticalTag: 'Residential',
    summary: 'Demystifying IPv6 Thread mesh, Border Routers, and Multi-Admin permissions in residential client handovers.',
    content: [
      'Matter eliminates the wall between consumer ecosystems, but system integrators must understand local Thread border router topography and multi-admin credential sharing to prevent client support tickets.',
      'This article provides best practices for commissioning Matter devices on dedicated dual-band 2.4/5 GHz networks with isolated IoT VLANs.'
    ],
    publishDate: '2026-02-18'
  },

  // --- Technical Manuals (Dealers & Installers) ---
  {
    id: 'halden-knx-commissioning-guide-rev3',
    title: 'Halden KNX commissioning guide, rev. 3',
    contentType: 'Technical Manual',
    audienceTag: 'Dealer',
    verticalTag: 'General',
    summary: 'Comprehensive engineering handbook for ETS5/ETS6 parameter configuration, line couplers, and C-load actuator commissioning.',
    content: [
      'Complete field reference for certified KNX integrators configuring Halden HLD-KX series actuators and power supplies.',
      'Covers physical telegram routing tables, filter tables across sub-lines, staircase lighting logic, and current measurement alarm thresholds.'
    ],
    fileSize: '6.4 MB',
    fileUrl: 'https://assets.dcai.example/resources/manuals/halden-knx-commissioning-rev3.pdf',
    publishDate: '2026-01-10'
  },
  {
    id: 'tessaro-bacnet-integration-handbook',
    title: 'Tessaro BACnet integration handbook',
    contentType: 'Technical Manual',
    audienceTag: 'Dealer',
    verticalTag: 'Commercial',
    summary: 'Standard wiring schematics, MS/TP token passing troubleshooting, and BACnet/IP network configuration guidelines.',
    content: [
      'Essential reference for BMS technicians commissioning TSR-BC series controllers. Details RS-485 end-of-line (EOL) termination resistance values, baud rate matching, and MSTP MAC addressing rules to avoid token-passing loops.'
    ],
    fileSize: '7.8 MB',
    fileUrl: 'https://assets.dcai.example/resources/manuals/tessaro-bacnet-handbook.pdf',
    publishDate: '2025-12-18'
  },
  {
    id: 'dali2-field-troubleshooting-handbook',
    title: 'DALI-2 field wiring and troubleshooting manual',
    contentType: 'Technical Manual',
    audienceTag: 'Dealer',
    verticalTag: 'General',
    summary: 'Diagnosing common field wiring errors: bus voltage drops, line capacitance limits, unassigned short addresses, and driver replacements.',
    content: [
      'Step-by-step diagnostic procedures with digital multimeters and software bus analyzers. Covers testing maximum 300 m DALI cable run limits and replacing faulty ballasts with automated one-click address recovery.'
    ],
    fileSize: '4.6 MB',
    fileUrl: 'https://assets.dcai.example/resources/manuals/dali2-field-troubleshooting.pdf',
    publishDate: '2026-02-22'
  },
  {
    id: 'modbus-rtu-rs485-practical-guide',
    title: 'Modbus RTU over RS-485: noise immunity and grounding in plant rooms',
    contentType: 'Technical Manual',
    audienceTag: 'Dealer',
    verticalTag: 'Commercial',
    summary: 'Preventing communication timeouts between power meters, chillers, and gateways in high-electromagnetic plant rooms.',
    content: [
      'Field installation guidelines detailing twisted shielded pair (STP) grounding at a single equipotential point, daisy-chain topology versus star-wiring avoidance, and bias resistor calculations.'
    ],
    fileSize: '3.9 MB',
    fileUrl: 'https://assets.dcai.example/resources/manuals/modbus-rs485-practical-guide.pdf',
    publishDate: '2025-10-30'
  },

  // --- Dealer Enablement & Training ---
  {
    id: 'dealer-onboarding-certification-pathway',
    title: 'Dealer onboarding & certification pathway 2026',
    contentType: 'Guide',
    audienceTag: 'Dealer',
    verticalTag: 'General',
    summary: 'The structured DCAI training journey from Level 1 Associate to Level 3 Master Certified System Integrator.',
    content: [
      'Overview of DCAI four-tiered partner enablement structure. Details hands-on laboratory requirements, ETS certification course sponsorships, demo kit access, and pre-sales engineering support allocations.'
    ],
    fileSize: '2.2 MB',
    fileUrl: 'https://assets.dcai.example/resources/guides/dcai-dealer-onboarding-2026.pdf',
    publishDate: '2026-01-05'
  },
  {
    id: 'training-calendar-q2-q4-2026',
    title: 'DCAI Technical Training Calendar — Q2 to Q4 2026',
    contentType: 'Guide',
    audienceTag: 'Dealer',
    verticalTag: 'General',
    summary: 'Schedule for hands-on KNX Partner certification, DALI-2 design workshops, and BACnet commercial commissioning bootcamps in Metro Manila and Cebu.',
    content: [
      'Full quarterly dates, venue locations, prerequisite coursework, and registration instructions for upcoming physical training sessions hosted at the DCAI Technical Enablement Centre in Pasig City.'
    ],
    fileSize: '850 KB',
    fileUrl: 'https://assets.dcai.example/resources/guides/training-calendar-2026.pdf',
    publishDate: '2026-03-01'
  },
  {
    id: 'rf-wireless-site-survey-protocol',
    title: 'Wireless smart home site survey protocol: Zigbee & Thread reliability',
    contentType: 'Technical Manual',
    audienceTag: 'Dealer',
    verticalTag: 'Residential',
    summary: 'How to conduct pre-installation RF spectrum scans in high-density residential towers to avoid 2.4 GHz Wi-Fi co-channel interference.',
    content: [
      'Choosing optimal Zigbee channels (Channel 15, 20, or 25) relative to Wi-Fi access point channel 1, 6, and 11 distributions, ensuring zero latency packet delivery.'
    ],
    fileSize: '3.1 MB',
    fileUrl: 'https://assets.dcai.example/resources/manuals/wireless-site-survey.pdf',
    publishDate: '2025-11-18'
  },
  {
    id: 'smart-door-lock-retrofit-guide',
    title: 'Smart mortise lock retrofitting: European DIN standard preparation',
    contentType: 'Guide',
    audienceTag: 'Dealer',
    verticalTag: 'Residential',
    summary: 'Step-by-step door carpentry and strike plate alignment manual for installing Korvane smart mortise locks on solid timber and metal fire doors.',
    content: [
      'Clear dimensional templates, backset measurements (55 mm / 60 mm), wire passthrough routing, and weatherproof gasket seating rules for exterior entryways.'
    ],
    fileSize: '2.7 MB',
    fileUrl: 'https://assets.dcai.example/resources/guides/mortise-lock-retrofit-guide.pdf',
    publishDate: '2026-01-28'
  },
  {
    id: 'commercial-vav-balancing-procedures',
    title: 'VAV terminal box calibration and airflow balancing standards',
    contentType: 'Technical Manual',
    audienceTag: 'Dealer',
    verticalTag: 'Commercial',
    summary: 'Testing and balancing (TAB) guidelines using pitot tube anemometers and BACnet calibration curves.',
    content: [
      'Ensuring compliance with NEBB and TABB field verification protocols when configuring Tessaro pressure transducers and floating actuators.'
    ],
    fileSize: '4.2 MB',
    fileUrl: 'https://assets.dcai.example/resources/manuals/vav-balancing-procedures.pdf',
    publishDate: '2025-12-10'
  },
  {
    id: 'hotel-rfid-access-integration',
    title: 'Integrating guestroom keycards with smart hotel scene engines',
    contentType: 'Guide',
    audienceTag: 'Consultant',
    verticalTag: 'Hospitality',
    summary: 'Architectural wiring configurations for interfacing ASSA ABLOY, Saflok, and Onity door locks with in-room automation controllers.',
    content: [
      'Dry-contact and RS-485 interface standards that trigger entry illumination without requiring proprietary closed-loop hardware.'
    ],
    fileSize: '2.9 MB',
    fileUrl: 'https://assets.dcai.example/resources/guides/hotel-rfid-access-integration.pdf',
    publishDate: '2026-02-10'
  }
];
