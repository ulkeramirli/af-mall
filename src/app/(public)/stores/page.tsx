import Link from 'next/link'
import { MapPin, Search } from 'lucide-react'
import { stores as allStores, categories } from '@/lib/mockData'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function StoresPage({ searchParams }: Props) {
  const params = await searchParams
  const categoryId = typeof params.category === 'string' ? params.category : undefined
  const q = typeof params.q === 'string' ? params.q : undefined

  let filteredStores = allStores;

  if (categoryId) {
    filteredStores = filteredStores.filter(s => s.categoryId === categoryId);
  }

  if (q) {
    filteredStores = filteredStores.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
  }

  const storesWithCategories = filteredStores.map(store => ({
    ...store,
    category: categories.find(c => c.id === store.categoryId)
  }));

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h1 className="text-5xl font-black text-slate-900 mb-6 tracking-tight">Shop Directory</h1>
        <p className="text-slate-600 text-lg">Find your favorite brands, dining spots, and entertainment venues in our world-class facilities.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar / Filters */}
        <div className="w-full md:w-72 shrink-0 space-y-10">
          <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="font-black text-slate-900 mb-4 text-xl">Search</h3>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search stores..." 
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-xl text-slate-800 font-medium outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:font-normal"
                defaultValue={q}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">
            <h3 className="font-black text-slate-900 mb-6 text-xl">Categories</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/stores"
                  className={`block px-4 py-3 rounded-xl text-base transition-colors ${!categoryId ? 'bg-amber-500 text-white font-bold shadow-md shadow-amber-500/20' : 'text-slate-600 hover:bg-slate-50 font-medium hover:text-slate-900'}`}
                >
                  All Stores
                </Link>
              </li>
              {categories.map(c => (
                <li key={c.id}>
                  <Link 
                    href={`/stores?category=${c.id}`}
                    className={`block px-4 py-3 rounded-xl text-base transition-colors ${categoryId === c.id ? 'bg-amber-500 text-white font-bold shadow-md shadow-amber-500/20' : 'text-slate-600 hover:bg-slate-50 font-medium hover:text-slate-900'}`}
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Store Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {storesWithCategories.map((store) => (
              <Link href={`/stores/${store.id}`} key={store.id} className="group rounded-[2rem] bg-white overflow-hidden hover:shadow-2xl hover:shadow-amber-500/10 transition-all block border border-slate-100 flex flex-col">
                <div className="h-48 bg-slate-100 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                  {store.image ? (
                    <img src={store.image} alt={store.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-2xl">{store.name[0]}</div>
                  )}
                  <div className="absolute bottom-4 left-4 z-20 w-12 h-12 rounded-xl bg-white p-1.5 shadow-lg">
                    <img src={store.logo} alt={store.name} className="w-full h-full object-contain" />
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-2">{store.category?.name}</div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">{store.name}</h3>
                  <div className="mt-auto pt-4 flex items-center gap-2 text-slate-600 font-medium text-sm">
                    <MapPin className="w-4 h-4 text-amber-500" />
                    Floor {store.floor} - {store.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {storesWithCategories.length === 0 && (
            <div className="text-center py-32 bg-white rounded-[2rem] border border-dashed border-slate-300 shadow-sm">
              <p className="text-slate-500 text-lg mb-4">No stores found matching your criteria.</p>
              <Link href="/stores" className="text-white bg-slate-900 px-6 py-3 rounded-full font-bold inline-block hover:bg-slate-800 transition-colors">Clear filters</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
