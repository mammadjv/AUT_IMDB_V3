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
$comment_text =  $json_value['comment'];
$movie_id = $json_value['movie_id'];
$prod_rate =  $json_value['producer_rate'];
$cast_rate =  $json_value['actors_rate'];
$screen_play_rate =  $json_value['screen_play_rate'];
$date_time =  $json_value['created_at'];
$author = $json_value['author'];
$idea = $json_value['idea'];

//echo $comment_text;
//return;
$sqlconnection = new mysqli("localhost","root","root","mysql");

$query = "insert into comments(movie_id, created_at, author, comment, idea,producer_rate, actors_rate, screen_play_rate) VALUES(?,?,?,?,?,?,?,?);";

$stmt = $sqlconnection->prepare($query);
$stmt->bind_param('ssssssss', $movie_id,$date_time,$author,$comment_text,$idea,$prod_rate,$cast_rate,$screen_play_rate);
$stmt->execute();
$result = $stmt->get_result();
echo json_encode($json_value);

//$query = "insert into comments(movie_id, created_at, author, comment, producer_rate, actors_rate, screen_play_rate)
//VALUES(\"".$movie_id."\", '".$date_time."', \"".$author."\", \"".$comment_text."\", ".$prod_rate.", ".$cast_rate.", ".$screen_play_rate.");";
//
//echo $comment_text;
//$result = $sqlconnection->query($query);
//echo $result;


// create table comments(id int NOT NULL AUTO_INCREMENT,movie_id varchar(50), created_at datetime, author varchar(255), comment text,producer_rate int, actors_rate int, screen_play_rage int, PRIMARY KEY(id))
?>