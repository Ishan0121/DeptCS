# Aetheris DeptCS - Project Setup Guide

This project is a Next.js application designed for a Computer Science Department portal. It uses Prisma as the ORM with a PostgreSQL database.

Follow this comprehensive guide to set up your environment, database, and start the development server.

## Prerequisites
- **Node.js**: Make sure you have Node.js installed (v18 or higher recommended).
- **PostgreSQL**: You need a running instance of PostgreSQL. You can use a local installation or a cloud provider (like Supabase or Neon).

---

## Step 1: Install Dependencies

First, install the required packages using your preferred package manager.

```bash
npm install
# or
yarn install
# or
pnpm install
```

---

## Step 2: Environment Variables

Create a `.env` file in the root of your project directory and add the following environment variables:

```env
# Database Connection URL (replace with your PostgreSQL connection string)
DATABASE_URL="postgresql://user:password@localhost:5432/deptcs?schema=public"

# Admin Credentials for Seeding
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="supersecretpassword"
```

---

## Step 3: Database Logical Design & Architecture

Before running the queries, here is a logical breakdown of how the database tables are structured and what each column represents:

### 1. `AdminUser` Table
Manages the authentication for the admin panel.
- **`id`**: A unique string identifier (CUID).
- **`username`**: Unique login username for the administrator.
- **`passwordHash`**: Securely hashed password (using bcrypt).
- **`createdAt`**: Timestamp of when the admin user was created.

### 2. `Notice` Table
Stores announcements, events, and notices for the department.
- **`id`**: A unique string identifier.
- **`title`**: The main heading of the notice.
- **`description`**: Detailed body content of the notice.
- **`date`**: The date relevant to the notice (e.g., event date or publishing date).
- **`type`**: Categorization of the notice (e.g., "Event", "Announcement", "Deadline").
- **`icon`**: (Optional) The name of a `lucide-react` icon to display next to the notice visually.
- **`createdAt` & `updatedAt`**: Timestamps to track creation and latest modification.

### 3. `Faculty` Table
Holds profiles and details of the department's faculty members.
- **`id`**: A unique string identifier.
- **`name`**: Full name of the faculty member.
- **`designation`**: Job title (e.g., "Professor", "Assistant Professor").
- **`specialization`**: Area of expertise or research domain.
- **`email`**: Contact email address.
- **`imageUrl`**: (Optional) URL pointing to the faculty member's profile picture.
- **`order`**: Numeric value used to sort faculty members on the UI (default is 0).
- **`createdAt` & `updatedAt`**: Timestamp tracking.

### 4. `Student` Table
Highlights notable students, achievements, and featured profiles.
- **`id`**: A unique string identifier.
- **`name`**: Full name of the student.
- **`role`**: Contextual role (e.g., "President", "Alumni", "Top Performer").
- **`batch`**: The passing year or enrollment batch (e.g., "2024").
- **`type`**: Categorizes the entry (e.g., "Featured" or "Achievement").
- **`imageUrl`**: (Optional) Profile or achievement photo URL.
- **`createdAt`**: Timestamp of creation.

### 5. `PageContent` Table
Provides a dynamic way to manage generic page content using a Key-Value mechanism without hardcoding text into the UI.
- **`id`**: A unique string identifier.
- **`key`**: Unique identifier for the specific content section on the frontend (e.g., "about_us_text").
- **`data`**: A JSON string containing the dynamic content configuration.
- **`updatedAt`**: Timestamp for when the content was last updated.

---

## Step 4: Database Setup Scripts & Commands

Now that you understand the table structure, run the following commands to initialize your PostgreSQL database.

### 1. Push the Schema to the Database
This command reads the `prisma/schema.prisma` file, translates our logical design into standard SQL statements, and executes them to create the tables in your PostgreSQL database.

```bash
npx prisma db push
```
*(Note: For production environments, you should use `npx prisma migrate deploy` instead.)*

### 2. Generate Prisma Client
This command generates the TypeScript client based on your schema so you can interact with the database using strictly typed queries in your application code.

```bash
npx prisma generate
```

### 3. Seed the Database
We need a default Admin User to log into the dashboard. Run the included seed script to read the `ADMIN_USERNAME` and `ADMIN_PASSWORD` from your `.env` file, hash the password, and insert it into the `AdminUser` table.

```bash
npx ts-node seed.ts
```
*If you encounter execution issues with `ts-node`, you can also use `tsx`:*
```bash
npx tsx seed.ts
```

---

## Step 5: Start the Development Server

With dependencies installed and the database initialized and seeded, you can now start the application:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can log into the admin interface using the credentials you defined in your `.env` file.
