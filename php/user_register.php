<?php
    $json_value = json_decode($_REQUEST["q"]);
    $email = $json_value->email;
    $password = $json_value->password;
//    echo $email.$password
    $sqlconnection = new mysqli("localhost","root","root","mysql");
    $query = "select * from aut_imdb_users where email=\"".$email."\"";
    $result = $sqlconnection->query($query);

    if ($result->num_rows > 0) {
        echo "user exists";
    } else {
        $query = "insert into aut_imdb_users(email,password) VALUES(\"".$email."\" , \"".$password."\");";
        $result = $sqlconnection->query($query);
        echo "welcome";
    }
//create table aut_imdb_users(id int NOT NULL AUTO_INCREMENT,name varchar(255), family_name varchar(255),common_name varchar(255), email varchar(255), phone_number varchar(255),password varchar(255), PRIMARY KEY(id))
?>

