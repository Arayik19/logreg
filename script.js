//======= firebase
const database = firebase.database();
const ref = database.ref('users');
//======== validation variables
const errorElement = document.getElementById('error');
const emailValidationVar = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const form = document.getElementById("registerForm");

class Login {
    constructor(name, pass) {
        this.name = name;
        this.pass = pass;
    }
}
class Register extends Login {
    constructor(name, pass, email) {
        super(name, pass);
        this.email = email;
    }
}

const login = new Login(document.querySelector('#name'),
    document.querySelector('#pass'));

const register = new Register(document.querySelector('#name'),
    document.querySelector('#pass'),
    document.querySelector('#email'));
//==============================

function formValidate(data) {
    let messages = []
    if (register.name.value === '' || register.name.value == null) {
        messages.push('Name is required')
    }
    if (register.pass.value.length <= 6) {
        messages.push('Password must be longer than 6 characters')
    }
    if (register.pass.value.length >= 20) {
        messages.push('Password must be less than 20 characters')
    }
    if (emailValidationVar.test(register.email.value) == false) {
        messages.push('Incorrect email format')
    }
    const users = Object.values(Object.assign([], data.val()));
    const index = users.findIndex(x => (x.name === register.name.value || x.email === register.email.value))
    if (index !== -1) {
        messages.push('Email or Username already exists!')
    }
    if (document.getElementById("repass").value !== register.pass.value) {
        messages.push('Passwords must match!')
    }
    if (messages.length > 0) {
        errorElement.innerText = messages.join(', ')
        errorElement.style.backgroundColor = "#fb8989";
    } else {
        createAccount()        
        location.replace("login.html")
    }
}

function createAccount() {
    register.name = register.name.value;
    register.pass = register.pass.value;
    register.email = register.email.value;    
    ref.push(register);
    alert("Congratulations, you have created an account!");
}

function logIn(data) {
    const users = Object.values(Object.assign([], data.val()));
    const index = users.findIndex(x => (x.name === login.name.value || x.email === login.name.value)
        && x.pass === login.pass.value);
    if (index !== -1) {
        alert("You are now Signed In!")
    }
    else {
        alert("Wrong Password or Login credentials!")
    }
}
function errData(err) {
    console.log("Error!");
    console.log(err)
}