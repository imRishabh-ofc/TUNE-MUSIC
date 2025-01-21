// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
    // Get the signup form element
    const signupForm = document.getElementById("signupForm");

    // Show the modal with the message
    function showModal(message) {
        const modal = document.getElementById("modal");
        const modalMessage = document.getElementById("modalMessage");
        modalMessage.innerText = message;
        modal.style.display = "block";  // Show the modal
    }

    // Close the modal when the close button is clicked
    function closeModal() {
        const modal = document.getElementById("modal");
        modal.style.display = "none";  // Hide the modal
    }

    // Add event listener to the signup form
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();  // Prevent the default form submission behavior

        // Get values from the input fields
        const profileName = document.getElementById("profileName").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Check if the fields are empty
        if (!profileName || !username || !password) {
            showModal("All fields are required.");
            return;
        }

        // Prepare the data to send to the server
        const userData = {
            profileName: profileName,
            username: username,
            password: password
        };

        // Make a POST request to the server
        fetch("/signup", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // Show success message and redirect to app.html
                showModal("Signup successful! Redirecting to login page...");
                setTimeout(() => {
                    window.location.href = "login.html";
                }, 2000); // Redirect after 2 seconds
            } else {
                // Show error message if signup failed
                showModal(data.message);
                setTimeout(() => {
                    window.location.href = "signup.html";
                }, 2000); // Redirect after 2 seconds
            }
        })
        .catch((error) => {
            console.error("Error during signup process:", error);
            showModal("An unexpected error occurred. Please try again later.");
            setTimeout(() => {
                window.location.href = "signup.html";
            }, 2000); // Redirect after 2 seconds
        });
    });
});
