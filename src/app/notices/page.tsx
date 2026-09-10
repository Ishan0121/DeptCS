import { Metadata } from "next"
import { getNotices } from "../admin/actions"
import NoticesPageClient from "./page-client"

export const metadata: Metadata = {
  title: "Department Log | DeptCS",
  description: "Official communications, notices, and updates from the Department of Computer Science.",
}

export default async function NoticesPage() {
  const notices = await getNotices()
  
  // Separate into latest and past
  // For demo, we just split by date logic or just slice. 
  // Let's assume the first 3 are latest.
  const latestNotices = notices.slice(0, 3)
  const pastNotices = notices.slice(3)

  return <NoticesPageClient latestNotices={latestNotices} pastNotices={pastNotices} />
}
