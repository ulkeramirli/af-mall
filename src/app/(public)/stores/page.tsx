import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { MapPin, Search } from 'lucide-react'

const prisma = new PrismaClient()

// Next.js 15 requires awaiting searchParams if they are dynamic
type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function StoresPage({ searchParams }: Props) {
  const params = await searchParams
  const categoryId = typeof params.category === 'string' ? params.category : undefined
  const q = typeof params.q === 'string' ? params.q : undefined

  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' }
  })

  const stores = await prisma.store.findMany({
    where: {
      categoryId: categoryId,
      name: { contains: q }
    },
    include: { category: true },
    orderBy: { name: 'asc' }
  })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Shop Directory</h1>
        <p className="text-slate-600">Find your favorite brands, dining spots, and entertainment venues.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar / Filters */}
        <div className="w-full md:w-64 shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search stores..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                defaultValue={q}
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/stores"
                  className={`block py-1 text-sm ${!categoryId ? 'text-blue-600 font-medium' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  All Stores
                </Link>
              </li>
              {categories.map(c => (
                <li key={c.id}>
                  <Link 
                    href={`/stores?category=${c.id}`}
                    className={`block py-1 text-sm ${categoryId === c.id ? 'text-blue-600 font-medium' : 'text-slate-600 hover:text-slate-900'}`}
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {stores.map((store) => (
              <Link href={`/stores/${store.id}`} key={store.id} className="group rounded-2xl border bg-white overflow-hidden hover:shadow-xl transition-all block">
                <div className="h-40 bg-slate-100 relative overflow-hidden">
                  {store.logo ? (
                    <img src={store.logo} alt={store.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-2xl">{store.name[0]}</div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">{store.category.name}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{store.name}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <MapPin className="w-4 h-4" />
                    {store.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {stores.length === 0 && (
            <div className="text-center py-24 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-500">No stores found matching your criteria.</p>
              <Link href="/stores" className="text-blue-600 font-medium mt-2 inline-block">Clear filters</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
