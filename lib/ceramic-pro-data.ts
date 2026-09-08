export const ceramicProDealerStatus = {
  primary: 'Ceramic Pro Certified Installer',
  supporting: ['Ceramic Pro Direct Dealer', 'Ceramic Pro Authorized Dealer'],
} as const;

export const ceramicProPaintPackages = [
  { id: 'gold', name: 'Gold', category: 'Exterior paint package' },
  { id: 'silver', name: 'Silver', category: 'Exterior paint package' },
  { id: 'bronze', name: 'Bronze', category: 'Exterior paint package' },
  { id: 'sport', name: 'Sport', category: 'Exterior paint package' },
] as const;

export const ceramicProSurfaceOfferings = [
  { id: 'glass', name: 'Glass', category: 'Exterior glass' },
  {
    id: 'wheel-caliper',
    name: 'Wheel & Caliper',
    category: 'Wheels and calipers',
  },
  { id: 'lux-interior', name: 'LUX Interior', category: 'Interior surfaces' },
  {
    id: 'leather-textile',
    name: 'Leather/Textile',
    category: 'Interior materials',
    warranty: '2-year manufacturer warranty',
  },
] as const;

export const ceramicProResources = [
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
