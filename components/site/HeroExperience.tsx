import { ArrowRight, MapPin, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

import Link from '@/components/site/SafeLink';

import { quoteHref } from '@/lib/site-data';

export function HeroExperience() {
  return (
    <section className="hero-shell hero-v3" id="top">
      <div className="hero-v3-light" aria-hidden="true" />
      <div className="hero-v3-layout shell">
        <div className="hero-content hero-v3-copy">
          <Image
            className="hero-primary-mark"
            src="/assets/pro-detailing-wordmark-optimized.webp"
            alt="PRO Detailing — Automotive Appearance and Protection"
            width="900"
            height="126"
            priority
            sizes="(max-width: 780px) 82vw, 520px"
          />
          <p className="eyebrow">
            <span /> Automotive appearance & protection · Manassas, VA
          </p>
          <h1>Window tint, ceramic coating & paint protection in Manassas.</h1>
          <p className="hero-copy">
            One vehicle-protection studio for LLumar tint, Ceramic Pro coating,
            paint protection film and meticulous detailing—configured around the
            way your vehicle is driven, parked and maintained.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/tint-simulator">
              Launch tint studio <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="button button-ghost" href={quoteHref()}>
              Start a vehicle quote
            </Link>
          </div>
          <div className="hero-trust-row" aria-label="Studio highlights">
            <span>
              <ShieldCheck aria-hidden="true" /> LLumar CTX · IRX · AIR
            </span>
            <span>
              <MapPin aria-hidden="true" /> 7501 Gary Rd · Manassas
            </span>
          </div>
        </div>

        <div className="hero-showroom">
          <div className="hero-showroom-rule" aria-hidden="true" />
          <div className="hero-vehicle-frame">
            <Image
              src="/vehicles/coupe.webp"
              alt="White performance coupe presented against a dark studio background"
              width="1536"
              height="1024"
              priority
              sizes="(max-width: 920px) 94vw, 56vw"
            />
          </div>
          <div className="hero-vehicle-note">
            <span>PRO / MANASSAS</span>
            <div>
              <strong>Built around your vehicle.</strong>
              <p>Product, preparation and coverage confirmed before work.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
