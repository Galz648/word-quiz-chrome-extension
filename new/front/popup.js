// popup.js 
console.log('hello from popup.js ');


let input_element = document.getElementById("input-text");
let input_button = document.getElementById("input-button");

input_button.addEventListener('click', (event) => {
   console.log(input_element.value); 
});