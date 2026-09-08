'use client';

import { ArrowRight, Check, Phone, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { SyntheticEvent } from 'react';

import { business } from '@/lib/site-data';

const serviceOptions = [
  ['tint', 'LLumar tint'],
  ['ceramic', 'Ceramic coating'],
  ['ppf', 'Paint protection film'],
  ['detailing', 'Auto detailing'],
] as const;

const vehicleOptions = ['Sedan', 'Coupe', 'SUV', 'Truck', 'EV', 'Other'];
const goalOptions = [
  'Cabin comfort & privacy',
  'Protect the paint',
  'Easier maintenance & gloss',
  'Deep interior/exterior reset',
  'I need a recommendation',
];

const serviceGoalDefaults = {
  tint: 'Cabin comfort & privacy',
  ceramic: 'Easier maintenance & gloss',
  ppf: 'Protect the paint',
  detailing: 'Deep interior/exterior reset',
} as const;

const detailingPackageLabels = {
  'tier-1': 'Detailing Tier 1',
  'tier-2': 'Detailing Tier 2',
  'tier-3': 'Detailing Tier 3',
  'tier-4': 'Detailing Tier 4',
} as const;

type SubmitState = 'idle' | 'sending' | 'success' | 'error';

function allowedService(value: string | null) {
  return serviceOptions.some(([id]) => id === value) ? value! : 'tint';
}

function buildTrackedBookingUrl(
  service: string,
  vehicle: string,
  goal: string,
  packageChoice: string,
) {
  const url = new URL(business.bookingUrl);
  url.searchParams.set('utm_source', 'pro_detailing_site');
  url.searchParams.set('utm_medium', 'website');
  url.searchParams.set('utm_campaign', 'vehicle_quote');
  url.searchParams.set('service', service);
  url.searchParams.set('vehicle', vehicle);
  url.searchParams.set('goal', goal);
  if (packageChoice) url.searchParams.set('package', packageChoice);
  return url.toString();
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
  const [vehicle, setVehicle] = useState('Sedan');
  const [goal, setGoal] = useState<string>(
    serviceGoalDefaults[
      normalizedInitialService as keyof typeof serviceGoalDefaults
    ],
  );
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const packageChoice = Object.hasOwn(detailingPackageLabels, initialPackage)
    ? initialPackage
    : '';
  const selectedPackage = service === 'detailing' ? packageChoice : '';
  const packageLabel = selectedPackage
    ? detailingPackageLabels[
        selectedPackage as keyof typeof detailingPackageLabels
      ]
    : '';
  const bookingUrl = useMemo(
    () => buildTrackedBookingUrl(service, vehicle, goal, selectedPackage),
    [goal, selectedPackage, service, vehicle],
  );

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
          package: selectedPackage,
          vehicle: form.get('vehicle'),
          goal: form.get('goal'),
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
          title="Request a PRO Detailing vehicle quote"
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
          <span>VEHICLE REQUEST / CRM</span>
          <span>DIRECT TO PRO DETAILING</span>
        </div>
        {packageLabel ? (
          <p className="lead-package-context">
            Selected starting point: <strong>{packageLabel}</strong>
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
            <select value={service} onChange={(e) => setService(e.target.value)}>
              {serviceOptions.map(([value, label]) => (
                <option value={value} key={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Vehicle</span>
            <input
              name="vehicle"
              placeholder="Year, make and model"
              maxLength={100}
              required
            />
          </label>
          <label>
            <span>Main priority</span>
            <select name="goal" defaultValue={goalOptions[0]}>
              {goalOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </label>
        </div>
        <label className="lead-message-field">
          <span>What should we know?</span>
          <textarea
            name="message"
            rows={4}
            maxLength={1200}
            placeholder="Current condition, desired shade or coverage, and timing."
          />
        </label>
        <label className="lead-consent">
          <input type="checkbox" name="consent" required />
          <span>
            I agree that PRO Detailing may contact me by phone, text or email
            about this request. Message and data rates may apply; reply STOP to
            opt out. View the{' '}
            <a href={business.privacyUrl} target="_blank" rel="noreferrer">
              privacy policy
            </a>
            .
          </span>
        </label>
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
        <span>VEHICLE ROUTER / 01</span>
        <span>HIGH-INTENT PATH</span>
      </div>

      <div className="lead-router-block">
        <span className="lead-step">01 · Choose a system</span>
        <div className="lead-service-options">
          {serviceOptions.map(([value, label]) => (
            <button
              type="button"
              className={service === value ? 'is-active' : ''}
              onClick={() => {
                setService(value);
                setGoal(serviceGoalDefaults[value]);
              }}
              key={value}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="lead-router-grid">
        <label>
          <span>02 · Vehicle profile</span>
          <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
            {vehicleOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>03 · Main priority</span>
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
          {packageLabel ? ` · ${packageLabel}` : ''}
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
