<<<<<<< HEAD
# Project Setup

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/), [yarn](https://yarnpkg.com/), [pnpm](https://pnpm.io/), or [bun](https://bun.sh/) as your package manager

## Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd Call.Crafter
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

To build the app for production:

```bash
npm run build
```

To start the production server:

```bash
npm run start
```

## Linting

To check for linting errors:

```bash
npm run lint
```

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Recharts](https://recharts.org/)
- [TypeScript](https://www.typescriptlang.org/)
=======
# Call.Crafter
[AIConverse] is an AI-powered video call app with real-time calls, custom AI agents, and auto-generated summaries &amp; transcripts. Enjoy video playback, transcript search, and context-aware AI chat. Features secure auth, subscriptions, mobile-responsive design, and Git workflow with AI code reviews.
## Database Setup

This project uses [Drizzle ORM](https://orm.drizzle.team/) and [Neon Database](https://neon.tech/) for serverless PostgreSQL.

### 1. Install Database Packages

If not already installed, run:

```bash
npm install drizzle-orm drizzle-kit @neondatabase/serverless dotenv
```

### 2. Configure Environment Variables

Create a `.env` file in the project root with your Neon PostgreSQL connection string:

```
DATABASE_URL=postgresql://<username>:<password>@<host>/<database>?sslmode=require
```

Replace `<username>`, `<password>`, `<host>`, and `<database>` with your Neon credentials.

### 3. Database Migration & Studio

Push your schema to the database:

```bash
npm run db:push
```

Open Drizzle Studio to view/manage your database:

```bash
npm run db:studio
```

### 4. Update Schema

Edit your schema files (usually in `/drizzle` or `/db` folder) as needed. After changes, run `npm run db:push` again.

---

## New Install Packages

If you add new features, install packages using:

```bash
npm install <package-name>
```

For TypeScript types:

```bash
npm install -D @types/<package-name>
```

