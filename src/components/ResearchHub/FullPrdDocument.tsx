import React, { useState } from 'react';
import { FULL_PRD_SECTIONS } from '../../data/prdData';
import { PrdSection } from '../../types';
import { FileText, Copy, Check, Download, Layers, Tag, Bookmark } from 'lucide-react';

export const FullPrdDocument: React.FC = () => {
  const [activeSectionId, setActiveSectionId] = useState<string>(FULL_PRD_SECTIONS[0].id);
  const [copied, setCopied] = useState(false);

  const activeSection =
    FULL_PRD_SECTIONS.find((s) => s.id === activeSectionId) || FULL_PRD_SECTIONS[0];

  const handleCopyAll = () => {
    const fullMarkdown = FULL_PRD_SECTIONS.map((sec) => {
      let text = `## ${sec.title}\n\n> ${sec.summary}\n\n${sec.content}\n\n`;
      sec.subsections?.forEach((sub) => {
        text += `### ${sub.subtitle}\n\n${sub.body}\n\n`;
      });
      return text;
    }).join('---\n\n');

    navigator.clipboard.writeText(fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-br from-[#1E2520] via-[#2A342D] to-[#3B483E] text-[#EDEFEA] rounded-2xl border border-[#4A5D4E]/40 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] mb-1">
            <FileText className="w-4 h-4" /> 产品需求说明书 (PRD) V1.0 正式发布版
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            “灵境智修 (Lumina)”全功能需求规格说明书
          </h2>
          <p className="text-xs sm:text-sm text-[#A3B8A7] mt-1">
            面向工程研发、教义合规专家、算法团队及UI设计团队的标准化产品执行标准。
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#4A5D4E] hover:bg-[#3B493F] text-white border border-[#6B806F] transition-all shadow-xs"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? '已复制PRD全量内容' : '复制完整 Markdown PRD'}
          </button>
        </div>
      </div>

      {/* Main Layout: Left Navigation + Right Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Table of Contents */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold text-[#6C736E] dark:text-[#9BA39D] uppercase tracking-wider px-3 mb-2 flex items-center gap-1.5">
            <Bookmark className="w-3.5 h-3.5 text-[#4A5D4E] dark:text-[#D4AF37]" /> 章节目录导航
          </div>
          {FULL_PRD_SECTIONS.map((sec) => {
            const isActive = activeSection.id === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-2 ${
                  isActive
                    ? 'bg-[#EEF3EF] dark:bg-[#1A241C] border-[#4A5D4E] text-[#242926] dark:text-[#EDEFEA] shadow-xs ring-1 ring-[#4A5D4E]/40'
                    : 'bg-[#FFFFFF] dark:bg-[#1D221F] border-[#E5E1D8] dark:border-[#2D3530] text-[#6C736E] dark:text-[#9BA39D] hover:bg-[#FAF8F5] dark:hover:bg-[#181C19]'
                }`}
              >
                <div>
                  <div className="text-sm font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">{sec.title}</div>
                  <div className="text-xs text-[#6C736E] dark:text-[#9BA39D] line-clamp-1 mt-0.5">
                    {sec.summary}
                  </div>
                </div>
                {sec.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 border ${
                      isActive
                        ? 'bg-[#4A5D4E] text-white border-[#4A5D4E]'
                        : 'bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D] border-[#E5E1D8] dark:border-[#2D3530]'
                    }`}
                  >
                    {sec.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Section Details */}
        <div className="lg:col-span-8 bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-6 sm:p-8 shadow-xs space-y-6">
          <div className="border-b border-[#E5E1D8] dark:border-[#2D3530] pb-5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#4A5D4E] dark:text-[#D4AF37] mb-2">
              <Layers className="w-4 h-4" /> 章节详情
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
              {activeSection.title}
            </h3>
            <div className="mt-3 p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border-l-4 border-[#4A5D4E] text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] leading-relaxed italic">
              “{activeSection.summary}”
            </div>
            <p className="text-sm text-[#6C736E] dark:text-[#9BA39D] mt-4 leading-relaxed">
              {activeSection.content}
            </p>
          </div>

          {/* Subsections */}
          <div className="space-y-6">
            {activeSection.subsections?.map((sub, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-base font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
                    {sub.subtitle}
                  </h4>
                  {sub.tags && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {sub.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 text-[10px] rounded-md bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D] font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] whitespace-pre-line leading-relaxed font-sans">
                  {sub.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
