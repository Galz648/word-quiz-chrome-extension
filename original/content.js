//create popup and send the dest_language to content.js

//block_to_insert = document.createElement( 'div' );
//block_to_insert.id = "inserted";
//block_to_insert.className="alert-primary";
//block_to_insert.setAttribute("role", "alert");
//block_to_insert.innerHTML = txt + ".";

//create the parent // create child 
//html = '<div class="tooltip">Hover over me <span class="tooltiptext">Tooltip text</span> </div>';
//parent_block = htmlToElement(html);
//console.log("parent_block", parent_block);

/*
parent_block = document.createElement('div'); 
child_block = document.createElement('span');
// populate parent  // populate child
child_block.className="tooltiptext";
child_block.innerHTML="word translation";
parent_block.className="tooltip";
parent_block.innerText = "FUCK ME HARD";
parent_block.innerHTML = child_block.
console.log("parent_block: ", parent_block);
console.log(child_block);
// add child to parent
//parent_block = parent_block.appendChild(child_block);
console.log("block_to_insert", parent_block);
// inject it for a single word in the page
//container_block = document.getElementById( 'democontainer' );
let i = 10;
container_block = document.getElementsByTagName( 'p' )[i];
console.log(container_block)
//block_to_insert.style["color"] = "#FF00FF";
//console.log(container_block);
console.log("chrome extension go"); 
//container_block.appendChild( parent_block );
//console.log(container_block)
*/
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

var container_block ;
var block_to_insert ;
let popover_html = '<div id="popover_container"><h3>selected word</h3><p>a sentence describing the translated word.</p><a href="#" data-toggle="popover" title="Popover Header" data-content="Some content inside the popover">selected word</a></div>'

let txt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";

let popover_txt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";

let popover_container = '<div class="popover_container"><h3>Popover Example</h3><a href="#" data-toggle="popover" title="Popover Header" data-content="Some content inside the popover">Toggle popover</a></div>'

console.log("monitoring mouseup event");
window.addEventListener('mouseup', expressionSelected);

function checkId(elem)
{
    return elem
}

function expressionSelected() {
    selectedObj = window.getSelection()
    let expression = selectedObj.toString();
    console.log('selectedObj parentNod: ', checkId(selectedObj));
    if (expression.length) {
        console.log('selected expression: ', expression);
        let x = event.clientX;
        let y = event.clientY;
        console.log("x: " + x + " y: " + y);
        // send selectedExpression to the flask server
        // receieve a reply with the translated expression.
        let dest_language = 'english';
        let url = 'http://localhost:8080/translate?'
        var req = new XMLHttpRequest();
        let args = `expression=${expression}&language=${dest_language}`;
        req.open('GET', url + args );
        req.onload = function() {
            let response = JSON.parse(req.responseText);
            console.log(response.translation);
            // create popover html to be added to the page + fill popover html with arguments
            let popover_parent = '<div class="popover_container"><h3>${response.expression}</h3><a href="#" data-toggle="popover" title="Popover Header" data-content="${response.translation}">Toggle popover</a></div>';
            let popover_child = '<a href="#" data-toggle="popover" title="Popover Header" data-content="${response.translation}"></a>;'
            popover_html = htmlToElement(popover_child);
            popover_html.style['color'] = 'red';
        };
        req.send();
    };
};
