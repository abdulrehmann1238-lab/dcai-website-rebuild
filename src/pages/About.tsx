import React from 'react';
import { Link } from 'react-router-dom';
import { COPY } from '../data/copy';
import { BRANDS } from '../data/brands';
import { BlockFrame } from '../components/layout/BlockFrame';
import {
  GraduationCap,
  Award,
  Layers,
  Headphones,
  CheckCircle2,
  ShieldCheck,
  Building,
  Users,
  Calendar,
  ArrowRight
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-16 lg:space-y-24 py-10 lg:py-16 pb-20">
      {/* 1. dcai/page-header */}
      <BlockFrame
        block="dcai/page-header"
        type="Static"
        source="Gutenberg Header Block"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-4 max-w-3xl"
      >
        <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
          About Digicom Controls & Automation Inc.
        </div>
        <h1 className="font-serif-display text-4xl sm:text-5xl text-ink font-normal tracking-tight">
          Distribution with a teaching habit.
        </h1>
        <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed">
          DCAI is a distributor and systems-enablement partner for smart automation and in-building technology in the Philippines. We supply certified dealers, train their teams, and help consultants and owners understand what these systems can do.
        </p>
      </BlockFrame>

      {/* 2. dcai/text-media (Who We Are + Pull-Quote) */}
      <BlockFrame
        block="dcai/text-media"
        type="Static"
        source="Core Prose & Pull-Quote Block"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4 text-sm sm:text-base text-ink-2 leading-relaxed">
            <h2 className="font-serif-display text-2xl sm:text-3xl text-ink font-medium">
              A solution-first, brand-agnostic distribution philosophy
            </h2>
            <p>
              Smart building automation in the Philippines is often compromised by proprietary silos, closed ecosystems, and rushed installations. DCAI was established in 2009 to bring international standards — KNX, DALI-2, BACnet, and Matter — to Philippine architecture with uncompromising engineering rigor.
            </p>
            <p>
              We do not sell direct to end clients. Instead, we invest heavily in our network of over 120 certified system integrators. By providing local inventory, physical hardware testing benches, and ETS certification sponsorships, we ensure that every project bearing our distributed brands is installed correctly the first time.
            </p>
            <p>
              For architects, developers, and MEP consultants, we serve as an independent specification advisor — helping you evaluate protocols, avoid common dimming pitfalls, and design infrastructure that remains serviceable decades later.
            </p>
          </div>

          <div className="lg:col-span-5 p-8 rounded-lg bg-surface border-l-4 border-accent shadow-sh-1 space-y-4">
            <blockquote className="font-serif-display italic text-xl sm:text-2xl text-ink leading-snug">
              &ldquo;We don&apos;t just distribute hardware in boxes. We ensure the engineers installing it in Makati, Cebu, and Davao understand every byte of the bus protocol.&rdquo;
            </blockquote>
            <div className="text-xs font-mono text-ink-3">
              — DCAI Technical Enablement Charter
            </div>
          </div>
        </div>
      </BlockFrame>

      {/* 3. dcai/service-list (What We Do) */}
      <BlockFrame
        block="dcai/service-list"
        type="Static"
        source="Service Repeater Block"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
      >
        <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
          Enablement Pillars
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl text-ink font-normal">
          What a True Distributor Does
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: GraduationCap,
              title: 'Hands-on Technical Training',
              desc: 'Dedicated training laboratory in Pasig City equipped with live KNX, DALI, and BACnet test benches for integrators and apprentices.'
            },
            {
              icon: Award,
              title: 'Official Certification Programs',
              desc: 'Certified Partner accreditations and ETS coursework testing real-world fault diagnosis and protocol parameterization.'
            },
            {
              icon: Layers,
              title: 'Pre-Sales MEP Consultation',
              desc: 'Reviewing lighting schedules, calculating DALI bus power limits, and sizing central controllers alongside consulting engineers.'
            },
            {
              icon: Headphones,
              title: 'Direct Factory Warranty Support',
              desc: 'Local warranty swaps, firmware advisories, and direct technical escalation with European engineering teams.'
            }
          ].map(srv => {
            const Icon = srv.icon;
            return (
              <div key={srv.title} className="p-6 rounded-lg bg-surface border border-line flex items-start gap-4">
                <div className="w-10 h-10 rounded bg-paper border border-line flex items-center justify-center text-primary shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif-display text-lg font-medium text-ink">{srv.title}</h3>
                  <p className="text-xs text-ink-2 leading-relaxed">{srv.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </BlockFrame>

      {/* 4. dcai/audience-split (How We Support Dealers vs Consultants) */}
      <BlockFrame
        block="dcai/audience-split"
        type="Static"
        source="Audience Two-Column Commitment Matrix"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-6"
      >
        <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
          Channel Commitments
        </div>
        <h2 className="font-serif-display text-2xl sm:text-3xl text-ink font-normal">
          How We Work With You
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dealers Column */}
          <div className="p-6 sm:p-8 rounded-lg bg-surface border border-line space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Users className="w-4 h-4 text-accent" />
              <span>For Dealers & System Integrators</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-ink-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                <span>Immediate inventory in Metro Manila warehouse with same-day dispatch.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                <span>Protected dealer trade margins and verified project registration.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                <span>Direct client referral matching based on geography and specialization.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                <span>Full access to ETS database catalogs and emergency telephone hotline.</span>
              </li>
            </ul>
            <div className="pt-2 border-t border-line">
              <Link to="/contact#trade" className="text-xs font-mono text-primary font-medium hover:underline inline-flex items-center gap-1">
                <span>Become an Authorized Dealer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Consultants Column */}
          <div className="p-6 sm:p-8 rounded-lg bg-surface border border-line space-y-4">
            <div className="flex items-center gap-2 text-primary font-semibold text-sm">
              <Building className="w-4 h-4 text-accent" />
              <span>For Consultants, Architects & Owners</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-ink-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                <span>Independent specification assistance without brand lock-in bias.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                <span>Downloadable CAD drawings, wiring schematics, and CSI master formats.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                <span>Verified partner shortlisting for competitive contractor bidding.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                <span>Educational brown-bag workshops for architectural design teams.</span>
              </li>
            </ul>
            <div className="pt-2 border-t border-line">
              <Link to="/contact#project" className="text-xs font-mono text-primary font-medium hover:underline inline-flex items-center gap-1">
                <span>Request Project Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </BlockFrame>

      {/* 5. dcai/credibility-markers (Brand Wordmarks & Proof) */}
      <BlockFrame
        block="dcai/credibility-markers"
        type="Static"
        source="Hardcoded Credibility Logos & Markers"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 border-t border-line pt-12 space-y-8"
      >
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
            Manufacturer Backing
          </div>
          <h2 className="font-serif-display text-2xl text-ink font-normal">
            Direct European Partnerships
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {BRANDS.map(b => (
            <div key={b.slug} className="p-6 rounded bg-surface border border-line text-center space-y-1">
              <span className="font-serif-display text-2xl font-medium text-ink">{b.name}</span>
              <div className="text-[11px] font-mono text-ink-3">{b.origin}</div>
            </div>
          ))}
        </div>
      </BlockFrame>

      {/* 6. dcai/cta-dual */}
      <BlockFrame
        block="dcai/cta-dual"
        type="Static"
        source="Dealer-Safe Two-Way Router"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/contact#trade"
            className="p-8 rounded-lg bg-surface border border-line hover:border-primary hover:bg-primary-tint/30 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono uppercase text-accent-text font-semibold">Integrator Network</div>
              <h3 className="font-serif-display text-2xl font-medium text-ink mt-1 group-hover:text-primary">
                Become a Certified Dealer
              </h3>
              <p className="text-xs text-ink-2 mt-2 leading-relaxed">
                Join over 120 certified Philippine partners with access to hardware inventory, training, and lead referrals.
              </p>
            </div>
            <div className="pt-4 border-t border-line mt-4 flex items-center justify-between text-xs font-mono text-primary font-medium">
              <span>Trade Application →</span>
            </div>
          </Link>

          <Link
            to="/contact#project"
            className="p-8 rounded-lg bg-surface border border-line hover:border-primary hover:bg-primary-tint/30 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="text-xs font-mono uppercase text-accent-text font-semibold">Project Specification</div>
              <h3 className="font-serif-display text-2xl font-medium text-ink mt-1 group-hover:text-primary">
                Find a Certified Partner
              </h3>
              <p className="text-xs text-ink-2 mt-2 leading-relaxed">
                Describe your residential or commercial project and we will introduce you to a vetted DCAI partner near you.
              </p>
            </div>
            <div className="pt-4 border-t border-line mt-4 flex items-center justify-between text-xs font-mono text-primary font-medium">
              <span>Partner Referral →</span>
            </div>
          </Link>
        </div>
      </BlockFrame>
    </div>
  );
};
