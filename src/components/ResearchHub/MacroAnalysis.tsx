import React from 'react';
import { Sparkles, Globe, Compass, HeartPulse, BrainCircuit, ShieldAlert } from 'lucide-react';

export const MacroAnalysis: React.FC = () => {
  return (
    <div className="space-y-8 text-stone-800 dark:text-stone-200">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-[#1E2520] via-[#2A342D] to-[#3B483E] text-[#EDEFEA] rounded-2xl p-8 border border-[#4A5D4E]/40 shadow-xs relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4A5D4E]/40 text-[#D4AF37] text-xs font-medium mb-4 border border-[#D4AF37]/30">
            <Sparkles className="w-3.5 h-3.5" /> 宏观产业洞察与信仰科技 (FaithTech) 趋势报告
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
            当千古神圣信仰遇上生成式 AI：重塑人类精神安顿的“奇点时刻”
          </h2>
          <p className="text-[#A3B8A7] text-sm sm:text-base leading-relaxed">
            全球正经历百年未有之大变局。经济增速放缓、阶层流动固化、算法信息茧房与快节奏内卷，催生了当代人普遍的“意义真空”与深度精神内耗。在这一时代背景下，古老的宗教信仰与现代科技产生了前所未有的剧烈碰撞与化学反应。
          </p>
        </div>
      </div>

      {/* 4 Macro Drivers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs hover:border-[#4A5D4E]/50 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#EEF3EF] dark:bg-[#1A241C] text-[#4A5D4E] dark:text-[#A3B8A7] flex items-center justify-center mb-4 border border-[#D5E0D7] dark:border-[#29382D]">
            <HeartPulse className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold mb-2 text-[#242926] dark:text-[#EDEFEA]">
            1. 时代情绪病：“精神内耗”与无处安放的存在主义焦虑
          </h3>
          <p className="text-sm text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
            世界卫生组织数据显示，全球抑郁与焦虑障碍发生率在过去十年激增。在年轻人群体中，传统的物质激励（职场晋升、消费主义）边际效应递减，“存在主义虚无（Existential Vacuum）”成为核心痛点。年轻人急切需要一种超越世俗绩效指标的心理寄托与价值支点。
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs hover:border-[#4A5D4E]/50 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#EEF3EF] dark:bg-[#1A241C] text-[#4A5D4E] dark:text-[#A3B8A7] flex items-center justify-center mb-4 border border-[#D5E0D7] dark:border-[#29382D]">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold mb-2 text-[#242926] dark:text-[#EDEFEA]">
            2. 信仰形态转变：从“教条化宗派”转向“SBNR 泛灵性探索”
          </h3>
          <p className="text-sm text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
            欧美皮尤研究中心 (Pew Research) 指出，“有灵性但不从属于特定宗教 (Spiritual But Not Religious - SBNR)”的人群已占年轻人口近 35%。在国内，“在上班与上进之间选择上香”、“寺庙咖啡与手串经济”火爆，印证了大众在去除了繁文缛节后的纯净心性寄托渴求。
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs hover:border-[#4A5D4E]/50 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#EEF3EF] dark:bg-[#1A241C] text-[#4A5D4E] dark:text-[#A3B8A7] flex items-center justify-center mb-4 border border-[#D5E0D7] dark:border-[#29382D]">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold mb-2 text-[#242926] dark:text-[#EDEFEA]">
            3. 认知交互跃迁：从“静态经书”到“自适应双向智慧伴侣”
          </h3>
          <p className="text-sm text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
            过去数千年，宗教经典的传授依赖寺院、教堂与经卷，门槛高且互动单向。LLM（大语言模型）的涌现首次实现了对海量正统典籍的深层语义理解。AI 不仅能秒级检索对应经义，更能以温暖有度的人类语言，结合提问者特定的情境（如遭遇裁员或失恋）进行千人千面的心结推演。
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs hover:border-[#4A5D4E]/50 transition-all">
          <div className="w-10 h-10 rounded-xl bg-[#EEF3EF] dark:bg-[#1A241C] text-[#4A5D4E] dark:text-[#A3B8A7] flex items-center justify-center mb-4 border border-[#D5E0D7] dark:border-[#29382D]">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold mb-2 text-[#242926] dark:text-[#EDEFEA]">
            4. 资本与产业蓝海：千亿美元级的“精神与心智经济”
          </h3>
          <p className="text-sm text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
            从估值数十亿美元的天主教祈祷独角兽 Hallow，到 Calm、Headspace 等冥想巨头，再到全球超 7 亿下载的 YouVersion，信仰科技展现出极强的用户黏性与高客单 LTV（生命周期价值）。信徒与精神寻求者的忠诚度远超一般泛娱乐产品，续费率常年维持在 65% 以上。
          </p>
        </div>
      </div>

      {/* Comparative Paradigm Shift */}
      <div className="p-6 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs">
        <h3 className="text-lg font-serif font-bold mb-4 text-[#242926] dark:text-[#EDEFEA] flex items-center gap-2">
          <Globe className="w-5 h-5 text-[#4A5D4E] dark:text-[#D4AF37]" />
          信仰应用的三代演进范式对比
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E5E1D8] dark:border-[#2D3530] text-[#6C736E] dark:text-[#9BA39D]">
                <th className="py-3 px-4 font-semibold">演进阶段</th>
                <th className="py-3 px-4 font-semibold">代表产品形态</th>
                <th className="py-3 px-4 font-semibold">交互方式</th>
                <th className="py-3 px-4 font-semibold">核心痛点 / 局限性</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E1D8] dark:divide-[#2D3530]">
              <tr className="hover:bg-[#FAF8F5] dark:hover:bg-[#181C19]">
                <td className="py-3 px-4 font-medium text-[#242926] dark:text-[#EDEFEA]">
                  1.0 经文数字化时代 (2008-2018)
                </td>
                <td className="py-3 px-4 text-[#6C736E] dark:text-[#9BA39D]">YouVersion, 电子佛经, 圣经阅读器</td>
                <td className="py-3 px-4 text-[#6C736E] dark:text-[#9BA39D]">单向静态阅读、音频朗诵、划线高亮</td>
                <td className="py-3 px-4 text-[#A84848] dark:text-[#E07A7A]">枯燥艰涩，现代人看不懂经书背后的隐喻，无人指点</td>
              </tr>
              <tr className="hover:bg-[#FAF8F5] dark:hover:bg-[#181C19]">
                <td className="py-3 px-4 font-medium text-[#242926] dark:text-[#EDEFEA]">
                  2.0 仪式多媒体与微解压 (2018-2023)
                </td>
                <td className="py-3 px-4 text-[#6C736E] dark:text-[#9BA39D]">Hallow, 电子木鱼, 潮汐冥想, 祈祷日历</td>
                <td className="py-3 px-4 text-[#6C736E] dark:text-[#9BA39D]">点击震动反馈、预录明星名师冥想音频引导</td>
                <td className="py-3 px-4 text-[#A84848] dark:text-[#E07A7A]">要么流于浅表搞笑玩具（木鱼次月流失率&gt;80%），要么内容固定缺乏定制解惑</td>
              </tr>
              <tr className="bg-[#EEF3EF] dark:bg-[#1A241C] font-semibold text-[#242926] dark:text-[#EDEFEA]">
                <td className="py-3 px-4 text-[#354338] dark:text-[#A3B8A7]">
                  3.0 智修伴侣与多模态场域 (当前 & 未来)
                </td>
                <td className="py-3 px-4">灵境智修 (Lumina) 及新一代 Faith+AI</td>
                <td className="py-3 px-4">深层神学经义对齐、双向情境问答、触听全感官仪轨、零知识私密告解</td>
                <td className="py-3 px-4 text-[#4A5D4E] dark:text-[#7B9280]">兼具正统严肃性、现代温度感与长效心智自愈闭环</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
