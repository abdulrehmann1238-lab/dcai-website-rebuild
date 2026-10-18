import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useData } from '../state/DataContext';
import { Resource } from '../data/resources';
import { BlockFrame } from '../components/layout/BlockFrame';
import { FloorPlan } from '../components/floorplan/FloorPlan';
import {
  Home,
  Building2,
  Hotel,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  FileText,
  X,
  ExternalLink,
  Download,
  Share2
} from 'lucide-react';

interface VerticalConfig {
  title: string;
  tagline: string;
  description: string;
  icon: any;
  keyBenefits: { title: string; desc: string }[];
}

const VERTICAL_DATA: Record<string, VerticalConfig> = {
  residential: {
    title: 'Residential Solutions',
    tagline: 'Refined architectural intelligence for homes and penthouses.',
    description: 'We help architects and interior designers specify unified residential automation that looks considered and requires zero training to operate. From tactile anodized aluminum wall keypads to quiet motorized drapery and intelligent climate setback.',
    icon: Home,
    keyBenefits: [
      {
        title: 'Unified Master Scenes',
        desc: 'A single portal switch sets illumination, shades, and climate for "Welcome", "Entertain", or "Goodnight" without multi-gang wall switch clutter.'
      },
      {
        title: 'Human Centric Lighting & Tunable White',
        desc: 'Automated 2700K to 6500K color temperature adjustments that gently follow natural sunlight, supporting natural circadian rhythms.'
      },
      {
        title: 'Smart Shading Coordination',
        desc: 'Motorized blackout drapes and sheer blinds move in whisper-quiet synchrony to harvest daylight and insulate against afternoon heat.'
      },
      {
        title: 'Perimeter Integrity & Access',
        desc: 'Keyless European mortise locks integrated with Thread and Apple Home Key for secure touchless entry and immediate intrusion alerts.'
      }
    ]
  },
  commercial: {
    title: 'Commercial Solutions',
    tagline: 'Open-protocol building management for Grade-A towers and campuses.',
    description: 'DCAI delivers vendor-independent BACnet/IP and Modbus automation engines that give building owners and facility managers complete operational freedom. No proprietary maintenance contracts or closed software licenses.',
    icon: Building2,
    keyBenefits: [
      {
        title: 'Central Plant & Chiller Optimization',
        desc: 'High-throughput Modbus RTU to BACnet/IP gateways polling variable frequency drives and water chillers in real-time.'
      },
      {
        title: 'Demand-Controlled Ventilation (DCV)',
        desc: 'NDIR CO2 sensors dynamically modulate VAV terminal boxes, ensuring occupant alertness while slashing HVAC fan power.'
      },
      {
        title: 'Automated Sub-Billing Energy Metering',
        desc: 'MID-certified 3-phase kWh meters measuring active/reactive power, harmonics, and peak demand per commercial tenant.'
      },
      {
        title: 'Cybersecure Remote Service Tunnels',
        desc: 'Zero-trust outbound TLS gateways allowing certified technicians to inspect building telemetry without opening firewall ports.'
      }
    ]
  },
  hospitality: {
    title: 'Hospitality Solutions',
    tagline: 'Memorable guest room journeys and silent energy conservation.',
    description: 'Engineered for luxury resorts and boutique hotels where guest comfort is paramount and energy wastage from vacated rooms cannot be tolerated. Built on robust DALI-2 and KNX field hardware.',
    keyBenefits: [
      {
        title: 'Frictionless Guest Check-In Scenes',
        desc: 'Card-key or mobile key entry instantly activates a soft 2700K welcome light scene and slowly raises privacy drapes.'
      },
      {
        title: 'Intelligent Vacancy HVAC Setback',
        desc: 'Patio magnetic door sensors and dual-technology PIR occupancy sensors prevent AC cooling loss while guests enjoy the resort grounds.'
      },
      {
        title: 'Quiet Motorized Drapery Drives',
        desc: 'Brushless DC curtain motors operating below 28 dB(A) for whisper-silent morning opening without waking sleeping guests.'
      },
      {
        title: 'Central Engineering Maintenance Dashboard',
        desc: 'Staff alerts for filter replacements, ballast faults, and HVAC temperature anomalies before the guest ever reports them.'
      }
    ],
    icon: Hotel
  }
};

export const VerticalSolution: React.FC = () => {
  const { vertical: verticalSlug } = useParams<{ vertical: string }>();
  const { resources } = useData();
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  const config = verticalSlug ? VERTICAL_DATA[verticalSlug.toLowerCase()] : null;

  if (!config) {
    return <Navigate to="/solutions" replace />;
  }

  const Icon = config.icon;

  // Filter dynamic resources for this vertical
  const verticalResources = resources.filter(
    r => r.verticalTag.toLowerCase() === verticalSlug?.toLowerCase() || r.verticalTag === 'General'
  );

  const featuredCaseStudy = verticalResources.find(r => r.contentType === 'Case Study');
  const gridResources = verticalResources.filter(r => r.id !== featuredCaseStudy?.id).slice(0, 4);

  return (
    <div className="space-y-16 lg:space-y-20 py-10 lg:py-16 pb-20">
      {/* 1. dcai/page-header with Interactive Mini Scene Plan */}
      <BlockFrame
        block="dcai/page-header"
        type="Hybrid"
        source="Vertical Taxonomy Header + Interactive Scene Simulation"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 border-b border-line pb-12"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-ink-3 mb-4">
          <Link to="/home" className="hover:text-ink">Home</Link>
          <span>/</span>
          <Link to="/solutions" className="hover:text-ink">Solutions</Link>
          <span>/</span>
          <span className="text-ink font-semibold">{config.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
              <Icon className="w-4 h-4 text-accent" />
              <span>{config.title}</span>
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl text-ink font-normal leading-tight">
              {config.tagline}
            </h1>

            <p className="text-sm sm:text-base text-ink-2 leading-relaxed">
              {config.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/contact#project"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-medium transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-accent" />
                <span>Find a Certified Partner</span>
              </Link>
              <Link
                to="/brands"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-line-strong hover:bg-surface text-ink text-xs font-medium transition-colors"
              >
                <span>Browse Compatible Hardware</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <FloorPlan variant="compact" />
          </div>
        </div>
      </BlockFrame>

      {/* 2 & 3. Key Benefits (Left Sticky) + Featured Case Study & Grid (Right) */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: dcai/key-benefits (Sticky) */}
          <BlockFrame
            block="dcai/key-benefits"
            type="Static"
            source="ACF Key Benefits Matrix"
            className="lg:col-span-4 space-y-6 lg:sticky lg:top-24"
          >
            <div className="p-6 rounded-lg bg-surface border border-line space-y-6 shadow-sh-1">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold">
                  Engineering Rationale
                </div>
                <h2 className="font-serif-display text-xl text-ink font-medium mt-1">
                  Key Specification Benefits
                </h2>
              </div>

              <div className="space-y-5">
                {config.keyBenefits.map((b, i) => (
                  <div key={b.title} className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink">
                      <span className="text-accent">0{i + 1}.</span>
                      <span>{b.title}</span>
                    </div>
                    <p className="text-xs text-ink-2 leading-relaxed pl-5">
                      {b.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-line">
                <Link
                  to="/contact#trade"
                  className="text-xs font-mono text-primary font-medium hover:underline inline-flex items-center gap-1"
                >
                  <span>Request Engineering Schematics →</span>
                </Link>
              </div>
            </div>
          </BlockFrame>

          {/* Right Column: Case Studies & Resource Grid */}
          <div className="lg:col-span-8 space-y-10">
            {/* 3. dcai/featured-case-study */}
            {featuredCaseStudy && (
              <BlockFrame
                block="dcai/featured-case-study"
                type="Dynamic"
                source="Resource Collection (Featured Case Study)"
                className="p-8 rounded-lg bg-surface border border-line shadow-sh-1 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-line pb-2">
                  <span className="text-xs font-mono uppercase text-accent-text font-bold">
                    Featured Project Case Study
                  </span>
                  <span className="text-xs font-mono text-ink-3">{featuredCaseStudy.publishDate}</span>
                </div>

                <h3 className="font-serif-display text-2xl text-ink font-medium leading-snug">
                  {featuredCaseStudy.title}
                </h3>

                <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                  {featuredCaseStudy.summary}
                </p>

                {featuredCaseStudy.metrics && (
                  <div className="grid grid-cols-3 gap-4 pt-3 border-t border-line">
                    {featuredCaseStudy.metrics.map(m => (
                      <div key={m.label} className="p-2.5 rounded bg-paper border border-line">
                        <div className="font-mono text-sm sm:text-base font-bold text-primary">{m.value}</div>
                        <div className="text-[10px] text-ink-3">{m.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-3 border-t border-line flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono text-ink-3">Brands used:</span>
                    {featuredCaseStudy.brandsUsed?.map(b => (
                      <span key={b} className="text-[11px] font-mono px-2 py-0.5 rounded bg-paper border border-line text-ink">
                        {b}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setSelectedResource(featuredCaseStudy)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded bg-primary hover:bg-primary-hover text-paper text-xs font-medium transition-colors"
                  >
                    <span>Read Study</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </BlockFrame>
            )}

            {/* 4. dcai/resource-grid */}
            <BlockFrame
              block="dcai/resource-grid"
              type="Dynamic"
              source="Resources Collection Filtered by Vertical"
              className="space-y-4"
            >
              <div className="flex items-center justify-between border-b border-line pb-2">
                <h3 className="font-serif-display text-xl text-ink font-medium">
                  Technical Articles & Specification Guides
                </h3>
                <span className="text-xs font-mono text-ink-3">{gridResources.length} Articles</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gridResources.map(res => (
                  <div
                    key={res.id}
                    onClick={() => setSelectedResource(res)}
                    className="p-5 rounded-lg bg-surface border border-line hover:border-primary hover:shadow-sh-2 transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[10px] font-mono text-ink-3">
                        <span className="px-2 py-0.5 rounded bg-paper border border-line text-accent-text font-semibold uppercase">
                          {res.contentType}
                        </span>
                        <span>{res.publishDate}</span>
                      </div>

                      <h4 className="font-serif-display text-base font-medium text-ink group-hover:text-primary transition-colors leading-snug">
                        {res.title}
                      </h4>

                      <p className="text-xs text-ink-2 line-clamp-3 leading-relaxed">
                        {res.summary}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-line mt-4 flex items-center justify-between text-xs font-mono text-primary font-medium">
                      <span>Read Documentation</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </BlockFrame>
          </div>
        </div>
      </div>

      {/* 5. dcai/cta-single */}
      <BlockFrame
        block="dcai/cta-single"
        type="Static"
        source="Dealer-Safe Router CTA"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="p-8 sm:p-10 rounded-xl bg-surface border border-line shadow-sh-1 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="text-[11px] font-mono uppercase text-accent font-semibold tracking-wider">
              {config.title} Enablement
            </div>
            <h3 className="font-serif-display text-2xl font-medium text-ink">
              Looking to specify these systems in your project?
            </h3>
            <p className="text-xs text-ink-2 leading-relaxed">
              DCAI does not sell directly to consumers. We connect you with vetted, factory-trained system integrators in the Philippines with certified experience in {config.title.toLowerCase()}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/contact#project"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-medium transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Find a Certified Partner</span>
            </Link>
            <Link
              to="/contact#trade"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-line-strong hover:bg-paper text-ink text-xs font-medium transition-colors"
            >
              <span>Become a Dealer</span>
            </Link>
          </div>
        </div>
      </BlockFrame>

      {/* In-Page Reading Modal (ResourceModal) */}
      {selectedResource && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-ground/80 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-2xl w-full bg-elevated rounded-lg shadow-sh-3 border border-line p-6 sm:p-8 overflow-y-auto max-h-[85vh] space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary-tint text-primary font-bold">
                  {selectedResource.contentType}
                </span>
                <span className="text-xs font-mono text-ink-3">Published {selectedResource.publishDate}</span>
              </div>
              <button
                onClick={() => setSelectedResource(null)}
                className="p-1 rounded text-ink-3 hover:text-ink hover:bg-surface"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <h2 className="font-serif-display text-2xl sm:text-3xl text-ink font-medium leading-tight">
                {selectedResource.title}
              </h2>
              <div className="p-3 bg-paper rounded border border-line text-xs italic text-ink-2 leading-relaxed">
                {selectedResource.summary}
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-ink-2 leading-relaxed">
                {selectedResource.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {selectedResource.fileUrl && (
                <div className="pt-4 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-mono text-ink-3">Full PDF Document Available</span>
                  <a
                    href="#"
                    onClick={e => { e.preventDefault(); alert('Sample PDF download triggered.'); }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-primary text-paper text-xs font-medium hover:bg-primary-hover transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF ({selectedResource.fileSize})</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
