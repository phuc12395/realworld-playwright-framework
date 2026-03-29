## Introduction

A scalable, API-first E2E automation framework demonstrating modern SDET practices, such as:
- API-driven test data setup
- Minimal, intent-focused UI testing
- Deterministic and isolated test execution

Built on top of React / Vite + SWC / Express.js / Sequelize / PostgreSQL codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://realworld.io/) spec and API.

## Acknowledgement

This project does not include the development of the FE/BE stack (Realworld); My contributions focus on:
- Playwright-based automation framework
- End-to-end and API test design
- Bug discovery and fixes
- Improving testability of the system

Links to original repositories:
- [RealWorld (GitHub)](https://github.com/gothinkster/realworld)
- [conduit-realworld-example-app](https://github.com/TonyMckes/conduit-realworld-example-app)

## Tech stack
**System Under Test:**
- React (Vite + SWC)
- Express.js
- Sequelize
- PostgreSQL

**Automation:**
- Playwright
- Node.js

## Getting Started

These instructions will help you install and run the *System Under Test* on your local machine (localhost:3000 with default port settings)

### Prerequisites

Before you run the project, make sure that you have the following tools and software installed on your computer:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/) `v18.11.0+`
- [NPM](https://www.npmjs.com/) (usually included with Node.js)
- [Docker](https://www.docker.com/) (to run a containerized local db instance on your machine)
- [Postgresql](https://www.postgresql.org/) (If running DB natively without Docker)

### Installation

To install the project on your computer, follow these steps:

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/phuc12395/realworld-playwright-framework
   ```

2. Navigate to the project directory.

   ```bash
   cd realworld-playwright-framework
   ```

3. Install project dependencies by running the command:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file under /backend directory of the project (same level where [`.env.example`](backend/.env.example) is located)
2. Add the required environment variables as specified in the [`.env.example`](backend/.env.example) file
3. (Optional) update the Sequelize configuration parameters in the [`config.js`](backend/config/config.js) file
4. If you are **not** using PostgreSQL, you may also have to install the driver for your database:

   <details>
   <summary>Use one of the following commands to install:</summary><br/>

   > Note: `-w backend` option is used to install it in the backend [`package.json`](backend/package.json).

   ```bash
   npm install -w backend pg pg-hstore  # Postgres (already installed)
   npm install -w backend mysql2
   npm install -w backend mariadb
   npm install -w backend sqlite3
   npm install -w backend tedious       # Microsoft SQL Server
   npm install -w backend oracledb      # Oracle Database
   ```

   > :information_source: Visit [Sequelize - Installing](https://sequelize.org/docs/v6/getting-started/#installing) for more infomation.

   ***

   </details>

5. Make sure you already have Docker Desktop app running

6. Run docker compose to spin up a Docker container instance locally on your machine
   ```bash
   docker-compose up -d
   ```

7. Ensure the following values match between `.env` and `docker-compose.yml`:
- DB username
- DB password
- DB name
- Port (default: 5432)

Example:
- `.env`: DEV_DB_HOSTNAME=127.0.0.1
- docker-compose: ports: "5432:5432"

8. Create database specified by configuration by executing

   ```bash
   npm run sqlz -- db:create
   ```

   > :information_source: The command `npm run sqlz` is an alias for `npx -w backend sequelize-cli`.  
   > Execute `npm run sqlz -- --help` to see more of `sequelize-cli` commands availables.

9. Run db:migrate command to create all necessary tables and columns (see /backend/models for more details)

   ```bash
   npm run sqlz -- db:migrate
   ```

10. Optionally you can run the following command to populate your database with some dummy data:

   ```bash
   npm run sqlz -- db:seed:all
   ```

### Development Server
To run the System-under-test, follow these steps:

1. Start the development server by executing the command: (this will execute several npm command concurrently, see `scripts` section in `package.json` for more details)
   ```bash
   npm run dev
   ```

2. Open a web browser and navigate to:
   - Home page should be available at [`http://localhost:3000/`](http://localhost:3000).
   - API endpoints should be available at [`http://localhost:3001/api`](http://localhost:3001/api).


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.