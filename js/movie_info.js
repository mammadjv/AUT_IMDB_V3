/**
 * Created by mohammad on 12/6/17.
 */

var movie_id;
var author_id;
var author="";


var faces = {"eye":["eyes1","eyes10","eyes2","eyes3","eyes4","eyes5","eyes6","eyes7","eyes9"],
        "nose":["nose2","nose3","nose4","nose5","nose6","nose7","nose8","nose9"],
        "mouth":["mouth1","mouth10","mouth11","mouth3","mouth5","mouth6","mouth7","mouth9"]
       }


function update_author_details(){
    var url = "../php/author_user_name.php";
    $.get(url).done(function (value){
        if(value != "failure"){
            author = value;
        }
    });
}


function save_comment(){
    if(author == ""){
        alert("cant save your comment, please login");
        return;
    }

    var comment_text = document.getElementById("comment_text").value;
    var comment = comment_text;

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

    var obj = {};
    obj['comment'] = comment;
    obj['movie_id'] = movie_id.toString();
    obj['producer_rate'] = prod_rate.toString();
    obj['actors_rate'] = cast_rate.toString();
    obj['screen_play_rate'] = screen_play_rate.toString();
    obj['created_at'] = datetime.toString();
    obj['author'] = author.toString();

    console.log(document.getElementById("no_idea").checked);
    console.log(document.getElementById("idea").checked);
    console.log(document.getElementById("no_offer").checked);
    //return;

    if(document.getElementById("no_idea").checked == true){
        obj['idea'] = "no_idea";
    }
    else
    if(document.getElementById("idea").checked == true){

        obj['idea'] = "idea";
    }
    else{

        obj['idea'] = "no_offer";
    }
    document.getElementById("no_idea").checked = false;
    document.getElementById("idea").checked = false;
    document.getElementById("no_offer").checked = false;


    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../php/save_comment.php", true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            alert("دیدگاه شما با موفقیت ثبت گردید.");
            document.getElementById("comment_text").value = "";
            add_comment(obj);
        }
    };
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
    //console.log(pure_array)
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

    //if(json['Trailer'] != "nothing"){
        document.getElementById('trailer').setAttribute("src",json['Trailer']);
    //}

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
    update_author_details();
    get_comments();
}

function add_comment(value){

    var rand_num = Math.floor(Math.random() * 9) + 1;
    var url = "https://api.adorable.io/avatars/face/eyes"+rand_num.toString();
    rand_num = Math.floor(Math.random() * 9) + 1;
    url+="/nose"+rand_num;
    rand_num = Math.floor(Math.random() * 9) + 1;
    url+="/mouth"+rand_num+"/8e8895";
    console.log(url);

    var all_comments = document.getElementById("all_comments");

    var comment_tab = document.createElement("div"); comment_tab.className="comment_tab";
    all_comments.appendChild(comment_tab);

    var comments_rate = document.createElement("div"); comments_rate.className = "comments_rates col-md-12";
    comment_tab.appendChild(comments_rate);

    var comment_left_tab = document.createElement("div"); comment_left_tab.className = "col-md-6";
    comments_rate.appendChild(comment_left_tab);

    var text_comment = document.createElement("div");text_comment.className = "text_comment";
    comment_left_tab.appendChild(text_comment);

    var cm_area = document.createElement("textarea"); cm_area.className = "cm_area";cm_area.setAttribute("rows","3");
    cm_area.setAttribute("style","margin-top:20px;padding-left:20px;padding-right:20px");
    cm_area.readOnly = true;
    cm_area.innerHTML = value.comment;


    var down_tab = document.createElement("div"); down_tab.className = "col-md-12";
    text_comment.appendChild(down_tab);
    text_comment.appendChild(cm_area);
    var emoji_selector = document.createElement("article");emoji_selector.className = "emoji_selector";

    var emoji_button  = document.createElement("button"); emoji_button.className = "em em-slightly_smiling_face";
    emoji_selector.appendChild(emoji_button);

    var down_form = document.createElement("form"); down_form.setAttribute("style","float:left");
    down_tab.appendChild(down_form);
    var date_time = document.createElement("article");
    date_time.innerHTML = value.created_at;
    date_time.className = "comment_date_time";


    down_tab.appendChild(date_time);

    if(value.idea == "idea"){
        var offer = document.createElement("label"); offer.className="radio-inline";
        down_form.appendChild(offer);

        var offer_check_box = document.createElement("input");offer_check_box.className = "form-check-label" ;offer_check_box.setAttribute("type","checkbox");offer_check_box.setAttribute("name","radioopt");
        offer.appendChild(offer_check_box);
        offer_check_box.setAttribute("checked","checked");
        offer_check_box.setAttribute("onclick","return false;");
        offer.innerHTML+= " پیشنهاد میکنم";

    }
    else
    if(value.idea == "no_idea"){
        var no_idea = document.createElement("label"); no_idea.className="radio-inline";
        down_form.appendChild(no_idea);

        var no_idea_check_box = document.createElement("input");no_idea_check_box.className = "form-check-label" ;no_idea_check_box.setAttribute("type","checkbox");no_idea_check_box.setAttribute("name","radioopt");
        no_idea.appendChild(no_idea_check_box);
        no_idea_check_box.setAttribute("checked","checked");
        no_idea_check_box.setAttribute("onclick","return false;");
        no_idea.innerHTML += "  پیشنهاد نمیکنم";
    }
    else{
        var no_offer = document.createElement("label"); no_offer.className="radio-inline";
        down_form.appendChild(no_offer);

        var no_offer_check_box = document.createElement("input");no_offer_check_box.className = "form-check-label" ;no_offer_check_box.setAttribute("type","checkbox");no_offer_check_box.setAttribute("name","radioopt");
        no_offer.appendChild(no_offer_check_box);
        no_offer_check_box.checked = true;
        no_offer_check_box.setAttribute("checked","checked");
        no_offer_check_box.setAttribute("onclick","return false;");
        no_offer.innerHTML += " نظری ندارم" ;
    }


    var save_comment = document.createElement("div"); save_comment.className="save_comment";
    comment_left_tab.appendChild(save_comment);

    var save_comment_button = document.createElement("button"); save_comment_button.className="btn btn-default"; save_comment_button.setAttribute("onclick","save_comment()");
    save_comment_button.innerHTML="ثبت دیدگاه";

    var comments_rates_right = document.createElement("div"); comments_rates_right.className = "col-md-6 comment_rates_right";
    comments_rate.appendChild(comments_rates_right);

    var profile_pic = document.createElement("article"); profile_pic.className = "col-lg-3 profile_pic";
    comments_rates_right.appendChild(profile_pic);

    var profile_pic_img = document.createElement("input"); profile_pic_img.setAttribute("type","image");profile_pic_img.setAttribute("src",url);
    profile_pic.appendChild(profile_pic_img);

    var rating_article = document.createElement("article"); rating_article.className = "col-lg-9 rating";
    comments_rates_right.appendChild(rating_article);

    var prod_div = document.createElement("div"); prod_div.className="col-xs-12";
    rating_article.appendChild(prod_div);

    var prod_range = document.createElement("div"); prod_range.className = "range";
    prod_div.appendChild(prod_range);

    var prod_output = document.createElement("output");
    prod_output.innerHTML = "کارگردانی";
    prod_range.appendChild(prod_output);

    var prod_range_state = document.createElement("output");
    prod_range_state.innerHTML = value.producer_rate+ " از 10";
    prod_range.appendChild(prod_range_state);

    var prod_range_slider = document.createElement("input"); prod_range_slider.setAttribute("type","range"); prod_range_slider.setAttribute("name","range");prod_range_slider.setAttribute("min","1");prod_range_slider.setAttribute("max","10");prod_range_slider.setAttribute("value","4");
    prod_range_slider.disabled = true; prod_range_slider.setAttribute('value',value.producer_rate);
    prod_range.appendChild(prod_range_slider);

    var actor_div = document.createElement("div"); actor_div.className="col-xs-12";
    rating_article.appendChild(actor_div);

    var actor_range = document.createElement("div"); actor_range.className = "range";
    actor_div.appendChild(actor_range);

    var actor_output = document.createElement("output");
    actor_output.innerHTML = "بازیگری";
    actor_range.appendChild(actor_output);

    var actor_range_state = document.createElement("output");
    actor_range_state.innerHTML = value.actors_rate+ " از 10";
    actor_range.appendChild(actor_range_state);

    var actor_range_slider = document.createElement("input"); actor_range_slider.setAttribute("type","range"); actor_range_slider.setAttribute("name","range");actor_range_slider.setAttribute("min","1");actor_range_slider.setAttribute("max","10");actor_range_slider.setAttribute("value","4");
    actor_range_slider.disabled = true; actor_range_slider.setAttribute('value',value.actors_rate);
    actor_range.appendChild(actor_range_slider);

    var scrp_div = document.createElement("div"); scrp_div.className="col-xs-12";
    rating_article.appendChild(scrp_div);

    var scrp_range = document.createElement("div"); scrp_range.className = "range";
    scrp_div.appendChild(scrp_range);

    var scrp_output = document.createElement("output");
    scrp_output.innerHTML = "فیلمنامه";
    scrp_range.appendChild(scrp_output);

    var scrp_range_state = document.createElement("output");
    scrp_range_state.innerHTML = value.screen_play_rate+ " از 10";
    scrp_range.appendChild(scrp_range_state);

    var scrp_range_slider = document.createElement("input"); scrp_range_slider.setAttribute("type","range"); scrp_range_slider.setAttribute("name","range");scrp_range_slider.setAttribute("min","1");scrp_range_slider.setAttribute("max","10");scrp_range_slider.setAttribute("value","4");
    scrp_range_slider.disabled = true; scrp_range_slider.setAttribute('value',value.screen_play_rate);
    scrp_range.appendChild(scrp_range_slider);

    var br = document.createElement("br");
    comments_rate.appendChild(br);

}

function get_comments(){
    console.log(movie_id.toString());
    var url = "../php/get_comments.php?id="+movie_id.toString();
    $.get(url,function(value){
        for(var i = 0 ; i < value.length;i++){
            console.log(value[i]);
            add_comment(value[i]);
        }
    });
}
function set_inner(){
    document.getElementById("comment_tab").innerHTML = this.innerHTML;
}

function update_sliders(){
    var prod_range = document.getElementById("prod_range").value;
    var cast_range = document.getElementById("cast_range").value;
    var screen_play_range = document.getElementById("screen_play_range").value;

    document.getElementById("prod_range_state").innerHTML = prod_range+" از 10";
    document.getElementById("cast_range_state").innerHTML = cast_range+" از 10";
    document.getElementById("screen_play_range_state").innerHTML = screen_play_range+" از 10";


}

jQuery(document).ready(function($){

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