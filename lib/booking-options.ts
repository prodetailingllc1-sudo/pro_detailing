export const bookingServiceOptions = [
  { id: 'detailing', label: 'Auto detailing', asset: 'vehicle' },
  { id: 'mobile-detailing', label: 'Mobile detailing', asset: 'vehicle' },
  { id: 'tint', label: 'LLumar window tint', asset: 'vehicle' },
  { id: 'ceramic', label: 'Ceramic Pro coating', asset: 'vehicle' },
  { id: 'ppf', label: 'Paint protection film', asset: 'vehicle' },
  { id: 'wrap', label: 'PRO Wraps & vehicle graphics', asset: 'vehicle' },
  { id: 'maintenance', label: 'Maintenance & oil change', asset: 'vehicle' },
  { id: 'tires', label: 'Tire service', asset: 'vehicle' },
  {
    id: 'auto-glass',
    label: 'Auto glass repair & replacement',
    asset: 'vehicle',
  },
  {
    id: 'key-replacement',
    label: 'Automotive locksmith & car keys',
    asset: 'vehicle',
  },
  {
    id: 'residential-tint',
    label: 'Residential window tint',
    asset: 'property',
  },
] as const;

export type BookingServiceId = (typeof bookingServiceOptions)[number]['id'];

export const bookingConditionOptions = [
  {
    id: 'maintenance-light',
    label: 'Maintenance / light',
    summary: 'Generally clean with light dust, fingerprints or road film.',
  },
  {
    id: 'moderate',
    label: 'Moderate buildup',
    summary: 'Visible soil, crumbs, light stains or normal daily-use buildup.',
  },
  {
    id: 'heavy-deep',
    label: 'Heavy / deep reset',
    summary:
      'Heavy soil, pet hair, set-in stains, odor or extensive contamination.',
  },
  {
    id: 'specialist-review',
    label: 'Specialist review',
    summary:
      'Mold, bodily fluids, hazardous material, damage or an unusual condition.',
  },
] as const;

export type BookingConditionId = (typeof bookingConditionOptions)[number]['id'];

const concernSets = {
  detailing: [
    ['pet-hair', 'Pet hair'],
    ['stains-spills', 'Stains or spills'],
    ['odor-smoke', 'Odor or smoke'],
    ['sand-mud', 'Sand or mud'],
    ['food-debris', 'Food or debris'],
    ['mold-biohazard', 'Mold or biohazard concern'],
    ['exterior-contaminants', 'Exterior contamination'],
    ['paint-defects', 'Visible paint defects'],
  ],
  tint: [
    ['heat', 'Cabin heat'],
    ['glare', 'Glare'],
    ['privacy', 'Privacy'],
    ['uv-fading', 'UV / interior fading'],
    ['existing-film', 'Existing film removal'],
    ['windshield', 'Windshield or brow'],
  ],
  ceramic: [
    ['swirls', 'Swirls or wash marks'],
    ['water-spots', 'Water spots'],
    ['oxidation', 'Oxidation or fading'],
    ['existing-coating', 'Existing coating'],
    ['wheels-calipers', 'Wheels or calipers'],
    ['interior-protection', 'Interior protection'],
  ],
  ppf: [
    ['rock-chips', 'Existing rock chips'],
    ['highway-driving', 'Frequent highway driving'],
    ['track-use', 'Track or performance use'],
    ['existing-film', 'Existing film'],
    ['matte-satin', 'Matte or satin finish'],
    ['paint-correction', 'Paint refinement concern'],
  ],
  wrap: [
    ['full-color-change', 'Full color change'],
    ['accent-wrap', 'Roof, hood, mirror or accent wrap'],
    ['chrome-delete', 'Chrome delete or blackout'],
    ['commercial-graphics', 'Business or fleet graphics'],
    ['existing-wrap', 'Existing wrap removal or replacement'],
    ['finish-selection', 'Gloss, satin, matte or specialty finish'],
  ],
  maintenance: [
    ['oil-service', 'Oil service'],
    ['warning-light', 'Warning light'],
    ['brakes', 'Brake concern'],
    ['fluids', 'Fluid check'],
    ['battery', 'Battery concern'],
    ['inspection', 'General inspection'],
  ],
  tires: [
    ['flat', 'Flat tire'],
    ['leak', 'Slow leak'],
    ['rotation', 'Rotation'],
    ['replacement', 'Replacement'],
    ['vibration', 'Vibration'],
    ['tpms', 'TPMS warning'],
  ],
  'auto-glass': [
    ['chip', 'Chip'],
    ['crack', 'Crack'],
    ['replacement', 'Replacement'],
    ['leak', 'Water or air leak'],
    ['adas', 'Camera / ADAS equipment'],
    ['mobile-service', 'Mobile service request'],
  ],
  'key-replacement': [
    ['lockout', 'Lockout'],
    ['lost-key', 'Lost key'],
    ['spare-key', 'Spare key'],
    ['broken-key', 'Broken key'],
    ['fob-programming', 'Fob programming'],
    ['ignition', 'Ignition concern'],
  ],
  'residential-tint': [
    ['heat', 'Heat'],
    ['glare', 'Glare'],
    ['privacy', 'Privacy'],
    ['uv-fading', 'UV / fading'],
    ['decorative', 'Decorative film'],
    ['safety-security', 'Safety / security'],
  ],
} as const;

export type BookingConcern = { id: string; label: string };

export function isBookingService(value: string): value is BookingServiceId {
  return bookingServiceOptions.some((option) => option.id === value);
}

export function bookingService(value: string | undefined) {
  const id = value && isBookingService(value) ? value : 'detailing';
  return bookingServiceOptions.find((option) => option.id === id)!;
}

export function bookingConcernsForService(
  service: BookingServiceId,
): readonly BookingConcern[] {
  const set =
    service === 'mobile-detailing'
      ? concernSets.detailing
      : concernSets[service];
  return set.map(([id, label]) => ({ id, label }));
}

export function isBookingCondition(value: string): value is BookingConditionId {
  return bookingConditionOptions.some((option) => option.id === value);
}

export function bookingNeedsAddress(service: BookingServiceId) {
  return service === 'mobile-detailing' || service === 'residential-tint';
}
