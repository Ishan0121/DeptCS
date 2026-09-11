import { Metadata } from "next"
import { getPageContent, getFacultyCount } from "../admin/actions"
import AboutPageClient from "./page-client"

export const metadata: Metadata = {
  title: "About the Department | DeptCS",
  description: "Learn about the history, vision, and mission of the Department of Computer Science.",
}

export default async function AboutPage() {
  const [aboutContent, facultyCount] = await Promise.all([
    getPageContent("about"),
    getFacultyCount()
  ])
  
  // Default values just in case
  const defaultContent = {
    history: "The Department of Computer Science was established with a vision to provide quality education in the field of computing and technology. Over the years, we have grown significantly in terms of infrastructure, faculty, and student achievements.\n\nAffiliated with Vidyasagar University and accredited with a grade \"A\" by the NAAC, we strive to maintain high academic standards while ensuring our students are well-prepared for the ever-evolving IT industry.",
    vision: "To be a center of excellence in computer science education and research, producing competent professionals who can contribute to the technological advancement of society.",
    mission: "1. To provide strong foundational knowledge and practical skills.\n2. To foster an environment of continuous learning and innovation.\n3. To encourage ethical practices and social responsibility among students.",
    naacGrade: "A",
    showTotalStudents: false,
    studentIntake: [{ label: "Intake / Year", count: 120 }]
  }

  return <AboutPageClient content={aboutContent || defaultContent} facultyCount={facultyCount} />
}
