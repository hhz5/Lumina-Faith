import React, { useState, useEffect } from 'react';
import { TraditionType } from '../../types';
import { TRADITIONS } from '../../data/researchData';
import { audioService } from '../../utils/audioSynthesizer';

// Sub-components
import { SanctuaryView } from './SanctuaryView';
import { MeditationDetailView } from './MeditationDetailView';
import { AiWisdomChat } from './AiWisdomChat';
import { RitualSanctuary } from './RitualSanctuary';
import { ScriptureLibrary } from './ScriptureLibrary';
import { ConfessionRoom } from './ConfessionRoom';
import { OnboardingFlow } from './OnboardingFlow';

// Icons
import {
  Compass,
  Wind,
  MessageCircle,
  Music,
  BookOpen,
  Heart,
  Sparkles,
  Smartphone,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Moon,
  Sun,
  Flame,
  CheckCircle2,
  Layers,
  ChevronDown,
  ChevronRight,
  X,
  ShieldCheck,
  RotateCcw,
  Wifi,
  Signal,
  Battery,
  SlidersHorizontal,
} from 'lucide-react';

export type AppTabType =
  | 'sanctuary'
  | 'meditation'
  | 'chat'
  | 'ritual'
  | 'scripture'
  | 'confession'
  | 'onboarding';

interface MobileAppShellProps {
  tradition: TraditionType;
  onSelectTradition: (tradition: TraditionType) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  currentStreak: number;
  activeTab: AppTabType;
  onNavigateTab: (tab: AppTabType) => void;
  onSwitchToResearchHub: () => void;
}

type DeviceModel = 'iphone16pro' | 'iphonese' | 'android';

export const MobileAppShell: React.FC<MobileAppShellProps> = ({
  tradition,
  onSelectTradition,
  soundEnabled,
  onToggleSound,
  isDarkMode,
  onToggleDarkMode,
  currentStreak,
  activeTab,
  onNavigateTab,
  onSwitchToResearchHub,
}) => {
  // Mobile frame mode vs fullscreen responsive mode
  const [viewMode, setViewMode] = useState<'phone' | 'fullscreen'>('phone');
  const [deviceModel, setDeviceModel] = useState<DeviceModel>('iphone16pro');
  const [zoomScale, setZoomScale] = useState<number>(100);

  // In-phone Action Sheet / Drawer state
  const [isPhoneMenuOpen, setIsPhoneMenuOpen] = useState(false);
  const [isTraditionDropdownOpen, setIsTraditionDropdownOpen] = useState(false);
  const [isComplianceModalOpen, setIsComplianceModalOpen] = useState(false);

  // Real-time digital clock for status bar
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const activeTraditionInfo =
    TRADITIONS.find((t) => t.id === tradition) || TRADITIONS[0];

  // Device width mapping
  const deviceWidthMap: Record<DeviceModel, { width: number; name: string; height: number }> = {
    iphone16pro: { width: 393, height: 830, name: 'iPhone 16 Pro (393×830)' },
    iphonese: { width: 375, height: 750, name: 'iPhone SE (375×750)' },
    android: { width: 412, height: 840, name: 'Android Pro (412×840)' },
  };

  const currentDevice = deviceWidthMap[deviceModel];

  // Tab switch with haptic-like sound
  const handleTabClick = (tab: AppTabType) => {
    if (soundEnabled && tab !== activeTab) {
      audioService.playBeadClick();
    }
    onNavigateTab(tab);
    setIsPhoneMenuOpen(false);
    setIsTraditionDropdownOpen(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Companion Control Dock (Top Bar on Desktop) */}
      <div className="w-full max-w-6xl mx-auto px-4 py-3 mb-6 bg-[#FFFFFF] dark:bg-[#1A211D] border border-[#E5E1D8] dark:border-[#2D3530] rounded-2xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Left: View Mode Switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-xl bg-[#FAF8F5] dark:bg-[#121614] border border-[#E5E1D8] dark:border-[#2D3530]">
            <button
              onClick={() => setViewMode('phone')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all ${
                viewMode === 'phone'
                  ? 'bg-[#4A5D4E] text-white shadow-xs'
                  : 'text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
              }`}
              title="手机真机外框预览"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>手机真机外框</span>
            </button>
            <button
              onClick={() => setViewMode('fullscreen')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold transition-all ${
                viewMode === 'fullscreen'
                  ? 'bg-[#4A5D4E] text-white shadow-xs'
                  : 'text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
              }`}
              title="全屏平铺展开预览"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>宽屏平铺模式</span>
            </button>
          </div>

          {/* Device Model Selector (Only active in phone mode) */}
          {viewMode === 'phone' && (
            <div className="hidden sm:flex items-center gap-1 text-xs">
              {(['iphone16pro', 'iphonese', 'android'] as DeviceModel[]).map((model) => (
                <button
                  key={model}
                  onClick={() => setDeviceModel(model)}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono transition-colors ${
                    deviceModel === model
                      ? 'bg-[#EEF3EF] dark:bg-[#232D26] text-[#354338] dark:text-[#A3B8A7] border-[#4A5D4E]/40 font-bold'
                      : 'border-[#E5E1D8] dark:border-[#2D3530] text-[#6C736E] dark:text-[#9BA39D] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {model === 'iphone16pro' ? 'iPhone 16 Pro' : model === 'iphonese' ? 'iPhone SE' : 'Android'}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center: Quick Jump Pad */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-0.5 max-w-full text-xs">
          <span className="text-[11px] text-[#8C701E] dark:text-[#D4AF37] font-serif font-bold hidden md:inline mr-1">
            快速穿梭:
          </span>
          {[
            { id: 'sanctuary', label: '觉照', icon: Compass },
            { id: 'meditation', label: '冥想', icon: Wind },
            { id: 'chat', label: '问心', icon: MessageCircle },
            { id: 'ritual', label: '仪轨', icon: Music },
            { id: 'scripture', label: '经藏', icon: BookOpen },
            { id: 'confession', label: '告解', icon: Heart },
            { id: 'onboarding', label: '引导', icon: Sparkles },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id as AppTabType)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all text-xs font-serif ${
                  isCurrent
                    ? 'bg-[#4A5D4E] text-white font-bold shadow-xs'
                    : 'bg-[#FAF8F5] dark:bg-[#121614] border border-[#E5E1D8] dark:border-[#2D3530] text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Zoom Scale & Testing Note */}
        <div className="flex items-center gap-2">
          {viewMode === 'phone' && (
            <div className="hidden lg:flex items-center gap-1 text-[11px] text-[#6C736E] dark:text-[#9BA39D]">
              <span>缩放:</span>
              {[100, 90, 80].map((scale) => (
                <button
                  key={scale}
                  onClick={() => setZoomScale(scale)}
                  className={`px-2 py-0.5 rounded border text-[10px] font-mono ${
                    zoomScale === scale
                      ? 'bg-[#4A5D4E] text-white border-[#4A5D4E]'
                      : 'border-[#E5E1D8] dark:border-[#2D3530] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {scale}%
                </button>
              ))}
            </div>
          )}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D] text-[11px] font-serif font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> 全功能真机可点
          </span>
        </div>
      </div>

      {/* Main Preview Container */}
      {viewMode === 'phone' ? (
        /* PHONE SIMULATOR MODE */
        <div
          className="transition-transform duration-200 flex justify-center w-full py-2 px-2"
          style={{ transform: `scale(${zoomScale / 100})`, transformOrigin: 'top center' }}
        >
          {/* External Physical Phone Chassis Frame */}
          <div
            style={{ width: `${currentDevice.width}px`, height: `${currentDevice.height}px` }}
            className="relative rounded-[48px] p-3.5 bg-gradient-to-b from-[#2E3531] via-[#1B221E] to-[#121614] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.15)] border-4 border-[#3D4741] flex flex-col shrink-0 select-none overflow-hidden transition-all duration-300"
          >
            {/* Phone Hardware Buttons Visual Accents */}
            <div className="absolute -left-[7px] top-24 w-[3px] h-9 bg-[#2B332E] rounded-l-sm" />
            <div className="absolute -left-[7px] top-36 w-[3px] h-12 bg-[#2B332E] rounded-l-sm" />
            <div className="absolute -left-[7px] top-52 w-[3px] h-12 bg-[#2B332E] rounded-l-sm" />
            <div className="absolute -right-[7px] top-32 w-[3px] h-16 bg-[#2B332E] rounded-r-sm" />

            {/* In-Phone Screen Glass (Viewport) */}
            <div className="w-full h-full rounded-[38px] overflow-hidden bg-[#FDFCF8] dark:bg-[#111412] text-[#242926] dark:text-[#EDEFEA] flex flex-col relative shadow-inner select-text">
              {/* Top Safe Area & iOS Status Bar */}
              <div className="pt-2.5 px-6 pb-1 flex items-center justify-between text-xs font-semibold select-none z-30 shrink-0 bg-[#FDFCF8]/95 dark:bg-[#111412]/95 backdrop-blur-md">
                {/* Real-time Clock */}
                <span className="font-mono text-xs tracking-tight text-[#242926] dark:text-[#EDEFEA]">
                  {currentTime || '09:41'}
                </span>

                {/* Center Dynamic Island */}
                <div
                  onClick={() => {
                    if (activeTab !== 'meditation') {
                      handleTabClick('meditation');
                    }
                  }}
                  className="group flex items-center justify-center gap-1.5 px-3 py-1 bg-black text-white rounded-full text-[10px] cursor-pointer shadow-sm hover:scale-105 transition-transform"
                  title="灵动岛 · 点击可进入深度冥想"
                >
                  <div className="w-2.5 h-2.5 rounded-full bg-[#121614] border border-white/20 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-[#4A5D4E] animate-pulse" />
                  </div>
                  <span className="text-[10px] text-white/80 font-mono tracking-wider font-normal">
                    {soundEnabled ? '432Hz' : '静心'}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]/80 group-hover:animate-ping" />
                </div>

                {/* Right Status Icons: Signal, Wifi, Battery */}
                <div className="flex items-center gap-1.5 text-[#242926] dark:text-[#EDEFEA]">
                  <Signal className="w-3.5 h-3.5" />
                  <Wifi className="w-3.5 h-3.5" />
                  <div className="flex items-center gap-0.5">
                    <span className="text-[10px] font-mono">100</span>
                    <Battery className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                  </div>
                </div>
              </div>

              {/* In-App Mobile Top Bar */}
              <div className="px-4 py-2 flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#2D3530] bg-[#FDFCF8]/95 dark:bg-[#111412]/95 backdrop-blur-md shrink-0 z-20">
                {/* Brand & Logo */}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg overflow-hidden border border-[#D4AF37]/60 shadow-xs shrink-0 bg-[#1E2620]">
                    <img
                      src="/lumina_app_logo.jpg"
                      alt="Lumina App Logo"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-xs leading-none text-[#242926] dark:text-[#EDEFEA]">
                      灵境智修
                    </h2>
                    <span className="text-[9px] text-[#6C736E] dark:text-[#9BA39D]">
                      {activeTraditionInfo.name.split('/')[0]}
                    </span>
                  </div>
                </div>

                {/* Header Controls: Tradition Pill, Sound, Streak, Menu */}
                <div className="flex items-center gap-1.5">
                  {/* Tradition Pill Dropdown Toggle */}
                  <div className="relative">
                    <button
                      onClick={() => setIsTraditionDropdownOpen((v) => !v)}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-[11px] font-serif font-bold text-[#242926] dark:text-[#EDEFEA]"
                    >
                      <span>{activeTraditionInfo.symbol}</span>
                      <ChevronDown className="w-3 h-3 text-[#6C736E]" />
                    </button>

                    {/* Tradition Popover Menu */}
                    {isTraditionDropdownOpen && (
                      <div className="absolute right-0 top-full mt-1.5 w-48 p-1.5 rounded-xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xl z-50 space-y-1">
                        <div className="text-[9px] font-bold text-[#6C736E] dark:text-[#9BA39D] px-2 py-1 uppercase">
                          切换精神传统
                        </div>
                        {TRADITIONS.map((trad) => (
                          <button
                            key={trad.id}
                            onClick={() => {
                              onSelectTradition(trad.id);
                              setIsTraditionDropdownOpen(false);
                            }}
                            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between ${
                              tradition === trad.id
                                ? 'bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] font-bold'
                                : 'text-[#242926] dark:text-[#EDEFEA] hover:bg-[#FAF8F5] dark:hover:bg-[#232925]'
                            }`}
                          >
                            <span className="flex items-center gap-1.5">
                              <span>{trad.symbol}</span>
                              <span className="text-[11px]">{trad.name.split('/')[0]}</span>
                            </span>
                            {tradition === trad.id && (
                              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Sound Toggle */}
                  <button
                    onClick={onToggleSound}
                    className="p-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-[#6C736E] dark:text-[#9BA39D]"
                    title={soundEnabled ? '音效开启' : '静音模式'}
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-3.5 h-3.5 text-[#4A5D4E] dark:text-[#7B9280]" />
                    ) : (
                      <VolumeX className="w-3.5 h-3.5 text-[#6C736E]" />
                    )}
                  </button>

                  {/* Dark Mode Toggle */}
                  <button
                    onClick={onToggleDarkMode}
                    className="p-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-[#6C736E] dark:text-[#9BA39D]"
                    title={isDarkMode ? '宣纸日间' : '玄青夜修'}
                  >
                    {isDarkMode ? (
                      <Sun className="w-3.5 h-3.5 text-[#D4AF37]" />
                    ) : (
                      <Moon className="w-3.5 h-3.5 text-[#4A5D4E]" />
                    )}
                  </button>

                  {/* Mobile Menu Action Sheet Trigger */}
                  <button
                    onClick={() => setIsPhoneMenuOpen(true)}
                    className="p-1.5 rounded-lg bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-[#6C736E] dark:text-[#9BA39D]"
                    title="功能抽屉"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5 text-[#4A5D4E] dark:text-[#7B9280]" />
                  </button>
                </div>
              </div>

              {/* Scrollable Active Screen Body */}
              <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4 text-left scroll-smooth">
                {activeTab === 'sanctuary' && (
                  <SanctuaryView
                    tradition={tradition}
                    soundEnabled={soundEnabled}
                    onNavigateToTab={(tab) => handleTabClick(tab)}
                  />
                )}
                {activeTab === 'meditation' && (
                  <MeditationDetailView tradition={tradition} soundEnabled={soundEnabled} />
                )}
                {activeTab === 'chat' && (
                  <AiWisdomChat currentTradition={tradition} soundEnabled={soundEnabled} />
                )}
                {activeTab === 'ritual' && <RitualSanctuary soundEnabled={soundEnabled} />}
                {activeTab === 'scripture' && (
                  <ScriptureLibrary currentTradition={tradition} soundEnabled={soundEnabled} />
                )}
                {activeTab === 'confession' && <ConfessionRoom soundEnabled={soundEnabled} />}
                {activeTab === 'onboarding' && (
                  <OnboardingFlow
                    currentTradition={tradition}
                    onSelectTradition={onSelectTradition}
                    onFinishOnboarding={() => handleTabClick('sanctuary')}
                    soundEnabled={soundEnabled}
                  />
                )}
              </div>

              {/* In-Phone Action Sheet Modal (Overlay) */}
              {isPhoneMenuOpen && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex flex-col justify-end animate-fadeIn">
                  <div className="bg-[#FFFFFF] dark:bg-[#1A211D] rounded-t-3xl border-t border-[#E5E1D8] dark:border-[#2D3530] p-4 space-y-3 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#2D3530] pb-2.5">
                      <div className="flex items-center gap-2">
                        <Flame className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                        <span className="font-serif font-bold text-xs text-[#242926] dark:text-[#EDEFEA]">
                          修心道场 · 快捷捷径 (连续 {currentStreak} 天)
                        </span>
                      </div>
                      <button
                        onClick={() => setIsPhoneMenuOpen(false)}
                        className="p-1 rounded-full text-[#6C736E] hover:bg-[#FAF8F5] dark:hover:bg-[#232925]"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-serif">
                      <button
                        onClick={() => handleTabClick('confession')}
                        className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121614] border border-[#E5E1D8] dark:border-[#2D3530] flex items-center gap-2 hover:border-[#D4AF37]/50 text-left"
                      >
                        <Heart className="w-4 h-4 text-[#A84848]" />
                        <div>
                          <div className="font-bold text-[#242926] dark:text-[#EDEFEA]">清净告解室</div>
                          <div className="text-[10px] text-[#6C736E]">零知识释怀</div>
                        </div>
                      </button>

                      <button
                        onClick={() => handleTabClick('onboarding')}
                        className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121614] border border-[#E5E1D8] dark:border-[#2D3530] flex items-center gap-2 hover:border-[#D4AF37]/50 text-left"
                      >
                        <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                        <div>
                          <div className="font-bold text-[#242926] dark:text-[#EDEFEA]">新手入道诊断</div>
                          <div className="text-[10px] text-[#6C736E]">重温初心流程</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          setIsPhoneMenuOpen(false);
                          setIsComplianceModalOpen(true);
                        }}
                        className="p-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#121614] border border-[#E5E1D8] dark:border-[#2D3530] flex items-center gap-2 hover:border-[#D4AF37]/50 text-left col-span-2 cursor-pointer"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#4A5D4E] dark:text-[#7B9280] shrink-0" />
                        <div>
                          <div className="font-bold text-[#242926] dark:text-[#EDEFEA]">
                            查阅合规路径与法务清单
                          </div>
                          <div className="text-[10px] text-[#6C736E] dark:text-[#9BA39D]">
                            《自律宪章》· 敏感个人信息单独同意 · 算法备案
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* In-Phone Compliance & Legal Charter Bottom Sheet / Modal */}
              {isComplianceModalOpen && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-xs z-50 flex flex-col justify-end animate-fadeIn">
                  <div className="bg-[#FFFFFF] dark:bg-[#1A211D] rounded-t-3xl border-t border-[#E5E1D8] dark:border-[#2D3530] max-h-[85%] flex flex-col shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="p-3.5 border-b border-[#E5E1D8] dark:border-[#2D3530] flex items-center justify-between bg-[#FAF8F5] dark:bg-[#151917] shrink-0">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#4A5D4E] dark:text-[#7B9280]" />
                        <span className="font-serif font-bold text-xs text-[#242926] dark:text-[#EDEFEA]">
                          灵境智修 · 合规路径与法务清单
                        </span>
                      </div>
                      <button
                        onClick={() => setIsComplianceModalOpen(false)}
                        className="p-1 rounded-full text-[#6C736E] hover:bg-[#EAE6DF] dark:hover:bg-[#232925] cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-3.5 overflow-y-auto text-xs text-[#4E5650] dark:text-[#C5CCC7] leading-relaxed">
                      {/* Section 1 */}
                      <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#151917] border border-[#E5E1D8] dark:border-[#2D3530] space-y-1.5">
                        <div className="font-serif font-bold text-[#242926] dark:text-[#EDEFEA] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4A5D4E]" />
                          1. 《AI 伦理与去神化自律宪章》
                        </div>
                        <p className="text-[11px] text-[#6C736E] dark:text-[#9BA39D]">
                          本系统严格坚守“AI 仅作心性哲理镜鉴，非神明亦非心理治疗”原则。严格禁止因果报应操控、禁止诱导恐吓、禁止提供医疗级诊疗断言。
                        </p>
                      </div>

                      {/* Section 2 */}
                      <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#151917] border border-[#E5E1D8] dark:border-[#2D3530] space-y-1.5">
                        <div className="font-serif font-bold text-[#242926] dark:text-[#EDEFEA] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4A5D4E]" />
                          2. 敏感个人信息单独知情同意（PIPL 第29条）
                        </div>
                        <p className="text-[11px] text-[#6C736E] dark:text-[#9BA39D]">
                          传统信仰与心性偏好属于敏感个人信息。系统实行明示单独同意机制，支持随时撤回授权，告解内容实行端侧阅后即焚、零数据留存。
                        </p>
                      </div>

                      {/* Section 3 */}
                      <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#151917] border border-[#E5E1D8] dark:border-[#2D3530] space-y-1.5">
                        <div className="font-serif font-bold text-[#242926] dark:text-[#EDEFEA] flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#4A5D4E]" />
                          3. 深度合成算法备案与正统溯源
                        </div>
                        <p className="text-[11px] text-[#6C736E] dark:text-[#9BA39D]">
                          所有 AI 阐释均附带“AI生成内容”显著标识，并经由各传统正统经藏知识图谱校勘溯源，杜绝伪经传播与算法幻觉。
                        </p>
                      </div>

                      {/* External Hub Jump Optional */}
                      <div className="pt-2 border-t border-[#E5E1D8] dark:border-[#2D3530] flex items-center justify-between text-[11px]">
                        <span className="text-[#8E9790]">需要查看学术研报？</span>
                        <button
                          onClick={() => {
                            setIsComplianceModalOpen(false);
                            onSwitchToResearchHub();
                          }}
                          className="text-[#4A5D4E] dark:text-[#D4AF37] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>打开桌面版研报中枢</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="p-3 border-t border-[#E5E1D8] dark:border-[#2D3530] bg-[#FAF8F5] dark:bg-[#151917] shrink-0">
                      <button
                        onClick={() => setIsComplianceModalOpen(false)}
                        className="w-full py-2 rounded-xl bg-[#4A5D4E] hover:bg-[#354338] text-white font-serif font-bold text-xs transition-colors cursor-pointer"
                      >
                        我已知晓并遵守
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Native Mobile Bottom Tab Bar */}
              <div className="border-t border-[#E5E1D8] dark:border-[#2D3530] bg-[#FDFCF8]/95 dark:bg-[#111412]/95 backdrop-blur-md px-2 pt-2 pb-1 shrink-0 z-20">
                <div className="grid grid-cols-5 gap-1">
                  {[
                    { id: 'sanctuary', label: '觉照', icon: Compass },
                    { id: 'meditation', label: '冥想', icon: Wind },
                    { id: 'chat', label: '问心', icon: MessageCircle },
                    { id: 'ritual', label: '仪轨', icon: Music },
                    { id: 'scripture', label: '经藏', icon: BookOpen },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => handleTabClick(tab.id as AppTabType)}
                        className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                          isActive
                            ? 'text-[#4A5D4E] dark:text-[#D4AF37]'
                            : 'text-[#8E9790] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
                        }`}
                      >
                        <div
                          className={`p-1 rounded-lg transition-transform ${
                            isActive
                              ? 'bg-[#EEF3EF] dark:bg-[#1A241C] scale-110'
                              : 'hover:bg-black/5'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-[10px] font-serif mt-0.5 ${
                            isActive ? 'font-bold' : 'font-medium'
                          }`}
                        >
                          {tab.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Home Indicator Bar */}
                <div className="w-28 h-1 bg-[#242926]/20 dark:bg-white/20 rounded-full mx-auto mt-2 mb-0.5" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* RESPONSIVE FULLSCREEN SPREAD MODE */
        <div className="w-full max-w-5xl mx-auto space-y-6">
          {/* Sub Navigation Bar for Responsive Mode */}
          <div className="bg-[#FFFFFF] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] rounded-2xl p-2 shadow-xs flex items-center justify-between overflow-x-auto gap-2">
            {[
              { id: 'sanctuary', label: '觉照大厅', icon: Compass },
              { id: 'meditation', label: '深度冥想', icon: Wind },
              { id: 'chat', label: '智者问心', icon: MessageCircle },
              { id: 'ritual', label: '身心仪轨殿', icon: Music },
              { id: 'scripture', label: '经藏探骊', icon: BookOpen },
              { id: 'confession', label: '清净告解室', icon: Heart },
              { id: 'onboarding', label: '新手引导流', icon: Sparkles },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id as AppTabType)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-[#4A5D4E] text-white shadow-xs'
                      : 'text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA] hover:bg-[#FAF8F5] dark:hover:bg-[#121614]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Expanded Page View */}
          <div className="animate-fadeIn">
            {activeTab === 'sanctuary' && (
              <SanctuaryView
                tradition={tradition}
                soundEnabled={soundEnabled}
                onNavigateToTab={(tab) => handleTabClick(tab)}
              />
            )}
            {activeTab === 'meditation' && (
              <MeditationDetailView tradition={tradition} soundEnabled={soundEnabled} />
            )}
            {activeTab === 'chat' && (
              <AiWisdomChat currentTradition={tradition} soundEnabled={soundEnabled} />
            )}
            {activeTab === 'ritual' && <RitualSanctuary soundEnabled={soundEnabled} />}
            {activeTab === 'scripture' && (
              <ScriptureLibrary currentTradition={tradition} soundEnabled={soundEnabled} />
            )}
            {activeTab === 'confession' && <ConfessionRoom soundEnabled={soundEnabled} />}
            {activeTab === 'onboarding' && (
              <OnboardingFlow
                currentTradition={tradition}
                onSelectTradition={onSelectTradition}
                onFinishOnboarding={() => handleTabClick('sanctuary')}
                soundEnabled={soundEnabled}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
