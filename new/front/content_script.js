// testing out rest api with python

// variable declaration
const PORT=5000;
const _domain = `http://localhost:${PORT}/`; 
// listening to mouseup event
window.addEventListener('mouseup', () => {
    console.log('mouse up event triggered');
    const sel = window.getSelection().toString();
    const data = {sel};
    const options = {
        method : "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(data)
    };
    // sending selection resquest to server
    fetch(`${_domain}api?word=${sel}`, options)
    .then(response => console.log(response))
    .catch(err => console.log(err));
});


