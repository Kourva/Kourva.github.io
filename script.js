const password_ele = document.getElementById("pwd_txt");
var string = "ABCDEFGHIJKLMNOPQRSTUVWXYZacdefghijklnopqrstuvwxyz0123456789";
const special_chars = "@#$%^&*";
const generate = document.getElementById("generate");
const clipboard = document.getElementById("clipboard");
var pwd_length = document.getElementById("slider");
const url ="https://randomuser.me/api/";
let avatar = document.getElementById("avatar");
let fullname = document.getElementById("fullname");
let username = document.getElementById("username");
let email = document.getElementById("email");
let city = document.getElementById("city");
let btn = document.getElementById("btn");

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



btn.addEventListener("click", function() {
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(printError)
});

function handleErrors (res){
  if(!res.ok){
    throw error(res.status);
  }
  console.log(res);
  return res;
}

function parseJSON (res){
  return res.json();
}

function updateProfile (profile){
  avatar.src = profile.results[0].picture.medium;
  fullname.innerHTML = "⍥ Fullname: " + profile.results[0].name.first +" "+profile.results[0].name.last; 
  username.innerHTML = "⍥ Username: " + profile.results[0].login.username; 
  email.innerHTML = profile.results[0].email;
  city.innerHTML = profile.results[0].location.city;
  return 1;
}

function printError (error){
  console.log(error);
}
