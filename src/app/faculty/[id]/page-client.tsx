"use client"

import { HeroHeader } from "@/components/hero-header"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Briefcase, GraduationCap } from "lucide-react"
import Image from "next/image"

export default function FacultyDetailClient({ faculty, children }: { faculty: any, children?: React.ReactNode }) {
  let parsedDetails: { title: string, fields: { label: string, value: string }[] }[] = [];
  try {
    if (faculty.details) {
      parsedDetails = JSON.parse(faculty.details);
      if (!Array.isArray(parsedDetails)) parsedDetails = [];
    }
  } catch (e) {
    parsedDetails = [];
  }

  return (
    <div className="flex flex-col min-h-screen">
      <HeroHeader 
        title={faculty.name} 
        description={faculty.designation || "Faculty Member"}
      />
      
      <div className="flex-1 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="grid md:grid-cols-[300px_1fr] gap-12">
            
            {/* Left Column: Image and quick info */}
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <Card className="bento-card overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={faculty.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(faculty.name)}`}
                      alt={faculty.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {faculty.designation && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Briefcase className="w-5 h-5 text-primary" />
                    <span>{faculty.designation}</span>
                  </div>
                )}
                {faculty.departmentPosition && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-5 h-5 flex items-center justify-center text-primary font-bold">★</span>
                    <span className="font-semibold text-primary">{faculty.departmentPosition}</span>
                  </div>
                )}
                {faculty.specialization && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    <span>{faculty.specialization}</span>
                  </div>
                )}
                {faculty.email && (
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary" />
                    <a href={`mailto:${faculty.email}`} className="hover:text-primary transition-colors">
                      {faculty.email}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Detailed Bio/Content */}
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: '150ms', animationFillMode: 'both' }}>
              {parsedDetails.length > 0 ? (
                parsedDetails.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h2 className="text-2xl font-bold font-heading border-b border-border pb-2">{section.title}</h2>
                    {section.fields.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {section.fields.map((field, fIdx) => (
                          <div key={fIdx} className="bg-muted/30 p-4 rounded-lg border border-border/50">
                            <div className="text-sm font-medium text-muted-foreground mb-1">{field.label}</div>
                            <div className="text-foreground">{field.value}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground text-sm italic">No details added.</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold font-heading mb-6">Profile</h2>
                  <p className="text-muted-foreground italic">No detailed profile information is available for this member yet.</p>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
