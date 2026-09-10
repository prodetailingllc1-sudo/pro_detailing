import { notFound, permanentRedirect } from 'next/navigation';

import { allBlogArticles } from '@/lib/blog-data';

export function generateStaticParams() {
  return allBlogArticles.map((article) => ({ slug: article.slug }));
}

export default async function LegacyArticleRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!allBlogArticles.some((article) => article.slug === slug)) {
    notFound();
  }

  permanentRedirect('/blog/' + slug);
}
