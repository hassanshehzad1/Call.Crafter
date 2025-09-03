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


## User Authentication (Better Auth)

This project uses [Better Auth](https://www.npmjs.com/package/better-auth) for secure, flexible authentication with email/password support and Drizzle ORM for database integration.

### Server-Side Authentication Setup

**File:** `src/lib/auth.ts`

```typescript
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance

import * as schema from "@/db/schema"; // import all your tables to ensure they are registered
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      ...schema,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
});
```

**Explanation:**

- `betterAuth`: Main function to configure authentication.
- `drizzleAdapter`: Connects Better Auth to your Drizzle ORM database.
- `db`: Your Drizzle database instance.
- `schema`: Imports all your database tables (users, sessions, etc.) for registration.
- `provider: "pg"`: Specifies PostgreSQL (Neon) as your database.
- `emailAndPassword: { enabled: true }`: Enables email/password authentication.

### Client-Side Authentication Setup

**File:** `src/lib/auth-client.ts`

```typescript
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseUrl: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});
```

**Explanation:**

- `createAuthClient`: Initializes the client-side authentication API.
- `baseUrl`: Sets the API endpoint for authentication requests. Uses `BETTER_AUTH_URL` from environment variables or defaults to `http://localhost:3000`.

### Example: Sign Up with Email & Password

**API Route:** `POST /api/auth/sign-up/email`

**Request Example:**

```http
POST /api/auth/sign-up/email
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "yourStrongPassword"
}
```

**Response Example:**

```json
{
  "success": true,
  "user": {
    "id": "user_id",
    "email": "user@example.com"
  }
}
```

### Example: Client Usage

**Sign Up Form Example (React):**

```tsx
import { authClient } from "@/lib/auth-client";

async function handleSignUp(email: string, password: string) {
  const result = await authClient.signUpWithEmail({ email, password });
  if (result.success) {
    // User signed up successfully
  } else {
    // Handle error (result.error)
  }
}
```

### Notes

- Ensure your database is migrated and `.env` contains the correct `DATABASE_URL`.
- You can customize authentication flows using Better Auth’s API.
- For advanced features (sessions, password reset, etc.), see [Better Auth documentation](https://www.npmjs.com/package/better-auth).

---
