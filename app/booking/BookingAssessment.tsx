'use client';

import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  ImagePlus,
  LockKeyhole,
  Phone,
  ShieldCheck,
  Trash2,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';

import styles from '@/app/booking/booking.module.css';
import Link from '@/components/site/SafeLink';
import {
  bookingConditionOptions,
  bookingConcernsForService,
  bookingNeedsAddress,
  type BookingConditionId,
  type BookingServiceId,
} from '@/lib/booking-options';
import { business } from '@/lib/site-data';

const MAX_FILES = 6;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const MAX_TOTAL_BYTES = 24 * 1024 * 1024;
const PHOTO_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const steps = ['Request', 'Condition', 'Photos', 'Contact'] as const;
const vehicleTypes = [
  'Sedan',
  'Coupe',
  'SUV',
  'Truck',
  'EV',
  'Van',
  'Fleet',
  'Other',
];
const propertyTypes = [
  ['single-family', 'Single-family home'],
  ['townhome', 'Townhome'],
  ['condo', 'Condo / apartment'],
  ['commercial', 'Commercial property'],
  ['other', 'Other property'],
] as const;

type SelectItem = { id: string; label: string };
type InitialContext = {
  serviceId: BookingServiceId;
  serviceLabel: string;
  packageId: string;
  packageLabel: string;
  goal: string;
  vehicleHint: string;
  tintLineId: string;
  tintLineLabel: string;
  tintShadeId: string;
  tintShadeLabel: string;
  tintCoverage: SelectItem[];
  ceramicSurfaces: SelectItem[];
  addOns: SelectItem[];
  attribution: Record<string, string>;
  changeHref: string;
};

type PhotoPreview = { file: File; url: string; id: string };
type SubmitState = 'idle' | 'sending' | 'success' | 'error';

function formatBytes(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function BookingAssessment({
  earliestDate,
  initialContext,
  submissionsEnabled,
}: {
  earliestDate: string;
  initialContext: InitialContext;
  submissionsEnabled: boolean;
}) {
  const [step, setStep] = useState(0);
  const [vehicleType, setVehicleType] = useState(
    vehicleTypes.includes(initialContext.vehicleHint)
      ? initialContext.vehicleHint
      : 'Sedan',
  );
  const [vehicleYear, setVehicleYear] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [propertyType, setPropertyType] = useState('single-family');
  const [windowCount, setWindowCount] = useState('');
  const [conditionLevel, setConditionLevel] = useState<BookingConditionId | ''>(
    '',
  );
  const [concernIds, setConcernIds] = useState<string[]>([]);
  const [conditionNotes, setConditionNotes] = useState('');
  const [photos, setPhotos] = useState<PhotoPreview[]>([]);
  const [photoMessage, setPhotoMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState('text');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeWindow, setPreferredTimeWindow] = useState('flexible');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('VA');
  const [postalCode, setPostalCode] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const [reference, setReference] = useState('');
  const [startedAt] = useState(() => Date.now());
  const [website, setWebsite] = useState('');
  const errorRef = useRef<HTMLDivElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const photoUrlsRef = useRef(new Set<string>());

  const serviceId = initialContext.serviceId;
  const isProperty = serviceId === 'residential-tint';
  const needsAddress = bookingNeedsAddress(serviceId);
  const concerns = useMemo(
    () => bookingConcernsForService(serviceId),
    [serviceId],
  );
  const configurationLabels = [
    initialContext.packageLabel,
    initialContext.tintLineLabel,
    initialContext.tintShadeLabel,
    ...initialContext.tintCoverage.map((item) => item.label),
    ...initialContext.ceramicSurfaces.map((item) => item.label),
    ...initialContext.addOns.map((item) => item.label),
  ].filter(Boolean);
  const selectedConcernLabels = concerns
    .filter((concern) => concernIds.includes(concern.id))
    .map((concern) => concern.label);
  const selectedCondition =
    bookingConditionOptions.find((option) => option.id === conditionLevel)
      ?.label ?? 'Not selected yet';
  const selectedProperty =
    propertyTypes.find(([id]) => id === propertyType)?.[1] ?? 'Property';
  const assetSummary = isProperty
    ? `${selectedProperty}${windowCount ? ` · about ${windowCount} windows` : ''}`
    : [vehicleYear, vehicleMake, vehicleModel, vehicleColor]
        .filter(Boolean)
        .join(' ') || vehicleType;
  const addressSummary = [addressLine1, addressLine2, city, state, postalCode]
    .filter(Boolean)
    .join(', ');

  useEffect(
    () => () => {
      photoUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      photoUrlsRef.current.clear();
    },
    [],
  );

  function focusErrors(nextErrors: string[]) {
    setErrors(nextErrors);
    if (nextErrors.length) {
      window.setTimeout(() => errorRef.current?.focus(), 0);
    }
    return !nextErrors.length;
  }

  function validateStep(index: number) {
    const nextErrors: string[] = [];
    if (index === 0) {
      if (isProperty) {
        if (!propertyType) nextErrors.push('Choose the property type.');
        if (
          windowCount &&
          (!/^\d{1,3}$/.test(windowCount) || Number(windowCount) < 1)
        ) {
          nextErrors.push('Enter a valid approximate window count.');
        }
      } else {
        const year = Number(vehicleYear);
        if (
          !/^\d{4}$/.test(vehicleYear) ||
          year < 1900 ||
          year > new Date().getFullYear() + 1
        ) {
          nextErrors.push('Enter a valid four-digit vehicle year.');
        }
        if (vehicleMake.trim().length < 2) {
          nextErrors.push('Enter the vehicle make.');
        }
        if (!vehicleModel.trim()) nextErrors.push('Enter the vehicle model.');
      }
    }
    if (index === 1 && !conditionLevel) {
      nextErrors.push('Choose the closest current condition.');
    }
    if (index === 2 && !photos.length) {
      nextErrors.push('Add at least one current photo for the assessment.');
    }
    if (index === 3) {
      if (name.trim().length < 2) nextErrors.push('Enter your full name.');
      if (phone.replace(/\D/g, '').length < 7) {
        nextErrors.push('Enter a valid phone number.');
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        nextErrors.push('Enter a valid email address.');
      }
      if (preferredContact === 'email' && !email) {
        nextErrors.push('Email is required when email is your preference.');
      }
      if (needsAddress) {
        if (addressLine1.trim().length < 3) {
          nextErrors.push('Enter the service street address.');
        }
        if (city.trim().length < 2) nextErrors.push('Enter the service city.');
        if (!/^[A-Za-z]{2}$/.test(state)) {
          nextErrors.push('Enter a two-letter state.');
        }
        if (!/^\d{5}(?:-\d{4})?$/.test(postalCode)) {
          nextErrors.push('Enter a valid ZIP code.');
        }
      }
      if (!consent) nextErrors.push('Consent is required to send the request.');
    }
    return focusErrors(nextErrors);
  }

  function nextStep() {
    if (!validateStep(step)) return;
    setStep((current) => Math.min(current + 1, steps.length - 1));
    window.setTimeout(() => stepHeadingRef.current?.focus(), 0);
  }

  function previousStep() {
    setErrors([]);
    setStep((current) => Math.max(current - 1, 0));
    window.setTimeout(() => stepHeadingRef.current?.focus(), 0);
  }

  function toggleConcern(id: string) {
    setConcernIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function addPhotos(fileList: FileList | File[]) {
    const incoming = Array.from(fileList);
    const existingIds = new Set(
      photos.map(
        (photo) =>
          `${photo.file.name}:${photo.file.size}:${photo.file.lastModified}`,
      ),
    );
    const accepted: PhotoPreview[] = [];
    const messages: string[] = [];
    let totalBytes = photos.reduce((sum, photo) => sum + photo.file.size, 0);

    for (const file of incoming) {
      const id = `${file.name}:${file.size}:${file.lastModified}`;
      if (existingIds.has(id) || accepted.some((item) => item.id === id)) {
        messages.push(`${file.name} is already selected.`);
        continue;
      }
      if (!PHOTO_TYPES.has(file.type)) {
        messages.push(`${file.name} must be JPEG, PNG or WebP.`);
        continue;
      }
      if (file.size < 1) {
        messages.push(`${file.name} is empty.`);
        continue;
      }
      if (file.size > MAX_FILE_BYTES) {
        messages.push(`${file.name} is larger than 5 MB.`);
        continue;
      }
      if (photos.length + accepted.length >= MAX_FILES) {
        messages.push('You can upload up to six photos.');
        break;
      }
      if (totalBytes + file.size > MAX_TOTAL_BYTES) {
        messages.push('The selected photos exceed the 24 MB total limit.');
        break;
      }
      const url = URL.createObjectURL(file);
      photoUrlsRef.current.add(url);
      totalBytes += file.size;
      accepted.push({ file, id, url });
    }

    if (accepted.length) {
      setPhotos((current) => [...current, ...accepted]);
      setErrors([]);
    }
    setPhotoMessage(
      messages.length
        ? messages.join(' ')
        : `${accepted.length} photo${accepted.length === 1 ? '' : 's'} added.`,
    );
    if (photoInputRef.current) photoInputRef.current.value = '';
  }

  function removePhoto(id: string) {
    const match = photos.find((photo) => photo.id === id);
    if (match) {
      URL.revokeObjectURL(match.url);
      photoUrlsRef.current.delete(match.url);
    }
    setPhotos((current) => current.filter((photo) => photo.id !== id));
    setPhotoMessage('Photo removed.');
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) addPhotos(event.target.files);
  }
  function showReviewModeMessage() {
    if (!validateStep(3)) return;
    setSubmitState('error');
    setSubmitMessage(
      'Submission is intentionally off during review. Approve the private storage and HighLevel destination before launch to activate it.',
    );
  }

  async function submitAssessment(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();
    if (!validateStep(3)) return;
    if (!submissionsEnabled) {
      setSubmitState('error');
      setSubmitMessage(
        'Secure submission is intentionally off during review. Approve the private storage and HighLevel connection before launch to activate it.',
      );
      return;
    }

    setSubmitState('sending');
    setSubmitMessage('Sending your assessment securely...');
    const form = new FormData();
    form.set('schemaVersion', '1');
    form.set('service', serviceId);
    form.set('package', initialContext.packageId);
    form.set('goal', initialContext.goal);
    form.set('tintLine', initialContext.tintLineId);
    form.set('tintShade', initialContext.tintShadeId);
    initialContext.tintCoverage.forEach((item) =>
      form.append('tintCoverageIds', item.id),
    );
    initialContext.ceramicSurfaces.forEach((item) =>
      form.append('ceramicSurfaceIds', item.id),
    );
    initialContext.addOns.forEach((item) => form.append('addOnIds', item.id));
    form.set('vehicleType', vehicleType);
    form.set('vehicleYear', vehicleYear);
    form.set('vehicleMake', vehicleMake);
    form.set('vehicleModel', vehicleModel);
    form.set('vehicleColor', vehicleColor);
    form.set('propertyType', propertyType);
    form.set('windowCount', windowCount);
    form.set('conditionLevel', conditionLevel);
    concernIds.forEach((id) => form.append('concernIds', id));
    form.set('conditionNotes', conditionNotes);
    form.set('name', name);
    form.set('phone', phone);
    form.set('email', email);
    form.set('preferredContact', preferredContact);
    form.set('preferredDate', preferredDate);
    form.set('preferredTimeWindow', preferredTimeWindow);
    form.set('serviceAddressLine1', addressLine1);
    form.set('serviceAddressLine2', addressLine2);
    form.set('serviceCity', city);
    form.set('serviceState', state);
    form.set('servicePostalCode', postalCode);
    form.set('consent', String(consent));
    form.set('website', website);
    form.set('startedAt', String(startedAt));
    form.set('sourcePage', '/booking');
    form.set('landingUrl', window.location.href.slice(0, 500));
    Object.entries(initialContext.attribution).forEach(([key, value]) =>
      form.set(key, value),
    );
    photos.forEach((photo) => form.append('photos', photo.file));

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20_000);

    try {
      const response = await fetch('/api/booking-assessments', {
        method: 'POST',
        body: form,
        credentials: 'same-origin',
        signal: controller.signal,
      });
      let result: { ok?: boolean; reference?: string; error?: string } = {};
      try {
        result = (await response.json()) as typeof result;
      } catch {
        result = {};
      }
      if (!response.ok || !result.ok || !result.reference) {
        throw new Error(result.error || `request_${response.status}`);
      }
      photoUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      photoUrlsRef.current.clear();
      setPhotos([]);
      setReference(result.reference);
      setSubmitState('success');
      setSubmitMessage('Assessment received securely.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      const reason = error instanceof Error ? error.message : '';
      setSubmitState('error');
      setSubmitMessage(
        reason.includes('413') || reason.includes('photo')
          ? 'One or more photos exceeded the secure upload limits. Review the files and try again.'
          : reason.includes('429')
            ? 'Too many requests were sent. Wait a moment and try again.'
            : error instanceof DOMException && error.name === 'AbortError'
              ? 'The request took too long. Your entries are still here; try again.'
              : 'The secure request did not complete. Your entries are still here; retry or call the studio.',
      );
    } finally {
      window.clearTimeout(timeoutId);
    }
  }

  if (submitState === 'success') {
    return (
      <section className={styles.successSection}>
        <div className={`${styles.shell} ${styles.successCard}`}>
          <span className={styles.successIcon}>
            <Check aria-hidden="true" />
          </span>
          <p className={styles.kicker}>Assessment received</p>
          <h2>Your reference is {reference}</h2>
          <p>
            The PRO Detailing team will review your photos and configuration,
            then contact you using your selected preference.
          </p>
          <div className={styles.actions}>
            <Link className={styles.nextButton} href="/">
              Return home <ArrowRight aria-hidden="true" />
            </Link>
            <a className={styles.backButton} href={`tel:${business.phoneHref}`}>
              <Phone aria-hidden="true" /> Call {business.phone}
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.assessmentSection}>
      <div className={styles.shell}>
        <div className={styles.progressCard}>
          <div>
            <span>
              Step {step + 1} of {steps.length}
            </span>
            <strong>{steps[step]}</strong>
          </div>
          <div className={styles.progressTrack} aria-hidden="true">
            <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
          <ol
            aria-label="Booking assessment progress"
            className={styles.stepList}
          >
            {steps.map((label, index) => (
              <li
                className={index === step ? styles.currentStep : ''}
                aria-current={index === step ? 'step' : undefined}
                key={label}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {label}
              </li>
            ))}
          </ol>
        </div>

        <div className={styles.layout}>
          <form className={styles.panel} onSubmit={submitAssessment} noValidate>
            <div className={styles.panelHead}>
              <p className={styles.stepEyebrow}>
                0{step + 1} / {steps[step]}
              </p>
              <h2 ref={stepHeadingRef} tabIndex={-1}>
                {step === 0 && 'Confirm what we are assessing.'}
                {step === 1 && 'Choose the closest current condition.'}
                {step === 2 && 'Show the team what the labels cannot.'}
                {step === 3 && 'Review the request and follow-up details.'}
              </h2>
            </div>

            {errors.length ? (
              <div
                className={styles.errorSummary}
                id="booking-error-summary"
                role="alert"
                ref={errorRef}
                tabIndex={-1}
              >
                <strong>Please complete this step:</strong>
                <ul>
                  {errors.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {step === 0 ? (
              <div className={styles.stepBody}>
                <div className={styles.summaryCard}>
                  <div>
                    <span>Selected service</span>
                    <strong>{initialContext.serviceLabel}</strong>
                  </div>
                  {configurationLabels.length ? (
                    <ul>
                      {configurationLabels.map((label) => (
                        <li key={label}>{label}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>
                      The team will recommend the configuration after review.
                    </p>
                  )}
                  <Link href={initialContext.changeHref}>
                    Change service or package
                  </Link>
                </div>

                {isProperty ? (
                  <div className={styles.formGrid}>
                    <label className={styles.field}>
                      <span>Property type</span>
                      <select
                        value={propertyType}
                        onChange={(event) =>
                          setPropertyType(event.target.value)
                        }
                      >
                        {propertyTypes.map(([value, label]) => (
                          <option value={value} key={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className={styles.field}>
                      <span>Approximate window count</span>
                      <input
                        type="number"
                        min="1"
                        max="999"
                        inputMode="numeric"
                        value={windowCount}
                        onChange={(event) => setWindowCount(event.target.value)}
                        placeholder="Optional"
                      />
                    </label>
                  </div>
                ) : (
                  <div className={styles.formGrid}>
                    <label className={styles.field}>
                      <span>Vehicle type</span>
                      <select
                        value={vehicleType}
                        onChange={(event) => setVehicleType(event.target.value)}
                      >
                        {vehicleTypes.map((type) => (
                          <option key={type}>{type}</option>
                        ))}
                      </select>
                    </label>
                    <label className={styles.field}>
                      <span>Year</span>
                      <input
                        value={vehicleYear}
                        onChange={(event) =>
                          setVehicleYear(
                            event.target.value.replace(/\D/g, '').slice(0, 4),
                          )
                        }
                        inputMode="numeric"
                        placeholder="2024"
                        required
                      />
                    </label>
                    <label className={styles.field}>
                      <span>Make</span>
                      <input
                        value={vehicleMake}
                        onChange={(event) => setVehicleMake(event.target.value)}
                        maxLength={60}
                        placeholder="BMW"
                        required
                      />
                    </label>
                    <label className={styles.field}>
                      <span>Model</span>
                      <input
                        value={vehicleModel}
                        onChange={(event) =>
                          setVehicleModel(event.target.value)
                        }
                        maxLength={60}
                        placeholder="X5 M"
                        required
                      />
                    </label>
                    <label className={styles.field}>
                      <span>Color</span>
                      <input
                        value={vehicleColor}
                        onChange={(event) =>
                          setVehicleColor(event.target.value)
                        }
                        maxLength={40}
                        placeholder="Optional"
                      />
                    </label>
                  </div>
                )}
              </div>
            ) : null}

            {step === 1 ? (
              <div className={styles.stepBody}>
                <fieldset className={styles.cleanFieldset}>
                  <legend className={styles.srOnly}>Current condition</legend>
                  <div className={styles.conditionGrid}>
                    {bookingConditionOptions.map((option) => (
                      <label
                        aria-label={option.label}
                        className={`${styles.conditionCard} ${conditionLevel === option.id ? styles.selectedCard : ''}`}
                        key={option.id}
                      >
                        <input
                          type="radio"
                          name="condition"
                          value={option.id}
                          checked={conditionLevel === option.id}
                          onChange={() => setConditionLevel(option.id)}
                          required
                        />
                        <span>
                          <strong>{option.label}</strong>
                          <small>{option.summary}</small>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                {conditionLevel === 'specialist-review' ? (
                  <div className={styles.assurance}>
                    <ShieldCheck aria-hidden="true" />
                    <p>
                      <strong>Safety review required.</strong> The team will
                      confirm whether it can accept the condition and which
                      preparation or specialist process is appropriate.
                    </p>
                  </div>
                ) : null}
                <fieldset className={styles.cleanFieldset}>
                  <legend>What should we look for?</legend>
                  <div className={styles.concernsGrid}>
                    {concerns.map((concern) => (
                      <label className={styles.concernCard} key={concern.id}>
                        <input
                          type="checkbox"
                          checked={concernIds.includes(concern.id)}
                          onChange={() => toggleConcern(concern.id)}
                        />
                        <span>{concern.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <label className={`${styles.field} ${styles.fullField}`}>
                  <span>Condition notes</span>
                  <textarea
                    rows={5}
                    maxLength={1200}
                    value={conditionNotes}
                    onChange={(event) => setConditionNotes(event.target.value)}
                    placeholder="Where is the concern, how long has it been present, and what result matters most?"
                  />
                  <small>{conditionNotes.length}/1200</small>
                </label>
              </div>
            ) : null}

            {step === 2 ? (
              <div className={styles.stepBody}>
                <label className={styles.uploadZone} htmlFor="booking-photos">
                  <input
                    ref={photoInputRef}
                    id="booking-photos"
                    className={styles.uploadInput}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    multiple
                    required
                    onChange={handlePhotoChange}
                  />
                  <ImagePlus aria-hidden="true" />
                  <strong>Add current photos</strong>
                  <span>Choose files from this device</span>
                  <small>
                    1–6 JPEG, PNG or WebP images · 5 MB each · 24 MB total
                  </small>
                </label>
                <p className={styles.photoGuidance}>
                  <Camera aria-hidden="true" /> Include a full exterior, the
                  main concern, and interior or glass angles relevant to the
                  service. Avoid people, IDs, payment cards and unrelated
                  private information.
                </p>
                <output className={styles.liveMessage} aria-live="polite">
                  {photoMessage}
                </output>
                {photos.length ? (
                  <div className={styles.photoGrid}>
                    {photos.map((photo, index) => (
                      <figure className={styles.photoCard} key={photo.id}>
                        <Image
                          src={photo.url}
                          alt={`Selected assessment photo ${index + 1}`}
                          width="420"
                          height="300"
                          unoptimized
                        />
                        <figcaption>
                          <span>
                            <strong>Photo {index + 1}</strong>
                            <small>{formatBytes(photo.file.size)}</small>
                          </span>
                          <button
                            type="button"
                            onClick={() => removePhoto(photo.id)}
                            aria-label={`Remove ${photo.file.name}`}
                          >
                            <Trash2 aria-hidden="true" />
                          </button>
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            {step === 3 ? (
              <div className={styles.stepBody}>
                <div className={styles.formGrid}>
                  <label className={styles.field}>
                    <span>Full name</span>
                    <input
                      autoComplete="name"
                      maxLength={80}
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Mobile phone</span>
                    <input
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      maxLength={30}
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      required
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Email</span>
                    <input
                      type="email"
                      autoComplete="email"
                      maxLength={120}
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      required={preferredContact === 'email'}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Preferred contact</span>
                    <select
                      value={preferredContact}
                      onChange={(event) =>
                        setPreferredContact(event.target.value)
                      }
                    >
                      <option value="text">Text message</option>
                      <option value="call">Phone call</option>
                      <option value="email">Email</option>
                    </select>
                  </label>
                  <label className={styles.field}>
                    <span>Preferred date</span>
                    <input
                      type="date"
                      min={earliestDate}
                      value={preferredDate}
                      onChange={(event) => setPreferredDate(event.target.value)}
                    />
                  </label>
                  <label className={styles.field}>
                    <span>Preferred time</span>
                    <select
                      value={preferredTimeWindow}
                      onChange={(event) =>
                        setPreferredTimeWindow(event.target.value)
                      }
                    >
                      <option value="flexible">Flexible</option>
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                    </select>
                  </label>
                </div>
                {needsAddress ? (
                  <fieldset className={styles.addressGroup}>
                    <legend>Service location</legend>
                    <div className={styles.formGrid}>
                      <label className={`${styles.field} ${styles.fullField}`}>
                        <span>Street address</span>
                        <input
                          autoComplete="street-address"
                          maxLength={120}
                          value={addressLine1}
                          onChange={(event) =>
                            setAddressLine1(event.target.value)
                          }
                          required
                        />
                      </label>
                      <label className={`${styles.field} ${styles.fullField}`}>
                        <span>Unit / suite</span>
                        <input
                          maxLength={80}
                          value={addressLine2}
                          onChange={(event) =>
                            setAddressLine2(event.target.value)
                          }
                        />
                      </label>
                      <label className={styles.field}>
                        <span>City</span>
                        <input
                          autoComplete="address-level2"
                          maxLength={60}
                          value={city}
                          onChange={(event) => setCity(event.target.value)}
                          required
                        />
                      </label>
                      <label className={styles.field}>
                        <span>State</span>
                        <input
                          autoComplete="address-level1"
                          maxLength={2}
                          value={state}
                          onChange={(event) =>
                            setState(
                              event.target.value
                                .toUpperCase()
                                .replace(/[^A-Z]/g, ''),
                            )
                          }
                          required
                        />
                      </label>
                      <label className={styles.field}>
                        <span>ZIP code</span>
                        <input
                          autoComplete="postal-code"
                          inputMode="numeric"
                          maxLength={10}
                          value={postalCode}
                          onChange={(event) =>
                            setPostalCode(event.target.value)
                          }
                          required
                        />
                      </label>
                    </div>
                  </fieldset>
                ) : null}
                <section
                  className={styles.reviewSummary}
                  aria-labelledby="booking-review-title"
                >
                  <h3 id="booking-review-title">Final request review</h3>
                  <dl className={styles.reviewGrid}>
                    <div>
                      <dt>Service</dt>
                      <dd>{initialContext.serviceLabel}</dd>
                    </div>
                    <div>
                      <dt>{isProperty ? 'Property' : 'Vehicle'}</dt>
                      <dd>{assetSummary}</dd>
                    </div>
                    <div>
                      <dt>Condition</dt>
                      <dd>{selectedCondition}</dd>
                    </div>
                    <div>
                      <dt>Photos</dt>
                      <dd>{photos.length} selected</dd>
                    </div>
                    <div>
                      <dt>Concerns</dt>
                      <dd>
                        {selectedConcernLabels.join(', ') ||
                          'No specific concern selected'}
                      </dd>
                    </div>
                    <div>
                      <dt>Preferred timing</dt>
                      <dd>
                        {preferredDate || 'Flexible date'} ·{' '}
                        {preferredTimeWindow}
                      </dd>
                    </div>
                    {needsAddress ? (
                      <div>
                        <dt>Service location</dt>
                        <dd>{addressSummary || 'Enter address above'}</dd>
                      </div>
                    ) : null}
                    {conditionNotes ? (
                      <div>
                        <dt>Notes</dt>
                        <dd>{conditionNotes}</dd>
                      </div>
                    ) : null}
                  </dl>
                </section>

                <label className={styles.consent}>
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => setConsent(event.target.checked)}
                    required
                  />
                  <span>
                    I agree that PRO Detailing may contact me by phone, text or
                    email about this request. Message and data rates may apply;
                    reply STOP to opt out. I have read the{' '}
                    <Link href="/privacy-policy">privacy policy</Link>.
                  </span>
                </label>
                <label className={styles.honeypot} aria-hidden="true">
                  Website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(event) => setWebsite(event.target.value)}
                  />
                </label>
                {!submissionsEnabled ? (
                  <div className={styles.reviewMode} id="booking-review-mode">
                    <LockKeyhole aria-hidden="true" />
                    <p>
                      <strong>Review mode</strong> The form design is ready, but
                      customer-data submission stays off until you explicitly
                      approve the private database, photo storage and HighLevel
                      destination.
                    </p>
                  </div>
                ) : null}
                {submitMessage ? (
                  <output
                    className={`${styles.submitStatus} ${submitState === 'error' ? styles.submitError : ''}`}
                    aria-live="polite"
                  >
                    {submitMessage}
                  </output>
                ) : null}
              </div>
            ) : null}

            <div className={styles.actions}>
              {step > 0 ? (
                <button
                  className={styles.backButton}
                  type="button"
                  onClick={previousStep}
                >
                  <ArrowLeft aria-hidden="true" /> Back
                </button>
              ) : (
                <span />
              )}
              {step < steps.length - 1 ? (
                <button
                  className={styles.nextButton}
                  type="button"
                  onClick={nextStep}
                >
                  Continue <ArrowRight aria-hidden="true" />
                </button>
              ) : (
                <button
                  className={styles.nextButton}
                  type={submissionsEnabled ? 'submit' : 'button'}
                  disabled={submitState === 'sending'}
                  aria-describedby={
                    submissionsEnabled ? undefined : 'booking-review-mode'
                  }
                  onClick={
                    submissionsEnabled ? undefined : showReviewModeMessage
                  }
                >
                  {submissionsEnabled
                    ? submitState === 'sending'
                      ? 'Sending securely…'
                      : 'Send assessment'
                    : 'Preview complete — submission off'}{' '}
                  <ArrowRight aria-hidden="true" />
                </button>
              )}
            </div>
          </form>

          <aside className={styles.aside}>
            <div className={styles.asideSection}>
              <p className={styles.kicker}>Selected route</p>
              <h3>{initialContext.serviceLabel}</h3>
              {configurationLabels.length ? (
                <ul>
                  {configurationLabels.map((label) => (
                    <li key={label}>
                      <Check aria-hidden="true" />
                      {label}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Configuration confirmed after inspection.</p>
              )}
            </div>
            <div className={styles.asideSection}>
              <p className={styles.kicker}>Condition signal</p>
              <strong>
                {
                  bookingConditionOptions.find(
                    (option) => option.id === conditionLevel,
                  )?.label
                }
              </strong>
              <span>
                {photos.length} of {MAX_FILES} photos ready
              </span>
            </div>
            <div className={styles.asideSection}>
              <ShieldCheck aria-hidden="true" />
              <h3>What happens next</h3>
              <ol>
                <li>
                  <span>01</span>Team reviews condition and photos
                </li>
                <li>
                  <span>02</span>Scope, product and price are confirmed
                </li>
                <li>
                  <span>03</span>Appointment is coordinated
                </li>
              </ol>
            </div>
            <a className={styles.phoneLink} href={`tel:${business.phoneHref}`}>
              <Phone aria-hidden="true" />
              <span>
                Prefer to talk?<strong>{business.phone}</strong>
              </span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
