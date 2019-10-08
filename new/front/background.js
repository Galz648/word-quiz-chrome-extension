 // background page
console.log('hello from bg script');
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

// contextMenus array
const contextMenuItems = [
    contextMenuItemDefine, 
    contextMenuItemAdd
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

// do something when a contextMenu is clicked
chrome.contextMenus.onClicked.addListener( (contextMenu) => {
    console.log(`id: ${contextMenu.menuItemId}, selectionText: ${contextMenu.selectionText}`);
    // send message to popup.js
    chrome.runtime.sendMessage({action: contextMenu.menuItemId, sel: contextMenu.selectionText}, function(response) {
        console.log(`response from popup.js: ${response}`);
      });
}
);

// shortcut commands
chrome.commands.onCommand.addListener(command => {
    let command_action;
    if (command == command_shortcut) {
        command_action = "add";
    }
    else if (command == command_select) {
        command_action = "select";
    }
    else if (command == command_define) {
        command_action = "define";
    }
    console.log(`shortcut ${command_action} used`);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        chrome.tabs.sendMessage(tabs[0].id, {action: command_action}, function(response) {
            console.log(`response from cs: ${response}`)})
        }) // query callback
}); // listener



chrome.runtime.onMessage.addListener(
    function(message, sender, sendResponse) {
      console.log(message);
        sendResponse({message:'responded'});
    });