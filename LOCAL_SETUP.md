# Local Development Setup Guide

## Quick Start

### 1. Prerequisites
Make sure you have these installed:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **VS Code** - [Download here](https://code.visualstudio.com/)
- **Git** - [Download here](https://git-scm.com/)

### 2. Clone and Setup

Open your terminal/command prompt and run:

```bash
# Clone the repository
git clone <your-github-repo-url>
cd portfolio

# Install all dependencies
npm install
```

### 3. Start Development

```bash
npm run dev
```

This will start both servers:
- **Frontend**: http://localhost:5173 (your website)
- **Backend**: http://localhost:5000 (API server)

### 4. Open in VS Code

```bash
code .
```

Or open VS Code and use "File > Open Folder" to select your portfolio folder.

## VS Code Extensions (Recommended)

Install these extensions for better development experience:

1. **ES7+ React/Redux/React-Native snippets**
2. **TypeScript Importer**
3. **Tailwind CSS IntelliSense**
4. **Auto Rename Tag**
5. **Prettier - Code formatter**
6. **GitLens**

## File Structure Overview

```
portfolio/
├── client/                    # Frontend (React app)
│   ├── src/
│   │   ├── components/        # Your React components
│   │   │   ├── hero-section.tsx
│   │   │   ├── projects-section.tsx
│   │   │   └── ...
│   │   ├── lib/              # Utility functions
│   │   └── index.css         # Global styles
│   └── index.html            # Main HTML file
├── server/                   # Backend (Express API)
│   ├── index.ts              # Server startup
│   ├── routes.ts             # API endpoints
│   └── ...
├── package.json              # Dependencies and scripts
└── README.md                 # Project documentation
```

## Making Changes

### To Edit Your Portfolio Content:

1. **Projects**: Edit `client/src/components/projects-section.tsx`
2. **About/Bio**: Edit `client/src/components/hero-section.tsx`
3. **Styles**: Edit `client/src/index.css` or component files
4. **Contact Form**: Edit `client/src/components/contact-section.tsx`

### Hot Reload
When you save any file, the website automatically refreshes with your changes!

## Common Commands

```bash
# Start development (both frontend and backend)
npm run dev

# Only start frontend
cd client && npm run dev

# Check for TypeScript errors
npm run check

# Build for production
npm run build

# Start production server
npm run start
```

## Troubleshooting

### Port Already in Use
If you get port errors:
```bash
# Kill processes on ports
npx kill-port 5000
npx kill-port 5173
```

### Dependencies Issues
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### VS Code Not Recognizing TypeScript
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type "TypeScript: Restart TS Server"
3. Press Enter

## Environment Variables

Create a `.env` file in the root directory for configuration:

```env
NODE_ENV=development
PORT=5000
# Add other environment variables as needed
```

## Database (Optional)

The project works with in-memory storage by default. To use a real database:

1. Install PostgreSQL locally
2. Create a database
3. Add `DATABASE_URL` to your `.env` file
4. Run `npm run db:push`

## Getting Help

- Check the browser console (F12) for error messages
- Look at the terminal where you ran `npm run dev`
- Check VS Code's Problems panel (View > Problems)

## Next Steps

1. Start the development server: `npm run dev`
2. Open http://localhost:5173 in your browser
3. Begin editing files in VS Code
4. Watch your changes appear instantly!