# Favicon Setup Instructions

## ✅ Completed
- Updated `Layout.astro` to use `/favicon.svg` as the primary favicon
- Added support for multiple favicon formats (SVG, PNG sizes)
- Created `site.webmanifest` for PWA support
- Fixed duplicate theme-color meta tag

## 📋 Required Actions

You need to create PNG versions of your favicon for better browser compatibility. The SVG favicon will work in modern browsers, but older browsers and some contexts (like bookmarks) need PNG files.

### Option 1: Generate from SVG (Recommended)

1. **Open your `favicon.svg`** in an image editor or online converter
2. **Export/Convert to PNG** at these sizes:
   - `favicon-16x16.png` (16×16 pixels)
   - `favicon-32x32.png` (32×32 pixels)  
   - `apple-touch-icon.png` (180×180 pixels)

3. **Place all files in `/public/` folder**:
   ```
   /public/
     ├── favicon.svg (already exists ✅)
     ├── favicon-16x16.png (create this)
     ├── favicon-32x32.png (create this)
     └── apple-touch-icon.png (create this)
   ```

### Option 2: Use Online Tools

1. Visit [RealFaviconGenerator](https://realfavicongenerator.net/) or [Favicon.io](https://favicon.io/)
2. Upload your `favicon.svg` or create a new favicon
3. Download the generated package
4. Extract and place the PNG files in `/public/`

### Option 3: Quick Command Line (if you have ImageMagick)

```bash
cd /home/furkan/projects/websites/renaz/public
convert favicon.svg -resize 16x16 favicon-16x16.png
convert favicon.svg -resize 32x32 favicon-32x32.png
convert favicon.svg -resize 180x180 apple-touch-icon.png
```

## 🔍 Verification

After adding the PNG files:

1. **Clear browser cache** (important!):
   - Chrome/Edge: `Ctrl+Shift+Delete` → Clear cached images
   - Firefox: `Ctrl+Shift+Delete` → Clear cache
   - Or use Incognito/Private mode

2. **Hard refresh** the page:
   - `Ctrl+F5` (Windows/Linux)
   - `Cmd+Shift+R` (Mac)

3. **Check the favicon**:
   - Look at the browser tab
   - Check bookmarks
   - Check browser history (like in your screenshot)

4. **Test different browsers**:
   - Chrome/Edge (should show SVG or PNG)
   - Firefox (should show SVG or PNG)
   - Safari (needs PNG for best results)

## 🎨 Current Favicon

Your current `favicon.svg` is a wrench/tool icon which is perfect for a plumbing/technical services business!

## 📝 Notes

- **SVG favicon** (`favicon.svg`) works in modern browsers and supports dark mode
- **PNG favicons** are needed for:
  - Older browsers
  - Apple devices (iOS Safari)
  - Some bookmark managers
  - Browser history/search results
- The **web manifest** (`site.webmanifest`) enables PWA features and provides metadata

## 🚀 After Setup

Once you've added the PNG files:
1. Rebuild: `npm run build`
2. Deploy to your server
3. Clear browser cache
4. The generic globe icon should be replaced with your custom favicon!
