chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: toggleBlur
  });
});

function toggleBlur() {
  const existingOverlay = document.getElementById('blur-extension-overlay');
  
  if (existingOverlay) {
    existingOverlay.remove();
  } else {
    // Wait for body to be available
    if (!document.body) {
      console.error('Page body not yet loaded');
      return;
    }
    
    const overlay = document.createElement('div');
    overlay.id = 'blur-extension-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backdropFilter = 'blur(10px)';
    overlay.style.webkitBackdropFilter = 'blur(10px)';
    overlay.style.zIndex = '999999';
    overlay.style.cursor = 'pointer';
    overlay.title = 'Click to remove blur';
    
    overlay.addEventListener('click', () => {
      overlay.remove();
    });
    
    document.body.appendChild(overlay);
  }
}
