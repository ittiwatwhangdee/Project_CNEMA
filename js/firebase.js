
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
    

    
    $("#search").click(function(){

      $("#search_show").empty();
      $("#sug_show").empty();
      $("#search_show").append("ผลลัพธ์การค้นหา:");
      var search_input = document.getElementById("search_input").value;
      console.log(search_input);

      db.collection("movies").get().then((querySnapshot) => {

        querySnapshot.forEach((doc) => {

          if ( `${doc.data().star}`>4){
            var star = `
            <ons-icon style="color: red" icon="fa-star"></ons-icon>
            <ons-icon style="color: red" icon="fa-star"></ons-icon>
            <ons-icon style="color: red" icon="fa-star"></ons-icon>
            <ons-icon style="color: red" icon="fa-star"></ons-icon>
            <ons-icon style="color: red" icon="fa-star"></ons-icon>
            `
            }else if (`${doc.data().star}`>3){

              var star = `
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              `
            }else if (`${doc.data().star}`>2){

              var star = `
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              `
            }else if (`${doc.data().star}`>1){

              var star = `
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              <ons-icon style="color: red" icon="fa-star"></ons-icon>
              `
            }

          }
        )


      }

    )
  
    })