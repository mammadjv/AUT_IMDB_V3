/**
 * Created by mohammad on 12/6/17.
 */

function set_elements_attributes(json){

    document.getElementById("film_name").innerHTML = 'دانلود فیلم '+json['Title'];

    movies_genres = document.getElementById("movies_genres");
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
    document.getElementById('director').innerHTML = 'کارگردان:  '+json['Director'];
    document.getElementById('writer').innerHTML = 'نویسندگان:  '+json['Writer'];



    var value = json['imdbRating'];
    var votes = json['imdbVotes'];

    document.getElementById('votes_and_rate').innerHTML = value +'&nbsp '+'از  10 با '  + votes + 'رأی';


    var actors = json['Actors'].split(',');
    document.getElementById('stars').innerHTML = 'بازیگران:  ';
    for(var i  = 0 ; i < actors.length;i++){
        document.getElementById('stars').innerHTML+= actors[i] + '&nbsp&nbsp';
    }
}

$(document).ready(function(){
    var passed_value = window.location.search;
    passed_value = passed_value.substring(1,passed_value.length);
    //console.log(passed_value)
    passed_value = decodeURIComponent(passed_value);


    console.log(passed_value);
    json = JSON.parse(passed_value);
    set_elements_attributes(json);
});
