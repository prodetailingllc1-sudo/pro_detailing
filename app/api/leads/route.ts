const MAX_BODY_BYTES = 20_000;

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

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ ok: false, error: 'invalid_json' }, 400);
  }

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

  const payload = {
    name,
    phone,
    email,
    service: clean(body.service, 40),
    vehicle,
    goal: clean(body.goal, 120),
    message: clean(body.message, 1_200),
    consent: true,
    source: 'PRO Detailing website',
    sourcePage: clean(body.page, 200),
    attribution,
    tags: ['Website Lead', 'PRO Site'],
    submittedAt: new Date().toISOString(),
  };

  let response: Response;
  try {
    response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    return json({ ok: false, error: 'crm_unreachable' }, 502);
  }

  if (!response.ok) return json({ ok: false, error: 'crm_rejected' }, 502);
  return json({ ok: true });
}
