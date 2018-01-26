<?php

//    header('Content-type: application/json');

    $movie_title = $_REQUEST["q"];

    $sqlconnection = new mysqli("localhost","root","root","mysql");

    $query = 'select * from movies where Title LIKE ?';

    $stmt = $sqlconnection->prepare($query);
    $title = "%".$movie_title."%";
    $stmt->bind_param('s', $title);
    $stmt->execute();
    $result = $stmt->get_result();

    if($result->num_rows > 0){
        $output = array();
        $output = $result->fetch_all(MYSQLI_ASSOC);
        for($i = 0 ; $i < sizeof($output) ; $i++){
            $output[$i]["Poster"] = "/page/poster/".$output[$i]["id"].".jpg";;
        }
        session_start();
        $_SESSION["search_json"] = json_encode($output);
        echo "success";
    }
    else{
        echo "failed";
    }

//    $query = "select * from movies where Title = \"".$movie_title."\"";
//    $result = $sqlconnection->query($query);
//
//    if($result->num_rows > 0){
//        $output = array();
//        $output = $result->fetch_assoc();
//        echo json_encode($output);
//    }
//    else{
//        echo $query;
//    }
?>