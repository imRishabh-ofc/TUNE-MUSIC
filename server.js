const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables from .env file

const app = express();

// CORS configuration
const allowedOrigins = [
    'http://localhost:3000', // Local development
    'https://tune-music.onrender.com' // Production URL on Render
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests without an origin (like mobile or Postman)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Allow cookies and credentials
}));

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection URI
const dbURI = process.env.MONGO_URI || 'mongodb+srv://tunemusic:tunemusic@tunemusiclogin.pb3aa.mongodb.net/';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Error connecting to MongoDB:", err));

// Define the User Schema
const userSchema = new mongoose.Schema({
    profileName: String,
    username: { type: String, unique: true },
    password: String
});

// Create the User model based on the schema
const User = mongoose.model("User", userSchema);

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'defaultSecret', // Use environment variable for production
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true in production with HTTPS
        httpOnly: true,
        sameSite: 'lax' // Prevent CSRF attacks
    }
}));

// POST Signup Route
app.post("/signup", async (req, res) => {
    const { profileName, username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.json({ success: false, message: "Username already exists." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ profileName, username, password: hashedPassword });

        await newUser.save();
        res.json({ success: true, message: "Signup successful!" });
    } catch (err) {
        console.error("Error during signup:", err);
        res.status(500).json({ success: false, message: "An error occurred during signup." });
    }
});

// POST Login Route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        req.session.user = { username: user.username, profileName: user.profileName };
        res.json({ message: "Login successful", profileName: user.profileName });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: `Unexpected error: ${error.message}` });
    }
});

// GET Profile Route
app.get("/api/profile", (req, res) => {
    if (req.session && req.session.user) {
        res.json({ profileName: req.session.user.profileName });
    } else {
        res.status(401).json({ message: "Unauthorized: No active user session found" });
    }
});

// Test database connection route (for debugging)
app.get("/test-db", async (req, res) => {
    try {
        const users = await User.find();
        res.json({ success: true, users });
    } catch (err) {
        console.error("Database connection test failed:", err);
        res.status(500).json({ success: false, message: "Database connection failed" });
    }
});

// Serve static files (for the front-end)
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
