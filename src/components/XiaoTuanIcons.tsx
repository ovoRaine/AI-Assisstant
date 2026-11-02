import React from 'react';

/**
 * Compact glowing yellow floating entry button icon shown in the lower-right corner
 * of the Meituan Waimai homepage prototype (image_bd4d2bc9.png).
 */
export const FloatingRobotEntryButton: React.FC<{
  onClick: () => void;
  className?: string;
}> = ({ onClick, className = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="打开小团点餐助手"
      className={`group relative flex items-center justify-center rounded-full p-[2.5px] transition-transform duration-200 active:scale-92 hover:scale-105 focus:outline-none cursor-pointer select-none ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.78)',
        boxShadow:
          '0 4px 14px rgba(255, 190, 0, 0.52), 0 1px 5px rgba(0, 0, 0, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {/* Subtle outer glow */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-55 group-hover:opacity-90 transition-opacity"
        style={{
          boxShadow: '0 0 12px 1px rgba(255, 208, 0, 0.6)',
        }}
      />

      {/* Inner yellow glossy sphere */}
      <div
        className="relative flex h-full w-full items-center justify-center rounded-full overflow-hidden"
        style={{
          background:
            'radial-gradient(circle at 38% 25%, #FFF7AD 0%, #FFE047 38%, #FFCA10 78%, #F5B400 100%)',
          boxShadow: 'inset 0 1.5px 3px rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(217, 140, 0, 0.35)',
        }}
      >
        {/* Top glossy highlight arc */}
        <div
          className="pointer-events-none absolute top-[5%] left-[18%] h-[26%] w-[64%] rounded-full opacity-55"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 100%)',
          }}
        />

        {/* Cute Outlined Robot SVG matching Prototype 1 */}
        <svg
          viewBox="0 0 64 64"
          className="h-[76%] w-[76%] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left 4-point sparkle */}
          <path
            d="M14 14L15.2 17.3L18.5 18.5L15.2 19.7L14 23L12.8 19.7L9.5 18.5L12.8 17.3L14 14Z"
            fill="#2B2412"
          />
          {/* Right 4-point sparkle */}
          <path
            d="M49.5 15.5L50.3 17.7L52.5 18.5L50.3 19.3L49.5 21.5L48.7 19.3L46.5 18.5L48.7 17.7L49.5 15.5Z"
            fill="#2B2412"
          />
          <circle cx="21" cy="14" r="1" fill="#2B2412" />
          <circle cx="44" cy="14.5" r="1" fill="#2B2412" />

          {/* Antenna */}
          <line
            x1="32"
            y1="15.5"
            x2="32"
            y2="20"
            stroke="#231F16"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle
            cx="32"
            cy="13.5"
            r="2.3"
            fill="#FFE66D"
            stroke="#231F16"
            strokeWidth="2.2"
          />

          {/* Side Earphone Left */}
          <rect
            x="14.5"
            y="26.5"
            width="4.5"
            height="9"
            rx="2.2"
            fill="#FFC812"
            stroke="#231F16"
            strokeWidth="2.3"
          />
          {/* Side Earphone Right */}
          <rect
            x="45"
            y="26.5"
            width="4.5"
            height="9"
            rx="2.2"
            fill="#FFC812"
            stroke="#231F16"
            strokeWidth="2.3"
          />

          {/* Robot Head Outer */}
          <rect
            x="18.5"
            y="20"
            width="27"
            height="21.5"
            rx="9.5"
            fill="#FFDC48"
            stroke="#231F16"
            strokeWidth="2.5"
          />

          {/* Robot Face Visor Screen */}
          <rect
            x="22.5"
            y="24"
            width="19"
            height="11.5"
            rx="5.5"
            fill="#231F16"
          />

          {/* Cute Glowing Eyes inside Visor */}
          <circle cx="28" cy="29.5" r="2.1" fill="#FFE869" />
          <circle cx="27.4" cy="28.9" r="0.7" fill="#FFFFFF" />
          <circle cx="36" cy="29.5" r="2.1" fill="#FFE869" />
          <circle cx="35.4" cy="28.9" r="0.7" fill="#FFFFFF" />

          {/* Smile Below Visor */}
          <path
            d="M29.5 38.2C30.3 39.1 33.7 39.1 34.5 38.2"
            stroke="#231F16"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Robot Lower Body */}
          <path
            d="M23.5 41.5H40.5C41.8 41.5 42.8 42.7 42.5 44L41.2 50.2C40.6 52.8 38.3 54.5 35.6 54.5H28.4C25.7 54.5 23.4 52.8 22.8 50.2L21.5 44C21.2 42.7 22.2 41.5 23.5 41.5Z"
            fill="#FFDC48"
            stroke="#231F16"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />

          {/* Belly Badge */}
          <rect
            x="27.5"
            y="45"
            width="9"
            height="5.5"
            rx="2.7"
            fill="#FFF2A6"
            stroke="#231F16"
            strokeWidth="2"
          />

          {/* Left Waving Arm */}
          <path
            d="M21.5 43.5C17.5 44 15.8 47.5 17.5 50.2C18.5 51.6 20.5 51.2 21.8 49.8"
            stroke="#231F16"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Right Waving Arm */}
          <path
            d="M42.5 43.5C46.5 44 48.2 47.5 46.5 50.2C45.5 51.6 43.5 51.2 42.2 49.8"
            stroke="#231F16"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </button>
  );
};

/**
 * Compact circular AI Avatar with yellow ring, orange robot head, and green online status dot
 * matching Prototype 2 (image_68e81dc3.png).
 */
export const ChatAvatarRobot: React.FC<{
  className?: string;
  showOnlineDot?: boolean;
}> = ({ className = '', showOnlineDot = true }) => {
  return (
    <div
      className={`relative flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full bg-white border-[1.8px] border-[#FFB800] shadow-[0_1px_4px_rgba(255,184,0,0.15)] ${className}`}
    >
      <svg
        viewBox="0 0 36 36"
        className="h-[18px] w-[18px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6.5V10.5"
          stroke="#FF9500"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="18" cy="5.5" r="2.1" fill="#FF9500" />
        <rect
          x="7"
          y="10.5"
          width="22"
          height="17.5"
          rx="7.5"
          fill="#FF9800"
        />
        <rect x="4" y="15.5" width="3" height="7.5" rx="1.5" fill="#FFB300" />
        <rect x="29" y="15.5" width="3" height="7.5" rx="1.5" fill="#FFB300" />
        <circle cx="13.5" cy="18.5" r="2.1" fill="#FFFFFF" />
        <circle cx="22.5" cy="18.5" r="2.1" fill="#FFFFFF" />
        <rect x="13" y="23" width="10" height="2.1" rx="1.05" fill="#FFFFFF" />
      </svg>

      {showOnlineDot && (
        <span className="absolute -bottom-[1px] -right-[1px] h-[9px] w-[9px] rounded-full bg-[#12B76A] border-[1.5px] border-white" />
      )}
    </div>
  );
};

/**
 * Compact 17x17 illustration icons inside the 2x2 Quick Selection pills
 * in the Chat page prototype (image_68e81dc3.png).
 */
export const QuickChoiceIllustration: React.FC<{ id: string }> = ({ id }) => {
  switch (id) {
    case 'light':
      return (
        <svg viewBox="0 0 32 32" className="h-[17px] w-[17px] shrink-0" fill="none">
          <rect x="2.5" y="16" width="4" height="3" rx="1.5" fill="#8B95C9" />
          <rect x="25.5" y="16" width="4" height="3" rx="1.5" fill="#8B95C9" />
          <path
            d="M5.5 15.5C5.5 14.4 6.4 13.5 7.5 13.5H24.5C25.6 13.5 26.5 14.4 26.5 15.5V19.5C26.5 24.5 22.2 28 16 28C9.8 28 5.5 24.5 5.5 19.5V15.5Z"
            fill="#8D99AE"
          />
          <ellipse cx="16" cy="14" rx="10.5" ry="4.5" fill="#6C7589" />
          <ellipse cx="16" cy="14" rx="8.8" ry="3.5" fill="#FF7B29" />
          <circle cx="13" cy="13.5" r="1.4" fill="#FFD166" />
          <circle cx="18.5" cy="14.5" r="1.3" fill="#06D6A0" />
          <circle cx="16" cy="12.5" r="1.1" fill="#FFF" />
        </svg>
      );

    case 'spicy':
      return (
        <svg viewBox="0 0 32 32" className="h-[17px] w-[17px] shrink-0" fill="none">
          <path
            d="M22.5 6.5C24 4.5 26.5 4.5 27.5 5.5"
            stroke="#2B9348"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M19.5 9.5C20.5 7.5 23 7.5 24 9.5C24.5 10.5 23.5 12 22 12.5"
            fill="#55A630"
          />
          <path
            d="M21 9C24.5 11.5 24.5 17.5 20.5 22.5C16.5 27.5 10.5 28.5 6.5 26.5C5.2 25.8 5.8 24.2 7 24C10.5 23.5 14 21 16 17C17.5 14 18 10.5 21 9Z"
            fill="#E6192E"
          />
          <path
            d="M19.5 12.5C19 15.5 17 19 14 21.5"
            stroke="#FF8FA3"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'novel':
      return (
        <svg viewBox="0 0 32 32" className="h-[17px] w-[17px] shrink-0" fill="none">
          <path
            d="M18 5L20.4 12.6L28 15L20.4 17.4L18 25L15.6 17.4L8 15L15.6 12.6L18 5Z"
            fill="url(#sparkleGrad1)"
          />
          <path
            d="M8.5 5.5L9.5 8.5L12.5 9.5L9.5 10.5L8.5 13.5L7.5 10.5L4.5 9.5L7.5 8.5L8.5 5.5Z"
            fill="#FFB703"
          />
          <path
            d="M9.5 20.5L10.3 22.7L12.5 23.5L10.3 24.3L9.5 26.5L8.7 24.3L6.5 23.5L8.7 22.7L9.5 20.5Z"
            fill="#FB8500"
          />
          <defs>
            <linearGradient id="sparkleGrad1" x1="8" y1="5" x2="26" y2="25" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFD166" />
              <stop offset="0.5" stopColor="#FCA311" />
              <stop offset="1" stopColor="#F77F00" />
            </linearGradient>
          </defs>
        </svg>
      );

    case 'budget':
    default:
      return (
        <svg viewBox="0 0 32 32" className="h-[17px] w-[17px] shrink-0" fill="none">
          <path
            d="M11.5 7.5C11.5 6.2 13 5.5 14.2 6.2L16 7.2L17.8 6.2C19 5.5 20.5 6.2 20.5 7.5L19.5 11H12.5L11.5 7.5Z"
            fill="#F4A261"
          />
          <path
            d="M12 11H20C23.5 13.5 25.5 17.5 25.5 21.5C25.5 25.2 22.5 27.5 16 27.5C9.5 27.5 6.5 25.2 6.5 21.5C6.5 17.5 8.5 13.5 12 11Z"
            fill="url(#bagGrad)"
          />
          <rect x="11.5" y="10.2" width="9" height="2.2" rx="1.1" fill="#E63946" />
          <text
            x="16"
            y="22.5"
            textAnchor="middle"
            fill="#9B4D00"
            fontSize="10.5"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            ¥
          </text>
          <defs>
            <linearGradient id="bagGrad" x1="10" y1="11" x2="23" y2="27" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFD166" />
              <stop offset="1" stopColor="#F48C06" />
            </linearGradient>
          </defs>
        </svg>
      );
  }
};
