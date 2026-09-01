import { PrismaClient } from "@prisma/client"
import { Store, Tag, Calendar, Users } from "lucide-react"

const prisma = new PrismaClient()

export default async function AdminDashboard() {
  const [storeCount, categoryCount, eventCount, userCount] = await Promise.all([
    prisma.store.count(),
    prisma.category.count(),
    prisma.event.count(),
    prisma.user.count(),
  ])

  const stats = [
    { name: "Total Stores", value: storeCount, icon: Store, color: "text-blue-600", bg: "bg-blue-100" },
    { name: "Categories", value: categoryCount, icon: Tag, color: "text-indigo-600", bg: "bg-indigo-100" },
    { name: "Active Events", value: eventCount, icon: Calendar, color: "text-orange-600", bg: "bg-orange-100" },
    { name: "Administrators", value: userCount, icon: Users, color: "text-slate-600", bg: "bg-slate-100" },
  ]

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center shrink-0`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.name}</p>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mt-8">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h3>
        <p className="text-slate-600 text-sm">Welcome to the AF Mall Administration Panel. Use the sidebar to navigate to different sections and manage your website content.</p>
      </div>
    </div>
  )
}
