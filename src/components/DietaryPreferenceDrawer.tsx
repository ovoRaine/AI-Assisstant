import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Utensils,
  Ban,
  Heart,
  Banknote,
  FileEdit,
  Check,
  ShieldCheck,
  X,
} from 'lucide-react';

export type CustomCategoryKey = 'taste' | 'avoidance' | 'habit' | 'staple' | 'time';

export interface StructuredPreferences {
  tastes: string[];
  avoidances: string[];
  habits: string[];
  staples: string[];
  budget: string;
  deliveryTime: string;
  customNote: string;
  customOptions: {
    taste: string[];
    avoidance: string[];
    habit: string[];
    staple: string[];
    time: string[];
  };
}

export const INITIAL_STRUCTURED_PREFS: StructuredPreferences = {
  tastes: ['清淡', '酸甜'],
  avoidances: ['不吃香菜'],
  habits: ['少油', '少盐', '高蛋白'],
  staples: ['米饭', '杂粮粗粮'],
  budget: '20-35元',
  deliveryTime: '45分钟内',
  customNote: '',
  customOptions: {
    taste: [],
    avoidance: [],
    habit: [],
    staple: [],
    time: [],
  },
};

const BASE_TASTE_OPTIONS = ['清淡', '微辣', '中辣', '酸甜', '咸鲜', '麻辣'];
const BASE_AVOIDANCE_OPTIONS = ['不吃香菜', '不吃葱花', '不吃大蒜', '海鲜过敏', '坚果过敏'];
const BASE_HABIT_OPTIONS = ['少油', '少盐', '控糖/少糖', '高蛋白', '低卡减脂'];
const BASE_STAPLE_OPTIONS = ['米饭', '面条/米粉', '粥类', '杂粮粗粮', '无主食/生酮'];
const BASE_TIME_OPTIONS = ['30分钟内', '45分钟内', '不限时'];
const BUDGET_OPTIONS = ['20元内', '20-35元', '35-50元', '50元+'];

export function formatPreferencesSummary(prefs: StructuredPreferences): string[] {
  const summary: string[] = [];
  if (prefs.avoidances.length > 0) {
    summary.push(prefs.avoidances[0]);
  }
  if (prefs.tastes.length > 0) {
    summary.push(
      prefs.tastes[0].startsWith('偏好') ? prefs.tastes[0] : `偏好${prefs.tastes[0]}`
    );
  }
  if (prefs.staples.length > 0) {
    summary.push(
      prefs.staples[0].startsWith('喜欢') ? prefs.staples[0] : `喜欢${prefs.staples[0]}`
    );
  }
  if (prefs.habits.length > 0 && summary.length < 3) {
    summary.push(prefs.habits[0]);
  }
  if (prefs.customNote.trim()) {
    summary.push(prefs.customNote.trim());
  }
  return summary.length > 0 ? summary : ['不吃香菜', '偏好清淡', '喜欢米饭'];
}

interface DietaryPreferenceDrawerProps {
  isOpen: boolean;
  initialPrefs: StructuredPreferences;
  onClose: () => void;
  onSave: (newPrefs: StructuredPreferences) => void;
}

export const DietaryPreferenceDrawer: React.FC<DietaryPreferenceDrawerProps> = ({
  isOpen,
  initialPrefs,
  onClose,
  onSave,
}) => {
  const [prefs, setPrefs] = useState<StructuredPreferences>(initialPrefs);
  const [addingCustomSection, setAddingCustomSection] = useState<CustomCategoryKey | null>(null);
  const [customTagText, setCustomTagText] = useState('');

  useEffect(() => {
    if (isOpen) {
      setPrefs(initialPrefs);
      setAddingCustomSection(null);
      setCustomTagText('');
    }
  }, [isOpen, initialPrefs]);

  if (!isOpen) return null;

  const handleDeleteCustomOption = (
    e: React.MouseEvent,
    section: CustomCategoryKey,
    label: string
  ) => {
    e.stopPropagation();

    setPrefs((prev) => {
      const nextCustomOptions = {
        ...prev.customOptions,
        [section]: prev.customOptions[section].filter((item) => item !== label),
      };

      if (section === 'taste') {
        return {
          ...prev,
          customOptions: nextCustomOptions,
          tastes: prev.tastes.filter((i) => i !== label),
        };
      }
      if (section === 'avoidance') {
        return {
          ...prev,
          customOptions: nextCustomOptions,
          avoidances: prev.avoidances.filter((i) => i !== label),
        };
      }
      if (section === 'habit') {
        return {
          ...prev,
          customOptions: nextCustomOptions,
          habits: prev.habits.filter((i) => i !== label),
        };
      }
      if (section === 'staple') {
        return {
          ...prev,
          customOptions: nextCustomOptions,
          staples: prev.staples.filter((i) => i !== label),
        };
      }
      if (section === 'time') {
        return {
          ...prev,
          customOptions: nextCustomOptions,
          deliveryTime: prev.deliveryTime === label ? '45分钟内' : prev.deliveryTime,
        };
      }
      return prev;
    });
  };

  const toggleMultiItem = (
    key: 'tastes' | 'avoidances' | 'habits' | 'staples',
    item: string
  ) => {
    setPrefs((prev) => ({
      ...prev,
      [key]: prev[key].includes(item)
        ? prev[key].filter((i) => i !== item)
        : [...prev[key], item],
    }));
  };

  const handleConfirmCustomTag = (e: React.FormEvent) => {
    e.preventDefault();
    const val = customTagText.trim();
    const section = addingCustomSection;
    setAddingCustomSection(null);
    setCustomTagText('');

    if (!val || !section) return;

    setPrefs((prev) => {
      const existingCustom = prev.customOptions[section];
      const baseList =
        section === 'taste'
          ? BASE_TASTE_OPTIONS
          : section === 'avoidance'
          ? BASE_AVOIDANCE_OPTIONS
          : section === 'habit'
          ? BASE_HABIT_OPTIONS
          : section === 'staple'
          ? BASE_STAPLE_OPTIONS
          : BASE_TIME_OPTIONS;

      const isAlreadyInList = baseList.includes(val) || existingCustom.includes(val);
      const nextCustomOptions = isAlreadyInList
        ? prev.customOptions
        : {
            ...prev.customOptions,
            [section]: [...existingCustom, val],
          };

      if (section === 'taste') {
        return {
          ...prev,
          customOptions: nextCustomOptions,
          tastes: prev.tastes.includes(val) ? prev.tastes : [...prev.tastes, val],
        };
      }
      if (section === 'avoidance') {
        return {
          ...prev,
          customOptions: nextCustomOptions,
          avoidances: prev.avoidances.includes(val)
            ? prev.avoidances
            : [...prev.avoidances, val],
        };
      }
      if (section === 'habit') {
        return {
          ...prev,
          customOptions: nextCustomOptions,
          habits: prev.habits.includes(val) ? prev.habits : [...prev.habits, val],
        };
      }
      if (section === 'staple') {
        return {
          ...prev,
          customOptions: nextCustomOptions,
          staples: prev.staples.includes(val) ? prev.staples : [...prev.staples, val],
        };
      }
      if (section === 'time') {
        return {
          ...prev,
          customOptions: nextCustomOptions,
          deliveryTime: val,
        };
      }
      return prev;
    });
  };

  const renderOptionPill = (
    section: CustomCategoryKey,
    label: string,
    isSelected: boolean,
    isCustom: boolean,
    onClick: () => void,
    showCheckmark = true
  ) => {
    return (
      <div key={label} className="relative inline-flex">
        <button
          type="button"
          onClick={onClick}
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[11px] transition-all active:scale-95 cursor-pointer whitespace-nowrap select-none ${
            isSelected
              ? 'bg-[#FFC700] text-[#1A1D21] font-bold shadow-[0_1px_4px_rgba(255,199,0,0.3)]'
              : 'bg-[#F2F3F6] text-[#333840] font-medium hover:bg-[#EAECEF]'
          }`}
        >
          {isSelected && showCheckmark && (
            <Check className="h-[11px] w-[11px] stroke-[2.8] text-[#1A1D21]" />
          )}
          <span>{label}</span>
        </button>

        {/* Built-in Top-Right "×" Delete Button on all Custom Tags */}
        {isCustom && (
          <button
            type="button"
            onClick={(e) => handleDeleteCustomOption(e, section, label)}
            aria-label={`删除 ${label}`}
            className="absolute -top-1 -right-1 z-10 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#5A6068] text-white shadow-2xs hover:bg-[#EF4444] active:scale-90 transition-colors cursor-pointer border border-white"
          >
            <X className="h-[9px] w-[9px] stroke-[3]" />
          </button>
        )}
      </div>
    );
  };

  const renderDashedAddButton = (
    section: CustomCategoryKey,
    buttonText: string
  ) => {
    if (addingCustomSection === section) {
      return (
        <form
          onSubmit={handleConfirmCustomTag}
          className="inline-flex items-center gap-1"
        >
          <input
            type="text"
            autoFocus
            value={customTagText}
            onChange={(e) => setCustomTagText(e.target.value)}
            onBlur={handleConfirmCustomTag}
            placeholder="输入后回车"
            className="h-[26px] w-[96px] rounded-full border border-[#FFC700] bg-white px-2.5 text-[10.5px] text-[#1A1D21] focus:outline-none"
          />
        </form>
      );
    }

    return (
      <button
        type="button"
        onClick={() => {
          setCustomTagText('');
          setAddingCustomSection(section);
        }}
        className="inline-flex items-center rounded-full border border-dashed border-[#C7B37F] bg-[#FFFDF8] hover:bg-[#FFF9E6] px-2.5 py-1 text-[10.5px] font-medium text-[#8A6818] active:scale-95 transition-all cursor-pointer whitespace-nowrap"
      >
        {buttonText}
      </button>
    );
  };

  return (
    <div
      onClick={onClose}
      className="absolute inset-0 z-50 flex flex-col justify-end bg-black/45 backdrop-blur-[2px]"
    >
      {/* Bottom Floating Sheet Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex max-h-[90%] w-full flex-col rounded-t-[24px] bg-[#F5F6F9] shadow-[0_-8px_30px_rgba(0,0,0,0.18)] overflow-hidden"
      >
        {/* Top Grab Handle Bar */}
        <div className="pt-2.5 pb-1 flex justify-center shrink-0 bg-[#F5F6F9]">
          <div className="h-[4px] w-9 rounded-full bg-[#D5D9E0]" />
        </div>

        {/* Sheet Header Bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#F5F6F9] shrink-0">
          <button
            type="button"
            onClick={onClose}
            aria-label="返回"
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#333840] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-[16px] w-[16px] stroke-[2.2]" />
          </button>

          <h2 className="text-[13.5px] font-bold text-[#3D424A] tracking-tight">
            饮食偏好设置
          </h2>

          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#686E77] hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
          >
            <X className="h-[15px] w-[15px]" />
          </button>
        </div>

        {/* Scrollable Cards List */}
        <div className="flex-1 overflow-y-auto px-3.5 pt-1 pb-3 space-y-2.5 no-scrollbar">
          {/* Card 1: 口味偏好 */}
          <div className="rounded-[16px] bg-white p-3.5 shadow-[0_1px_6px_rgba(0,0,0,0.025)]">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#1A1D21]">
              <Utensils className="h-[13.5px] w-[13.5px] text-[#C88A00] stroke-[2.3]" />
              <span>口味偏好</span>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              {BASE_TASTE_OPTIONS.map((item) =>
                renderOptionPill('taste', item, prefs.tastes.includes(item), false, () =>
                  toggleMultiItem('tastes', item)
                )
              )}
              {prefs.customOptions.taste.map((item) =>
                renderOptionPill('taste', item, prefs.tastes.includes(item), true, () =>
                  toggleMultiItem('tastes', item)
                )
              )}
              {renderDashedAddButton('taste', '+ 自定义口味')}
            </div>
          </div>

          {/* Card 2: 忌口食材 */}
          <div className="rounded-[16px] bg-white p-3.5 shadow-[0_1px_6px_rgba(0,0,0,0.025)]">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#1A1D21]">
              <Ban className="h-[13.5px] w-[13.5px] text-[#D93829] stroke-[2.3]" />
              <span>忌口食材</span>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              {BASE_AVOIDANCE_OPTIONS.map((item) =>
                renderOptionPill(
                  'avoidance',
                  item,
                  prefs.avoidances.includes(item),
                  false,
                  () => toggleMultiItem('avoidances', item)
                )
              )}
              {prefs.customOptions.avoidance.map((item) =>
                renderOptionPill(
                  'avoidance',
                  item,
                  prefs.avoidances.includes(item),
                  true,
                  () => toggleMultiItem('avoidances', item)
                )
              )}
              {renderDashedAddButton('avoidance', '+ 自定义忌口')}
            </div>
          </div>

          {/* Card 3: 健康饮食习惯 */}
          <div className="rounded-[16px] bg-white p-3.5 shadow-[0_1px_6px_rgba(0,0,0,0.025)]">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#1A1D21]">
              <Heart className="h-[13.5px] w-[13.5px] text-[#16A34A] stroke-[2.3]" />
              <span>健康饮食习惯</span>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              {BASE_HABIT_OPTIONS.map((item) =>
                renderOptionPill('habit', item, prefs.habits.includes(item), false, () =>
                  toggleMultiItem('habits', item)
                )
              )}
              {prefs.customOptions.habit.map((item) =>
                renderOptionPill('habit', item, prefs.habits.includes(item), true, () =>
                  toggleMultiItem('habits', item)
                )
              )}
              {renderDashedAddButton('habit', '+ 自定义习惯')}
            </div>
          </div>

          {/* Card 4: 主食偏好 */}
          <div className="rounded-[16px] bg-white p-3.5 shadow-[0_1px_6px_rgba(0,0,0,0.025)]">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#1A1D21]">
              <svg
                viewBox="0 0 20 20"
                className="h-[14px] w-[14px] text-[#C88A00]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 10h14a7 7 0 0 1-14 0Z" />
                <path d="M6 10c0-2.5 2-4 4-4s4 1.5 4 4" />
                <path d="M7 17h6" strokeLinecap="round" />
              </svg>
              <span>主食偏好</span>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-2">
              {BASE_STAPLE_OPTIONS.map((item) =>
                renderOptionPill(
                  'staple',
                  item,
                  prefs.staples.includes(item),
                  false,
                  () => toggleMultiItem('staples', item)
                )
              )}
              {prefs.customOptions.staple.map((item) =>
                renderOptionPill(
                  'staple',
                  item,
                  prefs.staples.includes(item),
                  true,
                  () => toggleMultiItem('staples', item)
                )
              )}
              {renderDashedAddButton('staple', '+ 自定义主食')}
            </div>
          </div>

          {/* Card 5: 预算与配送时间 */}
          <div className="rounded-[16px] bg-white p-3.5 shadow-[0_1px_6px_rgba(0,0,0,0.025)]">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#1A1D21]">
              <Banknote className="h-[14px] w-[14px] text-[#B87D00] stroke-[2.2]" />
              <span>预算与配送时间</span>
            </div>

            {/* Budget Row */}
            <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
              <span className="text-[10.5px] text-[#686E77] mr-0.5 shrink-0">
                预算:
              </span>
              {BUDGET_OPTIONS.map((item) => {
                const active = prefs.budget === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setPrefs((prev) => ({ ...prev, budget: item }))}
                    className={`rounded-full px-3 py-1 text-[10.5px] transition-all active:scale-95 cursor-pointer whitespace-nowrap ${
                      active
                        ? 'bg-[#FFC700] text-[#1A1D21] font-bold'
                        : 'bg-[#F2F3F6] text-[#333840] font-medium hover:bg-[#EAECEF]'
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            {/* Delivery Time Row */}
            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
              <span className="text-[10.5px] text-[#686E77] mr-0.5 shrink-0">
                时效:
              </span>
              {BASE_TIME_OPTIONS.map((item) =>
                renderOptionPill(
                  'time',
                  item,
                  prefs.deliveryTime === item,
                  false,
                  () => setPrefs((prev) => ({ ...prev, deliveryTime: item })),
                  false
                )
              )}
              {prefs.customOptions.time.map((item) =>
                renderOptionPill(
                  'time',
                  item,
                  prefs.deliveryTime === item,
                  true,
                  () => setPrefs((prev) => ({ ...prev, deliveryTime: item })),
                  false
                )
              )}
              {renderDashedAddButton('time', '+ 自定义')}
            </div>
          </div>

          {/* Card 6: 其他自定义偏好 */}
          <div className="rounded-[16px] bg-white p-3.5 shadow-[0_1px_6px_rgba(0,0,0,0.025)]">
            <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#1A1D21]">
              <FileEdit className="h-[13.5px] w-[13.5px] text-[#B87D00] stroke-[2.2]" />
              <span>其他自定义偏好</span>
            </div>

            <div className="mt-2.5 relative flex items-center">
              <input
                type="text"
                value={prefs.customNote}
                onChange={(e) =>
                  setPrefs((prev) => ({ ...prev, customNote: e.target.value }))
                }
                placeholder="输入其他个性化偏好，如：不要预制菜、只选品牌大牌店..."
                className="w-full h-9 rounded-full bg-[#F2F3F6] border border-transparent focus:border-[#FFC700] focus:bg-white pl-3.5 pr-8 text-[10.5px] text-[#1A1D21] placeholder-[#8C939E] focus:outline-none transition-all"
              />
              {prefs.customNote && (
                <button
                  type="button"
                  onClick={() => setPrefs((prev) => ({ ...prev, customNote: '' }))}
                  aria-label="清空自定义偏好"
                  className="absolute right-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#CFD4DC] text-white hover:bg-[#9AA0A8] cursor-pointer"
                >
                  <X className="h-2.5 w-2.5 stroke-[2.8]" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Pinned Bottom Action Bar inside Drawer */}
        <div className="bg-[#F5F6F9] px-3.5 pt-2 pb-3 border-t border-black/[0.04] shrink-0">
          <button
            type="button"
            onClick={() => onSave(prefs)}
            className="w-full h-[40px] rounded-full bg-[#FFC300] hover:bg-[#FFB700] active:scale-[0.98] flex items-center justify-center gap-1.5 text-[13px] font-bold text-[#1A1D21] shadow-[0_4px_14px_rgba(255,195,0,0.4)] transition-all cursor-pointer"
          >
            <span className="flex h-[16px] w-[16px] items-center justify-center rounded-full bg-[#1A1D21] text-[#FFC300]">
              <Check className="h-[10px] w-[10px] stroke-[3.2]" />
            </span>
            <span>保存偏好设置</span>
          </button>

          <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px] text-[#686E77]">
            <ShieldCheck className="h-[12px] w-[12px] text-[#F59E0B] fill-[#F59E0B]/20" />
            <span>随时可在点餐对话中快速覆盖</span>
          </div>
        </div>
      </div>
    </div>
  );
};
