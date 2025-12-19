# 第三方库文件夹

此文件夹用于存放外部 JavaScript 库。

## 必需库：PptxGenJS

StyleSnatch 使用 **PptxGenJS** 库来生成 PowerPoint 文件。

### 安装方法

#### 方法 1：使用 npm（推荐）

```bash
# 在项目根目录执行
npm install pptxgenjs

# 复制到 lib 文件夹
cp node_modules/pptxgenjs/dist/pptxgen.bundle.js lib/
```

#### 方法 2：使用快捷脚本

```bash
# 在项目根目录执行
npm run install-lib
```

#### 方法 3：手动下载

```bash
# 使用 wget
wget https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js -O lib/pptxgen.bundle.js

# 使用 curl
curl -o lib/pptxgen.bundle.js https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js
```

#### 方法 4：从 CDN 下载

访问以下链接，右键 → 另存为：
- https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js

### 验证安装

确保文件存在：

```bash
ls -lh lib/pptxgen.bundle.js
# 应显示约 500KB 的文件
```

## 库信息

- **名称**：PptxGenJS
- **版本**：3.12.0+
- **大小**：约 500KB
- **许可证**：MIT
- **官方文档**：https://gitbrent.github.io/PptxGenJS/
- **GitHub**：https://github.com/gitbrent/PptxGenJS

## 为什么不直接包含在项目中？

1. **文件过大**：PptxGenJS 库约 500KB，不适合放入 Git 仓库
2. **版本管理**：通过 npm 可以更方便地更新版本
3. **许可合规**：避免重新分发第三方代码

## 故障排除

### 问题：找不到 pptxgen.bundle.js

**解决**：按照上述方法重新下载库文件。

### 问题：版本不兼容

**解决**：确保使用 3.12.0 或更高版本：

```bash
npm install pptxgenjs@latest
cp node_modules/pptxgenjs/dist/pptxgen.bundle.js lib/
```

### 问题：网络无法访问 CDN

**解决**：
1. 在另一台可联网的机器上下载文件
2. 通过 U 盘或其他方式传输到开发机器
3. 放置到 `lib/` 文件夹

## 其他可选库（未来版本）

以下库计划在未来版本中引入：

- **Chart.js** - 用于实时渲染图表
- **html2canvas** - 用于网页截图
- **jsQR** - 用于二维码生成
