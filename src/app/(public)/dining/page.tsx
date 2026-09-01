import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { MapPin, Utensils } from 'lucide-react'

const prisma = new PrismaClient()

export default async function DiningPage() {
  const diningStores = await prisma.store.findMany({
    where: {
      category: {
        name: { contains: 'Dining' }
      }
    },
    include: { category: true }
  })

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero */}
      <div className="bg-slate-900 py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80" alt="Dining" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <Utensils className="w-16 h-16 text-orange-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Culinary Delights</h1>
          <p className="text-xl text-slate-300 font-light">From quick bites to fine dining, discover a world of flavors at AF Mall.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diningStores.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id} className="group rounded-2xl border bg-white overflow-hidden hover:shadow-xl transition-all block">
              <div className="h-48 bg-slate-100 relative overflow-hidden">
                {store.logo ? (
                  <img src={store.logo} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-2xl">{store.name[0]}</div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{store.name}</h3>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{store.description}</p>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  {store.location}
                </div>
              </div>
            </Link>
          ))}
          
          {diningStores.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500">More restaurants opening soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
