/**
 * Created by mohammad on 11/29/17.
 */


film_ids = ["tt3266284","tt3521126","tt5580390","tt5721088","tt5580036","tt4864624","tt3531176","tt2380307",
    "tt0974015","tt2543472","tt3402236","tt6359956","tt1485796","tt4209788","tt5711148"];
var json_array = [];

json_array.length = film_ids.length;
function image_clicked(){

}

function image_mouse_hover(){
    var img_id = this.id.toString();
    img_index = img_id.substring(3,img_id.length);
    json_data = json_array[img_index];
    var title = json_data['Title'];

}


function image_mouse_out(){

}


$(document).ready(function(){

    var carousel_div = document.getElementById("owl-demo");
    for (var i = 0 ; i < film_ids.length ; i++){
        var item_div = document.createElement("div");
        item_div.className = "item";

        var img_div = document.createElement("img");
        img_div.className = "owl-carousel owl-theme";
        img_div.id = "img"+i.toString();

        var ptag = document.createElement("div");
        ptag.id = "p"+i.toString();

        var h1 = document.createElement("h1");
        h1.id = "h"+i.toString();

        // add events
        img_div.onclick = image_clicked;
        img_div.onmouseover = image_mouse_hover;
        img_div.onmouseout = image_mouse_out;

        item_div.appendChild(img_div);
        item_div.appendChild(ptag);
        ptag.appendChild(h1);

        carousel_div.appendChild(item_div);
    }
    var api_key = "30207f26";
    var received_item = 0;

    for (var i = 0 ; i < film_ids.length ; i++) {
        var url = "http://www.omdbapi.com/?i=" + film_ids[i] + "&apikey=" + api_key;
        $.get(url).done(function (object){

            console.log(object);
            var element = document.getElementById("img"+received_item.toString());

            element.setAttribute('src',object['Poster']);
            //element.setAttribute('style','background:url('+object['Poster']+')'+';background-size: cover; background-repeat:no-repeat; background-position:center');

            var h1 = document.getElementById("h"+received_item.toString());
            //ptag.innerHTML = "SALAM"

            json_array[received_item] = object;

            h1.innerHTML = "khar";

            element.id = "img"+received_item.toString();
            ptag.id = "p"+received_item.toString();

            received_item++;
        });
    }

    console.log(json_array.length);
    $("#owl-demo").owlCarousel({
        rtl:true,
        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        // singleItem:true,
        autoPlay: true,
        autoPlay: 3000,
        // "singleItem:true" is a shortcut for:
        items : 4,
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
    });

});