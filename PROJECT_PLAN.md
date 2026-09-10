# Comprehensive System Architecture & Project Plan

## 1. Executive Summary & Architecture Philosophy
This document outlines the architecture and implementation plan for the Department of Computer Science Website, which includes a public-facing portal and a secure, database-backed Content Management System (CMS) Admin Dashboard. 

**Architectural Guarantees:**
- **Server-First Data Fetching:** Leveraging Next.js App Router Server Components to fetch data on the server, eliminating client-side waterfalls and loading spinners while improving SEO.
- **Secure Mutations:** Utilizing Server Actions for all database writes (CRUD operations), ensuring that sensitive logic remains securely on the server and avoiding the need for boilerplate REST APIs.
- **Type Safety:** End-to-end type safety enforced by TypeScript, Prisma (database modeling), and Zod (runtime validation).
- **Dual-Hosting Compatibility:** The application is architected to run flawlessly in both ephemeral Serverless environments (like Vercel) and persistent environments (like a custom VPS or Docker container) without altering the source code.

## 2. The Technology Stack & Justification
- **Framework:** **Next.js (App Router)**
  - *Why:* Provides native support for React Server Components (RSC) and Server Actions, radically simplifying the data-fetching and mutation lifecycle. It enables automatic code splitting, optimized image loading, and built-in edge routing capabilities.
- **Database ORM:** **Prisma**
  - *Why:* Offers a heavily typed, developer-friendly schema definition that automatically generates TypeScript types. It easily handles migrations and provides an intuitive API for interacting with the database.
- **Database Engine:** **PostgreSQL**
  - *Why:* A robust, production-ready relational database that is universally supported. It functions perfectly via connection pooling in serverless managed platforms (e.g., Neon, Supabase) and is easy to self-host on a VPS via Docker.
- **Authentication:** **NextAuth.js (Credentials Provider + JWT)**
  - *Why:* The standard for Next.js authentication. By using a JWT strategy (storing the session in an encrypted cookie), we eliminate the need for a database session table lookup on every request, which is crucial for serverless performance and edge middleware compatibility.
- **Asset Storage:** **`@aws-sdk/client-s3`**
  - *Why:* Vercel's filesystem is ephemeral—any images uploaded to `/public/uploads` will be deleted whenever the serverless function spins down. By abstracting file uploads to an S3-compatible cloud storage (AWS S3, Cloudflare R2), we ensure files are persistently stored and globally available regardless of the hosting provider.
- **UI & Animations:** **Tailwind CSS & Framer Motion**
  - *Why:* Tailwind allows for rapid, constraint-based utility styling, while Framer Motion enables smooth, modern micro-animations (like glassmorphism and spring transitions) to create a premium aesthetic.
- **Validation:** **Zod**
  - *Why:* Used to validate incoming `FormData` from Server Actions before it touches Prisma, preventing malicious or malformed data from reaching the database.

## 3. Dual-Hosting Deployment Strategy
This architecture guarantees that the codebase operates identically across two radically different hosting environments.

### Vercel / Serverless Deployment
- **Execution:** Code runs in stateless Serverless Functions.
- **Database:** Connects to a managed PostgreSQL provider (e.g., Neon or Supabase) using connection pooling (PgBouncer) to prevent connection limit exhaustion.
- **Storage:** Bypasses the local file system. All asset uploads are streamed directly via the S3 Client to an external bucket.
- **Routing:** Handled automatically by Vercel's edge network.

### Custom VPS / Docker Deployment
- **Execution:** The application is built using Next.js `output: 'standalone'`, which generates a minimal Node.js server. A `Dockerfile` encapsulates this server alongside its dependencies.
- **Database:** Connects to a locally hosted PostgreSQL container via a standard connection string defined in the `.env` file.
- **Storage:** Can connect to a self-hosted S3-compatible service (like MinIO) or external cloud storage simply by changing the S3 environment variables.

### Local Development Setup
To configure the environment locally:
1. **Environment Variables:** Rename `.env.example` to `.env` and configure your `DATABASE_URL` with a valid PostgreSQL connection (e.g., `postgresql://user:password@localhost:5432/mydb?schema=public`).
2. **Push Schema:** Run `npx prisma db push` to synchronize the Prisma schema with the actual database.
3. **Generate Types:** Run `npx prisma generate` to generate the `@prisma/client` bindings.
4. **Seed Database:** Run `npm run prisma seed` to populate the `AdminUser` and initial page content.
5. **Clear Cache:** If you encounter module resolution errors from Turbopack, delete the `.next` directory (`rm -rf .next`) and restart `npm run dev`.

## 4. Data Architecture (Prisma Schema Blueprint)
The Prisma schema models the core entities needed for the frontend UI.

```prisma
// Represents the admin personnel authorized to access the CMS.
model AdminUser {
  id           String   @id @default(cuid())
  username     String   @unique
  passwordHash String
  createdAt    DateTime @default(now())
}

// Represents department announcements (Exam, Events, Seminars).
model Notice {
  id          String   @id @default(cuid())
  title       String
  description String
  date        String
  type        String
  icon        String?  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// Represents the teaching staff. Sortable via the 'order' integer.
model Faculty {
  id             String   @id @default(cuid())
  name           String
  designation    String
  specialization String
  email          String
  imageUrl       String?
  order          Int      @default(0)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}

// Represents student spotlights, split between "Featured" and "Achievement".
model Student {
  id        String   @id @default(cuid())
  name      String
  role      String
  batch     String
  type      String   // "Featured" | "Achievement"
  imageUrl  String?
  createdAt DateTime @default(now())
}

// A generic key-value store for static page text (e.g., About Page Vision/Mission).
model PageContent {
  id        String   @id @default(cuid())
  key       String   @unique
  data      String   // Stored as JSON string
  updatedAt DateTime @updatedAt
}
```

## 5. End-to-End Workflows & Connections

### The Authentication Flow
1. **Client:** Admin enters credentials at `/admin/login`.
2. **NextAuth:** Triggers `signIn("credentials")`.
3. **Backend:** NextAuth's `authorize` callback queries `AdminUser` via Prisma.
4. **Validation:** `bcrypt.compare()` verifies the password hash.
5. **Session:** A JWT is generated, encrypted with `NEXTAUTH_SECRET`, and stored in an HTTP-only cookie.
6. **Middleware:** Next.js `middleware.ts` intercepts all requests to `/admin/*`. If the JWT cookie is missing or invalid, the user is redirected to `/admin/login`.

### The Mutation & Caching Flow
1. **Client:** Admin submits the "Add Notice" form in the CMS.
2. **Server Action:** The form triggers `createNotice(formData)` in `actions.ts`.
3. **Authorization:** The action verifies the session (`getServerSession`).
4. **Database:** Prisma executes an `INSERT` into PostgreSQL.
5. **Cache Invalidation:** `revalidatePath('/notices')` is called to purge the cached static route.
6. **UI Update:** The client refreshes, and the new notice is immediately visible to public users.

### The Asset Upload Flow
1. **Client:** Admin selects an image for a Faculty member.
2. **Server Action:** A `FormData` object containing the `File` is sent to `uploadImage(formData)`.
3. **S3 Client:** The server converts the file to a buffer and executes a `PutObjectCommand` to the configured S3 Bucket (Cloudflare R2/AWS).
4. **Response:** The S3 Client returns a permanent, public cloud URL.
5. **Database:** The URL is saved in the `imageUrl` column of the `Faculty` table.
6. **Render:** The public UI uses standard `<img>` tags (or `next/image` with remote patterns configured) pointing to the cloud URL.

## 6. Directory & Module Structure Blueprint

```
src/
├── app/
│   ├── (public)/                 # Public-facing routes (Implicit group)
│   │   ├── page.tsx              # Homepage
│   │   ├── about/
│   │   │   ├── page.tsx          # Server Component: Fetches PageContent
│   │   │   └── page-client.tsx   # Client Component: Renders UI/Animations
│   │   ├── notices/
│   │   ├── faculty/
│   │   └── students/
│   ├── admin/                    # Protected CMS Dashboard
│   │   ├── layout.tsx            # Sidebar UI & Server-side Session check
│   │   ├── page.tsx              # Dashboard Overview Statistics
│   │   ├── login/
│   │   ├── actions.ts            # ALL Server Actions (CRUD & Uploads)
│   │   ├── notices/
│   │   ├── faculty/
│   │   ├── students/
│   │   └── content/
│   └── api/
│       └── auth/[...nextauth]/   # NextAuth API Route handler
├── components/                   # Reusable UI components
│   └── ui/                       # Shadcn/UI base components (Buttons, Cards, Inputs)
├── lib/
│   ├── auth.ts                   # NextAuth Configuration & Providers
│   └── s3.ts                     # @aws-sdk/client-s3 instantiation
└── middleware.ts                 # Edge middleware for /admin route protection
```

## 7. Implementation Roadmap (Phases)

- **Phase 1: Foundation & Database Layer**
  - Initialize Next.js, Prisma, and PostgreSQL.
  - Define schema and run migrations.
  - Create seed script for default admin and initial page content.
  - *Exit Criteria:* `npx prisma db push` succeeds and `prisma/seed.ts` populates DB.
- **Phase 2: Authentication & Middleware**
  - Install and configure NextAuth.js.
  - Build the `/admin/login` UI.
  - Implement Edge middleware for route protection.
  - *Exit Criteria:* Unauthorized users are blocked from `/admin/*`. Admin can log in successfully.
- **Phase 3: File Storage Pipeline**
  - Set up AWS SDK.
  - Build the generic Server Action for processing `FormData` files and streaming to S3.
  - *Exit Criteria:* A test image successfully uploads and returns a valid public URL.
- **Phase 4: CMS Core (Server Actions & UI)**
  - Implement full CRUD operations for Notices, Faculty, Students, and Page Content.
  - Build the interactive React client forms with loading states.
  - Wire up the `revalidatePath` hooks.
  - *Exit Criteria:* Admin can fully manage all data entities from the dashboard without touching code.
- **Phase 5: Frontend Integration**
  - Refactor all public pages from static arrays to Prisma Server Components.
  - Pass fetched data to animated Framer Motion client components.
  - *Exit Criteria:* Public website accurately reflects the database state in real-time.

## 8. Security & Edge Cases

- **Route Protection:** Handled via Next.js Edge Middleware. It intercepts requests before they hit the Node runtime, ensuring zero unauthorized access to CMS pages.
- **Password Hashing:** Passwords are never stored in plain text. `bcryptjs` is used to hash passwords during seeding/creation, and to compare hashes during NextAuth's `authorize` phase.
- **Malicious File Uploads:** Uploads are restricted by checking MIME types (`file.type`). The AWS SDK handles the raw buffer securely. Filenames are obfuscated using `uuidv4()` to prevent directory traversal attacks or naming collisions.
- **Database Connection Pooling:** In serverless environments, establishing a new Postgres connection per request will crash the DB. `prisma` is instantiated as a global singleton in development to prevent hot-reloading exhaustion. For Vercel production, a connection pooler (like PgBouncer or Neon's built-in pooler) must be configured in the `DATABASE_URL`.
