// sender
$(document).ready(function() {
	console.log("sender");
	console.log("inside document");
	$('#searching').keyup(function() {
	console.log("inside function");
	let input = $('#searching').val().toString();
	console.log('input: ', input);
	let choice = "hebrew"; // create element and fix call
	console.log('choice: ', choice);
	console.log('message sent from language-search.js --> content.js')
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
	   console.log(response);
	  });
	});

	});
	});


