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

// GRAB FROM DOM
startQuizButton = document.getElementById('startQuiz');
endQuizButton = document.getElementById('stopQuiz');
nextCardButton = document.getElementById('nextCard');
cardP = document.getElementById('whichCard');
// hide elements at first
endQuizButton.style.display = "none";
nextCardButton.style.display = "none";
// EVENT CREATORS:
// click to stop quiz
endQuizButton.addEventListener("click", stopQuiz);
// click to start quiz
startQuizButton.addEventListener("click", startQuiz);
// click to get next card
nextCardButton.addEventListener("click", nextCard);

async function startQuiz() {
  // this is an event handler
  // hide dom element
  startQuizButton.style.display = "none";
  // show button on dom
  endQuizButton.style.display = "unset";
  nextCardButton.style.display = "unset";
  console.log('quiz started!');
  // send message to background page to assemble a quiz
  
  // one way - Promise - working
  //response = await sendMessagePromise({message: 'buildQuiz'});
  //console.log(response);

  // second way - Promise in function - working
  // handle events related to the quiz
  response = await eventHandler('buildQuiz');
  console.log(response);
  console.log(typeof response);
  stack = response;
  console.log('stack:');
  console.log(stack);
  nextCard();
  // assign the first card


}


function nextCard() {
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
          if(response) {
            console.log('resolved');
              resolve(response.message);
          } else {
              reject('Something wrong');
          }
      });
  })};

async function eventHandler(eventMessage) {
  /*
  function eventHandler is responsible for the transfer of data between the background.js,
  and quiz.js.
  any action related to updating or fetching of data from the database / processing of data, 
  will go through this function
  */
  if (eventMessage === 'buildQuiz') {
    let message = {message: eventMessage};
    return await sendMessagePromise(message);
    
  }
  if (eventMessage === 'nextCard') {
    console.log('next card requested');
    // log new card
    currentCard = stack[currentCardNumber];
    currentCardNumber += 1;
    console.log(currentCard);
    console.log(currentCardNumber);

    // assigns random quality to each card from 0-5
    let cardQuality = getRandomInt(5);
    // insert quality into stack
    currentCard.quality = cardQuality;
    console.log(currentCard);
    if (currentCardNumber === totalCardsNumber) {
      // finish quiz
      stopQuiz();
    }
  }

  if (eventMessage === 'endQuiz') {
    // documentation
    chrome.runtime.sendMessage({message: 'evaluateQuiz', quizData: stack}, function(response) {
      console.log(stack);
      // response from backgroud script
      console.log('quiz stopped');
      console.log(response);
      
    });
  }
}

