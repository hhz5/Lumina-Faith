import React, { useState, useEffect, useRef } from 'react';
import { TraditionType } from '../../types';
import { TRADITIONS } from '../../data/researchData';
import { audioService } from '../../utils/audioSynthesizer';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Sliders,
  Sparkles,
  Heart,
  CheckCircle2,
  Share2,
  Compass,
  AlertCircle,
  Wind,
  ShieldCheck,
} from 'lucide-react';

interface MeditationDetailViewProps {
  tradition: TraditionType;
  soundEnabled: boolean;
  onFinish?: () => void;
}

type BreathPhase = 'inhale' | 'hold1' | 'exhale' | 'hold2';

export const MeditationDetailView: React.FC<MeditationDetailViewProps> = ({
  tradition,
  soundEnabled,
}) => {
  // Timer settings
  const [totalMinutes, setTotalMinutes] = useState<number>(5);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5 mins in seconds
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Distraction awareness counter
  const [distractionCount, setDistractionCount] = useState<number>(0);

  // Breathing rhythm: 4-4-4-4 box breathing by default
  const [breathPhase, setBreathPhase] = useState<BreathPhase>('inhale');
  const [phaseSecondsLeft, setPhaseSecondsLeft] = useState<number>(4);
  const [breathCycleCount, setBreathCycleCount] = useState<number>(0);

  // Ambient sound track volumes
  const [soundVolumes, setSoundVolumes] = useState({
    bell: 70,
    bowl: 60,
    nature: 50,
  });

  const traditionInfo = TRADITIONS.find((t) => t.id === tradition) || TRADITIONS[0];

  // Timer interval
  useEffect(() => {
    let timer: any = null;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            setIsCompleted(true);
            if (soundEnabled) {
              audioService.playTempleBell();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, timeLeft, soundEnabled]);

  // Breathing pacer interval (4s inhale -> 4s hold -> 4s exhale -> 4s hold)
  useEffect(() => {
    let breathTimer: any = null;
    if (isActive) {
      breathTimer = setInterval(() => {
        setPhaseSecondsLeft((prev) => {
          if (prev <= 1) {
            // Transition phase
            if (breathPhase === 'inhale') {
              setBreathPhase('hold1');
              return 4;
            } else if (breathPhase === 'hold1') {
              setBreathPhase('exhale');
              return 4;
            } else if (breathPhase === 'exhale') {
              setBreathPhase('hold2');
              return 4;
            } else {
              setBreathPhase('inhale');
              setBreathCycleCount((c) => c + 1);
              if (soundEnabled && breathCycleCount % 3 === 0) {
                audioService.playSingingBowl();
              }
              return 4;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(breathTimer);
  }, [isActive, breathPhase, breathCycleCount, soundEnabled]);

  const togglePlay = () => {
    if (!isActive) {
      if (soundEnabled) {
        audioService.playSingingBowl();
      }
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(totalMinutes * 60);
    setBreathPhase('inhale');
    setPhaseSecondsLeft(4);
    setDistractionCount(0);
    setBreathCycleCount(0);
    setIsCompleted(false);
  };

  const selectDuration = (mins: number) => {
    setTotalMinutes(mins);
    setTimeLeft(mins * 60);
    setIsActive(false);
    setIsCompleted(false);
  };

  const handleLogDistraction = () => {
    setDistractionCount((prev) => prev + 1);
    if (soundEnabled) {
      audioService.playBeadClick();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Dedicated dedication texts
  const dedicationQuotes: Record<TraditionType, { title: string; verse: string }> = {
    buddhism: {
      title: '法界回向文',
      verse: '愿以此功德，普及于一切。我等与众生，皆共成佛道。息灭贪嗔痴，常修戒定慧。',
    },
    taoism: {
      title: '清静回向章',
      verse: '生道合一，神气相抱。致虚极，守静笃。复归于婴儿，常守大顺自然。',
    },
    christianity: {
      title: '平安感恩祷词',
      verse: '愿主的恩惠、慈爱与平安，常与我的心怀意念同在。出入蒙福，步履安稳。阿们。',
    },
    stoicism: {
      title: '理性内省赋',
      verse: '我已收摄本心，辨明顺逆。凡我所不能控者，平静接纳；凡我当尽力者，全心以赴。',
    },
    universal: {
      title: '同频祥和祈愿',
      verse: '愿我心中盛满慈悲与澄澈。愿光亮流经我身，照亮周遭的一切生命与存在。',
    },
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6 animate-fadeIn">
      {/* Top Title Banner */}
      <div className="flex flex-col gap-3 pb-3 border-b border-[#E5E1D8] dark:border-[#2D3530]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-[#4A5D4E]/10 dark:bg-[#4A5D4E]/20 text-[#4A5D4E] dark:text-[#D4AF37] text-[11px] font-serif font-bold whitespace-nowrap">
              {traditionInfo.name.split('/')[0]} · 止观
            </span>
            <span className="text-xs text-[#6C736E] dark:text-[#9BA39D] font-mono whitespace-nowrap">
              4-4-4-4 盒式呼吸
            </span>
          </div>
          <span className="text-[11px] text-[#6C736E] dark:text-[#9BA39D] font-mono">
            {isActive ? '修习中' : '静坐调息'}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-base sm:text-xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
            深境冥想 · 心性觉照室
          </h1>

          {/* Duration selector: full width equal grid on mobile, inline on sm */}
          <div className="grid grid-cols-5 gap-1 bg-[#FAF8F5] dark:bg-[#1C211E] p-1 rounded-xl border border-[#E5E1D8] dark:border-[#2D3530] w-full sm:w-auto">
            {[3, 5, 10, 15, 20].map((m) => (
              <button
                key={m}
                onClick={() => selectDuration(m)}
                disabled={isActive}
                className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all cursor-pointer text-center ${
                  totalMinutes === m
                    ? 'bg-[#4A5D4E] text-white shadow-xs'
                    : 'text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
                }`}
              >
                {m}分
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Breathing & Circle Stage */}
      <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-4 sm:p-8 shadow-xs flex flex-col items-center justify-center relative overflow-hidden">
        {/* Subtle background glow */}
        <div
          className={`absolute w-48 h-48 sm:w-64 sm:h-64 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
            breathPhase === 'inhale'
              ? 'bg-[#4A5D4E]/20 scale-125'
              : breathPhase === 'exhale'
              ? 'bg-[#D4AF37]/15 scale-75'
              : 'bg-indigo-500/10 scale-100'
          }`}
        />

        {/* Breath Stage */}
        <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center my-3 sm:my-5">
          {/* Animated pulsing outer ring */}
          <div
            className={`absolute rounded-full border-2 border-dashed border-[#4A5D4E]/40 dark:border-[#D4AF37]/40 transition-all duration-1000 ${
              isActive
                ? breathPhase === 'inhale'
                  ? 'w-48 h-48 sm:w-60 sm:h-60 opacity-100'
                  : breathPhase === 'hold1'
                  ? 'w-48 h-48 sm:w-60 sm:h-60 opacity-90'
                  : breathPhase === 'exhale'
                  ? 'w-36 h-36 sm:w-44 sm:h-44 opacity-60'
                  : 'w-36 h-36 sm:w-44 sm:h-44 opacity-80'
                : 'w-44 h-44 sm:w-56 sm:h-56 opacity-40'
            }`}
          />

          {/* Central Breathing Core */}
          <div
            className={`rounded-full flex flex-col items-center justify-center text-center p-4 shadow-xl transition-all duration-1000 ${
              breathPhase === 'inhale'
                ? 'w-36 h-36 sm:w-44 sm:h-44 bg-gradient-to-tr from-[#4A5D4E] to-[#6A816F] text-white scale-105'
                : breathPhase === 'hold1'
                ? 'w-36 h-36 sm:w-44 sm:h-44 bg-[#3B4A3E] text-white scale-105'
                : breathPhase === 'exhale'
                ? 'w-30 h-30 sm:w-36 sm:h-36 bg-gradient-to-tr from-[#1E2620] to-[#2E3B32] text-[#D4AF37] scale-95'
                : 'w-30 h-30 sm:w-36 sm:h-36 bg-[#181E1A] text-white/80 scale-95'
            }`}
          >
            <div className="text-[11px] font-serif tracking-widest uppercase opacity-80">
              {!isActive
                ? '准备静定'
                : breathPhase === 'inhale'
                ? '深吸 · 吸气'
                : breathPhase === 'hold1'
                ? '屏息 · 凝神'
                : breathPhase === 'exhale'
                ? '慢呼 · 放松'
                : '空息 · 澄照'}
            </div>
            <div className="text-2xl sm:text-3xl font-mono font-bold my-0.5">
              {!isActive ? formatTime(timeLeft) : `${phaseSecondsLeft}s`}
            </div>
            <div className="text-[10px] opacity-75 font-serif">
              {isActive ? `剩余 ${formatTime(timeLeft)}` : '点击开启'}
            </div>
          </div>
        </div>

        {/* Phase progress indicators */}
        <div className="flex items-center gap-1.5 mb-4">
          {[
            { id: 'inhale', label: '吸气 4s' },
            { id: 'hold1', label: '屏息 4s' },
            { id: 'exhale', label: '呼气 4s' },
            { id: 'hold2', label: '空息 4s' },
          ].map((ph) => (
            <span
              key={ph.id}
              className={`text-[11px] px-2 py-0.5 rounded-md font-serif transition-all ${
                breathPhase === ph.id && isActive
                  ? 'bg-[#4A5D4E] text-white font-bold'
                  : 'bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D]'
              }`}
            >
              {ph.label}
            </span>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className={`px-6 py-2.5 sm:px-8 sm:py-3 rounded-xl font-serif font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer ${
              isActive
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-[#4A5D4E] hover:bg-[#3B4B3E] text-white'
            }`}
          >
            {isActive ? (
              <>
                <Pause className="w-4 h-4" />
                <span>暂停静修</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>开始深度冥想</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-2.5 sm:p-3 rounded-xl border border-[#E5E1D8] dark:border-[#2D3530] text-[#6C736E] dark:text-[#9BA39D] hover:bg-[#FAF8F5] dark:hover:bg-[#181C19] transition-all cursor-pointer"
            title="重置"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Distraction awareness button */}
        {isActive && (
          <div className="mt-6 pt-6 border-t border-[#EFECE6] dark:border-[#28302A] w-full max-w-sm text-center space-y-2 animate-fadeIn">
            <button
              onClick={handleLogDistraction}
              className="w-full py-2.5 px-4 rounded-xl border border-[#E5E1D8] dark:border-[#2D3530] bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA] text-xs font-serif flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>觉察杂念升起（第 {distractionCount} 次回归）</span>
            </button>
            <p className="text-[11px] text-[#9BA39D]">
              走神是正常现象。每当发现心猿意马，轻按标记一次，并温柔地将注意带回呼吸。
            </p>
          </div>
        )}
      </div>

      {/* Completion Dedication Modal / Card */}
      {isCompleted && (
        <div className="bg-gradient-to-br from-[#2A342D] via-[#1E2520] to-[#151917] rounded-2xl p-4 sm:p-6 text-[#EDEFEA] shadow-lg border border-[#D4AF37]/50 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 gap-2">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-serif font-bold text-sm text-white">
                冥想圆满 · 功德回向
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#D4AF37] px-2 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              静定 {totalMinutes} 分钟达成
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center bg-[#111412]/50 p-3 rounded-xl border border-white/10">
            <div>
              <div className="text-[10px] text-[#9BA39D]">完成循环</div>
              <div className="text-base sm:text-lg font-bold text-[#EDEFEA] font-mono mt-0.5">
                {breathCycleCount} 次
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#9BA39D]">杂念回归</div>
              <div className="text-base sm:text-lg font-bold text-[#D4AF37] font-mono mt-0.5">
                {distractionCount} 次
              </div>
            </div>
            <div>
              <div className="text-[10px] text-[#9BA39D]">心性状态</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-400 font-serif mt-1">
                澄明无碍
              </div>
            </div>
          </div>

          {/* Dedication verse */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-[#D4AF37]/30 space-y-1.5">
            <div className="text-[11px] font-serif font-bold text-[#D4AF37]">
              {dedicationQuotes[tradition]?.title || '结行回向'}
            </div>
            <p className="text-xs sm:text-sm font-serif italic leading-relaxed text-[#EDEFEA]/90">
              “{dedicationQuotes[tradition]?.verse}”
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-[#4A5D4E] hover:bg-[#3B4B3E] text-white font-serif font-bold text-xs transition-all cursor-pointer"
            >
              再修一席
            </button>
          </div>
        </div>
      )}

      {/* Ambient Sound Mixer Card */}
      <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-3.5 h-3.5 text-[#4A5D4E] dark:text-[#D4AF37]" />
            <h3 className="font-serif font-bold text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA]">
              环境声学空间场
            </h3>
          </div>
          <span className="text-[10px] text-[#6C736E] dark:text-[#9BA39D]">
            Web Audio 空间微调
          </span>
        </div>

        {/* Sliders: Full width horizontal cards on mobile, generous spacing */}
        <div className="space-y-2.5">
          {/* Bowl */}
          <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] space-y-1.5">
            <div className="flex items-center justify-between text-xs font-serif">
              <span className="font-bold text-[#242926] dark:text-[#EDEFEA] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A5D4E]" />
                西藏颂钵 (432Hz 谐波)
              </span>
              <span className="font-mono text-xs font-bold text-[#4A5D4E] dark:text-[#D4AF37]">{soundVolumes.bowl}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={soundVolumes.bowl}
              onChange={(e) =>
                setSoundVolumes({ ...soundVolumes, bowl: Number(e.target.value) })
              }
              className="w-full h-1.5 rounded-lg bg-[#E5E1D8] dark:bg-[#2D3530] accent-[#4A5D4E] cursor-pointer"
            />
          </div>

          {/* Bell */}
          <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] space-y-1.5">
            <div className="flex items-center justify-between text-xs font-serif">
              <span className="font-bold text-[#242926] dark:text-[#EDEFEA] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A5D4E]" />
                古刹晓钟 (784Hz 空灵)
              </span>
              <span className="font-mono text-xs font-bold text-[#4A5D4E] dark:text-[#D4AF37]">{soundVolumes.bell}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={soundVolumes.bell}
              onChange={(e) =>
                setSoundVolumes({ ...soundVolumes, bell: Number(e.target.value) })
              }
              className="w-full h-1.5 rounded-lg bg-[#E5E1D8] dark:bg-[#2D3530] accent-[#4A5D4E] cursor-pointer"
            />
          </div>

          {/* Nature Wind */}
          <div className="p-3 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] space-y-1.5">
            <div className="flex items-center justify-between text-xs font-serif">
              <span className="font-bold text-[#242926] dark:text-[#EDEFEA] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A5D4E]" />
                山涧微风 (45dB 白噪)
              </span>
              <span className="font-mono text-xs font-bold text-[#4A5D4E] dark:text-[#D4AF37]">{soundVolumes.nature}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={soundVolumes.nature}
              onChange={(e) =>
                setSoundVolumes({ ...soundVolumes, nature: Number(e.target.value) })
              }
              className="w-full h-1.5 rounded-lg bg-[#E5E1D8] dark:bg-[#2D3530] accent-[#4A5D4E] cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
