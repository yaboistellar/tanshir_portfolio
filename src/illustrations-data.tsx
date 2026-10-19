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
    id: 'unity',
    title: 'Unity — Flag on the Lunar Horizon',
    category: 'paintings',
    categoryLabel: 'Original Digital Artwork',
    date: 'Oct 2026',
    tools: 'Digital Canvas & Freehand Stylus',
    medium: 'Digital Painting, Starfield & Ink',
    tags: ['unity', 'moon', 'space', 'earth', 'lunar landing', 'stars', 'original art'],
    description: 'A bold cosmic composition depicting a white flag inscribed with "UNITY" planted firmly into the lunar regolith. Looking outward across the cratered moon horizon, planet Earth hangs suspended within a deep, star-studded cosmic void.',
    palette: [
      { hex: '#050a24', name: 'Deep Space Navy' },
      { hex: '#16a34a', name: 'Biosphere Green' },
      { hex: '#1d4ed8', name: 'Pacific Ocean Blue' },
      { hex: '#c5c8d0', name: 'Lunar Regolith Gray' },
      { hex: '#787e8b', name: 'Crater Shadow' },
      { hex: '#ffffff', name: 'Unity Pure White' },
    ],
    dimensions: '482 × 1024 px',
    aspectRatio: '482 / 720',
    imageUrl: './images/unity-artwork.jpg',
    imagePosition: 'center center',
  },
];
