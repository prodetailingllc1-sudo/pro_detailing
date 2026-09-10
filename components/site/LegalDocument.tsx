import { ArrowLeft, Mail, Phone } from 'lucide-react';

import Link from '@/components/site/SafeLink';
import { business } from '@/lib/site-data';

export type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

export function LegalDocument({
  eyebrow,
  title,
  introduction,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  updated: string;
  sections: readonly LegalSection[];
}) {
  return (
    <main id="main-content" className="article-page legal-page">
      <article>
        <header className="article-hero">
          <div className="shell article-hero-inner">
            <Link className="back-link" href="/">
              <ArrowLeft aria-hidden="true" /> Back to PRO Detailing
            </Link>
            <p className="overline">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{introduction}</p>
            <div className="article-meta">
              <span>Effective September 3, 2025</span>
              <span>Application update {updated}</span>
            </div>
          </div>
        </header>

        <div className="shell article-layout">
          <div className="article-body legal-document">
            {sections.map((section) => (
              <section key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets?.length ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="article-rail legal-contact-rail">
            <p className="overline">Questions or requests</p>
            <p>Contact PRO Detailing LLC about these terms or your data.</p>
            <a href={`mailto:${business.email}`}>
              <Mail aria-hidden="true" /> {business.email}
            </a>
            <a href={`tel:${business.phoneHref}`}>
              <Phone aria-hidden="true" /> {business.phone}
            </a>
            <address>{business.address}</address>
          </aside>
        </div>
      </article>
    </main>
  );
}
