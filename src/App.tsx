/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MeituanHomeView } from './components/MeituanHomeView';
import { XiaoTuanChatView } from './components/XiaoTuanChatView';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<'home' | 'chat'>('home');
  const [initialChatPrompt, setInitialChatPrompt] = useState<string | undefined>(undefined);

  const handleOpenAssistant = (prompt?: string) => {
    setInitialChatPrompt(prompt);
    setActiveScreen('chat');
  };

  const handleBackToHome = () => {
    setInitialChatPrompt(undefined);
    setActiveScreen('home');
  };

  return (
    <div className="flex h-[100dvh] w-full items-center justify-center bg-[#DDE1E8] overflow-hidden">
      <div className="mobile-app-shell relative overflow-hidden bg-[#F5F6F8]">
        {/* Screen 1: Meituan Waimai Home Page */}
        <div
          className={`absolute inset-0 h-full w-full transition-transform duration-200 ease-out ${
            activeScreen === 'home'
              ? 'translate-x-0 opacity-100 pointer-events-auto'
              : '-translate-x-[15%] opacity-0 pointer-events-none'
          }`}
        >
          <MeituanHomeView onOpenAssistant={handleOpenAssistant} />
        </div>

        {/* Screen 2: XiaoTuan AI Assistant Chat Page */}
        <div
          className={`absolute inset-0 h-full w-full transition-transform duration-200 ease-out ${
            activeScreen === 'chat'
              ? 'translate-x-0 opacity-100 pointer-events-auto'
              : 'translate-x-full opacity-0 pointer-events-none'
          }`}
        >
          <XiaoTuanChatView
            onBack={handleBackToHome}
            initialPrompt={initialChatPrompt}
          />
        </div>
      </div>
    </div>
  );
}
