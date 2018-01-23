<?php

    header('Content-type: application/json');
    $movie_title = $_REQUEST["q"];

    $sqlconnection = new mysqli("localhost","root","root","mysql");
    $query = "select * from movies where Title = \"".$movie_title."\"";
    $result = $sqlconnection->query($query);

    if($result->num_rows > 0){
        $output = array();
        $output = $result->fetch_assoc();
        echo json_encode($output);
    }
    else{
        echo $query;
    }
?>