/**
 * StyleSnatch - PPT 引擎核心
 * 基于 PptxGenJS 构建高保真演示文稿
 */

// 导入配置（在浏览器环境中，config 已经全局加载）
const CONFIG = typeof DESIGN_CONFIG !== 'undefined' ? DESIGN_CONFIG : require('../config.js');

/**
 * 主生成函数
 * @param {Object} capturedData - 从网页抓取的数据
 * @param {Function} progressCallback - 进度回调函数
 * @returns {PptxGenJS} PPTX 对象
 */
export async function generatePPTX(capturedData, progressCallback = () => {}) {
  try {
    // 1. 初始化 PPTX 对象
    progressCallback(5, '初始化演示文稿...');
    const pptx = new PptxGenJS();
    
    // 2. 设置文档属性
    pptx.author = 'StyleSnatch';
    pptx.company = capturedData.metadata?.siteName || 'StyleSnatch';
    pptx.revision = '1';
    pptx.subject = capturedData.title;
    pptx.title = capturedData.title;
    
    // 3. 定义布局和母版
    progressCallback(10, '创建母版页...');
    initMasterSlide(pptx, capturedData);
    
    // 4. 生成封面
    progressCallback(20, '生成封面...');
    await createCoverSlide(pptx, capturedData);
    
    // 5. 生成目录
    progressCallback(30, '生成目录...');
    await createTOCSlide(pptx, capturedData);
    
    // 6. 生成章节过渡页和内容页
    if (capturedData.sections && capturedData.sections.length > 0) {
      const sectionProgress = 40 / capturedData.sections.length;
      
      for (let i = 0; i < capturedData.sections.length; i++) {
        const section = capturedData.sections[i];
        progressCallback(30 + (i * sectionProgress), `生成第 ${i + 1} 章节...`);
        
        // 章节过渡页
        await createSectionDividerSlide(pptx, capturedData, section);
        
        // 章节内容页
        await createContentSlide(pptx, capturedData, section);
      }
    }
    
    // 7. 生成封底
    progressCallback(80, '生成封底...');
    await createClosingSlide(pptx, capturedData);
    
    progressCallback(95, '最终处理...');
    
    return pptx;
  } catch (error) {
    console.error('PPT Generation Error:', error);
    throw error;
  }
}

/**
 * 初始化母版页 - 定义全局样式和布局
 * 这是整个 PPT 的骨架系统
 */
function initMasterSlide(pptx, capturedData) {
  console.log('Initializing Master Slide...');
  
  // 1. 设置全局布局尺寸（16:9）
  pptx.defineLayout({
    name: 'STYLESNATCH_MASTER',
    width: CONFIG.CANVAS.WIDTH / 96,   // 转换为英寸 (PptxGenJS 使用英寸)
    height: CONFIG.CANVAS.HEIGHT / 96
  });
  pptx.layout = 'STYLESNATCH_MASTER';
  
  // 2. 定义全局颜色方案
  const colors = parseColors(capturedData.colors);
  
  // 3. 定义母版对象
  const masterSlide = {
    title: 'StyleSnatch Master',
    
    // 背景样式
    background: {
      color: colors.background || CONFIG.COLORS.PRIMARY.CREAM
    },
    
    // 全局对象（每页都会显示）
    objects: [
      // 导航栏 - Logo 锚点
      {
        placeholder: {
          options: {
            name: 'logo',
            type: 'body',
            x: pxToInch(CONFIG.NAVIGATION.ANCHOR_A.X),
            y: pxToInch(CONFIG.NAVIGATION.ANCHOR_A.Y),
            w: pxToInch(200),
            h: pxToInch(CONFIG.NAVIGATION.ANCHOR_A.HEIGHT)
          }
        }
      },
      
      // 导航栏 - 页码锚点
      {
        placeholder: {
          options: {
            name: 'pageNumber',
            type: 'body',
            x: pxToInch(CONFIG.NAVIGATION.ANCHOR_B.X - 100),
            y: pxToInch(CONFIG.NAVIGATION.ANCHOR_B.Y),
            w: pxToInch(100),
            h: pxToInch(40),
            align: 'right',
            fontSize: 14,
            bold: true,
            color: colors.primary || CONFIG.COLORS.PRIMARY.HUBSPOT_ORANGE
          }
        }
      }
    ],
    
    // 样式表（全局文本样式）
    slideNumber: {
      x: pxToInch(CONFIG.NAVIGATION.ANCHOR_B.X - 100),
      y: pxToInch(CONFIG.NAVIGATION.ANCHOR_B.Y),
      color: colors.primary || CONFIG.COLORS.PRIMARY.HUBSPOT_ORANGE,
      fontFace: 'Arial',
      fontSize: 14,
      bold: true
    }
  };
  
  // 4. 应用母版（注意：PptxGenJS 3.x 使用 defineSlideMaster）
  try {
    pptx.defineSlideMaster(masterSlide);
    console.log('Master slide defined successfully');
  } catch (error) {
    console.warn('Could not define master slide (may not be supported):', error);
  }
  
  // 5. 返回全局样式对象供其他函数使用
  pptx._styleSnatchConfig = {
    colors,
    fonts: {
      heading: 'Arial Black',
      body: 'Arial',
      ...capturedData.fonts
    },
    shapes: capturedData.shapes || {}
  };
}

/**
 * 创建封面页
 */
async function createCoverSlide(pptx, data) {
  const slide = pptx.addSlide();
  const colors = pptx._styleSnatchConfig.colors;
  const language = data.features?.language || 'english';
  
  // 判断使用哪个模版
  const hasHeroImage = data.images.find(img => img.isCover);
  const useTemplateA = !!hasHeroImage; // 有封面图用模版A（左文右图）
  
  if (useTemplateA) {
    // 模版 A: The Split
    createCoverTemplateSplit(slide, data, colors, language, hasHeroImage);
  } else {
    // 模版 B: The Center
    createCoverTemplateCenter(slide, data, colors, language);
  }
}

/**
 * 封面模版 A: 左文右图
 */
function createCoverTemplateSplit(slide, data, colors, language, heroImage) {
  const cfg = CONFIG.COVER;
  const typoCfg = language === 'chinese' ? cfg.TYPOGRAPHY.CHINESE : cfg.TYPOGRAPHY.ENGLISH;
  
  // 1. 右侧大图
  if (heroImage) {
    slide.addImage({
      path: heroImage.src,
      x: pxToInch(cfg.TEMPLATE_A.RIGHT_IMAGE.X),
      y: pxToInch(cfg.TEMPLATE_A.RIGHT_IMAGE.Y),
      w: pxToInch(cfg.TEMPLATE_A.RIGHT_IMAGE.W),
      h: pxToInch(cfg.TEMPLATE_A.RIGHT_IMAGE.H),
      sizing: { type: 'cover', w: pxToInch(820), h: pxToInch(1080) }
    });
  }
  
  // 2. 左侧文本区 - Eyebrow（眉题）
  slide.addText(data.subtitle || data.metadata?.siteName || '', {
    x: pxToInch(CONFIG.SAFE_MARGINS.LEFT),
    y: pxToInch(300),
    w: pxToInch(760),
    h: pxToInch(40),
    fontSize: cfg.TYPOGRAPHY.EYEBROW.SIZE,
    bold: true,
    color: colors.primary,
    align: 'left',
    valign: 'top',
    charSpacing: language === 'english' ? cfg.TYPOGRAPHY.EYEBROW.TRACKING_EN : cfg.TYPOGRAPHY.EYEBROW.TRACKING_CN
  });
  
  // 3. 主标题 H1
  const titleText = language === 'english' ? data.title.toUpperCase() : data.title;
  slide.addText(titleText, {
    x: pxToInch(CONFIG.SAFE_MARGINS.LEFT),
    y: pxToInch(360),
    w: pxToInch(760),
    h: pxToInch(300),
    fontSize: typoCfg.H1_SIZE,
    bold: true,
    color: colors.secondary,
    align: 'left',
    valign: 'middle',
    lineSpacing: typoCfg.H1_LINE_HEIGHT * 100,
    breakLine: true
  });
  
  // 4. 副标题
  if (data.description) {
    slide.addText(data.description, {
      x: pxToInch(CONFIG.SAFE_MARGINS.LEFT),
      y: pxToInch(700),
      w: pxToInch(760),
      h: pxToInch(100),
      fontSize: typoCfg.SUBTITLE_SIZE,
      color: CONFIG.COLORS.SECONDARY.TEXT_GREY,
      align: 'left',
      valign: 'top',
      lineSpacing: typoCfg.SUBTITLE_LINE_HEIGHT * 100
    });
  }
  
  // 5. Logo（左上角）
  if (data.metadata?.logo) {
    slide.addImage({
      path: data.metadata.logo,
      x: pxToInch(cfg.TEMPLATE_A.LOGO.X),
      y: pxToInch(cfg.TEMPLATE_A.LOGO.Y),
      h: pxToInch(40),
      sizing: { type: 'contain', h: pxToInch(40) }
    });
  }
}

/**
 * 封面模版 B: 全屏居中
 */
function createCoverTemplateCenter(slide, data, colors, language) {
  const cfg = CONFIG.COVER;
  const typoCfg = language === 'chinese' ? cfg.TYPOGRAPHY.CHINESE : cfg.TYPOGRAPHY.ENGLISH;
  
  // 1. 背景色块
  slide.background = { color: colors.primary || CONFIG.COLORS.PRIMARY.HUBSPOT_ORANGE };
  
  // 2. 渐变遮罩（可选）
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: pxToInch(CONFIG.CANVAS.WIDTH),
    h: pxToInch(CONFIG.CANVAS.HEIGHT),
    fill: {
      type: 'solid',
      color: '000000',
      transparency: 40
    }
  });
  
  // 3. 居中文本 - Eyebrow
  slide.addText(data.subtitle || '', {
    x: pxToInch(200),
    y: pxToInch(350),
    w: pxToInch(1520),
    h: pxToInch(40),
    fontSize: cfg.TYPOGRAPHY.EYEBROW.SIZE,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    charSpacing: 6
  });
  
  // 4. 主标题（居中）
  const titleText = language === 'english' ? data.title.toUpperCase() : data.title;
  slide.addText(titleText, {
    x: pxToInch(200),
    y: pxToInch(430),
    w: pxToInch(1520),
    h: pxToInch(300),
    fontSize: typoCfg.H1_SIZE,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    valign: 'middle',
    lineSpacing: typoCfg.H1_LINE_HEIGHT * 100
  });
  
  // 5. Logo（顶部居中）
  if (data.metadata?.logo) {
    slide.addImage({
      path: data.metadata.logo,
      x: pxToInch(cfg.TEMPLATE_B.LOGO.X - 60),
      y: pxToInch(cfg.TEMPLATE_B.LOGO.Y),
      h: pxToInch(40),
      sizing: { type: 'contain', h: pxToInch(40) }
    });
  }
}

/**
 * 创建目录页
 */
async function createTOCSlide(pptx, data) {
  const slide = pptx.addSlide();
  const cfg = CONFIG.TOC;
  const colors = pptx._styleSnatchConfig.colors;
  
  // 1. 标题 "CONTENTS"
  slide.addText('CONTENTS', {
    x: pxToInch(cfg.HEADER.X),
    y: pxToInch(cfg.HEADER.Y),
    w: pxToInch(400),
    h: pxToInch(cfg.HEADER.HEIGHT),
    fontSize: 48,
    bold: true,
    color: colors.secondary,
    align: 'left',
    valign: 'middle'
  });
  
  // 2. 生成卡片阵列
  const sections = data.sections || [];
  const maxCards = Math.min(sections.length, 6);
  const rows = Math.ceil(maxCards / 3);
  
  sections.slice(0, maxCards).forEach((section, idx) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    
    const cardX = cfg.GRID_ZONE.X + col * (cfg.CARD_GRID.CARD_W + cfg.CARD_GRID.GAP);
    const cardY = cfg.GRID_ZONE.Y + row * (cfg.CARD_GRID.CARD_H + cfg.CARD_GRID.GAP);
    
    // 卡片背景
    slide.addShape(pptx.ShapeType.rect, {
      x: pxToInch(cardX),
      y: pxToInch(cardY),
      w: pxToInch(cfg.CARD_GRID.CARD_W),
      h: pxToInch(cfg.CARD_GRID.CARD_H),
      fill: { color: 'FFFFFF' },
      line: { type: 'none' }
    });
    
    // 巨型数字
    slide.addText(String(section.index).padStart(2, '0'), {
      x: pxToInch(cardX + cfg.CARD_STYLE.PADDING),
      y: pxToInch(cardY + cfg.CARD_STYLE.PADDING),
      w: pxToInch(100),
      h: pxToInch(100),
      fontSize: cfg.CARD_STYLE.BIG_NUMBER_SIZE,
      bold: true,
      color: colors.primary,
      align: 'left',
      valign: 'top'
    });
    
    // 章节标题
    slide.addText(section.title, {
      x: pxToInch(cardX + cfg.CARD_STYLE.PADDING),
      y: pxToInch(cardY + cfg.CARD_STYLE.PADDING + 120),
      w: pxToInch(cfg.CARD_GRID.CARD_W - cfg.CARD_STYLE.PADDING * 2),
      h: pxToInch(150),
      fontSize: cfg.CARD_STYLE.TITLE_SIZE,
      bold: true,
      color: colors.secondary,
      align: 'left',
      valign: 'middle',
      breakLine: true
    });
    
    // 描述
    if (section.description) {
      slide.addText(section.description.substring(0, 80) + '...', {
        x: pxToInch(cardX + cfg.CARD_STYLE.PADDING),
        y: pxToInch(cardY + cfg.CARD_STYLE.PADDING + 250),
        w: pxToInch(cfg.CARD_GRID.CARD_W - cfg.CARD_STYLE.PADDING * 2),
        h: pxToInch(80),
        fontSize: cfg.CARD_STYLE.DESC_SIZE,
        color: CONFIG.COLORS.SECONDARY.TEXT_GREY,
        align: 'left',
        valign: 'top'
      });
    }
  });
}

/**
 * 创建章节过渡页
 */
async function createSectionDividerSlide(pptx, data, section) {
  const slide = pptx.addSlide();
  const cfg = CONFIG.SECTION_DIVIDER;
  const colors = pptx._styleSnatchConfig.colors;
  
  // 1. 左侧容器（深色背景）
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: pxToInch(cfg.LEFT_CONTAINER.W),
    h: pxToInch(cfg.LEFT_CONTAINER.H),
    fill: { color: colors.secondary || CONFIG.COLORS.PRIMARY.DEEP_SLATE },
    line: { type: 'none' }
  });
  
  // 2. 章节标签
  slide.addText(`SECTION ${String(section.index).padStart(2, '0')}`, {
    x: pxToInch(cfg.ANCHORS.SECTION_LABEL.X),
    y: pxToInch(cfg.ANCHORS.SECTION_LABEL.Y),
    w: pxToInch(760),
    h: pxToInch(40),
    fontSize: cfg.ANCHORS.SECTION_LABEL.SIZE,
    bold: true,
    color: colors.primary,
    align: 'left'
  });
  
  // 3. 装饰短线
  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInch(cfg.ANCHORS.DIVIDER_DASH.X),
    y: pxToInch(cfg.ANCHORS.SECTION_LABEL.Y + 80),
    w: pxToInch(cfg.ANCHORS.DIVIDER_DASH.W),
    h: pxToInch(cfg.ANCHORS.DIVIDER_DASH.H),
    fill: { color: colors.primary },
    line: { type: 'none' }
  });
  
  // 4. 主标题
  slide.addText(section.title, {
    x: pxToInch(cfg.ANCHORS.MAIN_TITLE.X),
    y: pxToInch(450),
    w: pxToInch(cfg.ANCHORS.MAIN_TITLE.MAX_W),
    h: pxToInch(200),
    fontSize: cfg.ANCHORS.MAIN_TITLE.SIZE,
    bold: true,
    color: 'FFFFFF',
    align: 'left',
    valign: 'middle',
    lineSpacing: cfg.ANCHORS.MAIN_TITLE.LINE_HEIGHT * 100,
    breakLine: true
  });
  
  // 5. 右侧视觉（几何图形或图片）
  // 添加装饰图形
  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInch(cfg.RIGHT_CONTAINER.X + 180),
    y: pxToInch(200),
    w: pxToInch(cfg.RIGHT_CONTAINER.INNER_FRAME.W),
    h: pxToInch(cfg.RIGHT_CONTAINER.INNER_FRAME.H),
    fill: { color: colors.primary, transparency: 20 },
    line: { type: 'none' }
  });
}

/**
 * 创建内容页（根据布局自动分发）
 */
async function createContentSlide(pptx, data, section) {
  const layout = section.layout || 'STANDARD_FLOW';
  
  switch (layout) {
    case 'NARRATIVE':
      await createNarrativeSlide(pptx, data, section);
      break;
    case 'LIST_SIDEBAR':
      await createListSlide(pptx, data, section);
      break;
    case 'DATA_STORY':
      await createDataSlide(pptx, data, section);
      break;
    default:
      await createStandardSlide(pptx, data, section);
  }
}

/**
 * 标准阅读流布局
 */
async function createStandardSlide(pptx, data, section) {
  const slide = pptx.addSlide();
  const cfg = CONFIG.LAYOUTS.STANDARD_FLOW;
  const colors = pptx._styleSnatchConfig.colors;
  
  // 标题
  slide.addText(section.title, {
    x: pxToInch(CONFIG.SAFE_MARGINS.LEFT),
    y: pxToInch(cfg.TITLE_Y + 20),
    w: pxToInch(cfg.TEXT_CONTAINER.W),
    h: pxToInch(60),
    fontSize: CONFIG.TYPOGRAPHY.TYPE_SCALE.H1.SIZE,
    bold: true,
    color: colors.secondary,
    align: 'left'
  });
  
  // 正文
  if (section.description) {
    slide.addText(section.description, {
      x: pxToInch(cfg.TEXT_CONTAINER.X),
      y: pxToInch(cfg.TEXT_CONTAINER.Y),
      w: pxToInch(cfg.TEXT_CONTAINER.W),
      h: pxToInch(600),
      fontSize: CONFIG.TYPOGRAPHY.TYPE_SCALE.BODY.SIZE,
      color: colors.text,
      align: 'left',
      valign: 'top',
      lineSpacing: CONFIG.TYPOGRAPHY.TYPE_SCALE.BODY.LINE_HEIGHT * 100
    });
  }
}

/**
 * 叙事拼贴布局
 */
async function createNarrativeSlide(pptx, data, section) {
  const slide = pptx.addSlide();
  const cfg = CONFIG.MASTER_LAYOUTS.NARRATIVE;
  const colors = pptx._styleSnatchConfig.colors;
  
  // 左侧引言区
  slide.addText(section.title, {
    x: pxToInch(cfg.TEXT.QUOTE_ZONE.X),
    y: pxToInch(300),
    w: pxToInch(cfg.TEXT.QUOTE_ZONE.W),
    h: pxToInch(300),
    fontSize: cfg.TEXT.QUOTE_ZONE.SIZE,
    bold: true,
    color: colors.primary,
    align: 'left',
    valign: 'middle',
    lineSpacing: 130
  });
  
  // 正文区
  if (section.description) {
    slide.addText(section.description, {
      x: pxToInch(cfg.TEXT.QUOTE_ZONE.X),
      y: pxToInch(660),
      w: pxToInch(cfg.TEXT.BODY_ZONE.W),
      h: pxToInch(300),
      fontSize: cfg.TEXT.BODY_ZONE.SIZE,
      color: CONFIG.COLORS.SECONDARY.TEXT_GREY,
      align: 'left',
      valign: 'top'
    });
  }
  
  // 右侧图片（如果有）
  const sectionImage = data.images.find((img, idx) => idx === section.index - 1);
  if (sectionImage) {
    slide.addImage({
      path: sectionImage.src,
      x: pxToInch(cfg.VISUAL.MAIN_IMAGE.X),
      y: pxToInch(cfg.VISUAL.MAIN_IMAGE.Y),
      w: pxToInch(cfg.VISUAL.MAIN_IMAGE.W),
      h: pxToInch(cfg.VISUAL.MAIN_IMAGE.H),
      sizing: { type: 'cover' }
    });
  }
}

/**
 * 列表与侧边栏布局
 */
async function createListSlide(pptx, data, section) {
  const slide = pptx.addSlide();
  const cfg = CONFIG.MASTER_LAYOUTS.LIST_SIDEBAR;
  const colors = pptx._styleSnatchConfig.colors;
  
  // 标题
  slide.addText(section.title, {
    x: pxToInch(cfg.LIST_ZONE.X),
    y: pxToInch(cfg.LIST_ZONE.Y - 40),
    w: pxToInch(cfg.LIST_ZONE.W),
    h: pxToInch(60),
    fontSize: 32,
    bold: true,
    color: colors.secondary,
    align: 'left'
  });
  
  // 列表项
  if (section.listItems && section.listItems.length > 0) {
    let yOffset = cfg.LIST_ZONE.Y;
    
    section.listItems.forEach((item, idx) => {
      // 数字
      slide.addText(String(idx + 1), {
        x: pxToInch(cfg.LIST_ZONE.X),
        y: pxToInch(yOffset),
        w: pxToInch(60),
        h: pxToInch(40),
        fontSize: 24,
        bold: true,
        color: colors.primary,
        align: 'center',
        valign: 'middle'
      });
      
      // 内容
      slide.addText(item, {
        x: pxToInch(cfg.LIST_ZONE.X + 80),
        y: pxToInch(yOffset),
        w: pxToInch(cfg.LIST_ZONE.W - 80),
        h: pxToInch(60),
        fontSize: 18,
        color: colors.text,
        align: 'left',
        valign: 'middle'
      });
      
      yOffset += cfg.ITEM_GAP + 60;
    });
  }
}

/**
 * 数据故事布局（图表）
 */
async function createDataSlide(pptx, data, section) {
  const slide = pptx.addSlide();
  const cfg = CONFIG.MASTER_LAYOUTS.DATA_STORY;
  const colors = pptx._styleSnatchConfig.colors;
  
  // 标题
  slide.addText(section.title, {
    x: pxToInch(cfg.HEADER.X),
    y: pxToInch(cfg.HEADER.Y),
    w: pxToInch(cfg.HEADER.W),
    h: pxToInch(80),
    fontSize: 32,
    bold: true,
    color: colors.secondary,
    align: 'left'
  });
  
  // 描述
  if (section.description) {
    slide.addText(section.description, {
      x: pxToInch(cfg.HEADER.X),
      y: pxToInch(cfg.HEADER.Y + 90),
      w: pxToInch(cfg.HEADER.W),
      h: pxToInch(120),
      fontSize: 18,
      color: CONFIG.COLORS.SECONDARY.TEXT_GREY,
      align: 'left'
    });
  }
  
  // 简单图表占位符
  slide.addShape(pptx.ShapeType.rect, {
    x: pxToInch(cfg.CHART_CANVAS.X),
    y: pxToInch(cfg.CHART_CANVAS.Y),
    w: pxToInch(cfg.CHART_CANVAS.W),
    h: pxToInch(cfg.CHART_CANVAS.H),
    fill: { color: 'F4F4F4' },
    line: { color: 'E0E0E0', width: 1 }
  });
  
  slide.addText('📊 Chart Placeholder\n(Data visualization would be rendered here)', {
    x: pxToInch(cfg.CHART_CANVAS.X),
    y: pxToInch(cfg.CHART_CANVAS.Y),
    w: pxToInch(cfg.CHART_CANVAS.W),
    h: pxToInch(cfg.CHART_CANVAS.H),
    fontSize: 20,
    color: CONFIG.COLORS.SECONDARY.TEXT_GREY,
    align: 'center',
    valign: 'middle'
  });
}

/**
 * 创建封底页
 */
async function createClosingSlide(pptx, data) {
  const slide = pptx.addSlide();
  const cfg = CONFIG.CLOSING.CONTACT_GRID;
  const colors = pptx._styleSnatchConfig.colors;
  
  // 背景
  slide.background = { color: colors.secondary || CONFIG.COLORS.PRIMARY.DEEP_SLATE };
  
  // 标题
  slide.addText('THANK YOU', {
    x: pxToInch(cfg.HEADER.X),
    y: pxToInch(cfg.HEADER.Y),
    w: pxToInch(1720),
    h: pxToInch(100),
    fontSize: 64,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
    valign: 'middle'
  });
  
  // 副标题
  slide.addText(data.url, {
    x: pxToInch(cfg.HEADER.X),
    y: pxToInch(cfg.HEADER.Y + 120),
    w: pxToInch(1720),
    h: pxToInch(60),
    fontSize: 20,
    color: 'FFFFFF',
    align: 'center',
    transparency: 30
  });
  
  // 生成信息
  slide.addText('Generated by StyleSnatch', {
    x: pxToInch(100),
    y: pxToInch(cfg.COPYRIGHT.Y),
    w: pxToInch(1720),
    h: pxToInch(20),
    fontSize: 10,
    color: 'FFFFFF',
    align: 'center',
    transparency: 50
  });
}

// ==================== 辅助函数 ====================

/**
 * 像素转英寸（PptxGenJS 使用英寸单位）
 */
function pxToInch(px) {
  return px / 96; // 96 DPI
}

/**
 * 解析颜色字符串
 */
function parseColors(colorObj) {
  if (!colorObj) return {};
  
  const parsed = {};
  
  for (const [key, value] of Object.entries(colorObj)) {
    if (typeof value === 'string') {
      // 移除 rgb() 格式，转换为 hex
      if (value.startsWith('rgb')) {
        const matches = value.match(/\d+/g);
        if (matches && matches.length >= 3) {
          const [r, g, b] = matches.map(Number);
          parsed[key] = rgbToHex(r, g, b);
        }
      } else if (value.startsWith('#')) {
        parsed[key] = value.replace('#', '');
      } else {
        parsed[key] = value;
      }
    }
  }
  
  return parsed;
}

/**
 * RGB 转 Hex
 */
function rgbToHex(r, g, b) {
  return ((1 << 24) + (r << 16) + (g << 8) + b)
    .toString(16)
    .slice(1)
    .toUpperCase();
}

// 导出
export default {
  generatePPTX,
  initMasterSlide
};
