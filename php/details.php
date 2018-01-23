<?php
    header('Content-type: application/json');

    $id = $_GET["id"];

    $sqlconnection = new mysqli("localhost","root","root","mysql");

    $query = 'select * from movies where id = ?';

    $stmt = $sqlconnection->prepare($query);
    $stmt->bind_param('s', $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows>0){
        $output = array();
        $output = $result->fetch_assoc();
        $output["Poster"] = "/page/poster/".$id.".jpg";
        echo json_encode($output);
    }
//    while ($row = $result->fetch_assoc()) {
//         do something with $row
//    }


//    $query = "select * from movies where id = ".$id.";";
//    $result = $sqlconnection->query($query);
//    if($result->num_rows > 0){
//        $output = array();
//        $output = $result->fetch_assoc();
//        $output["Poster"] = "/page/poster/".$id.".jpg";
//        echo json_encode($output);
//    }
?>

