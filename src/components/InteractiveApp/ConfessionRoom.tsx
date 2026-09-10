import React, { useState } from 'react';
import { audioService } from '../../utils/audioSynthesizer';
import { Heart, Wind, Flame, ShieldCheck, Sparkles, RotateCcw } from 'lucide-react';

interface ConfessionRoomProps {
  soundEnabled: boolean;
}

export const ConfessionRoom: React.FC<ConfessionRoomProps> = ({ soundEnabled }) => {
  const [confessionText, setConfessionText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [ritualType, setRitualType] = useState<'wind' | 'fire' | null>(null);
  const [blessingReply, setBlessingReply] = useState<string | null>(null);

  const handleStartRitual = (type: 'wind' | 'fire') => {
    if (!confessionText.trim() || isProcessing) return;

    setRitualType(type);
    setIsProcessing(true);

    if (soundEnabled) {
      audioService.playSingingBowl();
    }

    // Simulate catharsis ceremony with text fading & zero-knowledge wiping
    setTimeout(() => {
      const replies = [
        '“凡事皆有定期，万物各有其时。你所承受的沉重与自责，此刻已在静穆虚空中消融。原谅昨日不完美的自己，允许光明重新照拂你的灵魂。放下吧，你已得安歇。”',
        '“因缘和合而生，因缘尽散而灭。这一段心绪曾让你受苦，但也正是照见你本心柔软的一面明镜。此刻执念随风飘散，自性本自清净，不生不灭。”',
        '“痛苦源自苛求不可控之事。在这一记钟鸣里，宽恕过去的选择。守住内心的神圣要塞，带着平静与力量，重新步入今天的生活。”',
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      setBlessingReply(randomReply);
      setConfessionText(''); // Zero-knowledge wipe
      setIsProcessing(false);
    }, 2000);
  };

  const handleReset = () => {
    setBlessingReply(null);
    setRitualType(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-4 sm:p-8 shadow-xs text-center space-y-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D] text-xs font-serif font-bold mb-2">
            <Heart className="w-3.5 h-3.5 text-[#D4AF37]" /> 清净告解室 · 零知识神圣隐私
          </div>
          <h2 className="text-lg sm:text-2xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
            卸下重负 · 化念归尘
          </h2>
          <p className="text-xs text-[#6C736E] dark:text-[#9BA39D] mt-2 max-w-xs sm:max-w-md mx-auto leading-relaxed text-center">
            在此坦然吐露执念与深心忧惧<br />
            文字绝不上传存储 · 仪式后物理擦除
          </p>
        </div>

        {!blessingReply ? (
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={confessionText}
                onChange={(e) => setConfessionText(e.target.value)}
                disabled={isProcessing}
                placeholder="在这张宣纸上，坦然写下你此刻心中最沉重的执念或秘密..."
                rows={5}
                className={`w-full p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] placeholder-[#6C736E] dark:placeholder-[#9BA39D] focus:outline-none focus:ring-2 focus:ring-[#4A5D4E] font-serif leading-relaxed transition-all ${
                  isProcessing && ritualType === 'wind'
                    ? 'opacity-20 blur-sm duration-2000'
                    : isProcessing && ritualType === 'fire'
                    ? 'opacity-20 text-[#D4AF37] duration-2000'
                    : ''
                }`}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 max-w-md mx-auto">
              <button
                onClick={() => handleStartRitual('wind')}
                disabled={!confessionText.trim() || isProcessing}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#FAF8F5] hover:bg-[#F4F1EA] dark:bg-[#181C19] dark:hover:bg-[#232924] text-[#242926] dark:text-[#EDEFEA] text-xs font-serif font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-2 border border-[#E5E1D8] dark:border-[#2D3530] cursor-pointer shadow-2xs"
              >
                <Wind className="w-4 h-4 text-[#4A5D4E] dark:text-[#7B9280] shrink-0" />
                <span className="whitespace-nowrap">化念为风 · 随风消散</span>
              </button>

              <button
                onClick={() => handleStartRitual('fire')}
                disabled={!confessionText.trim() || isProcessing}
                className="w-full sm:flex-1 py-3 px-4 rounded-xl bg-[#4A5D4E] hover:bg-[#354338] text-white text-xs font-serif font-bold transition-all disabled:opacity-40 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Flame className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="whitespace-nowrap">焚心化光 · 燃尽生辉</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#6C736E] dark:text-[#9BA39D] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#4A5D4E] dark:text-[#7B9280] shrink-0" />
              <span className="whitespace-nowrap">端侧阅后即焚 · 绝不落盘 · 零数据留存</span>
            </div>
          </div>
        ) : (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] space-y-4 text-center animate-fadeIn">
            <div className="w-12 h-12 rounded-full bg-[#EEF3EF] dark:bg-[#1A241C] text-[#D4AF37] flex items-center justify-center mx-auto border border-[#D5E0D7] dark:border-[#29382D]">
              <Sparkles className="w-6 h-6" />
            </div>

            <div className="text-sm font-serif font-bold text-[#354338] dark:text-[#A3B8A7] uppercase tracking-widest">
              慈悲回响 · 心性赦怀
            </div>

            <p className="text-sm sm:text-base font-serif text-[#242926] dark:text-[#EDEFEA] max-w-lg mx-auto leading-relaxed italic">
              {blessingReply}
            </p>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-serif font-bold bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] text-[#242926] dark:text-[#EDEFEA] hover:text-[#4A5D4E] dark:hover:text-[#A3B8A7] transition-colors shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>重新倾诉另一段心事</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
