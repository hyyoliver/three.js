# ⚡ 快速开始（1 分钟上手）

## 最小安装步骤

### 1️⃣ 下载核心库（30 秒）

```bash
cd stylesnatch-extension
wget https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js -O lib/pptxgen.bundle.js
```

### 2️⃣ 加载到 Chrome（30 秒）

1. 打开 `chrome://extensions/`
2. 开启 **"开发者模式"**
3. 点击 **"加载已解压的扩展程序"**
4. 选择 `stylesnatch-extension` 文件夹

### 3️⃣ 测试使用（30 秒）

1. 访问 https://stripe.com 或 https://apple.com
2. 点击工具栏的 **StyleSnatch** 图标
3. 点击 **"抓取风格并生成PPT"**
4. 点击 **"下载 .pptx 文件"**
5. 打开生成的 PPT 查看效果 ✨

---

## 一行命令安装（如果已有 npm）

```bash
cd stylesnatch-extension && npm run install-lib && echo "✅ 安装完成！访问 chrome://extensions/ 加载插件"
```

---

## 核心文件说明（30 秒了解架构）

```
stylesnatch-extension/
├── config.js           ← 🔧 所有设计参数（画布、网格、字号）
├── scripts/
│   ├── content.js      ← 🌐 抓取网页（颜色、字体、图片）
│   ├── pptEngine.js    ← 📊 生成 PPT（母版页、布局）
│   └── icons.js        ← 🎨 图标映射（关键词 → 图标）
└── lib/
    └── pptxgen.bundle.js ← 📦 PptxGenJS 库（需下载）
```

---

## 核心函数速查

### 1. 初始化母版页（pptEngine.js）

```javascript
function initMasterSlide(pptx, capturedData) {
  // 设置 16:9 画布
  pptx.defineLayout({ 
    name: 'STYLESNATCH_MASTER',
    width: 10, height: 5.625 
  });
  
  // 定义颜色方案
  const colors = parseColors(capturedData.colors);
  
  // 应用母版
  pptx.defineSlideMaster(masterSlide);
}
```

### 2. 抓取网页风格（content.js）

```javascript
function capturePageStyle() {
  return {
    title: extractTitle(),            // H1 标题
    colors: extractColorScheme(),     // 主色调
    sections: extractSections(),      // 章节结构
    images: extractImages()           // 高质量图片
  };
}
```

### 3. 智能图标匹配（icons.js）

```javascript
function matchIcon(text) {
  // "Growth" → "trending-up"
  // "AI" → "sparkles"
  // "Team" → "users"
  return KEYWORD_ICON_MAP[keyword] || 'arrow-right';
}
```

---

## 自定义配置（10 秒修改主题）

编辑 `config.js`：

```javascript
COLORS: {
  PRIMARY: {
    HUBSPOT_ORANGE: '#FF5C35',  // ← 改成你的品牌色
    DEEP_SLATE: '#1E2C3A',      // ← 改成深色文字色
    CREAM: '#F9F6F2'            // ← 改成背景色
  }
}
```

---

## 调试技巧

### 查看抓取数据

在目标网页打开控制台（F12），输入：

```javascript
// 手动触发抓取
const data = capturePageStyle();
console.log(data);
```

### 查看插件日志

1. **Popup 日志**：右键弹窗 → 检查
2. **Content Script 日志**：目标网页 F12 → Console
3. **Background 日志**：`chrome://extensions/` → Service Worker

---

## 常见问题（1 秒解决）

| 问题 | 解决方案 |
|------|---------|
| 找不到 pptxgen.bundle.js | `wget https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js -O lib/pptxgen.bundle.js` |
| 图标不显示 | 跳过，不影响功能 |
| 点击按钮没反应 | 刷新页面，重新点击 |
| 图片无法加载 | 当前版本限制，v1.1 修复 |

---

## 下一步

- 📖 阅读完整文档：[README.md](README.md)
- 🔧 了解设计常量：[config.js](config.js)
- 📝 查看详细安装：[INSTALL.md](INSTALL.md)

---

**遇到问题？** 5 秒提交 Issue: https://github.com/yourusername/stylesnatch/issues

**喜欢这个项目？** 给个 ⭐ Star 吧！
