// Function to show modal with message
function showModal(title, message) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalMessage").innerText = message;
  document.getElementById("modal").style.display = "block";
  document.getElementById("modalOverlay").style.display = "block";
}

// Function to close modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
}

// Handle login function
function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  // Fetch stored credentials from sessionStorage
  const storedPassword = sessionStorage.getItem(username);
  
  // Check if credentials match
  if (storedPassword && storedPassword === password) {
      showModal("Login Successful", "Welcome to Tune Music! Redirecting you...");
      setTimeout(() => {
          window.location.href = "app.html";
      }, 2000);
  } else {
      showModal("Login Failed", "Incorrect username or password.");
  }
}

// Handle signup function
function handleSignup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const profileName = document.getElementById("profileName").value; // Get profile name

  if (!username || !password || !profileName) {
      showModal("Signup Failed", "Please fill out all fields (Username, Password, Profile Name).");
      return;
  }

  // Check if the username already exists
  if (sessionStorage.getItem(username)) {
      showModal("Signup Failed", "Username already exists. Please choose a different one.");
  } else {
      // Store the username, password, and profile name
      sessionStorage.setItem(username, JSON.stringify({ password: password, profileName: profileName }));
      showModal("Signup Successful", "You can now log in.");
      
      // Hide signup form and buttons, and redirect to app
      document.getElementById("signupForm").style.display = "none";
      document.getElementById("loginBtn").style.display = "none";
      document.getElementById("signupBtn").style.display = "none";

      // Redirect after a delay
      setTimeout(() => {
          window.location.href = "app.html";
      }, 2000);
  }
}

// Show signup form and hide login
function showSignupForm() {
  document.getElementById("loginForm").style.display = "none"; // Hide login form
  document.getElementById("signupForm").style.display = "block"; // Show signup form
  document.getElementById("signupBtn").style.display = "none"; // Hide signup button
  document.getElementById("loginBtn").style.display = "none"; // Hide login button
}

// Display help modal
function handleHelp() {
  showModal("Help", "For any issues, please contact support at support@tunemusic.com.");
}
