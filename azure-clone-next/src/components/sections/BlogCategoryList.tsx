'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export type BlogCard = { slug: string; title: string; description?: string; image?: string };
export type BlogCat = { label: string; slug: string; posts: string[] };

/** Blog index "Categories" filter — matches the live: a left CATEGORIES sidebar of tabs + a grid of
 *  post cards on the right that filters to the selected category. "All" shows every post. */
export function BlogCategoryList({ posts, categories }: { posts: BlogCard[]; categories: BlogCat[] }) {
  const [active, setActive] = useState('all');
  const bySlug = useMemo(() => new Map(posts.map((p) => [p.slug, p])), [posts]);
  const tabs = [{ label: 'All', slug: 'all' }, ...categories.map((c) => ({ label: c.label, slug: c.slug }))];
  const shown =
    active === 'all'
      ? posts
      : (categories.find((c) => c.slug === active)?.posts ?? [])
          .map((s) => bySlug.get(s))
          .filter((p): p is BlogCard => Boolean(p));

  return (
    <section className="section">
      <div className="container-x">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-3xl lg:text-4xl">Discover The Essence Of Who We Are?</h2>
          <p className="mt-3 text-body">We believe in the power of the cloud to transform businesses and empower people.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* CATEGORIES sidebar */}
          <aside className="h-max overflow-hidden rounded-xl border border-surface-line bg-white shadow-card lg:sticky lg:top-28">
            <p className="bg-brand px-6 py-4 text-center text-lg font-semibold uppercase tracking-wide text-white">Categories</p>
            <ul>
              {tabs.map((t) => (
                <li key={t.slug}>
                  <button
                    type="button"
                    onClick={() => setActive(t.slug)}
                    aria-current={active === t.slug ? 'true' : undefined}
                    className={`block w-full border-b border-surface-line px-6 py-4 text-left text-sm transition-colors last:border-b-0 ${active === t.slug ? 'font-semibold text-brand' : 'text-body hover:bg-surface-tint hover:text-brand'}`}
                  >
                    {t.label}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* posts grid */}
          <div>
            {shown.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {shown.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}/`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-surface-line bg-white shadow-card transition-shadow hover:shadow-cardHover"
                  >
                    {p.image && (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-tint">
                        <Image src={p.image} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg leading-snug group-hover:text-brand">{p.title}</h3>
                      {p.description && <p className="mt-3 line-clamp-3 text-sm text-body">{p.description}</p>}
                      <span className="mt-4 inline-block text-sm font-semibold text-brand">Read article →</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-body">No articles in this category yet.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
