// const signUpButton = document.getElementById('signUp');
// const signInButton = document.getElementById('signIn');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
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
const provider = new GoogleAuthProvider();

// Register function
function register() {
    const email = document.getElementById('email-signup').value;
    const name = document.getElementById('name-signup').value;
    const password = document.getElementById('password-signup').value;
    const confirmPass = document.getElementById('confirm-password-signup').value;

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

            set(database_ref, user_data)
            .then(() => {
                window.location.href = "home.html";  // Redirect to home.html after successful registration
            });
        })
        .catch((error) => {
            const error_code = error.code;
            const error_msg = error.message;
            alert(`Error: ${error_msg}`);
        });
}

// Login function
function login() {
    const email = document.getElementById('email-signin').value;
    const password = document.getElementById('password-signin').value;

    if (!validateFields(email) || !validateFields(password)) {
        alert("All fields must be filled out");
        return;
    }
    // set cookie
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // Set cookie for 1 year
    var expires = "expires=" + d.toUTCString();
    document.cookie = "email=" + email + ";" + expires + ";path=/;SameSite=Strict;Secure";

    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            const user = auth.currentUser;
            alert("Logged In");

            const database_ref = ref(database, 'users/' + user.uid);
            const user_data = {
                last_login: Date.now()
            };

            set(database_ref, user_data)
            .then(() => {
                window.location.href = "home.html";  
            });
        })
        .catch((error) => {
            const error_code = error.code;
            const error_msg = error.message;
            alert(`Error: ${error_msg}`);
        });
}

// Google Sign-In function
function googleSignIn() {
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            alert("Google Sign-In Successful");
            
            // set cookie
            var d = new Date();
            d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // Set cookie for 1 year
            var expires = "expires=" + d.toUTCString();
            document.cookie = "email=" + email + ";" + expires + ";path=/;SameSite=Strict;Secure";

            const database_ref = ref(database, 'users/' + user.uid);

            const user_data = {
                email: user.email,
                name: user.displayName,
                last_login: Date.now()
            };

            set(database_ref, user_data)
            .then(() => {
                window.location.href = "home.html";  // Redirect to index.html after successful Google Sign-In
            });

            
        })
        .catch((error) => {
            const error_code = error.code;
            const error_msg = error.message;
            alert(`Error: ${error_msg}`);
        });
}

// Validation functions
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

// Event listeners for buttons
document.getElementById('signUp').addEventListener('click', register);
document.getElementById('signIn').addEventListener('click', login);

// Event listeners for social sign-in
document.querySelector('.google-signup').addEventListener('click', googleSignIn);
document.querySelector('.google-signin').addEventListener('click', googleSignIn);

// Switch between Sign In and Sign Up forms
document.getElementById('switchToSignIn').addEventListener('click', () => {
    document.getElementById('container').classList.remove('right-panel-active');
});

document.getElementById('switchToSignUp').addEventListener('click', () => {
    document.getElementById('container').classList.add('right-panel-active');
});


























