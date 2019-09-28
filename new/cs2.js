// TESTING OUT DOM MANIPULATION

// content script second try
function calculate_coordinates(bX, bY, aX, aY){
  const rX = bX - aX;
  const rY = bY;
  return rX, rY;
};
// testing out window mouseup event in jquery
window.onmousedown = (function() {
    var beforeX = event.pageX;
    var beforeY = event.pageY;
    console.log('mousedone event');
    console.log(event.pageX, event.pageY);

});

window.addEventListener('mouseup', function() {
    // if there is a length to the selection --> get selection and parent element (call getSelectionParentElement function)
    const afterX = event.pageX;
    const afterY = event.pageY;  
    // injection css coordinates 
    const resultX, resultY = calculate_coordinates(beforeX, beforeY, afterX, afterY);
    console.log(resultX, resultY);
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
          }
            
            var canvas_js = chrome.runtime.getURL('canvas.js');
            var script_element = $('<script>');
            script_element.className = "myinjection";
            script_element.attr('src', canvas_js);
            script_element.addEventListener('load', () => {
              // insert css here
              // chrome.runtime.getURL
            });
            // wrap text / add 
            //$(parentEl).append(script_element);

            console.log('end mouseup event');
    });