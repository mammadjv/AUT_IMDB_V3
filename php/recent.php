<?php
    header('Content-type: application/json');

    $recent_numbers = $_GET["number"];
    $sqlconnection = new mysqli("localhost","root","root","mysql");

    $query = "select count(*) as total from movies;";

    $result = $sqlconnection->query($query);

    $data= $result->fetch_assoc();

    $recent_ids = (int)$data["total"]-(int)$recent_numbers;

    $query = 'select id from movies WHERE id > ?';

    $stmt = $sqlconnection->prepare($query);
    $stmt->bind_param('i', $recent_ids);
    $stmt->execute();

    $result = $stmt->get_result();
    if($result->num_rows > 0){
        $output = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($output);
    }
//
//    $greater_id = ((int)$data["total"]-(int)$recent_numbers);
//    $query = "select id from movies WHERE id > ".$greater_id;
//
//    $result = $sqlconnection->query($query);
//
//    if($result->num_rows > 0){
//        $output = $result->fetch_all(MYSQLI_ASSOC);
//        echo json_encode($output);
//    }



?>