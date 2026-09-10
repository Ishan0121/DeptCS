import { getPageContent } from "../../actions"
import ContentClient from "./content-client"

export default async function AdminContentPage() {
  const [aboutContent, academicsContent] = await Promise.all([
    getPageContent("about"),
    getPageContent("academics")
  ])
  
  return <ContentClient 
    initialAboutContent={aboutContent || { history: "", vision: "", mission: "" }} 
    initialAcademicsContent={academicsContent || { 
      overview: "", 
      y1s1: [], y1s2: [], 
      y2s3: [], y2s4: [], 
      y3s5: [], y3s6: [] 
    }} 
  />
}
