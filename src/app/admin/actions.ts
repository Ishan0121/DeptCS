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
  return prisma.faculty.findMany({ orderBy: { order: 'asc' } })
}

export async function createFaculty(data: { name: string; designation: string; specialization: string; email: string; imageUrl?: string; order?: number }) {
  await requireAuth()
  const res = await prisma.faculty.create({ data })
  revalidatePath("/faculty")
  return res
}

export async function updateFaculty(id: string, data: { name: string; designation: string; specialization: string; email: string; imageUrl?: string; order?: number }) {
  await requireAuth()
  const res = await prisma.faculty.update({ where: { id }, data })
  revalidatePath("/faculty")
  return res
}

export async function deleteFaculty(id: string) {
  await requireAuth()
  const res = await prisma.faculty.delete({ where: { id } })
  revalidatePath("/faculty")
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
