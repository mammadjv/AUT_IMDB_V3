<?php
    $image = $_FILES["Poster"]["name"];
    echo $image;
    if($_FILES["Poster"]["error"] > 0){
        echo "Error: " . $_FILES["Poster"]["error"] . "<br />";
    }
    else{
        echo "Upload: " . $_FILES["Poster"]["name"] . "<br />";
        echo "Type: " . $_FILES["Poster"]["type"] . "<br />";
        echo "Size: " . ($_FILES["Poster"]["size"] / 1024) . " Kb<br />";
        echo "Temp Store: " . $_FILES["Poster"]["tmp_name"] . "<br />";

        $date = date('Y/m/d H:i:s');

        $query = "insert into movies(Title, created_at, Rated, Year, Runtime, Country, Language, Plot, Director, Writer, imdbVotes, Genre)
                 VALUES ( \"".$_POST["Title"]."\", \"".$date."\", \"".$_POST["Rated"]."\", \"".$_POST["Year"]."\", \"".$_POST["Runtime"]."\", \"".$_POST["Country"].
            "\", \"".$_POST["Language"]."\", \"".$_POST["Plot"]."\", \"".$_POST["Director"]."\", \"".$_POST["Writer"]."\", \"".
            $_POST["imdbVotes"]."\", \"".$_POST["Genre"]."\");";
        echo $query."\n";

        $sqlconnection = new mysqli("localhost","root","root","mysql");

        $sqlconnection->query($query);

        $query = "select count(*) as total from movies;";
        $result = $sqlconnection->query($query);
        $data= $result->fetch_assoc();
        echo $data["total"];

        if(move_uploaded_file($_FILES["Poster"]["tmp_name"],"../upload/".$data["total"].".jpg")){
            echo "Stored in: " . "../upload/".$data["total"].".jpg";
        }

//        create table comments(id int NOT NULL AUTO_INCREMENT,movie_id varchar(50), created_at datetime, author varchar(255), comment text,producer_rate int, actors_rate int, screen_play_rage int, PRIMARY KEY(id))
//        create table comments(id int NOT NULL AUTO_INCREMENT,Title varchar(50), created_at datetime, Rated varchar(50), Year varchar(50),Runtime varchar(50),Country varchar(50), Language varchar(50), Plot varchar(50), Director varchar(50), Writer varchar(50), imdbVotes varchar(50), Genre varchar(50),PRIMARY KEY(id))

    }

?>

