import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const detailsMarkdown = `
### Academic Background
- **Educational Qualifications**: M.Sc., M.Phil., SET Qualified
- **Area of Specialization**: Bio-Informatics
- **Area of Research**: Image Processing

### Qualifications
| Qualification | Year of Passing | Institute |
| ------------- | --------------- | --------- |
| M.Phil.       | 2021            | Vidyasagar University |
| M.Sc.         | 2013            | Vidyasagar University |

### Seminars & Workshops Attended
1. **Machine Learning and Internet of Things** (National Level) - Global Institute of Science and Technology, Haldia India
2. **5 days e-workshop on LaTeX** (National Level) - GITAM, Bengaluru, India
3. **Cryptography, Network security and Cyber security** (National Level) - Maulana Abul Kalam Azad University of technology, West Bengal
4. **Future Generation Computing and Applications** (National Level) - Govt. college of Engineering and Ceramic Technology, Kolkata, West Bengal
5. **Machine Learning and Steganography** (International Level) - Dept. of Computer Science and BCA, Kharagpur College, West Bengal
6. **Emerging Trends in computer Science and Application (ETCSA-2020)** (National Level) - Dept. of Computer Science and BCA, Belda College, West Bengal
7. **Recent Trends on Advance Computing** (National Level) - Vidyasagar University
`

  const member = await prisma.faculty.create({
    data: {
      name: "Sandipan Maity",
      designation: "State Aided College Teacher (SACT)",
      specialization: "Bio-Informatics, Image Processing",
      email: "cs.sandipan@debracollege.ac.in",
      details: detailsMarkdown.trim(),
      order: 1
    }
  })
  
  console.log("Seeded faculty:", member.name)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
