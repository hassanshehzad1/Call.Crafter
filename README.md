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
## Dashboard Navbar

The Dashboard Navbar provides navigation and user actions for authenticated users in the dashboard area. It is designed to be responsive and integrates with the sidebar and user profile features.

---

### Features

- **User Profile Button:** Shows the logged-in user's avatar, name, and email. Supports logout and billing actions.
- **Command Dialog:** Quick search for meetings or agents using a command palette.
- **Responsive Design:** Adapts to mobile and desktop layouts.
- **Integration:** Works with the sidebar and main dashboard layout.

---

### Key Components

#### 1. DashboardUserButton

- Displays the user's avatar (or generated initials), name, and email.
- On mobile, uses a drawer for profile actions; on desktop, uses a dropdown menu.
- Provides "Billing" and "Logout" actions.
- Uses `authClient.useSession()` to get user data and `authClient.signOut()` for logout.

**Example Usage:**

```tsx
import DashboardUserButton from "@/modules/Dashboard/UI/Components/dashboard-user-button";

<DashboardUserButton />
```

#### 2. DashboardCommand

- Renders a command dialog for quick navigation/search.
- Includes an input field and a list of command items.
- Controlled via `open` and `setOpen` props.

**Example Usage:**

```tsx
import DashboardCommand from "@/modules/Dashboard/UI/Components/dashboard-command";

<DashboardCommand open={open} setOpen={setOpen} />
```

#### 3. Layout Integration

The dashboard layout wraps the sidebar, navbar, and main content:

```tsx
import DashboardSideBar from "@/modules/Dashboard/UI/Components/dashboard-sidebar";
import DashboardNavbar from "./dashboard-navbar";

<SidebarProvider>
  <DashboardSideBar />
  <main className="flex-1 bg-muted overflow-auto">
    <DashboardNavbar />
    {children}
  </main>
</SidebarProvider>
```

---

### User Experience

- Users can access their profile, billing, and logout from the navbar.
- The command dialog enables fast navigation.
- The navbar is always visible for quick access to dashboard features.

---

For further customization, see the code in `src/modules/Dashboard/UI/Components/` and update the UI or logic

## tRPC Integration

Call.Crafter uses [tRPC](https://trpc.io/) for typesafe, end-to-end API communication between the client and server. This enables you to call backend functions directly from your frontend code with full TypeScript support—no REST or GraphQL schemas required.

---

### How tRPC Works in This Project

- **Routers:** Define API endpoints and business logic in `src/trpc/routers/`.
- **Server Initialization:** The tRPC server is set up in `src/trpc/server.tsx` and exposed via Next.js API routes (see `src/app/api/trpc/[trpc]/route.ts`).
- **Client Initialization:** The tRPC client is created in `src/trpc/client.tsx` and used throughout your React components.
- **React Query Integration:** tRPC hooks use [TanStack Query](https://tanstack.com/query/latest) for caching, loading states, and error handling.

---

### Example: Defining a tRPC Router

**File:** `src/trpc/routers/_app.ts`

```typescript
import { initTRPC } from '@trpc/server';

const t = initTRPC.create();

export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello, ${input.text}!` };
    }),
  // Add more procedures here...
});

export type AppRouter = typeof appRouter;
```

---

### Example: Server Setup

**File:** `src/trpc/server.tsx`

```typescript
import { appRouter } from './routers/_app';

export const trpcServer = appRouter;
```

**File:** `src/app/api/trpc/[trpc]/route.ts`

```typescript
import { trpcServer } from '@/trpc/server';
import { createNextApiHandler } from '@trpc/server/adapters/next';

export default createNextApiHandler({
  router: trpcServer,
  createContext: () => ({}),
});
```

---

### Example: Client Setup

**File:** `src/trpc/client.tsx`

```typescript
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './routers/_app';

export const trpc = createTRPCReact<AppRouter>();
```

---

### Example: Using tRPC in a React Component

**File:** `src/modules/Home/UI/Views/home-views.tsx`

```tsx
"use client";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const HomeView = () => {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.hello.queryOptions({ text: "Antonio" }));

  return (
    <div className="flex flex-col gap-4 gap-y-4">
      {data?.greeting}
    </div>
  );
};

export default HomeView;
```

**Explanation:**
- `useTRPC()` gets the tRPC client instance.
- `trpc.hello.queryOptions({ text: "Antonio" })` calls the `hello` procedure defined in your router.
- The result (`data.greeting`) is rendered in the UI.

---

### Adding New Endpoints

1. **Create a new procedure** in `src/trpc/routers/_app.ts`:
   ```typescript
   userInfo: t.procedure
     .input(z.object({ userId: z.string() }))
     .query(async ({ input }) => {
       // Fetch user info from DB
       return { name: "John Doe", id: input.userId };
     }),
   ```
2. **Call it from your React component**:
   ```tsx
   const { data } = useQuery(trpc.userInfo.queryOptions({ userId: "123" }));
   ```

---

### Benefits

- **Typesafe:** End-to-end type safety between client and server.
- **No REST/GraphQL:** Direct function calls, no manual API schemas.
- **React Query:** Built-in caching, loading, and error states.
- **Easy to Extend:** Add new endpoints by updating your router.

---

For more details, see the code in `src/trpc/` and visit the [tRPC documentation](https://trpc.io/docs)

## Agents Module

The Agents module in Call.Crafter allows users to manage custom AI agents. It provides backend procedures for fetching agent data and frontend views for displaying, loading, and error states.

---

### Database Schema

Agents are stored in the `agents` table, defined in `src/db/schema.ts`:

```typescript
export const agents = pgTable("agents", {
  id: text("id").primaryKey().$defaultFn(() => nanoid()),
  name: text("name").notNull(),
  userId: text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  instructions: text("instructions").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

---

### Backend: tRPC Procedure

Agent-related API endpoints are defined in `src/modules/agents/server/procedure.ts`:

```typescript
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure } from "@/trpc/init";

export const agentsRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);
    return data;
  }),
});
```

- **getMany:** Fetches all agents from the database.

---

### Frontend: Agent Views

Agent data is displayed using React components in `src/app/(dashboard)/agents/ui/views/agent-view.tsx`:

```tsx
"use client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import LoadingState from "@/components/loading-state";
import ErrorState from "@/components/error-state";

export const AgentView = () => {
  const trpc = useTRPC();
  const { data, isLoading, isError } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions()
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

// Loading state
export const AgentViewLoading = () => (
  <LoadingState
    title="Fetching your Agents"
    description="This may take a moment as we prepare the latest details for you. Sit back and relax!"
  />
);

// Error state
export const AgentsViewError = () => (
  <ErrorState
    title="Oops! Trouble Loading Your Agents 😔"
    description="Something went wrong on our end, but don’t worry—we’re working to fix it. Please try again in a moment or contact support if the issue persists!"
  />
);
```

---

### Page Integration

The agents dashboard page integrates loading, error, and data views:

```tsx
import {
  AgentsViewError,
  AgentView,
  AgentViewLoading,
} from "./ui/views/agent-view";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import LoadingState from "@/components/loading-state";
import { ErrorBoundary } from "react-error-boundary";

const page = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentViewLoading />}>
        <ErrorBoundary fallback={<AgentsViewError />}>
          <AgentView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default page;
```

---

### Example Usage

- **Fetching Agents:**  
  The frontend calls `trpc.agents.getMany.queryOptions()` to fetch all agents.
- **Loading State:**  
  While fetching, `AgentViewLoading` is shown.
- **Error State:**  
  If fetching fails, `AgentsViewError` is displayed.
- **Display:**  
  On success, agent data is rendered as JSON.

---

### Extending Agents

To add more agent features (create, update, delete):

1. **Add new procedures** in `procedure.ts` (e.g., `create`, `update`, `delete`).
2. **Create corresponding frontend forms and views**.
3. **Update the
## Command Palette (DashboardCommand)

Call.Crafter includes a Command Palette feature for quick navigation and search, inspired by modern productivity apps. This is implemented using the `cmdk` library and custom UI components.

---

### Features

- **Keyboard-driven search:** Quickly find meetings, agents, or other dashboard items.
- **Responsive UI:** Uses a modal dialog on desktop and a drawer on mobile devices.
- **Customizable:** Easily add more command items or actions.

---

### Main Components

#### 1. Command UI Library

Located in `src/components/ui/command.tsx`, this library provides:

- `CommandDialog` and `CommandResponsiveDialog`: Modal/drawer wrappers for the palette.
- `CommandInput`: Search input field.
- `CommandList`: List container for command items.
- `CommandItem`: Individual command/action.
- `CommandGroup`, `CommandSeparator`, `CommandShortcut`: For grouping and organizing commands.

#### 2. DashboardCommand

Located in `src/modules/Dashboard/UI/Components/dashboard-command.tsx`, this component renders the palette:

```tsx
import {
  CommandResponsiveDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const DashboardCommand = ({ open, setOpen }: Props) => (
  <CommandResponsiveDialog open={open} onOpenChange={setOpen}>
    <CommandInput placeholder="Find a meeting or agent" />
    <CommandList>
      <CommandItem>Test</CommandItem>
      {/* Add more CommandItem components for actual actions */}
    </CommandList>
  </CommandResponsiveDialog>
);

export default DashboardCommand;
```

---

### Example Usage

**Basic Integration:**

```tsx
const [open, setOpen] = React.useState(false);

<DashboardCommand open={open} setOpen={setOpen} />
<button onClick={() => setOpen(true)}>Open Command Palette</button>
```

**Customizing Commands:**

Add more `<CommandItem>` components inside `<CommandList>` to provide additional actions, such as navigating to meetings, agents, or other dashboard features.

---

### Responsive Design

- On desktop: Appears as a modal dialog.
- On mobile: Appears as a bottom drawer.

This is handled automatically by the `CommandResponsiveDialog` component using the `useIsMobile` hook.

---

### Extending

- Add filtering, keyboard shortcuts, or more advanced search logic as needed.
- Group commands using `<CommandGroup>` and separate them with `<CommandSeparator>`.

---

For more details, see the code in `src/components/ui/command.tsx` and `src/modules/Dashboard/UI/Components/dashboard-command.tsx`.

## Agent Form

The Agent Form is used to create or update AI agents in Call.Crafter. It provides a user-friendly interface with validation, avatar generation, and feedback for success or errors.

---

### Features

- **Create and Edit Agents:** Supports both new agent creation and editing existing agents.
- **Validation:** Uses Zod and React Hook Form for robust input validation.
- **Avatar Generation:** Displays a generated avatar based on the agent's name.
- **Instructions Field:** Allows users to specify custom instructions for the agent.
- **Feedback:** Shows loading, error, and success states using toast notifications.
- **Cancel and Submit Buttons:** Lets users cancel or submit the form.

---

### Example Usage

**File:** `src/modules/agents/ui/components/agent-form.tsx`

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { agentsInsertSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { toast } from "sonner";

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues,
}) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.agents.getMany.queryOptions());
        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues?.id })
          );
        }
        onSuccess?.();
      },
      onError: (err) => {
        toast.error(err.message);
        // Optionally redirect if error is FORBIDDEN
      },
    })
  );

  const form = useForm({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending;

  const onSubmit = (values) => {
    if (isEdit) {
      // TODO: Implement update logic
      console.log("TODO: update Agent");
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GeneratedAvatar
          seed={form.watch("name")}
          variant="botttsNeutral"
          className="border size-16"
        />

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Agent" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="instructions"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instructions</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Agent Instructions" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button
              variant="ghost"
              disabled={isPending}
              type="button"
              onClick={() => onCancel()}
            >
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
```

---

### How It Works

- **Form Validation:** Uses Zod schema (`agentsInsertSchema`) for validating agent name and instructions.
- **Avatar:** The avatar updates live as the user types the agent's name.
- **Submission:** On submit, calls the tRPC mutation to create or update the agent.
- **Success:** Invalidates agent queries and calls `onSuccess` callback.
- **Error:** Shows a toast notification if the mutation fails.
- **Cancel:** Calls `onCancel` callback if provided.

---

### Integration Example

To use the Agent Form in a dialog:

```tsx
import ResponsiveDialog from "@/components/responsive-dialog";
import { AgentForm } from "@/modules/agents/ui/components/agent-form";

<ResponsiveDialog
  title="New Agent"
  description="Create a new Agent"
  open={isDialogOpen}
  onOpenChange={setIsDialogOpen}
>
  <AgentForm
    onSuccess={() => setIsDialogOpen(false)}
    onCancel={() => setIsDialogOpen(false)}
  />
</ResponsiveDialog>
```

---

### Extending

- Add more fields to the schema and form as needed.
- Implement the update logic for editing agents.
- Customize validation and feedback messages.

---

For more details, see the code in `src/modules/agents/ui/components/agent-form.tsx`.
## Agent Data Table

The Agent Data Table displays a list of agents in a structured, interactive table format. It uses [TanStack Table](https://tanstack.com/table/v8) for flexible rendering and supports custom columns, avatars, and row actions.

---

### Features

- **Custom Columns:** Shows agent name, instructions, and meeting count.
- **Avatar Integration:** Displays a generated avatar for each agent.
- **Row Clicks:** Supports row click actions for navigation or selection.
- **Empty State:** Shows a message when there are no agents.
- **Responsive Design:** Table adapts to different screen sizes.

---

### Example Usage

**File:** `src/modules/agents/ui/components/data-table.tsx`

```tsx
import { DataTable } from "@/modules/agents/ui/components/data-table";
import { columns } from "@/modules/agents/ui/components/columns";

// Example data
const agents = [
  {
    id: "1",
    name: "SupportBot",
    instructions: "Help users with support queries.",
    MeetingCount: 5,
  },
  // ...more agents
];

<DataTable columns={columns} data={agents} onRowClick={(agent) => {
  // Handle row click, e.g., navigate to agent details
}} />
```

---

### Column Definitions

**File:** `src/modules/agents/ui/components/columns.tsx`

```tsx
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge, CornerDownRightIcon, VideoIcon } from "lucide-react";

export const columns = [
  {
    accessorKey: "name",
    header: "Agent Name",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2">
          <GeneratedAvatar
            variant="botttsNeutral"
            seed={row.original.name}
            className="size-6"
          />
          <span className="font-semibold capitalize">{row.original.name}</span>
        </div>
        <div className="flex items-center gap-x-2">
          <CornerDownRightIcon className="size-3 text-muted-foreground" />
          <span className="text-sm text-muted-foreground max-w-[200px] truncate capitalize">
            {row.original.instructions}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "MeetingCount",
    header: "Meetings",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className="flex items-center gap-x-2.5 [&>svg]:size-4"
      >
        <VideoIcon className="text-blue-700" />
        {row.original.MeetingCount} Meetings
      </Badge>
    ),
  },
];
```

**Note:**  
Make sure to use parentheses `()` in the `cell` render function to return JSX.

---

### DataTable Component

**File:** `src/modules/agents/ui/components/data-table.tsx`

- Uses `useReactTable` from TanStack Table.
- Renders rows and cells using `flexRender`.
- Handles empty state with a friendly message.

---

### Extending

- Add more columns for additional agent properties.
- Implement sorting, filtering, or pagination as needed.
- Customize row click behavior for navigation or actions.

---

For more details, see the code in `src/modules/agents/ui/components/data-table.tsx` and `columns.tsx`.