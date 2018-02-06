var callback = function(){


  /******** ALEJANDROS SPACE */

  let chatWindow = document.getElementById('chatWindow');
  let logOut = document.getElementById('logOut');
  var name = JSON.parse(localStorage.getItem('user')).name;

  document.getElementById('welcome').innerHTML = 'You are logged in as ' + '"'+ name + '"';

  // Man klickar på Send Message, skapas ett objekt som skickas till databasen:

  let sendButton = document.getElementById('sendMessage');
  sendButton.addEventListener('click', function(){
    let date = new Date();
    date = String(date);
    time = date.slice(4,10) + ', ' + date.slice(16,21);
    let message = document.getElementById('message').value;
    console.log(time);
    console.log(message);
    console.log(name);

    let object = {  // exempel objekt
      name: name,
      message: message,
      time: time
    };

    console.log(object);

    let db = firebase.database();
    db.ref('messages/').push(object);
    document.getElementById('message').value = '';
  });

  document.getElementById('message').addEventListener('keypress', function(event){
    if (event.key == "Enter"){
      let date = new Date();
      date = String(date);
      time = date.slice(4,10) + ', ' + date.slice(16,21);
      let message = document.getElementById('message').value;
      let name = JSON.parse(localStorage.getItem('user')).name;
      console.log(time);
      console.log(message);
      console.log(name);

      let object = {  // exempel objekt
        name: name,
        message: message,
        time: time
      };

      console.log(object);

      let db = firebase.database();
      db.ref('messages/').push(object);
      document.getElementById('message').value = '';
    }
  });

  // Man prenumererar på ändringar i databasen:
  let db = firebase.database();
  db.ref('messages/').on('value',function(snapshot){
    let allData = snapshot.val();
    console.log("The type of allData is: " + typeof allData)
    console.log("These are all objects :" + allData);
    let messages = document.getElementById("messages");

    while (messages.firstChild) {
    messages.removeChild(messages.firstChild);
    };

    for(let prop in allData) {

    let ms_info = '';
    let ms = '';
    let div = document.createElement('div');
    div.classList.add('ms-box');
    let div2 = document.createElement('div');
    div2.classList.add('ms-info');
    let div3 = document.createElement('div');
    let p = document.createElement('p');
    div3.classList.add('ms');

    let obj = allData[prop];

    ms_info = obj.name + ' / ' + obj.time;
    ms = obj.message;

    div2.innerHTML = ms_info;
    p.innerHTML = ms;
    div3.appendChild(p);

    div.appendChild(div2);
    div.appendChild(div3);

    messages.appendChild(div);
    scrollToBottom();

    };
  });

//Scroll
function scrollToBottom(){
  let chat = document.getElementById('messages');
   chat.scrollTop = chat.scrollHeight - chat.clientHeight;
}


  /* LOG OUT eller GLÖMMA BORT NAMNET */
  logOut.addEventListener('click', function(){
    localStorage.removeItem('user');
    window.location = 'index.html';
  });




  /**************************************/

}
window.addEventListener('load', callback);
