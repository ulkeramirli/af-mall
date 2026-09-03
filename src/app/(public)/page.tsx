import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'
import { events, stores as allStores, categories } from '@/lib/mockData'

export default function Home() {
  const recentEvents = events.slice(0, 3)
  const storesWithCategories = allStores.slice(0, 6).map(store => ({
    ...store,
    category: categories.find(c => c.id === store.categoryId)
  }))

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[700px] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/30 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1519567281799-9712144d4710?w=1600&q=80" 
          alt="Mall Interior" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container relative z-20 px-4 text-center md:text-left">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-tight drop-shadow-xl">
              Experience <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">The Extraordinary</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 mb-10 font-medium drop-shadow-md">
              Discover world-class shopping, exquisite dining, and endless entertainment all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link href="/stores" className="bg-amber-500 text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-amber-400 hover:scale-105 transition-all inline-flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30">
                Explore Stores <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="/events" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-8 py-4 rounded-full font-bold hover:bg-white/20 hover:scale-105 transition-all flex items-center justify-center">
                View Offers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 -mt-16 relative z-30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             {categories.map((cat) => (
                <Link href={`/stores?category=${cat.id}`} key={cat.id} className="bg-white rounded-2xl p-6 shadow-xl shadow-black/5 hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col items-center justify-center group">
                  <div className="w-16 h-16 rounded-full bg-slate-100 mb-4 overflow-hidden group-hover:scale-110 transition-transform">
                     <img src={cat.image} className="w-full h-full object-cover" alt={cat.name} />
                  </div>
                  <span className="font-bold text-slate-800">{cat.name}</span>
                </Link>
             ))}
          </div>
        </div>
      </section>

      {/* Featured Stores */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Featured Brands</h2>
              <p className="text-slate-600 text-lg">Discover our most popular stores and latest arrivals.</p>
            </div>
            <Link href="/stores" className="hidden md:flex text-amber-500 font-bold items-center gap-1 hover:gap-3 transition-all text-lg">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {storesWithCategories.map((store) => (
              <Link href={`/stores/${store.id}`} key={store.id} className="group rounded-[2rem] bg-white overflow-hidden hover:shadow-2xl hover:shadow-amber-500/10 transition-all block border border-slate-100">
                <div className="h-64 bg-slate-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  {store.image ? (
                    <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-2xl">{store.name[0]}</div>
                  )}
                  <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-lg">
                       <img src={store.logo} alt={store.name} className="w-full h-full object-contain" />
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="text-sm font-bold text-amber-500 uppercase tracking-widest mb-3">{store.category?.name}</div>
                  <h3 className="text-2xl font-black text-slate-900 mb-3">{store.name}</h3>
                  <p className="text-slate-500 text-base mb-6 line-clamp-2 leading-relaxed">{store.description}</p>
                  <div className="flex items-center gap-2 text-slate-700 font-medium bg-slate-50 w-fit px-4 py-2 rounded-full">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    Floor {store.floor} - {store.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Events */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Happening Now</h2>
            <p className="text-slate-600 text-lg">Don't miss out on exclusive events, seasonal sales, and special offers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {recentEvents.map((event) => (
              <div key={event.id} className="bg-slate-50 rounded-[2rem] overflow-hidden group hover:shadow-xl transition-all border border-slate-100">
                {event.image && (
                  <div className="h-72 overflow-hidden relative">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-slate-900 shadow-lg">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                )}
                <div className="p-10">
                  <h3 className="text-2xl font-black text-slate-900 mb-4">{event.title}</h3>
                  <p className="text-slate-600 text-lg mb-6 leading-relaxed">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-700 font-medium bg-white px-5 py-2.5 rounded-full shadow-sm">
                      <MapPin className="w-4 h-4 text-amber-500" />
                      {event.location}
                    </div>
                    <button className="text-amber-500 font-bold hover:text-amber-600 transition-colors">
                      Learn More &rarr;
                    </button>
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
