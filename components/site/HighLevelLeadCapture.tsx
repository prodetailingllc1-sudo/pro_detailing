'use client';

import { ArrowRight, Check, Phone, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { SyntheticEvent } from 'react';

import Link from '@/components/site/SafeLink';

import {
  configurationStepCount,
  QuoteConfigurationPicker,
} from '@/components/site/QuoteConfigurationPicker';
import { business } from '@/lib/site-data';
import { siteFeatures } from '@/lib/site-config';
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

const serviceOptions: readonly (readonly [string, string])[] = [
  ['tint', 'LLumar tint'],
  ['ceramic', 'Ceramic coating'],
  ['ppf', 'Paint protection film'],
  ['wrap', 'PRO Wraps & vehicle graphics'],
  ['detailing', 'Auto detailing'],
  ['maintenance', 'Maintenance & oil change'],
  ['tires', 'Tire change, rotation & flat repair'],
  ['auto-glass', 'Auto glass repair & replacement'],
  ['key-replacement', 'Automotive locksmith & car keys'],
  ...(siteFeatures.mobileDetailing
    ? ([['mobile-detailing', 'Mobile detailing']] as const)
    : []),
  ['residential-tint', 'Residential window tint'],
];

const vehicleOptions = [
  'Sedan',
  'Coupe',
  'SUV',
  'Truck',
  'EV',
  'Fleet',
  'Home / property glass',
  'Other',
];
const goalOptions = [
  'Cabin comfort & privacy',
  'Protect the paint',
  'Change the vehicle color or add graphics',
  'Easier maintenance & gloss',
  'Deep interior/exterior reset',
  'Routine maintenance or oil service',
  'Change, rotate or repair a tire',
  'Repair or replace damaged auto glass',
  'Lockout, replacement key or fob programming',
  'Home heat, glare or privacy',
  'I need a recommendation',
];

const serviceGoalDefaults: Record<string, string> = {
  tint: 'Cabin comfort & privacy',
  ceramic: 'Easier maintenance & gloss',
  ppf: 'Protect the paint',
  wrap: 'Change the vehicle color or add graphics',
  detailing: 'Deep interior/exterior reset',
  'mobile-detailing': 'Deep interior/exterior reset',
  'residential-tint': 'Home heat, glare or privacy',
  maintenance: 'Routine maintenance or oil service',
  tires: 'Change, rotate or repair a tire',
  'auto-glass': 'Repair or replace damaged auto glass',
  'key-replacement': 'Lockout, replacement key or fob programming',
};

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

function allowedService(value: string | null) {
  return serviceOptions.some(([id]) => id === value) ? value! : 'tint';
}

type BookingSelections = {
  service: string;
  vehicle: string;
  goal: string;
  packageChoice: string;
  addOnIds: readonly string[];
  tintLineId: string;
  tintShadeId: string;
  tintCoverageIds: readonly string[];
  ceramicSurfaceIds: readonly string[];
};

function buildTrackedBookingUrl({
  service,
  vehicle,
  goal,
  packageChoice,
  addOnIds,
  tintLineId,
  tintShadeId,
  tintCoverageIds,
  ceramicSurfaceIds,
}: BookingSelections) {
  const params = new URLSearchParams({
    utm_source: 'pro_detailing_site',
    utm_medium: 'website',
    utm_campaign: 'vehicle_quote',
    service,
    vehicle,
    goal,
  });
  if (packageChoice) params.set('package', packageChoice);
  if (
    (service === 'detailing' ||
      service === 'mobile-detailing' ||
      service === 'ppf' ||
      service === 'wrap') &&
    addOnIds.length
  ) {
    params.set('addons', addOnIds.join(','));
  }
  if (service === 'tint') {
    params.set('film', tintLineId);
    params.set('shade', tintShadeId);
    if (tintCoverageIds.length) {
      params.set('coverage', tintCoverageIds.join(','));
    }
  }
  if (service === 'ceramic' && ceramicSurfaceIds.length) {
    params.set('surfaces', ceramicSurfaceIds.join(','));
  }
  return `${business.bookingUrl}?${params.toString()}`;
}

function ConsentField() {
  return (
    <label className="lead-consent">
      <input type="checkbox" name="consent" required />
      <span>
        I agree that PRO Detailing may contact me by phone, text or email about
        this request. Message and data rates may apply; reply STOP to opt out.
        View the <Link href={business.privacyUrl}>privacy policy</Link>.
      </span>
    </label>
  );
}

export function HighLevelLeadCapture({
  embedUrl,
  webhookEnabled,
  initialService = 'tint',
  initialPackage = '',
  initialTintLine = defaultTintLineId,
  initialTintShade = '',
  initialTintCoverageIds = defaultTintCoverageIds,
  initialCeramicSurfaceIds = [],
  initialAddOnIds = [],
}: {
  embedUrl?: string;
  webhookEnabled: boolean;
  initialService?: string;
  initialPackage?: string;
  initialTintLine?: string;
  initialTintShade?: string;
  initialTintCoverageIds?: readonly string[];
  initialCeramicSurfaceIds?: readonly string[];
  initialAddOnIds?: readonly string[];
}) {
  const normalizedInitialService = allowedService(initialService);
  const normalizedInitialTintLine =
    resolveTintLine(initialTintLine)?.id ?? defaultTintLineId;
  const normalizedInitialTintShade =
    resolveTintShade(normalizedInitialTintLine, initialTintShade)?.id ??
    defaultTintShadeForLine(normalizedInitialTintLine)?.id ??
    '';
  const [service, setService] = useState(normalizedInitialService);
  const [vehicle, setVehicle] = useState(
    normalizedInitialService === 'residential-tint'
      ? 'Home / property glass'
      : 'Sedan',
  );
  const [goal, setGoal] = useState<string>(
    serviceGoalDefaults[normalizedInitialService] ?? 'I need a recommendation',
  );
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [packageChoice, setPackageChoice] = useState(
    resolveQuotePackage(normalizedInitialService, initialPackage)?.id ?? '',
  );
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(
    normalizedInitialService === 'detailing' ||
      normalizedInitialService === 'mobile-detailing' ||
      normalizedInitialService === 'ppf' ||
      normalizedInitialService === 'wrap'
      ? resolveQuoteAddOns(initialAddOnIds, normalizedInitialService).map(
          (addOn) => addOn.id,
        )
      : [],
  );
  const [tintLineId, setTintLineId] = useState(normalizedInitialTintLine);
  const [tintShadeId, setTintShadeId] = useState(normalizedInitialTintShade);
  const [selectedTintCoverageIds, setSelectedTintCoverageIds] = useState<
    string[]
  >(resolveTintCoverage(initialTintCoverageIds).map((option) => option.id));
  const [selectedCeramicSurfaceIds, setSelectedCeramicSurfaceIds] = useState<
    string[]
  >(
    normalizedInitialService === 'ceramic'
      ? resolveCeramicSurfaceOfferings(initialCeramicSurfaceIds).map(
          (offering) => offering.id,
        )
      : [],
  );
  const selectedPackage = resolveQuotePackage(service, packageChoice);
  const selectedPackageId = selectedPackage?.id ?? '';
  const packageLabel = selectedPackage?.label ?? '';
  const selectedAddOns = resolveQuoteAddOns(selectedAddOnIds, service);
  const selectedTintLine =
    resolveTintLine(tintLineId) ?? resolveTintLine(defaultTintLineId)!;
  const selectedTintShade =
    resolveTintShade(selectedTintLine.id, tintShadeId) ??
    defaultTintShadeForLine(selectedTintLine.id)!;
  const selectedTintCoverage = resolveTintCoverage(selectedTintCoverageIds);
  const selectedCeramicSurfaces = resolveCeramicSurfaceOfferings(
    selectedCeramicSurfaceIds,
  );
  const configurationSteps = configurationStepCount(service);
  const vehicleStep = String(2 + configurationSteps).padStart(2, '0');
  const priorityStep = String(3 + configurationSteps).padStart(2, '0');
  const configurationSummary =
    service === 'tint'
      ? [
          `LLumar ${selectedTintLine.name}`,
          `${selectedTintShade.label} (${selectedTintShade.vlt}% measured VLT)`,
          selectedTintCoverage.map((option) => option.label).join(', ') ||
            'Glass areas to confirm',
        ].join(' · ')
      : service === 'ceramic'
        ? [
            packageLabel || 'Ceramic Pro package recommendation',
            selectedCeramicSurfaces.length
              ? `Specialty surfaces: ${selectedCeramicSurfaces
                  .map((offering) => offering.name)
                  .join(', ')}`
              : '',
          ]
            .filter(Boolean)
            .join(' · ')
        : service === 'ppf'
          ? selectedAddOns.length
            ? `Optional add-on: ${selectedAddOns
                .map((addOn) => addOn.name)
                .join(', ')}`
            : 'PPF coverage and finish review'
          : service === 'wrap'
            ? [
                packageLabel || 'Wrap scope recommendation',
                selectedAddOns.length
                  ? 'Optional add-on: ' +
                    selectedAddOns.map((addOn) => addOn.name).join(', ')
                  : '',
              ]
                .filter(Boolean)
                .join(' · ')
            : service === 'detailing' || service === 'mobile-detailing'
              ? [
                  packageLabel || 'Package recommendation',
                  selectedAddOns.length
                    ? `Add-ons: ${selectedAddOns
                        .map((addOn) => addOn.name)
                        .join(', ')}`
                    : '',
                ]
                  .filter(Boolean)
                  .join(' · ')
              : '';
  const bookingUrl = useMemo(
    () =>
      buildTrackedBookingUrl({
        service,
        vehicle,
        goal,
        packageChoice: selectedPackageId,
        addOnIds: selectedAddOnIds,
        tintLineId: selectedTintLine.id,
        tintShadeId: selectedTintShade.id,
        tintCoverageIds: selectedTintCoverageIds,
        ceramicSurfaceIds: selectedCeramicSurfaceIds,
      }),
    [
      goal,
      selectedAddOnIds,
      selectedCeramicSurfaceIds,
      selectedPackageId,
      selectedTintCoverageIds,
      selectedTintLine.id,
      selectedTintShade.id,
      service,
      vehicle,
    ],
  );

  function chooseService(nextService: string) {
    if (nextService === service) return;
    setService(nextService);
    setPackageChoice('');
    setSelectedAddOnIds([]);
    setSelectedCeramicSurfaceIds([]);
    if (nextService === 'tint') {
      setTintLineId(defaultTintLineId);
      setTintShadeId(defaultTintShadeForLine(defaultTintLineId)?.id ?? '');
      setSelectedTintCoverageIds([...defaultTintCoverageIds]);
    }
    setVehicle(
      nextService === 'residential-tint' ? 'Home / property glass' : 'Sedan',
    );
    setGoal(serviceGoalDefaults[nextService] ?? 'I need a recommendation');
    setSubmitState('idle');
    setStatusMessage('');
  }

  function toggleAddOn(id: string) {
    setSelectedAddOnIds((current) =>
      current.includes(id)
        ? current.filter((currentId) => currentId !== id)
        : [...current, id],
    );
  }

  function selectTintLine(nextLineId: string) {
    const line =
      resolveTintLine(nextLineId) ?? resolveTintLine(defaultTintLineId)!;
    setTintLineId(line.id);
    setTintShadeId(defaultTintShadeForLine(line.id)?.id ?? line.shades[0].id);
  }

  function toggleTintCoverage(id: string) {
    setSelectedTintCoverageIds((current) =>
      current.includes(id)
        ? current.filter((currentId) => currentId !== id)
        : [...current, id],
    );
  }

  function toggleCeramicSurface(id: string) {
    setSelectedCeramicSurfaceIds((current) =>
      current.includes(id)
        ? current.filter((currentId) => currentId !== id)
        : [...current, id],
    );
  }

  async function submitLead(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSubmitState('sending');
    setStatusMessage('Sending your request…');

    const form = new FormData(formElement);
    const query = new URLSearchParams(window.location.search);
    const attribution = Object.fromEntries(
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'gclid']
        .map((key) => [key, query.get(key)])
        .filter(([, value]) => Boolean(value)),
    );

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.get('name'),
          phone: form.get('phone'),
          email: form.get('email'),
          service,
          package: selectedPackageId,
          addOnIds: selectedAddOnIds,
          tintLine: selectedTintLine.id,
          tintShade: selectedTintShade.id,
          tintCoverageIds: selectedTintCoverageIds,
          ceramicSurfaceIds: selectedCeramicSurfaceIds,
          vehicle: form.get('vehicle'),
          vehicleType: vehicle,
          goal,
          message: form.get('message'),
          consent: form.get('consent') === 'on',
          website: form.get('website'),
          startedAt: Math.round(performance.timeOrigin),
          page: window.location.pathname,
          landingUrl: window.location.href,
          attribution,
        }),
      });

      if (!response.ok) throw new Error('Lead request failed');

      setSubmitState('success');
      setStatusMessage(
        'Request received. The PRO Detailing team will follow up using the contact details you provided.',
      );
      formElement.reset();
    } catch {
      setSubmitState('error');
      setStatusMessage(
        'The online request did not send. Please call the studio or use the current booking portal.',
      );
    }
  }

  const configurationPicker = (
    <QuoteConfigurationPicker
      service={service}
      packageChoice={selectedPackageId}
      selectedAddOnIds={selectedAddOnIds}
      tintLineId={selectedTintLine.id}
      tintShadeId={selectedTintShade.id}
      selectedTintCoverageIds={selectedTintCoverageIds}
      selectedCeramicSurfaceIds={selectedCeramicSurfaceIds}
      onPackageChange={setPackageChoice}
      onToggleAddOn={toggleAddOn}
      onTintLineChange={selectTintLine}
      onTintShadeChange={setTintShadeId}
      onToggleTintCoverage={toggleTintCoverage}
      onToggleCeramicSurface={toggleCeramicSurface}
    />
  );

  if (embedUrl) {
    return (
      <div className="ghl-embed-shell" data-ghl-form-slot="vehicle-quote">
        <div className="ghl-embed-head">
          <span>SECURE REQUEST / HIGHLEVEL</span>
          <span>CRM CONNECTED</span>
        </div>
        <iframe
          src={embedUrl}
          title="Request a PRO Detailing service quote"
          loading="eager"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  if (webhookEnabled) {
    return (
      <form
        className="lead-form"
        onSubmit={submitLead}
        data-ghl-form-slot="vehicle-quote"
      >
        <div className="lead-form-head">
          <span>SERVICE REQUEST / CRM</span>
          <span>DIRECT TO PRO DETAILING</span>
        </div>
        {configurationSummary ? (
          <p className="lead-package-context">
            Selected configuration: <strong>{configurationSummary}</strong>
          </p>
        ) : null}
        <div className="lead-form-grid">
          <label>
            <span>Full name</span>
            <input name="name" autoComplete="name" maxLength={80} required />
          </label>
          <label>
            <span>Mobile phone</span>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              maxLength={30}
              required
            />
          </label>
          <label>
            <span>Email</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              maxLength={120}
            />
          </label>
          <label>
            <span>Service</span>
            <select
              value={service}
              onChange={(event) => chooseService(event.target.value)}
            >
              {serviceOptions.map(([value, label]) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Vehicle or property</span>
            <input
              name="vehicle"
              placeholder="Year, make and model—or property type"
              maxLength={100}
              required
            />
          </label>
          <label>
            <span>Vehicle / property type</span>
            <select
              name="vehicleType"
              value={vehicle}
              onChange={(event) => setVehicle(event.target.value)}
            >
              {vehicleOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Main priority</span>
            <select
              name="goal"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
            >
              {goalOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
        {configurationPicker}
        <label className="lead-message-field">
          <span>What should we know?</span>
          <textarea
            name="message"
            rows={4}
            maxLength={1200}
            placeholder="Current condition, desired shade or coverage, and timing."
          />
        </label>
        <ConsentField />
        <label className="lead-honeypot" aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
        <button
          className="button button-primary lead-submit"
          type="submit"
          disabled={submitState === 'sending' || submitState === 'success'}
        >
          {submitState === 'success' ? 'Request received' : 'Send my request'}
          {submitState === 'success' ? (
            <Check aria-hidden="true" />
          ) : (
            <ArrowRight aria-hidden="true" />
          )}
        </button>
        <p className={`lead-status is-${submitState}`} aria-live="polite">
          {statusMessage}
        </p>
      </form>
    );
  }

  return (
    <div className="lead-router" data-ghl-form-slot="vehicle-quote">
      <div className="lead-form-head">
        <span>SERVICE ROUTER / 01</span>
        <span>HIGH-INTENT PATH</span>
      </div>

      <div className="lead-router-block">
        <span className="lead-step">01 · Choose a system</span>
        <fieldset className="lead-service-options">
          <legend className="sr-only">Choose a service</legend>
          {serviceOptions.map(([value, label]) => (
            <button
              type="button"
              className={service === value ? 'is-active' : ''}
              aria-pressed={service === value}
              onClick={() => chooseService(value)}
              key={value}
            >
              {label}
            </button>
          ))}
        </fieldset>
      </div>

      {configurationPicker}

      <div className="lead-router-grid">
        <label>
          <span>{vehicleStep} · Vehicle / property</span>
          <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
            {vehicleOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>{priorityStep} · Main priority</span>
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            {goalOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <output
        className="lead-route-summary"
        aria-live="polite"
        aria-atomic="true"
      >
        <ShieldCheck aria-hidden="true" />
        <p>
          <strong>Your route is ready.</strong>
          {serviceOptions.find(([value]) => value === service)?.[1]} · {vehicle}{' '}
          · {goal}
          {configurationSummary ? ' · ' + configurationSummary : ''}
        </p>
      </output>

      <div className="lead-router-actions">
        <a className="button button-primary" href={bookingUrl}>
          Continue to booking <ArrowRight aria-hidden="true" />
        </a>
        <a className="button button-ghost" href={`tel:${business.phoneHref}`}>
          <Phone aria-hidden="true" /> Call {business.phone}
        </a>
      </div>
      <p className="lead-router-note">
        This route preserves campaign and service context for the booking flow.
        Contact information is entered only after you continue.
      </p>
    </div>
  );
}
