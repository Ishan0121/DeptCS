"use server"

import { PrismaClient } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { uploadFileToS3 } from "@/lib/s3"

const prisma = new PrismaClient()

// Helper to check authentication
async function requireAuth() {
  const session = await getServerSession(authOptions)
  if (!session) {
    throw new Error("Unauthorized")
  }
}

// ----------------------------------------------------------------------------
// FILE UPLOADS
// ----------------------------------------------------------------------------
export async function uploadImage(formData: FormData) {
  await requireAuth()
  const file = formData.get("file") as File
  if (!file) throw new Error("No file provided")
  
  const url = await uploadFileToS3(file, "uploads")
  return url
}

// ----------------------------------------------------------------------------
// NOTICES
// ----------------------------------------------------------------------------
export async function getNotices() {
  return prisma.notice.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createNotice(data: { title: string; description: string; date: string; type: string; icon?: string }) {
  await requireAuth()
  const res = await prisma.notice.create({ data })
  revalidatePath("/notices")
  return res
}

export async function updateNotice(id: string, data: { title: string; description: string; date: string; type: string; icon?: string }) {
  await requireAuth()
  const res = await prisma.notice.update({ where: { id }, data })
  revalidatePath("/notices")
  return res
}

export async function deleteNotice(id: string) {
  await requireAuth()
  const res = await prisma.notice.delete({ where: { id } })
  revalidatePath("/notices")
  return res
}

// ----------------------------------------------------------------------------
// FACULTY
// ----------------------------------------------------------------------------
export async function getFaculty() {
  const allFaculty = await prisma.faculty.findMany({ 
    orderBy: { name: 'asc' }
  })

  // Group by order defined vs undefined
  const ordered = allFaculty.filter(f => f.order !== null && f.order > 0)
  const unordered = allFaculty.filter(f => f.order === null || f.order <= 0)

  const result: typeof allFaculty = []
  
  // Place ordered faculty in their specific 1-based slots (e.g. order 4 goes to index 3)
  for (const f of ordered) {
    // If multiple have same order, we might overwrite, but we'll assume uniqueness for slots
    result[f.order! - 1] = f
  }

  // Find max length needed to iterate up to (end of sparse array)
  const maxOrderedIndex = result.length

  const finalResult: typeof allFaculty = []
  let unorderedIndex = 0
  let resultCursor = 0

  // Fill gaps with unordered items, and append the rest
  while (unorderedIndex < unordered.length || resultCursor < maxOrderedIndex) {
    if (result[resultCursor] !== undefined) {
      finalResult.push(result[resultCursor])
    } else {
      if (unorderedIndex < unordered.length) {
        finalResult.push(unordered[unorderedIndex])
        unorderedIndex++
      }
    }
    resultCursor++
  }

  return finalResult
}

export async function getFacultyCount() {
  return prisma.faculty.count()
}

export async function createFaculty(data: { name: string; designation: string; specialization: string; email: string; departmentPosition?: string | null; details?: string; imageUrl?: string; order?: number | null }) {
  await requireAuth()
  const res = await prisma.faculty.create({ data })
  revalidatePath("/faculty", "layout")
  return res
}

export async function updateFaculty(id: string, data: { name: string; designation: string; specialization: string; email: string; departmentPosition?: string | null; details?: string; imageUrl?: string; order?: number | null }) {
  await requireAuth()
  const res = await prisma.faculty.update({ where: { id }, data })
  revalidatePath("/faculty", "layout")
  return res
}

export async function deleteFaculty(id: string) {
  await requireAuth()
  const res = await prisma.faculty.delete({ where: { id } })
  revalidatePath("/faculty", "layout")
  return res
}

// ----------------------------------------------------------------------------
// STUDENTS
// ----------------------------------------------------------------------------
export async function getStudents() {
  return prisma.student.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createStudent(data: { name: string; role: string; batch: string; type: string; imageUrl?: string }) {
  await requireAuth()
  const res = await prisma.student.create({ data })
  revalidatePath("/students")
  return res
}

export async function updateStudent(id: string, data: { name: string; role: string; batch: string; type: string; imageUrl?: string }) {
  await requireAuth()
  const res = await prisma.student.update({ where: { id }, data })
  revalidatePath("/students")
  return res
}

export async function deleteStudent(id: string) {
  await requireAuth()
  const res = await prisma.student.delete({ where: { id } })
  revalidatePath("/students")
  return res
}

// ----------------------------------------------------------------------------
// PAGE CONTENT
// ----------------------------------------------------------------------------
export async function getPageContent(key: string) {
  const content = await prisma.pageContent.findUnique({ where: { key } })
  return content ? JSON.parse(content.data) : null
}

export async function updatePageContent(key: string, data: any) {
  await requireAuth()
  const res = await prisma.pageContent.upsert({
    where: { key },
    update: { data: JSON.stringify(data) },
    create: { key, data: JSON.stringify(data) },
  })
  
  // Revalidate multiple potential paths this content might affect
  revalidatePath("/about")
  revalidatePath("/academics")
  revalidatePath("/contact")
  
  return res
}
