export const ceramicProDealerStatus = {
  primary: 'Ceramic Pro Certified Installer',
  supporting: ['Ceramic Pro Direct Dealer', 'Ceramic Pro Authorized Dealer'],
} as const;

export const ceramicProPaintPackages = [
  {
    id: 'gold',
    name: 'Gold',
    category: 'Exterior paint package',
    summary:
      'Four layers of Ceramic Pro 9H plus Top Coat, with listed glass, exterior-plastic and wheel-face coverage.',
    warranty: 'Lifetime manufacturer warranty tier',
  },
  {
    id: 'silver',
    name: 'Silver',
    category: 'Exterior paint package',
    summary:
      'One layer of Ceramic Pro 9H plus Top Coat, with listed glass, exterior-plastic and wheel-face coverage.',
    warranty: '5-year manufacturer warranty tier',
  },
  {
    id: 'bronze',
    name: 'Bronze',
    category: 'Exterior paint package',
    summary:
      'Ceramic Pro Top Coat package with listed windshield, exterior-plastic and wheel-face coverage.',
    warranty: '2-year manufacturer warranty tier',
  },
  {
    id: 'sport',
    name: 'Sport',
    category: 'Exterior paint package',
    summary:
      'Ceramic Pro Sport applied to listed exterior paint, headlight and plastic surfaces, with glass and wheel coverage.',
    warranty: '6-month manufacturer warranty tier',
  },
] as const;

export const ceramicProSurfaceOfferings = [
  {
    id: 'glass',
    name: 'Glass',
    category: 'Exterior glass',
    summary:
      'A glass-specific hydrophobic coating designed to help water bead and move from the surface.',
  },
  {
    id: 'wheel-caliper',
    name: 'Wheel & Caliper',
    category: 'Wheels and calipers',
    summary:
      'A heat-area coating intended to reduce brake-dust adhesion and simplify routine cleaning.',
  },
  {
    id: 'lux-interior',
    name: 'LUX Interior',
    category: 'Interior surfaces',
    summary:
      'Hydrophobic and stain-resistant protection for compatible flexible and hard interior surfaces.',
  },
  {
    id: 'leather-textile',
    name: 'Leather/Textile',
    category: 'Interior materials',
    summary:
      'Material-specific protection intended to resist common liquid and contaminant staining without changing normal feel.',
    warranty: '2-year manufacturer warranty',
  },
] as const;

export const ceramicProResources = [
  {
    label: 'Official Ceramic Pro coating overview',
    href: 'https://ceramicpro.com/ceramic-coatings/',
  },
  {
    label: 'Official Ceramic Pro LUX overview',
    href: 'https://ceramicpro.com/ceramic-pro-lux/',
  },
  {
    label: 'Official package build sheets',
    href: 'https://brandfolder.com/s/j969bj5px7n7sf9zs8rph64m',
  },
  {
    label: 'Current MAP pricing guide',
    href: 'https://brandfolder.com/s/3qf3s5hg34q9bm7cbmh3b',
  },
  {
    label: 'Ceramic Pro warranty documents',
    href: 'https://ceramicpro.com/warranty/',
  },
  {
    label: 'Ceramic Pro aftercare guidance',
    href: 'https://ceramicpro.com/aftercare/',
  },
] as const;

export const ceramicProPpfCompatibility =
  'Ceramic Pro PPF & Vinyl coating may be applied over LLumar paint protection film. Its warranty does not extend beyond the warranty term of the LLumar film underneath.';
