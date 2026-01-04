import React from 'react';

export default function Logo({ size = 40, theme }) {
  const fillColor = theme?.accent || theme?.primary || '#0d6efd';
  
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {/* Hammer/Tool Icon - representing "Forge" - more stylized */}
      <g transform="translate(50, 50)">
        {/* Hammer head */}
        <rect 
          x="-12" 
          y="-25" 
          width="24" 
          height="12" 
          rx="2" 
          fill={fillColor}
        />
        {/* Hammer handle */}
        <rect 
          x="-3" 
          y="-13" 
          width="6" 
          height="35" 
          rx="3" 
          fill={fillColor}
          opacity="0.9"
        />
        {/* Text lines below - representing text manipulation */}
        <rect 
          x="-20" 
          y="28" 
          width="40" 
          height="5" 
          rx="2.5" 
          fill={fillColor}
          opacity="0.8"
        />
        <rect 
          x="-15" 
          y="36" 
          width="30" 
          height="5" 
          rx="2.5" 
          fill={fillColor}
          opacity="0.6"
        />
        <rect 
          x="-18" 
          y="44" 
          width="36" 
          height="5" 
          rx="2.5" 
          fill={fillColor}
          opacity="0.7"
        />
      </g>
    </svg>
  );
}

export function LogoIcon({ size = 24, color = '#0d6efd' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(50, 50)">
        <rect x="-12" y="-25" width="24" height="12" rx="2" fill={color}/>
        <rect x="-3" y="-13" width="6" height="35" rx="3" fill={color} opacity="0.9"/>
        <rect x="-20" y="28" width="40" height="5" rx="2.5" fill={color} opacity="0.8"/>
        <rect x="-15" y="36" width="30" height="5" rx="2.5" fill={color} opacity="0.6"/>
      </g>
    </svg>
  );
}

