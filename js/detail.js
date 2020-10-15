$(function() {

    document.addEventListener('init', function(event) {
        var page = event.target;

        console.log(page.id);
        if (page.id === 'home') {
            page.querySelector('#johnwick').onclick = function() {
                document.querySelector('#carousel').pushPage('views/detail.html');

            };
            page.querySelector('#wonderwoman').onclick = function() {
                document.querySelector('#myNavigator').pushPage('views/detail2.html');
            };
            page.querySelector('#toystory').onclick = function() {
                document.querySelector('#myNavigator').pushPage('views/detail3.html');
            };
        } else if (page.id === 'johnwick' || page.id === 'wonderwoman' || page.id === 'toystory') {
            document.querySelector('ons-back-button').onclick = function(event) {
                document.querySelector('#myNavigator').popPage();
            };

        }



    });
})