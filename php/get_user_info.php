<?php

session_start();
$id = $_SESSION["id"];
$sqlconnection = new mysqli("localhost","root","root","mysql");
$query = "select * from aut_imdb_users where id=\"".$id."\"";
$result = $sqlconnection->query($query);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $myJson->id = $row["id"];
        $myJson->email = $row["email"];
        $myJson->common_name = $row["common_name"];
        $myJson->phone_number = $row["phone_number"];
        $myJson->family_name = $row["family_name"];
        $myJson->name = $row["name"];
        $json = json_encode($myJson);
        echo $json;
    }
}
else {
    echo "failure";
}
?>