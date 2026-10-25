'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useProductStore } from '@/app/store/cartStore'
import { Button } from '../button'
import Link from 'next/link'


export default function AutocompleteSearch({ setSearchOpen }: { setSearchOpen: (open: boolean) => void }) {
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
    // setIsOpen(inputValue.trim().length > 0)
  }, [inputValue, filterProducts])

  useEffect(() => {

    if (!isOpen) {
      setInputValue('');
      setSearchOpen(false);
    }

    filterProducts(' ')
  }, [isOpen])

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
    <div ref={dropdownRef} className="w-full max-w-md mx-auto">
      {/* Search Input field */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onKeyDown={() => setIsOpen(true)}
        placeholder={isLoading ? "Loading products..." : "Search products..."}
        disabled={isLoading}
        className="w-full px-4 py-2.5 border rounded-sm  bg-popover border-[#071b4b] shadow-sm"
      />

      {/* Autocomplete Dropdown Panel */}
      {isOpen && (
        // <ul className="
        // absolute left-1/2 -translate-x-1/2  mt-1 w-10/11 md:w-2/3 lg:w-2/3 flex flex-col justify-center py-10 bg-white border border-gray-200 
        // rounded-lg shadow-xl max-h-80 overflow-y-auto overflow-hidden divide-y divide-gray-100">
        <div className="absolute left-0 right-0 mt-1 flex flex-col py-10 bg-white border border-gray-200 
        rounded-lg shadow-xl h-screen overflow-y-auto overflow-hidden divide-y divide-gray-100">
          <div className="absolute w-full lg:left-1/4 lg:w-1/2 md:left-1/4 md:w-1/2">
            <div className="px-4 font-redfamily-def-H14">
              Popular searches
            </div>
            <div className="flex flex-wrap gap-2 px-4 py-3 flex-row items-center justify-start">
              <Button className="blue-def font-whitefamily-def-H11 text-[11px] cursor-pointer">Hand Bag</Button>
              <Button className="blue-def font-whitefamily-def-H11 text-[11px] cursor-pointer">Clutch</Button>
              <Button className="blue-def font-whitefamily-def-H11 text-[11px] cursor-pointer">Tote Bag</Button>


            </div>
          
          <hr className="border-gray-200" />
          
            <div className="px-4 py-3 text-sm text-gray-500">
              {suggestions.length > 0 &&
                <>Showing {suggestions.length} of {filteredProducts.length} results for "{inputValue}"
                </>
              }
            </div>
            {isLoading && (
              <li className="px-4 py-3 text-sm text-gray-500">
                Loading...
              </li>
            )}
            <div className='flex flex-row flex-wrap'>
            {suggestions.map((product) => (
              <a
                key={product._id}
                onClick={() => {
                  setInputValue(product.category)
                  setIsOpen(false)
                  // Route the user instantly to the dynamic product page
                  router.push(`/shoppe/?category=${product.category}`)
                }}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
              > <div>
                  <div className="w-[90px] md:w-[150px] lg:w-[150px] flex-1">
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-contain object-top" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bluefamily-def-H1 truncate">{product.name}</p>
                    <p className="font-redfamily-def text-xs">{product.category}</p>
                  </div>
                  <span className="text-sm font-semibold font-bluefamily-def-H1">
                    ₹{product.price}
                  </span>
                </div>
              </a>
            ))}
            </div>
                      {isOpen && inputValue.trim().length > 0 && suggestions.length === 0 && (
            <div className="left-0 right-0 mt-1 bg-white p-4 text-center text-sm text-gray-500">
              No matches found for "{inputValue}"
            </div>
          )}

          </div>
        </div>
      )}
    </div>
  )
}
