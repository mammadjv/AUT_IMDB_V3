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


function clean_image_info(){
    var img_id = get_id(this.id);
    var title_id = "title"+img_id.toString();
    //console.log(title_id);
    document.getElementById("item"+img_id.toString()).setAttribute('style','filter:brightness(100%);');
    document.getElementById(title_id).setAttribute('style','opacity:0;color:white;filter:brightness(100%);');
    document.getElementById("d_button_div"+img_id.toString()).setAttribute('style','opacity:0;');
    document.getElementById("year"+img_id.toString()).setAttribute('style','opacity:0;');
}


function show_image_info(){
    var img_id = get_id(this.id);
    var title_id = "title"+img_id.toString();

    //console.log(this.id + '   ' + this.target);

    document.getElementById(title_id).setAttribute('style','opacity:1;color:white;filter:brightness(100%);');
    document.getElementById("item"+img_id.toString()).setAttribute('style','filter:brightness(50%);');
    document.getElementById("year"+img_id.toString()).setAttribute('style','opacity:1;color:yellow;margin-top: 10px;');
    document.getElementById("d_button_div"+img_id.toString()).setAttribute('style','opacity:1;');
}

function image_clicked(event){
    if(event.target.tagName == "BUTTON"){
        return;
    }

    img_id = get_id(this.id);
    json = json_array[img_id]
    var destination_url = "../src/movie_info.html"+"?id="+json['imdbID']+"&apikey="+api_key;
    window.location=destination_url;
}
function sag(){

    console.log('khar');

}




$(document).ready(function(){

    var carousel_div = document.getElementById("owl-demo");
    carousel_div.className += " row";
    for (var i = 0 ; i < film_ids.length ; i++){
        var item_div = document.createElement("div");
        item_div.className = "item";
        item_div.id = "item" + i.toString();

        var img_div = document.createElement("div");
        img_div.className = "owl-carousel owl-theme";
        img_div.id = "img"+i.toString();

        img_div.onclick = image_clicked;
        //img_div.on('click',function(e){
        //    if (e.target !== this)
        //        return;
        //    console.log('kharrrrrrr');
        //});
        img_div.onmouseover = show_image_info;
        img_div.onmouseout = clean_image_info;

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
            element.className = "img_tile row";
            element.setAttribute('style','background-image:url('+object['Poster']+')'+';');

            var film_title = document.createElement("label");
            film_title.className = "col-xs-12";
            film_title.id = "title"+received_item.toString();
            film_title.innerHTML = object['Title'];

            var br = document.createElement("br");

            var film_year = document.createElement("label");
            film_year.className = "col-xs-12 year";
            film_year.id = "year"+received_item.toString();
            film_year.innerHTML = object['Year'];


            var download_buttons_div = document.createElement("div");
            download_buttons_div.className= "row d_button_div btn-toolbar";
            download_buttons_div.id= "d_button_div"+received_item.toString();


            for (var  i = 0 ; i < 3 ; i++){
                var d_button = document.createElement("button");
                if(i == 0){
                    d_button.className = "btn btn-default glyphicon glyphicon-download-alt col-xs-4";
                }
                if(i == 1){
                    d_button.className = "btn btn-default glyphicon glyphicon-film col-xs-4";
                }
                if(i == 2){
                    d_button.className = "btn btn-default glyphicon glyphicon-heart col-xs-4";
                }
                download_buttons_div.appendChild(d_button);
            }

            element.appendChild(film_title);
            element.appendChild(film_year);
            element.appendChild(download_buttons_div);
            json_array[received_item] = object;
            element.id = "img"+received_item.toString();

            received_item++;
        });
    }

    console.log(json_array.length);
    $("#owl-demo").owlCarousel({
        rtl:true,
        //navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        // singleItem:true,
        autoPlay: true,
        autoPlay: 3000,
        responsiveClass:true,

        // "singleItem:true" is a shortcut for:
        items : 15,
        responsive:{
            0:{
                items:2,
                nav:false
            },
            600:{
                items:3,
                nav:false
            },
            800:{
                items:4,
                nav:true,
            },
            1000:{
                items:6,
                nav:true,
                loop:false
            }
        }
        // itemsDesktop : false,
        // itemsDesktopSmall : false,
        // itemsTablet: false,
        // itemsMobile : false
    });

});