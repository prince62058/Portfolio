# Prince Kumar - Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Express.js showcasing my projects, skills, and experience.

## Features

- 🎨 Modern UI with Tailwind CSS and Framer Motion animations
- 📱 Fully responsive design
- 🚀 Fast development with Vite
- 💾 Database integration with Drizzle ORM
- 📊 Real GitHub statistics integration
- 📧 Contact form functionality
- 🎯 Project showcase with live demos

## Tech Stack

**Frontend:**
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite
- Radix UI Components

**Backend:**
- Node.js
- Express.js
- TypeScript
- Drizzle ORM
- PostgreSQL/In-memory storage

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_database_url_here
```

### 4. Database Setup (Optional)

If you want to use PostgreSQL instead of in-memory storage:

```bash
# Install and setup PostgreSQL locally
# Update DATABASE_URL in .env file
npm run db:push
```

### 5. Start Development Server

```bash
npm run dev
```

This will start:
- Frontend server on `http://localhost:5173`
- Backend API server on `http://localhost:5000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── lib/           # Utility functions
│   │   └── index.css      # Global styles
│   └── index.html
├── server/                 # Backend Express application
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── db.ts              # Database configuration
│   └── storage.ts         # Data access layer
├── shared/                 # Shared types and schemas
└── package.json
```

## Features Overview

### Projects Section
- Displays GitHub repositories automatically
- Live demo links for each project
- Download functionality
- Real GitHub statistics (stars, forks, watchers)
- Project categorization and filtering

### Contact Form
- Stores messages in database
- Email validation
- Success/error feedback

### GitHub Integration
- Fetches repository data from GitHub API
- Displays real-time statistics
- Automatic project categorization

## Customization

### Adding New Projects

Edit `client/src/components/projects-section.tsx`:

```typescript
const projects: Project[] = [
  {
    id: "project-id",
    title: "Project Title",
    description: "Project description",
    icon: IconComponent,
    tags: ["React", "TypeScript"],
    category: ["web"],
    color: "from-blue-500 to-indigo-600",
    github: "repository-name",
    demo: "https://your-demo-url.com",
    download: true,
  },
  // Add more projects...
];
```

### Modifying Styles

- Global styles: `client/src/index.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Individual component files

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Replit

The project is configured for Replit deployment. Simply push to your Replit repository and it will automatically deploy.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - see LICENSE file for details