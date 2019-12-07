// background page
console.log('hello from bg script');
// firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyA0MAOZ42dLoU8Or4__Z8mhzeHzzgjvQW0",
    authDomain: "word-quiz-chrome-1570215653744.firebaseapp.com",
    databaseURL: "https://word-quiz-chrome-1570215653744.firebaseio.com",
    projectId: "word-quiz-chrome-1570215653744",
    storageBucket: "word-quiz-chrome-1570215653744.appspot.com",
    messagingSenderId: "462615532572",
    appId: "1:462615532572:web:5ae96e45eafc3590fffbd9",
    measurementId: "G-LLBRKWFNSC"
};
firebase.initializeApp(firebaseConfig); // initialize firebase object
const db = firebase.database();
let uid;
const action_add = 'add'; // method add word
const action_define = 'define'; // method define word
// notification options creation

let notifOptionsError = {
    type: "basic",
    title: "Action Error",
    iconUrl: "/front/images/book_icon.png"
}

let notifOptionsAdd = {
    type: "basic",
    title: "Added Word",
    iconUrl: "/front/images/book_icon.png"
}
let notifOptionsDefine = {
    type: "basic",
    title: "Defined Word",
    iconUrl: "/front/images/book_icon.png"
}
let notifOptionsSelect = {
    type: "basic",
    title: "Select Word",
    iconUrl: "/front/images/book_icon.png"
}
// command shortcuts:
const command_add = 'Add-Word';
const command_select = 'Select-Word';
const command_define = 'Define-Word';
// contextMenu "define"
const contextMenuItemDefine = {
    id: "define",
    title: "Get Definition",
    contexts: ["selection"]
};
// contextMenu "add"
const contextMenuItemAdd = {
    id: "add",
    title: "Add To Dictionary",
    contexts: ["selection"]
}

const contextMenuItemSelect = {
    id: "select",
    title: "Select Word",
    contexts: ["selection"]
}
// contextMenus array
const contextMenuItems = [
    contextMenuItemDefine,
    contextMenuItemAdd,
    contextMenuItemSelect
];

function createNotification(action, selection) {
    let notifOptions;
    if (action == 'add') {
        notifOptions = notifOptionsAdd;
        // modify message
        notifOptions.message = `Word Added: ${selection}`;
    }
    else if (action == 'select') {
        notifOptions = notifOptionsSelect;
        // modify message
        notifOptions.message = `Word Selected: ${selection}`;
    }
    else if (action == 'define') {
        notifOptions = notifOptionsDefine;
        // modify message
        notifOptions.message = `Word Defined: ${selection}`;
    }
    else if (action == 'error') {
        previousAction = chrome.storage.sync.get(['prevAction']);
        notifOptions = notifOptionsError;
        notifOptions.message = `Could not perform action: ${previousAction}`
    }
    // add previous action to local storage
    chrome.storage.sync.set({ 'prevAction': action });
    // create notification
    chrome.notifications.create(`notif_${action}`, notifOptions);
    console.log(`created notif_${action}, selection: ${selection}`);
}
/* 
From chrome contextMenus DOCUMENTATION - 
You can create as many context menu items as you need, 
but if more than one from your extension is visible at once, 
Google Chrome automatically collapses them into a single parent menu.
*/

// when called, create the given contextMenus within an array
function createContextMenus(contextMenuArray) {
    contextMenuArray.forEach(element => {
        // create contextMenu
        chrome.contextMenus.create(element);
        console.log(`contextMenuItem "${element.id}" created`);
    });
}


async function handleSelection(action, sel) {
    // check if word is valid
    let process;
    process = await verifySelection(sel);
    // add selected word to firebase
    if (process == true) {
        const ref = db.ref(`users/${uid}/words/${sel}`);
        ref.once('value', snapshot => {
            if (snapshot.exists()) {
                // word already exists in database
                console.log('object exists!');
                var card = snapshot.val();
                // make call to update card
                // send update query
                ref.update(card);

            }
            else {
                // create the object as new
                console.log('object is new!');
                // store new card in db
                var card = buildCard(sel);
                // 
                ref.set(
                    card
                );
            }
        });

        chrome.storage.sync.set({ sel: sel }, function () {
            console.log(`Sel is set to ${sel} in localStorage`);
        });
        console.log(`saved :${sel}`);
        createNotification(action, sel); // add notification

    }
    else {
        console.log('wrong use of selection');
        createNotification('error', sel);
    }


}

// do something when a contextMenu is clicked
chrome.contextMenus.onClicked.addListener((contextMenu) => {
    console.log(`context menu id: ${contextMenu.menuItemId}, selectionText: ${contextMenu.selectionText}`);
    // store selection text in chrome storage, for popup.js to access

    // create notification
    //createNotification(contextMenu.menuItemId, contextMenu.selectionText);
    // api call
    console.log(`contextMenu Listener info: contextMenuId: ${contextMenu.menuItemId}, sel: ${contextMenu.selectionText}`);
    handleSelection(contextMenu.menuItemId, contextMenu.selectionText); // action, sel, method 
});

function commandHandler(command) {
    console.log(`command: ${command}`);
    let command_action;
    if (command == command_add) {
        command_action = 'add';
    }
    else if (command == command_select) {
        command_action = 'select';
    }
    else if (command == command_define) {
        command_action = "define";
    }
    console.log(`shortcut ${command_action} used`);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: command_action }, function (response) {
            console.log(`printing response from content script, command action  ${command_action}, response.sel ${response.sel}`);
            //createNotification(command_action, response.sel);
            handleSelection(command_action, response.sel);
        });

    });
}


// listen for button click message from popup.js
chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (sender.url.includes('popup.html')) {
            // message occurs when buttons are pressed in popup.html
            // handle api call
            console.log(`message from popup.js- action: ${request.action}, sel: ${request.sel}, method: ${request.method}`);
            handleSelection(request.action, request.sel);
            // create notificationa
            sendResponse({ 'message': 'success' });
            //createNotification(message.action, message.sel);
        }
        else if (sender.url.includes('quiz.html')) {
            console.log('request.message:')
            console.log(request.message);
            if (request.message === 'buildQuiz') {
                console.log('messge from quiz.html');
                buildQuiz().then(quiz => sendResponse({ 'message': quiz }));
            }
            else if (request.message == 'evaluateQuiz') {

                console.log(request.quizData);
                console.log('response sent');
                // evaluate quiz
                let quizArrayNew = evaluateQuiz(request.quizArray);
                console.log('quizArrayNew:');
                console.log(quizArrayNew);
                // update the associated card data in quiz, inside firebase
                updateQuiz(quizArrayNew);
                console.log('updated');
                sendResponse({ message: 'evalutedQuiz' });

            }
        }

        // incase you change the code, look at these resources
        // https://stackoverflow.com/questions/54126343/how-to-fix-unchecked-runtime-lasterror-the-message-port-closed-before-a-respon
        // https://github.com/mozilla/webextension-polyfill/issues/130
        return true;
    });

async function getData(sel, action) {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json'
        }
    }
    return new Promise(async (resolve, reject) => {
        try {
            let res = await fetch(`https://wordquiz-api-heroku.herokuapp.com/api/word/${action}?word=${sel}`, options);
            let data = await res.json();
            console.log(data);
            resolve(data);
        } catch (e) {
            reject(e)
        }
    });
};

async function verifySelection(sel) {
    let process = true;
    sel = sel.trim().toLowerCase();
    if (sel.length > 10) {
        process = false;
        return process;
    }
    // check definition
    console.log('getData');
    try {
        // process = true
        await getData(sel, 'define');
    } catch (e) {
        console.error(e);
        process = false
    }
    finally {
        return process;
    }
}
async function fetchData(word) {
    // fetch related words for word
    let related_data = await getData(word, 'related');
    // fetch sentences for word
    let sentences_data = await getData(word, 'sentences');
    let data = { relatedWords: related_data, exampleSentences: sentences_data }
    return data;
}
function evaluateCard(easiness, repetitions, interval, quality, word) {
    // update according to spaced repetition algorithm
    easiness = Math.max(1.3, easiness + 0.1 - (5.0 - quality) * (0.08 + (5.0 - quality) * 0.02));
    if (quality < 3) {
        repetitions = 0;
    }
    else {
        repetitions += 1;
    }
    if (repetitions == 1) {
        interval = 1
    }
    else if (repetitions == 2) {
        interval = 6;
    }
    else {
        interval = interval * easiness;
    }

    interval = Math.ceil(interval);
    return { interval: interval, easiness: easiness, repetitions: repetitions, quality: quality, word: word }
}

function updateQuiz(quiz) {
    console.log('updateQuiz Called');
    console.log('quiz in updateQuiz:');
    console.log(quiz);
    quiz.forEach(card => updateCard(card));
}
function updateCard(card) {
    console.log(`updating card: ${card.word}`);
    const ref = db.ref(`users/${uid}/words/${card.word}`);
    ref.update(card);
}
function evaluateQuiz(quizArray) {
    // for each card in quiz
    console.log('quizArray');
    console.log(quizArray);
    // update cards parameters according to the spaced repetition algorithm
    const quizArrayNew = quizArray.map(card => evaluateCard(card.easiness, card.repetitions, card.interval, card.quality, card.word));
    console.log('yo');
    return quizArrayNew;
}
function quizToArray(quiz) {
    // for each entry in quiz --> get the value and store it in the array of objects
    // store object in arrayofObj
    // return arrayofObj
    //new CardCompleteSentence(e[1].word, e[1].easiness, e[1].repetitions, e[1].interval
    // populate arrayofObj


    ///let arrayOfObjs = [];
    //for (let [key, value] of Object.entries(quiz)) {}
    const arrayOfObjs = Object.entries(quiz).map((e) => (e[1]));
    console.log('arrayofObjs:');
    console.log(arrayOfObjs);
    return arrayOfObjs;
}
async function buildQuiz(cards = 3) {
    // construct a quiz upon user request
    console.log('building Quiz...');

    // 1. give me X amount of words/cards with the lowest interval scores, where X is given as a parameter
    let wordsRef = db.ref(`users/${uid}/words`);
    var quiz = await wordsRef.orderByChild("interval").limitToLast(cards).once("value");
    console.log('quiz.val():');
    console.log(quiz.val());

    // break apart the given quiz, and create card class instances for each card
    quiz = quizToArray(quiz.val());
    // return the array containing those cards
    return quiz;
}


function buildCard(word) {
    // create a javascript object with starting data
    const card = {
        word: word,
        easiness: 2.5,
        repetitions: 0,
        interval: 1
    }
    // api call to get data about the specified word
    data = fetchData(word);
    card.data = data;
    console.log('card data:');
    console.log(card.data);
    // return object
    return card;
}


// Listen for auth state changes.
firebase.auth().onAuthStateChanged((user) => {
    chrome.identity.getAuthToken({ 'interactive': true }, function (token) {
        // Use the token.
        console.log(token);
    });
    // logged in 
    if (user) {
        // save uid for user related queries
        uid = user.uid;

        console.log('logged in');
        console.log(user.uid);
        // create context menus
        createContextMenus(contextMenuItems);
        // listen for shortcuts
        chrome.commands.onCommand.addListener(commandHandler);

        const ref = db.ref('users/' + user.uid);
        ref.once('value', snapshot => {
            // user exists in firebase
            if (snapshot.exists()) {
                // user exists
                console.log('object exists!');
                var userEntry = snapshot.val();
                console.log(`userEntry: `);
                console.log(userEntry);
            }
            // user does not exist in firebase
            else {
                console.log("user doesn't exist");
                // add new user
                //const ref = db.ref('users/' + user.uid);
                //ref.set(0);
            }
        });

    }
    // not logged in 
    else {
        console.log('not logged in');

    }
});

