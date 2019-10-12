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
// notification options creation

let notifOptionsAdd = {
    type: "basic",
    title: "Added Word",
    iconUrl: "book_icon.png"
}
let notifOptionsDefine = {
    type: "basic",
    title: "Defined Word",
    iconUrl: "book_icon.png"
}
let notifOptionsSelect = {
    type: "basic",
    title: "Select Word",
    iconUrl: "book_icon.png"
}
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
function createNotification(action, selection) {
    let notifOptions;
    if (action == 'add') {
        notifOptions = notifOptionsAdd;
        // modify message
        notifOptions.message = `Word Added: ${selection}`;
    }
    else if (action == 'select') {
        notifOptions = notifOptionsSelect;
        // modify message
        notifOptions.message = `Word Selected: ${selection}`;   
    }
    else if (action == 'define') {
        notifOptions = notifOptionsDefine;
        // modify message
        notifOptions.message = `Word Defined: ${selection}`;
    }
    // create notification
    chrome.notifications.create(`notif_${action}`, notifOptions);  
    console.log(`created notif_${action}, selection: ${selection}`);
}
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
    // create notification
    createNotification(contextMenu.menuItemId, contextMenu.selectionText);
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
    }
    else if (command == command_define) {
        command_action = "define";
    }
    console.log(`shortcut ${command_action} used`);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: command_action}, function(response) {
            console.log(`printing response from content script, command action  ${command_action}`);
            createNotification(command_action, response.sel);  
        });
      });
}); // listener

/*
sender filtering could be switched with well defined actions,
thus messaging won't depend on the sender, but on the action.
*/
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        // message occurs when buttons are pressed in popup.html
        // hook up notification with the createNotification function
        // handle api call
        createNotification(message.action, message.sel);
        sendResponse({message:'responded'});
    });