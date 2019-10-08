// content_script
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      if (message.action == 'get-selection') {
          // get current selection
          const sel = window.getSelection().toString();
          //set a sel variable with the chrome storage api - 
          // for the popup.js file to access
          chrome.storage.sync.set({'sel': sel});
        sendResponse({'message':'success'});
      }
    });


chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      if (message.action == 'add') {
      }
      else if (message.action == 'select') {
      }
      else if (message.action == 'define') {
      }
      // manipulate storage variables
    });    