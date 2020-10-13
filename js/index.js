
var firebaseConfig = {
  apiKey: "AIzaSyD3CA8uNNLYKTiLda76DJyi0qXBWIJpljw",
  authDomain: "cnema-c284d.firebaseapp.com",
  databaseURL: "https://cnema-c284d.firebaseio.com",
  projectId: "cnema-c284d",
  storageBucket: "cnema-c284d.appspot.com",
  messagingSenderId: "677283409519",
  appId: "1:677283409519:web:7778c3d67f4ac1bfb8279a",
  measurementId: "G-E9RPXMD7HD"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var db = firebase.firestore();
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var email = user.email;
    console.log(`User with email ${email} signed in`);
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
