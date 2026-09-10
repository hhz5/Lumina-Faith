import React, { useState, useEffect } from 'react';
import { TraditionType } from './types';
import { AppHeader } from './components/InteractiveApp/AppHeader';

// Research Hub Components
import { MacroAnalysis } from './components/ResearchHub/MacroAnalysis';
import { MarketAppsMatrix } from './components/ResearchHub/MarketAppsMatrix';
import { PreparationChecklist } from './components/ResearchHub/PreparationChecklist';
import { UserPainPoints } from './components/ResearchHub/UserPainPoints';
import { CompetitorReport } from './components/ResearchHub/CompetitorReport';
import { FullPrdDocument } from './components/ResearchHub/FullPrdDocument';
import { UiDesignSpecs } from './components/ResearchHub/UiDesignSpecs';
import { LegalComplianceAudit } from './components/ResearchHub/LegalComplianceAudit';
import { PrototypeAuditLog } from './components/ResearchHub/PrototypeAuditLog';

// Live Prototype Components
import { MobileAppShell, AppTabType } from './components/InteractiveApp/MobileAppShell';
import { SanctuaryView } from './components/InteractiveApp/SanctuaryView';
import { MeditationDetailView } from './components/InteractiveApp/MeditationDetailView';
import { AiWisdomChat } from './components/InteractiveApp/AiWisdomChat';
import { RitualSanctuary } from './components/InteractiveApp/RitualSanctuary';
import { ScriptureLibrary } from './components/InteractiveApp/ScriptureLibrary';
import { ConfessionRoom } from './components/InteractiveApp/ConfessionRoom';
import { OnboardingFlow } from './components/InteractiveApp/OnboardingFlow';

// Icons
import {
  Compass,
  BarChart3,
  ListOrdered,
  Users,
  Award,
  FileText,
  Smartphone,
  Music,
  MessageCircle,
  BookOpen,
  Heart,
  Scale,
  CheckCircle2,
  Wind,
  Sparkles,
} from 'lucide-react';

export default function App() {
  // Main view: 'research' (研报与PRD文档中心) vs 'app' (产品交互原型)
  const [mainMode, setMainMode] = useState<'app' | 'research'>('app');

  // Active sub-tab in Research Hub
  const [researchTab, setResearchTab] = useState<
    'macro' | 'matrix' | 'prep' | 'personas' | 'competitor' | 'prd' | 'ui' | 'legal' | 'audit'
  >('prd');

  // Active sub-tab in Live Prototype App
  const [appTab, setAppTab] = useState<
    'sanctuary' | 'meditation' | 'chat' | 'ritual' | 'scripture' | 'confession' | 'onboarding'
  >('sanctuary');

  // Global tradition setting
  const [tradition, setTradition] = useState<TraditionType>('buddhism');

  // Sound and theme
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(7);

  // Sync dark class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-[#111412] text-[#EDEFEA]' : 'bg-[#FDFCF8] text-[#242926]'} transition-colors duration-200 flex flex-col font-sans`}>
      {/* Top Application Header */}
      <AppHeader
        currentTradition={tradition}
        onSelectTradition={setTradition}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((v) => !v)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((v) => !v)}
        activeView={mainMode}
        onChangeView={setMainMode}
        currentStreak={currentStreak}
        onOpenOnboarding={() => {
          setMainMode('app');
          setAppTab('onboarding');
        }}
      />

      {/* Main Mode 1: Research Hub & PRD Document Center */}
      {mainMode === 'research' && (
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
          {/* Research Sub-Navigation */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E1D8] dark:border-[#2D3530]">
            {[
              { id: 'prd', label: 'PRD需求文档 (完整)', icon: FileText },
              { id: 'legal', label: '合规路径与法务清单', icon: Scale },
              { id: 'audit', label: '原型走查验收记录', icon: CheckCircle2 },
              { id: 'ui', label: 'UI设计与Logo蓝图', icon: Smartphone },
              { id: 'prep', label: '六大前置准备清单', icon: ListOrdered },
              { id: 'matrix', label: '市面竞品优缺点分析', icon: BarChart3 },
              { id: 'competitor', label: '针对性竞品对比报告', icon: Award },
              { id: 'personas', label: '核心用户痛点溯源', icon: Users },
              { id: 'macro', label: '信仰项目宏观洞察', icon: Compass },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = researchTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setResearchTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-[#4A5D4E] text-white border-[#4A5D4E] shadow-xs'
                      : 'bg-[#FFFFFF] dark:bg-[#1D221F] text-[#6C736E] dark:text-[#9BA39D] border-[#E5E1D8] dark:border-[#2D3530] hover:bg-[#FAF8F5] dark:hover:bg-[#232925]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Research Active Content */}
          <div className="animate-fadeIn">
            {researchTab === 'prd' && <FullPrdDocument />}
            {researchTab === 'legal' && <LegalComplianceAudit />}
            {researchTab === 'audit' && (
              <PrototypeAuditLog
                onNavigateToTab={(tab) => {
                  setMainMode('app');
                  setAppTab(tab);
                }}
                onSwitchToLiveApp={() => setMainMode('app')}
              />
            )}
            {researchTab === 'ui' && <UiDesignSpecs onSwitchToLiveApp={() => setMainMode('app')} />}
            {researchTab === 'prep' && <PreparationChecklist />}
            {researchTab === 'matrix' && <MarketAppsMatrix />}
            {researchTab === 'competitor' && <CompetitorReport />}
            {researchTab === 'personas' && <UserPainPoints />}
            {researchTab === 'macro' && <MacroAnalysis />}
          </div>
        </main>
      )}

      {/* Main Mode 2: Live Prototype Mobile App */}
      {mainMode === 'app' && (
        <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 py-4 sm:py-6 animate-fadeIn">
          <MobileAppShell
            tradition={tradition}
            onSelectTradition={setTradition}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled((v) => !v)}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode((v) => !v)}
            currentStreak={currentStreak}
            activeTab={appTab as AppTabType}
            onNavigateTab={(tab) => setAppTab(tab)}
            onSwitchToResearchHub={() => setMainMode('research')}
          />
        </main>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E5E1D8] dark:border-[#2D3530] bg-[#FAF8F5]/80 dark:bg-[#151917]/80 py-6 px-4 text-center text-xs text-[#6C736E] dark:text-[#9BA39D]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="font-serif">
            灵境智修 · Lumina Faith & AI 创新平台 —— 智慧信仰与心性觉察的现代化落地践行
          </div>
          <div className="text-[11px] text-[#8C701E] dark:text-[#D4AF37]">
            遵守《信仰与人工智能去神化自律宪章》· 守护生命与神圣隐私
          </div>
        </div>
      </footer>
    </div>
  );
}
