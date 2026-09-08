import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/site/SafeLink';

import { PpfWordmark } from '@/components/site/PpfWordmark';
import { services } from '@/lib/site-data';

const systemLabels = {
  tint: 'Glass technology',
  ceramic: 'Surface technology',
  ppf: 'Impact protection',
  detail: 'Appearance reset',
} as const;

export function BrandUniverse() {
  return (
    <section className="brand-universe section" id="brand-systems">
      <div className="brand-universe-glow" aria-hidden="true" />
      <div className="shell">
        <div className="brand-universe-head">
          <div>
            <p className="eyebrow">
              <span /> One studio · four specialist systems
            </p>
            <h2>The PRO family is built around your vehicle.</h2>
          </div>
          <p>
            Distinct service identities make the decision clearer. Every path
            returns to the same Manassas studio, inspection-led recommendation
            and careful handoff.
          </p>
        </div>

        <div className="brand-deck">
          {services.map((service, index) => (
            <Link
              className={`brand-card brand-card-${service.id}`}
              href={service.href}
              key={service.id}
            >
              <span className="brand-card-index">0{index + 1}</span>
              <span className="brand-card-signal" aria-hidden="true" />
              <div className="brand-card-logo">
                {service.id === 'ppf' ? (
                  <PpfWordmark className="ppf-wordmark-card" />
                ) : (
                  <Image
                    src={service.mark}
                    alt={
                      service.id === 'detail'
                        ? 'PRO Detailing'
                        : service.id === 'tint'
                          ? 'PRO Tints by PRO Detailing LLC'
                          : 'PRO Ceramic'
                    }
                    width={service.markWidth}
                    height={service.markHeight}
                    sizes="(max-width: 780px) 80vw, 24vw"
                  />
                )}
              </div>
              <div className="brand-card-copy">
                <span>{systemLabels[service.id]}</span>
                <p>{service.short}</p>
              </div>
              <span className="brand-card-cta">
                Explore system <ArrowUpRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
