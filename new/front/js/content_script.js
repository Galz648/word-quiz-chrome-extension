// content_script
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      if (message.action == 'add' || message.action == 'select' || message.action == 'define') {
          // get current selection
          const sel = window.getSelection().toString();
          chrome.storage.sync.set({sel: sel});
          alert(`message.action: ${message.action}, sel: ${sel}`);
          //set a sel variable with the chrome storage api - 
          // for the popup.js file to access
        sendResponse({sel:sel});
      }
    });



