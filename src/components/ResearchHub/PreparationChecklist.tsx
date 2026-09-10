import React, { useState } from 'react';
import { ShieldCheck, BookOpen, AlertTriangle, Lock, Layers, Activity, Check } from 'lucide-react';

interface PrepItem {
  id: string;
  category: string;
  title: string;
  icon: React.ElementType;
  color: string;
  criticalLevel: '红线底线 (Fatal)' | '核心壁垒 (Core Moat)' | '体验基石 (Foundation)';
  description: string;
  actionItems: string[];
  riskIfIgnored: string;
}

const PREPARATION_ITEMS: PrepItem[] = [
  {
    id: 'theology',
    category: '数据与教义',
    title: '1. 语料清洗与正统教义对齐工程 (Theological Alignment)',
    icon: BookOpen,
    color: 'text-amber-600 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400',
    criticalLevel: '核心壁垒 (Core Moat)',
    description:
      '通用大模型直接用于宗教解答会产生严重的“宗教幻觉”，甚至将外道附会、异端邪说当作正统经义输出。必须在底层建立权威典籍知识库。',
    actionItems: [
      '采购与数字化公认权威大藏经、中华道藏、正统公认圣经译本、斯多葛原著。',
      '聘请资深宗教学者、受戒法师与神学博士组建专家顾问委员会，构建数万条高精细度的神学 Q&A 评估集。',
      '运用 RAG (检索增强生成) 强制大模型在回答时“必须引用原典卷帙章句”，严禁凭空捏造。',
    ],
    riskIfIgnored: '导致信徒群体剧烈声讨、宗教团体投诉，引发严重的公关危机与信誉崩塌。',
  },
  {
    id: 'ethics',
    category: '伦理与宪章',
    title: '2. 去神化宪章与自谦边界 (Zero-Deification Protocol)',
    icon: ShieldCheck,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-950/60 dark:text-blue-400',
    criticalLevel: '红线底线 (Fatal)',
    description:
      '明确界定科技与神圣信仰的界限。AI 绝非神灵，不可假托神明之口进行宣判或颁布神谕。',
    actionItems: [
      '在产品所有界面的显著位置与服务协议中，声明 AI 为“数字智慧向导与心性明镜”，绝非活佛、先知或神职人员。',
      '系统 Prompt 写入硬性系统级负向约束：严禁以“吾乃耶和华”、“贫僧即是佛”等假托口气自居。',
      '绝对禁止模拟具有法理效应的宗教仪式（如线上代行受洗、代行天主教神圣告解赦罪、开光法事）。',
    ],
    riskIfIgnored: '触犯宗教大忌（偶像崇拜、假先知罪），招致主流正统宗教界的严厉封杀。',
  },
  {
    id: 'crisis',
    category: '安全与法务',
    title: '3. 心理危机检测与生命安全熔断网络',
    icon: AlertTriangle,
    color: 'text-rose-600 bg-rose-100 dark:bg-rose-950/60 dark:text-rose-400',
    criticalLevel: '红线底线 (Fatal)',
    description:
      '信仰类 App 极易吸引处于重度抑郁、绝望甚至产生轻生念头的边缘人群。若 AI 给出虚无主义或错误引导，将直接危及生命。',
    actionItems: [
      '部署本地双层情感极化分类器与关键词雷达（检测自残、自杀、重度幻觉、厌世倾向）。',
      '一旦触发危险阈值，系统立即熔断常规对话，进入【生命守护模式】，停止输出虚无出世言论。',
      '界面强制置顶全国心理危机干预热线（400-161-9995）与一键直拨紧急联络人功能。',
    ],
    riskIfIgnored: '可能导致极端人身安全悲剧，面临吊销运营资质与刑事民事法律追责。',
  },
  {
    id: 'privacy',
    category: '隐私与安全',
    title: '4. 零知识神圣告解与匿名数据架构 (Zero-Knowledge Privacy)',
    icon: Lock,
    color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-400',
    criticalLevel: '核心壁垒 (Core Moat)',
    description:
      '信徒在告解与倾诉时吐露的是内心最深沉的罪疚、秘密与恐惧，隐私敏感度远超一般社交聊天。',
    actionItems: [
      '端到端非对称加密（E2EE），用户账号与告解文本物理隔离存储。',
      '“阅后即焚”机制：告解仪式结束后，本地存储与内存向量立即执行不可逆擦除覆写。',
      '坚决承诺并由独立第三方代码审计：绝不用用户的私密忏悔数据来预训练通用商业模型。',
    ],
    riskIfIgnored: '数据泄漏会导致不可挽回的用户精神创伤，毁灭产品生存根基。',
  },
  {
    id: 'multimodal',
    category: '交互与硬件',
    title: '5. 多模态触听感官仪轨工程 (Embodied Ritual Tech)',
    icon: Activity,
    color: 'text-violet-600 bg-violet-100 dark:bg-violet-950/60 dark:text-violet-400',
    criticalLevel: '体验基石 (Foundation)',
    description:
      '宗教神圣感的很大一部分来自“身心合一的仪式身体感知”。纯打字聊天无法调动多巴胺与副交感神经。',
    actionItems: [
      '基于 Web Audio API 与高品质声学采样，构建 432Hz 颂钵谐波、青铜钟鸣与原木敲击声景。',
      '调用移动端线性震动马达，定制“微动珠串阻尼感”与“木鱼硬实敲击回弹波形”。',
      '结合屏幕粒子与呼吸光轮，实现“眼观微光、耳听梵音、指触震颤、意随息转”的全感官沉浸。',
    ],
    riskIfIgnored: '产品沦为枯燥的 Chatbot 套壳，无法提供沉浸式修习体验，用户黏性与留存断崖式下跌。',
  },
  {
    id: 'decoupling',
    category: '架构与包容',
    title: '6. 跨哲学宗派解耦与尊重机制',
    icon: Layers,
    color: 'text-stone-600 bg-stone-100 dark:bg-stone-800 dark:text-stone-300',
    criticalLevel: '核心壁垒 (Core Moat)',
    description:
      '不同信仰传统之间存在神学教规差异。必须保证各专区的纯粹性，避免不同背景用户的冒犯与冲突。',
    actionItems: [
      '设计清晰的流派专区隔离（佛学禅宗、道家清静、基督灵粮、斯多葛理性），用户可自主选择专属模式。',
      '针对虔诚信徒提供【单一信仰专心模式】，隐藏非本教符号；针对泛灵性人群提供【通识包容模式】。',
      '界面视觉调色盘、图标符号与语料提示词根据流派独立动态渲染，互不串扰。',
    ],
    riskIfIgnored: '引发跨宗派信徒之间的教规纷争与差评抗议，丧失主流群体信赖。',
  },
];

export const PreparationChecklist: React.FC = () => {
  const [completedItems, setCompletedItems] = useState<Record<string, boolean>>({
    theology: true,
    ethics: true,
    crisis: true,
    privacy: true,
    multimodal: true,
    decoupling: true,
  });

  const toggleCheck = (id: string) => {
    setCompletedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
          “信仰+AI”创新应用落地实施的六大前置准备清单
        </h2>
        <p className="text-sm text-[#6C736E] dark:text-[#9BA39D] mt-1">
          在写下第一行业务代码前，必须建立的安全伦理防护网、权威教义工程与多模态体验壁垒。
        </p>
      </div>

      <div className="space-y-6">
        {PREPARATION_ITEMS.map((item) => {
          const Icon = item.icon;
          const isDone = completedItems[item.id];

          return (
            <div
              key={item.id}
              className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-6 shadow-xs transition-shadow"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF3EF] dark:bg-[#1A241C] text-[#4A5D4E] dark:text-[#A3B8A7] flex items-center justify-center border border-[#D5E0D7] dark:border-[#29382D]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
                      {item.title}
                    </h3>
                    <span className="text-xs text-[#6C736E] dark:text-[#9BA39D]">
                      所属领域：{item.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium border ${
                      item.criticalLevel.includes('Fatal')
                        ? 'bg-[#FAF8F5] dark:bg-[#181C19] text-[#A84848] dark:text-[#E07A7A] border-[#E5E1D8] dark:border-[#2D3530]'
                        : 'bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border-[#D5E0D7] dark:border-[#29382D]'
                    }`}
                  >
                    {item.criticalLevel}
                  </span>
                  <button
                    onClick={() => toggleCheck(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                      isDone
                        ? 'bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border-[#D5E0D7] dark:border-[#29382D]'
                        : 'bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D] border-[#E5E1D8] dark:border-[#2D3530]'
                    }`}
                  >
                    <Check className={`w-3.5 h-3.5 ${isDone ? 'opacity-100 text-[#4A5D4E]' : 'opacity-40'}`} />
                    {isDone ? 'Lumina方案已齐备' : '标记待准备'}
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#6C736E] dark:text-[#9BA39D] leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="bg-[#FAF8F5] dark:bg-[#181C19] rounded-xl p-4 border border-[#E5E1D8] dark:border-[#2D3530] mb-3">
                <h4 className="text-xs font-bold text-[#354338] dark:text-[#A3B8A7] uppercase tracking-wider mb-2">
                  落地准备动作清单 (Execution Action Items)：
                </h4>
                <ul className="space-y-1.5">
                  {item.actionItems.map((act, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-[#242926] dark:text-[#EDEFEA] flex items-start gap-2 leading-relaxed"
                    >
                      <span className="text-[#D4AF37] font-bold">•</span>
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-[#A84848] dark:text-[#E07A7A] flex items-center gap-1.5 font-medium">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>若未准备充分的灾难性后果：{item.riskIfIgnored}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
