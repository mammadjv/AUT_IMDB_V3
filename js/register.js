function send_auth(){

    var email = document.getElementById("id_input").value;
    var pass_input = document.getElementById("pass_input").value;
    var pass_repeat_input = document.getElementById("pass_repeat_input").value;
    var invitation_input = document.getElementById("invitation_input").value;
    var captcha_input = document.getElementById("captcha_input").value;
    var rules = document.getElementById("save_info").checked;


    var error_msg = "";
    if(rules == false){
        error_msg +="لطفا قوانین را مطالعه فرمایید";
        error_msg+="\n";
    }

    var valid = validateEmail(email);

    if(valid == false){
        error_msg +="ایمیل وارد شده اشتباه است";
        error_msg+="\n";
    }
    if(pass_input == "" || pass_repeat_input == ""){
        error_msg +="رمز عبور خالی است";
        error_msg+="\n";
    }
    else if(pass_input != pass_repeat_input){
        error_msg +="تکرار رمز عبور با رمز عبور مطابقت ندارد";
        error_msg+="\n";
    }
    if(invitation_input != "1234"){
        error_msg+="کد دعوت اشتباه است";
        error_msg+="\n";
    }
    if(captcha_input != "google"){
        error_msg+="تصویر امنیتی اشتباه است";
        error_msg+="\n";
    }
    alert(error_msg);

    if(error_msg != ""){
        return;
    }
    // send to database

    var obj = '{'
        +'"email" : "' + email.toString() + '",'
        +'"password" : "' + pass_input.toString() + '"'
        +'}';

    //alert(obj);
    var post_url = "../php/user_register.php?q="+obj;
    $.get(post_url,function(value){
        alert(value);
        if(value == "user exists"){
            alert("شما قبلا ثبت نام کرده اید");
        }
        else
            alert("به وب سایت ما خوش آمدید");
    });
}

function validateEmail(mail){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
        return (true);
    }
    //alert("You have entered an invalid email address!")
    return (false);
}