import { notFound } from "next/navigation"
import Link from "next/link"
import { MapPin, ArrowLeft } from "lucide-react"
import { stores as allStores, categories } from "@/lib/mockData"

type Props = {
  params: Promise<{ id: string }>
}

export default async function StorePage({ params }: Props) {
  const resolvedParams = await params
  const store = allStores.find(s => s.id === resolvedParams.id);
  
  if (!store) {
    notFound()
  }
  
  const category = categories.find(c => c.id === store.categoryId);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header Banner */}
      <div className="h-80 md:h-[400px] bg-slate-900 relative overflow-hidden">
        {store.image && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent z-10" />
            <img src={store.image} alt={store.name} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60" />
          </>
        )}
        <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-end pb-12">
          <Link href="/stores" className="text-white/80 hover:text-white flex items-center gap-2 text-sm font-bold mb-8 w-fit bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </Link>
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-8">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-white rounded-3xl shadow-2xl overflow-hidden shrink-0 p-2 md:p-4">
              {store.logo ? (
                <img src={store.logo} alt={store.name} className="w-full h-full object-contain" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-6xl">{store.name[0]}</div>
              )}
            </div>
            <div className="pb-2">
              <div className="inline-block bg-amber-500 text-white font-bold uppercase tracking-widest text-xs px-3 py-1 rounded-full mb-3">{category?.name}</div>
              <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-md">{store.name}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-black text-slate-900 mb-8">About {store.name}</h2>
            <div className="prose prose-lg max-w-none text-slate-600 leading-relaxed">
              <p>{store.description}</p>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-[2rem] p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h3 className="font-black text-2xl text-slate-900 mb-8">Store Details</h3>
              <ul className="space-y-8">
                <li className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div className="pt-1">
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Location</p>
                    <p className="text-slate-900 font-black text-lg">Floor {store.floor} - {store.location}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
