/**
 * StyleSnatch - Content Script
 * 在目标网页中运行，负责 DOM 分析和风格抓取
 */

console.log('StyleSnatch Content Script loaded on:', window.location.href);

// 监听来自 background 或 popup 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'startCapture') {
    console.log('Received capture command');
    
    const data = capturePageStyle();
    sendResponse({ success: true, data });
  }
});

/**
 * 核心抓取函数 - 基于动态抓取规则
 */
function capturePageStyle() {
  console.log('Starting page style capture...');

  const capturedData = {
    // 基础信息
    url: window.location.href,
    domain: window.location.hostname,
    timestamp: Date.now(),
    
    // 内容数据
    title: extractTitle(),
    subtitle: extractSubtitle(),
    description: extractDescription(),
    
    // 视觉风格
    colors: extractColorScheme(),
    fonts: extractFontSystem(),
    shapes: extractShapeStyle(),
    
    // 内容结构
    sections: extractSections(),
    images: extractImages(),
    lists: extractLists(),
    
    // 元数据
    metadata: extractMetadata(),
    
    // 页面特征
    features: analyzePageFeatures()
  };

  console.log('Capture complete:', capturedData);
  return capturedData;
}

// ==================== 文本内容提取 ====================

/**
 * 提取 H1 主标题
 */
function extractTitle() {
  const h1 = document.querySelector('h1');
  const titleTag = document.querySelector('title');
  const ogTitle = document.querySelector('meta[property="og:title"]');
  
  let title = h1?.textContent.trim() || 
              ogTitle?.content || 
              titleTag?.textContent.trim() || 
              'Untitled Presentation';
  
  // 清洗标题（移除多余空白和特殊字符）
  title = title.replace(/\s+/g, ' ').substring(0, 100);
  
  return title;
}

/**
 * 提取副标题/眉题
 */
function extractSubtitle() {
  const candidates = [
    document.querySelector('meta[property="og:site_name"]')?.content,
    document.querySelector('.tagline')?.textContent,
    document.querySelector('.subtitle')?.textContent,
    document.querySelector('nav a:first-child')?.textContent
  ];
  
  return candidates.find(c => c)?.trim() || window.location.hostname;
}

/**
 * 提取描述
 */
function extractDescription() {
  const metaDesc = document.querySelector('meta[name="description"]');
  const ogDesc = document.querySelector('meta[property="og:description"]');
  const h1 = document.querySelector('h1');
  const firstP = h1?.nextElementSibling?.tagName === 'P' ? 
                 h1.nextElementSibling : 
                 document.querySelector('p');
  
  let desc = metaDesc?.content || 
             ogDesc?.content || 
             firstP?.textContent.trim() || 
             '';
  
  // 限制长度
  return desc.substring(0, 200);
}

// ==================== 颜色系统映射 ====================

/**
 * 提取颜色方案 - 映射到设计槽位
 */
function extractColorScheme() {
  const colors = {
    primary: null,      // Slot 1: 品牌强调色
    secondary: null,    // Slot 2: 品牌深色
    accent: null,       // Slot 3: 辅助装饰色
    background: null,
    text: null
  };

  // 1. 抓取按钮背景色 -> Accent Color
  const buttons = document.querySelectorAll('button, .btn, a[class*="button"], .cta');
  if (buttons.length > 0) {
    const colorMap = new Map();
    buttons.forEach(btn => {
      const bg = getComputedStyle(btn).backgroundColor;
      if (bg && isSaturatedColor(bg)) {
        colorMap.set(bg, (colorMap.get(bg) || 0) + 1);
      }
    });
    
    // 取出现频率最高的颜色
    if (colorMap.size > 0) {
      colors.primary = [...colorMap.entries()]
        .sort((a, b) => b[1] - a[1])[0][0];
    }
  }

  // 2. 抓取标题颜色 -> Brand Dark
  const headings = document.querySelectorAll('h1, h2, h3');
  if (headings.length > 0) {
    const headColor = getComputedStyle(headings[0]).color;
    if (headColor) {
      colors.secondary = headColor;
    }
  }

  // 3. 抓取背景色
  const body = document.body;
  colors.background = getComputedStyle(body).backgroundColor;

  // 4. 抓取文本色
  colors.text = getComputedStyle(body).color;

  // 5. 兜底颜色（使用 HubSpot 默认）
  if (!colors.primary || !isSaturatedColor(colors.primary)) {
    colors.primary = '#FF5C35'; // HubSpot Orange
  }
  if (!colors.secondary) {
    colors.secondary = '#1E2C3A'; // Deep Slate
  }

  return colors;
}

/**
 * 判断是否为高饱和度颜色
 */
function isSaturatedColor(rgbString) {
  const matches = rgbString.match(/\d+/g);
  if (!matches || matches.length < 3) return false;
  
  const [r, g, b] = matches.map(Number);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;
  
  // 饱和度 > 0.3 且不是接近黑白的颜色
  return saturation > 0.3 && max > 50 && max < 250;
}

// ==================== 字体系统提取 ====================

/**
 * 提取字体系统
 */
function extractFontSystem() {
  const h1 = document.querySelector('h1');
  const body = document.querySelector('body');
  
  return {
    heading: h1 ? getComputedStyle(h1).fontFamily : 'inherit',
    body: body ? getComputedStyle(body).fontFamily : 'inherit',
    weights: extractFontWeights()
  };
}

function extractFontWeights() {
  const weights = new Set();
  document.querySelectorAll('h1, h2, h3, strong, b').forEach(el => {
    weights.add(getComputedStyle(el).fontWeight);
  });
  return Array.from(weights);
}

// ==================== 形状风格推演 ====================

/**
 * 提取形状风格（圆角、阴影等）
 */
function extractShapeStyle() {
  const shapes = {
    cornerRadius: 'round',  // 'round' or 'square'
    shadow: false,
    texture: 'none'
  };

  // 检测按钮和卡片的圆角
  const elements = document.querySelectorAll('button, .card, .btn, img');
  const radiusValues = [];
  
  elements.forEach(el => {
    const radius = parseInt(getComputedStyle(el).borderRadius) || 0;
    if (radius > 0) radiusValues.push(radius);
  });

  const avgRadius = radiusValues.length > 0 ? 
    radiusValues.reduce((a, b) => a + b, 0) / radiusValues.length : 0;
  
  shapes.cornerRadius = avgRadius > 4 ? 'round' : 'square';

  // 检测阴影
  const hasBoxShadow = Array.from(elements).some(el => {
    const shadow = getComputedStyle(el).boxShadow;
    return shadow && shadow !== 'none';
  });
  shapes.shadow = hasBoxShadow;

  // 检测纹理（背景是否纯色）
  const bodyBg = getComputedStyle(document.body).backgroundColor;
  shapes.texture = bodyBg === 'rgb(255, 255, 255)' ? 'grid' : 'halftone';

  return shapes;
}

// ==================== 章节结构提取 ====================

/**
 * 提取章节结构 - 用于生成目录和内页
 */
function extractSections() {
  const sections = [];
  const headings = document.querySelectorAll('h2');
  
  headings.forEach((h2, index) => {
    if (index >= 8) return; // 最多8个章节
    
    const title = h2.textContent.trim();
    
    // 过滤非内容标题
    if (isNonContentHeading(title)) return;
    
    // 提取该章节的描述
    const description = extractSectionDescription(h2);
    
    // 提取列表项
    const listItems = extractSectionLists(h2);
    
    // 检测关键词（用于图标映射）
    const keywords = detectKeywords(title + ' ' + description);
    
    sections.push({
      index: sections.length + 1,
      title,
      description,
      listItems,
      keywords,
      layout: determineLayout(h2)
    });
  });

  return sections;
}

/**
 * 判断是否为非内容标题（如 FAQ, Contact）
 */
function isNonContentHeading(title) {
  const excludePatterns = /contact|faq|footer|subscribe|follow|关于我们|联系方式/i;
  return excludePatterns.test(title);
}

/**
 * 提取章节描述
 */
function extractSectionDescription(h2) {
  let sibling = h2.nextElementSibling;
  let description = '';
  
  while (sibling && sibling.tagName !== 'H2') {
    if (sibling.tagName === 'P') {
      description = sibling.textContent.trim();
      break;
    }
    sibling = sibling.nextElementSibling;
  }
  
  return description.substring(0, 200);
}

/**
 * 提取章节列表
 */
function extractSectionLists(h2) {
  let sibling = h2.nextElementSibling;
  const items = [];
  
  while (sibling && sibling.tagName !== 'H2') {
    if (sibling.tagName === 'UL' || sibling.tagName === 'OL') {
      const lis = sibling.querySelectorAll('li');
      lis.forEach((li, idx) => {
        if (idx < 5) { // 最多5个
          items.push(li.textContent.trim());
        }
      });
      break;
    }
    sibling = sibling.nextElementSibling;
  }
  
  return items;
}

/**
 * 检测关键词（用于图标映射）
 */
function detectKeywords(text) {
  const keywordMap = {
    growth: /growth|increase|revenue|boost|提升|增长/i,
    team: /team|people|community|员工|团队/i,
    ai: /ai|intelligent|smart|automation|智能|自动化/i,
    global: /global|world|international|全球|国际/i,
    security: /security|privacy|safe|安全|隐私/i,
    data: /data|analytics|chart|数据|分析/i
  };
  
  const matched = [];
  for (const [key, pattern] of Object.entries(keywordMap)) {
    if (pattern.test(text)) {
      matched.push(key);
    }
  }
  
  return matched;
}

/**
 * 判断章节应使用的布局
 */
function determineLayout(h2) {
  let sibling = h2.nextElementSibling;
  let hasImage = false;
  let hasList = false;
  let hasTable = false;
  
  while (sibling && sibling.tagName !== 'H2') {
    if (sibling.tagName === 'IMG' || sibling.querySelector('img')) {
      hasImage = true;
    }
    if (sibling.tagName === 'UL' || sibling.tagName === 'OL') {
      hasList = true;
    }
    if (sibling.tagName === 'TABLE') {
      hasTable = true;
    }
    sibling = sibling.nextElementSibling;
  }
  
  // 布局判断逻辑
  if (hasTable) return 'DATA_STORY';
  if (hasList) return 'LIST_SIDEBAR';
  if (hasImage) return 'NARRATIVE';
  return 'STANDARD_FLOW';
}

// ==================== 图片提取与清洗 ====================

/**
 * 提取高质量图片
 */
function extractImages() {
  const images = [];
  const imgElements = document.querySelectorAll('img');
  
  imgElements.forEach((img, index) => {
    if (index >= 20) return; // 最多20张候选
    
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;
    const aspectRatio = width / height;
    
    // 应用图片清洗规则
    if (width < 400) return; // 太小
    if (aspectRatio > 3 || aspectRatio < 0.33) return; // 极端比例
    
    images.push({
      src: img.src,
      alt: img.alt || '',
      width,
      height,
      aspectRatio,
      isCover: width >= 1080 && height >= 600, // 适合做封面
      isLogo: img.alt.toLowerCase().includes('logo') || 
              img.className.toLowerCase().includes('logo')
    });
  });

  // 按尺寸排序
  images.sort((a, b) => (b.width * b.height) - (a.width * a.height));
  
  return images;
}

// ==================== 列表提取 ====================

function extractLists() {
  const lists = [];
  document.querySelectorAll('ul, ol').forEach((list, idx) => {
    if (idx >= 5) return;
    
    const items = Array.from(list.querySelectorAll('li'))
      .map(li => li.textContent.trim())
      .filter(text => text.length > 0 && text.length < 200);
    
    if (items.length > 0) {
      lists.push({ items });
    }
  });
  
  return lists;
}

// ==================== 元数据提取 ====================

function extractMetadata() {
  return {
    author: document.querySelector('meta[name="author"]')?.content || '',
    siteName: document.querySelector('meta[property="og:site_name"]')?.content || '',
    favicon: document.querySelector('link[rel*="icon"]')?.href || '',
    logo: extractLogo(),
    date: new Date().toISOString().split('T')[0]
  };
}

function extractLogo() {
  const selectors = [
    'header img[alt*="logo" i]',
    'nav img[class*="logo" i]',
    'img[id*="logo" i]',
    'header img:first-of-type',
    '.logo img'
  ];

  for (const sel of selectors) {
    const logo = document.querySelector(sel);
    if (logo && logo.width < 300) { // Logo 通常不会太大
      return logo.src;
    }
  }

  return '';
}

// ==================== 页面特征分析 ====================

function analyzePageFeatures() {
  return {
    hasHero: !!document.querySelector('.hero, .banner, header img'),
    hasCTA: !!document.querySelector('button, .cta, .btn-primary'),
    hasTestimonial: !!document.querySelector('blockquote, .testimonial'),
    hasStats: /\d+%|\$\d+|[\d,]+\+/.test(document.body.textContent),
    language: detectLanguage(),
    wordCount: document.body.textContent.split(/\s+/).length
  };
}

function detectLanguage() {
  const text = document.body.textContent.substring(0, 1000);
  const chineseChars = text.match(/[\u4e00-\u9fa5]/g);
  return chineseChars && chineseChars.length > 50 ? 'chinese' : 'english';
}

// 自动执行（可选 - 用于调试）
if (window.location.search.includes('autoCapture=true')) {
  setTimeout(() => {
    const data = capturePageStyle();
    console.log('Auto-captured data:', data);
  }, 1000);
}
