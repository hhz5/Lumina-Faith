import React, { useState } from 'react';
import { Palette, Smartphone, Eye, Sparkles, Layout, Shield, Volume2, ArrowRight } from 'lucide-react';

interface UiDesignSpecsProps {
  onSwitchToLiveApp?: () => void;
}

export const UiDesignSpecs: React.FC<UiDesignSpecsProps> = ({ onSwitchToLiveApp }) => {
  const [activeScreenTab, setActiveScreenTab] = useState<'sanctuary' | 'chat' | 'ritual' | 'scripture' | 'confession'>('sanctuary');

  const colorTokens = [
    { name: '苍松翠绿 (Forest Green)', hex: '#4A5D4E', token: 'bento-green', usage: '核心主题色、主导航与操作激活态' },
    { name: '暖宣米白 (Parchment Cream)', hex: '#FAF8F5', token: 'bento-bg', usage: '日间温润素雅底色、护眼呼吸留白' },
    { name: '琉璃金 (Refined Gold)', hex: '#D4AF37', token: 'bento-gold', usage: '经典高光、勋章标识与智慧光晕' },
    { name: '玄水墨灰 (Charcoal Onyx)', hex: '#242926', token: 'bento-dark', usage: '深色模式底色与高阶阅读对比文字' },
    { name: '素练绢灰 (Muted Border)', hex: '#E5E1D8', token: 'bento-border', usage: '便当盒网格微边框、精细模块分隔' },
    { name: '洗心朱砂 (Catharsis Rose)', hex: '#A84848', token: 'bento-rose', usage: '清净告解释怀、内省警示与自律' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#242926] dark:text-[#EDEFEA]">
          详细 UI/UX 设计规范与核心界面蓝图
        </h2>
        <p className="text-sm text-[#6C736E] dark:text-[#9BA39D] mt-1">
          遵循“Bento Grid 便当盒精细网格、素净雅致、空灵内敛、无界光晕”设计语言，兼顾东方禅意与现代高知极简美学。
        </p>
      </div>

      {/* Design System & Core Principles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs">
          <div className="flex items-center gap-2 text-[#4A5D4E] dark:text-[#D4AF37] font-serif font-bold text-base mb-2">
            <Palette className="w-4 h-4" />
            1. 色彩与便当盒网格哲学
          </div>
          <p className="text-xs sm:text-sm text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
            严禁廉价的高饱和紫蓝渐变与刺眼霓虹。采用 Bento Grid 结构化留白，以苍松绿 (#4A5D4E) 与琉璃金 (#D4AF37) 为核，背景对比度严格控制在舒适范围，营造“古刹微光、心神宁静”的视觉体感。
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs">
          <div className="flex items-center gap-2 text-[#4A5D4E] dark:text-[#D4AF37] font-serif font-bold text-base mb-2">
            <Layout className="w-4 h-4" />
            2. 排版与留白节律
          </div>
          <p className="text-xs sm:text-sm text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
            标题采用典雅衬线宋体 Cinzel / Noto Serif SC；正文字体采用高可读无衬线体 Plus Jakarta Sans，行高设定为 1.6–1.7，容器外边距大于内边距，赋予用户呼吸感与阅读留白。
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs">
          <div className="flex items-center gap-2 text-[#4A5D4E] dark:text-[#D4AF37] font-serif font-bold text-base mb-2">
            <Volume2 className="w-4 h-4" />
            3. 多模态触听共振
          </div>
          <p className="text-xs sm:text-sm text-[#6C736E] dark:text-[#9BA39D] leading-relaxed">
            UI 微交互均配备 432Hz 声学泛音与毫秒级微动阻尼。敲击木鱼伴随涟漪扩散与回向文字上浮，转动念珠伴随珠串轻擦声，告解文字化风散去。
          </p>
        </div>
      </div>

      {/* Color Tokens Palette */}
      <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-6 shadow-xs">
        <h3 className="font-serif font-bold text-base text-[#242926] dark:text-[#EDEFEA] mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          品牌设计令牌 (Design Tokens & Semantic Palette)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {colorTokens.map((color, idx) => (
            <div key={idx} className="rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-3 bg-[#FAF8F5] dark:bg-[#181C19]">
              <div
                className="w-full h-12 rounded-xl mb-2 shadow-2xs border border-[#242926]/10"
                style={{ backgroundColor: color.hex }}
              />
              <div className="font-serif font-bold text-xs text-[#242926] dark:text-[#EDEFEA]">{color.name}</div>
              <div className="text-[10px] font-mono text-[#6C736E] dark:text-[#9BA39D]">{color.hex}</div>
              <div className="text-[10px] text-[#6C736E] dark:text-[#9BA39D] mt-1 leading-tight">{color.usage}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Brand Logo & Visual Identity Spotlight */}
      <div className="bg-gradient-to-br from-[#222B25] via-[#1A211D] to-[#141816] rounded-3xl border border-[#D4AF37]/40 p-6 sm:p-8 text-[#EDEFEA] shadow-md relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-xl shrink-0 bg-[#121614]">
            <img
              src="/lumina_app_logo.jpg"
              alt="Lumina App Brand Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-serif font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>品牌超级符号 · Brand Identity & App Icon Blueprint</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
              “金莲心脉 · 虚空智慧” 品牌概念徽标
            </h3>
            <p className="text-xs sm:text-sm text-[#B4BCB6] leading-relaxed">
              <strong>设计寓意解析：</strong>以东方经典中“出淤泥而不染、清净圆满”的琉璃金莲花为骨骼核心，花瓣脉络与空灵发光的几何神经网络电路（Neural Circuits）自然交织，象征着“千载神圣智慧”与“当代前沿人工智能”的和谐无碍相融；底色取沉香墨玉色，辅以微光漫射光晕，传达深沉、自律、安宁的心智庇护所气质。
            </p>
            <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-[#D4AF37]">
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                主标宽高比: 1:1 标准 App Icon
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                色彩体系: 琉璃金 (#D4AF37) + 沉香墨绿 (#1A211D)
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                适配信标: iOS Liquid Icon / Android Adaptive Vector
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Screen Wireframes & Interactive Blueprint */}
      <div className="bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-serif font-bold text-[#242926] dark:text-[#EDEFEA] flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-[#4A5D4E] dark:text-[#D4AF37]" />
              七大核心界面原型线框与交互蓝图
            </h3>
            <p className="text-xs sm:text-sm text-[#6C736E] dark:text-[#9BA39D]">
              点击下方切换查看各功能界面的空间布局架构、交互热区与设计规格。
            </p>
          </div>

          {onSwitchToLiveApp && (
            <button
              onClick={onSwitchToLiveApp}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#4A5D4E] text-white hover:bg-[#3B493F] transition-colors shadow-xs"
            >
              <Eye className="w-4 h-4" /> 直接体验运行中产品原型
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Screen Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E5E1D8] dark:border-[#2D3530]">
          {[
            { id: 'sanctuary', label: '1. 觉照大厅 (Sanctuary)' },
            { id: 'meditation', label: '2. 深度冥想室 (Meditation)' },
            { id: 'chat', label: '3. 智者问心 (AI Dialogue)' },
            { id: 'ritual', label: '4. 身心仪轨殿 (Rituals)' },
            { id: 'scripture', label: '5. 经藏探骊 (Exegesis)' },
            { id: 'confession', label: '6. 清净告解室 (Catharsis)' },
            { id: 'onboarding', label: '7. 新手引导流 (Onboarding)' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveScreenTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-serif font-bold transition-all whitespace-nowrap border ${
                activeScreenTab === tab.id
                  ? 'bg-[#4A5D4E] text-white border-[#4A5D4E] shadow-xs'
                  : 'bg-[#FAF8F5] dark:bg-[#181C19] border-[#E5E1D8] dark:border-[#2D3530] text-[#6C736E] dark:text-[#9BA39D] hover:text-[#242926] dark:hover:text-[#EDEFEA]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Blueprint Visual Rendering */}
        <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-[#242926] dark:text-[#EDEFEA]">
          {activeScreenTab === 'sanctuary' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#2D3530] pb-3">
                <span className="text-xs font-mono text-[#4A5D4E] dark:text-[#D4AF37] font-bold">
                  SCREEN 01: 觉照大厅 · 空间结构定义
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D]">
                  日活入口 (DAU Hook)
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">顶部状态与心性流派切换</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    展示用户当前精神坐标（禅宗/道家/基督/斯多葛），点击无缝切换全局调色盘与专属经义语境；显示本周连续静心天数（功德树结籽）。
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">中央空灵动态气场 (Aura Wheel)</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    基于用户当前心境呼吸，呈现柔和流转的多层光环。伴随 432Hz 微弱泛音涟漪，点按即可启动 3 分钟快速定心呼吸。
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">今日晨昏灵粮卡片</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    精选一条正统原典金句、当代困惑映射与1个微行动指南。支持一键生成典雅宣纸风格打卡签存图。
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeScreenTab === 'chat' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#2D3530] pb-3">
                <span className="text-xs font-mono text-[#4A5D4E] dark:text-[#D4AF37] font-bold">
                  SCREEN 02: 智者问心 · AI 交互场域
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D]">
                  双向心智推演核心
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">导师人格选择台</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    横向滑动展示慧能（禅宗）、列子（道家）、提摩太（基督）、奥勒留（斯多葛）、苏格拉底（普世）。每位导师拥有独立正统文献对齐基准。
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">启发式经义卡片气泡</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    回答结构化呈现：【经句引证】+【心结解构】+【当下止观】。经文支持点击查看上下文原著与历代名家疏解。
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">安全合规与免责声明</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    输入栏下方常驻“AI向导仅作哲思心性镜鉴，非神明亦非医学诊断”自谦声明；危机词检测实时联动心理热线。
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeScreenTab === 'ritual' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#2D3530] pb-3">
                <span className="text-xs font-mono text-[#4A5D4E] dark:text-[#D4AF37] font-bold">
                  SCREEN 03: 身心仪轨殿 · 多感官拟真
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D]">
                  身体知觉沉浸
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">沉木木鱼 (Acoustic Wooden Fish)</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    3D质感硬木木鱼，支持手动敲击与自适应节奏；敲击激发生物声学谐波与顿挫震动，上浮“清净+1”、“烦恼消散”自定义善念。
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">喜马拉雅颂钵 (Singing Bowl)</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    432Hz 根部疗愈音调，点击钵体或沿边缘慢速绕钵滑动，生成长达 5 秒的舒缓泛音共振与扩散水波纹。
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">沉香菩提念珠 (Prayer Beads)</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    垂直流体拨珠手势，模拟真实天然菩提珠串相互碰撞的轻柔脆响与阻尼感；支持 21 / 108 颗诵读循环提醒。
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeScreenTab === 'scripture' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#2D3530] pb-3">
                <span className="text-xs font-mono text-[#4A5D4E] dark:text-[#D4AF37] font-bold">
                  SCREEN 04: 经藏探骊 · 智能伴读与启悟
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D]">
                  深度心智学习
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">典籍馆阁分卷</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    涵盖《心经》、《道德经》、《诗篇》、《沉思录》等经典。仿古宣纸竖排与横排优雅排版自由切换。
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">划词问心与现代表述</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    选中经文任何单句（如“应无所住”），浮现现代大白话拆解、现实职场生活应用与古代名家精妙注疏。
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">每日观心反思题</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    每卷读毕提供一个针对内省的“止观提问”，引导用户把经文从书本转化为今日的言行转变。
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeScreenTab === 'meditation' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#2D3530] pb-3">
                <span className="text-xs font-mono text-[#4A5D4E] dark:text-[#D4AF37] font-bold">
                  SCREEN 02: 深度冥想室 · 正念止观与声学空间
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D]">
                  高沉浸修心场域
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">4-4-4-4 正念呼吸光环</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    吸气(4s 扩散)、屏息(4s 凝敛)、呼气(4s 释怀)、空息(4s 澄照)，毫秒级弹性 CSS 缓动缩放，视觉即呼吸节奏。
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">觉察杂念浮动标记</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    轻按“标记杂念”，记录心智脱缰瞬间，辅以微弱木珠扣击音，引导用户不带批判、温和地拉回注意力。
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">功德回向誓愿生成</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    计时终了自动生成带有传统流派回向文句的结行卡片，统计专注时长与呼吸循环，支持保存与分享。
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeScreenTab === 'onboarding' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E1D8] dark:border-[#2D3530] pb-3">
                <span className="text-xs font-mono text-[#4A5D4E] dark:text-[#D4AF37] font-bold">
                  SCREEN 07: 新手引导流 · 初心诊断与道场启封
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#FAF8F5] dark:bg-[#181C19] text-[#8C701E] dark:text-[#D4AF37] border border-[#D4AF37]/30">
                  首日转化与知情同意
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">四步交互式初心诊断</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    流派契合度选择、当代内耗痛点诊断、神圣自律宪章签署、每日定课时间与法音偏好设定。
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">神圣隐私与去神化协议</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    法务合规前置化：单独同意敏感个人信息处理，系统强制明示 AI 为伴读工具绝非神灵，杜绝教条偶像崇拜。
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFFFFF] dark:bg-[#1D221F] border border-[#E5E1D8] dark:border-[#2D3530] space-y-2">
                  <div className="font-bold text-[#354338] dark:text-[#A3B8A7]">个性化修习道场封印卷轴</div>
                  <p className="text-[#6C736E] dark:text-[#9BA39D]">
                    根据用户初发心动态派发专属初心卷轴卡与编号，伴随颂钵低频共振，仪式感满满地步入主修习道场。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
