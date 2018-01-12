<?php
    session_start();
    if($_SESSION["auth"] == "true"){
        echo "true";
    }
    else{
        echo "false";
    }

?>