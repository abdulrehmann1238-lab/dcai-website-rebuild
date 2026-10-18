# DCAI Website Rebuild — High-Fidelity Frontend Demo
**Digicom Controls and Automation Inc. (DCAI) · Bid Companion Prototype**

A React + TypeScript + Vite single-page prototype built specifically for the **DCAI Website Rebuild TOR**. This demo is not an e-commerce shop; it is a **product repository, market-education, and dealer-enablement platform** engineered with an architectural editorial aesthetic, native Gutenberg block parity, and channel-safe dealer routing.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the local Vite development server
npm run dev

# 3. Build for production (typechecking & bundling)
npm run build
```

The application will be live at `http://127.0.0.1:5173/`.

---

## 🌟 The 6 WOW Moments (How to Experience Them)

| # | Feature | Where to find | How to test | Why it impresses DCAI |
|---|---|---|---|---|
| **1** | **Gutenberg Block Map Overlay** | Any page (bottom-right Staff View pill) | Click **Staff view** &bull; toggle **Gutenberg Block Map** | Shows 1:1 mapping from design to native Gutenberg blocks (`dcai/...`) and ACF collections. Proves zero hardcoding. |
| **2** | **Global Search with Partial-MPN Matching** | Header (press `/` or `Cmd+K` / `Ctrl+K`) | Press `/`, type `4412` or `dali` | Finds `HLD-KX-4412` with matched digits highlighted. Groups Brands, Protocols, Products, and Resources. |
| **3** | **Master CSV &bull; WP All Import Wizard** | `/staff/import` | Click "Use sample file", resolve the intentional unmapped `Datasheet URL` column, run import | Demonstrates Milestone 2 (bulk data ingest) with validation, warnings, and instant site-wide catalog updates. |
| **4** | **Live-Reactive Analytics** | `/staff/analytics` | Search for terms or download datasheets on the public site, then visit Analytics | User's real searches and downloads increment today's counters in real time; surfaces zero-result insights like "price list". |
| **5** | **Living Floor Plan Hero** | Homepage (`/home`) | Move the time-of-day slider (07:00 &bull; 13:00 &bull; 19:00 &bull; 23:00), click hotspots | Visually explains multi-protocol building automation for non-technical clients using an architectural SVG without heavy video. |
| **6** | **Mobile Spec Tables & Sticky Downloads** | Any product page on phone (< 480 px) | Scroll past specifications on mobile | Spec table transforms into a clean stacked definition list; sticky bottom download bar appears. |

---

## 🗺️ Sitemap & Template Matrix (Matches TOR 1:1)

```
Public Site (React Router v6 SPA)
├── /home                                   Hybrid   Template 1: Homepage & Living Floor Plan
├── /about                                  Static   Template 2: About & Enablement Pillars
├── /solutions                              Hybrid   Template 4: Solutions Hub
│   ├── /solutions/residential              Hybrid   Template 5: Residential Vertical
│   ├── /solutions/commercial               Hybrid   Template 5: Commercial Vertical
│   └── /solutions/hospitality              Hybrid   Template 5: Hospitality Vertical
├── /brands                                 Dynamic  Template 6: Brands Directory
│   └── /brands/:brand                      Dynamic  Template 7: Brand Landing (4 brands)
│       └── /brands/:brand/:protocol        Dynamic  Template 8: Protocol Grid (12 protocol pages)
│           └── /brands/:brand/:protocol/:mpn Dynamic Template 9: Product Detail (60+ MPNs)
├── /resources                              Hybrid   Resources Hub
│   ├── /resources/consultants              Dynamic  Template 10: Consultant Specification Dashboard
│   └── /resources/dealers                  Dynamic  Template 10: Dealer Technical Hub
└── /contact                                Static   Template 3: Contact & Enablement Center
                                            (Form 1: Trade Inquiry &bull; Form 2: Dealer-Safe Project Inquiry)

CMS Staff View Simulation (Bottom-Right Pill)
├── /staff                                  Overview of editable tasks
├── /staff/import                           4-Step Master CSV Import Wizard (WP All Import simulation)
├── /staff/products                         Product Schema & Live ACF Edit Drawer
├── /staff/assets                           DAM Storage Meter (31.4 GB / 100 GB) & Permanent URLs
└── /staff/analytics                        Light Reporting Dashboard (Searches, Downloads, Page Views)
```

---

## 🏷️ Brand & Protocol Architecture

DCAI distributes four brands across wired and wireless standards:

1. **Halden** (`/brands/halden`) — *Norwegian Industrial Precision*
   - Protocols: `knx`, `dali`, `modbus`
2. **Verelli** (`/brands/verelli`) — *Italian Architectural Lighting & Keypads*
   - Protocols: `dali-2`, `zigbee`, `matter`
3. **Korvane** (`/brands/korvane`) — *German Rapid-Deployment Wireless Smart Home*
   - Protocols: `zigbee`, `matter`, `z-wave`
4. **Tessaro** (`/brands/tessaro`) — *Swiss Open-Protocol Commercial Controllers*
   - Protocols: `bacnet`, `modbus`, `ip-ethernet`

### How to Swap Brands for Real DCAI Partnerships
All brand metadata is decoupled in `src/data/brands.ts`. To replace the sample brands with DCAI's official manufacturer partners:
1. Edit `BRANDS` array in `src/data/brands.ts` (name, slug, tagline, origin, certifications).
2. Update protocol associations in `src/data/protocols.ts`.
3. Products in `src/data/products.ts` reference `brandSlug` and `protocolSlug` directly.

---

## 🛡️ Dealer-Safe Policy (Why there is no "Start a Project" or Cart)
DCAI distributes exclusively through system integrators and installers. To protect the dealer channel:
- **No prices, cart, or direct consumer checkout** exists anywhere on the site.
- Primary calls to action read **"Find a Certified Partner"** (routing end clients to regional integrators) or **"Become a Dealer"** (onboarding trade partners).
- Product pages feature **"Ask the Technical Team about {MPN}"**, preserving integrator margins while providing manufacturer specification support.

---

## 📦 Master CSV Import Workflow (Milestone 2 Proof)
The TOR specifies bulk data ingest via WP All Import. The wizard at `/staff/import` demonstrates:
1. **Dropzone:** Accepts CSV files or one-click loads `dcai_master_products.csv`.
2. **Schema Mapping:** 15 columns mapped to WooCommerce core (`post_title`, `sku`, `post_excerpt`) and ACF groups (`technical_parameters`, `downloads`, `related_products`).
3. **Intentional Mismatch:** Column `Datasheet URL` starts unmapped to demonstrate field matching validation. Selecting `ACF: Downloads • Datasheet PDF URL` unlocks the next step.
4. **Validation Summary:** 38 valid rows, 2 non-fatal warnings (e.g., forward-reference related MPNs), 0 fatal errors.
5. **Batch Ingest Execution:** Simulates row-by-row creation with progress indicators. Imported products immediately become searchable via `/` and appear in catalog grids with a green "New" badge.

---

## 💾 Digital Asset Management (DAM) Rationale
DCAI requires permanent URLs and scalable storage for 50–100+ GB of datasheets, CAD files, and firmware:
- Located at `/staff/assets`, the demo models an S3-compatible object storage layer (e.g., Cloudflare R2 / Bunny Storage + CDN) with a 31.4 GB / 100 GB meter.
- Files adhere to the immutable folder convention:
  `/{brand}/{protocol}/{mpn}/{document}.pdf`
- Downloads generate genuine, valid PDF Blobs client-side to ensure every click delivers a real file without heavy external dependencies.

---

## 🎨 Architectural Editorial Design Tokens
- **Palette:** Warm paper (`#F5F2EC`), surface card (`#FBFAF7`), deep ink (`#1C2625`), pine primary (`#1F4B47`), single brass accent (`#B38442`).
- **Typography:** *Newsreader* for display serifs, *Hanken Grotesk* for clean UI body text, and *JetBrains Mono* for tabular MPNs and specs.
- **Strictly Avoided:** Neon glows, floating 3D tilt cards, glassmorphism, gradient text, stock AI robot graphics, and auto-playing carousels.

---

## ⏱️ The 2-Minute Client Demo Script
1. **0:00–0:15 &bull; First Impression:** Watch the dark bus-line loader reveal the paper-white page. Move the time slider in the Living Floor Plan from 07:00 to 23:00.
2. **0:15–0:35 &bull; Global Search:** Press `/` on your keyboard, type `4412`, and click `HLD-KX-4412`.
3. **0:35–0:55 &bull; Product Detail:** Inspect the technical parameters table, click "Download File" to receive the sample PDF, and copy the permanent DAM link.
4. **0:55–1:20 &bull; Protocol Grid & Filters:** Navigate to `/brands/halden/knx`. Filter by "Status: Active", sort by "MPN A–Z", and toggle between Grid and Dealer List view.
5. **1:20–1:45 &bull; Block Map & CSV Import:** Click **Staff view** (bottom-right) &bull; enable **Block Map** &bull; open **CSV Import Wizard** &bull; fix the unmapped `Datasheet URL` &bull; run the 12-row import.
6. **1:45–2:00 &bull; Analytics & Channel Safety:** Open **Staff Analytics** &bull; see your own searches and downloads reflected in today's telemetry &bull; check the Contact page router.
