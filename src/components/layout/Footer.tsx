import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../state/ToastContext';
import { ShieldCheck, ArrowUp, Send, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; body: string } | null>(null);
  const { addToast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid business email address.', 'error');
      return;
    }
    setIsSubscribed(true);
    addToast('Subscribed to DCAI Dealer Bulletin (simulated).', 'success');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-ground text-dark-ink relative overflow-hidden">
      {/* 1. Large Closing Moment Band */}
      <div className="relative border-b border-dark-ink2/20 py-20 px-4 sm:px-6 lg:px-8 max-w-wide mx-auto">
        {/* Faint oversized wordmark background outline */}
        <div className="absolute right-0 bottom-0 pointer-events-none select-none opacity-5 translate-y-12">
          <span className="font-serif-display text-[180px] lg:text-[240px] text-dark-ink tracking-tighter leading-none">
            dcai
          </span>
        </div>

        <div className="max-w-3xl relative z-10 space-y-6">
          <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
            Philippine Smart-Building Distribution
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl text-dark-ink leading-tight">
            &ldquo;Built to be specified, installed and supported — by people who know the systems.&rdquo;
          </h2>
          <p className="text-sm text-dark-ink2 leading-relaxed max-w-xl">
            We supply certified system integrators with direct European inventory, pre-sales engineering calculations, hands-on commissioning labs, and full warranty backing.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              to="/contact#project"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent hover:bg-accent-text text-paper text-xs font-semibold tracking-wide transition-colors shadow-sm"
            >
              <ShieldCheck className="w-4 h-4 text-paper" />
              <span>Find a Certified Partner</span>
            </Link>
            <Link
              to="/contact#trade"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-dark-ink2/40 hover:border-dark-ink text-dark-ink text-xs font-medium transition-colors"
            >
              <span>Become a Dealer</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Structured Footer Directory Grid */}
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Headquarters */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-0.5 bg-accent relative">
                <span className="w-1.5 h-1.5 rounded-full bg-accent absolute -top-0.5 left-0" />
                <span className="w-1.5 h-1.5 rounded-full bg-dark-ink absolute -top-0.5 left-2" />
                <span className="w-1.5 h-1.5 rounded-full bg-accent absolute -top-0.5 right-0" />
              </div>
              <span className="font-serif-display font-medium text-xl text-dark-ink">dcai</span>
            </div>
            <p className="text-xs text-dark-ink2 leading-relaxed max-w-sm">
              Digicom Controls and Automation Inc. (DCAI) is the authorized technical distribution and enablement partner for open-protocol building automation in the Philippines.
            </p>
            <div className="text-xs text-dark-ink2 space-y-1 font-mono">
              <div>Ortigas Center, Pasig City, Metro Manila</div>
              <div>+63 (2) 8876 5432 · technical@dcai.example</div>
            </div>
          </div>

          {/* Col 2: Solutions */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-dark-ink font-semibold">
              Solutions
            </div>
            <ul className="space-y-2 text-xs text-dark-ink2">
              <li><Link to="/solutions/residential" className="hover:text-dark-ink transition-colors">Residential Homes</Link></li>
              <li><Link to="/solutions/commercial" className="hover:text-dark-ink transition-colors">Commercial Towers</Link></li>
              <li><Link to="/solutions/hospitality" className="hover:text-dark-ink transition-colors">Hospitality Resorts</Link></li>
              <li><Link to="/solutions" className="hover:text-dark-ink transition-colors">Solutions Hub</Link></li>
            </ul>
          </div>

          {/* Col 3: Brands */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-dark-ink font-semibold">
              Brands
            </div>
            <ul className="space-y-2 text-xs text-dark-ink2">
              <li><Link to="/brands/halden" className="hover:text-dark-ink transition-colors">Halden (KNX / DALI)</Link></li>
              <li><Link to="/brands/verelli" className="hover:text-dark-ink transition-colors">Verelli (DALI-2)</Link></li>
              <li><Link to="/brands/korvane" className="hover:text-dark-ink transition-colors">Korvane (Zigbee / Matter)</Link></li>
              <li><Link to="/brands/tessaro" className="hover:text-dark-ink transition-colors">Tessaro (BACnet)</Link></li>
            </ul>
          </div>

          {/* Col 4: Resources */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-dark-ink font-semibold">
              Resources
            </div>
            <ul className="space-y-2 text-xs text-dark-ink2">
              <li><Link to="/resources/consultants" className="hover:text-dark-ink transition-colors">For Consultants</Link></li>
              <li><Link to="/resources/dealers" className="hover:text-dark-ink transition-colors">For Dealers & Techs</Link></li>
              <li><Link to="/resources" className="hover:text-dark-ink transition-colors">Case Studies</Link></li>
              <li><Link to="/about" className="hover:text-dark-ink transition-colors">Why DCAI</Link></li>
              <li><Link to="/contact" className="hover:text-dark-ink transition-colors">Contact DCAI</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription Strip */}
        <div className="border-t border-dark-ink2/20 pt-8 pb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-dark-ink">Dealer bulletin — product notices & training dates</div>
            <div className="text-[11px] text-dark-ink2 mt-0.5">Direct technical bulletins, firmware releases, and ETS certification dates.</div>
          </div>
          {isSubscribed ? (
            <div className="flex items-center gap-2 text-xs text-status-success font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you! Your email is registered for technical bulletins.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 max-w-md w-full">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="trade@integrator.ph"
                className="flex-1 px-3 py-2 text-xs rounded-sm bg-black/40 border border-dark-ink2/40 text-dark-ink placeholder:text-dark-ink2/60 focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium rounded-sm bg-accent hover:bg-accent-text text-paper transition-colors shrink-0 flex items-center gap-1.5"
              >
                <span>Subscribe</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          )}
        </div>

        {/* Legal & Back to Top Bar */}
        <div className="border-t border-dark-ink2/20 pt-6 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-dark-ink2 gap-3">
          <div>© 2026 Digicom Controls and Automation Inc. (DCAI). All rights reserved.</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setModalContent({
                title: 'Privacy Policy',
                body: 'Digicom Controls and Automation Inc. (DCAI) respects data privacy in accordance with Republic Act No. 10173 (Data Privacy Act of 2012). Technical inquiry details are utilized solely for dealer matching and direct technical support. We never sell or share commercial data with unauthorized third parties.'
              })}
              className="hover:text-dark-ink transition-colors"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => setModalContent({
                title: 'Terms of Distribution & Use',
                body: 'DCAI products are distributed exclusively through authorized and certified system integrators. Product warranties require installation by trained personnel adhering to manufacturer electrical specifications and local building code standards.'
              })}
              className="hover:text-dark-ink transition-colors"
            >
              Terms of Use
            </button>
            <span>·</span>
            <button
              onClick={() => setModalContent({
                title: 'Cookie & Session Settings',
                body: 'This prototype utilizes local browser session storage solely to remember user persona filters and mock analytics increments. No third-party tracking or advertising cookies are utilized.'
              })}
              className="hover:text-dark-ink transition-colors"
            >
              Cookie Settings
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-dark-ink transition-colors font-mono"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Simple Legal Modal */}
      {modalContent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-ground/70 backdrop-blur-sm">
          <div className="bg-elevated text-ink p-6 rounded-lg max-w-lg w-full border border-line shadow-sh-3 space-y-4">
            <h3 className="font-serif-display text-xl text-ink font-medium">{modalContent.title}</h3>
            <p className="text-xs text-ink-2 leading-relaxed">{modalContent.body}</p>
            <div className="text-right pt-2">
              <button
                onClick={() => setModalContent(null)}
                className="px-4 py-1.5 rounded bg-primary text-paper text-xs font-medium hover:bg-primary-hover transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
