import React from 'react';
import { TRADITIONS } from '../../data/researchData';
import { TraditionType } from '../../types';
import { Sparkles, Moon, Sun, Volume2, VolumeX, Flame, BookOpen, Compass, Smartphone } from 'lucide-react';

interface AppHeaderProps {
  currentTradition: TraditionType;
  onSelectTradition: (tradition: TraditionType) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  activeView: 'research' | 'app';
  onChangeView: (view: 'research' | 'app') => void;
  currentStreak: number;
  onOpenOnboarding?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  currentTradition,
  onSelectTradition,
  soundEnabled,
  onToggleSound,
  isDarkMode,
  onToggleDarkMode,
  activeView,
  onChangeView,
  currentStreak,
  onOpenOnboarding,
}) => {
  const activeTraditionInfo =
    TRADITIONS.find((t) => t.id === currentTradition) || TRADITIONS[0];

  return (
    <header className="sticky top-0 z-50 bg-[#FDFCF8]/95 dark:bg-[#111412]/95 backdrop-blur-md border-b border-[#E5E1D8] dark:border-[#2D3530] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#D4AF37]/60 shadow-sm shrink-0 bg-[#1E2620]">
            <img
              src="/lumina_app_logo.jpg"
              alt="Lumina App Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-base sm:text-lg text-[#242926] dark:text-[#EDEFEA] tracking-wide">
                灵境智修
              </h1>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D]">
                Lumina Faith & AI
              </span>
            </div>
            <p className="text-[11px] text-[#6C736E] dark:text-[#9BA39D] hidden sm:block">
              智慧信仰与心性觉察平台
            </p>
          </div>
        </div>

        {/* Center Main Mode Toggle: Research & PRD vs Live Prototype */}
        <div className="flex items-center p-1 rounded-xl bg-[#F4F1EA] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530]">
          <button
            onClick={() => onChangeView('app')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all ${
              activeView === 'app'
                ? 'bg-[#4A5D4E] text-white shadow-xs'
                : 'text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>移动端真机预览</span>
          </button>
          <button
            onClick={() => onChangeView('research')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all ${
              activeView === 'research'
                ? 'bg-[#4A5D4E] text-white shadow-xs'
                : 'text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>全景研报与PRD</span>
          </button>
        </div>

        {/* Right Tools: Tradition Selector, Audio, Theme, Streak */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tradition Picker Dropdown */}
          <div className="relative group">
            <button
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#181C19] hover:bg-[#F0EDE6] dark:hover:bg-[#232925] border border-[#E5E1D8] dark:border-[#2D3530] text-xs font-serif font-medium text-[#242926] dark:text-[#EDEFEA] transition-colors"
              title="切换精神哲学流派"
            >
              <Compass className="w-3.5 h-3.5 text-[#4A5D4E] dark:text-[#7B9280]" />
              <span className="hidden md:inline font-bold">{activeTraditionInfo.name.split('/')[0]}</span>
              <span className="md:hidden font-bold">{activeTraditionInfo.symbol}</span>
            </button>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full mt-2 w-56 p-2 rounded-xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 space-y-1">
              <div className="text-[10px] font-bold text-[#6C736E] dark:text-[#9BA39D] uppercase px-2 py-1">
                选择修习精神坐标
              </div>
              {TRADITIONS.map((trad) => (
                <button
                  key={trad.id}
                  onClick={() => onSelectTradition(trad.id)}
                  className={`w-full text-left px-2.5 py-2 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    currentTradition === trad.id
                      ? 'bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] font-bold'
                      : 'text-[#242926] dark:text-[#EDEFEA] hover:bg-[#FAF8F5] dark:hover:bg-[#232925]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">{trad.symbol}</span>
                    <span>{trad.name}</span>
                  </div>
                  {currentTradition === trad.id && (
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Practice Streak Badge */}
          <div
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#F9F5EA] dark:bg-[#2A2616] border border-[#EFE4C6] dark:border-[#3F371B] text-[#8C701E] dark:text-[#E5C358] text-xs font-medium"
            title="连续修心天数"
          >
            <Flame className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
            <span>修心 {currentStreak} 天</span>
          </div>

          {/* Sound Mute Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D] hover:bg-[#F0EDE6] dark:hover:bg-[#232925] border border-[#E5E1D8] dark:border-[#2D3530] transition-colors"
            title={soundEnabled ? '静音仪式音效' : '开启仪式音效 (木鱼/颂钵/钟声)'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#4A5D4E] dark:text-[#7B9280]" />
            ) : (
              <VolumeX className="w-4 h-4 text-[#6C736E]" />
            )}
          </button>

          {/* Dark / Light Theme Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D] hover:bg-[#F0EDE6] dark:hover:bg-[#232925] border border-[#E5E1D8] dark:border-[#2D3530] transition-colors"
            title={isDarkMode ? '切换到宣纸日间主题' : '切换到玄青夜修主题'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-[#D4AF37]" /> : <Moon className="w-4 h-4 text-[#4A5D4E]" />}
          </button>
        </div>
      </div>
    </header>
  );
};
