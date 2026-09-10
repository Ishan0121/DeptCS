import { Metadata } from "next"
import { getFaculty } from "../admin/actions"
import FacultyPageClient from "./page-client"

export const metadata: Metadata = {
  title: "Faculty Directory | DeptCS",
  description: "Meet the academic staff and educators at DeptCS.",
}

export default async function FacultyPage() {
  const faculty = await getFaculty()
  return <FacultyPageClient faculty={faculty} />
}
