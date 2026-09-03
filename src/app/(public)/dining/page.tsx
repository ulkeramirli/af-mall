import Link from 'next/link'
import { MapPin, Utensils } from 'lucide-react'
import { stores as allStores, categories } from '@/lib/mockData'

export default function DiningPage() {
  const diningCategory = categories.find(c => c.name === 'Dining');
  const diningStores = allStores.filter(s => s.categoryId === diningCategory?.id);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Hero */}
      <div className="bg-slate-900 py-32 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80" alt="Dining" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto mt-10">
          <div className="w-20 h-20 bg-orange-500/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-8 border border-orange-500/50">
            <Utensils className="w-10 h-10 text-orange-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-lg">Culinary Delights</h1>
          <p className="text-xl text-slate-200 font-medium drop-shadow-md">From quick bites to fine dining, discover a world of flavors at AF Mall.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-[-4rem] relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {diningStores.map((store) => (
             <Link href={`/stores/${store.id}`} key={store.id} className="group rounded-[2rem] bg-white overflow-hidden hover:shadow-2xl hover:shadow-orange-500/10 transition-all block border border-slate-100 flex flex-col">
             <div className="h-56 bg-slate-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
               {store.image ? (
                 <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-2xl">{store.name[0]}</div>
               )}
               <div className="absolute bottom-4 left-4 z-20 w-14 h-14 rounded-2xl bg-white p-2 shadow-lg">
                 <img src={store.logo} alt={store.name} className="w-full h-full object-contain" />
               </div>
             </div>
             <div className="p-8 flex-1 flex flex-col">
               <h3 className="text-2xl font-black text-slate-900 mb-3">{store.name}</h3>
               <p className="text-slate-500 text-base mb-6 line-clamp-2 leading-relaxed">{store.description}</p>
               <div className="mt-auto pt-4 flex items-center gap-2 text-slate-700 font-medium bg-slate-50 w-fit px-4 py-2 rounded-full">
                 <MapPin className="w-4 h-4 text-orange-500" />
                 Floor {store.floor} - {store.location}
               </div>
             </div>
           </Link>
          ))}
          
          {diningStores.length === 0 && (
            <div className="col-span-full text-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-300 shadow-sm">
              <p className="text-slate-500 text-lg">More restaurants opening soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
