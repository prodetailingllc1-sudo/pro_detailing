import {
  ArrowRight,
  Radio,
  Shield,
  SunMedium,
  ThermometerSun,
} from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/site/SafeLink';

import { QuoteBand } from '@/components/site/QuoteBand';
import { SectionIntro } from '@/components/site/SectionIntro';
import { TintStudio } from '@/components/site/TintStudio';
import { createPageMetadata } from '@/lib/metadata';
import {
  filmLines,
  processSteps,
  quoteHref,
  SITE_ORIGIN,
} from '@/lib/site-data';

export const metadata = createPageMetadata({
  title: 'LLumar Window Tint Manassas, VA | PRO Tints',
  description:
    'Compare LLumar CTX, IRX and AIR ceramic films, preview shades and review measured film data before requesting installation in Manassas, VA.',
  path: '/our-services/window-tinting',
});

const faqs = [
  [
    'Which LLumar films do you install?',
    'The confirmed film families presented here are CTX, IRX and AIR. Available shades, vehicle compatibility and your recommended configuration are confirmed before installation.',
  ],
  [
    'Does the number in a film name equal its VLT?',
    'No. A name such as IRX 35 is a product designation. Use the measured visible light transmission value in the current LLumar data sheet when comparing film.',
  ],
  [
    'Will ceramic tint affect vehicle electronics?',
    'LLumar publishes a no-signal-blocking statement for CTX and describes IRX as supporting easy electronic connectivity. We do not extend that statement to products for which it is not published.',
  ],
  [
    'Can the simulator guarantee that my tint complies with the law?',
    'No. The digital studio is an appearance and education tool. Vehicle classification, factory glass and the finished-window meter reading all matter.',
  ],
  [
    'How do I get an exact tint quote?',
    'Send the year, make and model of your vehicle, the glass areas you want tinted and your comfort or appearance priority. The studio will confirm availability and pricing.',
  ],
] as const;

type TintSearchParams = { film?: string | string[] };

function selectedFilm(value: string | string[] | undefined) {
  const candidate = Array.isArray(value) ? value[0] : value;
  return filmLines.some((film) => film.id === candidate) ? candidate! : 'irx';
}

export default async function WindowTintingPage({
  searchParams,
}: {
  searchParams: Promise<TintSearchParams>;
}) {
  const initialFilm = selectedFilm((await searchParams).film);
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'LLumar Window Tint Installation',
        serviceType: 'Automotive window tinting',
        provider: { '@id': `${SITE_ORIGIN}/#business` },
        areaServed: 'Manassas, Virginia',
        url: `${SITE_ORIGIN}/our-services/window-tinting`,
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
    <main id="main-content" className="service-page tint-page">
      <section className="service-hero">
        <div className="service-hero-media" aria-hidden="true">
          <Image
            src="/gallery/white-suv-profile.webp"
            alt=""
            width="1200"
            height="900"
            priority
            sizes="100vw"
          />
          <div />
        </div>
        <div className="shell service-hero-inner">
          <div className="service-hero-copy">
            <Image
              className="service-hero-mark"
              src="/brand/pro-tints-optimized.webp"
              alt="PRO Tints"
              width="1100"
              height="204"
            />
            <p className="eyebrow">
              <span /> PRO Tints by PRO Detailing LLC
            </p>
            <h1>LLumar Window Tinting in Manassas, VA</h1>
            <p>
              We install confirmed LLumar CTX, IRX and AIR film options. Compare
              the film families, see measured VLT clearly, preview shades on a
              vehicle and request a configuration for your glass.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#studio">
                Preview LLumar shades <ArrowRight aria-hidden="true" />
              </a>
              <Link className="button button-ghost" href={quoteHref('tint')}>
                Request a tint quote
              </Link>
            </div>
          </div>
          <aside
            className="hero-spec-card"
            aria-label="LLumar tint service highlights"
          >
            <p>FILM MATRIX / 03</p>
            <div>
              <strong>CTX</strong>
              <span>Ceramic</span>
            </div>
            <div>
              <strong>IRX</strong>
              <span>Nano-ceramic</span>
            </div>
            <div>
              <strong>AIR</strong>
              <span>Virtually clear ceramic</span>
            </div>
            <small>
              Exact stock and shade availability are confirmed for your
              appointment.
            </small>
          </aside>
        </div>
      </section>

      <section className="section benefit-section">
        <div className="shell icon-benefit-grid">
          <article>
            <ThermometerSun aria-hidden="true" />
            <span>01</span>
            <h2>Cabin comfort</h2>
            <p>
              Select ceramic films are designed to help manage solar heat
              without relying on the darkest appearance.
            </p>
          </article>
          <article>
            <SunMedium aria-hidden="true" />
            <span>02</span>
            <h2>Glare control</h2>
            <p>
              Choose a measured VLT that supports your comfort and appearance
              goals while preserving useful visibility.
            </p>
          </article>
          <article>
            <Shield aria-hidden="true" />
            <span>03</span>
            <h2>UV protection</h2>
            <p>
              LLumar’s current North American performance sheet reports more
              than 99% UV protection for the listed CTX, IRX and AIR shades
              under its stated test conditions.
            </p>
          </article>
          <article>
            <Radio aria-hidden="true" />
            <span>04</span>
            <h2>Connected drive</h2>
            <p>
              LLumar states CTX does not block electronic signal transmission
              and describes IRX as supporting easy connectivity.
            </p>
          </article>
        </div>
      </section>

      <section className="section film-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Film comparison"
            title="Three ceramic paths. One clearer decision."
            copy="Film names and measured VLT are not interchangeable. We keep both visible so you can compare the appearance and specification more accurately."
          />
          <div className="film-grid">
            {filmLines.map((film, index) => (
              <article
                key={film.id}
                className={film.id === 'irx' ? 'is-featured' : ''}
              >
                <div className="film-head">
                  <span>0{index + 1}</span>
                  <small>{film.category}</small>
                </div>
                <h3>{film.name}</h3>
                <p>{film.summary}</p>
                <div className="shade-list">
                  {film.shades.map((shade) => (
                    <span key={shade.id}>
                      {shade.label}
                      <strong>
                        {shade.vlt}% <small>VLT</small>
                      </strong>
                    </span>
                  ))}
                </div>
                <Link
                  className="text-link"
                  href={`/our-services/window-tinting?film=${film.id}#studio`}
                >
                  Preview {film.name} <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
          <p className="data-note">
            Measured values shown are from LLumar’s North American automotive
            performance data (document LL0116NAEN, revision 03/26) using the
            manufacturer’s stated reference-glass testing. Vehicle glass changes
            the installed result.{' '}
            <a
              href="https://llumar.com/content/dam/eastman/performance-films/llumar/documents/LL0116NAEN_AutoSpecs_screen.pdf"
              target="_blank"
              rel="noreferrer"
            >
              View the current manufacturer data{' '}
              <span aria-hidden="true">↗</span>
            </a>
          </p>
        </div>
      </section>

      <section className="section studio-page-section" id="studio">
        <div className="shell">
          <div className="studio-section-head">
            <SectionIntro
              eyebrow="Interactive appearance lab"
              title="Build a more informed tint conversation."
              copy="Choose a vehicle profile, film, measured VLT and glass zones. The preview is approximate; your studio recommendation is based on the actual vehicle."
            />
            <Link className="text-link" href="/tint-simulator">
              Open full-screen studio <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <TintStudio compact initialLineId={initialFilm} />
        </div>
      </section>

      <section className="section coverage-section">
        <div className="shell coverage-layout">
          <div>
            <SectionIntro
              eyebrow="Coverage planning"
              title="Treat each glass area as a separate decision."
              copy="Your configuration can balance a consistent look with comfort, visibility and finished-window guidance."
            />
            <Link className="button button-primary" href={quoteHref('tint')}>
              Request a vehicle-specific quote <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="coverage-diagram">
            <div className="coverage-car">
              <Image
                src="/vehicles/sedan.webp"
                alt="Sedan glass-zone diagram"
                width="1536"
                height="1024"
                sizes="(max-width: 780px) 100vw, 54vw"
              />
            </div>
            <div className="coverage-cards">
              <article>
                <span>01</span>
                <div>
                  <h3>Front side glass</h3>
                  <p>
                    Visibility, comfort and the registered vehicle
                    classification all matter.
                  </p>
                </div>
              </article>
              <article>
                <span>02</span>
                <div>
                  <h3>Rear side & back glass</h3>
                  <p>
                    Factory privacy glass affects both appearance and the
                    combined meter reading.
                  </p>
                </div>
              </article>
              <article>
                <span>03</span>
                <div>
                  <h3>Windshield options</h3>
                  <p>
                    Discuss light ceramic film or an allowable brow only after
                    vehicle and jurisdiction review.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Installation protocol"
            title="Clean glass is only the beginning."
            align="center"
          />
          <ol className="process-grid process-grid-five">
            {processSteps.slice(0, 5).map(([number, title, copy]) => (
              <li key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section law-section">
        <div className="shell law-card">
          <div className="law-badge">
            <strong>VLT</strong>
            <span>MEASURED</span>
          </div>
          <div>
            <p className="overline">Virginia tint guidance</p>
            <h2>The meter reading—not the film name—governs.</h2>
            <p>
              Virginia’s baseline for front side windows on many passenger
              vehicles is 50% visible light transmission, but vehicle
              classification, exemptions and other glass positions change the
              analysis. Factory glass and film combine, so the finished window
              must be measured.
            </p>
            <p className="legal-note">
              This website does not certify legal compliance and is not legal
              advice. Final glass readings, vehicle classification and current
              law govern.
            </p>
            <a
              className="text-link"
              href="https://law.lis.virginia.gov/vacode/title46.2/chapter10/section46.2-1052/"
              target="_blank"
              rel="noreferrer"
            >
              Read Virginia Code § 46.2-1052 <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-layout">
          <SectionIntro
            eyebrow="LLumar tint FAQ"
            title="Questions worth answering before installation."
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
        eyebrow="Ready for a clearer recommendation?"
        title="Tell us what you drive and what you want the glass to do."
        copy="We’ll confirm the LLumar film, measured shade, coverage, availability and installed quote for your vehicle."
        service="tint"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </main>
  );
}
