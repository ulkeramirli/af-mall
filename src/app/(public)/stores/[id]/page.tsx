import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, Globe, ArrowLeft } from 'lucide-react'

const prisma = new PrismaClient()

type Props = {
  params: Promise<{ id: string }>
}

export default async function StorePage({ params }: Props) {
  const resolvedParams = await params
  const store = await prisma.store.findUnique({
    where: { id: resolvedParams.id },
    include: { category: true }
  })

  if (!store) {
    notFound()
  }

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header Banner */}
      <div className="h-64 md:h-80 bg-slate-900 relative overflow-hidden">
        {store.logo && (
          <>
            <div className="absolute inset-0 bg-black/50 z-10" />
            <img src={store.logo} alt={store.name} className="absolute inset-0 w-full h-full object-cover blur-sm opacity-50" />
          </>
        )}
        <div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-end pb-12">
          <Link href="/stores" className="text-white/80 hover:text-white flex items-center gap-2 text-sm font-medium mb-6 w-fit">
            <ArrowLeft className="w-4 h-4" /> Back to Directory
          </Link>
          <div className="flex items-end gap-6">
            <div className="w-32 h-32 bg-white rounded-2xl shadow-xl overflow-hidden shrink-0 border-4 border-white">
              {store.logo ? (
                <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-4xl">{store.name[0]}</div>
              )}
            </div>
            <div className="pb-2">
              <div className="text-blue-400 font-semibold uppercase tracking-wider text-sm mb-1">{store.category.name}</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">{store.name}</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">About {store.name}</h2>
            <div className="prose max-w-none text-slate-600">
              <p className="text-lg leading-relaxed">{store.description}</p>
            </div>
          </div>
          
          <div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-6">Store Details</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 font-medium mb-1">Location</p>
                    <p className="text-slate-900 font-medium">{store.location}</p>
                  </div>
                </li>
                
                {store.phone && (
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Phone</p>
                      <p className="text-slate-900 font-medium">{store.phone}</p>
                    </div>
                  </li>
                )}

                {store.website && (
                  <li className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Website</p>
                      <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
                        Visit Website
                      </a>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
