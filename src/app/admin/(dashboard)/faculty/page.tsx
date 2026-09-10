import { getFaculty } from "../../actions"
import FacultyClient from "./faculty-client"

export default async function AdminFacultyPage() {
  const faculty = await getFaculty()
  return <FacultyClient initialFaculty={faculty} />
}
