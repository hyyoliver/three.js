/**
 * StyleSnatch - Popup 控制脚本
 * 处理用户交互和插件主流程
 */

// DOM 元素
const captureBtn = document.getElementById('captureBtn');
const generateBtn = document.getElementById('generateBtn');
const statusEl = document.getElementById('status');
const previewEl = document.getElementById('preview');
const progressEl = document.getElementById('progress');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');

// 抓取的数据缓存
let capturedData = null;

// 初始化
document.addEventListener('DOMContentLoaded', () => {
  console.log('StyleSnatch Popup Loaded');
  
  // 检查是否已有缓存数据
  chrome.storage.local.get(['capturedData'], (result) => {
    if (result.capturedData) {
      capturedData = result.capturedData;
      showPreview(capturedData);
    }
  });
});

// 抓取按钮点击
captureBtn.addEventListener('click', async () => {
  try {
    updateStatus('loading', '正在抓取网页风格...');
    captureBtn.disabled = true;

    // 获取当前活动标签页
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab.id) {
      throw new Error('无法获取当前标签页');
    }

    // 注入 content script 并执行抓取
    const results = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: capturePageContent
    });

    if (results && results[0]?.result) {
      capturedData = results[0].result;
      
      // 保存到本地存储
      await chrome.storage.local.set({ capturedData });
      
      updateStatus('success', '✅ 风格抓取成功！');
      showPreview(capturedData);
    } else {
      throw new Error('抓取失败');
    }
  } catch (error) {
    console.error('Capture error:', error);
    updateStatus('error', '❌ ' + error.message);
  } finally {
    captureBtn.disabled = false;
  }
});

// 生成按钮点击
generateBtn.addEventListener('click', async () => {
  if (!capturedData) {
    alert('请先抓取网页风格');
    return;
  }

  try {
    generateBtn.disabled = true;
    showProgress(0, '正在初始化 PPT 引擎...');

    // 动态加载 PPT 引擎
    const { generatePPTX } = await import('../scripts/pptEngine.js');
    
    showProgress(20, '正在创建母版页...');
    
    // 生成 PPTX
    const pptx = await generatePPTX(capturedData, (progress, message) => {
      showProgress(progress, message);
    });

    showProgress(90, '正在保存文件...');
    
    // 下载文件
    const fileName = `${capturedData.title || 'StyleSnatch'}_${Date.now()}.pptx`;
    await pptx.writeFile({ fileName });

    showProgress(100, '✅ 生成完成！');
    
    setTimeout(() => {
      hideProgress();
      updateStatus('success', '🎉 PPT 已成功生成并下载！');
    }, 1000);

  } catch (error) {
    console.error('Generate error:', error);
    updateStatus('error', '生成失败: ' + error.message);
    hideProgress();
  } finally {
    generateBtn.disabled = false;
  }
});

// ==================== 辅助函数 ====================

/**
 * 更新状态显示
 */
function updateStatus(type, message) {
  statusEl.className = 'status ' + type;
  statusEl.querySelector('.status-text').textContent = message;
  
  const icon = statusEl.querySelector('.status-icon');
  switch(type) {
    case 'loading':
      icon.textContent = '⏳';
      icon.classList.add('loading');
      break;
    case 'success':
      icon.textContent = '✅';
      icon.classList.remove('loading');
      break;
    case 'error':
      icon.textContent = '❌';
      icon.classList.remove('loading');
      break;
    default:
      icon.textContent = '✨';
      icon.classList.remove('loading');
  }
}

/**
 * 显示预览
 */
function showPreview(data) {
  previewEl.style.display = 'block';
  
  // 显示主色调
  const colorPreview = document.getElementById('colorPreview');
  colorPreview.style.backgroundColor = data.colors?.primary || '#FF5C35';
  
  // 显示标题
  const titlePreview = document.getElementById('titlePreview');
  titlePreview.textContent = data.title || '未知标题';
  
  // 显示页面数
  const pageCount = document.getElementById('pageCount');
  pageCount.textContent = (data.sections?.length || 0) + 3; // 封面+目录+封底
}

/**
 * 显示进度
 */
function showProgress(percent, message) {
  progressEl.style.display = 'block';
  progressFill.style.width = percent + '%';
  progressText.textContent = message;
}

/**
 * 隐藏进度
 */
function hideProgress() {
  progressEl.style.display = 'none';
}

// ==================== Content Script 注入函数 ====================

/**
 * 在目标页面执行的抓取函数
 * 这个函数会被注入到当前网页中执行
 */
function capturePageContent() {
  const data = {
    url: window.location.href,
    title: '',
    description: '',
    colors: {},
    images: [],
    sections: [],
    metadata: {}
  };

  // 1. 抓取标题
  const h1 = document.querySelector('h1');
  const titleTag = document.querySelector('title');
  data.title = h1?.textContent.trim() || titleTag?.textContent.trim() || 'Untitled';

  // 2. 抓取描述
  const metaDesc = document.querySelector('meta[name="description"]');
  const firstP = document.querySelector('p');
  data.description = metaDesc?.content || firstP?.textContent.trim().substring(0, 200) || '';

  // 3. 抓取颜色
  data.colors = extractColors();

  // 4. 抓取图片
  data.images = extractImages();

  // 5. 抓取章节
  data.sections = extractSections();

  // 6. 抓取元数据
  data.metadata = {
    author: document.querySelector('meta[name="author"]')?.content || '',
    siteName: document.querySelector('meta[property="og:site_name"]')?.content || '',
    favicon: document.querySelector('link[rel*="icon"]')?.href || '',
    logo: extractLogo()
  };

  return data;
}

/**
 * 提取颜色方案
 */
function extractColors() {
  const colors = {
    primary: '#FF5C35',
    secondary: '#1E2C3A',
    background: '#F9F6F2'
  };

  // 查找按钮颜色作为主色
  const buttons = document.querySelectorAll('button, .btn, a.button');
  if (buttons.length > 0) {
    const btn = buttons[0];
    const bgColor = window.getComputedStyle(btn).backgroundColor;
    if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
      colors.primary = bgColor;
    }
  }

  // 查找标题颜色作为深色
  const heading = document.querySelector('h1, h2');
  if (heading) {
    const headColor = window.getComputedStyle(heading).color;
    if (headColor) {
      colors.secondary = headColor;
    }
  }

  // 查找背景色
  const body = document.body;
  const bgColor = window.getComputedStyle(body).backgroundColor;
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
    colors.background = bgColor;
  }

  return colors;
}

/**
 * 提取图片
 */
function extractImages() {
  const images = [];
  const imgElements = document.querySelectorAll('img');
  
  imgElements.forEach((img, index) => {
    if (index >= 10) return; // 最多取10张
    
    const width = img.naturalWidth || img.width;
    const height = img.naturalHeight || img.height;
    
    // 过滤太小的图片
    if (width >= 400 && height >= 300) {
      images.push({
        src: img.src,
        alt: img.alt || '',
        width,
        height,
        aspectRatio: width / height
      });
    }
  });

  return images;
}

/**
 * 提取章节结构
 */
function extractSections() {
  const sections = [];
  const headings = document.querySelectorAll('h2');
  
  headings.forEach((h2, index) => {
    if (index >= 8) return; // 最多8个章节
    
    const title = h2.textContent.trim();
    const nextP = h2.nextElementSibling;
    const description = nextP?.tagName === 'P' ? nextP.textContent.trim().substring(0, 150) : '';
    
    // 查找该章节的列表项
    let listItems = [];
    let sibling = h2.nextElementSibling;
    while (sibling && sibling.tagName !== 'H2') {
      if (sibling.tagName === 'UL' || sibling.tagName === 'OL') {
        const items = sibling.querySelectorAll('li');
        listItems = Array.from(items).map(li => li.textContent.trim()).slice(0, 5);
        break;
      }
      sibling = sibling.nextElementSibling;
    }

    sections.push({
      title,
      description,
      listItems,
      index: index + 1
    });
  });

  return sections;
}

/**
 * 提取 Logo
 */
function extractLogo() {
  // 尝试多种方式查找 Logo
  const logoSelectors = [
    'img[alt*="logo" i]',
    'img[class*="logo" i]',
    'header img',
    'nav img:first-of-type',
    '.logo img',
    '#logo img'
  ];

  for (const selector of logoSelectors) {
    const logo = document.querySelector(selector);
    if (logo) {
      return logo.src;
    }
  }

  return '';
}
