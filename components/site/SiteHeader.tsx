'use client';

import { Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/site/SafeLink';
import { useEffect, useRef, useState } from 'react';

import { business, quoteHref } from '@/lib/site-data';
import { siteFeatures } from '@/lib/site-config';

const links = [
  { href: '/our-services', label: 'All Services' },
  { href: '/our-services#vehicle-care', label: 'Vehicle Care' },
  { href: '/our-services/window-tinting', label: 'Tint' },
  { href: '/our-services/ceramic-coating', label: 'Ceramic' },
  { href: '/our-services/paint-protection-film', label: 'PPF' },
  { href: '/our-services/auto-detailing', label: 'Detailing' },
  { href: '/blog', label: 'Guides' },
  { href: '/reviews', label: 'Reviews' },
];

const mobileServiceLinks = [
  { href: '/our-services/window-tinting', label: 'LLumar automotive tint' },
  { href: '/our-services/ceramic-coating', label: 'Ceramic Pro coating' },
  {
    href: '/our-services/paint-protection-film',
    label: 'Paint protection film',
  },
  { href: '/our-services/auto-detailing', label: 'Auto detailing' },
  {
    href: '/our-services/maintenance-oil-change',
    label: 'Maintenance & oil change',
  },
  {
    href: '/our-services/tire-service',
    label: 'Tire change, rotation & flat repair',
  },
  {
    href: '/our-services/auto-glass',
    label: 'Auto glass repair & replacement',
  },
  {
    href: '/our-services/key-replacement',
    label: 'Automotive locksmith & car keys',
  },
  ...(siteFeatures.mobileDetailing
    ? [{ href: '/our-services/mobile-detailing', label: 'Mobile detailing' }]
    : []),
  {
    href: '/our-services/residential-window-tinting',
    label: 'Residential window tint',
  },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeWithKeyboard = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      menuButtonRef.current?.focus();
    };
    window.addEventListener('keydown', closeWithKeyboard);
    return () => window.removeEventListener('keydown', closeWithKeyboard);
  }, [open]);

  return (
    <header className="site-header">
      <Link className="header-brand" href="/" aria-label="PRO Detailing home">
        <Image
          className="brand-mark"
          src="/assets/pro-detailing-wordmark-optimized.webp"
          alt="PRO Detailing — Automotive Appearance and Protection"
          width="900"
          height="126"
          priority
        />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
        <a href="https://proaviationcare.com/" target="_blank" rel="noreferrer">
          Aircraft
        </a>
      </nav>
      <a className="header-call" href={`tel:${business.phoneHref}`}>
        <Phone aria-hidden="true" size={16} /> {business.phone}
      </a>
      <button
        ref={menuButtonRef}
        className="menu-toggle"
        type="button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      {open ? (
        <nav
          className="mobile-nav is-open"
          id="mobile-navigation"
          aria-label="Mobile navigation"
        >
          <Link href="/our-services" onClick={() => setOpen(false)}>
            All services
          </Link>
          {mobileServiceLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/tint-simulator" onClick={() => setOpen(false)}>
            PRO Tints Studio
          </Link>
          <Link href="/gallery" onClick={() => setOpen(false)}>
            Our work
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)}>
            Guides
          </Link>
          <Link href="/reviews" onClick={() => setOpen(false)}>
            Reviews
          </Link>
          <a
            href="https://proaviationcare.com/"
            target="_blank"
            rel="noreferrer"
          >
            Aircraft Care ↗
          </a>
          <Link
            className="button button-primary"
            href={quoteHref()}
            onClick={() => setOpen(false)}
          >
            Request an appointment
          </Link>
        </nav>
      ) : null}
    </header>
  );
}

export function MobileActions() {
  return (
    <div className="mobile-actions" aria-label="Quick actions">
      <a href={`tel:${business.phoneHref}`}>
        <Phone aria-hidden="true" size={17} /> Call
      </a>
      <Link className="is-primary" href={quoteHref()}>
        Request quote <span aria-hidden="true">↗</span>
      </Link>
    </div>
  );
}
