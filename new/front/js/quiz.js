// send message to background page to assemble a quiz

chrome.runtime.sendMessage({message: "buildQuiz"}, function(response) {
  console.log('from quiz.js');
  console.log(response);
});