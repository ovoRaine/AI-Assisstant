import React, { useState } from 'react';
import { Plus, Minus, ShoppingBag, Check } from 'lucide-react';
import { DishRecommendation } from '../data/recommendations';
import { STORE_BG_IMAGE } from '../assets/embeddedImages';

interface RestaurantStoreViewProps {
  dish: DishRecommendation;
  preferences: string[];
  onBack: () => void;
  onCompleteOrder: () => void;
}

/**
 * Renders the authentic Meituan Waimai Restaurant Store Page based on
 * /assets/aistudio/871d1cbe991024d10f1e9e4f8bfd277d_45c837d4.jpg,
 * dynamically placing the user's clicked recommended dish as the VERY FIRST item
 * under "神抢手", with interactive back navigation and shopping cart checkout.
 */
export const RestaurantStoreView: React.FC<RestaurantStoreViewProps> = ({
  dish,
  preferences,
  onBack,
  onCompleteOrder,
}) => {
  const [cartCount, setCartCount] = useState<number>(0);
  const [showOrderSuccess, setShowOrderSuccess] = useState<boolean>(false);

  const savings = Math.max(1, Number((dish.originalPrice - dish.price).toFixed(1)));
  const totalCartPrice = Number((cartCount * dish.price).toFixed(1));
  const storeBgImg = STORE_BG_IMAGE;

  return (
    <div className="relative h-full w-full overflow-hidden bg-white select-none flex flex-col">
      {/* 1. Pinned Top Store Navigation & Tabs Header (Top 608px of 1272 x 2860 screenshot) */}
      <div
        className="relative w-full shrink-0 overflow-hidden bg-white z-20"
        style={{ aspectRatio: '1272 / 608' }}
      >
        <img
          src={storeBgImg}
          alt="餐厅顶部导航"
          className="w-full h-auto absolute top-0 left-0 select-none pointer-events-none block"
        />

        {/* Interactive Back Button Hotspot (< at top-left) */}
        <button
          type="button"
          onClick={onBack}
          aria-label="返回小团推荐页"
          className="absolute top-[28%] left-[1.5%] w-[11%] h-[34%] rounded-full cursor-pointer active:bg-black/5 focus:outline-none"
        />
      </div>

      {/* 2. Scrollable Store Menu Body (Remaining 2252px of 1272 x 2860 screenshot) */}
      <div className="relative flex-1 w-full overflow-y-auto overflow-x-hidden no-scrollbar bg-white">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '1272 / 2252' }}
        >
          <img
            src={storeBgImg}
            alt="餐厅菜单列表"
            className="w-full h-auto absolute left-0 select-none pointer-events-none block"
            style={{
              top: '-27.0%',
            }}
          />

          {/* Badge on the First Recommended Dish Photo ("小团推荐") */}
          <div
            className="absolute z-10 flex items-center rounded-tl-[8px] rounded-br-[8px] bg-[#FFC700] px-1.5 py-0.5 shadow-2xs"
            style={{
              left: '26.4%',
              top: '12.8%',
            }}
          >
            <span className="text-[9px] font-extrabold text-[#1A1D21] leading-none">
              小团推荐
            </span>
          </div>

          {/* === DYNAMIC FIRST RECOMMENDED DISH INFO OVERLAY (Replaces the 1st dish text block under 神抢手) === */}
          <div
            className="absolute z-10 flex flex-col justify-between bg-[#FFFDFB]"
            style={{
              left: '57.1%',
              right: '2.8%',
              top: '12.6%',
              height: '19.0%',
            }}
          >
            <div>
              {/* Recommended Dish Title */}
              <h3 className="text-[13.5px] font-bold text-[#1A1D21] leading-[1.25] line-clamp-2">
                {dish.dishName}(配菜定期调整)
              </h3>

              {/* Monthly Sales */}
              <div className="text-[10.5px] text-[#888D94] mt-1">
                月售800+
              </div>

              {/* Promise Tags */}
              <div className="flex items-center gap-1 mt-0.5 text-[10.5px]">
                <span className="font-medium text-[#B86A35]">买贵必赔</span>
                <span className="text-[#DCDFE6]">|</span>
                <span className="text-[#888D94]">一件即送</span>
              </div>
            </div>

            {/* Price + 一口价 + Original Price + Add (+) Button */}
            <div>
              <div className="flex items-center justify-between gap-1">
                <div className="flex items-baseline gap-1 tabular-nums flex-wrap">
                  <span className="text-[15px] font-extrabold text-[#FF3B24] leading-none">
                    <span className="text-[11px]">¥</span>
                    {dish.price}
                  </span>
                  <span className="rounded-[3px] bg-[#FF4A26] px-1 py-0.5 text-[9px] font-bold text-white leading-none">
                    一口价
                  </span>
                  <span className="text-[10px] text-[#9AA0A8] line-through leading-none">
                    ¥{dish.originalPrice}
                  </span>
                </div>

                {/* Interactive + / - Cart Stepper */}
                <div className="flex items-center gap-1 shrink-0">
                  {cartCount > 0 && (
                    <>
                      <button
                        type="button"
                        onClick={() => setCartCount((c) => Math.max(0, c - 1))}
                        className="flex h-[20px] w-[20px] items-center justify-center rounded-full border border-[#CFD4DC] bg-white text-[#5A6068] active:scale-90 cursor-pointer"
                      >
                        <Minus className="h-3 w-3 stroke-[2.5]" />
                      </button>
                      <span className="text-[11px] font-bold tabular-nums text-[#1A1D21]">
                        {cartCount}
                      </span>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={() => setCartCount((c) => c + 1)}
                    aria-label="加入购物车"
                    className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#FF5722] text-white shadow-xs hover:bg-[#F4511E] active:scale-90 transition-transform cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5 stroke-[2.8]" />
                  </button>
                </div>
              </div>

              {/* Bottom Savings & Preference Badge */}
              <div className="mt-1 flex items-center gap-1">
                <span className="inline-block rounded-[3px] border border-[#FFACA0] bg-white px-1 py-0.2 text-[9.5px] font-medium text-[#FF4A26] tabular-nums leading-tight">
                  立省¥{savings}
                </span>
                <span className="inline-block rounded-[3px] bg-[#E6F7ED] px-1 py-0.2 text-[9.5px] font-medium text-[#16A34A] leading-tight truncate">
                  ✓ {dish.greenTag}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Cart Checkout Bar when user taps "+" */}
      {totalCartPrice > 0 && (
        <div className="absolute bottom-3 inset-x-3 z-30 flex h-[44px] items-center justify-between rounded-full bg-[#222426] pl-3.5 pr-1.5 text-white shadow-xl">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFC700] text-[#1A1D21]">
              <ShoppingBag className="h-4 w-4 stroke-[2.3]" />
              <span className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#FF3B24] px-1 text-[9px] font-bold text-white">
                {cartCount}
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-baseline gap-1 tabular-nums">
                <span className="text-[14px] font-extrabold text-white">
                  ¥{totalCartPrice}
                </span>
                <span className="text-[9.5px] text-[#9AA0A8]">免打包费</span>
              </div>
              <div className="text-[9px] text-[#FFC700] truncate">
                已备注：{preferences.slice(0, 2).join('·')}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowOrderSuccess(true)}
            className="h-[34px] rounded-full bg-[#FFC700] hover:bg-[#FFB800] active:scale-95 px-4 text-[12px] font-extrabold text-[#1A1D21] cursor-pointer shrink-0"
          >
            去结算
          </button>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {showOrderSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[1px]">
          <div className="w-full max-w-[270px] rounded-[18px] bg-white p-4 text-center shadow-2xl">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#E8F8F0] text-[#12B76A]">
              <Check className="h-5 w-5 stroke-[2.5]" />
            </div>
            <h3 className="mt-2 text-[13.5px] font-bold text-[#1A1D21]">
              下单成功！
            </h3>
            <p className="mt-1 text-[11px] font-semibold text-[#282C33] truncate">
              {dish.dishName} × {cartCount} · 实付 ¥{totalCartPrice}
            </p>
            <div className="mt-2 rounded-lg bg-[#FFF9E6] px-2.5 py-1.5 text-[10px] text-[#9A6700] truncate">
              已携带偏好备注：{preferences.join(' · ')}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => setShowOrderSuccess(false)}
                className="flex-1 h-8 rounded-full bg-[#F2F3F7] text-[11px] font-semibold text-[#484E56] cursor-pointer"
              >
                继续点餐
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowOrderSuccess(false);
                  onCompleteOrder();
                }}
                className="flex-1 h-8 rounded-full bg-[#FFC700] text-[11px] font-bold text-[#1A1D21] cursor-pointer"
              >
                返回首页
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
