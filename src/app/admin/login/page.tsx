"use client"

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Terminal, Loader2, ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("AUTHENTICATION_FAILED: Invalid credentials");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("SYSTEM_ERROR: Connection refused");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden p-4">
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-tech opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -mr-[400px] -mt-[400px] pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bento-card overflow-hidden rounded-xl border border-border/50 bg-background/80 backdrop-blur-xl shadow-2xl relative">
          
          {/* Top Decorative Line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
          
          <div className="p-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-8">
              <div className="w-12 h-12 rounded bg-muted/50 border border-border flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-matrix opacity-30" />
                <Lock className="w-5 h-5 text-foreground relative z-10" />
              </div>
              
              <div>
                <h1 className="text-2xl font-black tracking-tight text-foreground mb-1">System Access</h1>
                <p className="tech-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                  Authorization Required
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="username" className="tech-mono text-[10px] text-muted-foreground uppercase">
                      Admin_ID
                    </label>
                  </div>
                  <div className="relative group">
                    <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="username" 
                      type="text" 
                      placeholder="Enter administrator ID"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      autoComplete="off"
                      className="pl-10 bg-muted/20 border-border/50 focus:bg-background h-12 transition-all font-mono text-sm"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="tech-mono text-[10px] text-muted-foreground uppercase">
                      Security_Key
                    </label>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input 
                      id="password" 
                      type="password"
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-10 bg-muted/20 border-border/50 focus:bg-background h-12 transition-all font-mono text-sm tracking-widest"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex items-center gap-2 p-3 rounded bg-destructive/10 border border-destructive/20 text-destructive text-xs font-mono"
                >
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 font-bold tracking-widest uppercase text-xs relative overflow-hidden group" 
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    AUTHENTICATING...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    INITIATE_HANDSHAKE
                  </span>
                )}
                {/* Button Hover Effect */}
                <div className="absolute inset-0 bg-primary/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
              </Button>
            </form>
          </div>
          
          {/* Bottom structural trim */}
          <div className="h-10 bg-muted/30 border-t border-border/50 flex items-center justify-center">
            <span className="tech-mono text-[9px] text-muted-foreground/50">
              SECURE_CONNECTION // CMS_v2.0
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
