const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database with faculty members...')
  
  // Clear existing faculty
  await prisma.faculty.deleteMany({})

  const faculties = [
    {
      name: 'Dr. Soumya Kanti Hota',
      designation: 'HOD',
      specialization: 'M.SC., Ph. D.',
      order: 1,
    },
    {
      name: 'Priyanka Roy Gupta',
      designation: 'TIC',
      specialization: 'M.Sc., NET Qualified, Ph.D(Pursuing)',
      order: 2,
    },
    {
      name: 'Sandipan Maity',
      designation: 'State Aided College Teacher (SACT)',
      specialization: 'M.Sc., M.Phil., SET Qualified',
      order: 3,
    },
    {
      name: 'Gourab Maiti',
      designation: 'State Aided College Teacher (SACT)',
      specialization: 'M.Sc., NET, JEST, SET, GATE, TIFREE, CUET, IITEE, JECA qualified',
      order: 4,
    },
    {
      name: 'Rakesh Paul',
      designation: 'State Aided College Teacher (SACT)',
      specialization: 'M.Sc, M.Phil., NET Qualified, Ph.D(Pursuing)',
      order: 5,
    },
    {
      name: 'Soumya Chakraborty',
      designation: 'State Aided College Teacher (SACT)',
      specialization: 'M.Sc., M.Phil., NET Qualified, GATE Qualified, Ph.D. (Pursuing)',
      order: 6,
    },
    {
      name: 'Rabisankar Pramanik',
      designation: 'State Aided College Teacher (SACT)',
      specialization: 'M. Sc., NET-JRF',
      order: 7,
    },
    {
      name: 'Mrs. Krishna Bhattacharya',
      designation: 'Laboratory Attendant',
      specialization: 'B.A',
      order: 8,
    },
    {
      name: 'Basudeb Bala',
      designation: 'Casual Non-Teaching Staff',
      specialization: 'H.S',
      order: 9,
    }
  ]

  for (const f of faculties) {
    const created = await prisma.faculty.create({
      data: f
    })
    console.log(`Created: ${created.name}`)
  }

  console.log('Seeding completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
