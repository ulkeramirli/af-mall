import { PrismaClient } from '@prisma/client'
import { Calendar, Tag } from 'lucide-react'

const prisma = new PrismaClient()

export default async function EventsPage() {
  const events = await prisma.event.findMany({
    orderBy: { startDate: 'asc' }
  })

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="bg-blue-600 py-24 text-center px-4 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto">
          <Tag className="w-16 h-16 text-white/80 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Offers & Events</h1>
          <p className="text-xl text-blue-100 font-light">Don't miss out on the latest promotions, sales, and entertainment events happening at AF Mall.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-5xl">
        <div className="space-y-12">
          {events.map((event) => (
            <div key={event.id} className="flex flex-col md:flex-row bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden group hover:shadow-md transition-shadow">
              {event.imageUrl && (
                <div className="w-full md:w-2/5 h-64 md:h-auto shrink-0 relative overflow-hidden">
                  <img src={event.imageUrl} alt={event.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              )}
              <div className="p-8 flex flex-col justify-center flex-1">
                <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm mb-4 bg-blue-50 w-fit px-3 py-1 rounded-full">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.startDate).toLocaleDateString()} — {new Date(event.endDate).toLocaleDateString()}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{event.title}</h3>
                <p className="text-slate-600 leading-relaxed text-lg">{event.description}</p>
              </div>
            </div>
          ))}
          
          {events.length === 0 && (
            <div className="text-center py-24 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <p className="text-slate-500 text-lg">No upcoming events at the moment. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
