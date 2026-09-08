import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CarFront,
  Check,
  CircleGauge,
  House,
  KeyRound,
  MapPin,
  PanelsTopLeft,
  Plane,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  SunMedium,
  Wrench,
} from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/site/SafeLink';

import { BrandUniverse } from '@/components/site/BrandUniverse';
import { HeroExperience } from '@/components/site/HeroExperience';
import { ProtectionLab } from '@/components/site/ProtectionLab';
import { QuoteBand } from '@/components/site/QuoteBand';
import { SectionIntro } from '@/components/site/SectionIntro';
import { TintStudio } from '@/components/site/TintStudio';
import { featuredArticles } from '@/lib/blog-data';
import {
  additionalServices,
  googleReviewSnapshot,
  specialistMarques,
} from '@/lib/expanded-content';
import { siteFeatures } from '@/lib/site-config';
import { createPageMetadata } from '@/lib/metadata';
import {
  business,
  galleryItems,
  processSteps,
  quoteHref,
  serviceAreas,
  SITE_ORIGIN,
} from '@/lib/site-data';

export const metadata = createPageMetadata({
  title: 'Window Tint & Ceramic Coating Manassas, VA | PRO Detailing',
  description:
    'Visit PRO Detailing in Manassas for LLumar window tint, Ceramic Pro coating and professional auto detailing. Preview tint options and request a quote.',
  path: '/',
});

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

const homeGalleryIds = [
  'sports-car-in-bay',
  'blue-pickup-profile',
  'grey-suv-profile',
  'green-saloon-profile',
  'white-pickup-forecourt',
  'white-convertible-lot',
  'white-audi-suv-bay-door',
  'silver-sports-car-forecourt',
] as const;

const homeGallery = homeGalleryIds.flatMap((id) => {
  const item = galleryItems.find((entry) => entry.id === id);
  return item ? [item] : [];
});

const additionalServiceIcons: Record<string, typeof CarFront> = {
  'mobile-detailing': CarFront,
  'residential-window-tinting': House,
  'maintenance-oil-change': Wrench,
  'tire-service': CircleGauge,
  'auto-glass': PanelsTopLeft,
  'key-replacement': KeyRound,
};

const homeServiceOrder = [
  'maintenance-oil-change',
  'tire-service',
  'auto-glass',
  'key-replacement',
  'mobile-detailing',
  'residential-window-tinting',
] as const;

export default function Home() {
  const homeCareServices = homeServiceOrder.flatMap((slug) => {
    if (slug === 'mobile-detailing' && !siteFeatures.mobileDetailing) return [];

    const service = additionalServices.find((item) => item.slug === slug);
    return service ? [service] : [];
  });
  const completeServiceCount = homeCareServices.length + 5;

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

      <BrandUniverse serviceCount={completeServiceCount} />

      <section className="section home-service-network" id="all-services">
        <div className="shell">
          <div className="section-title-row">
            <SectionIntro
              eyebrow={`Complete service network / ${completeServiceCount} paths`}
              title={`All ${completeServiceCount} services, clearly organized.`}
              copy={
                siteFeatures.mobileDetailing
                  ? 'Choose maintenance, tire service, auto glass, automotive locksmith, mobile detailing or residential tint. Aircraft care opens through the dedicated Pro Aviation Care site.'
                  : 'Choose maintenance, tire service, auto glass, automotive locksmith or residential tint. Aircraft care opens through the dedicated Pro Aviation Care site.'
              }
            />
            <Link className="button button-ghost" href="/our-services">
              View service directory <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="home-service-network-grid">
            {homeCareServices.map((service, index) => {
              const Icon = additionalServiceIcons[service.slug];
              return (
                <Link
                  className="home-service-card"
                  href={`/our-services/${service.slug}`}
                  key={service.slug}
                >
                  <div className="home-service-card-media">
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(min-width: 1051px) 24vw, (min-width: 781px) 46vw, 92vw"
                    />
                    <span>CARE / {String(index + 5).padStart(2, '0')}</span>
                  </div>
                  <div className="home-service-card-top">
                    <span>{String(index + 5).padStart(2, '0')}</span>
                    <Icon aria-hidden="true" />
                  </div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <strong>
                    Explore service <ArrowRight aria-hidden="true" />
                  </strong>
                </Link>
              );
            })}
            <Link
              aria-label="Open the Pro Aviation Care website in a new tab"
              className={`home-service-card home-service-card-aviation ${
                siteFeatures.mobileDetailing
                  ? ''
                  : 'home-service-card-aviation-wide'
              }`.trim()}
              href="https://proaviationcare.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="home-service-card-media">
                <Image
                  src="/gallery/pro-service-private-jet-cleaning.webp"
                  alt="Private jet positioned for specialist exterior and cabin care."
                  fill
                  sizes="(min-width: 1051px) 48vw, 92vw"
                />
                <span>
                  AVIATION / {String(completeServiceCount).padStart(2, '0')}
                </span>
              </div>
              <div className="home-service-card-top">
                <span>{String(completeServiceCount).padStart(2, '0')}</span>
                <Plane aria-hidden="true" />
              </div>
              <h3>Pro Aviation Care</h3>
              <p>
                Dedicated exterior, cabin and presentation care for private,
                corporate and charter aircraft across the DMV region.
              </p>
              <strong>
                Open aviation site <ArrowUpRight aria-hidden="true" />
              </strong>
            </Link>
          </div>
        </div>
      </section>

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

      <section className="section marque-section">
        <div className="shell marque-layout">
          <div>
            <p className="eyebrow">
              <span /> Luxury & performance experience
            </p>
            <h2>Specialist attention for vehicles where details compound.</h2>
            <p>
              We tailor the inspection, surface preparation, film coverage and
              material care to the vehicle in front of us. Brand familiarity
              never replaces a model-specific check—and does not imply factory
              authorization.
            </p>
            <Link className="text-link" href={quoteHref()}>
              Tell us what you drive <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="marque-grid" aria-label="Specialist vehicle marques">
            {specialistMarques.map((marque, index) => (
              <li key={marque}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{marque}</strong>
              </li>
            ))}
          </ul>
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
          <div className="work-film-feature" id="pro-fleet-film">
            <div className="work-film-copy">
              <p className="overline">PRO original film · 00:34</p>
              <h3>Mercedes-Maybach GLS. BMW M8. Mercedes-AMG GLE 63.</h3>
              <p>
                Three standout vehicles, one PRO standard. Watch the original
                PRO Detailing fleet film in its complete portrait frame.
              </p>
              <ul
                className="work-film-models"
                aria-label="Vehicles in the film"
              >
                <li>Mercedes-Maybach GLS</li>
                <li>BMW M8</li>
                <li>Mercedes-AMG GLE 63</li>
              </ul>
              <Link className="text-link" href={quoteHref()}>
                Bring us your vehicle <ArrowRight aria-hidden="true" />
              </Link>
            </div>

            <figure className="work-film-frame">
              <div className="work-film-monitor-bar" aria-hidden="true">
                <span>
                  <i /> Original portfolio footage
                </span>
                <span>PRO / FILM 001</span>
              </div>
              <div className="work-film-screen">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  aria-describedby="pro-fleet-film-caption"
                >
                  <source
                    src="/assets/pro-signature-fleet.mp4"
                    type="video/mp4"
                  />
                  <track
                    default
                    kind="captions"
                    label="English"
                    src="/assets/pro-signature-fleet.vtt"
                    srcLang="en"
                  />
                  Your browser does not support this video. You can{' '}
                  <Link href="/assets/pro-signature-fleet.mp4">
                    open the film here
                  </Link>
                  .
                </video>
              </div>
              <figcaption id="pro-fleet-film-caption">
                <span>Manassas, Virginia</span>
                <span>Full frame · sound available</span>
              </figcaption>
            </figure>
          </div>
          <div className="home-gallery">
            {homeGallery.map((item, index) => (
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

      <section className="section home-blog-section">
        <div className="shell">
          <div className="section-title-row">
            <SectionIntro
              eyebrow="PRO knowledge library"
              title="Useful answers before the appointment."
              copy="The rebuilt library starts with nine current guides and keeps the complete 67-article source archive connected."
            />
            <Link className="button button-ghost" href="/blog">
              Browse all guides <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="home-blog-grid">
            {featuredArticles.slice(0, 3).map((article, index) => (
              <Link href={`/blog/${article.slug}`} key={article.slug}>
                <div>
                  <span>0{index + 1}</span>
                  <BookOpen aria-hidden="true" />
                </div>
                <small>{article.category}</small>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <strong>
                  Read guide <ArrowRight aria-hidden="true" />
                </strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section review-section">
        <div className="shell review-layout">
          <div>
            <SectionIntro
              eyebrow={`${googleReviewSnapshot.rating} on Google · ${googleReviewSnapshot.count} reviews`}
              title="Current customer feedback, linked to the source."
              copy={`Verified ${googleReviewSnapshot.verified}. Review highlights are concise paraphrases; each card links directly to its Google review.`}
            />
            <div className="review-actions">
              <a
                className="text-link"
                href={googleReviewSnapshot.profileUrl}
                target="_blank"
                rel="noreferrer"
              >
                Read current Google reviews <ArrowUpRight aria-hidden="true" />
              </a>
              <Link className="text-link" href="/reviews">
                Open the reviews page <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="review-stack">
            {googleReviewSnapshot.reviews.map((review, index) => (
              <article className="review-card" key={review.name}>
                <div className="review-card-top">
                  <span>0{index + 1}</span>
                  <span className="review-stars" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star aria-hidden="true" key={star} />
                    ))}
                  </span>
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
                    <small>
                      {review.service} · {review.age}
                    </small>
                  </div>
                </div>
                <a
                  className="review-source-link"
                  href={review.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Read ${review.name}'s review on Google`}
                >
                  Source <ArrowUpRight aria-hidden="true" />
                </a>
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
