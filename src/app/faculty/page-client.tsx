"use client"

import { Users, GraduationCap, Mail, Briefcase, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { HeroHeader } from "@/components/hero-header"

export default function FacultyPageClient({ faculty }: { faculty: any[] }) {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 60, damping: 15 } as any },
  }

  return (
    <div className="bg-background min-h-screen pb-20">
      <HeroHeader
        title="Our Faculty"
        description="Meet our dedicated team of educators and researchers committed to guiding you towards excellence."
        icon={Users}
      />

      <div className="container px-4 pt-16 pb-20 mx-auto max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="tech-mono text-primary mb-2">DIRECTORY //</div>
            <h2 className="text-3xl font-black tracking-tight text-foreground">Academic Staff</h2>
          </div>
          <div className="tech-mono text-sm text-muted-foreground border-l-2 border-primary/50 pl-4">
            TOTAL_MEMBERS: {faculty.length < 10 ? `0${faculty.length}` : faculty.length}
          </div>
        </div>

        {faculty.length === 0 ? (
          <div className="text-center py-32 text-muted-foreground border border-dashed border-border rounded-xl bg-muted/10">
            <Users className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-sm font-mono tracking-wider">NO_FACULTY_DATA_FOUND</p>
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {faculty.map((member, index) => (
              <motion.div key={index} variants={item}>
                <div className="group relative bento-card flex flex-col overflow-hidden h-full">
                  {/* Hover Accent Line */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="p-8 pb-0 flex gap-6 items-start relative z-10">
                    {/* Photo Container */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-md border border-border overflow-hidden shrink-0 bg-muted p-1">
                      <div className="w-full h-full relative rounded-sm overflow-hidden bg-background">
                        <Image 
                          src={member.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`}
                          alt={member.name}
                          fill
                          unoptimized
                          sizes="(max-width: 768px) 100px, 120px"
                          priority={index < 4}
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                        />
                      </div>
                    </div>
                    
                    {/* ID & Name */}
                    <div className="flex-1 pt-1">
                      <div className="tech-mono text-[10px] text-muted-foreground mb-3 flex items-center justify-between">
                        <span className="tracking-widest">ID_0{index + 1}</span>
                        <span className="w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors duration-500 shadow-sm group-hover:shadow-md group-hover:shadow-primary/50" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold leading-none text-foreground group-hover:text-primary transition-colors duration-300 mb-2">{member.name}</h3>
                      {member.departmentPosition && (
                        <p className="text-xs font-bold text-primary mb-1 uppercase tracking-widest bg-primary/10 w-fit px-2 py-0.5 rounded-sm">{member.departmentPosition}</p>
                      )}
                      <p className="text-sm font-medium text-primary/80 leading-snug">{member.designation}</p>
                    </div>
                  </div>

                  {/* Details Body */}
                  <div className="p-8 pt-8 flex-1 flex flex-col justify-end relative z-10">
                    <div className="space-y-6">
                      <div>
                        <div className="tech-mono text-[10px] text-muted-foreground mb-2 flex items-center gap-2">
                          <BookOpen className="w-3 h-3" />
                          SPECIALIZATION
                        </div>
                        <p className="text-sm leading-relaxed text-foreground font-medium">{member.specialization}</p>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        {member.email && (
                          <div className="flex items-center gap-2 text-muted-foreground group/mail">
                            <Mail className="w-4 h-4 group-hover/mail:text-primary transition-colors" />
                            <a href={`mailto:${member.email}`} className="text-sm truncate group-hover/mail:text-primary transition-colors">
                              {member.email}
                            </a>
                          </div>
                        )}
                        <div className="mt-2">
                          <Link 
                            href={`/faculty/${member.id}`}
                            prefetch={true}
                            className="text-sm text-primary hover:underline flex items-center gap-1"
                          >
                            View Profile <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Background Element */}
                  <div className="absolute -bottom-6 -right-6 opacity-[0.03] pointer-events-none transform group-hover:scale-110 transition-transform duration-700">
                    <Users className="w-48 h-48" />
                  </div>
                  
                  <div className="absolute inset-0 bg-grid-tech opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
