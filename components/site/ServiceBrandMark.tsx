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

const secondaryServiceLabels: Record<string, string> = {
  'mobile-detailing': 'Mobile detailing',
  'residential-window-tinting': 'Residential window tint',
  'maintenance-oil-change': 'Maintenance & oil service',
  'tire-service': 'Tire service',
  'key-replacement': 'Automotive locksmith & keys',
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

  if (service === 'vehicle-wraps' || service === 'auto-glass') {
    const isAutoGlass = service === 'auto-glass';

    return (
      <span
        className={[
          classes,
          'service-brand-mark-specialist',
          isAutoGlass
            ? 'service-brand-mark-auto-glass'
            : 'service-brand-mark-wraps',
        ].join(' ')}
      >
        <span className="sr-only">
          {isAutoGlass
            ? 'PRO Auto Glass — Glass Repair and Replacement'
            : 'PRO Wraps — Vehicle Restyling and Graphics'}
        </span>
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
            <span>PRO</span>
            {isAutoGlass ? <span>AUTO</span> : null}
            <span>
              <b>{isAutoGlass ? 'G' : 'W'}</b>
              {isAutoGlass ? 'LASS' : 'RAPS'}
            </span>
          </strong>
          <small>
            <span>
              {isAutoGlass
                ? 'Glass Repair & Replacement'
                : 'Vehicle Restyling & Graphics'}
            </span>
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
        {secondaryServiceLabels[service] ?? 'Specialist automotive service'}
      </span>
    </span>
  );
}
