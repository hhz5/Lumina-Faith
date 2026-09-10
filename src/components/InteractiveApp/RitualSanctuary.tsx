import React, { useState, useEffect } from 'react';
import { audioService } from '../../utils/audioSynthesizer';
import { Sparkles, Music, Volume2, RotateCcw, Wind, CircleDot } from 'lucide-react';

interface RitualSanctuaryProps {
  soundEnabled: boolean;
}

interface FloatingText {
  id: number;
  text: string;
  x: number;
  y: number;
}

export const RitualSanctuary: React.FC<RitualSanctuaryProps> = ({ soundEnabled }) => {
  const [activeRitual, setActiveRitual] = useState<'wooden-fish' | 'singing-bowl' | 'beads' | 'breath'>('wooden-fish');

  // Wooden fish state
  const [fishKnockCount, setFishKnockCount] = useState(0);
  const [isKnocked, setIsKnocked] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [customWish, setCustomWish] = useState('自性清净 +1');

  // Singing bowl state
  const [isBowlRinging, setIsBowlRinging] = useState(false);
  const [bowlStrokes, setBowlStrokes] = useState(0);

  // Beads state
  const [beadCount, setBeadCount] = useState(0);

  // Breath state
  const [breathPhase, setBreathPhase] = useState<'吸气 (4秒)' | '屏息 (7秒)' | '呼气 (8秒)'>('吸气 (4秒)');
  const [breathTimer, setBreathTimer] = useState(4);

  // Floating text cleanup
  useEffect(() => {
    if (floatingTexts.length === 0) return;
    const timer = setTimeout(() => {
      setFloatingTexts((prev) => prev.slice(1));
    }, 1200);
    return () => clearTimeout(timer);
  }, [floatingTexts]);

  // Breathwork loop
  useEffect(() => {
    if (activeRitual !== 'breath') return;

    const interval = setInterval(() => {
      setBreathTimer((prev) => {
        if (prev <= 1) {
          if (breathPhase.startsWith('吸气')) {
            setBreathPhase('屏息 (7秒)');
            return 7;
          } else if (breathPhase.startsWith('屏息')) {
            setBreathPhase('呼气 (8秒)');
            return 8;
          } else {
            setBreathPhase('吸气 (4秒)');
            if (soundEnabled) audioService.playTempleBell();
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeRitual, breathPhase, soundEnabled]);

  // Knock wooden fish
  const handleKnockFish = (e: React.MouseEvent) => {
    if (soundEnabled) {
      audioService.playWoodenFish();
    }
    setFishKnockCount((c) => c + 1);
    setIsKnocked(true);
    setTimeout(() => setIsKnocked(false), 120);

    // Add floating text
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + (Math.random() * 40 - 20);
    const y = e.clientY - rect.top;

    setFloatingTexts((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: customWish,
        x,
        y,
      },
    ]);
  };

  // Strike singing bowl
  const handleStrikeBowl = () => {
    if (soundEnabled) {
      audioService.playSingingBowl();
    }
    setBowlStrokes((s) => s + 1);
    setIsBowlRinging(true);
    setTimeout(() => setIsBowlRinging(false), 4500);
  };

  // Turn prayer bead
  const handleTurnBead = () => {
    if (soundEnabled) {
      audioService.playBeadClick();
    }
    setBeadCount((c) => {
      const next = c + 1;
      if (next % 108 === 0 && soundEnabled) {
        audioService.playTempleBell();
      }
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Ritual Navigation Tabs */}
      <div className="flex items-center justify-center p-1 rounded-xl bg-[#F4F1EA] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] max-w-lg mx-auto">
        {[
          { id: 'wooden-fish', label: '沉木木鱼' },
          { id: 'singing-bowl', label: '432Hz 颂钵' },
          { id: 'beads', label: '菩提念珠' },
          { id: 'breath', label: '调息呼吸' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveRitual(tab.id as any)}
            className={`flex-1 py-1.5 text-xs font-serif font-bold rounded-lg transition-all ${
              activeRitual === tab.id
                ? 'bg-[#4A5D4E] text-white shadow-xs'
                : 'text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. Wooden Fish Arena */}
      {activeRitual === 'wooden-fish' && (
        <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-5 sm:p-8 shadow-xs text-center relative overflow-hidden">
          <div className="text-[11px] font-serif text-[#4A5D4E] dark:text-[#D4AF37] font-bold uppercase tracking-wider mb-1">
            叩响自性沉木 · 息灭妄念执著
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA] mb-4">
            已叩响 {fishKnockCount} 次
          </div>

          {/* Interactive Wooden Fish SVG & Floating text container */}
          <div className="relative inline-block my-2">
            <button
              onClick={handleKnockFish}
              className={`relative cursor-pointer transition-transform duration-100 select-none focus:outline-none ${
                isKnocked ? 'scale-90' : 'scale-100 hover:scale-105 active:scale-95'
              }`}
              title="点击敲击木鱼"
            >
              {/* Stylized Wooden Fish Graphic */}
              <div className="w-40 h-40 sm:w-52 sm:h-52 rounded-full bg-gradient-to-br from-[#3D2C20] via-[#2D1F17] to-[#17120F] p-5 flex flex-col items-center justify-center shadow-xl border-4 border-[#8C6B4E]/60 relative">
                <div className="w-28 sm:w-36 h-16 sm:h-20 rounded-t-full border-t-4 border-[#D4AF37]/50 opacity-80" />
                <div className="w-20 sm:w-24 h-3 sm:h-4 bg-[#110D0A] rounded-full my-2 opacity-90" />
                <div className="text-[#D4AF37]/70 text-[10px] font-serif tracking-widest mt-1">
                  叩 · 照
                </div>
              </div>
            </button>

            {/* Floating text elements */}
            {floatingTexts.map((ft) => (
              <div
                key={ft.id}
                className="absolute pointer-events-none text-xs font-serif font-bold text-[#D4AF37] animate-bounce -translate-y-10 transition-all"
                style={{ left: ft.x, top: ft.y }}
              >
                {ft.text}
              </div>
            ))}
          </div>

          {/* Wish Selector & Counter Reset */}
          <div className="mt-5 pt-4 border-t border-[#E5E1D8] dark:border-[#2D3530] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
                回向善念发愿
              </span>
              <button
                onClick={() => setFishKnockCount(0)}
                className="text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA] flex items-center gap-1 text-[11px] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>清零计数</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
              {[
                { name: '自性清净', count: '+1' },
                { name: '烦恼消散', count: '+1' },
                { name: '开悟增慧', count: '+1' },
                { name: '福泽绵长', count: '+1' },
              ].map((item) => {
                const wishKey = `${item.name} ${item.count}`;
                return (
                  <button
                    key={item.name}
                    onClick={() => {
                      setCustomWish(wishKey);
                      audioService.playWoodenFish();
                    }}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-serif transition-all cursor-pointer flex items-center justify-between ${
                      customWish === wishKey
                        ? 'bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border-[#4A5D4E] dark:border-[#D4AF37] font-bold shadow-xs ring-1 ring-[#4A5D4E]'
                        : 'bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D] border-[#E5E1D8] dark:border-[#2D3530] hover:border-[#9BA39D]'
                    }`}
                  >
                    <span className="whitespace-nowrap font-serif">{item.name}</span>
                    <span className="font-mono text-[11px] opacity-75 shrink-0 ml-1">{item.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. Singing Bowl Arena */}
      {activeRitual === 'singing-bowl' && (
        <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-5 sm:p-8 shadow-xs text-center relative overflow-hidden">
          <div className="text-[11px] font-serif text-[#4A5D4E] dark:text-[#D4AF37] font-bold uppercase tracking-wider mb-1">
            432Hz 喜马拉雅青铜颂钵 · 谐波深层共振
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA] mb-4">
            已击钵静修 {bowlStrokes} 次
          </div>

          <div className="relative inline-flex items-center justify-center my-4">
            {/* Pulsing Ripple Rings */}
            {isBowlRinging && (
              <>
                <div className="absolute w-52 h-52 sm:w-64 sm:h-64 rounded-full border border-[#D4AF37]/40 animate-ping duration-3000 pointer-events-none" />
                <div className="absolute w-60 h-60 sm:w-72 sm:h-72 rounded-full border border-[#4A5D4E]/30 animate-pulse duration-2000 pointer-events-none" />
              </>
            )}

            <button
              onClick={handleStrikeBowl}
              className={`w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-[#9B7A28] via-[#B89230] to-[#E5C358] shadow-xl border-4 border-[#D4AF37]/80 flex items-center justify-center text-[#1E190B] font-serif font-bold text-base transition-transform active:scale-95 hover:scale-105 cursor-pointer ${
                isBowlRinging ? 'ring-8 ring-[#D4AF37]/20 shadow-[#D4AF37]/30' : ''
              }`}
            >
              <div className="text-center">
                <div className="text-lg sm:text-xl">432Hz</div>
                <div className="text-[11px] text-[#2A2312] font-medium">轻触鸣钵</div>
              </div>
            </button>
          </div>

          <p className="text-xs text-[#6C736E] dark:text-[#9BA39D] max-w-md mx-auto leading-relaxed mt-2">
            432Hz 被誉为宇宙自然数学谐波频率，能显著激发副交感神经，降低皮质醇，诱导脑电波进入平静的 Alpha 状态。
          </p>
        </div>
      )}

      {/* 3. Prayer Beads Arena */}
      {activeRitual === 'beads' && (
        <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-5 sm:p-8 shadow-xs text-center relative overflow-hidden">
          <div className="text-[11px] font-serif text-[#4A5D4E] dark:text-[#D4AF37] font-bold uppercase tracking-wider mb-1">
            沉香老菩提念珠 · 拨珠止息
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA] mb-1">
            已诵持 {beadCount} 颗
          </div>
          <div className="text-xs text-[#6C736E] dark:text-[#9BA39D] mb-4">
            完成第 {Math.floor(beadCount / 108)} 轮 (108 颗菩提为一圆满周天)
          </div>

          <div className="my-4">
            <button
              onClick={handleTurnBead}
              className="px-6 py-3 rounded-xl bg-[#4A5D4E] hover:bg-[#354338] text-white font-serif font-bold text-sm shadow-xs transition-all active:scale-95 flex items-center gap-2.5 mx-auto cursor-pointer"
            >
              <CircleDot className="w-4 h-4 text-[#D4AF37]" />
              <span>拨动一珠 (轻触计数)</span>
            </button>
          </div>

          {/* Bead Visual Chain Progress */}
          <div className="max-w-md mx-auto bg-[#FAF8F5] dark:bg-[#181C19] rounded-xl p-3 border border-[#E5E1D8] dark:border-[#2D3530]">
            <div className="flex items-center justify-between text-[11px] text-[#6C736E] dark:text-[#9BA39D] mb-1.5">
              <span>当前 108 周天进度</span>
              <span>{beadCount % 108} / 108</span>
            </div>
            <div className="w-full bg-[#E5E1D8] dark:bg-[#2D3530] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#4A5D4E] h-full transition-all duration-300"
                style={{ width: `${((beadCount % 108) / 108) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Breathwork Arena */}
      {activeRitual === 'breath' && (
        <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-5 sm:p-8 shadow-xs text-center relative overflow-hidden">
          <div className="text-[11px] font-serif text-[#4A5D4E] dark:text-[#D4AF37] font-bold uppercase tracking-wider mb-1">
            4-7-8 经典呼吸法 · 自主神经调谐
          </div>
          <div className="text-2xl sm:text-3xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA] mb-2">
            {breathPhase}
          </div>

          {/* Dynamic Breathing Circle */}
          <div className="relative inline-flex items-center justify-center my-4">
            <div
              className={`rounded-full border-4 flex items-center justify-center transition-all duration-1000 ${
                breathPhase.startsWith('吸气')
                  ? 'w-48 h-48 sm:w-56 sm:h-56 bg-[#4A5D4E]/20 border-[#4A5D4E] scale-105 shadow-xl shadow-[#4A5D4E]/20'
                  : breathPhase.startsWith('屏息')
                  ? 'w-48 h-48 sm:w-56 sm:h-56 bg-[#D4AF37]/20 border-[#D4AF37] scale-105'
                  : 'w-36 h-36 sm:w-44 sm:h-44 bg-[#5B7260]/20 border-[#5B7260] scale-95 shadow-inner'
              }`}
            >
              <div className="font-serif text-3xl sm:text-4xl font-bold text-[#242926] dark:text-[#EDEFEA]">
                {breathTimer}
              </div>
            </div>
          </div>

          <p className="text-xs text-[#6C736E] dark:text-[#9BA39D] max-w-sm mx-auto leading-relaxed">
            跟随时钟指示：鼻吸 4 秒，屏住 7 秒，嘴吐 8 秒。循环 3 轮即可迅速重置心率变异性 (HRV)。
          </p>
        </div>
      )}
    </div>
  );
};
