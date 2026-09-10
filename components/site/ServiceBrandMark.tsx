import Image from 'next/image';

import { PpfWordmark } from '@/components/site/PpfWordmark';

const imageMarks = {
  'window-tinting': {
    src: '/brand/pro-tints-optimized.webp',
    alt: 'PRO Tints by PRO Detailing LLC',
    width: 1100,
    height: 204,
  },
  'ceramic-coating': {
    src: '/brand/pro-ceramic-optimized.webp',
    alt: 'PRO Ceramic coating services',
    width: 1100,
    height: 174,
  },
  'auto-detailing': {
    src: '/brand/pro-detailing-optimized.webp',
    alt: 'PRO Detailing',
    width: 1100,
    height: 154,
  },
} as const;

const specialistWordmarks: Record<
  string,
  {
    accessibleLabel: string;
    lead: readonly string[];
    accent: string;
    rest: string;
    subtitle: string;
    density: 'standard' | 'wide' | 'extra-wide';
  }
> = {
  'vehicle-wraps': {
    accessibleLabel: 'PRO Wraps — Vehicle Restyling and Graphics',
    lead: ['PRO'],
    accent: 'W',
    rest: 'RAPS',
    subtitle: 'Vehicle Restyling & Graphics',
    density: 'standard',
  },
  'auto-glass': {
    accessibleLabel: 'PRO Auto Glass — Glass Repair and Replacement',
    lead: ['PRO', 'AUTO'],
    accent: 'G',
    rest: 'LASS',
    subtitle: 'Glass Repair & Replacement',
    density: 'wide',
  },
  'maintenance-oil-change': {
    accessibleLabel: 'PRO Auto Care — Maintenance and Oil Service',
    lead: ['PRO', 'AUTO'],
    accent: 'C',
    rest: 'ARE',
    subtitle: 'Automotive Maintenance & Repair',
    density: 'wide',
  },
  'tire-service': {
    accessibleLabel: 'PRO Tires — Change, Rotation and Flat Repair',
    lead: ['PRO'],
    accent: 'T',
    rest: 'IRES',
    subtitle: 'Tire Service · Rotation · Flat Repair',
    density: 'standard',
  },
  'key-replacement': {
    accessibleLabel: 'PRO Locksmith — Keys, Lockouts and Fob Programming',
    lead: ['PRO'],
    accent: 'L',
    rest: 'OCKSMITH',
    subtitle: 'Lockouts · Keys · Fob Programming',
    density: 'wide',
  },
  'mobile-detailing': {
    accessibleLabel: 'PRO Mobile Detailing — Interior and Exterior Service',
    lead: ['PRO', 'MOBILE'],
    accent: 'D',
    rest: 'ETAILING',
    subtitle: 'Mobile Interior & Exterior Care',
    density: 'extra-wide',
  },
  'residential-window-tinting': {
    accessibleLabel: 'PRO Home Tints — Residential Window Film',
    lead: ['PRO', 'HOME'],
    accent: 'T',
    rest: 'INTS',
    subtitle: 'Residential Window Film',
    density: 'wide',
  },
};

type ServiceBrandMarkProps = {
  service: string;
  className?: string;
  priority?: boolean;
};

export function ServiceBrandMark({
  service,
  className = '',
  priority = true,
}: ServiceBrandMarkProps) {
  const imageMark = imageMarks[service as keyof typeof imageMarks];
  const classes = `service-brand-mark ${className}`.trim();

  if (imageMark) {
    return (
      <span className={`${classes} service-brand-mark-image`}>
        <Image
          src={imageMark.src}
          alt={imageMark.alt}
          width={imageMark.width}
          height={imageMark.height}
          sizes="(max-width: 620px) 88vw, 680px"
          priority={priority}
        />
      </span>
    );
  }

  if (service === 'paint-protection-film') {
    return (
      <span className={`${classes} service-brand-mark-ppf`}>
        <PpfWordmark className="service-brand-ppf-lockup" />
      </span>
    );
  }

  const specialistWordmark = specialistWordmarks[service];

  if (specialistWordmark) {
    return (
      <span
        className={[
          classes,
          'service-brand-mark-specialist',
          `service-brand-mark-${specialistWordmark.density}`,
        ].join(' ')}
      >
        <span className="sr-only">{specialistWordmark.accessibleLabel}</span>
        <Image
          className="service-brand-symbol"
          src="/pro-mark.png"
          alt=""
          width={400}
          height={400}
          priority={priority}
        />
        <span className="service-brand-divider" aria-hidden="true" />
        <span className="service-brand-wording" aria-hidden="true">
          <strong>
            {specialistWordmark.lead.map((word) => (
              <span key={word}>{word}</span>
            ))}
            <span>
              <b>{specialistWordmark.accent}</b>
              {specialistWordmark.rest}
            </span>
          </strong>
          <small>
            <span>{specialistWordmark.subtitle}</span>
          </small>
        </span>
      </span>
    );
  }

  return (
    <span className={`${classes} service-brand-mark-secondary`}>
      <Image
        src="/brand/pro-detailing-optimized.webp"
        alt="PRO Detailing"
        width={1100}
        height={154}
        sizes="(max-width: 620px) 88vw, 680px"
        priority={priority}
      />
      <span className="service-brand-context">
        <span aria-hidden="true" />
        Specialist automotive service
      </span>
    </span>
  );
}
