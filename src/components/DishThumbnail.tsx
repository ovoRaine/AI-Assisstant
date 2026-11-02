import React from 'react';
import { DishRecommendation } from '../data/recommendations';

export const DishThumbnail: React.FC<{
  visualType: DishRecommendation['visualType'];
  badge: string;
}> = ({ visualType, badge }) => {
  const renderFoodArt = () => {
    switch (visualType) {
      case 'mushroom-chicken':
        // Ceramic bowl with braised shiitake mushroom chicken, greens, and white rice on warm table
        return (
          <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
            <rect width="80" height="80" fill="#D8CFC4" />
            {/* Table wood texture */}
            <path d="M0 20h80M0 55h80" stroke="#C7BCB0" strokeWidth="1" />
            {/* Shadow */}
            <circle cx="42" cy="43" r="32" fill="rgba(0,0,0,0.16)" />
            {/* Ceramic Bowl Outer */}
            <circle cx="40" cy="40" r="32" fill="#F4F1EA" stroke="#E2DDD2" strokeWidth="2.5" />
            <circle cx="40" cy="40" r="28" fill="#FFFDF9" />
            {/* White Rice Base (Bottom-left half) */}
            <path d="M16 40a24 24 0 0 0 40 16L22 22A24 24 0 0 0 16 40Z" fill="#FAF8F5" />
            {/* Braised Chicken & Mushroom Sauce Base */}
            <circle cx="43" cy="38" r="20" fill="#B86B28" opacity="0.25" />
            {/* Broccoli / Bok Choy Greens */}
            <circle cx="24" cy="34" r="6.5" fill="#2D8A3E" />
            <circle cx="21" cy="41" r="5.5" fill="#3BA34D" />
            <circle cx="28" cy="28" r="5" fill="#46B85A" />
            {/* Braised Chicken Pieces */}
            <ellipse cx="44" cy="28" rx="7.5" ry="5.5" transform="rotate(-15 44 28)" fill="#D4843B" />
            <ellipse cx="53" cy="37" rx="7" ry="5" transform="rotate(20 53 37)" fill="#C6742C" />
            <ellipse cx="41" cy="43" rx="8" ry="5.5" transform="rotate(8 41 43)" fill="#DC8E44" />
            <ellipse cx="50" cy="49" rx="6.5" ry="4.8" transform="rotate(-25 50 49)" fill="#C8762E" />
            {/* Shiitake Mushroom Caps */}
            <circle cx="35" cy="35" r="5.5" fill="#4A2E1B" />
            <path d="M33 35h4M35 33v4" stroke="#8C6239" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="48" cy="33" r="5" fill="#3D2414" />
            <path d="M46.5 33h3M48 31.5v3" stroke="#8C6239" strokeWidth="1.1" strokeLinecap="round" />
            <circle cx="34" cy="49" r="5" fill="#4A2E1B" />
            {/* Glossy highlights & Scallion dots */}
            <circle cx="42" cy="41" r="1.5" fill="#4CAF50" />
            <circle cx="46" cy="38" r="1.3" fill="#4CAF50" />
            <circle cx="39" cy="45" r="1.2" fill="#FFF" opacity="0.7" />
          </svg>
        );

      case 'steamed-fish':
        // Wooden bento tray with steamed Cantonese sea bass, greens, and rice (matching Card 2)
        return (
          <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
            <rect width="80" height="80" fill="#ECEAE4" />
            {/* Angled Wooden Bento Tray */}
            <g transform="rotate(-12 40 40)">
              <rect x="8" y="14" width="64" height="52" rx="6" fill="#C89D66" stroke="#A97B44" strokeWidth="2.5" />
              <rect x="12" y="18" width="56" height="44" rx="4" fill="#FDFBF7" />
              {/* Divider */}
              <line x1="44" y1="18" x2="44" y2="62" stroke="#C89D66" strokeWidth="2.5" />
              {/* Right compartment: White Rice with sesame */}
              <rect x="46" y="20" width="20" height="40" rx="2" fill="#F7F5F0" />
              <circle cx="55" cy="34" r="1" fill="#333" />
              <circle cx="59" cy="38" r="1" fill="#333" />
              <circle cx="53" cy="42" r="1" fill="#333" />
              {/* Left compartment: Steamed Sea Bass in light soy broth + greens */}
              <ellipse cx="28" cy="40" rx="14" ry="16" fill="#E6C280" opacity="0.45" />
              {/* Greens */}
              <circle cx="20" cy="28" r="5.5" fill="#389E48" />
              <circle cx="26" cy="25" r="5" fill="#4BB55B" />
              <circle cx="19" cy="36" r="5" fill="#2E853C" />
              {/* Steamed Fish Fillet */}
              <ellipse cx="30" cy="43" rx="11" ry="7.5" transform="rotate(-18 30 43)" fill="#F9F6F0" stroke="#D5C7B2" strokeWidth="1.2" />
              <path d="M23 43c4-2 9-2 14 0" stroke="#E2D6C3" strokeWidth="1.2" />
              {/* Shredded Ginger & Scallion & Goji berry on fish */}
              <path d="M26 40l6 3M28 38l5 4" stroke="#52B788" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="31" cy="42" r="1.8" fill="#E63946" />
            </g>
          </svg>
        );

      case 'tomato-beef':
        // Wooden 4-grid bento box with rich red-orange tomato slow-braised beef brisket (matching Card 3)
        return (
          <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
            <rect width="80" height="80" fill="#E8E4DC" />
            <g transform="rotate(-14 40 40)">
              {/* Wooden Bento Box */}
              <rect x="8" y="13" width="64" height="54" rx="6" fill="#B8864C" stroke="#8F622E" strokeWidth="2.5" />
              <rect x="11" y="16" width="58" height="48" rx="4" fill="#FAF7F2" />
              {/* Grid Dividers */}
              <line x1="43" y1="16" x2="43" y2="64" stroke="#B8864C" strokeWidth="2.5" />
              <line x1="11" y1="36" x2="69" y2="36" stroke="#B8864C" strokeWidth="2" />
              {/* Top-Left: White Rice */}
              <rect x="13" y="18" width="28" height="16" fill="#F9F8F6" />
              {/* Top-Right: Green Broccoli Salad */}
              <circle cx="51" cy="26" r="5" fill="#3B9E4B" />
              <circle cx="59" cy="25" r="5.5" fill="#2E853C" />
              <circle cx="55" cy="29" r="4.5" fill="#52B788" />
              {/* Bottom-Left: Rich Tomato Beef Brisket Stew */}
              <rect x="13" y="38" width="28" height="24" rx="2" fill="#C93B2B" />
              {/* Tomato chunks & Beef cubes */}
              <circle cx="20" cy="45" r="4.5" fill="#E63946" />
              <rect x="25" y="42" width="7" height="6" rx="2" fill="#6B3410" />
              <rect x="17" y="51" width="8" height="6" rx="2" fill="#7F3F15" />
              <circle cx="31" cy="53" r="4.5" fill="#F4A261" />
              <circle cx="25" cy="49" r="1.5" fill="#52B788" />
              {/* Bottom-Right: Braised Tofu / Side */}
              <rect x="46" y="40" width="19" height="20" rx="2" fill="#E9C46A" />
              <circle cx="55" cy="50" r="5" fill="#F4A261" />
            </g>
          </svg>
        );

      case 'spicy-beef':
      case 'boiled-pork':
        return (
          <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
            <rect width="80" height="80" fill="#2B2623" />
            <circle cx="40" cy="40" r="31" fill="#F5EFE6" stroke="#D8CFC2" strokeWidth="2.5" />
            <circle cx="40" cy="40" r="26" fill="#B5221C" />
            {/* Beef slices & red/green chilies */}
            <ellipse cx="35" cy="36" rx="8" ry="5" fill="#6E2C14" />
            <ellipse cx="47" cy="43" rx="8" ry="5.5" fill="#5C230E" />
            <ellipse cx="34" cy="47" rx="7" ry="4.5" fill="#7A3319" />
            {/* Red & Green Peppers */}
            <circle cx="44" cy="31" r="4" fill="#E63946" />
            <circle cx="28" cy="39" r="3.8" fill="#2A9D8F" />
            <circle cx="41" cy="51" r="3.8" fill="#E63946" />
            <circle cx="51" cy="35" r="3.5" fill="#40916C" />
            <circle cx="38" cy="40" r="2" fill="#FFD166" />
          </svg>
        );

      default:
        return (
          <svg viewBox="0 0 80 80" className="h-full w-full" fill="none">
            <rect width="80" height="80" fill="#E5DDD3" />
            <circle cx="40" cy="40" r="31" fill="#FFFDF9" stroke="#E0D6C8" strokeWidth="2.5" />
            <circle cx="40" cy="40" r="25" fill="#F4A261" opacity="0.35" />
            <circle cx="32" cy="35" r="7" fill="#E76F51" />
            <circle cx="47" cy="37" r="7.5" fill="#D4843B" />
            <circle cx="38" cy="48" r="6.5" fill="#2A9D8F" />
            <circle cx="48" cy="49" r="5" fill="#E9C46A" />
          </svg>
        );
    }
  };

  return (
    <div className="relative h-[54px] w-[54px] shrink-0 overflow-hidden rounded-full border border-[#EAECEF] bg-[#F2F3F5] shadow-2xs">
      {renderFoodArt()}

      {/* Bottom Pill Badge (e.g., 尝鲜, 高蛋白, 慢火鲜炖) matching Prototype image_2b30280f.png */}
      <div className="absolute bottom-0 inset-x-0 flex justify-center bg-gradient-to-t from-black/75 via-black/45 to-transparent pt-2 pb-0.5">
        <span className="text-[8.5px] font-bold text-white tracking-tight leading-none">
          {badge}
        </span>
      </div>
    </div>
  );
};
