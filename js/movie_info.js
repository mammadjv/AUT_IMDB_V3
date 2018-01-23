/**
 * Created by mohammad on 12/6/17.
 */

var movie_id;
var author;

function on_enter() {
    //var key = window.event.keyCode;
    // If the user has pressed enter
    //if (key === 13) {
    //    document.getElementById("comment_text").value = document.getElementById("comment_text").value + "\n";
    //    return false;
    //}
    //else {
    //    return true;
    //}
}


function save_comment(){
    var comment_text = document.getElementById("comment_text").value;
    var comment = comment_text;
    //for(var i = 0; i < comment_text.length;i++){
    //    comment += comment_text[i]+"\r\n";
    //}

    var prod_rate = document.getElementById("prod_range").value;
    var cast_rate =document.getElementById("cast_range").value;
    var screen_play_rate =document.getElementById("screen_play_range").value;

    var currentdate = new Date();
    var datetime = currentdate.getFullYear() + "-"
        + (currentdate.getMonth()+1)  + "-"
        + currentdate.getDay() + "  "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();
    author = "mohsen hosseini";


    var obj = {};
    obj['comment_text'] = comment;
    obj['movie_id'] = movie_id.toString();
    obj['prod_rate'] = prod_rate.toString();
    obj['cast_rate'] = cast_rate.toString();
    obj['screen_play_rate'] = screen_play_rate.toString();
    obj['date_time'] = datetime.toString();
    obj['author'] = author.toString();
    //console.log(obj);

    //var obj = '{'
    //    +'comment_text : ' + comment+ '",'
    //    +'movie_id" : ' + movie_id.toString() + '",'
    //    +'prod_rate" : ' + prod_rate.toString() + '",'
    //    +'cast_rate" : ' + cast_rate.toString() + '",'
    //    +'screen_play_rate" : ' + screen_play_rate.toString() + '",'
    //    +'date_time" : ' + datetime.toString() + '",'
    //    +'author" : ' + author + '"'
    //    +'}';

    //console.log(obj);
    //return;
    //var post_url = "../php/save_comment.php?q="+obj;
    //$.post( post_url, function(value) {
    //    console.log(value);
    //});
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../php/save_comment.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
        }
    };
    console.log(JSON.stringify(obj));
    xhttp.send(JSON.stringify(obj));
}

function get_value(page_data, k) {
    if (page_data.hasOwnProperty(k)) {
        console.log('key is: ' + k + ', value is: ' + page_data[k]);

        value = page_data[k].split("%20");
        full_resp = "";

        for (var i = 0 ; i < value.length; i++){
            full_resp += " " + value[i];
        }
        return full_resp;
    }
}

function getQueryVariable(variable) {
    var variable_array= variable.split('%22');

    // remove abuse values
    var pure_array = [];
    for (var i = 0 ; i < variable_array.length;i++){
        if(variable_array[i]=='{' || variable_array[i]=='}' || variable_array[i]=='},{'||
            variable_array[i]==':[{' || variable_array[i]=='}],' || variable_array[i]==':' || variable_array[i]==','){
            continue;
        }
        pure_array.push(variable_array[i]);
    }
    console.log(pure_array)
    var i = 0;
    var page_data = new Array();
    while( i < pure_array.length ){
        if(pure_array[i] == 'Ratings'){
            i++;
            continue;
        }
        page_data[pure_array[i]] = pure_array[i+1];
        i += 2;
    }
    return page_data;
}



function set_elements_attributes(json){

    document.getElementById("film_name").innerHTML = 'دانلود فیلم '+json['Title'];

    var movies_genres = document.getElementById("movies_genres");
    var genres = json['Genre'];

    var genres = json['Genre'].split(',');
    for (var i = 0 ; i < genres.length ; i++){
        genre = genres[i];
        var genre_button = document.createElement("button");
        genre_button.innerHTML = genre;
        movies_genres.appendChild(genre_button);
    }

    document.getElementById("country").innerHTML = json['Country'];
    document.getElementById("film_description").innerHTML = json['Plot'];
    document.getElementById("film_title").innerHTML = 'دانلود فیلم '+json['Title'] + ' با دوبله فارسی';
    document.getElementById('film_icon').setAttribute('src',json['Poster']);
    document.getElementById('language').innerHTML = json['Language'];
    document.getElementById('year').innerHTML = json['Year'];
    document.getElementById('time').innerHTML = json['Runtime'];
    document.getElementById('rate').innerHTML = json['Rated'];



    var directors = json['Director'].split(',');
    var director_tag = document.getElementById('director');
    director_tag.innerHTML = 'کارگردان : ';
    for(var i  = 0 ; i < directors.length;i++){
        var label = document.createElement("label");
        label.innerHTML = directors[i] + '&nbsp&nbsp';
        director_tag.append(label);
    }

    var writers= json['Writer'].split(',');
    var writers_tag = document.getElementById('writer');
    writers_tag.innerHTML = 'نویسندگان : ';
    for(var i  = 0 ; i < writers.length;i++){
        var label = document.createElement("label");
        label.innerHTML = writers[i] + '&nbsp&nbsp';
        writers_tag.append(label);
    }

    var value = json['imdbRating'];
    var votes = json['imdbVotes'];

    document.getElementById('votes_and_rate').innerHTML = value +'&nbsp '+'از  10 با '  + votes + ' رأی';



    var actors = json['Actors'].split(',');
    var actors_tag = document.getElementById('stars');
    actors_tag.innerHTML = 'بازیگران:  ';
    for(var i  = 0 ; i < actors.length;i++){
        var label = document.createElement("label");
        label.innerHTML = actors[i] + '&nbsp&nbsp';
        actors_tag.append(label);
    }

    get_comments();

}

function get_comments(){
    console.log(movie_id.toString());
    var url = "../php/get_comments.php?id="+movie_id.toString();
    $.get(url,function(value){
        console.log(value);
    });
}
function set_inner(){
    document.getElementById("comment_tab").innerHTML = this.innerHTML;
}

jQuery(document).ready(function($){

    $('#ex1').slider({
        formatter: function(value) {
            return 'Current value: ' + value;
        }
    });

    var passed_value = window.location.search;
    //console.log("salam");

    passed_value = passed_value.substring(1,passed_value.length);
    var values = passed_value.split("&");
    movie_id = values[0].split("=")[1];
    //var key = values[1].split("=")[1];

    var url = "../php/details.php?id="+movie_id;
    $.get(url).done(function (json){
        console.log(json);
        set_elements_attributes(json);
    });

    var atags = document.getElementsByClassName("upper_tab");
    for(var i = 0 ; i < atags.length; i++){
        atag = atags[i];
        atag.id = 'a'+i;
        atag.onclick = set_inner;
    }
});