import importedLegacyArticles from '@/lib/legacy-blog-content.json';

export type BlogArticle = {
  slug: string;
  title: string;
  category: string;
  description: string;
  sourceUrl: string;
  relatedHref: string;
  relatedLabel: string;
  lead: string;
  sections: readonly {
    heading: string;
    body: string;
  }[];
  takeaways: readonly string[];
};

export type LegacyBlogBlock =
  | { type: 'heading' | 'paragraph'; text: string }
  | { type: 'list'; items: string[] };

export type LegacyBlogArticle = {
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  datePublished: string;
  dateModified: string;
  sourceUrl: string;
  relatedHref: string;
  relatedLabel: string;
  image: string;
  blocks: LegacyBlogBlock[];
};

export const featuredArticles: readonly BlogArticle[] = [
  {
    slug: 'car-detailing-benefits-in-manassas-va',
    title:
      'Car Detailing Benefits in Manassas, VA: 12 Reasons Northern Virginia Drivers Make It a Regular Investment',
    category: 'Detailing',
    description:
      'A practical look at how regular detailing supports vehicle condition, presentation and easier upkeep in Northern Virginia.',
    sourceUrl:
      'https://pro-detailing.co/car-detailing-benefits-in-manassas-va/',
    relatedHref: '/our-services/auto-detailing',
    relatedLabel: 'Explore auto detailing',
    lead: 'Professional detailing is most useful when it is treated as condition management—not a once-a-year rescue. The right interval depends on mileage, parking, passengers, pets and the surfaces that receive the most wear.',
    sections: [
      {
        heading: 'Why local driving changes the plan',
        body: 'Northern Virginia vehicles move through pollen, rain, road film, winter residue and dense commuter traffic. Regular cleaning removes contamination before it becomes harder to manage and gives the technician a chance to identify stains, finish concerns and high-wear areas early.',
      },
      {
        heading: 'Value comes from the right depth',
        body: 'A maintenance visit can be enough for a well-kept cabin, while neglected carpet, pet hair, spills or bonded exterior contamination may require a deeper package. Paying only for the needed depth protects both the vehicle and the budget.',
      },
      {
        heading: 'Build a repeatable routine',
        body: 'Combine professional resets with simple weekly habits: remove trash, address spills quickly, use gentle wash methods and follow any coating or material-specific aftercare. Consistency usually matters more than aggressive cleaning.',
      },
    ],
    takeaways: [
      'Match service depth to actual condition',
      'Address contamination before it compounds',
      'Use safe maintenance between appointments',
      'Photograph concerns when requesting a quote',
    ],
  },
  {
    slug: 'summer-car-maintenance-checklist-for-virginia',
    title:
      'Summer Car Maintenance Checklist 2026: What Northern Virginia Commuters Must Check Before the Heat Hits',
    category: 'Maintenance',
    description:
      'A heat-season checklist covering tires, fluids, visibility and cabin-comfort priorities for Northern Virginia driving.',
    sourceUrl:
      'https://pro-detailing.co/summer-car-maintenance-checklist-for-virginia/',
    relatedHref: '/our-services/maintenance-oil-change',
    relatedLabel: 'Plan maintenance',
    lead: 'High heat exposes weak batteries, low fluids, worn tires and neglected cooling systems. A useful summer check starts with the owner’s manual and current symptoms, then verifies the systems that affect reliability, braking and visibility.',
    sections: [
      {
        heading: 'Start with heat-sensitive systems',
        body: 'Review coolant condition, engine oil, visible leaks, battery performance and air-conditioning behavior. Fluid specifications and service intervals are vehicle-specific, so the VIN and maintenance history should guide the work.',
      },
      {
        heading: 'Do not overlook tires and brakes',
        body: 'Check cold tire pressures, tread, irregular wear and visible damage before long trips. Heat and load change tire behavior, while brake noise, vibration or warning lights deserve inspection rather than guesswork.',
      },
      {
        heading: 'Protect visibility and the cabin',
        body: 'Wiper condition, clean glass and working exterior lights support safe summer storms and night driving. Ceramic window film may help with cabin comfort, but the selected film and legal finished-window reading still need to be confirmed.',
      },
    ],
    takeaways: [
      'Use the correct vehicle-specific fluid specifications',
      'Measure tire pressure when tires are cold',
      'Investigate warnings, leaks and new noises',
      'Confirm glass film and finished VLT before installation',
    ],
  },
  {
    slug: 'what-is-included-in-a-full-car-detail-in-va',
    title:
      'What Is Included in a Full Car Detail? Everything You Get at PRO Detailing in Manassas',
    category: 'Detailing',
    description:
      'Understand interior, exterior and add-on detailing work before choosing the right package for your vehicle.',
    sourceUrl:
      'https://pro-detailing.co/what-is-included-in-a-full-car-detail-in-va/',
    relatedHref: '/our-services/auto-detailing',
    relatedLabel: 'Compare detailing packages',
    lead: '“Full detail” is not a universal checklist. The useful question is which interior materials, exterior surfaces and condition problems are included in the written scope for your specific vehicle.',
    sections: [
      {
        heading: 'Interior work follows material and condition',
        body: 'A cabin plan can include vacuuming, touchpoint cleaning, glass, crevices, vents, mats, carpet, leather or fabric care. Stains, pet hair, odor and biological contamination may require separately approved methods and time.',
      },
      {
        heading: 'Exterior work goes beyond a quick wash',
        body: 'The exterior can include careful washing, wheels, tires, jambs, glass and condition-appropriate decontamination. Clay, correction or longer-term protection should be named separately so the expected finish is clear.',
      },
      {
        heading: 'A good quote makes limits visible',
        body: 'Photos and an inspection help distinguish removable soil from permanent wear, damaged material, chips, etching or paint defects. That prevents a package name from becoming an unrealistic promise.',
      },
    ],
    takeaways: [
      'Review every listed inclusion',
      'Disclose stains, pet hair and odor early',
      'Separate cleaning from paint correction',
      'Confirm starting price, final scope and timing',
    ],
  },
  {
    slug: 'ceramic-coating-for-luxury-cars-near-virginia',
    title:
      'Ceramic Coating for Luxury Cars Near Virginia: What BMW, Mercedes-Benz and Porsche Owners Actually Need',
    category: 'Ceramic coating',
    description:
      'How inspection, paint preparation, coating selection and aftercare shape a luxury-vehicle ceramic coating result.',
    sourceUrl:
      'https://pro-detailing.co/ceramic-coating-for-luxury-cars-near-virginia/',
    relatedHref: '/our-services/ceramic-coating',
    relatedLabel: 'Explore Ceramic Pro coating',
    lead: 'A premium badge does not determine the coating plan. Paint type, prior repairs, current defects, vehicle use and maintenance expectations are more important than the manufacturer name.',
    sections: [
      {
        heading: 'Preparation determines the visible finish',
        body: 'A coating follows the shape and clarity of the surface beneath it. Decontamination and, when appropriate, measured paint refinement should be agreed before the coating is installed.',
      },
      {
        heading: 'Choose protection for real use',
        body: 'Daily commuters, garage-kept weekend cars and track-driven vehicles face different contamination and impact risks. Coating can support gloss and easier maintenance, while paint protection film is the physical barrier for higher-impact zones.',
      },
      {
        heading: 'Aftercare remains part of ownership',
        body: 'Ceramic coating does not eliminate washing. Safe wash methods, prompt removal of contamination and periodic inspection help preserve performance and make changes in the finish easier to catch.',
      },
    ],
    takeaways: [
      'Inspect paint before choosing a package',
      'Scope correction separately',
      'Use PPF for physical impact priorities',
      'Follow the documented cure and wash guidance',
    ],
  },
  {
    slug: 'graphene-window-tint-in-2026',
    title:
      'Graphene Window Tint in 2026: Is It Actually Better Than Ceramic and Worth the Premium?',
    category: 'Window tint',
    description:
      'A buyer-focused way to compare window-film marketing with measurable specifications, appearance and warranty.',
    sourceUrl: 'https://pro-detailing.co/graphene-window-tint-in-2026/',
    relatedHref: '/our-services/window-tinting',
    relatedLabel: 'Compare confirmed LLumar films',
    lead: 'Material labels alone do not prove that one film will perform better on your vehicle. Compare published specifications for the exact product, the measured VLT, color, construction, warranty and installer support.',
    sections: [
      {
        heading: 'Compare the exact film—not the category name',
        body: '“Graphene,” “ceramic” and “carbon” are broad marketing categories. Ask for the manufacturer, product line and current technical sheet, then compare values reported under the same test method.',
      },
      {
        heading: 'Darkness and heat performance are different',
        body: 'A darker appearance does not automatically mean better infrared or total solar performance. Factory glass also changes the installed reading, which is why the final window should be treated as a system.',
      },
      {
        heading: 'Installation quality still matters',
        body: 'Pattern fit, contamination control, edge quality and aftercare affect the result regardless of film technology. A clear written recommendation is more useful than a material buzzword.',
      },
    ],
    takeaways: [
      'Ask for the exact product data sheet',
      'Compare equal VLT ranges and test methods',
      'Keep legal finished-window limits in view',
      'Value installer process and warranty support',
    ],
  },
  {
    slug: 'private-jet-detailing-in-northern-virginia',
    title:
      'Private Jet Detailing in Northern Virginia: What Owners and Charter Operators Actually Expect',
    category: 'Aircraft care',
    description:
      'A concise guide to access, materials, documentation and presentation expectations for private-aircraft detailing.',
    sourceUrl:
      'https://pro-detailing.co/private-jet-detailing-in-northern-virginia/',
    relatedHref: 'https://proaviationcare.com/services.html',
    relatedLabel: 'Explore Pro Aviation Care',
    lead: 'Aircraft detailing adds operational and material constraints that do not exist in ordinary vehicle work. Access, approved methods, water control, scheduling and documentation should be planned before the team reaches the ramp or hangar.',
    sections: [
      {
        heading: 'Access is part of the service',
        body: 'Airport credentials, escort requirements, hangar rules, aircraft positioning and turnaround windows affect the plan. A useful request includes the airfield, aircraft type, location and operational deadline.',
      },
      {
        heading: 'Materials require disciplined methods',
        body: 'Exterior metals, transparencies, paint, de-ice surfaces and cabin materials should be matched to compatible products and procedures. Unverified automotive methods should not be assumed safe for every aircraft surface.',
      },
      {
        heading: 'Presentation and reporting matter',
        body: 'Owners and operators may need a consistent cabin standard, exterior presentation, turnaround record and clear exception reporting. Those expectations belong in the dispatch scope.',
      },
    ],
    takeaways: [
      'Confirm airport and escort requirements',
      'Identify aircraft and sensitive surfaces',
      'Set the operational deadline',
      'Document scope, exceptions and handoff',
    ],
  },
  {
    slug: 'ev-interior-detailing-in-northern-virginia',
    title:
      'EV Interior Detailing in Northern Virginia: Touchscreens, Vegan Leather and Recycled Materials',
    category: 'EV detailing',
    description:
      'Plan safer cleaning around EV touchscreens, electronic controls and modern synthetic cabin materials.',
    sourceUrl:
      'https://pro-detailing.co/ev-interior-detailing-in-northern-virginia/',
    relatedHref: '/our-services/auto-detailing',
    relatedLabel: 'Plan an interior detail',
    lead: 'Electric vehicles often concentrate controls in large displays and use a mix of synthetic upholstery, textiles and soft-touch surfaces. The safest detailing plan starts with low moisture, material identification and manufacturer guidance.',
    sections: [
      {
        heading: 'Treat screens as sensitive equipment',
        body: 'Power the display down when appropriate, avoid saturating edges and use a clean, compatible microfiber method. Product should not be sprayed directly into electronics, vents or switch assemblies.',
      },
      {
        heading: '“Vegan leather” is not one material',
        body: 'Synthetic upholstery varies by manufacturer and model. Gentle cleaning, limited dwell time and a non-greasy finish are safer starting points than strong solvent or universal leather treatments.',
      },
      {
        heading: 'Keep driver-assistance hardware in mind',
        body: 'Cameras, sensors and microphones can be integrated around the cabin. A technician should identify these areas before using steam, compressed air or liquid near them.',
      },
    ],
    takeaways: [
      'Use minimal liquid around electronics',
      'Confirm the actual upholstery material',
      'Avoid glossy residue on controls',
      'Identify cabin cameras and sensors first',
    ],
  },
  {
    slug: 'ceramic-coating-for-suvs-and-trucks-in-manassas',
    title:
      'Ceramic Coating for SUVs and Trucks in Manassas, VA: Why Bigger Vehicles Benefit',
    category: 'Ceramic coating',
    description:
      'Surface area, vehicle use and maintenance access all shape a sensible coating plan for larger vehicles.',
    sourceUrl:
      'https://pro-detailing.co/ceramic-coating-for-suvs-and-trucks-in-manassas/',
    relatedHref: '/our-services/ceramic-coating',
    relatedLabel: 'Plan a coating inspection',
    lead: 'SUVs and trucks expose more paint, glass, trim and wheel area to road film and weather. Coating can make routine maintenance more manageable, but preparation time and safe access often increase with size.',
    sections: [
      {
        heading: 'Use changes the protection priorities',
        body: 'A commuter SUV, work truck, trail vehicle and tow rig face different contamination. Lower doors, bedsides, running boards, tailgates and the front end may need different combinations of coating, film and maintenance.',
      },
      {
        heading: 'Large surfaces reveal preparation quality',
        body: 'Decontamination, lighting and paint inspection matter across broad panels. Correction should be recommended according to measurable condition and the owner’s goal—not automatically bundled.',
      },
      {
        heading: 'Plan maintenance access',
        body: 'Roof height, racks, tonneau covers, accessories and oversized wheels change how the vehicle can be washed safely. The aftercare plan should reflect the actual configuration.',
      },
    ],
    takeaways: [
      'Account for vehicle size and accessories',
      'Prioritize high-contamination zones',
      'Separate coating from impact protection',
      'Choose an aftercare method you can repeat safely',
    ],
  },
  {
    slug: 'is-it-safe-to-wash-an-electric-vehicle',
    title:
      'Is It Safe to Wash an Electric Vehicle? Charging Ports, Sensors and Cameras',
    category: 'EV care',
    description:
      'A practical framework for washing EV exteriors without careless pressure, chemical or sensor handling.',
    sourceUrl:
      'https://pro-detailing.co/is-it-safe-to-wash-an-electric-vehicle/',
    relatedHref: '/our-services/auto-detailing',
    relatedLabel: 'Explore EV-aware detailing',
    lead: 'Modern electric vehicles are designed to operate outdoors and can be washed, but that does not make every technique appropriate. Follow the manufacturer’s guidance and avoid forcing water or chemicals into openings and sensor areas.',
    sections: [
      {
        heading: 'Prepare the vehicle',
        body: 'Close the charging port, windows, doors and storage openings; secure automatic wipers; and check any manufacturer wash-mode or conveyor guidance. Do not wash a damaged charge-port assembly without qualified advice.',
      },
      {
        heading: 'Use pressure with control',
        body: 'Maintain reasonable distance from seals, cameras, sensors, damaged trim and charging hardware. Direct high pressure at a shallow angle across surfaces rather than into gaps.',
      },
      {
        heading: 'Finish with a functional check',
        body: 'Dry glass and sensor lenses with compatible materials and verify that doors, cameras and warnings behave normally. Report damage or a persistent warning instead of masking it with more cleaning.',
      },
    ],
    takeaways: [
      'Use the vehicle’s wash guidance',
      'Close and inspect charge-port areas',
      'Avoid concentrated pressure at seals and sensors',
      'Use clean, safe drying materials',
    ],
  },
] as const;

export const legacyBlogLinks = [
  [
    'Do You Need Paint Correction Before Ceramic Coating? What Happens If You Skip It',
    'https://pro-detailing.co/paint-correction-before-ceramic-coating/',
  ],
  [
    'Windshield Repair vs Replacement in Manassas, VA',
    'https://pro-detailing.co/windshield-repair-vs-replacement/',
  ],
  [
    'Mobile Aircraft Detailing at Manassas Regional Airport (HEF)',
    'https://pro-detailing.co/aircraft-detailing-at-manassas-regional-airport/',
  ],
  [
    'Virginia Window Tinting for SUVs and Trucks: What the Law Allows',
    'https://pro-detailing.co/virginia-window-tinting-for-suvs-and-trucks/',
  ],
  [
    'Car Detailing Before Selling: Does It Really Increase Resale Value?',
    'https://pro-detailing.co/car-detailing-before-selling/',
  ],
  [
    'The Complete Car Maintenance Schedule Most Drivers Ignore',
    'https://pro-detailing.co/car-maintenance-schedule-most-drivers-ignore/',
  ],
  [
    'Professional Ceramic Coating Services: What to Expect',
    'https://pro-detailing.co/professional-ceramic-coating-services/',
  ],
  [
    'Window Tint Aftercare: When You Can Wash, Defrost and Roll Windows Down',
    'https://pro-detailing.co/window-tint-aftercare/',
  ],
  [
    'Is Ceramic Coating Safe for Aircraft?',
    'https://pro-detailing.co/is-ceramic-coating-safe-for-aircraft/',
  ],
  [
    '7 Questions to Ask Before Getting Ceramic Coating in Northern Virginia',
    'https://pro-detailing.co/questions-to-ask-before-getting-ceramic-coating/',
  ],
  [
    'Hand Wash vs Automatic Car Wash',
    'https://pro-detailing.co/hand-wash-vs-automatic-car-wash/',
  ],
  [
    'DIY Car Detailing vs Professional Detailing',
    'https://pro-detailing.co/diy-car-detailing-vs-professional-detailing/',
  ],
  [
    'Does Ceramic Coating Protect Against Road Salt and Snow?',
    'https://pro-detailing.co/ceramic-coating-protect-against-road-salt-and-snow/',
  ],
  [
    'How Often Should You Detail Your Car in Winter?',
    'https://pro-detailing.co/how-often-should-you-detail-your-car-in-winter/',
  ],
  [
    'Ceramic Window Tint vs Regular Tint',
    'https://pro-detailing.co/ceramic-window-tint-vs-regular-tint/',
  ],
  [
    'How Often Should You Detail Your Car?',
    'https://pro-detailing.co/how-often-should-you-detail-your-car/',
  ],
  [
    'Window Tinting in Winter in Manassas',
    'https://pro-detailing.co/window-tinting-in-winter-in-manassas/',
  ],
  [
    'Car Detailing for Electric Vehicles in Virginia',
    'https://pro-detailing.co/car-detailing-for-electric-vehicles-in-va/',
  ],
  [
    'Professional Auto Detailing Services in Northern Virginia',
    'https://pro-detailing.co/auto-detailing-services-in-northern-virginia/',
  ],
  [
    'How to Properly Dry Your Car After Washing',
    'https://pro-detailing.co/how-to-properly-dry-your-car-after-washing/',
  ],
  [
    'Winter Car Maintenance in Northern Virginia',
    'https://pro-detailing.co/winter-car-maintenance-in-northern-virginia/',
  ],
  [
    'Graphene vs Ceramic Coating: Real-World Guide',
    'https://pro-detailing.co/graphene-vs-ceramic-coating/',
  ],
  [
    'Winter Car Detailing in Northern Virginia',
    'https://pro-detailing.co/winter-car-detailing-in-northern-virginia/',
  ],
  [
    'Interior Car Detailing and Cleaning Service in Northern Virginia',
    'https://pro-detailing.co/interior-car-detailing-and-cleaning-in-virginia/',
  ],
  [
    'Car Detailing and Ceramic Coating Company in Virginia',
    'https://pro-detailing.co/car-detailing-and-ceramic-coating-company-in-va/',
  ],
  [
    'Mobile Window Tinting in Northern Virginia',
    'https://pro-detailing.co/mobile-window-tinting-in-northern-virginia/',
  ],
  [
    'How Much Does Car Detailing Cost in Virginia?',
    'https://pro-detailing.co/how-much-does-car-detailing-cost/',
  ],
  [
    'Classic Car Wash in Northern Virginia',
    'https://pro-detailing.co/classic-car-wash/',
  ],
  [
    'Aircraft Detailing Service in Virginia',
    'https://pro-detailing.co/aircraft-detailing-service-in-virginia/',
  ],
  [
    'How to Ceramic Coat a Car in Northern Virginia',
    'https://pro-detailing.co/how-to-ceramic-coat-a-car/',
  ],
  [
    'Automotive Window Tinting in Manassas, VA',
    'https://pro-detailing.co/automotive-window-tinting-in-manassas-va/',
  ],
  [
    'Professional Mobile Car Detailing in Northern Virginia',
    'https://pro-detailing.co/best-mobile-car-detailing-in-northern-virginia/',
  ],
  [
    'Fleet Car Wash in Northern Virginia & DMV',
    'https://pro-detailing.co/fleet-car-wash/',
  ],
  [
    'Ceramic Aviation-Grade Professional Paint Coating',
    'https://pro-detailing.co/ceramic-aviation-grade-professional-paint-coating/',
  ],
  [
    'How to Get a Replacement Car Key Without the Original',
    'https://pro-detailing.co/how-to-get-a-replacement-car-key-without-the-original/',
  ],
  [
    'Interior Car Wash: The Ultimate Guide',
    'https://pro-detailing.co/interior-car-wash/',
  ],
  [
    'How Long Does Ceramic Coating Last?',
    'https://pro-detailing.co/how-long-does-ceramic-coating-last/',
  ],
  [
    'Car Detailing Kit: What You Really Need',
    'https://pro-detailing.co/car-detailing-kit/',
  ],
  [
    'How to Remove Tint from Car Windows',
    'https://pro-detailing.co/how-to-remove-tint-from-car-windows/',
  ],
  [
    'Ceramic Coating vs PPF',
    'https://pro-detailing.co/ceramic-coating-vs-ppf/',
  ],
  [
    'How Long Does It Take to Replace a Windshield?',
    'https://pro-detailing.co/how-long-does-it-take-to-replace-a-windshield/',
  ],
  ['Precut Window Tint', 'https://pro-detailing.co/precut-window-tint/'],
  [
    'Benefits of Ceramic Coating',
    'https://pro-detailing.co/benefits-of-ceramic-coating/',
  ],
  [
    'Ceramic Coating vs Wax',
    'https://pro-detailing.co/ceramic-coating-vs-wax/',
  ],
  [
    'Window Tint Laws in Virginia',
    'https://pro-detailing.co/window-tint-laws-in-virginia/',
  ],
  [
    'How to Get Smoke Smell Out of a Car',
    'https://pro-detailing.co/how-to-get-smoke-smell-out-of-a-car/',
  ],
  ['Engine Steam Cleaning', 'https://pro-detailing.co/engine-steam-cleaning/'],
  [
    'Can Car Detailing Remove Scratches?',
    'https://pro-detailing.co/can-car-detailing-remove-scratches/',
  ],
  [
    'Car Detailing vs Car Wash',
    'https://pro-detailing.co/car-detailing-vs-car-wash/',
  ],
  [
    'Deep Cleaning Services for Classic Cars',
    'https://pro-detailing.co/deep-cleaning-services-for-classic-cars/',
  ],
  [
    'The Future of Car Detailing',
    'https://pro-detailing.co/future-of-car-detailing/',
  ],
  [
    'Is Ceramic Coating Worth It in Hot Climates?',
    'https://pro-detailing.co/is-ceramic-coating-worth-it-in-hot-climates/',
  ],
  [
    'How Does Ceramic Coating Work?',
    'https://pro-detailing.co/how-does-ceramic-coating-work/',
  ],
  [
    'Local Mobile Car Detailing Services',
    'https://pro-detailing.co/local-mobile-car-detailing-services/',
  ],
  [
    'Top 5 Ceramic Coatings',
    'https://pro-detailing.co/top-5-ceramic-coatings/',
  ],
  [
    'How to Choose a Car Detailing Company',
    'https://pro-detailing.co/how-to-choose-a-car-detailing-company/',
  ],
  [
    'Premier Mobile Car Detailing & Ceramic Coating in Manassas',
    'https://pro-detailing.co/mobile-car-detailing-manassas-va/',
  ],
  [
    'How to Book a Car Wash Online',
    'https://pro-detailing.co/how-to-book-a-car-wash-online/',
  ],
] as const;

export const allSourceArticles = [
  ...featuredArticles.map(
    (article) => [article.title, article.sourceUrl] as const,
  ),
  ...legacyBlogLinks,
];

export const legacyArticles =
  importedLegacyArticles as unknown as readonly LegacyBlogArticle[];

export const allBlogArticles = [...featuredArticles, ...legacyArticles];

export function findBlogArticle(slug: string) {
  return allBlogArticles.find((article) => article.slug === slug);
}
