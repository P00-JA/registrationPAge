const logoutButton=document.getElementById("logoutPopUpButton");
logoutButton.addEventListener('click',()=>{
    const conformation=confirm("Are you sure you want to log out?")
    if(conformation){
        window.location.href="http://127.0.0.1:5500/registrationPAge/index.html"
        document.cookie = nameValue[0] +'=; Path=/; Expires=Thu, 25 Feb 2000 00:00:01 GMT;';
       
    }
})
const getCookie=document.cookie;
const nameValue=getCookie.split('=');
if (nameValue[1]===undefined){
    window.location.href = "http://127.0.0.1:5500/registrationPAge/index.html";
}
document.querySelector(".userName").innerHTML=nameValue[1];
