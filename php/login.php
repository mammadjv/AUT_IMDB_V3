<?php

    $json_value = json_decode($_REQUEST["q"]);
    $email = $json_value->email;
    $password = $json_value->password;

    $sqlconnection = new mysqli("localhost","root","root","mysql");
    $query = "select * from aut_imdb_users where email= ? and password= ?";

    $stmt = $sqlconnection->prepare($query);
    $stmt->bind_param('ss', $email,$password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0){
        session_start();
        $row = $result->fetch_assoc();
        $_SESSION["email"] = $email;
        $_SESSION["auth"] = "true";
        $_SESSION["id"] = $row["id"];
        $_SESSION["username"] = $row["name"]." ".$row["family_name"];
        echo "success";
    }
    else {
        echo "failure";
    }

//$query = "select * from aut_imdb_users where email=\"".$email."\" and password=\"".$password."\"";
//$result = $sqlconnection->query($query);
//
//if ($result->num_rows > 0){
//    session_start();
//    $row = $result->fetch_assoc();
//    $_SESSION["email"] = $email;
//    $_SESSION["auth"] = "true";
//    $_SESSION["id"] = $row["id"];
//    $_SESSION["username"] = $row["name"]." ".$row["family_name"];
//    echo "success";
//}
//else {
//    echo "failure";
//}
?>