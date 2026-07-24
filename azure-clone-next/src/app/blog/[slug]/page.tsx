import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogSlugs, getBlogPost } from '@/lib/content';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';

// ISR — blog posts revalidate hourly (per BLUEPRINT.md §1.3)
export const revalidate = 3600;

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description ?? undefined,
    alternates: { canonical: `/blog/${slug}/` },
    openGraph: { title: post.title, description: post.description ?? undefined, type: 'article', images: post.heroImage ? [post.heroImage] : [] },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `https://azure.folio3.com/blog/${slug}/`;
  const absImg = post.heroImage ? (post.heroImage.startsWith('http') ? post.heroImage : `https://azure.folio3.com${post.heroImage}`) : undefined;
  const fmtDate = (d?: string) =>
    d ? new Date(`${d}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : '';
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description ?? undefined,
    image: absImg,
    datePublished: post.datePublished ?? undefined,
    dateModified: post.dateModified ?? post.datePublished ?? undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'Folio3 Azure', url: 'https://azure.folio3.com' },
    publisher: {
      '@type': 'Organization',
      name: 'Folio3 Azure',
      logo: { '@type': 'ImageObject', url: 'https://azure.folio3.com/wp-content/uploads/2022/06/folio3_by_azure.svg' },
    },
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://azure.folio3.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://azure.folio3.com/blog/' },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };
  const faqLd = post.faq.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faq.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
      <article className="container-x max-w-3xl py-16">
        <h1 className="text-3xl font-bold leading-tight lg:text-4xl">{post.title}</h1>
        {(post.datePublished || post.dateModified) && (
          <p className="mt-3 text-sm text-body/70">
            {post.datePublished && <span>Published {fmtDate(post.datePublished)}</span>}
            {post.dateModified && post.dateModified !== post.datePublished && (
              <span>{post.datePublished ? ' · ' : ''}Updated {fmtDate(post.dateModified)}</span>
            )}
          </p>
        )}
        {post.description && <p className="mt-4 text-lg text-body">{post.description}</p>}
        {post.heroImage && (
          <Image src={post.heroImage} alt={post.title} width={768} height={432} className="mt-8 h-auto w-full rounded-xl" priority />
        )}

        {/* real article body (ordered HTML when extracted; flattened paragraphs otherwise) */}
        {post.bodyHtml ? (
          <div className="post-body mt-10" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
        ) : (
          <div className="mt-10 space-y-5">
            {post.body.map((p, i) => <p key={i} className="text-base leading-relaxed text-body">{p}</p>)}
          </div>
        )}
      </article>

      {/* FAQ */}
      {post.faq.length > 0 && (
        <section className="section">
          <div className="container-x max-w-3xl">
            <h2 className="mb-8 text-2xl lg:text-3xl">Frequently Asked Questions</h2>
            <div className="divide-y divide-surface-line border-y border-surface-line">
              {post.faq.map((f, i) => (
                <details key={i} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                    {f.q}
                    <span className="text-brand transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 text-base leading-relaxed text-body">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Blogs */}
      {post.related.length > 0 && (
        <section className="section bg-surface-tint">
          <div className="container-x">
            <h2 className="mb-10 text-center text-2xl lg:text-3xl">Related Blogs</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {post.related.map((r) => (
                <Link key={r.href} href={r.href} className="flex flex-col overflow-hidden rounded-xl border border-surface-line bg-white shadow-card transition-shadow hover:shadow-cardHover">
                  {r.image && <Image src={r.image} alt={r.title} width={400} height={225} className="h-44 w-full object-cover" />}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg leading-snug hover:text-brand">{r.title}</h3>
                    <span className="mt-3 inline-block text-sm font-semibold text-brand">Read article →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <OneToOneCTA tone="light" />
    </>
  );
}
