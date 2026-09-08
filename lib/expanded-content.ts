export type ExtendedService = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  title: string;
  description: string;
  serviceType: string;
  quoteService: string;
  image: string;
  imageAlt: string;
  sourceUrl?: string;
  highlights: readonly {
    title: string;
    copy: string;
  }[];
  capabilities?: readonly {
    group: string;
    items: readonly string[];
  }[];
  pathways: readonly {
    name: string;
    label: string;
    copy: string;
    includes: readonly string[];
  }[];
  process: readonly {
    title: string;
    copy: string;
  }[];
  faqs: readonly (readonly [string, string])[];
};

export const additionalServices: readonly ExtendedService[] = [
  {
    slug: 'mobile-detailing',
    name: 'Mobile Auto Detailing',
    shortName: 'Mobile detailing',
    eyebrow: 'PRO service · at your location',
    title: 'Mobile Auto Detailing Across Northern Virginia',
    description:
      'Bring professional interior and exterior care to a suitable home, office or fleet location. Availability, access, weather and the final scope are confirmed before dispatch.',
    serviceType: 'Mobile automotive detailing',
    quoteService: 'mobile-detailing',
    image: '/generated/service-mobile-detailing.webp',
    imageAlt:
      'Professional mobile detailer cleaning a luxury SUV at a residential driveway with service equipment nearby.',
    sourceUrl:
      'https://pro-detailing.co/best-mobile-car-detailing-in-northern-virginia/',
    highlights: [
      {
        title: 'Location reviewed first',
        copy: 'We confirm safe working space, access, vehicle count and any property requirements before scheduling.',
      },
      {
        title: 'Interior & exterior options',
        copy: 'Choose a maintenance visit, a deeper reset or a recurring-care conversation based on condition.',
      },
      {
        title: 'Built for real schedules',
        copy: 'Home, office and fleet requests can be evaluated across the core Northern Virginia service area.',
      },
    ],
    pathways: [
      {
        name: 'Maintenance Visit',
        label: 'Regular care',
        copy: 'For vehicles already in good condition that need consistent upkeep.',
        includes: [
          'Condition review',
          'Interior touchpoint care',
          'Exterior maintenance clean',
        ],
      },
      {
        name: 'Full Mobile Reset',
        label: 'Deeper clean',
        copy: 'For a vehicle needing a more complete interior and exterior service.',
        includes: [
          'Interior assessment',
          'Exterior decontamination plan',
          'Add-ons confirmed as needed',
        ],
      },
      {
        name: 'Recurring & Fleet',
        label: 'Ongoing plan',
        copy: 'A repeatable visit plan for households, businesses and compatible fleets.',
        includes: [
          'Vehicle count review',
          'Visit cadence',
          'Site and access planning',
        ],
      },
    ],
    process: [
      {
        title: 'Share the location',
        copy: 'Send the address, parking setup and number of vehicles.',
      },
      {
        title: 'Confirm conditions',
        copy: 'We review access, weather, utilities and service requirements.',
      },
      {
        title: 'Set the scope',
        copy: 'The package, add-ons, timing and price are confirmed.',
      },
      {
        title: 'Dispatch',
        copy: 'The team arrives for the agreed mobile service window.',
      },
    ],
    faqs: [
      [
        'Can you detail at my home or office?',
        'Yes, when the location provides a safe and suitable work area. Access and site conditions are confirmed before scheduling.',
      ],
      [
        'Is mobile detailing always available?',
        'No. Weather, location, vehicle condition and team capacity can affect availability. The studio confirms each request.',
      ],
      [
        'Can I schedule recurring visits?',
        'Recurring household, fleet and business plans can be discussed after the first service scope is reviewed.',
      ],
    ],
  },
  {
    slug: 'residential-window-tinting',
    name: 'Residential Window Tinting',
    shortName: 'Home window tint',
    eyebrow: 'Architectural film · consultation',
    title: 'Residential Window Tinting for Northern Virginia Homes',
    description:
      'Plan heat, glare, UV, privacy or decorative film around each room and glass type. Every project starts with an on-site glass and compatibility assessment.',
    serviceType: 'Residential window film consultation and installation',
    quoteService: 'residential-tint',
    image: '/generated/service-residential-window-tinting.webp',
    imageAlt:
      'Professional installer applying solar-control film to a large window inside a modern home.',
    highlights: [
      {
        title: 'Solar comfort',
        copy: 'Discuss film options intended to reduce solar heat and harsh glare in high-exposure rooms.',
      },
      {
        title: 'UV & fade strategy',
        copy: 'Add a film layer to the broader plan for protecting flooring, furnishings and artwork from solar exposure.',
      },
      {
        title: 'Privacy by room',
        copy: 'Evaluate daytime privacy, decorative and safety-film goals without treating every window the same.',
      },
    ],
    pathways: [
      {
        name: 'Solar Control',
        label: 'Heat & glare',
        copy: 'For sun-facing rooms where comfort and screen glare are the main concerns.',
        includes: [
          'Exposure review',
          'Glass compatibility check',
          'Appearance and performance comparison',
        ],
      },
      {
        name: 'Privacy & Decorative',
        label: 'Visibility control',
        copy: 'For entry glass, bathrooms, offices and rooms needing a more intentional level of privacy.',
        includes: [
          'Day/night expectation review',
          'Pattern or finish selection',
          'Room-specific recommendation',
        ],
      },
      {
        name: 'Safety Film Consultation',
        label: 'Added glass retention',
        copy: 'For homeowners evaluating a thicker film system as one part of a glass-safety plan.',
        includes: [
          'Glass and frame inspection',
          'Use-case review',
          'Product and attachment confirmation',
        ],
      },
    ],
    process: [
      {
        title: 'Room survey',
        copy: 'Identify exposure, privacy and comfort priorities by window.',
      },
      {
        title: 'Glass check',
        copy: 'Inspect glass type, condition, frame and compatibility.',
      },
      {
        title: 'Film plan',
        copy: 'Compare appearance and the confirmed manufacturer specifications.',
      },
      {
        title: 'Measure & quote',
        copy: 'Finalize measured coverage, installation plan and price.',
      },
    ],
    faqs: [
      [
        'Is automotive tint used on house windows?',
        'No. Architectural glass requires film selected for the glass assembly and application. Compatibility is checked on site.',
      ],
      [
        'Will privacy film work at night?',
        'Some reflective films provide stronger daytime privacy but not the same result after dark with interior lights on. We set that expectation before selection.',
      ],
      [
        'Do you list fixed prices online?',
        'No. Glass type, pane size, access, film and total coverage determine the project quote after measurement.',
      ],
    ],
  },
  {
    slug: 'maintenance-oil-change',
    name: 'Maintenance & Oil Change',
    shortName: 'Maintenance',
    eyebrow: 'Vehicle care · inspection-led',
    title: 'Maintenance & Oil Change in Manassas, VA',
    description:
      'Bundle routine oil, fluids, filters, brakes and diagnostic needs into a clear vehicle-specific maintenance plan. Final parts, fluids and price are confirmed by VIN and inspection.',
    serviceType: 'Automotive maintenance and oil change',
    quoteService: 'maintenance',
    image: '/generated/service-maintenance-oil-change.webp',
    imageAlt:
      'Technician inspecting a modern luxury sedan with its hood open in a spotless service bay.',
    sourceUrl: 'https://pro-detailing.co/our-services/maintenance-oil-change/',
    highlights: [
      {
        title: 'Oil & fluid services',
        copy: 'Oil and filter service, transmission drain and fill, and available coolant, brake, power-steering or engine-flush services.',
      },
      {
        title: 'Brakes & suspension',
        copy: 'Brake checks, pads and rotors, plus inspection-led shocks, struts and axle work.',
      },
      {
        title: 'Diagnostics & filters',
        copy: 'Tune-up diagnostics, induction service, cabin and engine filters, wipers and lighting support.',
      },
    ],
    capabilities: [
      {
        group: 'Oil & fluids',
        items: [
          'Synthetic-blend oil and filter',
          'Full-synthetic oil and filter',
          'Transmission drain and fill',
          'Engine, coolant and power-steering fluid services',
        ],
      },
      {
        group: 'Tires & brakes',
        items: [
          'Tire rotation',
          'Flat-tire repair assessment',
          'Four-wheel brake check and brake-fluid service',
          'Front or rear pads and rotors',
        ],
      },
      {
        group: 'Engine & induction',
        items: [
          'GDI and standard induction service',
          'Diagnostics and tune-ups',
          'Engine air-filter service',
        ],
      },
      {
        group: 'Visibility & cabin air',
        items: [
          'Wiper-blade service',
          'Headlight restoration',
          'Cabin air-filter service',
        ],
      },
      {
        group: 'Suspension & axles',
        items: [
          'Shock service',
          'Strut service',
          'Axle repair or replacement assessment',
        ],
      },
    ],
    pathways: [
      {
        name: 'Essentials Oil & Inspection',
        label: 'Maintenance pathway',
        copy: 'A practical starting point for routine oil service and a focused safety/condition review.',
        includes: [
          'Correct oil and filter confirmed by VIN',
          'Visible fluid and filter review',
          'Priority findings explained',
        ],
      },
      {
        name: 'Fluids & Filters',
        label: 'Maintenance pathway',
        copy: 'Build a vehicle-specific plan around due or condition-based fluids and filtration.',
        includes: [
          'Service-history review',
          'Fluid condition and specification check',
          'Cabin and engine filter options',
        ],
      },
      {
        name: 'Road-Ready Diagnostic',
        label: 'Maintenance pathway',
        copy: 'Start with symptoms or warning lights, then approve only the work supported by diagnosis.',
        includes: [
          'Concern intake',
          'Diagnostic direction',
          'Written next-step scope',
        ],
      },
    ],
    process: [
      {
        title: 'Identify',
        copy: 'Share the VIN, mileage, history and current concern.',
      },
      {
        title: 'Inspect',
        copy: 'Review the systems connected to the requested service.',
      },
      {
        title: 'Authorize',
        copy: 'Confirm parts, fluid specification, labor and price.',
      },
      {
        title: 'Service',
        copy: 'Complete the approved work and document next priorities.',
      },
    ],
    faqs: [
      [
        'Why is there no fixed package price?',
        'Oil capacity, parts, fluid specifications and vehicle condition vary. The studio confirms an exact scope after VIN and inspection review.',
      ],
      [
        'Can I combine maintenance with detailing?',
        'Yes, when scheduling and vehicle needs allow. Select both needs in your request so the studio can coordinate the visit.',
      ],
      [
        'Do you perform diagnostics?',
        'The current service menu includes diagnostics and tune-ups. The exact diagnostic capability for your vehicle and concern is confirmed before booking.',
      ],
    ],
  },
  {
    slug: 'tire-service',
    name: 'Tire Change, Rotation & Flat Repair',
    shortName: 'Tire service',
    eyebrow: 'Tire change · rotation · flat repair',
    title: 'Tire Change, Rotation & Flat Repair in Manassas, VA',
    description:
      'Request a tire change, rotation, flat-repair assessment or related brake check. Tire fitment, repairability and the final scope are confirmed after inspection.',
    serviceType: 'Automotive tire change, rotation and flat repair service',
    quoteService: 'tires',
    image: '/generated/service-tire-service.webp',
    imageAlt:
      'Technician safely torquing a performance wheel on a luxury vehicle in a professional service bay.',
    sourceUrl: 'https://pro-detailing.co/our-services/maintenance-oil-change/',
    highlights: [
      {
        title: 'Tire change & rotation',
        copy: 'Share the tire size and concern so fitment can be checked before an approved change or rotation.',
      },
      {
        title: 'Flat repair assessment',
        copy: 'Inspect the puncture location and tire condition before determining whether a safe repair is possible.',
      },
      {
        title: 'Brake check',
        copy: 'Evaluate visible brake wear and define pads, rotors or fluid service when indicated.',
      },
    ],
    capabilities: [
      {
        group: 'Tire care',
        items: [
          'Tread and pressure check',
          'Tire-change and fitment review',
          'Tire rotation',
          'Flat-tire repair assessment',
        ],
      },
      {
        group: 'Related brake care',
        items: [
          'Four-wheel brake check',
          'Brake-fluid service',
          'Pads and rotor assessment',
        ],
      },
    ],
    pathways: [
      {
        name: 'Tire Change or Rotation',
        label: 'Safety pathway',
        copy: 'A focused fitment and condition review before an approved tire change or rotation.',
        includes: [
          'Tread and pressure check',
          'Tire size and visible damage review',
          'Change or rotation compatibility',
        ],
      },
      {
        name: 'Flat Repair Assessment',
        label: 'Repair pathway',
        copy: 'Determine whether the puncture and tire condition support repair.',
        includes: [
          'Puncture location',
          'Sidewall and tread condition',
          'Repairability explained',
        ],
      },
      {
        name: 'Tire & Brake Safety',
        label: 'Combined pathway',
        copy: 'Coordinate tire condition with a four-wheel brake check.',
        includes: [
          'Tire inspection',
          'All-wheel brake check',
          'Priority-based recommendations',
        ],
      },
    ],
    process: [
      {
        title: 'Concern',
        copy: 'Share the symptom, warning or maintenance goal.',
      },
      {
        title: 'Inspect',
        copy: 'Review tire, wheel and related brake condition.',
      },
      {
        title: 'Confirm',
        copy: 'Explain repairability, parts and the approved scope.',
      },
      {
        title: 'Complete',
        copy: 'Perform the authorized work and final checks.',
      },
    ],
    faqs: [
      [
        'Can every flat tire be repaired?',
        'No. Puncture location, size, prior damage, age and overall tire condition determine repairability.',
      ],
      [
        'Do all vehicles use the same rotation pattern?',
        'No. Tire size, directionality, staggered fitment and manufacturer guidance can change the pattern or prevent rotation.',
      ],
      [
        'Can I request a tire change?',
        'Yes. Share the vehicle, current tire size and reason for the change. The team confirms fitment, tire availability and the final scope before booking.',
      ],
      [
        'Are tires included in the detailing package?',
        'Wheel and tire appearance care may be part of detailing, but mechanical tire inspection, rotation and repair are separate services.',
      ],
    ],
  },
  {
    slug: 'auto-glass',
    name: 'Auto Glass Repair & Replacement',
    shortName: 'Auto glass',
    eyebrow: 'Chip repair · replacement · mobile glass',
    title: 'Auto Glass Repair & Replacement in Manassas, VA',
    description:
      'Request a windshield chip or crack assessment, or replacement for front, side or rear glass. Fitment, repairability, adhesive and sensor requirements are confirmed first.',
    serviceType: 'Automotive glass repair and windshield replacement',
    quoteService: 'auto-glass',
    image: '/generated/service-auto-glass.webp',
    imageAlt:
      'Auto-glass technician using a precision resin bridge to repair a windshield chip.',
    sourceUrl: 'https://pro-detailing.co/windshield-repair-vs-replacement/',
    highlights: [
      {
        title: 'Chip & crack assessment',
        copy: 'Damage size, depth and location are reviewed before repair or replacement is recommended.',
      },
      {
        title: 'Mobile availability',
        copy: 'Eligible mobile glass requests are evaluated by location, weather and service requirements.',
      },
      {
        title: 'Insurance coordination',
        copy: 'Ask the team what documentation and assistance are available for your claim.',
      },
    ],
    pathways: [
      {
        name: 'Chip & Crack Repair',
        label: 'Repair assessment',
        copy: 'For eligible windshield chips or cracks that may be safely stabilized without replacing the glass.',
        includes: [
          'Damage size and location review',
          'Repairability assessment',
          'Repair or replacement recommendation',
        ],
      },
      {
        name: 'Windshield Replacement',
        label: 'Front glass',
        copy: 'For damage or condition requiring a complete windshield replacement.',
        includes: [
          'Glass fitment check',
          'Molding and sensor review',
          'Cure-time guidance',
        ],
      },
      {
        name: 'Side & Rear Glass',
        label: 'Body glass',
        copy: 'For broken or damaged door, quarter or back glass, with eligible mobile service confirmed by location.',
        includes: [
          'Opening and glass identification',
          'Interior debris review',
          'Fitment and mobile availability confirmation',
        ],
      },
    ],
    process: [
      {
        title: 'Identify glass',
        copy: 'Provide VIN, photos and the damaged glass position.',
      },
      {
        title: 'Confirm fitment',
        copy: 'Review trim, sensors, options and part availability.',
      },
      {
        title: 'Repair or replace',
        copy: 'Complete the confirmed repair or install the correct replacement glass.',
      },
      {
        title: 'Handoff',
        copy: 'Review cure time, recalibration needs and aftercare.',
      },
    ],
    faqs: [
      [
        'Can a windshield chip or crack be repaired?',
        'Some damage can be repaired. Size, depth, location, contamination and proximity to the edge or driver-assistance camera determine whether repair is appropriate.',
      ],
      [
        'Do you replace more than windshields?',
        'The current service menu covers front windshields, rear glass and side windows. Exact fitment and availability are confirmed.',
      ],
      [
        'Can you replace glass at my location?',
        'Mobile service may be available when the location, weather and vehicle requirements support a safe installation.',
      ],
      [
        'What about cameras or driver-assistance sensors?',
        'Tell the team about cameras, rain sensors, heating, displays or driver-assistance features so glass and any required calibration can be scoped correctly.',
      ],
    ],
  },
  {
    slug: 'key-replacement',
    name: 'Automotive Locksmith & Car Keys',
    shortName: 'Locksmith & car keys',
    eyebrow: 'Lockouts · keys · fob programming',
    title: 'Automotive Locksmith & Car Key Service in Manassas, VA',
    description:
      'Request lockout assistance, car-key cutting or duplication, key replacement and fob programming. Vehicle compatibility, ownership requirements and availability are confirmed first.',
    serviceType:
      'Automotive locksmith, car key replacement and fob programming',
    quoteService: 'key-replacement',
    image: '/generated/service-key-replacement.webp',
    imageAlt:
      'Automotive locksmith programming a modern smart key beside a luxury sedan.',
    sourceUrl: 'https://pro-detailing.co/our-services/key-replacement/',
    highlights: [
      {
        title: 'Keys & duplication',
        copy: 'Traditional, transponder and worn or broken key requests are identified by vehicle.',
      },
      {
        title: 'Fob programming',
        copy: 'Remote, smart, proximity and push-to-start compatibility is confirmed before service.',
      },
      {
        title: 'Lockout assistance',
        copy: 'Eligible mobile lockout requests are evaluated by location, vehicle and proof of ownership.',
      },
    ],
    pathways: [
      {
        name: 'Vehicle Lockout Assistance',
        label: 'Automotive locksmith',
        copy: 'Request damage-conscious entry support after the vehicle and ownership details are verified.',
        includes: [
          'Vehicle and location review',
          'Ownership verification',
          'Availability confirmation',
        ],
      },
      {
        name: 'Duplicate or Replace',
        label: 'Car key service',
        copy: 'Start from an existing key or request a replacement when the original is unavailable.',
        includes: [
          'Vehicle and key identification',
          'Ownership verification',
          'Cut and programming scope',
        ],
      },
      {
        name: 'Fob Programming',
        label: 'Electronic key',
        copy: 'Confirm the correct remote, smart-key or push-to-start fob and programming path for the vehicle.',
        includes: [
          'Compatibility check',
          'Programming requirement',
          'Function test',
        ],
      },
    ],
    process: [
      {
        title: 'Verify vehicle',
        copy: 'Share VIN, year, make, model and key type.',
      },
      {
        title: 'Verify ownership',
        copy: 'Prepare the required identity and ownership documents.',
      },
      {
        title: 'Confirm solution',
        copy: 'Review compatibility, location, timing and price.',
      },
      {
        title: 'Cut & test',
        copy: 'Complete the approved service and test key functions.',
      },
    ],
    faqs: [
      [
        'Can you help if I lost every key?',
        'Some vehicles can be serviced without an original key, but vehicle compatibility and ownership documentation must be confirmed first.',
      ],
      [
        'Do you program push-to-start fobs?',
        'The current service menu includes smart, proximity and push-to-start keys. Exact vehicle support is confirmed before scheduling.',
      ],
      [
        'What proof of ownership is required?',
        'Requirements can vary. Expect to provide government-issued identification and vehicle ownership documentation before key work.',
      ],
    ],
  },
] as const;

export const specialistMarques = [
  'Mercedes-AMG',
  'BMW',
  'Mercedes-Benz',
  'Porsche',
  'Lamborghini',
  'McLaren',
  'Aston Martin',
  'Range Rover',
] as const;

export const googleReviewSnapshot = {
  rating: '5.0',
  count: 143,
  verified: 'September 8, 2026',
  profileUrl:
    'https://www.google.com/maps/place/Pro+Detailing+-+Tinting/@38.79913,-77.505505,17z/data=!4m8!3m7!1s0x206936eb6b075581:0x9e782a80c19e3227!8m2!3d38.79913!4d-77.505505!9m1!1b1!16s%2Fg%2F11krpg2kqz?entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D',
  reviews: [
    {
      name: 'Matt Brown',
      service: 'Ceramic tint · BMW',
      age: '4 months ago',
      summary:
        'Praised the team’s professionalism, workmanship and ceramic-tint product quality on his BMW.',
      href: 'https://maps.app.goo.gl/iHGpY8KbtUoatByS9',
    },
    {
      name: 'Murtaza Hussain',
      service: 'Detailing & tint · Lexus',
      age: '5 months ago',
      summary:
        'Highlighted careful detailing and tint work that left his Lexus feeling refreshed.',
      href: 'https://maps.app.goo.gl/YCM4LyV82ZuMnzea9',
    },
    {
      name: 'Bharathwaj Gopalakrishnan',
      service: 'Detail & ceramic · Macan Electric',
      age: '5 months ago',
      summary:
        'Called out a mirror-like finish, protected leather and thoughtful help with his Macan Electric.',
      href: 'https://maps.app.goo.gl/YY9UAUWJ1U4Gyxt1A',
    },
    {
      name: 'Jae Spence',
      service: 'Vehicle service',
      age: '2 months ago',
      summary:
        'Appreciated quick appointment availability and a professional, thorough service experience.',
      href: 'https://maps.app.goo.gl/NtjeZrj23rhwggRYA',
    },
    {
      name: 'Eleke ET',
      service: 'Tint & interior detail',
      age: '7 months ago',
      summary:
        'Reported that the tint and interior work left the vehicle fresh and spotless.',
      href: 'https://maps.app.goo.gl/bBsthAD2Vdr8VCe69',
    },
    {
      name: 'Ahmed Rehman',
      service: 'Tint, wash & oil change · Audi A7',
      age: '5 months ago',
      summary:
        'Highlighted a tint result that matched his request along with wash and oil-change service.',
      href: 'https://maps.app.goo.gl/Q8ZgLcwCDH4AXQnk6',
    },
  ],
} as const;
