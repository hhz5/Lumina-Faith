import React, { useState } from 'react';
import { SCRIPTURES, ScriptureItem } from '../../data/scriptureData';
import { TraditionType } from '../../types';
import { BookOpen, Sparkles, HelpCircle, Check, Copy } from 'lucide-react';

interface ScriptureLibraryProps {
  currentTradition: TraditionType;
  soundEnabled: boolean;
}

export const ScriptureLibrary: React.FC<ScriptureLibraryProps> = ({ currentTradition }) => {
  const [selectedScripture, setSelectedScripture] = useState<ScriptureItem>(() => {
    const matched = SCRIPTURES.find((s) => s.tradition === currentTradition);
    return matched || SCRIPTURES[0];
  });

  const [activeTab, setActiveTab] = useState<'text' | 'exegesis' | 'inquiry' | 'all'>('all');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = `【${selectedScripture.title}】\n${selectedScripture.content.join(
      '\n'
    )}\n\n【现代表意】\n${selectedScripture.modernInterpretation}\n\n【观心反思】\n${
      selectedScripture.contemplationPrompt
    }`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Top Scripture Scroll Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
        {SCRIPTURES.map((item) => {
          const isSelected = selectedScripture.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedScripture(item)}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition-all border cursor-pointer ${
                isSelected
                  ? 'bg-[#4A5D4E] text-white border-[#4A5D4E] shadow-xs'
                  : 'bg-[#FFFFFF] dark:bg-[#1D221F] border-[#E5E1D8] dark:border-[#2D3530] text-[#242926] dark:text-[#EDEFEA] hover:border-[#4A5D4E]'
              }`}
            >
              {item.title.split('（')[0]}
            </button>
          );
        })}
      </div>

      {/* Main Scripture Display */}
      <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-4 sm:p-6 shadow-xs space-y-4">
        {/* Title and Metadata */}
        <div className="flex items-start sm:items-center justify-between pb-3 border-b border-[#E5E1D8] dark:border-[#2D3530] gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA] truncate">
                {selectedScripture.title}
              </h2>
              <span className="px-2 py-0.5 text-[10px] rounded-full bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D] font-serif whitespace-nowrap shrink-0">
                {selectedScripture.category}
              </span>
            </div>
            <div className="text-[11px] text-[#6C736E] dark:text-[#9BA39D] mt-0.5 font-serif truncate">
              典籍校勘：{selectedScripture.author}
            </div>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E5E1D8] dark:border-[#2D3530] text-xs text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA] hover:bg-[#FAF8F5] dark:hover:bg-[#181C19] transition-colors cursor-pointer shrink-0 whitespace-nowrap"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" /> : <Copy className="w-3.5 h-3.5 shrink-0" />}
            <span className="whitespace-nowrap">{copied ? '已复制' : '复制经文'}</span>
          </button>
        </div>

        {/* Reading Mode Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#FAF8F5] dark:bg-[#161B18] border border-[#E5E1D8] dark:border-[#2D3530] overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: '全卷品读' },
            { id: 'text', label: '原典正文' },
            { id: 'exegesis', label: '义理通识' },
            { id: 'inquiry', label: '观心明镜' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-serif whitespace-nowrap shrink-0 transition-all cursor-pointer text-center ${
                activeTab === tab.id
                  ? 'bg-[#4A5D4E] text-white font-bold shadow-xs'
                  : 'text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. Ancient Scripture Text */}
        {(activeTab === 'all' || activeTab === 'text') && (
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E5E1D8]/60 dark:border-[#2D3530]/60">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-serif font-bold bg-[#4A5D4E]/10 dark:bg-[#4A5D4E]/25 text-[#354338] dark:text-[#D4AF37] flex items-center gap-1 shrink-0">
                <BookOpen className="w-3 h-3" /> 原典正文
              </span>
              <span className="text-[11px] text-[#6C736E] dark:text-[#9BA39D]">历代宗门善本校勘</span>
            </div>
            <div className="space-y-3">
              {selectedScripture.content.map((paragraph, idx) => (
                <p
                  key={idx}
                  className="text-xs sm:text-sm leading-[2] text-[#242926] dark:text-[#EDEFEA] tracking-wider font-serif text-justify"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* 2. Modern Interpretation */}
        {(activeTab === 'all' || activeTab === 'exegesis') && (
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E5E1D8]/60 dark:border-[#2D3530]/60">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-serif font-bold bg-[#4A5D4E]/10 dark:bg-[#4A5D4E]/25 text-[#354338] dark:text-[#D4AF37] flex items-center gap-1 shrink-0">
                <Sparkles className="w-3 h-3" /> 义理阐微
              </span>
              <span className="text-[11px] text-[#6C736E] dark:text-[#9BA39D]">当代生活心结透视</span>
            </div>
            <p className="text-xs sm:text-sm text-[#4E5650] dark:text-[#BAC2BC] leading-[1.9] tracking-wide text-justify font-serif">
              {selectedScripture.modernInterpretation}
            </p>
          </div>
        )}

        {/* 3. Contemplation & Self-Inquiry Prompt */}
        {(activeTab === 'all' || activeTab === 'inquiry') && (
          <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E5E1D8]/60 dark:border-[#2D3530]/60">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-serif font-bold bg-[#4A5D4E]/10 dark:bg-[#4A5D4E]/25 text-[#354338] dark:text-[#D4AF37] flex items-center gap-1 shrink-0">
                <HelpCircle className="w-3 h-3" /> 观心明镜
              </span>
              <span className="text-[11px] text-[#6C736E] dark:text-[#9BA39D]">当下反求诸己</span>
            </div>
            <p className="text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] leading-[1.9] tracking-wide text-justify font-serif italic">
              “{selectedScripture.contemplationPrompt}”
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

