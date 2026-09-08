import Image from 'next/image';
import Link from '@/components/site/SafeLink';
import { ArrowRight, Check, Focus, Layers3, ShieldCheck } from 'lucide-react';

import { QuoteBand } from '@/components/site/QuoteBand';
import { PpfWordmark } from '@/components/site/PpfWordmark';
import { SectionIntro } from '@/components/site/SectionIntro';
import { createPageMetadata } from '@/lib/metadata';
import { processSteps, quoteHref, SITE_ORIGIN } from '@/lib/site-data';

export const metadata = createPageMetadata({
  title: 'Paint Protection Film Manassas, VA | PRO PPF',
  description:
    'Plan LLumar paint protection film coverage for your vehicle at PRO Detailing in Manassas, VA. Compare impact zones and request an inspection-led quote.',
  path: '/our-services/paint-protection-film',
});

const coverage = [
  [
    'Impact zones',
    'Start with the bumper, leading hood and other forward-facing areas where road debris arrives first.',
  ],
  [
    'Front-end planning',
    'Consider adjoining panels and edges for a more continuous visual result after the vehicle is inspected.',
  ],
  [
    'Broader coverage',
    'For drivers prioritizing more extensive paint protection, additional panels can be scoped around use and condition.',
  ],
] as const;

const faqs = [
  [
    'What does paint protection film help protect against?',
    'PPF adds a physical film barrier to the paint areas it covers, helping take the first contact from road debris, light abrasion and everyday exposure. It cannot prevent every form of damage.',
  ],
  [
    'Which LLumar PPF do you install?',
    'LLumar paint protection film is available through the studio, but the exact product and finish are confirmed after we inspect the vehicle and review current availability.',
  ],
  [
    'Do I need to cover the entire vehicle?',
    'Not necessarily. Coverage can focus on higher-impact areas or extend across more panels. The right scope depends on how the vehicle is used and the condition of the paint.',
  ],
  [
    'Can PPF be installed over damaged paint?',
    'Existing chips, defects, repainted panels and prior repairs need to be assessed first. Clear film can reveal what is already underneath, so condition matters.',
  ],
  [
    'Is PPF the same as ceramic coating?',
    'No. PPF is a physical barrier on covered panels. Ceramic coating changes surface behavior and maintenance. They may be used together when compatibility and installation order are planned.',
  ],
] as const;

export default function PaintProtectionFilmPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: 'LLumar Paint Protection Film Installation',
        serviceType: 'Automotive paint protection film',
        provider: { '@id': `${SITE_ORIGIN}/#business` },
        areaServed: 'Manassas, Virginia',
        url: `${SITE_ORIGIN}/our-services/paint-protection-film`,
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
    <main id="main-content" className="service-page ppf-page">
      <section className="service-hero ppf-service-hero">
        <div className="service-hero-media" aria-hidden="true">
          <Image
            src="/generated/ppf-installation.webp"
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
            <PpfWordmark className="service-hero-mark ppf-wordmark-hero" />
            <p className="eyebrow">
              <span /> Impact protection · planned panel by panel
            </p>
            <h1>Paint Protection Film in Manassas, VA</h1>
            <p>
              Use LLumar paint protection film as a clear physical barrier where
              driving exposure reaches the paint first. We confirm the exact
              film, finish and coverage after inspecting your vehicle.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#coverage">
                Plan your coverage <ArrowRight aria-hidden="true" />
              </a>
              <Link className="button button-ghost" href={quoteHref('ppf')}>
                Request a PPF quote
              </Link>
            </div>
          </div>
          <aside
            className="hero-spec-card"
            aria-label="Paint protection film consultation"
          >
            <p>COVERAGE LOGIC / 03</p>
            <div>
              <strong>01</strong>
              <span>Paint inspection</span>
            </div>
            <div>
              <strong>02</strong>
              <span>Impact-zone planning</span>
            </div>
            <div>
              <strong>03</strong>
              <span>Film & finish confirmation</span>
            </div>
            <small>
              No generic package is assumed. Panel condition and requested
              coverage are reviewed first.
            </small>
          </aside>
        </div>
      </section>

      <section className="section benefit-section">
        <div className="shell icon-benefit-grid coating-benefit-grid">
          <article>
            <ShieldCheck aria-hidden="true" />
            <span>01</span>
            <h2>Physical barrier</h2>
            <p>
              Film covers the selected paint rather than relying on a liquid
              surface treatment to handle road impact.
            </p>
          </article>
          <article>
            <Focus aria-hidden="true" />
            <span>02</span>
            <h2>Targeted coverage</h2>
            <p>
              Put protection where exposure is highest, then expand the plan
              only when your use and finish goals justify it.
            </p>
          </article>
          <article>
            <Layers3 aria-hidden="true" />
            <span>03</span>
            <h2>System planning</h2>
            <p>
              PPF and coating can serve different roles when their
              compatibility, sequence and aftercare are planned together.
            </p>
          </article>
        </div>
      </section>

      <section className="section coverage-section" id="coverage">
        <div className="shell coverage-layout">
          <div>
            <SectionIntro
              eyebrow="Coverage architecture"
              title="Protect the panels that meet the road first."
              copy="Coverage is configured around the vehicle—not reduced to an unexplained package name."
            />
            <ul className="check-list">
              <li>
                <Check aria-hidden="true" /> Existing paint condition documented
                before installation
              </li>
              <li>
                <Check aria-hidden="true" /> Edges, seams and adjoining panels
                considered together
              </li>
              <li>
                <Check aria-hidden="true" /> Exact product and finish confirmed
                in the quote
              </li>
            </ul>
            <Link className="button button-primary" href={quoteHref('ppf')}>
              Request an inspection <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="coverage-diagram ppf-coverage-diagram">
            <div className="coverage-car">
              <Image
                className="ppf-coverage-image"
                src="/generated/ppf-finished-clear-v2.webp"
                alt="Silver performance coupe after a smooth, optically clear paint protection film installation"
                width="1536"
                height="1024"
                sizes="(max-width: 780px) 100vw, 54vw"
              />
            </div>
            <div className="coverage-cards">
              {coverage.map(([title, copy], index) => (
                <article key={title}>
                  <span>0{index + 1}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section coating-truth-section">
        <div className="shell coating-truth-layout">
          <div>
            <p className="eyebrow">
              <span /> Clear expectations
            </p>
            <h2>A barrier—not an invisible force field.</h2>
            <p>
              PPF is designed to receive exposure on the areas it covers. It
              does not make a vehicle damage-proof, conceal existing defects or
              eliminate maintenance.
            </p>
          </div>
          <div className="truth-card-grid">
            <article className="truth-card">
              <p className="overline">What to plan for</p>
              <ul className="check-list">
                <li>
                  <Check aria-hidden="true" /> The panels and edges included
                </li>
                <li>
                  <Check aria-hidden="true" /> Existing chips, repairs and
                  repaint history
                </li>
                <li>
                  <Check aria-hidden="true" /> Visual finish and future
                  maintenance
                </li>
              </ul>
            </article>
            <article className="truth-card truth-card-limit">
              <p className="overline">What not to assume</p>
              <ul>
                <li>No film prevents every chip, puncture or collision.</li>
                <li>Uncovered paint remains outside the barrier.</li>
                <li>Film still needs appropriate washing and care.</li>
                <li>Warranty terms depend on the exact confirmed product.</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Installation protocol"
            title="Condition, coverage, preparation, installation, handoff."
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

      <section className="section comparison-section">
        <div className="shell">
          <SectionIntro
            eyebrow="PPF and ceramic coating"
            title="Use each system for the job it actually does."
          />
          <div className="comparison-table-wrap">
            <table className="protection-comparison">
              <thead>
                <tr>
                  <th>Decision</th>
                  <th>Paint protection film</th>
                  <th>Ceramic coating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Primary role</th>
                  <td>Physical film barrier on covered paint.</td>
                  <td>
                    Surface behavior, gloss and easier routine maintenance.
                  </td>
                </tr>
                <tr>
                  <th>Strongest reason to choose</th>
                  <td>
                    Road-debris exposure and light abrasion in selected zones.
                  </td>
                  <td>
                    Hydrophobic behavior, finish presentation and contaminant
                    resistance.
                  </td>
                </tr>
                <tr>
                  <th>Important limit</th>
                  <td>
                    Cannot prevent every form of damage and protects only
                    covered panels.
                  </td>
                  <td>
                    Does not replace film for meaningful impact protection.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="comparison-actions">
            <Link className="text-link" href="/our-services/ceramic-coating">
              Explore Ceramic Pro coating <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="shell faq-layout">
          <SectionIntro
            eyebrow="Paint protection film FAQ"
            title="Define the coverage before the film goes down."
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
        eyebrow="Protect the paint you plan to keep."
        title="Build a panel-by-panel PPF recommendation."
        copy="Send your vehicle, paint condition and driving priorities. We’ll inspect, confirm the LLumar film and define the coverage before quoting."
        service="ppf"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
