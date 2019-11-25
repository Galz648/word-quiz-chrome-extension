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
startButton = document.getElementById('startQuiz');

class QuizCompleteSentence{
  Constructor(cardsNum=3, length=3, quizType, data) {
      this.cardsNum = cardsNum;
      this.length = length;
      this.quizType = quizType;
      this.data = data;
  }
}

// click to start quiz
startButton.addEventListener("click", async function(){
  // this is an event creator

  console.log('quiz started!');
  // send message to background page to assemble a quiz
  
  // one way - Promise - working
  //response = await sendMessagePromise({message: 'buildQuiz'});
  //console.log(response);

  // second way - Promise in function - working
  // handle events related to the quiz
  response = await eventHandler('buildQuiz');
  console.log(response);
});

function sendMessagePromise(item) {
  return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage(item, response => {
          if(response) {
            console.log('resolved');
              resolve(response);
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

  if (eventMessage === 'endQuiz') {
    // documentation
    chrome.runtime.sendMessage({message: 'evaluateQuiz'}, function(response) {
      // response from backkgroud script
      console.log(response);
      
    });
  }
}

/*
// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


function quizLoop() {
sleep(5000)
.then(

  );

}
*/