import { Film, Ticket, Popcorn } from 'lucide-react'

export default function CinemaPage() {
  return (
    <div className="bg-slate-950 min-h-screen text-slate-300 pb-24">
      {/* Hero */}
      <div className="relative py-32 px-4 text-center overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950 z-0" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Film className="w-20 h-20 text-red-500 mx-auto mb-8" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">AF Cinema IMAX</h1>
          <p className="text-xl text-slate-400 font-light">Experience movies like never before with crystal clear laser projection and immersive Dolby Atmos sound.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 text-center">
            <Popcorn className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">Premium Bar</h3>
            <p className="text-sm text-slate-400">Enjoy gourmet popcorn, craft burgers, and signature cocktails.</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 text-center relative overflow-hidden">
            <div className="absolute inset-0 border-2 border-red-500/20 rounded-3xl animate-pulse" />
            <Ticket className="w-10 h-10 text-red-500 mx-auto mb-4 relative z-10" />
            <h3 className="text-white font-bold text-xl mb-2 relative z-10">VIP Seating</h3>
            <p className="text-sm text-slate-400 relative z-10">Fully reclinable leather seats with personal call buttons.</p>
          </div>
          <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 text-center">
            <Film className="w-10 h-10 text-blue-500 mx-auto mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">IMAX Laser</h3>
            <p className="text-sm text-slate-400">The world's most advanced cinema technology.</p>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Now Showing</h2>
          <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12">
            <p className="text-slate-500 text-lg">Cinema schedule integration coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
