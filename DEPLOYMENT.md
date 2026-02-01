# Deployment Guide

## Quick Deploy to Vercel (Recommended)

Vercel is the recommended platform for deploying Next.js applications.

### Steps:

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Portfolio website"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"
   - Your site will be live in minutes!

3. **Custom Domain (Optional)**
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain (e.g., roosheelpatel.com)
   - Follow DNS configuration instructions

## Alternative: Deploy to Netlify

1. **Push to GitHub** (same as above)

2. **Deploy on Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

## Manual Deployment

For VPS or custom server:

```bash
# Build the production version
npm run build

# Start the production server
npm start
```

The server will run on port 3000 by default. Use a reverse proxy (nginx, Apache) to serve it on port 80/443.

## Environment Variables

This project doesn't require any environment variables for basic functionality.

If you add features like contact forms or analytics, you can add them in:
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Environment variables

## Post-Deployment Checklist

- [ ] Website loads correctly on desktop
- [ ] Website is responsive on mobile devices
- [ ] All navigation links work
- [ ] Resume PDF downloads correctly
- [ ] External links (LinkedIn, DOI links) open in new tabs
- [ ] Theme toggle works (dark/light mode)
- [ ] Publications search functions properly
- [ ] No console errors in browser DevTools
- [ ] Run Lighthouse audit (aim for 90+ scores)

## Updating Content

After deployment, to update content:

1. Edit the relevant data file in `src/data/`
2. Commit and push to GitHub
3. Vercel/Netlify will automatically rebuild and deploy

## Performance Optimization

The site is already optimized with:
- ✅ Static generation for fast loading
- ✅ Optimized fonts with Next.js font optimization
- ✅ Minimal JavaScript bundle
- ✅ Responsive images (if added later)
- ✅ CSS purging with Tailwind

## Monitoring

Consider adding:
- **Vercel Analytics**: Built-in, zero-config analytics
- **Google Analytics**: For detailed visitor insights
- **Plausible/Fathom**: Privacy-friendly alternatives

## Domain Setup Example

For a custom domain like `roosheelpatel.com`:

1. **DNS Configuration** (in your domain registrar):
   ```
   A Record:  @ → 76.76.21.21 (Vercel IP)
   CNAME:     www → cname.vercel-dns.com
   ```

2. **SSL Certificate**: Automatically provisioned by Vercel/Netlify

## Troubleshooting

**Build fails:**
- Check Node.js version (should be 18+)
- Run `npm install` to ensure all dependencies are installed
- Check build logs for specific errors

**Site loads but looks broken:**
- Clear browser cache
- Check browser console for errors
- Verify CSS is loading (check Network tab in DevTools)

**Resume PDF not found:**
- Ensure `RESUME_ROOSHEELPATEL_WIDE.pdf` is in `public/` directory
- Check file name matches exactly (case-sensitive)

## Support

For Next.js deployment issues, see:
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
