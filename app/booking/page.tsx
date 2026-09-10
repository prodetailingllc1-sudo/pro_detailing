import { ArrowLeft, ShieldCheck } from 'lucide-react';

import { BookingAssessment } from '@/app/booking/BookingAssessment';
import styles from '@/app/booking/booking.module.css';
import Link from '@/components/site/SafeLink';
import { bookingService, isBookingService } from '@/lib/booking-options';
import { createPageMetadata } from '@/lib/metadata';
import { resolveQuotePackage } from '@/lib/quote-packages';
import {
  resolveCeramicSurfaceOfferings,
  resolveQuoteAddOns,
  resolveTintCoverage,
  resolveTintLine,
  resolveTintShade,
} from '@/lib/quote-options';
import { siteFeatures } from '@/lib/site-config';

export const metadata = createPageMetadata({
  title: 'Vehicle Condition Assessment & Booking | PRO Detailing',
  description:
    'Send vehicle or property details and photos for a service-specific PRO Detailing assessment before scheduling.',
  path: '/booking',
});

type BookingSearchParams = Record<string, string | string[] | undefined>;

function first(value: string | string[] | undefined, max = 200) {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate?.trim().slice(0, max) ?? '';
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<BookingSearchParams>;
}) {
  const params = await searchParams;
  const requestedService = first(params.service, 40);
  const serviceId =
    isBookingService(requestedService) &&
    (requestedService !== 'mobile-detailing' || siteFeatures.mobileDetailing)
      ? requestedService
      : 'detailing';
  const service = bookingService(serviceId);
  const packageChoice = resolveQuotePackage(
    service.id,
    first(params.package, 40),
  );
  const tintLine =
    service.id === 'tint' ? resolveTintLine(first(params.film, 20)) : null;
  const tintShade = tintLine
    ? resolveTintShade(tintLine.id, first(params.shade, 30))
    : null;
  const tintCoverage =
    service.id === 'tint'
      ? resolveTintCoverage(first(params.coverage).split(',')).map(
          (option) => ({
            id: option.id,
            label: option.label,
          }),
        )
      : [];
  const ceramicSurfaces =
    service.id === 'ceramic'
      ? resolveCeramicSurfaceOfferings(first(params.surfaces).split(',')).map(
          (option) => ({ id: option.id, label: option.name }),
        )
      : [];
  const addOns =
    service.id === 'detailing' ||
    service.id === 'mobile-detailing' ||
    service.id === 'ppf' ||
    service.id === 'wrap'
      ? resolveQuoteAddOns(first(params.addons).split(','), service.id).map(
          (option) => ({ id: option.id, label: option.name }),
        )
      : [];
  const goal = first(params.goal, 120);
  const vehicleHint = first(params.vehicle, 60);
  const attribution = Object.fromEntries(
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'gclid']
      .map((key) => [key, first(params[key], 200)])
      .filter(([, value]) => Boolean(value)),
  ) as Record<string, string>;
  const changeParams = new URLSearchParams({ service: service.id });
  if (goal) changeParams.set('goal', goal);
  if (vehicleHint) changeParams.set('vehicle', vehicleHint);
  Object.entries(attribution).forEach(([key, value]) =>
    changeParams.set(key, value),
  );
  if (packageChoice) changeParams.set('package', packageChoice.id);
  if (tintLine) changeParams.set('film', tintLine.id);
  if (tintShade) changeParams.set('shade', tintShade.id);
  if (tintCoverage.length) {
    changeParams.set('coverage', tintCoverage.map((item) => item.id).join(','));
  }
  if (ceramicSurfaces.length) {
    changeParams.set(
      'surfaces',
      ceramicSurfaces.map((item) => item.id).join(','),
    );
  }
  if (addOns.length) {
    changeParams.set('addons', addOns.map((item) => item.id).join(','));
  }

  const submissionsEnabled = ['1', 'true', 'on', 'yes'].includes(
    (process.env.NEXT_PUBLIC_BOOKING_SUBMISSIONS_ENABLED ?? '').toLowerCase(),
  );
  const changeHref = `/request-quote?${changeParams.toString()}`;
  const earliestDate = new Date().toISOString().slice(0, 10);

  return (
    <main id="main-content" className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <Link className={styles.backLink} href={changeHref}>
            <ArrowLeft aria-hidden="true" /> Back to service selection
          </Link>
          <div className={styles.heroGrid}>
            <div>
              <p className={styles.kicker}>
                PRO assessment /{' '}
                {submissionsEnabled ? 'secure intake' : 'booking preview'}
              </p>
              <h1>Let the actual condition shape the appointment.</h1>
              <p className={styles.subhead}>
                Show us the vehicle or glass, choose the closest condition and
                send clear photos. The team reviews the request before it
                confirms scope, timing or price.
              </p>
            </div>
            <div className={styles.heroAssurance}>
              <ShieldCheck aria-hidden="true" />
              <strong>
                {submissionsEnabled
                  ? 'Private photo review'
                  : 'Private workflow preview'}
              </strong>
              <span>
                {submissionsEnabled
                  ? 'No public gallery. No old-site booking dependency.'
                  : 'Selected photos stay on this device while review mode is on.'}
              </span>
            </div>
          </div>
        </div>
      </section>

      <BookingAssessment
        initialContext={{
          serviceId: service.id,
          serviceLabel: service.label,
          packageId: packageChoice?.id ?? '',
          packageLabel: packageChoice?.label ?? '',
          goal,
          vehicleHint,
          tintLineId: tintLine?.id ?? '',
          tintLineLabel: tintLine ? `LLumar ${tintLine.name}` : '',
          tintShadeId: tintShade?.id ?? '',
          tintShadeLabel: tintShade
            ? `${tintShade.label} · ${tintShade.vlt}% measured VLT`
            : '',
          tintCoverage,
          ceramicSurfaces,
          addOns,
          attribution,
          changeHref,
        }}
        earliestDate={earliestDate}
        submissionsEnabled={submissionsEnabled}
      />
    </main>
  );
}
