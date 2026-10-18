import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COPY } from '../data/copy';
import { BRANDS } from '../data/brands';
import { PROTOCOLS } from '../data/protocols';
import { useData } from '../state/DataContext';
import { usePersona } from '../state/PersonaContext';
import { BlockFrame } from '../components/layout/BlockFrame';
import { FloorPlan } from '../components/floorplan/FloorPlan';
import { ProtocolGlyph } from '../components/ui/ProtocolGlyph';
import {
  ShieldCheck,
  ArrowRight,
  Home as HomeIcon,
  Building2,
  Hotel,
  Layers,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Tag
} from 'lucide-react';

export const Home: React.FC = () => {
  const { persona, togglePersona } = usePersona();
  const { products, resources } = useData();
  const navigate = useNavigate();

  // Case studies for featured projects
  const caseStudies = resources.filter(r => r.contentType === 'Case Study').slice(0, 3);

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* 1. dcai/hero — Living Floor Plan Hero */}
      <BlockFrame
        block="dcai/hero"
        type="Static"
        source="Hard-coded block layout with dynamic SVG attributes"
        className="pt-6 lg:pt-12"
      >
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content (Cols 1-6) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-pill bg-primary-tint/80 border border-primary/20 text-primary text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span>{COPY.home.eyebrow}</span>
              </div>

              <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl text-ink font-normal tracking-tight leading-[1.05]">
                {COPY.home.heroH1}
              </h1>

              <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed max-w-xl">
                {COPY.home.heroSub}
              </p>

              {/* Dual Action Buttons (Dealer-Safe) */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/contact#project"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md bg-primary hover:bg-primary-hover active:bg-primary-active text-paper text-sm font-medium transition-colors shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Find a Certified Partner</span>
                </Link>

                <Link
                  to="/contact#trade"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-line-strong hover:border-ink hover:bg-surface text-ink text-sm font-medium transition-colors"
                >
                  <span>Become a Dealer</span>
                </Link>
              </div>

              {/* Trust Strip */}
              <div className="pt-4 border-t border-line flex items-center gap-6 text-xs font-mono text-ink-3">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-ink">4</span> Brands
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-ink">120+</span> Certified Partners
                </div>
                <span>·</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-ink">800+</span> Documented MPNs
                </div>
              </div>
            </div>

            {/* Right Interactive Plan (Cols 7-12) */}
            <div className="lg:col-span-6">
              <FloorPlan />
            </div>
          </div>
        </div>

        {/* Persona Selector Strip directly under hero */}
        <div className="max-w-wide mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="p-3.5 sm:p-4 rounded-lg bg-surface border border-line flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sh-1">
            <div className="flex items-center gap-2 text-xs font-mono text-ink-3 uppercase tracking-wider shrink-0">
              <span className="font-semibold text-ink">{COPY.home.personaTitle}</span>
              <span className="hidden sm:inline">Select your role to adapt information:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {COPY.home.personas.map(p => {
                const isSelected = persona === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => togglePersona(p.id as any)}
                    className={`px-3 py-1.5 rounded-sm text-xs transition-colors flex items-center gap-2 border ${
                      isSelected
                        ? 'bg-primary text-paper border-primary font-semibold shadow-sm'
                        : 'bg-paper text-ink-2 border-line hover:border-line-strong hover:bg-surface'
                    }`}
                  >
                    <span>{p.label}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-accent" />}
                  </button>
                );
              })}
              {persona && (
                <button
                  onClick={() => togglePersona(null)}
                  className="text-[11px] font-mono text-ink-3 hover:text-ink px-2 py-1 underline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </BlockFrame>

      {/* 2. dcai/who-we-are — Static 7/5 Split */}
      <BlockFrame
        block="dcai/who-we-are"
        type="Static"
        source="Gutenberg Core Paragraph + Image"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
              The DCAI Approach
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-ink leading-tight font-normal">
              {COPY.home.whoWeAreHeading}
            </h2>
            <p className="text-base text-ink-2 leading-relaxed">
              {COPY.home.whoWeAreText}
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 font-medium text-primary hover:text-primary-hover text-sm"
              >
                <span>{COPY.home.whoWeAreCta}</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            {/* Architectural Line Drawing Illustration */}
            <div className="p-6 bg-surface rounded-lg border border-line shadow-sh-1 space-y-3">
              <div className="flex items-center justify-between border-b border-line pb-2 text-xs font-mono text-ink-3">
                <span>ENABLEMENT MODEL</span>
                <span>METRO MANILA</span>
              </div>
              <svg viewBox="0 0 360 200" fill="none" className="w-full h-auto text-ink">
                <rect x="20" y="30" width="80" height="140" rx="4" stroke="#1F4B47" strokeWidth="1.5" fill="#E3EBE8" />
                <text x="60" y="105" textAnchor="middle" fill="#1F4B47" fontSize="10" fontFamily="Hanken Grotesk" fontWeight="600">
                  DCAI
                </text>
                <text x="60" y="120" textAnchor="middle" fill="#5E7A74" fontSize="8" fontFamily="JetBrains Mono">
                  Distributor
                </text>

                {/* Arrow to Dealers */}
                <path d="M 105 100 L 155 100" stroke="#B38442" strokeWidth="2" strokeDasharray="3 3" />
                <polygon points="155,96 163,100 155,104" fill="#B38442" />

                <rect x="165" y="30" width="90" height="140" rx="4" stroke="#1C2625" strokeWidth="1.5" fill="#FBFAF7" />
                <text x="210" y="100" textAnchor="middle" fill="#1C2625" fontSize="10" fontFamily="Hanken Grotesk" fontWeight="600">
                  Certified
                </text>
                <text x="210" y="115" textAnchor="middle" fill="#1C2625" fontSize="10" fontFamily="Hanken Grotesk" fontWeight="600">
                  Dealers
                </text>
                <text x="210" y="132" textAnchor="middle" fill="#6F7976" fontSize="8" fontFamily="JetBrains Mono">
                  Integrators
                </text>

                {/* Arrow to Clients */}
                <path d="M 260 100 L 295 100" stroke="#1F4B47" strokeWidth="1.5" />
                <polygon points="295,97 302,100 295,103" fill="#1F4B47" />

                <circle cx="330" cy="100" r="22" stroke="#5E7A74" strokeWidth="1.5" fill="#F5F2EC" />
                <text x="330" y="98" textAnchor="middle" fill="#1C2625" fontSize="9" fontFamily="Hanken Grotesk">
                  End
                </text>
                <text x="330" y="110" textAnchor="middle" fill="#1C2625" fontSize="9" fontFamily="Hanken Grotesk">
                  Clients
                </text>
              </svg>
              <div className="text-[11px] text-ink-3 font-mono text-center">
                Channel-safe distribution protects the installer ecosystem.
              </div>
            </div>
          </div>
        </div>
      </BlockFrame>

      {/* 3. dcai/brand-showcase — Dynamic Brand Collection */}
      <BlockFrame
        block="dcai/brand-showcase"
        type="Dynamic"
        source="Brand Collection (WooCommerce Brand Taxonomy)"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="space-y-6">
          <div className="flex items-end justify-between border-b border-line pb-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
                {COPY.home.brandsEyebrow}
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl text-ink font-normal mt-1">
                Four Brands. One Technical Library.
              </h2>
            </div>
            <Link to="/brands" className="text-xs font-mono text-primary hover:underline hidden sm:block">
              View All Brands Directory →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BRANDS.map(brand => {
              const brandProtocols = PROTOCOLS.filter(p => p.brandSlug === brand.slug);
              const productCount = products.filter(p => p.brandSlug === brand.slug).length;

              return (
                <Link
                  key={brand.slug}
                  to={`/brands/${brand.slug}`}
                  className="p-6 rounded-md bg-surface border border-line hover:border-primary hover:shadow-sh-2 transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif-display text-2xl font-medium text-ink group-hover:text-primary transition-colors">
                        {brand.name}
                      </span>
                      <ArrowRight className="w-4 h-4 text-ink-3 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <p className="text-xs text-ink-2 leading-relaxed min-h-[48px]">
                      {brand.tagline}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-line mt-4">
                    <div className="flex items-center justify-between text-[11px] font-mono text-ink-3">
                      <span>{brandProtocols.length} Protocols</span>
                      <span className="text-primary font-semibold">{productCount} Products</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {brandProtocols.map(pr => (
                        <span key={pr.slug} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-paper border border-line text-ink-2">
                          {pr.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </BlockFrame>

      {/* 4. dcai/solutions-snapshot — Static 3 Vertical Panels */}
      <BlockFrame
        block="dcai/solutions-snapshot"
        type="Static"
        source="Solutions Taxonomy & Layout"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="space-y-6">
          <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
            {COPY.home.solutionsEyebrow}
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl text-ink font-normal">
            Automation Configured for Every Environment
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COPY.home.solutions.map(sol => (
              <Link
                key={sol.slug}
                to={sol.link}
                className="p-6 rounded-lg bg-surface border border-line hover:border-primary hover:shadow-sh-2 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-md bg-paper border border-line flex items-center justify-center text-primary group-hover:bg-primary-tint transition-colors">
                    {sol.slug === 'residential' && <HomeIcon className="w-5 h-5" />}
                    {sol.slug === 'commercial' && <Building2 className="w-5 h-5" />}
                    {sol.slug === 'hospitality' && <Hotel className="w-5 h-5" />}
                  </div>

                  <h3 className="font-serif-display text-xl font-medium text-ink group-hover:text-primary transition-colors">
                    {sol.heading}
                  </h3>

                  <p className="text-xs text-ink-2 leading-relaxed">
                    {sol.summary}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-line flex items-center justify-between text-xs font-mono text-primary font-medium">
                  <span>Explore {sol.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </BlockFrame>

      {/* 5. dcai/featured-projects — Dynamic Resources (Case Studies) */}
      <BlockFrame
        block="dcai/featured-projects"
        type="Dynamic"
        source="Resources Collection (Type: Case Study)"
        className={`max-w-content mx-auto px-4 sm:px-6 lg:px-8 ${persona === 'owner' ? 'order-first' : ''}`}
      >
        <div className="space-y-6">
          <div className="flex items-end justify-between border-b border-line pb-4">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
                Real-World Implementation
              </div>
              <h2 className="font-serif-display text-2xl sm:text-3xl text-ink font-normal mt-1">
                Completed Philippine Case Studies
              </h2>
            </div>
            <Link to="/resources" className="text-xs font-mono text-primary hover:underline hidden sm:block">
              View All Resources & Case Studies →
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {caseStudies.map((cs, idx) => (
              <div
                key={cs.id}
                className={`${
                  idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                } p-6 rounded-lg bg-surface border border-line flex flex-col justify-between space-y-4 shadow-sh-1`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-primary-tint text-primary font-semibold">
                      {cs.verticalTag}
                    </span>
                    <span className="text-[11px] font-mono text-ink-3">{cs.publishDate}</span>
                  </div>

                  <h3 className="font-serif-display text-xl text-ink font-medium leading-snug">
                    {cs.title}
                  </h3>

                  <p className="text-xs text-ink-2 leading-relaxed">
                    {cs.summary}
                  </p>

                  {cs.metrics && (
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-line">
                      {cs.metrics.map(m => (
                        <div key={m.label}>
                          <div className="font-mono text-xs font-semibold text-accent-text">{m.value}</div>
                          <div className="text-[10px] text-ink-3">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-line flex items-center justify-between">
                  <span className="text-xs font-mono text-ink-3">Brands: {cs.brandsUsed?.join(', ')}</span>
                  <Link
                    to="/resources/consultants"
                    className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>Read Study</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </BlockFrame>

      {/* 6. dcai/why-dcai — Static Dark Credibility Band */}
      <BlockFrame
        block="dcai/why-dcai"
        type="Static"
        source="Hard-coded credibility counters + 4 Principles"
        className="bg-dark-ground text-dark-ink py-16 px-4 sm:px-6 lg:px-8 border-y border-dark-ink2/20"
      >
        <div className="max-w-content mx-auto space-y-12">
          <div className="max-w-xl space-y-2">
            <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
              Credibility & Capability
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-dark-ink font-normal">
              {COPY.home.whyDcaiHeading}
            </h2>
          </div>

          {/* 4 Counters with tabular-nums */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-dark-ink2/20 py-8">
            <div className="space-y-1 border-r border-dark-ink2/20 pr-4">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-accent tabular-nums">
                {COPY.proof.years}
              </div>
              <div className="text-xs text-dark-ink2 font-medium">{COPY.proof.yearsDetail}</div>
            </div>

            <div className="space-y-1 border-r border-dark-ink2/20 pr-4">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-dark-ink tabular-nums">
                {COPY.proof.dealers}
              </div>
              <div className="text-xs text-dark-ink2 font-medium">{COPY.proof.dealersDetail}</div>
            </div>

            <div className="space-y-1 border-r border-dark-ink2/20 pr-4">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-dark-ink tabular-nums">
                {COPY.proof.projects}
              </div>
              <div className="text-xs text-dark-ink2 font-medium">{COPY.proof.projectsDetail}</div>
            </div>

            <div className="space-y-1">
              <div className="font-mono text-3xl sm:text-4xl font-semibold text-accent tabular-nums">
                {COPY.proof.mpns}
              </div>
              <div className="text-xs text-dark-ink2 font-medium">{COPY.proof.mpnsDetail}</div>
            </div>
          </div>

          {/* 4 Principles: Distribute -> Train -> Certify -> Support */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COPY.home.principles.map(p => (
              <div key={p.step} className="space-y-2 p-4 rounded bg-white/5 border border-white/10">
                <div className="font-mono text-xs text-accent font-bold">{p.step}</div>
                <div className="font-serif-display text-lg text-dark-ink font-medium">{p.title}</div>
                <p className="text-xs text-dark-ink2 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </BlockFrame>

      {/* 7. dcai/cta-dual — Two Large Clickable Panels */}
      <BlockFrame
        block="dcai/cta-dual"
        type="Static"
        source="Dealer-Safe CTA Panels"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="space-y-4">
          <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
            {COPY.home.dualCtaHeading}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Panel 1: Become a Dealer */}
            <Link
              to="/contact#trade"
              className="p-8 rounded-lg bg-surface border border-line hover:border-primary hover:bg-primary-tint/30 transition-all group flex flex-col justify-between shadow-sh-1"
            >
              <div className="space-y-3">
                <div className="font-mono text-xs uppercase text-accent-text font-semibold">
                  For Integrators & Installers
                </div>
                <h3 className="font-serif-display text-2xl font-medium text-ink group-hover:text-primary transition-colors">
                  {COPY.home.ctaDealerTitle}
                </h3>
                <p className="text-xs text-ink-2 leading-relaxed">
                  {COPY.home.ctaDealerSub}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-line flex items-center justify-between text-xs font-mono font-medium text-primary">
                <span>Start Trade Onboarding</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Panel 2: Find a Certified Partner */}
            <Link
              to="/contact#project"
              className="p-8 rounded-lg bg-surface border border-line hover:border-primary hover:bg-primary-tint/30 transition-all group flex flex-col justify-between shadow-sh-1"
            >
              <div className="space-y-3">
                <div className="font-mono text-xs uppercase text-accent-text font-semibold">
                  For Developers & Homeowners
                </div>
                <h3 className="font-serif-display text-2xl font-medium text-ink group-hover:text-primary transition-colors">
                  {COPY.home.ctaPartnerTitle}
                </h3>
                <p className="text-xs text-ink-2 leading-relaxed">
                  {COPY.home.ctaPartnerSub}
                </p>
              </div>
              <div className="pt-6 mt-4 border-t border-line flex items-center justify-between text-xs font-mono font-medium text-primary">
                <span>Request Partner Introduction</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </BlockFrame>
    </div>
  );
};
