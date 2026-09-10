"use client"

import { BookOpen, GraduationCap } from "lucide-react"
import { HeroHeader } from "@/components/hero-header"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function AcademicsPageClient({ data }: { data: any }) {
  const safeData = data || {}
  const y1s1 = safeData.y1s1 || []
  const y1s2 = safeData.y1s2 || []
  const y2s3 = safeData.y2s3 || []
  const y2s4 = safeData.y2s4 || []
  const y3s5 = safeData.y3s5 || []
  const y3s6 = safeData.y3s6 || []
  const y3s7 = safeData.y3s7 || []
  const y3s8 = safeData.y3s8 || []

  // Active section tracking for sidebar
  const [activeSection, setActiveSection] = useState("overview")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["overview", "year1", "year2", "year3", "year4"]
      let current = sections[0]
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 200) {
            current = section
          }
        }
      }
      setActiveSection(current)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const SidebarLink = ({ id, label }: { id: string, label: string }) => {
    const isActive = activeSection === id
    return (
      <a
        href={`#${id}`}
        className={cn(
          "text-[13px] font-medium transition-all flex items-center gap-2.5 py-1.5 px-3 rounded-md group",
          isActive
            ? "text-primary bg-primary/8 font-semibold"
            : "text-muted-foreground hover:text-foreground hover:bg-muted"
        )}
      >
        <div className={cn(
          "w-1 h-4 rounded-full transition-all duration-200 shrink-0",
          isActive ? "bg-primary" : "bg-border group-hover:bg-primary/40"
        )} />
        {label}
      </a>
    )
  }

  const SemesterBlock = ({ code, title, items }: { code: string, title: string, items: string[] }) => (
    <div className="bento-card p-6 md:p-7 relative group overflow-hidden flex-1 h-full flex flex-col">
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
        <h4 className="font-bold text-lg text-foreground tracking-tight">{title}</h4>
        <span className="tech-mono text-[9px] px-2 py-1 bg-muted rounded-md border border-border">{code}</span>
      </div>

      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center py-10 border border-dashed border-border rounded-lg bg-muted/10">
          <p className="tech-mono text-[10px]">No modules listed</p>
        </div>
      ) : (
        <ul className="space-y-3 flex-1">
          {items.map((subject, index) => (
            <li key={index} className="flex items-start gap-3 group/item">
              <div className="mt-[5px] w-1.5 h-1.5 rounded-full bg-border group-hover/item:bg-primary transition-colors duration-200 shrink-0" />
              <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-200 leading-relaxed">
                {subject}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )

  const YearSection = ({ id, tag, title, sem1, sem2 }: { id: string, tag: string, title: string, sem1: any, sem2: any }) => (
    <section id={id} className="scroll-mt-28">
      <div className="mb-7 pb-4 border-b border-border flex items-center justify-between">
        <div>
          <div className="tech-mono text-primary mb-1 text-[10px]">{tag}</div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{title}</h2>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <SemesterBlock code={sem1.code} title={sem1.title} items={sem1.items} />
        <SemesterBlock code={sem2.code} title={sem2.title} items={sem2.items} />
      </div>
    </section>
  )

  return (
    <div className="bg-background min-h-screen pb-24">
      <HeroHeader
        title="Academics & Syllabus"
        description="Comprehensive curriculum for B.Sc (Honours) in Computer Science, strictly aligned with the CBCS/NEP framework."
        icon={BookOpen}
        tag="CURRICULUM //"
      />

      <div className="container px-4 py-16 md:py-20 mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-20 items-start">

          {/* ── Left: Sticky Sidebar ── */}
          <div className="hidden lg:block sticky top-24 space-y-6">
            <div>
              <div className="tech-mono text-primary mb-1">PROGRAM</div>
              <h3 className="text-base font-bold tracking-tight text-foreground">Structure</h3>
            </div>

            <nav className="flex flex-col gap-0.5">
              <SidebarLink id="overview" label="Overview" />
              <SidebarLink id="year1" label="First Year" />
              <SidebarLink id="year2" label="Second Year" />
              <SidebarLink id="year3" label="Third Year" />
              <SidebarLink id="year4" label="Fourth Year" />
            </nav>

            <div className="p-4 rounded-xl border border-border bg-muted/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-dot-matrix opacity-20 pointer-events-none" />
              <div className="relative z-10">
                <GraduationCap className="w-4 h-4 text-primary mb-3" />
                <h4 className="font-bold text-xs mb-1.5 text-foreground">Degree Info</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  4-Year Undergraduate Programme in Computer Science (Hons) affiliated to Vidyasagar University.
                </p>
              </div>
            </div>
          </div>

          {/* ── Right: Main Content ── */}
          <div className="space-y-20 min-w-0">

            {/* Overview */}
            <section id="overview" className="scroll-mt-28">
              <div className="mb-7 pb-4 border-b border-border flex items-center justify-between">
                <div>
                  <div className="tech-mono text-primary mb-1 text-[10px]">00 // OVERVIEW</div>
                  <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">Course Overview</h2>
                </div>
              </div>
              <div className="bento-card p-7 md:p-9 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-primary/60 via-primary/20 to-transparent" />
                <div className="absolute inset-0 bg-grid-tech opacity-[0.08] pointer-events-none" />
                <div className="pl-5 relative z-10 text-muted-foreground whitespace-pre-wrap leading-[1.85] text-[15px]">
                  {safeData.overview || "No overview content has been added yet."}
                </div>
              </div>
            </section>

            {/* Years */}
            <YearSection 
              id="year1" tag="01 // YEAR_ONE" title="First Year"
              sem1={{ code: "SEM_01", title: "Semester 1", items: y1s1 }}
              sem2={{ code: "SEM_02", title: "Semester 2", items: y1s2 }}
            />
            
            <YearSection 
              id="year2" tag="02 // YEAR_TWO" title="Second Year"
              sem1={{ code: "SEM_03", title: "Semester 3", items: y2s3 }}
              sem2={{ code: "SEM_04", title: "Semester 4", items: y2s4 }}
            />

            <YearSection 
              id="year3" tag="03 // YEAR_THREE" title="Third Year"
              sem1={{ code: "SEM_05", title: "Semester 5", items: y3s5 }}
              sem2={{ code: "SEM_06", title: "Semester 6", items: y3s6 }}
            />

            <YearSection 
              id="year4" tag="04 // YEAR_FOUR" title="Fourth Year"
              sem1={{ code: "SEM_07", title: "Semester 7", items: y3s7 }}
              sem2={{ code: "SEM_08", title: "Semester 8", items: y3s8 }}
            />

          </div>
        </div>
      </div>
    </div>
  )
}
