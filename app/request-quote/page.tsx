import type { Metadata } from 'next';
import { ArrowLeft, Check, Clock3, MessageSquareText } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/site/SafeLink';

import { HighLevelLeadCapture } from '@/components/site/HighLevelLeadCapture';
import { business, SITE_ORIGIN } from '@/lib/site-data';

export const metadata: Metadata = {
  title: { absolute: 'Request a Vehicle Protection Quote | PRO Detailing' },
  description:
    'Start a vehicle-specific quote for LLumar tint, Ceramic Pro coating, paint protection film or auto detailing in Manassas, Virginia.',
  alternates: { canonical: '/request-quote' },
  openGraph: {
    title: 'Request a Vehicle Protection Quote | PRO Detailing',
    description:
      'Tell PRO Detailing what you drive and what you want to improve. Start a vehicle-specific service request in Manassas, Virginia.',
    url: '/request-quote',
  },
};

function safeEmbedUrl(value: string | undefined) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

type QuoteSearchParams = Record<string, string | string[] | undefined>;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function addFormAttribution(
  embedUrl: string | undefined,
  searchParams: QuoteSearchParams,
) {
  if (!embedUrl) return undefined;
  const url = new URL(embedUrl);

  for (const key of [
    'service',
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'gclid',
  ]) {
    const value = firstValue(searchParams[key]);
    if (value) url.searchParams.set(key, value.slice(0, 200));
  }

  return url.toString();
}

export default async function RequestQuotePage({
  searchParams,
}: {
  searchParams: Promise<QuoteSearchParams>;
}) {
  const params = await searchParams;
  const service = firstValue(params.service) ?? 'tint';
  const embedUrl = addFormAttribution(
    safeEmbedUrl(process.env.GHL_FORM_URL),
    params,
  );
  const webhookEnabled = Boolean(process.env.GHL_WEBHOOK_URL);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Vehicle appearance and protection consultation',
    provider: { '@id': `${SITE_ORIGIN}/#business` },
    areaServed: 'Manassas, Virginia',
    url: `${SITE_ORIGIN}/request-quote`,
  };

  return (
    <main id="main-content" className="quote-page">
      <section className="quote-page-hero">
        <div className="quote-page-grid" aria-hidden="true" />
        <div className="shell quote-page-hero-layout">
          <div>
            <Link className="back-link" href="/">
              <ArrowLeft aria-hidden="true" /> Back to the studio
            </Link>
            <Image
              className="quote-page-logo"
              src="/assets/pro-detailing-wordmark-optimized.webp"
              alt="PRO Detailing"
              width="900"
              height="126"
              priority
            />
            <p className="eyebrow">
              <span /> Vehicle request command center
            </p>
            <h1>Tell us what you drive. We’ll configure what comes next.</h1>
            <p>
              Start with the vehicle and outcome. Product, shade, coverage,
              preparation, timing and price are confirmed after the team reviews
              the request.
            </p>
          </div>
          <div className="quote-hero-emblem" aria-hidden="true">
            <div className="quote-emblem-ring" />
            <Image src="/pro-mark.png" alt="" width="400" height="400" />
            <span>PRO / MANASSAS</span>
          </div>
        </div>
      </section>

      <section className="section quote-capture-section">
        <div className="shell quote-capture-layout">
          <HighLevelLeadCapture
            embedUrl={embedUrl}
            webhookEnabled={webhookEnabled}
            initialService={service}
          />

          <aside className="quote-next-panel">
            <p className="overline">What happens next</p>
            <ol>
              <li>
                <span>01</span>
                <div>
                  <strong>Request reviewed</strong>
                  <p>
                    The team checks the vehicle, requested service and your main
                    priority.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <strong>Scope confirmed</strong>
                  <p>
                    Product, coverage, preparation, availability and price are
                    clarified before work begins.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <strong>Appointment coordinated</strong>
                  <p>
                    You receive the practical timing and studio-arrival details
                    for your vehicle.
                  </p>
                </div>
              </li>
            </ol>
            <div className="quote-assurance">
              <ShieldLine />
              <span>
                No generic package is assigned without reviewing the vehicle.
              </span>
            </div>
            <div className="quote-contact-rail">
              <a href={`tel:${business.phoneHref}`}>
                <MessageSquareText aria-hidden="true" />
                <span>
                  Prefer to talk?
                  <strong>{business.phone}</strong>
                </span>
              </a>
              <div>
                <Clock3 aria-hidden="true" />
                <span>
                  Appointments
                  <strong>Monday–Saturday</strong>
                </span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="quote-confidence-strip">
        <div className="shell">
          <span>
            <Check aria-hidden="true" /> Vehicle-specific recommendation
          </span>
          <span>
            <Check aria-hidden="true" /> Scope confirmed before work
          </span>
          <span>
            <Check aria-hidden="true" /> Clear aftercare at handoff
          </span>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}

function ShieldLine() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M24 4 40 10v12c0 10-6.8 18.4-16 22C14.8 40.4 8 32 8 22V10l16-6Z" />
      <path d="m16 24 5 5 11-12" />
    </svg>
  );
}
