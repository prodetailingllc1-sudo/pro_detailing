import { ArrowRight, BookOpen, Library } from 'lucide-react';
import Link from '@/components/site/SafeLink';

import { QuoteBand } from '@/components/site/QuoteBand';
import { SectionIntro } from '@/components/site/SectionIntro';
import {
  allBlogArticles,
  featuredArticles,
  legacyArticles,
} from '@/lib/blog-data';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Car Care Guides & Detailing Blog | PRO Detailing',
  description:
    'Read PRO Detailing guides about auto detailing, window tint, ceramic coating, EV care, maintenance, auto glass and vehicle protection in Northern Virginia.',
  path: '/blog',
});

export default function BlogPage() {
  return (
    <main id="main-content" className="blog-page">
      <section className="blog-hero">
        <div className="shell blog-hero-layout">
          <div>
            <p className="eyebrow">
              <span /> PRO knowledge library
            </p>
            <h1>Clear vehicle-care guidance without the sales fog.</h1>
            <p>
              Nine priority guides are rebuilt for fast decisions, and every
              article from the former site now lives inside this application.
            </p>
          </div>
          <div
            className="blog-index-counter"
            aria-label={`${allBlogArticles.length} locally hosted articles`}
          >
            <Library aria-hidden="true" />
            <strong>{allBlogArticles.length}</strong>
            <span>guides hosted here</span>
          </div>
        </div>
      </section>

      <section className="section featured-blog-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Priority guides"
            title="Start with the questions customers are asking now."
            copy="These current local editions preserve the useful decision points and connect directly to the right service path."
          />
          <div className="featured-blog-grid">
            {featuredArticles.map((article, index) => (
              <article key={article.slug}>
                <div>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <small>{article.category}</small>
                </div>
                <BookOpen aria-hidden="true" />
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <Link className="text-link" href={`/blog/${article.slug}`}>
                  Read the guide <ArrowRight aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section complete-archive-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Complete source archive"
            title={`${legacyArticles.length} migrated PRO articles—preserved inside the new app.`}
            copy="The former WordPress archive has been converted to safe, locally hosted reading pages. Current products, prices, warranties and laws are reconfirmed before service."
          />
          <ol className="archive-link-grid">
            {legacyArticles.map((article, index) => (
              <li key={article.slug}>
                <Link href={`/blog/${article.slug}`}>
                  <span>{String(index + 10).padStart(2, '0')}</span>
                  <strong>{article.title}</strong>
                  <ArrowRight aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <QuoteBand
        eyebrow="Need an answer for your vehicle?"
        title="Use the guides—then let the actual condition decide."
        copy="Send the vehicle, service goal and photos. The studio will confirm products, fit, scope, timing and price."
      />
    </main>
  );
}
