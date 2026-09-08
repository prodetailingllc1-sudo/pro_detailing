import {
  ArrowRight,
  CarFront,
  CircleGauge,
  House,
  KeyRound,
  PanelsTopLeft,
  Plane,
  ShieldCheck,
  Sparkles,
  SunMedium,
  Wrench,
} from 'lucide-react';
import Link from '@/components/site/SafeLink';

import { QuoteBand } from '@/components/site/QuoteBand';
import { SectionIntro } from '@/components/site/SectionIntro';
import { additionalServices } from '@/lib/expanded-content';
import { siteFeatures } from '@/lib/site-config';
import { quoteHref, services } from '@/lib/site-data';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Automotive Services Manassas, VA | PRO Detailing',
  description: siteFeatures.mobileDetailing
    ? 'Explore tint, ceramic coating, PPF, detailing, maintenance, tires, glass, keys, mobile detailing, home tint and aircraft care in Northern Virginia.'
    : 'Explore tint, ceramic coating, PPF, detailing, maintenance, tires, glass, keys, home tint and aircraft care in Northern Virginia.',
  path: '/our-services',
});

const coreIcons = [SunMedium, Sparkles, ShieldCheck, CarFront];
const additionalIcons: Record<string, typeof CarFront> = {
  'mobile-detailing': CarFront,
  'residential-window-tinting': House,
  'maintenance-oil-change': Wrench,
  'tire-service': CircleGauge,
  'auto-glass': PanelsTopLeft,
  'key-replacement': KeyRound,
};

export default function ServicesPage() {
  const visibleAdditional = additionalServices.filter(
    (service) =>
      service.slug !== 'mobile-detailing' || siteFeatures.mobileDetailing,
  );

  return (
    <main id="main-content" className="services-index-page">
      <section className="services-index-hero">
        <div className="shell">
          <p className="eyebrow">
            <span /> Complete PRO service network
          </p>
          <h1>
            One trusted starting point for appearance, protection and vehicle
            care.
          </h1>
          <p>
            Start with the outcome or issue. Each page explains what is
            available, what must be inspected and how to request the right scope
            without guessing online.
          </p>
          <Link className="button button-primary" href={quoteHref()}>
            Start a service request <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="section service-network-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Appearance & protection"
            title="Four core systems for the surfaces you see and use every day."
          />
          <div className="service-network-grid core-service-grid">
            {services.map((service, index) => {
              const Icon = coreIcons[index];
              return (
                <Link href={service.href} key={service.id}>
                  <span>{service.step}</span>
                  <Icon aria-hidden="true" />
                  <h2>{service.name}</h2>
                  <p>{service.description}</p>
                  <strong>
                    Explore service <ArrowRight aria-hidden="true" />
                  </strong>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section service-network-section service-network-secondary">
        <div className="shell">
          <SectionIntro
            eyebrow="More ways we can help"
            title="Maintenance, mobility, glass, keys, property film and aircraft care—clearly separated."
            copy="These services use consultation-led pathways because parts, location, compatibility and condition change the final work."
          />
          <div className="service-network-grid">
            {visibleAdditional.map((service, index) => {
              const Icon = additionalIcons[service.slug];
              return (
                <Link href={`/our-services/${service.slug}`} key={service.slug}>
                  <span>{String(index + 5).padStart(2, '0')}</span>
                  <Icon aria-hidden="true" />
                  <h2>{service.name}</h2>
                  <p>{service.description}</p>
                  <strong>
                    View service <ArrowRight aria-hidden="true" />
                  </strong>
                </Link>
              );
            })}
            <Link
              href="https://proaviationcare.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                {String(visibleAdditional.length + 5).padStart(2, '0')}
              </span>
              <Plane aria-hidden="true" />
              <h2>Aircraft Detailing</h2>
              <p>
                Specialized cabin and exterior aircraft-care requests continue
                through the dedicated Pro Aviation Care experience.
              </p>
              <strong>
                Open aircraft care <ArrowRight aria-hidden="true" />
              </strong>
            </Link>
          </div>
        </div>
      </section>

      <QuoteBand
        eyebrow="Not sure where to start?"
        title="Describe the vehicle, property or problem."
        copy="The team will route your request to the right service and confirm the next practical step."
      />
    </main>
  );
}
