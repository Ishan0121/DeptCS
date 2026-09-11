"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { name: "Home",      href: "/" },
  { name: "About",     href: "/about" },
  { name: "Faculty",   href: "/faculty" },
  { name: "Students",  href: "/students" },
  { name: "Academics", href: "/academics" },
  { name: "Notices",   href: "/notices" },
  { name: "Contact",   href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)
  const pathname = usePathname()

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed left-1/2 -translate-x-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-7xl transition-all duration-300 rounded-full border border-border/20 dark:border-white/10 bg-muted/20 backdrop-blur-md overflow-hidden",
        scrolled
          ? "bg-background/40 border-border/50 shadow-md"
          : "bg-background/60 border-border/20 shadow-sm"
      )}
    >
      {/* Animated top accent line */}
      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="container flex h-[60px] items-center justify-between mx-auto px-4 md:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-7 h-7 rounded-[6px] bg-primary flex items-center justify-center relative overflow-hidden shadow-sm shadow-primary/40">
            <div className="absolute inset-0 bg-dot-matrix opacity-30 mix-blend-overlay" />
            <span className="text-primary-foreground font-black text-xs font-mono relative z-10 tracking-tight">CS</span>
          </div>
          <div className="flex flex-col -space-y-0.5">
            <span className="font-extrabold text-sm tracking-tight group-hover:text-primary transition-colors duration-200 leading-none">
              Department of CS
            </span>
            <span className="tech-mono text-[9px] text-muted-foreground/60 leading-none pt-2">Debra College</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5 relative">
          {navItems.map((nav) => {
            const isActive = pathname === nav.href
            return (
              <Link
                key={nav.href}
                href={nav.href}
                className={cn(
                  "relative px-3.5 py-1.5 text-[13px] font-semibold transition-colors duration-150 z-10 rounded-md",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navbar-active"
                    className="absolute inset-0 bg-primary/10 rounded-md -z-10 border border-primary/25"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                {nav.name}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className={cn(
                "lg:hidden w-9 h-9 rounded-md border border-border dark:border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted dark:hover:bg-white/5 transition-colors"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <X className="h-4 w-4" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                    <Menu className="h-4 w-4" />
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 bg-background/95 backdrop-blur-xl border-l border-border dark:border-white/10 p-0">
              <div className="flex flex-col h-full">
                <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-primary via-primary/50 to-transparent" />

                {/* Sheet header */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-border dark:border-white/10">
                  <Link
                    href="/"
                    className="flex items-center gap-2.5 group"
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="w-7 h-7 rounded-[6px] bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-black text-xs font-mono">CS</span>
                    </div>
                    <span className="font-extrabold text-sm tracking-tight">Dept of CS</span>
                  </Link>
                </div>

                {/* Mobile nav */}
                <nav className="flex flex-col gap-1 px-3 py-5 flex-1">
                  {navItems.map((nav, i) => {
                    const isActive = pathname === nav.href
                    return (
                      <motion.div
                        key={nav.href}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04, type: "spring", stiffness: 200, damping: 20 }}
                      >
                        <Link
                          href={nav.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary border border-primary/20 dark:border-primary/30"
                              : "text-muted-foreground hover:bg-muted dark:hover:bg-white/5 hover:text-foreground"
                          )}
                        >
                          {nav.name}
                          {isActive && (
                            <span className="tech-mono text-[9px] text-primary/60">//</span>
                          )}
                        </Link>
                      </motion.div>
                    )
                  })}
                </nav>

                {/* Mobile footer */}
                <div className="px-5 py-4 border-t border-border dark:border-white/10">
                  <p className="tech-mono text-[9px] text-muted-foreground/50">CS_DEPT // DEBRA COLLEGE</p>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
