"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { HeroHeader } from "@/components/hero-header"
import { useState } from "react"

export default function NoticesPageClient({ latestNotices, pastNotices }: { latestNotices: any[], pastNotices: any[] }) {
  const [activeTab, setActiveTab] = useState("latest")

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  }
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 65, damping: 16 } },
  }

  const typeColor: Record<string, string> = {
    Exam:        "text-amber-600 bg-amber-50 border-amber-200 dark:text-amber-400 dark:bg-amber-950/40 dark:border-amber-800/50",
    Event:       "text-blue-600 bg-blue-50 border-blue-200 dark:text-blue-400 dark:bg-blue-950/40 dark:border-blue-800/50",
    General:     "text-muted-foreground bg-muted border-border",
    Holiday:     "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-800/50",
    Admission:   "text-purple-600 bg-purple-50 border-purple-200 dark:text-purple-400 dark:bg-purple-950/40 dark:border-purple-800/50",
    Result:      "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-950/40 dark:border-rose-800/50",
  }

  function NoticeList({ notices }: { notices: any[] }) {
    if (notices.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-28 text-muted-foreground border border-dashed border-border rounded-xl bg-muted/5">
          <AlertCircle className="w-8 h-8 opacity-30 mb-3" />
          <p className="tech-mono">No notices found</p>
        </div>
      )
    }

    return (
      <motion.div variants={container} initial="hidden" animate="show" className="relative">
        {/* Timeline line */}
        <div className="absolute left-[11px] md:left-[148px] top-3 bottom-3 w-px bg-border/50" />

        <div className="space-y-10">
          {notices.map((notice, index) => {
            const colorClass = typeColor[notice.type] ?? typeColor["General"]
            return (
              <motion.div key={index} variants={item} className="relative group">
                <div className="flex flex-col md:flex-row md:gap-10">

                  {/* Date + type column */}
                  <div className="relative pl-9 md:pl-0 md:w-[148px] md:text-right shrink-0 pt-0.5 flex flex-col md:items-end gap-1.5">
                    {/* Dot */}
                    <div className="absolute left-[7px] md:left-[144px] top-[6px] w-[9px] h-[9px] rounded-full bg-background border-[2px] border-border group-hover:border-primary group-hover:bg-primary group-hover:scale-125 transition-all duration-300 z-10" />

                    <time className="font-mono text-[11px] text-muted-foreground group-hover:text-foreground transition-colors leading-none">
                      {notice.date}
                    </time>
                    <span className={`inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${colorClass}`}>
                      {notice.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pl-9 md:pl-0 mt-2 md:mt-0 flex-1 pb-2">
                    <h3 className="text-lg font-bold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors duration-200 leading-snug">
                      {notice.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {notice.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="bg-background min-h-screen pb-24">
      <HeroHeader
        title="Notice Board"
        description="Stay updated with the latest announcements, examination schedules, and department events."
        icon={Bell}
        tag="COMMUNICATIONS //"
      />

      <div className="container px-4 py-16 mx-auto max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">

          {/* Header + tab row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14">
            <div>
              <p className="tech-mono text-primary mb-1.5">DEPARTMENT LOG</p>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                All Notices
              </h2>
            </div>

            <TabsList className="w-full sm:w-auto grid grid-cols-2 bg-muted/30 border border-border rounded-lg p-1 h-auto gap-1">
              <TabsTrigger
                value="latest"
                className="text-[11px] font-bold uppercase tracking-wider rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm py-2"
              >
                Latest <span className="ml-1.5 font-mono text-muted-foreground">({latestNotices.length})</span>
              </TabsTrigger>
              <TabsTrigger
                value="past"
                className="text-[11px] font-bold uppercase tracking-wider rounded-md data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm py-2"
              >
                Archive <span className="ml-1.5 font-mono text-muted-foreground">({pastNotices.length})</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            <TabsContent key="latest" value="latest" className="mt-0 outline-none">
              <NoticeList notices={latestNotices} />
            </TabsContent>
            <TabsContent key="past" value="past" className="mt-0 outline-none">
              <NoticeList notices={pastNotices} />
            </TabsContent>
          </AnimatePresence>

        </Tabs>
      </div>
    </div>
  )
}
