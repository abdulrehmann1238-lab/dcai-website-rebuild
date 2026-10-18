import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MegaMenu } from './MegaMenu';
import { MobileSheet } from './MobileSheet';
import { Search, ChevronDown, Menu, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<'solutions' | 'brands' | 'resources' | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const menuTimeoutRef = useRef<number | null>(null);

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut listener for '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  const handleMouseEnter = (type: 'solutions' | 'brands' | 'resources') => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(type);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <>
      {/* Accessibility Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 z-[100] px-3 py-1.5 bg-primary text-paper rounded font-medium text-xs"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-med bg-paper/95 backdrop-blur-sm ${
          isScrolled ? 'border-b border-line shadow-sh-1' : ''
        }`}
      >
        <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-[60px] lg:h-[72px] flex items-center justify-between gap-4">
          {/* DCAI Logo */}
          <Link
            to="/home"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none"
            aria-label="DCAI Home"
          >
            {/* Bus Line & 3 Nodes Mark */}
            <div className="w-6 h-0.5 bg-ink relative">
              <span className="w-1.5 h-1.5 rounded-full bg-accent absolute -top-0.5 left-0 transition-transform group-hover:scale-125" />
              <span className="w-1.5 h-1.5 rounded-full bg-ink absolute -top-0.5 left-2.5" />
              <span className="w-1.5 h-1.5 rounded-full bg-accent absolute -top-0.5 right-0 transition-transform group-hover:scale-125" />
            </div>
            <span className="font-serif-display font-medium text-2xl tracking-tight text-ink">
              dcai
            </span>
          </Link>

          {/* Desktop Navigation Links with Mega Menus */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-ink-2" aria-label="Main Navigation">
            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('solutions')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 hover:text-ink transition-colors py-2 relative ${
                  path.startsWith('/solutions') ? 'text-primary font-semibold' : ''
                }`}
                aria-expanded={activeMenu === 'solutions'}
              >
                <span>Solutions</span>
                <ChevronDown className="w-3.5 h-3.5 text-ink-3 transition-transform" />
                {path.startsWith('/solutions') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
                )}
              </button>
              {activeMenu === 'solutions' && (
                <div className="absolute top-full left-0 pt-2 z-50">
                  <MegaMenu type="solutions" onClose={() => setActiveMenu(null)} />
                </div>
              )}
            </div>

            {/* Brands & Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('brands')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 hover:text-ink transition-colors py-2 relative ${
                  path.startsWith('/brands') ? 'text-primary font-semibold' : ''
                }`}
                aria-expanded={activeMenu === 'brands'}
              >
                <span>Brands & Products</span>
                <ChevronDown className="w-3.5 h-3.5 text-ink-3 transition-transform" />
                {path.startsWith('/brands') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
                )}
              </button>
              {activeMenu === 'brands' && (
                <div className="absolute top-full -left-20 pt-2 z-50">
                  <MegaMenu type="brands" onClose={() => setActiveMenu(null)} />
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('resources')}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={`flex items-center gap-1 hover:text-ink transition-colors py-2 relative ${
                  path.startsWith('/resources') ? 'text-primary font-semibold' : ''
                }`}
                aria-expanded={activeMenu === 'resources'}
              >
                <span>Resources</span>
                <ChevronDown className="w-3.5 h-3.5 text-ink-3 transition-transform" />
                {path.startsWith('/resources') && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
                )}
              </button>
              {activeMenu === 'resources' && (
                <div className="absolute top-full -left-12 pt-2 z-50">
                  <MegaMenu type="resources" onClose={() => setActiveMenu(null)} />
                </div>
              )}
            </div>

            {/* About Link */}
            <Link
              to="/about"
              className={`hover:text-ink transition-colors py-2 relative ${
                path === '/about' ? 'text-primary font-semibold' : ''
              }`}
            >
              <span>About</span>
              {path === '/about' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
              )}
            </Link>

            {/* Contact Link */}
            <Link
              to="/contact"
              className={`hover:text-ink transition-colors py-2 relative ${
                path === '/contact' ? 'text-primary font-semibold' : ''
              }`}
            >
              <span>Contact</span>
              {path === '/contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
              )}
            </Link>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Desktop Search Pill */}
            <button
              onClick={onOpenSearch}
              className="hidden sm:flex items-center justify-between w-64 lg:w-72 px-3 py-1.5 bg-surface hover:bg-elevated border border-line hover:border-line-strong rounded-pill text-xs text-ink-3 transition-all duration-fast shadow-sh-1"
              aria-label="Open global search (press slash)"
            >
              <span className="flex items-center gap-2 truncate">
                <Search className="w-3.5 h-3.5 text-ink-2 shrink-0" />
                <span className="truncate">Search MPN, brand or protocol</span>
              </span>
              <kbd className="px-1.5 py-0.5 rounded bg-paper border border-line font-mono text-[10px] text-ink-2 shrink-0">
                /
              </kbd>
            </button>

            {/* Mobile Search Icon Button */}
            <button
              onClick={onOpenSearch}
              className="sm:hidden p-2 rounded-md hover:bg-surface text-ink-2"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Dealer-Safe CTA Button */}
            <Link
              to="/contact#project"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-primary hover:bg-primary-hover active:bg-primary-active text-paper text-xs font-medium transition-colors shadow-sm shrink-0"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>Find a Certified Partner</span>
            </Link>

            {/* Mobile Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-surface text-ink-2"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Sheet */}
      <MobileSheet
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        onOpenSearch={onOpenSearch}
      />
    </>
  );
};
