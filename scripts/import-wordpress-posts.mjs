import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const API_ORIGIN = 'https://pro-detailing.co/wp-json/wp/v2';
const OUTPUT_PATH = resolve('lib/legacy-blog-content.json');
const FEATURED_SLUGS = new Set([
  'car-detailing-benefits-in-manassas-va',
  'summer-car-maintenance-checklist-for-virginia',
  'what-is-included-in-a-full-car-detail-in-va',
  'ceramic-coating-for-luxury-cars-near-virginia',
  'graphene-window-tint-in-2026',
  'private-jet-detailing-in-northern-virginia',
  'ev-interior-detailing-in-northern-virginia',
  'ceramic-coating-for-suvs-and-trucks-in-manassas',
  'is-it-safe-to-wash-an-electric-vehicle',
]);

const entityMap = {
  amp: '&',
  apos: "'",
  gt: '>',
  hellip: '…',
  laquo: '«',
  ldquo: '“',
  lsquo: '‘',
  lt: '<',
  mdash: '—',
  nbsp: ' ',
  ndash: '–',
  quot: '"',
  raquo: '»',
  rdquo: '”',
  rsquo: '’',
};

function decodeEntities(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 16)),
    )
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCodePoint(Number.parseInt(code, 10)),
    )
    .replace(/&([a-z]+);/gi, (entity, name) => entityMap[name] ?? entity);
}

function plainText(value) {
  return decodeEntities(
    value
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/\[[^\]]+\]/g, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .replace(/(?:https?:\/\/)?(?:www\.)?pro-detailing\.co(?:\/[^\s]*)?/gi, '')
    .trim();
}

function contentBlocks(html) {
  const tokens = html
    .replace(/<!--([\s\S]*?)-->/g, ' ')
    .replace(
      /<(script|style|noscript|iframe|form)\b[^>]*>[\s\S]*?<\/\1>/gi,
      ' ',
    )
    .replace(/<h[1-4]\b[^>]*>([\s\S]*?)<\/h[1-4]>/gi, '\n@@heading@@$1\n')
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, '\n@@item@@$1\n')
    .replace(/<br\s*\/?\s*>/gi, '\n')
    .replace(/<\/(p|div|section|article|blockquote|ul|ol)>/gi, '\n')
    .replace(/<(p|div|section|article|blockquote|ul|ol)\b[^>]*>/gi, '\n')
    .split(/\n+/)
    .map((token) => token.trim())
    .filter(Boolean);

  const blocks = [];
  let listItems = [];
  const flushList = () => {
    if (!listItems.length) return;
    blocks.push({ type: 'list', items: listItems });
    listItems = [];
  };

  for (const token of tokens) {
    if (token.startsWith('@@item@@')) {
      const item = plainText(token.slice('@@item@@'.length));
      if (item) listItems.push(item);
      continue;
    }

    flushList();
    if (token.startsWith('@@heading@@')) {
      const text = plainText(token.slice('@@heading@@'.length));
      if (text) blocks.push({ type: 'heading', text });
      continue;
    }

    const text = plainText(token);
    if (text.length >= 2) blocks.push({ type: 'paragraph', text });
  }

  flushList();
  return blocks.filter((block, index) => {
    if (block.type !== 'heading') return true;
    return index > 0 || !/^privacy policy|terms/i.test(block.text);
  });
}

function inferCategory(title, slug) {
  const haystack = `${title} ${slug}`.toLowerCase();
  if (/aircraft|aviation|jet/.test(haystack)) return 'Aircraft care';
  if (/windshield|auto glass/.test(haystack)) return 'Auto glass';
  if (/key|locksmith|fob/.test(haystack)) return 'Car keys';
  if (/tint|window film|vlt/.test(haystack)) return 'Window tint';
  if (/paint protection|\bppf\b/.test(haystack)) return 'Paint protection film';
  if (/ceramic|coating/.test(haystack)) return 'Ceramic coating';
  if (/maintenance|oil|tire|battery|brake/.test(haystack)) return 'Maintenance';
  if (/electric vehicle|\bev\b/.test(haystack)) return 'EV care';
  return 'Detailing';
}

function relatedPath(category) {
  if (category === 'Aircraft care') return 'https://proaviationcare.com/';
  if (category === 'Auto glass') return '/our-services/auto-glass';
  if (category === 'Car keys') return '/our-services/key-replacement';
  if (category === 'Window tint') return '/our-services/window-tinting';
  if (category === 'Paint protection film') {
    return '/our-services/paint-protection-film';
  }
  if (category === 'Ceramic coating') return '/our-services/ceramic-coating';
  if (category === 'Maintenance') return '/our-services/maintenance-oil-change';
  return '/our-services/auto-detailing';
}

function relatedLabel(category) {
  if (category === 'Aircraft care') return 'Explore Pro Aviation Care';
  if (category === 'Auto glass') return 'Explore auto-glass service';
  if (category === 'Car keys') return 'Explore car-key service';
  if (category === 'Window tint') return 'Explore LLumar tint';
  if (category === 'Paint protection film')
    return 'Explore paint protection film';
  if (category === 'Ceramic coating') return 'Explore Ceramic Pro coating';
  if (category === 'Maintenance') return 'Explore vehicle maintenance';
  return 'Explore auto detailing';
}

function categoryImage(category) {
  if (category === 'Aircraft care')
    return '/gallery/pro-service-private-jet-cleaning.webp';
  if (category === 'Auto glass') return '/generated/service-auto-glass.webp';
  if (category === 'Car keys') return '/generated/service-key-replacement.webp';
  if (category === 'Window tint')
    return '/gallery/local-tint-grey-bmw-workshop.webp';
  if (category === 'Paint protection film')
    return '/generated/ppf-finished-clear-v2.webp';
  if (category === 'Ceramic coating')
    return '/generated/ceramic-application-v2.webp';
  if (category === 'Maintenance')
    return '/generated/service-maintenance-oil-change.webp';
  return '/generated/interior-detailing.webp';
}

async function getPosts() {
  const response = await fetch(
    `${API_ORIGIN}/posts?per_page=100&page=1&_fields=id,date,modified,slug,link,title,excerpt,content`,
    { headers: { 'User-Agent': 'PRO-Detailing-site-migration/1.0' } },
  );
  if (!response.ok) {
    throw new Error(`WordPress returned ${response.status}`);
  }
  return response.json();
}

const posts = await getPosts();
if (posts.length !== 67) {
  throw new Error(`Expected 67 WordPress posts; received ${posts.length}`);
}

const migrated = posts
  .filter((post) => !FEATURED_SLUGS.has(post.slug))
  .map((post) => {
    const title = plainText(post.title.rendered);
    const category = inferCategory(title, post.slug);
    const blocks = contentBlocks(post.content.rendered);
    return {
      id: post.id,
      slug: post.slug,
      title,
      category,
      description: (
        plainText(post.excerpt.rendered) ||
        blocks.find((block) => block.type === 'paragraph')?.text ||
        `A migrated PRO Detailing guide about ${title.toLowerCase()}.`
      ).slice(0, 220),
      datePublished: post.date,
      dateModified: post.modified,
      sourceUrl: post.link,
      relatedHref: relatedPath(category),
      relatedLabel: relatedLabel(category),
      image: categoryImage(category),
      blocks,
    };
  })
  .sort((left, right) => right.datePublished.localeCompare(left.datePublished));

if (
  migrated.length !== 58 ||
  new Set(migrated.map((post) => post.slug)).size !== 58
) {
  throw new Error(
    'Expected 58 unique archive posts after excluding the 9 featured guides',
  );
}

await writeFile(OUTPUT_PATH, `${JSON.stringify(migrated, null, 2)}\n`, 'utf8');
console.log(`Imported ${migrated.length} posts into ${OUTPUT_PATH}`);
