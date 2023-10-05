// Listen for messages from content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "showPopup") {
    chrome.browserAction.setPopup({ popup: "popup.html" });
  }
});

const allowedUrls = ["localhost:8000", "https://wilp-proctor-frontend-k7yap.ondigitalocean.app", "chrome://", "https://in.mathworks.com/", "https://www.mathworks.com/", "accounts.google.com"]

function injectTheScript() {
  chrome.tabs.query({}, function(tabs) {
    for(let i = 0; i<tabs.length; i++){
      if(tabs[i].favIconUrl && tabs[i].favIconUrl.includes("wilp-proctor-frontend-k7yap.ondigitalocean.app"))
      chrome.scripting.executeScript({
        target : {tabId : tabs[i].id},
        files : [ "content_wilp.js" ]
          });
    }  
  });
}

function showErrorOnSite(id){
  chrome.scripting.executeScript({
    target : {tabId : id},
    files : [ "content.js" ]
  });
}

function checkIfBlocked(tab){
  if(!tab || tab.url=="")
    return;
  for(let i = 0; i<allowedUrls.length; i++){
    if(tab.url.includes(allowedUrls[i]))
      return;
  }
  injectTheScript()
  showErrorOnSite(tab.id);
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
      checkIfBlocked(tab)
  });
});

chrome.tabs.onCreated.addListener((tab) => {
    checkIfBlocked(tab)
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    checkIfBlocked(tab)
});