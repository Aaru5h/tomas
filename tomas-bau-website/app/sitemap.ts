import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { publicPages } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.keys(publicPages).map((path) => ({ url: `${site.url}${path}` }));
}
