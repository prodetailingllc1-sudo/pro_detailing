import { ArrowLeft, Check, Clock3, MessageSquareText } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/site/SafeLink';

import { HighLevelLeadCapture } from '@/components/site/HighLevelLeadCapture';
import { createPageMetadata } from '@/lib/metadata';
import { resolveQuotePackage } from '@/lib/quote-packages';
import {
  defaultTintCoverageIds,
  defaultTintLineId,
  defaultTintShadeForLine,
  resolveCeramicSurfaceOfferings,
  resolveQuoteAddOns,
  resolveTintCoverage,
  resolveTintLine,
  resolveTintShade,
} from '@/lib/quote-options';
import { siteFeatures } from '@/lib/site-config';
import { business, SITE_ORIGIN } from '@/lib/site-data';

export const metadata = createPageMetadata({
  title: 'Request a Service Quote | PRO Detailing',
  description: siteFeatures.mobileDetailing
    ? 'Start a quote for automotive appearance, protection, maintenance, tire, glass, key, mobile detailing or residential tint service in Northern Virginia.'
    : 'Start a quote for automotive appearance, protection, maintenance, tire, glass, key or residential tint service in Northern Virginia.',
  path: '/request-quote',
});

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

function allowedQuoteService(value: string | undefined) {
  const allowed = new Set([
    'tint',
    'ceramic',
    'ppf',
    'detailing',
    ...(siteFeatures.mobileDetailing ? ['mobile-detailing'] : []),
    'residential-tint',
    'maintenance',
    'tires',
    'auto-glass',
    'key-replacement',
  ]);
  return value && allowed.has(value) ? value : 'tint';
}

function addFormAttribution(
  embedUrl: string | undefined,
  searchParams: QuoteSearchParams,
) {
  if (!embedUrl) return undefined;
  const url = new URL(embedUrl);

  for (const key of [
    'service',
    'package',
    'film',
    'shade',
    'coverage',
    'surfaces',
    'addons',
    'vehicle',
    'goal',
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
  const service = allowedQuoteService(firstValue(params.service));
  const packageChoice =
    resolveQuotePackage(service, firstValue(params.package))?.id ?? '';
  const tintLine =
    resolveTintLine(firstValue(params.film))?.id ?? defaultTintLineId;
  const tintShade =
    resolveTintShade(tintLine, firstValue(params.shade))?.id ??
    defaultTintShadeForLine(tintLine)?.id ??
    '';
  const tintCoverage = firstValue(params.coverage)
    ? resolveTintCoverage(firstValue(params.coverage)).map(
        (option) => option.id,
      )
    : [...defaultTintCoverageIds];
  const ceramicSurfaces = resolveCeramicSurfaceOfferings(
    firstValue(params.surfaces),
  ).map((offering) => offering.id);
  const addOnIds = resolveQuoteAddOns(firstValue(params.addons)).map(
    (addOn) => addOn.id,
  );
  const normalizedParams: QuoteSearchParams = {
    ...params,
    service,
    package: packageChoice || undefined,
    film: service === 'tint' ? tintLine : undefined,
    shade: service === 'tint' ? tintShade : undefined,
    coverage:
      service === 'tint' && tintCoverage.length
        ? tintCoverage.join(',')
        : undefined,
    surfaces:
      service === 'ceramic' && ceramicSurfaces.length
        ? ceramicSurfaces.join(',')
        : undefined,
    addons:
      (service === 'detailing' || service === 'mobile-detailing') &&
      addOnIds.length
        ? addOnIds.join(',')
        : undefined,
  };
  const embedUrl = addFormAttribution(
    safeEmbedUrl(process.env.GHL_FORM_URL),
    normalizedParams,
  );
  const webhookEnabled = Boolean(process.env.GHL_WEBHOOK_URL);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Automotive and residential service consultation',
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
              <span /> Service request command center
            </p>
            <h1>
              Tell us what needs attention. We’ll configure what comes next.
            </h1>
            <p>
              Start with the vehicle or property and the outcome. Product,
              parts, coverage, preparation, timing and price are confirmed after
              the team reviews the request.
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
            key={[
              service,
              packageChoice,
              tintLine,
              tintShade,
              tintCoverage.join(','),
              ceramicSurfaces.join(','),
              addOnIds.join(','),
            ].join(':')}
            embedUrl={embedUrl}
            webhookEnabled={webhookEnabled}
            initialService={service}
            initialPackage={packageChoice}
            initialTintLine={tintLine}
            initialTintShade={tintShade}
            initialTintCoverageIds={tintCoverage}
            initialCeramicSurfaceIds={ceramicSurfaces}
            initialAddOnIds={addOnIds}
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
                    You receive the practical timing and either studio-arrival
                    or approved mobile-service details.
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
