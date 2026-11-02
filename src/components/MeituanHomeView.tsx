import React from 'react';
import { FloatingRobotEntryButton } from './XiaoTuanIcons';
import { HOME_BG_IMAGE } from '../assets/embeddedImages';

interface MeituanHomeViewProps {
  onOpenAssistant: (initialPrompt?: string) => void;
}

export const MeituanHomeView: React.FC<MeituanHomeViewProps> = ({ onOpenAssistant }) => {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#F5F6F8] select-none flex flex-col">
      {/* 1. Pinned Top Meituan Yellow Header (1272 x 516 of 1272 x 2860 screenshot) */}
      <div
        className="relative w-full shrink-0 overflow-hidden bg-[#FCD635] z-10"
        style={{ aspectRatio: '1272 / 516' }}
      >
        <img
          src={HOME_BG_IMAGE}
          alt="美团外卖顶部导航"
          className="w-full h-auto absolute top-0 left-0 select-none pointer-events-none block"
        />

        {/* Interactive Search Bar Hotspot */}
        <button
          type="button"
          onClick={() => onOpenAssistant()}
          aria-label="搜索或打开小团点餐助手"
          className="absolute bottom-[6%] left-[4%] right-[4%] h-[27%] rounded-full cursor-pointer focus:outline-none z-20"
        />
      </div>

      {/* 2. Scrollable Middle Content Area (1272 x 2170 of 1272 x 2860 screenshot) */}
      <div className="relative flex-1 w-full overflow-y-auto overflow-x-hidden no-scrollbar bg-[#F5F6F8] z-10">
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '1272 / 2170' }}
        >
          <img
            src={HOME_BG_IMAGE}
            alt="美团外卖商家列表"
            className="w-full h-auto absolute left-0 select-none pointer-events-none block"
            style={{
              top: '-23.78%',
            }}
          />
        </div>
      </div>

      {/* 3. Pinned Bottom Tab Bar (外卖 | 神券 | 订单 | 我的: 1272 x 174 of 1272 x 2860 screenshot) */}
      <div
        className="relative w-full shrink-0 overflow-hidden bg-white z-10 border-t border-black/[0.04]"
        style={{ aspectRatio: '1272 / 174' }}
      >
        <img
          src={HOME_BG_IMAGE}
          alt="美团外卖底部导航栏"
          className="w-full h-auto absolute bottom-0 left-0 select-none pointer-events-none block"
        />
      </div>

      {/* Soft Translucent White Mask Over Homepage Background to Highlight the AI Entry Icon */}
      <div className="pointer-events-none absolute inset-0 z-20 bg-white/35" />

      {/* 4. Highlighted Floating XiaoTuan AI Entry Icon in Lower-Right Corner (Above the white mask) */}
      <div className="absolute right-3.5 bottom-[24%] z-30 flex h-[46px] w-[46px] items-center justify-center">
        <FloatingRobotEntryButton
          onClick={() => onOpenAssistant()}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};
