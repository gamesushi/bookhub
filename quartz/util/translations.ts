export const folderTranslations: Record<string, string> = {
  "book": "书库索引",
  "insights": "专题见解",
  "wiki": "百科维基",
  "Duan_Yongping": "段永平",
  "Charles_Munger": "查理·芒格",
  "Warren_Buffett": "沃伦·巴菲特",
  "companies": "相关公司",
  "concepts": "核心概念",
  "people": "相关人物",
  "quotes": "金句集",
  "Wesco_Letter_to_Shareholders": "Wesco 致股东信",
  "Berkshire_Hathaway_Letters": "伯克希尔致股东信",
  "Buffett_Partnership_Letters": "巴菲特合伙人书信",
  "Berkshire_Hathaway_Annual_Meeting": "伯克希尔股东大会",
  "ChengMing": "澄明版",
  "RanRan": "冉冉版",
  "Letters_to_Partners": "合伙人书信",
  "Shareholder_Letters": "致股东信",
  "A_Conversation_with_Charlie_Munger": "芒格访谈录",
  "OST": "原声版",
}

export const mapFn = (node: any) => {
  const translations = typeof window !== "undefined" ? (window as any).folderTranslations : folderTranslations
  if (translations && translations[node.slugSegment]) {
    node.displayNameChs = translations[node.slugSegment]
  }
}
