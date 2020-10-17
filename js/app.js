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

// App logic.
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    // var displayName = user.displayName;
    var email = user.email;
    // var emailVerified = user.emailVerified;
    // var photoURL = user.photoURL;
    // var isAnonymous = user.isAnonymous;
    // var uid = user.uid;
    // var providerData = user.providerData;

    console.log(email);
    displayName = user.displayName;
    photoUrl = user.photoURL;
    console.log(displayName, email, photoUrl);


    document.querySelector('#myNavigator').replacePage('tabs.html');
  } else {
    document.querySelector('#myNavigator').replacePage('views/signin.html');
  }
});

document.addEventListener("prechange", function (event) {
  if (event.tabItem) {
    document.querySelector(
      "ons-toolbar .center title bg-title"
    ).innerHTML = event.tabItem.getAttribute("label");
  }
});


document.addEventListener('init', function (event) {
  var page = event.target;
  console.log(page.id);

  document.getElementById("signout").onclick = function () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }).catch(function (error) {
      // An error happened.
    });
  }

  if (page.id === "home") {
    db.collection("movies").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        var item = `
        <ons-carousel-item style="text-align: center;" id="${doc.data().title}" onclick="MoviesDetail(this.id)"> 
        <img src="${doc.data().posterURL}" style="width:100%;">
        </ons-carousel-item>`
        var onsItem = document.createElement('ons-carousel-item');
        onsItem.innerHTML = item;
        page.querySelector('#carousel').appendChild(onsItem);
        
      });
    });
  }
  function MoviesDetail(id){
    db.collection("movies").get().then(function(querySnapshot){
      querySnapshot.forEach(function (doc) {
        if(doc.data().title == id){
          const detail =
          `
          ${data().title}
          `
          $("#title").append(detail);

        }
        
      });

    });
  }



  if (page.id === "home") {
    db.collection("toprate").get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var item = `<div class="movie_list">
        <ons-carousel auto-refresh swipeable overscrollable item-width="150px">
        <ons-carousel-item modifier="nodivider">
      <img src="${doc.data().posterURL}" style="width:100%;">
      </ons-carousel-item></div>`
        var onsItem = document.createElement('ons-carousel-item');
        onsItem.innerHTML = item;
        page.querySelector('#carousel2').appendChild(onsItem);
      });
    });

  }

  if (page.id === "signin") {
    document.getElementById("signinbutton").onclick = function () {
      var username = document.querySelector("#username").value;
      var password = document.querySelector("#password").value;
      console.log(username, password);

      firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        document.querySelector("#error").innerHTML = errorMessage;
      });
    }

    document.getElementById("signingoogle").onclick = function () {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    }
  }

  if (page.id === "profile") {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        // var displayName = user.displayName;
        var email = user.email;
        // var emailVerified = user.emailVerified;
        // var photoURL = user.photoURL;
        // var isAnonymous = user.isAnonymous;
        // var uid = user.uid;
        // var providerData = user.providerData;

        console.log(email);
        displayName = user.displayName;
        photoUrl = user.photoURL;
        console.log(displayName, email, photoUrl);
        $("#username").text(email);
        $("#displayname").text(displayName);
        $("#photo").attr("src",photoUrl);


      }
    });

  }


  console.log(page.id);
  if (page.id === 'Home') {
    $('#back').hide();
    page.querySelector('#johnwick').onclick = function () {
      document.querySelector('#myNavigator').pushPage('views/detail.html');

    };
    page.querySelector('#wonderwoman').onclick = function () {
      document.querySelector('#myNavigator').pushPage('views/detail2.html');
    };
    page.querySelector('#toystory').onclick = function () {
      document.querySelector('#myNavigator').pushPage('views/detail3.html');
    };
  } else if (page.id === 'johnwick' || page.id === 'wonderwoman' || page.id === 'toystory') {
    $('#back').show();
    document.querySelector('ons-back-button').onclick = function (event) {
      document.querySelector('#myNavigator').popPage();
    };

  }


});





