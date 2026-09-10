import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, GraduationCap, Settings } from "lucide-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function AdminDashboardPage() {
  const [noticesCount, facultyCount, studentsCount] = await Promise.all([
    prisma.notice.count(),
    prisma.faculty.count(),
    prisma.student.count(),
  ]);

  const stats = [
    { title: "Total Notices", value: noticesCount, icon: FileText, color: "text-blue-500" },
    { title: "Faculty Members", value: facultyCount, icon: Users, color: "text-green-500" },
    { title: "Featured Students", value: studentsCount, icon: GraduationCap, color: "text-purple-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to the Content Management System. Select an option from the sidebar to start editing.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 p-6 rounded-lg bg-primary/5 border border-primary/10">
        <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
          <Settings className="h-5 w-5 text-primary" /> System Status
        </h3>
        <p className="text-sm text-muted-foreground">
          Database connection is active. All systems are operating normally. 
          Uploads are configured to route through your S3-compatible cloud storage bucket.
        </p>
      </div>
    </div>
  );
}
