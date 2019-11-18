// get html elements
sentence_example1 = document.getElementById("sentence-placeholder1");
sentence_example2 = document.getElementById("sentence-placeholder2");
sentence_example3 = document.getElementById("sentence-placeholder3");
p_first = document.getElementById("first");
p_second = document.getElementById("second");
p_third = document.getElementById("third");
p_fourth = document.getElementById("fourth");

(async function get_words() {
  const url = 'http://localhost:5000/api/word/quiz?word=motivation';
  let data = await fetch(url).then(response => response.json());  
  console.log(data);
  sentence_example1.innerHTML = data.examples[0];
  sentence_example2.innerHTML = data.examples[1];
  sentence_example3.innerHTML = data.examples[2];
  p_first.innerHTML = data.word;
  p_second.innerHTML = data.similar_words[0];
  p_third.innerHTML = data.similar_words[1];
  p_fourth.innerHTML = data.similar_words[2];
})()


