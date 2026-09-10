"use client"

import { useEffect } from "react"
import { motion } from "framer-motion"
import { AlertTriangle, RefreshCcw, Terminal } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background relative overflow-hidden p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-destructive/5 rounded-full blur-[100px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bento-card overflow-hidden rounded-xl border border-destructive/30 bg-background/80 backdrop-blur-xl shadow-2xl relative">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-destructive/80 to-transparent" />
          
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 mx-auto rounded bg-destructive/10 border border-destructive/30 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-dot-matrix opacity-30" />
              <AlertTriangle className="w-8 h-8 text-destructive relative z-10" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-black tracking-tighter text-foreground">Fatal Exception</h1>
              <p className="tech-mono text-sm text-destructive tracking-widest uppercase">
                CRITICAL_SYSTEM_ERROR
              </p>
            </div>

            <div className="p-4 rounded-md bg-muted/30 border border-border/50 text-left overflow-hidden">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-muted-foreground" />
                <span className="tech-mono text-[10px] text-muted-foreground uppercase">Stack Trace</span>
              </div>
              <p className="font-mono text-xs text-muted-foreground leading-relaxed break-all">
                <span className="text-destructive">&gt;</span> {error.message || "Unknown segmentation fault occurred during rendering cycle."}
              </p>
            </div>

            <Button 
              onClick={() => reset()}
              variant="outline"
              className="w-full font-bold tracking-widest uppercase text-xs h-12 border-destructive/50 hover:bg-destructive/10 hover:text-destructive group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Reboot Sequence
              </span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
