import React from 'react';

interface ProductSilhouetteProps {
  type: 'din-rail' | 'keypad' | 'sensor' | 'gateway' | 'thermostat' | 'lock';
  viewIndex?: number; // 0: front, 1: isometric / side, 2: ports / detail
  className?: string;
  brandName?: string;
  mpn?: string;
}

export const ProductSilhouette: React.FC<ProductSilhouetteProps> = ({
  type,
  viewIndex = 0,
  className = 'w-full h-full',
  brandName = 'DCAI',
  mpn = ''
}) => {
  // Render specific SVG based on product type
  return (
    <div className={`relative flex items-center justify-center overflow-hidden bg-surface select-none ${className}`}>
      {type === 'din-rail' && (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-4 transition-transform duration-med group-hover:scale-105">
          {/* DIN Rail chassis */}
          <rect x="70" y="40" width="180" height="160" rx="4" fill="#F0EDE4" stroke="#C3BEB0" strokeWidth="1.5" />
          {/* Top terminals */}
          <rect x="80" y="24" width="160" height="20" rx="2" fill="#E2DDD2" stroke="#C3BEB0" strokeWidth="1.2" />
          {[92, 114, 136, 158, 180, 202, 224].map((x, i) => (
            <circle key={`t-${i}`} cx={x} cy="34" r="4.5" fill="#1C2625" fillOpacity="0.15" stroke="#C3BEB0" strokeWidth="1" />
          ))}
          {/* Bottom terminals */}
          <rect x="80" y="196" width="160" height="20" rx="2" fill="#E2DDD2" stroke="#C3BEB0" strokeWidth="1.2" />
          {[92, 114, 136, 158, 180, 202, 224].map((x, i) => (
            <circle key={`b-${i}`} cx={x} cy="206" r="4.5" fill="#1C2625" fillOpacity="0.15" stroke="#C3BEB0" strokeWidth="1" />
          ))}
          {/* Center recessed module area */}
          <rect x="85" y="55" width="150" height="130" rx="3" fill="#FBFAF7" stroke="#DAD6CC" strokeWidth="1" />
          {/* Status LEDs & toggle switches */}
          <g transform="translate(100, 75)">
            <circle cx="10" cy="10" r="3.5" fill="#3F7D58" />
            <line x1="22" y1="10" x2="60" y2="10" stroke="#C3BEB0" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="70" y="4" width="40" height="12" rx="2" fill="#E3EBE8" stroke="#1F4B47" strokeWidth="1" />
            
            <circle cx="10" cy="35" r="3.5" fill="#B38442" />
            <line x1="22" y1="35" x2="60" y2="35" stroke="#C3BEB0" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="70" y="29" width="40" height="12" rx="2" fill="#E3EBE8" stroke="#1F4B47" strokeWidth="1" />

            <circle cx="10" cy="60" r="3.5" fill="#3F7D58" />
            <line x1="22" y1="60" x2="60" y2="60" stroke="#C3BEB0" strokeWidth="1.5" strokeDasharray="3 3" />
            <rect x="70" y="54" width="40" height="12" rx="2" fill="#E3EBE8" stroke="#1F4B47" strokeWidth="1" />
          </g>
          {/* Label plate */}
          <rect x="100" y="156" width="120" height="18" rx="2" fill="#E3EBE8" />
          <text x="160" y="169" textAnchor="middle" fill="#1F4B47" fontSize="8.5" fontFamily="JetBrains Mono" fontWeight="600" letterSpacing="0.05em">
            {mpn || 'DIN 4-MODULE'}
          </text>
        </svg>
      )}

      {type === 'keypad' && (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-4 transition-transform duration-med group-hover:scale-105">
          {/* Keypad Plate with beveled architectural edge */}
          <rect x="85" y="45" width="150" height="150" rx="6" fill="#F0EDE4" stroke="#C3BEB0" strokeWidth="1.5" />
          <rect x="91" y="51" width="138" height="138" rx="4" fill="#FBFAF7" stroke="#DAD6CC" strokeWidth="1" />
          {/* 6 Tactile push rockers */}
          <g transform="translate(100, 60)">
            <rect x="0" y="0" width="55" height="34" rx="2" fill="#F5F2EC" stroke="#C3BEB0" strokeWidth="1" />
            <circle cx="48" cy="8" r="1.5" fill="#B38442" />
            <rect x="65" y="0" width="55" height="34" rx="2" fill="#F5F2EC" stroke="#C3BEB0" strokeWidth="1" />
            <circle cx="113" cy="8" r="1.5" fill="#1C2625" fillOpacity="0.3" />

            <rect x="0" y="42" width="55" height="34" rx="2" fill="#F5F2EC" stroke="#C3BEB0" strokeWidth="1" />
            <circle cx="48" cy="50" r="1.5" fill="#1C2625" fillOpacity="0.3" />
            <rect x="65" y="42" width="55" height="34" rx="2" fill="#F5F2EC" stroke="#C3BEB0" strokeWidth="1" />
            <circle cx="113" cy="50" r="1.5" fill="#B38442" />

            <rect x="0" y="84" width="55" height="34" rx="2" fill="#F5F2EC" stroke="#C3BEB0" strokeWidth="1" />
            <circle cx="48" cy="92" r="1.5" fill="#1C2625" fillOpacity="0.3" />
            <rect x="65" y="84" width="55" height="34" rx="2" fill="#F5F2EC" stroke="#C3BEB0" strokeWidth="1" />
            <circle cx="113" cy="92" r="1.5" fill="#1C2625" fillOpacity="0.3" />
          </g>
          {/* Subtle logo marking */}
          <text x="160" y="180" textAnchor="middle" fill="#6F7976" fontSize="7" fontFamily="Hanken Grotesk" letterSpacing="0.1em">
            {brandName.toUpperCase()}
          </text>
        </svg>
      )}

      {type === 'thermostat' && (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-4 transition-transform duration-med group-hover:scale-105">
          {/* Glass-front housing */}
          <rect x="80" y="40" width="160" height="160" rx="8" fill="#F5F2EC" stroke="#C3BEB0" strokeWidth="1.5" />
          {/* Beveled dial ring */}
          <circle cx="160" cy="115" r="54" fill="#FBFAF7" stroke="#DAD6CC" strokeWidth="1.5" />
          <circle cx="160" cy="115" r="48" fill="#FFFFFF" stroke="#B38442" strokeWidth="1" strokeDasharray="3 4" />
          {/* Display screen */}
          <text x="160" y="112" textAnchor="middle" fill="#1C2625" fontSize="24" fontFamily="Newsreader" fontWeight="500">
            22.5°
          </text>
          <text x="160" y="130" textAnchor="middle" fill="#6F7976" fontSize="8" fontFamily="JetBrains Mono" letterSpacing="0.08em">
            SETPOINT · AUTO
          </text>
          {/* Status dots */}
          <circle cx="140" cy="144" r="2" fill="#3F7D58" />
          <circle cx="160" cy="144" r="2" fill="#B38442" />
          <circle cx="180" cy="144" r="2" fill="#3F6C86" />
          {/* Subtext */}
          <text x="160" y="186" textAnchor="middle" fill="#4B5754" fontSize="7.5" fontFamily="JetBrains Mono">
            {mpn || 'SMART CLIMATE'}
          </text>
        </svg>
      )}

      {type === 'sensor' && (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-4 transition-transform duration-med group-hover:scale-105">
          {/* Ceiling Flush Trim Ring */}
          <circle cx="160" cy="120" r="75" fill="#F0EDE4" stroke="#C3BEB0" strokeWidth="1.5" />
          <circle cx="160" cy="120" r="64" fill="#FBFAF7" stroke="#DAD6CC" strokeWidth="1" />
          {/* Fresnel Lens Pattern */}
          <circle cx="160" cy="120" r="42" fill="#FFFFFF" stroke="#DAD6CC" strokeWidth="1" />
          <circle cx="160" cy="120" r="30" stroke="#C3BEB0" strokeWidth="0.8" strokeDasharray="4 3" />
          <circle cx="160" cy="120" r="18" stroke="#C3BEB0" strokeWidth="0.8" strokeDasharray="3 2" />
          <circle cx="160" cy="120" r="6" fill="#1F4B47" fillOpacity="0.2" />
          {/* Daylight sensor diode & status LED */}
          <circle cx="160" cy="92" r="2.5" fill="#3F7D58" />
          <circle cx="160" cy="148" r="3" fill="#B38442" fillOpacity="0.8" />
          {/* Label */}
          <text x="160" y="210" textAnchor="middle" fill="#6F7976" fontSize="7.5" fontFamily="JetBrains Mono">
            360° PIR + LUX SENSOR
          </text>
        </svg>
      )}

      {type === 'gateway' && (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-4 transition-transform duration-med group-hover:scale-105">
          {/* Gateway Chassis */}
          <rect x="75" y="45" width="170" height="150" rx="5" fill="#F0EDE4" stroke="#C3BEB0" strokeWidth="1.5" />
          <rect x="85" y="55" width="150" height="130" rx="3" fill="#FBFAF7" stroke="#DAD6CC" strokeWidth="1" />
          {/* Ethernet Ports */}
          <g transform="translate(100, 70)">
            <rect x="0" y="0" width="36" height="28" rx="2" fill="#14201F" stroke="#C3BEB0" strokeWidth="1" />
            <circle cx="6" cy="6" r="1.5" fill="#3F7D58" />
            <circle cx="30" cy="6" r="1.5" fill="#B38442" />
            <rect x="44" y="0" width="36" height="28" rx="2" fill="#14201F" stroke="#C3BEB0" strokeWidth="1" />
            <circle cx="50" cy="6" r="1.5" fill="#3F7D58" />
            <circle cx="74" cy="6" r="1.5" fill="#B38442" />
          </g>
          {/* Serial Bus Terminal */}
          <rect x="100" y="112" width="120" height="20" rx="2" fill="#E3EBE8" stroke="#1F4B47" strokeWidth="1" />
          {[112, 132, 152, 172, 192].map((x, idx) => (
            <circle key={`gw-${idx}`} cx={x} cy="122" r="3.5" fill="#1F4B47" fillOpacity="0.4" />
          ))}
          {/* Label */}
          <text x="160" y="160" textAnchor="middle" fill="#1C2625" fontSize="8" fontFamily="JetBrains Mono" fontWeight="600">
            {mpn || 'INTERFACE GATEWAY'}
          </text>
          <text x="160" y="172" textAnchor="middle" fill="#6F7976" fontSize="7" fontFamily="Hanken Grotesk">
            ISOLATED PROTOCOL BRIDGE
          </text>
        </svg>
      )}

      {type === 'lock' && (
        <svg viewBox="0 0 320 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full p-4 transition-transform duration-med group-hover:scale-105">
          {/* Smart Lock Escutcheon */}
          <rect x="120" y="25" width="80" height="190" rx="10" fill="#E8E4DA" stroke="#C3BEB0" strokeWidth="1.5" />
          <rect x="126" y="31" width="68" height="178" rx="8" fill="#14201F" stroke="#1F4B47" strokeWidth="1" />
          {/* Keypad & Biometric Sensor */}
          <circle cx="160" cy="60" r="14" fill="#1C2625" stroke="#B38442" strokeWidth="1.5" />
          <circle cx="160" cy="60" r="8" fill="#B38442" fillOpacity="0.2" />
          {/* Touch pin numbers */}
          <g transform="translate(142, 85)" fill="#EDEAE2" fontSize="7" fontFamily="JetBrains Mono" textAnchor="middle">
            <text x="0" y="0">1</text><text x="18" y="0">2</text><text x="36" y="0">3</text>
            <text x="0" y="14">4</text><text x="18" y="14">5</text><text x="36" y="14">6</text>
            <text x="0" y="28">7</text><text x="18" y="28">8</text><text x="36" y="28">9</text>
          </g>
          {/* Solid Lever Handle */}
          <path d="M150 145 H85 A6 6 0 0 0 85 157 H150 V145 Z" fill="#C3BEB0" stroke="#1C2625" strokeWidth="1" />
          <circle cx="150" cy="151" r="10" fill="#E8E4DA" stroke="#C3BEB0" strokeWidth="1" />
          {/* Status indicator */}
          <circle cx="160" cy="188" r="2.5" fill="#3F7D58" />
        </svg>
      )}

      {/* View indicator badge */}
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-ink-3 uppercase tracking-wider px-1.5 py-0.5 rounded bg-paper/80 border border-line">
        {viewIndex === 0 ? 'Front' : viewIndex === 1 ? 'Iso View' : 'Schematic'}
      </div>
    </div>
  );
};
