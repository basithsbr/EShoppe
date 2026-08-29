// src/components/RightSheetWrapper.tsx
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface RightSheetWrapperProps {
  isOpen: boolean;
  children: React.ReactNode; // Receives the server-rendered card
}

export default function RightSheetWrapper({ isOpen, children }: RightSheetWrapperProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleClose = () => {
    // Clear search parameters to close the sheet
    router.push('/', { scroll: false });
  };

  return (
    <>
      {/* Background Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 z-40 transition-opacity" 
        onClick={handleClose} 
      />

      {/* Right Drawer Container */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-[450px] bg-white shadow-2xl z-50 p-6 flex flex-col border-l border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Server Overview</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 text-2xl">
            &times;
          </button>
        </div>

        {/* Dynamic Content (Server Rendered HTML is injected here) */}
        <div className="flex-1 overflow-y-auto py-4">
          {children}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-100">
          <button 
            onClick={handleClose} 
            className="w-full py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Dismiss
          </button>
        </div>
      </div>
    </>
  );
}
