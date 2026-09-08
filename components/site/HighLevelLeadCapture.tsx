'use client';

import { ArrowRight, Check, Phone, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { SyntheticEvent } from 'react';

import { business } from '@/lib/site-data';
import { siteFeatures } from '@/lib/site-config';
import { resolveQuotePackage } from '@/lib/quote-packages';
import {
  detailingAddOns,
  quoteTierOptionsForService,
} from '@/lib/quote-options';

const serviceOptions: readonly (readonly [string, string])[] = [
  ['tint', 'LLumar tint'],
  ['ceramic', 'Ceramic coating'],
  ['ppf', 'Paint protection film'],
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

function buildTrackedBookingUrl(
  service: string,
  vehicle: string,
  goal: string,
  packageChoice: string,
  addOnIds: readonly string[],
) {
  const url = new URL(business.bookingUrl);
  url.searchParams.set('utm_source', 'pro_detailing_site');
  url.searchParams.set('utm_medium', 'website');
  url.searchParams.set('utm_campaign', 'vehicle_quote');
  url.searchParams.set('service', service);
  url.searchParams.set('vehicle', vehicle);
  url.searchParams.set('goal', goal);
  if (packageChoice) url.searchParams.set('package', packageChoice);
  if (addOnIds.length) url.searchParams.set('addons', addOnIds.join(','));
  return url.toString();
}

function TierAndAddOnPicker({
  service,
  packageChoice,
  selectedAddOnIds,
  onPackageChange,
  onToggleAddOn,
}: {
  service: string;
  packageChoice: string;
  selectedAddOnIds: readonly string[];
  onPackageChange: (choice: string) => void;
  onToggleAddOn: (id: string) => void;
}) {
  const tiers = quoteTierOptionsForService(service);
  if (!tiers.length) return null;

  const mobile = service === 'mobile-detailing';
  const tierHeadingId = 'quote-tier-heading-' + service;

  return (
    <section className="lead-configuration" aria-labelledby={tierHeadingId}>
      <div className="lead-configuration-head">
        <span>{mobile ? '02 · MOBILE PACKAGE' : '02 · DETAILING PACKAGE'}</span>
        <strong id={tierHeadingId}>
          {mobile
            ? 'Choose a mobile detailing tier.'
            : 'Choose a detailing tier.'}
        </strong>
        <p>
          {mobile
            ? 'Select the closest service level. Final mobile scope and price are confirmed after the address and vehicle are reviewed.'
            : 'Published starting prices are shown. Vehicle size and condition can change the final quote.'}
        </p>
      </div>

      <fieldset className="lead-tier-fieldset">
        <legend className="sr-only">
          {mobile
            ? 'Choose a mobile detailing tier'
            : 'Choose a detailing tier'}
        </legend>
        <div className="lead-tier-options">
          {tiers.map((tier) => (
            <label
              className={
                packageChoice === tier.id
                  ? 'lead-tier-option is-selected'
                  : 'lead-tier-option'
              }
              key={tier.id}
            >
              <input
                className="lead-choice-input"
                type="radio"
                name="packageChoice"
                value={tier.id}
                checked={packageChoice === tier.id}
                onChange={() => onPackageChange(tier.id)}
              />
              <span className="lead-tier-topline">
                <strong>{tier.name}</strong>
                <small>{tier.label}</small>
              </span>
              <span className="lead-tier-description">{tier.description}</span>
              <span className="lead-tier-meta">{tier.meta}</span>
            </label>
          ))}
          <label
            className={
              packageChoice
                ? 'lead-tier-option'
                : 'lead-tier-option is-selected'
            }
          >
            <input
              className="lead-choice-input"
              type="radio"
              name="packageChoice"
              value=""
              checked={!packageChoice}
              onChange={() => onPackageChange('')}
            />
            <span className="lead-tier-topline">
              <strong>Help me choose</strong>
              <small>Recommendation</small>
            </span>
            <span className="lead-tier-description">
              Share the condition and let the team recommend the right starting
              point.
            </span>
            <span className="lead-tier-meta">No tier assigned yet</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="lead-addon-fieldset">
        <legend>03 · Optional add-ons</legend>
        <p>
          {mobile
            ? 'Request any add-ons that may be needed. Mobile availability and pricing are confirmed after the location review.'
            : 'Add-ons are requests, not automatic charges. The team confirms whether they are already included or actually needed.'}
        </p>
        <div className="lead-addon-options">
          {detailingAddOns.map((addOn) => {
            const selected = selectedAddOnIds.includes(addOn.id);
            return (
              <label
                className={
                  selected
                    ? 'lead-addon-option is-selected'
                    : 'lead-addon-option'
                }
                key={addOn.id}
              >
                <input
                  type="checkbox"
                  name="addOnIds"
                  value={addOn.id}
                  checked={selected}
                  onChange={() => onToggleAddOn(addOn.id)}
                />
                <span>
                  <strong>{addOn.name}</strong>
                  <small>{mobile ? 'Request' : '+$' + addOn.price}</small>
                </span>
                <Check aria-hidden="true" />
              </label>
            );
          })}
        </div>
      </fieldset>
    </section>
  );
}

function ConsentField() {
  return (
    <label className="lead-consent">
      <input type="checkbox" name="consent" required />
      <span>
        I agree that PRO Detailing may contact me by phone, text or email about
        this request. Message and data rates may apply; reply STOP to opt out.
        View the{' '}
        <a href={business.privacyUrl} target="_blank" rel="noreferrer">
          privacy policy
        </a>
        .
      </span>
    </label>
  );
}

export function HighLevelLeadCapture({
  embedUrl,
  webhookEnabled,
  initialService = 'tint',
  initialPackage = '',
}: {
  embedUrl?: string;
  webhookEnabled: boolean;
  initialService?: string;
  initialPackage?: string;
}) {
  const normalizedInitialService = allowedService(initialService);
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
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>([]);
  const selectedPackage = resolveQuotePackage(service, packageChoice);
  const selectedPackageId = selectedPackage?.id ?? '';
  const packageLabel = selectedPackage?.label ?? '';
  const selectedAddOns = detailingAddOns.filter((addOn) =>
    selectedAddOnIds.includes(addOn.id),
  );
  const showsDetailOptions =
    service === 'detailing' || service === 'mobile-detailing';
  const bookingUrl = useMemo(
    () =>
      buildTrackedBookingUrl(
        service,
        vehicle,
        goal,
        selectedPackageId,
        selectedAddOnIds,
      ),
    [goal, selectedAddOnIds, selectedPackageId, service, vehicle],
  );

  function chooseService(nextService: string) {
    setService(nextService);
    setPackageChoice('');
    setSelectedAddOnIds([]);
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
          packageLabel,
          addOnIds: selectedAddOnIds,
          vehicle: form.get('vehicle'),
          vehicleType: vehicle,
          goal,
          message: form.get('message'),
          consent: form.get('consent') === 'on',
          website: form.get('website'),
          startedAt: Math.round(performance.timeOrigin),
          page: window.location.pathname,
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
        {packageLabel || selectedAddOns.length ? (
          <p className="lead-package-context">
            Selected starting point:{' '}
            <strong>{packageLabel || 'Recommendation requested'}</strong>
            {selectedAddOns.length
              ? ' · ' + selectedAddOns.map((addOn) => addOn.name).join(', ')
              : ''}
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
        <TierAndAddOnPicker
          service={service}
          packageChoice={selectedPackageId}
          selectedAddOnIds={selectedAddOnIds}
          onPackageChange={setPackageChoice}
          onToggleAddOn={toggleAddOn}
        />
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

      <TierAndAddOnPicker
        service={service}
        packageChoice={selectedPackageId}
        selectedAddOnIds={selectedAddOnIds}
        onPackageChange={setPackageChoice}
        onToggleAddOn={toggleAddOn}
      />

      <div className="lead-router-grid">
        <label>
          <span>
            {showsDetailOptions
              ? '04 · Vehicle / property'
              : '02 · Vehicle / property'}
          </span>
          <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
            {vehicleOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>
            {showsDetailOptions ? '05 · Main priority' : '03 · Main priority'}
          </span>
          <select value={goal} onChange={(e) => setGoal(e.target.value)}>
            {goalOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="lead-route-summary">
        <ShieldCheck aria-hidden="true" />
        <p>
          <strong>Your route is ready.</strong>
          {serviceOptions.find(([value]) => value === service)?.[1]} · {vehicle}{' '}
          · {goal}
          {packageLabel ? ' · ' + packageLabel : ''}
          {selectedAddOns.length
            ? ' · Add-ons: ' +
              selectedAddOns.map((addOn) => addOn.name).join(', ')
            : ''}
        </p>
      </div>

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
