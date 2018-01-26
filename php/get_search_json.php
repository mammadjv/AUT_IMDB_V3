<?php

//header('Content-type: application/json');

session_start();
if(isset($_SESSION["search_json"])){
    echo $_SESSION["search_json"];
}
else{
    echo "failed";
}
?>