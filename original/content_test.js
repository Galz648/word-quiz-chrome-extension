console.log("new content script");

var nav_language = window.navigator.userLanguage || window.navigator.language;
alert(nav_language); //works IE/SAFARI/CHROME/FF

function request_selected_language() {
	// request for the preffered language of the user.
}
// SELECT
console.log("select");
selectedText = (function get_selection() {
    let selection = window.getSelection();
    var selectedText = selection.toString();
    //var selectedText= selection.anchorNode.textContent
    console.log(selectedText);
    return selectedText
})()

// TRANSLATE
function get_translation {
			console.log("translation");
			let selectedLanguage = "english"
			let selectedText = 
			console.log(selectedText, selectedLanguage);
			let req = new XMLHttpRequest();
			req.open('GET', 'http://localhost:8080/translate?' + `expression=${selectedText})&language=${selectedLanguage}`);
			req.onload = function() {
			console.log('loaded')
			return req.status
			};
			req.send();
}



// MESSAGE
console.log("message");
if (selectedText.length) {
	chrome.runtime.sendMessage(selectedText);
        //console.log(expression);
	console.log(selectedText);

};

// NOTE :
// first of all I need to ask the chrome extention cs-listener for a language to translate to.
// I'm running into problems with referencing variables in my program, I should try and use an object, think of the tools javascript provides
// properties that we want to send to the flask server:
// {selectedText: selectedText, translation: ..., 
//	}
//	use to turn into format, to send over the web ---> JSON.stringify(X)
// END NOTE

// MAIN 

// call select function return selectedText 
// try { call translate function } ...
// call message( status_code of translate ) message cs_listener
