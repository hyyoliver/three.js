# 📦 StyleSnatch 安装指南

## 快速安装（5分钟）

### 步骤 1：下载 PptxGenJS 库

由于 PptxGenJS 较大（~500KB），需要单独下载：

```bash
# 方法一：使用 npm（推荐）
cd stylesnatch-extension
npm install pptxgenjs
cp node_modules/pptxgenjs/dist/pptxgen.bundle.js lib/

# 方法二：使用 wget
mkdir -p lib
wget https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js -O lib/pptxgen.bundle.js

# 方法三：手动下载
# 访问 https://github.com/gitbrent/PptxGenJS/releases
# 下载最新版本的 pptxgen.bundle.js
# 将文件放到 lib/ 文件夹
```

### 步骤 2：准备插件图标（可选）

创建简单的图标占位符（或使用设计软件创建）：

```bash
# 使用 ImageMagick 生成占位图标
convert -size 128x128 xc:orange -gravity center -pointsize 60 -fill white -annotate +0+0 "SS" icons/icon-128.png
convert icons/icon-128.png -resize 48x48 icons/icon-48.png
convert icons/icon-128.png -resize 32x32 icons/icon-32.png
convert icons/icon-128.png -resize 16x16 icons/icon-16.png
```

**或者跳过这一步**，Chrome 会使用默认图标。

### 步骤 3：加载到 Chrome

1. 打开 Chrome 浏览器
2. 在地址栏输入：`chrome://extensions/`
3. 开启右上角的 **"开发者模式"** 开关
4. 点击 **"加载已解压的扩展程序"** 按钮
5. 选择 `stylesnatch-extension` 文件夹
6. 看到 StyleSnatch 出现在扩展列表中 ✅

### 步骤 4：固定到工具栏

1. 点击浏览器右上角的 **拼图图标**（扩展）
2. 找到 **StyleSnatch**
3. 点击右侧的 **图钉图标** 固定到工具栏

### 步骤 5：测试使用

1. 访问任意网页（建议先用设计精美的网站，如 Apple.com 或 Stripe.com）
2. 点击工具栏的 **StyleSnatch** 图标
3. 点击 **"抓取风格并生成PPT"**
4. 等待几秒，点击 **"下载 .pptx 文件"**
5. 使用 PowerPoint / Keynote 打开查看效果

---

## 常见问题

### Q1: 提示找不到 pptxgen.bundle.js

**原因**：PptxGenJS 库未正确放置。

**解决**：
```bash
# 确保文件存在
ls lib/pptxgen.bundle.js

# 如果不存在，重新下载
wget https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js -O lib/pptxgen.bundle.js
```

### Q2: 插件图标不显示

**原因**：icons 文件夹缺少图标文件。

**解决**：
- 创建任意 PNG 图片，命名为 `icon-16.png`, `icon-32.png`, `icon-48.png`, `icon-128.png`
- 或者编辑 `manifest.json`，删除 `icons` 和 `action.default_icon` 字段

### Q3: 点击抓取按钮没反应

**原因**：Content Script 未正确注入。

**解决**：
1. 打开 Chrome 开发者工具（F12）
2. 切换到 Console 标签
3. 刷新页面
4. 检查是否有错误信息

### Q4: 生成的 PPT 中图片无法显示

**原因**：图片跨域限制（CORS）。

**解决**：
- 当前版本暂不支持跨域图片
- 计划在 v1.1 版本中使用 Base64 编码解决

### Q5: 需要更新插件怎么办？

**步骤**：
1. 访问 `chrome://extensions/`
2. 找到 StyleSnatch
3. 点击 **"重新加载"** 按钮（循环箭头图标）

---

## 开发模式（适用于开发者）

### 启用调试

编辑 `manifest.json`，取消注释调试权限：

```json
{
  "permissions": [
    "activeTab",
    "scripting",
    "storage",
    "debugger"  // 添加这一行
  ]
}
```

### 查看 Console 日志

1. **Popup 日志**：
   - 点击插件图标打开弹窗
   - 右键弹窗 → **检查**
   - 切换到 Console 标签

2. **Content Script 日志**：
   - 打开目标网页
   - 按 F12 打开开发者工具
   - Console 中会显示 "StyleSnatch Content Script loaded"

3. **Background Service Worker 日志**：
   - 访问 `chrome://extensions/`
   - 找到 StyleSnatch
   - 点击 **"Service Worker"** 链接

### 热重载（推荐）

安装 `web-ext` 工具：

```bash
npm install -g web-ext

# 启动热重载模式
web-ext run --source-dir=. --browser-console
```

---

## 卸载

1. 访问 `chrome://extensions/`
2. 找到 StyleSnatch
3. 点击 **"移除"** 按钮
4. 确认删除

---

## 下一步

- 阅读 [README.md](README.md) 了解详细功能
- 查看 [config.js](config.js) 了解设计常量
- 修改 `COLORS` 配置自定义主题

---

**遇到问题？** 提交 Issue: https://github.com/yourusername/stylesnatch/issues
