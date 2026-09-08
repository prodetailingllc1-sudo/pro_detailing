'use client';

import { ArrowRight, ChevronDown, MapPin, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

import { quoteHref } from '@/lib/site-data';

export function HeroExperience() {
  const heroRef = useRef<HTMLElement>(null);

  function moveScene(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType === 'touch') return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const hero = heroRef.current;

    hero?.style.setProperty('--scene-x', `${x * 18}px`);
    hero?.style.setProperty('--scene-y', `${y * 14}px`);
    hero?.style.setProperty('--scene-rx', `${y * -5}deg`);
    hero?.style.setProperty('--scene-ry', `${x * 7}deg`);
    hero?.style.setProperty('--glow-x', `${(x + 0.5) * 100}%`);
    hero?.style.setProperty('--glow-y', `${(y + 0.5) * 100}%`);
  }

  function resetScene() {
    const hero = heroRef.current;
    hero?.style.setProperty('--scene-x', '0px');
    hero?.style.setProperty('--scene-y', '0px');
    hero?.style.setProperty('--scene-rx', '0deg');
    hero?.style.setProperty('--scene-ry', '0deg');
    hero?.style.setProperty('--glow-x', '72%');
    hero?.style.setProperty('--glow-y', '38%');
  }

  return (
    <section
      className="hero-shell hero-v2"
      id="top"
      ref={heroRef}
      onPointerMove={moveScene}
      onPointerLeave={resetScene}
    >
      <div className="hero-media" aria-hidden="true">
        <Image
          src="/assets/hero-studio.webp"
          alt=""
          width="1800"
          height="1200"
          priority
          sizes="100vw"
        />
        <div className="hero-wash" />
        <div className="hero-grid" />
        <div className="hero-cursor-light" />
      </div>

      <div className="hero-v2-layout shell">
        <div className="hero-content hero-v2-copy">
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
            <span /> Manassas, Virginia · Studio 38.793° N
          </p>
          <h1>
            High-spec window tint, ceramic coating & auto detailing in
            Manassas, VA.
          </h1>
          <p className="hero-copy">
            One vehicle-protection studio for LLumar tint, Ceramic Pro coating,
            paint protection film and meticulous detailing—configured around
            the way your vehicle is driven, parked and maintained.
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

        <div className="hero-machine" aria-hidden="true">
          <div className="machine-orbit machine-orbit-one" />
          <div className="machine-orbit machine-orbit-two" />
          <div className="machine-console">
            <div className="machine-console-head">
              <span>PRO / VEHICLE SYSTEM</span>
              <span>LIVE 01</span>
            </div>
            <div className="machine-car-stage">
              <div className="machine-scan" />
              <Image
                src="/vehicles/sedan.webp"
                alt=""
                width="1536"
                height="1024"
                priority
                sizes="(max-width: 780px) 92vw, 52vw"
              />
              <div className="machine-floor" />
            </div>
            <div className="machine-readouts">
              <span>
                <small>GLASS</small>
                <strong>LLUMAR</strong>
              </span>
              <span>
                <small>PAINT</small>
                <strong>COAT · FILM</strong>
              </span>
              <span>
                <small>FINISH</small>
                <strong>DETAIL</strong>
              </span>
            </div>
          </div>
          <div className="machine-chip machine-chip-top">
            <span /> APPEARANCE
          </div>
          <div className="machine-chip machine-chip-bottom">
            PROTECTION / DMV
          </div>
        </div>
      </div>

      <div className="hero-proof hero-v2-proof" aria-label="PRO services">
        <div>
          <strong>PRO Tints</strong>
          <span>LLumar glass systems</span>
        </div>
        <div>
          <strong>PRO Ceramic</strong>
          <span>Ceramic Pro finish care</span>
        </div>
        <div>
          <strong>PRO PPF</strong>
          <span>Impact-zone film coverage</span>
        </div>
        <div>
          <strong>PRO Detailing</strong>
          <span>Interior · exterior · finish</span>
        </div>
      </div>

      <a className="scroll-cue" href="#brand-systems">
        <ChevronDown aria-hidden="true" /> Explore the PRO system
      </a>
    </section>
  );
}
