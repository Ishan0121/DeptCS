import { getNotices } from "../../actions"
import NoticesClient from "./notices-client"

export default async function AdminNoticesPage() {
  const notices = await getNotices()
  return <NoticesClient initialNotices={notices} />
}
