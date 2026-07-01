import type { Metadata } from 'next';
import Image from 'next/image';
import { getBlogSlugs, getBlogPost, getBlogCategories } from '@/lib/content';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { OneToOneCTA } from '@/components/sections/OneToOneCTA';
import { BlogCategoryList } from '@/components/sections/BlogCategoryList';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on Microsoft Azure, Fabric, Power BI, Copilot and data analytics from Folio3.',
  alternates: { canonical: '/blog/' },
};

export const revalidate = 3600;

export default function BlogIndex() {
  const posts = getBlogSlugs()
    .map((slug) => getBlogPost(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .map((p) => ({ slug: p.slug, title: p.title, description: p.description ?? undefined }));
  const categories = getBlogCategories();

  return (
    <>
      {/* banner header (our-blog-banner background) */}
      <section className="relative overflow-hidden bg-brand-ink">
        <Image src="/wp-content/uploads/2023/06/our-blog-banner.webp" alt="" fill priority sizes="100vw" className="object-cover opacity-30" />
        <div className="container-x relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20">
          <div className="text-white">
            <p className="text-sm font-semibold uppercase tracking-wider text-white/80">Resources</p>
            <h1 className="mt-2 text-3xl font-bold lg:text-4xl">From the Folio3 Azure blog</h1>
            <p className="mt-4 max-w-2xl text-white/85">Empower your organization with the power of the cloud — {posts.length}+ articles on Azure, Microsoft Fabric, Power BI and AI.</p>
          </div>
          <Image src="/wp-content/uploads/2023/06/blog-mock.webp" alt="" width={560} height={380} priority className="mx-auto h-auto w-full max-w-md" />
        </div>
      </section>
      <Breadcrumb name="Blog" />
      <BlogCategoryList posts={posts} categories={categories} />
      <OneToOneCTA tone="dark" />
    </>
  );
}
