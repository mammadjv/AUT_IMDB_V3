function send_auth(){
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

function save_phone_number(){
    var post_url = "../php/update_user_info.php?q=";
    var phone_number = document.getElementById("phone_number").value;

    post_url += "phone_number = \""+phone_number.toString()+"\"";
    $.get(post_url,function(value){
        alert("شماره تلفن شما ثبت شد");
    });
}

function save_whole_user_info(){
    var post_url = "../php/update_user_info.php?q=";
    var phone_number = document.getElementById("phone_number").value;
    var name = document.getElementById("name").value;
    var family_name = document.getElementById("family_name").value;
    var common_name = document.getElementById("common_name").value;
    var email = document.getElementById("email").value;

    post_url += "phone_number = \""+phone_number.toString()+"\"";
    post_url += " ,name = \""+name.toString()+"\"";
    post_url += " ,family_name = \""+family_name.toString()+"\"";
    post_url += " ,common_name = \""+common_name.toString()+"\"";
    post_url += " ,email = \""+email.toString()+"\"";

    $.get(post_url,function(value){
        alert("اطلاعات شما ثبت گردید");
    });
}

function get_user_info(){
    var post_url = "../php/get_user_info.php?q=";
    $.get(post_url,function(value){
        if(value == "failure"){
            return;
        }
        var object = JSON.parse(value);
        console.log(object);
        var email = object.email;
        var family_name = object.family_name;
        var phone_number = object.phone_number;
        var name = object.name;
        var common_name = object.common_name;

        document.getElementById("name").value = name;
        document.getElementById("family_name").value = family_name;
        document.getElementById("common_name").value = common_name;
        document.getElementById("email").value = email;
        document.getElementById("phone_number").value = phone_number;
    });
}

$(document).ready(function(){
    var post_url = "../php/auth.php?q=";
    $.get(post_url,function(value){
        if(value == "true"){
            get_user_info();
        }
        else{
            alert("fuck you!");
        }
    });
});