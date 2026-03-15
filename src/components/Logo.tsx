import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizes = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizes[size]} ${className}`}>
      <svg 
        viewBox="0 0 300 100" 
        className="h-full w-auto drop-shadow-xl"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Main Text with Gradient */}
        <defs>
          <linearGradient id="kukwaGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#EA580C" /> {/* orange-600 */}
            <stop offset="100%" stopColor="#C2410C" /> {/* orange-700 */}
          </linearGradient>
          
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="1" dy="1" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <text 
          x="50%" 
          y="70%" 
          textAnchor="middle" 
          className="font-black italic"
          style={{ 
            fontSize: '72px', 
            fontFamily: 'Inter, sans-serif',
            fill: 'url(#kukwaGradient)',
            filter: 'url(#shadow)',
            letterSpacing: '-4px'
          }}
        >
          KUKWA
        </text>

        {/* Transformation Arrow from first K to W */}
        {/* K U K W A */}
        {/* Indices: 0 1 2 3 4 */}
        <path 
          d="M 65 45 Q 135 15 205 45" 
          stroke="#2563EB" 
          strokeWidth="4" 
          strokeLinecap="round"
          fill="none"
          className="animate-pulse"
        />
        <path 
          d="M 195 40 L 205 45 L 198 52" 
          stroke="#2563EB" 
          strokeWidth="4" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Subtle glow dot at start and end of arrow */}
        <circle cx="65" cy="45" r="3" fill="#93C5FD" />
        <circle cx="205" cy="45" r="3" fill="#93C5FD" />
      </svg>
    </div>
  );
};
