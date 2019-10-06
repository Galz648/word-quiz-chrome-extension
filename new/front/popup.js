// popup.js 
console.log('hello from popup.js ');

const PORT=5000;
const _domain = `http://localhost:${PORT}/`;
var sel;

const input_element = document.getElementById("input-text");
const define_button = document.getElementById("define-button");
const add_button = document.getElementById("add-button");

// get the selected text from the content script
chrome.storage.sync.get('sel', (items) => {
   if (items.sel) {
      // log stored value to the console
      console.log(`sel: ${items.sel}`);
      // set the text inside the popup input element to the selected text
      sel = items.sel;
      input_element.value = sel;
   }
   else {
      // if selection variable in storage not found
      console.log('item sel not found');
   }
});




define_button.addEventListener('click', (event) => {
   console.log('define button clicked');
   // send a request to the backend with the input element text
   // fetch request related params
   const data = {sel};
   const options = {
       method : "POST",
       headers:{
           "Content-Type":"application/json"
       },
       body: JSON.stringify(data)
   };
   // sending selection resquest to server
   fetch(`${_domain}api/define_word?word=${sel}`, options)
   .then(response => alert("query type: define"))
   .catch(err => console.log(err));

});

add_button.addEventListener('click', (event) => {
   console.log('add button clicked');
   
   // fetch request related params
   const data = {sel};
   const options = {
       method : "POST",
       headers:{
           "Content-Type":"application/json"
       },
       body: JSON.stringify(data)
   };
   // sending selection resquest to server
   fetch(`${_domain}api/add_word?word=${sel}`, options)
   .then(response => alert('query type: add'))
   .catch(err => console.log(err)); 
});