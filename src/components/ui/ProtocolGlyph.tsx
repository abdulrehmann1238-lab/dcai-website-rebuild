import React from 'react';

interface ProtocolGlyphProps {
  id: 'knx' | 'dali' | 'zigbee' | 'matter' | 'modbus' | 'bacnet' | 'z-wave' | 'ip-ethernet';
  className?: string;
  size?: number;
}

export const ProtocolGlyph: React.FC<ProtocolGlyphProps> = ({ id, className = '', size = 24 }) => {
  switch (id) {
    case 'knx':
      // Twisted pair bus nodes
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="6" cy="7" r="2.5" />
          <circle cx="18" cy="7" r="2.5" />
          <circle cx="12" cy="17" r="2.5" />
          <path d="M8.5 7h7" />
          <path d="M7.5 9l3 6" />
          <path d="M16.5 9l-3 6" />
        </svg>
      );
    case 'dali':
      // Broadcast lighting arc with dual bus rays
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 3v3" />
          <path d="M12 18v3" />
          <path d="M3 12h3" />
          <path d="M18 12h3" />
          <circle cx="12" cy="12" r="8" strokeDasharray="2 3" />
        </svg>
      );
    case 'zigbee':
      // Mesh nodes with interconnecting zig-zag
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="5" cy="6" r="2" />
          <circle cx="19" cy="6" r="2" />
          <circle cx="12" cy="12" r="2.5" />
          <circle cx="5" cy="18" r="2" />
          <circle cx="19" cy="18" r="2" />
          <path d="M7 6h10L7 18h10" />
        </svg>
      );
    case 'matter':
      // Tri-spoke unified smart thread star
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="6" r="2.5" />
          <circle cx="6" cy="17" r="2.5" />
          <circle cx="18" cy="17" r="2.5" />
          <path d="M12 8.5v6" />
          <path d="M8 16l4-1.5 4 1.5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'modbus':
      // RS-485 differential bus lines with register grid
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="4" y="5" width="16" height="14" rx="2" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="12" y1="5" x2="12" y2="19" />
          <circle cx="8" cy="8.5" r="1.5" fill="currentColor" />
          <circle cx="16" cy="15.5" r="1.5" fill="currentColor" />
        </svg>
      );
    case 'bacnet':
      // Commercial supervisory server ring
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="3" y="4" width="18" height="6" rx="2" />
          <rect x="3" y="14" width="18" height="6" rx="2" />
          <path d="M7 10v4" />
          <path d="M17 10v4" />
          <circle cx="12" cy="7" r="1" fill="currentColor" />
          <circle cx="12" cy="17" r="1" fill="currentColor" />
        </svg>
      );
    case 'z-wave':
      // RF sub-GHz concentric waveform
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="6" cy="18" r="2" />
          <path d="M6 13a5 5 0 0 1 5 5" />
          <path d="M6 8a10 10 0 0 1 10 10" />
          <path d="M6 3a15 15 0 0 1 15 15" />
        </svg>
      );
    case 'ip-ethernet':
      // Ethernet Cat6 twisted connection & switch port
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect x="4" y="6" width="16" height="12" rx="2" />
          <path d="M8 12h8" />
          <path d="M9 18v3" />
          <path d="M15 18v3" />
          <path d="M6 21h12" />
          <circle cx="8" cy="9" r="1" fill="currentColor" />
          <circle cx="12" cy="9" r="1" fill="currentColor" />
          <circle cx="16" cy="9" r="1" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 3" />
        </svg>
      );
  }
};
