/*
flow of the program:
    // 1. build quiz object
    // 2. start the quiz
          // 2.1 start card n
          // 2.2 end card n
          // 2.3 go to step 2.1
    // 3. end quiz
    // 4. send quiz data to background script
*/


// VARIABLE INITIALIZATION:
let stack = [];
let currentCard;
let currentCardNumber = 0;
let totalCardsNumber = 3;
let totalOptionNumber = 4;
let currentExampleNumber = 0;
let totalExamplesNumber = 2;
let selectedOption = null;


// flow buttons
let startQuizButton = document.getElementById('startQuiz');
let endQuizButton = document.getElementById('endQuiz');
let nextCardButton = document.getElementById('nextCard');
let submitCardButton = document.getElementById("submitCard");
// example
let previousExampleButton = document.getElementById('prevExample');
let nextExampleButton = document.getElementById('nextExample');
let exampleText = document.getElementById('exampleText');

let optionsDiv = document.getElementsByClassName("options")[0];


// EVENT CREATORS:

// click to start quiz
startQuizButton.addEventListener("click", startQuiz);
// click to get next card
submitCardButton.addEventListener("click", cardSubmitted);

function cardSubmitted() {
  if (selectedOption != null) {
    console.log(selectedOption);
    nextCard();
    selectedOption = null;
  }
}
async function start() {
  startQuizButton.parentNode.removeChild(startQuizButton);
  startQuizButton.style.display = "none";

  endQuizButton.style.display = "unset";
  //nextCardButton.style.display = "unset";


  // hide button container

  // create option buttons and
  console.log('quiz started!');
  stack = await eventHandler('buildQuiz');

  // setup options

  endQuizButton.addEventListener("click", stopQuiz);
  nextCardButton.addEventListener("click", nextCard);
  nextCard();  // assign the first card
  previousExampleButton.addEventListener("click", prevExample);
  nextExampleButton.addEventListener("click", nextExample);
  submitCardButton.style.display = 'unset';
  // listen for option clicks
  optionsDiv.addEventListener('click', (event) => {
    if (event.target.className === "option") {
      if (event.target.innerHTML == selectedOption) {
        selectedOption = null;
      }
      else {
        console.log(event.target.innerHTML);
        selectedOption = event.target.innerHTML;
      }
    }
  })
}
function setCurrentExample() {
  exampleText.innerHTML = currentCard.data.exampleSentences[currentExampleNumber];
}
function prevExample() {
  if (currentExampleNumber > 0) {
    currentExampleNumber -= 1;
    setCurrentExample();
  }
  else if (currentExampleNumber == 0) {
    // do nothing
  }
}

function nextExample() {
  if (currentExampleNumber < totalExamplesNumber) {
    currentExampleNumber += 1;
    setCurrentExample()
  }
  else if (currentExampleNumber == totalExamplesNumber) {
    // do nothing
  }
}
function nextCard() {
  // an option is selected -> move to next card
  eventHandler('nextCard');

}

function stopQuiz() {
  eventHandler('endQuiz');
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}


function sendMessagePromise(item) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(item, response => {
      if (response) {
        console.log('resolved');
        resolve(response.message);
      } else {
        reject('Something wrong');
      }
    });
  })
};

async function eventHandler(eventMessage) {
  /*
  function eventHandler is responsible for the transfer of data between the background.js,
  and quiz.js.
  any action related to updating or fetching of data from the database / processing of data, 
  will go through this function
  */
  if (eventMessage === 'buildQuiz') {
    let message = { message: eventMessage };
    return await sendMessagePromise(message);

  }
  if (eventMessage === 'nextCard') {
    console.log('next card requested');


    currentCard = stack[currentCardNumber];
    console.log(currentCard);
    console.log(currentCardNumber);

    // populate options
    exampleText.innerHTML = currentCard.data.exampleSentences[0];
    if (currentCardNumber === 0) {
      // if first card
      document.querySelector(".example").style.display = 'unset';
    }



    // get options from "options" div
    let children = optionsDiv.getElementsByTagName("button");
    for (let i = 0; i < totalOptionNumber; i++) {
      children[i].innerHTML = currentCard.data.relatedWords[i];
    }
    optionsDiv.style.display = "unset";
    // assigns random quality to each card from 0-5
    let cardQuality = getRandomInt(5);
    // insert quality into stack
    currentCard.quality = cardQuality;
    console.log(currentCard);
    currentCardNumber += 1;
    if (currentCardNumber === totalCardsNumber) {
      // show "stop Quiz" button
      stopQuiz();
    }
  }

  if (eventMessage === 'endQuiz') {
    // documentation
    chrome.runtime.sendMessage({ message: 'evaluateQuiz', quizArray: stack }, function (response) {
      console.log(stack);

      // response from backgroud script
      console.log('quiz ended');
      console.log(response);

    });
  }
}