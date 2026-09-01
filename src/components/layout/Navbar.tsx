import Link from 'next/link'
import { Search, ShoppingBag, MapPin, Menu } from 'lucide-react'

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-slate-900">
          <ShoppingBag className="w-8 h-8 text-blue-600" />
          AF Mall
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/stores" className="hover:text-blue-600 transition-colors">Stores</Link>
          <Link href="/dining" className="hover:text-blue-600 transition-colors">Dining</Link>
          <Link href="/cinema" className="hover:text-blue-600 transition-colors">Cinema</Link>
          <Link href="/events" className="hover:text-blue-600 transition-colors">Events & Offers</Link>
          <Link href="/map" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
            <MapPin className="w-4 h-4" /> Map
          </Link>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search stores..." 
              className="pl-9 pr-4 py-2 bg-slate-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all w-64"
            />
          </div>
          <button className="md:hidden p-2 text-slate-600">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  )
}
