 
// listening to mouseup event
window.addEventListener('mouseup', () => {
    console.log('mouse up event triggered');
    // modify this so the selection is non-empty
    // modify this so the selection is triggered by a shortcut event
    // or by clicking a thing that pops up on screen
    const sel = window.getSelection().toString();
    // set a sel variable with the chrome storage api - 
    // for the popup.js file to access
    
    chrome.storage.sync.set({'sel': sel});
});
