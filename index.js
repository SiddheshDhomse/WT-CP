import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

// Firebase configuration
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
const auth = getAuth(app);

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert('Sign in successful');
            // Redirect to home.html
            window.location.href = 'home.html';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorMessage}`);
        });


        // set cookie
        var d = new Date();
        d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000)); // Set cookie for 1 year
        var expires = "expires=" + d.toUTCString();
        document.cookie = "email=" + email + ";" + expires + ";path=/";
        
}

// Attach the login function to form submit
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        login(); // Call the login function
    });
});


