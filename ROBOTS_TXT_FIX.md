# robots.txt Fix Instructions

## Issue
PageSpeed Insights is reporting an invalid directive on line 29:
```
Content-signal: search=yes,ai-train=no
```

This directive is **NOT** in your source code. It's being added by your hosting provider or CDN.

## Solutions

### Option 1: Create Static robots.txt (Recommended)
Create a file at `/public/robots.txt` with this content:

```
User-agent: *
Allow: /

# Disallow admin or private areas if any
# Disallow: /admin/

Sitemap: https://renazteknik.com/sitemap.xml
```

**Why this works**: Static files in `/public/` take precedence over dynamic routes and prevent CDN modifications.

### Option 2: Configure Your Hosting Provider
1. Check your hosting provider's dashboard for:
   - CDN settings
   - robots.txt modifications
   - SEO/Indexing settings
2. Disable any automatic robots.txt modifications
3. Look for settings related to "Content-signal" or "AI training"

### Option 3: Use .htaccess (if on Apache)
If you're using Apache, add this to your `.htaccess`:

```apache
<Files "robots.txt">
    Header unset Content-signal
</Files>
```

## Verification
After implementing the fix:
1. Rebuild your site: `npm run build`
2. Check `dist/robots.txt` - it should only have 7 lines
3. Test on PageSpeed Insights again
