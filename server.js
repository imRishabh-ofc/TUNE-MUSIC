const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require('dotenv');
const cors = require('cors');  // Import the cors package

dotenv.config();  // Load .env file

const app = express();

// Enable CORS for all routes
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's origin
    credentials: true
}));

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection URI
const dbURI = 'mongodb+srv://tunemusic:tunemusic@tunemusiclogin.pb3aa.mongodb.net/';

// Connect to MongoDB
mongoose.connect(dbURI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.log("Error connecting to MongoDB:", err));

// Define the User Schema
const userSchema = new mongoose.Schema({
    profileName: String,
    username: { type: String, unique: true },
    password: String
});

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

// Session configuration using environment variable
app.use(session({
    secret: process.env.SESSION_SECRET,  // Use the secret from .env file
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false,  // Set true in production with HTTPS
        httpOnly: true,
        sameSite: 'lax'  // Ensure the cookie is sent in the same-origin request
    }
}));

// POST Signup Route (handles signups)
app.post("/signup", async (req, res) => {
    const { profileName, username, password } = req.body;

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.json({ success: false, message: "Username already exists." });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
        profileName,
        username,
        password: hashedPassword
    });

    try {
        // Save the user to the database
        await newUser.save();
        res.json({ success: true, message: "Signup successful!" });
    } catch (err) {
        console.error("Error during signup:", err);
        res.json({ success: false, message: "An error occurred while signing up. Please try again later." });
    }
});

// Login route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user in the database
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare the entered password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Set the user session
        req.session.user = {
            username: user.username,
            profileName: user.profileName, // Store profile name in session
        };

        res.json({ message: "Login successful", profileName: user.profileName });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An unexpected error occurred" });
    }
});

// Profile route to fetch the current user's profile name
app.get("/api/profile", (req, res) => {
    // Check if the session contains a logged-in user
    if (req.session && req.session.user) {
        // Respond with the profile name
        res.json({ profileName: req.session.user.profileName });
    } else {
        // If no user session exists, return unauthorized error
        res.status(401).json({ message: "Unauthorized: No active user session found" });
    }
});

// Serve static files (for the front-end)
app.use(express.static('public'));

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
