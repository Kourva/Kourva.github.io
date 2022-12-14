const password_ele = document.getElementById("pwd_txt");
var string = "ABCDEFGHIJKLMNOPQRSTUVWXYZacdefghijklnopqrstuvwxyz0123456789";
const special_chars = "@#$%^&*";
const generate = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");
var pwd_length = document.getElementById("slider");

generate.addEventListener('click', () => {
    let password = "";
    var checked = document.getElementById("checkbox").checked;
    var final_string = string;
    console.log(checked);
    if (checked) {
        final_string += "@#$%^&*";
    }
    for (var i = 0; i < pwd_length.value; i++) {
        let pwd = final_string[Math.floor(Math.random() * final_string.length)];
        password += pwd;
    }
    password_ele.innerText = "⌬ " + password;
    temp = password;
    final_string = string;
});


clipboard.addEventListener('click', () => {
    navigator.clipboard.writeText(temp);
    alert("⌬ Password copied to clipboard");
});

function clickEffect(e){
    var d=document.createElement("div");
    d.className="clickEffect";
    d.style.top=e.clientY+"px";d.style.left=e.clientX+"px";
    document.body.appendChild(d);
    d.addEventListener('animationend',function(){d.parentElement.removeChild(d);}.bind(this));
}
document.addEventListener('click',clickEffect);
