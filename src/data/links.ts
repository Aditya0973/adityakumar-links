import type { LinkItem } from '../types';

export const linksData: LinkItem[] = [
  {
    id: 'portfolio',
    title: 'Main Portfolio',
    subtitle: 'Design Case Studies & UX Architecture',
    url: 'https://adityakumar.framer.website/',
    humorDesc: 'Where the polished case studies live. 99% auto-layout mastery, 1% panic over 4px padding, and 0 dropped frames.',
    category: 'Case Studies',
    badge: 'Framer • 60 FPS',
    badgeColor: 'bg-[#FD601A] text-white',
    accentColor: '#FD601A',
    bgLightColor: '#FFF5F0',
    iconName: 'sparkles',
    stats: {
      label: 'Design System',
      value: '100% Tokenized'
    },
    tags: ['Framer', 'ProductDesign', 'UXResearch', 'DesignSystems']
  },
  {
    id: 'studio',
    title: 'Crafted Co. Products',
    subtitle: 'Shipped Apps, Product Store & Design Journal',
    url: 'https://crafted-co.vercel.app/',
    humorDesc: 'Where my code turns into actual products. App store to explore my apps, product teardowns, and design-engineering journals.',
    category: 'Product Store & Apps',
    badge: 'Live Products & Store',
    badgeColor: 'bg-[#8B5CF6] text-white',
    accentColor: '#8B5CF6',
    bgLightColor: '#F5F3FF',
    iconName: 'code',
    stats: {
      label: 'Store Status',
      value: 'Apps Ready'
    },
    tags: ['AppStore', 'DigitalProducts', 'Journal', 'SaaS']
  },
  {
    id: 'behance',
    title: 'Behance Visual Lab',
    subtitle: 'UI/UX, Visual Design & 3D Models',
    url: 'https://www.behance.net/1c5da35f',
    humorDesc: 'Eye-candy HQ: 3D models, juicy graphic design, and Blender donuts that took 14 hours to render on a sweating GPU.',
    category: 'Visual & 3D Arts',
    badge: '3D & Graphics',
    badgeColor: 'bg-[#EC4899] text-white',
    accentColor: '#EC4899',
    bgLightColor: '#FDF2F8',
    iconName: 'palette',
    stats: {
      label: 'Renders',
      value: '4K Photoreal'
    },
    tags: ['Blender3D', 'UIUXDesign', 'BrandIdentity', 'MotionDesign']
  },
  {
    id: 'github',
    title: 'GitHub Repositories',
    subtitle: 'The Source Code & Secret Algorithms',
    url: 'https://github.com/Aditya0973',
    humorDesc: 'Commit log: "init" ➔ "quick tweak" ➔ "why is it broken" ➔ "fixed for real v3_final". Push to main with no fear.',
    category: 'Open Source',
    badge: 'git push --force',
    badgeColor: 'bg-[#10B981] text-white',
    accentColor: '#10B981',
    bgLightColor: '#ECFDF5',
    iconName: 'github',
    stats: {
      label: 'Branch State',
      value: 'Clean Trees'
    },
    tags: ['TypeScript', 'ViteFrontend', 'NodeJSRepos', 'DevTools']
  },
  {
    id: 'linkedin',
    title: 'LinkedIn Persona',
    subtitle: 'Corporate Synergy & Professional Alter-Ego',
    url: 'https://www.linkedin.com/in/adityakumar0973/',
    humorDesc: 'Where I wear a collared shirt, pretend to love quarterly roadmaps, and endorse connections for "breathing with passion".',
    category: 'Networking',
    badge: 'Open to Work',
    badgeColor: 'bg-[#2B66FF] text-white',
    accentColor: '#2B66FF',
    bgLightColor: '#EEF4FF',
    iconName: 'linkedin',
    stats: {
      label: 'Connections',
      value: '500+ Peers'
    },
    tags: ['ProductDesign', 'ProductStrategy', 'Leadership', 'UXStrategy']
  }
];
