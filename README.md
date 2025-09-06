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
## Authentication UI: Sign In & Sign Up

This project features modern, accessible authentication forms built with React, Zod, React Hook Form, and Better Auth.

---

### Sign In View

**File:** `src/modules/auth/ui/views/sign-in-view.tsx`

#### Features

- **Email & Password Authentication:** Users sign in with their email and password.
- **Validation:** Uses Zod to ensure valid email format and password length.
- **Error Handling:** Displays error messages for invalid credentials or server errors.
- **Loading State:** Disables the submit button while authenticating.
- **Social Login Buttons:** Google and GitHub buttons (integration required).
- **Responsive Design:** Adapts to mobile and desktop screens.
- **Terms & Privacy:** Shows links to terms and privacy policy.

#### How It Works

1. **Form Schema:**  
   ```tsx
   const formSchema = z.object({
     email: z.string().min(2, { message: "Email is required" }).email("Not a valid email"),
     password: z.string().min(6, { message: "Password must be at least 6 characters." }),
   });
   ```
   - Ensures the user enters a valid email and a password with at least 6 characters.

2. **Form Handling:**  
   Uses React Hook Form with Zod resolver for validation:
   ```tsx
   const form = useForm<z.infer<typeof formSchema>>({
     resolver: zodResolver(formSchema),
     defaultValues: { email: "", password: "" },
   });
   ```

3. **Submission Logic:**  
   Calls Better Auth’s client to sign in:
   ```tsx
   authClient.signIn.email(
     { email: data.email, password: data.password },
     {
       onSuccess: () => { setPending(false); router.push("/"); },
       onError: ({ error }) => { setPending(false); setError(error.message); },
     }
   );
   ```
   - On success, redirects to the home page.
   - On error, displays the error message.

4. **UI Elements:**  
   - Email and password fields with validation messages.
   - Error alerts using `<Alert>` if authentication fails.
   - Social login buttons (Google, GitHub).
   - Link to the sign-up page for new users.
   - Terms and privacy policy links.

#### Example Usage

1. Enter your email and password.
2. Click **Sign In**.
3. If credentials are correct, you’re redirected to the home page.
4. If not, an error message appears.

---

### Sign Up View

**File:** `src/modules/auth/ui/views/sign-up-view.tsx`

#### Features

- **Fields:** Name, email, contact, password, confirm password.
- **Validation:** Ensures all fields are filled, email is valid, passwords match, and contact is at least 10 characters.
- **Error Handling:** Displays error messages for invalid input or server errors.
- **Loading State:** Disables the submit button while registering.
- **Responsive Design:** Adapts to mobile and desktop screens.
- **Terms & Privacy:** Shows links to terms and privacy policy.

#### How It Works

1. **Form Schema:**  
   ```tsx
   const formSchema = z.object({
     name: z.string().min(2, { message: "Name is required" }),
     email: z.string().min(2, { message: "Email is required" }).email("Not a valid email"),
     contact: z.string().min(10, { message: "Contact is required" }),
     password: z.string().min(6, { message: "Password must be at least 6 characters." }),
     confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
   }).refine((data) => data.password === data.confirmPassword, {
     message: "Passwords do not match",
     path: ["confirmPassword"],
   });
   ```
   - Validates all fields and ensures passwords match.

2. **Form Handling:**  
   Uses React Hook Form with Zod resolver for validation.

3. **Submission Logic:**  
   Calls Better Auth’s client to register:
   ```tsx
   authClient.signIn.email(
     { email: data.email, password: data.password },
     {
       onSuccess: () => { setPending(false); router.push("/"); },
       onError: ({ error }) => { setPending(false); setError(error.message); },
     }
   );
   ```
   - On success, redirects to the home page.
   - On error, displays the error message.

4. **UI Elements:**  
   - Name, email, contact, password, and confirm password fields.
   - Error alerts for validation and server errors.
   - Terms and privacy policy links.

#### Example Usage

1. Enter your name, email, contact, password, and confirm password.
2. Click **Sign Up**.
3. If registration is successful, you’re redirected to the home page.
4. If not, an error message appears.

---

### UI/UX Highlights

- **Accessibility:** Semantic HTML and accessible form controls.
- **Visual Feedback:** Loading states and error alerts.
- **Navigation:** Easy links between sign-in and sign-up views.
- **Customizable:** Easily extend fields or validation as needed.

---

For further customization, see the code in `src/modules/auth/ui/views/` and update the API integration as needed.

## Social Authentication (Google & GitHub)

Call.Crafter supports social login using Google and GitHub, allowing users to sign in or sign up quickly and securely.

---

### How Social Auth Works

- Users click the **Google** or **GitHub** button on the sign-in or sign-up page.
- The app calls `authClient.signIn.social` with the selected provider.
- The authentication flow redirects the user to the provider’s OAuth page.
- On success, the user is redirected back and logged in.

---

### Example: Social Sign In

**File:** `src/modules/auth/ui/views/sign-in-view.tsx`

```tsx
const onSocial = (provider: "google" | "github") => {
  setError(null);
  setPending(true);

  authClient.signIn.social(
    {
      provider: provider,
      callbackURL: "/",
    },
    {
      onSuccess: () => {
        setPending(false);
      },
      onError: ({ error }) => {
        setPending(false);
        setError(error.message);
      },
    }
  );
};
```

- **provider:** `"google"` or `"github"` depending on the button clicked.
- **callbackURL:** Where to redirect after successful login.

**UI Example:**

```tsx
<Button
  disabled={pending}
  onClick={() => onSocial("google")}
  variant="outline"
  type="button"
  className="w-full"
>
  <FaGoogle />
</Button>
<Button
  disabled={pending}
  onClick={() => onSocial("github")}
  variant="outline"
  type="button"
  className="w-full"
>
  <FaGithub />
</Button>
```

---

### Example: Social Sign Up

**File:** `src/modules/auth/ui/views/sign-up-view.tsx`

```tsx
const onSocial = (provider: "google" | "github") => {
  setError(null);
  setPending(true);

  authClient.signIn.social(
    {
      provider: provider,
      callbackURL: "/",
    },
    {
      onSuccess: () => {
        setPending(false);
      },
      onError: ({ error }) => {
        setPending(false);
        setError(error.message);
      },
    }
  );
};
```

---

### Configuration

To enable social authentication, set up your OAuth credentials:

- **Google:**  
  - Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in your `.env` file.
- **GitHub:**  
  - Set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in your `.env` file.

Example `.env`:

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

---

### User Experience

- Users can choose to sign in or sign up with Google or GitHub.
- If authentication fails, an error message is displayed.
- On success, users are redirected to the home page.

---

For further customization, see the code