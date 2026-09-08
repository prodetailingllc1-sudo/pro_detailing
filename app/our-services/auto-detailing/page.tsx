import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Droplets,
  Focus,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';

import { QuoteBand } from '@/components/site/QuoteBand';
import { SectionIntro } from '@/components/site/SectionIntro';
import { business, galleryItems, SITE_ORIGIN } from '@/lib/site-data';

export const metadata: Metadata = {
  title: { absolute: 'Auto Detailing Manassas, VA | PRO Detailing' },
  description:
    'Explore inspection-led auto detailing in Manassas, VA, with interior cleaning, exterior decontamination and finish refinement planned for your vehicle.',
  alternates: { canonical: '/our-services/auto-detailing' },
  openGraph: {
    title: 'Auto Detailing Manassas, VA | PRO Detailing',
    description:
      'Inspection-led interior and exterior auto detailing at the PRO Detailing studio in Manassas, Virginia.',
    url: '/our-services/auto-detailing',
  },
};

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
  'foam-covered-saloon',
  'studio-front-dark-saloon',
  'white-suv-studio-door',
]
  .map((id) => galleryItems.find((item) => item.id === id))
  .filter((item): item is (typeof galleryItems)[number] => Boolean(item));

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
            src="/gallery/studio-front-dark-saloon.webp"
            alt=""
            width="1800"
            height="1200"
            priority
            sizes="100vw"
          />
          <div />
        </div>
        <div className="shell service-hero-inner">
          <div className="service-hero-copy">
            <Image
              className="service-hero-mark"
              src="/brand/pro-detailing.png"
              alt="PRO Detailing"
              width="1100"
              height="470"
            />
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
              <a className="button button-primary" href="#workflow">
                See the studio workflow <ArrowRight aria-hidden="true" />
              </a>
              <a className="button button-ghost" href={business.bookingUrl}>
                Request a detailing quote
              </a>
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
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
