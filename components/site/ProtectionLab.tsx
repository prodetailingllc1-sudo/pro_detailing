'use client';

import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/site/SafeLink';
import type { CSSProperties } from 'react';
import { useState } from 'react';

import { PpfWordmark } from '@/components/site/PpfWordmark';
import { services } from '@/lib/site-data';

const comparisons = {
  tint: {
    mode: 'tint',
    baseSrc: '/gallery/local-tint-white-sedan-night-clear.webp',
    afterSrc: '/gallery/local-tint-white-sedan-night.webp',
    beforeAlt:
      'Interactive comparison of clear and tinted side glass on the same white sedan at night',
    afterLabel: 'Tinted side glass',
    beforeLabel: 'Clear glass',
    ariaLabel: 'Adjust the clear and tinted glass comparison',
    note: 'Same vehicle and view. Actual shade still varies with factory glass, lighting and interior color.',
    width: 1600,
    height: 1200,
  },
  ceramic: {
    mode: 'ceramic',
    baseSrc: '/generated/ceramic-application-comparison.webp',
    afterSrc: '/generated/ceramic-completed-comparison.webp',
    beforeAlt:
      'Interactive service visualization comparing ceramic coating application and the completed finish on the same black luxury sedan',
    afterLabel: 'Completed finish',
    beforeLabel: 'Coating application',
    ariaLabel:
      'Adjust the ceramic coating application and completed finish comparison',
    note: 'Original service visualization—not a customer vehicle. Paint condition and preparation determine the final result.',
    width: 1536,
    height: 1024,
  },
  ppf: {
    mode: 'ppf',
    baseSrc: '/generated/ppf-installation-comparison.webp',
    afterSrc: '/generated/ppf-completed-comparison.webp',
    beforeAlt:
      'Interactive service visualization comparing paint protection film installation and the completed clear finish on the same graphite sports coupe',
    afterLabel: 'Completed clear PPF',
    beforeLabel: 'Film installation',
    ariaLabel:
      'Adjust the paint protection film installation and completed finish comparison',
    note: 'Original service visualization—not a customer vehicle. Clear PPF remains visually subtle after installation.',
    width: 1536,
    height: 1024,
  },
  detail: {
    mode: 'detail',
    baseSrc: '/generated/detailing-before-comparison.webp',
    afterSrc: '/generated/detailing-completed-comparison.webp',
    beforeAlt:
      'Interactive service visualization comparing a neglected and professionally detailed version of the same luxury vehicle cabin',
    afterLabel: 'Detail completed',
    beforeLabel: 'Before detail',
    ariaLabel: 'Adjust the before and completed interior detailing comparison',
    note: 'Original service visualization—not a customer vehicle. Results depend on materials, condition and the agreed scope.',
    width: 1536,
    height: 1024,
  },
} as const;

export function ProtectionLab() {
  const [activeId, setActiveId] =
    useState<(typeof services)[number]['id']>('tint');
  const [comparisonSplit, setComparisonSplit] = useState(50);
  const active =
    services.find((service) => service.id === activeId) ?? services[0];
  const comparison = comparisons[active.id];
  const comparisonRevealStyle = {
    '--lab-comparison-split': `${comparisonSplit}%`,
  } as CSSProperties & Record<'--lab-comparison-split', string>;

  return (
    <div className="protection-lab">
      <fieldset className="lab-controls">
        <legend className="sr-only">Protection systems</legend>
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            aria-pressed={service.id === activeId}
            className={service.id === activeId ? 'is-active' : ''}
            onClick={() => setActiveId(service.id)}
          >
            <span>{service.step}</span>
            <strong>{service.name}</strong>
            <small>{service.short}</small>
          </button>
        ))}
      </fieldset>
      <div className="lab-display" aria-live="polite">
        <div
          className={`lab-photo lab-photo-${active.id} ${comparison ? 'has-comparison-reveal' : ''}`}
        >
          {comparison ? (
            <div
              className={`lab-comparison-reveal lab-comparison-${comparison.mode} lab-comparison-photo-pair`}
              style={comparisonRevealStyle}
            >
              <div className="lab-comparison-visual">
                <Image
                  className="lab-comparison-before"
                  src={comparison.baseSrc}
                  alt={comparison.beforeAlt}
                  width={comparison.width}
                  height={comparison.height}
                  draggable={false}
                  sizes="(max-width: 780px) 100vw, 65vw"
                />
                <span className="lab-comparison-after" aria-hidden="true">
                  <Image
                    className="lab-registered-after"
                    src={comparison.afterSrc}
                    alt=""
                    width={comparison.width}
                    height={comparison.height}
                    draggable={false}
                    sizes="(max-width: 780px) 100vw, 65vw"
                  />
                </span>
              </div>
              <span
                className="lab-comparison-label lab-comparison-label-before"
                aria-hidden="true"
              >
                {comparison.beforeLabel}
              </span>
              <span
                className="lab-comparison-label lab-comparison-label-after"
                aria-hidden="true"
              >
                {comparison.afterLabel}
              </span>
              <span className="lab-comparison-divider" aria-hidden="true" />
              <span className="lab-comparison-note">{comparison.note}</span>
              <input
                type="range"
                min="18"
                max="82"
                step="1"
                value={comparisonSplit}
                aria-label={comparison.ariaLabel}
                aria-valuetext={`${comparisonSplit}% ${comparison.beforeLabel}, ${100 - comparisonSplit}% ${comparison.afterLabel}`}
                onChange={(event) =>
                  setComparisonSplit(Number(event.target.value))
                }
              />
            </div>
          ) : (
            <Image
              src={active.image}
              alt=""
              width="1800"
              height="1200"
              sizes="(max-width: 780px) 100vw, 65vw"
            />
          )}
          <div className="scan-line" aria-hidden="true" />
          <span className="lab-readout">SYSTEM / {active.step}</span>
        </div>
        <div className="lab-copy">
          {active.id === 'ppf' ? (
            <PpfWordmark className="service-mark ppf-wordmark-lab" />
          ) : (
            <Image
              className="service-mark"
              src={active.mark}
              alt=""
              width={active.markWidth}
              height={active.markHeight}
            />
          )}
          <p className="overline">Configured around your vehicle</p>
          <h3>{active.name}</h3>
          <p>{active.description}</p>
          <ul>
            {active.facts.map((fact) => (
              <li key={fact}>
                <Check aria-hidden="true" /> {fact}
              </li>
            ))}
          </ul>
          <Link className="text-link" href={active.href}>
            {active.cta} <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
