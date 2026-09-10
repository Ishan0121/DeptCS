"use client"

import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { motion } from "framer-motion"
import { HeroHeader } from "@/components/hero-header"

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12 } },
} as any

const item = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 70, damping: 16 } },
} as any

const contactItems = [
  {
    icon: MapPin,
    title: "Department Office",
    tag: "01 // LOCATION",
    content: "Debra Thana Sahid Kshudiram Smriti Mahavidyalaya\nGangaram Chak, Chakshyamakant\nPaschim Medinipur, West Bengal 721126",
    isText: true,
  },
  {
    icon: Phone,
    title: "Direct Line",
    tag: "02 // PHONE",
    content: "+91 (03222) 243400",
    href: "tel:+913222243400",
  },
  {
    icon: Mail,
    title: "Email Support",
    tag: "03 // EMAIL",
    content: "principal@debracollege.ac.in",
    href: "mailto:principal@debracollege.ac.in",
  },
  {
    icon: Clock,
    title: "Working Hours",
    tag: "04 // TIMINGS",
    content: "Monday – Saturday\n10:00 AM – 5:00 PM (IST)",
    isText: true,
  },
]

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      <HeroHeader
        title="Contact Us"
        description="We're here to help. Reach out for admissions, technical inquiries, or collaborations."
        icon={MapPin}
        tag="GET IN TOUCH //"
      />

      <div className="container mx-auto px-4 py-16 md:py-20 max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-20 items-start">

          {/* ── Left: Info ── */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="space-y-10"
          >
            <motion.div variants={item}>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight text-foreground mb-3">
                Get in touch
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base">
                Whether you have a question about the curriculum, admission process, or just want to say hello — our department office is always ready.
              </p>
            </motion.div>

            <div className="relative space-y-8">
              {/* Connecting vertical line */}
              <div className="absolute left-[18px] top-5 bottom-5 w-px bg-border/60 hidden sm:block" />

              {contactItems.map(({ icon: Icon, title, tag, content, href, isText }) => (
                <motion.div key={title} variants={item} className="relative flex gap-5 group">
                  <div className="relative z-10 w-9 h-9 rounded-lg bg-muted border border-border flex items-center justify-center shrink-0 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-200">
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </div>
                  <div className="space-y-1 pt-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-base text-foreground tracking-tight">{title}</h3>
                      <span className="tech-mono text-[9px]">{tag}</span>
                    </div>
                    {isText ? (
                      <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">{content}</p>
                    ) : (
                      <a href={href} className="text-sm text-muted-foreground hover:text-primary transition-colors block">
                        {content}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bento-card relative p-7 sm:p-10 overflow-hidden">
              <div className="absolute inset-0 bg-grid-tech opacity-[0.15] pointer-events-none" />
              <div className="absolute top-0 right-0 w-56 h-56 bg-primary/4 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              <div className="relative z-10">
                <div className="mb-8">
                  <div className="tech-mono text-primary mb-1.5">SECURE CHANNEL</div>
                  <h3 className="text-xl font-bold tracking-tight text-foreground">Send a Message</h3>
                </div>

                <form className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField id="first-name" label="First name" placeholder="e.g. Alan" required />
                    <FormField id="last-name" label="Last name" placeholder="e.g. Turing" required />
                  </div>

                  <FormField id="email" label="Email address" placeholder="alan@example.com" type="email" required />
                  <FormField id="subject" label="Subject" placeholder="How can we help?" />

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                      Message <span className="text-primary">*</span>
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Write your message here..."
                      className="min-h-[140px] resize-none bg-background/80 border-border rounded-lg focus-visible:ring-primary/30 focus-visible:border-primary text-sm transition-all"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 mt-2 text-[13px] font-bold uppercase tracking-wider rounded-lg group"
                  >
                    Send Message
                    <Send className="ml-2 h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

function FormField({
  id, label, placeholder, type = "text", required,
}: {
  id: string; label: string; placeholder: string; type?: string; required?: boolean
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        className="h-10 bg-background/80 border-border rounded-lg focus-visible:ring-primary/30 focus-visible:border-primary text-sm transition-all"
      />
    </div>
  )
}
