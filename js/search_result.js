

var search_json;


function image_clicked(event){
    if(event.target.tagName == "BUTTON"){
        return;
    }
    var img_id = get_id(this.id);

    var json;
    if(this.id.substring(0,5) == 'sitem'){
        json = search_json[img_id];
        //console.log(json)
    }
    else{
        json = search_json[img_id]
    }
    var destination_url = "../src/movie_info.html"+"?id="+json['id'];
    window.location=destination_url;
}



function get_id(img_id){
    var len = img_id.length;
    if(img_id.substring(0,5) == "sitem"){
        //console.log(img_id);
        return img_id.toString().substring(5,len);
    }
    return img_id.toString().substring(4,len);
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



function get_search_json(){
    var url = "../php/get_search_json.php"
    $.get(url).done(function (object){
        if(object == "failed"){
            return;
        }
        search_json = JSON.parse(object);
        console.log(search_json);
        for(var i = 0 ; i <search_json.length; i++){
            add_item(search_json[i],i);
        }
    });
}


function add_item(object,i){
    var received_item = i;

    var result_list = document.getElementById("result_list");

    var li = document.createElement("li");
    result_list.appendChild(li);

    var atag = document.createElement("a");
    li.appendChild(atag);

    var item_div = document.createElement("div");
    item_div.className = "sitem";
    item_div.id = "sitem" + received_item.toString();
    atag.appendChild(item_div);


    item_div.onclick = image_clicked;
    item_div.onmouseover = show_image_info;
    item_div.onmouseout = clean_image_info;
    //
    var back_div = document.createElement("div");
    back_div.className = "back_div";
    back_div.id = "sback_div" + received_item.toString();

    var movie_info_div = document.createElement("div");
    movie_info_div.className = "row movie_info";
    movie_info_div.id = "smovie_info"+received_item.toString();

    item_div.appendChild(back_div);
    item_div.appendChild(movie_info_div);


    var simg = document.createElement("input");
    simg.setAttribute('type','image');
    simg.setAttribute('src',object['Poster']);

    back_div.appendChild(simg);

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
                genre_button.setAttribute('style',';margin-right:2px;font-size:7px;width:'+width.toString());
            }
        }
        else{
            if(num_genres == 2 || num_genres==1){
                genre_button.setAttribute('style','font-size:10px;margin-right:3px;width:'+width.toString());
            }
            else{
                genre_button.setAttribute('style','margin-right:2px;font-size:7px;width:'+width.toString());
            }

        }
        genres_div.appendChild(genre_button);
    }

    back_div.appendChild(genres_div);

    var movie_quality = document.createElement("div");
    movie_quality.id = "movies_quality"+received_item.toString();
    movie_quality.className = "movies_quality";

    var quality = document.createElement("label");
    quality.innerHTML = "BlueRay";

    var rate = document.createElement("label");
    rate.innerHTML = object['Rated'];

    movie_quality.appendChild(rate);
    movie_quality.appendChild(quality);

    back_div.appendChild(movie_quality);

    var film_title = document.createElement("div");
    film_title.setAttribute("style","color:white");
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
            //d_button.setAttribute('style','margin-left:5px')
        }
        if(i == 1){
            d_button.className = "btn btn-default glyphicon glyphicon-film";
            //d_button.setAttribute('style','margin-left:5px')
        }
        if(i == 2){
            d_button.className = "btn btn-default glyphicon glyphicon-heart";
        }
        download_buttons_div.appendChild(d_button);
    }

    movie_info_div.appendChild(download_buttons_div);

    item_div.appendChild(back_div);
    item_div.appendChild(movie_info_div);

}


$(document).ready(function(){

    get_search_json();

});