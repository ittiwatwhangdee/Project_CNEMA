if (page.id === "detail") {
  db.collection("detail").get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      var item = `<ons-carousel-item>
      <div style="text-align: center;">
        <img src="${doc.data().title}" style="width:100%;" onclick="location.href='views/detail.html'">
      </div>
    </ons-carousel-item>`
      var onsItem = document.createElement('ons-carousel-item');
      onsItem.innerHTML = item;
      page.querySelector('#carousel').appendChild(onsItem);
      
    });
  });
}

