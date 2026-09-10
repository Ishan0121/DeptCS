import { getStudents } from "../../actions"
import StudentsClient from "./students-client"

export default async function AdminStudentsPage() {
  const students = await getStudents()
  return <StudentsClient initialStudents={students} />
}
