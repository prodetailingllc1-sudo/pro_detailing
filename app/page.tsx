import {
  ArrowRight,
  ArrowUpRight,
  Check,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  SunMedium,
} from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { BrandUniverse } from '@/components/site/BrandUniverse';
import { HeroExperience } from '@/components/site/HeroExperience';
import { ProtectionLab } from '@/components/site/ProtectionLab';
import { QuoteBand } from '@/components/site/QuoteBand';
import { SectionIntro } from '@/components/site/SectionIntro';
import { TintStudio } from '@/components/site/TintStudio';
import {
  business,
  galleryItems,
  processSteps,
  quoteHref,
  reviews,
  serviceAreas,
  SITE_ORIGIN,
} from '@/lib/site-data';

export const metadata: Metadata = {
  title: {
    absolute: 'Window Tint & Ceramic Coating Manassas, VA | PRO Detailing',
  },
  description:
    'Visit PRO Detailing in Manassas for LLumar window tint, Ceramic Pro coating and professional auto detailing. Preview tint options and request a quote.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Window Tint & Ceramic Coating Manassas, VA | PRO Detailing',
    description:
      'LLumar window tint, Ceramic Pro coating and professional auto detailing at our Manassas vehicle-protection studio.',
    url: '/',
  },
};

const faqs = [
  [
    'Which service should I choose first?',
    'Start with what you want to improve: cabin comfort and privacy, paint-impact protection, easier maintenance, or a complete interior/exterior reset. We inspect the vehicle and help sequence services when more than one makes sense.',
  ],
  [
    'Do you install LLumar window film?',
    'Yes. The confirmed film families presented here are CTX, IRX and AIR. We match the film and shade to your vehicle, preferences and the finished-window measurement.',
  ],
  [
    'Do you offer Ceramic Pro coatings?',
    'Yes. Ceramic Pro coating options are selected after the paint is inspected. Preparation needs, coating details and aftercare are confirmed in your written recommendation.',
  ],
  [
    'Can I get a price online?',
    'Use the appointment request to send your vehicle and service. Exact pricing depends on vehicle, condition, glass, coverage and preparation, so we confirm the scope before quoting.',
  ],
  [
    'Where is the studio?',
    `PRO Detailing is at ${business.address}. We serve drivers across Manassas and surrounding Northern Virginia communities.`,
  ],
] as const;

export default function Home() {
  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_ORIGIN}/#website`,
        name: 'PRO Detailing',
        url: SITE_ORIGIN,
        publisher: { '@id': `${SITE_ORIGIN}/#business` },
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
    <main id="main-content">
      <HeroExperience />

      <section className="signal-strip" aria-label="Protection priorities">
        <div className="shell signal-grid">
          <div>
            <SunMedium aria-hidden="true" />
            <span>
              <strong>Glass</strong> Heat · glare · UV
            </span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" />
            <span>
              <strong>Paint</strong> Impact · elements · maintenance
            </span>
          </div>
          <div>
            <Sparkles aria-hidden="true" />
            <span>
              <strong>Finish</strong> Clarity · depth · presentation
            </span>
          </div>
        </div>
      </section>

      <BrandUniverse />

      <section className="section systems-section" id="systems">
        <div className="shell">
          <SectionIntro
            eyebrow="Choose your protection system"
            title="One studio. Four ways to transform how your vehicle looks and lives."
            copy="Start with the outcome you want. We’ll help determine the product, coverage and preparation after inspecting your vehicle."
          />
          <ProtectionLab />
        </div>
      </section>

      <section className="section feature-split c63-feature">
        <div className="feature-image">
          <Image
            src="/c63/IMG_2082.webp"
            alt="White Mercedes-AMG C63 in profile outside the studio"
            width="1650"
            height="2200"
            sizes="(max-width: 780px) 100vw, 55vw"
          />
          <div className="image-coordinate">
            <span>PRO FILE / 001</span>
            <span>OWNER C63</span>
          </div>
        </div>
        <div className="feature-copy">
          <p className="eyebrow">
            <span /> Built around the vehicle
          </p>
          <h2>Protection should feel integrated—not added on.</h2>
          <p>
            Glass, paint and interior surfaces age in different ways. Our
            consultation looks at how the car is driven, parked and maintained
            before the service is configured.
          </p>
          <ul className="check-list">
            <li>
              <Check aria-hidden="true" /> Product and coverage confirmed before
              installation
            </li>
            <li>
              <Check aria-hidden="true" /> Preparation matched to current
              condition
            </li>
            <li>
              <Check aria-hidden="true" /> Aftercare explained at vehicle
              handoff
            </li>
          </ul>
          <Link className="text-link" href={quoteHref()}>
            Start a vehicle consultation <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section tint-preview-section">
        <div className="shell">
          <div className="studio-section-head">
            <SectionIntro
              eyebrow="PRO Tints Studio"
              title="See the shade before you choose the film."
              copy="Compare the confirmed LLumar CTX, IRX and AIR lines on six vehicle profiles. Product names and measured VLT are displayed separately for a clearer conversation."
            />
            <Link className="text-link" href="/tint-simulator">
              Open the full studio <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <TintStudio compact />
        </div>
      </section>

      <section className="section work-section" id="work">
        <div className="shell">
          <div className="section-title-row">
            <SectionIntro
              eyebrow="Real work · Manassas & Northern Virginia"
              title="The finish is the proof."
              copy="A selection from the current PRO Detailing portfolio and owner-provided photography."
            />
            <Link className="button button-ghost" href="/gallery">
              View all work <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="home-gallery">
            {galleryItems.slice(0, 8).map((item, index) => (
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
                  loading="lazy"
                  sizes="(max-width: 780px) 100vw, 45vw"
                />
                <span>{item.caption}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="shell">
          <SectionIntro
            eyebrow="The PRO protocol"
            title="A clear process from inspection to aftercare."
            align="center"
          />
          <ol className="process-grid">
            {processSteps.map(([number, title, copy]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section review-section">
        <div className="shell review-layout">
          <div>
            <SectionIntro
              eyebrow="Google-sourced customer feedback"
              title="The details customers notice after the handoff."
              copy="These concise review highlights are paraphrased from Google-sourced feedback published on the current pro-detailing.co website."
            />
            <a
              className="text-link"
              href={business.google}
              target="_blank"
              rel="noreferrer"
            >
              Read current Google reviews <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <div className="review-stack">
            {reviews.map((review, index) => (
              <article className="review-card" key={review.name}>
                <div className="review-card-top">
                  <span>0{index + 1}</span>
                  <small>GOOGLE REVIEW HIGHLIGHT</small>
                </div>
                <p>{review.summary}</p>
                <div className="review-author">
                  <span aria-hidden="true">
                    {review.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .slice(0, 2)}
                  </span>
                  <div>
                    <strong>{review.name}</strong>
                    <small>{review.service}</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section location-section" id="location">
        <div className="shell location-layout">
          <div className="location-card">
            <p className="overline">Manassas studio</p>
            <h2>
              Close enough to call local. Detailed enough to feel different.
            </h2>
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
            <p>
              Appointments are available Monday–Saturday. Call to confirm timing
              before visiting.
            </p>
          </div>
          <div className="areas-panel">
            <p className="overline">Serving Northern Virginia</p>
            <div className="area-cloud">
              {serviceAreas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </div>
            <p>
              Don’t see your city? Call—these are our core nearby communities,
              not a limit on who we can help.
            </p>
          </div>
        </div>
      </section>

      <section className="section aircraft-section">
        <div className="shell aircraft-card">
          <div className="aircraft-code" aria-hidden="true">
            <span>ALT</span>
            <strong>PRO</strong>
            <span>01</span>
          </div>
          <div>
            <p className="eyebrow">
              <span /> Separate specialist division
            </p>
            <h2>Aircraft care, handled by Pro Aviation Care.</h2>
            <p>
              Pro Aviation Care provides aircraft detailing, restoration and
              presentation care for private, corporate and charter aircraft
              across Washington DC, Virginia and Maryland. Pro Aviation Care is
              a DBA of Pro Detailing LLC.
            </p>
            <div className="hero-actions">
              <a
                className="button button-primary"
                href="https://proaviationcare.com/services.html"
                target="_blank"
                rel="noreferrer"
              >
                Explore aircraft services <ArrowUpRight aria-hidden="true" />
              </a>
              <a
                className="button button-ghost"
                href="https://proaviationcare.com/dispatch.html"
                target="_blank"
                rel="noreferrer"
              >
                Request ramp dispatch
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-layout">
          <SectionIntro
            eyebrow="Before you book"
            title="Straight answers, before the keys change hands."
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

      <QuoteBand />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />
    </main>
  );
}
