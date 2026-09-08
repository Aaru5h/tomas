import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  // Only canonical, indexable pages. Legal drafts are deliberately noindex.
  return [{ url: `${site.url}/` }];
}
