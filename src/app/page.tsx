"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, GraduationCap, Users, Bell, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 55, damping: 16 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const cards = [
  {
    icon: BookOpen,
    tag: "01 // CURRICULUM",
    title: "Academics & Syllabus",
    description: "Comprehensive B.Sc curriculum designed for modern computing needs — from algorithms to applied AI.",
    href: "/academics",
    cta: "View Syllabus",
  },
  {
    icon: Users,
    tag: "02 // DIRECTORY",
    title: "Our Faculty",
    description: "Learn from experienced educators and industry professionals dedicated to your growth.",
    href: "/faculty",
    cta: "Meet the Team",
  },
  {
    icon: GraduationCap,
    tag: "03 // ACHIEVEMENTS",
    title: "Student Corner",
    description: "Discover achievements, accolades, and brilliant projects from our student community.",
    href: "/students",
    cta: "See Achievements",
  },
  {
    icon: Bell,
    tag: "04 // COMMUNICATIONS",
    title: "Notice Board",
    description: "Stay updated with the latest department announcements, exam schedules, and events.",
    href: "/notices",
    cta: "View Notices",
  },
]

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative w-full py-24 md:py-32 lg:py-44 overflow-hidden border-b border-border">
        {/* BG layers */}
        <div className="absolute inset-0 bg-grid-tech" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-primary/8 blur-[120px] rounded-full pointer-events-none" />

        {/* Corner brackets */}
        <div className="absolute top-6 left-6 w-10 h-10 border-l-2 border-t-2 border-primary/25 pointer-events-none" />
        <div className="absolute bottom-6 right-6 w-10 h-10 border-r-2 border-b-2 border-primary/20 pointer-events-none" />

        <div className="container px-4 md:px-6 relative z-10 mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 items-center">

            {/* Left: Text */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col items-start"
            >
              {/* Status pill */}
              <motion.div variants={fadeUp} className="mb-8">
                <span className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-muted border border-border text-[11px] font-mono uppercase tracking-widest text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  Est. 2006 · Active Enrollment
                </span>
              </motion.div>

              {/* Heading */}
              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-black tracking-[-0.03em] leading-[1.04] text-foreground mb-7"
              >
                Department
                <br />
                <span className="text-primary">of Computer</span>
                <br />
                Science
              </motion.h1>

              {/* Sub */}
              <motion.p
                variants={fadeUp}
                className="max-w-[520px] text-base md:text-lg text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-4 mb-10"
              >
                B.Sc in Computer Science at Debra Thana Sahid Kshudiram Smriti Mahavidyalaya. Empowering the next generation of technologists.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/about"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 px-7 text-[13px] font-bold uppercase tracking-wider rounded-lg"
                  )}
                >
                  Explore Department
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/notices"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 px-7 text-[13px] font-bold uppercase tracking-wider rounded-lg border-border hover:bg-muted"
                  )}
                >
                  Latest Notices
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Terminal */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="hidden lg:block relative w-full max-w-md mx-auto lg:ml-auto lg:mr-0"
            >
              <div className="absolute inset-0 bg-primary/15 blur-[80px] rounded-full" />

              <motion.div
                initial={{ rotateY: 12, rotateX: 4 }}
                animate={{ rotateY: -4, rotateX: 2 }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="relative rounded-xl overflow-hidden border border-border/60 bg-card/80 backdrop-blur-2xl shadow-2xl shadow-primary/10 z-10"
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
              >
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/40">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  </div>
                  <div className="flex-1 text-center font-mono text-[10px] text-muted-foreground/50 tracking-widest">
                    sys_core@dept-cs:~
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-5 font-mono text-[12px] text-muted-foreground space-y-3">
                  <div className="flex gap-3">
                    <span className="text-primary shrink-0">➜</span>
                    <span className="text-foreground">./initialize_dept.sh</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-1.5 pl-6"
                  >
                    {[
                      "[OK] Booting department core...",
                      "[OK] Loading syllabus frameworks...",
                      "[OK] Connecting faculty nodes...",
                      "[OK] Syncing student records...",
                    ].map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.25 }}
                        className="text-muted-foreground/55"
                      >
                        {line}
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0 }}
                    className="flex gap-3 pt-1"
                  >
                    <span className="text-primary shrink-0">➜</span>
                    <span className="text-foreground">run diagnostics --visual</span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ delay: 2.5, duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-7 gap-1.5 items-end h-20 pt-3 border-t border-dashed border-border/40 mt-2">
                      {[45, 72, 38, 90, 55, 80, 65].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 2.8 + i * 0.08, duration: 0.8, type: "spring", stiffness: 80 }}
                          className="w-full bg-primary/15 rounded-t-sm relative"
                        >
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/60 rounded-full shadow-[0_0_6px_oklch(0.52_0.22_255_/_0.5)]" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.2 }}
                    className="flex gap-3 items-center"
                  >
                    <span className="text-primary shrink-0">➜</span>
                    <span className="inline-block w-[7px] h-[14px] bg-foreground/70 animate-pulse rounded-[1px]" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Cards Grid ── */}
      <section className="w-full py-20 md:py-28 bg-muted/20">
        <div className="container px-4 md:px-6 mx-auto">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12"
          >
            <div>
              <p className="tech-mono text-primary mb-2">CORE DIRECTORIES</p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground">
                Explore the Department
              </h2>
            </div>
            <div className="hidden sm:block h-px bg-border flex-1 max-w-[200px] mb-2" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {cards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, type: "spring", stiffness: 60, damping: 16 }}
                >
                  <Link href={card.href} className="block h-full group">
                    <div className="bento-card h-full p-6 flex flex-col relative overflow-hidden">
                      <div className="absolute inset-0 bg-dot-matrix opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none" />
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10 flex flex-col flex-1">
                        <div className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center mb-5 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-300">
                          <Icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                        </div>

                        <div className="tech-mono mb-3">{card.tag}</div>

                        <h3 className="text-lg font-bold tracking-tight text-foreground mb-2.5 group-hover:text-primary transition-colors duration-200">
                          {card.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{card.description}</p>

                        <div className="mt-6 flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                          {card.cta}
                          <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA Band ── */}
      <section className="w-full py-16 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-tech pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />

        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-between gap-6"
          >
            <div>
              <div className="tech-mono text-primary mb-2">REACH OUT</div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">
                Have questions? We're here.
              </h2>
              <p className="text-muted-foreground mt-1.5 text-sm">
                Contact the department office for admissions, courses, or anything else.
              </p>
            </div>
            <Link
              href="/contact"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-8 text-[13px] font-bold uppercase tracking-wider rounded-lg shrink-0"
              )}
            >
              Contact Us
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
