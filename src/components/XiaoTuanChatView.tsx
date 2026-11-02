import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Mic,
  SlidersHorizontal,
  ChevronRight,
  X,
  Sparkles,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';
import { ChatAvatarRobot, QuickChoiceIllustration } from './XiaoTuanIcons';
import { DishThumbnail } from './DishThumbnail';
import { RestaurantStoreView } from './RestaurantStoreView';
import {
  DietaryPreferenceDrawer,
  INITIAL_STRUCTURED_PREFS,
  StructuredPreferences,
  formatPreferencesSummary,
} from './DietaryPreferenceDrawer';
import {
  QUICK_CHOICES,
  DishRecommendation,
  getLocalRecommendation,
} from '../data/recommendations';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  queryUsed?: string;
  batchIndex?: number;
  recommendations?: DishRecommendation[];
  guidancePrompts?: string[];
}

const GUIDANCE_SUGGESTIONS = [
  '想吃热汤面或米粉',
  '预算控制在20元以内',
  '想要高蛋白减脂餐',
  '只看附近品牌大店',
];

interface XiaoTuanChatViewProps {
  onBack: () => void;
  initialPrompt?: string;
}

export const XiaoTuanChatView: React.FC<XiaoTuanChatViewProps> = ({
  onBack,
  initialPrompt,
}) => {
  const [structuredPrefs, setStructuredPrefs] = useState<StructuredPreferences>(
    INITIAL_STRUCTURED_PREFS
  );
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false);

  const preferences = formatPreferencesSummary(structuredPrefs);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedDishDetail, setSelectedDishDetail] = useState<DishRecommendation | null>(null);
  const [feedbackMap, setFeedbackMap] = useState<Record<string, 'up' | 'down' | undefined>>({});

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hasTriggeredInitialRef = useRef(false);

  const hasConversationStarted = messages.length > 0 || isLoading;

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (chatScrollRef.current) {
        chatScrollRef.current.scrollTo({
          top: chatScrollRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    });
  };

  useEffect(() => {
    if (messages.length > 0 || isLoading) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialPrompt && !hasTriggeredInitialRef.current) {
      hasTriggeredInitialRef.current = true;
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend ?? inputValue).trim();
    if (!query || isLoading) return;

    if (!textToSend) {
      setInputValue('');
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const localData = getLocalRecommendation(
        query,
        preferences,
        0,
        structuredPrefs
      );
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          text: localData.reply,
          queryUsed: query,
          batchIndex: 0,
          recommendations: localData.recommendations,
        },
      ]);
      setIsLoading(false);
    }, 280);
  };

  /**
   * 1. Clicking "↻ 换一换" appends a new user message ("换一换") and a new AI recommendation dialog box
   * with 3 brand-new restaurants matching both conversation demand and historical taste preferences,
   * WITHOUT overwriting existing conversation content.
   */
  const handleRefreshBatch = (sourceMsg: ChatMessage) => {
    if (isLoading) return;

    const query = sourceMsg.queryUsed || '今天想吃清淡一点';
    // Find the highest batchIndex already used for this query so every new dialog shows a fresh batch
    const maxBatchSoFar = messages.reduce((max, m) => {
      if (m.role === 'assistant' && m.batchIndex !== undefined) {
        return Math.max(max, m.batchIndex);
      }
      return max;
    }, sourceMsg.batchIndex ?? 0);

    const nextBatchIdx = maxBatchSoFar + 1;

    const userRefreshMsg: ChatMessage = {
      id: `user-refresh-${Date.now()}`,
      role: 'user',
      text: '换一换',
    };

    setMessages((prev) => [...prev, userRefreshMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const localRefreshed = getLocalRecommendation(
        query,
        preferences,
        nextBatchIdx,
        structuredPrefs
      );

      const newAiMsg: ChatMessage = {
        id: `ai-refresh-${Date.now()}`,
        role: 'assistant',
        text: localRefreshed.reply,
        queryUsed: query,
        batchIndex: nextBatchIdx,
        recommendations: localRefreshed.recommendations,
      };

      setMessages((prev) => [...prev, newAiMsg]);
      setIsLoading(false);
    }, 300);
  };

  /**
   * 2. Clicking "👎 都不太喜欢" appends a user message ("都不太喜欢") and an AI apology + guidance dialog
   * prompting the user to describe their needs in more detail, WITHOUT clearing history.
   */
  const handleDislikeAll = () => {
    if (isLoading) return;

    const userDislikeMsg: ChatMessage = {
      id: `user-dislike-${Date.now()}`,
      role: 'user',
      text: '都不太喜欢',
    };

    setMessages((prev) => [...prev, userDislikeMsg]);
    setIsLoading(true);

    setTimeout(() => {
      const apologyMsg: ChatMessage = {
        id: `ai-apology-${Date.now()}`,
        role: 'assistant',
        text: '非常抱歉，没能挑到合您心意的餐品🙏！您可以更详细地告诉我您的需求（比如想吃的食材、菜系、汤面还是米饭、具体预算等），小团马上为您重新精准寻找：',
        guidancePrompts: GUIDANCE_SUGGESTIONS,
      };

      setMessages((prev) => [...prev, apologyMsg]);
      setIsLoading(false);
      // Focus the bottom input bar so the user can type details right away
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    }, 280);
  };

  const toggleDishFeedback = (dishId: string, type: 'up' | 'down') => {
    setFeedbackMap((prev) => ({
      ...prev,
      [dishId]: prev[dishId] === type ? undefined : type,
    }));
  };

  const handleSavePreferences = (newPrefs: StructuredPreferences) => {
    setStructuredPrefs(newPrefs);
    setIsPrefModalOpen(false);
  };

  return (
    <div className="relative flex h-full w-full flex-col bg-[#F5F6F8] text-[#1A1D21] select-none overflow-hidden">
      {/* 1. Compact Status Bar */}
      <div className="flex items-center justify-between bg-[#F7F8FA] px-4 pt-2 pb-1 text-[11px] font-semibold text-[#1F2329] shrink-0">
        <span className="tracking-tight tabular-nums">12:00</span>
        <div className="flex items-center gap-1">
          <svg viewBox="0 0 18 12" className="h-[9.5px] w-[14px]" fill="currentColor">
            <rect x="1" y="8" width="2.5" height="4" rx="0.8" />
            <rect x="5" y="6" width="2.5" height="6" rx="0.8" />
            <rect x="9" y="3.5" width="2.5" height="8.5" rx="0.8" />
            <rect x="13" y="1" width="2.5" height="11" rx="0.8" opacity="0.35" />
          </svg>
          <svg viewBox="0 0 16 12" className="h-[9.5px] w-[13px]" fill="currentColor">
            <path d="M8 9.6a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8Zm-3.1-1.9a4.6 4.6 0 0 1 6.2 0l1.1-1.2a6.2 6.2 0 0 0-8.4 0l1.1 1.2Zm-2.6-2.6a8.3 8.3 0 0 1 11.4 0L14.8 4a9.9 9.9 0 0 0-13.6 0l1.1 1.1Z" />
          </svg>
          <svg viewBox="0 0 14 14" className="h-[10.5px] w-[10.5px]" fill="currentColor">
            <rect x="3.5" y="1" width="7" height="1.5" rx="0.5" />
            <rect x="2" y="2.5" width="10" height="10.5" rx="1.8" />
          </svg>
        </div>
      </div>

      {/* 2. Navigation Header Bar */}
      <header className="flex items-center justify-between gap-2.5 bg-[#F7F8FA] px-3.5 pt-1 pb-2.5 border-b border-[#E6E8EC] shrink-0">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <button
            type="button"
            onClick={onBack}
            aria-label="返回美团外卖首页"
            className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#EAECEF] text-[#1F2329] hover:bg-[#DFE2E7] active:scale-95 transition-all cursor-pointer"
          >
            <ArrowLeft className="h-[14px] w-[14px] stroke-[2.2]" />
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h1 className="text-[14px] font-bold tracking-tight text-[#1A1D21] leading-tight truncate">
                {hasConversationStarted ? 'AI午餐助手' : '小团点餐助手'}
              </h1>
              {hasConversationStarted && (
                <span className="h-[7px] w-[7px] rounded-full bg-[#FFB800] shrink-0" />
              )}
            </div>
            <p className="text-[10px] text-[#686F78] mt-0.5 leading-tight truncate">
              根据你的口味习惯，为你推荐今日饮食
            </p>
          </div>
        </div>

        {/* Right History / Reset Icon Button */}
        <button
          type="button"
          onClick={() => setMessages([])}
          title="清空重选"
          aria-label="历史记录与重置"
          className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#EAECEF] text-[#1F2329] hover:bg-[#DFE2E7] active:scale-95 transition-all cursor-pointer"
        >
          <RotateCcw className="h-[13.5px] w-[13.5px] stroke-[2.1]" />
        </button>
      </header>

      {/* 3. Scrollable Conversation Body */}
      <div
        ref={chatScrollRef}
        className="flex-1 overflow-y-auto overflow-x-hidden px-3 pt-2.5 pb-4 no-scrollbar"
      >
        {!hasConversationStarted ? (
          /* === STATE A: Expanded Initial Greeting Card === */
          <>
            <div className="flex justify-center mb-3">
              <div className="inline-flex items-center rounded-full bg-[#ECEEF1] px-3 py-1 text-[10px] font-medium text-[#464C54] tracking-tight">
                今天 12:00 · 闵行区 · 阴天 21°C
              </div>
            </div>

            <div className="flex items-start gap-2">
              <ChatAvatarRobot className="mt-0.5" />

              <div className="min-w-0 flex-1">
                <div className="rounded-[15px] bg-white p-3 shadow-[0_1px_6px_rgba(0,0,0,0.03)] border border-[#ECEEF2]">
                  <h2 className="text-[13px] font-bold text-[#1A1D21] pb-2 border-b border-[#F1F2F5]">
                    中午好！今天想吃点什么？
                  </h2>

                  <p className="text-[10.5px] font-medium text-[#525860] mt-2 mb-2">
                    点击快捷选择：
                  </p>

                  {/* 2x2 Quick Selection Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {QUICK_CHOICES.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => handleSendMessage(item.prompt)}
                        className="group flex items-center gap-1.5 rounded-full bg-[#F6F7F9] hover:bg-[#FFFDF4] border border-[#E6E8EC] hover:border-[#FFC700] px-2.5 py-1.5 text-left transition-all active:scale-[0.97] cursor-pointer min-w-0"
                      >
                        <QuickChoiceIllustration id={item.id} />
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-bold text-[#1A1D21] leading-tight truncate">
                            {item.title}
                          </div>
                          <div className="text-[9.5px] text-[#7A818B] mt-0.5 leading-tight truncate">
                            {item.subtitle}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Taste Preferences Row Below Card */}
                <div className="mt-2 px-0.5 flex items-center justify-between gap-1.5 text-[10px]">
                  <div className="flex items-center gap-1 text-[#686E77] min-w-0 flex-1">
                    <SlidersHorizontal className="h-[11px] w-[11px] shrink-0 text-[#686E77]" />
                    <span className="truncate">
                      您的口味：{preferences.join(' · ')}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPrefModalOpen(true)}
                    className="flex items-center gap-0.5 font-semibold text-[#B47800] hover:text-[#946200] active:scale-95 transition-transform shrink-0 cursor-pointer whitespace-nowrap"
                  >
                    <span>修改偏好</span>
                    <ChevronRight className="h-[11px] w-[11px] stroke-[2.4]" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* === STATE B: Collapsed Top Greeting + Taste Pill + Conversation Stream === */
          <div className="space-y-3">
            {/* Collapsed Initial Greeting & Taste Pill Row */}
            <div className="flex items-start gap-2">
              <ChatAvatarRobot className="mt-0.5" showOnlineDot={false} />

              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="rounded-full bg-white px-3.5 py-2 text-[11.5px] font-medium text-[#1A1D21] shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-[#EAECEF]">
                  中午好！今天想吃点什么？
                </div>

                <div className="flex items-center justify-between gap-2 rounded-full bg-white px-3.5 py-1.5 text-[10px] shadow-[0_1px_4px_rgba(0,0,0,0.03)] border border-[#EAECEF] border-t-[2px] border-t-[#FFB800]">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1 text-[#282C33]">
                    <SlidersHorizontal className="h-[11px] w-[11px] shrink-0 text-[#C48200]" />
                    <span className="truncate">
                      <span className="text-[#686E77]">口味：</span>
                      <span className="font-medium">{preferences.join(' · ')}</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPrefModalOpen(true)}
                    className="flex items-center gap-0.5 font-semibold text-[#9A6700] hover:text-[#7A5000] shrink-0 cursor-pointer whitespace-nowrap"
                  >
                    <span>修改</span>
                    <ChevronRight className="h-[10px] w-[10px] stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Conversation Messages Stream */}
            {messages.map((msg) =>
              msg.role === 'user' ? (
                /* Right-Aligned Yellow User Pill Bubble */
                <div key={msg.id} className="flex justify-end pl-10">
                  <div className="rounded-full rounded-tr-[4px] bg-[#FFC700] px-3.5 py-1.5 text-[11.5px] font-medium text-[#3D2C00] shadow-2xs">
                    {msg.text}
                  </div>
                </div>
              ) : (
                /* Left-Aligned AI Message Block (Either Recommendation Cards OR Apology & Guidance) */
                <div key={msg.id} className="flex items-start gap-2">
                  <ChatAvatarRobot className="mt-0.5" showOnlineDot={false} />

                  <div className="min-w-0 flex-1">
                    <div className="rounded-[18px] bg-white p-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-[#ECEEF2]">
                      <p className="text-[11.5px] font-medium text-[#282C33] leading-relaxed">
                        {msg.text}
                      </p>

                      {/* 3 Dish Cards (when message has recommendations) */}
                      {msg.recommendations && msg.recommendations.length > 0 && (
                        <div className="mt-2.5 space-y-2.5">
                          {msg.recommendations.map((dish) => {
                            const feedback = feedbackMap[dish.id];
                            return (
                              <div
                                key={dish.id}
                                className="rounded-[13px] bg-[#F8F9FB] border border-[#ECEEF2] p-2.5 transition-colors hover:border-[#FFD000]"
                              >
                                <div className="flex items-center gap-2.5">
                                  <DishThumbnail
                                    visualType={dish.visualType}
                                    badge={dish.imageBadge}
                                  />

                                  <div className="min-w-0 flex-1">
                                    <h4 className="text-[12.5px] font-bold text-[#1A1D21] leading-snug truncate">
                                      {dish.dishName}
                                    </h4>
                                    <p className="text-[10px] text-[#787F88] mt-1 truncate">
                                      {dish.shopName} · {dish.deliveryTime}
                                    </p>
                                  </div>

                                  <div className="text-right shrink-0">
                                    <div className="flex items-baseline justify-end gap-0.5 tabular-nums">
                                      <span className="text-[13.5px] font-extrabold text-[#E53935]">
                                        ¥{dish.price}
                                      </span>
                                      <span className="text-[9.5px] text-[#9AA0A8] line-through">
                                        ¥{dish.originalPrice}
                                      </span>
                                    </div>

                                    <div className="mt-1 inline-flex items-center gap-0.5 rounded bg-[#FFF3DF] px-1.5 py-0.5 text-[9.5px] font-bold text-[#FF7A00] tabular-nums">
                                      <span>★</span>
                                      <span>{dish.rating}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="my-2 border-t border-[#EAECEF]" />

                                <div className="flex items-center justify-between gap-1.5">
                                  <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
                                    <span className="rounded bg-[#ECEDF0] px-1.5 py-0.5 text-[9.5px] font-medium text-[#5A6068] whitespace-nowrap">
                                      {dish.grayTag}
                                    </span>
                                    <span className="inline-flex items-center gap-0.5 rounded bg-[#E5F7ED] px-1.5 py-0.5 text-[9.5px] font-medium text-[#16A34A] whitespace-nowrap">
                                      <span>✓</span>
                                      <span>{dish.greenTag}</span>
                                    </span>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => toggleDishFeedback(dish.id, 'up')}
                                      aria-label="喜欢"
                                      className={`flex h-[23px] w-[23px] items-center justify-center rounded-full border transition-colors cursor-pointer ${
                                        feedback === 'up'
                                          ? 'bg-[#FFF5D6] border-[#FFC700] text-[#D48800]'
                                          : 'bg-white border-[#E4E7EC] text-[#686E77] hover:border-[#CFD4DC]'
                                      }`}
                                    >
                                      <ThumbsUp className="h-[11px] w-[11px]" />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => toggleDishFeedback(dish.id, 'down')}
                                      aria-label="不喜欢"
                                      className={`flex h-[23px] w-[23px] items-center justify-center rounded-full border transition-colors cursor-pointer ${
                                        feedback === 'down'
                                          ? 'bg-[#F0F1F5] border-[#9AA0A8] text-[#1A1D21]'
                                          : 'bg-white border-[#E4E7EC] text-[#686E77] hover:border-[#CFD4DC]'
                                      }`}
                                    >
                                      <ThumbsDown className="h-[11px] w-[11px]" />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => setSelectedDishDetail(dish)}
                                      className="inline-flex items-center gap-0.5 rounded-full bg-[#FFC700] hover:bg-[#FFB800] active:scale-95 px-2.5 py-1 text-[10px] font-bold text-[#1A1D21] shadow-2xs transition-all cursor-pointer whitespace-nowrap"
                                    >
                                      <span>详情</span>
                                      <span>→</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Guidance Prompt Chips (when user clicked "都不太喜欢") */}
                      {msg.guidancePrompts && msg.guidancePrompts.length > 0 && (
                        <div className="mt-2.5 pt-2.5 border-t border-[#F1F2F5]">
                          <p className="text-[10px] text-[#787F88] mb-2">
                            您可以点击补充偏好，或在底部输入框直接告诉我：
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.guidancePrompts.map((promptText, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleSendMessage(promptText)}
                                className="rounded-full bg-[#F6F7F9] hover:bg-[#FFF9E6] border border-[#E4E7EC] hover:border-[#FFC700] px-2.5 py-1 text-[10.5px] font-medium text-[#333840] active:scale-95 transition-all cursor-pointer"
                              >
                                {promptText}
                              </button>
                            ))}
                            <button
                              type="button"
                              onClick={() => setIsPrefModalOpen(true)}
                              className="rounded-full bg-[#FFFDF6] border border-[#FFC700] px-2.5 py-1 text-[10.5px] font-bold text-[#9A6700] active:scale-95 transition-all cursor-pointer"
                            >
                              ⚙️ 调整口味偏好
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Action Pills ("↻ 换一换" & "👎 都不太喜欢") below Recommendation Cards */}
                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="mt-2.5 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleRefreshBatch(msg)}
                          disabled={isLoading}
                          className="inline-flex items-center gap-1 rounded-full bg-[#FFFDF7] border-[1.5px] border-[#FFC700] hover:bg-[#FFF9E6] active:scale-95 px-3 py-1 text-[10.5px] font-bold text-[#1A1D21] shadow-2xs transition-all cursor-pointer"
                        >
                          <RotateCcw className="h-[11px] w-[11px] stroke-[2.3] text-[#B47800]" />
                          <span>换一换</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleDislikeAll}
                          disabled={isLoading}
                          className="inline-flex items-center gap-1 rounded-full bg-white border border-[#E2E5EC] hover:bg-[#F6F7F9] active:scale-95 px-3 py-1 text-[10.5px] font-medium text-[#484E56] shadow-2xs transition-all cursor-pointer"
                        >
                          <ThumbsDown className="h-[11px] w-[11px] text-[#686E77]" />
                          <span>都不太喜欢</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )
            )}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-start gap-2">
                <ChatAvatarRobot className="mt-0.5" showOnlineDot={false} />
                <div className="rounded-[14px] bg-white px-3 py-2 shadow-2xs border border-[#ECEEF2] flex items-center gap-1.5 text-[11px] text-[#666D75]">
                  <Sparkles className="h-3.5 w-3.5 text-[#FFB800] animate-spin" />
                  <span>小团正在为您处理...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Compact Bottom Input Bar */}
      <div className="bg-white border-t border-[#EAECEF] px-3 pt-2 pb-1.5 shrink-0 z-10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={() => setIsVoiceActive(true)}
            aria-label="语音输入"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#EFF1F5] text-[#282C33] hover:bg-[#E4E7ED] active:scale-95 transition-all cursor-pointer"
          >
            <Mic className="h-[15px] w-[15px] stroke-[2]" />
          </button>

          <div className="flex-1 h-[34px] rounded-full bg-[#F2F3F7] border border-[#E5E7EB] focus-within:border-[#FFC300] focus-within:bg-white px-3 flex items-center transition-all min-w-0">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="例如：想吃清淡点，预算30元左右"
              className="w-full bg-transparent text-[11px] text-[#1A1D21] placeholder-[#949BA5] focus:outline-none truncate"
            />
          </div>

          <button
            type="submit"
            aria-label="发送"
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#FFC700] hover:bg-[#FFBB00] text-[#1A1D21] shadow-[0_3px_10px_rgba(255,199,0,0.45)] active:scale-95 transition-all cursor-pointer"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-[15px] w-[15px] translate-x-[0.5px]"
              fill="currentColor"
            >
              <path d="M3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z" />
            </svg>
          </button>
        </form>

        <div className="mt-2 flex justify-center">
          <div className="h-[3.5px] w-[100px] rounded-full bg-[#CFD3D9]" />
        </div>
      </div>

      {/* Modal 1: Combined Floating Sheet Dietary Preference Drawer */}
      <DietaryPreferenceDrawer
        isOpen={isPrefModalOpen}
        initialPrefs={structuredPrefs}
        onClose={() => setIsPrefModalOpen(false)}
        onSave={handleSavePreferences}
      />

      {/* Modal 2: Voice Input Drawer */}
      {isVoiceActive && (
        <div className="absolute inset-0 z-50 flex flex-col justify-end bg-black/45 backdrop-blur-[1px]">
          <div className="rounded-t-[20px] bg-white p-4 text-center shadow-2xl">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsVoiceActive(false)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F2F3F7] text-[#5A6068] cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="mx-auto my-1.5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF5CC] text-[#FF9900]">
              <Mic className="h-6 w-6 animate-bounce" />
            </div>

            <h3 className="text-[13px] font-bold text-[#1A1D21] mt-1">
              小团正在听您说...
            </h3>
            <p className="text-[10.5px] text-[#7A818B] mt-0.5">
              点击下方语音快捷指令直接发送：
            </p>

            <div className="mt-3 space-y-1.5 text-left">
              {[
                '“今天想吃清淡一点”',
                '“今天想吃辣的”',
                '“想要经济实惠的25元便当”',
              ].map((sample, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    setIsVoiceActive(false);
                    handleSendMessage(sample.replace(/[“”]/g, ''));
                  }}
                  className="w-full rounded-xl bg-[#F6F7F9] hover:bg-[#FFF9E2] border border-[#E6E8EC] hover:border-[#FFC700] px-3 py-2 text-[11px] font-medium text-[#282C33] transition-all flex items-center justify-between cursor-pointer"
                >
                  <span className="truncate">{sample}</span>
                  <span className="text-[10px] font-bold text-[#B47800] shrink-0 ml-2">
                    发送
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Restaurant Store Menu Page */}
      {selectedDishDetail && (
        <div className="absolute inset-0 z-50 h-full w-full bg-white">
          <RestaurantStoreView
            dish={selectedDishDetail}
            preferences={preferences}
            onBack={() => setSelectedDishDetail(null)}
            onCompleteOrder={() => {
              setSelectedDishDetail(null);
              onBack();
            }}
          />
        </div>
      )}
    </div>
  );
};
