/**
 * StyleSnatch - 全局设计系统常量配置
 * 基于固定设计规则提取的所有物理参数
 */

const DESIGN_CONFIG = {
  // ==================== 一、画布与物理坐标系统 ====================
  CANVAS: {
    WIDTH: 1920,      // 画布宽度 (像素)
    HEIGHT: 1080,     // 画布高度 (像素)
    ASPECT_RATIO: '16:9'
  },

  // 绝对安全边距 (Fixed Safe Margins)
  SAFE_MARGINS: {
    TOP: 60,          // 顶部安全边距 (px)
    BOTTOM: 60,       // 底部安全边距 (px)
    LEFT: 100,        // 左侧安全边距 - 文本左对齐轴 (px)
    RIGHT: 100        // 右侧安全边距 - 内容最大延伸边界 (px)
  },

  // 有效内容区 (Active Zone)
  ACTIVE_ZONE: {
    WIDTH: 1720,      // 1920 - 100 - 100
    HEIGHT: 900       // 除去顶部导航预留区
  },

  // ==================== 二、12列响应式网格系统 ====================
  GRID: {
    COLUMNS: 12,           // 总列数
    GUTTER: 40,            // 列间隙宽度 (px)
    COLUMN_WIDTH: 106.6,   // 单列宽度 (px) - 自动计算
    
    // 标准跨度映射 (Standard Spans)
    SPANS: {
      COL_3: 400,          // 3列宽 - 三列布局卡片
      COL_4: 546,          // 4列宽 - 侧边栏/四列布局
      COL_6: 840,          // 6列宽 - 左文右图半屏布局
      COL_8: 1133,         // 8列宽 - 宽屏阅读模式
      COL_12: 1720         // 12列宽 - 全屏大图（禁止纯文本）
    }
  },

  // ==================== 三、导航栏结构锚点 ====================
  NAVIGATION: {
    RESERVED_HEIGHT: 120,  // 预留空间高度 (0-120px)
    Z_INDEX: 9999,         // 层级 - 永远在最顶层
    
    // 锚点 A (Branding - Logo/品牌)
    ANCHOR_A: {
      X: 100,              // 左对齐安全线
      Y: 60,               // 垂直居中
      HEIGHT: 40,          // 高度锁定
      WIDTH: 'auto'        // 宽度自适应
    },
    
    // 锚点 B (Indexing - 页码)
    ANCHOR_B: {
      ALIGN: 'right',      // 右对齐
      X: 1820,             // Right: 100px (1920 - 100)
      Y: 60                // 垂直居中
    }
  },

  // ==================== 四、核心排版引擎 ====================
  TYPOGRAPHY: {
    // 对齐法则
    ALIGNMENT: {
      GLOBAL: 'left',      // 全局强制左对齐
      EXCEPTION: 'center'  // 仅封面主标题可居中
    },

    // 字号阶梯表 (Type Scale Ramp)
    TYPE_SCALE: {
      H1: {
        SIZE: 48,          // 字号 (pt)
        WEIGHT: 700,       // 字重 (Bold)
        LINE_HEIGHT: 1.1,  // 行高
        SPACE_AFTER: 32    // 后间距 (px)
      },
      H2: {
        SIZE: 16,          // 章节眉题
        WEIGHT: 700,       // Bold
        LINE_HEIGHT: 1.0,
        SPACE_AFTER: 24,
        LETTER_SPACING: 2, // 字间距 +2px
        TRANSFORM: 'uppercase' // 全大写
      },
      BODY: {
        SIZE: 20,          // 正文
        WEIGHT: 400,       // Regular
        LINE_HEIGHT: 1.5,
        SPACE_AFTER: 16
      },
      H3: {
        SIZE: 24,          // 卡片标题
        WEIGHT: 600,       // SemiBold
        LINE_HEIGHT: 1.3,
        SPACE_AFTER: 12
      },
      BIG_DATA: {
        SIZE: 96,          // 强调数字（可更大）
        WEIGHT: 900,       // Heavy
        LINE_HEIGHT: 1.0,
        SPACE_AFTER: 0
      },
      CAPTION: {
        SIZE: 14,          // 说明文字
        WEIGHT: 300,       // Light
        LINE_HEIGHT: 1.2
      }
    },

    // 文本流规则
    TEXT_FLOW: {
      PARAGRAPH_SPACING: 16,    // 段落间距 (约0.8em)
      LIST_INDENT: 32,          // 列表缩进
      MAX_LINES_PER_SLIDE: 12   // 单页最大行数 - 超过强制分页
    }
  },

  // ==================== 五、标准容器版式 ====================
  LAYOUTS: {
    // 布局 I: 标准阅读流 (Standard Flow)
    STANDARD_FLOW: {
      TITLE_Y: 60,         // 标题区Y坐标 (在Top Margins)
      TEXT_CONTAINER: {
        X: 100,            // Col 1
        Y: 200,            // Header下方
        W: 1133,           // Col 1-8 (占8列)
        ALIGN: 'left'
      }
    },

    // 布局 II: 双屏分割 (Split Screen)
    SPLIT_SCREEN: {
      CENTER_AXIS: 960,    // 中轴线 X坐标
      LEFT_CONTAINER: {
        X: 100,            // Col 1
        W: 760,            // Col 1-6
        ALIGN: 'middle'    // 垂直居中
      },
      RIGHT_CONTAINER: {
        X: 1060,           // Col 7
        W: 760,            // Col 7-12
        ALIGN: 'middle'
      }
    },

    // 布局 III: 三列阵列 (Tri-Grid)
    TRI_GRID: {
      CARD_1: { X: 100, W: 546 },    // Col 1-4
      CARD_2: { X: 686, W: 546 },    // Col 5-8
      CARD_3: { X: 1273, W: 546 },   // Col 9-12
      GAP: 40                         // 卡片间距 (自动为Gutter)
    }
  },

  // ==================== 六、封面页排版引擎 ====================
  COVER: {
    // 字体阶梯
    TYPOGRAPHY: {
      // 英文规则
      ENGLISH: {
        H1_SIZE: 140,
        H1_WEIGHT: 900,
        H1_LINE_HEIGHT: 0.9,
        H1_TRANSFORM: 'uppercase',
        H1_TRACKING: 2,
        EYEBROW_SIZE: 24,
        SUBTITLE_SIZE: 36,
        SUBTITLE_WEIGHT: 500,
        SUBTITLE_LINE_HEIGHT: 1.3,
        SUBTITLE_MARGIN_TOP: 48
      },
      // 中文规则
      CHINESE: {
        H1_SIZE: 100,
        H1_WEIGHT: 700,
        H1_LINE_HEIGHT: 1.2,
        H1_TRACKING: 0,
        EYEBROW_SIZE: 24,
        SUBTITLE_SIZE: 32,
        SUBTITLE_WEIGHT: 400,
        SUBTITLE_LINE_HEIGHT: 1.5
      },
      // 眉题通用
      EYEBROW: {
        SIZE: 24,
        WEIGHT: 700,
        TRACKING_EN: 6,
        TRACKING_CN: 4,
        MARGIN_BOTTOM: 32
      }
    },

    // 模版 A: 左对齐 (The Split)
    TEMPLATE_A: {
      TEXT_ALIGN: 'middle',
      LOGO: { X: 100, Y: 60 },
      RIGHT_IMAGE: {
        X: 1100,
        Y: 0,
        W: 820,
        H: 1080,
        Z_INDEX: 1
      }
    },

    // 模版 B: 居中 (The Center)
    TEMPLATE_B: {
      TEXT_ALIGN: 'middle',
      LOGO: { X: 960, Y: 80 },
      BACKGROUND_IMAGE: {
        X: 0,
        Y: 0,
        W: 1920,
        H: 1080,
        Z_INDEX: 0
      },
      SCRIM: {
        COLOR: '#000000',
        OPACITY: 0.4,
        Z_INDEX: 1
      }
    }
  },

  // ==================== 七、目录页排版引擎 ====================
  TOC: {
    HEADER: {
      X: 100,
      Y: 60,
      HEIGHT: 120
    },
    GRID_ZONE: {
      X: 100,
      Y: 220,
      W: 1720,
      H: 780
    },
    // 卡片阵列
    CARD_GRID: {
      ROWS: 2,           // 标准 2行
      COLS: 3,           // 3列
      GAP: 24,           // 缝隙
      CARD_W: 557,       // (1720 - 24*2) / 3
      CARD_H: 378        // (780 - 24) / 2
    },
    CARD_STYLE: {
      PADDING: 40,
      FILL: '#FFFFFF',
      BIG_NUMBER_SIZE: 96,
      BIG_NUMBER_WEIGHT: 900,
      TITLE_SIZE: 24,
      TITLE_WEIGHT: 700,
      DESC_SIZE: 16
    }
  },

  // ==================== 八、章节过渡页排版引擎 ====================
  SECTION_DIVIDER: {
    HEADER: {
      Y: 0,
      HEIGHT: 120
    },
    // 左侧信息区
    LEFT_CONTAINER: {
      X: 0,
      Y: 0,
      W: 960,
      H: 1080,
      ALIGN_X: 100  // 内部元素左对齐基准线
    },
    // 右侧视觉区
    RIGHT_CONTAINER: {
      X: 960,
      Y: 0,
      W: 960,
      H: 1080,
      INNER_FRAME: {
        W: 600,
        H: 900,
        ALIGN: 'center',
        BOTTOM: 0
      }
    },
    // 文字锚点
    ANCHORS: {
      SECTION_LABEL: { X: 100, Y: 240, SIZE: 16, WEIGHT: 700 },
      DIVIDER_DASH: { X: 100, W: 80, H: 4 },
      MAIN_TITLE: { X: 100, SIZE: 64, WEIGHT: 700, LINE_HEIGHT: 1.1, MAX_W: 760 },
      DESCRIPTION: { SIZE: 24, WEIGHT: 400, MARGIN_TOP: 40 }
    }
  },

  // ==================== 九、母版页布局引擎 ====================
  MASTER_LAYOUTS: {
    // 布局 A: 叙事拼贴页 (Narrative Collage)
    NARRATIVE: {
      TEXT: {
        QUOTE_ZONE: { X: 100, W: 693, ALIGN: 'middle', SIZE: 32 },
        BODY_ZONE: { MARGIN_TOP: 60, W: 693, SIZE: 20 }
      },
      VISUAL: {
        MAIN_IMAGE: { X: 960, Y: 120, W: 960, H: 960 },
        TEXTURE_BACKPLATE: { X: 860, Y: 200, W: 600, H: 800, OPACITY: 0.1 }
      }
    },

    // 布局 B: 列表与侧边栏 (List & Sidebar)
    LIST_SIDEBAR: {
      LIST_ZONE: { X: 100, Y: 180, W: 1133 },
      ITEM_GAP: 40,
      SIDEBAR: {
        X: 1306,
        W: 414,
        MIN_H: 300,
        BOTTOM: 60,
        FILL: '#F4F4F4',
        PADDING: 40
      }
    },

    // 布局 C: 数据故事页 (Data Story)
    DATA_STORY: {
      HEADER: { X: 100, Y: 140, W: 1720 },
      CHART_CANVAS: {
        X: 100,
        Y: 400,
        W: 1720,
        H: 620
      },
      LEGEND: { TOP: 400, RIGHT: 100 }
    },

    // 布局 D: 案例实战页 (Case Study)
    CASE_STUDY: {
      STORY_BLOCK: { X: 100, W: 693, ALIGN: 'middle' },
      SCREENSHOT: {
        X: 960,
        W: 860,
        H: 600,
        ALIGN: 'middle',
        SHADOW: true,
        ACCENT_OFFSET: { X: 40, Y: 40 }
      }
    },

    // 布局 E: 甜甜圈数据页 (Big Donut)
    BIG_DONUT: {
      TAKEAWAY: { X: 100, W: 840, ALIGN: 'middle' },
      DONUT: {
        X: 1060,
        SIZE: 760,
        ALIGN: 'middle',
        CENTER_LABEL_SIZE: 80
      }
    },

    // 布局 F: 挑战与对策页 (Challenge & Solution)
    CHALLENGE_SOLUTION: {
      LEFT_COL: {
        TITLE: 'CHALLENGE',
        X: 100,
        W: 600,
        ALIGN: 'right'
      },
      RIGHT_COL: {
        TITLE: 'SOLUTION',
        X: 1120,
        W: 600,
        ALIGN: 'left'
      },
      CONNECTOR: {
        X: 860,
        W: 200,
        H: 1080
      }
    }
  },

  // ==================== 十、图表与数据可视化引擎 ====================
  CHARTS: {
    // 通用图表物理法则
    TYPOGRAPHY: {
      TITLE: { SIZE: 24, WEIGHT: 700, ALIGN: 'left' },
      DATA_LABELS: { SIZE: 16, WEIGHT: 700 },
      AXIS_LABELS: { SIZE: 14, WEIGHT: 400, COLOR: '#666666' },
      LEGEND: { SIZE: 16, WEIGHT: 400 }
    },
    GRID: {
      LINE_WIDTH: 1,
      COLOR: '#E0E0E0',
      HIDE_AXIS: true
    },
    SPACING: {
      BAR_GAP_RATIO: 0.5,  // 柱间距为柱宽的50%
      CORNER_RADIUS: 4
    },
    // 标准图表类型
    TYPES: {
      VERTICAL_COLUMN: { MAX_WIDTH: 80 },
      HORIZONTAL_BAR: { HEIGHT: 40, SORT: 'descending' },
      DONUT: { INNER_RADIUS: 0.65, CENTER_SIZE_RATIO: 0.2 },
      SMOOTH_LINE: { WIDTH: 4, CURVE: 'smooth', FILL_OPACITY: 0.1 },
      METRIC_CARD: { VALUE_SIZE: 96 }
    },
    // 仪表盘布局
    DASHBOARD: {
      SPLIT_COMPARISON: {
        LEFT: { X: 100, Y: 240, W: 840, H: 600 },
        RIGHT: { X: 980, Y: 240, W: 840, H: 600 },
        GAP: 40
      },
      KPI_ROW: { Y: 300, H: 400 },
      QUAD_GRID: {
        ROW1_Y: 200,
        ROW2_Y: 620,
        ROW_H: 380,
        COL1_X: 100,
        COL2_X: 980,
        COL_W: 840
      }
    }
  },

  // ==================== 十一、图标库规范 ====================
  ICONS: {
    VIEWBOX: 24,           // 标准画板尺寸
    STYLE: 'outline',      // 线性描边风格
    STROKE_WIDTH: 2,       // 默认线宽
    CORNER: 'round',       // 圆头/圆角
    COLOR: 'currentColor'  // 动态颜色
  },

  // ==================== 十二、封底页排版引擎 ====================
  CLOSING: {
    // 模版 A: 愿景宣言页
    MANIFESTO: {
      TEXT_CONTAINER: { X: 100, W: 1000, ALIGN: 'middle' },
      VISUAL_CONTAINER: { X: 1120, Y: 0, W: 800, H: 1080 },
      STATEMENT: { SIZE: 64, WEIGHT: 700, LINE_HEIGHT: 1.1 },
      SIGN_OFF: { MARGIN_TOP: 60, AVATAR_SIZE: 80 },
      FINAL_LOGO: { X: 1820, Y: 1020, W: 120 }
    },

    // 模版 B: 联系与行动页
    CONTACT_GRID: {
      HEADER: { X: 100, Y: 150 },
      INFO_GRID: { X: 100, Y: 400, W: 1720, COLS: 4 },
      QR_CONTAINER: { SIZE: 200 },
      COPYRIGHT: { Y: 1040, W: 1720, H: 20, SIZE: 10 }
    }
  },

  // ==================== 十三、HubSpot 风格色彩系统 ====================
  COLORS: {
    // 主色系
    PRIMARY: {
      HUBSPOT_ORANGE: '#FF5C35',
      DEEP_SLATE: '#1E2C3A',
      CREAM: '#F9F6F2',
      DARK_PURPLE: '#4A154B'
    },
    // 辅助色
    SECONDARY: {
      LIGHT_GREY: '#F4F4F4',
      MID_GREY: '#E0E0E0',
      TEXT_GREY: '#555555',
      AXIS_GREY: '#666666',
      LIGHT_PURPLE: '#D8BFD8',
      PINK_TINT: '#FFE5DD'
    },
    // 状态色
    STATUS: {
      WHITE: '#FFFFFF',
      BLACK: '#000000'
    }
  },

  // ==================== 十四、物理约束规则 ====================
  CONSTRAINTS: {
    IMAGE: {
      MIN_WIDTH_COVER: 1080,
      MIN_HEIGHT_COVER: 600,
      MIN_WIDTH_CONTENT: 400,
      ASPECT_RATIO_MIN: 0.33,  // 1:3
      ASPECT_RATIO_MAX: 3.0    // 3:1
    },
    TEXT: {
      H1_MAX_CHARS_CN: 20,
      H1_MAX_CHARS_EN: 40,
      MAX_LINES_BODY: 12
    }
  }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DESIGN_CONFIG;
}
