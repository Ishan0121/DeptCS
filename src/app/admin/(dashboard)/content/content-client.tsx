"use client"

import { useState } from "react"
import { updatePageContent } from "../../actions"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"

export default function ContentClient({ initialAboutContent, initialAcademicsContent }: { initialAboutContent: any, initialAcademicsContent: any }) {
  const [about, setAbout] = useState(initialAboutContent)
  const [academics, setAcademics] = useState(initialAcademicsContent)
  const [loadingAbout, setLoadingAbout] = useState(false)
  const [loadingAcademics, setLoadingAcademics] = useState(false)

  const handleAboutSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingAbout(true)
    try {
      await updatePageContent("about", about)
      toast.success("About content updated successfully!")
    } catch (err) {
      toast.error("Error saving about content")
    }
    setLoadingAbout(false)
  }

  const handleAcademicsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingAcademics(true)
    try {
      await updatePageContent("academics", academics)
      toast.success("Academics syllabus updated successfully!")
    } catch (err) {
      toast.error("Error saving academics content")
    }
    setLoadingAcademics(false)
  }

  const handleAcademicsArrayChange = (field: string, text: string) => {
    // Assuming the user types a comma-separated list or newline-separated list
    const items = text.split('\n').map(i => i.trim()).filter(i => i)
    setAcademics({ ...academics, [field]: items })
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Page Content</h1>
      </div>

      <Tabs defaultValue="about" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="academics">Academics & Syllabus</TabsTrigger>
        </TabsList>
        
        <TabsContent value="about">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>About Page Content</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAboutSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Department History</Label>
              <Textarea 
                className="min-h-[150px]"
                value={about.history} 
                onChange={e => setAbout({...about, history: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Vision</Label>
              <Textarea 
                className="min-h-[100px]"
                value={about.vision} 
                onChange={e => setAbout({...about, vision: e.target.value})} 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Mission</Label>
              <Textarea 
                className="min-h-[100px]"
                value={about.mission} 
                onChange={e => setAbout({...about, mission: e.target.value})} 
              />
            </div>
            
            <Button type="submit" disabled={loadingAbout} className="w-full">
              {loadingAbout ? "Saving..." : "Save About Content"}
            </Button>
          </form>
        </CardContent>
      </Card>
      </TabsContent>

      <TabsContent value="academics">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Academics & Syllabus</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAcademicsSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Course Overview</Label>
                <Textarea 
                  className="min-h-[150px]"
                  value={academics.overview} 
                  onChange={e => setAcademics({...academics, overview: e.target.value})} 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Semester 1 (One per line)</Label>
                  <Textarea 
                    className="min-h-[120px]"
                    value={(academics.y1s1 || []).join('\n')} 
                    onChange={e => handleAcademicsArrayChange('y1s1', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Semester 2 (One per line)</Label>
                  <Textarea 
                    className="min-h-[120px]"
                    value={(academics.y1s2 || []).join('\n')} 
                    onChange={e => handleAcademicsArrayChange('y1s2', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Semester 3 (One per line)</Label>
                  <Textarea 
                    className="min-h-[120px]"
                    value={(academics.y2s3 || []).join('\n')} 
                    onChange={e => handleAcademicsArrayChange('y2s3', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Semester 4 (One per line)</Label>
                  <Textarea 
                    className="min-h-[120px]"
                    value={(academics.y2s4 || []).join('\n')} 
                    onChange={e => handleAcademicsArrayChange('y2s4', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Semester 5 (One per line)</Label>
                  <Textarea 
                    className="min-h-[120px]"
                    value={(academics.y3s5 || []).join('\n')} 
                    onChange={e => handleAcademicsArrayChange('y3s5', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Semester 6 (One per line)</Label>
                  <Textarea 
                    className="min-h-[120px]"
                    value={(academics.y3s6 || []).join('\n')} 
                    onChange={e => handleAcademicsArrayChange('y3s6', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Semester 7 (One per line)</Label>
                  <Textarea 
                    className="min-h-[120px]"
                    value={(academics.y3s7 || []).join('\n')} 
                    onChange={e => handleAcademicsArrayChange('y3s7', e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Semester 8 (One per line)</Label>
                  <Textarea 
                    className="min-h-[120px]"
                    value={(academics.y3s8 || []).join('\n')} 
                    onChange={e => handleAcademicsArrayChange('y3s8', e.target.value)} 
                  />
                </div>
              </div>
              
              <Button type="submit" disabled={loadingAcademics} className="w-full">
                {loadingAcademics ? "Saving..." : "Save Syllabus"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </TabsContent>
      </Tabs>
    </div>
  )
}
