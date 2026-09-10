import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  CarFront,
  Check,
  CircleGauge,
  House,
  KeyRound,
  Palette,
  PanelsTopLeft,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/site/SafeLink';

import { QuoteBand } from '@/components/site/QuoteBand';
import { SectionIntro } from '@/components/site/SectionIntro';
import { WrapStudio } from '@/components/site/WrapStudio';
import type { ExtendedService } from '@/lib/expanded-content';
import { quoteHref, SITE_ORIGIN } from '@/lib/site-data';

const serviceIcons: Record<string, LucideIcon> = {
  'vehicle-wraps': Palette,
  'mobile-detailing': CarFront,
  'residential-window-tinting': House,
  'maintenance-oil-change': Wrench,
  'tire-service': CircleGauge,
  'auto-glass': PanelsTopLeft,
  'key-replacement': KeyRound,
};

export function AdditionalServicePage({
  service,
}: {
  service: ExtendedService;
}) {
  const Icon = serviceIcons[service.slug] ?? ShieldCheck;
  const isMaintenancePackage =
    service.slug === 'maintenance-oil-change' ||
    service.slug === 'tire-service';
  const isWrapService = service.slug === 'vehicle-wraps';
  const serviceUrl = `${SITE_ORIGIN}/our-services/${service.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: service.name,
        serviceType: service.serviceType,
        provider: { '@id': `${SITE_ORIGIN}/#business` },
        areaServed: ['Manassas', 'Northern Virginia'],
        url: serviceUrl,
        image: [
          service.image,
          ...(service.media?.map((item) => item.src) ?? []),
        ].map((src) => `${SITE_ORIGIN}${src}`),
      },
      {
        '@type': 'FAQPage',
        mainEntity: service.faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  };

  return (
    <main id="main-content" className="service-page extended-service-page">
      <section className="extended-service-hero">
        <div className="extended-service-grid" aria-hidden="true" />
        <div className="shell extended-service-hero-layout">
          <div className="extended-service-hero-copy">
            <p className="eyebrow">
              <span /> {service.eyebrow}
            </p>
            <h1>{service.title}</h1>
            <p>{service.description}</p>
            <div className="hero-actions">
              <Link
                className="button button-primary"
                href={quoteHref(service.quoteService)}
              >
                Request a service quote <ArrowRight aria-hidden="true" />
              </Link>
              <a
                className="button button-ghost"
                href={isWrapService ? '#wrap-studio' : '#pathways'}
              >
                {isWrapService ? 'Open color studio' : 'Explore service paths'}
              </a>
            </div>
          </div>
          <div className="service-console">
            <div className="service-console-shadow" aria-hidden="true" />
            <div className="service-console-card">
              <Image
                className="service-console-image"
                src={service.image}
                alt={service.imageAlt}
                fill
                sizes="(min-width: 1050px) 42vw, (min-width: 780px) 520px, 94vw"
                priority
              />
              <div className="service-console-scrim" aria-hidden="true" />
              <div className="service-console-top">
                <span>PRO SERVICE / ACTIVE</span>
                <i />
              </div>
              <div className="service-console-main">
                <Icon aria-hidden="true" />
                <span>{service.eyebrow}</span>
                <strong>{service.shortName}</strong>
              </div>
              <ol>
                <li>
                  <span>01</span> Inspect
                </li>
                <li>
                  <span>02</span> Configure
                </li>
                <li>
                  <span>03</span> Confirm
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section extended-benefits">
        <div className="shell extended-benefit-grid">
          {service.highlights.map((item, index) => (
            <article key={item.title}>
              <span>0{index + 1}</span>
              <Icon aria-hidden="true" />
              <h2>{item.title}</h2>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {isWrapService ? (
        <section
          className="section studio-full-section wrap-studio-section wrap-service-studio"
          id="wrap-studio"
        >
          <div className="shell">
            <div className="studio-section-head">
              <SectionIntro
                eyebrow="PRO Wrap Studio"
                title="Explore color on the body—not across the glass."
                copy="Choose a vehicle profile, color direction and finish, then hold the comparison control to return to the original paint. The visual is a planning aid; approve the exact film from a physical sample."
              />
              <Link
                className="text-link"
                href={quoteHref(service.quoteService)}
              >
                Bring this direction to the team{' '}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
            <WrapStudio />
          </div>
        </section>
      ) : null}

      {service.media?.length ? (
        <section className="section extended-service-media-section">
          <div className="shell">
            <SectionIntro
              eyebrow="Inside the service"
              title={`See ${service.shortName.toLowerCase()} in clear, specific stages.`}
              copy="Review the individual work—not one generic vehicle photo—before choosing the service path that fits your concern."
            />
            <div className="extended-service-media-grid">
              {service.media.map((item, index) => (
                <figure key={item.src}>
                  <div className="extended-service-media-frame">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="(max-width: 780px) 100vw, 50vw"
                    />
                    <span>{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <figcaption>
                    <p>{item.eyebrow}</p>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className="extended-service-media-note">
              These original service visualizations illustrate typical work
              stages; they are not customer-vehicle photos. Vehicle condition,
              parts, repairability, equipment and final scope are confirmed
              after inspection.
            </p>
          </div>
        </section>
      ) : null}

      {service.capabilities ? (
        <section className="section capability-index-section">
          <div className="shell">
            <SectionIntro
              eyebrow="Complete capability index"
              title="The individual services—visible before you ask."
              copy="The menu is shown clearly here while availability and compatibility remain subject to the exact vehicle and inspection."
            />
            <div className="capability-index-grid">
              {service.capabilities.map((capability, index) => (
                <article key={capability.group}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h2>{capability.group}</h2>
                  <ul>
                    {capability.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section pathway-section" id="pathways">
        <div className="shell">
          <SectionIntro
            eyebrow={
              isMaintenancePackage
                ? 'Maintenance & tire packages'
                : 'Configure the right visit'
            }
            title={
              isMaintenancePackage
                ? 'Useful package starting points—without invented pricing.'
                : 'Clear starting points—then a vehicle or property-specific quote.'
            }
            copy="These packages organize the conversation without pretending every project needs the same products, parts, labor or price."
          />
          <div className="pathway-grid">
            {service.pathways.map((pathway, index) => (
              <article key={pathway.name}>
                <div className="pathway-card-head">
                  <span>0{index + 1}</span>
                  <small>{pathway.label}</small>
                </div>
                <h2>{pathway.name}</h2>
                <p>{pathway.copy}</p>
                <ul>
                  {pathway.includes.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" /> {item}
                    </li>
                  ))}
                </ul>
                <Link
                  className="text-link"
                  href={quoteHref(service.quoteService, `path-${index + 1}`)}
                >
                  Configure this path <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <p className="scope-note">
            No unverified package price is shown. Final parts, materials,
            compatibility, labor, availability and price are confirmed before
            work begins.
          </p>
        </div>
      </section>

      <section className="section extended-process-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Service protocol"
            title="A short path from request to confirmed scope."
            align="center"
          />
          <ol className="extended-process-grid">
            {service.process.map((step, index) => (
              <li key={step.title}>
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-layout">
          <div>
            <SectionIntro
              eyebrow={`${service.shortName} FAQ`}
              title="Know what will be confirmed before the appointment."
            />
            <p className="new-service-note">
              This service scope is hosted in the new PRO Detailing app.
              Products, parts, compatibility and availability are confirmed
              before an appointment is accepted.
            </p>
          </div>
          <div className="faq-list">
            {service.faqs.map(([question, answer], index) => (
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
        eyebrow={`Plan ${service.shortName.toLowerCase()}`}
        title="Tell us what you need. We’ll confirm what the job requires."
        copy="Send the vehicle or property details, condition, priority, location and timing. The team will confirm fit, availability, scope and price."
        service={service.quoteService}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
