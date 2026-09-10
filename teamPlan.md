# 🚀 8-Player Comprehensive Project Planner: Department Website & CMS

> **Project Focus:** Next.js (App Router), Prisma, PostgreSQL, NextAuth, S3 Storage[cite: 1].
> **Architecture:** Server-First, Type-Safe, Dual-Hosting Capable[cite: 1].

---

## 👥 1. Team Roster & Specialized Roles
With eight members, separate the frontend and backend tracks into distinct specializations to avoid merge conflicts and maximize parallel development.

| Name | Primary Role | Core Responsibilities |
| :--- | :--- | :--- |
| **[Member 1]** | Lead Backend / DBA | Prisma Schema, PostgreSQL DB Optimizations, Migrations[cite: 1]. |
| **[Member 2]** | Security & Auth Lead | NextAuth setup, Edge Middleware Route Protection, Passwords[cite: 1]. |
| **[Member 3]** | Cloud & DevOps | AWS S3 Integration, Dual-Hosting deployment (Vercel/Docker)[cite: 1]. |
| **[Member 4]** | Backend Logic Dev | Writing all React Server Actions for CRUD operations[cite: 1]. |
| **[Member 5]** | Frontend CMS (Logic) | Connecting Admin UI forms to Server Actions, State management[cite: 1]. |
| **[Member 6]** | Frontend CMS (UI) | Building Base Admin Layout, Sidebar, and Shadcn/UI components[cite: 1]. |
| **[Member 7]** | Frontend Public (Data) | Refactoring static public pages to React Server Components[cite: 1]. |
| **[Member 8]** | Frontend Public (UX) | Implementing Tailwind CSS and Framer Motion micro-animations[cite: 1]. |

---

## 🌿 2. Collaborative Workflow

### Branching Strategy
*   **`main`**: Production-ready code. Locked. Requires Pull Request (PR) to merge.
*   **`dev`**: Integration branch for testing features together before a major release.
*   **Feature Branches**: `feature/[component]` (e.g., `feature/student-schema`, `feature/s3-pipeline`).

### Pull Request (PR) Rules
*   At least **2 approving reviews** are required before merging to ensure code quality across a larger team.
*   Run `npx prisma generate` and test locally before opening any PR[cite: 1].

---

## 📋 3. Kanban Task Planner (Phased Timeline)

### 🏗 Phase 1: Foundation & Database Layer (Week 1)
| Status | Task | Assignee | Priority |
| :---: | :--- | :--- | :---: |
| [ ] | Initialize Next.js project with App Router, TypeScript, Tailwind[cite: 1] | [Member 3] | 🔴 High |
| [ ] | Set up VS Code shared workspace settings (`.vscode/settings.json`) | [Member 1] | 🔴 High |
| [ ] | Configure Prisma and PostgreSQL connection[cite: 1] | [Member 1] | 🔴 High |
| [ ] | Write Prisma Schema (AdminUser, Notice, Faculty, Student, PageContent)[cite: 1] | [Member 1] | 🔴 High |
| [ ] | Create DB Migration and `prisma/seed.ts` script for initial data[cite: 1] | [Member 4] | 🟡 Med |

### 🔐 Phase 2: Authentication & Storage Pipeline (Week 2)
| Status | Task | Assignee | Priority |
| :---: | :--- | :--- | :---: |
| [ ] | Install and configure NextAuth.js (Credentials Provider)[cite: 1] | [Member 2] | 🔴 High |
| [ ] | Implement Next.js Edge `middleware.ts` to protect `/admin/*`[cite: 1] | [Member 2] | 🔴 High |
| [ ] | Set up AWS S3 bucket / Cloudflare R2 and configure CORS[cite: 1] | [Member 3] | 🔴 High |
| [ ] | Create generic Server Action `uploadImage(formData)` to S3[cite: 1] | [Member 3] | 🔴 High |

### ⚙️ Phase 3: CMS Core Development (Week 3-4)
| Status | Task | Assignee | Priority |
| :---: | :--- | :--- | :---: |
| [ ] | Build Base Admin Dashboard Layout & Sidebar[cite: 1] | [Member 6] | 🟡 Med |
| [ ] | Build Server Actions for **Notices** and **Page Content** CRUD[cite: 1] | [Member 4] | 🔴 High |
| [ ] | Build Server Actions for **Faculty** and **Students** (w/ Image Upload)[cite: 1] | [Member 4] | 🔴 High |
| [ ] | Build UI Forms with Zod validation for all CMS entities[cite: 1] | [Member 5 & 6] | 🔴 High |
| [ ] | Implement `revalidatePath` hooks in all mutative Server Actions[cite: 1] | [Member 4] | 🔴 High |

### ✨ Phase 4: Frontend Public Integration (Week 4-5)
| Status | Task | Assignee | Priority |
| :---: | :--- | :--- | :---: |
| [ ] | Build Public Homepage & hook up Server Components[cite: 1] | [Member 7] | 🔴 High |
| [ ] | Build About Page fetching data from `PageContent`[cite: 1] | [Member 7] | 🟡 Med |
| [ ] | Build Notices, Faculty, and Students public directories[cite: 1] | [Member 7] | 🔴 High |
| [ ] | Add Framer Motion micro-animations to public UI[cite: 1] | [Member 8] | 🟢 Low |

### 🚀 Phase 5: Testing & Deployment (Week 6)
| Status | Task | Assignee | Priority |
| :---: | :--- | :--- | :---: |
| [ ] | E2E Testing of Admin Login, CRUD operations, and Image Uploads | [All] | 🔴 High |
| [ ] | Configure Connection Pooling (PgBouncer) if deploying to Vercel[cite: 1] | [Member 3] | 🔴 High |
| [ ] | Create `Dockerfile` using `output: 'standalone'` for VPS fallback[cite: 1] | [Member 3] | 🟡 Med |