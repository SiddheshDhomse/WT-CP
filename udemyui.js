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
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = firebase.storage();
const storageRef = storage.ref();

let currentVideoIndex = 0; // Track the currently watched video index

function unlockVideo(index, path, title, description) {
    if (index === currentVideoIndex + 1) { // Check if the video can be unlocked
        currentVideoIndex = index; // Update the current video index
        const videoRef = storageRef.child(path);
        videoRef.getDownloadURL().then((url) => {
            document.getElementById('video-page').classList.remove('hidden');
            const videoElement = document.getElementById('video');
            videoElement.src = url;
            videoElement.play();
            document.getElementById('video-title').textContent = title;
            document.getElementById('video-description').textContent = description;

            // Unlock the next video if it exists
            if (index < 4) {
                document.getElementById(`video${index + 1}`).classList.remove('opacity-50', 'cursor-not-allowed');
            }
        }).catch((error) => {
            console.error('Error fetching video URL:', error);
        });
    }
}

function hideVideoPage() {
    document.getElementById('video-page').classList.add('hidden');
    const videoElement = document.getElementById('video');
    videoElement.pause();
    videoElement.src = ''; 
}
