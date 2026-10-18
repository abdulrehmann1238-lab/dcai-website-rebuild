import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { StaffPill } from '../components/layout/StaffPill';
import { SearchOverlay } from '../components/search/SearchOverlay';
import { useStaff } from '../state/StaffContext';
import { useData } from '../state/DataContext';
import { Sparkles, ChevronRight, Check } from 'lucide-react';

export const Layout: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isTourActive, endTour } = useStaff();
  const [tourStep, setTourStep] = useState(0);
  const location = useLocation();
  const { trackPageView } = useData();

  // Scroll to top and record page view on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(location.pathname);
  }, [location.pathname, trackPageView]);

  // Remove initial HTML loader once React is mounted
  useEffect(() => {
    const loader = document.getElementById('dcai-initial-loader');
    if (loader) {
      setTimeout(() => {
        loader.classList.add('loaded');
        setTimeout(() => {
          loader.remove();
        }, 400);
      }, 500);
    }
  }, []);

  const tourSteps = [
    {
      title: '1. The Living Floor Plan Hero',
      desc: 'Instead of stock video, this hand-drawn architectural SVG responds to the time slider, demonstrating multi-protocol building automation visually for non-technical clients.',
      action: 'Try sliding between 07:00 and 23:00, or clicking the pulsing hotspots.'
    },
    {
      title: '2. Global Search & Partial-MPN Matching',
      desc: 'DCAI dealers search by part numbers. Try pressing "/" or Cmd+K and typing "4412" — notice how "HLD-KX-4412" matches with instant highlight.',
      action: 'Press "/" anywhere on the site to trigger the search palette.'
    },
    {
      title: '3. Gutenberg Block Map Overlay',
      desc: 'Every section maps 1:1 to a native Gutenberg block and CMS collection. Toggle "Block map" in the Staff view pill to reveal section outlines and ACF data sources.',
      action: 'Check bottom-right Staff View → Toggle Block Map.'
    },
    {
      title: '4. Master CSV Import Wizard (WP All Import)',
      desc: 'Demonstrates Milestone 2: bulk ingest of 800+ products with column mapping, intentional error validation, and instant site-wide catalog updates.',
      action: 'Navigate to Staff View → Master CSV Import Wizard.'
    },
    {
      title: '5. Mobile-First Engineering Spec Tables',
      desc: 'Resize your browser or view on mobile: complex electrical spec tables automatically transform into clean stacked definition lists with sticky download bars.',
      action: 'Inspect any product page at 390px mobile width.'
    },
    {
      title: '6. Dealer-Safe Client Routing',
      desc: 'DCAI is a B2B distributor that never bypasses dealers. Notice that CTAs say "Find a Certified Partner" or "Become a Dealer", never "Buy" or "Get a Quote".',
      action: 'Check the Contact page router and submission confirmations.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink relative">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />

      <main id="main-content" className="flex-1 focus:outline-none">
        <Outlet />
      </main>

      <Footer />
      <StaffPill />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Guided 90-Second Tour Chip / Modal */}
      {isTourActive && (
        <div className="fixed bottom-16 left-4 sm:left-8 z-[85] max-w-md w-full bg-elevated border-2 border-accent rounded-lg shadow-sh-3 p-4 animate-slide-up">
          <div className="flex items-center justify-between border-b border-line pb-2 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-accent-text">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>DCAI Bid Tour ({tourStep + 1} of {tourSteps.length})</span>
            </div>
            <button
              onClick={endTour}
              className="text-xs text-ink-3 hover:text-ink font-mono"
            >
              Skip tour
            </button>
          </div>

          <div className="space-y-1.5 mb-4">
            <h4 className="font-serif-display font-medium text-base text-ink">{tourSteps[tourStep].title}</h4>
            <p className="text-xs text-ink-2 leading-relaxed">{tourSteps[tourStep].desc}</p>
            <div className="text-[11px] font-mono text-primary font-medium bg-primary-tint/50 p-2 rounded">
              👉 Tip: {tourSteps[tourStep].action}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-1">
              {tourSteps.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === tourStep ? 'bg-accent' : 'bg-line'}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              {tourStep > 0 && (
                <button
                  onClick={() => setTourStep(tourStep - 1)}
                  className="px-2.5 py-1 text-xs text-ink-2 hover:bg-surface rounded border border-line"
                >
                  Back
                </button>
              )}
              {tourStep < tourSteps.length - 1 ? (
                <button
                  onClick={() => setTourStep(tourStep + 1)}
                  className="px-3 py-1 text-xs bg-primary hover:bg-primary-hover text-paper rounded font-medium flex items-center gap-1"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              ) : (
                <button
                  onClick={endTour}
                  className="px-3 py-1 text-xs bg-status-success text-paper rounded font-medium flex items-center gap-1"
                >
                  <span>Finish Tour</span>
                  <Check className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
