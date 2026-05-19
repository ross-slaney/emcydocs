export default function BrandLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="edGrad" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2dd4bf" />
          <stop offset="0.5" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
        <filter id="edGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#edGrad)" filter="url(#edGlow)" />
      <path
        d="M9 11h14M9 16h10M9 21h12"
        stroke="white"
        strokeWidth="2.25"
        strokeLinecap="round"
        opacity="0.95"
      />
      <circle cx="23" cy="21" r="2.5" fill="white" opacity="0.9" />
    </svg>
  );
}
