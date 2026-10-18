import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { BRANDS } from '../data/brands';
import { PHILIPPINE_CITIES, INQUIRY_TYPES, PROJECT_TYPES, PROJECT_STAGES, PROJECT_INTERESTS } from '../data/cities';
import { useToast } from '../state/ToastContext';
import { BlockFrame } from '../components/layout/BlockFrame';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Users,
  Building,
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  RotateCcw
} from 'lucide-react';

export const Contact: React.FC = () => {
  const location = useLocation();
  const { addToast } = useToast();

  const [activeTab, setActiveTab] = useState<'trade' | 'project'>('trade');

  // Form 1 State (Trade / Dealer)
  const [tradeForm, setTradeForm] = useState({
    fullName: '',
    companyName: '',
    role: '',
    email: '',
    phone: '',
    city: PHILIPPINE_CITIES[0],
    brands: ['halden', 'verelli'],
    inquiryType: INQUIRY_TYPES[0],
    message: ''
  });
  const [tradeErrors, setTradeErrors] = useState<Record<string, string>>({});
  const [tradeLoading, setTradeLoading] = useState(false);
  const [tradeSubmitted, setTradeSubmitted] = useState(false);
  const [tradeSimulatedError, setTradeSimulatedError] = useState(false);

  // Form 2 State (Project Inquiry / Dealer-Safe)
  const [projectForm, setProjectForm] = useState({
    fullName: '',
    projectName: '',
    email: '',
    phone: '',
    projectType: PROJECT_TYPES[0],
    projectStage: PROJECT_STAGES[0],
    interests: ['Introduction to a Certified Partner in My Area'],
    message: ''
  });
  const [projectErrors, setProjectErrors] = useState<Record<string, string>>({});
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectSubmitted, setProjectSubmitted] = useState(false);
  const [projectSimulatedError, setProjectSimulatedError] = useState(false);

  // Read hash deep-link (#trade, #project)
  useEffect(() => {
    if (location.hash === '#project') {
      setActiveTab('project');
      const el = document.getElementById('project-form-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (location.hash === '#trade') {
      setActiveTab('trade');
      const el = document.getElementById('trade-form-section');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.hash]);

  // Validation Helpers
  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const validatePhone = (val: string) => val.trim().length >= 7;

  const handleTradeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTradeSimulatedError(false);

    const errors: Record<string, string> = {};
    if (!tradeForm.fullName.trim()) errors.fullName = 'Full name is required';
    if (!tradeForm.companyName.trim()) errors.companyName = 'Company name is required';
    if (!tradeForm.email.trim() || !validateEmail(tradeForm.email)) errors.email = 'Valid email is required';
    if (!tradeForm.phone.trim() || !validatePhone(tradeForm.phone)) errors.phone = 'Contact number is required';
    if (tradeForm.brands.length === 0) errors.brands = 'Select at least one brand of interest';

    if (Object.keys(errors).length > 0) {
      setTradeErrors(errors);
      addToast('Please correct the highlighted form errors.', 'error');
      return;
    }

    setTradeErrors({});
    setTradeLoading(true);

    setTimeout(() => {
      setTradeLoading(false);
      // Simulated error trigger if message has "error"
      if (tradeForm.message.toLowerCase().includes('error')) {
        setTradeSimulatedError(true);
        addToast('Simulated delivery error triggered by keyword.', 'error');
        return;
      }
      setTradeSubmitted(true);
      addToast('Trade inquiry dispatched to DCAI Partner Enablement.', 'success');
    }, 1200);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProjectSimulatedError(false);

    const errors: Record<string, string> = {};
    if (!projectForm.fullName.trim()) errors.fullName = 'Full name is required';
    if (!projectForm.projectName.trim()) errors.projectName = 'Project or development name is required';
    if (!projectForm.email.trim() || !validateEmail(projectForm.email)) errors.email = 'Valid email is required';
    if (!projectForm.phone.trim() || !validatePhone(projectForm.phone)) errors.phone = 'Contact number is required';
    if (projectForm.interests.length === 0) errors.interests = 'Please select at least one requirement';

    if (Object.keys(errors).length > 0) {
      setProjectErrors(errors);
      addToast('Please correct the highlighted form errors.', 'error');
      return;
    }

    setProjectErrors({});
    setProjectLoading(true);

    setTimeout(() => {
      setProjectLoading(false);
      if (projectForm.message.toLowerCase().includes('error')) {
        setProjectSimulatedError(true);
        addToast('Simulated delivery error triggered by keyword.', 'error');
        return;
      }
      setProjectSubmitted(true);
      addToast('Project inquiry received — partner routing initiated.', 'success');
    }, 1200);
  };

  const toggleTradeBrand = (slug: string) => {
    setTradeForm(prev => ({
      ...prev,
      brands: prev.brands.includes(slug)
        ? prev.brands.filter(b => b !== slug)
        : [...prev.brands, slug]
    }));
  };

  const toggleProjectInterest = (item: string) => {
    setProjectForm(prev => ({
      ...prev,
      interests: prev.interests.includes(item)
        ? prev.interests.filter(i => i !== item)
        : [...prev.interests, item]
    }));
  };

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 space-y-16">
      {/* 1. Page Header */}
      <BlockFrame
        block="dcai/page-header"
        type="Static"
        source="Contact Header Block"
        className="space-y-4 max-w-3xl"
      >
        <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
          Enablement & Inquiries
        </div>
        <h1 className="font-serif-display text-4xl sm:text-5xl text-ink font-normal tracking-tight">
          Where would you like this to go?
        </h1>
        <p className="text-base sm:text-lg text-ink-2 font-normal leading-relaxed">
          DCAI distributes through certified system integrators. Select your path below so our engineering or dealer management team can respond effectively.
        </p>

        {/* Mobile Tab Selector */}
        <div className="lg:hidden flex items-center p-1 rounded-md bg-surface border border-line">
          <button
            onClick={() => setActiveTab('trade')}
            className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
              activeTab === 'trade' ? 'bg-primary text-paper font-semibold' : 'text-ink-2'
            }`}
          >
            Trade / Dealer Inquiry
          </button>
          <button
            onClick={() => setActiveTab('project')}
            className={`flex-1 py-2 text-xs font-medium rounded transition-colors ${
              activeTab === 'project' ? 'bg-primary text-paper font-semibold' : 'text-ink-2'
            }`}
          >
            Project Inquiry (Dealer-Safe)
          </button>
        </div>
      </BlockFrame>

      {/* Two Forms Side-by-Side (Desktop) or Tabbed (Mobile) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* FORM 1 — Trade & Dealer Inquiry */}
        <div
          id="trade-form-section"
          className={`${activeTab !== 'trade' ? 'hidden lg:block' : ''} p-6 sm:p-8 rounded-xl bg-surface border border-line shadow-sh-1 space-y-6`}
        >
          <div className="space-y-2 border-b border-line pb-4">
            <div className="flex items-center gap-2 text-primary font-mono text-xs font-semibold uppercase tracking-wider">
              <Users className="w-4 h-4 text-accent" />
              <span>Channel Onboarding</span>
            </div>
            <h2 className="font-serif-display text-2xl text-ink font-medium">
              Trade & Dealer Inquiry
            </h2>
            <p className="text-xs text-ink-2 leading-relaxed">
              For system integrators, electrical contractors, and MEP firms applying for DCAI dealership, hardware supply, or technical certification.
            </p>
          </div>

          {tradeSubmitted ? (
            <div className="p-8 rounded-lg bg-paper border border-status-success/30 text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-status-success/10 text-status-success mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-display text-xl text-ink font-medium">
                  Application Received, {tradeForm.fullName.split(' ')[0]}
                </h3>
                <p className="text-xs text-ink-2 max-w-sm mx-auto leading-relaxed">
                  Our Philippine trade enablement team will review your company details and reply within 1 business day regarding dealer account access and training dates.
                </p>
              </div>
              <div className="text-[11px] font-mono text-ink-3">
                Reference: <strong className="text-ink">DCAI-D-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setTradeSubmitted(false)}
                  className="px-3.5 py-1.5 rounded border border-line text-xs text-ink hover:bg-surface font-medium"
                >
                  Send another inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleTradeSubmit} className="space-y-4">
              {tradeSimulatedError && (
                <div className="p-3 rounded bg-status-error/10 border border-status-error/30 text-xs text-status-error flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    We couldn&apos;t send this right now. Your details are saved — please try submitting again.
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Full Name *</label>
                  <input
                    type="text"
                    value={tradeForm.fullName}
                    onChange={e => setTradeForm({ ...tradeForm, fullName: e.target.value })}
                    placeholder="Juan dela Cruz"
                    className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                  />
                  {tradeErrors.fullName && <div className="text-[11px] text-status-error">{tradeErrors.fullName}</div>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Company / Firm Name *</label>
                  <input
                    type="text"
                    value={tradeForm.companyName}
                    onChange={e => setTradeForm({ ...tradeForm, companyName: e.target.value })}
                    placeholder="Integrator Systems Inc."
                    className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                  />
                  {tradeErrors.companyName && <div className="text-[11px] text-status-error">{tradeErrors.companyName}</div>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Business Email *</label>
                  <input
                    type="email"
                    value={tradeForm.email}
                    onChange={e => setTradeForm({ ...tradeForm, email: e.target.value })}
                    placeholder="juan@company.ph"
                    className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                  />
                  {tradeErrors.email && <div className="text-[11px] text-status-error">{tradeErrors.email}</div>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Mobile / Phone (+63) *</label>
                  <input
                    type="tel"
                    value={tradeForm.phone}
                    onChange={e => setTradeForm({ ...tradeForm, phone: e.target.value })}
                    placeholder="+63 917 123 4567"
                    className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                  />
                  {tradeErrors.phone && <div className="text-[11px] text-status-error">{tradeErrors.phone}</div>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">City / Provincial Location</label>
                  <select
                    value={tradeForm.city}
                    onChange={e => setTradeForm({ ...tradeForm, city: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                  >
                    {PHILIPPINE_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Nature of Trade Inquiry</label>
                  <select
                    value={tradeForm.inquiryType}
                    onChange={e => setTradeForm({ ...tradeForm, inquiryType: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                  >
                    {INQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>

              {/* Brands of Interest Multi-Select Chips */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-ink">Brands of Interest *</label>
                <div className="flex flex-wrap gap-2">
                  {BRANDS.map(b => {
                    const isSelected = tradeForm.brands.includes(b.slug);
                    return (
                      <button
                        type="button"
                        key={b.slug}
                        onClick={() => toggleTradeBrand(b.slug)}
                        className={`px-3 py-1 text-xs rounded-sm border transition-colors ${
                          isSelected
                            ? 'bg-primary text-paper border-primary font-medium'
                            : 'bg-paper text-ink-2 border-line hover:border-line-strong'
                        }`}
                      >
                        {b.name}
                      </button>
                    );
                  })}
                </div>
                {tradeErrors.brands && <div className="text-[11px] text-status-error">{tradeErrors.brands}</div>}
              </div>

              <div className="space-y-1 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-ink">Message or Background (Optional)</label>
                  <span className="text-[10px] font-mono text-ink-3">{tradeForm.message.length}/500</span>
                </div>
                <textarea
                  rows={3}
                  maxLength={500}
                  value={tradeForm.message}
                  onChange={e => setTradeForm({ ...tradeForm, message: e.target.value })}
                  placeholder="Tell us about your team size, recent automation projects, or certification goals…"
                  className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={tradeLoading}
                  className="w-full py-2.5 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{tradeLoading ? 'Transmitting Trade Inquiry…' : 'Submit Trade Application'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* FORM 2 — Project Inquiry (Dealer-Safe) */}
        <div
          id="project-form-section"
          className={`${activeTab !== 'project' ? 'hidden lg:block' : ''} p-6 sm:p-8 rounded-xl bg-surface border border-line shadow-sh-1 space-y-6`}
        >
          <div className="space-y-2 border-b border-line pb-4">
            <div className="flex items-center gap-2 text-accent-text font-mono text-xs font-semibold uppercase tracking-wider">
              <Building className="w-4 h-4 text-accent" />
              <span>Dealer-Safe Referral Path</span>
            </div>
            <h2 className="font-serif-display text-2xl text-ink font-medium">
              Project Inquiry
            </h2>
            <p className="text-xs text-ink-2 leading-relaxed">
              DCAI distributes through certified partners. Tell us about your residential or commercial project and we will introduce you to a certified partner in your area.
            </p>
          </div>

          {projectSubmitted ? (
            <div className="p-8 rounded-lg bg-paper border border-status-success/30 text-center space-y-4 animate-fade-in">
              <div className="w-12 h-12 rounded-full bg-status-success/10 text-status-success mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif-display text-xl text-ink font-medium">
                  Thank You, {projectForm.fullName.split(' ')[0]}
                </h3>
                <p className="text-xs text-ink-2 max-w-sm mx-auto leading-relaxed">
                  We will introduce you to a certified DCAI partner experienced in {projectForm.projectType} projects near you. DCAI does not sell directly, so an authorized partner will contact you.
                </p>
              </div>
              <div className="text-[11px] font-mono text-ink-3">
                Tracking Code: <strong className="text-ink">DCAI-P-2026-0418</strong>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setProjectSubmitted(false)}
                  className="px-3.5 py-1.5 rounded border border-line text-xs text-ink hover:bg-surface font-medium"
                >
                  Send another project inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              {projectSimulatedError && (
                <div className="p-3 rounded bg-status-error/10 border border-status-error/30 text-xs text-status-error flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    We couldn&apos;t submit this inquiry right now. Your details are saved — please try again.
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Full Name *</label>
                  <input
                    type="text"
                    value={projectForm.fullName}
                    onChange={e => setProjectForm({ ...projectForm, fullName: e.target.value })}
                    placeholder="Maria Santos"
                    className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                  />
                  {projectErrors.fullName && <div className="text-[11px] text-status-error">{projectErrors.fullName}</div>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Project / Property Name *</label>
                  <input
                    type="text"
                    value={projectForm.projectName}
                    onChange={e => setProjectForm({ ...projectForm, projectName: e.target.value })}
                    placeholder="BGC Penthouse Suite"
                    className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                  />
                  {projectErrors.projectName && <div className="text-[11px] text-status-error">{projectErrors.projectName}</div>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Email Address *</label>
                  <input
                    type="email"
                    value={projectForm.email}
                    onChange={e => setProjectForm({ ...projectForm, email: e.target.value })}
                    placeholder="maria@design.ph"
                    className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                  />
                  {projectErrors.email && <div className="text-[11px] text-status-error">{projectErrors.email}</div>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Phone / Mobile *</label>
                  <input
                    type="tel"
                    value={projectForm.phone}
                    onChange={e => setProjectForm({ ...projectForm, phone: e.target.value })}
                    placeholder="+63 918 987 6543"
                    className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                  />
                  {projectErrors.phone && <div className="text-[11px] text-status-error">{projectErrors.phone}</div>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Project Type</label>
                  <select
                    value={projectForm.projectType}
                    onChange={e => setProjectForm({ ...projectForm, projectType: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                  >
                    {PROJECT_TYPES.map(pt => <option key={pt} value={pt}>{pt}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-ink">Current Stage</label>
                  <select
                    value={projectForm.projectStage}
                    onChange={e => setProjectForm({ ...projectForm, projectStage: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                  >
                    {PROJECT_STAGES.map(ps => <option key={ps} value={ps}>{ps}</option>)}
                  </select>
                </div>
              </div>

              {/* What are you looking for multi-select chips */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-semibold text-ink">What are you looking for? *</label>
                <div className="space-y-1.5">
                  {PROJECT_INTERESTS.map(item => {
                    const isSelected = projectForm.interests.includes(item);
                    return (
                      <label
                        key={item}
                        className={`flex items-center gap-2 text-xs p-2 rounded border cursor-pointer transition-colors ${
                          isSelected ? 'bg-primary-tint/60 border-primary text-primary font-medium' : 'bg-paper border-line text-ink-2'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleProjectInterest(item)}
                          className="rounded border-line-strong text-primary w-3.5 h-3.5"
                        />
                        <span>{item}</span>
                      </label>
                    );
                  })}
                </div>
                {projectErrors.interests && <div className="text-[11px] text-status-error">{projectErrors.interests}</div>}
              </div>

              <div className="space-y-1 pt-1">
                <label className="text-xs font-semibold text-ink">Project Scope Details (Optional)</label>
                <textarea
                  rows={2}
                  value={projectForm.message}
                  onChange={e => setProjectForm({ ...projectForm, message: e.target.value })}
                  placeholder="Estimated floor area, number of keypads/circuits, or desired completion date…"
                  className="w-full px-3 py-2 text-xs rounded bg-paper border border-line text-ink focus:outline-none focus:border-primary"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={projectLoading}
                  className="w-full py-2.5 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                  <span>{projectLoading ? 'Connecting with Partner Channel…' : 'Find a Certified Partner'}</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-center text-ink-3 pt-1">
                Channel-Safe Policy: DCAI never competes with authorized dealers.
              </div>
            </form>
          )}
        </div>
      </div>

      {/* 2. dcai/company-contact (Office Details + Vector Map) */}
      <BlockFrame
        block="dcai/company-contact"
        type="Static"
        source="Hardcoded Company HQ & Technical Enablement Center"
        className="p-8 sm:p-10 rounded-xl bg-surface border border-line shadow-sh-1"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-4">
            <div className="text-[11px] font-mono uppercase tracking-widest text-accent font-semibold">
              Visit or Inquire
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-ink font-medium">
              DCAI Technical Enablement Center
            </h2>
            <p className="text-xs sm:text-sm text-ink-2 leading-relaxed">
              Our headquarters features live hardware mockups, ETS parameterization stations, and direct warehouse stock for authorized dealers.
            </p>

            <div className="space-y-3 pt-2 text-xs font-mono text-ink-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <span>Ortigas Center, Pasig City 1605, Metro Manila, Philippines</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>+63 (2) 8876 5432 · +63 917 800 DCAI</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>technical@dcai.example · trade@dcai.example</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-ink-3 shrink-0" />
                <span>Monday – Friday: 8:30 AM – 5:30 PM PHT</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            {/* Architectural Vector Street Map (No third-party JS/embeds) */}
            <div className="w-full aspect-[16/10] rounded-lg bg-paper border border-line p-4 flex flex-col justify-between select-none relative overflow-hidden">
              <svg viewBox="0 0 400 240" fill="none" className="w-full h-full">
                {/* Street grid hairlines */}
                <line x1="30" y1="40" x2="370" y2="40" stroke="#DAD6CC" strokeWidth="2" />
                <line x1="30" y1="120" x2="370" y2="120" stroke="#DAD6CC" strokeWidth="4" />
                <line x1="30" y1="190" x2="370" y2="190" stroke="#DAD6CC" strokeWidth="2" />

                <line x1="80" y1="20" x2="80" y2="220" stroke="#DAD6CC" strokeWidth="2" />
                <line x1="200" y1="20" x2="200" y2="220" stroke="#DAD6CC" strokeWidth="3" />
                <line x1="310" y1="20" x2="310" y2="220" stroke="#DAD6CC" strokeWidth="2" />

                {/* Building blocks */}
                <rect x="95" y="55" width="90" height="50" fill="#FBFAF7" stroke="#C3BEB0" strokeWidth="1" />
                <rect x="215" y="55" width="80" height="50" fill="#FBFAF7" stroke="#C3BEB0" strokeWidth="1" />
                <rect x="95" y="135" width="90" height="40" fill="#FBFAF7" stroke="#C3BEB0" strokeWidth="1" />

                {/* DCAI Facility Pin */}
                <g transform="translate(200, 120)">
                  <circle cx="0" cy="0" r="14" fill="#B38442" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="0" cy="0" r="7" fill="#B38442" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
                  {/* Callout flag */}
                  <rect x="12" y="-22" width="130" height="24" rx="3" fill="#14201F" stroke="#B38442" strokeWidth="1" />
                  <text x="18" y="-7" fill="#EDEAE2" fontSize="9" fontFamily="JetBrains Mono" fontWeight="600">
                    DCAI HQ & LABS
                  </text>
                </g>

                {/* Road labels */}
                <text x="280" y="112" fill="#6F7976" fontSize="7.5" fontFamily="JetBrains Mono">
                  EDSA / ORTIGAS AVE
                </text>
              </svg>
              <div className="text-[10px] font-mono text-ink-3 text-right">
                Vector Schematic · Pasig City Facility
              </div>
            </div>
          </div>
        </div>
      </BlockFrame>
    </div>
  );
};
