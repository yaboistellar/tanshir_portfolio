import React from 'react';

export interface IllustrationItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  date: string;
  tools: string;
  medium: string;
  tags: string[];
  description: string;
  palette: { hex: string; name: string }[];
  dimensions: string;
  aspectRatio: string;
  imageUrl: string;
  imagePosition?: string;
  svgContent?: React.ReactNode;
  svgString?: string;
}

export const ILLUSTRATIONS: IllustrationItem[] = [
  {
    id: 'unity-master',
    title: 'Unity — Flag on the Lunar Horizon',
    category: 'paintings',
    categoryLabel: 'Digital Painting & Canvas',
    date: 'Oct 2026',
    tools: 'Digital Canvas & Freehand Stylus',
    medium: 'Digital Painting, Starfield & Ink',
    tags: ['unity', 'moon', 'space', 'earth', 'lunar landing', 'stars'],
    description: 'A bold cosmic composition depicting a white flag marked "UNITY" planted firmly into the lunar regolith. Looking outward from the moon\'s cratered horizon, planet Earth hangs suspended within a deep, star-studded cosmic void.',
    palette: [
      { hex: '#050a24', name: 'Deep Space Navy' },
      { hex: '#16a34a', name: 'Biosphere Green' },
      { hex: '#1d4ed8', name: 'Pacific Ocean Blue' },
      { hex: '#c5c8d0', name: 'Lunar Regolith Gray' },
      { hex: '#787e8b', name: 'Crater Shadow' },
      { hex: '#ffffff', name: 'Unity Pure White' },
    ],
    dimensions: '482 × 1024 px',
    aspectRatio: '9 / 16',
    imageUrl: './images/unity-artwork.jpg',
    imagePosition: 'center center',
  },
  {
    id: 'unity-flag-study',
    title: 'Unity — The Flag & Lunar Surface',
    category: 'studies',
    categoryLabel: 'Detail Study',
    date: 'Oct 2026',
    tools: 'Digital Ink & Surface Brush',
    medium: 'Hand-Lettering & Surface Study',
    tags: ['unity flag', 'hand-drawn', 'lunar surface', 'craters'],
    description: 'A focused perspective on the white flag with hand-lettered "UNITY" lettering, planted in the lunar soil beside moon craters and charcoal shadows.',
    palette: [
      { hex: '#ffffff', name: 'Flag White' },
      { hex: '#1f2937', name: 'Charcoal Pole' },
      { hex: '#c5c8d0', name: 'Lunar Gray' },
      { hex: '#787e8b', name: 'Crater Basalt' },
      { hex: '#050a24', name: 'Deep Space' },
    ],
    dimensions: '482 × 1024 px',
    aspectRatio: '4 / 5',
    imageUrl: './images/unity-artwork.jpg',
    imagePosition: 'center bottom',
  },
  {
    id: 'unity-earth-orbit',
    title: 'Unity — Earth Floating in Deep Space',
    category: 'space',
    categoryLabel: 'Space & Celestial',
    date: 'Oct 2026',
    tools: 'Atmospheric Wash & Stippling',
    medium: 'Planetary Atmosphere Study',
    tags: ['earth', 'deep space', 'atmosphere', 'continents'],
    description: 'A celestial study of Earth with green continents, oceanic blue, and cloud formations glowing against the blackness of deep space.',
    palette: [
      { hex: '#16a34a', name: 'Continents Green' },
      { hex: '#1d4ed8', name: 'Ocean Blue' },
      { hex: '#38bdf8', name: 'Atmosphere Cyan' },
      { hex: '#f8fafc', name: 'Cloud White' },
      { hex: '#050a24', name: 'Space Void' },
    ],
    dimensions: '482 × 1024 px',
    aspectRatio: '4 / 5',
    imageUrl: './images/unity-artwork.jpg',
    imagePosition: 'center top',
  },
  {
    id: 'unity-starfield',
    title: 'Unity — The Cosmic Star Dust',
    category: 'space',
    categoryLabel: 'Space & Celestial',
    date: 'Oct 2026',
    tools: 'Stardust Dispersion & Stippling',
    medium: 'Starlight & Cosmic Field',
    tags: ['starfield', 'cosmos', 'stardust', 'deep void'],
    description: 'Dense starfield clusters and cosmic dust scattering between the lunar horizon and the distant home world.',
    palette: [
      { hex: '#050a24', name: 'Cosmic Navy' },
      { hex: '#ffffff', name: 'Starlight White' },
      { hex: '#93c5fd', name: 'Stellar Glow' },
      { hex: '#020617', name: 'Abyssal Black' },
    ],
    dimensions: '482 × 1024 px',
    aspectRatio: '3 / 4',
    imageUrl: './images/unity-artwork.jpg',
    imagePosition: 'center 40%',
  },
  {
    id: 'unity-canvas-full',
    title: 'Unity — Complete Vertical Canvas',
    category: 'paintings',
    categoryLabel: 'Digital Painting & Canvas',
    date: 'Oct 2026',
    tools: 'Full-Scale Digital Canvas',
    medium: 'Vertical Panoramic Illustration',
    tags: ['vertical', 'complete artwork', 'unity', 'space'],
    description: 'The full unabridged vertical composition from lunar surface to planetary orbit, showing the entire journey from moon to Earth.',
    palette: [
      { hex: '#050a24', name: 'Deep Space Navy' },
      { hex: '#16a34a', name: 'Biosphere Green' },
      { hex: '#1d4ed8', name: 'Ocean Blue' },
      { hex: '#c5c8d0', name: 'Regolith Gray' },
      { hex: '#ffffff', name: 'Pure White' },
    ],
    dimensions: '482 × 1024 px',
    aspectRatio: '482 / 1024',
    imageUrl: './images/unity-artwork.jpg',
    imagePosition: 'center center',
  },
  {
    id: 'unity-ink-texture',
    title: 'Unity — Brushwork & Ink Texture',
    category: 'studies',
    categoryLabel: 'Detail Study',
    date: 'Oct 2026',
    tools: 'Textured Brush & Inking',
    medium: 'Tactile Ink & Brush Strokes',
    tags: ['texture', 'brushwork', 'tactile', 'hand-painted'],
    description: 'Close examination of the organic brush textures, hand-lettered ink contours, and expressive stippling across the canvas.',
    palette: [
      { hex: '#ffffff', name: 'Flag White' },
      { hex: '#787e8b', name: 'Texture Gray' },
      { hex: '#050a24', name: 'Deep Space' },
      { hex: '#1d4ed8', name: 'Pigment Blue' },
    ],
    dimensions: '482 × 1024 px',
    aspectRatio: '1 / 1',
    imageUrl: './images/unity-artwork.jpg',
    imagePosition: 'center 70%',
  },
];
