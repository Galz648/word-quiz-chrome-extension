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
// notification options creation

let notifOptionsAdd = {
    type: "basic",
    title: "Added Word",
    iconUrl: ""
}
let notifOptionsDefine = {
    type: "basic",
    title: "Defined Word",
    iconUrl: ""
}
let notifOptionsSelect = {
    type: "basic",
    title: "Select Word",
    iconUrl: ""
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
    alert(`sel in send_api_call : ${sel}`);
    console.log(`action:${action}, sel: ${sel}, method: ${method}`);
    alert(`inside send_api_call - action:${action}, sel: ${sel}, method: ${method}`);
    let APIaction = `${_domain}${api_route}${action}_word`;
    console.log(`api call to : ${APIaction}`);
    // POST request setup
    const options = {
        method : "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({selection:sel})
 };
    console.log(`options:`);
    console.log(options);
    // send API call
    fetch(APIaction, options)
    .then(response => console.log(response.json()))
    .catch(err => alert(err));
    createNotification(action, sel); // add notification


}

// do something when a contextMenu is clicked
chrome.contextMenus.onClicked.addListener( (contextMenu) => {
    console.log(`context menu id: ${contextMenu.menuItemId}, selectionText: ${contextMenu.selectionText}`);
    // store selection text in chrome storage, for popup.js to access
    chrome.storage.sync.set({sel:contextMenu.selectionText}, function() {
        console.log(`Sel is set to ${contextMenu.selectionText} by contextMenu ${contextMenu.menuItemId}`);
      });
      //
    // create notification
    createNotification(contextMenu.menuItemId, contextMenu.selectionText);
    // api call
    console.log(`contextMenu Listener info: contextMenuId: ${contextMenu.menuItemId}, sel: ${contextMenu.selectionText}, method: ${method_post}`);
    send_api_call(contextMenu.menuItemId, contextMenu.selectionText, method_post); // action, sel, method 
});

// shortcut commands
chrome.commands.onCommand.addListener(command => {
    alert(`command: ${command}`);
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
            console.log(`printing response from content script, command action  ${command_action}, response.sel ${response.sel}`);
            createNotification(command_action, response.sel);
            send_api_call(command_action, response.sel, method_post);
        });
      });
}); // listener

// listen for button click message from popup.js
chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
        // message occurs when buttons are pressed in popup.html
        // handle api call
        console.log(`message from popup.js- action: ${message.action}, sel: ${message.sel}, method: ${message.method}`);
        send_api_call(message.action, message.sel, message.method)
        // create notification
        createNotification(message.action, message.sel);
        
        sendResponse({message:'responded'});
    });