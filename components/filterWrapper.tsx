'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface WrapperProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export default function FilterWrapper({children }: WrapperProps) {
  const router = useRouter();

//   if (!isOpen) return null;

  const handleClose = () => {
    // Navigates back to the root page, stripping away "?filter=open" to hide the window
    router.push('/', { scroll: false });
  };

  return (
    <>
      {/* Dark overlay behind filter modal */}
      <div 
        className="fixed inset-0 bg-black/20 z-40 backdrop-blur-xs transition-opacity" 
        onClick={handleClose} 
      />

      {/* Floating Center Filter Box Panel */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-xl shadow-2xl z-50 p-6 border border-gray-100 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
          <h2 className="text-lg font-bold text-gray-900">Filter Products</h2>
          <button 
            onClick={handleClose} 
            className="text-gray-400 hover:text-gray-600 text-xl font-bold cursor-pointer"
          >
            &times;
          </button>
        </div>

        {/* Dynamic Filters Form Contents Inserted Here */}
        <div className="py-2">
          {children}
        </div>

        {/* Action Controls Footer */}
        <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-2">
          <button 
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button 
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
