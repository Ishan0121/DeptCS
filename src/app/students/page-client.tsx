"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Star, GraduationCap, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { HeroHeader } from "@/components/hero-header"
import Image from "next/image"

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 60, damping: 15 } },
}

function SectionHeading({ icon: Icon, title, tag }: { icon: any; title: string; tag: string }) {
  return (
    <div className="flex items-center justify-between mb-10 pb-4 border-b border-border">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black tracking-tight text-foreground">{title}</h2>
      </div>
      <span className="tech-mono hidden sm:block">{tag}</span>
    </div>
  )
}

export default function StudentsPageClient({ students }: { students: any[] }) {
  const achievements = students.filter(s => s.type === "Achievement")
  const featuredStudents = students.filter(s => s.type === "Featured")

  return (
    <div className="bg-background min-h-screen pb-24">
      <HeroHeader
        title="Student Corner"
        description="Celebrating the excellence, innovation, and achievements of our Computer Science students."
        icon={GraduationCap}
        tag="STUDENT DIRECTORY //"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="container px-4 py-16 md:py-20 mx-auto max-w-5xl"
      >

        {/* ── Key Achievements ── */}
        <section className="mb-20">
          <SectionHeading icon={Trophy} title="Key Achievements" tag="01 //" />

          {achievements.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 border border-dashed border-border rounded-xl text-muted-foreground bg-muted/5">
              <AlertCircle className="w-8 h-8 opacity-30 mb-3" />
              <p className="tech-mono">No achievements logged yet</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 gap-5"
            >
              {achievements.map((achievement, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="bento-card h-full group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <CardHeader className="flex flex-row items-start gap-4 pb-3">
                      <div className="w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 group-hover:border-primary/50 transition-colors duration-200">
                        <Trophy className="h-4 w-4 text-primary" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <CardTitle className="text-base font-bold leading-tight group-hover:text-primary transition-colors duration-200">
                          {achievement.name}
                        </CardTitle>
                        <div className="tech-mono text-primary/70">BATCH {achievement.batch}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                        {achievement.role}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

        {/* ── Featured Students ── */}
        <section>
          <SectionHeading icon={Star} title="Featured Students" tag="02 //" />

          {featuredStudents.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 border border-dashed border-border rounded-xl text-muted-foreground bg-muted/5">
              <AlertCircle className="w-8 h-8 opacity-30 mb-3" />
              <p className="tech-mono">No featured students yet</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {featuredStudents.map((student, index) => (
                <motion.div key={index} variants={item}>
                  <Card className="bento-card group relative overflow-hidden flex flex-col items-center text-center p-6">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Avatar */}
                    <div className="relative mb-4">
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border bg-muted group-hover:border-primary/40 transition-colors duration-300">
                        <Image
                          src={student.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(student.name)}`}
                          alt={student.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      </div>
                      <div className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-md bg-background border border-border flex items-center justify-center shadow-sm">
                        <Star className="w-3 h-3 text-amber-500" />
                      </div>
                    </div>

                    <CardTitle className="text-sm font-bold leading-tight mb-1 group-hover:text-primary transition-colors duration-200">
                      {student.name}
                    </CardTitle>
                    <div className="tech-mono text-[9px] mb-3">BATCH {student.batch}</div>

                    <div className="px-2.5 py-1 bg-muted rounded-md border border-border text-[11px] font-semibold text-muted-foreground group-hover:border-primary/30 transition-colors duration-200">
                      {student.role}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>

      </motion.div>
    </div>
  )
}
