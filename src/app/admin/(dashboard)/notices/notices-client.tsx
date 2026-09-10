"use client"

import { useState } from "react"
import { createNotice, deleteNotice, updateNotice } from "../../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function NoticesClient({ initialNotices }: { initialNotices: any[] }) {
  const [notices, setNotices] = useState(initialNotices)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    date: "",
    type: "",
    icon: "FileText"
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (formData.id) {
        await updateNotice(formData.id, formData)
      } else {
        await createNotice(formData)
      }
      // Since it's a server action with revalidatePath, 
      // we could refresh the router to get new data
      window.location.reload()
    } catch (err) {
      alert("Error saving notice")
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this notice?")) {
      setLoading(true)
      await deleteNotice(id)
      window.location.reload()
    }
  }

  const handleEdit = (notice: any) => {
    setFormData(notice)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Notices</h1>
        <Button onClick={() => setFormData({ id: "", title: "", description: "", date: "", type: "", icon: "FileText" })}>
          Add New Notice
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>{formData.id ? "Edit Notice" : "Add Notice"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input required placeholder="May 15, 2024" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Type (e.g., Exam, Event)</Label>
                  <Input required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Saving..." : "Save Notice"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-4">
          {notices.map(notice => (
            <Card key={notice.id} className="glass-card">
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{notice.title}</h3>
                  <p className="text-sm text-muted-foreground">{notice.date} - {notice.type}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(notice)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(notice.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {notices.length === 0 && <p className="text-muted-foreground">No notices found.</p>}
        </div>
      </div>
    </div>
  )
}
