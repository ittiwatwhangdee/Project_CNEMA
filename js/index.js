var db = firebase.firestore();
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var email = user.email;
    displayName = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    console.log(displayName, email, photoUrl);

    $("#username").text(email);
    $("#displayname").text(displayName);
    $("#photo").attr("src",photoUrl);
  } else {
    // User is signed out.
    window.location.href = "login.html";
  }
});
$("#signout").click(function () {
  
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }).catch(function (error) {
    // An error happened.
  });
})

db.collection("movies").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    var row = `<h3>${doc.data().title}</h3><div class="card">
        <img class="card-img-top" src="${doc.data().posterURL}" alt="" >
        <div class="card-body">
            <h4 class="card-title">${doc.data().title}(${doc.data().year})</h4>
            
            <p class="card-text">${doc.data().shortstory}</p>
        </div>
    </div>`
    $("#list").append(row);
  });
});
