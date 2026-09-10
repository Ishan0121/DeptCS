import { Metadata } from "next"
import { getStudents } from "../admin/actions"
import StudentsPageClient from "./page-client"

export const metadata: Metadata = {
  title: "Student Corner | DeptCS",
  description: "Discover achievements and brilliant projects from our students.",
}

export default async function StudentsPage() {
  const students = await getStudents()
  return <StudentsPageClient students={students} />
}
