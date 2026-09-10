import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from '@/components/site/SafeLink';

import { QuoteBand } from '@/components/site/QuoteBand';
import {
  allBlogArticles,
  findBlogArticle,
  type BlogArticle,
  type LegacyBlogArticle,
} from '@/lib/blog-data';
import { SITE_ORIGIN } from '@/lib/site-data';

export function generateStaticParams() {
  return allBlogArticles.map((article) => ({ slug: article.slug }));
}

function isLegacyArticle(
  article: BlogArticle | LegacyBlogArticle,
): article is LegacyBlogArticle {
  return 'blocks' in article;
}

function articleDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
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
  const article = findBlogArticle(slug);
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
  const article = findBlogArticle(slug);
  if (!article) notFound();

  const legacy = isLegacyArticle(article);
  const publishedAt = legacy ? article.datePublished : '2026-09-08';
  const modifiedAt = legacy ? article.dateModified : '2026-09-08';
  const articleImage = legacy ? article.image : '/opengraph-image.jpg';
  const articleUrl = `${SITE_ORIGIN}/blog/${article.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: { '@type': 'Organization', name: 'PRO Detailing LLC' },
    publisher: { '@id': `${SITE_ORIGIN}/#business` },
    image: `${SITE_ORIGIN}${articleImage}`,
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
            <p className="overline">
              {article.category} ·{' '}
              {legacy ? 'Migrated archive' : 'PRO field guide'}
            </p>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <div className="article-meta">
              <span>
                {legacy
                  ? `Originally published ${articleDate(publishedAt)}`
                  : 'Reviewed September 8, 2026'}
              </span>
              <span>
                {legacy ? 'Preserved locally' : 'Current editorial guide'}
              </span>
            </div>
          </div>
        </header>

        <div className="shell article-layout">
          <div className="article-body">
            {legacy ? (
              <>
                <aside className="article-archive-notice">
                  <strong>Migrated archive</strong>
                  <p>
                    This article was preserved from the former PRO Detailing
                    website and reflects its original publication date. Pricing,
                    product availability, warranties, service coverage and legal
                    requirements can change; confirm current details with the
                    studio before making a decision.
                  </p>
                </aside>
                <div className="legacy-article-content">
                  {article.blocks.map((block, index) => {
                    const key = `${block.type}-${index}`;
                    if (block.type === 'heading') {
                      return <h2 key={key}>{block.text}</h2>;
                    }
                    if (block.type === 'list') {
                      return (
                        <ul key={key}>
                          {block.items.map((item, itemIndex) => (
                            <li key={`${itemIndex}-${item.slice(0, 32)}`}>
                              {item}
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    return <p key={key}>{block.text}</p>;
                  })}
                </div>
              </>
            ) : (
              <>
                <p className="article-lead">{article.lead}</p>
                {article.sections.map((section) => (
                  <section key={section.heading}>
                    <h2>{section.heading}</h2>
                    <p>{section.body}</p>
                  </section>
                ))}
                <aside className="article-source-note">
                  <p>
                    This guide has been rebuilt inside the new PRO Detailing
                    application. Product, vehicle and legal details are still
                    confirmed for the current job.
                  </p>
                </aside>
              </>
            )}
          </div>

          <aside className="article-rail">
            {legacy ? (
              <Image
                className="article-rail-image"
                src={article.image}
                alt="PRO Detailing service reference"
                width="1200"
                height="800"
                sizes="(max-width: 1050px) 100vw, 360px"
              />
            ) : null}
            <p className="overline">What to remember</p>
            <ul>
              {(legacy
                ? [
                    'Confirm current products and availability',
                    'Use the actual vehicle or property condition',
                    'Verify current pricing, warranty and legal details',
                  ]
                : article.takeaways
              ).map((item) => (
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
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
