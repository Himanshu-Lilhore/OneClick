// Popup script (popup.js)
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    let dispCount = document.getElementById('num');
    if (dispCount) {
        dispCount.textContent = message.count.toString();
    }
});
