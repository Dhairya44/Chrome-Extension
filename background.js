// Listen for messages from content script
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "showPopup") {
    chrome.browserAction.setPopup({ popup: "popup.html" });
  }
});

const allowedUrls = ["localhost:8000", "https://wilp-proctor-frontend-k7yap.ondigitalocean.app", "chrome://", "https://in.mathworks.com/", "https://www.mathworks.com/", "accounts.google.com"]
const devOrDep = "wilp-proctor-frontend-k7yap.ondigitalocean.app"
// const devOrDep = "localhost:8000"

function injectTheScript() {
  chrome.tabs.query({}, function(tabs) {
    for(let i = 0; i<tabs.length; i++){
      if(tabs[i].favIconUrl && tabs[i].favIconUrl.includes(devOrDep))
        chrome.scripting.executeScript({
          target : {tabId : tabs[i].id},
          files : [ "content_wilp.js" ]
            });
    }  
  });
}

function enableExtension(tab){
  if(tab.url.includes(devOrDep)){
    chrome.scripting.executeScript({
      target : {tabId : tab.id},
      files : [ "content_index_wilp.js" ]
        });
  }
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
  chrome.tabs.query({}, function(tabs) {
    for(let i = 0; i<tabs.length; i++){
      if(tabs[i].favIconUrl && tabs[i].favIconUrl.includes(devOrDep)){
        injectTheScript()
        showErrorOnSite(tab.id);
      }
    }  
  });
}

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, function (tab) {
      enableExtension(tab)
      checkIfBlocked(tab)
  });
});

chrome.tabs.onCreated.addListener((tab) => {
  enableExtension(tab)  
  checkIfBlocked(tab)
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  enableExtension(tab)  
  checkIfBlocked(tab)
});

chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
      if (request) {
          if (request.message) {
              if (request.message == "version") {
                  sendResponse({version: 1.0});
              }
          }
      }
      return true;
  });