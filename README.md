# RSS Builder

A modern RSS feed aggregation and management system built with Node.js, Express 5, and PostgreSQL. This application allows you to manage RSS feeds, sources, and automatically sync content from various RSS sources.

## 🚀 Features

- **RSS Feed Management**: Create, update, and manage RSS feeds
- **Source Management**: Add and manage RSS sources for each feed
- **Automatic Synchronization**: Background scheduler that periodically syncs RSS sources
- **REST API**: Full RESTful API with comprehensive endpoints
- **API Documentation**: Interactive Swagger UI documentation
- **Database Migrations**: Knex.js powered database migrations
- **Security**: API key authentication and basic auth for documentation
- **Health Checks**: Built-in health check endpoints
- **Docker Support**: Multi-stage Dockerfile with separate services
- **Development Tools**: ESLint, Prettier, Husky git hooks

## 🛠️ Tech Stack

- **Runtime**: Node.js 20
- **Framework**: Express 5
- **Database**: PostgreSQL
- **ORM**: Knex.js
- **Authentication**: API Key + Basic Auth
- **Documentation**: Swagger UI
- **Containerization**: Docker + Docker Compose
- **Code Quality**: ESLint, Prettier, Husky
- **Logging**: Morgan
- **Scheduling**: node-cron

## 📋 Prerequisites

- Node.js 20 or higher
- PostgreSQL database
- Docker and Docker Compose (for containerized deployment)

## 🔧 Installation

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

3. **Environment Setup**
   Create a `.env` file in the root directory:

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

   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start

   # Start scheduler separately
   npm run start:scheduler
   ```

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

## 📚 API Documentation

Once the application is running, access the interactive API documentation at:

- **Swagger UI**: `http://localhost:5000/api-docs`
- **Health Check**: `http://localhost:5000/live`

### Authentication

The API uses API key authentication. Include the API key in the request headers:

```bash
curl -H "X-API-Key: your_api_key_here" http://localhost:5000/api/feeds
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

- **feeds**: RSS feed definitions
- **sources**: RSS source URLs for each feed
- **entries**: Individual RSS entries from sources

## 🔄 Available Scripts

| Command                       | Description                                |
| ----------------------------- | ------------------------------------------ |
| `npm start`                   | Start the API server                       |
| `npm run dev`                 | Start in development mode with auto-reload |
| `npm run start:scheduler`     | Start the RSS synchronization scheduler    |
| `npm run lint`                | Run ESLint                                 |
| `npm run lint:fix`            | Fix ESLint issues automatically            |
| `npm run format`              | Format code with Prettier                  |
| `npm run format:check`        | Check code formatting                      |
| `npm run migrate:make <name>` | Create a new migration                     |
| `npm run migrate:run`         | Run pending migrations                     |
| `npm run migrate:rollback`    | Rollback last migration                    |
| `npm run migrate:init`        | Initialize database schema                 |
| `npm run swagger`             | Generate API documentation                 |
| `npm run docker:up`           | Start PostgreSQL container                 |
| `npm run docker:down`         | Stop PostgreSQL container                  |

## 🏗️ Project Structure

```
rss-builder/
├── src/
│   ├── config/
│   │   └── database.js          # Database configuration
│   ├── features/
│   │   ├── feeds/               # Feed management endpoints
│   │   │   ├── addFeed.js
│   │   │   ├── deleteFeed.js
│   │   │   ├── findFeed.js
│   │   │   ├── listFeeds.js
│   │   │   └── routes.js
│   │   └── sources/             # Source management endpoints
│   │       ├── addSource.js
│   │       ├── deleteSource.js
│   │       ├── findSource.js
│   │       ├── listSources.js
│   │       ├── syncSources.js
│   │       └── routes.js
│   ├── middlewares/
│   │   ├── errorHandler.js      # Global error handling
│   │   ├── paginationParam.js   # Pagination middleware
│   │   ├── schemaValidator.js   # Request validation
│   │   └── securityHandler.js   # Authentication middleware
│   ├── utils/
│   │   └── validation.js        # Validation schemas
│   ├── scheduler.js             # RSS sync scheduler
│   └── server.js               # Main application server
├── migrations/                  # Database migrations
├── requests/                   # HTTP request examples
├── docker-compose.yml          # Docker services configuration
├── Dockerfile                  # Multi-stage Docker build
├── knexfile.js                # Database configuration
└── package.json               # Project dependencies and scripts
```

## 🐳 Docker Services

The application uses a multi-stage Dockerfile with three services:

- **API Server** (`rss-builder-api`): Main REST API service
- **Scheduler** (`rss-builder-scheduler`): Background RSS synchronization service
- **Migrator** (`migrator`): Database migration service

## 🔐 Security Features

- API key authentication for all API endpoints
- Basic authentication for Swagger documentation
- Non-root user in Docker containers
- Input validation with Yup schemas
- Error handling middleware

## 📊 Monitoring

- Health check endpoint at `/live`
- Request logging with Morgan
- Docker health checks for all services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `npm run commit` (uses commitizen)
4. Push to branch: `git push origin feature/your-feature`
5. Create a Pull Request

## 📄 License

This project is licensed under the Apache License. See the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Ensure PostgreSQL is running
   - Check connection string format
   - Verify database credentials

2. **Migration Errors**
   - Run `npm run migrate:init` first
   - Check database schema permissions
   - Ensure database exists

3. **Docker Issues**
   - Use `docker-compose --profile with-db up` for full stack
   - Check Docker logs: `docker-compose logs <service-name>`
   - Rebuild images: `docker-compose up --build`

### Support

For issues and questions, please create an issue in the GitHub repository.
