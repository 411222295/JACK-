// 支援語言列表
export const LANGUAGES = ['zh', 'en'] as const;

// 'zh' | 'en'
export type Language = typeof LANGUAGES[number];
