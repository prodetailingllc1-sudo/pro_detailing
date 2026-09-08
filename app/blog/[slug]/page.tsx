import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { notFound } from 'next/navigation';
import Link from '@/components/site/SafeLink';

import { QuoteBand } from '@/components/site/QuoteBand';
import { featuredArticles } from '@/lib/blog-data';
import { SITE_ORIGIN } from '@/lib/site-data';

export function generateStaticParams() {
  return featuredArticles.map((article) => ({ slug: article.slug }));
}

function conciseArticleTitle(title: string) {
  const colonLead = title.split(':')[0];
  if (colonLead !== title) return colonLead;
  const questionMark = title.indexOf('?');
  if (questionMark > 0) return title.slice(0, questionMark + 1);
  return title.length <= 64
    ? title
    : `${title.slice(0, 61).replace(/\s+\S*$/, '')}…`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = featuredArticles.find((item) => item.slug === slug);
  if (!article) return {};
  return {
    title: { absolute: conciseArticleTitle(article.title) },
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.description,
      url: `/blog/${article.slug}`,
      images: [
        {
          url: '/opengraph-image.jpg',
          width: 1200,
          height: 630,
          alt: 'PRO Detailing automotive appearance and protection studio',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: conciseArticleTitle(article.title),
      description: article.description,
      images: ['/twitter-image.jpg'],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = featuredArticles.find((item) => item.slug === slug);
  if (!article) notFound();

  const articleUrl = `${SITE_ORIGIN}/blog/${article.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: '2026-09-08',
    dateModified: '2026-09-08',
    author: { '@type': 'Organization', name: 'PRO Detailing LLC' },
    publisher: { '@id': `${SITE_ORIGIN}/#business` },
    image: `${SITE_ORIGIN}/opengraph-image.jpg`,
    mainEntityOfPage: articleUrl,
    url: articleUrl,
  };

  return (
    <main id="main-content" className="article-page">
      <article>
        <header className="article-hero">
          <div className="shell article-hero-inner">
            <Link className="back-link" href="/blog">
              <ArrowLeft aria-hidden="true" /> All guides
            </Link>
            <p className="overline">{article.category} · PRO field guide</p>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <div className="article-meta">
              <span>Reviewed September 8, 2026</span>
              <span>Original editorial summary</span>
            </div>
          </div>
        </header>

        <div className="shell article-layout">
          <div className="article-body">
            <p className="article-lead">{article.lead}</p>
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2>{section.heading}</h2>
                <p>{section.body}</p>
              </section>
            ))}
            <aside className="article-source-note">
              <p>
                This local edition is an original concise summary, not a copy of
                the source article. Product, vehicle and legal details should be
                confirmed for the current job.
              </p>
              <a href={article.sourceUrl} target="_blank" rel="noreferrer">
                Read the original PRO Detailing article{' '}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </aside>
          </div>

          <aside className="article-rail">
            <p className="overline">What to remember</p>
            <ul>
              {article.takeaways.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            {article.relatedHref.startsWith('http') ? (
              <a
                className="button button-primary"
                href={article.relatedHref}
                target="_blank"
                rel="noreferrer"
              >
                {article.relatedLabel} <ArrowUpRight aria-hidden="true" />
              </a>
            ) : (
              <Link
                className="button button-primary"
                href={article.relatedHref}
              >
                {article.relatedLabel} <ArrowRight aria-hidden="true" />
              </Link>
            )}
          </aside>
        </div>
      </article>

      <QuoteBand
        eyebrow="Vehicle-specific guidance"
        title="Turn the research into a confirmed plan."
        copy="Tell us what you drive, what you want to improve and what concerns you see."
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </main>
  );
}
