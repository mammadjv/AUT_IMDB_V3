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

        $query = "insert into movies(Title, created_at, Rated, Year, Runtime, Country, Language, Plot, Director, Writer,Actors ,imdbVotes, Genre)
                 VALUES ( \"".$_POST["Title"]."\", \"".$date."\", \"".$_POST["Rated"]."\", \"".$_POST["Year"]."\", \"".$_POST["Runtime"]."\", \"".$_POST["Country"].
            "\", \"".$_POST["Language"]."\", \"".$_POST["Plot"]."\", \"".$_POST["Director"]."\", \"".$_POST["Writer"]."\", \"".
            $_POST["Actors"]."\", \"".$_POST["imdbVotes"]."\", \"".$_POST["Genre"]."\");";
        echo $query."\n";

        $sqlconnection = new mysqli("localhost","root","root","mysql");

        $sqlconnection->query($query);

        $query = "select count(*) as total from movies;";
        $result = $sqlconnection->query($query);
        $data= $result->fetch_assoc();
        echo $data["total"];

        if(move_uploaded_file($_FILES["Poster"]["tmp_name"],"../poster/".($data["total"]).".jpg")){
            echo "Stored in: " . "../poster/".($data["total"]).".jpg";
        }
    }
?>
