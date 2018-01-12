

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
