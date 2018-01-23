/**
 * Created by mohammad on 11/29/17.
 */






film_ids = range(1,22,1);

hottest_films = film_ids;

var json_array = [];
var hottest_json_array=[];

json_array.length = film_ids.length;
hottest_json_array.length = hottest_films.length;


function search_clicked(){
    var film_title = document.getElementById("search_input").value;
    var url = "../php/search.php?q="+film_title.toString();
    //console.log(film_title);
    $.get(url).done(function (object){
        console.log(object);
        var destination_url = "../src/movie_info.html?id="+object["id"];;
        window.location=destination_url;
    });
}

function get_id(img_id){
    var len = img_id.length;
    if(img_id.substring(0,5) == "sitem"){
        //console.log(img_id);
        return img_id.toString().substring(5,len);
    }
    return img_id.toString().substring(4,len);
}

function range(start, end, step) {
    var range = [];
    var typeofStart = typeof start;
    var typeofEnd = typeof end;

    if (step === 0) {
        throw TypeError("Step cannot be zero.");
    }

    if (typeofStart == "undefined" || typeofEnd == "undefined") {
        throw TypeError("Must pass start and end arguments.");
    } else if (typeofStart != typeofEnd) {
        throw TypeError("Start and end arguments must be of same type.");
    }

    typeof step == "undefined" && (step = 1);

    if (end < start) {
        step = -step;
    }

    if (typeofStart == "number") {

        while (step > 0 ? end >= start : end <= start) {
            range.push(start);
            start += step;
        }

    } else if (typeofStart == "string") {

        if (start.length != 1 || end.length != 1) {
            throw TypeError("Only strings with one character are supported.");
        }

        start = start.charCodeAt(0);
        end = end.charCodeAt(0);

        while (step > 0 ? end >= start : end <= start) {
            range.push(String.fromCharCode(start));
            start += step;
        }

    } else {
        throw TypeError("Only string and number types are supported");
    }

    return range;

}



function clean_image_info(){
    //return;
    var img_id = get_id(this.id);

    if(this.id.substring(0,5) == 'sitem'){
        document.getElementById("sback_div"+img_id).setAttribute('style','filter:brightness(100%)');
        document.getElementById("smovie_info"+img_id).setAttribute('style','opacity:0;');
        document.getElementById("sd_button_div"+img_id).setAttribute('style','opacity:0;');
        return;
    }
    var title_id = "title"+img_id.toString();
    document.getElementById("img"+img_id).setAttribute('style','filter:brightness(100%)');
    document.getElementById("info"+img_id).setAttribute('style','opacity:0;');
    document.getElementById("d_button_div"+img_id).setAttribute('style','opacity:0;');
}


function show_image_info(){
    //console.log(this.id);
    //return;
    var img_id = get_id(this.id);
    if(this.id.substring(0,5) == 'sitem'){
        document.getElementById("sback_div"+img_id).setAttribute('style','filter:brightness(20%)');
        document.getElementById("smovie_info"+img_id).setAttribute('style','opacity:1;');
        document.getElementById("sd_button_div"+img_id).setAttribute('style','opacity:1;');
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
        //console.log(json)
    }
    else{
        json = json_array[img_id]
    }
    var destination_url = "../src/movie_info.html"+"?id="+json['id'];
    window.location=destination_url;
}

function init_first_carousel(){
    //return;
    var carousel_div = document.getElementById("owl-demo");
    for (var i = 0 ; i < film_ids.length ; i++){
        var item_div = document.createElement("div");
        item_div.className = "item";
        item_div.id = "item" + i.toString();

        var img_div = document.createElement("img");
        img_div.className = "img_tile";
        img_div.id = "img"+i.toString();

        item_div.onclick = image_clicked;
        item_div.onmouseover = show_image_info;
        item_div.onmouseout = clean_image_info;

        item_div.appendChild(img_div);

        carousel_div.appendChild(item_div);
    }

    var received_item = 0;

    for (var i = 0 ; i < film_ids.length ; i++) {
        var url = "../php/details.php?id="+film_ids[i].toString();
        $.get(url).done(function (object){
            //console.log(object['Poster']);
            //return;
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
                    d_button.className = "btn btn-default glyphicon glyphicon-download-alt";
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
    //return;
    var s_carousel_div = document.getElementById("second_owl_demo");

    for (var i = 0 ; i < hottest_films.length ; i++){

        var item_div = document.createElement("div");
        item_div.className = "sitem";
        item_div.id = "sitem" + i.toString();
        //
        var back_div = document.createElement("div");
        back_div.className = "back_div";
        back_div.id = "sback_div" + i.toString();

        var movie_info_div = document.createElement("div");
        movie_info_div.className = "row movie_info";
        movie_info_div.id = "smovie_info"+i.toString();

        item_div.appendChild(back_div);
        item_div.appendChild(movie_info_div);

        item_div.onclick = image_clicked;
        item_div.onmouseover = show_image_info;
        item_div.onmouseout= clean_image_info;


        s_carousel_div.appendChild(item_div);
    }

    var received_item = 0;
    //return;
    for (var i = 0 ; i < hottest_films.length ; i++) {
        var url = "../php/details.php?id="+film_ids[i].toString();
        $.get(url).done(function (object){
            //console.log(object);
            //return;
            var sitem_element = document.getElementById("sitem"+received_item.toString());
            var sback_div = document.getElementById("sback_div"+received_item.toString());
            var movie_info_div = document.getElementById("smovie_info"+received_item.toString());

            var simg = document.createElement("input");
            simg.setAttribute('type','image');
            simg.setAttribute('src',object['Poster']);

            sback_div.appendChild(simg);

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
                        genre_button.setAttribute('style','margin-right:2px;font-size:10px;width:'+width.toString());
                    }
                    else{
                        genre_button.setAttribute('style','font-size:7px;margin-right:2px;width:'+width.toString());
                    }
                }
                else{
                    if(num_genres == 2 || num_genres==1){
                        genre_button.setAttribute('style','font-size:10px;width:'+width.toString());
                    }
                    else{
                        genre_button.setAttribute('style','font-size:7px;width:'+width.toString());
                    }

                }
                genres_div.appendChild(genre_button);
            }

            sback_div.appendChild(genres_div);

            var movie_quality = document.createElement("div");
            movie_quality.id = "movies_quality"+received_item.toString();
            movie_quality.className = "movies_quality";

            var quality = document.createElement("label");
            quality.innerHTML = "BlueRay";

            var rate = document.createElement("label");
            rate.innerHTML = object['Rated'];

            movie_quality.appendChild(rate);
            movie_quality.appendChild(quality);

            sback_div.appendChild(movie_quality);

            var film_title = document.createElement("div");
            film_title.id = "stitle"+received_item.toString();
            film_title.className = "col-lg-12";
            film_title.innerHTML = object['Title'];

            movie_info_div.appendChild(film_title);

            var film_year = document.createElement("div");
            film_year.className = "col-xs-12 year";
            film_year.id = "syear"+received_item.toString();
            film_year.innerHTML = object['Year'];

            movie_info_div.appendChild(film_year);


            var download_buttons_div = document.createElement("div");
            download_buttons_div.className= "col-lg-12 d_button_div";
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

            movie_info_div.appendChild(download_buttons_div);

            sitem_element.appendChild(sback_div);
            sitem_element.appendChild(movie_info_div);

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

    $.get("../php/auth.php").done(function (object){
        if(object == "true"){
            document.getElementById("user_image").setAttribute('style','visibility:visible');
        }
        else{
            document.getElementById("user_image").setAttribute('style','visibility:hidden');
        }
    });

    init_first_carousel();

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
            200:{
                items:1,
                nav:false
            },
            400:{
                items:2,
                nav:false
            },
            700:{
                items:3,
                nav:false
            },
            900:{
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