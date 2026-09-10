import React, { useState } from 'react';
import { TraditionType } from '../../types';
import { TRADITIONS } from '../../data/researchData';
import { audioService } from '../../utils/audioSynthesizer';
import {
  Compass,
  ShieldCheck,
  Bell,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Lock,
  Volume2,
  Clock,
  HeartHandshake,
  Award,
} from 'lucide-react';

interface OnboardingFlowProps {
  currentTradition: TraditionType;
  onSelectTradition: (t: TraditionType) => void;
  onFinishOnboarding: () => void;
  soundEnabled: boolean;
}

export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  currentTradition,
  onSelectTradition,
  onFinishOnboarding,
  soundEnabled,
}) => {
  const [step, setStep] = useState<number>(1);
  const [userIntention, setUserIntention] = useState<string>('anxiety');
  const [agreedToCharter, setAgreedToCharter] = useState<boolean>(true);
  const [agreedToPrivacy, setAgreedToPrivacy] = useState<boolean>(true);
  const [reminderTime, setReminderTime] = useState<string>('07:30');
  const [preferredSound, setPreferredSound] = useState<'wooden' | 'bowl' | 'bell'>('bowl');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const intentions = [
    {
      id: 'anxiety',
      title: '纾解焦虑与工作内耗',
      desc: '在快节奏生活里找到不随波逐流的内在定力',
    },
    {
      id: 'meaning',
      title: '探寻生命支点与终极意义',
      desc: '在经典智慧指引下体悟生死与存在的安顿',
    },
    {
      id: 'grief',
      title: '疗愈失去与情感创伤',
      desc: '在幽暗孤寂中寻得被聆听、被托举的宽宥力量',
    },
    {
      id: 'discipline',
      title: '专注力觉知与心性磨砺',
      desc: '养成每日止观静定习惯，戒除心浮气躁',
    },
  ];

  const handleNext = () => {
    if (soundEnabled) {
      audioService.playBeadClick();
    }
    if (step === 3) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setStep(4);
        if (soundEnabled) {
          audioService.playSingingBowl();
        }
      }, 1200);
    } else {
      setStep((s) => Math.min(4, s + 1));
    }
  };

  const handlePrev = () => {
    if (soundEnabled) {
      audioService.playBeadClick();
    }
    setStep((s) => Math.max(1, s - 1));
  };

  const testSound = (type: 'wooden' | 'bowl' | 'bell') => {
    setPreferredSound(type);
    if (!soundEnabled) return;
    if (type === 'wooden') audioService.playWoodenFish();
    if (type === 'bowl') audioService.playSingingBowl();
    if (type === 'bell') audioService.playTempleBell();
  };

  const activeTraditionInfo =
    TRADITIONS.find((t) => t.id === currentTradition) || TRADITIONS[0];

  return (
    <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-6 animate-fadeIn">
      {/* Step Indicator */}
      <div className="bg-[#FFFFFF] dark:bg-[#1D221F] p-3.5 sm:p-5 rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
            <span className="w-5 h-5 rounded-full bg-[#4A5D4E] text-white flex items-center justify-center text-[10px] font-mono">
              {step}
            </span>
            <span>
              {step === 1 && '初发心境 · 确立修习流派'}
              {step === 2 && '自律与隐私 · 伦理知情同意'}
              {step === 3 && '仪轨定课 · 声音与提醒'}
              {step === 4 && '道场启封 · 步入修行'}
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#6C736E] dark:text-[#9BA39D]">
            {step} / 4 步
          </span>
        </div>

        {/* Segmented Progress Bar */}
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step >= s ? 'bg-[#4A5D4E]' : 'bg-[#E5E1D8] dark:bg-[#2D3530]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step 1: Intention and Tradition */}
      {step === 1 && (
        <div className="bg-[#FFFFFF] dark:bg-[#1D221F] p-4 sm:p-7 rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs space-y-5 animate-fadeIn">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#4A5D4E]/10 text-[#4A5D4E] dark:text-[#D4AF37] text-[11px] font-serif font-bold">
              <Compass className="w-3 h-3" />
              <span>第一步 · 确立修习流派与初发心境</span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
              你在寻找哪一种心性安顿的方式？
            </h2>
            <p className="text-xs text-[#6C736E] dark:text-[#9BA39D]">
              Lumina 汇聚人类数千年经典智慧，请选择当下与你最为共振的心性流派：
            </p>
          </div>

          {/* Tradition selector: Spacious single-column on mobile, 2-column on desktop */}
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {TRADITIONS.map((t) => {
              const isSelected = currentTradition === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    onSelectTradition(t.id);
                    if (soundEnabled) audioService.playBeadClick();
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#EEF3EF] dark:bg-[#1A241C] border-[#4A5D4E] dark:border-[#D4AF37] shadow-xs ring-1 ring-[#4A5D4E]'
                      : 'bg-[#FAF8F5] dark:bg-[#181C19] border-[#E5E1D8] dark:border-[#2D3530] hover:border-[#9BA39D]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl shrink-0">{t.symbol}</span>
                    <div className="min-w-0 flex-1">
                      <div className="font-serif font-bold text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] truncate">
                        {t.name}
                      </div>
                      <div className="text-[10px] text-[#6C736E] dark:text-[#9BA39D] truncate">
                        {t.enName}
                      </div>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] text-[#6C736E] dark:text-[#9BA39D] line-clamp-2 leading-relaxed">
                    {t.corePhilosophy}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Intention selector */}
          <div className="space-y-3 pt-4 border-t border-[#EFECE6] dark:border-[#262D28]">
            <label className="block text-xs font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
              你当前最渴望借由修行化解的现实课题是：
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {intentions.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setUserIntention(item.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    userIntention === item.id
                      ? 'bg-[#4A5D4E] text-white border-[#4A5D4E]'
                      : 'bg-[#FAF8F5] dark:bg-[#181C19] border-[#E5E1D8] dark:border-[#2D3530] text-[#242926] dark:text-[#EDEFEA] hover:bg-[#EFECE6]'
                  }`}
                >
                  <div className="font-serif font-bold text-xs">{item.title}</div>
                  <div
                    className={`text-[11px] mt-1 ${
                      userIntention === item.id
                        ? 'text-[#EDEFEA]/80'
                        : 'text-[#6C736E] dark:text-[#9BA39D]'
                    }`}
                  >
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Sacred Privacy & Ethical Charter */}
      {step === 2 && (
        <div className="bg-[#FFFFFF] dark:bg-[#1D221F] p-6 sm:p-8 rounded-3xl border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs space-y-6 animate-fadeIn">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 text-xs font-serif font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>第二步 · 神圣自律宪章与隐私知情同意</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
              关于科技与神圣的界限约定
            </h2>
            <p className="text-xs sm:text-sm text-[#6C736E] dark:text-[#9BA39D]">
              在步入道场前，我们恳请您知晓 Lumina 对生命的敬畏与合规底线承诺：
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#161A18] border border-[#E5E1D8] dark:border-[#28302A] space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#242926] dark:text-[#EDEFEA]">
                <HeartHandshake className="w-4 h-4 text-[#4A5D4E] dark:text-[#D4AF37]" />
                <span>1. 去神化自律原则 (Zero-Deification Protocol)</span>
              </div>
              <p className="text-xs text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
                平台内所有 AI 向导仅为典籍伴读工具与心性反思明镜，绝非降世神明、佛菩萨显化或神职人员，不可替代实体宗教的神圣仪式（如受洗、灌顶、开光或神职告解赦罪）。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#161A18] border border-[#E5E1D8] dark:border-[#28302A] space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#242926] dark:text-[#EDEFEA]">
                <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>2. 敏感信仰数据与阅后即焚承诺</span>
              </div>
              <p className="text-xs text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
                您的心性倾诉与清净告解内容在客户端采用阅后即焚设计，不用于商业广告画像投放，严守个人神圣隐私边界。
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#161A18] border border-[#E5E1D8] dark:border-[#28302A] space-y-2">
              <div className="flex items-center gap-2 font-serif font-bold text-sm text-[#242926] dark:text-[#EDEFEA]">
                <ShieldCheck className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>3. 生命安全熔断保护</span>
              </div>
              <p className="text-xs text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
                本应用不可替代临床心理治疗或精神医学诊疗。若遇急性心理危机或自残念头，系统将立即终止常规对话并推送专业心理援助与急救热线。
              </p>
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#242926] dark:text-[#EDEFEA]">
              <input
                type="checkbox"
                checked={agreedToCharter}
                onChange={(e) => setAgreedToCharter(e.target.checked)}
                className="rounded text-[#4A5D4E] focus:ring-0 w-4 h-4"
              />
              <span>我已充分知晓 AI 仅作为心性修习辅助工具，绝非神灵实体</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#242926] dark:text-[#EDEFEA]">
              <input
                type="checkbox"
                checked={agreedToPrivacy}
                onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                className="rounded text-[#4A5D4E] focus:ring-0 w-4 h-4"
              />
              <span>同意《宗教与哲学取向敏感个人信息处理特别授权协议》</span>
            </label>
          </div>
        </div>
      )}

      {/* Step 3: Ritual Sound & Schedule */}
      {step === 3 && (
        <div className="bg-[#FFFFFF] dark:bg-[#1D221F] p-4 sm:p-7 rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs space-y-5 animate-fadeIn">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 text-[#8C701E] dark:text-[#D4AF37] text-[11px] font-serif font-bold">
              <Volume2 className="w-3 h-3" />
              <span>第三步 · 声音仪式与定课提醒</span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
              为每日身心修习设定节奏
            </h2>
            <p className="text-xs text-[#6C736E] dark:text-[#9BA39D]">
              声音能瞬间唤醒注意力，将散乱的心智收摄回当下：
            </p>
          </div>

          {/* Sound selector: Clean single-column list for flawless mobile reading */}
          <div className="space-y-2">
            <label className="block text-xs font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
              选择每日启关法音（点击可试听）：
            </label>
            <div className="space-y-2">
              {[
                { id: 'bowl', name: '西藏颂钵 (432Hz)', desc: '深沉泛音 · 安抚烦躁身心' },
                { id: 'wooden', name: '清脆木鱼 (580Hz)', desc: '空灵叩击 · 聚敛散乱神思' },
                { id: 'bell', name: '古刹晓钟 (784Hz)', desc: '悠远明净 · 扫清昏沉杂念' },
              ].map((snd) => (
                <div
                  key={snd.id}
                  onClick={() => testSound(snd.id as any)}
                  className={`p-3 sm:p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                    preferredSound === snd.id
                      ? 'bg-[#EEF3EF] dark:bg-[#1A241C] border-[#4A5D4E] dark:border-[#D4AF37] ring-1 ring-[#4A5D4E]'
                      : 'bg-[#FAF8F5] dark:bg-[#181C19] border-[#E5E1D8] dark:border-[#2D3530] hover:border-[#9BA39D]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#FFFFFF] dark:bg-[#252C28] flex items-center justify-center text-[#4A5D4E] dark:text-[#D4AF37] shrink-0 border border-[#E5E1D8] dark:border-[#2D3530]">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-serif font-bold text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] truncate">
                      {snd.name}
                    </div>
                    <div className="text-[11px] text-[#6C736E] dark:text-[#9BA39D] truncate">
                      {snd.desc}
                    </div>
                  </div>
                  <span className="text-[10px] text-[#4A5D4E] dark:text-[#D4AF37] font-serif font-bold shrink-0 px-2 py-0.5 rounded-full bg-[#4A5D4E]/10">
                    试听
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Daily reminder time */}
          <div className="pt-3 border-t border-[#EFECE6] dark:border-[#262D28] flex items-center justify-between gap-2">
            <div className="space-y-0.5 min-w-0">
              <div className="text-xs font-serif font-bold text-[#242926] dark:text-[#EDEFEA] truncate">
                每日晨起静思定课时间
              </div>
              <div className="text-[11px] text-[#6C736E] dark:text-[#9BA39D] truncate">
                清晨接收一则微经文灵粮
              </div>
            </div>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#E5E1D8] dark:border-[#2D3530] bg-[#FAF8F5] dark:bg-[#181C19] text-xs font-mono font-bold text-[#242926] dark:text-[#EDEFEA] shrink-0"
            />
          </div>
        </div>
      )}

      {/* Step 4: Sanctuary Activated Scroll */}
      {step === 4 && (
        <div className="bg-[#FFFFFF] dark:bg-[#1D221F] p-4 sm:p-7 rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs space-y-4 text-center animate-fadeIn relative overflow-hidden">
          <div className="w-14 h-14 mx-auto rounded-2xl overflow-hidden shadow-md border border-[#D4AF37]/50">
            <img
              src="/lumina_app_logo.jpg"
              alt="Lumina App Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-serif font-bold text-[#8C701E] dark:text-[#D4AF37] px-2.5 py-0.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 inline-block">
              修习契约已封印生成
            </span>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
              欢迎入驻灵境智修
            </h2>
            <div className="flex items-center justify-center gap-1.5 flex-wrap text-[11px] text-[#6C736E] dark:text-[#9BA39D]">
              <span className="px-2 py-0.5 rounded-md bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530]">
                流派：{activeTraditionInfo.name.split('/')[0]}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530]">
                定课：{reminderTime}
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530]">
                法音：{preferredSound === 'bowl' ? '西藏颂钵' : preferredSound === 'wooden' ? '清脆木鱼' : '古刹晓钟'}
              </span>
            </div>
          </div>

          {/* Certificate Scroll Card */}
          <div className="max-w-md mx-auto p-4 sm:p-5 rounded-xl bg-gradient-to-b from-[#FAF8F5] to-[#F2EFE9] dark:from-[#181D1A] dark:to-[#121513] border border-[#D4AF37]/40 shadow-inner space-y-3 text-left">
            <div className="flex items-center justify-between text-xs border-b border-[#E5E1D8] dark:border-[#28302A] pb-2">
              <span className="font-serif font-bold text-[#8C701E] dark:text-[#D4AF37]">
                初发心觉照誓愿
              </span>
              <span className="text-[10px] font-mono text-[#9BA39D]">
                NO. LUMINA-029672
              </span>
            </div>
            <p className="text-xs text-[#242926] dark:text-[#EDEFEA] leading-relaxed italic font-serif">
              “愿我以此清净身心，常行正念。逢逆境不怨尤，遇顺境不沉溺。在每一次呼吸与叩击中，体察真实生命之流动。”
            </p>
            <div className="text-[11px] text-[#6C736E] dark:text-[#9BA39D] flex items-center justify-between pt-1 border-t border-[#E5E1D8]/50 dark:border-[#28302A]/50">
              <span className="whitespace-nowrap">初心：澄澈宁静</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold whitespace-nowrap">
                ● 零知识端侧加密护持
              </span>
            </div>
          </div>

          <button
            onClick={onFinishOnboarding}
            className="w-full max-w-md mx-auto py-3 px-6 rounded-xl bg-[#4A5D4E] hover:bg-[#3B4B3E] text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>启程 · 步入觉照大厅</span>
          </button>
        </div>
      )}

      {/* Bottom Nav Controls */}
      {step < 4 && (
        <div className="flex items-center justify-between pt-2">
          {step > 1 ? (
            <button
              onClick={handlePrev}
              className="px-4 py-2 rounded-xl border border-[#E5E1D8] dark:border-[#2D3530] text-xs font-serif text-[#6C736E] dark:text-[#9BA39D] hover:bg-[#FAF8F5] dark:hover:bg-[#181C19] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>上一步</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={handleNext}
            disabled={step === 2 && (!agreedToCharter || !agreedToPrivacy)}
            className={`px-5 py-2.5 rounded-xl font-serif font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              step === 2 && (!agreedToCharter || !agreedToPrivacy)
                ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed'
                : 'bg-[#4A5D4E] hover:bg-[#3B4B3E] text-white shadow-xs'
            }`}
          >
            {isGenerating ? (
              <span>正在封印道场...</span>
            ) : (
              <>
                <span>{step === 3 ? '生成我的修习道场' : '下一步'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
