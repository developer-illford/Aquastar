function logoutUser() {
    const confirmation = confirm("Are you sure you want to log out?");
    if (confirmation) {
        auth.signOut().then(() => {
            // Clear any user session data
            // For example, clear any local storage or session storage
            localStorage.clear(); // You can use sessionStorage.clear() if you're using sessionStorage
            sessionStorage.clear();
            // Redirect to home page after logout
            window.location.href = 'index.html';
        }).catch((error) => {
            console.error(error.message);
        });
    }

}



// In your login.html page (after successful authentication):
var auth = firebase.auth();
auth.onAuthStateChanged(function (user) {
    if (!user) {
        // User is authenticated, allow access to admin.html
        window.location.href = 'login.html';
    }
});


// Add an event listener to the Log Out button
const signoutBtn = document.getElementById("signoutbtn");
signoutBtn.addEventListener("click", logoutUser);

// Check if the user is logged in when the page loads
window.addEventListener("load", checkUserCred);










