// content_script
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      if (message.action == 'select') {
          // get current selection
          const sel = window.getSelection().toString();
          alert(`message.action: ${message.action}, sel: ${sel}`);
          //set a sel variable with the chrome storage api - 
          // for the popup.js file to access
          chrome.storage.sync.set({sel: sel});
        sendResponse({sel:sel});
      }
    });
    let iframe_element = document.createElement('iframe');
    // Must be declared at web_accessible_resources in manifest.json
    //iframe__element.src = chrome.runtime.getURL('canvas.html');
    iframe_element.id = 'iframe_element'
    iframe_element.rel  = "stylesheet"; 
    iframe_element.type = "text/css";
    iframe_element.src = chrome.runtime.getURL('frame.css');

    document.body.appendChild(iframe_element);