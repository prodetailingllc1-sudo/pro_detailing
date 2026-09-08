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
    ? 'Explore tint, Ceramic Pro, PPF, detailing, maintenance, tire change and repair, auto glass, locksmith, mobile detailing and home tint in Northern Virginia.'
    : 'Explore tint, Ceramic Pro, PPF, detailing, maintenance, tire change and repair, auto glass, automotive locksmith and home tint in Northern Virginia.',
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

const vehicleCareOrder = [
  'maintenance-oil-change',
  'tire-service',
  'auto-glass',
  'key-replacement',
] as const;

export default function ServicesPage() {
  const availableAdditional = additionalServices.filter(
    (service) =>
      service.slug !== 'mobile-detailing' || siteFeatures.mobileDetailing,
  );
  const vehicleCareServices = vehicleCareOrder.flatMap((slug) => {
    const service = availableAdditional.find((item) => item.slug === slug);
    return service ? [service] : [];
  });
  const specialtyServices = availableAdditional.filter(
    (service) =>
      !vehicleCareOrder.includes(
        service.slug as (typeof vehicleCareOrder)[number],
      ),
  );
  const visibleAdditional = [...vehicleCareServices, ...specialtyServices];

  const directoryItems = [
    ...vehicleCareServices.map((service) => ({
      href: `/our-services/${service.slug}`,
      name: service.name,
      group: 'Vehicle care',
    })),
    ...services.map((service) => ({
      href: service.href,
      name: service.name,
      group: 'Appearance & protection',
    })),
    ...specialtyServices.map((service) => ({
      href: `/our-services/${service.slug}`,
      name: service.name,
      group:
        service.slug === 'residential-window-tinting' ? 'Property' : 'Mobile',
    })),
    {
      href: 'https://proaviationcare.com/',
      name: 'Aircraft Detailing',
      group: 'Aircraft care',
    },
  ];

  return (
    <main id="main-content" className="services-index-page">
      <section className="services-index-hero">
        <div className="shell services-index-hero-layout">
          <div className="services-index-hero-copy">
            <p className="eyebrow">
              <span /> Complete PRO service network
            </p>
            <h1>Every service. One PRO standard.</h1>
            <p>
              Find appearance, protection, maintenance, tire, glass, locksmith,
              mobile and property services without hunting through the site.
            </p>
            <Link className="button button-primary" href={quoteHref()}>
              Start a service request <ArrowRight aria-hidden="true" />
            </Link>
          </div>

          <nav
            className="services-quick-directory"
            aria-labelledby="complete-service-directory"
          >
            <div className="services-quick-directory-head">
              <div>
                <span>ALL SERVICES / LIVE DIRECTORY</span>
                <h2 id="complete-service-directory">
                  Choose exactly what you need.
                </h2>
              </div>
              <small>
                {String(directoryItems.length).padStart(2, '0')} paths
              </small>
            </div>
            <div className="services-quick-directory-grid">
              {directoryItems.map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  <span aria-hidden="true" />
                  <div>
                    <small>{item.group}</small>
                    <strong>{item.name}</strong>
                  </div>
                  <ArrowRight aria-hidden="true" />
                </Link>
              ))}
            </div>
          </nav>
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

      <section
        className="section service-network-section service-network-secondary"
        id="vehicle-care"
      >
        <div className="shell">
          <SectionIntro
            eyebrow="Vehicle care & specialized support"
            title="Maintenance, tire, glass and locksmith services—easy to find and request."
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
