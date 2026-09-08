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
    beforeSrc: '/gallery/local-tint-white-sedan-night-clear.webp',
    beforeAlt:
      'Interactive comparison of clear and tinted glass on the same white sedan',
    afterLabel: 'Tinted glass',
    beforeLabel: 'Clear glass',
    afterSrc: '/gallery/local-tint-white-sedan-night.webp',
    ariaLabel: 'Adjust the clear and tinted glass comparison',
    note: 'Appearance preview. Actual shade varies with factory glass and lighting.',
    width: 1600,
    height: 1200,
  },
  ceramic: {
    mode: 'ceramic',
    beforeSrc: '/generated/ceramic-untreated-before.webp',
    beforeAlt:
      'Interactive finish preview showing the same black BMW before and after ceramic coating',
    afterLabel: 'Ceramic Pro finish',
    beforeLabel: 'Untreated finish',
    afterSrc: '/gallery/glossy-black-coupe.webp',
    ariaLabel: 'Adjust the untreated and Ceramic Pro finish preview',
    note: 'Finish preview. Final gloss depends on paint condition and preparation.',
    width: 1200,
    height: 672,
  },
  ppf: {
    mode: 'ppf',
    beforeSrc: '/generated/ppf-unprotected-before.webp',
    beforeAlt:
      'Interactive comparison of the same grey BMW before and after clear paint protection film',
    afterLabel: 'Clear PRO PPF',
    beforeLabel: 'Unprotected paint',
    afterSrc: '/generated/ppf-finished-clear-v2.webp',
    ariaLabel: 'Adjust the unprotected paint and clear PPF comparison',
    note: 'Coverage preview. Clear film is designed to preserve the paint color.',
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
  const comparison = active.id === 'detail' ? null : comparisons[active.id];
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
              className={`lab-comparison-reveal lab-comparison-${comparison.mode}`}
              style={comparisonRevealStyle}
            >
              <div className="lab-comparison-visual">
                <Image
                  className="lab-comparison-before"
                  src={comparison.beforeSrc}
                  alt={comparison.beforeAlt}
                  width={comparison.width}
                  height={comparison.height}
                  draggable={false}
                  sizes="(max-width: 780px) 100vw, 65vw"
                />
                <span className="lab-comparison-after" aria-hidden="true">
                  <Image
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
