'use client'

import React, { useEffect, useRef } from 'react'
import SearchBar from "./SearchBar";
import { ArrowBigUp, ArrowUp, ArrowUpAZ, ArrowUpFromLineIcon, ChevronDown, ChevronsUpIcon, ChevronUpSquare, LucideTriangle, TriangleIcon, XIcon } from 'lucide-react'
import { useProductStore } from '@/app/store/CommonStore'

export default function SearchDrawer({open, setSearchOpen} : {open:boolean, setSearchOpen: (open: boolean) => void}) {
//   const isSearchOpen = useProductStore((state) => state.isSearchOpen)
//   const setSearchOpen = useProductStore((state) => state.setSearchOpen)
//   const [isSearchOpen,setSearchOpen] = React.useState(open);
  const drawerRef = useRef<HTMLDivElement>(null)

  // Close drawer if user presses Escape key
//   useEffect(() => {
//     const handleKeyDown = (e: KeyboardEvent) => {
//       if (e.key === 'Escape') setSearchOpen(false)
//     }
//     window.addEventListener('keydown', handleKeyDown)
//     return () => window.removeEventListener('keydown', handleKeyDown)
//   }, [setSearchOpen])

  return (
    <>
      {/* 1. Backdrop Overlay (Fades in out behind the drawer) */}
      

      {/* 2. Side Drawer (Slides in cleanly from the right side) */}
      {/* <div className={`
             w-full flex flex-row py-2 bg-white shadow-md transition-transform duration-300 ease-in-out ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
      > */}
      <div
          className={`relative w-full  transition-all duration-300 ease-in-out py-4 flex flex-row border-b bg-white          
             ${open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
        >
        <div className="flex-1 overflow-y-auto px-6">
          <SearchBar></SearchBar>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black"></h2>
          <button
            onClick={() => setSearchOpen(!open)}
            className="p-1.5 hover:bg-gray-100 rounded-full transition text-gray-500"
          >
            <ChevronsUpIcon/>
          </button>
        </div>

        {/* Drawer Body holding the autocomplete input */}
        
      </div>
    </>
  )
}
