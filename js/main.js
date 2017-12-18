/**
 * Created by mohammad on 11/29/17.
 */



film_ids = ["tt3266284","tt3521126","tt5580390","tt5721088","tt5580036","tt4864624","tt3531176","tt2380307",
    "tt0974015","tt2543472","tt3402236","tt6359956","tt1485796","tt4209788","tt5711148"];
var json_array = [];
var api_key = "30207f26";

json_array.length = film_ids.length;

function get_id(img_id){
    var len = img_id.length;
    return img_id.toString().substring(3,len);
}


function image_clicked(){
    img_id = get_id(this.id);
    //console.log(img_id);
    //json = JSON.stringify(json_array[img_id]);
    //json.toString()
    json = json_array[img_id]
    var destination_url = "../src/movie_info.html"+"?id="+json['imdbID']+"&apikey="+api_key;
    window.location=destination_url;
}

function image_mouse_hover(){
    //var title = json_data['Title'];
    //console.log(window.location);
    //console.log($(this).val());
}


function image_mouse_out(){

}


$(document).ready(function(){

    var carousel_div = document.getElementById("owl-demo");
    for (var i = 0 ; i < film_ids.length ; i++){
        var item_div = document.createElement("div");
        item_div.className = "item";
        item_div.id = "item" + i.toString();

        var img_div = document.createElement("div");
        img_div.className = "owl-carousel owl-theme";
        img_div.id = "img"+i.toString();

        //var img_text = document.createElement("button");
        //img_text.className = "centered";
        //img_text.innerHTML = "khar";

        //var ptag = document.createElement("div");
        //ptag.id = "p"+i.toString();

        //var h1 = document.createElement("h1");
        //h1.id = "h"+i.toString();

        // add events
        img_div.onclick = image_clicked;

        item_div.appendChild(img_div);
        //item_div.appendChild(img_text);
        //ptag.appendChild(h1);

        carousel_div.appendChild(item_div);
    }

    var received_item = 0;

    for (var i = 0 ; i < film_ids.length ; i++) {
        var url = "http://www.omdbapi.com/?i=" + film_ids[i] + "&apikey=" + api_key;
        $.get(url).done(function (object){

            console.log(object);
            var element = document.getElementById("img"+received_item.toString());
            element.setAttribute('style','background-image:url('+object['Poster']+')'+';');
            //element.setAttribute('src',object['Poster']);
            //element.setAttribute('background','url(\''+object['Poster']+'\') repeat') ;
            //var selected_item = document.getElementById("item"+received_item.toString());
            //var p_tag = document.createElement("div");
            //p_tag.innerHTML = "khar";
            //p_tag.setAttribute('style','width:100px;height:100px');

            //selected_item.appendChild(p_tag);



            //var h1 = document.getElementById("h"+received_item.toString());
            //ptag.innerHTML = "SALAM"

            json_array[received_item] = object;

            //h1.innerHTML = "khar";

            element.id = "img"+received_item.toString();
            //ptag.id = "p"+received_item.toString();

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