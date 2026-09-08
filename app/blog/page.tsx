import { ArrowRight, ArrowUpRight, BookOpen, Library } from 'lucide-react';
import Link from '@/components/site/SafeLink';

import { QuoteBand } from '@/components/site/QuoteBand';
import { SectionIntro } from '@/components/site/SectionIntro';
import {
  allSourceArticles,
  featuredArticles,
  legacyBlogLinks,
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
              Nine priority guides are rebuilt here for faster reading, while
              the complete {allSourceArticles.length}-article PRO Detailing
              archive remains one click away.
            </p>
          </div>
          <div
            className="blog-index-counter"
            aria-label={`${allSourceArticles.length} published source articles`}
          >
            <Library aria-hidden="true" />
            <strong>{allSourceArticles.length}</strong>
            <span>published source articles</span>
          </div>
        </div>
      </section>

      <section className="section featured-blog-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Priority guides"
            title="Start with the questions customers are asking now."
            copy="These concise local editions preserve the useful decision points and link back to each original PRO Detailing article."
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
            title={`${legacyBlogLinks.length} more published PRO articles—accounted for.`}
            copy="These articles remain on pro-detailing.co and open in a new tab. This prevents useful existing content from disappearing while the priority library moves into the new experience."
          />
          <ol className="archive-link-grid">
            {legacyBlogLinks.map(([title, href], index) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noreferrer">
                  <span>{String(index + 10).padStart(2, '0')}</span>
                  <strong>{title}</strong>
                  <ArrowUpRight aria-hidden="true" />
                </a>
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
