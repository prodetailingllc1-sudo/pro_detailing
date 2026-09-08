import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { business, serviceAreas } from '@/lib/site-data';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid shell">
        <div className="footer-brand">
          <Image
            src="/assets/pro-detailing-wordmark.png"
            alt="PRO Detailing"
            width="2135"
            height="736"
          />
          <p>
            Premium vehicle appearance and protection, configured and installed
            in Manassas, Virginia.
          </p>
          <div className="footer-socials">
            <a
              href={business.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="PRO Detailing on Instagram"
            >
              IG
            </a>
            <a
              href={business.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="PRO Detailing on Facebook"
            >
              f
            </a>
          </div>
        </div>
        <div>
          <p className="footer-label">Protection</p>
          <Link href="/our-services/window-tinting">LLumar window tint</Link>
          <Link href="/our-services/ceramic-coating">Ceramic Pro coating</Link>
          <Link href="/our-services/paint-protection-film">
            Paint protection film
          </Link>
          <Link href="/our-services/auto-detailing">Auto detailing</Link>
          <Link href="/tint-simulator">PRO Tints Studio</Link>
          <Link href="/gallery">Real work gallery</Link>
        </div>
        <div>
          <p className="footer-label">Studio</p>
          <a href={`tel:${business.phoneHref}`}>
            <Phone aria-hidden="true" /> {business.phone}
          </a>
          <a href={`mailto:${business.email}`}>
            <Mail aria-hidden="true" /> {business.email}
          </a>
          <a href={business.mapsUrl} target="_blank" rel="noreferrer">
            <MapPin aria-hidden="true" /> {business.address}
          </a>
          <small>
            Appointments available Monday–Saturday. Call to confirm
            availability.
          </small>
        </div>
        <div>
          <p className="footer-label">Service area</p>
          <p>
            {serviceAreas.slice(0, 6).join(' · ')} and surrounding Northern
            Virginia communities.
          </p>
          <a
            className="aircraft-link"
            href="https://proaviationcare.com/"
            target="_blank"
            rel="noreferrer"
          >
            Pro Aviation Care — Aircraft Services{' '}
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="footer-bottom shell">
        <p>
          © {new Date().getFullYear()} PRO Detailing LLC. All rights reserved.
        </p>
        <p>
          PRO Tints and PRO Ceramic are service identities of PRO Detailing LLC.
        </p>
      </div>
    </footer>
  );
}
