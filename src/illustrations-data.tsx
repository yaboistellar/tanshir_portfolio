import React from 'react';

export interface IllustrationItem {
  id: string;
  title: string;
  category: 'isometric' | 'character' | 'generative' | 'iconography';
  categoryLabel: string;
  date: string;
  tools: string;
  medium: string;
  tags: string[];
  description: string;
  palette: { hex: string; name: string }[];
  dimensions: string;
  aspectRatio: string;
  svgContent: React.ReactNode;
  svgString: string;
}

export const ILLUSTRATIONS: IllustrationItem[] = [
  {
    id: 'modular-synth',
    title: 'The Isometric Synthesizer Lab',
    category: 'isometric',
    categoryLabel: 'Vector & Isometric',
    date: 'Oct 2026',
    tools: 'Adobe Illustrator CC & Vector Pen',
    medium: '30° Isometric Precision Lineart',
    tags: ['isometric', 'modular synth', 'patch bay', 'vector audio'],
    description: 'An architectural isometric study of an analog sound laboratory: Eurorack patch bay with braided cables, illuminated oscilloscope screen, dual VU meters, and a warm ceramic mug sitting on drafting graph paper.',
    palette: [
      { hex: '#0f172a', name: 'Obsidian Slate' },
      { hex: '#ff5e00', name: 'Molten Amber' },
      { hex: '#0284c7', name: 'Oscilloscope Cyan' },
      { hex: '#f59e0b', name: 'Warm Vacuum Gold' },
      { hex: '#f8fafc', name: 'Pure Signal White' },
    ],
    dimensions: '800 × 560 px',
    aspectRatio: '10 / 7',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="100%" height="100%">
  <defs>
    <linearGradient id="synthGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="glowOrange" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ff7a1a" />
      <stop offset="100%" stop-color="#ff5e00" />
    </linearGradient>
    <linearGradient id="screenCyan" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0284c7" stop-opacity="0.25" />
      <stop offset="100%" stop-color="#0f172a" stop-opacity="0.9" />
    </linearGradient>
    <pattern id="isoGrid1" width="40" height="23" patternUnits="userSpaceOnUse">
      <path d="M 0 11.5 L 20 0 L 40 11.5 L 20 23 Z" fill="none" stroke="#334155" stroke-width="0.5" stroke-dasharray="2,2" opacity="0.35" />
    </pattern>
  </defs>
  <rect width="800" height="560" fill="#0b0f17" />
  <rect width="800" height="560" fill="url(#isoGrid1)" />
  <!-- Isometric Floor Grid & Shadow Base -->
  <polygon points="400,120 720,300 400,480 80,300" fill="#131b27" stroke="#1e293b" stroke-width="2" />
  <polygon points="400,140 690,300 400,460 110,300" fill="#182232" />

  <!-- Main Rack Enclosure -->
  <!-- Left Side Face -->
  <polygon points="260,180 400,260 400,410 260,330" fill="#1e293b" stroke="#334155" stroke-width="2" />
  <!-- Right Side Face -->
  <polygon points="400,260 540,180 540,330 400,410" fill="#0f172a" stroke="#334155" stroke-width="2" />
  <!-- Top Face -->
  <polygon points="400,100 540,180 400,260 260,180" fill="#334155" stroke="#475569" stroke-width="2" />

  <!-- Rack Upper Unit - Oscilloscope Display -->
  <polygon points="408,266 532,194 532,254 408,326" fill="url(#screenCyan)" stroke="#0284c7" stroke-width="1.5" />
  <!-- Glowing CRT Sine Wave -->
  <path d="M 416 295 Q 435 250 455 275 T 495 240 T 525 220" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" />
  <path d="M 416 295 Q 435 250 455 275 T 495 240 T 525 220" fill="none" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity="0.8" />
  
  <!-- VU Meters -->
  <polygon points="418,340 522,280 522,305 418,365" fill="#111827" stroke="#ff5e00" stroke-width="1.2" />
  <line x1="426" y1="354" x2="445" y2="343" stroke="#ff5e00" stroke-width="3" />
  <line x1="449" y1="341" x2="475" y2="326" stroke="#fbbf24" stroke-width="3" />
  <line x1="479" y1="324" x2="505" y2="309" stroke="#ef4444" stroke-width="3" />

  <!-- Left Module Knobs (Rotary Controls) -->
  <g stroke="#94a3b8" stroke-width="1.5" fill="#1e293b">
    <ellipse cx="300" cy="225" rx="12" ry="7" fill="#ff5e00" stroke="#ff7a1a" />
    <line x1="300" y1="225" x2="295" y2="220" stroke="#ffffff" stroke-width="2" />
    <ellipse cx="340" cy="248" rx="12" ry="7" fill="#0284c7" stroke="#38bdf8" />
    <ellipse cx="380" cy="271" rx="12" ry="7" fill="#1e293b" />
    
    <ellipse cx="300" cy="265" rx="12" ry="7" fill="#1e293b" />
    <ellipse cx="340" cy="288" rx="12" ry="7" fill="#ff5e00" stroke="#ff7a1a" />
    <ellipse cx="380" cy="311" rx="12" ry="7" fill="#1e293b" />
    
    <ellipse cx="300" cy="305" rx="12" ry="7" fill="#0284c7" stroke="#38bdf8" />
    <ellipse cx="340" cy="328" rx="12" ry="7" fill="#1e293b" />
    <ellipse cx="380" cy="351" rx="12" ry="7" fill="#ff5e00" />
  </g>

  <!-- Patch Cable Arcs (Dynamic Splines) -->
  <path d="M 340 248 C 360 210, 420 220, 430 270" fill="none" stroke="#ff5e00" stroke-width="3" stroke-linecap="round" />
  <path d="M 300 265 C 330 350, 450 360, 460 280" fill="none" stroke="#38bdf8" stroke-width="3" stroke-linecap="round" />
  <path d="M 380 351 C 390 410, 490 380, 500 320" fill="none" stroke="#eab308" stroke-width="2.5" stroke-linecap="round" />

  <!-- Studio Coffee Mug on Desk Floor -->
  <polygon points="560,370 600,390 600,420 560,400" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
  <polygon points="560,370 600,390 580,400 540,380" fill="#e2e8f0" stroke="#cbd5e1" stroke-width="1.5" />
  <ellipse cx="570" cy="385" rx="14" ry="7" fill="#78350f" />
  <!-- Steam from coffee -->
  <path d="M 570 380 Q 565 365 572 355 T 568 340" fill="none" stroke="#f1f5f9" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />

  <!-- Calibration Label & Dimensions Badge -->
  <text x="40" y="40" fill="#ff5e00" font-family="monospace" font-size="12" font-weight="700" letter-spacing="2">STUDIO STUDY // ISOMETRIC MODULAR SYNTH</text>
  <text x="40" y="58" fill="#64748b" font-family="monospace" font-size="10">AXIS: 30° RECTILINEAR • CHANNELS: 16 • REV 4.2</text>
</svg>`,
    svgContent: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" className="w-full h-full">
        <defs>
          <linearGradient id="synthGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="glowOrange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff7a1a" />
            <stop offset="100%" stopColor="#ff5e00" />
          </linearGradient>
          <linearGradient id="screenCyan" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.9" />
          </linearGradient>
          <pattern id="isoGrid1" width="40" height="23" patternUnits="userSpaceOnUse">
            <path d="M 0 11.5 L 20 0 L 40 11.5 L 20 23 Z" fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.35" />
          </pattern>
        </defs>
        <rect width="800" height="560" fill="#0b0f17" />
        <rect width="800" height="560" fill="url(#isoGrid1)" />
        <polygon points="400,120 720,300 400,480 80,300" fill="#131b27" stroke="#1e293b" strokeWidth="2" />
        <polygon points="400,140 690,300 400,460 110,300" fill="#182232" />
        <polygon points="260,180 400,260 400,410 260,330" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <polygon points="400,260 540,180 540,330 400,410" fill="#0f172a" stroke="#334155" strokeWidth="2" />
        <polygon points="400,100 540,180 400,260 260,180" fill="#334155" stroke="#475569" strokeWidth="2" />
        <polygon points="408,266 532,194 532,254 408,326" fill="url(#screenCyan)" stroke="#0284c7" strokeWidth="1.5" />
        <path d="M 416 295 Q 435 250 455 275 T 495 240 T 525 220" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 416 295 Q 435 250 455 275 T 495 240 T 525 220" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
        <polygon points="418,340 522,280 522,305 418,365" fill="#111827" stroke="#ff5e00" strokeWidth="1.2" />
        <line x1="426" y1="354" x2="445" y2="343" stroke="#ff5e00" strokeWidth="3" />
        <line x1="449" y1="341" x2="475" y2="326" stroke="#fbbf24" strokeWidth="3" />
        <line x1="479" y1="324" x2="505" y2="309" stroke="#ef4444" strokeWidth="3" />
        <g stroke="#94a3b8" strokeWidth="1.5" fill="#1e293b">
          <ellipse cx="300" cy="225" rx="12" ry="7" fill="#ff5e00" stroke="#ff7a1a" />
          <line x1="300" y1="225" x2="295" y2="220" stroke="#ffffff" strokeWidth="2" />
          <ellipse cx="340" cy="248" rx="12" ry="7" fill="#0284c7" stroke="#38bdf8" />
          <ellipse cx="380" cy="271" rx="12" ry="7" fill="#1e293b" />
          <ellipse cx="300" cy="265" rx="12" ry="7" fill="#1e293b" />
          <ellipse cx="340" cy="288" rx="12" ry="7" fill="#ff5e00" stroke="#ff7a1a" />
          <ellipse cx="380" cy="311" rx="12" ry="7" fill="#1e293b" />
          <ellipse cx="300" cy="305" rx="12" ry="7" fill="#0284c7" stroke="#38bdf8" />
          <ellipse cx="340" cy="328" rx="12" ry="7" fill="#1e293b" />
          <ellipse cx="380" cy="351" rx="12" ry="7" fill="#ff5e00" />
        </g>
        <path d="M 340 248 C 360 210, 420 220, 430 270" fill="none" stroke="#ff5e00" strokeWidth="3" strokeLinecap="round" />
        <path d="M 300 265 C 330 350, 450 360, 460 280" fill="none" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <path d="M 380 351 C 390 410, 490 380, 500 320" fill="none" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
        <polygon points="560,370 600,390 600,420 560,400" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <polygon points="560,370 600,390 580,400 540,380" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
        <ellipse cx="570" cy="385" rx="14" ry="7" fill="#78350f" />
        <path d="M 570 380 Q 565 365 572 355 T 568 340" fill="none" stroke="#f1f5f9" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <text x="40" y="40" fill="#ff5e00" fontFamily="monospace" fontSize="12" fontWeight="700" letterSpacing="2">STUDIO STUDY // ISOMETRIC MODULAR SYNTH</text>
        <text x="40" y="58" fill="#64748b" fontFamily="monospace" fontSize="10">AXIS: 30° RECTILINEAR • CHANNELS: 16 • REV 4.2</text>
      </svg>
    ),
  },
  {
    id: 'celestial-astrolabe',
    title: 'Celestial Astrolabe & Orbit Compass',
    category: 'generative',
    categoryLabel: 'Generative & Math',
    date: 'Sep 2026',
    tools: 'Vector Parametric Engine & SVG Math',
    medium: 'Harmonic Geometry & Celestial Coordinates',
    tags: ['astronomy', 'geometry', 'parametric', 'golden ratio', 'brass'],
    description: 'An intricate navigation instrument fusing Renaissance brass astrolabes with interstellar orbital trajectories. Features 360-degree vernier graduations, elliptical planetary tracks, and lunar zenith quadrants.',
    palette: [
      { hex: '#1e1b4b', name: 'Cosmic Indigo' },
      { hex: '#f59e0b', name: 'Antique Brass' },
      { hex: '#fbbf24', name: 'Celestial Gold' },
      { hex: '#38bdf8', name: 'Polaris Cyan' },
      { hex: '#ffffff', name: 'Starlight Silver' },
    ],
    dimensions: '800 × 560 px',
    aspectRatio: '10 / 7',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="100%" height="100%">
  <defs>
    <radialGradient id="spaceRad" cx="50%" cy="50%" r="60%">
      <stop offset="0%" stop-color="#1e1b4b" />
      <stop offset="60%" stop-color="#0f0d24" />
      <stop offset="100%" stop-color="#05040d" />
    </radialGradient>
    <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fde68a" />
      <stop offset="50%" stop-color="#d97706" />
      <stop offset="100%" stop-color="#78350f" />
    </linearGradient>
  </defs>
  <rect width="800" height="560" fill="url(#spaceRad)" />
  <!-- Starfield Points -->
  <g fill="#ffffff" opacity="0.65">
    <circle cx="120" cy="90" r="1.5" />
    <circle cx="210" cy="180" r="1.2" />
    <circle cx="680" cy="110" r="1.5" />
    <circle cx="720" cy="240" r="1.2" />
    <circle cx="650" cy="450" r="1.5" />
    <circle cx="160" cy="420" r="1.2" />
    <circle cx="290" cy="490" r="1" />
    <circle cx="580" cy="70" r="2" fill="#38bdf8" />
  </g>
  <!-- Outer Ring Caliper -->
  <circle cx="400" cy="280" r="210" fill="none" stroke="url(#brassGrad)" stroke-width="8" />
  <circle cx="400" cy="280" r="198" fill="none" stroke="#d97706" stroke-width="1.5" stroke-dasharray="3,3" />
  <circle cx="400" cy="280" r="185" fill="none" stroke="#fbbf24" stroke-width="1" />
  <circle cx="400" cy="280" r="140" fill="none" stroke="#38bdf8" stroke-width="1.2" stroke-dasharray="6,4" opacity="0.8" />
  
  <!-- Elliptical Planetary Trajectories -->
  <ellipse cx="400" cy="280" rx="180" ry="85" fill="none" stroke="#f59e0b" stroke-width="1.5" transform="rotate(-25 400 280)" />
  <ellipse cx="400" cy="280" rx="180" ry="85" fill="none" stroke="#38bdf8" stroke-width="1.5" transform="rotate(35 400 280)" />
  <ellipse cx="400" cy="280" rx="180" ry="85" fill="none" stroke="#fbbf24" stroke-width="1.5" transform="rotate(85 400 280)" opacity="0.7" />

  <!-- Radiating Angle Caliper Marks (12 Quadrants) -->
  <g stroke="#d97706" stroke-width="1.5" opacity="0.75">
    <line x1="400" y1="75" x2="400" y2="485" />
    <line x1="195" y1="280" x2="605" y2="280" />
    <line x1="255" y1="135" x2="545" y2="425" />
    <line x1="255" y1="425" x2="545" y2="135" />
  </g>

  <!-- Central Astrolabe Gear Hub & Reticle -->
  <circle cx="400" cy="280" r="48" fill="#1e1b4b" stroke="url(#brassGrad)" stroke-width="4" />
  <circle cx="400" cy="280" r="28" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
  <circle cx="400" cy="280" r="8" fill="#fbbf24" />
  
  <!-- Alidade Sighting Arm (Pointer Needle) -->
  <polygon points="392,90 408,90 403,275 397,275" fill="url(#brassGrad)" stroke="#78350f" stroke-width="1" transform="rotate(42 400 280)" />
  <polygon points="394,470 406,470 403,285 397,285" fill="url(#brassGrad)" stroke="#78350f" stroke-width="1" transform="rotate(42 400 280)" />

  <!-- Constellation Nodes & Orbit Markers -->
  <circle cx="530" cy="210" r="6" fill="#38bdf8" stroke="#ffffff" stroke-width="1.5" />
  <circle cx="270" cy="350" r="5" fill="#f59e0b" stroke="#ffffff" stroke-width="1.5" />
  <circle cx="480" cy="380" r="4" fill="#fbbf24" />
  <circle cx="320" cy="180" r="4" fill="#38bdf8" />

  <!-- Typography Calibration -->
  <text x="40" y="40" fill="#fbbf24" font-family="monospace" font-size="12" font-weight="700" letter-spacing="2">NAUTICAL MATH // ASTROLABE MERIDIAN</text>
  <text x="40" y="58" fill="#94a3b8" font-family="monospace" font-size="10">EPHEMERIS: RA 14H 29M • DECLINATION +19° • 360° VERNIER</text>
</svg>`,
    svgContent: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" className="w-full h-full">
        <defs>
          <radialGradient id="spaceRad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="60%" stopColor="#0f0d24" />
            <stop offset="100%" stopColor="#05040d" />
          </radialGradient>
          <linearGradient id="brassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>
        <rect width="800" height="560" fill="url(#spaceRad)" />
        <g fill="#ffffff" opacity="0.65">
          <circle cx="120" cy="90" r="1.5" />
          <circle cx="210" cy="180" r="1.2" />
          <circle cx="680" cy="110" r="1.5" />
          <circle cx="720" cy="240" r="1.2" />
          <circle cx="650" cy="450" r="1.5" />
          <circle cx="160" cy="420" r="1.2" />
          <circle cx="290" cy="490" r="1" />
          <circle cx="580" cy="70" r="2" fill="#38bdf8" />
        </g>
        <circle cx="400" cy="280" r="210" fill="none" stroke="url(#brassGrad)" strokeWidth="8" />
        <circle cx="400" cy="280" r="198" fill="none" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3,3" />
        <circle cx="400" cy="280" r="185" fill="none" stroke="#fbbf24" strokeWidth="1" />
        <circle cx="400" cy="280" r="140" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="6,4" opacity="0.8" />
        <ellipse cx="400" cy="280" rx="180" ry="85" fill="none" stroke="#f59e0b" strokeWidth="1.5" transform="rotate(-25 400 280)" />
        <ellipse cx="400" cy="280" rx="180" ry="85" fill="none" stroke="#38bdf8" strokeWidth="1.5" transform="rotate(35 400 280)" />
        <ellipse cx="400" cy="280" rx="180" ry="85" fill="none" stroke="#fbbf24" strokeWidth="1.5" transform="rotate(85 400 280)" opacity="0.7" />
        <g stroke="#d97706" strokeWidth="1.5" opacity="0.75">
          <line x1="400" y1="75" x2="400" y2="485" />
          <line x1="195" y1="280" x2="605" y2="280" />
          <line x1="255" y1="135" x2="545" y2="425" />
          <line x1="255" y1="425" x2="545" y2="135" />
        </g>
        <circle cx="400" cy="280" r="48" fill="#1e1b4b" stroke="url(#brassGrad)" strokeWidth="4" />
        <circle cx="400" cy="280" r="28" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
        <circle cx="400" cy="280" r="8" fill="#fbbf24" />
        <polygon points="392,90 408,90 403,275 397,275" fill="url(#brassGrad)" stroke="#78350f" strokeWidth="1" transform="rotate(42 400 280)" />
        <polygon points="394,470 406,470 403,285 397,285" fill="url(#brassGrad)" stroke="#78350f" strokeWidth="1" transform="rotate(42 400 280)" />
        <circle cx="530" cy="210" r="6" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="270" cy="350" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="480" cy="380" r="4" fill="#fbbf24" />
        <circle cx="320" cy="180" r="4" fill="#38bdf8" />
        <text x="40" y="40" fill="#fbbf24" fontFamily="monospace" fontSize="12" fontWeight="700" letterSpacing="2">NAUTICAL MATH // ASTROLABE MERIDIAN</text>
        <text x="40" y="58" fill="#94a3b8" fontFamily="monospace" fontSize="10">EPHEMERIS: RA 14H 29M • DECLINATION +19° • 360° VERNIER</text>
      </svg>
    ),
  },
  {
    id: 'aviator-duck',
    title: 'Cybernetic Aviator Duck — Flight 07',
    category: 'character',
    categoryLabel: 'Notebook & Ink',
    date: 'Oct 2026',
    tools: 'Technical Ink Fineliner & Digital Wash',
    medium: 'Hand-drawn Ink Hatching on Ruled Margin',
    tags: ['character', 'duck', 'mascot', 'ink hatching', 'steampunk aviator'],
    description: 'An expressive studio mascot drawing: Commander Quack of Flight 07 wearing brass tinted flight goggles, a leather aviator cap with earflaps, and a wind-whipped orange flight scarf with technical margin callouts.',
    palette: [
      { hex: '#fef08a', name: 'Feather Yellow' },
      { hex: '#ea580c', name: 'Bill Tangerine' },
      { hex: '#78350f', name: 'Leather Aviator' },
      { hex: '#38bdf8', name: 'Goggle Specular' },
      { hex: '#0f172a', name: 'Notebook Ink' },
    ],
    dimensions: '800 × 560 px',
    aspectRatio: '10 / 7',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="100%" height="100%">
  <defs>
    <pattern id="ruledNote" width="100" height="28" patternUnits="userSpaceOnUse">
      <line x1="0" y1="27" x2="100" y2="27" stroke="#cbd5e1" stroke-width="1" />
    </pattern>
  </defs>
  <rect width="800" height="560" fill="#fdfbf7" />
  <rect width="800" height="560" fill="url(#ruledNote)" opacity="0.65" />
  <!-- Left Margin Rule Line -->
  <line x1="120" y1="0" x2="120" y2="560" stroke="#f87171" stroke-width="1.5" opacity="0.75" />

  <!-- Doodles in Left Margin -->
  <text x="50" y="160" fill="#0f172a" font-family="cursive, sans-serif" font-size="15" transform="rotate(-90 50 160)">ALTITUDE: 12,000 FT</text>
  <text x="50" y="380" fill="#b91c1c" font-family="cursive, sans-serif" font-size="14" transform="rotate(-90 50 380)">QUACK SPEED: MACH 0.8</text>

  <!-- Aviator Duck Illustration Core -->
  <!-- Flight Scarf Trailing Back -->
  <path d="M 370 380 C 260 410, 210 350, 150 420 C 180 460, 280 430, 390 410 Z" fill="#ff5e00" stroke="#0f172a" stroke-width="3" />
  <path d="M 350 400 C 240 450, 180 390, 130 470 C 160 500, 260 470, 370 420 Z" fill="#ea580c" stroke="#0f172a" stroke-width="3" />
  
  <!-- Duck Body & Torso -->
  <ellipse cx="400" cy="380" rx="110" ry="90" fill="#fef08a" stroke="#0f172a" stroke-width="3.5" />
  
  <!-- Feather Crosshatch Shadowing -->
  <g stroke="#ca8a04" stroke-width="1.5" stroke-linecap="round">
    <line x1="430" y1="380" x2="450" y2="400" />
    <line x1="440" y1="370" x2="465" y2="395" />
    <line x1="455" y1="365" x2="480" y2="390" />
    <line x1="330" y1="390" x2="350" y2="410" />
    <line x1="340" y1="400" x2="365" y2="425" />
  </g>

  <!-- Duck Head -->
  <circle cx="400" cy="240" r="85" fill="#fef08a" stroke="#0f172a" stroke-width="3.5" />
  
  <!-- Aviator Leather Helmet / Cap -->
  <path d="M 320 220 C 320 140, 480 140, 480 220 C 480 240, 470 260, 470 260 L 330 260 Z" fill="#78350f" stroke="#0f172a" stroke-width="3.5" />
  <!-- Earflaps -->
  <path d="M 325 240 L 315 310 Q 325 330 340 310 L 340 250 Z" fill="#78350f" stroke="#0f172a" stroke-width="3" />
  <path d="M 475 240 L 485 310 Q 475 330 460 310 L 460 250 Z" fill="#78350f" stroke="#0f172a" stroke-width="3" />

  <!-- Aviator Brass Goggles -->
  <rect x="330" y="200" width="140" height="42" rx="21" fill="#451a03" stroke="#0f172a" stroke-width="3" />
  <!-- Left Lens -->
  <circle cx="365" cy="221" r="20" fill="#38bdf8" stroke="#d97706" stroke-width="3.5" />
  <path d="M 355 210 Q 375 210 380 225" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />
  <!-- Right Lens -->
  <circle cx="435" cy="221" r="20" fill="#38bdf8" stroke="#d97706" stroke-width="3.5" />
  <path d="M 425 210 Q 445 210 450 225" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" />

  <!-- Duck Bill (Beak) -->
  <path d="M 345 270 Q 400 245 455 270 Q 485 305 400 320 Q 315 305 345 270 Z" fill="#ff5e00" stroke="#0f172a" stroke-width="3.5" />
  <line x1="365" y1="285" x2="435" y2="285" stroke="#9a3412" stroke-width="2.5" stroke-linecap="round" />
  <circle cx="385" cy="275" r="2.5" fill="#7c2d12" />
  <circle cx="415" cy="275" r="2.5" fill="#7c2d12" />

  <!-- Wing Flight Stance -->
  <path d="M 460 350 C 560 320, 610 360, 660 330 C 630 400, 560 420, 480 410 Z" fill="#fde047" stroke="#0f172a" stroke-width="3" />

  <!-- Technical Callout Arrows & Hand-written Notes -->
  <g stroke="#0f172a" stroke-width="1.2">
    <line x1="485" y1="220" x2="570" y2="180" />
    <polyline points="560,180 570,180 570,190" fill="none" />
    <line x1="345" y1="320" x2="260" y2="350" />
    <polyline points="270,350 260,350 260,340" fill="none" />
  </g>
  <text x="580" y="184" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">AERODYNAMIC BRASS LENSES</text>
  <text x="140" y="360" fill="#0f172a" font-family="monospace" font-size="11" font-weight="700">WIND-PROOF SCARF</text>
</svg>`,
    svgContent: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" className="w-full h-full">
        <defs>
          <pattern id="ruledNote" width="100" height="28" patternUnits="userSpaceOnUse">
            <line x1="0" y1="27" x2="100" y2="27" stroke="#cbd5e1" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="800" height="560" fill="#fdfbf7" />
        <rect width="800" height="560" fill="url(#ruledNote)" opacity="0.65" />
        <line x1="120" y1="0" x2="120" y2="560" stroke="#f87171" strokeWidth="1.5" opacity="0.75" />
        <text x="50" y="160" fill="#0f172a" fontFamily="cursive, sans-serif" fontSize="15" transform="rotate(-90 50 160)">ALTITUDE: 12,000 FT</text>
        <text x="50" y="380" fill="#b91c1c" fontFamily="cursive, sans-serif" fontSize="14" transform="rotate(-90 50 380)">QUACK SPEED: MACH 0.8</text>
        <path d="M 370 380 C 260 410, 210 350, 150 420 C 180 460, 280 430, 390 410 Z" fill="#ff5e00" stroke="#0f172a" strokeWidth="3" />
        <path d="M 350 400 C 240 450, 180 390, 130 470 C 160 500, 260 470, 370 420 Z" fill="#ea580c" stroke="#0f172a" strokeWidth="3" />
        <ellipse cx="400" cy="380" rx="110" ry="90" fill="#fef08a" stroke="#0f172a" strokeWidth="3.5" />
        <g stroke="#ca8a04" strokeWidth="1.5" strokeLinecap="round">
          <line x1="430" y1="380" x2="450" y2="400" />
          <line x1="440" y1="370" x2="465" y2="395" />
          <line x1="455" y1="365" x2="480" y2="390" />
          <line x1="330" y1="390" x2="350" y2="410" />
          <line x1="340" y1="400" x2="365" y2="425" />
        </g>
        <circle cx="400" cy="240" r="85" fill="#fef08a" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M 320 220 C 320 140, 480 140, 480 220 C 480 240, 470 260, 470 260 L 330 260 Z" fill="#78350f" stroke="#0f172a" strokeWidth="3.5" />
        <path d="M 325 240 L 315 310 Q 325 330 340 310 L 340 250 Z" fill="#78350f" stroke="#0f172a" strokeWidth="3" />
        <path d="M 475 240 L 485 310 Q 475 330 460 310 L 460 250 Z" fill="#78350f" stroke="#0f172a" strokeWidth="3" />
        <rect x="330" y="200" width="140" height="42" rx="21" fill="#451a03" stroke="#0f172a" strokeWidth="3" />
        <circle cx="365" cy="221" r="20" fill="#38bdf8" stroke="#d97706" strokeWidth="3.5" />
        <path d="M 355 210 Q 375 210 380 225" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="435" cy="221" r="20" fill="#38bdf8" stroke="#d97706" strokeWidth="3.5" />
        <path d="M 425 210 Q 445 210 450 225" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 345 270 Q 400 245 455 270 Q 485 305 400 320 Q 315 305 345 270 Z" fill="#ff5e00" stroke="#0f172a" strokeWidth="3.5" />
        <line x1="365" y1="285" x2="435" y2="285" stroke="#9a3412" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="385" cy="275" r="2.5" fill="#7c2d12" />
        <circle cx="415" cy="275" r="2.5" fill="#7c2d12" />
        <path d="M 460 350 C 560 320, 610 360, 660 330 C 630 400, 560 420, 480 410 Z" fill="#fde047" stroke="#0f172a" strokeWidth="3" />
        <g stroke="#0f172a" strokeWidth="1.2">
          <line x1="485" y1="220" x2="570" y2="180" />
          <polyline points="560,180 570,180 570,190" fill="none" />
          <line x1="345" y1="320" x2="260" y2="350" />
          <polyline points="270,350 260,350 260,340" fill="none" />
        </g>
        <text x="580" y="184" fill="#0f172a" fontFamily="monospace" fontSize="11" fontWeight="700">AERODYNAMIC BRASS LENSES</text>
        <text x="140" y="360" fill="#0f172a" fontFamily="monospace" fontSize="11" fontWeight="700">WIND-PROOF SCARF</text>
      </svg>
    ),
  },
  {
    id: 'obsidian-monolith',
    title: 'The Obsidian Monolith: Ambient Core',
    category: 'isometric',
    categoryLabel: 'Vector & Isometric',
    date: 'Oct 2026',
    tools: 'Adobe Illustrator & Isometric Geometry',
    medium: 'Minimalist Vector Sci-Fi Architecture',
    tags: ['monolith', 'molten orange', 'minimalism', 'low poly', 'isometric'],
    description: 'A monument to Ambient Studio’s design philosophy: an obsidian prismatic monolith hovering in zero gravity over an isometric grid, fractured down the center to reveal radiant molten plasma veins.',
    palette: [
      { hex: '#050508', name: 'Pitch Obsidian' },
      { hex: '#ff5e00', name: 'Liquid Magma' },
      { hex: '#ffa25b', name: 'Core Glow' },
      { hex: '#334155', name: 'Titanium Bevel' },
      { hex: '#ffffff', name: 'Edge Specular' },
    ],
    dimensions: '800 × 560 px',
    aspectRatio: '10 / 7',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="100%" height="100%">
  <defs>
    <linearGradient id="monolithLeft" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>
    <linearGradient id="monolithRight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#020408" />
    </linearGradient>
    <linearGradient id="coreOrangeMagma" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffa25b" />
      <stop offset="50%" stop-color="#ff5e00" />
      <stop offset="100%" stop-color="#b91c1c" />
    </linearGradient>
    <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ff5e00" stop-opacity="0.35" />
      <stop offset="70%" stop-color="#ff5e00" stop-opacity="0.05" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="800" height="560" fill="#050508" />
  <!-- Radiant Magma Backlight -->
  <circle cx="400" cy="270" r="220" fill="url(#ambientGlow)" />

  <!-- Perspective Floor Grid -->
  <g stroke="#ff5e00" stroke-width="0.75" opacity="0.35">
    <line x1="400" y1="410" x2="80" y2="560" />
    <line x1="400" y1="410" x2="220" y2="560" />
    <line x1="400" y1="410" x2="400" y2="560" />
    <line x1="400" y1="410" x2="580" y2="560" />
    <line x1="400" y1="410" x2="720" y2="560" />
    
    <line x1="260" y1="475" x2="540" y2="475" />
    <line x1="180" y1="515" x2="620" y2="515" />
    <line x1="100" y1="550" x2="700" y2="550" />
  </g>

  <!-- Floating Main Monolith -->
  <!-- Top Face -->
  <polygon points="400,60 480,105 400,150 320,105" fill="#334155" stroke="#64748b" stroke-width="1.5" />
  
  <!-- Left Facet -->
  <polygon points="320,105 400,150 400,410 320,365" fill="url(#monolithLeft)" stroke="#1e293b" stroke-width="1.5" />
  <!-- Right Facet -->
  <polygon points="400,150 480,105 480,365 400,410" fill="url(#monolithRight)" stroke="#1e293b" stroke-width="1.5" />

  <!-- Central Molten Fissure (Chasm Glow) -->
  <path d="M 400 150 L 396 210 L 405 270 L 395 340 L 400 410 L 406 340 L 398 270 L 405 210 Z" fill="url(#coreOrangeMagma)" />
  <line x1="400" y1="150" x2="400" y2="410" stroke="#ffffff" stroke-width="1.5" opacity="0.8" />

  <!-- Orbiting Floating Geometrical Polyhedron Shards -->
  <polygon points="240,210 260,225 250,245 230,230" fill="#1e293b" stroke="#ff5e00" stroke-width="1.5" />
  <polygon points="560,190 585,200 575,225 550,215" fill="#334155" stroke="#ff5e00" stroke-width="1.5" />
  <polygon points="530,340 550,350 540,370 520,360" fill="#0f172a" stroke="#ffa25b" stroke-width="1.5" />
  <polygon points="270,360 290,375 280,395 260,380" fill="#1e293b" stroke="#ffa25b" stroke-width="1.5" />

  <!-- Energy Light Beams -->
  <line x1="400" y1="60" x2="400" y2="20" stroke="#ffa25b" stroke-width="2" stroke-linecap="round" />
  <line x1="400" y1="410" x2="400" y2="460" stroke="#ff5e00" stroke-width="3" stroke-linecap="round" opacity="0.8" />

  <!-- Blueprint Dimension Callouts -->
  <text x="40" y="40" fill="#ff5e00" font-family="monospace" font-size="12" font-weight="700" letter-spacing="2">SECTOR 09 // OBSIDIAN AMBIENT CORE</text>
  <text x="40" y="58" fill="#64748b" font-family="monospace" font-size="10">GEOMETRY: PRISMATIC 30° • RADIUS: 420 NM • EMISSION: 100% MOLTEN</text>
</svg>`,
    svgContent: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" className="w-full h-full">
        <defs>
          <linearGradient id="monolithLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="100%" stopColor="#090d16" />
          </linearGradient>
          <linearGradient id="monolithRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020408" />
          </linearGradient>
          <linearGradient id="coreOrangeMagma" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffa25b" />
            <stop offset="50%" stopColor="#ff5e00" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <radialGradient id="ambientGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff5e00" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#ff5e00" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="560" fill="#050508" />
        <circle cx="400" cy="270" r="220" fill="url(#ambientGlow)" />
        <g stroke="#ff5e00" strokeWidth="0.75" opacity="0.35">
          <line x1="400" y1="410" x2="80" y2="560" />
          <line x1="400" y1="410" x2="220" y2="560" />
          <line x1="400" y1="410" x2="400" y2="560" />
          <line x1="400" y1="410" x2="580" y2="560" />
          <line x1="400" y1="410" x2="720" y2="560" />
          <line x1="260" y1="475" x2="540" y2="475" />
          <line x1="180" y1="515" x2="620" y2="515" />
          <line x1="100" y1="550" x2="700" y2="550" />
        </g>
        <polygon points="400,60 480,105 400,150 320,105" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
        <polygon points="320,105 400,150 400,410 320,365" fill="url(#monolithLeft)" stroke="#1e293b" strokeWidth="1.5" />
        <polygon points="400,150 480,105 480,365 400,410" fill="url(#monolithRight)" stroke="#1e293b" strokeWidth="1.5" />
        <path d="M 400 150 L 396 210 L 405 270 L 395 340 L 400 410 L 406 340 L 398 270 L 405 210 Z" fill="url(#coreOrangeMagma)" />
        <line x1="400" y1="150" x2="400" y2="410" stroke="#ffffff" strokeWidth="1.5" opacity="0.8" />
        <polygon points="240,210 260,225 250,245 230,230" fill="#1e293b" stroke="#ff5e00" strokeWidth="1.5" />
        <polygon points="560,190 585,200 575,225 550,215" fill="#334155" stroke="#ff5e00" strokeWidth="1.5" />
        <polygon points="530,340 550,350 540,370 520,360" fill="#0f172a" stroke="#ffa25b" strokeWidth="1.5" />
        <polygon points="270,360 290,375 280,395 260,380" fill="#1e293b" stroke="#ffa25b" strokeWidth="1.5" />
        <line x1="400" y1="60" x2="400" y2="20" stroke="#ffa25b" strokeWidth="2" strokeLinecap="round" />
        <line x1="400" y1="410" x2="400" y2="460" stroke="#ff5e00" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        <text x="40" y="40" fill="#ff5e00" fontFamily="monospace" fontSize="12" fontWeight="700" letterSpacing="2">SECTOR 09 // OBSIDIAN AMBIENT CORE</text>
        <text x="40" y="58" fill="#64748b" fontFamily="monospace" fontSize="10">GEOMETRY: PRISMATIC 30° • RADIUS: 420 NM • EMISSION: 100% MOLTEN</text>
      </svg>
    ),
  },
  {
    id: 'parametric-rose',
    title: 'Parametric Rose & Harmonic Spirograph',
    category: 'generative',
    categoryLabel: 'Generative & Math',
    date: 'Sep 2026',
    tools: 'Parametric Equations & SVG Path Curves',
    medium: 'Algorithmic Vector Ribbon Construction',
    tags: ['generative', 'spirograph', 'harmonics', 'trigonometry', 'fibonacci'],
    description: 'Constructed strictly through mathematical equations: r = cos(k θ) hypocycloid orbits layered in 8 concentric phases with iridescent gradient strokes that demonstrate fluid computational vector dynamics.',
    palette: [
      { hex: '#0f172a', name: 'Dark Blueprint' },
      { hex: '#38bdf8', name: 'Electric Cyan' },
      { hex: '#a855f7', name: 'Violet Neon' },
      { hex: '#ec4899', name: 'Rose Quartz' },
      { hex: '#ffffff', name: 'Polar Coordinate' },
    ],
    dimensions: '800 × 560 px',
    aspectRatio: '10 / 7',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="100%" height="100%">
  <defs>
    <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
  </defs>
  <rect width="800" height="560" fill="#090d16" />
  <!-- Polar Grid Radial Rays -->
  <g stroke="#1e293b" stroke-width="1" opacity="0.5">
    <circle cx="400" cy="280" r="60" fill="none" />
    <circle cx="400" cy="280" r="120" fill="none" />
    <circle cx="400" cy="280" r="180" fill="none" stroke-dasharray="4,4" />
    <circle cx="400" cy="280" r="230" fill="none" />
    <line x1="400" y1="40" x2="400" y2="520" />
    <line x1="160" y1="280" x2="640" y2="280" />
  </g>

  <!-- 12-Fold Mathematical Spirograph Rose Rotations -->
  <g fill="none" stroke="url(#roseGrad)" stroke-width="1.8" opacity="0.85">
    <path d="M 400 280 Q 480 140 560 280 T 400 280" transform="rotate(0 400 280)" />
    <path d="M 400 280 Q 480 140 560 280 T 400 280" transform="rotate(30 400 280)" />
    <path d="M 400 280 Q 480 140 560 280 T 400 280" transform="rotate(60 400 280)" />
    <path d="M 400 280 Q 480 140 560 280 T 400 280" transform="rotate(90 400 280)" />
    <path d="M 400 280 Q 480 140 560 280 T 400 280" transform="rotate(120 400 280)" />
    <path d="M 400 280 Q 480 140 560 280 T 400 280" transform="rotate(150 400 280)" />
    <path d="M 400 280 Q 480 140 560 280 T 400 280" transform="rotate(180 400 280)" />
    <path d="M 400 280 Q 480 140 560 280 T 400 280" transform="rotate(210 400 280)" />
    <path d="M 400 280 Q 480 140 560 280 T 400 280" transform="rotate(240 400 280)" />
    <path d="M 400 280 Q 480 140 560 280 T 400 280" transform="rotate(270 400 280)" />
    <path d="M 400 280 Q 480 140 560 280 T 400 280" transform="rotate(300 400 280)" />
    <path d="M 400 280 Q 480 140 560 280 T 400 280" transform="rotate(330 400 280)" />
  </g>

  <!-- Counter-Rotating Inner Harmonic Orbit -->
  <g fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.7">
    <ellipse cx="400" cy="280" rx="140" ry="40" transform="rotate(15 400 280)" />
    <ellipse cx="400" cy="280" rx="140" ry="40" transform="rotate(45 400 280)" />
    <ellipse cx="400" cy="280" rx="140" ry="40" transform="rotate(75 400 280)" />
    <ellipse cx="400" cy="280" rx="140" ry="40" transform="rotate(105 400 280)" />
    <ellipse cx="400" cy="280" rx="140" ry="40" transform="rotate(135 400 280)" />
    <ellipse cx="400" cy="280" rx="140" ry="40" transform="rotate(165 400 280)" />
  </g>

  <!-- Central Singularity Ring -->
  <circle cx="400" cy="280" r="14" fill="#090d16" stroke="#ffffff" stroke-width="2.5" />
  <circle cx="400" cy="280" r="4" fill="#ec4899" />

  <text x="40" y="40" fill="#a855f7" font-family="monospace" font-size="12" font-weight="700" letter-spacing="2">HARMONIC MATH // PARAMETRIC ROSE STUDY</text>
  <text x="40" y="58" fill="#64748b" font-family="monospace" font-size="10">EQUATION: r = a · cos(7θ) • CYCLOID RATIO 1.61803 • 2400 NODES</text>
</svg>`,
    svgContent: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" className="w-full h-full">
        <defs>
          <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        <rect width="800" height="560" fill="#090d16" />
        <g stroke="#1e293b" strokeWidth="1" opacity="0.5">
          <circle cx="400" cy="280" r="60" fill="none" />
          <circle cx="400" cy="280" r="120" fill="none" />
          <circle cx="400" cy="280" r="180" fill="none" strokeDasharray="4,4" />
          <circle cx="400" cy="280" r="230" fill="none" />
          <line x1="400" y1="40" x2="400" y2="520" />
          <line x1="160" y1="280" x2="640" y2="280" />
        </g>
        <g fill="none" stroke="url(#roseGrad)" strokeWidth="1.8" opacity="0.85">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <path key={deg} d="M 400 280 Q 480 140 560 280 T 400 280" transform={`rotate(${deg} 400 280)`} />
          ))}
        </g>
        <g fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.7">
          {[15, 45, 75, 105, 135, 165].map((deg) => (
            <ellipse key={deg} cx="400" cy="280" rx="140" ry="40" transform={`rotate(${deg} 400 280)`} />
          ))}
        </g>
        <circle cx="400" cy="280" r="14" fill="#090d16" stroke="#ffffff" strokeWidth="2.5" />
        <circle cx="400" cy="280" r="4" fill="#ec4899" />
        <text x="40" y="40" fill="#a855f7" fontFamily="monospace" fontSize="12" fontWeight="700" letterSpacing="2">HARMONIC MATH // PARAMETRIC ROSE STUDY</text>
        <text x="40" y="58" fill="#64748b" fontFamily="monospace" fontSize="10">EQUATION: r = a · cos(7θ) • CYCLOID RATIO 1.61803 • 2400 NODES</text>
      </svg>
    ),
  },
  {
    id: 'arcade-cabinet',
    title: 'Tabletop Arcade Cabinet & Pixel Matrix',
    category: 'character',
    categoryLabel: 'Notebook & Ink',
    date: 'Aug 2026',
    tools: 'Vector Pen & Tactile Noise Texture',
    medium: 'Retro Chiptune Arcade Cabinet Draft',
    tags: ['arcade', 'pixel art', 'joystick', 'crt scanlines', 'retro gaming'],
    description: 'A homage to 1980s coin-op tabletop cabinets with cherry red microswitch joystick, glowing marquee logo, curved phosphor scanline CRT screen, and coin slot coin-return bezel.',
    palette: [
      { hex: '#18181b', name: 'Arcade Enclosure' },
      { hex: '#ef4444', name: 'Balltop Red' },
      { hex: '#f59e0b', name: 'Marquee Amber' },
      { hex: '#22c55e', name: 'Phosphor Green' },
      { hex: '#3b82f6', name: 'Action Blue' },
    ],
    dimensions: '800 × 560 px',
    aspectRatio: '10 / 7',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="100%" height="100%">
  <defs>
    <linearGradient id="crtGlow" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#022c22" />
      <stop offset="100%" stop-color="#052e16" />
    </linearGradient>
  </defs>
  <rect width="800" height="560" fill="#09090b" />
  
  <!-- Outer Cabinet Chassis -->
  <polygon points="260,80 540,80 570,490 230,490" fill="#18181b" stroke="#3f3f46" stroke-width="3" />
  
  <!-- Marquee Sign (Glowing Amber) -->
  <polygon points="275,95 525,95 520,150 280,150" fill="#f59e0b" stroke="#fbbf24" stroke-width="2" />
  <text x="400" y="132" fill="#451a03" font-family="monospace" font-size="20" font-weight="900" text-anchor="middle" letter-spacing="4">AMBIENT ARCADE</text>
  
  <!-- CRT Bezel & Screen Chamber -->
  <rect x="270" y="170" width="260" height="190" rx="18" fill="#111827" stroke="#374151" stroke-width="3" />
  <rect x="285" y="185" width="230" height="160" rx="12" fill="url(#crtGlow)" stroke="#22c55e" stroke-width="2" />
  
  <!-- CRT Scanlines -->
  <g stroke="#16a34a" stroke-width="1" opacity="0.35">
    <line x1="285" y1="205" x2="515" y2="205" />
    <line x1="285" y1="225" x2="515" y2="225" />
    <line x1="285" y1="245" x2="515" y2="245" />
    <line x1="285" y1="265" x2="515" y2="265" />
    <line x1="285" y1="285" x2="515" y2="285" />
    <line x1="285" y1="305" x2="515" y2="305" />
    <line x1="285" y1="325" x2="515" y2="325" />
  </g>
  
  <!-- 8-Bit Pixel Invader on CRT -->
  <g fill="#4ade80">
    <rect x="385" y="235" width="30" height="10" />
    <rect x="375" y="245" width="50" height="15" />
    <rect x="365" y="260" width="70" height="10" />
    <rect x="365" y="270" width="20" height="15" />
    <rect x="415" y="270" width="20" height="15" />
    <rect x="375" y="285" width="10" height="10" />
    <rect x="415" y="285" width="10" height="10" />
  </g>

  <!-- Control Deck (Angled Slant) -->
  <polygon points="255,380 545,380 560,450 240,450" fill="#27272a" stroke="#52525b" stroke-width="2.5" />
  
  <!-- Joystick (Balltop Red) -->
  <ellipse cx="320" cy="425" rx="18" ry="8" fill="#18181b" stroke="#71717a" stroke-width="1.5" />
  <line x1="320" y1="425" x2="315" y2="395" stroke="#e4e4e7" stroke-width="4.5" stroke-linecap="round" />
  <circle cx="313" cy="390" r="14" fill="#ef4444" stroke="#f87171" stroke-width="2" />

  <!-- Action Arcade Buttons (6 Button Cluster) -->
  <g stroke="#ffffff" stroke-width="1.2">
    <circle cx="410" cy="405" r="9" fill="#ef4444" />
    <circle cx="435" cy="400" r="9" fill="#3b82f6" />
    <circle cx="460" cy="405" r="9" fill="#22c55e" />
    <circle cx="410" cy="430" r="9" fill="#eab308" />
    <circle cx="435" cy="425" r="9" fill="#ec4899" />
    <circle cx="460" cy="430" r="9" fill="#8b5cf6" />
  </g>

  <!-- Coin Return / Reject Door -->
  <rect x="375" y="460" width="50" height="25" rx="3" fill="#18181b" stroke="#71717a" stroke-width="1.5" />
  <line x1="390" y1="472" x2="410" y2="472" stroke="#f59e0b" stroke-width="2" />

  <text x="40" y="40" fill="#ef4444" font-family="monospace" font-size="12" font-weight="700" letter-spacing="2">RETRO DRAFT // 80S TABLETOP COIN-OP</text>
  <text x="40" y="58" fill="#71717a" font-family="monospace" font-size="10">SCANLINES: 240P PHOSPHOR • JOYSTICK: 4-WAY SANWA • INSERT COIN</text>
</svg>`,
    svgContent: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" className="w-full h-full">
        <defs>
          <linearGradient id="crtGlow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#022c22" />
            <stop offset="100%" stopColor="#052e16" />
          </linearGradient>
        </defs>
        <rect width="800" height="560" fill="#09090b" />
        <polygon points="260,80 540,80 570,490 230,490" fill="#18181b" stroke="#3f3f46" strokeWidth="3" />
        <polygon points="275,95 525,95 520,150 280,150" fill="#f59e0b" stroke="#fbbf24" strokeWidth="2" />
        <text x="400" y="132" fill="#451a03" fontFamily="monospace" fontSize="20" fontWeight="900" textAnchor="middle" letterSpacing="4">AMBIENT ARCADE</text>
        <rect x="270" y="170" width="260" height="190" rx="18" fill="#111827" stroke="#374151" strokeWidth="3" />
        <rect x="285" y="185" width="230" height="160" rx="12" fill="url(#crtGlow)" stroke="#22c55e" strokeWidth="2" />
        <g stroke="#16a34a" strokeWidth="1" opacity="0.35">
          {[205, 225, 245, 265, 285, 305, 325].map((y) => (
            <line key={y} x1="285" y1={y} x2="515" y2={y} />
          ))}
        </g>
        <g fill="#4ade80">
          <rect x="385" y="235" width="30" height="10" />
          <rect x="375" y="245" width="50" height="15" />
          <rect x="365" y="260" width="70" height="10" />
          <rect x="365" y="270" width="20" height="15" />
          <rect x="415" y="270" width="20" height="15" />
          <rect x="375" y="285" width="10" height="10" />
          <rect x="415" y="285" width="10" height="10" />
        </g>
        <polygon points="255,380 545,380 560,450 240,450" fill="#27272a" stroke="#52525b" strokeWidth="2.5" />
        <ellipse cx="320" cy="425" rx="18" ry="8" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
        <line x1="320" y1="425" x2="315" y2="395" stroke="#e4e4e7" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="313" cy="390" r="14" fill="#ef4444" stroke="#f87171" strokeWidth="2" />
        <g stroke="#ffffff" strokeWidth="1.2">
          <circle cx="410" cy="405" r="9" fill="#ef4444" />
          <circle cx="435" cy="400" r="9" fill="#3b82f6" />
          <circle cx="460" cy="405" r="9" fill="#22c55e" />
          <circle cx="410" cy="430" r="9" fill="#eab308" />
          <circle cx="435" cy="425" r="9" fill="#ec4899" />
          <circle cx="460" cy="430" r="9" fill="#8b5cf6" />
        </g>
        <rect x="375" y="460" width="50" height="25" rx="3" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
        <line x1="390" y1="472" x2="410" y2="472" stroke="#f59e0b" strokeWidth="2" />
        <text x="40" y="40" fill="#ef4444" fontFamily="monospace" fontSize="12" fontWeight="700" letterSpacing="2">RETRO DRAFT // 80S TABLETOP COIN-OP</text>
        <text x="40" y="58" fill="#71717a" fontFamily="monospace" fontSize="10">SCANLINES: 240P PHOSPHOR • JOYSTICK: 4-WAY SANWA • INSERT COIN</text>
      </svg>
    ),
  },
  {
    id: 'vector-glyphs',
    title: 'Precision Tooling Glyphs & Artifacts',
    category: 'iconography',
    categoryLabel: 'Iconography & UI',
    date: 'Jul 2026',
    tools: 'Figma Vector Pen & 24px Icon Grid',
    medium: 'Tactile UI Iconography & Emblems',
    tags: ['iconography', 'glyphs', 'ui design', 'badges', 'pixel grid'],
    description: 'A 3×3 matrix of hand-tuned design and engineering icons aligned to a strict 2px stroke grid: Fountain Pen Nib, Alchemical Beaker, Precision Caliper, 20-Sided Die, Pixel Broadsword, Retro Floppy, Security Keycard, Prism, and Chronometer.',
    palette: [
      { hex: '#0f172a', name: 'Ink Base' },
      { hex: '#ff5e00', name: 'Highlight Orange' },
      { hex: '#38bdf8', name: 'Precision Cyan' },
      { hex: '#e2e8f0', name: 'Line Platinum' },
      { hex: '#f59e0b', name: 'Gold Seal' },
    ],
    dimensions: '800 × 560 px',
    aspectRatio: '10 / 7',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="100%" height="100%">
  <rect width="800" height="560" fill="#0f172a" />
  
  <!-- 3x3 Grid Containers -->
  <!-- Col 1 -->
  <!-- 1. Pen Nib -->
  <g transform="translate(140, 100)">
    <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    <path d="M 0 -35 L 24 5 L 12 35 L -12 35 L -24 5 Z" fill="#0f172a" stroke="#ff5e00" stroke-width="2.5" />
    <line x1="0" y1="-35" x2="0" y2="10" stroke="#ff5e00" stroke-width="2" />
    <circle cx="0" cy="10" r="3" fill="#ffffff" />
    <text x="0" y="48" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">01. FOUNTAIN NIB</text>
  </g>
  <!-- 2. Alchemical Potion -->
  <g transform="translate(140, 260)">
    <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    <path d="M -10 -30 L 10 -30 L 10 -15 L 26 25 Q 0 35 -26 25 L -10 -15 Z" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5" />
    <path d="M -18 12 Q 0 20 18 12 L 23 23 Q 0 32 -23 23 Z" fill="#0284c7" />
    <circle cx="0" cy="2" r="2.5" fill="#ffffff" />
    <circle cx="8" cy="-5" r="2" fill="#ffffff" opacity="0.7" />
    <text x="0" y="48" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">02. POTION FLASK</text>
  </g>
  <!-- 3. Compass Caliper -->
  <g transform="translate(140, 420)">
    <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    <circle cx="0" cy="-25" r="6" fill="#ff5e00" stroke="#ffffff" stroke-width="1.5" />
    <line x1="0" y1="-25" x2="-22" y2="30" stroke="#f59e0b" stroke-width="2.5" />
    <line x1="0" y1="-25" x2="22" y2="30" stroke="#f59e0b" stroke-width="2.5" />
    <path d="M -14 5 Q 0 -5 14 5" fill="none" stroke="#e2e8f0" stroke-width="2" />
    <text x="0" y="48" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">03. DRAFT CALIPER</text>
  </g>

  <!-- Col 2 -->
  <!-- 4. D20 Die -->
  <g transform="translate(400, 100)">
    <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" fill="#0f172a" stroke="#a855f7" stroke-width="2.5" />
    <polygon points="0,-30 18,10 -18,10" fill="none" stroke="#ec4899" stroke-width="1.5" />
    <line x1="0" y1="-30" x2="0" y2="30" stroke="#a855f7" stroke-width="1.5" />
    <text x="0" y="48" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">04. ISOMETRIC D20</text>
  </g>
  <!-- 5. Pixel Sword -->
  <g transform="translate(400, 260)">
    <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    <line x1="-25" y1="25" x2="25" y2="-25" stroke="#ff5e00" stroke-width="4" stroke-linecap="round" />
    <line x1="-12" y1="5" x2="-5" y2="12" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
    <circle cx="-25" cy="25" r="4" fill="#fbbf24" />
    <polygon points="25,-25 28,-18 18,-28" fill="#ffffff" />
    <text x="0" y="48" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">05. VOXEL BLADE</text>
  </g>
  <!-- 6. Retro Floppy -->
  <g transform="translate(400, 420)">
    <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    <rect x="-24" y="-26" width="48" height="52" rx="4" fill="#0f172a" stroke="#38bdf8" stroke-width="2" />
    <rect x="-14" y="-26" width="28" height="20" fill="#e2e8f0" />
    <rect x="-16" y="6" width="32" height="20" fill="#334155" />
    <text x="0" y="48" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">06. 3.5" DISKETTE</text>
  </g>

  <!-- Col 3 -->
  <!-- 7. Security Keycard -->
  <g transform="translate(660, 100)">
    <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    <rect x="-26" y="-20" width="52" height="40" rx="5" fill="#0f172a" stroke="#22c55e" stroke-width="2" />
    <rect x="-18" y="-12" width="14" height="12" rx="2" fill="#f59e0b" />
    <line x1="2" y1="-8" x2="18" y2="-8" stroke="#e2e8f0" stroke-width="1.5" />
    <line x1="2" y1="-2" x2="14" y2="-2" stroke="#e2e8f0" stroke-width="1.5" />
    <text x="0" y="48" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">07. CHIP KEYCARD</text>
  </g>
  <!-- 8. Optical Prism -->
  <g transform="translate(660, 260)">
    <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    <polygon points="0,-28 26,20 -26,20" fill="#0f172a" stroke="#ffffff" stroke-width="2" />
    <line x1="-40" y1="0" x2="-10" y2="0" stroke="#ffffff" stroke-width="2" />
    <line x1="12" y1="0" x2="38" y2="-8" stroke="#ef4444" stroke-width="1.5" />
    <line x1="12" y1="2" x2="40" y2="2" stroke="#22c55e" stroke-width="1.5" />
    <line x1="12" y1="4" x2="38" y2="12" stroke="#38bdf8" stroke-width="1.5" />
    <text x="0" y="48" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">08. OPTICAL PRISM</text>
  </g>
  <!-- 9. Solar Chronometer -->
  <g transform="translate(660, 420)">
    <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5" />
    <circle cx="0" cy="0" r="26" fill="#0f172a" stroke="#ff5e00" stroke-width="2" />
    <circle cx="0" cy="0" r="20" fill="none" stroke="#f59e0b" stroke-width="1" stroke-dasharray="2,2" />
    <line x1="0" y1="0" x2="0" y2="-12" stroke="#ffffff" stroke-width="2" />
    <line x1="0" y1="0" x2="10" y2="6" stroke="#ff5e00" stroke-width="2" />
    <circle cx="0" cy="0" r="3" fill="#ff5e00" />
    <text x="0" y="48" fill="#94a3b8" font-family="monospace" font-size="9" text-anchor="middle">09. CHRONOMETER</text>
  </g>

  <text x="40" y="40" fill="#ff5e00" font-family="monospace" font-size="12" font-weight="700" letter-spacing="2">SYSTEM ICONS // 24PX PRECISION VECTOR ARSENAL</text>
  <text x="40" y="58" fill="#64748b" font-family="monospace" font-size="10">GRID: 2PX SUBPIXEL ALIGNMENT • CORNERS: 16PX RADIUS • REV 3.0</text>
</svg>`,
    svgContent: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" className="w-full h-full">
        <rect width="800" height="560" fill="#0f172a" />
        <g transform="translate(140, 100)">
          <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <path d="M 0 -35 L 24 5 L 12 35 L -12 35 L -24 5 Z" fill="#0f172a" stroke="#ff5e00" strokeWidth="2.5" />
          <line x1="0" y1="-35" x2="0" y2="10" stroke="#ff5e00" strokeWidth="2" />
          <circle cx="0" cy="10" r="3" fill="#ffffff" />
          <text x="0" y="48" fill="#94a3b8" fontFamily="monospace" fontSize="9" textAnchor="middle">01. FOUNTAIN NIB</text>
        </g>
        <g transform="translate(140, 260)">
          <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <path d="M -10 -30 L 10 -30 L 10 -15 L 26 25 Q 0 35 -26 25 L -10 -15 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
          <path d="M -18 12 Q 0 20 18 12 L 23 23 Q 0 32 -23 23 Z" fill="#0284c7" />
          <circle cx="0" cy="2" r="2.5" fill="#ffffff" />
          <circle cx="8" cy="-5" r="2" fill="#ffffff" opacity="0.7" />
          <text x="0" y="48" fill="#94a3b8" fontFamily="monospace" fontSize="9" textAnchor="middle">02. POTION FLASK</text>
        </g>
        <g transform="translate(140, 420)">
          <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <circle cx="0" cy="-25" r="6" fill="#ff5e00" stroke="#ffffff" strokeWidth="1.5" />
          <line x1="0" y1="-25" x2="-22" y2="30" stroke="#f59e0b" strokeWidth="2.5" />
          <line x1="0" y1="-25" x2="22" y2="30" stroke="#f59e0b" strokeWidth="2.5" />
          <path d="M -14 5 Q 0 -5 14 5" fill="none" stroke="#e2e8f0" strokeWidth="2" />
          <text x="0" y="48" fill="#94a3b8" fontFamily="monospace" fontSize="9" textAnchor="middle">03. DRAFT CALIPER</text>
        </g>
        <g transform="translate(400, 100)">
          <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <polygon points="0,-30 26,-15 26,15 0,30 -26,15 -26,-15" fill="#0f172a" stroke="#a855f7" strokeWidth="2.5" />
          <polygon points="0,-30 18,10 -18,10" fill="none" stroke="#ec4899" strokeWidth="1.5" />
          <line x1="0" y1="-30" x2="0" y2="30" stroke="#a855f7" strokeWidth="1.5" />
          <text x="0" y="48" fill="#94a3b8" fontFamily="monospace" fontSize="9" textAnchor="middle">04. ISOMETRIC D20</text>
        </g>
        <g transform="translate(400, 260)">
          <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <line x1="-25" y1="25" x2="25" y2="-25" stroke="#ff5e00" strokeWidth="4" strokeLinecap="round" />
          <line x1="-12" y1="5" x2="-5" y2="12" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
          <circle cx="-25" cy="25" r="4" fill="#fbbf24" />
          <polygon points="25,-25 28,-18 18,-28" fill="#ffffff" />
          <text x="0" y="48" fill="#94a3b8" fontFamily="monospace" fontSize="9" textAnchor="middle">05. VOXEL BLADE</text>
        </g>
        <g transform="translate(400, 420)">
          <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <rect x="-24" y="-26" width="48" height="52" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <rect x="-14" y="-26" width="28" height="20" fill="#e2e8f0" />
          <rect x="-16" y="6" width="32" height="20" fill="#334155" />
          <text x="0" y="48" fill="#94a3b8" fontFamily="monospace" fontSize="9" textAnchor="middle">06. 3.5" DISKETTE</text>
        </g>
        <g transform="translate(660, 100)">
          <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <rect x="-26" y="-20" width="52" height="40" rx="5" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
          <rect x="-18" y="-12" width="14" height="12" rx="2" fill="#f59e0b" />
          <line x1="2" y1="-8" x2="18" y2="-8" stroke="#e2e8f0" strokeWidth="1.5" />
          <line x1="2" y1="-2" x2="14" y2="-2" stroke="#e2e8f0" strokeWidth="1.5" />
          <text x="0" y="48" fill="#94a3b8" fontFamily="monospace" fontSize="9" textAnchor="middle">07. CHIP KEYCARD</text>
        </g>
        <g transform="translate(660, 260)">
          <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <polygon points="0,-28 26,20 -26,20" fill="#0f172a" stroke="#ffffff" strokeWidth="2" />
          <line x1="-40" y1="0" x2="-10" y2="0" stroke="#ffffff" strokeWidth="2" />
          <line x1="12" y1="0" x2="38" y2="-8" stroke="#ef4444" strokeWidth="1.5" />
          <line x1="12" y1="2" x2="40" y2="2" stroke="#22c55e" strokeWidth="1.5" />
          <line x1="12" y1="4" x2="38" y2="12" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="0" y="48" fill="#94a3b8" fontFamily="monospace" fontSize="9" textAnchor="middle">08. OPTICAL PRISM</text>
        </g>
        <g transform="translate(660, 420)">
          <rect x="-55" y="-55" width="110" height="110" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <circle cx="0" cy="0" r="26" fill="#0f172a" stroke="#ff5e00" strokeWidth="2" />
          <circle cx="0" cy="0" r="20" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="0" y1="0" x2="0" y2="-12" stroke="#ffffff" strokeWidth="2" />
          <line x1="0" y1="0" x2="10" y2="6" stroke="#ff5e00" strokeWidth="2" />
          <circle cx="0" cy="0" r="3" fill="#ff5e00" />
          <text x="0" y="48" fill="#94a3b8" fontFamily="monospace" fontSize="9" textAnchor="middle">09. CHRONOMETER</text>
        </g>
        <text x="40" y="40" fill="#ff5e00" fontFamily="monospace" fontSize="12" fontWeight="700" letterSpacing="2">SYSTEM ICONS // 24PX PRECISION VECTOR ARSENAL</text>
        <text x="40" y="58" fill="#64748b" fontFamily="monospace" fontSize="10">GRID: 2PX SUBPIXEL ALIGNMENT • CORNERS: 16PX RADIUS • REV 3.0</text>
      </svg>
    ),
  },
  {
    id: 'study-workspace',
    title: 'Midnight Workspace: 3AM Coffee & Code',
    category: 'character',
    categoryLabel: 'Notebook & Ink',
    date: 'Jul 2026',
    tools: 'Crosshatch Ink Fineliner & Warm Lighting',
    medium: 'Editorial Desk Vignette & Shader Glow',
    tags: ['workspace', 'desk', 'coffee', 'notebook', 'drafting lamp', 'night owl'],
    description: 'A cozy nocturnal desk vignette: incandescent architect lamp casting a warm cone of amber light over open graph paper notebooks, mechanical keyboard, dipping inkwell, and steaming pour-over coffee.',
    palette: [
      { hex: '#1c1917', name: 'Nocturnal Stone' },
      { hex: '#fef3c7', name: 'Incandescent Amber' },
      { hex: '#ea580c', name: 'Warm Lamp Glow' },
      { hex: '#78716c', name: 'Graph Paper Slate' },
      { hex: '#ffffff', name: 'Paper White' },
    ],
    dimensions: '800 × 560 px',
    aspectRatio: '10 / 7',
    svgString: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" width="100%" height="100%">
  <defs>
    <radialGradient id="lampCone" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#fef3c7" stop-opacity="0.9" />
      <stop offset="45%" stop-color="#fde68a" stop-opacity="0.35" />
      <stop offset="100%" stop-color="#1c1917" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="800" height="560" fill="#1c1917" />
  
  <!-- Desk Surface Plane -->
  <polygon points="40,320 760,320 800,560 0,560" fill="#292524" stroke="#44403c" stroke-width="2" />
  
  <!-- Architect Drafting Lamp -->
  <!-- Lamp Base -->
  <ellipse cx="200" cy="360" rx="35" ry="12" fill="#44403c" stroke="#78716c" stroke-width="2" />
  <!-- Articulated Arms -->
  <line x1="200" y1="360" x2="170" y2="240" stroke="#d6d3d1" stroke-width="5" stroke-linecap="round" />
  <circle cx="170" cy="240" r="7" fill="#ea580c" />
  <line x1="170" y1="240" x2="260" y2="150" stroke="#d6d3d1" stroke-width="5" stroke-linecap="round" />
  <circle cx="260" cy="150" r="7" fill="#ea580c" />
  <!-- Lamp Shade Cone -->
  <polygon points="260,150 240,195 320,180" fill="#ea580c" stroke="#c2410c" stroke-width="2" />
  <!-- Warm Light Cone Projection -->
  <polygon points="275,188 120,530 680,480" fill="url(#lampCone)" />

  <!-- Open Graph Paper Notebook on Desk -->
  <polygon points="320,360 560,350 600,480 340,490" fill="#fdfbf7" stroke="#0c0a09" stroke-width="2.5" />
  <!-- Notebook Spine -->
  <line x1="460" y1="355" x2="470" y2="485" stroke="#a8a29e" stroke-width="2" stroke-dasharray="3,3" />
  <!-- Hand-drawn Math Curves on Left Page -->
  <path d="M 355 420 Q 390 380 435 440" fill="none" stroke="#0284c7" stroke-width="2" />
  <line x1="350" y1="440" x2="445" y2="440" stroke="#78716c" stroke-width="1" />
  <line x1="390" y1="380" x2="390" y2="460" stroke="#78716c" stroke-width="1" />
  <!-- Code Notes on Right Page -->
  <line x1="485" y1="380" x2="570" y2="380" stroke="#0c0a09" stroke-width="2" />
  <line x1="485" y1="395" x2="550" y2="395" stroke="#0c0a09" stroke-width="1.5" />
  <line x1="485" y1="410" x2="580" y2="410" stroke="#ea580c" stroke-width="1.5" />
  <line x1="485" y1="425" x2="530" y2="425" stroke="#0c0a09" stroke-width="1.5" />

  <!-- Fountain Pen Resting on Notebook -->
  <line x1="330" y1="470" x2="420" y2="420" stroke="#1e293b" stroke-width="4" stroke-linecap="round" />
  <polygon points="420,420 430,415 425,425" fill="#f59e0b" />

  <!-- Steaming Coffee Ceramic Mug -->
  <rect x="630" y="380" width="45" height="55" rx="6" fill="#f5f5f4" stroke="#0c0a09" stroke-width="2" />
  <path d="M 675 392 Q 695 405 675 420" fill="none" stroke="#0c0a09" stroke-width="3" />
  <ellipse cx="652" cy="385" rx="20" ry="7" fill="#451a03" />
  <!-- Delicate Steam Trails -->
  <path d="M 648 375 Q 640 355 650 340 T 645 320" fill="none" stroke="#fef3c7" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />
  <path d="M 658 375 Q 665 355 655 340 T 662 320" fill="none" stroke="#fef3c7" stroke-width="1.5" stroke-linecap="round" opacity="0.6" />

  <text x="40" y="40" fill="#f59e0b" font-family="monospace" font-size="12" font-weight="700" letter-spacing="2">NOCTURNE // 3AM DESK STUDY VIGNETTE</text>
  <text x="40" y="58" fill="#78716c" font-family="monospace" font-size="10">SOURCE: 60W TUNGSTEN FILAMENT • INK: CARBONE NOIR • POUR-OVER ETHIOPIA</text>
</svg>`,
    svgContent: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 560" className="w-full h-full">
        <defs>
          <radialGradient id="lampCone" cx="30%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#fde68a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1c1917" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="800" height="560" fill="#1c1917" />
        <polygon points="40,320 760,320 800,560 0,560" fill="#292524" stroke="#44403c" strokeWidth="2" />
        <ellipse cx="200" cy="360" rx="35" ry="12" fill="#44403c" stroke="#78716c" strokeWidth="2" />
        <line x1="200" y1="360" x2="170" y2="240" stroke="#d6d3d1" strokeWidth="5" strokeLinecap="round" />
        <circle cx="170" cy="240" r="7" fill="#ea580c" />
        <line x1="170" y1="240" x2="260" y2="150" stroke="#d6d3d1" strokeWidth="5" strokeLinecap="round" />
        <circle cx="260" cy="150" r="7" fill="#ea580c" />
        <polygon points="260,150 240,195 320,180" fill="#ea580c" stroke="#c2410c" strokeWidth="2" />
        <polygon points="275,188 120,530 680,480" fill="url(#lampCone)" />
        <polygon points="320,360 560,350 600,480 340,490" fill="#fdfbf7" stroke="#0c0a09" strokeWidth="2.5" />
        <line x1="460" y1="355" x2="470" y2="485" stroke="#a8a29e" strokeWidth="2" strokeDasharray="3,3" />
        <path d="M 355 420 Q 390 380 435 440" fill="none" stroke="#0284c7" strokeWidth="2" />
        <line x1="350" y1="440" x2="445" y2="440" stroke="#78716c" strokeWidth="1" />
        <line x1="390" y1="380" x2="390" y2="460" stroke="#78716c" strokeWidth="1" />
        <line x1="485" y1="380" x2="570" y2="380" stroke="#0c0a09" strokeWidth="2" />
        <line x1="485" y1="395" x2="550" y2="395" stroke="#0c0a09" strokeWidth="1.5" />
        <line x1="485" y1="410" x2="580" y2="410" stroke="#ea580c" strokeWidth="1.5" />
        <line x1="485" y1="425" x2="530" y2="425" stroke="#0c0a09" strokeWidth="1.5" />
        <line x1="330" y1="470" x2="420" y2="420" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
        <polygon points="420,420 430,415 425,425" fill="#f59e0b" />
        <rect x="630" y="380" width="45" height="55" rx="6" fill="#f5f5f4" stroke="#0c0a09" strokeWidth="2" />
        <path d="M 675 392 Q 695 405 675 420" fill="none" stroke="#0c0a09" strokeWidth="3" />
        <ellipse cx="652" cy="385" rx="20" ry="7" fill="#451a03" />
        <path d="M 648 375 Q 640 355 650 340 T 645 320" fill="none" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <path d="M 658 375 Q 665 355 655 340 T 662 320" fill="none" stroke="#fef3c7" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        <text x="40" y="40" fill="#f59e0b" fontFamily="monospace" fontSize="12" fontWeight="700" letterSpacing="2">NOCTURNE // 3AM DESK STUDY VIGNETTE</text>
        <text x="40" y="58" fill="#78716c" fontFamily="monospace" fontSize="10">SOURCE: 60W TUNGSTEN FILAMENT • INK: CARBONE NOIR • POUR-OVER ETHIOPIA</text>
      </svg>
    ),
  },
];
