"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface HeroHeaderProps {
  title: string
  description: string
  icon?: LucideIcon
  tag?: string
}

export function HeroHeader({ title, description, icon: Icon, tag }: HeroHeaderProps) {
  return (
    <div className="relative py-16 md:py-24 border-b border-border bg-background overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-tech pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background pointer-events-none" />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-24 h-24 border-l border-t border-primary/15 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r border-b border-primary/10 pointer-events-none" />

      {/* Primary glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-primary/6 blur-[80px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-4 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col space-y-5"
        >
          {/* Icon + tag row */}
          <div className="flex items-center gap-3">
            {Icon && (
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="w-11 h-11 rounded-lg bg-muted/80 border border-border flex items-center justify-center relative overflow-hidden shrink-0"
              >
                <div className="absolute inset-0 bg-dot-matrix opacity-30" />
                <Icon className="h-5 w-5 text-primary relative z-10" />
              </motion.div>
            )}
            {tag && (
              <span className="tech-mono text-primary">{tag}</span>
            )}
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-[1.08]"
          >
            {title}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.28 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed border-l-2 border-primary/40 pl-4"
          >
            {description}
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
