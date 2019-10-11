// popup.js 
console.log('hello from popup.js ');

const action_add = 'add'
const action_define = 'define'
let sel;
// get html elements by id
const input_element = document.getElementById("input-text");
const define_button = document.getElementById("define-button");
const add_button = document.getElementById("add-button");
let reset_button;

// get the selected text from the content script
chrome.storage.sync.get('sel', (items) => {
   // if sel exists in chrome.storage
   if (items.sel) {
      
      sel = items.sel; // add user selection to dat < -- change comment
      alert(`sel: ${sel}`); // log stored value to the console
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
   chrome.runtime.sendMessage({action:action_add, sel: sel, method:'post'}, function(response) {
      console.log('response from bg page');
      console.log(response);
    });
   
});
// // message background when add_button is clicked
add_button.addEventListener('click', (event) => {
   console.log('add button clicked');
   console.log('add button to background');
    // send message to background page
   chrome.runtime.sendMessage({action:action_define, sel: sel, method:'post'}, function(response) {
      console.log('response from background');
      console.log(response);
    });
});