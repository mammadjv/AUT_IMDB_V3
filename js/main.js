/**
 * Created by mohammad on 11/29/17.
 */



film_ids = ["tt3266284","tt3521126","tt5580390","tt5721088","tt5580036","tt4864624","tt3531176","tt2380307",
    "tt0974015","tt2543472","tt3402236","tt6359956","tt1485796","tt4209788","tt5711148"];

//hottest_films = ["tt5580394","tt5580396", "tt5580396","tt5580386","tt5580384","tt5580380","tt5580376","tt5580372",
//    "tt5580370","tt5590380","tt5590386","tt5592372","tt5592376","tt5594384"];

hottest_films = film_ids;

var json_array = [];
var hottest_json_array=[];

var api_key = "30207f26";


json_array.length = film_ids.length;
hottest_json_array.length = hottest_films.length;

function get_id(img_id){
    var len = img_id.length;
    if(img_id.substring(0,5) == "sitem"){
        console.log(img_id);
        return img_id.toString().substring(5,len);
    }
    return img_id.toString().substring(4,len);
}


function clean_image_info(){
    //return;
    var img_id = get_id(this.id);

    if(this.id.substring(0,5) == 'sitem'){
        document.getElementById("sinfo"+img_id).setAttribute('style','opacity:1;');
        document.getElementById("sd_button_div"+img_id).setAttribute('style','opacity:1;');
        return;
    }
    var title_id = "title"+img_id.toString();
    document.getElementById("img"+img_id).setAttribute('style','filter:brightness(100%)');
    document.getElementById("info"+img_id).setAttribute('style','opacity:0;');
    document.getElementById("d_button_div"+img_id).setAttribute('style','opacity:0;');
}


function show_image_info(){
    console.log(this.id);
    //return;
    var img_id = get_id(this.id);
    if(this.id.substring(0,5) == 'sitem'){
        //document.getElementById("simg"+img_id).setAttribute('style','filter:brightness(20%)');
        document.getElementById("sinfo"+img_id).setAttribute('style','opacity:1;');
        //document.getElementById("sd_button_div"+img_id).setAttribute('style','opacity:1;');
        return;
    }
    //var title_id = "title"+img_id.toString();
    document.getElementById("img"+img_id).setAttribute('style','filter:brightness(20%)');
    document.getElementById("info"+img_id).setAttribute('style','opacity:1;');
    document.getElementById("d_button_div"+img_id).setAttribute('style','opacity:1;');
}

function image_clicked(event){
    if(event.target.tagName == "BUTTON"){
        return;
    }
    var img_id = get_id(this.id);

    var json;
    if(this.id.substring(0,5) == 'sitem'){
        json = hottest_json_array[img_id];
        console.log(json)
    }
    else{
        json = json_array[img_id]
    }
    var destination_url = "../src/movie_info.html"+"?id="+json['imdbID']+"&apikey="+api_key;
    window.location=destination_url;
}

function init_first_carousel(){
    var carousel_div = document.getElementById("owl-demo");
    for (var i = 0 ; i < film_ids.length ; i++){
        var item_div = document.createElement("div");
        item_div.className = "item";
        item_div.id = "item" + i.toString();

        var img_div = document.createElement("img");
        img_div.className = "img_tile";
        img_div.id = "img"+i.toString();

        //item_div.onclick = image_clicked;
        item_div.onmouseover = show_image_info;
        item_div.onmouseout = clean_image_info;

        item_div.appendChild(img_div);

        carousel_div.appendChild(item_div);
    }

    var received_item = 0;

    for (var i = 0 ; i < film_ids.length ; i++) {
        var url = "http://www.omdbapi.com/?i=" + film_ids[i] + "&apikey=" + api_key;
        $.get(url).done(function (object){

            var item_element = document.getElementById("item"+received_item.toString());
            var img_element = document.getElementById("img"+received_item.toString());


            img_element.setAttribute('src',object['Poster']);

            var info_div = document.createElement("div");
            info_div.id = "info"+received_item.toString();

            var film_title = document.createElement("label");
            film_title.className = "col-xs-12";
            film_title.id = "title"+received_item.toString();
            film_title.innerHTML = object['Title'];
            film_title.setAttribute('style','margin-top:20%');

            var br = document.createElement("br");

            var film_year = document.createElement("label");
            film_year.className = "col-xs-12 year";
            film_year.id = "year"+received_item.toString();
            film_year.innerHTML = object['Year'];


            var download_buttons_div = document.createElement("div");
            download_buttons_div.className= "d_button_div";
            download_buttons_div.id= "d_button_div"+received_item.toString();


            for (var  i = 0 ; i < 3 ; i++){
                var d_button = document.createElement("button");
                if(i == 0){
                    d_button.className = "btn btn-default glyphicon glyphicon-download-alt  ";
                    d_button.setAttribute('style','margin-left:3px')
                }
                if(i == 1){
                    d_button.className = "btn btn-default glyphicon glyphicon-film ";
                    d_button.setAttribute('style','margin-left:3px')
                }
                if(i == 2){
                    d_button.className = "btn btn-default glyphicon glyphicon-heart ";
                }
                download_buttons_div.appendChild(d_button);
            }

            info_div.appendChild(film_title);
            info_div.appendChild(film_year);
            info_div.appendChild(download_buttons_div);
            item_element.appendChild(info_div);
            json_array[received_item] = object;
            img_element.id = "img"+received_item.toString();

            received_item++;
        });
    }
}

function init_second_carousel(){

    var carousel_div = document.getElementById("second_owl_demo");

    for (var i = 0 ; i < hottest_films.length ; i++){

        var item_div = document.createElement("div");
        item_div.className = "sitem";
        item_div.id = "sitem" + i.toString();

        var img_div = document.createElement("img");
        img_div.id = "simg"+i.toString();

        item_div.onmouseover = show_image_info;
        item_div.onmouseout = clean_image_info;


        item_div.appendChild(img_div);

        carousel_div.appendChild(item_div);
    }


    var received_item = 0;

    //return;
    for (var i = 0 ; i < hottest_films.length ; i++) {
        var url = "http://www.omdbapi.com/?i=" + hottest_films[i] + "&apikey=" + api_key;
        console.log(url);
        $.get(url).done(function (object){

            var item_element = document.getElementById("sitem"+received_item.toString());

            var img = document.getElementById("simg"+received_item.toString());
            img.setAttribute('src',object['Poster']);
            img.setAttribute('style','position: absolute;left:15%;width: 70%;top:5%;height: 60%;');

            var genres_div = document.createElement("div");
            genres_div.id = "movies_genres"+received_item.toString();
            genres_div.className="movies_genres";

            var genres = object['Genre'].split(',');
            var num_genres = genres.length;

            var width = (96/num_genres).toString()+'%';
            for (var i = 0 ; i < genres.length ; i++){
                var genre_button = document.createElement("label");

                var genre = genres[i];
                genre_button.innerHTML = genre;

                if(i>0){
                    if(num_genres==2 || num_genres==1){
                        genre_button.setAttribute('style','padding:0px 0px;margin-right:2px;font-size:10px;width:'+width.toString());
                    }
                    else{
                        genre_button.setAttribute('style','font-size:7px;margin-right:2px;width:'+width.toString());
                    }
                }
                else{
                    if(num_genres == 2 || num_genres==1){
                        genre_button.setAttribute('style','padding:0px 0px;font-size:10px;width:'+width.toString());
                    }
                    else{
                        genre_button.setAttribute('style','font-size:7px;width:'+width.toString());
                    }

                }
                genres_div.appendChild(genre_button);
            }

            var movie_quality = document.createElement("div");
            movie_quality.id = "movies_quality"+received_item.toString();
            movie_quality.className = "movies_quality";

            var quality = document.createElement("label");
            quality.innerHTML = "BlueRay";
            //quality.className = "col-lg-6"
            movie_quality.appendChild(quality);
            quality.setAttribute('style','margin-left:3%');
            //quality.setAttribute('style','width:48%;padding:0px 0px;font-size:small;background-color:transparent;color:black;');
            //quality.setAttribute('style','font-size:7px;width:50%');

            var rate = document.createElement("label");
            rate.innerHTML = object['imdbRating'];
            movie_quality.appendChild(rate);
            //movie_quality.
            //rate.className = "col-lg-6";
            //rate.setAttribute('style','margin-left:4px;width:48%;padding:0px 0px;font-size:small;background-color:transparent;color:black;');
            //rate.setAttribute('style','font-size:7px;width:'+width.toString());
            item_element.appendChild(genres_div);
            item_element.appendChild(movie_quality);

            var movie_info = document.createElement("div");
            movie_info.id = "sinfo"+received_item.toString();
            movie_info.className="col-lg-12";
            movie_info.setAttribute('style','opacity: 1;top:20%')


            var film_title = document.createElement("label");
            film_title.id = "stitle"+received_item.toString();
            film_title.innerHTML = object['Title'];

            var film_year = document.createElement("label");
            film_year.className = "col-xs-12 year";
            film_year.id = "syear"+received_item.toString();
            film_year.innerHTML = object['Year'];

            var download_buttons_div = document.createElement("div");
            download_buttons_div.className= "row d_button_div";
            download_buttons_div.id= "sd_button_div"+received_item.toString();

            for (var  i = 0 ; i < 3 ; i++){
                var d_button = document.createElement("button");
                if(i == 0){
                    d_button.className = "btn btn-default glyphicon glyphicon-download-alt";
                    d_button.setAttribute('style','margin-left:5px')
                }
                if(i == 1){
                    d_button.className = "btn btn-default glyphicon glyphicon-film";
                    d_button.setAttribute('style','margin-left:5px')
                }
                if(i == 2){
                    d_button.className = "btn btn-default glyphicon glyphicon-heart";
                }
                download_buttons_div.appendChild(d_button);
            }

            movie_info.appendChild(film_title);
            movie_info.appendChild(film_year);
            movie_info.appendChild(download_buttons_div);


            item_element.appendChild(movie_info);

            hottest_json_array[received_item] = object;
            received_item++;
        });
    }
}

function on_logoutclicked(){
    var url = "../php/logout.php?q=";
    $.get(url).done(function (object){
        if(object == "destroyed"){
            window.location = "../src/main.html";
        }
    });
}

$(document).ready(function(){

    //return;
    $.get("../php/auth.php").done(function (object){
        if(object == "true"){
            document.getElementById("user_image").setAttribute('style','visibility:visible');
        }
        else{
            document.getElementById("user_image").setAttribute('style','visibility:hidden');
        }
    });

    init_first_carousel();
    //console.log(json_array.length);

    init_second_carousel();

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
            1200:{
                items:6,
                nav:true,
                loop:false
            }
        }
    });

    $("#second_owl_demo").owlCarousel({
        rtl:true,
        //navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        // singleItem:true,
        autoPlay: true,
        autoPlay: 3000,
        responsiveClass:true,

        // "singleItem:true" is a shortcut for:
        items : (hottest_films.length+1),
        responsive:{
            0:{
                items:1,
                nav:false
            },
            500:{
                items:2,
                nav:false
            },
            600:{
                items:2,
                nav:false
            },
            800:{
                items:4,
                nav:true,
            },
            1200:{
                items:5,
                nav:true,
                loop:false
            }
        }
    });

});