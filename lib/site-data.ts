import { sitePhotos } from '@/lib/gallery-data';
import { localTintImages } from '@/lib/local-tint-data';

export const SITE_ORIGIN =
  'https://pro-detailing.prodetailingllc1.chatgpt.site';

export const business = {
  name: 'PRO Detailing',
  legalName: 'PRO Detailing LLC',
  phone: '(202) 360-7095',
  phoneHref: '+12023607095',
  email: 'info@pro-detailing.co',
  address: '7501 Gary Rd, Manassas, VA 20109',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=7501+Gary+Rd%2C+Manassas%2C+VA+20109',
  bookingUrl: 'https://pro-detailing.co/booking/',
  instagram: 'https://www.instagram.com/pro_detailingcrew',
  facebook: 'https://www.facebook.com/prodetailingcrew',
  google: 'https://maps.app.goo.gl/oU1kDUrJY6wh1YBR7',
} as const;

export const services = [
  {
    id: 'tint',
    step: '01',
    name: 'LLumar Window Tint',
    short: 'Heat, glare and UV—controlled at the glass.',
    description:
      'Compare confirmed LLumar CTX, IRX and AIR films, preview shade on a vehicle, then get a recommendation based on your glass and driving.',
    href: '/our-services/window-tinting',
    cta: 'Explore LLumar tint',
    image: '/gallery/white-suv-profile.webp',
    mark: '/brand/pro-tints.png',
    facts: [
      'CTX · IRX · AIR',
      'Vehicle-specific guidance',
      'Appearance preview',
    ],
  },
  {
    id: 'ceramic',
    step: '02',
    name: 'Ceramic Pro Coating',
    short: 'Deeper gloss. Easier maintenance. Honest limits.',
    description:
      'Paint is inspected and prepared before a Ceramic Pro coating is selected. We explain what coating helps with—and what still needs film.',
    href: '/our-services/ceramic-coating',
    cta: 'Explore ceramic coating',
    image: '/gallery/glossy-black-coupe.webp',
    mark: '/brand/pro-ceramic.png',
    facts: ['Paint inspection', 'Surface preparation', 'Aftercare plan'],
  },
  {
    id: 'ppf',
    step: '03',
    name: 'Paint Protection Film',
    short: 'A physical barrier where road damage lands first.',
    description:
      'Choose targeted front-end or broader coverage after an in-person inspection. Product specifics are confirmed before your quote—not guessed online.',
    href: '/our-services/paint-protection-film',
    cta: 'Ask about PPF',
    image: '/gallery/polished-suv-front.webp',
    mark: '/brand/pro-ppf.png',
    facts: ['Coverage consultation', 'Panel-specific fit', 'Clear finish'],
  },
  {
    id: 'detail',
    step: '04',
    name: 'Interior & Exterior Detail',
    short: 'A true reset, down to the details washes miss.',
    description:
      'Decontaminated exterior surfaces, carefully cleaned cabin materials, clear glass and an inspection-led finish for real daily vehicles.',
    href: '/our-services/auto-detailing',
    cta: 'Plan your detail',
    image: '/gallery/foam-covered-saloon.webp',
    mark: '/brand/pro-detailing.png',
    facts: [
      'Interior reset',
      'Exterior decontamination',
      'Studio or mobile consultation',
    ],
  },
] as const;

export const filmLines = [
  {
    id: 'ctx',
    name: 'CTX',
    category: 'Ceramic',
    summary:
      'Ceramic performance for everyday comfort, glare control and a clean neutral appearance.',
    shades: [
      { id: 'ctx-05', label: 'CTX 05', vlt: 5 },
      { id: 'ctx-15', label: 'CTX 15', vlt: 20 },
      { id: 'ctx-25', label: 'CTX 25', vlt: 28 },
      { id: 'ctx-30', label: 'CTX 30', vlt: 34 },
      { id: 'ctx-35', label: 'CTX 35', vlt: 37 },
      { id: 'ctx-40', label: 'CTX 40', vlt: 44 },
      { id: 'ctx-50', label: 'CTX 50', vlt: 55 },
    ],
  },
  {
    id: 'irx',
    name: 'IRX',
    category: 'Nano-ceramic',
    summary:
      'Advanced infrared-focused ceramic technology for drivers prioritizing cabin comfort.',
    shades: [
      { id: 'irx-05', label: 'IRX 05', vlt: 6 },
      { id: 'irx-15', label: 'IRX 15', vlt: 20 },
      { id: 'irx-25', label: 'IRX 25', vlt: 26 },
      { id: 'irx-30', label: 'IRX 30', vlt: 33 },
      { id: 'irx-35', label: 'IRX 35', vlt: 39 },
      { id: 'irx-40', label: 'IRX 40', vlt: 42 },
      { id: 'irx-50', label: 'IRX 50', vlt: 54 },
    ],
  },
  {
    id: 'air',
    name: 'AIR',
    category: 'Virtually clear ceramic',
    summary:
      'Light ceramic film for drivers who want protection with minimal visible darkening.',
    shades: [
      { id: 'air-80', label: 'AIR 80', vlt: 77 },
      { id: 'air-90', label: 'AIR 90', vlt: 84 },
    ],
  },
] as const;

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  group: 'current-site' | 'owner-c63' | 'local-tint';
};

const currentSiteGallery: GalleryItem[] = Object.values(sitePhotos).map(
  (photo) => ({
    id: photo.id,
    src: `/gallery/${photo.id}.webp`,
    alt: photo.alt,
    caption: photo.caption,
    width: photo.width,
    height: photo.height,
    group: 'current-site',
  }),
);

const c63Gallery: GalleryItem[] = [
  {
    id: 'owner-c63-front',
    src: '/c63/IMG_4159.jpeg',
    alt: 'Front view of a white Mercedes-AMG C63 with a gloss carbon-fibre hood outside the studio.',
    caption: 'The owner’s C63, carbon hood detail.',
    width: 3800,
    height: 4492,
    group: 'owner-c63',
  },
  {
    id: 'owner-c63-night',
    src: '/c63/IMG_0437.jpeg',
    alt: 'White Mercedes-AMG C63 photographed at night beside two dark vehicles.',
    caption: 'C63 after dark.',
    width: 4032,
    height: 3024,
    group: 'owner-c63',
  },
  {
    id: 'owner-c63-profile',
    src: '/c63/IMG_2082.jpeg',
    alt: 'White Mercedes-AMG C63 in side profile with black wheels, tinted glass and a rear wing.',
    caption: 'White C63 in full profile.',
    width: 4032,
    height: 3024,
    group: 'owner-c63',
  },
  {
    id: 'owner-c63-studio',
    src: '/c63/IMG_5126.jpeg',
    alt: 'White Mercedes-AMG C63 viewed from above outside an automotive studio at sunset.',
    caption: 'C63 at the studio near sunset.',
    width: 5712,
    height: 4284,
    group: 'owner-c63',
  },
  {
    id: 'owner-c63-night-front',
    src: '/c63/IMG_0558.jpeg',
    alt: 'White Mercedes-AMG C63 with a carbon-fibre hood photographed under bright lights at night.',
    caption: 'Carbon and white under night lighting.',
    width: 5712,
    height: 4284,
    group: 'owner-c63',
  },
  {
    id: 'owner-c63-sunset',
    src: '/c63/IMG_9260.jpeg',
    alt: 'White Mercedes-AMG C63 parked below a pink and blue sunset sky.',
    caption: 'C63 under a Northern Virginia sunset.',
    width: 5712,
    height: 4284,
    group: 'owner-c63',
  },
];

const localTintGallery: GalleryItem[] = localTintImages.map((photo, index) => ({
  id: `local-tint-${index + 1}`,
  ...photo,
  group: 'local-tint',
}));

export const galleryItems = [
  ...currentSiteGallery,
  ...localTintGallery,
  ...c63Gallery,
];

export const serviceAreas = [
  'Manassas',
  'Centreville',
  'Fairfax',
  'Chantilly',
  'Vienna',
  'Reston',
  'Herndon',
  'Sterling',
  'Ashburn',
  'Leesburg',
] as const;

export const processSteps = [
  [
    '01',
    'Consult',
    'We inspect the vehicle, listen to how you use it and identify the real priority.',
  ],
  [
    '02',
    'Configure',
    'Film, shade, coverage and finish are selected from confirmed options.',
  ],
  [
    '03',
    'Prepare',
    'Glass and paint are cleaned, decontaminated and inspected before installation.',
  ],
  [
    '04',
    'Install',
    'The selected system is fitted carefully in the controlled studio environment.',
  ],
  [
    '05',
    'Quality check',
    'Lighting, edges, finish and function are checked before handoff.',
  ],
  [
    '06',
    'Aftercare',
    'You leave with clear cure-time, washing and maintenance guidance.',
  ],
] as const;

export const reviews = [
  {
    name: 'Ronnie Clark',
    service: 'Window tint',
    quote:
      'Great tint work and helpful guidance on Northern Virginia tint rules.',
  },
  {
    name: 'Wendell Bartee',
    service: 'Window tint',
    quote:
      'The customer service stood out, and the finished car looked amazing.',
  },
  {
    name: 'Carol Ojeda-Muro',
    service: 'Full detail',
    quote:
      'Professional from start to finish—the car looked brand new at pickup.',
  },
] as const;
