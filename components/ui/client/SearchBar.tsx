'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useProductStore } from '@/app/store/CommonStore'

export default function AutocompleteSearch() {
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // 1. Grab everything needed from your global Zustand memory
  const filterProducts = useProductStore((state) => state.filterProducts)
  const filteredProducts = useProductStore((state) => state.filteredProducts)
  const fetchCatalog = useProductStore((state) => state.fetchCatalog)
  const isLoading = useProductStore((state) => state.isLoading)

  // 2. Download the product list once when the storefront mounts
  useEffect(() => {
    fetchCatalog()
  }, [fetchCatalog])

  // 3. Run client-side filtering instantly as they type (No long debounce needed for RAM filtering!)
  useEffect(() => {
    filterProducts(inputValue)
    setIsOpen(inputValue.trim().length > 0)
  }, [inputValue, filterProducts])

  // 4. Close the dropdown if the user clicks anywhere outside of the search box
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // 5. Limit recommendations layout to top 6 closest matches
  const suggestions = filteredProducts.slice(0, 6)

  return (
    <div ref={dropdownRef} className="w-full max-w-md mx-auto ">
      {/* Search Input field */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => inputValue.trim().length > 0 && setIsOpen(true)}
        placeholder={isLoading ? "Loading products..." : "Search products..."}
        disabled={isLoading}
        className="w-full px-4 py-2.5 border rounded-sm  bg-popover border-[#071b4b] shadow-sm"
      />

      {/* Autocomplete Dropdown Panel */}
      {isOpen && suggestions.length > 0 && (
        <ul className="
        absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-80 overflow-y-auto overflow-hidden divide-y divide-gray-100">
          {suggestions.map((product) => (
            <li 
              key={product._id}
              onClick={() => {
                setInputValue(product.category)
                setIsOpen(false)
                // Route the user instantly to the dynamic product page
                router.push(`/shoppe/?category=${product.category}`)
              }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
            >
              
              <div className="flex-1 min-w-0">
                <p className="font-bluefamily-def-H1 truncate">{product.name}</p>
                <p className="font-redfamily-def text-xs">{product.category}</p>
              </div>
              <span className="text-sm font-semibold font-bluefamily-def-H1">
                ₹{product.price}
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* No Results Found State inside dropdown */}
      {isOpen && inputValue.trim().length > 0 && suggestions.length === 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-xl p-4 text-center text-sm text-gray-500">
          No matches found for "{inputValue}"
        </div>
      )}
    </div>
  )
}
