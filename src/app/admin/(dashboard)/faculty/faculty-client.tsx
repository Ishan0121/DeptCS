"use client"

import { useState, useRef } from "react"
import { createFaculty, deleteFaculty, updateFaculty, uploadImage } from "../../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Trash2, Plus } from "lucide-react"

type ProfileField = { label: string; value: string };
type ProfileSection = { title: string; fields: ProfileField[] };

const defaultSections: ProfileSection[] = [
  { title: "Contact Information", fields: [] },
  { title: "Academic Background", fields: [] },
  { title: "Qualification", fields: [] },
  { title: "Experience", fields: [] },
];

export default function FacultyClient({ initialFaculty }: { initialFaculty: any[] }) {
  const [faculty, setFaculty] = useState(initialFaculty)
  const [loading, setLoading] = useState(false)
  const [detailsData, setDetailsData] = useState<ProfileSection[]>(defaultSections)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    designation: "",
    departmentPosition: "",
    specialization: "",
    email: "",
    details: "",
    imageUrl: "",
    order: "" as number | "" | null
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

      const dataToSave = { 
        ...formData, 
        imageUrl, 
        details: JSON.stringify(detailsData),
        order: formData.order === "" ? null : formData.order
      }
      
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
    
    try {
      if (member.details) {
        const parsed = JSON.parse(member.details)
        if (Array.isArray(parsed)) {
          setDetailsData(parsed)
        } else {
          setDetailsData(defaultSections)
        }
      } else {
        setDetailsData(defaultSections)
      }
    } catch (e) {
      setDetailsData(defaultSections)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Faculty</h1>
        <Button onClick={() => {
          setFormData({ id: "", name: "", designation: "", departmentPosition: "", specialization: "", email: "", details: "", imageUrl: "", order: "" as any })
          setDetailsData(defaultSections)
        }}>
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
                  <Label>Name <span className="text-red-500">*</span></Label>
                  <Input required value={formData.name || ""} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Designation <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                  <Input value={formData.designation || ""} onChange={e => setFormData({...formData, designation: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Position in Department <span className="text-muted-foreground text-xs font-normal">(e.g. HOD, TIC)</span></Label>
                  <Input value={formData.departmentPosition || ""} onChange={e => setFormData({...formData, departmentPosition: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Specialization <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                  <Input value={formData.specialization || ""} onChange={e => setFormData({...formData, specialization: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Email <span className="text-muted-foreground text-xs font-normal">(Optional)</span></Label>
                  <Input type="email" value={formData.email || ""} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div className="space-y-4 border p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold">Detailed Profile Sections</Label>
                    <Button type="button" variant="outline" size="sm" onClick={() => setDetailsData([...detailsData, { title: "New Section", fields: [] }])}>
                      <Plus className="w-4 h-4 mr-2" /> Add Section
                    </Button>
                  </div>
                  
                  {detailsData.map((section, sIndex) => (
                    <div key={sIndex} className="space-y-3 border p-3 rounded-md bg-secondary/10">
                      <div className="flex gap-2 items-center">
                        <Input 
                          value={section.title} 
                          onChange={(e) => {
                            const newDetails = [...detailsData];
                            newDetails[sIndex].title = e.target.value;
                            setDetailsData(newDetails);
                          }} 
                          className="font-bold flex-1"
                        />
                        <Button type="button" variant="destructive" size="icon" onClick={() => {
                          const newDetails = [...detailsData];
                          newDetails.splice(sIndex, 1);
                          setDetailsData(newDetails);
                        }}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {section.fields.map((field, fIndex) => (
                        <div key={fIndex} className="flex gap-2 items-start">
                          <Input 
                            placeholder="Label"
                            value={field.label}
                            onChange={(e) => {
                              const newDetails = [...detailsData];
                              newDetails[sIndex].fields[fIndex].label = e.target.value;
                              setDetailsData(newDetails);
                            }}
                          />
                          <Input 
                            placeholder="Value"
                            value={field.value}
                            onChange={(e) => {
                              const newDetails = [...detailsData];
                              newDetails[sIndex].fields[fIndex].value = e.target.value;
                              setDetailsData(newDetails);
                            }}
                          />
                          <Button type="button" variant="outline" size="icon" onClick={() => {
                            const newDetails = [...detailsData];
                            newDetails[sIndex].fields.splice(fIndex, 1);
                            setDetailsData(newDetails);
                          }}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="secondary" size="sm" onClick={() => {
                        const newDetails = [...detailsData];
                        newDetails[sIndex].fields.push({ label: "", value: "" });
                        setDetailsData(newDetails);
                      }}>
                        <Plus className="w-3 h-3 mr-1" /> Add Field
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label>Image Upload <span className="text-muted-foreground text-xs font-normal">(Optional, replaces existing)</span></Label>
                  <Input type="file" ref={fileInputRef} accept="image/*" />
                </div>
                <div className="space-y-2">
                  <Label>Order (Sorting) <span className="text-muted-foreground text-xs font-normal">(Optional, alphabetical fallback)</span></Label>
                  <Input type="number" value={formData.order ?? ""} onChange={e => setFormData({...formData, order: e.target.value === "" ? null : parseInt(e.target.value)})} />
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
                    {member.departmentPosition && (
                      <p className="text-xs font-semibold text-primary mb-1">{member.departmentPosition}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {member.designation || "No designation"} {member.email && `- ${member.email}`}
                    </p>
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
