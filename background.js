// Listen for messages from content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "showPopup") {
    chrome.browserAction.setPopup({ popup: "popup.html" });
  }
});
