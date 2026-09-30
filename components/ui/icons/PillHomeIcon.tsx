export function PillHomeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg xmlns="http://w3.org" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.47 3.82a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 1-1.06 1.06l-.22-.22V19.25a1.75 1.75 0 0 1-1.75 1.75H6.75A1.75 1.75 0 0 1 5 19.25V13.35l-.22.22a.75.75 0 0 1-1.06-1.06l8.69-8.69Z" />
    </svg>
  );
}


export function GeoHomeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10" />
    </svg>
  );
}