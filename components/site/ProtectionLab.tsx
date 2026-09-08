'use client';

import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { services } from '@/lib/site-data';

export function ProtectionLab() {
  const [activeId, setActiveId] =
    useState<(typeof services)[number]['id']>('tint');
  const active =
    services.find((service) => service.id === activeId) ?? services[0];

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
        <div className="lab-photo">
          <Image
            src={active.image}
            alt=""
            width="1800"
            height="1200"
            sizes="(max-width: 780px) 100vw, 65vw"
          />
          <div className="scan-line" aria-hidden="true" />
          <span className="lab-readout">SYSTEM / {active.step}</span>
        </div>
        <div className="lab-copy">
          <Image
            className="service-mark"
            src={active.mark}
            alt=""
            width={active.markWidth}
            height={active.markHeight}
          />
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
