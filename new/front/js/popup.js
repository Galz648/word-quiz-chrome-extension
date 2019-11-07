// popup.js 
console.log('hello from popup.js ');

const action_add = 'add'
const action_define = 'define'
let sel;
// get html elements by id
const input_element = document.getElementById("input-text");
const define_button = document.getElementById("define-button");
const add_button = document.getElementById("add-button");
const options_button = document.getElementById("go-to-options");
const quiz_window = document.getElementById("quiz-window");

// get the selected text from the content script
chrome.storage.sync.get('sel', (items) => {
   // if sel exists in chrome.storage
   if (items.sel) {
      console.log(`POPUP.JS: items.sel ${items.sel}`);
      sel = items.sel; // add user selection to dat < -- change comment
      console.log(`sel: ${sel}`); // log stored value to the console
      input_element.value = sel; // set the text inside the popup input element to the selected text
   }
   else {
      
      console.log('item sel not found'); // if selection variable in storage not found
   }
});




// when define_button is clicked
//define_button.addEventListener('click', (event) => {
//   console.log('define button cicked');
//
//   // sending selection POST request to server
//   fetch(APIdefine, options)
//   .then(response => console.log(response.json()))
//   .catch(err => alert(err));
//
//});

// message background when define_button is clicked
define_button.addEventListener('click', (event) => {
   console.log('define button clicked!');
   // send message to background page
   console.log('define button to background');
   chrome.runtime.sendMessage({action:action_define, sel: sel, method:'post'}, function(response) {
      console.log('response from bg page');
      console.log(response);
    });
   
});
// // message background when add_button is clicked
add_button.addEventListener('click', (event) => {
   // set popup
   //window.location.href="add.html";
   
   console.log('add button clicked');
   console.log('add button to background');
    // send message to background page
   chrome.runtime.sendMessage({action:action_add, sel: sel, method:'post'}, function(response) {
      console.log('response from background');
      console.log(response);
    });
});


options_button.addEventListener('click', (event) => {
   // go to options page
   //chrome.runtime.openOptionsPage();
   //window.open(chrome.runtime.getURL('options.html'));
   //window.open(chrome.runtime.getURL('templates/options.html'));
   window.open(chrome.runtime.getURL('front/templates/options.html'));
});

quiz_window.addEventListener('click', (event) => {
   // Open quiz Page
   window.open(chrome.runtime.getURL('front/templates/quiz.html'));
});