export const detailingQuoteTiers = [
  {
    id: 'tier-1',
    name: 'Tier 1',
    label: 'Maintenance refresh',
    meta: 'Starting at $100 · 60–90 min',
    description:
      'A focused interior and exterior reset for a well-maintained vehicle.',
  },
  {
    id: 'tier-2',
    name: 'Tier 2',
    label: 'Most popular',
    meta: 'Starting at $150 · about 120 min',
    description:
      'Steam cleaning, paint decontamination and wax protection for a more complete reset.',
  },
  {
    id: 'tier-3',
    name: 'Tier 3',
    label: 'Complete makeover',
    meta: 'Starting at $350 · about 240 min',
    description:
      'The deepest published interior and exterior detailing package.',
  },
  {
    id: 'tier-4',
    name: 'Tier 4',
    label: 'Interior only',
    meta: 'Starting at $150 · timing confirmed',
    description:
      'A dedicated deep interior package without the exterior service.',
  },
] as const;

export const mobileDetailingQuoteTiers = [
  {
    id: 'path-1',
    name: 'Maintenance Visit',
    label: 'Regular care',
    meta: 'Price confirmed after address review',
    description:
      'For vehicles already in good condition that need consistent upkeep.',
  },
  {
    id: 'path-2',
    name: 'Full Mobile Reset',
    label: 'Deeper clean',
    meta: 'Price confirmed after address review',
    description:
      'For a vehicle needing a more complete interior and exterior service.',
  },
  {
    id: 'path-3',
    name: 'Recurring & Fleet',
    label: 'Ongoing plan',
    meta: 'Price confirmed after address review',
    description:
      'A repeatable visit plan for households, businesses and compatible fleets.',
  },
] as const;

export const detailingAddOns = [
  { id: 'shampoo-seats', name: 'Shampoo seats', price: 50 },
  { id: 'heavy-pet-hair', name: 'Heavy pet hair', price: 69 },
  { id: 'stain-spill-treatment', name: 'Stain or spill treatment', price: 50 },
  { id: 'bio-cleaning', name: 'Bio cleaning', price: 50 },
  { id: 'clay-bar-treatment', name: 'Clay-bar treatment', price: 50 },
  { id: 'headlight-restoration', name: 'Headlight restoration', price: 70 },
  { id: 'shampoo-carpets', name: 'Shampoo carpets', price: 50 },
  { id: 'light-pet-hair', name: 'Light pet hair', price: 29 },
  { id: 'headliner-cleaning', name: 'Headliner cleaning', price: 50 },
  { id: 'ozone-odor-treatment', name: 'Ozone odor treatment', price: 50 },
  { id: 'engine-bay-detail', name: 'Engine-bay detail', price: 50 },
] as const;

export type QuoteTierOption = {
  id: string;
  name: string;
  label: string;
  meta: string;
  description: string;
};

export function quoteTierOptionsForService(
  service: string,
): readonly QuoteTierOption[] {
  if (service === 'detailing') return detailingQuoteTiers;
  if (service === 'mobile-detailing') return mobileDetailingQuoteTiers;
  return [];
}

export function resolveQuoteAddOns(value: unknown) {
  const requested = new Set(
    (Array.isArray(value) ? value : [])
      .filter((id): id is string => typeof id === 'string')
      .slice(0, detailingAddOns.length),
  );

  return detailingAddOns.filter((addOn) => requested.has(addOn.id));
}
