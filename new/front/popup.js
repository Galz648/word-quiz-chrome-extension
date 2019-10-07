// popup.js 
console.log('hello from popup.js ');

// request related parameters
const PORT=5000;
const _domain = `http://localhost:${PORT}/`;
const api_route = "api/";
const method_add = 'add_word';
const method_define = 'define_word';
const data = {};
const options = {
   method : "POST",
   headers:{
       "Content-Type":"application/json"
   }
};
const input_element = document.getElementById("input-text");
const define_button = document.getElementById("define-button");
const add_button = document.getElementById("add-button");

// get the selected text from the content script


chrome.storage.sync.get('sel', (items) => {
   if (items.sel) {
      data.sel = items.sel;
      // log stored value to the console
      console.log(`sel: ${data.sel}`);
      options.body = JSON.stringify(data)
      // set the text inside the popup input element to the selected text
      input_element.value = data.sel;
   }
   else {
      // if selection variable in storage not found
      console.log('item sel not found');
   }
});


// when define_button is clicked
define_button.addEventListener('click', (event) => {
   console.log('define button clicked');
   // send a request to the backend with the input element text

   // sending selection resquest to server
   fetch(`${_domain}${api_route}${method_define}?word=${data.sel}`, options)
   .then(response => console.log(response.json()))
   .catch(err => alert(err));

});

// when add_button is clicked
add_button.addEventListener('click', (event) => {
   console.log('add button clicked');
   // sending selection resquest to server
   fetch(`${_domain}${api_route}${method_add}?word=${data.sel}`, options)
   .then(response => console.log(response.json()))
   .catch(err => alert(err)); 
});