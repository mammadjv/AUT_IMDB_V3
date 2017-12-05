/**
 * Created by mohammad on 11/29/17.
 */

//function loadXMLDoc(){
//    var xhttp = new XMLHttpRequest();
//    xhttp.onreadystatechange = function() {
//        if (this.readyState == 4 && this.status == 200){
//            //document.getElementById("demo").innerHTML = this.responseText;
//            alert('khar!')
//        }
//        else{
//            alert('kir!')
//        }
//    };
//    xhttp.open("GET", "https://www.w3schools.com/xml/ajax_xmlhttprequest_send.asp", true);
//    xhttp.send();
//}

function setImages(){
    var items = document.getElementById("owl-demo").children;
    for(var i = 0; i < items.length; i++){
        imageId = items[i].children[0].id;
        document.getElementById(imageId).setAttribute('src','../img/ny.jpg');
    }
}

$(document).ready(function(){

    film_ids = ["tt3266284","tt3521126","tt5580390","tt5721088","tt5580036","tt4864624","tt3531176","tt2380307",
    "tt0974015","tt2543472","tt3402236","tt6359956","tt1485796","tt4209788","tt5711148"];


    var carousel_div = document.getElementById("owl-demo");
    for (var i = 0 ; i < film_ids.length ; i++){
        var item_div = document.createElement("div");
        item_div.className = "item";
        var img_div = document.createElement("img");
        img_div.id = "img"+i.toString();
        img_div.className = "owl-carousel owl-theme";
        item_div.appendChild(img_div);
        carousel_div.appendChild(item_div);
    }
    var api_key = "30207f26";
    var received_item = 0;
    for (var i = 0 ; i < film_ids.length ; i++) {
        var url = "http://www.omdbapi.com/?i=" + film_ids[i] + "&apikey=" + api_key;
        $.get(url).done(function (object){
            var element = document.getElementById("img"+received_item.toString());
            element.setAttribute('src',object['Poster']);
            received_item++;
        });
    }

    $("#owl-demo").owlCarousel({
        rtl:true,
        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        // singleItem:true,
        autoPlay: true,
        autoPlay: 3000,
        // "singleItem:true" is a shortcut for:
        items : 6,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
    });

});