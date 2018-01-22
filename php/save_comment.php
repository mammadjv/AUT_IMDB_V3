<?php

header('Content-type: application/json');
$json = file_get_contents('php://input');
$json_value = json_decode($json, true);
//$json_value = json_decode($_POST["q"]);
//$json_value = json_decode($_POST["q"],true);
//$json =  $_POST["q"];
//echo $json_value;
$json_encode = json_encode($json_decode);
//echo $json_decode['comment_text'];
//echo $json_encode;
//return;
$comment_text =  $json_value['comment_text'];
$movie_id = $json_value['movie_id'];
//echo $comment_text;
$prod_rate =  $json_value['prod_rate'];
$cast_rate =  $json_value['cast_rate'];
$screen_play_rate =  $json_value['screen_play_rate'];
$date_time =  $json_value['date_time'];
$author = $json_value['author'];

//echo $comment_text;
//return;
$sqlconnection = new mysqli("localhost","root","root","mysql");
$query = "insert into comments(movie_id, created_at, author, comment, producer_rate, actors_rate, screen_play_rate)
VALUES(\"".$movie_id."\", '".$date_time."', \"".$author."\", \"".$comment_text."\", ".$prod_rate.", ".$cast_rate.", ".$screen_play_rate.");";

echo $comment_text;
$result = $sqlconnection->query($query);
//echo $result;


// create table comments(id int NOT NULL AUTO_INCREMENT,movie_id varchar(50), created_at datetime, author varchar(255), comment text,producer_rate int, actors_rate int, screen_play_rage int, PRIMARY KEY(id))
?>