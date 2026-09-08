import Image from 'next/image';
import Link from '@/components/site/SafeLink';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  Droplets,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

import { CeramicLab } from '@/components/site/CeramicLab';
import { QuoteBand } from '@/components/site/QuoteBand';
import { SectionIntro } from '@/components/site/SectionIntro';
import {
  ceramicProDealerStatus,
  ceramicProPaintPackages,
  ceramicProPpfCompatibility,
  ceramicProResources,
  ceramicProSurfaceOfferings,
} from '@/lib/ceramic-pro-data';
import { createPageMetadata } from '@/lib/metadata';
import {
  business,
  galleryItems,
  quoteHref,
  SITE_ORIGIN,
} from '@/lib/site-data';

const ceramicCoatingUrl = `${SITE_ORIGIN}/our-services/ceramic-coating`;
const authorizedCeramicProOfferings = [
  ...ceramicProPaintPackages,
  ...ceramicProSurfaceOfferings,
];

function galleryItem(id: string) {
  return galleryItems.find((item) => item.id === id) ?? galleryItems[0];
}

const finishGallery = [
  galleryItem('grey-coupe-dusk'),
  galleryItem('silver-sports-car-forecourt'),
  galleryItem('dark-fastback-drive'),
];

export const metadata = createPageMetadata({
  title: 'Ceramic Pro Certified Installer Manassas, VA | PRO Detailing',
  description:
    'Explore Ceramic Pro Gold, Silver, Bronze, Sport and specialty coatings from a Ceramic Pro Certified Installer and Authorized Dealer in Manassas, VA.',
  path: '/our-services/ceramic-coating',
});

const benefits = [
  {
    icon: Sparkles,
    title: 'Gloss and visual depth',
    copy: 'A coating can enhance the appearance of properly prepared paint. Existing defects may remain visible unless correction is separately agreed.',
  },
  {
    icon: Droplets,
    title: 'Hydrophobic behavior',
    copy: 'Water can bead and move from the coated surface more readily, helping make routine washing and drying more manageable.',
  },
  {
    icon: ShieldCheck,
    title: 'Environmental resistance',
    copy: 'The coating adds a protective layer designed to resist UV exposure, oxidation and common environmental contamination.',
  },
] as const;

const process = [
  {
    number: '01',
    title: 'Inspect and define the scope',
    copy: 'We review paint condition, visible defects, contamination and the surfaces you want treated under focused lighting.',
  },
  {
    number: '02',
    title: 'Wash and decontaminate',
    copy: 'The vehicle is cleaned and bonded contamination is addressed as the condition requires, creating a sound base for later steps.',
  },
  {
    number: '03',
    title: 'Refine only where agreed',
    copy: 'Paint correction may improve clarity, but it is not silently assumed or described as included. Any correction plan is confirmed with you first.',
  },
  {
    number: '04',
    title: 'Apply and quality-check',
    copy: 'The selected Ceramic Pro coating is applied methodically, then the treated surfaces are checked in appropriate lighting.',
  },
  {
    number: '05',
    title: 'Handoff with aftercare',
    copy: 'You receive product-specific initial-care, washing and maintenance guidance. Timing is confirmed for the coating and conditions used on your vehicle.',
  },
] as const;

const faqs = [
  {
    question: 'What does a Ceramic Pro coating help with?',
    answer:
      'It can enhance gloss, create hydrophobic surface behavior and add resistance to UV exposure, oxidation and everyday environmental contamination. Routine washing is still required.',
  },
  {
    question: 'Which Ceramic Pro packages does PRO Detailing offer?',
    answer:
      'The currently confirmed paint packages are Gold, Silver, Bronze and Sport. Confirmed specialty offerings are Glass, Wheel & Caliper, LUX Interior and Leather/Textile. We inspect the vehicle before recommending the product and preparation plan.',
  },
  {
    question: 'Will ceramic coating prevent scratches or rock chips?',
    answer:
      'No. A coating is not scratch-proof and is not a substitute for paint protection film where impact and road-debris protection are the priority.',
  },
  {
    question: 'Is paint correction included with every coating?',
    answer:
      'Not automatically. We inspect the paint first and explain whether correction may improve the result. Any correction work is agreed as part of the written scope.',
  },
  {
    question: 'How long do application and initial care take?',
    answer:
      'Timing varies with vehicle condition, preparation, treated surfaces, the selected coating and shop conditions. We confirm the service schedule and product-specific initial-care instructions for your appointment.',
  },
  {
    question: 'How long will the coating last?',
    answer:
      'Service life depends on the selected product, preparation, vehicle use, exposure and maintenance. We review the relevant product details and care expectations before work begins.',
  },
  {
    question: 'Can ceramic coating and paint protection film be combined?',
    answer: ceramicProPpfCompatibility,
  },
  {
    question: 'What warranty and annual service apply?',
    answer:
      'Warranty and annual-service requirements depend on the selected Ceramic Pro offering and current manufacturer terms. Leather/Textile carries a confirmed two-year manufacturer warranty. We document the applicable warranty, registration, service timing, included work and current price before handoff.',
  },
  {
    question: 'What do you need for an exact coating quote?',
    answer:
      'Send the vehicle year, make and model, current paint condition, the surfaces you want treated and a few clear photos. We will confirm preparation, coating scope, timing and price for that vehicle.',
  },
] as const;

export default function CeramicCoatingPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${ceramicCoatingUrl}#service`,
        name: 'Ceramic Pro Coating',
        serviceType: 'Automotive ceramic coating',
        provider: { '@id': `${SITE_ORIGIN}/#business` },
        areaServed: 'Manassas, Virginia',
        url: ceramicCoatingUrl,
        description: metadata.description,
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Authorized Ceramic Pro coating offerings',
          itemListElement: authorizedCeramicProOfferings.map((offering) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: `Ceramic Pro ${offering.name}`,
            },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${ceramicCoatingUrl}#faq`,
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main id="main-content" className="service-page ceramic-page">
      <section className="service-hero ceramic-service-hero">
        <div className="service-hero-media" aria-hidden="true">
          <Image
            src="/generated/ceramic-application-v2.webp"
            alt=""
            width="1536"
            height="1024"
            priority
            sizes="100vw"
          />
          <div />
        </div>
        <div className="shell service-hero-inner">
          <div className="service-hero-copy">
            <Image
              className="service-hero-mark"
              src="/brand/pro-ceramic-optimized.webp"
              alt="PRO ceramic coating service"
              width="1100"
              height="174"
            />
            <p className="eyebrow">
              <BadgeCheck aria-hidden="true" /> {ceramicProDealerStatus.primary}
            </p>
            <h1>Ceramic Pro Coating in Manassas, VA</h1>
            <p>
              We inspect and prepare the paint before recommending a Ceramic Pro
              coating. The product, preparation, application plan and aftercare
              are confirmed for your vehicle—not guessed from a generic package.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#coating-lab">
                Explore the process <ArrowRight aria-hidden="true" />
              </a>
              <Link className="button button-ghost" href={quoteHref('ceramic')}>
                Request a coating quote
              </Link>
            </div>
          </div>
          <aside
            className="hero-spec-card"
            aria-label="Ceramic coating service plan"
          >
            <p>SURFACE PROTOCOL / 04</p>
            <div>
              <strong>01</strong>
              <span>Paint assessment</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Surface preparation</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Methodical application</span>
            </div>
            <div>
              <strong>04</strong>
              <span>Vehicle-specific aftercare</span>
            </div>
            <small>
              Exact product, preparation, timing and price are confirmed after
              the vehicle is assessed.
            </small>
          </aside>
        </div>
      </section>

      <section className="section benefit-section">
        <div className="shell">
          <SectionIntro
            eyebrow="What coating changes"
            title="A better-behaving finish, built on proper preparation."
            copy="Ceramic coating supports appearance and routine care. The condition underneath—and how the vehicle is maintained afterward—still matters."
          />
          <div className="icon-benefit-grid coating-benefit-grid">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <article key={benefit.title}>
                  <Icon aria-hidden="true" />
                  <span>0{index + 1}</span>
                  <h2>{benefit.title}</h2>
                  <p>{benefit.copy}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="section ceramic-program-section"
        id="ceramic-pro-packages"
      >
        <div className="shell">
          <div className="ceramic-program-head">
            <div>
              <p className="eyebrow">
                <span /> Manufacturer-confirmed program
              </p>
              <h2>Authorized Ceramic Pro options, organized by surface.</h2>
              <p>
                These are the Ceramic Pro offerings confirmed for PRO Detailing.
                Product layers, preparation, covered surfaces, warranty and
                price are reviewed before the work is approved.
              </p>
            </div>
            <aside
              className="ceramic-status-card"
              aria-label="Ceramic Pro dealer designations"
            >
              <span>ACCOUNT DESIGNATION / CONFIRMED</span>
              <BadgeCheck aria-hidden="true" />
              <strong>{ceramicProDealerStatus.primary}</strong>
              <ul>
                {ceramicProDealerStatus.supporting.map((designation) => (
                  <li key={designation}>{designation}</li>
                ))}
              </ul>
            </aside>
          </div>

          <div className="ceramic-offer-columns">
            <div className="ceramic-offer-group">
              <div className="ceramic-offer-group-head">
                <p className="overline">Exterior paint packages</p>
                <span>04 OPTIONS</span>
              </div>
              <div className="ceramic-offer-grid">
                {ceramicProPaintPackages.map((offering, index) => (
                  <article
                    className={`ceramic-offer-card tone-${offering.id}`}
                    key={offering.id}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <div>
                      <small>{offering.category}</small>
                      <h3>{offering.name}</h3>
                    </div>
                    <Check aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>

            <div className="ceramic-offer-group">
              <div className="ceramic-offer-group-head">
                <p className="overline">Specialty surfaces</p>
                <span>04 OPTIONS</span>
              </div>
              <div className="ceramic-offer-grid">
                {ceramicProSurfaceOfferings.map((offering, index) => (
                  <article className="ceramic-offer-card" key={offering.id}>
                    <span>{String(index + 5).padStart(2, '0')}</span>
                    <div>
                      <small>{offering.category}</small>
                      <h3>{offering.name}</h3>
                      {'warranty' in offering ? (
                        <em>{offering.warranty}</em>
                      ) : null}
                    </div>
                    <Check aria-hidden="true" />
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="ceramic-resource-panel">
            <div>
              <p className="overline">Warranty & aftercare</p>
              <h3>Current terms stay attached to the selected product.</h3>
              <p>
                Where annual service is required, the applicable anniversary
                window, included work and current service price are confirmed in
                writing. Leather/Textile carries a two-year manufacturer
                warranty. Manufacturer terms and documents may be revised.
              </p>
              <Link
                className="button button-primary"
                href={quoteHref('ceramic')}
              >
                Request a package recommendation{' '}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <nav aria-label="Official Ceramic Pro resources">
              {ceramicProResources.map((resource) => (
                <a
                  href={resource.href}
                  key={resource.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{resource.label}</span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      <section className="section coating-truth-section">
        <div className="shell coating-truth-layout">
          <div>
            <p className="eyebrow">
              <span /> Honest limits
            </p>
            <h2>
              Coating changes maintenance. It does not make paint invincible.
            </h2>
            <p>
              The right expectation is part of the service. A ceramic coating
              can support gloss, water behavior and resistance to contamination,
              but it cannot remove the need for careful ownership.
            </p>
          </div>
          <div className="truth-card-grid">
            <article className="truth-card">
              <p className="overline">What it can support</p>
              <ul className="check-list">
                <li>
                  <Check aria-hidden="true" /> Enhanced gloss on properly
                  prepared paint
                </li>
                <li>
                  <Check aria-hidden="true" /> Hydrophobic behavior and easier
                  routine cleaning
                </li>
                <li>
                  <Check aria-hidden="true" /> Added resistance to common
                  environmental exposure
                </li>
              </ul>
            </article>
            <article className="truth-card truth-card-limit">
              <p className="overline">What it does not promise</p>
              <ul>
                <li>It is not scratch-proof or rock-chip protection.</li>
                <li>It does not remove defects already in the paint.</li>
                <li>It is not maintenance-free or permanent protection.</li>
                <li>Results still depend on preparation, use and aftercare.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section ceramic-page-section" id="coating-lab">
        <div className="shell">
          <SectionIntro
            eyebrow="Interactive preparation lab"
            title="The finished result starts before application."
            copy="Explore the inspection, preparation, application and aftercare sequence. The reveal is a visual aid; it is not a promised outcome for every paint system."
          />
          <CeramicLab />
        </div>
      </section>

      <section className="section process-section" id="coating-process">
        <div className="shell">
          <SectionIntro
            eyebrow="The coating protocol"
            title="Five decisions between arrival and handoff."
            copy="The scope follows the vehicle. Nothing about correction, product choice or care timing is assumed before the paint is reviewed."
            align="center"
          />
          <ol className="process-grid process-grid-five coating-process-grid">
            {process.map((step) => (
              <li key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section comparison-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Coating or paint protection film?"
            title="Different protection jobs. Often a complementary plan."
            copy="Choose by the damage or maintenance problem you want to solve—not by treating the two systems as interchangeable."
          />
          <div className="comparison-table-wrap">
            <table className="protection-comparison">
              <caption className="sr-only">
                Comparison of ceramic coating and paint protection film
              </caption>
              <thead>
                <tr>
                  <th scope="col">Decision</th>
                  <th scope="col">Ceramic coating</th>
                  <th scope="col">Paint protection film</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Primary role</th>
                  <td>
                    Surface behavior, gloss and easier routine maintenance.
                  </td>
                  <td>A physical film barrier on the paint areas it covers.</td>
                </tr>
                <tr>
                  <th scope="row">Helps address</th>
                  <td>
                    Water behavior, environmental contamination and finish
                    presentation.
                  </td>
                  <td>
                    Road debris, stone chips and light surface abrasion in
                    covered zones.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Important limit</th>
                  <td>
                    Not designed to absorb meaningful road impact or stop rock
                    chips.
                  </td>
                  <td>
                    Does not eliminate washing, care or every form of damage.
                  </td>
                </tr>
                <tr>
                  <th scope="row">Planning the two together</th>
                  <td colSpan={2}>
                    {ceramicProPpfCompatibility} Coverage and application order
                    are confirmed after inspection.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="comparison-actions">
            <Link className="button button-primary" href={quoteHref('ceramic')}>
              Compare options for my vehicle <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="text-link" href="/#quote">
              Ask about paint protection film <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section work-section coating-gallery-section">
        <div className="shell">
          <div className="section-title-row">
            <SectionIntro
              eyebrow="Current PRO portfolio"
              title="Finish, color and reflection—presented accurately."
              copy="These photographs come from the current PRO Detailing and owner-supplied collection. They show visible finish only; the individual service performed on each vehicle has not been verified."
            />
            <Link className="button button-ghost" href="/gallery">
              Explore the gallery <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="home-gallery coating-gallery">
            {finishGallery.map((item, index) => (
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
                  sizes="(max-width: 760px) 100vw, 33vw"
                />
                <span>{item.caption}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section location-section ceramic-location-section">
        <div className="shell location-layout">
          <div className="location-card">
            <p className="overline">Manassas ceramic coating consultation</p>
            <h2>Bring the paint to the conversation.</h2>
            <p>
              Condition, prior work, storage and daily use all shape the right
              recommendation. Our Manassas studio serves drivers from the city
              and surrounding Northern Virginia communities.
            </p>
            <address className="location-contact">
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
            </address>
          </div>
          <div className="areas-panel related-services-panel">
            <p className="overline">Build the complete plan</p>
            <h2>Protect more than the paint surface.</h2>
            <div className="related-service-links">
              <Link href="/our-services/window-tinting">
                <strong>LLumar window tint</strong>
                <span>Compare CTX, IRX and AIR options.</span>
              </Link>
              <Link href="/tint-simulator">
                <strong>PRO Tints Studio</strong>
                <span>Preview film and shade on a vehicle.</span>
              </Link>
              <Link href="/gallery">
                <strong>Vehicle gallery</strong>
                <span>Explore the current image collection.</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-layout">
          <SectionIntro
            eyebrow="Ceramic coating FAQ"
            title="Clear answers before the coating decision."
          />
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question} open={index === 0}>
                <summary>
                  {faq.question}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand
        eyebrow="Ready for a vehicle-specific coating plan?"
        title="Start with the paint you have—not a package assumption."
        copy="Tell us what you drive, its current condition and what you want to improve. We’ll confirm preparation, coating scope, timing, aftercare and price before work begins."
        service="ceramic"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </main>
  );
}
