<?php
    header('Content-type: application/json');

    $id = $_GET["id"];
    $sqlconnection = new mysqli("localhost","root","root","mysql");
    $query = "select * from movies where id = ".$id.";";
    $result = $sqlconnection->query($query);
    if($result->num_rows > 0){
        $output = array();
        $output = $result->fetch_assoc();
        $output["Poster"] = "/page/poster/".$id.".jpg";
        echo json_encode($output);
    }
?>

