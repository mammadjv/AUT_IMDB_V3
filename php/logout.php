<?php
//session_unset();
// destroy the session
//session_destroy();
session_start();
unset($_SESSION["auth"]);
unset($_SESSION["email"]);
unset($_SESSION["id"]);
echo "destroyed";
?>