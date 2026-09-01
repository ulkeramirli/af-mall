import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

const prisma = new PrismaClient()

export default async function Home() {
  const events = await prisma.event.findMany({
    take: 3,
    orderBy: { startDate: 'desc' }
  })

  const stores = await prisma.store.findMany({
    take: 6,
    include: { category: true }
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1519567281799-9712144d4710?w=1600&q=80" 
          alt="Mall Interior" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container relative z-20 px-4">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Experience The Extraordinary
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 mb-8 font-light">
              Discover world-class shopping, exquisite dining, and endless entertainment all in one place.
            </p>
            <div className="flex gap-4">
              <Link href="/stores" className="bg-white text-slate-900 px-8 py-3 rounded-full font-medium hover:bg-slate-100 transition-colors inline-flex items-center gap-2">
                Explore Stores <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/events" className="bg-slate-800/50 backdrop-blur-md text-white border border-slate-700 px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition-colors">
                View Offers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Stores */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Brands</h2>
              <p className="text-slate-600">Discover our most popular stores and latest arrivals.</p>
            </div>
            <Link href="/stores" className="hidden md:flex text-blue-600 font-medium items-center gap-1 hover:gap-2 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stores.map((store) => (
              <Link href={`/stores/${store.id}`} key={store.id} className="group rounded-2xl border bg-white overflow-hidden hover:shadow-xl transition-all block">
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                  {store.logo ? (
                    <img src={store.logo} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-2xl">{store.name[0]}</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">{store.category.name}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{store.name}</h3>
                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">{store.description}</p>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    {store.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Events */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Happening Now</h2>
            <p className="text-slate-600">Don't miss out on exclusive events, seasonal sales, and special offers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                {event.imageUrl && (
                  <div className="h-48 overflow-hidden">
                    <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{event.title}</h3>
                  <p className="text-slate-600 text-sm mb-4">{event.description}</p>
                  <div className="text-sm font-medium text-blue-600">
                    {new Date(event.startDate).toLocaleDateString()} - {new Date(event.endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
