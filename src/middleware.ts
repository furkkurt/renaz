import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  
  // Set cache headers for static assets
  const url = new URL(context.request.url);
  const pathname = url.pathname;
  
  // Cache static assets (images, fonts, CSS, JS) for 1 year
  if (
    pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2|ttf|eot|css|js|mp3)$/i) ||
    pathname.startsWith('/_astro/') ||
    pathname.startsWith('/_assets/')
  ) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    // Ensure proper content-type for images
    if (pathname.match(/\.(webp|avif)$/i)) {
      const contentType = pathname.endsWith('.webp') ? 'image/webp' : 'image/avif';
      response.headers.set('Content-Type', contentType);
    }
  }
  // Cache HTML for shorter period
  else if (pathname.endsWith('.html') || pathname === '/' || !pathname.includes('.')) {
    response.headers.set('Cache-Control', 'public, max-age=3600, must-revalidate');
  }
  // Cache API routes (sitemap, robots.txt) for 1 day
  else if (pathname.endsWith('.xml') || pathname.endsWith('.txt')) {
    response.headers.set('Cache-Control', 'public, max-age=86400, must-revalidate');
  }
  
  return response;
};
