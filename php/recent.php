<?php
    header('Content-type: application/json');

    $recent_numbers = $_GET["number"];
    $sqlconnection = new mysqli("localhost","root","root","mysql");

    $query = "select count(*) as total from movies;";

    $result = $sqlconnection->query($query);

    $data= $result->fetch_assoc();

    $greater_id = ((int)$data["total"]-(int)$recent_numbers);
    $query = "select id from movies WHERE id > ".$greater_id;

    $result = $sqlconnection->query($query);

    if($result->num_rows > 0){
        $output = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($output);
    }
?>