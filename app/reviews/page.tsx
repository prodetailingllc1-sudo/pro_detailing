import type { Metadata } from 'next';
import { ArrowRight, ArrowUpRight, Star } from 'lucide-react';
import Link from '@/components/site/SafeLink';

import { QuoteBand } from '@/components/site/QuoteBand';
import { googleReviewSnapshot } from '@/lib/expanded-content';

export const metadata: Metadata = {
  title: { absolute: 'PRO Detailing Reviews | Manassas, VA' },
  description:
    'Read current Google review highlights for PRO Detailing window tint, ceramic coating, detailing and maintenance work in Manassas, Virginia.',
  alternates: { canonical: '/reviews' },
};

export default function ReviewsPage() {
  return (
    <main id="main-content" className="reviews-page">
      <section className="reviews-hero">
        <div className="shell reviews-hero-layout">
          <div>
            <p className="eyebrow">
              <span /> Verified Google snapshot
            </p>
            <h1>The work speaks. Customers confirm it.</h1>
            <p>
              Every highlight below is paraphrased and linked to its direct
              Google source, so prospects can verify the context themselves.
            </p>
          </div>
          <a
            className="reviews-score"
            href={googleReviewSnapshot.profileUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>Google rating</span>
            <strong>{googleReviewSnapshot.rating}</strong>
            <div aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star aria-hidden="true" key={index} />
              ))}
            </div>
            <small>
              {googleReviewSnapshot.count} reviews · verified{' '}
              {googleReviewSnapshot.verified}
            </small>
          </a>
        </div>
      </section>

      <section className="section reviews-grid-section">
        <div className="shell reviews-full-grid">
          {googleReviewSnapshot.reviews.map((review) => (
            <article key={review.name}>
              <div className="review-stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star aria-hidden="true" key={index} />
                ))}
              </div>
              <blockquote>{review.summary}</blockquote>
              <div>
                <strong>{review.name}</strong>
                <span>{review.service}</span>
                <small>{review.age}</small>
              </div>
              <a href={review.href} target="_blank" rel="noreferrer">
                Verify on Google <ArrowUpRight aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>
        <div className="shell reviews-followup">
          <p>Ready to build your own service plan?</p>
          <Link className="text-link" href="/our-services">
            Explore every service <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <QuoteBand
        eyebrow="Your vehicle is next"
        title="Start with the result you want."
        copy="Share the vehicle, condition and priority. The team will confirm the right service and quote."
      />
    </main>
  );
}
