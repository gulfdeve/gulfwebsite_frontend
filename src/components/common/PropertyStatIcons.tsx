/**
 * Inline SVG icons for property stats. Avoids Image component overhead for better INP.
 */
export function BedIcon({ className = "w-4 h-4 sm:w-[18px] sm:h-[18px] opacity-70" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path d="M17.293 8.79514V4.30469C17.293 3.28158 16.4606 2.44922 15.4375 2.44922H3.5625C2.53939 2.44922 1.70703 3.28158 1.70703 4.30469V8.79514C0.861123 8.96755 0.222656 9.7172 0.222656 10.6133V13.582C0.222656 13.7869 0.388795 13.9531 0.59375 13.9531H1.33594V16.1797C1.33594 16.3846 1.50208 16.5508 1.70703 16.5508C1.91199 16.5508 2.07812 16.3846 2.07812 16.1797V13.9531H16.9219V16.1797C16.9219 16.3846 17.088 16.5508 17.293 16.5508C17.4979 16.5508 17.6641 16.3846 17.6641 16.1797V13.9531H18.4062C18.6112 13.9531 18.7773 13.7869 18.7773 13.582V10.6133C18.7773 9.7172 18.1389 8.96755 17.293 8.79514ZM2.44922 4.30469C2.44922 3.69082 2.94864 3.19141 3.5625 3.19141H15.4375C16.0514 3.19141 16.5508 3.69082 16.5508 4.30469V8.75781H15.8086V7.64453C15.8086 6.82605 15.1427 6.16016 14.3242 6.16016H10.6133C10.1702 6.16016 9.77223 6.3555 9.5 6.66429C9.2278 6.3555 8.82973 6.16016 8.38672 6.16016H4.67578C3.8573 6.16016 3.19141 6.82605 3.19141 7.64453V8.75781H2.44922V4.30469Z" fill="#606060"/>
    </svg>
  );
}

export function BathIcon({ className = "w-4 h-4 sm:w-[18px] sm:h-[18px] opacity-70" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      <path d="M13.0216 16.2447H3.95489C1.87236 16.2447 0.177063 14.5494 0.177063 12.4669V9.06689H16.7992V12.4669C16.7992 14.5494 15.1039 16.2447 13.0216 16.2447ZM0.932572 9.8224V12.4669C0.932572 14.1338 2.28795 15.4891 3.95489 15.4891H13.0216C14.6885 15.4891 16.0437 14.1338 16.0437 12.4669V9.8224H0.932572Z" fill="#606060"/>
      <path d="M3.19924 9.44449H2.44373V2.64449C2.44373 1.18521 3.62894 0 5.08822 0C6.54736 0 7.73257 1.18521 7.73257 2.64449V3.02218H6.97706V2.64449C6.97706 1.60081 6.13176 0.75551 5.08822 0.75551C4.04453 0.75551 3.19924 1.60081 3.19924 2.64449V9.44449Z" fill="#606060"/>
      <path d="M9.99923 6.04453H4.71039V5.28888C4.71039 3.82974 5.8956 2.64453 7.35488 2.64453C8.81402 2.64453 9.99923 3.82974 9.99923 5.28888V6.04453Z" fill="#606060"/>
    </svg>
  );
}

/** Square with diagonal arrows (expand/area) – same as off-plan, for sq ft / size. */
export function SizeIcon({ className = "w-4 h-4 sm:w-[18px] sm:h-[18px] opacity-70" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {/* Square outline */}
      <rect x="1.5" y="1.5" width="15" height="15" rx="0.5" stroke="currentColor" strokeWidth="1.25" fill="none" />
      {/* Arrow top-right: diagonal up-right */}
      <path d="M11 7l3-3M11 7v2.5M11 7h2.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      {/* Arrow bottom-left: diagonal down-left */}
      <path d="M7 11l-3 3M7 11v-2.5M7 11H4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
