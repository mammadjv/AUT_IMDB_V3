<?php
    session_start();

    if(!isset($_SESSION["auth"])){
        return;
    }

    $id = $_SESSION["id"];
    $update_values = $_REQUEST["q"];

    $sqlconnection = new mysqli("localhost","root","root","mysql");
    $query = "update aut_imdb_users set ".$update_values." where id = \"".$id."\"";
    $result = $sqlconnection->query($query);
//    $_SESSION["email"] = $email;
    echo "done";
?>