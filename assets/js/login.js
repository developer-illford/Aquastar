// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBbNQTeSikk7LY3R8cxkL7QVkUI5qz6UQg",
    authDomain: "aquastar-c65ae.firebaseapp.com",
    databaseURL: "https://aquastar-c65ae-default-rtdb.firebaseio.com",
    projectId: "aquastar-c65ae",
    storageBucket: "aquastar-c65ae.firebasestorage.app",
    messagingSenderId: "152862205802",
    appId: "1:152862205802:web:00f978b582e9bce679a713"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Handle login
document.getElementById('loginBtn').addEventListener('click', function () {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            // Redirect to blog.html
            window.location.href = 'admin.html';
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('Error: ' + errorMessage);
        });
});

// Handle forgot password
document.getElementById('forgotPasswordLink').addEventListener('click', function () {
    var email = document.getElementById('email').value;

    if (email) {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert('Password reset email sent!');
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert('Error: ' + errorMessage);
            });
    } else {
        alert('Please enter your email address.');
    }
});
