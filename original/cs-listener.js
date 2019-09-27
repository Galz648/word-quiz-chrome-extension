console.log("listening to content script");

chrome.runtime.onMessage.addListener(
function(request, sender, sendResponse) {
		console.log(request);
		if (request.text !== "") {
			console.log(request.text);
		}
	});

