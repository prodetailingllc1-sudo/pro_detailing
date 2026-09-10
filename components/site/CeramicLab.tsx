'use client';

import { Droplets, ShieldCheck, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { BeforeAfterComparison } from '@/components/site/BeforeAfterComparison';

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
  const current = steps.find((step) => step.id === active) ?? steps[0];

  return (
    <div className="ceramic-lab">
      <BeforeAfterComparison
        className="ceramic-visual ceramic-finish-comparison"
        beforeSrc="/vehicles/coupe.webp"
        afterSrc="/vehicles/coupe.webp"
        beforeAlt="Interactive paint-only appearance comparison on the same white Mercedes-AMG coupe before and after a simulated Ceramic Pro finish"
        beforeLabel="Prepared paint"
        afterLabel="Ceramic Pro finish"
        ariaLabel="Compare prepared paint and the simulated Ceramic Pro finish on the white Mercedes-AMG coupe"
        note="Same Mercedes-AMG coupe and angle · paint-only appearance preview"
        afterOverlayClassName="ceramic-coating-sheen"
        sizes="(max-width: 780px) 100vw, 60vw"
      />
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
