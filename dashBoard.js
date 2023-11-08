const logoutButton=document.getElementById("logoutPopUpButton");
logoutButton.addEventListener('click',()=>{
    const conformation=confirm("Are you sure you want to log out?")
    if(conformation){
        window.location.href="/registrationPAge/index.html"
        document.cookie = nameValue[0] +'=; Path=/; Expires=Thu, 25 Feb 2000 00:00:01 GMT;';
       
    }
})
const getCookie=document.cookie;
// Split the cookies into key-value pairs
const nameValue=getCookie.split('=');
// Check if the user is not logged in (no nameValue[1]);
if (!nameValue[1]){
    window.location.href = "/registrationPAge/index.html";
}
document.querySelector(".userName").innerHTML=nameValue[1];
