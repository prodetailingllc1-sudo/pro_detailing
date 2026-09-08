'use client';

import { Droplets, ShieldCheck, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

const steps = [
  {
    id: 'inspect',
    label: 'Inspect',
    detail:
      'Lighting reveals the paint condition, contamination and defects before a coating is discussed.',
  },
  {
    id: 'prepare',
    label: 'Prepare',
    detail:
      'Washing, decontamination and any agreed correction create the foundation for a clean bond.',
  },
  {
    id: 'coat',
    label: 'Coat',
    detail:
      'A suitable Ceramic Pro coating option is confirmed after inspection and applied methodically.',
  },
  {
    id: 'aftercare',
    label: 'Aftercare',
    detail:
      'Clear cure-time and maintenance instructions help preserve the installed finish.',
  },
] as const;

export function CeramicLab() {
  const [active, setActive] = useState<(typeof steps)[number]['id']>('prepare');
  const [finish, setFinish] = useState(68);
  const current = steps.find((step) => step.id === active) ?? steps[0];

  return (
    <div className="ceramic-lab">
      <div className="ceramic-visual">
        <Image
          className="ceramic-vehicle-before"
          src="/vehicles/coupe.webp"
          alt="Interactive registered comparison of untreated and Ceramic Pro-finished paint on the same coupe"
          width="1536"
          height="1024"
          sizes="(max-width: 780px) 100vw, 60vw"
        />
        <div
          className="ceramic-reveal"
          style={{ clipPath: `inset(0 ${100 - finish}% 0 0)` }}
          aria-hidden="true"
        >
          <Image
            className="ceramic-vehicle-after"
            src="/vehicles/coupe.webp"
            alt=""
            width="1536"
            height="1024"
            sizes="(max-width: 780px) 100vw, 60vw"
          />
          <span
            className="ceramic-paint-mask"
            style={{
              WebkitMaskImage: 'url(/vehicles/masks/coupe-paint.png)',
              maskImage: 'url(/vehicles/masks/coupe-paint.png)',
            }}
          />
        </div>
        <div
          className="ceramic-divider"
          style={{ left: `${finish}%` }}
          aria-hidden="true"
        />
        <label className="ceramic-slider">
          <span className="sr-only">
            Adjust untreated and Ceramic Pro finish comparison
          </span>
          <input
            type="range"
            min="12"
            max="88"
            value={finish}
            aria-valuetext={`${100 - finish}% untreated paint, ${finish}% Ceramic Pro finish`}
            onChange={(event) => setFinish(Number(event.target.value))}
          />
        </label>
        <span className="demo-label">
          Same vehicle · untreated ↔ coated finish
        </span>
      </div>
      <div className="ceramic-controls">
        <p className="overline">Preparation protocol</p>
        <h3>Coating starts before the bottle opens.</h3>
        <fieldset className="ceramic-steps">
          <legend className="sr-only">Ceramic coating process</legend>
          {steps.map((step, index) => (
            <button
              type="button"
              aria-pressed={active === step.id}
              className={active === step.id ? 'is-active' : ''}
              onClick={() => setActive(step.id)}
              key={step.id}
            >
              <span>0{index + 1}</span>
              {step.label}
            </button>
          ))}
        </fieldset>
        <p className="ceramic-detail" aria-live="polite">
          {current.detail}
        </p>
        <div className="benefit-icons">
          <div>
            <Sparkles aria-hidden="true" />
            <span>Gloss enhancement</span>
          </div>
          <div>
            <Droplets aria-hidden="true" />
            <span>Hydrophobic behavior</span>
          </div>
          <div>
            <ShieldCheck aria-hidden="true" />
            <span>Contaminant resistance</span>
          </div>
        </div>
        <small>
          Visual effect is a presentation aid, not a guarantee of outcome. Paint
          condition and preparation affect the finished result.
        </small>
      </div>
    </div>
  );
}
