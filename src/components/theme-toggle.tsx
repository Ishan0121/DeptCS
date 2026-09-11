"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch by waiting for mount
  React.useEffect(() => setMounted(true), [])

  const options = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "system", icon: Monitor, label: "System" },
    { name: "dark", icon: Moon, label: "Dark" },
  ]

  if (!mounted) {
    // Skeleton matching the exact size to prevent layout shift
    return <div className="w-[94px] h-8 rounded-full border border-border/20 bg-muted/20" />
  }

  return (
    <div className="flex items-center gap-0.5 p-0.5 rounded-full border border-border/20 dark:border-black/60 bg-muted/20 dark:bg-gray-900/65 backdrop-blur-xl shadow-inner dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
      {options.map((option) => {
        const isActive = theme === option.name
        const Icon = option.icon

        return (
          <button
            key={option.name}
            onClick={() => setTheme(option.name)}
            title={`Switch to ${option.label} theme`}
            className={cn(
              "relative flex items-center justify-center w-7 h-7 rounded-full transition-colors z-10",
              isActive 
                ? "text-primary dark:text-foreground" 
                : "text-muted-foreground hover:text-foreground dark:text-muted-foreground/50 dark:hover:text-muted-foreground/80"
            )}
            aria-label={option.label}
          >
            {isActive && (
              <motion.div
                layoutId="theme-toggle-indicator"
                className="absolute inset-0 bg-background dark:bg-white/[0.07] rounded-full shadow-sm dark:shadow-[0_2px_8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] border border-border/50 dark:border-none -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className="w-3.5 h-3.5" />
          </button>
        )
      })}
    </div>
  )
}
