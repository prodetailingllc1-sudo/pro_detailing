import { sitePhotos } from '@/lib/gallery-data';
import { localTintImages } from '@/lib/local-tint-data';

export const SITE_ORIGIN = (
  process.env.NEXT_PUBLIC_SITE_ORIGIN ??
  'https://pro-detailing.prodetailingllc1.chatgpt.site'
).replace(/\/$/, '');

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
  privacyUrl: 'https://pro-detailing.co/privacy-policy/',
  termsUrl: 'https://pro-detailing.co/terms-conditions/',
  instagram: 'https://www.instagram.com/pro_detailingcrew',
  facebook: 'https://www.facebook.com/prodetailingcrew',
  google:
    'https://www.google.com/maps/place/Pro+Detailing+-+Tinting/@38.79913,-77.505505,17z/data=!4m8!3m7!1s0x206936eb6b075581:0x9e782a80c19e3227!8m2!3d38.79913!4d-77.505505!9m1!1b1!16s%2Fg%2F11krpg2kqz?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D',
} as const;

export function quoteHref(service?: string, packageChoice?: string) {
  if (!service) return '/request-quote';
  const params = new URLSearchParams({ service });
  if (packageChoice) params.set('package', packageChoice);
  return `/request-quote?${params.toString()}`;
}

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
    image: '/gallery/local-tint-white-sedan-night.webp',
    imageAlt:
      'White sport sedan with dark side glass photographed outside the studio at night.',
    mark: '/brand/pro-tints-optimized.webp',
    markWidth: 1100,
    markHeight: 204,
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
    imageAlt:
      'Gloss black BMW coupe reflecting a clear summer sky on a private driveway.',
    mark: '/brand/pro-ceramic-optimized.webp',
    markWidth: 1100,
    markHeight: 174,
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
    image: '/generated/ppf-finished-clear-v2.webp',
    imageAlt:
      'Silver performance coupe in a dark studio with a clean, gloss-finished front end.',
    mark: '/pro-mark.png',
    markWidth: 400,
    markHeight: 400,
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
    image: '/generated/interior-cockpit-finished.webp',
    imageAlt:
      'Carefully finished premium black-leather front cabin and dashboard.',
    mark: '/brand/pro-detailing-optimized.webp',
    markWidth: 1100,
    markHeight: 154,
    facts: [
      'Interior reset',
      'Exterior decontamination',
      'Vehicle-specific consultation',
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
  group: 'current-site' | 'owner-c63' | 'local-tint' | 'service-visualization';
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
    src: '/c63/IMG_4159.webp',
    alt: 'Front view of a white Mercedes-AMG C63 with a gloss carbon-fibre hood outside the studio.',
    caption: 'The owner’s C63, carbon hood detail.',
    width: 1861,
    height: 2200,
    group: 'owner-c63',
  },
  {
    id: 'owner-c63-night',
    src: '/c63/IMG_0437.webp',
    alt: 'White Mercedes-AMG C63 photographed at night beside two dark vehicles.',
    caption: 'C63 after dark.',
    width: 1650,
    height: 2200,
    group: 'owner-c63',
  },
  {
    id: 'owner-c63-profile',
    src: '/c63/IMG_2082.webp',
    alt: 'White Mercedes-AMG C63 in side profile with black wheels, tinted glass and a rear wing.',
    caption: 'White C63 in full profile.',
    width: 1650,
    height: 2200,
    group: 'owner-c63',
  },
  {
    id: 'owner-c63-studio',
    src: '/c63/IMG_5126.webp',
    alt: 'White Mercedes-AMG C63 viewed from above outside an automotive studio at sunset.',
    caption: 'C63 at the studio near sunset.',
    width: 1650,
    height: 2200,
    group: 'owner-c63',
  },
  {
    id: 'owner-c63-night-front',
    src: '/c63/IMG_0558.webp',
    alt: 'White Mercedes-AMG C63 with a carbon-fibre hood photographed under bright lights at night.',
    caption: 'Carbon and white under night lighting.',
    width: 1650,
    height: 2200,
    group: 'owner-c63',
  },
  {
    id: 'owner-c63-sunset',
    src: '/c63/IMG_9260.webp',
    alt: 'White Mercedes-AMG C63 parked below a pink and blue sunset sky.',
    caption: 'C63 under a Northern Virginia sunset.',
    width: 1650,
    height: 2200,
    group: 'owner-c63',
  },
];

const localTintGallery: GalleryItem[] = localTintImages.map((photo, index) => ({
  id: `local-tint-${index + 1}`,
  ...photo,
  group: 'local-tint',
}));

const interiorVisualizationGallery: GalleryItem[] = [
  {
    id: 'interior-cockpit-finished',
    src: '/generated/interior-cockpit-finished.webp',
    alt: 'Brand-neutral black leather front cabin shown clean and carefully finished',
    caption: 'Service visualization · complete front-cabin finish.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
  {
    id: 'interior-console-cleaning',
    src: '/generated/interior-console-cleaning.webp',
    alt: 'Gloved technician using a soft brush around a center console and air vent',
    caption: 'Service visualization · precision cleaning around controls.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
  {
    id: 'interior-rear-cabin-finished',
    src: '/generated/interior-rear-cabin-finished.webp',
    alt: 'Brand-neutral rear cabin with clean black leather, carpet and door panels',
    caption: 'Service visualization · rear-cabin reset.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
];

const expandedServiceVisualizationGallery: GalleryItem[] = [
  {
    id: 'ceramic-application-v2',
    src: '/generated/ceramic-application-v2.webp',
    alt: 'Gloved technician applying a liquid surface coating to a dark vehicle panel under inspection lights.',
    caption: 'Service visualization · careful coating application.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
  {
    id: 'ppf-installation',
    src: '/generated/ppf-installation.webp',
    alt: 'Technician positioning transparent paint protection film across the front of a silver performance coupe.',
    caption: 'Service visualization · clear-film installation.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
  {
    id: 'ppf-finished-clear-v2',
    src: '/generated/ppf-finished-clear-v2.webp',
    alt: 'Silver performance coupe with a clean gloss-finished front end in a dark studio.',
    caption: 'Service visualization · finished clear-film appearance.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
  {
    id: 'interior-detailing',
    src: '/generated/interior-detailing.webp',
    alt: 'Detailer carefully cleaning the front cabin of a premium vehicle with a soft brush and microfiber towel.',
    caption: 'Service visualization · detailed cabin care.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-car-detailing-before-selling',
    src: '/gallery/pro-service-car-detailing-before-selling.webp',
    alt: 'Technician polishing a dark grey performance sedan inside a brightly lit detailing studio.',
    caption: 'Service visualization · machine-polishing stage.',
    width: 1066,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-car-detailing-studio',
    src: '/gallery/pro-service-car-detailing-studio.webp',
    alt: 'Black luxury SUV presented under linear inspection lights in a detailing studio.',
    caption: 'Service visualization · studio finish inspection.',
    width: 1000,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-oil-fluid-check',
    src: '/gallery/pro-service-oil-fluid-check.webp',
    alt: 'Technician adding the correct service fluid beneath the open hood of a vehicle.',
    caption: 'Service visualization · fluid-level service.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-ceramic-luxury-cars',
    src: '/gallery/pro-service-ceramic-luxury-cars.webp',
    alt: 'Three dark performance vehicles reflecting geometric studio inspection lights.',
    caption: 'Service visualization · gloss and finish under inspection light.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-ceramic-truck',
    src: '/gallery/pro-service-ceramic-truck.webp',
    alt: 'Silver angular electric pickup displayed inside a premium vehicle-care studio.',
    caption: 'Service visualization · large-vehicle surface protection.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-vehicle-maintenance',
    src: '/gallery/pro-service-vehicle-maintenance.webp',
    alt: 'Technician pouring engine oil carefully into a vehicle during routine maintenance.',
    caption: 'Service visualization · routine vehicle maintenance.',
    width: 1109,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-graphene-window-tint',
    src: '/gallery/pro-service-graphene-window-tint.webp',
    alt: 'Window-film installer smoothing film on the side glass of a dark sedan.',
    caption: 'Service visualization · precision side-glass film installation.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-full-car-detail',
    src: '/gallery/pro-service-full-car-detail.webp',
    alt: 'Black performance sedan displayed on a checkered floor beneath studio lights.',
    caption: 'Service visualization · complete exterior presentation.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-interior-deep-clean',
    src: '/gallery/pro-service-interior-deep-clean.webp',
    alt: 'Bright premium vehicle cabin with clean seats, console, dashboard and carpet.',
    caption: 'Service visualization · interior deep-clean result.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-key-programming',
    src: '/gallery/pro-service-key-programming.webp',
    alt: 'Automotive technician holding a modern key fob beside diagnostic equipment.',
    caption: 'Service visualization · key and fob programming.',
    width: 1028,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-oil-change',
    src: '/gallery/pro-service-oil-change.webp',
    alt: 'Golden engine oil being poured carefully into an open engine bay.',
    caption: 'Service visualization · oil-change service.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-paint-correction',
    src: '/gallery/pro-service-paint-correction.webp',
    alt: 'White luxury SUV parked outside an automotive appearance studio.',
    caption: 'Service visualization · finish planning for a luxury SUV.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-mobile-detailing',
    src: '/gallery/pro-service-mobile-detailing.webp',
    alt: 'Silver sports coupe presented outdoors with clean reflective paintwork.',
    caption: 'Service visualization · mobile appearance-care result.',
    width: 1422,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-private-jet-cleaning',
    src: '/gallery/pro-service-private-jet-cleaning.webp',
    alt: 'Private jet positioned inside a hangar while specialists prepare exterior care.',
    caption: 'Service visualization · specialist aircraft care.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-ceramic-application',
    src: '/gallery/pro-service-ceramic-application.webp',
    alt: 'Technician machine-polishing the hood of a black performance sedan in a studio.',
    caption: 'Service visualization · surface preparation and polishing.',
    width: 800,
    height: 764,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-tire-pressure',
    src: '/gallery/pro-service-tire-pressure.webp',
    alt: 'Technician checking tire pressure on a black vehicle outdoors.',
    caption: 'Service visualization · tire pressure and condition check.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-suv-window-tint',
    src: '/gallery/pro-service-suv-window-tint.webp',
    alt: 'Black luxury SUV shown outside with dark rear privacy glass.',
    caption: 'Service visualization · SUV window-film planning.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-truck-window-tint',
    src: '/gallery/pro-service-truck-window-tint.webp',
    alt: 'Dark pickup truck presented inside a window-film studio.',
    caption: 'Service visualization · truck glass and shade planning.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-windshield-repair',
    src: '/gallery/pro-service-windshield-repair.webp',
    alt: 'White luxury sedan positioned outside an auto-glass service bay.',
    caption: 'Service visualization · windshield assessment.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'pro-service-windshield-replacement',
    src: '/gallery/pro-service-windshield-replacement.webp',
    alt: 'Two technicians working together across the windshield of a white electric sedan.',
    caption: 'Service visualization · coordinated windshield installation.',
    width: 1200,
    height: 800,
    group: 'service-visualization',
  },
  {
    id: 'service-maintenance-oil-change',
    src: '/generated/service-maintenance-oil-change.webp',
    alt: 'Technician inspecting a modern luxury sedan with its hood open in a spotless service bay.',
    caption: 'Generated service visualization · maintenance and oil change.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
  {
    id: 'service-tire-service',
    src: '/generated/service-tire-service.webp',
    alt: 'Technician safely torquing a performance wheel on a luxury vehicle in a professional service bay.',
    caption: 'Generated service visualization · tire service.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
  {
    id: 'service-auto-glass',
    src: '/generated/service-auto-glass.webp',
    alt: 'Auto-glass technician using a precision resin bridge to repair a windshield chip.',
    caption: 'Generated service visualization · auto-glass repair.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
  {
    id: 'service-key-replacement',
    src: '/generated/service-key-replacement.webp',
    alt: 'Automotive locksmith programming a modern smart key beside a luxury sedan.',
    caption: 'Generated service visualization · locksmith and car-key service.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
  {
    id: 'service-mobile-detailing',
    src: '/generated/service-mobile-detailing.webp',
    alt: 'Professional mobile detailer polishing a luxury SUV in an upscale residential driveway.',
    caption: 'Generated service visualization · mobile auto detailing.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
  {
    id: 'service-residential-window-tinting',
    src: '/generated/service-residential-window-tinting.webp',
    alt: 'Professional installer applying solar-control film to a large window inside a modern home.',
    caption: 'Generated service visualization · residential window tinting.',
    width: 1536,
    height: 1024,
    group: 'service-visualization',
  },
];

export const galleryItems = [
  ...currentSiteGallery,
  ...localTintGallery,
  ...c63Gallery,
  ...interiorVisualizationGallery,
  ...expandedServiceVisualizationGallery,
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
