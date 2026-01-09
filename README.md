# RSS Builder

A modern RSS feed aggregation and management system with a full-stack architecture. Built with Node.js, Express 5, React 19, and PostgreSQL, this application allows you to manage RSS feeds, sources, and automatically sync content from various RSS sources through an intuitive web interface.

## Features

### Backend

- **RSS Feed Management**: Create, update, and manage RSS feeds via REST API
- **Source Management**: Add and manage RSS sources for each feed
- **Automatic Synchronization**: Background scheduler that periodically syncs RSS sources
- **REST API**: Full RESTful API with comprehensive endpoints
- **API Documentation**: Interactive Swagger UI documentation
- **Dual Authentication**: Clerk JWT for web app + API Key for RSS/Atom feeds
- **Health Checks**: Built-in health check endpoints
- **Docker Support**: Multi-stage Dockerfile with separate services

### Frontend

- **Modern UI**: React 19 with TypeScript for type safety
- **Fast Development**: Vite 7 for instant hot module replacement
- **Authentication**: Clerk integration for secure user management
- **Responsive Design**: Tailwind CSS 4 with Oxide engine (5x faster builds)
- **Smart Routing**: React Router 7 Data Mode with built-in loaders/actions
- **Feed Management**: Create, view, and manage feeds through intuitive UI
- **Entry Viewing**: Browse and filter RSS entries with pagination

### Development

- **Monorepo Structure**: npm workspaces for scalable organization
- **Code Quality**: ESLint, Prettier, Husky git hooks
- **Database Migrations**: Knex.js powered migrations
- **Type Safety**: TypeScript throughout the stack

## Tech Stack

### Backend

- **Runtime**: Node.js 20+
- **Framework**: Express 5
- **Database**: PostgreSQL
- **ORM**: Knex.js
- **Authentication**: Clerk JWT + API Key
- **Documentation**: Swagger UI
- **Scheduling**: node-cron
- **Logging**: Morgan

### Frontend

- **Framework**: React 19 (with Server Components support)
- **Build Tool**: Vite 7 (Node.js 20.19+ or 22.12+ required)
- **Language**: TypeScript 5.6
- **Routing**: React Router 7 (Data Mode)
- **Styling**: Tailwind CSS 4 (Oxide engine)
- **Authentication**: Clerk React SDK 5.x
- **State Management**: React Router loaders/actions (no external state library needed)

### Infrastructure

- **Containerization**: Docker + Docker Compose
- **Package Management**: npm workspaces
- **Code Quality**: ESLint, Prettier, Husky

## Prerequisites

- **Node.js**: 20.19+ or 22.12+ (required by Vite 7)
- **PostgreSQL**: Database for storing feeds and entries
- **Docker & Docker Compose**: For containerized deployment (optional)
- **Clerk Account**: Free account for authentication (https://clerk.com)

## Installation

### Local Development

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd rss-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   This installs dependencies for all workspaces (root, backend, and frontend).

3. **Environment Setup**

   **Backend** - Create `backend/.env`:

   ```env
   NODE_ENV=development
   PORT=5000
   CONNECTION_STRING=postgresql://username:password@localhost:5432/rss_builder
   API_KEY=your_api_key_here
   SWAGGER_USERNAME=admin
   SWAGGER_PASSWORD=admin
   SCHEMA=http
   HOST=localhost:5000
   SCHEDULE=*/5 * * * *
   CORS_ORIGIN=http://localhost:5173
   ```

   **Frontend** - Create `frontend/.env`:

   ```env
   # Get your publishable key from https://clerk.com/dashboard
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here

   # Backend API URL
   VITE_API_URL=http://localhost:5000
   ```

4. **Database Setup**

   ```bash
   # Initialize database schema
   npm run migrate:init

   # Run migrations
   npm run migrate:run
   ```

5. **Generate API Documentation**

   ```bash
   npm run swagger
   ```

6. **Start the application**

   You'll need **three terminal windows**:

   **Terminal 1 - Database**:

   ```bash
   npm run docker:up
   ```

   **Terminal 2 - Backend**:

   ```bash
   npm run dev:backend
   ```

   **Terminal 3 - Frontend**:

   ```bash
   npm run dev:frontend
   ```

   **Optional - Scheduler** (for automatic RSS syncing):

   ```bash
   npm run start:scheduler
   ```

7. **Access the application**
   - **Frontend**: http://localhost:5173
   - **Backend API**: http://localhost:5000
   - **API Docs**: http://localhost:5000/api-docs
   - **Health Check**: http://localhost:5000/live

### Docker Deployment

1. **With Database (Full Stack)**

   ```bash
   # Build and start all services including PostgreSQL
   docker-compose --profile with-db up --build
   ```

2. **Without Database (External DB)**

   ```bash
   # Start only application services (assumes external database)
   docker-compose up --build
   ```

3. **Individual Services**

   ```bash
   # Start only API service
   docker-compose up rss-builder-api

   # Start only scheduler
   docker-compose up rss-builder-scheduler
   ```

## Authentication

The application uses **dual authentication** for different use cases:

### 1. Clerk JWT (Web Application)

All frontend API calls use Clerk JWT tokens automatically:

- User signs in via Clerk's hosted UI
- JWT token attached to all requests via `Authorization: Bearer <token>`
- Used for: Feed management, source management, entry viewing

### 2. API Key (RSS/Atom Feeds)

RSS and Atom feed endpoints use API key authentication:

```bash
# Via header
curl -H "X-API-Key: your_api_key_here" http://localhost:5000/api/feeds/{feedId}/rss

# Via query parameter
curl http://localhost:5000/api/feeds/{feedId}/rss?x-api-key=your_api_key_here
```

### Setting Up Clerk

1. Create account at https://clerk.com (free tier: 10,000 MAU)
2. Create application and choose authentication methods (Email, Google, etc.)
3. Copy **Publishable Key** to `frontend/.env`
4. Configure sign-up restrictions in Clerk Dashboard if needed

## API Documentation

Interactive API documentation with dual auth support:

- **Swagger UI**: http://localhost:5000/api-docs (Basic Auth: admin/admin)
- **Health Check**: http://localhost:5000/live

The Swagger UI allows testing both authentication methods:

- **clerkAuth**: Paste JWT token from browser DevTools
- **apiKeyAuth**: Enter your API key from `.env`

## Database Schema

The application uses PostgreSQL with the following main tables:

- **feeds**: RSS feed definitions
- **sources**: RSS source URLs for each feed
- **entries**: Individual RSS entries from sources

## Available Scripts

### Root Level (Workspace Orchestration)

| Command                          | Description                                   |
| -------------------------------- | --------------------------------------------- |
| **Backend**                      |                                               |
| `npm run dev:backend`            | Start backend in development mode             |
| `npm run start:backend`          | Start backend in production mode              |
| `npm run start:scheduler`        | Start the RSS synchronization scheduler       |
| **Frontend**                     |                                               |
| `npm run dev:frontend`           | Start Vite dev server (http://localhost:5173) |
| `npm run build:frontend`         | Build frontend for production                 |
| `npm run preview:frontend`       | Preview production build                      |
| **Database**                     |                                               |
| `npm run migrate:init`           | Initialize database schema                    |
| `npm run migrate:make -- <name>` | Create a new migration                        |
| `npm run migrate:run`            | Run pending migrations                        |
| `npm run migrate:rollback`       | Rollback last migration                       |
| `npm run docker:up`              | Start PostgreSQL container                    |
| `npm run docker:down`            | Stop PostgreSQL container                     |
| **Code Quality**                 |                                               |
| `npm run lint`                   | Run ESLint on all workspaces                  |
| `npm run lint:fix`               | Fix ESLint issues automatically               |
| `npm run format`                 | Format code with Prettier                     |
| `npm run format:check`           | Check code formatting                         |
| **Documentation**                |                                               |
| `npm run swagger`                | Generate API documentation                    |

### Running Commands in Specific Workspaces

You can run commands directly in a workspace using the `-w` flag:

```bash
# Run any script in the backend workspace
npm run <script> -w @rss-builder/backend

# Or using the folder name
npm run <script> -w backend
```

## Project Structure

```
rss-builder/
├── backend/                           # Backend API workspace (@rss-builder/backend)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js            # Knex database connection
│   │   ├── features/
│   │   │   ├── feeds/                 # Feed management endpoints
│   │   │   │   ├── addFeed.js
│   │   │   │   ├── buildFeed.js       # RSS/Atom feed generation
│   │   │   │   ├── deleteFeed.js
│   │   │   │   ├── findFeed.js
│   │   │   │   ├── listFeeds.js
│   │   │   │   ├── routes.js          # Feed API routes
│   │   │   │   └── schemas.js
│   │   │   └── sources/               # Source management endpoints
│   │   │       ├── addSource.js
│   │   │       ├── deleteSource.js
│   │   │       ├── deleteSourceEntries.js
│   │   │       ├── findSource.js
│   │   │       ├── listSources.js
│   │   │       ├── listEntries.js     # Paginated entry listing
│   │   │       ├── syncSources.js     # RSS sync logic
│   │   │       ├── routes.js          # Source API routes
│   │   │       └── schemas.js
│   │   ├── middlewares/
│   │   │   ├── errorHandler.js        # Global error handler
│   │   │   ├── paginationParam.js     # Pagination helper
│   │   │   ├── schemaValidator.js     # Request validation
│   │   │   ├── securityHandler.js     # Clerk JWT + API Key auth
│   │   │   └── schemas.js
│   │   ├── utils/
│   │   │   └── validation.js
│   │   ├── scheduler.js               # RSS sync scheduler
│   │   └── server.js                  # Express app
│   ├── migrations/                    # Database migrations
│   ├── requests/                      # HTTP request examples
│   ├── Dockerfile
│   ├── knexfile.js
│   ├── swagger.js                     # Swagger config
│   ├── swagger-output.json            # Generated API docs
│   └── package.json
│
├── frontend/                          # Frontend SPA workspace (@rss-builder/frontend)
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/                # Layout components
│   │   │   │   ├── Header.tsx         # App header with UserButton
│   │   │   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   │   │   ├── RootLayout.tsx
│   │   │   │   └── ProtectedLayout.tsx # Auth-protected wrapper
│   │   │   └── ui/                    # Reusable UI components
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx          # Main dashboard
│   │   │   ├── FeedsPage.tsx          # Feed list with CRUD
│   │   │   ├── FeedDetailPage.tsx     # Single feed view
│   │   │   ├── SourceDetailPage.tsx   # Entry list for source
│   │   │   ├── SignInPage.tsx         # Clerk sign-in wrapper
│   │   │   └── ErrorPage.tsx          # Error boundary
│   │   ├── apiClient.ts               # Fetch wrapper with Clerk JWT
│   │   ├── routes.tsx                 # React Router config (lazy loaded)
│   │   ├── types.ts                   # TypeScript interfaces
│   │   ├── main.tsx                   # App entry point
│   │   └── index.css                  # Tailwind imports
│   ├── public/
│   ├── index.html
│   ├── vite.config.ts                 # Vite + Tailwind config
│   ├── tsconfig.json
│   └── package.json
│
├── docker-compose.yml                 # Docker services configuration
├── docker-compose-coolify.yml         # Coolify deployment config
├── eslint.config.js                   # Shared ESLint configuration
├── .prettierrc                        # Shared Prettier configuration
├── commitlint.config.js               # Commit message linting
├── .husky/                            # Git hooks
└── package.json                       # Root workspace configuration
```

## Docker Services

The application uses a multi-stage Dockerfile with three services:

- **API Server** (`rss-builder-api`): Main REST API service on port 5000
- **Scheduler** (`rss-builder-scheduler`): Background RSS synchronization service
- **Migrator** (`migrator`): Database migration service (runs once on startup)

## Security Features

### Backend

- **Dual Authentication**: Clerk JWT (web app) + API Key (RSS feeds)
- **Basic Auth**: Swagger documentation protection
- **Input Validation**: Yup schemas for request validation
- **Error Handling**: Centralized error middleware
- **CORS**: Configured for frontend origin
- **Non-root User**: Docker containers run as non-root

### Frontend

- **Clerk Authentication**: Industry-standard JWT tokens
- **Protected Routes**: Automatic redirect to sign-in
- **Session Management**: Persistent authentication
- **XSS Protection**: React's built-in escaping
- **Type Safety**: TypeScript throughout

## Architecture Decisions

### Why React Router 7 Data Mode?

Instead of TanStack Query or other data fetching libraries, we use React Router 7's built-in `loader` and `action` functions:

- **loaders**: Fetch data before route renders (eliminates loading spinners)
- **actions**: Handle form submissions and mutations
- **Automatic loading states**: Via `useNavigation()` hook
- **Type-safe**: Full TypeScript support with route parameters

### Why Lazy Router Creation?

The router is created lazily using `useMemo()` inside `<ClerkLoaded>` to avoid a race condition where:

1. Router loaders execute immediately on route match
2. Clerk's JWT provider initializes asynchronously
3. API calls fail with "undefined" errors

Solution: Wait for Clerk to load, then create router. See [React Router #9327](https://github.com/remix-run/react-router/discussions/9327) for details.

### Why Tailwind CSS v4?

- **5x faster builds** with Rust-powered Oxide engine
- **Zero config**: No `tailwind.config.js` needed
- **CSS-first**: Configure via `@theme` directive
- **Modern CSS**: Built-in cascade layers, `@property`, `color-mix()`

### Why Dual Authentication?

- **Clerk JWT**: For authenticated web users (CRUD operations)
- **API Key**: For RSS readers (no auth UI needed)

This allows users to:

1. Manage feeds through secure web interface
2. Subscribe to feeds in any RSS reader using API key

## Monitoring

- Health check endpoint at `/live`
- Request logging with Morgan (dev mode)
- Docker health checks for all services
- Frontend console logs for Clerk initialization

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `npm run commit` (uses commitizen)
4. Push to branch: `git push origin feature/your-feature`
5. Create a Pull Request

## License

This project is licensed under the Apache License. See the [LICENSE](LICENSE) file for details.

## Troubleshooting

### Backend Issues

1. **Database Connection Issues**
   - Ensure PostgreSQL is running: `npm run docker:up`
   - Check connection string format in `backend/.env`
   - Verify database credentials and port (default: 5432)

2. **Migration Errors**
   - Run `npm run migrate:init` first
   - Check database schema permissions
   - Ensure database exists: `psql -U postgres -c "CREATE DATABASE rss_builder;"`

3. **Authentication Issues**
   - Verify `clerkMiddleware()` is before routes in `server.js`
   - Check API key matches between frontend/backend `.env`
   - Test Clerk JWT in Swagger UI (paste token from DevTools)

### Frontend Issues

1. **Clerk "undefined" Errors**
   - Ensure `VITE_CLERK_PUBLISHABLE_KEY` is in `frontend/.env`
   - Restart Vite dev server (env vars are cached)
   - Check Clerk Dashboard for correct key (starts with `pk_test_` or `pk_live_`)

2. **CORS Errors**
   - Verify `CORS_ORIGIN=http://localhost:5173` in `backend/.env`
   - Ensure backend is running on port 5000
   - Check `VITE_API_URL=http://localhost:5000` in `frontend/.env`

3. **404 Not Found**
   - Backend: Ensure all routes are properly registered in `server.js`
   - Frontend: Check React Router route configuration in `routes.tsx`

4. **Build Errors**
   - Ensure Node.js 20.19+ or 22.12+ (required by Vite 7)
   - Delete `node_modules` and run `npm install` from root
   - Check for TypeScript errors: `npm run type-check -w frontend`

### Docker Issues

1. **Container Startup Failures**
   - Use `docker-compose --profile with-db up` for full stack
   - Check logs: `docker-compose logs <service-name>`
   - Rebuild images: `docker-compose up --build`

2. **Database Not Ready**
   - Wait for "database system is ready" message
   - Migrations run automatically via `migrator` service

### Workspace Issues

1. **Dependency Conflicts**
   - Run `npm install` from root directory (not workspaces)
   - Check `package.json` workspace configuration
   - Verify workspace names: `@rss-builder/backend`, `@rss-builder/frontend`

2. **Symlink Errors (Windows)**
   - Run terminal as Administrator
   - Or enable Developer Mode in Windows Settings

### Support

For issues and questions, please create an issue in the GitHub repository.
