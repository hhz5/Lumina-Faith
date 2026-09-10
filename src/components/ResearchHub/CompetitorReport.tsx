import React from 'react';
import { Award, Shield, Cpu, Sparkles, Check, Minus } from 'lucide-react';

export const CompetitorReport: React.FC = () => {
  const dimensions = [
    { name: '正统经义权威深度', desc: '是否经得起严谨神学/经典训诂考验，杜绝外道虚妄' },
    { name: 'AI双向共情对话', desc: '能否就现代人生现实痛点进行个性化启发推演' },
    { name: '仪式身心多模态感知', desc: '声学触觉震动结合，是否具备神圣场域沉浸感' },
    { name: '跨文化/跨哲学包容度', desc: '是否打破单一教派门阀，允许开放多元灵性觉照' },
    { name: '隐私零知识安全保障', desc: '告解与私密心事是否物理隔离、端侧阅后即焚' },
    { name: '现代克制雅致审美', desc: '去陈腐说教感，符合当代年轻高知审美的视觉设计' },
  ];

  const competitors = [
    {
      name: '传统经文类 (YouVersion)',
      scores: ['极高 (权威全覆盖)', '极弱 (无情境推演)', '弱 (仅简单音频)', '单一流派 (基督教)', '一般 (有账号留存)', '传统实用风'],
      moat: '拥有海量用户基础与译本版权，但产品形态被束缚在传统阅听框框内。',
    },
    {
      name: '明星音频类 (Hallow)',
      scores: ['高 (天主教大公公认)', '无 (纯单向预录)', '极高 (明星原声+圣咏)', '极端保守 (仅天主教)', '一般 (商业化收集)', '奢华庄严'],
      moat: '声学制作极具标杆意义，但年费门槛高昂且缺乏双向AI交互。',
    },
    {
      name: '赛博解压类 (电子木鱼)',
      scores: ['无 (恶搞玩梗)', '无', '中等 (单调敲击震动)', '泛东方 (仅符号)', '无隐私概念', '极简/像素风'],
      moat: '极短病毒式裂变，但留存雪崩，缺乏任何精神内涵与复购价值。',
    },
    {
      name: '初阶AI角色类 (TextWithJesus)',
      scores: ['低 (严重幻觉争议)', '一般 (纯打字Chatbot)', '无 (无多模态)', '单一流派 (圣经角色)', '差 (公网API透传)', '简陋社交气泡'],
      moat: '噱头大于实质，因自居神灵形象受到主流教会强烈抵制。',
    },
    {
      name: '灵境智修 (Lumina 创新项目)',
      isTarget: true,
      scores: [
        '极高 (专家级RAG对齐)',
        '卓越 (Gemini 3.8 Flash双向共情)',
        '全感官 (432Hz颂钵+阻尼念珠+呼吸环)',
        '极高 (佛/道/基督/斯多葛解耦)',
        '军工级 (零知识阅后即焚)',
        '空灵东方极简',
      ],
      moat: '以“严谨教义对齐 + 全感官身心仪轨 + 零知识隐私神圣告解”构筑无法轻易抄袭的综合护城河。',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
          针对性市场竞品分析对比报告与破局护城河
        </h2>
        <p className="text-sm text-[#6C736E] dark:text-[#9BA39D] mt-1">
          六大核心维度全面对标，透视传统竞品结构性缺陷，确立“灵境智修”蓝海破局战略。
        </p>
      </div>

      {/* Cross Comparison Table */}
      <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] overflow-hidden shadow-xs">
        <div className="p-6 border-b border-[#E5E1D8] dark:border-[#2D3530]">
          <h3 className="font-serif font-bold text-lg text-[#242926] dark:text-[#EDEFEA]">
            六大核心维度竞品能力横向测评矩阵
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-[#E5E1D8] dark:border-[#2D3530] bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D]">
                <th className="py-3.5 px-4 font-semibold min-w-[160px]">竞争产品阵营</th>
                {dimensions.map((dim, idx) => (
                  <th key={idx} className="py-3.5 px-4 font-semibold min-w-[130px]">
                    <div>{dim.name}</div>
                    <div className="text-[10px] text-[#6C736E] dark:text-[#9BA39D] font-normal">{dim.desc}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E1D8] dark:divide-[#2D3530]">
              {competitors.map((comp, cIdx) => (
                <tr
                  key={cIdx}
                  className={`transition-colors ${
                    comp.isTarget
                      ? 'bg-[#EEF3EF] dark:bg-[#1A241C] font-semibold text-[#242926] dark:text-[#EDEFEA]'
                      : 'hover:bg-[#FAF8F5] dark:hover:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D]'
                  }`}
                >
                  <td className="py-4 px-4 font-serif">
                    <div className="flex items-center gap-1.5">
                      {comp.isTarget && <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0" />}
                      <span className={comp.isTarget ? 'text-[#354338] dark:text-[#A3B8A7] font-bold' : ''}>
                        {comp.name}
                      </span>
                    </div>
                  </td>
                  {comp.scores.map((score, sIdx) => (
                    <td key={sIdx} className="py-4 px-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-xl text-xs border ${
                          comp.isTarget
                            ? 'bg-[#FFFFFF] dark:bg-[#222B24] text-[#354338] dark:text-[#A3B8A7] border-[#D5E0D7] dark:border-[#29382D] font-medium shadow-2xs'
                            : 'bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D] border-[#E5E1D8] dark:border-[#2D3530]'
                        }`}
                      >
                        {score}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4 Defensible Moats */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-[#242926] dark:text-[#EDEFEA] flex items-center gap-2">
          <Award className="w-5 h-5 text-[#D4AF37]" />
          “灵境智修 (Lumina)”的四大核心破局壁垒 (Defensible Moats)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs hover:border-[#4A5D4E]/50 transition-all">
            <div className="flex items-center gap-2 mb-2 text-[#354338] dark:text-[#A3B8A7] font-bold text-sm">
              <Shield className="w-4 h-4 text-[#4A5D4E] dark:text-[#D4AF37]" />
              1. 数据资产壁垒：万卷正统典籍与专家级对齐训诂库
            </div>
            <p className="text-xs sm:text-sm text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
              竞品依靠通用Prompt调用开源大模型，极易发生神学常识错误与信口雌黄。Lumina 拥有数万小时专家精校的神学语料与RAG经义引证引擎，彻底消除“宗教幻觉”，建立了正统神学界的准入门槛。
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs hover:border-[#4A5D4E]/50 transition-all">
            <div className="flex items-center gap-2 mb-2 text-[#354338] dark:text-[#A3B8A7] font-bold text-sm">
              <Cpu className="w-4 h-4 text-[#4A5D4E] dark:text-[#D4AF37]" />
              2. 体验感知壁垒：多模态触听一体的身心沉浸场域
            </div>
            <p className="text-xs sm:text-sm text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
              摆脱干瘪冷漠的“文字输入框”，将 432Hz 颂钵泛音长震、沉木木鱼真实谐波、仿生念珠触觉阻尼与呼吸相干光轮高度有机融合，让用户指尖触动即可快速调节副交感神经，身心合一。
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs hover:border-[#4A5D4E]/50 transition-all">
            <div className="flex items-center gap-2 mb-2 text-[#354338] dark:text-[#A3B8A7] font-bold text-sm">
              <Check className="w-4 h-4 text-[#4A5D4E] dark:text-[#D4AF37]" />
              3. 伦理与品牌壁垒：去神化宪章与零知识私密告解
            </div>
            <p className="text-xs sm:text-sm text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
              坚守“AI为镜而非神”的谦卑界限，彻底杜绝宗教界反弹；对用户告解内容实行物理级“阅后即焚”，建立起金钱无法买到的深层信任资产，成为当代人最放心的精神避风港。
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs hover:border-[#4A5D4E]/50 transition-all">
            <div className="flex items-center gap-2 mb-2 text-[#354338] dark:text-[#A3B8A7] font-bold text-sm">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              4. 跨生态包容壁垒：模块化解耦与普适心性自愈
            </div>
            <p className="text-xs sm:text-sm text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
              既满足传统单一信仰者虔诚专修的需求，又极大包容了占全球年轻一代 35% 以上的 SBNR 泛灵性人群。用户自由穿梭于佛、道、基督与斯多葛智慧之间，形成高黏性的长效心性修习闭环。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
