import { ArrowRight, Phone } from 'lucide-react';

import { business, quoteHref } from '@/lib/site-data';

export function QuoteBand({
  eyebrow = 'Your vehicle. Your priorities.',
  title = 'Let’s configure the right protection system.',
  copy = 'Tell us about your vehicle and what matters most. We’ll confirm the product, coverage, preparation and timing before work begins.',
  service,
}: {
  eyebrow?: string;
  title?: string;
  copy?: string;
  service?: string;
}) {
  return (
    <section className="quote-band" id="quote">
      <div className="shell quote-band-inner">
        <div>
          <p className="eyebrow">
            <span /> {eyebrow}
          </p>
          <h2>{title}</h2>
          <p>{copy}</p>
        </div>
        <div className="quote-actions">
          <a className="button button-primary" href={quoteHref(service)}>
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
