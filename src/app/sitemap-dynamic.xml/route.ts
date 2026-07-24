import { NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend.gulf.smbdigitalzone.com';

interface SitemapEntry {
  loc: string;
  lastmod: string;
}

interface SitemapApiResponse {
  success: boolean;
  data: {
    entries: SitemapEntry[];
  };
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Frontend sets changefreq and priority (customize as needed)
function getChangefreqAndPriority(loc: string): { changefreq: string; priority: string } {
  if (loc.includes('/blogs/')) return { changefreq: 'weekly', priority: '0.7' };
  if (loc.includes('/off-plan/')) return { changefreq: 'daily', priority: '0.8' };
  if (loc.includes('/properties/')) return { changefreq: 'daily', priority: '0.9' };
  return { changefreq: 'weekly', priority: '0.8' };
}

function withWww(loc: string): string {
  try {
    const url = new URL(loc);
    if (url.hostname === 'gulfestates.ae') {
      url.hostname = 'www.gulfestates.ae';
    }
    return url.toString();
  } catch {
    return loc;
  }
}

function entryToXml(entry: SitemapEntry): string {
  const loc = withWww(entry.loc);
  const { changefreq, priority } = getChangefreqAndPriority(loc);
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <changefreq>${escapeXml(changefreq)}</changefreq>
    <priority>${escapeXml(priority)}</priority>
  </url>`;
}

export async function GET() {
  try {
    const response = await fetch(`${API_URL}/api/sitemap/slugs`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data: SitemapApiResponse = await response.json();

    if (!data.success || !data.data || !Array.isArray(data.data.entries)) {
      throw new Error('Invalid API response');
    }

    const urlEntries = data.data.entries.map(entryToXml);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating dynamic sitemap:', error);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  }
}
