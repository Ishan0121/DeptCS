"use client"

import { useState, useRef } from "react"
import { createFaculty, deleteFaculty, updateFaculty, uploadImage } from "../../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function FacultyClient({ initialFaculty }: { initialFaculty: any[] }) {
  const [faculty, setFaculty] = useState(initialFaculty)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    designation: "",
    specialization: "",
    email: "",
    imageUrl: "",
    order: 0
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      let imageUrl = formData.imageUrl
      
      // Upload image if selected
      if (fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0]
        const uploadData = new FormData()
        uploadData.append("file", file)
        imageUrl = await uploadImage(uploadData)
      }

      const dataToSave = { ...formData, imageUrl }
      
      if (formData.id) {
        await updateFaculty(formData.id, dataToSave)
      } else {
        await createFaculty(dataToSave)
      }
      
      window.location.reload()
    } catch (err) {
      alert("Error saving faculty")
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this member?")) {
      setLoading(true)
      await deleteFaculty(id)
      window.location.reload()
    }
  }

  const handleEdit = (member: any) => {
    setFormData(member)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Faculty</h1>
        <Button onClick={() => setFormData({ id: "", name: "", designation: "", specialization: "", email: "", imageUrl: "", order: 0 })}>
          Add New Member
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>{formData.id ? "Edit Member" : "Add Member"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Designation</Label>
                  <Input required value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Specialization</Label>
                  <Input required value={formData.specialization} onChange={e => setFormData({...formData, specialization: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Image Upload (Replaces existing)</Label>
                  <Input type="file" ref={fileInputRef} accept="image/*" />
                </div>
                <div className="space-y-2">
                  <Label>Order (Sorting)</Label>
                  <Input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} />
                </div>
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Saving..." : "Save Member"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-4">
          {faculty.map(member => (
            <Card key={member.id} className="glass-card">
              <CardContent className="p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  {member.imageUrl && <img src={member.imageUrl} alt={member.name} className="w-12 h-12 rounded-full object-cover" />}
                  <div>
                    <h3 className="font-bold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.designation} - {member.email}</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(member)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id)}>Delete</Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {faculty.length === 0 && <p className="text-muted-foreground">No faculty members found.</p>}
        </div>
      </div>
    </div>
  )
}
