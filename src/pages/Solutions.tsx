import React from 'react';
import { Link } from 'react-router-dom';
import { COPY } from '../data/copy';
import { useData } from '../state/DataContext';
import { BlockFrame } from '../components/layout/BlockFrame';
import { Home, Building2, Hotel, CheckCircle2, ArrowRight, ShieldCheck, FileText } from 'lucide-react';

export const Solutions: React.FC = () => {
  const { resources } = useData();

  const verticals = [
    {
      slug: 'residential',
      title: 'Residential Automation',
      headline: 'Homes that look after lighting, climate and security on their own.',
      desc: 'Seamless architectural integration for luxury private homes, penthouses, and residential developments. Combining tactile milled aluminum keypads with automated daylight harvesting and quiet drapery drives.',
      benefits: [
        'Decentralized KNX & DALI lighting eliminates single points of system failure',
        'Motorized shading and intelligent climate setback lower monthly utility costs',
        'Matter and Zigbee micro-modules enable rapid retrofit without damaging finishes'
      ],
      icon: Home,
      link: '/solutions/residential'
    },
    {
      slug: 'commercial',
      title: 'Commercial Automation',
      headline: 'Offices and campuses that cut energy use without cutting comfort.',
      desc: 'Native BACnet/IP and Modbus building control engineered for commercial real estate. Giving mechanical contractors and facility directors complete vendor independence across chillers, VAV terminal boxes, and electrical sub-metering.',
      benefits: [
        'Open BACnet/IP controllers compatible with all major commercial BMS supervisors',
        'Demand-controlled ventilation (DCV) using NDIR CO2 sensors optimizes fresh air',
        'MID-certified 3-phase power metering facilitates automated tenant sub-billing'
      ],
      icon: Building2,
      link: '/solutions/commercial'
    },
    {
      slug: 'hospitality',
      title: 'Hospitality Automation',
      headline: 'Guest rooms and public areas that feel considered, and run efficiently.',
      desc: 'Tailored Room Management Systems (RMS) for 5-star island resorts and boutique urban hotels. Providing intuitive one-touch guest bedside scenes while cutting compressor runtimes when guest rooms are vacated.',
      benefits: [
        'Master "Welcome" and "Goodnight" scenes eliminate confusing multi-switch clusters',
        'Magnetic patio door interlocks prevent air conditioning waste while doors stay open',
        'Industrial DALI-2 drivers ensure camera flicker-free lighting in hotel ballrooms'
      ],
      icon: Hotel,
      link: '/solutions/hospitality'
    }
  ];

  return (
    <div className="space-y-16 lg:space-y-24 py-10 lg:py-16 pb-20">
      {/* 1. dcai/page-header */}
      <BlockFrame
        block="dcai/page-header"
        type="Static"
        source="Solutions Overview Header Block"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-4 max-w-3xl"
      >
        <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
          Solutions by Project Type
        </div>
        <h1 className="font-serif-display text-4xl sm:text-5xl text-ink font-normal tracking-tight">
          Intelligent control tailored to your building&apos;s purpose.
        </h1>
        <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed">
          Smart automation is never one-size-fits-all. DCAI configures open-protocol architectures designed specifically for the operational demands of luxury residential estates, commercial office towers, and high-turnover hospitality suites.
        </p>
      </BlockFrame>

      {/* 2-4. Three dcai/vertical-overview (Alternating Layouts) */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {verticals.map((v, idx) => {
          const Icon = v.icon;
          const isReversed = idx % 2 === 1;
          const relatedCaseStudy = resources.find(
            r => r.contentType === 'Case Study' && r.verticalTag.toLowerCase() === v.slug
          );

          return (
            <BlockFrame
              key={v.slug}
              block="dcai/vertical-overview"
              type="Hybrid"
              source={`Vertical Architecture (${v.title}) + Dynamic Resources`}
              className="p-8 sm:p-10 rounded-xl bg-surface border border-line shadow-sh-1"
            >
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                {/* Left/Right Text Column */}
                <div className={`lg:col-span-7 space-y-6 ${isReversed ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
                    <Icon className="w-4 h-4 text-accent" />
                    <span>{v.title}</span>
                  </div>

                  <h2 className="font-serif-display text-2xl sm:text-3xl text-ink font-medium leading-tight">
                    {v.headline}
                  </h2>

                  <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
                    {v.desc}
                  </p>

                  <ul className="space-y-2.5 pt-2">
                    {v.benefits.map(b => (
                      <li key={b} className="flex items-start gap-2.5 text-xs text-ink-2">
                        <CheckCircle2 className="w-4 h-4 text-status-success shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <Link
                      to={v.link}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-medium transition-colors"
                    >
                      <span>Explore {v.title} In-Depth</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Left/Right Dynamic Case Study Card */}
                <div className={`lg:col-span-5 ${isReversed ? 'lg:order-1' : ''}`}>
                  {relatedCaseStudy ? (
                    <div className="p-6 rounded-lg bg-paper border border-line shadow-sm space-y-4">
                      <div className="flex items-center justify-between text-[11px] font-mono text-ink-3 border-b border-line pb-2">
                        <span className="text-accent-text font-semibold uppercase">Featured Case Study</span>
                        <span>{relatedCaseStudy.publishDate}</span>
                      </div>
                      <h3 className="font-serif-display text-lg text-ink font-medium leading-snug">
                        {relatedCaseStudy.title}
                      </h3>
                      <p className="text-xs text-ink-2 line-clamp-3 leading-relaxed">
                        {relatedCaseStudy.summary}
                      </p>
                      {relatedCaseStudy.metrics && (
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-line">
                          {relatedCaseStudy.metrics.slice(0, 2).map(m => (
                            <div key={m.label}>
                              <div className="font-mono text-xs font-bold text-primary">{m.value}</div>
                              <div className="text-[10px] text-ink-3">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="pt-2">
                        <Link
                          to="/resources/consultants"
                          className="text-xs font-medium text-primary hover:underline flex items-center gap-1"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Read Full Case Study →</span>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 rounded-lg bg-paper border border-line text-center text-xs text-ink-3">
                      Architectural Case Study Available
                    </div>
                  )}
                </div>
              </div>
            </BlockFrame>
          );
        })}
      </div>

      {/* 5. dcai/cta-single */}
      <BlockFrame
        block="dcai/cta-single"
        type="Static"
        source="Dealer-Safe Project Consultation CTA"
        className="max-w-content mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="p-8 sm:p-10 rounded-xl bg-dark-ground text-dark-ink flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sh-2">
          <div className="space-y-2 max-w-xl">
            <div className="text-[11px] font-mono uppercase text-accent font-semibold tracking-wider">
              Project Specification Support
            </div>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-medium text-dark-ink">
              Planning a residential, commercial, or resort project?
            </h3>
            <p className="text-xs sm:text-sm text-dark-ink2 leading-relaxed">
              We connect developers, interior designers, and MEP consultants with certified DCAI integrators in your region with proven vertical experience.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              to="/contact#project"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent hover:bg-accent-text text-paper text-xs font-semibold tracking-wide transition-colors shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-paper" />
              <span>Talk to a Certified Partner</span>
            </Link>
          </div>
        </div>
      </BlockFrame>
    </div>
  );
};
