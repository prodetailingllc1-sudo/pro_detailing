import { siteFeatures } from '@/lib/site-config';
import { resolveQuotePackage } from '@/lib/quote-packages';
import {
  resolveCeramicSurfaceOfferings,
  resolveQuoteAddOns,
  resolveTintCoverage,
  resolveTintLine,
  resolveTintShade,
} from '@/lib/quote-options';

const MAX_BODY_BYTES = 20_000;
const ALLOWED_SERVICES = new Set([
  'tint',
  'ceramic',
  'ppf',
  'wrap',
  'detailing',
  ...(siteFeatures.mobileDetailing ? ['mobile-detailing'] : []),
  'residential-tint',
  'maintenance',
  'tires',
  'auto-glass',
  'key-replacement',
]);

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function json(body: object, status = 200) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(request: Request) {
  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) return json({ ok: false, error: 'not_configured' }, 503);

  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, error: 'payload_too_large' }, 413);
  }

  const origin = request.headers.get('origin');
  const requestOrigin = new URL(request.url).origin;
  if (origin && origin !== requestOrigin) {
    return json({ ok: false, error: 'origin_rejected' }, 403);
  }

  let parsedBody: unknown;
  try {
    parsedBody = await request.json();
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }
  if (
    !parsedBody ||
    typeof parsedBody !== 'object' ||
    Array.isArray(parsedBody)
  ) {
    return json({ ok: false, error: 'invalid_payload' }, 400);
  }
  const body = parsedBody as Record<string, unknown>;

  if (clean(body.website, 200)) return json({ ok: true });

  const startedAt = Number(body.startedAt ?? 0);
  const elapsed = Date.now() - startedAt;
  if (!Number.isFinite(startedAt) || elapsed < 1_200 || elapsed > 86_400_000) {
    return json({ ok: false, error: 'invalid_session' }, 400);
  }

  const name = clean(body.name, 80);
  const phone = clean(body.phone, 30);
  const email = clean(body.email, 120);
  const vehicle = clean(body.vehicle, 100);
  const consent = body.consent === true;
  const requestedService = clean(body.service, 40);
  const service = ALLOWED_SERVICES.has(requestedService)
    ? requestedService
    : 'other';
  const packageChoice = resolveQuotePackage(service, clean(body.package, 40));
  const addOns =
    service === 'detailing' ||
    service === 'mobile-detailing' ||
    service === 'ppf' ||
    service === 'wrap'
      ? resolveQuoteAddOns(body.addOnIds, service)
      : [];
  const tintLine =
    service === 'tint' ? resolveTintLine(clean(body.tintLine, 20)) : null;
  const tintShade =
    service === 'tint' && tintLine
      ? resolveTintShade(tintLine.id, clean(body.tintShade, 30))
      : null;
  const tintCoverage =
    service === 'tint' ? resolveTintCoverage(body.tintCoverageIds) : [];
  const ceramicSurfaces =
    service === 'ceramic'
      ? resolveCeramicSurfaceOfferings(body.ceramicSurfaceIds)
      : [];

  if (!name || phone.replace(/\D/g, '').length < 7 || !vehicle || !consent) {
    return json({ ok: false, error: 'missing_required_fields' }, 400);
  }

  const attributionSource =
    body.attribution && typeof body.attribution === 'object'
      ? (body.attribution as Record<string, unknown>)
      : {};
  const attribution = Object.fromEntries(
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'gclid']
      .map((key) => [key, clean(attributionSource[key], 200)])
      .filter(([, value]) => Boolean(value)),
  );
  const configurationSummary =
    service === 'tint'
      ? [
          tintLine ? `LLumar ${tintLine.name}` : '',
          tintShade
            ? `${tintShade.label} (${tintShade.vlt}% measured VLT)`
            : '',
          tintCoverage.map((option) => option.label).join(', '),
        ]
          .filter(Boolean)
          .join(' · ')
      : service === 'ceramic'
        ? [
            packageChoice?.label ?? 'Ceramic Pro package recommendation',
            ceramicSurfaces.length
              ? `Specialty surfaces: ${ceramicSurfaces
                  .map((offering) => offering.name)
                  .join(', ')}`
              : '',
          ]
            .filter(Boolean)
            .join(' · ')
        : service === 'ppf'
          ? addOns.length
            ? `Optional add-on: ${addOns.map((addOn) => addOn.name).join(', ')}`
            : 'PPF coverage and finish review'
          : service === 'wrap'
            ? [
                packageChoice?.label ?? 'Wrap scope recommendation',
                addOns.length
                  ? 'Optional add-on: ' +
                    addOns.map((addOn) => addOn.name).join(', ')
                  : '',
              ]
                .filter(Boolean)
                .join(' · ')
            : service === 'detailing' || service === 'mobile-detailing'
              ? [
                  packageChoice?.label ?? 'Package recommendation',
                  addOns.length
                    ? `Add-ons: ${addOns.map((addOn) => addOn.name).join(', ')}`
                    : '',
                ]
                  .filter(Boolean)
                  .join(' · ')
              : '';

  const payload = {
    name,
    phone,
    email,
    service,
    package: packageChoice?.id ?? '',
    packageLabel: packageChoice?.label ?? '',
    addOnIds: addOns.map((addOn) => addOn.id),
    addOnLabels: addOns.map((addOn) => addOn.name),
    addOnsSummary: addOns.map((addOn) => addOn.name).join(', '),
    tintFilmLineId: tintLine?.id ?? '',
    tintFilmLineLabel: tintLine
      ? `LLumar ${tintLine.name} — ${tintLine.category}`
      : '',
    tintShadeId: tintShade?.id ?? '',
    tintShadeLabel: tintShade?.label ?? '',
    tintShadeVlt: tintShade?.vlt ?? '',
    tintCoverageIds: tintCoverage.map((option) => option.id),
    tintCoverageLabels: tintCoverage.map((option) => option.label),
    tintCoverageSummary: tintCoverage.map((option) => option.label).join(', '),
    ceramicSurfaceIds: ceramicSurfaces.map((offering) => offering.id),
    ceramicSurfaceLabels: ceramicSurfaces.map((offering) => offering.name),
    ceramicSurfacesSummary: ceramicSurfaces
      .map((offering) => offering.name)
      .join(', '),
    configurationSummary,
    vehicle,
    vehicleType: clean(body.vehicleType, 40),
    goal: clean(body.goal, 120),
    message: clean(body.message, 1_200),
    consent: true,
    consentAt: new Date().toISOString(),
    source: 'PRO Detailing website',
    sourcePage: clean(body.page, 200),
    landingUrl: clean(body.landingUrl, 500),
    attribution,
    utmSource: attribution.utm_source ?? '',
    utmMedium: attribution.utm_medium ?? '',
    utmCampaign: attribution.utm_campaign ?? '',
    utmContent: attribution.utm_content ?? '',
    gclid: attribution.gclid ?? '',
    tags: [
      'Website Lead',
      'PRO Site',
      `Service: ${service}`,
      ...(packageChoice ? [`Package: ${packageChoice.label}`] : []),
      ...(tintLine ? [`Film: LLumar ${tintLine.name}`] : []),
      ...(tintShade ? [`Shade: ${tintShade.label} ${tintShade.vlt}% VLT`] : []),
      ...tintCoverage.map((option) => `Glass: ${option.label}`),
      ...ceramicSurfaces.map((offering) => `Ceramic surface: ${offering.name}`),
      ...addOns.map((addOn) => `Add-on: ${addOn.name}`),
    ],
    submittedAt: new Date().toISOString(),
  };

  let response: Response;
  try {
    response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8_000),
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'TimeoutError') {
      return json({ ok: false, error: 'crm_timeout' }, 504);
    }
    return json({ ok: false, error: 'crm_unreachable' }, 502);
  }

  if (!response.ok) return json({ ok: false, error: 'crm_rejected' }, 502);
  return json({ ok: true });
}
