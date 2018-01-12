<?php
//session_unset();
// destroy the session
//session_destroy();
session_start();
unset($_SESSION["auth"]);
unset($_SESSION["email"]);
//$_SESSION["email"] = "";
echo "destroyed";
?>