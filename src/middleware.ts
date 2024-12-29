import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  
  // Allow requests to API routes, static files, and the signIn page
  if (
    url.pathname.startsWith('/api') ||
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/static') ||
    url.pathname === '/signIn'
  ) {
    return NextResponse.next();
  }

  // Check if the request is for a non-existing page
  const response = await fetch(url.href);
  if (response.status === 404) {
    // Redirect to signIn page if the page does not exist
    return NextResponse.redirect(new URL('/signIn', req.url));
  }

  return NextResponse.next();
}

