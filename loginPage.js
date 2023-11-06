const loginPopUpButton=document.getElementById("loginPopUpButton");
const loginPopUpForm=document.getElementById('popupForm');
const loginButton=document.getElementById("loginButton");
const signUpButton=document.getElementById("signupButton");
const signupPopupForm=document.querySelector(".signUpPopup")
//Alert pop up
const alertPopUp=document.getElementById("alertPopup");
//taking values from signup form when creating an account
const nameSignUp=document.getElementById("nameSignup").value;
const mobileNumSignUp=document.getElementById("mobileNumSignUp").value;
const mailIdSignUp=document.getElementById("mailIdSignUp").value;
const passwordSignUp=document.getElementById("passwordSignUp").value;

//taking values from login form
const mailIdLogin=document.getElementById("mailIdLogin").value;
const passwordLogin=document.getElementById("passwordLogin").value;
const storeData=[];

//when the login popup button clicked
loginPopUpButton.addEventListener('click',()=>{
   document.querySelector(".backgroundBlur").style.display="block"
   loginPopUpForm.style.display="block";
})
//when login button clicked
loginButton.addEventListener('click',()=>{
    if(mailIdLogin=="" || passwordLogin=="" ){
        alertPopUp.style.display="block";
    }
})
//when signup button clicked
signUpButton.addEventListener('click',()=>{
    if(nameSignUp=="" || mobileNumSignUp=="" || mailIdSignUp=="" || passwordSignUp=="" ){
        alertPopUp.style.display="block";
    }else{
        
    }
})
//to close login/signUp popup
function closeLogin(){
   document.querySelector(".backgroundBlur").style.display="none"
   loginPopUpForm.style.display="none";
}
function closeSignup(){
    document.querySelector(".backgroundBlur").style.display="block"
    loginPopUpForm.style.display="block";
    signupPopupForm.style.display="none";
}
//open login and signup
function openSignUp(){
    document.querySelector(".backgroundBlur").style.display="block"
    loginPopUpForm.style.display="none";
    signupPopupForm.style.display="block";
}

function openLogin(){
    document.querySelector(".backgroundBlur").style.display="block"
    loginPopUpForm.style.display="block";
    signupPopupForm.style.display="none";
}
//close alert form
function closeAlert(){
  alertPopUp.style.display="none";
}
//function to generate unique id
function uniqueId(){
    return Date.now();
}
function acceptData(){
 const UserData={
  id: uniqueId(),
  name:nameSignUp,
  mobile:mobileNumSignUp,
  mailId:mailIdSignUp,
  password:passwordSignUp
 }
 storeData.push(UserData);
 console.log(storeData);
 saveData();

}
//save collected details to local storage
function saveData() {
    localStorage.setItem("data", JSON.stringify(storeData));
}

function showTask() {
    let storedData = localStorage.getItem("data");
    if (storedData) {
      storeData = JSON.parse(storedData);
    }
  }

  showTask();
  
