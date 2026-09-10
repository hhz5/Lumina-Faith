import React, { useState, useEffect } from 'react';
import { TraditionType, DailyScripture } from '../../types';
import { TRADITIONS } from '../../data/researchData';
import { audioService } from '../../utils/audioSynthesizer';
import { Sparkles, Compass, MessageCircle, Music, BookOpen, Heart, RefreshCw, Check, Wind } from 'lucide-react';

interface SanctuaryViewProps {
  tradition: TraditionType;
  soundEnabled: boolean;
  onNavigateToTab: (tab: 'chat' | 'ritual' | 'scripture' | 'confession' | 'meditation' | 'onboarding') => void;
}

const DEFAULT_SCRIPTURES: Record<TraditionType, DailyScripture> = {
  buddhism: {
    tradition: 'buddhism',
    quote: '应无所住，而生其心。',
    source: '《金刚般若波罗蜜经》',
    insight: '不在任何执念、成见、得失上停留安营扎寨，方能生出澄澈、自由、敏锐的无量本心。',
    action: '今日每逢情绪波澜起伏时，暂停动作三次深呼吸，观察其来去而不随之起舞。',
    date: new Date().toLocaleDateString('zh-CN'),
  },
  taoism: {
    tradition: 'taoism',
    quote: '致虚极，守静笃。万物并作，吾以观复。',
    source: '《道德经·第十六章》',
    insight: '心境空明到极点，凝守宁静至纯一。万物蓬勃生长，我在虚静中体察它们的循环归根。',
    action: '今日下午离开屏幕，在窗前或自然中静立两分钟，仅体会呼吸与微风。',
    date: new Date().toLocaleDateString('zh-CN'),
  },
  christianity: {
    tradition: 'christianity',
    quote: '你们要休息，要知道我是神。',
    source: '《圣经·诗篇 46:10》',
    insight: '在繁忙喧嚣中学会放手（Be still）。很多时候竭力奔跑并非信心，静默等候神信实的带领才是最深的力量。',
    action: '清晨出门前，闭目献上30秒纯然感谢的祷告，将一天的日程交付。',
    date: new Date().toLocaleDateString('zh-CN'),
  },
  stoicism: {
    tradition: 'stoicism',
    quote: '你拥有掌管自己心灵的力量，而非外界事件。意识到这一点，你就会找到力量。',
    source: '马可·奥勒留《沉思录》',
    insight: '环境无法夺走你的内心宁静，除非你主动让出判断权。坚守内心的要塞。',
    action: '今日遇到不顺心或被冒犯时，在开口反驳前默数三秒，分清此乃外界之境，非我之过。',
    date: new Date().toLocaleDateString('zh-CN'),
  },
  universal: {
    tradition: 'universal',
    quote: '风暴在外咆哮，唯有风暴中心是澄澈无澜的台风眼。',
    source: '当代身心觉照心法',
    insight: '接纳你当下的所有迷茫与脆弱。每个灵魂在成长蜕变前，都会经历一段幽暗的甬道。给身心一盏茶的温存与宽容。',
    action: '右手轻抚心口感受温热跳动，深吸慢呼三息，确认自己此刻正安稳地存在于当下。',
    date: new Date().toLocaleDateString('zh-CN'),
  },
};

export const SanctuaryView: React.FC<SanctuaryViewProps> = ({
  tradition,
  soundEnabled,
  onNavigateToTab,
}) => {
  const [mood, setMood] = useState<'calm' | 'anxious' | 'seeking' | 'grateful'>('calm');
  const [scripture, setScripture] = useState<DailyScripture>(() => DEFAULT_SCRIPTURES[tradition] || DEFAULT_SCRIPTURES.buddhism);
  const [loadingScripture, setLoadingScripture] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [scriptureTab, setScriptureTab] = useState<'insight' | 'action' | 'all'>('all');

  const traditionInfo = TRADITIONS.find((t) => t.id === tradition) || TRADITIONS[0];

  const fetchDailyScripture = async () => {
    setLoadingScripture(true);
    try {
      const res = await fetch('/api/spiritual/daily-reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tradition }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.data && data.data.quote) {
          setScripture({
            tradition,
            quote: data.data.quote,
            source: data.data.source || '正统经典',
            insight: data.data.insight || '',
            action: data.data.action || '',
            date: new Date().toLocaleDateString('zh-CN'),
          });
          return;
        }
      }
    } catch (_) {
      // Gracefully silent fallback
    } finally {
      setLoadingScripture(false);
    }

    // If fetch failed or network is unreachable, ensure scripture is set to corresponding tradition preset
    setScripture(DEFAULT_SCRIPTURES[tradition] || DEFAULT_SCRIPTURES.buddhism);
  };

  useEffect(() => {
    fetchDailyScripture();
  }, [tradition]);

  const handleMoodSelect = (newMood: 'calm' | 'anxious' | 'seeking' | 'grateful') => {
    setMood(newMood);
    if (soundEnabled) {
      audioService.playTempleBell();
    }
  };

  const copyScripture = () => {
    if (!scripture) return;
    const text = `【${scripture.source}】\n“${scripture.quote}”\n\n心性启悟：${scripture.insight}\n今日践行：${scripture.action}\n—— 灵境智修 · 每日灵粮`;
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
      {/* Central Sanctuary Aura & Mood Anchor */}
      <div className="relative rounded-2xl p-5 sm:p-7 overflow-hidden bg-gradient-to-b from-[#1C241E] via-[#161C18] to-[#111613] border border-[#2D3530] text-[#EDEFEA] shadow-xs text-center">
        {/* Breathing Aura Light Simulation */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 ${
            mood === 'calm'
              ? 'opacity-30'
              : mood === 'anxious'
              ? 'opacity-40'
              : mood === 'seeking'
              ? 'opacity-35'
              : 'opacity-45'
          }`}
        >
          <div
            className={`w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl animate-pulse duration-7000 ${
              mood === 'calm'
                ? 'bg-[#4A5D4E]/40'
                : mood === 'anxious'
                ? 'bg-rose-500/25'
                : mood === 'seeking'
                ? 'bg-[#D4AF37]/30'
                : 'bg-emerald-500/25'
            }`}
          />
        </div>

        <div className="relative z-10 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A221C]/90 border border-[#2D3A30] text-[11px] font-serif text-[#D4AF37]">
            <span>{traditionInfo.symbol}</span>
            <span>修习场域：{traditionInfo.name}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#EDEFEA] tracking-wider leading-snug">
            静默虚极 · 照见自性
          </h2>

          <p className="text-xs text-[#9BA39D] max-w-md mx-auto leading-relaxed line-clamp-2 sm:line-clamp-none">
            “{traditionInfo.corePhilosophy}”
          </p>

          {/* Quick Mood Pulse Check */}
          <div className="pt-1">
            <div className="text-[10px] text-[#9BA39D] mb-1.5 uppercase tracking-wider font-serif">
              此刻当下的心境调谐
            </div>
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 p-1 rounded-xl bg-[#141A16]/90 border border-[#263129] max-w-sm mx-auto">
              {[
                { id: 'calm', label: '澄澈宁静' },
                { id: 'anxious', label: '略有烦忧' },
                { id: 'seeking', label: '渴望顿悟' },
                { id: 'grateful', label: '心怀感恩' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => handleMoodSelect(m.id as any)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-medium transition-all text-center ${
                    mood === m.id
                      ? 'bg-[#4A5D4E] text-white font-bold border border-[#D4AF37]/40 shadow-xs'
                      : 'text-[#9BA39D] hover:text-[#EDEFEA] hover:bg-[#1E2620]'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Daily Scripture Card */}
      {scripture && (
        <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-4 sm:p-6 shadow-xs transition-colors relative space-y-4">
          {/* Header Row */}
          <div className="flex items-center justify-between pb-3 border-b border-[#EFECE6] dark:border-[#262D28] gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Sparkles className="w-3.5 h-3.5 text-[#4A5D4E] dark:text-[#D4AF37] shrink-0" />
              <span className="text-xs font-serif font-bold text-[#242926] dark:text-[#EDEFEA] truncate">
                今日灵粮 · 经藏法雨
              </span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={copyScripture}
                className="text-[11px] px-2 py-1 rounded-lg border border-[#E5E1D8] dark:border-[#2D3530] bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA] transition-colors flex items-center gap-1 cursor-pointer"
              >
                {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : null}
                <span>{isCopied ? '已复制' : '复制'}</span>
              </button>
              <button
                onClick={fetchDailyScripture}
                disabled={loadingScripture}
                className="text-[11px] px-2 py-1 rounded-lg border border-[#E5E1D8] dark:border-[#2D3530] bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA] transition-colors flex items-center gap-1 cursor-pointer"
                title="换一则"
              >
                <RefreshCw className={`w-3 h-3 ${loadingScripture ? 'animate-spin' : ''}`} />
                <span>换一则</span>
              </button>
            </div>
          </div>

          {/* Hero Scripture Quote */}
          <div className="space-y-2 text-center sm:text-left pt-1">
            <div className="font-serif text-lg sm:text-xl text-[#242926] dark:text-[#EDEFEA] font-bold leading-relaxed tracking-wide">
              “{scripture.quote}”
            </div>
            <div className="text-xs font-serif text-[#4A5D4E] dark:text-[#D4AF37] font-medium">
              —— {scripture.source}
            </div>
          </div>

          {/* Segmented Tab Pill for Mobile Reading Comfort */}
          <div className="flex items-center justify-center sm:justify-start gap-1 p-1 rounded-xl bg-[#FAF8F5] dark:bg-[#161B18] border border-[#E5E1D8] dark:border-[#2D3530] w-full sm:w-auto">
            <button
              onClick={() => setScriptureTab('insight')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-serif transition-all text-center cursor-pointer ${
                scriptureTab === 'insight'
                  ? 'bg-[#4A5D4E] text-white font-bold shadow-xs'
                  : 'text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
              }`}
            >
              悟 · 心性觉察
            </button>
            <button
              onClick={() => setScriptureTab('action')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-serif transition-all text-center cursor-pointer ${
                scriptureTab === 'action'
                  ? 'bg-[#4A5D4E] text-white font-bold shadow-xs'
                  : 'text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
              }`}
            >
              行 · 今日践行
            </button>
            <button
              onClick={() => setScriptureTab('all')}
              className={`flex-1 sm:flex-none px-2.5 py-1.5 rounded-lg text-xs font-serif transition-all text-center cursor-pointer ${
                scriptureTab === 'all'
                  ? 'bg-[#4A5D4E] text-white font-bold shadow-xs'
                  : 'text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
              }`}
            >
              并览
            </button>
          </div>

          {/* Reading Content Area: Full Width, Calm Typography, No Cramped Columns */}
          <div className="space-y-3 pt-1">
            {(scriptureTab === 'insight' || scriptureTab === 'all') && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#262D28] space-y-2 transition-all">
                <div className="flex items-center gap-2 pb-1.5 border-b border-[#E5E1D8]/60 dark:border-[#2D3530]/60">
                  <span className="px-2 py-0.5 rounded text-[10px] font-serif font-bold bg-[#4A5D4E]/10 dark:bg-[#4A5D4E]/30 text-[#354338] dark:text-[#D4AF37] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 心性觉察解析
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#4E5650] dark:text-[#BAC2BC] leading-[1.8] tracking-wide text-justify font-serif">
                  {scripture.insight}
                </p>
              </div>
            )}

            {(scriptureTab === 'action' || scriptureTab === 'all') && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#262D28] space-y-2 transition-all">
                <div className="flex items-center gap-2 pb-1.5 border-b border-[#E5E1D8]/60 dark:border-[#2D3530]/60">
                  <span className="px-2 py-0.5 rounded text-[10px] font-serif font-bold bg-[#4A5D4E]/10 dark:bg-[#4A5D4E]/30 text-[#354338] dark:text-[#D4AF37] flex items-center gap-1">
                    <Check className="w-3 h-3" /> 今日微行动指南
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-[#4E5650] dark:text-[#BAC2BC] leading-[1.8] tracking-wide text-justify font-serif">
                  {scripture.action}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Entry Meditation Banner */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#242E27] via-[#1D2520] to-[#171D19] border border-[#D4AF37]/30 text-white shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#4A5D4E]/60 border border-[#D4AF37]/40 flex items-center justify-center shrink-0">
            <Wind className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="font-serif font-bold text-xs sm:text-sm text-white truncate">4-4-4-4 正念盒式呼吸</h4>
              <span className="px-1.5 py-0.5 rounded text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] font-bold shrink-0">
                深修
              </span>
            </div>
            <p className="text-[10px] text-[#B2B9B4] truncate">
              吸气·屏息·呼气·空息 · 432Hz 颂钵声学共振
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onNavigateToTab('meditation')}
            className="px-3 py-1.5 rounded-xl bg-[#4A5D4E] hover:bg-[#3C4C3F] border border-[#D4AF37]/50 text-white text-xs font-serif font-bold transition-colors shadow-xs"
          >
            开启
          </button>
        </div>
      </div>

      {/* 4 Quick Access Doors */}
      <div>
        <div className="text-[11px] font-serif font-bold text-[#6C736E] dark:text-[#9BA39D] mb-2 px-1">
          修心四大殿堂
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
          <button
            onClick={() => onNavigateToTab('ritual')}
            className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] hover:border-[#4A5D4E] dark:hover:border-[#7B9280] shadow-xs transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Music className="w-4 h-4" />
            </div>
            <div className="font-serif font-bold text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] mb-0.5">
              身心仪轨殿
            </div>
            <div className="text-[10px] text-[#6C736E] dark:text-[#9BA39D] line-clamp-1">
              木鱼 · 432Hz颂钵 · 念珠
            </div>
          </button>

          <button
            onClick={() => onNavigateToTab('chat')}
            className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] hover:border-[#4A5D4E] dark:hover:border-[#7B9280] shadow-xs transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div className="font-serif font-bold text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] mb-0.5">
              智者问心
            </div>
            <div className="text-[10px] text-[#6C736E] dark:text-[#9BA39D] line-clamp-1">
              解构内耗 · 破除执念
            </div>
          </button>

          <button
            onClick={() => onNavigateToTab('scripture')}
            className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] hover:border-[#4A5D4E] dark:hover:border-[#7B9280] shadow-xs transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#F9F5EA] dark:bg-[#2A2616] text-[#8C701E] dark:text-[#E5C358] border border-[#EFE4C6] dark:border-[#3F371B] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="font-serif font-bold text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] mb-0.5">
              经藏探骊
            </div>
            <div className="text-[10px] text-[#6C736E] dark:text-[#9BA39D] line-clamp-1">
              心经 · 道德经 · 沉思录
            </div>
          </button>

          <button
            onClick={() => onNavigateToTab('confession')}
            className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] hover:border-[#4A5D4E] dark:hover:border-[#7B9280] shadow-xs transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] text-[#4A5D4E] dark:text-[#7B9280] border border-[#E5E1D8] dark:border-[#2D3530] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <Heart className="w-4 h-4" />
            </div>
            <div className="font-serif font-bold text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] mb-0.5">
              清净告解室
            </div>
            <div className="text-[10px] text-[#6C736E] dark:text-[#9BA39D] line-clamp-1">
              心事倾诉 · 化念为风
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
