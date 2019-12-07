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
firebase.initializeApp(firebaseConfig);

// Get Elements

const usernameInput = document.getElementById('username')
const passInput = document.getElementById('pass')
const btnSignUp = document.getElementById('signup')

btnSignUp.addEventListener('click', e => {
    const email = usernameInput.value;
    const pass = passInput.value;
    const auth = firebase.auth();

    const promise = auth.createUserWithEmailAndPassword(email, pass);

    promise.catch(e => console.log(e.message));
})