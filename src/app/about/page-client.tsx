"use client"

import { motion } from "framer-motion"
import { HeroHeader } from "@/components/hero-header"
import { Building2, Target, Eye, BookOpen, Users, Award, CalendarDays, ExternalLink } from "lucide-react"

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 55, damping: 18 } },
}

const STATS = [
  { label: "Established", value: "2006", icon: CalendarDays },
  { label: "Faculty", value: "8+", icon: Users },
  { label: "Intake / Year", value: "120", icon: BookOpen },
  { label: "NAAC Grade", value: "A", icon: Award },
]

export default function AboutPageClient({ content }: { content: any }) {
  return (
    <div className="bg-background min-h-screen">
      <HeroHeader
        title="About the Department"
        description="Debra Thana Sahid Kshudiram Smriti Mahavidyalaya — nurturing Computer Science talent since 2006."
        icon={Building2}
      />

      <div className="container px-4 pb-28 pt-16 mx-auto max-w-5xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-16"
        >

          {/* ── Stats Row ── */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {STATS.map(({ label, value, icon: Icon }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, type: "spring", stiffness: 60, damping: 16 }}
                className="group relative bento-card px-5 py-6 flex flex-col gap-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="w-8 h-8 rounded bg-muted border border-border flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <div className="text-[2rem] font-black leading-none tracking-tighter text-foreground">{value}</div>
                  <div className="tech-mono mt-1.5">{label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ── History ── */}
          <motion.section variants={fadeUp}>
            <SectionHeading index="01" title="Our History" />

            <div className="bento-card relative overflow-hidden group">
              {/* Left accent bar */}
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-primary/70 via-primary/30 to-transparent" />
              {/* Corner glow */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary/4 rounded-full blur-3xl -mr-24 -mt-24 pointer-events-none group-hover:bg-primary/8 transition-colors duration-700" />

              <div className="p-8 md:p-10 pl-10 md:pl-12 relative z-10">
                {content?.history ? (
                  <p className="text-base text-muted-foreground leading-[1.9] whitespace-pre-wrap">
                    {content.history}
                  </p>
                ) : (
                  <EmptySlot label="History not set yet. Update from the Admin Dashboard." />
                )}
              </div>
            </div>
          </motion.section>

          {/* ── Mission & Vision ── */}
          <motion.section variants={fadeUp}>
            <SectionHeading index="02" title="Core Values" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <ValueCard
                icon={Target}
                tag="DIRECTIVE"
                title="Our Mission"
                body={content?.mission}
              />
              <ValueCard
                icon={Eye}
                tag="OBJECTIVE"
                title="Our Vision"
                body={content?.vision}
              />
            </div>
          </motion.section>

          {/* ── Affiliation Banner ── */}
          <motion.section variants={fadeUp}>
            <div className="bento-card relative overflow-hidden group">
              <div className="absolute inset-0 bg-grid-tech opacity-[0.18] pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent pointer-events-none" />

              <div className="relative z-10 p-8 md:p-10 flex flex-col sm:flex-row sm:items-center gap-6 justify-between">
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <span className="tech-mono">AFFILIATION // STATUS:</span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold font-mono uppercase tracking-wider text-emerald-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Vidyasagar University</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                    Affiliated institution, proudly accredited with NAAC Grade{" "}
                    <span className="font-bold text-foreground">"A"</span>. Committed to high academic standards and fostering innovation in technology education.
                  </p>
                </div>

                <a
                  href="https://www.vidyasagar.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-background/80 text-sm font-semibold text-foreground hover:text-primary hover:border-primary/60 hover:bg-primary/5 transition-all duration-200 shrink-0 group/btn backdrop-blur-sm"
                >
                  Visit University
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </motion.section>

        </motion.div>
      </div>
    </div>
  )
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="flex items-end justify-between mb-7 pb-4 border-b border-border">
      <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{title}</h2>
      <span className="tech-mono hidden sm:block">{index} //</span>
    </div>
  )
}

function ValueCard({
  icon: Icon,
  tag,
  title,
  body,
}: {
  icon: React.ElementType
  tag: string
  title: string
  body?: string
}) {
  return (
    <div className="bento-card p-7 group relative overflow-hidden flex flex-col min-h-[220px]">
      {/* Top hover accent */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
      {/* Ghost icon */}
      <div className="absolute -bottom-8 -right-8 opacity-[0.04] pointer-events-none group-hover:opacity-[0.07] transition-opacity duration-500">
        <Icon className="w-36 h-36" />
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded bg-muted border border-border flex items-center justify-center shrink-0">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <div className="tech-mono text-[9px]">{tag}</div>
            <h3 className="text-base font-bold tracking-tight text-foreground leading-none mt-0.5">{title}</h3>
          </div>
        </div>

        {/* Body */}
        {body ? (
          <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-[1.8] flex-1">{body}</p>
        ) : (
          <EmptySlot label="Not set yet." />
        )}
      </div>
    </div>
  )
}

function EmptySlot({ label }: { label: string }) {
  return (
    <p className="text-muted-foreground/40 italic font-mono text-xs">{label}</p>
  )
}
