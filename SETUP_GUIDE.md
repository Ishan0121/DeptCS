# 🚀 Project Setup Guide

Welcome to the **Department of Computer Science (DeptCS)** repository! This guide will walk you through everything you need to do to get this project up and running on your local machine.

## 🛠️ Tech Stack
This project is built using:
- **Framework:** Next.js 14+ (App Router, Server Components)
- **Language:** TypeScript
- **Database ORM:** Prisma
- **Authentication:** NextAuth.js
- **Styling:** Tailwind CSS (v4) & Framer Motion
- **Object Storage:** Cloudflare R2 (S3 API compatible)

---

## 📋 Prerequisites
Before you start, make sure you have the following installed on your machine:
1. [Node.js](https://nodejs.org/en/) (v18 or higher)
2. [Git](https://git-scm.com/)
3. A running **PostgreSQL** database. (You can install it locally, or use a free cloud provider like Supabase or Neon).
4. A **Cloudflare R2** or AWS S3 bucket (for uploading images from the admin panel).

---

## ⚙️ Installation & Setup

### 1. Clone the repository
First, clone the project from GitHub and navigate into the directory:
```bash
git clone https://github.com/your-username/DeptCS.git
cd DeptCS
```

### 2. Install Dependencies
Install all required NPM packages:
```bash
npm install
```

### 3. Setup Environment Variables
You need to configure your environment variables for the database, authentication, and image storage.

1. Create a copy of the `.env.example` file and name it `.env`:
   ```bash
   cp .env.example .env
   ```
2. Open the `.env` file and fill in the required values:

   - **`DATABASE_URL`**: Your PostgreSQL connection string (e.g., `postgresql://postgres:password@localhost:5432/deptcs`).
   - **`NEXTAUTH_SECRET`**: A random 32-character string used to encrypt sessions. (You can generate one by running `openssl rand -base64 32` in your terminal).
   - **`NEXTAUTH_URL`**: Set this to `http://localhost:3000` for local development.
   - **`ADMIN_USERNAME`** & **`ADMIN_PASSWORD`**: The credentials you want to use for the admin panel.
   - **`R2_...`**: Your Cloudflare R2 (or AWS S3) bucket credentials. You need this to upload faculty and student images!

### 4. Setup the Database
Next, we need to push the database schema to your PostgreSQL database. Prisma makes this incredibly easy.

Run the following command to create the tables in your database:
```bash
npx prisma db push
```

*(Note: If you are doing this in production, you should use `npx prisma migrate deploy` instead).*

### 5. Seed the Admin Account
In order to log into the `/admin/login` page, you need an admin account in the database. 
We have a seed script that will create one using the credentials you set in your `.env` file (`ADMIN_USERNAME` and `ADMIN_PASSWORD`).

Run the seed script:
```bash
npx ts-node seed.ts
```
*You should see a message saying "Admin user seeded successfully."*

---

## 🚀 Running the Project

You are all set! Start the development server:

```bash
npm run dev
```

The application will now be running at [http://localhost:3000](http://localhost:3000).

### Accessing the Admin Panel
1. Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Enter the `ADMIN_USERNAME` and `ADMIN_PASSWORD` you configured in your `.env` file.
3. You now have full access to edit students, faculty, notices, and page content!

---

## 📝 Common Troubleshooting

- **Image uploads are failing:** Ensure your `R2_ENDPOINT` is formatted correctly (e.g., `https://<account-id>.r2.cloudflarestorage.com`) and that you have entered your `R2_ACCESS_KEY_ID` and `R2_SECRET_ACCESS_KEY` correctly in the `.env` file.
- **Login fails / redirect loop:** Ensure `NEXTAUTH_SECRET` is set in your `.env` file. Without it, NextAuth cannot securely sign session cookies.
- **Database connection error:** Double-check your `DATABASE_URL` string. If you are using a local Postgres instance, ensure the database service is actually running on your machine.
