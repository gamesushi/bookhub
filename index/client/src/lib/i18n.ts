/**
 * 多语言支持 - 简体中文、繁体中文、英文
 * 包含所有首页文案、标签与交互文本
 */

export type Language = "zh-CN" | "zh-TW" | "en";

export const translations = {
  "zh-CN": {
    // 品牌与导航
    brand: "Coopinio",
    tagline: "投资智慧库",
    searchPlaceholder: "搜索原则、信件、模型...",
    explorer: "浏览器",
    createdFor: "为以下人群创建",
    createdForDesc: "长期阅读、知识沉淀与投资智慧索引。",

    // 侧栏人物与主题
    people: [
      {
        title: "Warren Buffett 沃伦·巴菲特",
        items: ["致股东信", "资本配置", "能力圈", "安全边际"],
      },
      {
        title: "Charles Munger 查理·芒格",
        items: ["多元思维模型", "逆向思考", "心理误判", "理性清单"],
      },
      {
        title: "Duane Elkins 杜安·艾尔金",
        items: ["市场行为", "风险控制", "交易心理"],
      },
    ],

    // 首页标题与副标题
    mainTitle: "投资知识库",
    mainSubtitle: "在长期主义、商业洞察与多元思维模型之间，建立一座可反复阅读的投资智慧索引。",
    referenceLibrary: "参考文献库",
    year: "2026",

    // 开篇引言
    openingNote: "开篇语",
    openingQuote: "每天比醒来时更聪慧一点。",
    openingDesc: "真正的优势，不在于预测明天，而在于理解原则、避免愚蠢，并让时间替理性复利。",

    // 核心原则标签
    principles: ["能力圈", "安全边际", "反向思考", "少犯大错", "长期合伙人", "高品质企业"],

    // 知识卡片
    knowledgeCards: [
      {
        eyebrow: "01 / 企业品质",
        title: "企业品质与护城河",
        text: "从长期现金流、竞争优势与管理层诚信切入，建立判断一家企业是否值得长期持有的阅读路径。",
      },
      {
        eyebrow: "02 / 思维模型",
        title: "多元思维模型",
        text: "把心理学、经济学、概率、工程与历史放进同一个工具箱，训练更少犯错的决策能力。",
      },
      {
        eyebrow: "03 / 复利",
        title: "复利与长期主义",
        text: "让时间成为理性的盟友，关注可持续的学习、资本与品格复利，而非短期市场噪音。",
      },
    ],

    // 右侧面板
    graphView: "图谱视图",
    todayReading: "今日阅读",
    todayReadingTitle: "从「知道能力圈边界」开始",
    todayReadingDesc:
      "建立一套知识库，不是为了收藏更多资讯，而是为了在关键时刻知道哪些资讯值得相信，哪些问题应该避开。",
    indexStatus: "索引状态",
    peopleEntries: "人物条目",
    coreConcepts: "核心概念",
    pendingContent: "待补文献",
    open: "开放中",

    // 中间引言区
    likeReadingYearbook: "像阅读年报一样阅读思想。",
    blockquote: "「不追逐市场噪音，而是反复整理那些能跨越周期的原则。」",
    blockquoteDesc:
      "这个首页目前作为知识库的入口：当内容逐步补齐后，可把人物、演讲、股东信、投资案例与思维模型串成可搜索、可探索、可回溯的知识网络。",

    // 互动提示
    comingSoon: "内容节点即将接入",
    comingSoonDesc: (label: string) => `${label} 目前作为首页入口展示，后续可连接到对应 Wiki 条目。`,
    enterNode: "进入节点",
  },

  "zh-TW": {
    // 品牌与导航
    brand: "Coopinio",
    tagline: "投資智慧庫",
    searchPlaceholder: "搜尋原則、信件、模型...",
    explorer: "瀏覽器",
    createdFor: "為以下人群建立",
    createdForDesc: "長期閱讀、知識沉澱與投資智慧索引。",

    // 侧栏人物与主题
    people: [
      {
        title: "Warren Buffett 沃倫·巴菲特",
        items: ["致股東信", "資本配置", "能力圈", "安全邊際"],
      },
      {
        title: "Charles Munger 查理·芒格",
        items: ["多元思維模型", "逆向思考", "心理誤判", "理性清單"],
      },
      {
        title: "Duane Elkins 杜安·艾爾金",
        items: ["市場行為", "風險控制", "交易心理"],
      },
    ],

    // 首页标题与副标题
    mainTitle: "巴菲特與芒格知識庫",
    mainSubtitle: "在長期主義、商業洞察與多元思維模型之間，建立一座可反覆閱讀的投資智慧索引。",
    referenceLibrary: "參考文獻庫",
    year: "2026",

    // 开篇引言
    openingNote: "開篇語",
    openingQuote: "每天比醒來時更智慧一點。",
    openingDesc: "真正的優勢，不在於預測明天，而在於理解原則、避免愚蠢，並讓時間替理性複利。",

    // 核心原则标签
    principles: ["能力圈", "安全邊際", "反向思考", "少犯大錯", "長期合夥人", "高品質企業"],

    // 知识卡片
    knowledgeCards: [
      {
        eyebrow: "01 / 企業品質",
        title: "企業品質與護城河",
        text: "從長期現金流、競爭優勢與管理層誠信切入，建立判斷一家企業是否值得長期持有的閱讀路徑。",
      },
      {
        eyebrow: "02 / 思維模型",
        title: "多元思維模型",
        text: "把心理學、經濟學、機率、工程與歷史放進同一個工具箱，訓練更少犯錯的決策能力。",
      },
      {
        eyebrow: "03 / 複利",
        title: "複利與長期主義",
        text: "讓時間成為理性的盟友，關注可持續的學習、資本與品格複利，而非短期市場噪音。",
      },
    ],

    // 右侧面板
    graphView: "圖譜視圖",
    todayReading: "今日閱讀",
    todayReadingTitle: "從「知道能力圈邊界」開始",
    todayReadingDesc:
      "建立一套知識庫，不是為了收藏更多資訊，而是為了在關鍵時刻知道哪些資訊值得相信，哪些問題應該避開。",
    indexStatus: "索引狀態",
    peopleEntries: "人物條目",
    coreConcepts: "核心概念",
    pendingContent: "待補文獻",
    open: "開放中",

    // 中间引言区
    likeReadingYearbook: "像閱讀年報一樣閱讀思想。",
    blockquote: "「不追逐市場噪音，而是反覆整理那些能跨越週期的原則。」",
    blockquoteDesc:
      "這個首頁目前作為知識庫的入口：當內容逐步補齊後，可把人物、演講、股東信、投資案例與思維模型串成可搜尋、可探索、可回溯的知識網絡。",

    // 互动提示
    comingSoon: "內容節點即將接入",
    comingSoonDesc: (label: string) => `${label} 目前作為首頁入口展示，後續可連接到對應 Wiki 條目。`,
    enterNode: "進入節點",
  },

  en: {
    // 品牌与导航
    brand: "Coopinio",
    tagline: "Investment Wisdom Library",
    searchPlaceholder: "Search principles, letters, models...",
    explorer: "Explorer",
    createdFor: "Created for",
    createdForDesc: "Long-term reading, knowledge accumulation, and investment wisdom index.",

    // 侧栏人物与主题
    people: [
      {
        title: "Warren Buffett",
        items: ["Letters to Shareholders", "Capital Allocation", "Circle of Competence", "Margin of Safety"],
      },
      {
        title: "Charles Munger",
        items: ["Mental Models", "Inversion Thinking", "Psychology of Misjudgment", "Rational Checklist"],
      },
      {
        title: "Duane Elkins",
        items: ["Market Behavior", "Risk Management", "Trading Psychology"],
      },
    ],

    // 首页标题与副标题
    mainTitle: "Buffett & Munger Knowledge Library",
    mainSubtitle:
      "Building a re-readable index of investment wisdom between long-term thinking, business insights, and multidisciplinary mental models.",
    referenceLibrary: "Reference Library",
    year: "2026",

    // 开篇引言
    openingNote: "Opening Note",
    openingQuote: "Be a little wiser each day than you were when you woke up.",
    openingDesc:
      "True advantage lies not in predicting tomorrow, but in understanding principles, avoiding stupidity, and letting time compound rationality.",

    // 核心原则标签
    principles: ["Circle of Competence", "Margin of Safety", "Inversion", "Avoid Big Mistakes", "Long-term Partnership", "Quality Businesses"],

    // 知识卡片
    knowledgeCards: [
      {
        eyebrow: "01 / BUSINESS QUALITY",
        title: "Business Quality & Moats",
        text: "Build a reading path for assessing whether a business deserves long-term holding, grounded in sustainable cash flows, competitive advantages, and management integrity.",
      },
      {
        eyebrow: "02 / MENTAL MODELS",
        title: "Multidisciplinary Mental Models",
        text: "Put psychology, economics, probability, engineering, and history into one toolbox to train decision-making that avoids repeated errors.",
      },
      {
        eyebrow: "03 / COMPOUNDING",
        title: "Compounding & Long-term Orientation",
        text: "Make time your ally. Focus on sustainable learning, capital, and character compounding rather than short-term market noise.",
      },
    ],

    // 右侧面板
    graphView: "Graph View",
    todayReading: "Today's Reading",
    todayReadingTitle: "Start with Understanding Your Circle of Competence",
    todayReadingDesc:
      "A knowledge library is not about collecting more information, but about knowing which information to trust and which problems to avoid when it matters most.",
    indexStatus: "Index Status",
    peopleEntries: "People Entries",
    coreConcepts: "Core Concepts",
    pendingContent: "Pending Content",
    open: "Open",

    // 中间引言区
    likeReadingYearbook: "Read ideas like reading an annual report.",
    blockquote: "\"Don't chase market noise—repeatedly distill principles that transcend cycles.\"",
    blockquoteDesc:
      "This homepage currently serves as the library's entry point. As content grows, it will connect people, speeches, shareholder letters, investment cases, and mental models into a searchable, explorable, and traceable knowledge network.",

    // 互动提示
    comingSoon: "Content nodes coming soon",
    comingSoonDesc: (label: string) => `${label} is displayed as a homepage entry point and will connect to corresponding Wiki entries later.`,
    enterNode: "Enter Node",
  },
};

/**
 * 检测浏览器语言偏好
 */
export function detectLanguage(): Language {
  if (typeof window === "undefined") return "zh-CN";

  const browserLang = navigator.language || navigator.languages?.[0] || "zh-CN";

  if (browserLang.startsWith("zh-Hans") || browserLang.startsWith("zh-CN")) {
    return "zh-CN";
  }
  if (browserLang.startsWith("zh-Hant") || browserLang.startsWith("zh-TW")) {
    return "zh-TW";
  }
  if (browserLang.startsWith("en")) {
    return "en";
  }

  // 默认简体中文
  return "zh-CN";
}

/**
 * 从 localStorage 获取用户选择的语言
 */
export function getSavedLanguage(): Language | null {
  if (typeof window === "undefined") return null;
  const saved = localStorage.getItem("language");
  return saved as Language | null;
}

/**
 * 保存用户选择的语言到 localStorage
 */
export function saveLanguage(lang: Language): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("language", lang);
  }
}

/**
 * 获取当前语言的翻译对象
 */
export function getTranslations(language: Language) {
  return translations[language];
}
