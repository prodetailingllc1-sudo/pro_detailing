'use client';

import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/site/SafeLink';
import type { CSSProperties } from 'react';
import { useState } from 'react';

import { PpfWordmark } from '@/components/site/PpfWordmark';
import { services } from '@/lib/site-data';

export function ProtectionLab() {
  const [activeId, setActiveId] =
    useState<(typeof services)[number]['id']>('tint');
  const [tintSplit, setTintSplit] = useState(50);
  const active =
    services.find((service) => service.id === activeId) ?? services[0];
  const tintRevealStyle = {
    '--lab-tint-split': `${tintSplit}%`,
  } as CSSProperties & Record<'--lab-tint-split', string>;

  return (
    <div className="protection-lab">
      <div
        className="lab-controls"
        role="tablist"
        aria-label="Protection systems"
      >
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            role="tab"
            aria-selected={service.id === activeId}
            aria-controls={`system-${service.id}`}
            id={`system-tab-${service.id}`}
            className={service.id === activeId ? 'is-active' : ''}
            onClick={() => setActiveId(service.id)}
          >
            <span>{service.step}</span>
            <strong>{service.name}</strong>
            <small>{service.short}</small>
          </button>
        ))}
      </div>
      <div
        className="lab-display"
        role="tabpanel"
        id={`system-${active.id}`}
        aria-labelledby={`system-tab-${active.id}`}
      >
        <div
          className={`lab-photo ${active.id === 'tint' ? 'has-tint-reveal' : ''}`}
        >
          {active.id === 'tint' ? (
            <div className="lab-tint-reveal" style={tintRevealStyle}>
              <Image
                className="lab-tint-clear"
                src="/gallery/local-tint-white-sedan-night-clear.webp"
                alt="White sedan comparison with clear glass on the left and tinted glass on the right"
                width="1600"
                height="1200"
                draggable={false}
                sizes="(max-width: 780px) 100vw, 65vw"
              />
              <span className="lab-tint-dark-layer" aria-hidden="true">
                <Image
                  src={active.image}
                  alt=""
                  width="1600"
                  height="1200"
                  draggable={false}
                  sizes="(max-width: 780px) 100vw, 65vw"
                />
              </span>
              <span
                className="lab-tint-label lab-tint-label-clear"
                aria-hidden="true"
              >
                Clear
              </span>
              <span
                className="lab-tint-label lab-tint-label-dark"
                aria-hidden="true"
              >
                Tinted
              </span>
              <span className="lab-tint-divider" aria-hidden="true" />
              <input
                type="range"
                min="18"
                max="82"
                step="1"
                value={tintSplit}
                aria-label="Adjust the clear and tinted glass comparison"
                aria-valuetext={`${tintSplit}% clear, ${100 - tintSplit}% tinted`}
                onChange={(event) => setTintSplit(Number(event.target.value))}
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
