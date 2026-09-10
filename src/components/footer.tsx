import Link from "next/link"

const links = [
  { label: "About Us",   href: "/about" },
  { label: "Faculty",    href: "/faculty" },
  { label: "Students",   href: "/students" },
  { label: "Academics",  href: "/academics" },
  { label: "Notices",    href: "/notices" },
  { label: "Contact",    href: "/contact" },
]

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border bg-background">
      {/* Decorative top-left accent */}
      <div className="absolute top-0 left-0 w-1/4 h-px bg-gradient-to-r from-primary/50 to-transparent" />

      <div className="container mx-auto px-4 py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">

          {/* Brand block */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5 group">
              <div className="w-7 h-7 rounded-[6px] bg-primary flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-matrix opacity-30 mix-blend-overlay" />
                <span className="text-primary-foreground font-black text-xs font-mono relative z-10">CS</span>
              </div>
              <span className="font-extrabold text-base tracking-tight group-hover:text-primary transition-colors duration-200">
                Department of CS
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-[1.75] max-w-xs">
              Debra Thana Sahid Kshudiram Smriti Mahavidyalaya. Empowering the next generation of technologists since 2006.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="tech-mono text-foreground mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 inline-flex transition-all duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="tech-mono text-foreground mb-5">Contact</h4>
            <address className="not-italic space-y-2 text-sm text-muted-foreground leading-[1.8]">
              <p>Gangaram Chak, Debra</p>
              <p>Paschim Medinipur, West Bengal 721126</p>
              <a href="tel:+913222243400" className="hover:text-primary transition-colors block mt-3">+91 (03222) 243400</a>
              <a href="mailto:principal@debracollege.ac.in" className="hover:text-primary transition-colors block truncate">principal@debracollege.ac.in</a>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-muted-foreground/60">
            © {new Date().getFullYear()} Dept. of Computer Science, Debra College. All rights reserved.
          </p>
          <Link
            href="/admin/login"
            className="text-[11px] font-mono text-muted-foreground/40 hover:text-primary/70 transition-colors tracking-widest uppercase"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
