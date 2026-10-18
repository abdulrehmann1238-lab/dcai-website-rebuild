import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SCENES, HOTSPOTS, HotspotInfo } from './scenes';
import { ProtocolGlyph } from '../ui/ProtocolGlyph';
import { Sun, Moon, Lock, Unlock, Play, Pause, ChevronRight, X } from 'lucide-react';

interface FloorPlanProps {
  className?: string;
  variant?: 'hero' | 'compact';
}

export const FloorPlan: React.FC<FloorPlanProps> = ({ className = '', variant = 'hero' }) => {
  const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<HotspotInfo | null>(null);
  const userInteractedRef = useRef(false);

  const scene = SCENES[currentSceneIndex];

  // Autoplay timer
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSceneIndex(prev => (prev + 1) % SCENES.length);
    }, 5500);

    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleSceneSelect = (index: number) => {
    userInteractedRef.current = true;
    setIsPlaying(false);
    setCurrentSceneIndex(index);
  };

  const handleHotspotClick = (h: HotspotInfo) => {
    userInteractedRef.current = true;
    setIsPlaying(false);
    setActiveHotspot(activeHotspot?.id === h.id ? null : h);
  };

  return (
    <div
      className={`relative bg-surface rounded-lg border border-line shadow-sh-1 overflow-hidden flex flex-col ${className}`}
      onMouseEnter={() => { if (!userInteractedRef.current) setIsPlaying(false); }}
      onMouseLeave={() => { if (!userInteractedRef.current) setIsPlaying(true); }}
    >
      {/* Top Card Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-line bg-surface/90 text-xs text-ink-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
          <span className="font-mono uppercase tracking-wider text-[11px] font-semibold text-ink">
            LIVING FLOOR PLAN · SCENE SIMULATOR
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-primary-tint text-ink-2 transition-colors text-[11px] font-mono"
            title={isPlaying ? 'Pause automation' : 'Play automation'}
          >
            {isPlaying ? <Pause className="w-3 h-3 text-accent" /> : <Play className="w-3 h-3 text-primary" />}
            <span>{isPlaying ? 'Auto' : 'Paused'}</span>
          </button>
        </div>
      </div>

      {/* Main Architectural SVG Canvas */}
      <div className="relative flex-1 min-h-[300px] w-full bg-paper/60 overflow-hidden">
        <svg
          viewBox="0 0 800 640"
          className="w-full h-full select-none"
          role="img"
          aria-label="Interactive Hand-Drawn Architectural Floor Plan"
        >
          <defs>
            {/* Daylight room wash gradient */}
            <linearGradient id="daylightGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF9EB" stopOpacity={scene.daylightOpacity * 0.8} />
              <stop offset="100%" stopColor="#F5F2EC" stopOpacity="0" />
            </linearGradient>
            {/* Lamp warm radial light wash */}
            <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#B38442" stopOpacity="0.6" />
              <stop offset="40%" stopColor="#B38442" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#B38442" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Room Wash Overlays responding to daylight */}
          <rect x="60" y="50" width="400" height="340" fill="url(#daylightGrad)" className="transition-opacity duration-slow" />
          <rect x="470" y="50" width="270" height="240" fill="url(#daylightGrad)" className="transition-opacity duration-slow" />

          {/* Architectural Grid & Dimension Lines */}
          <g stroke="#DAD6CC" strokeWidth="0.75" strokeDasharray="3 3">
            <line x1="40" y1="50" x2="40" y2="590" />
            <line x1="60" y1="610" x2="740" y2="610" />
            <line x1="460" y1="50" x2="460" y2="590" />
          </g>

          {/* EXTERIOR & INTERIOR WALLS (Drawn lines with hand-crafted weight) */}
          <g stroke="#1C2625" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Boundary walls */}
            <path d="M 60 50 L 740 50 L 740 590 L 60 590 Z" />
            {/* Bedroom separation wall */}
            <path d="M 460 50 L 460 300 L 740 300" strokeWidth="2" />
            {/* Bathroom separation wall */}
            <path d="M 460 300 L 460 500 L 740 500" strokeWidth="2" />
            {/* Entryway foyer wall */}
            <path d="M 60 440 L 250 440 L 250 590" strokeWidth="2" />
          </g>

          {/* WINDOW OPENINGS with dynamic motorized blinds */}
          <g>
            {/* Top living windows */}
            <line x1="120" y1="50" x2="260" y2="50" stroke="#FFFFFF" strokeWidth="5" />
            <line x1="120" y1="50" x2="260" y2="50" stroke="#3F6C86" strokeWidth="1.5" />
            {/* Motorized Blind element scaling with time */}
            <rect
              x="120"
              y="48"
              width="140"
              height={Math.max(4, 28 * (1 - scene.blindsOpenPct / 100))}
              fill="#B38442"
              fillOpacity="0.4"
              stroke="#B38442"
              strokeWidth="0.75"
              className="transition-all duration-slow"
            />

            {/* Bedroom window */}
            <line x1="520" y1="50" x2="680" y2="50" stroke="#FFFFFF" strokeWidth="5" />
            <line x1="520" y1="50" x2="680" y2="50" stroke="#3F6C86" strokeWidth="1.5" />
            <rect
              x="520"
              y="48"
              width="160"
              height={Math.max(4, 28 * (1 - scene.blindsOpenPct / 100))}
              fill="#B38442"
              fillOpacity="0.4"
              stroke="#B38442"
              strokeWidth="0.75"
              className="transition-all duration-slow"
            />
          </g>

          {/* DOORS & SWING ARCS */}
          <g stroke="#6F7976" strokeWidth="1.2" fill="none">
            {/* Main Entrance Door (Bottom Left) */}
            <path d="M 60 500 L 60 550" stroke="#1C2625" strokeWidth="3" />
            <path d="M 60 550 A 45 45 0 0 1 105 505" strokeDasharray="2 3" />
            <line x1="60" y1="550" x2="95" y2="515" stroke="#1C2625" strokeWidth="1.8" />

            {/* Bedroom Door */}
            <path d="M 460 250 A 35 35 0 0 1 495 215" strokeDasharray="2 3" />
            <line x1="460" y1="250" x2="485" y2="225" stroke="#1C2625" strokeWidth="1.5" />
          </g>

          {/* ROOM LABELS */}
          <g fill="#6F7976" fontFamily="Hanken Grotesk" fontSize="10" fontWeight="600" letterSpacing="0.1em">
            <text x="140" y="90">LIVING / DINING</text>
            <text x="340" y="380">KITCHEN</text>
            <text x="560" y="90">MASTER SUITE</text>
            <text x="570" y="340">EN-SUITE BATH</text>
            <text x="110" y="480">ENTRY FOYER</text>
          </g>

          {/* DYNAMIC LIGHT POINTS & GLOW WASHES */}
          {/* Living room chandelier & cove */}
          <g className="transition-opacity duration-slow" style={{ opacity: scene.lightStates.living }}>
            <circle cx="260" cy="200" r="48" fill="url(#lampGlow)" />
            <circle cx="260" cy="200" r="4.5" fill="#B38442" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="160" cy="180" r="32" fill="url(#lampGlow)" />
            <circle cx="160" cy="180" r="3.5" fill="#B38442" />
          </g>

          {/* Kitchen pendant lamps */}
          <g className="transition-opacity duration-slow" style={{ opacity: scene.lightStates.kitchen }}>
            <circle cx="340" cy="290" r="36" fill="url(#lampGlow)" />
            <circle cx="340" cy="290" r="4" fill="#B38442" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="380" cy="290" r="36" fill="url(#lampGlow)" />
            <circle cx="380" cy="290" r="4" fill="#B38442" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>

          {/* Bedroom reading lamps */}
          <g className="transition-opacity duration-slow" style={{ opacity: scene.lightStates.bedroom }}>
            <circle cx="530" cy="160" r="40" fill="url(#lampGlow)" />
            <circle cx="530" cy="160" r="4.5" fill="#B38442" stroke="#FFFFFF" strokeWidth="1.5" />
            <circle cx="680" cy="160" r="40" fill="url(#lampGlow)" />
            <circle cx="680" cy="160" r="4.5" fill="#B38442" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>

          {/* Bathroom vanity lights */}
          <g className="transition-opacity duration-slow" style={{ opacity: scene.lightStates.bath }}>
            <circle cx="600" cy="400" r="35" fill="url(#lampGlow)" />
            <circle cx="600" cy="400" r="4" fill="#B38442" stroke="#FFFFFF" strokeWidth="1.5" />
          </g>

          {/* Entry pathway light */}
          <g className="transition-opacity duration-slow" style={{ opacity: scene.lightStates.entry }}>
            <circle cx="150" cy="520" r="30" fill="url(#lampGlow)" />
            <circle cx="150" cy="520" r="3.5" fill="#B38442" />
          </g>

          {/* CLIMATE BADGE & AIRFLOW */}
          <g transform="translate(480, 180)">
            <rect x="0" y="0" width="75" height="24" rx="4" fill="#FBFAF7" stroke="#1F4B47" strokeWidth="1.2" />
            <text x="37" y="16" textAnchor="middle" fill="#1F4B47" fontSize="10.5" fontFamily="JetBrains Mono" fontWeight="600">
              {scene.tempText}
            </text>
            {/* Airflow subtle waves */}
            <path
              d="M 10 28 Q 25 32 40 28 T 70 28"
              fill="none"
              stroke="#3F6C86"
              strokeWidth="1"
              strokeDasharray="2 2"
              className={scene.tempEco ? 'opacity-30' : 'opacity-80 animate-pulse'}
            />
          </g>

          {/* DOOR LOCK STATUS BADGE */}
          <g transform="translate(100, 560)">
            <rect x="0" y="0" width="70" height="22" rx="3" fill="#14201F" />
            <circle cx="12" cy="11" r="3" fill={scene.doorLocked ? '#3F7D58' : '#B38442'} />
            <text x="22" y="15" fill="#EDEAE2" fontSize="9" fontFamily="JetBrains Mono">
              {scene.doorLocked ? 'LOCKED' : 'UNLOCKED'}
            </text>
          </g>

          {/* NIGHT SECURITY RADAR ARC (When night scene active) */}
          {scene.securityArmed && (
            <g transform="translate(150, 520)" className="animate-pulse">
              <path d="M 0 0 L 40 -35 A 55 55 0 0 1 40 35 Z" fill="#B38442" fillOpacity="0.12" stroke="#B38442" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="0" cy="0" r="5" fill="#A8432F" />
              <text x="50" y="4" fill="#A8432F" fontSize="8.5" fontFamily="JetBrains Mono">PERIMETER ARMED</text>
            </g>
          )}

          {/* 5 INTERACTIVE PULSING HOTSPOTS */}
          {HOTSPOTS.map(h => {
            const isSelected = activeHotspot?.id === h.id;
            return (
              <g
                key={h.id}
                transform={`translate(${h.x}, ${h.y})`}
                onClick={() => handleHotspotClick(h)}
                className="cursor-pointer group"
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${h.title}`}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleHotspotClick(h); }}
              >
                {/* Outer animated ping ring */}
                <circle cx="0" cy="0" r={isSelected ? 16 : 12} fill="#B38442" fillOpacity={isSelected ? 0.35 : 0.2} className="animate-ping group-hover:scale-125 transition-transform" />
                {/* Core button circle */}
                <circle cx="0" cy="0" r="7" fill="#B38442" stroke="#FFFFFF" strokeWidth="2" className="shadow-sm transition-transform group-hover:scale-110" />
                {/* Inner center dot */}
                <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
              </g>
            );
          })}
        </svg>

        {/* Hotspot Slide-in Callout Drawer */}
        {activeHotspot && (
          <div className="absolute bottom-0 inset-x-0 p-4 bg-elevated/95 border-t border-line shadow-sh-2 backdrop-blur-sm animate-slide-up flex flex-col md:flex-row md:items-center justify-between gap-3 z-20">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-primary-tint text-primary">
                  HOTSPOT INSPECTOR
                </span>
                <span className="font-serif-display font-medium text-base text-ink">{activeHotspot.title}</span>
              </div>
              <p className="text-xs text-ink-2 leading-relaxed max-w-xl">{activeHotspot.description}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="text-[10px] text-ink-3 uppercase font-mono">Protocols:</span>
                {activeHotspot.protocols.map(proto => (
                  <span key={proto} className="text-[10px] font-mono px-2 py-0.5 rounded bg-paper border border-line text-ink-2 font-medium">
                    {proto}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {activeHotspot.protocolLinks.map(pl => (
                <Link
                  key={pl.url}
                  to={pl.url}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-primary hover:bg-primary-hover text-paper text-xs font-medium transition-colors"
                >
                  <span>{pl.name}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              ))}
              <button
                onClick={() => setActiveHotspot(null)}
                className="p-1.5 rounded hover:bg-paper text-ink-3 hover:text-ink transition-colors"
                aria-label="Close hotspot callout"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Time-of-Day Slider Controls */}
      <div className="px-5 py-3 border-t border-line bg-surface flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-ink-2 font-medium">
            {scene.id <= 2 ? <Sun className="w-3.5 h-3.5 text-accent" /> : <Moon className="w-3.5 h-3.5 text-secondary" />}
            <span className="font-mono">{scene.time}</span>
            <span>—</span>
            <span className="text-ink font-semibold">{scene.label}</span>
          </div>
          <div className="text-[11px] font-mono text-ink-3">Click time ticks to jump</div>
        </div>

        {/* 4-Stop Segmented Slider Track */}
        <div className="relative flex items-center justify-between py-1">
          <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-1 bg-line rounded-full" />
          <div
            className="absolute left-2 top-1/2 -translate-y-1/2 h-1 bg-accent rounded-full transition-all duration-med"
            style={{ width: `${(currentSceneIndex / (SCENES.length - 1)) * 96}%` }}
          />

          {SCENES.map((s, idx) => {
            const isCurrent = idx === currentSceneIndex;
            return (
              <button
                key={s.time}
                onClick={() => handleSceneSelect(idx)}
                className={`relative z-10 flex flex-col items-center group focus:outline-none`}
              >
                <span
                  className={`w-4 h-4 rounded-full border-2 transition-transform duration-fast ${
                    isCurrent
                      ? 'bg-accent border-paper ring-2 ring-accent scale-125'
                      : 'bg-paper border-line-strong hover:scale-110'
                  }`}
                />
                <span className={`text-[11px] font-mono mt-1 ${isCurrent ? 'font-semibold text-accent-text' : 'text-ink-3'}`}>
                  {s.time}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Scene Caption Line */}
        <div className="text-xs text-ink-2 pt-1 border-t border-line/60 flex items-center justify-between">
          <span className="italic">{scene.caption}</span>
          <span className="text-[10px] font-mono text-ink-3 hidden sm:inline">5 Hotspots active</span>
        </div>
      </div>
    </div>
  );
};
