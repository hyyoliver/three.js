# 🎨 StyleSnatch - 风格捕手

> **一键抓取网页视觉风格，生成高保真 PowerPoint 演示模版**

StyleSnatch 是一款基于 Chrome Manifest V3 的浏览器插件，能够智能分析当前网页的设计风格（配色、字体、布局、图片），并基于 **PptxGenJS** 库自动生成符合专业设计规范的 `.pptx` 文件。

---

## ✨ 核心特性

### 🎯 智能风格抓取
- **色彩系统映射**：自动提取网页主色调、品牌色、背景色
- **字体系统分析**：识别标题字体、正文字体、字重层级
- **形状风格推演**：检测圆角、阴影、纹理等视觉特征
- **内容结构提取**：智能识别标题、章节、列表、图片

### 📐 固定设计系统
基于 **16:9 画布 (1920×1080)**，内置完整的设计规范：
- ✅ 12列栅格系统 (40px Gutter)
- ✅ 固定安全边距 (Top: 60px, Bottom: 60px, Left/Right: 100px)
- ✅ 字号阶梯表 (H1: 48pt, Body: 20pt, Big Data: 96pt+)
- ✅ 标准容器版式 (阅读流、双屏分割、三列阵列)

### 🎭 六大母版布局
插件会根据网页内容自动选择最合适的布局：

| 布局名称 | 适用场景 | 特点 |
|---------|---------|------|
| **叙事拼贴** | 引言、核心观点 | 左文右图，拱门蒙版 |
| **列表与侧边栏** | 步骤、策略列表 | 悬挂缩进，资源侧边栏 |
| **数据故事** | 图表、趋势分析 | 全屏图表画布 |
| **案例实战** | 截图、产品展示 | 设备框架，深色投影 |
| **甜甜圈数据** | 核心百分比 | 巨型环形图，居中数据 |
| **挑战与对策** | 问题解决方案 | 左右对比，连接箭头 |

### 🖼️ 自动页面生成
- **封面页**：支持左文右图 / 全屏居中两种模版
- **目录页**：便当盒卡片布局，最多6个章节
- **章节过渡页**：1:1分割，左信息右视觉
- **内容页**：根据DOM结构自动分发布局
- **封底页**：联系方式网格 / 愿景宣言

### 🎨 HubSpot 风格主题
内置 **"暖科技"** 视觉风格：
- 🟠 HubSpot Orange (#FF5C35) - 品牌强调色
- ⚫ Deep Slate (#1E2C3A) - 深色文字
- 🟡 Cream (#F9F6F2) - 暖米白背景
- 🟣 Dark Purple (#4A154B) - 辅助装饰色

### 🧩 100 个智能图标
- 基于关键词自动匹配图标（如 "Growth" → 📈 Trending-Up）
- 支持 Feather Icons / Lucide Icons 标准
- 线性描边风格，动态颜色适配

---

## 📦 项目结构

```
stylesnatch-extension/
├── manifest.json                 # Chrome 扩展配置 (Manifest V3)
├── config.js                     # 🔧 核心常量文件（所有物理参数）
├── popup.html                    # 弹窗界面
├── styles/
│   └── popup.css                 # 弹窗样式
├── scripts/
│   ├── popup.js                  # 弹窗交互逻辑
│   ├── background.js             # 后台服务 Worker
│   ├── content.js                # 🌐 内容脚本（网页分析）
│   ├── pptEngine.js              # 📊 PPT 生成引擎（包含 initMasterSlide）
│   └── icons.js                  # 🎨 图标库映射
├── lib/
│   └── pptxgen.bundle.js         # PptxGenJS 库（需下载）
└── icons/
    ├── icon-16.png
    ├── icon-32.png
    ├── icon-48.png
    └── icon-128.png
```

---

## 🚀 安装与使用

### 1. 安装依赖

下载 **PptxGenJS** 库：

```bash
# 使用 npm
npm install pptxgenjs

# 或直接下载 CDN 版本
wget https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js -O lib/pptxgen.bundle.js
```

### 2. 加载插件到 Chrome

1. 打开 Chrome 浏览器，访问 `chrome://extensions/`
2. 开启右上角的 **"开发者模式"**
3. 点击 **"加载已解压的扩展程序"**
4. 选择 `stylesnatch-extension` 文件夹
5. 插件图标会出现在浏览器工具栏

### 3. 使用插件

1. 访问任意网页（如公司官网、设计案例）
2. 点击浏览器工具栏的 **StyleSnatch** 图标
3. 在弹窗中点击 **"抓取风格并生成PPT"**
4. 等待进度条完成（5-15秒）
5. 点击 **"下载 .pptx 文件"**
6. 使用 PowerPoint / Keynote / Google Slides 打开

---

## 🛠️ 核心技术

### 1. config.js - 设计系统常量

包含 **14 个模块**，2000+ 行配置：

```javascript
const DESIGN_CONFIG = {
  CANVAS: { WIDTH: 1920, HEIGHT: 1080 },
  SAFE_MARGINS: { TOP: 60, BOTTOM: 60, LEFT: 100, RIGHT: 100 },
  GRID: { COLUMNS: 12, GUTTER: 40, SPANS: { COL_3: 400, COL_6: 840 } },
  TYPOGRAPHY: { 
    TYPE_SCALE: { 
      H1: { SIZE: 48, WEIGHT: 700, LINE_HEIGHT: 1.1 },
      BODY: { SIZE: 20, WEIGHT: 400, LINE_HEIGHT: 1.5 }
    }
  },
  // ... 更多配置
};
```

### 2. content.js - 智能抓取引擎

基于 **动态抓取规则**，提取：

```javascript
function capturePageStyle() {
  return {
    title: extractTitle(),              // H1 / Title Tag
    colors: extractColorScheme(),       // 按钮色 → Accent, 标题色 → Dark
    fonts: extractFontSystem(),         // 字体家族、字重
    shapes: extractShapeStyle(),        // 圆角 / 阴影 / 纹理
    sections: extractSections(),        // H2 章节 + 描述 + 列表
    images: extractImages(),            // 过滤小于 400px 的图片
    metadata: extractMetadata()         // Logo / Author / Favicon
  };
}
```

### 3. pptEngine.js - 母版页引擎

**核心函数：`initMasterSlide`**

```javascript
function initMasterSlide(pptx, capturedData) {
  // 1. 设置全局布局尺寸 (16:9)
  pptx.defineLayout({
    name: 'STYLESNATCH_MASTER',
    width: 10,   // 1920px / 96 DPI = 20 inches
    height: 5.625 // 1080px / 96 DPI = 11.25 inches
  });
  
  // 2. 定义颜色方案
  const colors = parseColors(capturedData.colors);
  
  // 3. 定义母版对象（导航栏、Logo、页码）
  const masterSlide = {
    title: 'StyleSnatch Master',
    background: { color: colors.background },
    objects: [
      { /* Logo 锚点 */ },
      { /* 页码锚点 */ }
    ]
  };
  
  // 4. 应用母版
  pptx.defineSlideMaster(masterSlide);
}
```

### 4. icons.js - 图标智能匹配

```javascript
// 关键词 → 图标名称
const KEYWORD_ICON_MAP = {
  growth: 'trending-up',
  ai: 'sparkles',
  team: 'users',
  // ... 100+ 映射
};

// 智能匹配
function matchIcon(text) {
  const lowerText = text.toLowerCase();
  for (const [keyword, iconName] of Object.entries(KEYWORD_ICON_MAP)) {
    if (lowerText.includes(keyword)) return iconName;
  }
  return 'arrow-right'; // 默认图标
}
```

---

## 🎨 设计规范来源

本项目基于以下设计文档构建：

1. **固定设计规则**（8 章）
   - 全局规范（画布、网格、排版）
   - 封面页引擎（中英分治、1.2-1.4倍视觉补偿）
   - 目录页引擎（便当盒卡片）
   - 章节过渡页引擎（1:1 分割）
   - 母版页引擎（6 种布局）
   - 图表引擎（微观原子 + 宏观阵列）
   - 图标库（100 个核心图标）
   - 封底页引擎（宣言 / 联系方式）

2. **动态抓取规则**
   - 色彩系统映射（Slot 1/2/3）
   - 形状风格推演（圆角 / 阴影逻辑）
   - 智能分发算法（布局选择）
   - 图片清洗规则（分辨率 / 宽高比检查）

---

## 📐 核心常量速查

### 画布尺寸
- **宽度**：1920px (20 inches @ 96 DPI)
- **高度**：1080px (11.25 inches @ 96 DPI)

### 安全边距
- **上下**：60px
- **左右**：100px

### 12列网格
- **列数**：12
- **间隙**：40px
- **3列宽**：400px
- **6列宽**：840px
- **12列宽**：1720px

### 字号阶梯
| 角色 | 字号 | 字重 | 行高 |
|------|------|------|------|
| H1 | 48pt | 700 | 1.1 |
| H2 (眉题) | 16pt | 700 | 1.0 |
| Body | 20pt | 400 | 1.5 |
| H3 | 24pt | 600 | 1.3 |
| Big Data | 96pt+ | 900 | 1.0 |
| Caption | 14pt | 300 | 1.2 |

### 封面标题
| 语言 | H1 字号 | 字重 | 行高 |
|------|---------|------|------|
| 英文 | 140pt | 900 | 0.9 |
| 中文 | 100pt | 700 | 1.2 |

---

## 🔧 高级配置

### 自定义颜色方案

编辑 `config.js` 的 `COLORS` 部分：

```javascript
COLORS: {
  PRIMARY: {
    HUBSPOT_ORANGE: '#FF5C35',  // 修改为您的品牌色
    DEEP_SLATE: '#1E2C3A',
    CREAM: '#F9F6F2'
  }
}
```

### 添加新布局

在 `pptEngine.js` 中添加：

```javascript
async function createMyCustomLayout(pptx, data, section) {
  const slide = pptx.addSlide();
  // 自定义布局逻辑
}

// 在 createContentSlide 中注册
case 'MY_CUSTOM':
  await createMyCustomLayout(pptx, data, section);
  break;
```

---

## 🐛 已知限制

1. **图片跨域问题**：部分网站的图片可能因 CORS 限制无法加载
   - 解决方案：使用 Base64 编码或代理服务器

2. **动态内容**：无法抓取 JavaScript 动态加载的内容
   - 解决方案：等待页面完全加载后再抓取

3. **图表生成**：当前版本图表为占位符
   - 待开发：集成 Chart.js 或 D3.js

4. **字体嵌入**：生成的 PPT 使用系统默认字体
   - 待开发：支持 Web Fonts 转换

---

## 📝 开发计划

- [ ] **v1.1**：支持图表实时渲染（柱状图、折线图、甜甜圈）
- [ ] **v1.2**：AI 驱动的智能排版优化
- [ ] **v1.3**：多主题切换（HubSpot / Apple / Stripe）
- [ ] **v1.4**：支持导出 Google Slides 格式
- [ ] **v2.0**：Web 版在线编辑器

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发环境
```bash
# 克隆仓库
git clone https://github.com/yourusername/stylesnatch.git

# 安装依赖
cd stylesnatch-extension
npm install

# 启动开发模式（热重载）
npm run dev
```

### 代码规范
- 使用 ESLint (Airbnb Style)
- 所有常量必须在 `config.js` 中定义
- 函数命名遵循驼峰命名法
- 注释使用中文（文档使用中英双语）

---

## 📄 许可证

MIT License

Copyright (c) 2024 StyleSnatch

---

## 🙏 致谢

- **PptxGenJS**：强大的 PPT 生成库
- **Feather Icons**：优雅的线性图标库
- **HubSpot**：设计灵感来源

---

## 📮 联系方式

- 项目主页：[GitHub](https://github.com/yourusername/stylesnatch)
- 问题反馈：[Issues](https://github.com/yourusername/stylesnatch/issues)
- 邮箱：stylesnatch@example.com

---

<div align="center">
  <p>
    <strong>用 StyleSnatch，让每个网页都成为你的设计灵感</strong>
  </p>
  <p>
    Made with ❤️ by StyleSnatch Team
  </p>
</div>
