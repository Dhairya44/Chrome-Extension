function injectTheScript() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target : {tabId : tabs[0].id},
            files : [ "content_wilp.js" ]
        });
    });
}

document.getElementById('clickactivity').addEventListener('click', injectTheScript);