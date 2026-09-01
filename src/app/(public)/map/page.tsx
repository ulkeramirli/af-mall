import { Map as MapIcon, Car, Bus, Train } from 'lucide-react'

export default function MapPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      <div className="bg-white py-16 border-b">
        <div className="container mx-auto px-4 text-center">
          <MapIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Getting Here & Map</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">AF Mall is conveniently located in the heart of the city, easily accessible by car and public transport.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 max-w-5xl">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          {/* Mock Google Map / Interactive Map Placeholder */}
          <div className="aspect-video bg-slate-200 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-500/10" />
            <div className="text-center relative z-10">
              <MapIcon className="w-16 h-16 text-blue-600 mx-auto mb-4 opacity-50" />
              <p className="text-slate-500 font-medium">Interactive Mall Map Integration</p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-6">Transportation</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Car className="w-8 h-8 text-slate-700 mb-4" />
            <h3 className="font-bold text-lg mb-2">By Car</h3>
            <p className="text-slate-600 text-sm">Enter via Main Street. We offer 3 levels of underground parking with over 2,000 spaces. Valet parking available at the main entrance.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Bus className="w-8 h-8 text-slate-700 mb-4" />
            <h3 className="font-bold text-lg mb-2">By Bus</h3>
            <p className="text-slate-600 text-sm">Bus lines 14, 21, and 88 stop directly in front of the mall (AF Mall Station). Lines 5 and 65 stop within a 5-minute walk.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <Train className="w-8 h-8 text-slate-700 mb-4" />
            <h3 className="font-bold text-lg mb-2">By Metro</h3>
            <p className="text-slate-600 text-sm">Take the Red Line to City Center Station. The mall is directly connected via the underground pedestrian tunnel.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
