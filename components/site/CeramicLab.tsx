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
          src="/gallery/glossy-black-coupe.webp"
          alt="Glossy black coupe under studio lighting"
          width="1800"
          height="1200"
          sizes="(max-width: 780px) 100vw, 60vw"
        />
        <div
          className="ceramic-reveal"
          style={{ width: `${finish}%` }}
          aria-hidden="true"
        >
          <Image
            src="/gallery/glossy-black-coupe.webp"
            alt=""
            width="1800"
            height="1200"
            sizes="(max-width: 780px) 100vw, 60vw"
          />
        </div>
        <div
          className="ceramic-divider"
          style={{ left: `${finish}%` }}
          aria-hidden="true"
        />
        <label className="ceramic-slider">
          <span className="sr-only">Move demonstration reveal</span>
          <input
            type="range"
            min="12"
            max="88"
            value={finish}
            onChange={(event) => setFinish(Number(event.target.value))}
          />
        </label>
        <span className="demo-label">Finish demonstration</span>
      </div>
      <div className="ceramic-controls">
        <p className="overline">Preparation protocol</p>
        <h3>Coating starts before the bottle opens.</h3>
        <div
          className="ceramic-steps"
          role="tablist"
          aria-label="Ceramic coating process"
        >
          {steps.map((step, index) => (
            <button
              type="button"
              role="tab"
              aria-selected={active === step.id}
              className={active === step.id ? 'is-active' : ''}
              onClick={() => setActive(step.id)}
              key={step.id}
            >
              <span>0{index + 1}</span>
              {step.label}
            </button>
          ))}
        </div>
        <p className="ceramic-detail">{current.detail}</p>
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
