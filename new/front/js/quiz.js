async function get_words() {
  const url = 'http://localhost:5000/api/get_words';
  const data = await fetch(url);
  const json_data = await data.json()
  return json_data;
}


// html bullshit
my_paragraph = document.getElementById('my_words');
console.log('Hello from quiz.js!');
const word_promise = get_words()
.then((data) => {
data.forEach(entry => {
  my_paragraph.innerHTML += entry['word'];
});
}).catch((err) => console.log(err));