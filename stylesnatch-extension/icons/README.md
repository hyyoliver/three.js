# 图标文件夹

此文件夹用于存放 Chrome 插件的图标文件。

## 所需文件

请放置以下尺寸的图标文件：

- `icon-16.png` - 16x16 像素（扩展管理页面）
- `icon-32.png` - 32x32 像素（Windows 任务栏）
- `icon-48.png` - 48x48 像素（扩展管理页面）
- `icon-128.png` - 128x128 像素（安装时显示、Chrome Web Store）

## 设计建议

- **主色调**：HubSpot Orange (#FF5C35)
- **风格**：简洁、现代、扁平化
- **图案建议**：
  - ✅ 字母 "SS"（StyleSnatch 缩写）
  - ✅ 抓手图标 + PPT 文件
  - ✅ 调色板 + 幻灯片
  - ✅ 魔法棒 + 文档

## 快速生成占位图标

如果您没有设计工具，可以使用以下方法快速生成：

### 方法 1：使用 ImageMagick（命令行）

```bash
# 生成 128x128 橙色背景 + 白色 "SS" 文字
convert -size 128x128 xc:"#FF5C35" -gravity center \
  -pointsize 60 -fill white -font Arial-Bold \
  -annotate +0+0 "SS" icon-128.png

# 生成其他尺寸
convert icon-128.png -resize 48x48 icon-48.png
convert icon-128.png -resize 32x32 icon-32.png
convert icon-128.png -resize 16x16 icon-16.png
```

### 方法 2：使用在线工具

访问以下网站快速生成图标：
- https://www.favicon.cc/
- https://favicon.io/
- https://www.canva.com/

### 方法 3：使用 Figma 模版

1. 访问 Figma 社区搜索 "Chrome Extension Icon Template"
2. 复制模版到您的项目
3. 修改颜色和文字
4. 导出为 PNG

## 临时方案

如果暂时没有图标，Chrome 会使用默认图标。插件功能不受影响。

您也可以临时注释掉 `manifest.json` 中的图标配置：

```json
{
  // "icons": {
  //   "16": "icons/icon-16.png",
  //   ...
  // }
}
```
