import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | DeptCS",
  description: "Reach out to the Department of Computer Science for admissions, technical inquiries, or collaborations.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
