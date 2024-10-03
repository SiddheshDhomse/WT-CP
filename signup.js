// Firebase initialization (already provided)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";

const firebaseConfig = {

    apiKey: "AIzaSyDohxxobIvvkI1P_f0BDrrwYtPfs8CbvWo",
    authDomain: "login-and-signup-34870.firebaseapp.com",
    projectId: "login-and-signup-34870",
    storageBucket: "login-and-signup-34870.appspot.com",
    messagingSenderId: "464772777824",
    appId: "1:464772777824:web:46a867bb9cbd14da570005",
    measurementId: "G-2J14M7JZE0"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const database = getDatabase();

// Register function
function register() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const confirmPass = document.getElementById('confirm-password').value;

    if (!validateFields(email) || !validateFields(name) || !validateFields(password) || !validateFields(confirmPass)) {
        alert("All fields must be filled out");
        return;
    }

    if (password !== confirmPass) {
        alert("Passwords do not match");
        return;
    }

    if (!validateEmail(email) || !validatePassword(password)) {
        alert("Check Email and Password");
        return;
    }

    // set cookie
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // Set cookie for 1 year
    var expires = "expires=" + d.toUTCString();
    document.cookie = "email=" + email + ";" + expires + ";path=/;SameSite=Strict;Secure";

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            const user = auth.currentUser;
            alert("User Created");

            const database_ref = ref(database, 'users/' + user.uid);

            const user_data = {
                email: email,
                name: name,
                last_login: Date.now()
            };

            
        })
        .catch((error) => {
            const error_code = error.code;
            const error_msg = error.message;
            alert(`Error: ${error_msg}`);
        });

}

function validateEmail(email) {

    const expression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return expression.test(email);

}

function validatePassword(password) {

    return password.length >= 6;

}

function validateFields(field) {
    
    return field != null && field.length > 0;
}


