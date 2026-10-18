import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useData } from '../../state/DataContext';
import { useToast } from '../../state/ToastContext';
import {
  FileSpreadsheet,
  Package,
  BarChart3,
  Database,
  LayoutDashboard,
  ExternalLink,
  Bell,
  RotateCcw,
  User,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';

export const StaffLayout: React.FC = () => {
  const location = useLocation();
  const { resetDemoData } = useData();
  const { addToast } = useToast();

  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const notifications = [
    { id: 1, text: 'Search index rebuilt: 60 products + 18 resources', time: '5m ago' },
    { id: 2, text: '3 products missing CAD drawing submittals', time: '1h ago' },
    { id: 3, text: 'System ready for Master CSV batch ingest', time: '2h ago' }
  ];

  const handleReset = () => {
    resetDemoData();
    addToast('Demo catalog & analytics reset to initial state.', 'info');
  };

  const navItems = [
    { path: '/staff', label: 'Overview', icon: LayoutDashboard },
    { path: '/staff/import', label: 'CSV Import Wizard', icon: FileSpreadsheet },
    { path: '/staff/products', label: 'Products & Schema', icon: Package },
    { path: '/staff/assets', label: 'Assets & DAM', icon: Database },
    { path: '/staff/analytics', label: 'Analytics Dashboard', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen flex bg-paper text-ink">
      {/* Left Sidebar (240px Desktop) */}
      <aside className="hidden md:flex w-60 bg-dark-ground text-dark-ink flex-col justify-between p-4 border-r border-dark-ink2/20 shrink-0">
        <div className="space-y-6">
          {/* Logo & Staff Badge */}
          <div className="flex items-center justify-between border-b border-dark-ink2/20 pb-4">
            <Link to="/home" className="flex items-center gap-2 group">
              <span className="font-serif-display font-medium text-xl text-dark-ink">dcai</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-accent/20 text-accent border border-accent/40 font-semibold uppercase">
                Staff
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 text-xs">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md transition-colors ${
                    isActive
                      ? 'bg-accent/20 text-accent font-semibold border-l-2 border-accent'
                      : 'text-dark-ink2 hover:bg-white/5 hover:text-dark-ink'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="border-t border-dark-ink2/20 pt-4 space-y-3">
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-white/5 hover:bg-white/10 text-dark-ink2 hover:text-dark-ink text-xs font-mono transition-colors"
            title="Reset store and metrics"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <Link
            to="/home"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded bg-accent hover:bg-accent-text text-paper text-xs font-semibold transition-colors shadow-sm"
          >
            <span>Exit Staff View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Staff Bar */}
        <header className="h-14 border-b border-line bg-surface px-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 rounded hover:bg-paper text-ink-2"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-ink-3">
              DCAI CMS Simulation &bull; WP All Import &plus; ACF Architecture
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Notifications Popover */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-1.5 rounded hover:bg-paper text-ink-2 relative"
                aria-label="Staff notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-accent" />
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-elevated border border-line rounded-lg shadow-sh-2 p-3 text-xs space-y-2 z-50 animate-slide-up">
                  <div className="font-semibold text-ink border-b border-line pb-1.5">System Alerts</div>
                  <div className="space-y-2">
                    {notifications.map(n => (
                      <div key={n.id} className="p-2 rounded bg-paper/60 border border-line text-[11px] space-y-0.5">
                        <div className="text-ink">{n.text}</div>
                        <div className="text-[10px] font-mono text-ink-3">{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Info */}
            <div className="flex items-center gap-2 pl-3 border-l border-line">
              <div className="w-7 h-7 rounded-full bg-primary text-paper flex items-center justify-center text-xs font-semibold font-mono">
                MS
              </div>
              <div className="hidden sm:block text-xs">
                <div className="font-semibold text-ink leading-tight">Maya Santos</div>
                <div className="text-[10px] font-mono text-ink-3">Content Lead</div>
              </div>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-dark-ground text-dark-ink p-4 space-y-2 border-b border-line animate-slide-up">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 p-2 rounded text-xs text-dark-ink hover:bg-white/10"
              >
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-2 border-t border-dark-ink2/20 flex gap-2">
              <button
                onClick={handleReset}
                className="flex-1 py-1.5 rounded bg-white/10 text-xs font-mono"
              >
                Reset Data
              </button>
              <Link
                to="/home"
                className="flex-1 text-center py-1.5 rounded bg-accent text-paper text-xs font-semibold"
              >
                Exit
              </Link>
            </div>
          </div>
        )}

        {/* Sub-view Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
