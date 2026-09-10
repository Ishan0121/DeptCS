"use client"

import { useState, useRef } from "react"
import { createStudent, deleteStudent, updateStudent, uploadImage } from "../../actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Pencil, Trash2, Plus } from "lucide-react"

export default function StudentsClient({ initialStudents }: { initialStudents: any[] }) {
  const [students, setStudents] = useState(initialStudents)
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    batch: "",
    type: "Featured", // "Featured" or "Achievement"
    imageUrl: ""
  })

  const resetForm = () => {
    setFormData({ id: "", name: "", role: "", batch: "", type: "Featured", imageUrl: "" })
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleOpenDialog = (student?: any) => {
    if (student) {
      setFormData(student)
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      let imageUrl = formData.imageUrl
      
      if (fileInputRef.current?.files?.[0]) {
        const file = fileInputRef.current.files[0]
        const uploadData = new FormData()
        uploadData.append("file", file)
        imageUrl = await uploadImage(uploadData)
      }

      const dataToSave = { ...formData, imageUrl }
      
      if (formData.id) {
        await updateStudent(formData.id, dataToSave)
        toast.success("Student updated successfully!")
      } else {
        await createStudent(dataToSave)
        toast.success("Student added successfully!")
      }
      
      window.location.reload()
    } catch (err) {
      toast.error("Error saving student")
    }
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this record?")) {
      setLoading(true)
      try {
        await deleteStudent(id)
        toast.success("Student deleted!")
        window.location.reload()
      } catch(err) {
        toast.error("Failed to delete")
        setLoading(false)
      }
    }
  }

  const achievements = students.filter(s => s.type === "Achievement")
  const featured = students.filter(s => s.type === "Featured")

  const StudentTable = ({ data }: { data: any[] }) => (
    <div className="rounded-md border bg-card text-card-foreground">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Role/Achievement</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No records found.
              </TableCell>
            </TableRow>
          ) : (
            data.map((student) => (
              <TableRow key={student.id}>
                <TableCell>
                  {student.imageUrl ? (
                    <img src={student.imageUrl} alt={student.name} className="w-10 h-10 rounded-full object-cover border" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center border text-xs text-muted-foreground">N/A</div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{student.name}</TableCell>
                <TableCell>{student.role}</TableCell>
                <TableCell><Badge variant="outline">{student.batch}</Badge></TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(student)}>
                    <Pencil className="w-4 h-4 text-primary" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(student.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Student Corner</h1>
          <p className="text-muted-foreground mt-1">Manage featured students and key achievements.</p>
        </div>
        
        <Button onClick={() => handleOpenDialog()} className="gap-2">
          <Plus className="w-4 h-4" /> Add Record
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{formData.id ? "Edit Record" : "Add Record"}</DialogTitle>
              <DialogDescription>
                Fill out the details for the student. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. John Doe" />
              </div>
              <div className="space-y-2">
                <Label>Role or Achievement</Label>
                <Input required placeholder="e.g. Winner at Smart India Hackathon" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Batch</Label>
                <Input required placeholder="e.g. 2021-2024" value={formData.batch} onChange={e => setFormData({...formData, batch: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={formData.type} onValueChange={v => setFormData({...formData, type: v as string})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Featured">Featured Student</SelectItem>
                    <SelectItem value="Achievement">Key Achievement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Image (Optional)</Label>
                <Input type="file" ref={fileInputRef} accept="image/*" className="cursor-pointer" />
                {formData.imageUrl && <p className="text-xs text-muted-foreground mt-1">Current image will be replaced if a new one is selected.</p>}
              </div>
              <div className="pt-4 flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save Record"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="featured" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="featured">Featured Students</TabsTrigger>
          <TabsTrigger value="achievements">Key Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="featured" className="mt-6">
          <StudentTable data={featured} />
        </TabsContent>
        
        <TabsContent value="achievements" className="mt-6">
          <StudentTable data={achievements} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
