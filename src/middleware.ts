import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const VALID_LOCALES = ['en', 'es', 'fr'];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Redirect storage routes (floor_plan_files and brochures) to /en/off-plan-properties-uae
  if (pathname.startsWith('/storage/floor_plan_files/') || pathname.startsWith('/storage/brochures/')) {
    url.pathname = '/en/off-plan-properties-uae';
    return NextResponse.redirect(url);
  }

  // Skip validation for static files, public assets, API routes, and Next.js internal routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/favicon') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/videos/') ||
    pathname.startsWith('/icons/') ||
    pathname.startsWith('/locales/') ||
    pathname.startsWith('/public/') ||
    pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|webp|css|js|json|xml|txt|pdf|mp4|mov|avi|wmv|flv|mkv|webm)$/i)
  ) {
    const response = NextResponse.next();
    response.headers.set('x-current-path', pathname);
    response.headers.set('x-current-url', url.toString());
    return response;
  }

  // Handle root path - redirect to default locale
  if (pathname === '/') {
    url.pathname = '/en';
    return NextResponse.redirect(url);
  }

  // Extract the first segment of the path
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0]?.toLowerCase();

  // Check if the first segment is a valid locale
  if (firstSegment && !VALID_LOCALES.includes(firstSegment)) {
    // If invalid locale, preserve the rest of the path and redirect to default locale
    const restOfPath = pathSegments.slice(1).join('/');
    url.pathname = restOfPath ? `/en/${restOfPath}` : '/en';
    return NextResponse.redirect(url);
  }

  // Set the current URL in the response headers
  const response = NextResponse.next();
  response.headers.set('x-current-path', pathname);
  response.headers.set('x-current-url', url.toString());

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, videos, icons, locales, public (public assets)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|videos|icons|locales|public).*)',
  ],
};

