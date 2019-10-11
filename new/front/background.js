 // background page
console.log('hello from bg script');

const PORT=5000; // request related parameters
const _domain = `http://localhost:${PORT}/`; // domain of api call
const api_route = "api/"; // route of api call
const action_add = 'add'; // method add word
const action_define = 'define'; // method define word
const APIadd = `${_domain}${api_route}${action_add}`; // url of api add-word method
const APIdefine = `${_domain}${api_route}${action_define}`; // url of api define-word method
const data = {}; // data to send to the backend
const method_post = 'post';
// POST request setup
const options = {
   method : "POST",
   headers:{
       "Content-Type":"application/json"
   }
};
// command shortcuts:
const command_add = 'Add-Word';
const command_select = 'Select-Word';
const command_define = 'Define-Word';
// contextMenu "define"
const contextMenuItemDefine = {
    id: "define",
    title: "Get Definition",
    contexts: ["selection"]
};
// contextMenu "add"
const contextMenuItemAdd = {
    id: "add",
    title: "Add To Dictionary",
    contexts: ["selection"]
}

const contextMenuItemSelect = {
    id: "select",
    title: "Select Word",
    contexts: ["selection"]
}
// contextMenus array
const contextMenuItems = [
    contextMenuItemDefine, 
    contextMenuItemAdd,
    contextMenuItemSelect
    ];

/* 
From chrome contextMenus DOCUMENTATION - 
You can create as many context menu items as you need, 
but if more than one from your extension is visible at once, 
Google Chrome automatically collapses them into a single parent menu.
*/

// when called, create the given contextMenus within an array
function createContextMenus(contextMenuArray) {
    contextMenuArray.forEach(element => {
        // create contextMenu
        chrome.contextMenus.create(element);
        console.log(`contextMenuItem "${element.id}" created`);
    });
}
// create contextMenus
createContextMenus(contextMenuItems);

function send_api_call(action, sel, method) {
    console.log('send api call to backend...');
    console.log(`action:${action}, sel: ${sel}, method: ${method}`);
}

// do something when a contextMenu is clicked
chrome.contextMenus.onClicked.addListener( (contextMenu) => {
    console.log(`context menu id: ${contextMenu.menuItemId}, selectionText: ${contextMenu.selectionText}`);
    if (contextMenu.menuItemId == 'select') {
        // send message to popup.js to display selected word
        chrome.storage.sync.set({sel:contextMenu.selectionText}, function() {
            console.log(`Sel is set to ${contextMenu.selectionText} by contextMenu ${contextMenu.menuItemId}`);
          });
    }
    // api call
    send_api_call(contextMenu.menuItemId, contextMenu.selectionText, method_post); // action, sel, method 
});

// shortcut commands
chrome.commands.onCommand.addListener(command => {
    let command_action; 
    if (command == command_add) {
        command_action = 'add';
    }
    else if (command == command_select) {
        command_action = 'select';
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action: command_action}, function(response) {
                console.log('printing response from content script, command action "select" ');
                console.log(response.sel);
            });
          });
    }
    else if (command == command_define) {
        command_action = "define";   
    }
    console.log(`shortcut ${command_action} used`);
}); // listener

/*
sender filtering could be switched with well defined actions,
thus messaging won't depend on the sender, but on the action.
*/
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        // message occurs when buttons are pressed in popup.html
        // handle api call
        sendResponse({message:'responded'});
    });