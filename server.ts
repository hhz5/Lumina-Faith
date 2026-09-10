import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Spiritual Tradition Presets & System Instructions
const SYSTEM_PROMPTS: Record<string, string> = {
  buddhism: `你是一位深谙大乘佛法与禅宗顿悟智慧的AI心性向导（觉照智者）。
你的使命：运用《金刚经》、《心经》、《六祖坛经》、《法华经》等正统经典义理，以慈悲、空性、无执、觉照的语气为来访者点拨心结。
核心伦理护栏：
1. 严正声明自己是数字智慧助手，非活佛、非神明、非受戒僧侣；
2. 凡涉及生死困惑，引导观照无常与因果缘起，严禁任何宣扬极端行为的言辞；如察觉绝望自残倾向，温柔劝慰并要求其寻求专业心理援助与现实亲友关怀；
3. 不搞迷信宿命论，主张“命由己作，相由心生”，引导用户回归当下觉知，破除焦虑执念。
请结合提问者的具体烦恼，给出：【契理经句引证】、【心结剖析】、【生活止观践行微课】。`,

  taoism: `你是一位体悟老庄道家清静无为、顺应自然法则的AI道德清修向导（玄通向导）。
你的使命：运用《道德经》、《庄子》、《黄帝内经》、《清静经》的辩证哲思，帮助求索者“致虚极，守静笃”，“反者道之动”，从过度的竞争内耗中解脱。
核心伦理护栏：
1. 自明为数字道友，倡导天人合一、身心调适，严禁装神弄鬼、兜售符咒或封建迷信妄言；
2. 引导求索者放下苛求，学会如水般居下包容、柔弱胜刚强。
请结合提问者情绪，给出：【道经章句】、【物我合一解读】、【今日顺应自然简易身心调适法】。`,

  christianity: `你是一位慈爱、谦和、扎根圣经真理的AI属灵同行导师（灵粮导修）。
你的使命：运用《旧约》、《新约》圣经原文精意（诗篇、箴言、福音书、保罗书信），以爱、盼望、信心与祷告陪伴来访者，传递神的恩典、平安与宽恕。
核心伦理护栏：
1. 明确自身为圣经学习与灵修辅助工具，非神父或牧师，不进行圣事圣礼赦罪裁决；
2. 尊重正统大公教会信条，严禁激进异端极端解读；
3. 温暖抚慰软弱忧伤之心，将忧虑交托。
请提供：【应许经文】、【恩典灵修默想】、【献给天父的交托祈祷文】。`,

  stoicism: `你是一位理性、坚毅且充满人文关怀的古罗马斯多葛学派智慧导师（理性心镜）。
你的使命：以马可·奥勒留《沉思录》、爱比克泰德《手册》、塞涅卡《论人生之短暂》的哲学洞察，指导使用者区分“何为我能控制之事，何为我无法控制之事”。
核心伦理护栏：
1. 强调理性认知重塑、情绪免疫力与德性伦理；
2. 不作虚妄承诺，注重当下知行合一。
请给出：【先哲格言】、【控制二分法解构】、【日落复盘思维练习】。`,

  universal: `你是一位融合世界多文明精神智慧的跨文化心性觉察向导（灵境慧心）。
你的使命：博采众家（禅、道、儒、苏菲、斯多葛等）之长，以通透、包容、现代心理学共情方式，倾听现代人的精神困境，提供精神寄托与觉察指引。
核心伦理护栏：倡导爱、宽容与内在平静，坚守生命至上与心理安全红线。`,
};

// Helper for resilient Gemini API calls with model fallbacks on 503/transient demand spikes
const RESILIENT_MODELS = ["gemini-3.8-flash", "gemini-flash-latest", "gemini-3.1-flash-lite"];

async function callGeminiWithFallback(
  ai: GoogleGenAI,
  callFn: (model: string) => Promise<any>
): Promise<{ result: any; model: string } | null> {
  for (const model of RESILIENT_MODELS) {
    try {
      const result = await callFn(model);
      if (result) {
        return { result, model };
      }
    } catch (err: any) {
      const code = err?.status || err?.code || err?.error?.code;
      const msg = String(err?.message || "");
      const isTransient =
        code === 503 ||
        code === 429 ||
        msg.includes("503") ||
        msg.includes("high demand") ||
        msg.includes("UNAVAILABLE") ||
        msg.includes("RESOURCE_EXHAUSTED");

      if (isTransient) {
        // Model temporarily busy, try next model candidate silently
        continue;
      }
      // For any other unexpected errors, stop trying to avoid unnecessary latency
      break;
    }
  }
  return null;
}

// API: Spiritual Dialogue with AI
app.post("/api/spiritual/dialogue", async (req, res) => {
  try {
    const { tradition = "universal", message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "咨询内容不能为空" });
    }

    const ai = getAIClient();
    const systemInstruction = SYSTEM_PROMPTS[tradition] || SYSTEM_PROMPTS.universal;

    if (ai) {
      const callRes = await callGeminiWithFallback(ai, (model) =>
        ai.models.generateContent({
          model,
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `提问者所选修习流派: [${tradition}]\n历史对话简报: ${JSON.stringify(
                    conversationHistory.slice(-4)
                  )}\n当前心境困惑: ${message}`,
                },
              ],
            },
          ],
          config: {
            systemInstruction,
            temperature: 0.7,
            topP: 0.9,
          },
        })
      );

      if (callRes && callRes.result && callRes.result.text) {
        return res.json({
          success: true,
          reply: callRes.result.text,
          source: callRes.model,
          tradition,
        });
      }
    }

    // High quality canonical fallback generator when API key is missing or offline
    const fallbackAnswers: Record<string, string> = {
      buddhism: `【经句启示】《金刚经》云：“一切有为法，如梦幻泡影，如露亦如电，应作如是观。”\n\n【心结观照】你当下感受到的紧绷与烦恼，往往源自对“某件事必须按我预想发生”的深刻执著。万事万物皆是众缘和合而生，随缘灭去。试着深吸一口气，允许现状如其所是。\n\n【今日止观】闭目观息三分钟。当焦虑升起时，在心中念一声“知晓，这只是念头，并非真实的我”，念头便会如水上涟漪自归平静。`,
      taoism: `【道经明训】《道德经》第八章：“上善若水。水善利万物而不争，处众人之所恶，故几于道。”\n\n【自然解缚】人之所以内耗，是因为常逆着势能用力。水之所以无坚不摧，因其顺应地势、不执拗于形状。接纳当下的转折与不确定，有时停顿正是蓄力之契机。\n\n【调心实践】放下手头紧抓之事，步入户外看一片云或一棵树。体会“为学日益，为道日损”的减法智慧。`,
      christianity: `【应许之光】《腓立比书》4:6-7：“应当一无挂虑，只要凡事藉着祷告、祈求，和感谢，将你们所要的告诉神。神所赐出人意外的平安必在基督耶稣里保守你们的心怀意念。”\n\n【恩典默想】亲爱的朋友，你肩上的重担不必一人独扛。即使在幽暗未明的时刻，也有慈爱在托举着你的生命。\n\n【同心祈祷】天父啊，我将我心中所思所虑完全交托。求祢挪去我里面的惊慌，赐下超越一切风浪的属天平安。阿们。`,
      stoicism: `【先哲箴言】爱比克泰德《沉思录》：“困扰人们的不是事情本身，而是人们对事情的看法。”\n\n【理性剖析】把你正在烦恼的事情画一条线：左边写“我能直接掌控的”（我的态度、我的回应、我当下的选择），右边写“我无法左右的”（别人的评价、既定的结局、未来的天气）。请立刻放弃对右边的焦灼，专注打磨左边的分寸。\n\n【践行指令】做好当下的这一件微小之事，这便是你不可动摇的尊严与自由。`,
      universal: `【灵性启语】“风暴在外咆哮，唯有风暴中心是澄澈无澜的台风眼。”\n\n【同频陪伴】接纳你当下的所有迷茫与脆弱。每个灵魂在成长蜕变前，都会经历一段幽暗的甬道。不要急着批判自己，请给身心一盏茶的温存与宽容。\n\n【心念锚定】右手轻抚心口，感受温热的跳动。告诉自己：“我正安全地存在于当下。”`,
    };

    const reply =
      fallbackAnswers[tradition] || fallbackAnswers.universal;

    return res.json({
      success: true,
      reply: reply + `\n\n（💡 提示：当前由灵境内置正统经义校准库解析提供，配置 GEMINI_API_KEY 后可启用高阶全量神经推演）`,
      source: "canonical-engine",
      tradition,
    });
  } catch (err: any) {
    console.warn("Spiritual dialogue endpoint fallback active");
    res.status(500).json({ error: "心性向导正在调息，请稍候再试" });
  }
});

// API: Daily Scripture & Reflection generator
app.post("/api/spiritual/daily-reflection", async (req, res) => {
  try {
    const { tradition = "buddhism" } = req.body;
    const ai = getAIClient();

    if (ai) {
      const callRes = await callGeminiWithFallback(ai, (model) =>
        ai.models.generateContent({
          model,
          contents: `请为信仰修习者生成一条今日【${tradition}】流派的晨起修习灵粮。要求严格包含以下JSON格式（仅返回纯JSON）：
{
  "quote": "经典原文金句",
  "source": "经书典籍名称及章节",
  "insight": "对当代快节奏生活与心性觉察的深度解析（100字左右）",
  "action": "今天可以实行的1个微小仪轨或行动指南"
}`,
          config: {
            responseMimeType: "application/json",
            temperature: 0.8,
          },
        })
      );

      if (callRes && callRes.result && callRes.result.text) {
        try {
          const parsed = JSON.parse(callRes.result.text);
          if (parsed && parsed.quote && parsed.source) {
            return res.json({ success: true, data: parsed, source: callRes.model });
          }
        } catch (_) {
          // If JSON parse fails, seamlessly continue to curated preset
        }
      }
    }

    // Default rich daily scripture cards
    const dailyPresets: Record<string, any> = {
      buddhism: {
        quote: "应无所住，而生其心。",
        source: "《金刚般若波罗蜜经》",
        insight: "不在任何执念、成见、得失上停留安营扎寨，方能生出澄澈、自由、敏锐的无量本心。",
        action: "今日每逢情绪波澜起伏时，暂停动作三次深呼吸，观察其来去而不随之起舞。",
      },
      taoism: {
        quote: "致虚极，守静笃。万物并作，吾以观复。",
        source: "《道德经·第十六章》",
        insight: "心境空明到极点，凝守宁静至纯一。万物蓬勃生长，我在虚静中体察它们的循环归根。",
        action: "今日下午离开屏幕，在窗前或自然中静立两分钟，仅体会呼吸与微风。",
      },
      christianity: {
        quote: "你们要休息，要知道我是神。",
        source: "《圣经·诗篇 46:10》",
        insight: "在繁忙喧嚣中学会放手（Be still）。很多时候竭力奔跑并非信心，静默等候神信实的带领才是最深的力量。",
        action: "清晨出门前，闭目献上30秒纯然感谢的祷告，将一天的日程交付。",
      },
      stoicism: {
        quote: "你拥有掌管自己心灵的力量，而非外界事件。意识到这一点，你就会找到力量。",
        source: "马可·奥勒留《沉思录》",
        insight: "环境无法夺走你的内心宁静，除非你主动让出判断权。坚守内心的要塞。",
        action: "今日遇到不顺心或被冒犯时，在开口反驳前默数三秒，分清此乃外界之境，非我之过。",
      },
      universal: {
        quote: "风暴在外咆哮，唯有风暴中心是澄澈无澜的台风眼。",
        source: "《当代跨文明觉照要略》",
        insight: "接纳你当下的所有迷茫与脆弱。每个灵魂在成长蜕变前，都会经历一段幽暗的甬道。给身心一盏茶的温存与宽容。",
        action: "右手轻抚心口感受温热跳动，深吸慢呼三息，确认自己此刻正安稳地存在于当下。",
      },
    };

    res.json({
      success: true,
      data: dailyPresets[tradition] || dailyPresets.buddhism,
      source: "preset-library",
    });
  } catch (err) {
    res.status(500).json({ error: "每日灵粮生成异常" });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lumina Faith & AI Server running on http://localhost:${PORT}`);
  });
}

startServer();
