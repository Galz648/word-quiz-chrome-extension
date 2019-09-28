// testing out rest api with python

// sending selection resquest to server
var PORT=5000;

window.addEventListener('mouseup', () => {
    console.log('mouse up event');
    let sel = window.getSelection();
    let selectionText = sel.toString();
    if (selectionText.length) {
    // http post request code
    var req = new XMLHttpRequest();
    req.open("POST", `http://localhost:${PORT}/?` + `word=${selectionText}`);
    req.onload = () => {
        console.log(`request response: ${req.response}`);
    }
    req.send();
}
});