//======= firebase
const database = firebase.database(); 
const ref = database.ref('users');

//======= input variables
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#pass');
const confirmPasswordInput = document.querySelector('#repass');
const createdPasswordInput = document.querySelector('#createdPass');
const createdLoginInput = document.querySelector('#createdLogin');

//======== validation variables
const errorElement = document.getElementById('error');
const emailValidationVar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const form = document.getElementById("registerForm");

const dataObject = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
};
//==============================


document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
})

function formValidate(){
    let messages = []
    if (nameInput.value === '' || nameInput.value == null) {
        messages.push('Name is required')
    }
    if (passwordInput.value.length <= 6) {
        messages.push('Password must be longer than 6 characters')
    }
    if (passwordInput.value.length >= 20) {
        messages.push('Password must be less than 20 characters')
    }
    if(emailValidationVar.test(emailInput.value)==false){
        messages.push('Incorrect email format')
    }
    if (confirmPasswordInput.value !== passwordInput.value) {
        messages.push('Passwords must match!')
    }    
    if (messages.length > 0) {
        errorElement.innerText = messages.join(', ')
        errorElement.style.backgroundColor = "#fb8989";
        return false;
    }else{
        createAccount()
        return true;
    }
}

function createAccount() {
    dataObject.name = nameInput.value;
    dataObject.email = emailInput.value;
    dataObject.password = passwordInput.value;
    dataObject.confirmPassword = confirmPasswordInput.value;
    ref.push(dataObject);
    alert("Congratulations, you have created an account!");
}

function logIn(data) {
    let users = data.val();
    let keys = Object.keys(users);
    for (let i = 0; i < keys.length; i++) {
        let k = keys[i];
        let name = users[k].name;
        let password = users[k].password;        
        let email = users[k].email;
        if (createdPasswordInput.value === password
            && (createdLoginInput.value === name || createdLoginInput.value === email)) {
            alert("You are now Signed In!")
        }
        else {
            alert("Wrong Password or Login credentials!")
        }
    }
}

function errData(err) {
    console.log("Error!");
    console.log(err)
}