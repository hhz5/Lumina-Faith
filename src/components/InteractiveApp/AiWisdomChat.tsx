import React, { useState, useRef, useEffect } from 'react';
import { TraditionType, ChatMessage } from '../../types';
import { TRADITIONS } from '../../data/researchData';
import { audioService } from '../../utils/audioSynthesizer';
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react';

interface AiWisdomChatProps {
  currentTradition: TraditionType;
  soundEnabled: boolean;
}

const PRESET_PROMPTS = [
  '职场遭遇不公与PUA，内心极度紧绷与内耗，如何破局？',
  '面对未来的种种不确定性，感到深深的恐惧与无力，怎么办？',
  '深夜总是失眠，脑海被过去的错误和悔恨缠绕，如何释怀？',
  '总是习惯性迎合讨好别人，感觉迷失了真实的自己。',
];

export const AiWisdomChat: React.FC<AiWisdomChatProps> = ({ currentTradition, soundEnabled }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const traditionInfo =
    TRADITIONS.find((t) => t.id === currentTradition) || TRADITIONS[0];

  useEffect(() => {
    // Initial welcome message based on selected tradition
    const welcomeMessages: Record<TraditionType, string> = {
      buddhism:
        '阿弥陀佛，善知识。这里是【禅宗觉照】智慧静室。若你心头正有一叶障碍万山，不妨说予老衲听。我们一同以般若智水，浣涤心尘。',
      taoism:
        '福生无量天尊。道友，天下万物生于有，有生于无。若感世事繁杂疲顿，请在此卸下甲胄，体悟致虚守静之妙。',
      christianity:
        '愿主的恩惠与平安与你同在。凡劳苦担重担的人，可以到这里来，将忧虑交托于爱与祷告之中。请告诉我你心中的挂虑。',
      stoicism:
        '朋友，愿你心神如磐石。生活中的风浪无法动摇一个坚守理性要塞的灵魂。告诉我，是什么事正在夺走你的宁静？',
      universal:
        '旅人，欢迎来到灵境心镜。不论你来自何种信仰背景，万千智慧皆同指一处：爱、慈悲与内在自性的澄澈觉醒。请随心倾诉。',
    };

    setMessages([
      {
        id: 'welcome-' + currentTradition,
        sender: 'ai',
        content: welcomeMessages[currentTradition],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        tradition: currentTradition,
      },
    ]);
  }, [currentTradition]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/spiritual/dialogue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tradition: currentTradition,
          message: query,
          conversationHistory: messages.slice(-4).map((m) => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.content,
          })),
        }),
      });

      const data = await response.json();
      if (data.reply) {
        if (soundEnabled) {
          audioService.playTempleBell();
        }
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: 'ai',
            content: data.reply,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            tradition: currentTradition,
            source: data.source,
          },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: '向导正在默坐调息中，请稍作定息后重新向我提问。',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[480px] sm:h-[580px] bg-[#FFFFFF] dark:bg-[#1D221F] rounded-2xl border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs overflow-hidden">
      {/* Header Panel */}
      <div className="p-3 sm:px-4 border-b border-[#E5E1D8] dark:border-[#2D3530] flex items-center justify-between bg-[#FAF8F5] dark:bg-[#181C19] gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#4A5D4E] text-white flex items-center justify-center font-serif font-bold text-xs sm:text-sm shadow-xs shrink-0">
            {traditionInfo.symbol}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif font-bold text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] truncate">
                智者问心 · {traditionInfo.name.split('/')[0]}
              </h3>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-[#EEF3EF] dark:bg-[#1A241C] text-[#354338] dark:text-[#A3B8A7] border border-[#D5E0D7] dark:border-[#29382D] shrink-0">
                正统义理
              </span>
            </div>
            <p className="text-[10px] text-[#6C736E] dark:text-[#9BA39D] truncate">
              {traditionInfo.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-[#6C736E] dark:text-[#9BA39D] shrink-0">
          <ShieldCheck className="w-3.5 h-3.5 text-[#4A5D4E] dark:text-[#7B9280] shrink-0" />
          <span className="hidden md:inline text-[10px] whitespace-nowrap">端侧保密</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#FDFCF8]/50 dark:bg-[#151916]/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  isUser
                    ? 'bg-[#4A5D4E] text-white'
                    : 'bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-[#354338] dark:text-[#A3B8A7]'
                }`}
              >
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div className={`max-w-[85%] sm:max-w-[75%] space-y-1`}>
                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    isUser
                      ? 'bg-[#4A5D4E] text-white rounded-tr-none shadow-xs'
                      : 'bg-[#FFFFFF] dark:bg-[#181C19] text-[#242926] dark:text-[#EDEFEA] rounded-tl-none border border-[#E5E1D8] dark:border-[#2D3530] shadow-xs'
                  }`}
                >
                  {msg.content}
                </div>
                <div
                  className={`text-[10px] text-[#6C736E] dark:text-[#9BA39D] px-1 ${
                    isUser ? 'text-right' : 'text-left'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] flex items-center justify-center text-[#4A5D4E] dark:text-[#7B9280]">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FFFFFF] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-xs text-[#6C736E] dark:text-[#9BA39D] flex items-center gap-2 shadow-xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#D4AF37]" />
              <span>向导正在查考正统经藏义理，凝神推演中...</span>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Preset Starters */}
      <div className="px-3 py-2 border-t border-[#E5E1D8] dark:border-[#2D3530] bg-[#FAF8F5] dark:bg-[#181C19] overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
        <span className="text-[10px] font-bold text-[#6C736E] dark:text-[#9BA39D] uppercase tracking-wider shrink-0">
          常问心结:
        </span>
        {PRESET_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={isTyping}
            className="px-2.5 py-1 rounded-lg text-xs bg-[#FFFFFF] dark:bg-[#1D221F] text-[#242926] dark:text-[#EDEFEA] hover:text-[#4A5D4E] dark:hover:text-[#A3B8A7] border border-[#E5E1D8] dark:border-[#2D3530] whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-3 border-t border-[#E5E1D8] dark:border-[#2D3530] bg-[#FFFFFF] dark:bg-[#1D221F] shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="向智慧向导倾诉当下烦恼或经典疑惑..."
            disabled={isTyping}
            className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] dark:bg-[#181C19] border border-[#E5E1D8] dark:border-[#2D3530] text-xs sm:text-sm text-[#242926] dark:text-[#EDEFEA] placeholder-[#8E9790] focus:outline-none focus:ring-2 focus:ring-[#4A5D4E]"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-3.5 py-2.5 rounded-xl bg-[#4A5D4E] hover:bg-[#354338] disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5 shadow-xs shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>求索</span>
          </button>
        </form>
        <div className="mt-1.5 text-[9px] text-center text-[#8E9790] leading-tight truncate">
          * 灵境AI仅作心性哲理镜鉴，非医学诊疗。遇极端自残倾向请拨打 400-161-9995。
        </div>
      </div>
    </div>
  );
};
