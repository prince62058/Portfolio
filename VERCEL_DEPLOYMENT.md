# Deploy Portfolio to Vercel

## Prerequisites

1. Create a [Vercel account](https://vercel.com) (free)
2. Install Vercel CLI (optional but recommended):
   ```bash
   npm install -g vercel
   ```

## Method 1: Deploy via GitHub (Recommended)

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Push your portfolio code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/portfolio.git
   git push -u origin main
   ```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your portfolio repository
5. Configure settings:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave empty)
   - **Build Command**: `npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: `npm install`

### Step 3: Environment Variables (if needed)
Add environment variables in Vercel dashboard:
- `NODE_ENV` = `production`
- Add any database URLs or API keys

### Step 4: Deploy
Click "Deploy" - Vercel will build and deploy your portfolio!

## Method 2: Deploy via CLI

```bash
# In your project directory
vercel

# Follow the prompts:
# ? Set up and deploy "~/portfolio"? Y
# ? Which scope do you want to deploy to? (Your username)
# ? Link to existing project? N
# ? What's your project's name? portfolio
# ? In which directory is your code located? ./

# Deploy to production
vercel --prod
```

## Method 3: Manual Upload

1. Build the project locally:
   ```bash
   npm run build
   ```
2. Go to [vercel.com/new](https://vercel.com/new)
3. Drag and drop the entire project folder
4. Vercel will auto-detect and deploy

## Configuration Files Created

- `vercel.json` - Vercel deployment configuration
- Handles both frontend (React) and backend (Express API)
- Routes API calls to serverless functions
- Serves static files from client build

## Post-Deployment

After successful deployment:

1. **Custom Domain** (optional):
   - Go to your project dashboard
   - Settings → Domains
   - Add your custom domain

2. **Environment Variables**:
   - Settings → Environment Variables
   - Add any secrets or configuration

3. **Analytics**:
   - Enable Vercel Analytics for visitor insights

## Automatic Deployments

Once connected to GitHub:
- Every push to `main` branch automatically deploys
- Pull requests create preview deployments
- Zero downtime deployments

## Build Settings

Vercel automatically detects:
- **Build Command**: `npm run build`
- **Output Directory**: `client/dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## Troubleshooting

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Check TypeScript errors

### API Routes Not Working
- Verify `vercel.json` configuration
- Check serverless function logs
- Ensure environment variables are set

### Database Connection
- Use Vercel's database solutions or external providers
- Set `DATABASE_URL` in environment variables
- Consider using Vercel Postgres for free PostgreSQL

## Vercel Features

- **Serverless Functions**: Your Express API runs as serverless functions
- **Edge Network**: Global CDN for fast loading
- **Preview Deployments**: Test changes before going live
- **Analytics**: Built-in performance monitoring
- **Free SSL**: Automatic HTTPS certificates

Your portfolio will be live at: `https://your-project-name.vercel.app`

## Performance Tips

1. **Image Optimization**: Use Vercel's image optimization
2. **Caching**: Static assets are automatically cached
3. **Compression**: Automatic gzip compression
4. **Edge Functions**: Consider for dynamic content

Your portfolio is now ready for professional deployment on Vercel!