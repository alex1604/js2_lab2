var callback = function(){

  var oldURL = document.referrer;
  console.log(oldURL);

  var logOutMessage = function(){
    let p = document.createElement("p");
    p.className = "logOutMessage";
    p.innerHTML = "You've been logged out.";
    //let loginPopOver = document.getElementById("loginPopOver");
    document.getElementById('loginPopOver').appendChild(p);
    console.log(p);
  }

  if(oldURL === "https://alex1604.github.io/js2_lab2/lab2_chat.html"){
    logOutMessage();
  }

  let gitlog = document.getElementById('gitlog');
  gitlog.addEventListener('click',function(){
    // Ett objekt för att hantera GitHub-autentisering
    let provider = new firebase.auth.GithubAuthProvider();
    // Skapa ett Promise som visar ett popup-fönster
    // Obs! Kontrollera att fönstret inte blockeras av en ad blocker
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      console.log(result);
      let username = result.additionalUserInfo.profile.name;
      if (username == 'null' || username == 'undefined'){
        let username = result.additionalUserInfo.profile.email;
        if (username == 'null' || username == 'undefined'){
          let username = result.additionalUserInfo.profile.login;
        }
      }
      console.log(username);
      const user = {name: username}; // WE USE THIS CONST TO GET THE USERNAME WITH USER.NAME
      let dataString = JSON.stringify( user );
      window.localStorage.setItem('user', dataString);
      document.body.removeChild(document.getElementById('loginPopOver'));
      let p = document.createElement('p');
      p.innerHTML = 'Please wait, you are being redirected.';
      document.body.appendChild(p);
      setTimeout(function(){
      window.location = "lab2_chat.html";
      }, 3000);
    }).catch(function(error){
      alert('Something went wrong. Try to reload the page');
    });

  });
}

window.addEventListener('load', callback);
