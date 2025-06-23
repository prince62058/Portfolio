# Free Deployment Options for Your Portfolio

## 1. Vercel (Recommended)
**Cost**: Free forever
**Features**: 
- Serverless functions for your API
- Global CDN
- Automatic deployments from GitHub
- Custom domains
- SSL certificates

**Steps**:
1. Push code to GitHub
2. Connect GitHub to Vercel
3. Deploy automatically

**Limits**: 100GB bandwidth/month, 1000 serverless function invocations/day

---

## 2. Netlify
**Cost**: Free tier available
**Features**:
- Static site hosting
- Form handling
- Edge functions
- Deploy previews

**Setup**:
1. Build your frontend: `npm run build`
2. Upload `client/dist` folder to Netlify
3. Configure redirects for SPA

**Note**: Backend API needs separate hosting (Railway, Render)

---

## 3. GitHub Pages + Railway/Render
**Frontend (GitHub Pages)**:
```bash
# Build and deploy frontend
npm run build
# Push client/dist to gh-pages branch
```

**Backend (Railway - Free)**:
1. Connect GitHub to Railway
2. Deploy server folder
3. Get API URL

**Backend (Render - Free)**:
- 750 hours/month free
- Auto-sleep after 15 minutes inactivity

---

## 4. Firebase Hosting + Cloud Functions
**Cost**: Free tier (1GB storage, 10GB transfer)

**Setup**:
```bash
npm install -g firebase-tools
firebase init hosting
firebase init functions
firebase deploy
```

---

## 5. Surge.sh (Frontend Only)
**Cost**: Free
**For**: Static frontend only

```bash
npm install -g surge
npm run build
cd client/dist
surge
```

---

## 6. Heroku Alternative - Railway
**Cost**: Free tier (500 hours/month)

1. Connect GitHub repository
2. Railway auto-detects Node.js
3. Environment variables in dashboard
4. Auto-deploys on push

---

## Best Free Combination

### Option A: Vercel (Full Stack)
- Deploy everything to Vercel
- Use built-in database (Vercel Postgres free tier)
- Zero configuration needed

### Option B: Netlify + Railway
- Frontend: Netlify (fast CDN)
- Backend: Railway (free PostgreSQL)
- Separate but reliable

### Option C: GitHub Pages + Vercel API
- Frontend: GitHub Pages (unlimited)
- Backend: Vercel serverless functions
- Hybrid approach

## Quick Deploy Commands

### Vercel (Full Stack):
```bash
npm install -g vercel
vercel
vercel --prod
```

### Netlify (Frontend):
```bash
npm run build
npx netlify-cli deploy --prod --dir=client/dist
```

### Railway (Backend):
```bash
# Push to GitHub, connect to Railway
# Railway auto-deploys
```

## Environment Variables

For any platform, set these:
- `NODE_ENV=production`
- `DATABASE_URL` (if using external DB)

## Custom Domain (All Free)

Most platforms offer:
- Free subdomain: `yoursite.vercel.app`
- Custom domain support (bring your own)
- Free SSL certificates

## Database Options (Free)

1. **Vercel Postgres**: Free tier included
2. **Supabase**: Free PostgreSQL + real-time features
3. **PlanetScale**: Free MySQL with branching
4. **Railway Postgres**: 500MB free
5. **In-memory**: No persistence, but works

## Recommendation

**Use Vercel** - it's the simplest for your full-stack portfolio:
- No configuration needed
- Handles both frontend and backend
- Free tier is generous
- Automatic deployments
- Global performance

Your portfolio will be live at `https://yourname-portfolio.vercel.app` within minutes!