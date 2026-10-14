// components/UserIconLoginOverlay.tsx
"use client";

interface UserIconLoginOverlayProps {
  onLoginClick: () => void;
  isLoading?: boolean;
}

export default function UserIconLoginOverlay({ onLoginClick, isLoading = false }: UserIconLoginOverlayProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12">
      
      {/* 1. Relative Anchor Container */}
      <div className="relative inline-block">
        
        {/* Base Layer: Large Generic User Silhouette Icon */}
        <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 shadow-inner">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24" xmlns="http://w3.org">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>

        {/* 2. Top Layer: Absolute Positioned Button Panel */}
        {/* Positioned at the top right, pointing down-left toward the user profile center */}
        <div className="absolute -top-10 -right-28 flex flex-col items-start gap-1">
          
          {/* Custom Text Login Button */}
          <button
            onClick={onLoginClick}
            disabled={isLoading}
            className="
              /* Layout & Content Flex */
              flex items-center justify-center w-36 h-10 px-4
              
              /* Typography */
              text-white font-sans font-bold text-xs tracking-wider uppercase
              
              /* Dark Neutral Theme Styling */
              bg-gray-900 rounded-lg border-0 shadow-lg
              
              /* High-Performance Micro Interactions */
              transition-all duration-150 ease-in-out
              hover:bg-gray-800 hover:-translate-y-0.5
              active:scale-[0.97] active:brightness-95
              focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2
              
              /* Disabled State Rules */
              disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100
            "
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-3.5 w-3.5 text-white" xmlns="http://w3.org" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Loading...</span>
              </div>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {/* 3. Bottom-Left Arrow Marker SVG Anchor */}
          <div className="text-gray-900 ml-3 animate-pulse">
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              viewBox="0 0 24 24" 
              xmlns="http://w3.org"
            >
              {/* Down-Left directional vector lines */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 5L5 19M5 19h10M5 19V9" />
            </svg>
          </div>

        </div>

      </div>
    </div>
  );
}
