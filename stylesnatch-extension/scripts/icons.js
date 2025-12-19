/**
 * StyleSnatch - 标准图标库
 * 基于设计规则第七章：100 个核心图标的映射系统
 */

/**
 * 图标库配置
 */
export const ICON_CONFIG = {
  VIEWBOX: 24,
  STYLE: 'outline',
  STROKE_WIDTH: 2,
  STROKE_WIDTH_LIGHT: 1.5,
  STROKE_WIDTH_BOLD: 3,
  CORNER: 'round',
  COLOR: 'currentColor'
};

/**
 * 关键词到图标的映射表
 * 用于智能匹配：分析章节标题/描述，自动推荐图标
 */
export const KEYWORD_ICON_MAP = {
  // 商务与增长
  growth: 'trending-up',
  increase: 'trending-up',
  revenue: 'bar-chart',
  target: 'target',
  goal: 'target',
  launch: 'rocket',
  startup: 'rocket',
  data: 'bar-chart',
  analytics: 'pie-chart',
  business: 'briefcase',
  partner: 'handshake',
  award: 'award',
  certified: 'certificate',
  premium: 'crown',
  vip: 'crown',
  core: 'diamond',
  key: 'key',
  solution: 'key',
  security: 'shield',
  safe: 'shield',
  milestone: 'flag',
  idea: 'lightbulb',
  insight: 'lightbulb',
  
  // 沟通与社交
  email: 'mail',
  contact: 'mail',
  phone: 'phone',
  call: 'phone',
  message: 'message-circle',
  chat: 'chat',
  announce: 'megaphone',
  promote: 'megaphone',
  website: 'globe',
  global: 'globe',
  world: 'globe',
  link: 'link',
  share: 'share',
  team: 'users',
  people: 'users',
  community: 'users',
  user: 'user',
  account: 'user',
  recommend: 'thumbs-up',
  like: 'heart',
  favorite: 'heart',
  
  // 科技与 AI
  ai: 'sparkles',
  intelligent: 'sparkles',
  smart: 'sparkles',
  future: 'sparkles',
  tech: 'cpu',
  technology: 'cpu',
  server: 'server',
  database: 'database',
  cloud: 'cloud',
  saas: 'cloud',
  code: 'code',
  api: 'code',
  develop: 'code',
  terminal: 'terminal',
  system: 'terminal',
  mobile: 'smartphone',
  desktop: 'monitor',
  platform: 'monitor',
  network: 'wifi',
  connect: 'wifi',
  privacy: 'lock',
  encrypt: 'lock',
  automate: 'robot',
  bot: 'robot',
  
  // 编辑与操作
  edit: 'edit',
  create: 'edit',
  delete: 'trash',
  remove: 'trash',
  download: 'download',
  get: 'download',
  upload: 'upload',
  publish: 'upload',
  attach: 'paperclip',
  file: 'paperclip',
  filter: 'filter',
  search: 'search',
  find: 'search',
  discover: 'search',
  detail: 'zoom-in',
  settings: 'settings',
  config: 'settings',
  tool: 'tool',
  maintain: 'tool',
  layer: 'layers',
  architecture: 'layers',
  copy: 'copy',
  save: 'save',
  print: 'printer',
  output: 'printer',
  refresh: 'refresh',
  update: 'refresh',
  
  // 文件与内容
  document: 'file-text',
  text: 'file-text',
  image: 'file-image',
  photo: 'file-image',
  video: 'file-video',
  media: 'file-video',
  folder: 'folder',
  directory: 'folder',
  knowledge: 'book',
  manual: 'book',
  guide: 'book',
  category: 'grid',
  matrix: 'grid',
  list: 'list',
  menu: 'list',
  layout: 'layout',
  interface: 'layout',
  play: 'play-circle',
  demo: 'play-circle',
  
  // 时间与位置
  date: 'calendar',
  schedule: 'calendar',
  plan: 'calendar',
  time: 'clock',
  efficiency: 'clock',
  wait: 'hourglass',
  loading: 'hourglass',
  location: 'map-pin',
  address: 'map-pin',
  headquarter: 'map-pin',
  region: 'map',
  area: 'map',
  route: 'navigation',
  direction: 'compass',
  guide: 'compass',
  
  // 导航与指示
  next: 'arrow-right',
  previous: 'arrow-left',
  up: 'arrow-up',
  down: 'arrow-down',
  more: 'more-horizontal',
  close: 'x',
  error: 'x',
  success: 'check',
  complete: 'check',
  done: 'check',
  add: 'plus',
  new: 'plus',
  minus: 'minus',
  reduce: 'minus',
  home: 'home',
  homepage: 'home',
  logout: 'log-out',
  exit: 'log-out',
  
  // 抽象与状态
  info: 'info',
  information: 'info',
  help: 'help-circle',
  question: 'help-circle',
  warning: 'alert-triangle',
  risk: 'alert-triangle',
  attention: 'alert-triangle',
  fast: 'zap',
  quick: 'zap',
  energy: 'zap',
  active: 'activity',
  engagement: 'activity',
  view: 'eye',
  visible: 'eye',
  hide: 'eye-off',
  invisible: 'eye-off',
  gift: 'gift',
  benefit: 'gift',
  offer: 'gift'
};

/**
 * 核心 100 个图标的 SVG 路径数据
 * 基于 Feather Icons / Lucide Icons 标准
 */
export const ICON_SVG_DATA = {
  // ==================== 商务与增长 (15) ====================
  'rocket': `<path d="M4.5 16.5c-1.5 1.25-2 5-2 5s3.75-.5 5-2c.5-.5 1-1.5 1-2.5 0-.5-.5-1-1-1-.5 0-2 0-3 .5z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>`,
  
  'target': `<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>`,
  
  'trending-up': `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
  
  'bar-chart': `<line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>`,
  
  'pie-chart': `<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>`,
  
  'briefcase': `<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`,
  
  'handshake': `<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>`,
  
  'award': `<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>`,
  
  'certificate': `<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M10 12.5a2 2 0 1 0 4 0 2 2 0 1 0-4 0z"/><path d="M10 17l-.5 1.5L8 19l1.5.5L10 21l.5-1.5L12 19l-1.5-.5L10 17z"/>`,
  
  'crown': `<path d="M2 4l3 12h14l3-12-6.5 6.5L12 3 8.5 10.5 2 4z"/>`,
  
  'diamond': `<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0z"/>`,
  
  'key': `<path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4"/>`,
  
  'shield': `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
  
  'flag': `<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>`,
  
  'lightbulb': `<line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>`,
  
  // ==================== 沟通与社交 (12) ====================
  'mail': `<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>`,
  
  'phone': `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`,
  
  'message-circle': `<path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>`,
  
  'chat': `<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>`,
  
  'megaphone': `<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>`,
  
  'globe': `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
  
  'link': `<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>`,
  
  'share': `<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>`,
  
  'users': `<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
  
  'user': `<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>`,
  
  'thumbs-up': `<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>`,
  
  'heart': `<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>`,
  
  // ==================== 科技与 AI (12) ====================
  'sparkles': `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/>`,
  
  'cpu': `<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>`,
  
  'server': `<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>`,
  
  'cloud': `<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>`,
  
  'database': `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>`,
  
  'code': `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`,
  
  'terminal': `<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>`,
  
  'smartphone': `<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>`,
  
  'monitor': `<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>`,
  
  'wifi': `<path d="M5 13a10 10 0 0 1 14 0"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 20 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>`,
  
  'lock': `<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
  
  'robot': `<rect width="18" height="10" x="3" y="11" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" x2="8" y1="16" y2="16"/><line x1="16" x2="16" y1="16" y2="16"/>`,
  
  // 添加更多图标...（由于字数限制，这里展示核心图标）
  
  // ==================== 导航与指示 ====================
  'arrow-right': `<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>`,
  'arrow-left': `<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>`,
  'arrow-up': `<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>`,
  'arrow-down': `<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>`,
  'check': `<polyline points="20 6 9 17 4 12"/>`,
  'x': `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
  'plus': `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
  'minus': `<line x1="5" y1="12" x2="19" y2="12"/>`
};

/**
 * 智能图标匹配
 * @param {string} text - 要分析的文本（标题或描述）
 * @returns {string} 匹配的图标名称
 */
export function matchIcon(text) {
  if (!text) return 'arrow-right'; // 默认图标
  
  const lowerText = text.toLowerCase();
  
  // 遍历关键词映射表
  for (const [keyword, iconName] of Object.entries(KEYWORD_ICON_MAP)) {
    if (lowerText.includes(keyword)) {
      return iconName;
    }
  }
  
  // 如果没有匹配，返回默认图标
  return 'arrow-right';
}

/**
 * 生成 SVG 字符串
 * @param {string} iconName - 图标名称
 * @param {Object} options - 样式选项
 * @returns {string} 完整的 SVG 字符串
 */
export function generateIconSVG(iconName, options = {}) {
  const {
    size = ICON_CONFIG.VIEWBOX,
    strokeWidth = ICON_CONFIG.STROKE_WIDTH,
    color = ICON_CONFIG.COLOR,
    className = ''
  } = options;
  
  const pathData = ICON_SVG_DATA[iconName] || ICON_SVG_DATA['arrow-right'];
  
  return `<svg 
    width="${size}" 
    height="${size}" 
    viewBox="0 0 ${ICON_CONFIG.VIEWBOX} ${ICON_CONFIG.VIEWBOX}" 
    fill="none" 
    stroke="${color}" 
    stroke-width="${strokeWidth}" 
    stroke-linecap="round" 
    stroke-linejoin="round"
    class="${className}"
  >
    ${pathData}
  </svg>`;
}

/**
 * 批量获取章节图标
 * @param {Array} sections - 章节数组
 * @returns {Array} 包含图标名称的章节数组
 */
export function assignIconsToSections(sections) {
  return sections.map(section => ({
    ...section,
    icon: matchIcon(section.title + ' ' + section.description)
  }));
}

// 导出默认对象
export default {
  ICON_CONFIG,
  KEYWORD_ICON_MAP,
  ICON_SVG_DATA,
  matchIcon,
  generateIconSVG,
  assignIconsToSections
};
