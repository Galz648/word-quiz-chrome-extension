// background page
// shortcut related code (look in manifest)
command_shortcut = 'Open-Choice'
console.log('hello from bg script');
chrome.commands.onCommand.addListener((command) => {
    // Now, do whatever you want when the shortcut is triggered.
    // e.g. if (command == 'funcA') ...
    if (command == command_shortcut) {
        console.log('special key used');
        chrome.runtime.sendMessage({command: command_shortcut}, (response) => {
            console.log(response.message);
          });
    } 
});