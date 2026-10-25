'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useProductStore } from '@/app/store/cartStore'

export default function LoginDrawer({ open, setLoginOpen }: { open: boolean, setLoginOpen: (open: boolean) => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className={`relative w-full  transition-all duration-300 ease-in-out py-4 flex flex-row border-b bg-white          
             ${open ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
    >
      <div ref={dropdownRef} className="w-full max-w-md mx-auto">
        {/* Search Input field */}
        <input
          type="text"
          className="w-full px-4 py-2.5 border rounded-sm  bg-popover border-[#071b4b] shadow-sm"
        />
      </div>
    </div>
  )
}
