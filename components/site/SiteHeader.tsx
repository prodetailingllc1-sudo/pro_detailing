'use client';

import { ChevronDown, Menu, Phone, X } from 'lucide-react';
import Image from 'next/image';
import Link from '@/components/site/SafeLink';
import { useEffect, useRef, useState } from 'react';

import { business, quoteHref } from '@/lib/site-data';
import { siteFeatures } from '@/lib/site-config';

const links = [
  { href: '/our-services/window-tinting', label: 'Tint' },
  { href: '/our-services/ceramic-coating', label: 'Ceramic' },
  { href: '/our-services/paint-protection-film', label: 'PPF' },
  { href: '/our-services/auto-detailing', label: 'Detailing' },
  { href: '/blog', label: 'Guides' },
  { href: '/reviews', label: 'Reviews' },
];

const appearanceServiceLinks = [
  { href: '/our-services/window-tinting', label: 'LLumar automotive tint' },
  { href: '/our-services/ceramic-coating', label: 'Ceramic Pro coating' },
  {
    href: '/our-services/paint-protection-film',
    label: 'Paint protection film',
  },
  { href: '/our-services/auto-detailing', label: 'Auto detailing' },
];

const vehicleCareLinks = [
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
];

const onLocationLinks = [
  ...(siteFeatures.mobileDetailing
    ? [{ href: '/our-services/mobile-detailing', label: 'Mobile detailing' }]
    : []),
  {
    href: '/our-services/residential-window-tinting',
    label: 'Residential window tint',
  },
];

const mobileServiceLinks = [
  ...appearanceServiceLinks,
  ...vehicleCareLinks,
  ...onLocationLinks,
];

const desktopServiceGroups = [
  { label: 'Appearance & protection', links: appearanceServiceLinks },
  { label: 'Vehicle care', links: vehicleCareLinks },
  { label: 'At your location', links: onLocationLinks },
];

const servicePathCount = mobileServiceLinks.length + 1;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const servicesButtonRef = useRef<HTMLButtonElement>(null);
  const servicesMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = () => {
      setOpen(false);
      setServicesOpen(false);
    };
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  useEffect(() => {
    if (!open && !servicesOpen) return;
    const closeWithKeyboard = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (servicesOpen) {
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      } else {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeWithKeyboard);
    return () => window.removeEventListener('keydown', closeWithKeyboard);
  }, [open, servicesOpen]);

  useEffect(() => {
    if (!servicesOpen) return;

    const closeOutside = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!servicesMenuRef.current?.contains(target)) setServicesOpen(false);
    };

    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [servicesOpen]);

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
        <div
          ref={servicesMenuRef}
          className="desktop-services-menu"
          onBlur={(event) => {
            if (
              !(event.relatedTarget instanceof Node) ||
              !event.currentTarget.contains(event.relatedTarget)
            ) {
              setServicesOpen(false);
            }
          }}
        >
          <button
            ref={servicesButtonRef}
            className="desktop-services-trigger"
            type="button"
            aria-expanded={servicesOpen}
            aria-controls="desktop-services-dropdown"
            onClick={() => setServicesOpen((value) => !value)}
          >
            All Services
            <ChevronDown aria-hidden="true" size={15} />
          </button>
          {servicesOpen ? (
            <div
              className="desktop-services-dropdown"
              id="desktop-services-dropdown"
            >
              <div className="desktop-services-dropdown-head">
                <div>
                  <span>PRO SERVICE NETWORK / {servicePathCount} PATHS</span>
                  <strong>Find the exact service you need.</strong>
                </div>
                <Link
                  href="/our-services"
                  onClick={() => setServicesOpen(false)}
                >
                  View all services <span aria-hidden="true">↗</span>
                </Link>
              </div>
              <div className="desktop-services-groups">
                {desktopServiceGroups.map((group) => (
                  <div className="desktop-services-group" key={group.label}>
                    <p>{group.label}</p>
                    {group.links.map((link) => (
                      <Link
                        href={link.href}
                        key={link.href}
                        onClick={() => setServicesOpen(false)}
                      >
                        {link.label}
                        <span aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="desktop-services-specialty">
                <span>Specialty care</span>
                <a
                  href="https://proaviationcare.com/"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setServicesOpen(false)}
                >
                  Aircraft detailing <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          ) : null}
        </div>
        {links.map((link) => (
          <Link href={link.href} key={link.href}>
            {link.label}
          </Link>
        ))}
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
          <details className="mobile-services-disclosure">
            <summary>
              <span>All services</span>
              <ChevronDown aria-hidden="true" size={18} />
            </summary>
            <div className="mobile-services-list">
              <Link
                className="mobile-services-index"
                href="/our-services"
                onClick={() => setOpen(false)}
              >
                View the complete service directory
                <span aria-hidden="true">↗</span>
              </Link>
              {mobileServiceLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
              <a
                href="https://proaviationcare.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
              >
                Pro Aviation Care
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </details>
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
