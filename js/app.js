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


  //home
  $(function () {
    if (page.id === "home") {
      db.collection("movies").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          var item = `
        <ons-carousel-item style="text-align: center;" id="${doc.data().title}" onclick="moviesDetail(this.id)"> 
        <img src="${doc.data().posterURL}" style="width:100%;">
        </ons-carousel-item>`
          var onsItem = document.createElement('ons-carousel-item');
          onsItem.innerHTML = item;
          page.querySelector('#carousel').appendChild(onsItem);


        });
      });
    }

  })

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
        $("#photo").attr("src", photoUrl);


      }
    });

  }
});



function moviesDetail(id) {
  db.collection("movies").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {

      if (doc.data().rating == 5) {
        var star = ` 
         <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: black" icon="fa-star"></ons-icon>
          `

      } else if (doc.data().rating == 4) {
        var star = ` 
         <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: gray" icon="fa-star"></ons-icon>`

      } else if (doc.data().rating == 3) {
        var star = ` 
         <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: gray" icon="fa-star"></ons-icon>
          <ons-icon style="color: gray" icon="fa-star"></ons-icon>`

      } else if (doc.data().rating == 2) {
        var star = ` 
         <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: gray" icon="fa-star"></ons-icon>
          <ons-icon style="color: gray" icon="fa-star"></ons-icon>
          <ons-icon style="color: gray" icon="fa-star"></ons-icon>`

      } else if (doc.data().rating == 1) {
        var star = ` 
         <ons-icon style="color: black" icon="fa-star"></ons-icon>
          <ons-icon style="color: gray" icon="fa-star"></ons-icon>
          <ons-icon style="color: gray" icon="fa-star"></ons-icon>
          <ons-icon style="color: gray" icon="fa-star"></ons-icon>
          <ons-icon style="color: gray" icon="fa-star"></ons-icon>`

      }


      if (doc.data().title == id) {
        const result = `
            <div class="text-center">
              <div class="trailer">
              <video id="my-video" class="video-js" controls preload="auto" autoplay preload="auto" style="width: 100%;height: auto;"
              data-setup="{}" muted>
              <source src="${doc.data().vdo}" type="video/mp4" />
              </div>
              <br>
              <div class="movie_info">
              <h1>${doc.data().title} (${doc.data().year})</h1>
              <ons-row class="movie_general_info">
              <ons-col class="stars">
              <div class="col-4" style="padding-right :10px;">`+ star + `</div>
              </ons-col>
              <ons-col>${doc.data().type}   l    ${doc.data().time}</ons-col>
              </ons-row>
              <div class="movie_synopsis">${doc.data().shortstory}</div>
        <div class="movie_cast">
        Cast: ${doc.data().cast} <br />
        Director: ${doc.data().director}
        </div>
    </div>
    <br><br><br>
    <div class="movie_list">
        Similar Movies
        <ons-carousel auto-refresh swipeable overscrollable item-width="110px">
            <ons-carousel-item modifier="nodivider">
                <img src="assets/img/Avatar2.jpg">
            </ons-carousel-item>
            <ons-carousel-item modifier="nodivider">
                <img src="assets/img/Fast8.jpg">
            </ons-carousel-item>
            <ons-carousel-item modifier="nodivider">
                <img src="assets/img/The witcher.jpg">
            </ons-carousel-item>
            <ons-carousel-item modifier="nodivider">
                <img src="assets/img/aquaman.jpg">
            </ons-carousel-item>
            <ons-carousel-item modifier="nodivider">
                <img src="assets/img/Extraction.jpg">
            </ons-carousel-item>
        </ons-carousel>
    </div>  `
    
        $("#moviedetail").append(result)
      }

    });
  });
  document.querySelector('#myNavigator').pushPage('views/moviedetail.html');
}

document.addEventListener('init', function (event) {
  var page = event.target;

  if (page.id === 'page1') {
    page.querySelector('#push-button').onclick = function () {
      document.querySelector('#myNavigator').pushPage('index.html', { data: { title: 'Page 2' } });
    };
  } else if (page.id === 'page2') {
    page.querySelector('ons-toolbar .center').innerHTML = page.data.title;
  }
});


