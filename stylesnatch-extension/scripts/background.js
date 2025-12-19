/**
 * StyleSnatch - Background Service Worker
 * 处理后台任务和消息传递
 */

console.log('StyleSnatch Background Service Worker loaded');

// 监听插件安装
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('StyleSnatch installed for the first time');
    
    // 设置默认配置
    chrome.storage.local.set({
      version: '1.0.0',
      settings: {
        defaultTemplate: 'hubspot',
        autoDownload: false,
        includeImages: true
      }
    });
  } else if (details.reason === 'update') {
    console.log('StyleSnatch updated to', chrome.runtime.getManifest().version);
  }
});

// 监听来自 content script 或 popup 的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Message received:', request);

  switch (request.action) {
    case 'captureComplete':
      // 抓取完成，通知 popup
      chrome.storage.local.set({ capturedData: request.data });
      sendResponse({ success: true });
      break;

    case 'generatePPT':
      // 开始生成 PPT
      handlePPTGeneration(request.data, sendResponse);
      return true; // 保持消息通道开启（异步响应）

    case 'downloadPPT':
      // 下载 PPT
      handleDownload(request.blob, request.filename, sendResponse);
      return true;

    default:
      sendResponse({ error: 'Unknown action' });
  }
});

// 监听快捷键
chrome.commands.onCommand.addListener((command) => {
  if (command === 'capture-style') {
    // 触发抓取
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'startCapture' });
      }
    });
  }
});

/**
 * 处理 PPT 生成
 */
async function handlePPTGeneration(data, sendResponse) {
  try {
    // 这里可以添加额外的处理逻辑
    // 比如图片压缩、文本清洗等
    
    sendResponse({ success: true, message: 'PPT generation started' });
  } catch (error) {
    console.error('PPT generation error:', error);
    sendResponse({ success: false, error: error.message });
  }
}

/**
 * 处理文件下载
 */
function handleDownload(blob, filename, sendResponse) {
  try {
    // Chrome 扩展下载文件
    const url = URL.createObjectURL(blob);
    
    chrome.downloads.download({
      url: url,
      filename: filename,
      saveAs: true
    }, (downloadId) => {
      if (chrome.runtime.lastError) {
        console.error('Download error:', chrome.runtime.lastError);
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        console.log('Download started:', downloadId);
        sendResponse({ success: true, downloadId });
        
        // 清理 URL
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }
    });
  } catch (error) {
    console.error('Download handler error:', error);
    sendResponse({ success: false, error: error.message });
  }
}

// 监听标签页更新（用于刷新图标状态）
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    // 可以在这里更新扩展图标或徽章
    chrome.action.setBadgeText({ tabId, text: '' });
  }
});
