import React, { useState } from 'react';
import { COMPETITOR_APPS } from '../../data/researchData';
import { CompetitorApp } from '../../types';
import { Star, CheckCircle2, XCircle, Bot, Sparkles, Filter } from 'lucide-react';

export const MarketAppsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeApp, setActiveApp] = useState<CompetitorApp>(COMPETITOR_APPS[1]); // Default to Hallow

  const categories = [
    { id: 'all', label: '全部流派应用' },
    { id: 'Christian', label: '基督/天主教系' },
    { id: 'Islamic', label: '伊斯兰教系' },
    { id: 'Buddhist/Eastern', label: '佛学/东方心性系' },
    { id: 'Experimental AI', label: '初代AI实验性' },
    { id: 'Secular/Mindfulness', label: '世俗正念对照' },
  ];

  const filteredApps =
    selectedCategory === 'all'
      ? COMPETITOR_APPS
      : COMPETITOR_APPS.filter((app) => app.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
            市面主流信仰应用全景图谱与优缺点矩阵
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            横跨全球基督教、伊斯兰教、东方禅宗、新型AI聊天与世俗正念五大流派代表产品深度拆解。
          </p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          <Filter className="w-4 h-4 text-[#6C736E] dark:text-[#9BA39D] shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                selectedCategory === cat.id
                  ? 'bg-[#4A5D4E] text-white border-[#4A5D4E] shadow-xs'
                  : 'bg-[#FAF8F5] dark:bg-[#181C19] border-[#E5E1D8] dark:border-[#2D3530] text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of App Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredApps.map((app) => {
          const isSelected = activeApp.id === app.id;
          return (
            <div
              key={app.id}
              onClick={() => setActiveApp(app)}
              className={`cursor-pointer rounded-2xl p-5 border transition-all relative ${
                isSelected
                  ? 'bg-[#EEF3EF]/60 dark:bg-[#1A241C] border-[#4A5D4E] shadow-xs ring-1 ring-[#4A5D4E]/50'
                  : 'bg-[#FFFFFF] dark:bg-[#1D221F] border-[#E5E1D8] dark:border-[#2D3530] hover:border-[#4A5D4E]/60 shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-serif font-bold text-base text-[#242926] dark:text-[#EDEFEA]">
                    {app.name}
                  </h3>
                  <span className="inline-block text-xs font-medium px-2 py-0.5 mt-1 rounded-full bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-[#6C736E] dark:text-[#9BA39D]">
                    {app.category}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[#D4AF37] text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  {app.rating}
                </div>
              </div>

              <div className="text-xs text-[#6C736E] dark:text-[#9BA39D] mb-3 line-clamp-1">
                用户量级：{app.userScale}
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-[#E5E1D8] dark:border-[#2D3530]">
                <div className="flex items-center gap-1.5 text-[#6C736E] dark:text-[#9BA39D]">
                  <Bot className="w-3.5 h-3.5 text-[#4A5D4E] dark:text-[#7B9280]" />
                  <span>AI能力：</span>
                  <span className="font-medium text-[#242926] dark:text-[#EDEFEA]">
                    {app.aiLevel}
                  </span>
                </div>
                <span className="text-[#4A5D4E] dark:text-[#D4AF37] font-medium">
                  {isSelected ? '查看深度剖析' : '点击查看'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep-Dive Inspection Panel */}
      {activeApp && (
        <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E5E1D8] dark:border-[#2D3530]">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
                  {activeApp.name} 深度优缺点与商业化剖析
                </h3>
                <span className="px-2.5 py-1 text-xs rounded-full bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D] font-medium">
                  {activeApp.category}
                </span>
              </div>
              <p className="text-sm text-[#6C736E] dark:text-[#9BA39D] mt-1">
                市场规模与体量：{activeApp.userScale} ｜ 商业模式：{activeApp.monetization}
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-xs text-[#242926] dark:text-[#EDEFEA]">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              AI赋能级别: <strong className="text-[#4A5D4E] dark:text-[#D4AF37]">{activeApp.aiLevel}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
            {/* Pros */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#4A5D4E] dark:text-[#7B9280] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                核心优势与成功经验 (Pros)
              </h4>
              <ul className="space-y-3">
                {activeApp.pros.map((pro, index) => (
                  <li
                    key={index}
                    className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#D5E0D7] dark:border-[#29382D] text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] leading-relaxed"
                  >
                    • {pro}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#A84848] dark:text-[#E07A7A] flex items-center gap-2">
                <XCircle className="w-4 h-4" />
                致命缺陷与未被满足的痛点 (Cons)
              </h4>
              <ul className="space-y-3">
                {activeApp.cons.map((con, index) => (
                  <li
                    key={index}
                    className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] leading-relaxed"
                  >
                    • {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key Takeaway for Lumina */}
          <div className="mt-6 p-4 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] leading-relaxed">
            <strong className="text-[#4A5D4E] dark:text-[#D4AF37]">💡 对“灵境智修 (Lumina)”的破局启示：</strong>
            {activeApp.id === 'youversion' &&
              ' 学习其严谨完备的经典权威性，但颠覆其冰冷的单向阅听模式，引入具备当代语境理解力的共情 AI，把死经文变成活智慧。'}
            {activeApp.id === 'hallow' &&
              ' 借鉴其顶级声学与现代审美的仪式场域，但打破单一教规高墙与昂贵订阅，以多哲学包容性与普惠 Freemium 降维打击。'}
            {activeApp.id === 'dianzi-muyu' &&
              ' 保留敲击木鱼的即时低门槛反馈，但坚决拒绝“纯搞笑玩具”，打通“敲木鱼 ➔ 读一偈 ➔ 问心事 ➔ 顿悟安顿”的长效心性成长闭环。'}
            {activeApp.id === 'text-with-jesus' &&
              ' 彻底摒弃“轻浮的角色扮演”，坚守“去神化”宪章，以导师而非神明自居，建立严格教义对齐与心理安全网，根除宗教幻觉。'}
            {activeApp.id === 'muslim-pro' &&
              ' 坚决不使用任何廉价插屏广告破坏神圣仪式感，守护用户极致私密体验，以会员制与文化硬件变现。'}
            {activeApp.id === 'calm-headspace' &&
              ' 超越世俗浅层生理呼吸法，将深层形而上哲学与生命终极关怀注入冥想，满足高知青年的深度精神依归。'}
          </div>
        </div>
      )}
    </div>
  );
};
