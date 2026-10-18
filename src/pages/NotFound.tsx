import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Home, HelpCircle } from 'lucide-react';

export const NotFound: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/brands`);
    }
  };

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center space-y-6">
      <div className="w-16 h-16 rounded-full bg-surface border border-line mx-auto flex items-center justify-center text-accent">
        <HelpCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2 max-w-md mx-auto">
        <div className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
          404 Error · Route Not Found
        </div>
        <h1 className="font-serif-display text-3xl sm:text-4xl text-ink font-normal">
          This page isn&apos;t on the plan.
        </h1>
        <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
          The requested document or part number route might have moved, or the URL contains an unregistered part number.
        </p>
      </div>

      {/* Search Input Bar */}
      <form onSubmit={handleSearch} className="max-w-md mx-auto flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-ink-3 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search part number (e.g. 4412)…"
            className="w-full pl-9 pr-3 py-2 text-xs rounded bg-surface border border-line text-ink placeholder:text-ink-3 focus:outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-primary text-paper text-xs font-medium hover:bg-primary-hover transition-colors"
        >
          Search
        </button>
      </form>

      {/* Helpful Recovery Links */}
      <div className="pt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
        <Link to="/home" className="inline-flex items-center gap-1.5 text-primary hover:underline">
          <Home className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
        <span>·</span>
        <Link to="/brands" className="text-primary hover:underline">
          Browse All Brands Directory
        </Link>
        <span>·</span>
        <Link to="/contact#trade" className="text-primary hover:underline">
          Ask Technical Team
        </Link>
      </div>
    </div>
  );
};
