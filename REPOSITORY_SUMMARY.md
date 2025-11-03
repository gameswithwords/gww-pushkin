# gww-pushkin Repository Summary

## Overview
This is a monorepo for the **Games With Words (GWW)** lab website, built using the Pushkin framework and deployed to AWS. Pushkin is a platform for conducting online behavioral experiments, particularly focused on language, cognition, and linguistics research.

**Project Name:** gww-test
**Root Domain:** gww.cherriechang.com
**Organization:** Games With Words
**Docker Hub ID:** cherriechang

---

## Repository Structure

### Root Level
```
gww-pushkin/
├── pushkin/              # Core Pushkin application (184M)
│   ├── api/             # Backend API service
│   ├── front-end/       # React frontend application
│   └── docker-compose.dev.yml
├── experiments/         # Directory for Pushkin experiments (empty)
├── ECStasks/           # AWS ECS task definitions
├── coreMigrations/     # Database migration scripts
├── e2e/               # End-to-end tests (Playwright)
├── users/             # User-related configurations and migrations
├── __mocks__/         # Jest mock files for testing
├── pushkin.yaml       # Main Pushkin configuration file
├── awsResources.js    # AWS resource tracking
├── package.json       # Root package config
└── [test configs]     # jest.config.js, playwright.config.js
```

---

## Core Architecture

### 1. Pushkin Configuration (`pushkin.yaml`)
Central configuration file that defines:
- **Directories:**
  - `experimentsDir: experiments` - Where experiments are stored
  - `coreDir: pushkin` - Core Pushkin application directory

- **Databases:**
  - **Local Development:**
    - `localtestdb` (port 5432) - Main test database
    - `localtransactiondb` (port 5433) - Transaction test database
  - **Production (AWS RDS):**
    - Main DB: `gwwtestMain` (host: gwwtestmain.c69a0wkg8vbj.us-east-1.rds.amazonaws.com)
    - Transaction DB: `gwwtestTransaction` (host: gwwtesttransaction.c69a0wkg8vbj.us-east-1.rds.amazonaws.com)

- **Add-ons:**
  - Forum: disabled (`useForum: false`)
  - Authentication: disabled (`useAuth: false`)

- **Site Info:**
  - Short name: GWW
  - Project name: gww-test
  - Email: info@gameswithwords.org
  - Hashtags: language, cognition, linguistics

### 2. Frontend (`pushkin/front-end/`)
**Technology Stack:**
- React 18.2.0 with React Router
- Redux for state management with Redux Saga for side effects
- Bootstrap 4 for styling (with react-bootstrap)
- Styled Components & Aphrodite for CSS-in-JS
- CRACO for Create React App configuration
- Axios for HTTP requests
- `pushkin-client` (v1.7.1) - Official Pushkin frontend library

**Key Files:**
- `src/config.js` - Configuration that switches between debug/production modes
  - Debug mode: Uses localhost or GitHub Codespaces
  - Production: Uses configured root domain (gww.cherriechang.com)
- `src/.pushkin.js` - Generated Pushkin config for frontend
- `experiments.js` - Defines available experiments
- `craco.config.js` - Custom webpack configuration

**Structure:**
```
src/
├── App.js              # Main application component
├── config.js           # Environment configuration
├── components/         # Reusable React components
├── pages/             # Page-level components
├── actions/           # Redux actions
├── reducers/          # Redux reducers
├── sagas/             # Redux-Saga side effects
├── assets/            # Static assets
└── utils/             # Utility functions
```

**Docker:**
- Uses Node 20.2 base image
- Runs on port 80 in production, 3000 in development
- Proxies API requests to `http://api:3000`

### 3. Backend API (`pushkin/api/`)
**Technology Stack:**
- Node.js 20.2
- `pushkin-api` (v1.6.0) - Official Pushkin backend library
- Babel for ES6+ transpilation
- RabbitMQ for message queuing (AMQP)

**Key Files:**
- `src/index.js` - Main API entry point
  - Initializes Pushkin API with port, AMQP address, and secret key
  - Loads controllers from `controllers.json`
  - Mounts controllers at different paths based on environment
  - Production: controllers at root path `/`
  - Development: controllers at `/api/`
- `src/controllers.json` - Defines API controller routes
- `dockerStart.sh` - Docker startup script

**Docker:**
- Uses Node 20.2 base image
- Builds using Babel transpilation
- Runs on port 3000 internally, 80 in production
- Includes netcat for health checks

### 4. Docker Compose (`pushkin/docker-compose.dev.yml`)
Defines local development environment with 5 services:

1. **api** - Backend API service
   - Port: 3000
   - Links to message-queue

2. **server** - Frontend server
   - Ports: 80 (HTTP), 433 (HTTPS - typo for 443)
   - Links to API

3. **message-queue** - RabbitMQ
   - Ports: 5672 (AMQP), 15672 (Management UI)
   - Uses persistent volume

4. **test_db** - PostgreSQL 11 (Main DB)
   - Port: 5432
   - Database: test_db
   - Persistent volume with health checks

5. **test_transaction_db** - PostgreSQL 11 (Transaction DB)
   - Port: 5433
   - Database: test_transaction_db
   - Persistent volume with health checks

---

## AWS Deployment

### AWS Resources (`awsResources.js`)
Tracks deployed AWS infrastructure:
- **ECS Cluster:** `gwwtest`
- **Load Balancer:** `gwwtestBalancer`
- **Target Group ARN:** Links to load balancer targets
- **CloudFront OAC:** `E32OCI1U3E5NM7`
- **RDS Databases:** gwwtestMain, gwwtestTransaction
- **IAM User:** cherriechang
- **Region:** us-east-1

### ECS Task Definitions (`ECStasks/`)

**`apiTask.yml`** - API service task:
```yaml
services:
  api:
    image: cherriechang/api:latest
    mem_limit: 128m
    environment:
      AMQP_ADDRESS: amqp://gwwtest:...@172.31.10.55:5672
      NODE_ENV: production
      PORT: 80
    logging: CloudWatch (awslogs)
```

**`rabbitTask.yml`** - RabbitMQ message queue task

**`ecs-params.yml`** - ECS-specific parameters

### Deployment Architecture
```
CloudFront (CDN)
    ↓
Application Load Balancer (gwwtestBalancer)
    ↓
ECS Cluster (gwwtest)
    ├── API Task (cherriechang/api:latest)
    │   └── Connects to RabbitMQ
    └── Frontend Task (cherriechang/server:latest)
    ↓
RDS PostgreSQL Databases
    ├── gwwtestMain (us-east-1)
    └── gwwtestTransaction (us-east-1)
```

---

## Database Management

### User Database (`users/`)
- `config.yaml` - Knex configuration for database connections
- `migrations/` - User-specific database migrations

### Core Migrations (`coreMigrations/`)
- `migrateTransactions.js` - Transaction database migration script

---

## Testing

### Unit Tests (Jest)
**Configuration:** `jest.config.js`
- Test environment: jsdom (browser-like)
- Coverage thresholds: 50% across all metrics
- Ignores: node_modules, public, e2e, .yalc
- Mock setup for CSS modules, images, axios, config, experiments

**Mock Files:** `__mocks__/`
- Mocks for file assets, axios, config, experiments

### End-to-End Tests (Playwright)
**Configuration:** `playwright.config.js`
- Test location: `e2e/**/*.test.js`
- Base URL: http://localhost
- Browsers: Chromium, Firefox, WebKit
- Parallel execution enabled
- Retry logic: 3 retries on CI

**Test Files:** `e2e/`
- `db.test.js` - Database connection tests
- `experiments.test.js` - Experiment functionality tests
- `site.test.js` - Basic site availability tests
- `transactions.test.js` - Transaction database tests
- `utils.js` - Test utilities
- `siteInfo.js` - Site information helpers

**Test Scripts:**
```bash
npm test        # Run Jest unit tests
npm run test:e2e # Run Playwright e2e tests
```

---

## Pushkin Bootstrap & Deployment Workflow

### 1. **Initial Setup (Bootstrap)**
Pushkin CLI generates the following structure:
- Creates `pushkin.yaml` with project configuration
- Scaffolds `pushkin/` directory with:
  - Frontend template (React app)
  - API template (Express/Pushkin API)
  - Docker Compose for local development
- Sets up database configurations (local + production)
- Generates `awsResources.js` to track AWS resources

### 2. **Local Development**
```bash
# Start all services (API, frontend, databases, message queue)
docker-compose -f pushkin/docker-compose.dev.yml up

# Services run on:
# - Frontend: http://localhost:80
# - API: http://localhost:3000
# - RabbitMQ Management: http://localhost:15672
# - Main DB: localhost:5432
# - Transaction DB: localhost:5433
```

### 3. **Building for Production**
```bash
# Frontend build
cd pushkin/front-end
yarn build  # Creates optimized production build

# API build
cd pushkin/api
yarn build  # Transpiles ES6+ to ES5 with Babel
```

### 4. **Docker Image Creation**
Pushkin builds Docker images for deployment:
```bash
# API image
docker build -t cherriechang/api:latest pushkin/api/

# Frontend/Server image
docker build -t cherriechang/server:latest pushkin/front-end/

# Push to Docker Hub
docker push cherriechang/api:latest
docker push cherriechang/server:latest
```

### 5. **AWS Infrastructure Provisioning**
Pushkin CLI automates AWS setup:

**a. RDS Databases:**
- Creates PostgreSQL instances for Main and Transaction DBs
- Updates `pushkin.yaml` with connection details
- Runs migrations for schema setup

**b. ECS Cluster:**
- Creates ECS cluster (`gwwtest`)
- Defines task definitions from `ECStasks/` directory
- Configures service memory, environment variables

**c. Load Balancer:**
- Creates Application Load Balancer (`gwwtestBalancer`)
- Configures target groups for ECS services
- Sets up health checks

**d. CloudFront:**
- Creates CloudFront distribution for CDN
- Configures Origin Access Control (OAC)
- Points to Load Balancer as origin

**e. IAM & Networking:**
- Creates necessary IAM roles for ECS tasks
- Sets up VPC, subnets, security groups
- Configures CloudWatch logging

### 6. **Deployment Process**
```bash
# Pushkin CLI handles deployment
pushkin deploy

# This typically:
# 1. Builds and pushes Docker images
# 2. Updates ECS task definitions
# 3. Forces new deployment of ECS services
# 4. Runs database migrations
# 5. Invalidates CloudFront cache if needed
```

### 7. **Configuration Management**
- `pushkin.yaml` - Single source of truth
- `pushkin/front-end/src/.pushkin.js` - Auto-generated from YAML
- Environment-specific configs in `config.js`
- AWS resource state tracked in `awsResources.js`

### 8. **Database Migrations**
```bash
# Run migrations (typically automated during deployment)
# Uses Knex migration files from:
# - users/migrations/ (user-specific)
# - coreMigrations/ (core system)
```

---

## Key Dependencies

### Root Level
- `@pushkin-templates/site-basic` (1.2.0) - Base Pushkin site template
- `jest`, `@playwright/test` - Testing frameworks
- `knex`, `pg` - Database client and query builder
- `js-yaml` - YAML parsing

### Frontend
- `pushkin-client` (1.7.1) - Pushkin frontend SDK
- `react`, `react-dom` (18.2.0)
- `redux`, `react-redux`, `redux-saga` - State management
- `react-router-dom` (5.1.2) - Routing
- `axios` (1.7.7) - HTTP client
- `bootstrap` (4.3.1), `react-bootstrap` (1.3.0) - UI framework

### Backend
- `pushkin-api` (1.6.0) - Pushkin backend SDK
- RabbitMQ client (via pushkin-api)
- Express (via pushkin-api)

---

## Development vs Production

### Debug Mode (Development)
- API Endpoint: `http://localhost/api`
- Frontend: `http://localhost`
- Uses local PostgreSQL databases (ports 5432, 5433)
- Docker Compose orchestration
- Hot reloading enabled

### Production Mode
- API Endpoint: `https://api.gww.cherriechang.com` (or configurable)
- Frontend: `https://gww.cherriechang.com`
- AWS RDS databases
- ECS container orchestration
- CloudFront CDN
- Environment variable: `NODE_ENV=production`

---

## Notable Configuration Details

1. **Customizable API Endpoint:** Can override default API URL in `pushkin.yaml`
2. **GitHub Codespaces Support:** Auto-detects Codespaces and adjusts URLs
3. **Microservices Architecture:** API, frontend, message queue run as separate services
4. **Database Separation:** Maintains separate databases for main data and transactions
5. **Message Queue:** RabbitMQ handles asynchronous task processing
6. **Logging:** CloudWatch logs for ECS tasks in production
7. **Health Checks:** PostgreSQL health checks in Docker Compose
8. **No Forum/Auth:** Currently disabled, but can be enabled via `pushkin.yaml`

---

## Repository Size Note
The repository is large primarily due to:
- `node_modules/` at root (128M)
- `pushkin/front-end/node_modules/` (~32M)
- `pushkin/api/node_modules/` (~8M)
- Total with dependencies: ~312M

The actual source code is relatively small (~2-3MB). Consider adding comprehensive `.gitignore` to exclude:
- `node_modules/`
- `build/` directories
- `.yalc/` directories
- Environment-specific files

---

## Quick Start Commands

### Local Development
```bash
# Install dependencies
npm install
cd pushkin/api && yarn install
cd ../front-end && yarn install

# Start local environment
docker-compose -f pushkin/docker-compose.dev.yml up

# Run tests
npm test              # Unit tests
npm run test:e2e      # E2E tests (requires running services)
```

### Production Deployment
```bash
# Build images
docker build -t cherriechang/api:latest pushkin/api/
docker build -t cherriechang/server:latest pushkin/front-end/

# Deploy (via Pushkin CLI)
pushkin deploy
```

---

## Summary
This repository represents a fully-featured Pushkin installation for the Games With Words research lab. It demonstrates the complete Pushkin workflow from local development with Docker Compose to production deployment on AWS using ECS, RDS, Load Balancers, and CloudFront. The structure follows Pushkin conventions with clear separation between frontend, API, experiments, and infrastructure configuration.
