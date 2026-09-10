import { Metadata } from "next"
import { getPageContent } from "../admin/actions"
import AcademicsPageClient from "./page-client"

export const metadata: Metadata = {
  title: "Academics | DeptCS",
  description: "Explore the comprehensive Computer Science curriculum at DeptCS.",
}

export default async function AcademicsPage() {
  const academicsContent = await getPageContent("academics")
  
  return <AcademicsPageClient data={academicsContent} />
}
