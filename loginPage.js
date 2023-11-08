const loginPopUpButton=document.getElementById("loginPopUpButton");
const loginPopUpForm=document.getElementById('popupForm');
const loginButton=document.getElementById("loginButton");
const signUpButton=document.getElementById("signupButton");
const signupPopupForm=document.querySelector(".signUpPopup")
//dashboard
const dashBoard=document.querySelector(".dashboard")

//Alert pop up
const alertPopUp=document.getElementById("alertPopup");
const successAlert=document.getElementById("alertSuccess");
//taking values from signup form when creating an account
const nameSignUp=document.getElementById("nameSignup");
const mobileNumSignUp=document.getElementById("mobileNumSignUp");
const mailIdSignUp=document.getElementById("mailIdSignUp");
const passwordSignUp=document.getElementById("passwordSignUp");

//taking values from login form
const mailIdLogin=document.getElementById("mailIdLogin");
const passwordLogin=document.getElementById("passwordLogin");
let storeUserData=[];

////password encrypt and decrypt
const crypt = {
    // THE SECRET KEY
    secret : "CIPHERKEY",
   
    //ENCRYPT
    encrypt : clear => {
      let cipher = CryptoJS.AES.encrypt(clear, crypt.secret);
      return cipher.toString();
    },
   
    //DECRYPT
    decrypt : cipher => {
      let decipher = CryptoJS.AES.decrypt(cipher, crypt.secret);
      return decipher.toString(CryptoJS.enc.Utf8);
    }
  };
//when the login popup button clicked
loginPopUpButton.addEventListener('click',()=>{
   document.querySelector(".backgroundBlur").style.display="block"
   loginPopUpForm.style.display="block";
})
//validate login
function loginValidate(){
    let testEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(mailIdLogin.value);
    let testPassword=/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm.test(passwordLogin.value);
    if(testEmail && testPassword){
        let userInfo=storeUserData.find((user)=>user.mailId==mailIdLogin.value);
        if (userInfo) {
            // Decrypt the password
            let decryptedPassword = crypt.decrypt(userInfo.password);
            if(!decryptedPassword==passwordLogin.value){
                alert("Incorrect password!")
            }else{
                window.location.href="http://127.0.0.1:5500/registrationPAge/dashBoard.html"
                setCookie('Username',userInfo.name,1);

            }
            
        } else {
            alert("User not found");
        }
    }else{
        alert("Invalid Input!")
    }
}
//set cookie
function setCookie(userName,userValue,expDays){
    const d=new Date();
    d.setTime(d.getTime()+ (expDays*24*60*60*1000));
    let expiry="expires="+d.toUTCString();
    document.cookie=userName+"="+userValue+";"+expiry+";path=/";
}

//when login button clicked
loginButton.addEventListener('click',()=>{
    if(mailIdLogin.value =="" || passwordLogin.value=="" ){
        alertPopUp.style.display="block";
    }else{
         loginValidate();
         resetLogin();
    }
});
//validate signup
function validateForm() { 
    let testName=/^([A-Za-z0-9]){4,20}$/gm.test(nameSignUp.value);
    let testNum=/^\d+$/.test(mobileNumSignUp.value);
    let testEmail=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(mailIdSignUp.value);
    let testPassword=/^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm.test(passwordSignUp.value);
    //const badColor="red";
    if (testName && testNum && testEmail && testPassword) {
        acceptUserData();
        success();
      }else if(!testName){
        nameSignUp.style.border="3px solid red";
        alert("name should have a length of 3-32 .May contain uppercase,lowercase,numerical values,underscores")
      }else if(!testNum){
        mobileNumSignUp.style.border="3px solid red";
        alert("Mobile number should'nt contain non numeric values")
      }else if(!testEmail){
        mailIdSignUp.style.border="3px solid red";
        alert("valid email address follows the format: username@domain.com")
      }else if(!testPassword){
        passwordSignUp.style.border="3px solid red";
        alert("At least of 8 Character passwords & a mix of uppercase letters, lowercase letters, numbers, and symbols.")
      }
      
}
//
//when signup button clicked
signUpButton.addEventListener('click',(e)=>{
    e.preventDefault();
    if(nameSignUp.value=="" || mobileNumSignUp.value=="" || mailIdSignUp.value=="" || passwordSignUp.value=="" ){
        alertPopUp.style.display="block";
    }else{
        validateForm();
    }
})
//to close login/signUp popup
function closeLogin(){
   document.querySelector(".backgroundBlur").style.display="none"
   loginPopUpForm.style.display="none";
   resetLogin();
}
function closeSignup(){
    document.querySelector(".backgroundBlur").style.display="block"
    loginPopUpForm.style.display="block";
    signupPopupForm.style.display="none";
    resetSignUp();
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
  successAlert.style.display="none";
}
//success alert
function success(){
    successAlert.style.display="block";
}
//reset signup form
function resetSignUp(){
    nameSignUp.value='';
    mobileNumSignUp.value='';
    mailIdSignUp.value='';
    passwordSignUp.value=''
}
//rest login form
function resetLogin(){
    mailIdLogin.value='';
    passwordLogin.value='';
}
//function to generate unique id
function uniqueId(){
    return Date.now();
}
function acceptUserData(){
 const UserData={
  id: uniqueId(),
  name:nameSignUp.value,
  mobile:mobileNumSignUp.value,
  mailId:mailIdSignUp.value,
  password:crypt.encrypt(passwordSignUp.value)
 }
    storeUserData.push(UserData);
    saveUserData();
    resetLogin();
    resetSignUp();
    closeSignup();

}
//save collected details to local storage
function saveUserData() {
    localStorage.setItem("data", JSON.stringify(storeUserData));
}

// Retrieve user data from local storage
function showUserData() {
    const userData = JSON.parse(localStorage.getItem("data"));
    if (userData) {
        storeUserData = userData;
    }
}

showUserData();
