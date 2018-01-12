function login(){

    var email = document.getElementById("id_input").value;
    var pass_input = document.getElementById("pass_input").value;
    var captcha_input = document.getElementById("captcha_input").value;


    var error_msg = "";

    var valid = validateEmail(email);

    if(valid == false){
        error_msg +="ایمیل وارد شده اشتباه است";
        error_msg+="\n";
    }

    if(pass_input == ""){
        error_msg +="رمز عبور خالی است";
        error_msg+="\n";
    }

    if(captcha_input != "google"){
        error_msg+="تصویر امنیتی اشتباه است";
        error_msg+="\n";
    }
    //alert(error_msg);

    if(error_msg != ""){
        return;
    }
    // send to database

    var obj = '{'
        +'"email" : "' + email.toString() + '",'
        +'"password" : "' + pass_input.toString() + '"'
        +'}';

    var post_url = "../php/login.php?q="+obj;
    $.get(post_url,function(value){
        if(value == "success"){
            alert("خوش آمدید");
            var destination_url = "../src/main.html";
            window.location = destination_url;
        }
        else
            alert("اطلاعات وارد شده اشتباه است");
    });
}

function validateEmail(mail){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return (true);
    }
    //alert("You have entered an invalid email address!")
    return (false);
}/**
 * Created by mohammad on 1/12/18.
 */
