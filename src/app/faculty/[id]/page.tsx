import { PrismaClient } from "@prisma/client"
import FacultyDetailClient from "./page-client"
import { notFound } from "next/navigation"

const prisma = new PrismaClient()

export async function generateStaticParams() {
  const members = await prisma.faculty.findMany({ select: { id: true } })
  return members.map((member) => ({ id: member.id }))
}

// Note: Next.js 15 requires params to be awaited before using its properties
export default async function FacultyProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  
  const faculty = await prisma.faculty.findUnique({
    where: { id: resolvedParams.id }
  })

  if (!faculty) {
    notFound()
  }

  // Serialize to plain object to avoid Date passing issues
  const facultyData = {
    id: faculty.id,
    name: faculty.name,
    designation: faculty.designation,
    departmentPosition: faculty.departmentPosition,
    specialization: faculty.specialization,
    email: faculty.email,
    imageUrl: faculty.imageUrl,
    details: faculty.details
  }

  return (
    <FacultyDetailClient faculty={facultyData} />
  )
}
