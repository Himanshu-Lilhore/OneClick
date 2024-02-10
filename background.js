chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Update count in extension's HTML page
    chrome.action.setBadgeText({ text: message.count.toString() });
});


// // Background script (background.js)
// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
//     chrome.runtime.sendMessage({ count: message.count });
// });
