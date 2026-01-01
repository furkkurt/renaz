import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
	// Clean robots.txt without any non-standard directives
	const robotsTxt = `User-agent: *
Allow: /

# Disallow admin or private areas if any
# Disallow: /admin/

Sitemap: https://renazteknik.com/sitemap.xml
`;

	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=86400, must-revalidate',
			// Prevent any CDN/hosting provider from adding directives
			'X-Robots-Tag': 'noindex',
		},
	});
};

