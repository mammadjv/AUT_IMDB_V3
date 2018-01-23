<?php

header('Content-type: application/json');

$movie_id = $_REQUEST["id"];

$sqlconnection = new mysqli("localhost","root","root","mysql");

$query = "select * from comments where movie_id = ?";

$stmt = $sqlconnection->prepare($query);
$stmt->bind_param('s', $movie_id);
$stmt->execute();
$result = $stmt->get_result();

//echo $query;
if ($result->num_rows > 0){
    $output = array();
    $output = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($output);
}
else {
    echo "failure";
}



//$query = "select * from comments where movie_id = \"".$movie_id."\"";
//
//$result = $sqlconnection->query($query);
//
////echo $query;
//if ($result->num_rows > 0){
//    $output = array();
//    $output = $result->fetch_all(MYSQLI_ASSOC);
//    echo json_encode($output);
//}
//else {
//    echo "failure";
//}


// create table comments(id int NOT NULL AUTO_INCREMENT,movie_id varchar(50), created_at datetime, author varchar(255), comment text,producer_rate int, actors_rate int, screen_play_rage int, PRIMARY KEY(id))
?>