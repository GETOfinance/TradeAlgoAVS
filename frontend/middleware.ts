import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware will run for all requests
export function middleware(request: NextRequest) {
  // Get the user agent
  const userAgent = request.headers.get('user-agent') || '';
  
  // Adding browser compatibility headers
  const response = NextResponse.next();
  
  // Add feature policy to prevent access to restricted APIs
  response.headers.set(
    'Permissions-Policy', 
    'clipboard-write=(self), clipboard-read=(self)'
  );
  
  // Set security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  return response;
}

// Configure the middleware to run for all routes
export const config = {
  matcher: '/:path*',
};