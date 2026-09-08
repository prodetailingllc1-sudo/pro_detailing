import { ArrowRight, Phone } from 'lucide-react';

import { business } from '@/lib/site-data';

export function QuoteBand({
  eyebrow = 'Your vehicle. Your priorities.',
  title = 'Let’s configure the right protection system.',
  copy = 'Tell us about your vehicle and what matters most. We’ll confirm the product, coverage, preparation and timing before work begins.',
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
}) {
  return (
    <section className="quote-band" id="quote">
      <div className="quote-orbit" aria-hidden="true" />
      <div className="shell quote-band-inner">
        <div>
          <p className="eyebrow">
            <span /> {eyebrow}
          </p>
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
        <div className="quote-actions">
          <a className="button button-primary" href={business.bookingUrl}>
            Request an appointment <ArrowRight aria-hidden="true" />
          </a>
          <a className="button button-ghost" href={`tel:${business.phoneHref}`}>
            <Phone aria-hidden="true" /> {business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
