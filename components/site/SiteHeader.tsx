'use client';

import { Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { business } from '@/lib/site-data';

const links = [
  { href: '/our-services/window-tinting', label: 'LLumar Tint' },
  { href: '/our-services/ceramic-coating', label: 'Ceramic Coating' },
  { href: '/our-services/paint-protection-film', label: 'PPF' },
  { href: '/our-services/auto-detailing', label: 'Detailing' },
  { href: '/tint-simulator', label: 'Tint Studio' },
  { href: '/gallery', label: 'Our Work' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  return (
    <header className="site-header">
      <Link className="header-brand" href="/" aria-label="PRO Detailing home">
        <Image
          className="brand-mark"
          src="/assets/pro-detailing-wordmark.png"
          alt="PRO Detailing — Automotive Appearance and Protection"
          width="2135"
          height="736"
        />
      </Link>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
        <a href="https://proaviationcare.com/" target="_blank" rel="noreferrer">
          Aircraft Care <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <a className="header-call" href={`tel:${business.phoneHref}`}>
        <Phone aria-hidden="true" size={16} /> {business.phone}
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
      <nav
        className={`mobile-nav ${open ? 'is-open' : ''}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
      >
        {links.map((link) => (
          <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
            {link.label}
          </Link>
        ))}
        <a href="https://proaviationcare.com/" target="_blank" rel="noreferrer">
          Aircraft Care ↗
        </a>
        <a className="button button-primary" href={business.bookingUrl}>
          Request an appointment
        </a>
      </nav>
    </header>
  );
}

export function MobileActions() {
  return (
    <div className="mobile-actions" aria-label="Quick actions">
      <a href={`tel:${business.phoneHref}`}>
        <Phone aria-hidden="true" size={17} /> Call
      </a>
      <a className="is-primary" href={business.bookingUrl}>
        Request quote <span aria-hidden="true">↗</span>
      </a>
    </div>
  );
}
