// TESTING OUT DOM MANIPULATION

// this is the content script of the chrome-extension. 
// the content script is responsible for handling the selection/copy event.
// NEW : on special selection, send the message to extension
injected_objects_array = [];
/*

*/
console.log('content script started');
// on selection --> inject html.
var popupHTML = `
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">

</head>
<body style="text-align:center">

<h2>Popup</h2>

<div class="popup" onclick="myFunction()">Click me to toggle the popup!
  <span class="popuptext" id="myPopup">A Simple Popup!</span>
</div>

<script>

function myFunction() {
  alert("canvas.html");
  var popup = document.getElementById("myPopup");
  popup.classList.toggle("show");
}
</script>

</body> 
<html>`


var canvas_element = document.createElement("canvas");
canvas_element.width = "20";
canvas_element.height = "20";
canvas_element.id = "mydiv";
canvas_element.style.backgroundColor = "black";
canvas_element.style.position = "relative";
canvas_element.style.zindex = "10000";
document.body.appendChild(canvas_element);
// tries along the way -->
// canvas tag html code 
//var injection_html = '<script> alert("alert from canvas"); </script>'
// create script tag
/*
var script_element = document.createElement("SCRIPT");
script_element.src = "canvas.js"
//console.log(`type of script element: ${typeof(script_element)}`);
// canvas javascript creation
var canvas_element = document.createElement("CANVAS");
canvas_element.appendChild(script_element);
*/

/*
var script = document.createElement('script');s pre
script.src = "canvas.js";
script.onload = function() {
  console.log("Script loaded and ready");this.window.onload(parentEl.appendChild(canvas_element));

  //<button type="button">translate</button>
};

document.getElementsByTagName('head')[0].appendChild(script);
// add previous selection variable / add previous selection flag
*/

// monitor mouseup event
window.addEventListener('mouseup', function() {
// if there is a length to the selection --> get selection and parent element (call getSelectionParentElement function)
  let sel = window.getSelection();
  
  let parentEl = null;
  if (sel.toString().replace(/\s/g, '').length) {
    // get parent element
    if (sel.rangeCount) {
      parentEl = sel.getRangeAt(0).commonAncestorContainer;
      
      if (parentEl.nodeType != 1) {
          parentEl = parentEl.parentNode;
        }
      } 
      else if ( (sel = document.selection) && sel.type != "Control") {
        parentEl = sel.createRange().parentElement(); }
        //parentEl = parentEl.parentElement;
        console.log(`parentEl: ${parentEl}, sel: ${sel}`);
        
        //parentEl.style.backgroundColor = "red";
        console.log(`parentEl innerHTML: ${parentEl.innerHTML}`);
        //console.log(`parentEl innerHTML new: ${parentEl.innerHTML}`);
        parentEl.appendChild(canvas_element);
        injected_objects_array.push(canvas_element);
        
      } 
});

// inject html: 
// find the current element the selection is in
// inject the html for the button ( for starters inject an image tag with some image on it).



 