console.log("sketch!");
// check for the mouseup event
var bool = false
// listen for selection
window.addEventListener("mouseup", e => {
    selectedText = window.getSelection().toString();
    // if something is selected
    if (selectedText.length) {
        console.log(selectedText);
        bool = true
    }
    else {
        bool = false
    }
    })

var s = function(sketch) {
    
    sketch.setup = function() {
        console.log("setup!");
   
    }
    
    
    sketch.draw = function() {
        // draw the button on screen.
        if (bool == true) {
            
            console.log(sketch.mouseX, sketch.mouseY);
            c.position(sketch.mouseX, sketch.mouseY);
            //c.style("pointer-events", "none");
            c.background(0);
        }
        
}
}

var myp5 = new p5(s);

