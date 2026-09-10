import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  FileCheck,
  Download,
  CheckCircle2,
  Clock,
  HelpCircle,
  ExternalLink,
  BookOpen,
  DollarSign,
  Lock,
  Compass,
} from 'lucide-react';

interface LegalQuestion {
  id: string;
  category: '资质与牌照' | '算法与语料' | '数据与隐私' | '商业化红线' | '安全与侵权';
  title: string;
  lawReference: string;
  riskLevel: '重大红线 (Fatal)' | '高度合规风险 (High)' | '常规法律风险 (Medium)';
  coreConcern: string;
  proposedSolution: string;
  actionRequired: string;
  status: 'pending' | 'in_review' | 'cleared';
}

const LEGAL_QUESTIONS: LegalQuestion[] = [
  // 1. 资质与牌照
  {
    id: 'LQ-01',
    category: '资质与牌照',
    title: '是否必须申领《互联网宗教信息服务许可证》？',
    lawReference: '《互联网宗教信息服务管理办法》（五部委令第17号）第二条、第六条',
    riskLevel: '重大红线 (Fatal)',
    coreConcern:
      '平台若向社会公众提供经文讲析、宗教音视频、在线修习交流，是否属于“宗教信息服务”？境内非宗教团体法人能否作为申请主体？',
    proposedSolution:
      '方案A：申请合规牌照——由境内依法设立的法人实体申请，需配置2名以上具有全国宗教事务培训合格证书的信息审核员；\n方案B：产品定位为“中华优秀传统文化与心性觉察哲学工具”（如斯多葛主义、心学、禅修文化），去宗教化宣传，不涉及宗教神职任命与法事活动。',
    actionRequired: '请法务团队与属地省民族和宗教事务厅进行窗口前置咨询，明确工具类内容是否属于豁免监管范畴。',
    status: 'in_review',
  },
  {
    id: 'LQ-02',
    category: '资质与牌照',
    title: '是否需要进行生成式 AI 大模型算法备案与安全评估？',
    lawReference: '《生成式人工智能服务管理暂行办法》第十七条、《互联网信息服务深度合成管理规定》第十九条',
    riskLevel: '重大红线 (Fatal)',
    coreConcern:
      'App 具备向公众提供文本生成（心性解答、经文导读）功能，属于具有舆论属性或社会动员能力的生成式人工智能服务。',
    proposedSolution:
      '必须完成国家网信办“深度合成服务算法备案”和“境内大模型上线安全评估”，底座采用已获中央网信办备案的合规底座模型，自研微调模型需补充专项安全评估报告。',
    actionRequired: '法务协调技术团队准备算法机制机理审核材料、拦截测试用例集（至少2000条敏感提示词测试日志）。',
    status: 'pending',
  },
  {
    id: 'LQ-03',
    category: '资质与牌照',
    title: '禁止在线组织“宗教仪式/开光/祈福法会”等红线界定',
    lawReference: '《宗教事务条例》第四十一条、《互联网宗教信息服务管理办法》第十七条',
    riskLevel: '重大红线 (Fatal)',
    coreConcern:
      '电子木鱼、数字念珠、虚拟焚香是否会被监管部门认定为“擅自开展宗教活动”或“在线进行宗教仪式”？',
    proposedSolution:
      '在 UI 呈现和文案上严格定位为“触觉白噪音互动”、“心率与注意力冥想计时器”，绝不使用“功德转世”、“开光神力”、“代做法事”等封建迷信词汇。',
    actionRequired: '法务出具文案合规负面词库清单，并对全 App 的 UI 文案进行逐字逐句红线走查。',
    status: 'cleared',
  },
  {
    id: 'LQ-04',
    category: '资质与牌照',
    title: '境外宗教组织渗透与跨国神职人员入驻合规边界',
    lawReference: '《中华人民共和国境内部外人员宗教活动管理规定》',
    riskLevel: '重大红线 (Fatal)',
    coreConcern:
      '若后期开放 UGC 社区或真人精神向导认证，是否有境外宗教极端主义或非公认教派渗透传播的法律责任？',
    proposedSolution:
      '现阶段坚决不开放公开无审查的信徒 UGC 广场，仅提供单向私密“人机对话”与“个人修习记录”。若有内容分享，必须经人工先审后发。',
    actionRequired: '明确第一阶段功能范围，在服务条款中严禁跨国传教与未经批准的宗教集会。',
    status: 'cleared',
  },

  // 2. 算法与语料
  {
    id: 'LQ-05',
    category: '算法与语料',
    title: '大模型训练与 RAG 检索典籍的著作权与版本权威性',
    lawReference: '《中华人民共和国著作权法》第二十四条（合理使用边界）',
    riskLevel: '高度合规风险 (High)',
    coreConcern:
      '古代经典（如《金刚经》、《道德经》）属于公有领域，但现代学者的注疏、翻译（如新标点本、现代白话译本）受著作权保护，直接爬取存在侵权索赔风险。',
    proposedSolution:
      '仅使用公版古籍影印整理本，或与宗教古籍整理研究所、正规出版集团签订数字语料正版授权协议；AI 生成内容注明参考底本版本号。',
    actionRequired: '请法务草拟《古籍与数字知识产权授权许可协议模板》，核查现有语料库知识产权来源链条。',
    status: 'in_review',
  },
  {
    id: 'LQ-06',
    category: '算法与语料',
    title: 'AI 阐释教义可能出现的“神学偏见”与“宗教幻觉”法律责任',
    lawReference: '《民法典》第一千零二十四条（名誉权保护）、《生成式人工智能服务管理暂行办法》第四条',
    riskLevel: '高度合规风险 (High)',
    coreConcern:
      '若 AI 给出违背公认教义教规的解读（如曲解戒律、挑起不同宗教/宗派之间的教派冲突），平台需承担何种法律责任？',
    proposedSolution:
      '技术侧引入强 RAG 检索校验；法律侧在《免责声明》中明确“AI 输出仅代表计算机算法之学术与文化研讨视角，不代表任何宗教团体之官方神学裁决”。',
    actionRequired: '审核“AI 局限性与去神化声明”的法律效力，确认免责条款在不同司法管辖区的有效性。',
    status: 'in_review',
  },
  {
    id: 'LQ-07',
    category: '算法与语料',
    title: '涉邪教、异端、封建迷信有害内容的动态鉴别机制',
    lawReference: '《刑法》第三百条、《关于办理组织、利用邪教组织破坏法律实施等刑事案件适用法律若干问题的解释》',
    riskLevel: '重大红线 (Fatal)',
    coreConcern:
      '用户可能输入邪教教条或引导 AI 产生邪教言论，一旦被监管抽检发现，存在吊销执照甚至刑事责任。',
    proposedSolution:
      '集成公安部与宗教局权威邪教黑名单库；对涉邪教输入实行“零容忍”熔断，直接阻断响应并记录审计日志。',
    actionRequired: '由法务协调获取最新的官方鉴别标准与敏感词库，并建立 7x24 小时应急封堵机制。',
    status: 'cleared',
  },
  {
    id: 'LQ-08',
    category: '算法与语料',
    title: 'AI 角色扮演（如模拟“观音菩萨”或“先哲”）的民法名誉侵权与公序良俗审查',
    lawReference: '《民法典》第八条（公序良俗原则）、《反不正当竞争法》',
    riskLevel: '高度合规风险 (High)',
    coreConcern:
      '直接以“神佛上帝”第一人称模拟对话，极易激怒虔诚信徒并被指控“亵渎神圣”，违反公序良俗。',
    proposedSolution:
      '产品宪章明令禁止以“真神降世”视角回应，所有向导统一定位为“博学的经典伴读学者”或“心性镜像助手”，以第三人称引述经文原义。',
    actionRequired: '法务审查系统提示词（System Instructions）的伦理合规性，确保角色扮演不存在法律瑕疵。',
    status: 'cleared',
  },

  // 3. 数据与隐私
  {
    id: 'LQ-09',
    category: '数据与隐私',
    title: '宗教信仰信息的“敏感个人信息”特别保护与单独同意',
    lawReference: '《个人信息保护法》(PIPL) 第二十八条、第二十九条；欧盟 GDPR 第9条 (Special Category Data)',
    riskLevel: '重大红线 (Fatal)',
    coreConcern:
      '宗教信仰属于法定“敏感个人信息”。处理敏感个人信息必须取得个人的“单独同意”（Separate Consent），且具备特定目的与充分必要性。',
    proposedSolution:
      '注册与流派选择时，强制弹出独立的《宗教与哲学取向敏感信息处理同意书》，不得与通用用户协议绑架勾选；支持匿名浏览模式，无需实名即可使用基础冥想功能。',
    actionRequired: '法务拟定符合 PIPL 与 GDPR 规范的《敏感个人信息特别授权协议》，并指导前端交互实现逐项授权。',
    status: 'in_review',
  },
  {
    id: 'LQ-10',
    category: '数据与隐私',
    title: '告解与祷告内容的端到端加密与司法调证合规',
    lawReference: '《网络安全法》、《数据安全法》第二十一条、《刑事诉讼法》',
    riskLevel: '高度合规风险 (High)',
    coreConcern:
      '天主教等传统中“告解圣事”具备绝对神圣保密性。但在法律上，网络平台有配合公安与司法机关调取违法犯罪线索的法定法定义务，二者如何平衡？',
    proposedSolution:
      '产品层采用“阅后即焚”或“客户端本地存储（LocalStorage/IndexedDB）”架构，服务器不落盘保存告解私密原文；在服务协议中明确告知“技术阅后即焚，不保留历史，但禁止利用本平台策划或陈述犯罪行为”。',
    actionRequired: '法务出具《数据存储生命周期与司法协助边界指引》，明确平台在何种情形下有免责及配合义务。',
    status: 'pending',
  },
  {
    id: 'LQ-11',
    category: '数据与隐私',
    title: '海外多地区（如欧美、中东）跨国运营的数据出境安全评估',
    lawReference: '《数据出境安全评估办法》（网信办令第11号）、欧盟 GDPR Chapter V',
    riskLevel: '高度合规风险 (High)',
    coreConcern:
      '若 App 在海外 App Store / Google Play 上架，海外用户的信仰数据传回境内服务器可能构成数据出境违规。',
    proposedSolution:
      '采用多区域云架构（如 AWS/GCP 欧洲区、美洲区与中国境内数据物理隔离），境内外数据库独立部署，互不交叉同步用户个人修习记录。',
    actionRequired: '出具出海合规方案，评估是否需要向网信部门申报数据出境安全评估或签署标准合同。',
    status: 'pending',
  },
  {
    id: 'LQ-12',
    category: '数据与隐私',
    title: '未成年人保护与宗教信息过滤机制',
    lawReference: '《未成年人保护法》第五十六条、《未成年人网络保护条例》',
    riskLevel: '高度合规风险 (High)',
    coreConcern:
      '我国法律严禁向未成年人强加宗教信仰或在学校等场所进行宗教宣传。App 是否需要开启“青少年模式”？',
    proposedSolution:
      '设立实名认证与年龄前置分流；未满 18 周岁用户强制进入“中华优秀传统哲学（心学、诸子百家、专注力科学训练）”专区，关闭纯宗教类修习板块。',
    actionRequired: '法务出具《未成年人合规准入与青少年模式功能规范》，确认技术限制手段符合监管要求。',
    status: 'in_review',
  },

  // 4. 商业化红线
  {
    id: 'LQ-13',
    category: '商业化红线',
    title: '严禁线上设置“功德箱/供灯/买符咒”等宗教募捐与迷信敛财',
    lawReference: '《宗教事务条例》第五十七条、《关于严禁利用互联网从事非法宗教活动的通知》',
    riskLevel: '重大红线 (Fatal)',
    coreConcern:
      '商业机构绝对禁止以宗教名义公开募集资金，严禁借宗教之名大搞商业化运作与敛财。',
    proposedSolution:
      '平台商业模式 100% 采用“软件功能订阅制（SaaS/VIP 高级音效、个性化分析报告）”与“正规文创实体商城（非宗教法物开光）”，严禁开设虚拟功德箱、祈福收费分成。',
    actionRequired: '法务全面审查订阅会员权益说明，严防出现“购买会员可获加持/消灾免难”等违规营销用语。',
    status: 'cleared',
  },
  {
    id: 'LQ-14',
    category: '商业化红线',
    title: '寺庙/道观/教会品牌联合的商业赞助与非营利属性认定',
    lawReference: '《关于处理涉及佛教寺庙、道教宫观管理有关问题的意见》（国宗发〔2012〕41号）',
    riskLevel: '高度合规风险 (High)',
    coreConcern:
      '与著名寺庙或文化基金会合作推广，是否会触犯“严禁借教敛财、严禁寺庙道观被商业资本绑架”的禁令？',
    proposedSolution:
      '仅开展“非遗文化保护数字化公益项目”或“正规文旅景区导览科普合作”，不涉及任何门票分成、法事分成与宗教财务勾连。',
    actionRequired: '法务审定《公益文化合作框架协议》，明确非商业化界限与非排他性条款。',
    status: 'in_review',
  },
  {
    id: 'LQ-15',
    category: '商业化红线',
    title: '数字资产与虚拟灵性藏品（NFT）的金融化衍生风险',
    lawReference: '中国互联网金融协会等三协会《关于防范NFT相关金融风险的倡议》',
    riskLevel: '重大红线 (Fatal)',
    coreConcern:
      '若将电子符咒、心经手抄本做成可转让的区块链数字藏品，存在严重的炒作与非法集资连带法律风险。',
    proposedSolution:
      '平台坚决不发行任何具备二级市场流通属性的 Token 或 NFT 藏品，仅作为用户个人的修习结行成就徽章（纯本地图形化展示）。',
    actionRequired: '在 PRD 中封死数字资产金融化入口，法务对产品内激励体系进行防范非法金融审查。',
    status: 'cleared',
  },

  // 5. 安全与侵权
  {
    id: 'LQ-16',
    category: '安全与侵权',
    title: '自杀自残、严重精神疾患与宗教心理咨询的法律免责边界',
    lawReference: '《精神卫生法》第二十三条、第七十六条（心理咨询人员不得从事心理治疗）',
    riskLevel: '重大红线 (Fatal)',
    coreConcern:
      '处于急性精神心理危机的信徒向 AI 倾诉，若因 AI 疏导不当发生自残自杀极端恶性事件，平台是否面临过失致人死亡或侵权损害赔偿诉讼？',
    proposedSolution:
      '① 协议明示：AI 仅为哲学与修习文化陪伴，绝不属于心理治疗或精神医学诊疗；\n② 强干预弹窗：一旦触发危机关键词，强行置顶“全国免费心理援助热线 400-161-9995 及 120/110”强提醒。',
    actionRequired: '法务审定《危机干预免责声明》及自杀干预弹窗流程的完整法律链条，确保尽到法定合理注意义务。',
    status: 'in_review',
  },
  {
    id: 'LQ-17',
    category: '安全与侵权',
    title: '宗教经典阐释引起的信徒侮辱诽谤与民事侵权纠纷防范',
    lawReference: '《民法典》第一千零二十四条、《刑法》第二百五十条（出版歧视、侮辱少数民族作品罪）',
    riskLevel: '高度合规风险 (High)',
    coreConcern:
      '不同宗教之间存在复杂的教义争端（如关于一神论与多神论、因果轮回与原罪救赎）。若 AI 在跨流派解答时评判某流派“优于”另一流派，易引发群体性民事诉讼。',
    proposedSolution:
      '系统 Prompt 写入“跨信仰谦逊与客观引述原则”，严禁 AI 对不同信仰进行价值位阶的高低评判，遇到争议性教理严格并列表达各方观点。',
    actionRequired: '法务参与制定“跨信仰对话防侵权规则手册”，并对测试用例进行对抗性攻击走查。',
    status: 'cleared',
  },
  {
    id: 'LQ-18',
    category: '安全与侵权',
    title: '用户上传祈祷词与发愿文的平台内容审查法定注意义务',
    lawReference: '《网络信息内容生态治理规定》第六条、第七条',
    riskLevel: '高度合规风险 (High)',
    coreConcern:
      '用户在祈愿或发愿中发布诅咒他人、涉政谣言、恐怖主义言论或侵犯他人隐私（如“愿某某考试落榜/生病”）。',
    proposedSolution:
      '部署文本实时安全审查机制；严禁任何带有攻击性、诅咒性、涉暴力的内容进入系统；发愿文仅个人可见，不提供公开广播。',
    actionRequired: '确立“避风港原则”与“红旗标准”适用的技术措施，建立违法信息即时删除与上报流程。',
    status: 'cleared',
  },
  {
    id: 'LQ-19',
    category: '安全与侵权',
    title: '商标注册类别选择与“宗教相关词汇”审查驳回风险',
    lawReference: '《商标法》第十条第一款第（八）项（有害于社会主义道德风尚或者有其他不良影响的）',
    riskLevel: '常规法律风险 (Medium)',
    coreConcern:
      '“灵境”、“智修”、“禅”、“佛”等带有明显宗教色彩的词汇，在申请第9类（计算机软件）、第41类（文化教育）、第42类（技术服务）商标时极易被国家商标局以“不良影响”驳回。',
    proposedSolution:
      '组合“现代科技+通用哲学”中性词汇进行商标防御布局（如“Lumina Mind”、“智修境”）；尽早由专业知识产权代理机构出具驳回复审预案。',
    actionRequired: '知识产权律师出具商标检索报告与全品类申请防御方案。',
    status: 'in_review',
  },
  {
    id: 'LQ-20',
    category: '安全与侵权',
    title: '用户在冥想音频中发生身心解离（如走火入魔/惊厥）的侵权免责',
    lawReference: '《民法典》第一千一百九十八条（安全保障义务）',
    riskLevel: '常规法律风险 (Medium)',
    coreConcern:
      '部分初学者在未受导师指导下强行进行高难度内观或长时间屏息，可能诱发惊恐发作或躯体化反应，指责 App 音频存在误导。',
    proposedSolution:
      '呼吸与冥想详情页明确“修习安全提示”：如有癫痫、严重心脏病或精神分裂症病史者，请在专业医师指导下进行；一旦出现头晕心悸，请立即停止。',
    actionRequired: '法务审查交互界面的“健康告知与知情同意书”，确认已充分履行安全保障告知义务。',
    status: 'cleared',
  },
];

export const LegalComplianceAudit: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>('LQ-01');
  const [questions, setQuestions] = useState<LegalQuestion[]>(LEGAL_QUESTIONS);

  const categories = ['all', '资质与牌照', '算法与语料', '数据与隐私', '商业化红线', '安全与侵权'];

  const filteredQuestions = questions.filter((q) => {
    const matchCat = selectedCategory === 'all' || q.category === selectedCategory;
    const matchStatus = filterStatus === 'all' || q.status === filterStatus;
    return matchCat && matchStatus;
  });

  const toggleStatus = (id: string, newStatus: 'pending' | 'in_review' | 'cleared') => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );
  };

  const handleExportChecklist = () => {
    const content = questions
      .map(
        (q) =>
          `【${q.id}】[${q.category}] ${q.title}\n风险等级: ${q.riskLevel}\n法律依据: ${q.lawReference}\n审查现状: ${
            q.status === 'cleared'
              ? '已通过法律审查'
              : q.status === 'in_review'
              ? '法务审核论证中'
              : '待法务专项确认'
          }\n核心关切:\n${q.coreConcern}\n建议方案:\n${q.proposedSolution}\n法务行动项:\n${q.actionRequired}\n${'='.repeat(50)}\n`
      )
      .join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Lumina_信仰与AI项目法务确认清单_${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearedCount = questions.filter((q) => q.status === 'cleared').length;
  const inReviewCount = questions.filter((q) => q.status === 'in_review').length;
  const pendingCount = questions.filter((q) => q.status === 'pending').length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Overview Banner */}
      <div className="bg-gradient-to-br from-[#2D3830] via-[#1E2620] to-[#151917] rounded-3xl p-6 sm:p-8 text-[#EDEFEA] shadow-md border border-[#4A5D4E]/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif font-bold">
              <Scale className="w-3.5 h-3.5" />
              <span>专项法务合规备忘录 · Legal & Regulatory Compliance Dossier</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
              细化合规实施路径与法务确认问题清单
            </h1>
            <p className="text-sm text-[#B4BCB6] leading-relaxed">
              在信仰与人工智能融合领域，“合规是生死的基石”。本备忘录梳理了境内外关于互联网宗教信息、大模型生成服务、敏感个人隐私、反商业敛财与生命安全的五大合规路径，并输出
              20 项需要法务团队逐一确认签发的核心问题清单。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0">
            <div className="grid grid-cols-3 gap-2 bg-[#111412]/70 p-3 rounded-2xl border border-white/10 text-center">
              <div>
                <div className="text-xs text-[#9BA39D]">待确认</div>
                <div className="text-lg font-bold text-amber-400">{pendingCount}</div>
              </div>
              <div>
                <div className="text-xs text-[#9BA39D]">论证中</div>
                <div className="text-lg font-bold text-blue-400">{inReviewCount}</div>
              </div>
              <div>
                <div className="text-xs text-[#9BA39D]">已过审</div>
                <div className="text-lg font-bold text-emerald-400">{clearedCount}</div>
              </div>
            </div>

            <button
              onClick={handleExportChecklist}
              className="px-4 py-2.5 rounded-xl bg-[#D4AF37] text-[#1E2620] font-serif font-bold text-xs hover:bg-[#E5C358] transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>导出完整法务清查文本</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Compliance Pathways */}
      <div className="space-y-4">
        <h2 className="text-lg font-serif font-bold text-[#242926] dark:text-[#EDEFEA] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#4A5D4E] dark:text-[#D4AF37]" />
          <span>Lumina 信仰与 AI 五大核心合规路径全景</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#FFFFFF] dark:bg-[#1D221F] p-5 rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#242926] dark:text-[#EDEFEA]">
              1. 宗教资质与业务定位分流路径
            </h3>
            <p className="text-xs text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
              中国境内推行“双轨制”：若面向大众提供公开经义讲析，严格申请五部委《互联网宗教信息服务许可证》；在产品冷启动期，以“斯多葛主义与传统东方修心哲学”切入，不触碰线上开光、受洗与法事活动。
            </p>
          </div>

          <div className="bg-[#FFFFFF] dark:bg-[#1D221F] p-5 rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#242926] dark:text-[#EDEFEA]">
              2. 敏感数据单独授权与阅后即焚
            </h3>
            <p className="text-xs text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
              严格遵循《个人信息保护法》与 GDPR 第9条“特殊类别数据”标准：宗教信仰偏好必须提供“单独同意”弹窗；告解、忏悔与隐秘发愿内容实行客户端私钥加密与阅后即焚，不落盘服务器。
            </p>
          </div>

          <div className="bg-[#FFFFFF] dark:bg-[#1D221F] p-5 rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-bold text-sm text-[#242926] dark:text-[#EDEFEA]">
              3. 商业模式与反敛财红线隔离
            </h3>
            <p className="text-xs text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
              彻底切断“宗教商业化”。严禁开设虚拟功德箱、线上买香供灯分成等诱导迷信消费模式；100% 采取透明软件工具订阅制（SaaS/PRO）与正规文创周边销售，与宗教教产与善款完全解耦。
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FFFFFF] dark:bg-[#1D221F] p-4 rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-serif font-bold text-[#6C736E] dark:text-[#9BA39D] mr-1">
            维度筛选:
          </span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-serif transition-all ${
                selectedCategory === c
                  ? 'bg-[#4A5D4E] text-white font-bold'
                  : 'bg-[#FAF8F5] dark:bg-[#181C19] text-[#6C736E] dark:text-[#9BA39D] hover:bg-[#EFECE6] dark:hover:bg-[#252C27]'
              }`}
            >
              {c === 'all' ? '全部维度' : c}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-serif font-bold text-[#6C736E] dark:text-[#9BA39D]">
            审查进度:
          </span>
          {[
            { id: 'all', label: '全部' },
            { id: 'pending', label: '待确认' },
            { id: 'in_review', label: '论证中' },
            { id: 'cleared', label: '已过审' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setFilterStatus(s.id)}
              className={`px-2.5 py-1 rounded-lg text-xs transition-all ${
                filterStatus === s.id
                  ? 'bg-[#242926] dark:bg-[#EDEFEA] text-white dark:text-[#242926] font-bold'
                  : 'text-[#6C736E] dark:text-[#9BA39D] hover:bg-[#FAF8F5] dark:hover:bg-[#181C19]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* 20 Legal Questions List */}
      <div className="space-y-3">
        <div className="text-xs font-serif text-[#6C736E] dark:text-[#9BA39D] px-1">
          共收录 {filteredQuestions.length} 项法务确认议题（点击议题卡片可展开深度法律论据与行动指引）：
        </div>

        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;
          return (
            <div
              key={q.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-[#FFFFFF] dark:bg-[#1E2420] border-[#4A5D4E] dark:border-[#D4AF37]/50 shadow-md'
                  : 'bg-[#FFFFFF] dark:bg-[#1A1E1C] border-[#E5E1D8] dark:border-[#2D3530] hover:border-[#9BA39D]'
              }`}
            >
              {/* Header row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-3">
                  <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-[#FAF8F5] dark:bg-[#262E29] text-[#4A5D4E] dark:text-[#D4AF37] border border-[#E5E1D8] dark:border-[#354039]">
                    {q.id}
                  </span>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#FAF8F5] dark:bg-[#222824] text-[#6C736E] dark:text-[#9BA39D]">
                        {q.category}
                      </span>
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-md font-bold ${
                          q.riskLevel.includes('Fatal')
                            ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300'
                            : q.riskLevel.includes('High')
                            ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300'
                            : 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300'
                        }`}
                      >
                        {q.riskLevel}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-[#242926] dark:text-[#EDEFEA]">
                      {q.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-serif font-bold ${
                      q.status === 'cleared'
                        ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300'
                        : q.status === 'in_review'
                        ? 'bg-blue-100 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300'
                        : 'bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-300'
                    }`}
                  >
                    {q.status === 'cleared' ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>已过审</span>
                      </>
                    ) : q.status === 'in_review' ? (
                      <>
                        <Clock className="w-3.5 h-3.5" />
                        <span>论证中</span>
                      </>
                    ) : (
                      <>
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>待确认</span>
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[#EFECE6] dark:border-[#28302A] space-y-4 text-xs">
                  <div className="bg-[#FAF8F5] dark:bg-[#161A18] p-3 rounded-xl border border-[#E5E1D8] dark:border-[#28302A]">
                    <span className="font-bold text-[#4A5D4E] dark:text-[#D4AF37]">
                      相关法规与国家标准：
                    </span>
                    <span className="text-[#6C736E] dark:text-[#9BA39D] ml-2">
                      {q.lawReference}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5 bg-[#FFF] dark:bg-[#1C211E] p-3.5 rounded-xl border border-[#E5E1D8] dark:border-[#2D3530]">
                      <div className="font-serif font-bold text-[#242926] dark:text-[#EDEFEA] flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>核心法律关切与合规疑点：</span>
                      </div>
                      <p className="text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
                        {q.coreConcern}
                      </p>
                    </div>

                    <div className="space-y-1.5 bg-[#FFF] dark:bg-[#1C211E] p-3.5 rounded-xl border border-[#E5E1D8] dark:border-[#2D3530]">
                      <div className="font-serif font-bold text-[#242926] dark:text-[#EDEFEA] flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>产品业务拟定应对方案：</span>
                      </div>
                      <p className="text-[#6C736E] dark:text-[#9BA39D] whitespace-pre-line leading-relaxed">
                        {q.proposedSolution}
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#FAF8F5] dark:bg-[#181C19] p-3.5 rounded-xl border border-[#E5E1D8] dark:border-[#28302A] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="font-bold text-[#242926] dark:text-[#EDEFEA]">
                        法务部门专项行动要求：
                      </span>
                      <p className="text-[#6C736E] dark:text-[#9BA39D]">
                        {q.actionRequired}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[11px] text-[#6C736E] dark:text-[#9BA39D] mr-1">
                        标记状态:
                      </span>
                      {(['pending', 'in_review', 'cleared'] as const).map((st) => (
                        <button
                          key={st}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStatus(q.id, st);
                          }}
                          className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all ${
                            q.status === st
                              ? 'bg-[#4A5D4E] text-white font-bold'
                              : 'bg-[#EFECE6] dark:bg-[#252C28] text-[#6C736E] dark:text-[#9BA39D] hover:bg-[#E5E1D8]'
                          }`}
                        >
                          {st === 'cleared' ? '通过' : st === 'in_review' ? '论证' : '待办'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
