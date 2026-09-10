import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = process.env.ADMIN_PASSWORD || 'supersecretpassword';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { username: process.env.ADMIN_USERNAME || 'admin' },
    update: {},
    create: {
      username: process.env.ADMIN_USERNAME || 'admin',
      passwordHash: hashedPassword,
    },
  });

  console.log({ admin });

  // Add initial page content
  const aboutContent = {
    history: "The Department of Computer Science was established with a vision to provide quality education in the field of computing and technology. Over the years, we have grown significantly in terms of infrastructure, faculty, and student achievements.",
    vision: "To be a center of excellence in computer science education and research, producing competent professionals who can contribute to the technological advancement of society.",
    mission: "1. To provide strong foundational knowledge and practical skills.\n2. To foster an environment of continuous learning and innovation.\n3. To encourage ethical practices and social responsibility among students."
  };

  await prisma.pageContent.upsert({
    where: { key: 'about' },
    update: {},
    create: {
      key: 'about',
      data: JSON.stringify(aboutContent),
    }
  });

  console.log('Seeding completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
