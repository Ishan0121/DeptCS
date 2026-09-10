"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ShieldAlert, ArrowLeft, Terminal } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bento-card overflow-hidden rounded-xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl relative">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-destructive/50 to-transparent" />
          
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 border border-destructive/20 flex items-center justify-center relative">
              <ShieldAlert className="w-8 h-8 text-destructive animate-pulse" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tighter text-foreground">404</h1>
              <p className="tech-mono text-sm text-destructive tracking-widest uppercase">
                ERROR: Sector Not Found
              </p>
            </div>

            <div className="p-4 rounded-md bg-muted/30 border border-border/50 text-left">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-muted-foreground" />
                <span className="tech-mono text-[10px] text-muted-foreground uppercase">System Log</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                <span className="text-destructive">&gt;</span> The requested directory pathway does not exist in the mainframe.<br/>
                <span className="text-primary">&gt;</span> Re-routing connection to root required.
              </p>
            </div>

            <Link 
              href="/"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full font-bold tracking-widest uppercase text-xs h-12 group overflow-hidden relative"
              )}
            >
              <span className="relative z-10 flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Return to Root
              </span>
              <div className="absolute inset-0 bg-primary/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
