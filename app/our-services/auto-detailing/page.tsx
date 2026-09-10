import Image from 'next/image';
import Link from '@/components/site/SafeLink';
import {
  ArrowRight,
  Droplets,
  Focus,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';

import { QuoteBand } from '@/components/site/QuoteBand';
import { DetailingComparison } from '@/components/site/DetailingComparison';
import { SectionIntro } from '@/components/site/SectionIntro';
import { ServiceBrandMark } from '@/components/site/ServiceBrandMark';
import { createPageMetadata } from '@/lib/metadata';
import {
  business,
  galleryItems,
  quoteHref,
  SITE_ORIGIN,
} from '@/lib/site-data';

export const metadata = createPageMetadata({
  title: 'Auto Detailing Manassas, VA | PRO Detailing',
  description:
    'Compare PRO Detailing packages starting at $100 for interior and exterior auto detailing in Manassas, VA. See inclusions, timing and add-ons.',
  path: '/our-services/auto-detailing',
});

const detailingPackages = [
  {
    id: 'tier-1',
    name: 'Tier 1',
    price: 100,
    duration: '60–90 min',
    label: 'Maintenance refresh',
    featured: false,
    description:
      'For a well-maintained vehicle that needs a focused interior and exterior reset.',
    interior: [
      'Wipe and clean all surfaces',
      'Vacuum interior',
      'Clean windows and mirrors',
      'Clean floor mats and carpets',
      'Air-freshener treatment',
      'Detail trunk',
    ],
    exterior: [
      'Professional hand wash',
      'Clean wheel wells',
      'Detail rim faces and tires',
      'Dress exterior trim and tires',
      'Clean door jambs',
      'Clean exterior windows',
    ],
  },
  {
    id: 'tier-2',
    name: 'Tier 2',
    price: 150,
    duration: 'About 120 min',
    label: 'Most popular',
    featured: true,
    description:
      'A more complete interior and exterior service with steam cleaning, decontamination and wax protection.',
    interior: [
      'Wipe and clean all surfaces',
      'Double-vacuum interior',
      'Steam-clean full interior',
      'Clean crevices, vents and cupholders',
      'Clean and protect plastic',
      'Clean windows and mirrors',
      'Condition leather',
      'Deep-clean floor mats and carpets',
      'Air-freshener treatment',
      'Detail trunk',
    ],
    exterior: [
      'Professional hand wash',
      'Clay-bar paint decontamination',
      'Clean wheel wells',
      'Detail rim faces and tires',
      'Dress exterior trim and tires',
      'Clean door jambs',
      'Clean exterior windows',
      'Wax protection',
    ],
  },
  {
    id: 'tier-3',
    name: 'Tier 3',
    price: 350,
    duration: 'About 240 min',
    label: 'Complete makeover',
    featured: false,
    description:
      'The deepest published package for a vehicle that needs a fuller cabin reset and exterior decontamination.',
    interior: [
      'Deep-clean all surfaces',
      'Double-vacuum interior',
      'Shampoo carpets and seats',
      'Steam-clean full interior',
      'Clean crevices, vents and cupholders',
      'Clean and protect plastic',
      'Condition leather',
      'Clean windows and mirrors',
      'Deep-clean floor mats and carpets',
      'Air-freshener treatment',
      'Detail trunk',
    ],
    exterior: [
      'Remove embedded contaminants',
      'Professional hand wash',
      'Clay-bar paint decontamination',
      'Detail rim faces and tires',
      'Clean wheel wells',
      'Dress exterior trim and tires',
      'Clean door jambs',
      'Detail exterior windows',
      'Wax protection',
    ],
  },
  {
    id: 'tier-4',
    name: 'Tier 4',
    price: 150,
    duration: 'Timing confirmed with quote',
    label: 'Interior only',
    featured: false,
    description:
      'A dedicated deep interior package without the exterior service.',
    interior: [
      'Deep-clean all surfaces',
      'Double-vacuum interior',
      'Shampoo carpets and seats',
      'Steam-clean full interior',
      'Clean crevices, vents and cupholders',
      'Clean and protect plastic',
      'Condition leather',
      'Clean windows and mirrors',
      'Deep-clean floor mats and carpets',
      'Air-freshener treatment',
      'Detail trunk',
    ],
    exterior: [],
  },
] as const;

const detailingAddOns = [
  ['Shampoo seats', '$50'],
  ['Heavy pet hair', '$69'],
  ['Stain or spill treatment', '$50'],
  ['Bio cleaning', '$50'],
  ['Clay-bar treatment', '$50'],
  ['Headlight restoration', '$70'],
  ['Shampoo carpets', '$50'],
  ['Light pet hair', '$29'],
  ['Headliner cleaning', '$50'],
  ['Ozone odor treatment', '$50'],
  ['Engine-bay detail', '$50'],
] as const;

const workflow = [
  [
    '01',
    'Inspect',
    'Review the cabin, exterior, materials and finish before the scope is set.',
  ],
  [
    '02',
    'Interior clean',
    'Treat surfaces according to their material, soil level and current condition.',
  ],
  [
    '03',
    'Wash & decontaminate',
    'Address road film and bonded exterior contamination with condition-appropriate steps.',
  ],
  [
    '04',
    'Refine',
    'Complete the agreed finishing work; correction is separately scoped when defects need more.',
  ],
  [
    '05',
    'Quality check',
    'Inspect the finished vehicle and explain practical ongoing care.',
  ],
] as const;

const faqs = [
  [
    'What is included in an auto detail?',
    'The scope is set after the vehicle is reviewed. It can include material-appropriate cabin cleaning, glass, exterior washing, decontamination and an agreed finishing step. Your written recommendation confirms what is included.',
  ],
  [
    'Can detailing remove every stain or paint defect?',
    'No. Some stains, material damage, etching, chips and paint defects may remain. We explain likely limits before work and recommend a separate specialty step when appropriate.',
  ],
  [
    'When does paint correction make more sense?',
    'When swirls, haze or other correctable paint defects—not surface contamination—are limiting clarity. Correction is assessed and scoped separately; perfection is not promised.',
  ],
  [
    'Should I detail the vehicle before ceramic coating?',
    'A coating needs suitable preparation. The inspection determines which cleaning, decontamination and possible refinement steps should come before the selected coating.',
  ],
  [
    'How are timing and price determined?',
    'Vehicle size, current condition, materials, contamination and the agreed scope affect both. We confirm timing and price after reviewing the vehicle or sufficiently clear photos.',
  ],
  [
    'What should I send for a quote?',
    'Send the year, make and model, your priorities, clear interior and exterior photos, and any stains or finish concerns you want us to inspect.',
  ],
] as const;

const detailImages = [
  'sports-car-in-bay',
  'studio-front-dark-saloon',
  'white-suv-studio-door',
]
  .map((id) => galleryItems.find((item) => item.id === id))
  .filter((item): item is (typeof galleryItems)[number] => Boolean(item));

const interiorVisuals = [
  {
    src: '/generated/interior-cockpit-finished.webp',
    alt: 'Brand-neutral black leather front cabin shown clean and carefully finished',
    title: 'Complete cockpit finish',
    copy: 'A wide view of the material clarity, seams, carpet and touchpoints a detailed cabin should reveal.',
  },
  {
    src: '/generated/interior-console-cleaning.webp',
    alt: 'Gloved technician using a soft brush around a center console and air vent',
    title: 'Precision at the controls',
    copy: 'Soft-brush technique around vents, switches and cupholders where careless moisture or abrasion does not belong.',
  },
  {
    src: '/generated/interior-rear-cabin-finished.webp',
    alt: 'Brand-neutral rear cabin with clean black leather, carpet and door panels',
    title: 'Rear-cabin reset',
    copy: 'Seats, footwells, carpet, door panels and the spaces passengers actually touch—shown in one finished frame.',
  },
] as const;

export default function AutoDetailingPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'Auto Detailing',
        serviceType: 'Interior and exterior automotive detailing',
        provider: { '@id': `${SITE_ORIGIN}/#business` },
        areaServed: 'Manassas, Virginia',
        url: `${SITE_ORIGIN}/our-services/auto-detailing`,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'PRO Detailing packages',
          itemListElement: detailingPackages.map((item) => ({
            '@type': 'Offer',
            name: item.name,
            price: item.price,
            priceCurrency: 'USD',
            description: `${item.label}. Published starting price; final scope and price depend on vehicle size and condition.`,
          })),
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };

  return (
    <main id="main-content" className="service-page detailing-page">
      <section className="service-hero detailing-service-hero">
        <div className="service-hero-media" aria-hidden="true">
          <Image
            src="/gallery/foam-covered-saloon.webp"
            alt=""
            width="1200"
            height="680"
            priority
            sizes="100vw"
          />
          <div />
        </div>
        <div className="shell service-hero-inner">
          <div className="service-hero-copy">
            <ServiceBrandMark service="auto-detailing" />
            <p className="eyebrow">
              <span /> Interior · exterior · finish
            </p>
            <h1>Auto Detailing in Manassas, VA</h1>
            <p>
              Every vehicle arrives with a different mix of cabin wear, road
              film and finish concerns. We inspect yours first, then define the
              interior cleaning, exterior decontamination and finish work that
              fits its condition and your goals.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#packages">
                View detailing packages <ArrowRight aria-hidden="true" />
              </a>
              <Link
                className="button button-ghost"
                href={quoteHref('detailing')}
              >
                Request a detailing quote
              </Link>
            </div>
          </div>
          <aside
            className="hero-spec-card"
            aria-label="Auto detailing protocol"
          >
            <p>DETAIL PROTOCOL / 04</p>
            <div>
              <strong>01</strong>
              <span>Inspect</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Clean</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Decontaminate</span>
            </div>
            <div>
              <strong>04</strong>
              <span>Refine</span>
            </div>
            <small>
              Exact scope, timing and price are confirmed after the vehicle is
              reviewed.
            </small>
          </aside>
        </div>
      </section>

      <section
        className="section detailing-comparison-section"
        id="detailing-comparison"
      >
        <div className="shell">
          <SectionIntro
            eyebrow="Interactive detailing comparison"
            title="Drag from arrival condition to completed cabin."
            copy="Use the same left-to-right comparison found on the home page. The vehicle and camera angle stay fixed so the visible change is easier to understand."
          />
          <DetailingComparison />
        </div>
      </section>

      <section className="section interior-visual-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Interior detailing · service visualizations"
            title="More of the cabin. More of the work that matters."
            copy="These original, brand-neutral visualizations show the areas and techniques the interior scope can address. They are illustrative service visuals—not customer-vehicle photographs or guaranteed before-and-after results."
          />
          <div className="interior-visual-grid">
            {interiorVisuals.map((visual, index) => (
              <figure key={visual.src}>
                <div>
                  <Image
                    src={visual.src}
                    alt={visual.alt}
                    width="1536"
                    height="1024"
                    sizes="(max-width: 780px) 100vw, 33vw"
                  />
                  <span>VISUAL / 0{index + 1}</span>
                </div>
                <figcaption>
                  <strong>{visual.title}</strong>
                  <p>{visual.copy}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section benefit-section">
        <div className="shell icon-benefit-grid coating-benefit-grid">
          <article>
            <Focus aria-hidden="true" />
            <span>01</span>
            <h2>Interior reset</h2>
            <p>
              Material-appropriate cleaning is planned around visible soil,
              touchpoints, glass and the condition of the cabin.
            </p>
          </article>
          <article>
            <Droplets aria-hidden="true" />
            <span>02</span>
            <h2>Exterior decontamination</h2>
            <p>
              Washing and condition-appropriate decontamination address road
              film and bonded contamination.
            </p>
          </article>
          <article>
            <Sparkles aria-hidden="true" />
            <span>03</span>
            <h2>Finish refinement</h2>
            <p>
              A finishing step can improve presentation; paint correction is
              separately recommended and scoped when defects require more work.
            </p>
          </article>
        </div>
      </section>

      <section className="section detailing-packages-section" id="packages">
        <div className="shell">
          <div className="detailing-packages-head">
            <SectionIntro
              eyebrow="Published PRO Detailing menu"
              title="Four clear starting points. Every inclusion is shown."
              copy="Choose the closest fit, then let vehicle size and condition set the final scope. These packages and starting prices come from the current PRO Detailing service menu."
            />
            <p className="package-price-note">
              Starting prices · final price and timing confirmed before work
            </p>
          </div>

          <div className="detailing-package-grid">
            {detailingPackages.map((item) => (
              <article
                className={`detailing-package-card${item.featured ? ' is-featured' : ''}`}
                id={item.id}
                key={item.id}
              >
                <div className="package-card-head">
                  <div>
                    <span>{item.label}</span>
                    <h2>{item.name}</h2>
                  </div>
                  <div className="package-price">
                    <small>Starting at</small>
                    <strong>${item.price}</strong>
                    <span>{item.duration}</span>
                  </div>
                </div>
                <p className="package-description">{item.description}</p>
                <div
                  className={`package-inclusions${item.exterior.length ? '' : ' interior-only'}`}
                >
                  <div>
                    <h3>Interior</h3>
                    <ul>
                      {item.interior.map((inclusion) => (
                        <li key={inclusion}>{inclusion}</li>
                      ))}
                    </ul>
                  </div>
                  {item.exterior.length ? (
                    <div>
                      <h3>Exterior</h3>
                      <ul>
                        {item.exterior.map((inclusion) => (
                          <li key={inclusion}>{inclusion}</li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="interior-only-note">
                      <span>Interior-only service</span>
                      <p>No exterior service is included in Tier 4.</p>
                    </div>
                  )}
                </div>
                <Link
                  className="button button-ghost package-quote-link"
                  href={`${quoteHref('detailing')}&package=${item.id}`}
                >
                  Request {item.name} <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>

          <div className="detailing-addons">
            <div>
              <p className="overline">Published add-ons</p>
              <h2>Build around the condition.</h2>
              <p>
                Some add-ons may already be included in a package. We confirm
                what is actually needed before adding it to your quote.
              </p>
            </div>
            <ul>
              {detailingAddOns.map(([name, price]) => (
                <li key={name}>
                  <span>{name}</span>
                  <strong>+{price}</strong>
                </li>
              ))}
            </ul>
          </div>

          <p className="package-source-note">
            Menu consolidated from the current PRO Detailing service catalog.
            Vehicle size, condition and requested work can change the final
            quote. Add-on availability is confirmed by the studio.
          </p>
        </div>
      </section>

      <section className="section process-section" id="workflow">
        <div className="shell">
          <SectionIntro
            eyebrow="The detailing workflow"
            title="Five deliberate stages. One vehicle-specific scope."
            copy="A useful detail is built around what the vehicle actually needs—not a checklist designed for every car."
            align="center"
          />
          <ol className="process-grid process-grid-five">
            {workflow.map(([number, title, copy]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section comparison-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Choose the right depth"
            title="Detailing, correction and coating solve different problems."
            copy="The inspection helps separate cleaning needs from paint defects and longer-term surface-protection goals."
          />
          <div className="comparison-table-wrap">
            <table className="protection-comparison">
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Primary job</th>
                  <th>Important limit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Auto detailing</th>
                  <td>Cleaning, decontamination and overall presentation.</td>
                  <td>
                    Does not guarantee removal of every stain, defect or
                    material damage.
                  </td>
                </tr>
                <tr>
                  <th>Paint correction</th>
                  <td>
                    Separate defect-removal work for eligible swirls, haze and
                    clarity concerns.
                  </td>
                  <td>
                    Paint condition and remaining material limit what can be
                    corrected safely.
                  </td>
                </tr>
                <tr>
                  <th>Ceramic coating</th>
                  <td>
                    Supports gloss, hydrophobic behavior and easier maintenance
                    after suitable preparation.
                  </td>
                  <td>
                    Does not replace physical film for road-impact protection.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="comparison-actions">
            <Link className="text-link" href="/our-services/ceramic-coating">
              Explore Ceramic Pro coating <ArrowRight aria-hidden="true" />
            </Link>
            <Link
              className="text-link"
              href="/our-services/paint-protection-film"
            >
              Compare paint protection film <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section work-section">
        <div className="shell">
          <div className="section-title-row">
            <SectionIntro
              eyebrow="Current PRO photo library"
              title="Real vehicles. Visible condition and finish."
              copy="Photographs show visible condition and finish only; they do not assign an unverified service history to each vehicle."
            />
            <Link className="button button-ghost" href="/gallery">
              View the gallery <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="home-gallery coating-gallery">
            {detailImages.map((item, index) => (
              <Link
                className={`home-gallery-item item-${index + 1}`}
                href="/gallery"
                key={item.id}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(max-width: 780px) 100vw, 33vw"
                />
                <span>{item.caption}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section location-section">
        <div className="shell location-layout">
          <div className="location-card">
            <p className="overline">Manassas detailing consultation</p>
            <h2>Let the actual condition set the plan.</h2>
            <p>
              Vehicle assessment and detailing consultations take place at the
              PRO Detailing studio in Manassas, serving drivers from Manassas
              and surrounding Northern Virginia communities.
            </p>
            <div className="location-contact">
              <a href={business.mapsUrl} target="_blank" rel="noreferrer">
                <MapPin aria-hidden="true" />
                <span>
                  {business.address}
                  <small>Open directions</small>
                </span>
              </a>
              <a href={`tel:${business.phoneHref}`}>
                <Phone aria-hidden="true" />
                <span>
                  {business.phone}
                  <small>Call the studio</small>
                </span>
              </a>
            </div>
          </div>
          <div className="areas-panel related-services-panel">
            <p className="overline">Add only what helps</p>
            <h2>Continue your protection plan.</h2>
            <div className="related-service-links">
              <Link href="/our-services/window-tinting">
                <strong>LLumar window tint</strong>
                <span>Compare CTX, IRX and AIR.</span>
              </Link>
              <Link href="/our-services/ceramic-coating">
                <strong>Ceramic Pro coating</strong>
                <span>Understand preparation and aftercare.</span>
              </Link>
              <Link href="/gallery">
                <strong>Vehicle gallery</strong>
                <span>Explore the current photo collection.</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-layout">
          <SectionIntro
            eyebrow="Auto detailing FAQ"
            title="Set expectations before the service starts."
          />
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>
                  {question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        eyebrow="Ready for a vehicle-specific detail?"
        title="Show us the condition. Tell us the priority."
        copy="We’ll confirm the interior, exterior and finish scope, timing and quote after reviewing your vehicle or clear photographs."
        service="detailing"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
