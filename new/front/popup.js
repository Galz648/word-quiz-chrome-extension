// popup.js 
console.log('hello from popup.js ');


const PORT=5000; // request related parameters
const _domain = `http://localhost:${PORT}/`; // domain of api call
const api_route = "api/"; // route of api call
const method_add = 'add_word'; // method add word
const method_define = 'define_word'; // method define word
const APIadd = `${_domain}${api_route}${method_add}`; // url of api add-word method
const APIdefine = `${_domain}${api_route}${method_define}`; // url of api define-word method
const data = {}; // data to send to the backend
// POST request setup
const options = {
   method : "POST",
   headers:{
       "Content-Type":"application/json"
   }
};
// get html elements by id
const input_element = document.getElementById("input-text");
const define_button = document.getElementById("define-button");
const add_button = document.getElementById("add-button");


chrome.runtime.onMessage.addListener(
   function(request , sender, sendResponse) {
      console.log(`request : ${request}, sender: ${sender}`);
      sendResponse({'message': 'success'});
   });    
// get the selected text from the content script
chrome.storage.sync.get('sel', (items) => {
   // if sel exists in chrome.storage
   if (items.sel) {
      
      data.sel = items.sel; // add user selection to data const object
      console.log(`sel: ${data.sel}`); // log stored value to the console
      options.body = JSON.stringify(data) // modify POST request (option) body to include the user selection
      input_element.value = data.sel; // set the text inside the popup input element to the selected text
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

define_button.addEventListener('click', (event) => {
   console.log('define button clicked!');
   // send message to background page
   chrome.runtime.sendMessage({url: APIdefine, args: options}, function(response) {
      console.log(`response from bg page: ${response}`);
    });
   
});
// when add_button is clicked
add_button.addEventListener('click', (event) => {
   console.log('add button clicked');
   // sending selection POST request to server
   fetch(APIadd, options)
   .then(response => console.log(response.json()))
   .catch(err => alert(err)); 
});